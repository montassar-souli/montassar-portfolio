import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { assertAllowedOrigin, getClientIp, getUserAgentSignal } from "@/lib/abuse";
import { config } from "@/lib/config";
import { limitRequestsPerMinute } from "@/lib/limits";

export const runtime = "nodejs";

const contactSchema = z.object({
    name: z.string().trim().min(2).max(50),
    email: z.string().trim().email(),
    subject: z.string().trim().min(5).max(100),
    message: z.string().trim().min(10).max(1000),
    company: z.string().trim().max(100).optional().or(z.literal("")),
    phone: z.string().trim().max(50).optional().or(z.literal("")),
});

type ErrorMeta = {
    name?: string;
    message?: string;
    code?: string;
    status?: number;
    responseStatus?: number;
};

function getErrorMeta(e: unknown): ErrorMeta {
    if (typeof e !== "object" || e === null) return {};
    const obj = e as {
        name?: unknown;
        message?: unknown;
        code?: unknown;
        status?: unknown;
        response?: { status?: unknown };
    };

    return {
        name: typeof obj.name === "string" ? obj.name : undefined,
        message: typeof obj.message === "string" ? obj.message : undefined,
        code: typeof obj.code === "string" ? obj.code : undefined,
        status: typeof obj.status === "number" ? obj.status : undefined,
        responseStatus: typeof obj.response?.status === "number" ? obj.response.status : undefined,
    };
}

function getHttpStatus(e: unknown, fallback: number) {
    const meta = getErrorMeta(e);
    return typeof meta.status === "number" ? meta.status : fallback;
}

function corsHeaders(req: NextRequest) {
    const allowed = config.security.allowedOrigin || "*";
    const headers: Record<string, string> = {
        "Access-Control-Allow-Origin": allowed,
        "Access-Control-Allow-Methods": "POST, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type",
    };
    if (allowed !== "*") headers["Vary"] = "Origin";
    if (allowed === "*" && req.headers.get("origin")) headers["Vary"] = "Origin";
    return headers;
}

export async function OPTIONS(req: NextRequest) {
    try {
        assertAllowedOrigin(req);
    } catch (err: unknown) {
        const status = getHttpStatus(err, 403);
        return new NextResponse(null, { status, headers: corsHeaders(req) });
    }
    return new NextResponse(null, { status: 204, headers: corsHeaders(req) });
}

export async function POST(req: NextRequest) {
    const baseCors = corsHeaders(req);

    try {
        assertAllowedOrigin(req);

        const ip = getClientIp(req);
        const uaSignal = getUserAgentSignal(req);
        if (uaSignal.suspicious) {
            console.warn("[api/contact] suspicious user-agent", {
                ip,
                reason: uaSignal.reason,
                matched: uaSignal.matched,
                ua: uaSignal.ua,
            });
        }

        const rl = await limitRequestsPerMinute(ip);
        if (!rl.success) {
            return NextResponse.json(
                { error: "Too many requests. Please slow down." },
                {
                    status: 429,
                    headers: {
                        "x-ratelimit-limit": String(rl.limit),
                        "x-ratelimit-remaining": String(rl.remaining),
                        "x-ratelimit-reset": String(rl.reset),
                        "x-captcha-required": "1",
                        ...baseCors,
                    },
                }
            );
        }

        const body = await req.json().catch(() => null);
        const parsed = contactSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid form data" },
                { status: 400, headers: baseCors }
            );
        }

        const emailjsCfg = config.emailjs;
        if (!emailjsCfg.serviceId || !emailjsCfg.templateId || !emailjsCfg.publicKey) {
            return NextResponse.json(
                { error: "Server misconfigured: missing EmailJS env vars" },
                { status: 500, headers: baseCors }
            );
        }

        const { name, email, subject, message, company, phone } = parsed.data;

        const payload: Record<string, unknown> = {
            service_id: emailjsCfg.serviceId,
            template_id: emailjsCfg.templateId,
            user_id: emailjsCfg.publicKey,
            template_params: {
                from_name: name,
                from_email: email,
                subject,
                message,
                company: (company || "").trim() || "Not specified",
                phone: (phone || "").trim() || "Not provided",
                to_name: "Montassar Souli",
            },
        };

        // Using the REST API from the server allows you to keep the Private Key out of the browser.
        if (emailjsCfg.privateKey) {
            payload.accessToken = emailjsCfg.privateKey;
        }

        const res = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            const text = await res.text().catch(() => "");
            console.error("[api/contact] EmailJS failed", {
                status: res.status,
                body: text.slice(0, 500),
            });
            return NextResponse.json(
                { error: "Failed to send message" },
                { status: 502, headers: baseCors }
            );
        }

        return NextResponse.json({ ok: true }, { status: 200, headers: baseCors });
    } catch (err: unknown) {
        const status = getHttpStatus(err, 500);
        console.error("[api/contact] error", { status, ...getErrorMeta(err) });
        return NextResponse.json(
            { error: "Unexpected error" },
            { status, headers: baseCors }
        );
    }
}

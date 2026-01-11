import { NextResponse, type NextRequest } from "next/server";
import { z } from "zod";
import { assertAllowedOrigin, getClientIp, getUserAgentSignal } from "@/lib/abuse";
import { config } from "@/lib/config";
import { limitRequestsPerMinute } from "@/lib/limits";
import { db } from "@/lib/firebaseAdmin";
import { FieldValue } from "firebase-admin/firestore";

export const runtime = "nodejs";

const subscribeSchema = z.object({
    email: z.string().trim().email(),
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
            console.warn("[api/newsletter] suspicious user-agent", {
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
        const parsed = subscribeSchema.safeParse(body);
        if (!parsed.success) {
            return NextResponse.json(
                { error: "Invalid email" },
                { status: 400, headers: baseCors }
            );
        }

        const email = parsed.data.email.toLowerCase();
        const docId = encodeURIComponent(email);

        await db
            .collection("newsletterSubscribers")
            .doc(docId)
            .set(
                {
                    email,
                    createdAt: FieldValue.serverTimestamp(),
                    source: req.headers.get("referer") || req.headers.get("origin") || "",
                    ip,
                },
                { merge: true }
            );

        return NextResponse.json({ ok: true }, { status: 200, headers: baseCors });
    } catch (err: unknown) {
        const status = getHttpStatus(err, 500);
        console.error("[api/newsletter] error", { status, ...getErrorMeta(err) });
        return NextResponse.json({ error: "Unexpected error" }, { status, headers: baseCors });
    }
}

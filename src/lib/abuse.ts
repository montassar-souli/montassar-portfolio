import type { NextRequest } from "next/server";
import { config } from "@/lib/config";

const TRUSTED_PROXY_COUNT = config.security.trustedProxyCount;

function normalizeIpCandidate(raw: string): string {
    const v = (raw || "").trim().replace(/^"|"$/g, "");
    if (!v) return "";

    // [IPv6]:port
    const bracket = v.match(/^\[([^\]]+)\](?::\d+)?$/);
    if (bracket?.[1]) return bracket[1].trim();

    // IPv4:port
    const ipv4Port = v.match(/^(\d{1,3}(?:\.\d{1,3}){3})(?::\d+)?$/);
    if (ipv4Port?.[1]) return ipv4Port[1].trim();

    return v;
}

function isValidIpv4(ip: string): boolean {
    const m = ip.match(/^(\d{1,3})\.(\d{1,3})\.(\d{1,3})\.(\d{1,3})$/);
    if (!m) return false;
    for (let i = 1; i <= 4; i++) {
        const n = Number(m[i]);
        if (!Number.isInteger(n) || n < 0 || n > 255) return false;
    }
    return true;
}

function isValidIpv6(ip: string): boolean {
    if (!ip.includes(":")) return false;
    if (!/^[0-9a-fA-F:]+$/.test(ip)) return false;
    const parts = ip.split(":");
    if (parts.length > 8 + 1) return false;
    return true;
}

function isValidIp(ip: string): boolean {
    return isValidIpv4(ip) || isValidIpv6(ip);
}

function pickClientIpFromXff(xff: string, trustedProxyCount: number): string {
    const ips = xff
        .split(",")
        .map((s) => normalizeIpCandidate(s))
        .filter(Boolean);

    if (ips.length === 0) return "";

    const idx = Math.max(0, ips.length - trustedProxyCount - 1);
    const candidate = ips[idx] ?? "";
    return isValidIp(candidate) ? candidate : "";
}

export function getClientIp(req: NextRequest): string {
    if (TRUSTED_PROXY_COUNT > 0) {
        const xff = req.headers.get("x-forwarded-for");
        if (xff) {
            const picked = pickClientIpFromXff(xff, TRUSTED_PROXY_COUNT);
            if (picked) return picked;
        }

        const xri = req.headers.get("x-real-ip");
        if (xri) {
            const candidate = normalizeIpCandidate(xri);
            if (isValidIp(candidate)) return candidate;
        }
    }

    // @ts-expect-error NextRequest.ip is not typed in this Next.js version
    const direct = req.ip as string | undefined;
    const normalized = direct ? normalizeIpCandidate(direct) : "";
    return isValidIp(normalized) ? normalized : "127.0.0.1";
}

export function isSuspiciousUserAgent(req: NextRequest): boolean {
    return getUserAgentSignal(req).suspicious;
}

export function getUserAgentSignal(req: NextRequest): {
    suspicious: boolean;
    reason?: string;
    matched?: string;
    ua: string;
} {
    const ua = (req.headers.get("user-agent") || "").toLowerCase();
    if (!ua) return { suspicious: true, reason: "missing", ua: "" };

    const allowlist = config.security.allowlistUaSubstrings;
    if (allowlist.some((s) => ua.includes(s))) {
        return { suspicious: false, reason: "allowlisted", ua };
    }

    const patterns: Array<{ name: string; re: RegExp }> = [
        { name: "curl", re: /\bcurl\b/ },
        { name: "wget", re: /\bwget\b/ },
        { name: "python-requests", re: /\bpython-requests\b/ },
        { name: "httpclient", re: /\bhttpclient\b/ },
        { name: "powershell", re: /\bpowershell\b/ },
        { name: "libwww", re: /\blibwww\b/ },
    ];

    for (const p of patterns) {
        if (p.re.test(ua)) {
            return { suspicious: true, reason: "matched", matched: p.name, ua };
        }
    }

    return { suspicious: false, ua };
}

export function assertAllowedOrigin(req: NextRequest) {
    const allowed = config.security.allowedOrigin;
    if (!allowed) return;
    const origin = req.headers.get("origin");
    if (!origin) return;

    if (origin !== allowed) {
        const err = new Error(`Origin not allowed: ${origin}`);
        // @ts-expect-error Attach HTTP status code for route error handler
        err.status = 403;
        throw err;
    }
}
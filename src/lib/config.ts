function parseIntWithDefault(v: string | undefined, fallback: number) {
    const n = Number.parseInt(v || "", 10);
    return Number.isFinite(n) ? n : fallback;
}

function parseCommaList(v: string | undefined) {
    return (v || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
}

export const config = {
    openRouter: {
        apiKey: process.env.OPENROUTER_API_KEY || "",
        model: process.env.MODEL || "xiaomi/mimo-v2-flash:free",
    },
    redis: {
        url: process.env.UPSTASH_REDIS_REST_URL || "",
        token: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    },
    limits: {
        requestsPerMinute: parseIntWithDefault(process.env.REQUESTS_PER_MINUTE, 20),
        tokensPerDay: parseIntWithDefault(process.env.TOKENS_PER_DAY, 50_000),
        maxMessageLength: parseIntWithDefault(process.env.MAX_MESSAGE_LENGTH, 2000),
    },
    security: {
        allowedOrigin: process.env.ALLOWED_ORIGIN || "",
        trustedProxyCount: parseIntWithDefault(process.env.TRUSTED_PROXY_COUNT, 0),
        allowlistUaSubstrings: parseCommaList(process.env.ALLOWLIST_UA_SUBSTRINGS).map((s) =>
            s.toLowerCase()
        ),
    },
    emailjs: {
        serviceId: process.env.EMAILJS_SERVICE_ID || "",
        templateId: process.env.EMAILJS_TEMPLATE_ID || "",
        publicKey: process.env.EMAILJS_PUBLIC_KEY || "",
        privateKey: process.env.EMAILJS_PRIVATE_KEY || "",
    },
} as const;

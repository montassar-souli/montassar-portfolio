import { Redis } from "@upstash/redis";
import { Ratelimit } from "@upstash/ratelimit";
import { config } from "@/lib/config";

let redis: Redis | null = null;
let ratelimit: Ratelimit | null = null;

function requireRedis(): Redis {
    if (redis) return redis;

    const url = config.redis.url;
    const token = config.redis.token;

    if (!url || !token) {
        throw new Error("Server misconfigured: missing Upstash Redis env vars");
    }
    if (!url.startsWith("https://")) {
        throw new Error("Server misconfigured: UPSTASH_REDIS_REST_URL must start with https://");
    }

    redis = new Redis({ url, token });
    return redis;
}

function requireRatelimit(): Ratelimit {
    if (ratelimit) return ratelimit;

    ratelimit = new Ratelimit({
        redis: requireRedis(),
        limiter: Ratelimit.slidingWindow(config.limits.requestsPerMinute, "1 m"),
        prefix: "rl:req",
    });

    return ratelimit;
}

export async function limitRequestsPerMinute(ip: string) {
    return requireRatelimit().limit(ip);
}

const TOKENS_PER_DAY = config.limits.tokensPerDay;

function tokenKey(ip: string) {
    const d = new Date();
    const day = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
        d.getUTCDate()
    ).padStart(2, "0")}`;
    return `quota:tokens:${ip}:${day}`;
}

function reservedTokenKey(ip: string) {
    const d = new Date();
    const day = `${d.getUTCFullYear()}-${String(d.getUTCMonth() + 1).padStart(2, "0")}-${String(
        d.getUTCDate()
    ).padStart(2, "0")}`;
    return `quota:tokens_reserved:${ip}:${day}`;
}

export async function checkTokenQuota(ip: string) {
    const r = requireRedis();
    const key = tokenKey(ip);
    const used = (await r.get<number>(key)) ?? 0;

    const reservedKey = reservedTokenKey(ip);
    const reserved = (await r.get<number>(reservedKey)) ?? 0;

    const safeUsed = Number.isFinite(used) ? Math.max(0, used) : 0;
    const safeReserved = Number.isFinite(reserved) ? Math.max(0, reserved) : 0;
    const total = safeUsed + safeReserved;

    return {
        used: safeUsed,
        reserved: safeReserved,
        limit: TOKENS_PER_DAY,
        remaining: Math.max(0, TOKENS_PER_DAY - total),
        key,
        reservedKey,
    };
}

export async function addTokens(ip: string, tokens: number) {
    if (!Number.isFinite(tokens) || tokens <= 0) return;

    const r = requireRedis();
    const key = tokenKey(ip);

    await r.incrby(key, Math.floor(tokens));
    await r.expire(key, 60 * 60 * 24 * 2);
}

export function estimateTokensFromText(text: string): number {
    const normalized = (text || "").trim();
    if (!normalized) return 0;
    return Math.ceil(normalized.length / 4);
}

export async function reserveTokens(ip: string, tokens: number) {
    const toReserve = Math.floor(tokens);
    if (!Number.isFinite(toReserve) || toReserve <= 0) {
        return { success: true, reserved: 0 };
    }

    const quota = await checkTokenQuota(ip);
    if (quota.remaining < toReserve) {
        return { success: false, reserved: 0, remaining: quota.remaining };
    }

    const r = requireRedis();
    const key = reservedTokenKey(ip);
    await r.incrby(key, toReserve);
    await r.expire(key, 60 * 60 * 24 * 2);

    return { success: true, reserved: toReserve };
}

export async function commitReservedTokens(ip: string, reserved: number, actualUsed: number) {
    const r = requireRedis();
    const resKey = reservedTokenKey(ip);
    const usedKey = tokenKey(ip);

    const res = Math.floor(reserved);
    const actual = Math.floor(actualUsed);

    if (Number.isFinite(res) && res > 0) {
        await r.incrby(resKey, -res);
        // Best-effort clamp: prevent negative values lingering.
        const after = (await r.get<number>(resKey)) ?? 0;
        if (after < 0) {
            await r.set(resKey, 0);
        }
        await r.expire(resKey, 60 * 60 * 24 * 2);
    }

    if (Number.isFinite(actual) && actual > 0) {
        await r.incrby(usedKey, actual);
        await r.expire(usedKey, 60 * 60 * 24 * 2);
    }
}
import { OpenRouter } from "@openrouter/sdk";
import { config } from "@/lib/config";

export function getOpenRouter() {
    const apiKey = config.openRouter.apiKey;
    if (!apiKey) throw new Error("Missing OPENROUTER_API_KEY");

    return new OpenRouter({
        apiKey,
        // You can also set baseURL here if needed, but SDK defaults are usually fine.
    });
}
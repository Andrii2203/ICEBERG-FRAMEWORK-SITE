
import { Groq } from "groq-sdk";
import { config } from "@/config/env";
import { IcebergError } from "@/domain/errors/IcebergError";

// Initialize Groq client
const groq = new Groq({
    apiKey: config.groq.apiKey,
});

export interface DetectionResult {
    type: "ui" | "non-ui" | "chaos";
    confidence: number;
    reasoning: string;
}

export interface FreeAuditResult {
    summary: string;
    issues: string[];
    recommendations: string[];
}

export class GroqClient {
    /**
     * Detects if the uploaded image is a UI, non-UI, or chaos.
     * Uses Groq Vision (Llama 4 Scout in 2026).
     */
    async detectUI(imageBase64: string): Promise<DetectionResult> {
        if (!config.groq.apiKey) {
            throw new IcebergError("config-error", "Groq API Key is missing. Please add it to your .env file.");
        }
        try {
            console.log("[GroqClient] Sending vision request to meta-llama/llama-4-scout-17b-16e-instruct...");
            console.log("[GroqClient] Image data length (clean):", imageBase64.length);
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `Analyze this image. Return STRICT JSON with no markdown: { "type": "ui" | "non-ui" | "chaos", "confidence": number, "reasoning": "string" }. 
                       "ui" = structured software interface. 
                       "non-ui" = photo, meme, document, real world. 
                       "chaos" = messy wireframe, scribble, unstructured UI sketch.`,
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`,
                                },
                            },
                        ],
                    },
                ],
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                temperature: 0,
                response_format: { type: "json_object" },
            });

            const content = completion.choices[0].message.content;
            if (!content) throw new Error("Empty response from Groq Vision");
            console.log("[GroqClient] Received JSON response:", content);

            const result = JSON.parse(content) as DetectionResult;
            console.log("[GroqClient] Parse successful. Type:", result.type, "Confidence:", result.confidence);
            return result;
        } catch (error) {
            console.error("[GroqClient] Detection request failed:", error);
            throw new IcebergError("ai-provider-error", "Groq Vision Detection Failed", error);
        }
    }

    /**
     * Performs a Free Audit (Chaos Check) using Groq Text/Vision.
     * Returns a quick summary for chaotic/sketchy inputs.
     */
    async runFreeAudit(imageBase64: string): Promise<FreeAuditResult> {
        if (!config.groq.apiKey) {
            throw new IcebergError("config-error", "Groq API Key is missing. Please add it to your .env file.");
        }
        try {
            console.log("[GroqClient] Sending free audit request to Llama 4 Scout...");
            const completion = await groq.chat.completions.create({
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "text",
                                text: `You are an expert UI/UX auditor. This input is a messy wireframe or chaos UI. 
                       Provide a structured FREE AUDIT in STRICT JSON: 
                       { "summary": "string", "issues": ["string"], "recommendations": ["string"] }.
                       Keep it encouraging but critical.`,
                            },
                            {
                                type: "image_url",
                                image_url: {
                                    url: `data:image/jpeg;base64,${imageBase64}`,
                                },
                            },
                        ],
                    },
                ],
                model: "meta-llama/llama-4-scout-17b-16e-instruct",
                temperature: 0.2,
                response_format: { type: "json_object" },
            });

            const content = completion.choices[0].message.content;
            if (!content) throw new Error("Empty response from Groq Free Audit");
            console.log("[GroqClient] Free audit response received.");

            const result = JSON.parse(content) as FreeAuditResult;
            console.log("[GroqClient] Free audit parsed successfully.");
            return result;
        } catch (error) {
            console.error("[GroqClient] Free audit request failed:", error);
            throw new IcebergError("ai-provider-error", "Groq Free Audit Failed", error);
        }
    }
}










import Anthropic from "@anthropic-ai/sdk";
import { config } from "@/core/config/env";
import { IcebergError } from "@/core/errors/IcebergError";
import fs from "fs";
import path from "path";

import { extractImageData, isValidBase64Image } from "@/lib/base64/base64.utils";

// Helper to read standards
const getStandard = (fileName: string) => {
    try {
        const filePath = path.join(process.cwd(), "src/modules/ai/standards", fileName);
        return fs.readFileSync(filePath, "utf-8");
    } catch (err) {
        console.error(`[ClaudeClient] Failed to read standard: ${fileName}`, err);
        return `[Error loading ${fileName}]`;
    }
};

const auditStandard = getStandard("ICEBERG AUDIT FILE STANDARD.md");
const auditProhibitions = getStandard("ICEBERG AUDIT PROHIBITIONS.md");
const executionMap = getStandard("ICEBERG EXECUTION MAP — CARD 4.md");

// Initialize Claude client
const anthropic = new Anthropic({
    apiKey: config.claude.apiKey,
});

export interface AuditFiles {
    "UI_UX_AUDIT.md": string;
    "COMPONENT_MAP.md": string;
    "VISUAL_HIERARCHY.md": string;
    "UX_HEURISTICS.md": string;
    "SUMMARY.md": string;
    "audit.json": string;
    [key: string]: string;
}


export class ClaudeClient {
    /**
     * Generates the full 6-file audit package using Claude 3.5 Sonnet.
     * Strict adherence to ICEBERG EXECUTION MAP — CARD 4.
     */
    async generateFullAudit(imageBase64: string): Promise<AuditFiles> {

        if (!isValidBase64Image(imageBase64)) {
            throw new Error("Invalid Base64 image input");
        }

        const { mediaType, base64Data } = extractImageData(imageBase64);

        if (!mediaType.startsWith("image/")) { 
            throw new Error("Uploaded file is not an image"); 
        }

        if (!config.claude.apiKey) {
            throw new IcebergError("config-error", "Anthropic API Key is missing. Please add it to your .env file.");
        }
        console.log("[ClaudeClient] Starting deep UI analysis with Claude 4.5 Sonnet...");
        console.log("[ClaudeClient] Standards loaded. Construction system prompt...");
        try {
            const systemPrompt = `
      You are the ICEBERG AUDIT ENGINE (Claude Edition).

      You MUST strictly follow these documents:

      [ICEBERG AUDIT FILE STANDARD]
      ${auditStandard}

      [ICEBERG AUDIT PROHIBITIONS]
      ${auditProhibitions}

      [ICEBERG EXECUTION MAP — CARD 4]
      ${executionMap}
      
      If there is any conflict, ICEBERG EXECUTION MAP — CARD 4 has the highest priority. You are not allowed to deviate from these steps.
      
      Your GOAL: Generate exactly 6 files based on the UI screenshot.
      
      FILES TO GENERATE:
      1. UI_UX_AUDIT.md
      2. COMPONENT_MAP.md
      3. VISUAL_HIERARCHY.md
      4. UX_HEURISTICS.md
      5. SUMMARY.md
      6. audit.json

      RULES:
      - STRICTLY follow the ICEBERG AUDIT FILE STANDARD.
      - DO NOT add new files.
      - DO NOT invent UI elements not visible in the screenshot.
      - Return the result as a JSON object where keys are filenames and values are file contents.
      - audit.json must be a valid JSON string matching the findings in markdown files.
      `;

            console.log("[ClaudeClient] System prompt length:", systemPrompt.length);
            console.log("[ClaudeClient] Sending message to Anthropic...");

            const msg = await anthropic.messages.create({
                model: "claude-sonnet-4-5",
                max_tokens: 16384, // Increased to handle very large audit responses
                temperature: 0,
                system: systemPrompt,
                messages: [
                    {
                        role: "user",
                        content: [
                            {
                                type: "image",
                                source: {
                                    type: "base64",
                                    media_type: mediaType,
                                    data: base64Data,
                                },
                            },
                            {
                                type: "text",
                                text: "Generate the 6 audit files now. Return JSON: { \"UI_UX_AUDIT.md\": \"...content...\", ... }",
                            },
                        ],
                    },
                ],
            });

            const content = msg.content[0].type === "text" ? msg.content[0].text : "";
            console.log("[ClaudeClient] Response received from Anthropic. Content length:", content.length);
            if (!content) {
                console.error("[ClaudeClient] Empty response content from Anthropic.");
                throw new Error("Empty response from Claude");
            }

            console.log("[ClaudeClient] Raw response preview:", content.substring(0, 200) + "...");

            console.log("[ClaudeClient] Cleaning response for JSON parsing...");

            let jsonString = content.trim();

            const firstBrace = jsonString.indexOf("{");
            const lastBrace = jsonString.lastIndexOf("}");

            if (firstBrace !== -1 && lastBrace !== -1) {
                jsonString = jsonString.substring(firstBrace, lastBrace + 1);
                console.log("[ClaudeClient] JSON object extracted via brace markers. Length:", jsonString.length);
            }

            console.log("[ClaudeClient] Parsing response JSON (first 100 chars):", jsonString.substring(0, 100).replace(/\n/g, "\\n"));

            let files: AuditFiles;
            try {
                files = JSON.parse(jsonString) as AuditFiles;
                console.log("[ClaudeClient] JSON parse successful. Filenames:", Object.keys(files));
            } catch (parseError) {
                console.error("[ClaudeClient] JSON Parse failed. Length:", jsonString.length);
                console.error("[ClaudeClient] String end:", jsonString.substring(jsonString.length - 100));
                throw parseError;
            }

            // Validate file count and names
            const requiredFiles = [
                "UI_UX_AUDIT.md",
                "COMPONENT_MAP.md",
                "VISUAL_HIERARCHY.md",
                "UX_HEURISTICS.md",
                "SUMMARY.md",
                "audit.json",
            ];

            for (const file of requiredFiles) {
                if (!files[file as keyof AuditFiles]) {
                    console.error("[ClaudeClient] Missing required file in response:", file);
                    throw new Error(`Missing required file: ${file}`);
                }
            }

            console.log("[ClaudeClient] Audit generation fully verified and complete.");
            return files;

        } catch (error) {
            console.error("[ClaudeClient] INTERNAL ERROR during generation:", error);
            throw new IcebergError("ai-provider-error", "Claude Audit Generation Failed", error);
        }
    }
}

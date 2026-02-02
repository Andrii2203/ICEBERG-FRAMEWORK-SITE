import { z } from "zod";

/**
 * Schema for AI Audit requests (detect-ui and analyze-ui)
 * Implements the "Customs" layer security requirements:
 * - Strict field checks
 * - Maximum character length (preventing OOM)
 * - MIME type whitelisting
 */
export const AuditRequestSchema = z.object({
    imageBase64: z.string()
        .min(100, "Image string is suspiciously short")
        .max(5 * 1024 * 1024, "Payload too large. Max 4MB image allowed")
        .refine((val) => {
            const allowedPrefixes = [
                "data:image/png;base64,",
                "data:image/jpeg;base64,",
                "data:image/webp;base64,"
            ];
            return allowedPrefixes.some(prefix => val.startsWith(prefix));
        }, {
            message: "Invalid file format. Only PNG, JPEG, and WEBP are allowed.",
        }),

    auditType: z.enum(["chaos", "ui"]),

    sessionId: z.string().optional(),
}).strict();

export type AuditRequest = z.infer<typeof AuditRequestSchema>;

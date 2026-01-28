
import { AIService } from "@/modules/ai/services/ai.service";
import { ZipService } from "@/lib/zip/zip.service";
import { cleanBase64 } from "@/lib/base64/base64.utils";
import { DetectionResult, FreeAuditResult } from "@/modules/ai/clients/groq.client";

// Define return types
export type FullAuditResponse = {
    status: "success";
    type: "full-audit";
    zipBase64: string;
};

export type FreeAuditResponse = {
    status: "success";
    type: "free-audit";
    result: FreeAuditResult;
};

export class AuditService {
    private aiService: AIService;
    private zipService: ZipService;

    constructor() {
        this.aiService = new AIService();
        this.zipService = new ZipService();
    }

    /**
     * Step 1: Detect UI type.
     */
    async detectUI(imageBase64: string): Promise<DetectionResult> {
        console.log("[AuditService] Step 1: detectUI called, image size:", imageBase64.length);
        const cleanImage = cleanBase64(imageBase64);
        const result = await this.aiService.detectUI(cleanImage);
        console.log("[AuditService] Step 1 finished. Result type:", result.type);
        return result;
    }

    /**
     * Step 2 (Chaos): Run Free Audit.
     */
    async runFreeAudit(imageBase64: string): Promise<FreeAuditResponse> {
        console.log("[AuditService] Step 2 (Chaos): runFreeAudit called");
        const cleanImage = cleanBase64(imageBase64);
        const result = await this.aiService.runFreeAudit(cleanImage);
        console.log("[AuditService] Step 2 (Chaos) finished.");
        return {
            status: "success",
            type: "free-audit",
            result,
        };
    }

    /**
     * Step 2 (UI + Paid): Run Full Audit and Generate ZIP.
     */
    async runFullAudit(imageBase64: string): Promise<FullAuditResponse> {
        console.log("[AuditService] Step 2 (Full): runFullAudit called");
        const cleanImage = cleanBase64(imageBase64);

        // 1. Generate 6 files via Claude
        console.log("[AuditService] Triggering AIService.runFullAudit...");
        const files = await this.aiService.runFullAudit(cleanImage);
        console.log("[AuditService] AIService returned", Object.keys(files).length, "files.");

        // 2. Zip them
        console.log("[AuditService] Compressing files into ZIP...");
        const zipBase64 = await this.zipService.createZip(files);
        console.log("[AuditService] ZIP generation complete. Size:", zipBase64.length);

        return {
            status: "success",
            type: "full-audit",
            zipBase64,
        };
    }
}

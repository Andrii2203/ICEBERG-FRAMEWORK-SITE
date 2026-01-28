
import { GroqClient, DetectionResult, FreeAuditResult } from "@/modules/ai/clients/groq.client";
import { ClaudeClient, AuditFiles } from "@/modules/ai/clients/claude.client";
import { IcebergError } from "@/core/errors/IcebergError";
import { TelegramService } from "@/modules/notifications/services/telegram.service";

export class AIService {
    private groq: GroqClient;
    private claude: ClaudeClient;

    constructor() {
        this.groq = new GroqClient();
        this.claude = new ClaudeClient();
    }

    /**
     * Detects the type of image using Groq Vision.
     */
    async detectUI(imageBase64: string): Promise<DetectionResult> {
        console.log("[AIService] detectUI flow started");
        try {
            const result = await this.groq.detectUI(imageBase64);
            console.log("[AIService] detectUI result received:", result.type);
            return result;
        } catch (error) {
            console.error("[AIService] detectUI error:", error);
            await TelegramService.sendErrorReport(error, "AIService.detectUI");
            throw new IcebergError("ai-service-error", "Failed to detect UI", error);
        }
    }

    /**
     * Runs a free audit (Chaos check) using Groq.
     */
    async runFreeAudit(imageBase64: string): Promise<FreeAuditResult> {
        console.log("[AIService] runFreeAudit flow started");
        try {
            const result = await this.groq.runFreeAudit(imageBase64);
            console.log("[AIService] runFreeAudit result received");
            return result;
        } catch (error) {
            console.error("[AIService] runFreeAudit error:", error);
            await TelegramService.sendErrorReport(error, "AIService.runFreeAudit");
            throw new IcebergError("ai-service-error", "Failed to run free audit", error);
        }
    }

    /**
     * Runs a full PAID audit using Claude 3.5 Sonnet.
     * Returns exactly 6 files.
     */
    async runFullAudit(imageBase64: string): Promise<AuditFiles> {
        console.log("[AIService] runFullAudit flow started for paid user");
        try {
            const result = await this.claude.generateFullAudit(imageBase64);
            console.log("[AIService] runFullAudit successful, generated", Object.keys(result).length, "files");
            return result;
        } catch (error) {
            console.error("[AIService] runFullAudit error:", error);
            await TelegramService.sendErrorReport(error, "AIService.runFullAudit");
            throw new IcebergError("ai-service-error", "Failed to run full audit", error);
        }
    }
}

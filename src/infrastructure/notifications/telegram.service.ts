export class TelegramService {
    private static readonly BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
    private static readonly CHAT_ID = process.env.TELEGRAM_CHAT_ID;

    /**
     * Sends a message to the configured Telegram chat.
     */
    static async sendMessage(message: string): Promise<void> {
        if (!this.BOT_TOKEN || !this.CHAT_ID) {
            console.warn("[TelegramService] Skipping notification: Missing BOT_TOKEN or CHAT_ID in .env");
            return;
        }

        try {
            const url = `https://api.telegram.org/bot${this.BOT_TOKEN}/sendMessage`;
            const response = await fetch(url, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    chat_id: this.CHAT_ID,
                    text: message,
                    parse_mode: "HTML",
                }),
            });

            if (!response.ok) {
                console.error("[TelegramService] Failed to send message:", await response.text());
            } else {
                console.log("[TelegramService] Notification sent successfully.");
            }
        } catch (error) {
            console.error("[TelegramService] Error sending Telegram message:", error);
        }
    }

    /**
     * Formats and sends an error report.
     */
    static async sendErrorReport(error: unknown, context: string): Promise<void> {
        const errorMessage = error instanceof Error ? error.message : String(error);
        const stack = error instanceof Error ? error.stack?.split("\n").slice(0, 3).join("\n") : "No stack trace";

        const text = `
🚨 <b>Iceberg Framework Error Alert</b> 🚨

<b>Context:</b> ${context}
<b>Error:</b> <code>${errorMessage}</code>

<b>Stack Preview:</b>
<pre>${stack}</pre>

<b>Time:</b> ${new Date().toISOString()}
        `;

        await this.sendMessage(text.trim());
    }
    /**
     * Sends a security alert (e.g., Rate Limit breach).
     */
    static async sendSecurityAlert(data: { ip: string; path: string; reason: string; resetIn?: string }): Promise<void> {
        const text = `
🛡️ <b>Iceberg Security Alert</b> 🛡️

<b>Event:</b> <code>${data.reason}</code>
<b>Path:</b> <code>${data.path}</code>
<b>IP:</b> <code>${data.ip}</code>
${data.resetIn ? `<b>Reset In:</b> ${data.resetIn}` : ""}

<b>Time:</b> ${new Date().toISOString()}
        `;

        await this.sendMessage(text.trim());
    }
}









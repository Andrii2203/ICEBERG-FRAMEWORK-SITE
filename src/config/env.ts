
export const config = {
    groq: {
        apiKey: process.env.GROQ_API_KEY || "",
    },
    claude: {
        apiKey: process.env.ANTHROPIC_API_KEY || "",
    },
    stripe: {
        secretKey: process.env.STRIPE_SECRET_KEY || "",
        publicKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_KEY || "",
        webhookSecret: process.env.STRIPE_WEBHOOK_SECRET || "",
        priceId: process.env.STRIPE_PRICE_ID || "",
        priceIdSolo: process.env.STRIPE_PRICE_ID_SOLO || "",
        priceIdAgency: process.env.STRIPE_PRICE_ID_AGENCY || "",
    },
    r2: {
        accountId: process.env.R2_ACCOUNT_ID || "",
        accessKeyId: process.env.R2_ACCESS_KEY_ID || "",
        secretAccessKey: process.env.R2_SECRET_ACCESS_KEY || "",
        bucketName: process.env.R2_BUCKET_NAME || "iceberg-vault",
        endpoint: process.env.R2_ENDPOINT || "",
    },
    upstash: {
        redisRestUrl: process.env.UPSTASH_REDIS_REST_URL || "",
        redisRestToken: process.env.UPSTASH_REDIS_REST_TOKEN || "",
    },
    telegram: {
        botToken: process.env.TELEGRAM_BOT_TOKEN || "",
        chatId: process.env.TELEGRAM_CHAT_ID || "",
    },
};

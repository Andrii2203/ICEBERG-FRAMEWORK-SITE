
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
    },
};

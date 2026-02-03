
import { NextRequest, NextResponse } from "next/server";
import { StripeService } from "@/features/payments/services/stripe.service";
import { config } from "@/config/env";

/**
 * API Route: /api/checkout
 * Purpose: Handles creation of Stripe Checkout sessions for Solo and Agency products.
 * EXPECTS: JSON { "product": "solo" | "agency", "origin": "string" }
 */
export async function POST(req: NextRequest) {
    try {
        const { product, origin } = await req.json();

        const stripeService = new StripeService();
        const safeOrigin = origin || "https://iceberg-framework-site.vercel.app";

        let priceId = "";
        let metadata = {};

        if (product === "solo") {
            priceId = config.stripe.priceIdSolo;
            metadata = { type: "solo_pack", asset: "iceberg_os_solo.zip" };
        } else if (product === "agency") {
            priceId = config.stripe.priceIdAgency;
            metadata = { type: "agency_license", asset: "iceberg_os_agency.zip" };
        } else {
            return NextResponse.json({ status: "error", message: "Invalid product type" }, { status: 400 });
        }

        if (!priceId) {
            console.error(`[API/checkout] Price ID missing for product: ${product}`);
            return NextResponse.json({ status: "error", message: "Price ID not configured" }, { status: 500 });
        }

        const sessionUrl = await stripeService.createCheckoutSession(safeOrigin, priceId, metadata);

        return NextResponse.json({ status: "success", url: sessionUrl });

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[API/checkout] Error:", errorMessage);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

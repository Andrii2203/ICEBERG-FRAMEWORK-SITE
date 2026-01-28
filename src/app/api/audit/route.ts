
import { NextRequest, NextResponse } from "next/server";
import { StripeService } from "@/features/payments/services/stripe.service";

/**
 * Main Orchestrator for /api/audit.
 * Handles initial requests and directs them to creating a payment session.
 * For actual analysis, the frontend calls /api/detect-ui and /api/analyze-ui directly
 * to allow for progress updates and better UX, but this endpoint handles the "Start Paid Audit" action.
 */
export async function POST(req: NextRequest) {
    try {
        const { action, origin } = await req.json();

        if (action === "create_session") {
            console.log("[API/audit] Creating Stripe session, origin:", origin);
            const stripeService = new StripeService();
            // Ensure origin is valid or fallback
            const safeOrigin = origin || "https://iceberg-framework-site.vercel.app/";
            const sessionUrl = await stripeService.createAuditSession(safeOrigin);
            console.log("[API/audit] Session URL generated successfully.");
            return NextResponse.json({ status: "success", url: sessionUrl });
        }

        return NextResponse.json({ status: "error", message: "Invalid action" }, { status: 400 });

    } catch {
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

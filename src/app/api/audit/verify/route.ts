
import { NextRequest, NextResponse } from "next/server";
import { StripeService } from "@/modules/payments/services/stripe.service";

export async function GET(request: NextRequest) {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
        return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
    }

    try {
        const stripeService = new StripeService();
        const isPaid = await stripeService.verifySessionPaid(sessionId);

        return NextResponse.json({ paid: isPaid });
    } catch (error) {
        console.error("[AuditVerifyAPI] Error verifying session:", error);
        return NextResponse.json({ error: "Verification failed" }, { status: 500 });
    }
}

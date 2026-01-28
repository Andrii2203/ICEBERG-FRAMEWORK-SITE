
import { NextRequest, NextResponse } from "next/server";
import { AuditService } from "@/modules/audit/services/audit.service";
import { StripeService } from "@/modules/payments/services/stripe.service";
import { IcebergError } from "@/core/errors/IcebergError";

export const maxDuration = 300; // Allow 5 minutes for deep Claude 4.5 analysis

export async function POST(req: NextRequest) {
    try {
        const { imageBase64, sessionId, auditType } = await req.json();

        if (!imageBase64) {
            return NextResponse.json({ status: "error", message: "Image is required" }, { status: 400 });
        }

        const auditService = new AuditService();

        // Handle Chaos / Free Audit
        if (auditType === "chaos") {
            const result = await auditService.runFreeAudit(imageBase64);
            return NextResponse.json(result);
        }

        // Handle Full Audit
        if (auditType === "ui") {
            console.log("[API/analyze-ui] Started Full Audit analysis. Checking payment...");
            // Verify payment if sessionId is present (optional based on flow, but recommended)
            if (sessionId) {
                const stripeService = new StripeService();
                const isPaid = await stripeService.verifySessionPaid(sessionId);
                console.log("[API/analyze-ui] Payment status for", sessionId, ":", isPaid);
                if (!isPaid) {
                    return NextResponse.json({ status: "error", message: "Payment not verified" }, { status: 402 });
                }
            }

            console.log("[API/analyze-ui] Calling auditService.runFullAudit (Claude)...");
            const result = await auditService.runFullAudit(imageBase64);
            console.log("[API/analyze-ui] Claude analysis complete, ZIP generated.");
            return NextResponse.json(result);
        }

        return NextResponse.json({ status: "error", message: "Invalid audit type" }, { status: 400 });

    } catch (error) {
        console.error("Audit Error:", error);
        if (error instanceof IcebergError) {
            return NextResponse.json(
                { status: "error", message: error.message, code: error.code },
                { status: 500 }
            );
        }
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

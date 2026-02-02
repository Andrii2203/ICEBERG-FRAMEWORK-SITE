
import { NextRequest, NextResponse } from "next/server";
import { AuditRequestSchema } from "@/domain/validation/audit.schema";
import { IcebergError } from "@/domain/errors/IcebergError";
import { StripeService } from "@/features/payments/services/stripe.service";
import { AuditService } from "@/features/audit/services/audit.service";

export const maxDuration = 300; // Allow 5 minutes for deep Claude 4.5 analysis

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        // 1. Validate request with "the Customs" (Zod)
        const validation = AuditRequestSchema.safeParse(body);

        if (!validation.success) {
            return NextResponse.json({
                status: "error",
                reason: "invalid-payload",
                message: validation.error.issues[0].message,
                details: validation.error.format()
            }, { status: 400 });
        }

        const { imageBase64, sessionId, auditType } = validation.data;

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

    } catch (error: unknown) {
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

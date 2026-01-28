
import { NextRequest, NextResponse } from "next/server";
import { AuditService } from "@/modules/audit/services/audit.service";
import { IcebergError } from "@/core/errors/IcebergError";

export async function POST(req: NextRequest) {
    try {
        const { imageBase64 } = await req.json();

        if (!imageBase64) {
            return NextResponse.json(
                { status: "error", message: "Image is required" },
                { status: 400 }
            );
        }

        const auditService = new AuditService();
        console.log("[API/detect-ui] Calling auditService.detectUI...");
        const result = await auditService.detectUI(imageBase64);
        console.log("[API/detect-ui] Model result:", result.type, "conf:", result.confidence);

        if (result.type === "non-ui") {
            return NextResponse.json(
                { status: "error", message: "Image is not a UI interface", reason: "non-ui" },
                { status: 400 }
            );
        }

        return NextResponse.json({ status: "success", data: result });
    } catch (error) {
        console.error("[API/detect-ui] ERROR:", error);
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

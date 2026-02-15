
import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import { R2Service } from "@/infrastructure/storage/r2.service";
import Stripe from "stripe";
import { config } from "@/config/env";

/**
 * API Route: /api/download
 * Purpose: Verifies payment and provides a secure, temporary download link.
 * EXPECTS: JSON { "sessionId": "string" }
 */
export async function POST(req: NextRequest) {
    try {
        const { sessionId } = await req.json();

        if (!sessionId) {
            return NextResponse.json({ status: "error", message: "Session ID is required" }, { status: 400 });
        }

        const r2Service = new R2Service();

        // 1. Verify payment status with Stripe
        // We use a separate Stripe instance here to get full session data including metadata
        const stripe = new Stripe(config.stripe.secretKey, { apiVersion: "2026-01-28.clover" });
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status !== "paid") {
            return NextResponse.json({ status: "error", message: "Payment not verified" }, { status: 403 });
        }

        // 2. CHECK EXPIRATION (10 Minutes from First Activation/Visit)
        const now = Math.floor(Date.now() / 1000);
        const MAX_AGE = 600; // Exactly 10 minutes (600 seconds)

        let activatedAt = parseInt(session.metadata?.activated_at || "0");
        let shouldUpdateMetadata = false;

        if (!activatedAt) {
            // First time accessing the link - ACTIVATE IT
            activatedAt = now;
            shouldUpdateMetadata = true;
            console.log(`[API/download] Activating session ${sessionId} at ${activatedAt}`);
        }

        const sessionAge = now - activatedAt;

        if (sessionAge > MAX_AGE) {
            console.error(`[API/download] Session expired. Age: ${sessionAge}s (from activation)`);
            return NextResponse.json({
                status: "error",
                message: "Download window has expired (10 minutes after first visit). Please contact support for a new link."
            }, { status: 403 });
        }


        // 3. SECURE SESSION LOCKING (Anti-Sharing)
        // We use an HttpOnly cookie to "bind" this session to the first browser that accesses it.
        const cookieStore = await cookies();
        const lockCookieName = `iceberg_s_${sessionId}`;
        const existingLock = cookieStore.get(lockCookieName);

        // If it was already activated (claimed), the user MUST have the cookie.
        if (session.metadata?.activated_at && (!existingLock || existingLock.value !== 'authorized')) {
            console.error(`[API/download] Session Locked. Already activated, Cookie=${existingLock ? 'Mismatch' : 'Missing'}`);
            return NextResponse.json({
                status: "error",
                message: "Security Alert: This download link is locked to the original device. Please use the device you used for the first visit."
            }, { status: 403 });
        }

        // Update metadata if this is the first visit
        if (shouldUpdateMetadata) {
            await stripe.checkout.sessions.update(sessionId, {
                metadata: { ...session.metadata, activated_at: activatedAt.toString(), claimed: 'true' }
            });
        }

        // 4. Identify target asset from metadata
        const assetName = session.metadata?.asset;
        if (!assetName) {
            console.error("[API/download] No asset found in session metadata");
            return NextResponse.json({ status: "error", message: "Asset not found in purchase record" }, { status: 404 });
        }

        // 5. Generate secure link
        const downloadUrl = await r2Service.getPresignedUrl(assetName);

        const response = NextResponse.json({
            status: "success",
            downloadUrl,
            productType: session.metadata?.type,
            secondsLeft: Math.max(0, MAX_AGE - sessionAge)
        });

        // Set the lock cookie if this was the first access
        if (shouldUpdateMetadata) {
            response.cookies.set(lockCookieName, 'authorized', {
                httpOnly: true,
                secure: true,
                sameSite: 'strict',
                path: '/',
                maxAge: 600 // Match the 10 min window
            });
        }

        return response;

    } catch (error: unknown) {
        const errorMessage = error instanceof Error ? error.message : "Unknown error";
        console.error("[API/download] Error:", errorMessage);
        return NextResponse.json(
            { status: "error", message: "Internal Server Error" },
            { status: 500 }
        );
    }
}

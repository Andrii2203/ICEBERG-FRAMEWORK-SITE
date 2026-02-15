
/**
 * Phase 10: Secure Download Verification Script
 * This script simulates the logic in /api/download/route.ts to verify the 
 * "Activation on First Visit" and "Device Lock" mechanisms.
 */

function simulateDownloadLogic({
    sessionId,
    metadata, // Simulation of Stripe Metadata { activated_at, claimed }
    hasCookie, // Simulation of HttpOnly cookie iceberg_s_{sessionId}
    currentTime
}) {
    const MAX_AGE = 600; // 10 minutes
    const results = { status: "", message: "", secondsLeft: 0, updatedMetadata: null, setCookie: false };

    // 1. Check Activation
    let activatedAt = parseInt(metadata.activated_at || "0");
    let shouldUpdateMetadata = false;

    if (!activatedAt) {
        // First contact activation
        activatedAt = currentTime;
        shouldUpdateMetadata = true;
    }

    const sessionAge = currentTime - activatedAt;

    // 2. Expiry Check
    if (sessionAge > MAX_AGE) {
        results.status = "error";
        results.message = "Download window has expired (10 minutes after first visit).";
        return results;
    }

    // 3. Device Lock Check
    // If it was already activated, must have the cookie
    if (metadata.activated_at && !hasCookie) {
        results.status = "error";
        results.message = "Security Alert: This download link is locked to the original device.";
        return results;
    }

    // 4. Success State
    results.status = "success";
    results.secondsLeft = Math.max(0, MAX_AGE - sessionAge);

    if (shouldUpdateMetadata) {
        results.updatedMetadata = { ...metadata, activated_at: activatedAt.toString(), claimed: 'true' };
        results.setCookie = true;
    }

    return results;
}

// --- TEST SUITE ---

const NOW = 10000;

console.log("--- STARTING PHASE 10 VERIFICATION ---");

// Test 1: First Visit (Fresh activation)
const test1 = simulateDownloadLogic({
    sessionId: "sess_1",
    metadata: {},
    hasCookie: false,
    currentTime: NOW
});
console.log("Test 1 (First Visit):", test1.status === "success" && test1.secondsLeft === 600 && test1.setCookie ? "✅ PASS" : "❌ FAIL");

// Test 2: Sequential Visit (Countdown check)
const test2 = simulateDownloadLogic({
    sessionId: "sess_1",
    metadata: { activated_at: (NOW - 120).toString(), claimed: 'true' },
    hasCookie: true,
    currentTime: NOW
});
console.log("Test 2 (Countdown check - 120s later):", test2.status === "success" && test2.secondsLeft === 480 ? "✅ PASS" : "❌ FAIL");

// Test 3: Expiry Visit (601s later)
const test3 = simulateDownloadLogic({
    sessionId: "sess_1",
    metadata: { activated_at: (NOW - 601).toString(), claimed: 'true' },
    hasCookie: true,
    currentTime: NOW
});
console.log("Test 3 (Expiry check - 601s later):", test3.status === "error" && test3.message.includes("expired") ? "✅ PASS" : "❌ FAIL");

// Test 4: Security Breach (Device Sharing)
const test4 = simulateDownloadLogic({
    sessionId: "sess_1",
    metadata: { activated_at: (NOW - 10).toString(), claimed: 'true' },
    hasCookie: false, // User B doesn't have User A's cookie
    currentTime: NOW
});
console.log("Test 4 (Security Breach - Different Device):", test4.status === "error" && test4.message.includes("locked") ? "✅ PASS" : "❌ FAIL");

console.log("--- VERIFICATION COMPLETE ---");

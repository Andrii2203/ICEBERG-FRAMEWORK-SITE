
import { extractImageData } from "./src/shared/utils/base64/base64.utils";

async function testMagicBytes() {
    console.log("--- STARTING MAGIC BYTE VERIFICATION ---");

    // 1. A valid PNG signature (Base64 starts with iVBOR)
    // We'll deliberately prefix it as image/jpeg
    const fakeJpegPrefix = "data:image/jpeg;base64,";
    const realPngContent = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";

    const input1 = fakeJpegPrefix + realPngContent;
    console.log("Test 1: PNG data with JPEG prefix...");
    const result1 = extractImageData(input1);
    console.log("Detected Media Type:", result1.mediaType);
    if (result1.mediaType === "image/png") {
        console.log("✅ SUCCESS: Correctly identified as image/png despite JPEG prefix.");
    } else {
        console.error("❌ FAILED: Did not override incorrect prefix.");
    }

    // 2. A valid JPEG signature (Starts with /9j/)
    // We'll deliberately prefix it as image/png
    const fakePngPrefix = "data:image/png;base64,";
    const realJpegContent = "/9j/4AAQSkZJRgABAQEASABIAAD/2wBDAP//////////////////////////////////////////////////////////////////////////////////////wgALCAABAAEBAREA/8QAFBABAAAAAAAAAAAAAAAAAAAAAP/aAAgBAQABPxA=";

    const input2 = fakePngPrefix + realJpegContent;
    console.log("\nTest 2: JPEG data with PNG prefix...");
    const result2 = extractImageData(input2);
    console.log("Detected Media Type:", result2.mediaType);
    if (result2.mediaType === "image/jpeg") {
        console.log("✅ SUCCESS: Correctly identified as image/jpeg despite PNG prefix.");
    } else {
        console.error("❌ FAILED: Did not override incorrect prefix.");
    }

    // 3. Raw Base64 (PNG)
    const rawPng = "iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8z8BQDwAEhQGAhKmMIQAAAABJRU5ErkJggg==";
    console.log("\nTest 3: Raw PNG base64 (no prefix)...");
    const result3 = extractImageData(rawPng);
    console.log("Detected Media Type:", result3.mediaType);
    if (result3.mediaType === "image/png") {
        console.log("✅ SUCCESS: Correctly identified as image/png.");
    } else {
        console.error("❌ FAILED: Did not identify raw PNG.");
    }

    console.log("\n--- VERIFICATION COMPLETE ---");
}

testMagicBytes().catch(console.error);

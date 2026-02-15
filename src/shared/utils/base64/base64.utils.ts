/**
 * Utilities for cleaning, validating and extracting metadata
 * from Base64‑encoded images.
 */

export type ClaudeImageType =
  | "image/jpeg"
  | "image/png"
  | "image/gif"
  | "image/webp";

/**
 * Removes the data URI prefix if present.
 * Example:
 *   data:image/png;base64,AAAAAA  →  AAAA...
 */
export function cleanBase64(input: string): string {
  if (input.includes("base64,")) {
    return input.split("base64,")[1];
  }
  return input;
}

/**
 * Very basic Base64 validation.
 * Ensures the string contains only valid Base64 characters.
 */
export function isValidBase64(input: string): boolean {
  const regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
  return regex.test(input);
}

/**
 * Validates if the string is a valid Base64 image.
 * This does NOT guarantee the image is real, but prevents obvious errors.
 */
export function isValidBase64Image(input: string): boolean {
  const cleaned = cleanBase64(input);
  return isValidBase64(cleaned);
}

/**
 * Detects the real MIME type by looking at Base64 magic bytes.
 * This is the ultimate "Truth" layer.
 */
export function getMimeTypeFromBase64(base64: string): ClaudeImageType | null {
  // Take the first 10-20 characters to check magic signatures
  const header = base64.substring(0, 20);

  if (header.startsWith("iVBORw0KGgo")) return "image/png";
  if (header.startsWith("/9j/")) return "image/jpeg";
  if (header.startsWith("UklGR")) return "image/webp";
  if (header.startsWith("R0lGOD")) return "image/gif";

  return null;
}

/**
 * Extracts media type and Base64 data.
 * Supports:
 *   - Full data URLs: data:image/png;base64,AAAA...
 *   - Raw Base64
 *   - PERFORMANCE: Sniffs magic bytes to override incorrect declared MIME types.
 */
export function extractImageData(
  input: string
): { mediaType: ClaudeImageType; base64Data: string } {
  let declaredMediaType: ClaudeImageType | null = null;
  let base64Data = "";

  // 1. Parse Input
  if (input.startsWith("data:")) {
    const match = input.match(
      /^data:(image\/(?:jpeg|png|gif|webp));base64,(.+)$/
    );

    if (match) {
      declaredMediaType = match[1] as ClaudeImageType;
      base64Data = match[2];
    } else {
      // Fallback for malformed data URLs
      base64Data = cleanBase64(input);
    }
  } else {
    base64Data = cleanBase64(input);
  }

  // 2. SNIFF REAL TYPE (The Customs Control)
  const realMediaType = getMimeTypeFromBase64(base64Data);

  // 3. RESOLUTION LOGIC
  // We prioritize real bytes over declared strings to prevent Claude 400 errors.
  const finalMediaType = realMediaType || declaredMediaType || "image/png";

  if (!isValidBase64(base64Data)) {
    throw new Error("Invalid Base64 string");
  }

  return {
    mediaType: finalMediaType,
    base64Data: base64Data,
  };
}



// /**
//  * Ensures the base64 string doesn't have the data URI prefix.
//  */
// export function cleanBase64(input: string): string {
//     if (input.includes("base64,")) {
//         return input.split("base64,")[1];
//     }
//     return input;
// }

// /**
//  * Validates if the string is a valid base64 image (basic check).
//  */
// export function isValidBase64Image(input: string): boolean {
//     // Very basic regex for base64
//     const regex = /^([0-9a-zA-Z+/]{4})*(([0-9a-zA-Z+/]{2}==)|([0-9a-zA-Z+/]{3}=))?$/;
//     return regex.test(cleanBase64(input));
// }









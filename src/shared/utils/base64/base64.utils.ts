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
 * Extracts media type and Base64 data.
 * Supports:
 *   - Full data URLs: data:image/png;base64,AAAA...
 *   - Raw Base64 (assumes PNG by default)
 */
export function extractImageData(
  input: string
): { mediaType: ClaudeImageType; base64Data: string } {
  // Case 1: full data URL
  if (input.startsWith("data:")) {
    const match = input.match(
      /^data:(image\/(?:jpeg|png|gif|webp));base64,(.+)$/
    );

    if (!match) {
      throw new Error("Unsupported or invalid image data URL");
    }

    return {
      mediaType: match[1] as ClaudeImageType,
      base64Data: match[2],
    };
  }

  // Case 2: raw Base64
  const cleaned = cleanBase64(input);

  if (!isValidBase64(cleaned)) {
    throw new Error("Invalid Base64 string");
  }

  return {
    mediaType: "image/png", // default fallback
    base64Data: cleaned,
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









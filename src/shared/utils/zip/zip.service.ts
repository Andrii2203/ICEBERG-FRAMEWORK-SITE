
import JSZip from "jszip";
import { IcebergError } from "@/domain/errors/IcebergError";

export class ZipService {
    /**
     * Creates a base64 ZIP file from a map of filename -> content.
     */
    async createZip(files: Record<string, string>): Promise<string> {
        try {
            const zip = new JSZip();

            // Add files to zip
            for (const [filename, content] of Object.entries(files)) {
                zip.file(filename, content);
            }

            // Generate base64
            const base64 = await zip.generateAsync({ type: "base64" });
            return base64;
        } catch (error) {
            throw new IcebergError("zip-generation-error", "Failed to generate ZIP", error);
        }
    }
}

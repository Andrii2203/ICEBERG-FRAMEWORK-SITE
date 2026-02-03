
import { S3Client, GetObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { config } from "@/config/env";
import { IcebergError } from "@/domain/errors/IcebergError";

export class R2Service {
    private client: S3Client;

    constructor() {
        const { accountId, accessKeyId, secretAccessKey, endpoint } = config.r2;

        if (!accountId && !endpoint) {
            console.error("[R2Service] CRITICAL: Both R2_ACCOUNT_ID and R2_ENDPOINT are missing.");
        }

        const r2Endpoint = endpoint || `https://${accountId}.r2.cloudflarestorage.com`;

        this.client = new S3Client({
            region: "auto",
            endpoint: r2Endpoint,
            credentials: {
                accessKeyId: accessKeyId,
                secretAccessKey: secretAccessKey,
            },
            forcePathStyle: !!endpoint, // Use path style if a custom endpoint is provided
        });
    }

    /**
     * Generates a signed URL for a specific asset in the R2 bucket.
     * Default expiration is 10 minutes (600 seconds) per ICEBERG_GUIDELINES.md.
     */
    async getPresignedUrl(fileName: string, expiresIn: number = 600): Promise<string> {
        console.log(`[R2Service] Generating presigned URL for: ${fileName}, expires in: ${expiresIn}s`);

        try {
            const command = new GetObjectCommand({
                Bucket: config.r2.bucketName,
                Key: fileName,
            });

            return await getSignedUrl(this.client, command, { expiresIn });
        } catch (error) {
            console.error("[R2Service] Error generating signed URL:", error);
            throw new IcebergError("storage-error", `Failed to generate download link for ${fileName}`, error);
        }
    }
}

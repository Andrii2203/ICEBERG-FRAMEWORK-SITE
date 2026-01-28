
export class IcebergError extends Error {
    public code: string;
    public details?: unknown;

    constructor(code: string, message: string, details?: unknown) {
        super(message);
        this.name = "IcebergError";
        this.code = code;
        this.details = details;
    }
}

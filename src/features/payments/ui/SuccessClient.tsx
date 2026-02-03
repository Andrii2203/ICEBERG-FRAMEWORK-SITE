
"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Loader2, Download, AlertCircle, ShieldCheck, Clock } from "lucide-react";
import Link from "next/link";

export function SuccessClient() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const sessionId = searchParams.get("session_id");

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [downloadUrl, setDownloadUrl] = useState<string | null>(null);
    const [productType, setProductType] = useState<string | null>(null);
    const [timeLeft, setTimeLeft] = useState<number>(600); // 10 minutes in seconds

    useEffect(() => {
        if (!sessionId) {
            // Check if we already have it in state/sessionStorage if URL is cleared? 
            // For now, let's just allow the URL to be the source of truth for the first hit.
            setError("Missing session ID. Please check your purchase link.");
            setLoading(false);
            return;
        }

        const verifyAndFetch = async () => {
            try {
                const response = await fetch("/api/download", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ sessionId }),
                });

                const data = await response.json();
                if (data.status === "success") {
                    setDownloadUrl(data.downloadUrl);
                    setProductType(data.productType);
                    if (data.secondsLeft) setTimeLeft(data.secondsLeft);

                    // NO AGGRESSIVE CLEANSING: We allow the ID to stay so refreshes work.
                    // The SERVER will reject it after 10 minutes anyway.
                } else {
                    setError(data.message || "Failed to verify payment.");
                }
            } catch (err) {
                console.error("Verification error:", err);
                setError("Network error. Please try again.");
            } finally {
                setLoading(false);
            }
        };

        verifyAndFetch();
    }, [sessionId, router]);

    // Timer logic
    useEffect(() => {
        if (!downloadUrl) return;

        const timer = setInterval(() => {
            setTimeLeft((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);
                    setDownloadUrl(null); // Invalidating local state
                    // CLEANSING: Remove session_id only AFTER expiry
                    router.replace(window.location.pathname, { scroll: false });
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [downloadUrl, router]);

    if (loading) {
        return (
            <div className="flex flex-col items-center gap-4 py-12">
                <Loader2 className="w-10 h-10 animate-spin text-accent-brand" />
                <p className="text-text-brand/50 font-mono text-sm animate-pulse">
                    Verifying transaction with Stripe...
                </p>
            </div>
        );
    }

    if (error) {
        return (
            <div className="p-8 rounded-2xl border border-red-500/20 bg-red-500/5 text-center max-w-sm mx-auto">
                <AlertCircle className="w-8 h-8 text-red-500 mx-auto mb-4" />
                <p className="text-text-brand font-medium mb-2">Access Denied</p>
                <p className="text-text-brand/60 text-sm mb-6">{error}</p>
                <Link href="/" className="text-accent-brand hover:underline font-mono text-xs">Back to Home</Link>
            </div>
        );
    }

    if (!downloadUrl && timeLeft === 0) {
        return (
            <div className="p-8 rounded-2xl border border-orange-500/20 bg-orange-500/5 text-center max-w-sm mx-auto">
                <Clock className="w-8 h-8 text-orange-500 mx-auto mb-4" />
                <p className="text-text-brand font-medium mb-2">Session Expired</p>
                <p className="text-text-brand/60 text-sm mb-6">
                    Professional security requires download links to expire.
                    If you missed your window, please check your email for the original receipt or contact support.
                </p>
                <Link href="/" className="text-accent-brand hover:underline font-mono text-xs">Back to Home</Link>
            </div>
        );
    }

    return (
        <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-1000">
            <div className="p-12 rounded-[32px] border border-accent-brand/30 bg-surface-brand/40 backdrop-blur-xl shadow-[0_0_50px_rgba(var(--accent-brand),0.1)] relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-accent-brand to-transparent" />

                <div className="flex items-center gap-3 mb-6 justify-center">
                    <ShieldCheck className="w-5 h-5 text-accent-brand" />
                    <span className="text-accent-brand font-mono text-xs uppercase tracking-widest">
                        Authenticated Secure Link
                    </span>
                </div>

                <h3 className="text-2xl font-bold text-text-brand mb-4">
                    {productType === 'solo_pack' ? 'Iceberg OS Solo Pack' : 'Iceberg Agency Assets'}
                </h3>

                <div className="flex items-center justify-center gap-2 mb-8 text-text-brand/40 font-mono text-[10px] uppercase">
                    <Clock className="w-3 h-3 text-orange-500" />
                    <span>Link expires in: <span className="text-orange-500 font-bold">{Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}</span></span>
                </div>

                <a
                    href={downloadUrl || "#"}
                    className="flex items-center justify-center gap-3 py-5 px-12 rounded-full bg-accent-brand text-background-brand font-bold text-xl transition-all hover:scale-105 active:scale-95 shadow-[0_15px_30px_rgba(var(--accent-brand),0.3)]"
                >
                    <Download className="w-6 h-6" />
                    Download Bundle (ZIP)
                </a>

                <p className="mt-8 text-text-brand/40 text-[10px] font-mono leading-relaxed">
                    Security Policy ID: <span className="text-text-brand/60 uppercase">AES-256-R2-EPHEMERAL</span><br />
                    Links are generated for 10 minutes for your security.
                    Refreshing the page after the ID is cleared will terminate the session.
                </p>
            </div>
        </div>
    );
}

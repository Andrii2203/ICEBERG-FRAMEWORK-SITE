"use client";

import { useCallback, useEffect, useState } from "react";
import { Upload, CheckCircle, AlertOctagon, RefreshCw, Lock, ShieldCheck, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useSearchParams } from "next/navigation";

import { Dictionary } from "@/domain/i18n/types";

export interface DetectionResult {
    type: "ui" | "chaos" | "non-ui" | "error";
    message?: string;
    confidence?: number;
}

interface AuditClientProps {
    featureDict: Dictionary["audit"];
    privacyPolicy?: string;
}

export function AuditClient({ featureDict, privacyPolicy }: AuditClientProps) {
    const searchParams = useSearchParams();
    const sessionId = searchParams.get("session_id");
    const status = searchParams.get("status");

    const [preview, setPreview] = useState<string | null>(null);
    const [step, setStep] = useState<"upload" | "detecting" | "recovering" | "result" | "success">("upload");
    const [detection, setDetection] = useState<DetectionResult | null>(null);
    const [loading, setLoading] = useState(false);
    const [hasRecovered, setHasRecovered] = useState(false);
    const [recoveryMessage, setRecoveryMessage] = useState("");
    const [showPrivacy, setShowPrivacy] = useState(false);

    const handleFullAudit = useCallback(async (imageBase64: string, stripeSessionId?: string) => {
        setLoading(true);
        setStep("detecting");

        try {
            const response = await fetch("/api/analyze-ui", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    imageBase64,
                    sessionId: stripeSessionId,
                    auditType: "ui"
                }),
            });

            const data = await response.json();

            if (data.status === "success" && data.zipBase64) {
                const link = document.createElement("a");
                link.href = `data:application/zip;base64,${data.zipBase64}`;
                link.download = `ICEBERG_AUDIT_${new Date().getTime()}.zip`;
                link.click();

                sessionStorage.removeItem("audit_image");
                window.history.replaceState({}, "", window.location.pathname);
                setPreview(null);
                setDetection(null);

                setStep("success");
            } else {
                alert(data.message || "Audit analysis failed");
                setStep("upload");
            }
        } catch (error) {
            console.error("Audit failed:", error);
            setStep("upload");
        } finally {
            setLoading(false);
        }
    }, []);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: { "image/*": [] },
        multiple: false,
        disabled: step !== "upload",
        onDrop: (acceptedFiles) => {
            const f = acceptedFiles[0];
            const url = URL.createObjectURL(f);
            setPreview(url);
            handleDetection(f);
        },
    });

    const handleDetection = async (file: File) => {
        setStep("detecting");
        setLoading(true);

        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = async () => {
            const base64 = reader.result as string;
            sessionStorage.setItem("audit_image", base64);

            try {
                const res = await fetch("/api/detect-ui", {
                    method: "POST",
                    body: JSON.stringify({ imageBase64: base64 }),
                });
                const data = await res.json();

                if (data.status === "error") {
                    if (data.reason === "non-ui") {
                        setDetection({ type: "non-ui", message: featureDict.errors?.nonUi || "Non-UI Detected" });
                    } else {
                        setDetection({ type: "error", message: data.message });
                    }
                } else {
                    setDetection(data.data);
                }
            } catch (_err) {
                setDetection({ type: "error", message: "Network Error" });
            } finally {
                setLoading(false);
                setStep("result");
            }
        };
    };

    const startFreeAudit = async () => {
        if (!preview) return;
        setLoading(true);
        setTimeout(() => setLoading(false), 2000);
    };

    useEffect(() => {
        const recoverSession = async () => {
            if (sessionId && status === "success" && step === "upload" && !hasRecovered) {
                setHasRecovered(true);
                setStep("recovering");
                setLoading(true);

                try {
                    setRecoveryMessage("Verifying payment...");
                    const verifyRes = await fetch(`/api/audit/verify?session_id=${sessionId}`);
                    const verifyData = await verifyRes.json();

                    if (!verifyData.paid) {
                        window.history.replaceState({}, "", window.location.pathname);
                        setStep("upload");
                        setLoading(false);
                        return;
                    }
                } catch (_err) {
                    window.history.replaceState({}, "", window.location.pathname);
                    setStep("upload");
                    setLoading(false);
                    return;
                }

                setRecoveryMessage("Restoring data...");
                const storedImage = sessionStorage.getItem("audit_image");

                if (storedImage) {
                    setPreview(storedImage);
                    setDetection({ type: "ui" } as DetectionResult);
                    setRecoveryMessage(featureDict.status?.analyzing || "Deep AI Audit Active...");
                    await handleFullAudit(storedImage, sessionId);
                } else {
                    window.history.replaceState({}, "", window.location.pathname);
                    setStep("upload");
                    setLoading(false);
                }
            }
        };
        recoverSession();
    }, [sessionId, status, step, hasRecovered, handleFullAudit, featureDict.status?.analyzing]);

    // Handle Paste Events (Ctrl+V)
    useEffect(() => {
        const handlePaste = (e: ClipboardEvent) => {
            if (step !== "upload" || !e.clipboardData) return;

            const items = e.clipboardData.items;
            for (let i = 0; i < items.length; i++) {
                if (items[i].type.indexOf("image") !== -1) {
                    e.preventDefault();
                    const blob = items[i].getAsFile();
                    if (blob) {
                        const url = URL.createObjectURL(blob);
                        setPreview(url);
                        handleDetection(blob);
                        break; // Only take the first image
                    }
                }
            }
        };

        window.addEventListener("paste", handlePaste);
        return () => window.removeEventListener("paste", handlePaste);
    }, [step]);

    const startPaidAudit = async () => {
        setLoading(true);
        try {
            const res = await fetch("/api/audit", {
                method: "POST",
                body: JSON.stringify({ action: "create_session", origin: window.location.origin })
            });
            const data = await res.json();
            if (data.status === "success" && data.url) {
                window.location.href = data.url;
            } else {
                alert(data.message || "Payment initiation failed");
                setLoading(false);
            }
        } catch (_err) {
            alert("Payment initiation failed");
            setLoading(false);
        }
    };

    return (
        <div className="max-w-6xl mx-auto px-4">
            {/* Stable Header */}
            <div className="text-center mb-10 transition-all">
                <h1 className="text-4xl md:text-5xl font-black bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 mb-4 pb-2">
                    {featureDict.title}
                </h1>
                <p className="text-slate-400 max-w-2xl mx-auto font-medium">
                    {featureDict.description}
                </p>
            </div>

            {/* Permanent Dashboard Container */}
            <div className="w-full relative h-auto md:h-[550px] bg-gradient-to-br from-slate-200/50 to-slate-50 dark:from-[#0A0A0A]/90 dark:to-[#0A0A0A]/80 backdrop-blur-3xl border border-slate-600/30 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl shadow-sky-400/5 group flex flex-col md:block">

                {/* Background Micro-animations */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-indigo-500/5 pointer-events-none" />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent" />

                {/* THE CORE SPLIT VIEW */}
                <div {...getRootProps()} className="w-full flex cursor-pointer flex-col md:flex-row h-full divide-y md:divide-y-0 md:divide-x divide-border-brand/20 dark:divide-white/5 relative z-10">
                    <input {...getInputProps()} />

                    {/* LEFT PANEL: Media/Preview (Stack on mobile, 42% on desktop) */}
                    <div className="w-full md:w-[42%] shrink-0 relative overflow-hidden bg-slate-50/50 dark:bg-black/40 p-6 md:p-8 flex flex-col h-[300px] md:h-full border-b md:border-b-0 border-slate-600/20 dark:border-white/5">
                        <div className="flex items-center gap-3 mb-6">
                            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
                            <span className="text-[10px] font-black tracking-widest text-white/40 uppercase">
                                {step === 'upload' ? 'Awaiting Input' : 'Visual Context'}
                            </span>
                        </div>

                        <div className="relative w-full flex-1 rounded-2xl overflow-hidden border border-slate-600/20 dark:border-white/5 bg-slate-50 dark:bg-white/[0.02] shadow-inner flex items-center justify-center group/preview min-w-0">
                            {!preview ? (
                                <div
                                    key="placeholder"
                                    className="flex flex-col items-center gap-4 text-white/10"
                                >
                                    <div className="w-20 h-20 rounded-full border-2 border-dashed border-slate-400 dark:border-white/10 flex items-center justify-center">
                                        <Upload className="w-10 h-10 text-slate-500 dark:text-white/40" />
                                    </div>
                                    <span className="text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-white/40">No Image</span>
                                </div>
                            ) : (
                                <div
                                    key="image"
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={preview} alt="Context" fill
                                        className="object-cover transition-transform duration-1000 group-hover/preview:scale-105"
                                    />
                                    <div className="absolute inset-0 w-full h-full bg-gradient-to-t from-black/60 via-transparent to-transparent" />

                                    {/* Status Badge Over Image */}
                                    <div className="absolute top-4 left-4">
                                        {detection && (
                                            <span className="px-3 py-1.5 bg-black/80 backdrop-blur-xl rounded-lg text-[10px] font-black tracking-widest text-cyan-400 border border-cyan-500/20 uppercase shadow-2xl">
                                                {detection.type}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Processing Overlay */}
                            {loading && (
                                <div
                                    className="absolute inset-0 w-full h-full bg-black/60 backdrop-blur-sm flex flex-col items-center justify-center gap-6 z-2 min-w-0"
                                >
                                    <div className="relative">
                                        <div className="absolute -inset-4 bg-cyan-500/20 blur-xl animate-pulse rounded-full" />
                                        <RefreshCw className="w-12 h-12 text-cyan-400 animate-spin relative" />
                                    </div>
                                    <span className="text-[10px] font-black tracking-[0.2em] text-cyan-400 uppercase animate-pulse">
                                        Deep Intelligence Active
                                    </span>
                                </div>
                            )}
                        </div>

                        {preview && !loading && (
                            <button
                                type="button"
                                onClick={(e) => { e.stopPropagation(); setPreview(null); setStep("upload"); setDetection(null); sessionStorage.removeItem("audit_image"); }}
                                className="mt-6 flex items-center justify-center gap-2 text-[10px] font-black text-slate-500 dark:text-white/20 hover:text-slate-900 dark:hover:text-white transition-all uppercase tracking-widest relative z-[20]"
                            >
                                <RefreshCw className="w-3 h-3" />
                                Replace Input
                            </button>
                        )}
                    </div>

                    {/* RIGHT PANEL: Actions/Controls (Stack on mobile, 58% on desktop) */}
                    <div className="w-full md:h-full md:w-[58%] shrink-0 relative flex flex-col p-8 md:p-6 min-h-[400px] md:min-h-0">

                        {/* STATE: INITIAL UPLOAD / DROPZONE */}
                        {step === "upload" && (
                            <div className="h-full">
                                <div
                                    key="upload-pane"
                                    className="h-full flex flex-col justify-center group/drop"
                                >
                                    <div className="space-y-6">
                                        <div className="space-y-3">
                                            <h3 className="text-4xl font-black text-slate-950 dark:text-white leading-tight">
                                                {featureDict.form.uploadLabel}
                                            </h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                                Drop your interface screenshot here. Our AI will analyze UX metrics, visual balance, and code mapping.
                                            </p>

                                        </div>
                                    </div>

                                </div>
                            </div>
                        )
                        }

                        {/* STATE: SUCCESS */}
                        {step === "success" && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="text-center space-y-4"
                            >
                                <div className="flex justify-center">
                                    <div className="relative">
                                        <div className="absolute inset-0 bg-cyan-500/20 blur-3xl rounded-full" />
                                        <div className="relative bg-slate-900/50 dark:bg-white/5 border border-cyan-500/30 p-4 rounded-full">
                                            <CheckCircle className="w-8 h-8 text-cyan-500" />
                                        </div>
                                    </div>
                                </div>

                                <div className="space-y-4">
                                    <h2 className="text-4xl font-black tracking-tighter text-slate-950 dark:text-white">
                                        {featureDict.success?.title || "Audit Package Ready!"}
                                    </h2>
                                    <p className="text-slate-600 dark:text-slate-400 text-lg max-w-md mx-auto">
                                        {featureDict.success?.description || "Your professional UI/UX analysis has been generated and downloaded successfully."}
                                    </p>
                                </div>

                                <div className="max-w-xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                                    <div className="p-6 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl space-y-4">
                                        <h4 className="font-bold text-slate-950 dark:text-white uppercase text-xs tracking-widest flex items-center gap-2">
                                            <Upload className="w-4 h-4 text-cyan-500" />
                                            {featureDict.success?.whatsInside || "What's inside your package?"}
                                        </h4>
                                        <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400 font-mono">
                                            <li>• {featureDict.success?.filesCount || "6 comprehensive analysis files in one ZIP."}</li>
                                            <li className="text-cyan-500/80">• {featureDict.success?.startGuide || "Start with SUMMARY.md for a high-level overview."}</li>
                                        </ul>
                                    </div>
                                    <div className="p-6 bg-slate-100 dark:bg-white/[0.02] border border-slate-200 dark:border-white/5 rounded-3xl space-y-4">
                                        <h4 className="font-bold text-slate-950 dark:text-white uppercase text-xs tracking-widest flex items-center gap-2">
                                            <RefreshCw className="w-4 h-4 text-cyan-500" />
                                            {featureDict.success?.nextSteps || "Next steps"}
                                        </h4>
                                        <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                                            <p>{featureDict.success?.unzip || "1. Unzip the downloaded file."}</p>
                                            <p>{featureDict.success?.readReports || "2. Read the detailed Markdown reports."}</p>
                                            <p>{featureDict.success?.implement || "3. Implement identified improvements."}</p>
                                        </div>
                                    </div>
                                </div>

                                <button
                                    onClick={() => {
                                        setPreview(null);
                                        setDetection(null);
                                        setStep("upload");
                                        window.history.replaceState({}, "", window.location.pathname);
                                    }}
                                    className="px-12 py-4 bg-slate-950 dark:bg-white text-white dark:text-black font-black rounded-2xl hover:scale-105 transition-all shadow-xl shadow-cyan-500/10"
                                >
                                    {featureDict.success?.anotherAudit || "Analyze Another UI"}
                                </button>
                            </motion.div>
                        )}

                        {/* STATE: RECOVERING / RESUMING */}
                        {step === "recovering" && (
                            <div
                                key="recovering-pane"
                                className="h-full flex flex-col items-center justify-center text-center gap-8"
                            >
                                <div className="w-full p-10 rounded-[3rem] bg-indigo-500/5 border border-indigo-500/10 relative">
                                    <RefreshCw className="w-20 h-20 text-indigo-400 animate-spin" />
                                    <div className="absolute inset-0 blur-3xl bg-indigo-500/10 rounded-full pointer-events-none" />
                                </div>
                                <div className="space-y-3">
                                    <h3 className="text-3xl font-black text-slate-950 dark:text-white">Resuming Session</h3>
                                    <p className="w-full text-slate-600 dark:text-slate-400 text-lg leading-relaxed text-center">
                                        {recoveryMessage}
                                    </p>
                                </div>
                            </div>
                        )}

                        {/* STATE: RESULT / READY TO PAY */}
                        {step === "result" && detection && (
                            <div
                                key="result-pane"
                                className="h-full w-full flex flex-col justify-center gap-10"
                            >
                                {detection.type === 'ui' ? (
                                    <>
                                        <div className="space-y-4">
                                            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/20 rounded-lg text-[10px] font-black tracking-widest text-green-400 uppercase">
                                                Analysis Complete
                                            </div>
                                            <h3 className="text-4xl font-black text-slate-950 dark:text-white">Interface Verified</h3>
                                            <p className="text-slate-600 dark:text-slate-400 text-lg leading-relaxed">
                                                Our 6-vector analysis engine is ready to generate your full documentation package.
                                            </p>
                                        </div>

                                        <div className="w-full p-10 bg-gradient-to-br from-slate-200/50 dark:from-white/[0.04] to-slate-50/50 dark:to-transparent rounded-[2.5rem] border border-slate-600/30 dark:border-white/5 space-y-8 relative group/card overflow-hidden">
                                            <div className="relative z-10 flex justify-between items-center">
                                                <div className="space-y-1">
                                                    <h4 className="text-2xl font-black text-slate-950 dark:text-white">Iceberg Pro Audit</h4>
                                                    <p className="text-xs font-bold text-slate-500 dark:text-white/40 tracking-widest uppercase">One-time payment</p>
                                                </div>
                                                <div className="text-4xl font-black text-slate-950 dark:text-white tracking-tighter">29€</div>
                                            </div>

                                            <ul className="relative z-10 grid grid-cols-2 gap-4">
                                                {["ZIP-Package", "Code Mapping", "UX Analysis", "Claude 4.5"].map((item, idx) => (
                                                    <li key={idx} className="flex items-center gap-3 text-xs font-bold text-slate-500 dark:text-white/50">
                                                        <CheckCircle className="w-4 h-4 text-cyan-500" />
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>

                                            <button
                                                onClick={startPaidAudit}
                                                disabled={loading}
                                                className="relative z-10 w-full py-5 bg-accent-brand hover:bg-accent-brand/80 text-white dark:text-black font-black rounded-2xl shadow-2xl shadow-accent-brand/20 transition-all flex items-center justify-center gap-3 text-lg group-hover/card:scale-[1.02]"
                                            >
                                                {loading ? <RefreshCw className="w-6 h-6 animate-spin" /> : <Lock className="w-6 h-6" />}
                                                {featureDict.form.submitButton}
                                            </button>

                                            <div className="absolute -top-24 -right-24 w-64 h-64 bg-cyan-500/10 blur-[80px] pointer-events-none group-hover/card:bg-cyan-500/20 transition-colors" />
                                        </div>
                                    </>
                                ) : (
                                    <div className="space-y-8">
                                        <div className="w-20 h-20 rounded-3xl bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                                            <AlertOctagon className="w-12 h-12 text-red-500" />
                                        </div>
                                        <div className="space-y-4">
                                            <h3 className="text-4xl font-black text-white leading-tight">
                                                Detection Failed
                                            </h3>
                                            <p className="text-slate-400 text-xl leading-relaxed">
                                                {detection.message || "We couldn't identify a valid user interface in this image."}
                                            </p>
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={`absolute inset-0 bg-cyan-500/5 transition-opacity duration-500 ${isDragActive ? 'opacity-100' : 'opacity-0'}`} />
                </div>
            </div>

            <div className="flex flex-wrap items-center gap-2 pt-2 text-xs font-bold uppercase tracking-widest">
                <ShieldCheck className="w-4 h-4 text-cyan-500" />
                Privacy First: Images are processed in-memory and never stored.
                <button
                    onClick={(e: React.MouseEvent) => { e.stopPropagation(); setShowPrivacy(true); }}
                    className="text-cyan-400 hover:text-cyan-300 underline decoration-cyan-400/30 underline-offset-4 ml-1"
                >
                    Read More
                </button>
            </div>

            {/* Privacy Modal */}
            <AnimatePresence>
                {showPrivacy && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setShowPrivacy(false)}
                        className="fixed inset-0 z-[100] bg-black/80 backdrop-blur-md flex items-center justify-center p-4 md:p-8"
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            onClick={(e) => e.stopPropagation()}
                            className="w-full max-w-2xl max-h-[80vh] bg-slate-50 dark:bg-[#0A0A0A] border border-slate-600/30 dark:border-white/10 rounded-[2.5rem] overflow-hidden shadow-2xl flex flex-col"
                        >
                            <div className="p-8 border-b border-slate-600/10 dark:border-white/5 flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                    <ShieldCheck className="w-6 h-6 text-cyan-500" />
                                    <h3 className="text-xl font-black text-slate-950 dark:text-white">Privacy Policy</h3>
                                </div>
                                <button
                                    onClick={() => setShowPrivacy(false)}
                                    className="p-2 hover:bg-slate-200 dark:hover:bg-white/5 rounded-full transition-colors text-slate-400"
                                >
                                    <X className="w-5 h-5" />
                                </button>
                            </div>
                            <div className="flex-1 overflow-y-auto p-8 font-mono text-sm leading-relaxed text-slate-600 dark:text-white/60 custom-scrollbar">
                                <div className="whitespace-pre-wrap">
                                    {privacyPolicy || "Privacy policy content not available."}
                                </div>
                            </div>
                            <div className="p-6 bg-slate-100 dark:bg-white/[0.02] border-t border-slate-600/10 dark:border-white/5 text-center">
                                <button
                                    onClick={() => setShowPrivacy(false)}
                                    className="px-8 py-3 bg-slate-900 dark:bg-white text-white dark:text-black font-bold rounded-xl transition-all hover:scale-105"
                                >
                                    I understand
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
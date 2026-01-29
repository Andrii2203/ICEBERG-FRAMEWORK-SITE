"use client";

import { useCallback, useEffect, useState } from "react";
import {
  Upload,
  CheckCircle,
  AlertOctagon,
  RefreshCw,
  Lock,
} from "lucide-react";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { useSearchParams } from "next/navigation";
import { cn } from "@/shared/utils/cn";
import { Dictionary } from "@/domain/i18n/types";
import styles from "./AuditClient.module.scss";

export interface DetectionResult {
  type: "ui" | "chaos" | "non-ui" | "error";
  message?: string;
  confidence?: number;
}

interface AuditClientProps {
  featureDict: Dictionary["audit"];
}

export function AuditClient({ featureDict }: AuditClientProps) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const status = searchParams.get("status");

  const [preview, setPreview] = useState<string | null>(null);
  const [step, setStep] = useState<
    "upload" | "detecting" | "recovering" | "result"
  >("upload");
  const [detection, setDetection] = useState<DetectionResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasRecovered, setHasRecovered] = useState(false);
  const [recoveryMessage, setRecoveryMessage] = useState("");

  const handleFullAudit = useCallback(
    async (imageBase64: string, stripeSessionId?: string) => {
      setLoading(true);
      try {
        const res = await fetch("/api/analyze-ui", {
          method: "POST",
          body: JSON.stringify({
            imageBase64,
            sessionId: stripeSessionId,
            auditType: "ui",
          }),
        });
        const data = await res.json();

        if (data.status === "success" && data.zipBase64) {
          const link = document.createElement("a");
          link.href = `data:application/zip;base64,${data.zipBase64}`;
          link.download = `ICEBERG_AUDIT_${new Date().getTime()}.zip`;
          link.click();

          sessionStorage.removeItem("audit_image");
          window.history.replaceState({}, "", window.location.pathname);
          setPreview(null);
          setDetection(null);
          setStep("upload");
        } else {
          alert(data.message || "Audit analysis failed");
          sessionStorage.removeItem("audit_image");
          window.history.replaceState({}, "", window.location.pathname);
          setStep("upload");
        }
      } catch (_err) {
        alert("Network error during analysis");
      } finally {
        setLoading(false);
      }
    },
    [],
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/*": [] },
    multiple: false,
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
            setDetection({
              type: "non-ui",
              message: featureDict.errors?.nonUi || "Non-UI Detected",
            });
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
      if (
        sessionId &&
        status === "success" &&
        step === "upload" &&
        !hasRecovered
      ) {
        setHasRecovered(true);
        setStep("recovering");
        setLoading(true);

        try {
          setRecoveryMessage("Verifying payment...");
          const verifyRes = await fetch(
            `/api/audit/verify?session_id=${sessionId}`,
          );
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
          setRecoveryMessage(
            featureDict.status?.analyzing || "Deep AI Audit Active...",
          );
          await handleFullAudit(storedImage, sessionId);
        } else {
          window.history.replaceState({}, "", window.location.pathname);
          setStep("upload");
          setLoading(false);
        }
      }
    };
    recoverSession();
  }, [
    sessionId,
    status,
    step,
    hasRecovered,
    handleFullAudit,
    featureDict.status?.analyzing,
  ]);

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
            break;
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
        body: JSON.stringify({
          action: "create_session",
          origin: window.location.origin,
        }),
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

  const handleReplace = () => {
    setPreview(null);
    setStep("upload");
    setDetection(null);
    sessionStorage.removeItem("audit_image");
  };

  const handleRetry = () => {
    setPreview(null);
    setStep("upload");
    setDetection(null);
  };

  return (
    <div className={styles.root}>
      <div className={styles.header}>
        <h1 className={styles.title}>{featureDict.title}</h1>
        <p className={styles.description}>{featureDict.description}</p>
      </div>

      <div className={styles.dashboard}>
        <div className={styles.dashboardBg} />
        <div className={styles.dashboardLine} />

        <div {...getRootProps()} className={styles.split}>
          <div className={styles.uploadPane}>
            <div className={styles.uploadPaneInner}>
              <input {...getInputProps()} />
              <div className={styles.leftPanel}>
                <div className={styles.panelLabelRow}>
                  <div className={styles.panelDot} />
                  <span className={styles.panelLabelText}>
                    {step === "upload" ? "Awaiting Input" : "Visual Context"}
                  </span>
                </div>

                <div className={styles.previewBox}>
                  {!preview ?
                    <div key="placeholder" className={styles.placeholder}>
                      <div className={styles.placeholderIconWrap}>
                        <Upload className={styles.placeholderIcon} />
                      </div>
                      <span className={styles.placeholderText}>No Image</span>
                    </div>
                  : <div key="image" className={styles.imageWrap}>
                      <Image
                        src={preview}
                        alt="Context"
                        fill
                        className={styles.imageCover}
                      />
                      <div className={styles.imageOverlay} />
                      <div className={styles.statusBadgeWrap}>
                        {detection && (
                          <span className={styles.statusBadge}>
                            {detection.type}
                          </span>
                        )}
                      </div>
                    </div>
                  }

                  {loading && (
                    <div className={styles.loadingOverlay}>
                      <div className={styles.loadingGlow} />
                      <RefreshCw className={styles.loadingIcon} />
                      <span className={styles.loadingText}>
                        Deep Intelligence Active
                      </span>
                    </div>
                  )}
                </div>

                {preview && !loading && (
                  <button
                    type="button"
                    onClick={handleReplace}
                    className={styles.replaceButton}
                  >
                    <RefreshCw className={styles.replaceButtonIcon} />
                    Replace Input
                  </button>
                )}
              </div>

              <div className={styles.rightPanel}>
                {step === "upload" && (
                  <div className={styles.spaceY6}>
                    <div className={styles.spaceY3}>
                      <h3 className={styles.uploadTitle}>
                        {featureDict.form.uploadLabel}
                      </h3>
                      <p className={styles.uploadDesc}>
                        Drop your interface screenshot here. Our AI will analyze
                        UX metrics, visual balance, and code mapping.
                      </p>
                    </div>
                  </div>
                )}

                {step === "recovering" && (
                  <div className={styles.recoveringPane}>
                    <div className={styles.recoveringIconWrap}>
                      <RefreshCw className={styles.recoveringIcon} />
                      <div className={styles.recoveringBlur} />
                    </div>
                    <div className={styles.spaceY3}>
                      <h3 className={styles.recoveringTitle}>
                        Resuming Session
                      </h3>
                      <p className={styles.recoveringMessage}>
                        {recoveryMessage}
                      </p>
                    </div>
                  </div>
                )}

                {step === "result" && detection && (
                  <div className={styles.resultPane}>
                    {detection.type === "ui" ?
                      <>
                        <div className={styles.spaceY4}>
                          <div className={styles.successBadge}>
                            Analysis Complete
                          </div>
                          <h3 className={styles.successTitle}>
                            Interface Verified
                          </h3>
                          <p className={styles.successDesc}>
                            Our 6-vector analysis engine is ready to generate
                            your full documentation package.
                          </p>
                        </div>

                        <div className={styles.card}>
                          <div className={styles.cardHeader}>
                            <div className={styles.spaceY1}>
                              <h4 className={styles.cardTitle}>
                                Iceberg Pro Audit
                              </h4>
                              <p className={styles.cardSubtitle}>
                                One-time payment
                              </p>
                            </div>
                            <div className={styles.cardPrice}>29€</div>
                          </div>

                          <ul className={styles.cardList}>
                            {[
                              "ZIP-Package",
                              "Code Mapping",
                              "UX Analysis",
                              "Claude 4.5",
                            ].map((item, idx) => (
                              <li key={idx} className={styles.cardListItem}>
                                <CheckCircle className={styles.cardCheck} />
                                {item}
                              </li>
                            ))}
                          </ul>

                          <button
                            type="button"
                            onClick={startPaidAudit}
                            disabled={loading}
                            className={styles.submitButton}
                          >
                            {loading ?
                              <RefreshCw
                                className={cn(
                                  styles.submitButtonIcon,
                                  styles.iconSpin,
                                )}
                              />
                            : <Lock className={styles.submitButtonIcon} />}
                            {featureDict.form.submitButton}
                          </button>

                          <div className={styles.cardGlow} />
                        </div>
                      </>
                    : <div className={styles.resultPane}>
                        <div className={styles.errorIconWrap}>
                          <AlertOctagon className={styles.errorIcon} />
                        </div>
                        <div className={styles.spaceY4}>
                          <h3 className={styles.errorTitle}>
                            Detection Failed
                          </h3>
                          <p className={styles.errorMessage}>
                            {detection.message ||
                              "We couldn't identify a valid user interface in this image."}
                          </p>
                        </div>
                        <button
                          type="button"
                          onClick={handleRetry}
                          className={styles.retryButton}
                        >
                          <Upload className={styles.retryButtonIcon} />
                          Try different image
                        </button>
                      </div>
                    }
                  </div>
                )}
              </div>

              <div
                className={cn(
                  styles.dropOverlay,
                  isDragActive && styles.dropOverlayActive,
                )}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

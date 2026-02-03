
"use client";

import { useState } from "react";
import { Loader2, CreditCard } from "lucide-react";

interface StripeCheckoutButtonProps {
    product: "solo" | "agency";
    label: string;
    className?: string;
}

export function StripeCheckoutButton({ product, label, className = "" }: StripeCheckoutButtonProps) {
    const [loading, setLoading] = useState(false);

    const handleCheckout = async () => {
        setLoading(true);
        try {
            const response = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    product,
                    origin: window.location.origin,
                }),
            });

            const data = await response.json();
            if (data.status === "success" && data.url) {
                window.location.href = data.url;
            } else {
                alert(data.message || "Failed to start checkout");
            }
        } catch (error) {
            console.error("Checkout error:", error);
            alert("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleCheckout}
            disabled={loading}
            className={`flex items-center justify-center gap-2 py-4 px-8 rounded-full font-bold transition-all duration-300 transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {loading ? (
                <Loader2 className="w-5 h-5 animate-spin" />
            ) : (
                <CreditCard className="w-5 h-5" />
            )}
            {label}
        </button>
    );
}

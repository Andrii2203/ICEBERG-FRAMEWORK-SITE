
import Stripe from "stripe";
import { config } from "@/config/env";
import { IcebergError } from "@/domain/errors/IcebergError";

export class StripeService {
  private stripe: Stripe;

  constructor() {
    // Initialize Stripe with secret key
    if (!config.stripe.secretKey) {
      console.warn("Stripe Secret Key is missing. Payments will fail.");
    }
    this.stripe = new Stripe(config.stripe.secretKey || "sk_test_placeholder", {
      apiVersion: "2025-12-15.clover",
      typescript: true,
    });
  }

  /**
   * Creates a Checkout Session for the Paid Audit.
   */
  async createAuditSession(origin: string): Promise<string> {
    console.log("[StripeService] Creating checkout session for origin:", origin);
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: config.stripe.priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}/audit?session_id={CHECKOUT_SESSION_ID}&status=success`,
        cancel_url: `${origin}/audit?status=cancelled`,
        metadata: {
          type: "audit_full",
        },
      });

      if (!session.url) throw new Error("Failed to generate session URL");
      return session.url;
    } catch (error) {
      throw new IcebergError("stripe-error", "Failed to create checkout session", error);
    }
  }

  /**
   * Verifies if a session is paid.
   */
  async verifySessionPaid(sessionId: string): Promise<boolean> {
    console.log("[StripeService] Verifying payment for session:", sessionId);
    try {
      const session = await this.stripe.checkout.sessions.retrieve(sessionId);
      console.log("[StripeService] Session payment status:", session.payment_status);
      return session.payment_status === "paid";
    } catch {
      // If session not found or error, return false
      return false;
    }
  }
}









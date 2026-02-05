
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
      apiVersion: "2026-01-28.clover",
      typescript: true,
    });
  }

  /**
   * Creates a Checkout Session for any Iceberg product.
   */
  async createCheckoutSession(origin: string, priceId: string, metadata: Record<string, string>, successPath: string = "/success"): Promise<string> {
    console.log("[StripeService] Creating checkout session for price:", priceId, "metadata:", metadata);
    try {
      const session = await this.stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        line_items: [
          {
            price: priceId,
            quantity: 1,
          },
        ],
        mode: "payment",
        success_url: `${origin}${successPath}?session_id={CHECKOUT_SESSION_ID}&status=success`,
        cancel_url: `${origin}/`,
        metadata: metadata,
        custom_fields: [
          {
            key: "marketing_opt_in",
            label: {
              type: "custom",
              custom: "Receive news and product updates",
            },
            type: "dropdown",
            optional: true,
            dropdown: {
              options: [
                { value: "yes", label: "Yes" },
                { value: "no", label: "No" },
              ],
            },
          },
        ],

      });

      if (!session.url) throw new Error("Failed to generate session URL");
      return session.url;
    } catch (error) {
      throw new IcebergError("stripe-error", "Failed to create checkout session", error);
    }
  }

  /**
   * @deprecated Use createCheckoutSession instead
   */
  async createAuditSession(origin: string): Promise<string> {
    // Redirect to /audit after payment success
    return this.createCheckoutSession(origin, config.stripe.priceId, { type: "audit_full" }, "/audit");
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









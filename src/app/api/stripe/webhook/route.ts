
import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { config } from "@/core/config/env";
import { headers } from "next/headers";

const stripe = new Stripe(config.stripe.secretKey || "", {
  apiVersion: "2025-12-15.clover",
  typescript: true,
});

export async function POST(req: NextRequest) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature") as string;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      config.stripe.webhookSecret || ""
    );
  } catch {
    return NextResponse.json({ status: "error", message: "Webhook signature verification failed" }, { status: 400 });
  }

  // Handle successful checkout session
  if (event.type === "checkout.session.completed") {
    // const session = event.data.object as Stripe.Checkout.Session;
    // In a full production system, we would trigger an asynchronous job here
    // to process the audit if it wasn't instant, or update a database.
    // For this MVP, the client polls /api/analyze-ui with the session_id so we just rely on Stripe's state.
  }

  return NextResponse.json({ status: "success" });
}

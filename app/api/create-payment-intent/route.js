// app/api/create-payment-intent/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const { amount, currency = "aud", customerDetails } = await request.json();

    // Validate the amount
    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    // Convert amount to cents (Stripe requires amounts in cents)
    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Create Payment Intent
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amountInCents,
      currency,
      receipt_email: customerDetails?.email,
      metadata: {
        customerName:
          `${customerDetails?.firstName || ""} ${customerDetails?.lastName || ""}`.trim(),
        customerEmail: customerDetails?.email || "",
        customerPhone: customerDetails?.phone || "",
        customerAddress: customerDetails?.address || "",
        customerSuburb: customerDetails?.suburb || "",
        cleaningType: customerDetails?.cleaningType || "",
        frequency: customerDetails?.frequency || "",
      },
      automatic_payment_methods: {
        enabled: true,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: error.message || "Payment processing failed" },
      { status: 500 }
    );
  }
}

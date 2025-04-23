// app/api/create-payment-intent/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const {
      amount,
      currency = "aud",
      customerDetails,
      cleaningDetails,
    } = await request.json();

    // Validate inputs
    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json(
        { error: "A valid payment amount is required" },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);
    const frequency = cleaningDetails?.frequency?.toLowerCase() || "once";

    // Common metadata
    const metadata = {
      customerName:
        `${customerDetails?.firstName || ""} ${customerDetails?.lastName || ""}`.trim(),
      customerEmail: customerDetails?.email || "",
      customerPhone: customerDetails?.phone || "",
      customerAddress: customerDetails?.address || "",
      customerSuburb: customerDetails?.suburb || "",
      cleaningType: cleaningDetails?.type || "standard",
      frequency,
    };

    console.log("frequency", frequency);
    // Handle one-time payment
    if (frequency === "once") {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        metadata,
        automatic_payment_methods: { enabled: true },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentType: "one_time",
      });
    }

    // Handle subscription payment
    const intervalSettings = {
      weekly: { interval: "week", interval_count: 1 },
      fortnightly: { interval: "week", interval_count: 2 },
      monthly: { interval: "month", interval_count: 1 },
    };

    const intervalConfig = intervalSettings[frequency];
    if (!intervalConfig) {
      return NextResponse.json(
        { error: "Invalid subscription frequency" },
        { status: 400 }
      );
    }

    // Create or retrieve customer
    let customer;
    try {
      const existingCustomers = await stripe.customers.list({
        email: customerDetails.email,
        limit: 1,
      });

      customer =
        existingCustomers.data[0] ||
        (await stripe.customers.create({
          email: customerDetails.email,
          name: metadata.customerName,
          phone: metadata.customerPhone,
          metadata,
        }));

      console.log("Stripe customer created or retrieved:", customer);
    } catch (err) {
      console.error("Customer creation failed:", err);
      throw new Error("We couldn't set up your account. Please try again.");
    }

    // Create product and price
    const product = await stripe.products.create({
      name: `Home Cleaning (${frequency})`,
      metadata: {
        serviceType: "cleaning",
        bedrooms: cleaningDetails?.bedrooms?.toString() || "0",
        bathrooms: cleaningDetails?.bathrooms?.toString() || "0",
      },
    });
    console.log("Stripe product created:", product);

    // Create price with recurring setting
    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amountInCents,
      currency,
      recurring: intervalConfig,
    });
    console.log("Stripe price created:", price);

    // Create subscription with immediate payment
    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: {
        payment_method_types: ["card"],
        save_default_payment_method: "on_subscription",
      },
      metadata,
    });

    console.log("Stripe subscription created:", subscription);

    // Retrieve the invoice separately
    const invoice = await stripe.invoices.retrieve(subscription.latest_invoice);
    console.log("Stripe invoice retrieved:", invoice);

    // Check if invoice has payment intent, if n
    // If invoice doesn't have payment intent, create one manually
    if (!invoice.payment_intent) {
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        customer: customer.id,
        payment_method_types: ["card"],
        metadata: {
          ...metadata,
          subscription_id: subscription.id,
          invoice_id: invoice.id,
        },
      });

      // Update the invoice with the payment intent
      await stripe.invoices.update(invoice.id, {
        payment_settings: {
          payment_method_types: ["card"],
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        paymentType: "subscription",
        subscriptionId: subscription.id,
        customerId: customer.id,
      });
    }

    // If invoice already has payment intent, use that
    const expandedInvoice = await stripe.invoices.retrieve(
      subscription.latest_invoice,
      {
        expand: ["payment_intent"],
      }
    );

    return NextResponse.json({
      clientSecret: expandedInvoice.payment_intent.client_secret,
      paymentType: "subscription",
      subscriptionId: subscription.id,
      customerId: customer.id,
    });
  } catch (error) {
    console.error("Payment processing error:", error);
    return NextResponse.json(
      {
        error: error.message || "Payment processing failed",
        code: error.type || "payment_error",
      },
      { status: 500 }
    );
  }
}

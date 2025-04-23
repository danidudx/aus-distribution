// app/api/create-payment-intent/route.js
import { NextResponse } from "next/server";
import Stripe from "stripe";

const formatPhoneNumber = (phone) => {
  if (!phone) return undefined;
  const cleaned = phone.replace(/[^0-9+]/g, "");

  if (cleaned.startsWith("+61")) return cleaned;
  if (cleaned.startsWith("61")) return `+${cleaned}`;
  if (cleaned.startsWith("0")) return `+61${cleaned.slice(1)}`;
  if (cleaned.length === 9) return `+61${cleaned}`;
  return undefined;
};

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// Create customer object with proper formatting
const createCustomer = async (customerDetails) => {
  return await stripe.customers.create({
    email: customerDetails?.email,
    name:
      `${customerDetails?.firstName || ""} ${customerDetails?.lastName || ""}`.trim() ||
      "Customer",
    ...(formatPhoneNumber(customerDetails?.phone) && {
      phone: formatPhoneNumber(customerDetails.phone),
    }),
    ...(customerDetails?.address?.trim() && {
      address: {
        line1: customerDetails.address.split(",")[0]?.trim(),
        ...(customerDetails?.suburb && { city: customerDetails.suburb }),
        country: "AU",
        ...(customerDetails?.postcode && {
          postal_code: customerDetails.postcode.toString().replace(/\s+/g, ""),
        }),
      },
    }),
  });
};

export async function POST(request) {
  try {
    const {
      amount,
      currency = "aud",
      customerDetails,
      cleaningDetails,
    } = await request.json();

    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    const amountInCents = Math.round(parseFloat(amount) * 100);
    const frequency = cleaningDetails.frequency.toLowerCase();

    if (frequency === "once") {
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
          cleaningType: cleaningDetails?.type || "",
          frequency,
        },
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return NextResponse.json({ clientSecret: paymentIntent.client_secret });
    }

    const intervalMap = {
      weekly: { interval: "week", interval_count: 1 },
      fortnightly: { interval: "week", interval_count: 2 },
      monthly: { interval: "month", interval_count: 1 },
    };

    const { interval, interval_count } = intervalMap[frequency] || {};
    if (!interval) {
      return NextResponse.json(
        { error: "Invalid frequency specified" },
        { status: 400 }
      );
    }

    const product = await stripe.products.create({
      name: `Cleaning Service - ${frequency.charAt(0).toUpperCase() + frequency.slice(1)}`,
      type: "service",
    });

    const price = await stripe.prices.create({
      product: product.id,
      unit_amount: amountInCents,
      currency,
      recurring: {
        interval,
        interval_count,
      },
    });

    let customer;
    try {
      customer = await createCustomer(customerDetails);
    } catch (error) {
      console.error("Error creating customer:", error);
      return NextResponse.json(
        { error: "Failed to create customer" },
        { status: 500 }
      );
    }

    const subscription = await stripe.subscriptions.create({
      customer: customer.id,
      items: [{ price: price.id }],
      payment_behavior: "default_incomplete",
      payment_settings: { payment_method_types: ["card"] },
      expand: ["latest_invoice.payment_intent"],
      metadata: {
        cleaningType: cleaningDetails?.type || "",
        frequency,
      },
    });

    if (!subscription.latest_invoice?.payment_intent) {
      throw new Error("Failed to create payment intent for subscription");
    }

    return NextResponse.json({
      clientSecret: subscription.latest_invoice.payment_intent.client_secret,
      subscriptionId: subscription.id,
    });
  } catch (error) {
    console.error("Error creating payment intent:", error);
    return NextResponse.json(
      { error: error.message || "Payment processing failed" },
      { status: 500 }
    );
  }
}

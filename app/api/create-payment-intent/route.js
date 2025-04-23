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

    // Validate the amount
    if (!amount || isNaN(parseFloat(amount))) {
      return NextResponse.json(
        { error: "Valid amount is required" },
        { status: 400 }
      );
    }

    // Convert amount to cents (Stripe requires amounts in cents)
    const amountInCents = Math.round(parseFloat(amount) * 100);

    // Common metadata for both payment types
    const metadata = {
      customerName:
        `${customerDetails?.firstName || ""} ${customerDetails?.lastName || ""}`.trim(),
      customerEmail: customerDetails?.email || "",
      customerPhone: customerDetails?.phone || "",
      customerAddress: customerDetails?.address || "",
      customerSuburb: customerDetails?.suburb || "",
      cleaningType: cleaningDetails?.type || "",
      frequency: cleaningDetails?.frequency || "",
    };

    // Check if this is a subscription (weekly, fortnightly, monthly) or one-time payment
    const frequency = cleaningDetails?.frequency?.toLowerCase();
    const isSubscription =
      frequency === "weekly" ||
      frequency === "fortnightly" ||
      frequency === "monthly";

    if (isSubscription) {
      // Create or retrieve a customer
      let customer;
      const existingCustomers = await stripe.customers.list({
        email: customerDetails.email,
        limit: 1,
      });

      if (existingCustomers.data.length > 0) {
        customer = existingCustomers.data[0];

        // Update customer metadata if needed
        if (
          customer.metadata.customerPhone !== metadata.customerPhone ||
          customer.metadata.customerAddress !== metadata.customerAddress ||
          customer.metadata.customerSuburb !== metadata.customerSuburb
        ) {
          await stripe.customers.update(customer.id, {
            metadata,
            phone: customerDetails?.phone,
          });
        }
      } else {
        customer = await stripe.customers.create({
          email: customerDetails.email,
          name: `${customerDetails?.firstName || ""} ${customerDetails?.lastName || ""}`.trim(),
          phone: customerDetails?.phone,
          metadata,
        });
      }

      // Check if customer already has an active subscription for this service
      const existingSubscriptions = await stripe.subscriptions.list({
        customer: customer.id,
        status: "active",
        limit: 100,
      });

      // Look for a subscription with matching metadata
      const matchingSubscription = existingSubscriptions.data.find(
        (sub) =>
          sub.metadata.cleaningType === metadata.cleaningType &&
          sub.metadata.frequency === metadata.frequency
      );

      // If a matching subscription exists, return its details
      if (matchingSubscription) {
        // Retrieve the latest invoice to get the payment intent
        const latestInvoice = await stripe.invoices.retrieve(
          matchingSubscription.latest_invoice,
          {
            expand: ["payment_intent"],
          }
        );

        return NextResponse.json({
          clientSecret: latestInvoice.payment_intent?.client_secret,
          subscriptionId: matchingSubscription.id,
          isSubscription: true,
          existingSubscription: true,
        });
      }

      // Create a product for this cleaning service if it doesn't exist
      const productName = `${cleaningDetails.type} - ${cleaningDetails.bedrooms} bedrooms, ${cleaningDetails.bathrooms} bathrooms`;
      let product;

      try {
        // Try to find an existing product that matches our criteria
        const products = await stripe.products.list({
          active: true,
          limit: 100,
        });

        // Find a product that matches our cleaning details
        product = products.data.find(
          (p) =>
            p.metadata.type === cleaningDetails.type &&
            p.metadata.bedrooms == cleaningDetails.bedrooms &&
            p.metadata.bathrooms == cleaningDetails.bathrooms
        );

        // If no matching product found, create a new one
        if (!product) {
          throw new Error("No matching product found");
        }
      } catch (error) {
        // Create a new product
        product = await stripe.products.create({
          name: productName,
          metadata: {
            type: cleaningDetails.type,
            bedrooms: cleaningDetails.bedrooms.toString(),
            bathrooms: cleaningDetails.bathrooms.toString(),
          },
        });
      }

      // Determine the billing interval based on frequency
      let interval;
      let interval_count = 1;
      switch (frequency) {
        case "weekly":
          interval = "week";
          break;
        case "fortnightly":
          interval = "week";
          // For fortnightly, we'll use a 2-week interval
          interval_count = 2;
          break;
        case "monthly":
          interval = "month";
          break;
        default:
          interval = "month";
      }

      // Create a price for the subscription
      const price = await stripe.prices.create({
        product: product.id,
        unit_amount: amountInCents,
        currency,
        recurring: {
          interval,
          interval_count: frequency === "fortnightly" ? 2 : 1,
        },
        metadata,
      });

      // Create the subscription
      const subscription = await stripe.subscriptions.create({
        customer: customer.id,
        items: [{ price: price.id }],
        payment_behavior: "default_incomplete",
        payment_settings: {
          payment_method_types: ["card"],
          save_default_payment_method: "on_subscription",
        },
        metadata,
        expand: ["latest_invoice.payment_intent"],
      });

      // Return the client secret from the invoice's payment intent
      return NextResponse.json({
        clientSecret: subscription.latest_invoice.payment_intent.client_secret,
        subscriptionId: subscription.id,
        isSubscription: true,
      });
    } else {
      // For one-time payments, create a regular payment intent
      const paymentIntent = await stripe.paymentIntents.create({
        amount: amountInCents,
        currency,
        receipt_email: customerDetails?.email,
        metadata,
        automatic_payment_methods: {
          enabled: true,
        },
      });

      return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        isSubscription: false,
      });
    }
  } catch (error) {
    console.error("Error creating payment intent or subscription:", error);
    return NextResponse.json(
      { error: error.message || "Payment processing failed" },
      { status: 500 }
    );
  }
}

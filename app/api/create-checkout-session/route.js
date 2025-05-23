import { NextResponse } from "next/server";
import Stripe from "stripe";

const generateProductDescription = (cleaningDetails, subscriptionFrequency) => {
  const frequency =
    subscriptionFrequency === "once" ? "One-time" : subscriptionFrequency;
  return `${cleaningDetails.type} - ${frequency} Service`;
};

export async function POST(request) {
  try {
    const {
      amount,
      customerDetails,
      cleaningDetails = {},
      subscriptionFrequency = "once",
    } = await request.json();

    // Validate and round the amount
    if (!amount || isNaN(amount)) {
      return NextResponse.json(
        { message: "Invalid amount provided" },
        { status: 400 }
      );
    }

    // Ensure amount is a positive integer in cents
    const validatedAmount = Math.max(0, Math.round(amount));
    if (validatedAmount <= 0) {
      return NextResponse.json(
        { message: "Amount must be greater than 0" },
        { status: 400 }
      );
    }

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const isSubscription =
      subscriptionFrequency === "weekly" ||
      subscriptionFrequency === "fortnightly" ||
      subscriptionFrequency === "monthly";

    // Create a new product based on cleaning details
    const productDescription = generateProductDescription(
      cleaningDetails,
      subscriptionFrequency
    );

    const product = await stripe.products.create({
      name: productDescription,
      description: `${cleaningDetails.type} cleaning service${isSubscription ? ` with ${subscriptionFrequency} frequency` : ""}`,
      metadata: {
        cleaning_type: cleaningDetails.type,
        frequency: subscriptionFrequency,
      },
    });

    const baseSessionParams = {
      ui_mode: "embedded",
      payment_method_types: ["card"],
      customer_email: customerDetails?.email,
      metadata: {
        customerDetails: JSON.stringify(customerDetails),
        cleaningDetails: JSON.stringify(cleaningDetails),
        subscriptionFrequency: subscriptionFrequency,
        totalAmount: amount.toString(), // Stripe metadata only allows strings
      },
      allow_promotion_codes: true,
      redirect_on_completion: "if_required",
    };

    let session;

    if (isSubscription) {
      // Subscription parameters
      // Create a price for the subscription
      const price = await stripe.prices.create({
        product: product.id,
        currency: "aud",
        unit_amount: validatedAmount,
        recurring: {
          interval:
            subscriptionFrequency === "weekly"
              ? "week"
              : subscriptionFrequency === "fortnightly"
                ? "week"
                : "month",
          interval_count: subscriptionFrequency === "fortnightly" ? 2 : 1,
        },
      });

      const subscriptionParams = {
        ...baseSessionParams,
        mode: "subscription",
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
      };

      session = await stripe.checkout.sessions.create(subscriptionParams);
    } else {
      // One-time payment parameters
      // Create a one-time price
      const price = await stripe.prices.create({
        product: product.id,
        currency: "aud",
        unit_amount: validatedAmount,
      });

      const paymentParams = {
        ...baseSessionParams,
        mode: "payment",
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
      };

      session = await stripe.checkout.sessions.create(paymentParams);
    }

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

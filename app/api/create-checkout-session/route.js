import { NextResponse } from "next/server";
import Stripe from "stripe";

export async function POST(request) {
  try {
    const { amount } = await request.json();
    console.log("amount", amount);

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    const session = await stripe.checkout.sessions.create({
      ui_mode: "embedded",
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "usd", // or "aud", etc.
            product_data: {
              name: "House Cleaning Service",
            },
            unit_amount: amount, // amount in cents (e.g., 1999 = $19.99)
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      allow_promotion_codes: true,
      return_url: `${request.headers.get("origin")}/return?session_id={CHECKOUT_SESSION_ID}`,
    });

    return NextResponse.json({
      id: session.id,
      client_secret: session.client_secret,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}

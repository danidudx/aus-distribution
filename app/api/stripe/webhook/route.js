import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(req) {
  const sig = req.headers.get("stripe-signature");
  const body = await req.text(); // Important: get raw body for webhook signature verification

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error(`❌ Webhook signature verification failed: ${err.message}`);
    return NextResponse.json(
      { error: `Webhook Error: ${err.message}` },
      { status: 400 }
    );
  }

  // Handle the event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;

    console.log(`✅ Payment successful for session: ${session.id}`);

    try {
      // Parse data from metadata
      const customerDetails = JSON.parse(session.metadata.customerDetails);
      const cleaningDetails = JSON.parse(session.metadata.cleaningDetails);
      const subscriptionFrequency = session.metadata.subscriptionFrequency;
      const totalAmount = parseFloat(session.metadata.totalAmount);

      // Save booking
      console.log("📦 Saving booking...");
      const saveBookingResponse = await fetch(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/save-booking`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerDetails,
            cleaningDetails,
            paymentDetails: {
              stripeSessionId: session.id,
              amount: totalAmount,
            },
          }),
        }
      );

      const saveBookingResult = await saveBookingResponse.json();

      if (!saveBookingResponse.ok || !saveBookingResult.success) {
        throw new Error("Failed to save booking to database");
      }

      const bookingReference = saveBookingResult.bookingId || "unknown"; // adjust if needed

      // Send confirmation email
      console.log("📧 Sending confirmation email...");
      await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-email`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails,
          cleaningDetails,
          paymentDetails: {
            bookingReference,
            amount: totalAmount,
            status: "completed",
            stripeSessionId: session.id,
          },
        }),
      });

      console.log("✅ Booking saved and confirmation email sent!");
    } catch (err) {
      console.error(`❌ Error processing completed session: ${err.message}`);
      return NextResponse.json(
        { error: `Internal error: ${err.message}` },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

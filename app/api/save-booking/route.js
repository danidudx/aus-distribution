import { client } from "@/sanity/lib/client";
import { v4 as uuidv4 } from "uuid";

export async function POST(request) {
  try {
    const bookingData = await request.json();

    // Generate unique booking reference
    const bookingReference = `AUSI-${uuidv4().substring(0, 8).toUpperCase()}`;

    // Prepare payment details with subscription information if available
    const paymentDetails = {
      bookingReference,
      stripePaymentId: bookingData.paymentDetails.stripePaymentId,
      discountCode: bookingData.paymentDetails.discountCode,
      paymentStatus: "completed",
      paymentDate: new Date().toISOString(),
    };

    // Add subscription details if this is a subscription booking
    if (bookingData.paymentDetails.subscriptionId) {
      paymentDetails.isSubscription = true;
      paymentDetails.subscriptionId = bookingData.paymentDetails.subscriptionId;
      paymentDetails.billingFrequency = bookingData.cleaningDetails.frequency;
    }

    // Create a new booking document in Sanity
    const result = await client.create({
      _type: "booking",
      customerDetails: {
        firstName: bookingData.customerDetails.firstName,
        lastName: bookingData.customerDetails.lastName,
        email: bookingData.customerDetails.email,
        phone: bookingData.customerDetails.phone,
        address: bookingData.customerDetails.address,
        suburb: bookingData.customerDetails.suburb,
        instructions: bookingData.customerDetails.instructions,
        parking: bookingData.customerDetails.parking,
      },
      cleaningDetails: {
        serviceType: bookingData.cleaningDetails.serviceType,
        propertyType: bookingData.cleaningDetails.propertyType,
        bedrooms: bookingData.cleaningDetails.bedrooms,
        bathrooms: bookingData.cleaningDetails.bathrooms,
        date: bookingData.cleaningDetails.date,
        time: bookingData.cleaningDetails.time,
        totalPrice: bookingData.cleaningDetails.totalPrice,
        extras: bookingData.cleaningDetails.extras,
        frequency: bookingData.cleaningDetails.frequency,
      },
      paymentDetails,
      createdAt: new Date().toISOString(),
    });

    return Response.json({ success: true, bookingId: result._id });
  } catch (error) {
    console.error("Error saving booking:", error);
    return Response.json(
      { success: false, error: "Failed to save booking" },
      { status: 500 }
    );
  }
}

import { NextResponse } from "next/server";
import { sendBookingEmail } from "@/lib/nodemailer";

export async function POST(request) {
  try {
    const bookingData = await request.json();

    if (
      !bookingData.customerDetails ||
      !bookingData.cleaningDetails ||
      !bookingData.paymentDetails
    ) {
      return NextResponse.json(
        { error: "Missing required booking information" },
        { status: 400 }
      );
    }

    const emailResult = await sendBookingEmail(bookingData);

    if (!emailResult.success) {
      return NextResponse.json(
        { error: "Failed to send email notification" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "Booking confirmation email sent successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error in email API route:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

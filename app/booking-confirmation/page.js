"use client";

import { useEffect, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

// Component that uses useSearchParams
function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const [paymentStatus, setPaymentStatus] = useState("success"); // Default to success

  useEffect(() => {
    // Check for payment_intent and payment_intent_client_secret in URL
    const paymentIntent = searchParams.get("payment_intent");
    const paymentIntentClientSecret = searchParams.get(
      "payment_intent_client_secret"
    );

    // If we have these parameters, we can verify the payment status
    // In a real app, you might want to verify this with your backend
    if (paymentIntent && paymentIntentClientSecret) {
      // For now, we'll just assume success if we have these parameters
      setPaymentStatus("success");
    }
  }, [searchParams]);

  return (
    <div className="bg-[#fffae7] min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4">
        <div className="bg-white rounded-3xl border-4 border-[#0B2F3D] p-8 md:p-12 text-center">
          {paymentStatus === "success" ? (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-green-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0B2F3D] font-[Tropiline] mb-6">
                Booking Confirmed!
              </h1>
              <p className="text-xl md:text-2xl text-[#0B2F3D] font-[Montserrat] mb-8">
                Thank you for booking with AusiWipe. Your payment has been
                processed successfully.
              </p>
              <p className="text-lg text-[#0B2F3D] font-[Montserrat] mb-4">
                We&apos;ve sent a confirmation email with all the details of
                your booking.
              </p>
              <p className="text-lg text-[#0B2F3D] font-[Montserrat] mb-8">
                Our team will arrive at the scheduled time. If you need to make
                any changes to your booking, please contact us.
              </p>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 text-red-600"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-[#0B2F3D] font-[Tropiline] mb-6">
                Payment Issue
              </h1>
              <p className="text-xl md:text-2xl text-[#0B2F3D] font-[Montserrat] mb-8">
                There was an issue processing your payment. Please try again or
                contact our support team.
              </p>
            </>
          )}

          <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="bg-[#0B2F3D] text-[#FFC914] py-3 px-8 rounded-full border-2 border-[#FFC914] font-medium text-xl font-[Montserrat] hover:scale-105 transition-transform"
            >
              Return Home
            </Link>
            <Link
              href="/Contact"
              className="bg-[#FFC914] text-[#0B2F3D] py-3 px-8 rounded-full border-2 border-[#0B2F3D] font-medium text-xl font-[Montserrat] hover:scale-105 transition-transform"
            >
              Contact Support
            </Link>
          </div>
        </div>

        <div className="mt-12 text-center">
          <p className="text-[#0B2F3D] font-[Montserrat] text-lg">
            <span className="font-semibold">
              100% Satisfaction Guarantee -{" "}
            </span>
            If you are not completely satisfied with our clean, we will send our
            team back to re-clean or provide a particular refund.
          </p>
        </div>
      </div>
    </div>
  );
}

// Loading fallback for Suspense
function BookingConfirmationLoading() {
  return (
    <div className="bg-[#fffae7] min-h-screen py-20">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className="bg-white rounded-3xl border-4 border-[#0B2F3D] p-8 md:p-12">
          <div className="animate-pulse">
            <div className="w-24 h-24 bg-gray-200 rounded-full mx-auto mb-6"></div>
            <div className="h-10 bg-gray-200 rounded-lg w-3/4 mx-auto mb-6"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-full mx-auto mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-lg w-3/4 mx-auto mb-8"></div>
            <div className="flex flex-col md:flex-row gap-4 justify-center">
              <div className="h-12 bg-gray-200 rounded-full w-40 mx-auto"></div>
              <div className="h-12 bg-gray-200 rounded-full w-40 mx-auto"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Main component that wraps the content with Suspense
export default function BookingConfirmation() {
  return (
    <Suspense fallback={<BookingConfirmationLoading />}>
      <BookingConfirmationContent />
    </Suspense>
  );
}

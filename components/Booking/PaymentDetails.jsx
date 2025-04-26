"use client";

import { useState, useEffect, useCallback } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BookingSummary } from ".";
import { loadStripe } from "@stripe/stripe-js";
import {
  EmbeddedCheckoutProvider,
  EmbeddedCheckout,
} from "@stripe/react-stripe-js";

const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

export default function PaymentDetails({ onPrevious, bookingData }) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [totalCost, setTotalCost] = useState(0);
  const [showCheckout, setShowCheckout] = useState(false);

  // Calculate total cost on mount
  useEffect(() => {
    const calculateCost = async () => {
      try {
        const response = await fetch("/api/calculate-cost", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            cleaningDetails: bookingData.cleaningDetails,
          }),
        });
        const data = await response.json();
        setTotalCost(data.totalCost);
      } catch (err) {
        setError(err.message || "Failed to calculate cost");
      } finally {
        setIsLoading(false);
      }
    };

    calculateCost();
  }, [bookingData]);
  const handleCheckoutClick = async () => {
    try {
      const secret = await fetchClientSecret();
      if (secret) {
        setShowCheckout(true);
      }
    } catch (err) {
      console.error("Checkout initiation failed:", err);
    }
  };

  const fetchClientSecret = useCallback(async () => {
    try {
      const response = await fetch("/api/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: Math.round(totalCost * 100), // Round to nearest integer
          customerDetails: bookingData.customerDetails,
          cleaningDetails: bookingData.cleaningDetails,
          subscriptionFrequency:
            bookingData.cleaningDetails.frequency?.toLowerCase() || "once",
        }),
      });

      const data = await response.json();

      if (!response.ok)
        throw new Error(data.message || "Failed to create checkout session");

      setClientSecret(data.client_secret);
      return data.client_secret;
    } catch (err) {
      setError(err.message || "Something went wrong");
      throw err;
    }
  }, [totalCost, bookingData]);

  const handleCheckoutComplete = async (sessionId) => {
    try {
      // First verify the payment was successful
      const verifyResponse = await fetch("/api/verify-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ sessionId }),
      });

      const paymentData = await verifyResponse.json();
      if (!paymentData.success) {
        throw new Error("Payment verification failed");
      }

      // Save booking data to Sanity
      const saveResponse = await fetch("/api/save-booking", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: bookingData.customerDetails,
          cleaningDetails: bookingData.cleaningDetails,
          paymentDetails: {
            stripeSessionId: sessionId,
            amount: totalCost,
          },
        }),
      });

      const saveResult = await saveResponse.json();
      if (!saveResult.success) {
        throw new Error("Failed to save booking data");
      }

      // Send confirmation email
      await fetch("/api/send-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerDetails: bookingData.customerDetails,
          cleaningDetails: bookingData.cleaningDetails,
          paymentDetails: {
            bookingReference: saveResult.bookingId,
            amount: totalCost,
            status: "completed",
            stripeSessionId: sessionId,
          },
        }),
      });

      // Redirect happens automatically via the success_url from Checkout Session
    } catch (err) {
      console.error("Error completing booking:", err);
      // Redirect to confirmation page with warning
      window.location.href = "/booking-confirmation?warning=1";
    }
  };

  return (
    <div className="bg-[#fffae7] w-full pb-20 xl:pb-40 relative">
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[9999]">
          <div className="bg-white p-8 rounded-xl text-center">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#0B2F3D] mx-auto mb-4"></div>
            <p className="text-[#0B2F3D] font-[Montserrat] text-xl">
              Processing your booking...
            </p>
          </div>
        </div>
      )}
      <div className="w-[90%] mx-auto xl:flex xl:flex-row gap-[10%] justify-center">
        <div className="xl:w-[810px] xl:mt-20 pt-10 xl:pt-0">
          <h2 className="text-3xl md:text-4xl text-center xl:text-left font-bold text-[#0B2F3D] font-[Tropiline] xl:font-extrabold xl:text-[50px] xl:leading-[90px]">
            Book Your Net House Clean
          </h2>

          <img
            src="/assets/Images/ProgressBar3.png"
            alt="ProgressBar"
            className="xl:py-4 xl:px-6 xl:w-[809px] xl:h-[164px] py-4"
          />

          <div className="mt-4">
            <h3 className="xl:font-medium text-[#0B2F3D] font-[Montserrat] xl:text-[32px] text-2xl leading-[150%] mt-4">
              Payment Details
            </h3>

            {error ? (
              <div className="mt-8 text-center">
                <p className="text-red-500 font-[Montserrat] text-xl">
                  {error}
                </p>
                <button
                  onClick={() => window.location.reload()}
                  className="mt-4 bg-[#FFC914] py-2 px-8 rounded-full border-2 border-[#0B2F3D] text-[#0B2F3D] font-medium text-xl"
                >
                  Try Again
                </button>
              </div>
            ) : showCheckout ? (
              <div className="mt-8">
                <EmbeddedCheckoutProvider
                  stripe={stripePromise}
                  options={{ clientSecret }} // instead of fetchClientSecret
                >
                  <EmbeddedCheckout />
                </EmbeddedCheckoutProvider>
              </div>
            ) : (
              <div className="mt-8 space-y-6">
                <div className="flex gap-6 xl:flex-row flex-col">
                  <div className="relative">
                    <img
                      src="/assets/Images/money.png"
                      alt="amount-icon"
                      className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                    />
                    <div className="input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl flex items-center">
                      ${totalCost.toFixed(2)}
                    </div>
                  </div>
                </div>

                <div className="mt-8">
                  <label className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      className="form-checkbox h-5 w-5"
                      required
                    />
                    <span className="text-[#0B2F3D] font-[Montserrat] leading-[150%]">
                      I agree to AusiWipe{" "}
                      <a
                        href="/T&C"
                        className="text-[#0B2F3D] font-semibold font-[Montserrat] leading-[150%]"
                      >
                        Terms & Conditions
                      </a>
                    </span>
                  </label>
                </div>

                <div className="mt-8">
                  <h3 className="xl:font-medium text-[#0B2F3D] font-[Montserrat] xl:text-[32px] text-2xl leading-[150%]">
                    Secure Payments
                  </h3>
                  <div className="flex space-x-4 mt-6">
                    <img
                      src="/assets/Images/payment.png"
                      alt="visa"
                      className="h-12"
                    />
                  </div>
                </div>

                <div className="flex flex-col xl:flex-row justify-between mt-8 gap-6">
                  <button
                    type="button"
                    onClick={onPrevious}
                    className="bg-[#0B2F3D] py-2 px-8 border-2 border-[#FFC914] rounded-full xl:px-6 xl:py-2 xl:mt-10 w-full text-[#FFC914] xl:font-normal font-medium text-xl leading-[150%] font-[Montserrat] flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
                  >
                    <div className="w-8 h-8 bg-[#FFC914] rounded-full flex items-center justify-center">
                      <FaArrowLeft color="#0B2F3D" />
                    </div>
                    Previous
                  </button>

                  <button
                    onClick={() => {
                      const termsAccepted = document.querySelector(
                        'input[type="checkbox"]'
                      ).checked;
                      if (termsAccepted) {
                        handleCheckoutClick();
                      } else {
                        setError("Please accept the terms and conditions");
                      }
                    }}
                    disabled={isLoading}
                    className="bg-[#FFC914] py-2 px-8 xl:px-6 xl:py-2 xl:mt-10 xl:w-full rounded-full border-2 border-[#0B2F3D] text-[#0B2F3D] xl:font-semibold font-medium text-xl leading-[150%] font-[Montserrat] flex items-center justify-center gap-4 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
                  >
                    {isLoading ? "Loading..." : "Proceed to Payment"}
                  </button>
                </div>
              </div>
            )}

            <p className="text-[#0B2F3D] font-[Montserrat] text-lg mt-8 leading-[150%] text-center">
              <span className="font-semibold">
                100% Satisfaction Guarantee -{" "}
              </span>
              If you are not completely satisfied with our clean, we will send
              our <br /> team back to re-clean or provide a particular refund.
            </p>
          </div>
        </div>

        <div>
          <BookingSummary
            bookingData={{
              cleaningDetails: bookingData?.cleaningDetails || {},
              customerDetails: bookingData?.customerDetails || {},
            }}
          />
        </div>
      </div>
    </div>
  );
}

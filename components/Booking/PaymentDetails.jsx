"use client";

import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
import { BookingSummary } from ".";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";

// Load Stripe outside of component render to avoid recreating Stripe object on every render
const stripePromise = loadStripe(
  process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
);

// Checkout Form component that uses Stripe hooks
function CheckoutForm({ onPrevious, bookingData, clientSecret }) {
  const stripe = useStripe();
  const elements = useElements();
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [discountCode, setDiscountCode] = useState(
    bookingData?.paymentDetails?.discountCode || ""
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js hasn't loaded yet
      return;
    }

    if (!isTermsAccepted) {
      setMessage("Please accept the terms and conditions to proceed.");
      return;
    }

    setIsLoading(true);
    setMessage("");

    // Confirm the payment
    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/booking-confirmation`,
        payment_method_data: {
          billing_details: {
            name: `${bookingData?.customerDetails?.firstName || ""} ${bookingData?.customerDetails?.lastName || ""}`.trim(),
            email: bookingData?.customerDetails?.email || "",
            phone: bookingData?.customerDetails?.phone || "",
            address: {
              line1: bookingData?.customerDetails?.address || "",
              city: bookingData?.customerDetails?.suburb || "",
              country: "AU",
            },
          },
        },
      },
      redirect: "if_required",
    });

    if (error) {
      // Show error to your customer
      setMessage(error.message || "Something went wrong.");
    } else {
      console.log("Payment successful, paymentIntent:", paymentIntent);
      try {
        // Save booking data to Sanity
        const saveResponse = await fetch("/api/save-booking", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerDetails: bookingData.customerDetails,
            cleaningDetails: bookingData.cleaningDetails,
            paymentDetails: {
              discountCode,
              stripePaymentId: paymentIntent.id,
            },
          }),
        });

        const saveResult = await saveResponse.json();
        console.log("Save booking result:", saveResult);
        if (!saveResult.success) {
          throw new Error("Failed to save booking data");
        }

        // Send booking confirmation email only after both payment and booking save are successful
        const emailResponse = await fetch("/api/send-email", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            customerDetails: bookingData.customerDetails,
            cleaningDetails: bookingData.cleaningDetails,
            paymentDetails: {
              bookingReference: saveResult.bookingId,
              amount: bookingData.cleaningDetails.totalPrice,
              status: "completed",
              stripePaymentId: paymentIntent.id,
            },
          }),
        });

        if (!emailResponse.ok) {
          console.error("Failed to send confirmation email");
          // Continue with redirect even if email fails - the booking is still valid
        }

        // Payment and data save succeeded, redirect to success page
        window.location.href = "/booking-confirmation";
      } catch (saveError) {
        console.error("Error saving booking:", saveError);
        setMessage(
          "Payment successful but failed to save booking data. Please contact support."
        );
      }
    }
  };

  return (
    <div className="relative">
      {isLoading && (
        <div className="fixed inset-0 w-full h-full bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg flex flex-col items-center">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#FFC914] mb-4"></div>
            <p className="text-[#0B2F3D] font-[Montserrat]">
              Processing your payment...
            </p>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit} className="mt-8 space-y-6 text-black">
        <div className="flex gap-6 xl:flex-row flex-col">
          <div className="relative">
            <img
              src="/assets/Images/discount.png"
              alt="discount-icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
            />
            <input
              type="text"
              placeholder="Discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
            />
          </div>

          <div className="relative">
            <img
              src="/assets/Images/money.png"
              alt="amount-icon"
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
            />
            <div className="input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl flex items-center">
              ${bookingData?.cleaningDetails?.totalPrice || "119"}
            </div>
          </div>
        </div>

        <div className="relative">
          <img
            src="/assets/Images/card.png"
            alt="card-icon"
            className="absolute left-4 top-6 w-8 h-8 z-10"
          />
          <div className="pl-16 w-full border-2 border-[#0B2F3D] rounded-xl p-4">
            <PaymentElement />
          </div>
        </div>

        <hr className="xl:mt-6 border-[1.5px] border-[#8F9FA6] xl:w-[809px]" />

        <div className="xl:mt-8">
          <h3 className="xl:font-medium text-[#0B2F3D] font-[Montserrat] xl:text-[32px] text-2xl leading-[150%] mt-4">
            Secure Payments
          </h3>
          <div className="flex space-x-4 mt-6">
            <img src="/assets/Images/payment.png" alt="visa" className="h-12" />
          </div>
        </div>

        <div className="mt-8">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              className="form-checkbox h-5 w-5"
              checked={isTermsAccepted}
              onChange={(e) => setIsTermsAccepted(e.target.checked)}
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

        {message && (
          <div className="text-red-500 font-[Montserrat] text-sm mt-2">
            {message}
          </div>
        )}

        <div className="flex flex-col xl:flex-row justify-between mt-8 gap-6">
          <button
            type="button"
            onClick={onPrevious}
            className="bg-[#0B2F3D] py-2 px-8 border-2 border-[#FFC914] rounded-full xl:px-6 xl:py-2 xl:mt-10 w-full text-[#FFC914] xl:font-normal font-medium  text-xl leading-[150%] font-[Montserrat] flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
          >
            <div className="w-8 h-8 bg-[#FFC914] rounded-full flex items-center justify-center">
              <FaArrowLeft color="#0B2F3D" />
            </div>
            Previous
          </button>

          <button
            type="submit"
            disabled={!stripe || isLoading}
            className="bg-[#FFC914] py-2 px-8 xl:px-6 xl:py-2 xl:mt-10 xl:w-full rounded-full border-2 border-[#0B2F3D] text-[#0B2F3D] xl:font-semibold font-medium text-xl leading-[150%] font-[Montserrat] flex items-center justify-center gap-4 hover:scale-105 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {isLoading ? "Processing..." : "Submit Booking Now"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default function PaymentDetails({ onPrevious, bookingData }) {
  const [clientSecret, setClientSecret] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    // Create a payment intent as soon as the page loads
    const createPaymentIntent = async () => {
      try {
        setIsLoading(true);
        const response = await fetch("/api/create-payment-intent", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            amount: bookingData?.cleaningDetails?.totalPrice || "119",
            customerDetails: bookingData?.customerDetails || {},
          }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.error || "Failed to create payment intent");
        }

        setClientSecret(data.clientSecret);
      } catch (err) {
        setError(err.message || "Something went wrong");
        console.error("Error creating payment intent:", err);
      } finally {
        setIsLoading(false);
      }
    };

    createPaymentIntent();
  }, [bookingData]);

  const appearance = {
    theme: "stripe",
    variables: {
      colorPrimary: "#0B2F3D",
      colorBackground: "#FFFAE7",
      colorText: "#0B2F3D",
      colorDanger: "#FF3366",
      fontFamily: "Montserrat, sans-serif",
      borderRadius: "12px",
    },
  };

  const options = {
    clientSecret,
    appearance,
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

            {isLoading ? (
              <div className="mt-8 text-center">
                <p className="text-[#0B2F3D] font-[Montserrat] text-xl">
                  Loading payment form...
                </p>
              </div>
            ) : error ? (
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
            ) : (
              clientSecret && (
                <Elements options={options} stripe={stripePromise}>
                  <CheckoutForm
                    onPrevious={onPrevious}
                    bookingData={bookingData}
                    clientSecret={clientSecret}
                  />
                </Elements>
              )
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
              paymentDetails: {
                discountCode: bookingData?.paymentDetails?.discountCode || "",
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

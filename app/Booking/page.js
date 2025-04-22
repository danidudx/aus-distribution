"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  CleaningDetails,
  CustomerDetails,
  PaymentDetails,
} from "@/components/Booking";

const Booking = () => {
  const searchParams = useSearchParams();
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    cleaningDetails: {},
    customerDetails: {},
    paymentDetails: {},
  });

  useEffect(() => {
    // Extract values from URL parameters
    console.log("search params", searchParams);
    const bedrooms = parseInt(searchParams.get("bedrooms")) || 1;
    console.log("bedrooms NO", bedrooms);
    const bathrooms = parseInt(searchParams.get("bathrooms")) || 1;
    const service = searchParams.get("service") || "Standard Clean";
    const frequency = searchParams.get("frequency") || "Once Off";
    const method = searchParams.get("method") || "By Size";

    // Update booking data with URL parameters
    setBookingData((prev) => ({
      ...prev,
      cleaningDetails: {
        ...prev.cleaningDetails,
        bedrooms,
        bathrooms,
        type: service,
        frequency,
        method,
      },
    }));
  }, [searchParams]);

  const handleNext = (data) => {
    setBookingData((prev) => ({
      ...prev,
      ...data,
    }));
    setCurrentStep((prev) => prev + 1);
  };

  const handlePrevious = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <CleaningDetails onNext={handleNext} bookingData={bookingData} />
        );
      case 2:
        return (
          <CustomerDetails
            onNext={handleNext}
            onPrevious={handlePrevious}
            bookingData={bookingData}
          />
        );
      case 3:
        return (
          <PaymentDetails
            onPrevious={handlePrevious}
            bookingData={bookingData}
          />
        );
      default:
        return (
          <CleaningDetails onNext={handleNext} bookingData={bookingData} />
        );
    }
  };

  return <div className="min-h-screen bg-[#fffae7]">{renderStep()}</div>;
};

export default Booking;

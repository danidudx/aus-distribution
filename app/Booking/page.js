"use client";

import { useState } from "react";
import {
  CleaningDetails,
  CustomerDetails,
  PaymentDetails,
} from "@/components/Booking";

const Booking = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    cleaningDetails: {},
    customerDetails: {},
    paymentDetails: {},
  });

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

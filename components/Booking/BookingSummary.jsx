"use client";

import { useState, useEffect } from "react";
import { calculateTotalCost, calculateDuration } from "@/lib/services";

export default function BookingSummary({ bookingData }) {
  const [totalPrice, setTotalPrice] = useState(130);
  const [duration, setDuration] = useState("Unavailable");

  // Default values for when no booking data is provided
  const cleaningDetails = bookingData?.cleaningDetails || {};
  const customerDetails = bookingData?.customerDetails || {};
  const paymentDetails = bookingData?.paymentDetails || {};

  useEffect(() => {
    console.log("cleaningDetails", cleaningDetails);
    const hourlyRate = parseFloat(
      process.env.NEXT_PUBLIC_HOURLY_RATE || "64.8"
    );
    const extrasPrices = {
      "inside-oven": 75,
      "inside-fridge": 75,
      "inside-cabinets": 75,
      "exterior-windows": 75,
    };

    let calculatedPrice = 0;
    let calculatedDuration = 0;

    if (cleaningDetails.method === "Hourly") {
      const hours = parseInt(cleaningDetails.hours || 2);
      const minutes = parseInt(cleaningDetails.minutes || 0);
      calculatedPrice = calculateTotalCost(
        0,
        0,
        hourlyRate,
        cleaningDetails.type || "Standard Clean",
        cleaningDetails.method,
        hours,
        minutes,
        cleaningDetails.frequency || "Once-off"
      );
      calculatedDuration = calculateDuration(
        0,
        0,
        hourlyRate,
        cleaningDetails.type || "Standard Clean",
        cleaningDetails.method,
        hours,
        minutes
      );
    } else if (cleaningDetails.bedrooms && cleaningDetails.bathrooms) {
      calculatedPrice = calculateTotalCost(
        cleaningDetails.bedrooms,
        cleaningDetails.bathrooms,
        hourlyRate,
        cleaningDetails.type || "Standard Clean",
        cleaningDetails.method || "By Size",
        0,
        0,
        cleaningDetails.frequency || "Once-off"
      );
      calculatedDuration = calculateDuration(
        cleaningDetails.bedrooms,
        cleaningDetails.bathrooms,
        hourlyRate,
        cleaningDetails.type || "Standard Clean",
        cleaningDetails.method || "By Size"
      );

      // Only add extras cost for By Size method
      const extrasCost =
        cleaningDetails.extras?.reduce(
          (total, extra) => total + (extrasPrices[extra] || 0),
          0
        ) || 0;
      calculatedPrice += extrasCost;
    }

    setTotalPrice(Math.round(calculatedPrice));
    setDuration(calculatedDuration.toFixed(1));
  }, [cleaningDetails]);

  // Format date for display if available
  const formatDate = (dateString) => {
    if (!dateString) return "";
    const options = { year: "numeric", month: "2-digit", day: "2-digit" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  return (
    <div className="xl:w-[411px] w-full xl:pt-20 xl:mt-0 mt-10">
      <div className="xl:w-[100%] w-[90%] mx-auto xl:border-[6px] border-[#0B2F3D] rounded-[32px] p-6 bg-white">
        <h2 className="xl:text-[32px] text-[32px] font-[Tropiline] font-extrabold mb-4 text-center text-[#0B2F3D] leading-[60px]">
          Booking Summary
        </h2>

        <div className="space-y-[30px]">
          <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
            <img
              src="/assets/Images/method1.png"
              alt="Method"
              className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
            />
            <div>
              <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                Method
              </p>
              <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                {cleaningDetails.method || "By Size"}
              </p>
            </div>
          </div>

          {cleaningDetails.method === "By Size" ? (
            <>
              <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
                <img
                  src="/assets/Images/bedroom1.png"
                  alt="Bedroom"
                  className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
                />
                <div>
                  <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                    Bedrooms
                  </p>
                  <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                    {cleaningDetails.bedrooms || "01"} Bedroom
                    {cleaningDetails.bedrooms !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
                <img
                  src="/assets/Images/bathroom1.png"
                  alt="Bathroom"
                  className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
                />
                <div>
                  <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                    Bathrooms
                  </p>
                  <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                    {cleaningDetails.bathrooms || "01"} Bathroom
                    {cleaningDetails.bathrooms !== 1 ? "s" : ""}
                  </p>
                </div>
              </div>
            </>
          ) : (
            <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
              <img
                src="/assets/Images/time1.png"
                alt="Duration"
                className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
              />
              <div>
                <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                  Duration
                </p>
                <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                  {cleaningDetails.hours || 2} Hours{" "}
                  {cleaningDetails.minutes || 0} Minutes
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
            <img
              src="/assets/Images/frequency1.png"
              alt="Frequency"
              className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
            />
            <div>
              <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                Frequency
              </p>
              <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                {cleaningDetails.frequency || "Once Off"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
            <img
              src="/assets/Images/type1.png"
              alt="Type"
              className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
            />
            <div>
              <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                Type
              </p>
              <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                {cleaningDetails.type || "Standard Clean"}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
            <img
              src="/assets/Images/date1.png"
              alt="Date"
              className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
            />
            <div>
              <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                Date
              </p>
              <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                {cleaningDetails.date ? formatDate(cleaningDetails.date) : ""}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
            <img
              src="/assets/Images/time1.png"
              alt="Time"
              className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
            />
            <div>
              <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                Time
              </p>
              <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                {cleaningDetails.time || "07:00 AM"}
              </p>
            </div>
          </div>

          {customerDetails.address && (
            <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
              <img
                src="/assets/Images/location1.png"
                alt="Location"
                className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
              />
              <div>
                <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                  Address
                </p>
                <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                  {customerDetails.address}
                  {customerDetails.suburb ? `, ${customerDetails.suburb}` : ""}
                </p>
              </div>
            </div>
          )}

          {customerDetails.firstName && (
            <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
              <img
                src="/assets/Images/user.png"
                alt="User"
                className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
              />
              <div>
                <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                  Customer
                </p>
                <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                  {customerDetails.firstName} {customerDetails.lastName}
                </p>
              </div>
            </div>
          )}

          {paymentDetails.discountCode && (
            <div className="flex items-center gap-4 md:gap-6 md:pl-10 xl:pl-0">
              <img
                src="/assets/Images/discount.png"
                alt="Discount"
                className="xl:w-[60px] xl:h-[60px] w-[50px] h-[50px]"
              />
              <div>
                <p className="xl:text-xl text-lg font-[Montserrat] font-medium text-[#0B2F3D] leading-[150%]">
                  Discount Code
                </p>
                <p className="xl:text-2xl text-xl font-[Montserrat] font-semibold text-[#0B2F3D] leading-[150%]">
                  {paymentDetails.discountCode}
                </p>
              </div>
            </div>
          )}
        </div>

        <div className="bg-[#FFC914] text-[#0B2F3D] mt-10 xl:px-8 xl:py-3 py-2 rounded-full font-[Montserrat] text-lg font-normal leading-[150%] border-2 border-[#0B2F3D] flex items-center justify-center gap-4">
          <span>
            Total: <span className="xl:font-semibold">${totalPrice} | </span>{" "}
            Duration:
            <span className="xl:font-semibold"> {duration}h</span>
          </span>
        </div>
      </div>
    </div>
  );
}

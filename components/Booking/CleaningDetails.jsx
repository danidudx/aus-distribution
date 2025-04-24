"use client";

import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BookingSummary } from ".";
import { calculateTotalCost, calculateDuration } from "@/lib/services";
import { BsCalendarDate } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";

export default function CleaningDetails({ onNext, bookingData }) {
  const [duration, setTotalDuration] = useState(0);
  const [selectedServices, setSelectedServices] = useState(
    bookingData?.cleaningDetails?.selectedServices || []
  );
  const [selectedMethod, setSelectedMethod] = useState(
    bookingData?.cleaningDetails?.method || "By Size"
  );
  const [bedrooms, setBedrooms] = useState(
    bookingData?.cleaningDetails?.bedrooms || 1
  );
  const [bathrooms, setBathrooms] = useState(
    bookingData?.cleaningDetails?.bathrooms || 1
  );
  const [frequency, setFrequency] = useState(
    bookingData?.cleaningDetails?.frequency || "Once Off"
  );
  const [cleaningType, setCleaningType] = useState(
    bookingData?.cleaningDetails?.type || "Standard Clean"
  );
  const [extras, setExtras] = useState(
    bookingData?.cleaningDetails?.extras || []
  );
  const [date, setDate] = useState(bookingData?.cleaningDetails?.date || "");
  const [time, setTime] = useState(
    bookingData?.cleaningDetails?.time || "07:00 AM"
  );
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    const hourlyRate = process.env.HOURLY_RATE || 64.8;

    const extrasPrices = {
      "inside-oven": 75,
      "inside-fridge": 75,
      "inside-cabinets": 75,
      "exterior-windows": 75,
    };
    const calculatedPrice = calculateTotalCost(
      bedrooms,
      bathrooms,
      hourlyRate,
      cleaningType
    );
    const extrasCost = extras.reduce(
      (total, extra) => total + (extrasPrices[extra] || 0),
      0
    );

    let finalPrice = calculatedPrice + extrasCost;
    if (frequency === "Weekly" || frequency === "Fortnightly") {
      finalPrice *= 0.9;
    } else if (frequency === "Monthly") {
      finalPrice *= 0.95;
    }
    setTotalPrice(Math.round(finalPrice));
    const calculatedDuration = calculateDuration(
      bedrooms,
      bathrooms,
      hourlyRate,
      cleaningType
    );
    setTotalDuration(calculatedDuration);
  }, [bedrooms, bathrooms, selectedMethod, cleaningType, extras, frequency]);

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState({
    date: "",
    time: "",
    method: "",
    bedrooms: bedrooms === 0 ? "Please select number of bedrooms" : "",
    bathrooms: bathrooms === 0 ? "Please select number of bathrooms" : "",
    frequency: frequency === "" ? "Please select a frequency" : "",
    type: cleaningType === "" ? "Please select a cleaning type" : "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const handleExtraToggle = (extra) => {
    setExtras((prevExtras) => {
      if (prevExtras.includes(extra)) {
        return prevExtras.filter((item) => item !== extra);
      } else {
        return [...prevExtras, extra];
      }
    });
  };

  const validateForm = () => {
    const newErrors = {
      date: date.trim() === "" ? "Date is required" : "",
      time: time.trim() === "" ? "Time is required" : "",
      method: selectedMethod === "" ? "Please select a method" : "",
      bedrooms: bedrooms === 0 ? "Please select number of bedrooms" : "",
      bathrooms: bathrooms === 0 ? "Please select number of bathrooms" : "",
      frequency: frequency === "" ? "Please select a frequency" : "",
      type: cleaningType === "" ? "Please select a cleaning type" : "",
    };

    setValidationErrors(newErrors);

    // Check if there are any errors
    return !Object.values(newErrors).some((error) => error !== "");
  };

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";
    switch (name) {
      case "date":
        error = value.trim() === "" ? "Date is required" : "";
        break;
      case "time":
        error = value.trim() === "" ? "Time is required" : "";
        break;
      case "method":
        error = value === "" ? "Please select a method" : "";
        break;
      case "bedrooms":
        error = value === 0 ? "Please select number of bedrooms" : "";
        break;
      case "bathrooms":
        error = value === 0 ? "Please select number of bathrooms" : "";
        break;
      case "frequency":
        error = value === "" ? "Please select a frequency" : "";
        break;
      case "type":
        error = value === "" ? "Please select a cleaning type" : "";
        break;
      default:
        break;
    }
    return error;
  };

  useEffect(() => {
    if (bookingData?.cleaningDetails) {
      setSelectedMethod(bookingData.cleaningDetails.method || "By Size");
      setBedrooms(bookingData.cleaningDetails.bedrooms || 1);
      setBathrooms(bookingData.cleaningDetails.bathrooms || 1);
      setFrequency(
        (bookingData.cleaningDetails.frequency || "Weekly").split(" ")[0]
      );
      setCleaningType(bookingData.cleaningDetails.type || "Standard Clean");
      setDate(bookingData.cleaningDetails.date || "");
      setTime(bookingData.cleaningDetails.time || "07:00 AM");
      setSelectedServices(bookingData.cleaningDetails.selectedServices || []);
      setExtras(bookingData.cleaningDetails.extras || []);
    }
  }, [bookingData?.cleaningDetails]);
  // Handle field change with validation
  const handleFieldChange = (name, value) => {
    if (formSubmitted) {
      const error = validateField(name, value);
      setValidationErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleNext = () => {
    setFormSubmitted(true);

    if (validateForm()) {
      const cleaningDetails = {
        method: selectedMethod,
        bedrooms,
        bathrooms,
        frequency,
        type: cleaningType,
        extras,
        date,
        time,
        selectedServices,
        totalPrice,
        duration,
      };
      onNext({ cleaningDetails });
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(validationErrors).find(
        (key) => validationErrors[key] !== ""
      );
      if (firstErrorField) {
        const element = document.querySelector(
          `[data-field=${firstErrorField}]`
        );
        if (element) {
          element.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  return (
    <div className="bg-[#fffae7] w-full pb-20 xl:pb-40">
      <div className="w-[90%] mx-auto xl:flex xl:flex-row gap-[10%] justify-center">
        <div className="xl:w-[810px] xl:mt-20 pt-10 xl:pt-0">
          <h2 className="text-3xl md:text-4xl text-center xl:text-left font-bold text-[#0B2F3D] font-[Tropiline] xl:font-extrabold xl:text-[50px] xl:leading-[90px] ">
            Book Your Net House Clean
          </h2>

          <div className="">
            <img
              src="/assets/Images/ProgressBar1.png"
              alt="ProgressBar"
              className="xl:py-4 xl:px-6 xl:w-[809px] xl:h-[164px] py-4"
            />
          </div>

          {/* Cleaning Request Details */}
          <div className="mt-4">
            <h3 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-[32px] text-2xl leading-[150%]">
              Cleaning Request Details
            </h3>

            <div className="mt-10">
              <div className="flex flex-row ">
                <img
                  src="/assets/Images/method.png"
                  alt="Method"
                  className="xl:w-10 xl:h-10"
                />
                <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg leading-[150%] flex items-center pl-4">
                  Method*
                </h4>
              </div>
              <div className="flex gap-4 mt-6">
                <button
                  className={`px-4 py-2 rounded-xl xl:w-[396px] w-1/2 xl:h-16 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] ${
                    selectedMethod === "By Size"
                      ? "bg-[#0B2F3D] text-white"
                      : "bg-white text-[#0B2F3D]"
                  }`}
                  onClick={() => {
                    setSelectedMethod("By Size");
                    handleFieldChange("method", "By Size");
                  }}
                >
                  By Size
                </button>
                <button
                  className={`px-4 py-2 rounded-xl xl:w-[396px] w-1/2 xl:h-16 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] text-[#0B2F3D] ${
                    selectedMethod === "Hourly"
                      ? "bg-[#0B2F3D] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => {
                    setSelectedMethod("Hourly");
                    handleFieldChange("method", "Hourly");
                  }}
                >
                  Hourly
                </button>
              </div>
              <hr className="mt-6 border-[1.5px] border-[#8F9FA6] xl:w-[809px]" />
            </div>

            {/* Bedroom & Bathroom Selection */}
            <div className="mt-10">
              <div className="flex flex-row">
                <img
                  src="/assets/Images/bedroom.png"
                  alt="Bedroom"
                  className="xl:w-10 xl:h-10"
                />
                <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg leading-[150%] flex items-center pl-4">
                  Bedrooms(include all rooms except the kitchen and living
                  room)*
                </h4>
              </div>
              <div className="flex gap-4 mt-6">
                {[1, 2, 3, 4, 5, 6].map((num) => (
                  <button
                    key={num}
                    className={`px-4 py-2 rounded-xl xl:w-[121.2px] xl:h-16 w-1/6 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] text-[#0B2F3D] ${
                      bedrooms === num ? "bg-[#0B2F3D] text-white" : "bg-white"
                    }`}
                    onClick={() => {
                      setBedrooms(num);
                      handleFieldChange("bedrooms", num);
                    }}
                  >
                    {num}
                  </button>
                ))}
              </div>

              <div className="mt-10">
                <div className="flex flex-row">
                  <img
                    src="/assets/Images/bathroom.png"
                    alt="Bathroom"
                    className="xl:w-10 xl:h-10"
                  />
                  <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg leading-[150%] flex items-center pl-4">
                    Bathrooms*
                  </h4>
                </div>
                <div className="flex gap-4 mt-6">
                  {[1, 2, 3, 4, 5, 6].map((num) => (
                    <button
                      key={num}
                      className={`px-4 py-2 rounded-xl xl:w-[121.2px] w-1/6 xl:h-16 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] text-[#0B2F3D] ${
                        bathrooms === num
                          ? "bg-[#0B2F3D] text-white"
                          : "bg-white"
                      }`}
                      onClick={() => {
                        setBathrooms(num);
                        handleFieldChange("bathrooms", num);
                      }}
                    >
                      {num}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* Frequency Selection */}
            <div className="mt-10">
              <div className="flex flex-row">
                <img
                  src="/assets/Images/frequency.png"
                  alt="Frequency"
                  className="xl:w-10 xl:h-10"
                />
                <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg leading-[150%] flex items-center pl-4">
                  Frequency*
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { label: "Once", discount: "" },
                  { label: "Weekly", discount: "(10% off)" },
                  { label: "Fortnightly", discount: "(10% off)" },
                  { label: "Monthly", discount: "(5% off)" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`px-4 py-2 rounded-xl xl:w-[396px] xl:h-16 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] text-[#0B2F3D] 
                      ${
                        frequency === item.label
                          ? "bg-[#0B2F3D] text-white"
                          : "bg-white"
                      }`}
                    onClick={() => {
                      setFrequency(item.label.split(" ")[0]);
                      handleFieldChange("frequency", item.label.split(" ")[0]);
                    }}
                  >
                    {item.label}
                    {item.discount && (
                      <span className="text-[#FF3366] ml-2">
                        {item.discount}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Type Selection */}
            <div className="mt-10">
              <div className="flex flex-row">
                <img
                  src="/assets/Images/type.png"
                  alt="Type"
                  className="xl:w-10 xl:h-10"
                />
                <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg leading-[150%] flex items-center pl-4">
                  Type*
                </h4>
              </div>
              <div className="flex gap-2 mt-6">
                {["Standard Clean", "Deep Clean", "Vacate Clean"].map(
                  (type) => (
                    <button
                      key={type}
                      className={`px-4 py-2 rounded-xl xl:w-[259px] md:w-1/3 xl:h-16 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] text-[#0B2F3D] ${
                        cleaningType === type
                          ? "bg-[#0B2F3D] text-white"
                          : "bg-white"
                      }`}
                      onClick={() => {
                        setCleaningType(type);
                        handleFieldChange("type", type);
                      }}
                    >
                      {type}
                    </button>
                  )
                )}
              </div>
            </div>

            {/* Extras Selection */}
            <div className="mt-10">
              <div className="sm:flex sm:flex-row">
                <img
                  src="/assets/Images/extra.png"
                  alt="Extra"
                  className="sm:w-10 sm:h-10"
                />
                <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] sm:text-xl leading-[150%] flex items-center sm:pl-4">
                  Extras for Standard Clean (Select all that apply)
                </h4>
              </div>
              <div className="grid grid-cols-2 gap-4 mt-6">
                {[
                  { value: "inside-oven", label: "Inside Oven $75" },
                  { value: "inside-fridge", label: "Inside Fridge $75" },
                  { value: "inside-cabinets", label: "Inside Cabinets $75" },
                  { value: "exterior-windows", label: "Exterior Windows $75" },
                ].map(({ value, label }, index) => (
                  <button
                    key={value}
                    className={`sm:px-4 sm:py-2 rounded-xl sm:w-[396px] sm:h-16 font-[Tropiline] sm:font-extrabold sm:text-[24px] leading-[150%] sm:border-4 sm:border-[#0B2F3D] text-[#0B2F3D] ${extras.includes(value) ? "bg-[#0B2F3D] text-white" : "bg-white"}`}
                    onClick={() => handleExtraToggle(value)}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/*normal Date time selection */}
            <div className="mt-10">
              <div className="flex flex-row">
                <img
                  src="/assets/Images/date.png"
                  alt="Date"
                  className="xl:w-10 xl:h-10"
                />
                <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg leading-[150%] flex items-center pl-4">
                  Date & Time*
                </h4>
              </div>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative" data-field="date">
                  <BsCalendarDate className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-[#0B2F3D]" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      if (formSubmitted) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          date:
                            e.target.value.trim() === ""
                              ? "Date is required"
                              : "",
                        }));
                      }
                    }}
                    className={`pl-16 w-full xl:h-16 h-12 border-2 ${validationErrors.date ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl bg-white text-[#0B2F3D] font-[Montserrat]`}
                    required
                  />
                  {validationErrors.date && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.date}
                    </p>
                  )}
                </div>
                <div className="relative" data-field="time">
                  <BiTimeFive className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-[#0B2F3D]" />
                  <input
                    type="time"
                    value={time.replace(" AM", "").replace(" PM", "")}
                    onChange={(e) => {
                      const timeValue = e.target.value;
                      const [hours, minutes] = timeValue.split(":");
                      const hour = parseInt(hours);
                      const ampm = hour >= 12 ? "PM" : "AM";
                      const hour12 = hour % 12 || 12;
                      const newTime = `${hour12}:${minutes} ${ampm}`;
                      setTime(newTime);
                      if (formSubmitted) {
                        setValidationErrors((prev) => ({
                          ...prev,
                          time: newTime.trim() === "" ? "Time is required" : "",
                        }));
                      }
                    }}
                    className={`pl-16 w-full xl:h-16 h-12 border-2 ${validationErrors.time ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl bg-white text-[#0B2F3D] font-[Montserrat]`}
                    required
                  />
                  {validationErrors.time && (
                    <p className="text-red-500 text-sm mt-1">
                      {validationErrors.time}
                    </p>
                  )}
                </div>
              </div>
              {date && time && (
                <div className="mt-6 p-4 bg-white rounded-xl border-2 border-[#0B2F3D]">
                  <p className="font-medium text-[#0B2F3D] font-[Montserrat]">
                    Selected:{" "}
                    <span className="font-bold">
                      {new Date(date).toLocaleDateString("en-US", {
                        weekday: "short",
                        month: "short",
                        day: "numeric",
                      })}{" "}
                      at {time}
                    </span>
                  </p>
                </div>
              )}
              <hr className="mt-6 border-[1.5px] border-[#8F9FA6] xl:w-[809px]" />
            </div>

            {/* Date & Time Selection using calendly*/}
            {/* <div className="mt-10">
              <div className="flex flex-row">
                <img
                  src="/assets/Images/date.png"
                  alt="Date"
                  className="xl:w-10 xl:h-10"
                />
                <h4 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg leading-[150%] flex items-center pl-4">
                  Date & Time*
                </h4>
              </div>
              <div className="mt-6">
                {loading ? (
                  <div className="text-center py-4">
                    <p className="text-[#0B2F3D] font-[Montserrat]">
                      Loading available slots...
                    </p>
                  </div>
                ) : error ? (
                  <div className="text-center py-4">
                    <p className="text-red-500 font-[Montserrat]">{error}</p>
                  </div>
                ) : (
                  <div>
                    {/* Date Selection */}
            {/* <div className="mb-6">
                      <h5 className="font-medium text-[#0B2F3D] font-[Montserrat] text-lg mb-4">
                        Select Date:
                      </h5>
                      <div className="flex overflow-x-auto pb-2 gap-3">
                        {getAvailableDates().map((dateStr) => (
                          <button
                            key={dateStr}
                            className={`px-4 py-2 rounded-xl min-w-[150px] font-[Montserrat] border-2 border-[#0B2F3D] ${
                              selectedDate === dateStr
                                ? "bg-[#0B2F3D] text-white"
                                : "bg-white text-[#0B2F3D]"
                            }`}
                            onClick={() => handleDateSelection(dateStr)}
                          >
                            {formatDate(dateStr)}
                          </button>
                        ))}
                      </div>
                    </div> */}

            {/* Time Selection */}
            {/* {selectedDate && (
                      <div>
                        <h5 className="font-medium text-[#0B2F3D] font-[Montserrat] text-lg mb-4">
                          Select Time:
                        </h5>
                        <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-3">
                          {getTimeSlotsForDate(selectedDate).map((slot) => (
                            <button
                              key={slot.start_time}
                              className={`px-4 py-2 rounded-xl font-[Montserrat] border-2 border-[#0B2F3D] ${
                                selectedSlot &&
                                selectedSlot.start_time === slot.start_time
                                  ? "bg-[#0B2F3D] text-white"
                                  : "bg-white text-[#0B2F3D]"
                              }`}
                              onClick={() => handleSlotSelection(slot)}
                            >
                              {formatTime(slot.start_time)}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}  */}

            {/* Selected Date & Time Display */}
            {/* {date && time && (
                      <div className="mt-6 p-4 bg-white rounded-xl border-2 border-[#0B2F3D]">
                        <p className="font-medium text-[#0B2F3D] font-[Montserrat]">
                          Selected:{" "}
                          <span className="font-bold">
                            {formatDate(date)} at {time}
                          </span>
                        </p>
                      </div>
                    )}
                  </div>
                )}
              </div>
              <hr className="mt-6 border-[1.5px] border-[#8F9FA6] xl:w-[809px]" />
            </div> */}

            {/* Next Button */}
            <div className="mt-10 flex justify-center hover:scale-105 active:scale-95">
              <button
                onClick={handleNext}
                className="bg-[#FFC914] w-full text-[#0B2F3D] px-8 py-2 rounded-full font-[Montserrat] text-xl font-medium border-2 border-[#0B2F3D] flex items-center justify-center gap-4"
                type="button"
              >
                Next: <span className="font-semibold">Personal Details</span>
                <div className="w-8 h-8 bg-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-[#FFC914]" />
                </div>
              </button>
            </div>

            {/* Show validation summary if form is submitted with errors */}
            {formSubmitted &&
              Object.values(validationErrors).some((error) => error !== "") && (
                <div className="mt-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
                  <p className="font-semibold">
                    Please correct the following errors:
                  </p>
                  <ul className="list-disc pl-5 mt-2">
                    {Object.entries(validationErrors).map(([field, error]) =>
                      error ? <li key={field}>{error}</li> : null
                    )}
                  </ul>
                </div>
              )}
          </div>
        </div>
        <div>
          <BookingSummary
            bookingData={{
              cleaningDetails: {
                method: selectedMethod,
                bedrooms,
                bathrooms,
                frequency,
                type: cleaningType,
                extras,
                date,
                time,
                totalPrice,
                selectedServices,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

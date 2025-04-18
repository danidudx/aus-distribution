"use client";

import { useState, useEffect } from "react";
import { FaArrowRight } from "react-icons/fa";
import { BookingSummary } from ".";
import { fetchServices, calculateTotalPrice } from "@/lib/services";
import { fetchAvailableSlots, scheduleEvent } from "@/lib/calendly";
import { BsCalendarDate } from "react-icons/bs";
import { BiTimeFive } from "react-icons/bi";

export default function CleaningDetails({ onNext, bookingData }) {
  const [services, setServices] = useState([]);
  const [selectedServices, setSelectedServices] = useState([]);
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
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function loadServices() {
      try {
        const servicesData = await fetchServices();
        setServices(servicesData);
        if (servicesData.length > 0) {
          setSelectedServices([servicesData[0]._id]);
        }
      } catch (error) {
        console.error("Error loading services:", error);
      }
    }
    loadServices();
  }, []);

  useEffect(() => {
    const fetchSlots = async () => {
      setLoading(true);
      try {
        const availableSlots = await fetchAvailableSlots();
        setAvailableSlots(availableSlots);

        // Set the first date as selected if there are slots available
        if (availableSlots.length > 0) {
          const firstDate = new Date(availableSlots[0].start_time)
            .toISOString()
            .split("T")[0];
          setSelectedDate(firstDate);
        }

        setLoading(false);
      } catch (error) {
        console.error("Error fetching available slots:", error);
        setLoading(false);
      }
    };

    fetchSlots();
  }, []);

  useEffect(() => {
    const selectedServiceObjects = services.filter((service) =>
      selectedServices.includes(service._id)
    );
    const newTotalPrice = calculateTotalPrice(
      selectedServiceObjects,
      extras,
      frequency
    );
    setTotalPrice(newTotalPrice);
  }, [selectedServices, extras, frequency, services]);

  const handleExtraToggle = (extra) => {
    setExtras(
      extras.includes(extra)
        ? extras.filter((e) => e !== extra)
        : [...extras, extra]
    );
  };

  const handleNext = () => {
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
    };
    onNext({ cleaningDetails });
  };

  // Group available slots by date
  const getAvailableDates = () => {
    const uniqueDates = [];
    const dateSet = new Set();

    availableSlots.forEach((slot) => {
      const slotDate = new Date(slot.start_time).toISOString().split("T")[0];
      if (!dateSet.has(slotDate)) {
        dateSet.add(slotDate);
        uniqueDates.push(slotDate);
      }
    });

    return uniqueDates;
  };

  // Get time slots for the selected date
  const getTimeSlotsForDate = (selectedDate) => {
    return availableSlots.filter((slot) => {
      const slotDate = new Date(slot.start_time).toISOString().split("T")[0];
      return slotDate === selectedDate;
    });
  };

  // Format date for display
  const formatDate = (dateString) => {
    const options = { weekday: "short", month: "short", day: "numeric" };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  // Format time for display
  const formatTime = (timeString) => {
    return new Date(timeString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  const handleDateSelection = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null);
  };

  const handleSlotSelection = async (slot) => {
    setSelectedSlot(slot);
    try {
      setLoading(true);

      // Update the date and time state variables directly from the selected slot
      setDate(new Date(slot.start_time).toISOString().split("T")[0]);
      setTime(
        new Date(slot.start_time).toLocaleTimeString("en-US", {
          hour: "numeric",
          minute: "numeric",
          hour12: true,
        })
      );

      // No API call to scheduleEvent
      // const scheduledEvent = await scheduleEvent({
      //   start_time: slot.start_time,
      //   end_time: slot.end_time,
      // });

      setLoading(false);
    } catch (err) {
      setError("Failed to schedule the appointment. Please try again.");
      console.error(err);
      setLoading(false);
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
                  onClick={() => setSelectedMethod("By Size")}
                >
                  By Size
                </button>
                <button
                  className={`px-4 py-2 rounded-xl xl:w-[396px] w-1/2 xl:h-16 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] text-[#0B2F3D] ${
                    selectedMethod === "Hourly"
                      ? "bg-[#0B2F3D] text-white"
                      : "bg-white"
                  }`}
                  onClick={() => setSelectedMethod("Hourly")}
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
                    onClick={() => setBedrooms(num)}
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
                      onClick={() => setBathrooms(num)}
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
                  { label: "Once Off", discount: "" },
                  { label: "Weekly", discount: "(10% off)" },
                  { label: "Fortnightly", discount: "(10% off)" },
                  { label: "Monthly", discount: "(5% off)" },
                ].map((item) => (
                  <button
                    key={item.label}
                    className={`px-4 py-2 rounded-xl xl:w-[396px] xl:h-16 font-[Tropiline] xl:font-extrabold xl:text-[24px] leading-[150%] xl:border-4 border-2 border-[#0B2F3D] text-[#0B2F3D] ${
                      frequency === item.label
                        ? "bg-[#0B2F3D] text-white"
                        : "bg-white"
                    }`}
                    onClick={() => setFrequency(item.label)}
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
                      onClick={() => setCleaningType(type)}
                    >
                      {type}
                    </button>
                  )
                )}
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
                <div className="relative">
                  <BsCalendarDate className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8 text-[#0B2F3D]" />
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="pl-16 w-full xl:h-16 h-12 border-2 border-[#0B2F3D] rounded-xl bg-white text-[#0B2F3D] font-[Montserrat]"
                  />
                </div>
                <div className="relative">
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
                      setTime(`${hour12}:${minutes} ${ampm}`);
                    }}
                    className="pl-16 w-full xl:h-16 h-12 border-2 border-[#0B2F3D] rounded-xl bg-white text-[#0B2F3D] font-[Montserrat]"
                  />
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
              >
                Next: <span className="font-semibold">Personal Details</span>
                <div className="w-8 h-8 bg-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaArrowRight className="text-[#FFC914]" />
                </div>
              </button>
            </div>
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

"use client";

import { useState } from "react";
import { FaArrowRight, FaArrowLeft } from "react-icons/fa";
import { BookingSummary } from ".";

export default function CustomerDetails({ onNext, onPrevious, bookingData }) {
  const [firstName, setFirstName] = useState(
    bookingData?.customerDetails?.firstName || ""
  );
  const [lastName, setLastName] = useState(
    bookingData?.customerDetails?.lastName || ""
  );
  const [email, setEmail] = useState(bookingData?.customerDetails?.email || "");
  const [phone, setPhone] = useState(bookingData?.customerDetails?.phone || "");
  const [address, setAddress] = useState(
    bookingData?.customerDetails?.address || ""
  );
  const [suburb, setSuburb] = useState(
    bookingData?.customerDetails?.suburb || ""
  );
  const [instructions, setInstructions] = useState(
    bookingData?.customerDetails?.instructions || ""
  );
  const [parking, setParking] = useState(
    bookingData?.customerDetails?.parking || ""
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const customerDetails = {
      firstName,
      lastName,
      email,
      phone,
      address,
      suburb,
      instructions,
      parking,
    };
    onNext({ customerDetails });
  };

  return (
    <div className="bg-[#fffae7] w-full pb-20 xl:pb-40">
      <div className="w-[90%] mx-auto xl:flex xl:flex-row gap-[10%] justify-center">
        <div className="xl:w-[810px] xl:mt-20 pt-10 xl:pt-0">
          <h2 className="text-3xl md:text-4xl text-center xl:text-left font-bold text-[#0B2F3D] font-[Tropiline] xl:font-extrabold xl:text-[50px] xl:leading-[90px]">
            Book Your Net House Clean
          </h2>

          <img
            src="/assets/Images/ProgressBar2.png"
            alt="ProgressBar"
            className="xl:py-4 xl:px-6 xl:w-[809px] xl:h-[164px] py-4"
          />

          <h3 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-[32px] text-2xl leading-[150%] mt-4">
            Personal Details
          </h3>
          <form
            onSubmit={handleSubmit}
            className="mt-8 grid xl:grid-cols-2 gap-6 text-black"
          >
            <div className="relative">
              <img
                src="/assets/Images/user.png"
                alt="user-icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
              />
              <input
                type="text"
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
              />
            </div>

            <div className="relative">
              <img
                src="/assets/Images/user.png"
                alt="user-icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
              />
              <input
                type="text"
                placeholder="Last Name*"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
              />
            </div>

            <div className="relative">
              <img
                src="/assets/Images/mail.png"
                alt="email-icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
              />
              <input
                type="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
              />
            </div>

            <div className="relative">
              <img
                src="/assets/Images/phone.png"
                alt="phone-icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
              />
              <input
                type="tel"
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
              />
            </div>
          </form>

          <hr className="mt-6 border-[1.5px] border-[#8F9FA6] xl:w-[809px]" />

          <div className="col-span-2 xl:mt-10">
            <h3 className="xl:font-medium text-[#0B2F3D] text-2xl font-[Montserrat] xl:text-[32px] leading-[150%] mt-4">
              Address Details
            </h3>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 gap-6 text-black">
            <div className="flex xl:flex-row flex-col gap-6">
              <div className="relative">
                <img
                  src="/assets/Images/location.png"
                  alt="location-icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="text"
                  placeholder="Address*"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="input-style pl-16 xl:w-[590px] xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
                />
              </div>

              <input
                type="text"
                placeholder="Suburb*"
                value={suburb}
                onChange={(e) => setSuburb(e.target.value)}
                className="input-style pl-4 xl:w-full xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
              />
            </div>

            <div className="flex flex-col gap-5 mt-6">
              <div className="relative">
                <img
                  src="/assets/Images/key.png"
                  alt="key-icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <select
                  value={instructions}
                  onChange={(e) => setInstructions(e.target.value)}
                  className="input-style xl:w-full pl-16 xl:pr-6 xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl text-[#0B2F3D]"
                >
                  <option value="">How can we get in?*</option>
                  <option value="Key under mat">Key under mat</option>
                  <option value="Access code">Access code</option>
                  <option value="Someone home">Someone home</option>
                </select>
              </div>

              <div className="relative">
                <img
                  src="/assets/Images/trans.png"
                  alt="Transport"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <select
                  value={parking}
                  onChange={(e) => setParking(e.target.value)}
                  className="input-style xl:w-full pl-16 xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl text-[#0B2F3D]"
                >
                  <option value="">Where can we park?*</option>
                  <option value="Driveway">Driveway</option>
                  <option value="Street parking">Street parking</option>
                  <option value="Garage">Garage</option>
                </select>
              </div>
            </div>
          </form>
          <div className="flex xl:flex-row flex-col justify-between mt-8 gap-6 ">
            <button
              type="button"
              onClick={onPrevious}
              className="bg-[#0B2F3D] py-2 px-8 border-2 border-[#FFC914] rounded-full xl:px-6 xl:py-2 xl:mt-10 w-full text-[#FFC914] xl:font-normal font-medium text-xl leading-[150%] font-[Montserrat] flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
            >
              <div className="w-8 h-8 bg-[#FFC914] rounded-full flex items-center justify-center">
                <FaArrowLeft
                  className="w-3.5 h-3.5 cursor-pointer relative z-10"
                  color="#0B2F3D"
                />
              </div>
              Previous
            </button>

            <button
              type="submit"
              onClick={handleSubmit}
              className="bg-[#FFC914] py-2 px-8 xl:px-6 xl:py-2 xl:mt-10 w-full rounded-full border-2 border-[#0B2F3D] text-[#0B2F3D] xl:font-normal text-xl leading-[150%] font-[Montserrat] flex items-center justify-center gap-4 hover:scale-105 active:scale-95"
            >
              Next: <span className="font-semibold">Payment Details</span>
              <div className="w-8 h-8 bg-[#0B2F3D] rounded-full flex items-center justify-center">
                <FaArrowRight
                  className="w-3.5 h-3.5 cursor-pointer relative z-10"
                  color="#FFC914"
                />
              </div>
            </button>
          </div>
        </div>

        <div>
          <BookingSummary
            bookingData={{
              cleaningDetails: bookingData?.cleaningDetails || {},
              customerDetails: {
                firstName,
                lastName,
                email,
                phone,
                address,
                suburb,
                instructions,
                parking,
              },
            }}
          />
        </div>
      </div>
    </div>
  );
}

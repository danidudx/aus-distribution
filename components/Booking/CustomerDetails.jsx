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

  // Validation states
  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    suburb: "",
    instructions: "",
    parking: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Validate email format
  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  // Validate phone number format (basic validation)
  const validatePhone = (phone) => {
    const re = /^[0-9\s+()-]{8,15}$/; // Basic validation for phone numbers
    return re.test(String(phone));
  };

  // Validate form fields
  const validateForm = () => {
    const newErrors = {
      terms: !document.querySelector('input[type="checkbox"]').checked
        ? "You must agree to the terms and conditions"
        : "",
      firstName: firstName.trim() === "" ? "First name is required" : "",
      lastName: lastName.trim() === "" ? "Last name is required" : "",
      email:
        email.trim() === ""
          ? "Email is required"
          : !validateEmail(email)
            ? "Please enter a valid email address"
            : "",
      phone:
        phone.trim() === ""
          ? "Phone number is required"
          : !validatePhone(phone)
            ? "Please enter a valid phone number"
            : "",
      address: address.trim() === "" ? "Address is required" : "",
      suburb: suburb.trim() === "" ? "Suburb is required" : "",
      instructions:
        instructions === "" ? "Please select how we can get in" : "",
      parking: parking === "" ? "Please select where we can park" : "",
    };

    setErrors(newErrors);

    // Check if there are any errors
    const termsError = !document.querySelector('input[type="checkbox"]')
      .checked;
    return (
      !Object.values(newErrors).some((error) => error !== "") && !termsError
    );
  };

  // Validate a single field
  const validateField = (name, value) => {
    let error = "";

    switch (name) {
      case "firstName":
        error = value.trim() === "" ? "First name is required" : "";
        break;
      case "lastName":
        error = value.trim() === "" ? "Last name is required" : "";
        break;
      case "email":
        error =
          value.trim() === ""
            ? "Email is required"
            : !validateEmail(value)
              ? "Please enter a valid email address"
              : "";
        break;
      case "phone":
        error =
          value.trim() === ""
            ? "Phone number is required"
            : !validatePhone(value)
              ? "Please enter a valid phone number"
              : "";
        break;
      case "address":
        error = value.trim() === "" ? "Address is required" : "";
        break;
      case "suburb":
        error = value.trim() === "" ? "Suburb is required" : "";
        break;
      case "instructions":
        error = value === "" ? "Please select how we can get in" : "";
        break;
      case "parking":
        error = value === "" ? "Please select where we can park" : "";
        break;
      default:
        break;
    }

    return error;
  };

  // Handle field change with validation
  const handleFieldChange = (name, value) => {
    // Update the field value
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "phone":
        setPhone(value);
        break;
      case "address":
        setAddress(value);
        break;
      case "suburb":
        setSuburb(value);
        break;
      case "instructions":
        setInstructions(value);
        break;
      case "parking":
        setParking(value);
        break;
      default:
        break;
    }

    // Validate if form was already submitted or if this field already has an error
    if (formSubmitted || errors[name]) {
      const error = validateField(name, value);
      setErrors((prev) => ({
        ...prev,
        [name]: error,
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    if (validateForm()) {
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
    } else {
      // Scroll to the first error
      const firstErrorField = Object.keys(errors).find(
        (key) => errors[key] !== ""
      );
      if (firstErrorField) {
        const element = document.querySelector(`[name=${firstErrorField}]`);
        if (element)
          element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
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
                name="firstName"
                placeholder="First Name*"
                value={firstName}
                onChange={(e) => handleFieldChange("firstName", e.target.value)}
                className={`input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 ${errors.firstName ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl`}
                required
              />
              {errors.firstName && (
                <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>
              )}
            </div>

            <div className="relative">
              <img
                src="/assets/Images/user.png"
                alt="user-icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name*"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  if (formSubmitted) {
                    setErrors((prev) => ({
                      ...prev,
                      lastName:
                        e.target.value.trim() === ""
                          ? "Last name is required"
                          : "",
                    }));
                  }
                }}
                className={`input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 ${errors.lastName ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl`}
                required
              />
              {errors.lastName && (
                <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>
              )}
            </div>

            <div className="relative">
              <img
                src="/assets/Images/mail.png"
                alt="email-icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
              />
              <input
                type="email"
                name="email"
                placeholder="Email*"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (formSubmitted) {
                    const value = e.target.value.trim();
                    setErrors((prev) => ({
                      ...prev,
                      email:
                        value === ""
                          ? "Email is required"
                          : !validateEmail(value)
                            ? "Please enter a valid email address"
                            : "",
                    }));
                  }
                }}
                className={`input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 ${errors.email ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl`}
                required
              />
              {errors.email && (
                <p className="text-red-500 text-sm mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <img
                src="/assets/Images/phone.png"
                alt="phone-icon"
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number*"
                value={phone}
                onChange={(e) => {
                  setPhone(e.target.value);
                  if (formSubmitted) {
                    const value = e.target.value.trim();
                    setErrors((prev) => ({
                      ...prev,
                      phone:
                        value === ""
                          ? "Phone number is required"
                          : !validatePhone(value)
                            ? "Please enter a valid phone number"
                            : "",
                    }));
                  }
                }}
                className={`input-style pl-16 xl:w-[390px] xl:h-16 h-10 w-full border-2 ${errors.phone ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl`}
                required
              />
              {errors.phone && (
                <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
              )}
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
                  name="address"
                  placeholder="Address*"
                  value={address}
                  onChange={(e) => {
                    setAddress(e.target.value);
                    if (formSubmitted) {
                      setErrors((prev) => ({
                        ...prev,
                        address:
                          e.target.value.trim() === ""
                            ? "Address is required"
                            : "",
                      }));
                    }
                  }}
                  className={`input-style pl-16 xl:w-[590px] xl:h-16 h-10 w-full border-2 ${errors.address ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl`}
                  required
                />
                {errors.address && (
                  <p className="text-red-500 text-sm mt-1">{errors.address}</p>
                )}
              </div>

              <input
                type="text"
                name="suburb"
                placeholder="Suburb*"
                value={suburb}
                onChange={(e) => {
                  setSuburb(e.target.value);
                  if (formSubmitted) {
                    setErrors((prev) => ({
                      ...prev,
                      suburb:
                        e.target.value.trim() === ""
                          ? "Suburb is required"
                          : "",
                    }));
                  }
                }}
                className={`input-style pl-4 xl:w-full xl:h-16 h-10 w-full border-2 ${errors.suburb ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl`}
                required
              />
              {errors.suburb && (
                <p className="text-red-500 text-sm mt-1">{errors.suburb}</p>
              )}
            </div>

            <div className="flex flex-col gap-5 mt-6">
              <div className="relative">
                <img
                  src="/assets/Images/key.png"
                  alt="key-icon"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <select
                  name="instructions"
                  value={instructions}
                  onChange={(e) => {
                    setInstructions(e.target.value);
                    if (formSubmitted) {
                      setErrors((prev) => ({
                        ...prev,
                        instructions:
                          e.target.value === ""
                            ? "Please select how we can get in"
                            : "",
                      }));
                    }
                  }}
                  className={`input-style xl:w-full pl-16 xl:pr-6 xl:h-16 h-10 w-full border-2 ${errors.instructions ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl text-[#0B2F3D]`}
                  required
                >
                  <option value="">How can we get in?*</option>
                  <option value="Key under mat">Key under mat</option>
                  <option value="Access code">Access code</option>
                  <option value="Someone home">Someone home</option>
                </select>
                {errors.parking && (
                  <p className="text-red-500 text-sm mt-1">{errors.parking}</p>
                )}
                {errors.instructions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instructions}
                  </p>
                )}
              </div>

              <div className="relative">
                <img
                  src="/assets/Images/trans.png"
                  alt="Transport"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <select
                  name="parking"
                  value={parking}
                  onChange={(e) => {
                    setParking(e.target.value);
                    if (formSubmitted) {
                      setErrors((prev) => ({
                        ...prev,
                        parking:
                          e.target.value === ""
                            ? "Please select where we can park"
                            : "",
                      }));
                    }
                  }}
                  className={`input-style xl:w-full pl-16 xl:h-16 h-10 w-full border-2 ${errors.parking ? "border-red-500" : "border-[#0B2F3D]"} rounded-xl text-[#0B2F3D]`}
                  required
                >
                  <option value="">Where can we park?*</option>
                  <option value="Driveway">Driveway</option>
                  <option value="Street parking">Street parking</option>
                  <option value="Garage">Garage</option>
                </select>
                {errors.parking && (
                  <p className="text-red-500 text-sm mt-1">{errors.parking}</p>
                )}
                {errors.instructions && (
                  <p className="text-red-500 text-sm mt-1">
                    {errors.instructions}
                  </p>
                )}
              </div>
            </div>
          </form>
          <div className="mt-8">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                className="form-checkbox h-5 w-5"
                required
                onChange={(e) => {
                  if (formSubmitted) {
                    setErrors((prev) => ({
                      ...prev,
                      terms: !e.target.checked
                        ? "You must agree to the terms and conditions"
                        : "",
                    }));
                  }
                }}
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
              {errors.terms && (
                <p className="text-red-500 text-sm mt-1">{errors.terms}</p>
              )}
            </label>
          </div>
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

"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (result.success) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="bg-[#fffae7] flex justify-center xl:pt-6 pb-10 md:pb-16 xl:pb-40">
      <div className="xl:w-[90%] md:p-8 p-4 rounded-lg">
        <h2 className="xl:text-[50px] text-[30px] font-extrabold text-[#0B2F3D] text-center mb-4 leading-[90px] font-[Tropiline]">
          Get In <span className="text-[#FF3366]">Touch!</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-20 xl:mt-10 ">
          <div className="xl:max-w-[737px]">
            <p className="text-[#0B2F3D] text-wrap text-left mb-8 font-[Montserrat] xl:text-xl text-lg xl:tracking-wide ">
              Have questions or need assistance? Don't hesitate to contact our team today. We are available every day of the week via phone, email, or SMS.
            </p>
            <h3 className="font-medium text-[#0B2F3D] font-[Montserrat] xl:text-[32px] text-2xl leading-[150%] pb-6">
              Payment Details
            </h3>

            <div className="space-y-4">
              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Phone/SMS:
                </span>
                <span className="font-semibold xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#0B2F3D]">
                  0423 383 684
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Email:
                </span>
                <ul className="font-semibold xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#0B2F3D] text-right">
                  <li>hello@ausiwipe.com.au</li>
                  <li>support@ausiwipe.com.au</li>
                  <li>joinus@ausiwipe.com.au</li>
                </ul>
              </div>

              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Address:
                </span>{" "}
                <span className="font-semibold xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#0B2F3D]">
                  13/A Park Street, Melbourne
                </span>
              </div>

              <div className="flex justify-between">
                <span className="font-medium xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#3C5964]">
                  Opening Hours:
                </span>
                <div className="font-semibold xl:text-2xl text-sm font-[Montserrat] leading-[150%] text-[#0B2F3D] text-right">
                  <p>Mon - Fri: 9am - 5pm</p>
                  <p>Sat - Sun: 9am - 12pm</p>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col md:text-black">
            <div className="space-y-4">
              <div className="relative flex">
                <img
                  src="/assets/Images/user.png"
                  alt="User"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="text"
                  name="name"
                  placeholder="Daham"
                  className="input-style pl-16 xl:w-full xl:h-16 w-full h-10 border-2 border-[#0B2F3D] rounded-xl"
                  onChange={handleInputChange}
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
                  name="email"
                  placeholder="Email*"
                  className="input-style pl-16 xl:w-full xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <img
                  src="/assets/Images/phone.png"
                  alt="Phone"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="tel"
                  name="phone"
                  placeholder="0423 346 982"
                  className="input-style pl-16 xl:w-full xl:h-16 h-10 w-full border-2 border-[#0B2F3D] rounded-xl"
                  onChange={handleInputChange}
                />
              </div>

              <div className="relative">
                <img
                  src="/assets/Images/edit.png"
                  alt="Inquiry"
                  className="absolute left-4 top-1/2 transform -translate-y-1/2 w-8 h-8"
                />
                <input
                  type="text"
                  name="message"
                  placeholder="Enquiry"
                  className="input-style pl-16 xl:w-full xl:h-[200px] h-40 w-full border-2 border-[#0B2F3D] rounded-xl flex justify-end items-start"
                  onChange={handleInputChange}
                />
              </div>

              <form onSubmit={handleSubmit}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-[#FFC914] text-[#0B2F3D] w-full py-2 px-8 xl:mt-10 xl:px-8 xl:py-3 rounded-full font-[Montserrat] text-xl font-semibold leading-[150%] border-2 border-[#0B2F3D] hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Sending..." : "Send"}
                </button>
              </form>
              {submitStatus === "success" && (
                <p className="text-green-600 mt-4">
                  Your inquiry has been sent successfully!
                </p>
              )}
              {submitStatus === "error" && (
                <p className="text-red-600 mt-4">
                  Failed to send inquiry. Please try again later.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

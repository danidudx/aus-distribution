"use client";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaYoutube,
  FaPlus,
  FaTimes,
} from "react-icons/fa";
import { useState } from "react";
import SuccessPopup from "../shared/success-popup";
import { FaArrowRight } from "react-icons/fa";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPopup, setShowPopup] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showContact, setShowContact] = useState(false);

  const handleSubmit = async () => {
    if (isSubmitting || !email) return;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setStatus({
        type: "error",
        message: "Please enter a valid email address",
      });
      return;
    }

    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      const response = await fetch("/api/subscribe-newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus({ type: "success", message: data.message });
        setEmail("");
        setShowPopup(true);
        setTimeout(() => setShowPopup(false), 3000);
      } else {
        setStatus({ type: "error", message: data.message });
      }
    } catch (error) {
      setStatus({
        type: "error",
        message: "Failed to subscribe. Please try again later.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="relative">
      <div>
        <img
          src="/assets/Images/Vector.png"
          alt="Vector"
          className="w-full h-full mt-[-5%]"
        />
      </div>
      <footer className="bg-[#0B2F3D] xl:pt-16 md:pt-10 pt-6 text-white xl:pb-8 pb-10">
        <div className="xl:grid xl:grid-cols-3 xl:w-[90%] 2xl:w-[80%] w-[90%] mx-auto xl:gap-26 2xl:gap-32">
          {/* Left Section */}
          <div className="xl:w-[515px]">
            <h2 className="xl:text-[40px] text-lg font-bold xl:leading-[50px] xl:text-left md:text-center xl:font-extrabold font-[Tropiline]">
              We Send Non-Annoying <br /> Emails About Secret <br /> Things!
            </h2>
            <p className="xl:mt-2 font-[Montserrat] mt-4 text-base xl:font-medium xl:text-xl md:text-center xl:text-left">
              Pop your details here and we'll prove it.
            </p>
            <div className="mt-4 mb-8">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSubmit();
                }}
                className="flex items-center justify-center"
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="xl:w-[390px] md:w-[40%] w-[70%] h-10 xl:h-16 bg-gray-800 text-white focus:outline-none xl:border-2 border-[#8F9FA6] rounded-full pl-5"
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`bg-[#FFC914] xl:w-[110px] md:w-[10%] w-[22%] px-2 font-bold text-[10px] xl:text-lg h-10 xl:h-16 text-black xl:ml-8 ml-4 rounded-full hover:scale-105 active:scale-95 z-[10] ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
                >
                  {isSubmitting ? "Wait..." : "Sign Up"}
                </button>
              </form>
            </div>
            {status.type === "error" && (
              <p className="text-center text-red-400 text-sm mt-2">
                {status.message}
              </p>
            )}
            {showPopup && (
              <SuccessPopup
                message="Successfully subscribed to newsletter!"
                onClose={() => setShowPopup(false)}
              />
            )}
          </div>
          <hr className="xl:hidden my-2" />
          {/* Right Section */}
          <div className="flex-col gap-4 xl:flex-row xl:gap-[12%] 2xl:gap-[15%] xl:pl-25 xl:ml-14 xl:w-[800px] text-left justify-center flex">
            {/* Services */}
            <div className="flex flex-col font-[Montserrat]">
              <div className="flex items-center justify-between xl:block">
                <h3 className="font-bold xl:text-xl text-lg leading-[150%]">
                  Services
                </h3>
                <button
                  className="xl:hidden text-white text-xl"
                  onClick={() => setShowServices(!showServices)}
                >
                  {showServices ? <FaTimes /> : <FaPlus />}
                </button>
              </div>
              {(showServices ||
                (typeof window !== "undefined" &&
                  window.innerWidth >= 1280)) && (
                <div className="flex flex-col xl:gap-4 gap-2 xl:font-medium text-base md:text-lg mt-4 xl:mt-0">
                  <p>Once-off Cleaning</p>
                  <p>Recurring Cleaning</p>
                  <p>Standard Cleaning</p>
                  <p>Deep Cleaning</p>
                </div>
              )}
            </div>
            <hr className="xl:hidden" />

            {/* Contact */}
            <div className="flex flex-col font-[Montserrat] xl:mt-0">
              <div className="flex items-center justify-between xl:block">
                <h3 className="font-bold xl:text-xl text-lg leading-[150%]">
                  Contact
                </h3>
                <button
                  className="xl:hidden text-white text-xl"
                  onClick={() => setShowContact(!showContact)}
                >
                  {showContact ? <FaTimes /> : <FaPlus />}
                </button>
              </div>
              {(showContact ||
                (typeof window !== "undefined" &&
                  window.innerWidth >= 1280)) && (
                <div className="flex flex-col xl:gap-4 gap-2 xl:font-medium text-base md:text-lg mt-4 xl:mt-0">
                  <p>FAQ</p>
                  <p>Contact Us</p>
                  <p>Reviews</p>
                </div>
              )}
            </div>
            <hr className="xl:hidden" />
            {/* Social */}
            <div className="flex flex-col xl:gap-6 font-[Montserrat]">
              <h3 className="font-bold xl:text-xl text-lg leading-[150%]">
                Social
              </h3>
              <div className="flex gap-4 text-base items-center justify-start my-6 xl:my-0">
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaFacebookF />
                </div>
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaInstagram />
                </div>
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaTiktok />
                </div>
                <div className="w-8 h-8 bg-white text-[#0B2F3D] rounded-full flex items-center justify-center">
                  <FaYoutube />
                </div>
              </div>
              <div className="flex 2xl:gap-4 2xl:mt-4 xl:gap-2 md:justify-center justify-start">
                <img
                  src="/assets/Images/PaymentM.png"
                  alt="Visa"
                  className="h-6"
                />
              </div>
            </div>
          </div>
        </div>

        <hr className="my-8 xl:mx-40" />

        <div className="xl:mt-8 flex flex-col xl:flex-row md:justify-center text-left text-sm text-gray-400">
          <div className="flex items-center xl:justify-center mx-6 gap-10">
            <p>©Ausiwipe 2025</p>
            <img
              src="assets/Images/footerlogo.png"
              alt="footerlogo"
              className="xl:ml-12"
            />
          </div>
          <p className="xl:ml-12 mx-6 mt-6">
            AusiWipe acknowledges the Gubbi Gubbi people and the Jinibara people
            who are the Traditional Custodians of this <br /> land on which we
            work. We acknowledge the Traditional Custodians of Country
            throughout Australia. We recognise <br /> their continuous
            relationship to the land and pay our respects to Elders past,
            present and emerging.
          </p>
          </div>
          <div className="flex items-center justify-center my-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`bg-[#FFC914] xl:hidden flex items-center justify-between xl:flex-wrap xl:w-[20%] md:w-[20%] w-[40%] px-4 font-bold text-[10px] xl:text-2xl h-10 xl:h-16 text-black xl:ml-8 ml-4 rounded-full hover:scale-105 active:scale-95 z-[10] ${isSubmitting ? "opacity-70 cursor-not-allowed" : ""}`}
          >
            {"Booking Now"}
            <div className="w-6 h-6 bg-navbackground rounded-full flex items-center justify-center">
              <FaArrowRight
                className="w-3.5 h-3.5 cursor-pointer relative z-10"
                color="white"
              />
            </div>
          </button>
        </div>
      </footer>
    </div>
  );
};

export default Footer;

"use client";

import { useEffect, useState } from "react";
import { client } from "@/sanity/lib/client";

const DiscountPopup = () => {
  const [timeLeft, setTimeLeft] = useState(150); // Countdown in seconds
  const [isVisible, setIsVisible] = useState(false);
  const [discountCode, setDiscountCode] = useState("");

  useEffect(() => {
    const fetchDiscountCode = async () => {
      const query = `*[_type == "discountCode"][0]{code}`;
      const data = await client.fetch(query);
      setDiscountCode(data?.code || "winterclean");
    };
    fetchDiscountCode();
  }, []);

  useEffect(() => {
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 5000);
    return () => clearTimeout(showTimer);
  }, []);

  useEffect(() => {
    if (timeLeft <= 0) return;

    const interval = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;

    const minuteDigits = String(minutes).padStart(2, "0").split("");
    const secondDigits = String(remainingSeconds).padStart(2, "0").split("");

    return [...minuteDigits, ":", ...secondDigits];
  };

  const handleClose = () => {
    setIsVisible(false);
  };

  if (!isVisible) return null;

  return (
    <div className="fixed items-center bg-black bg-opacity-30 justify-center inset-0 z-20 p-4">
      <div className="bg-white p-8 rounded-2xl h-auto xl:h-auto md:ml-[20%] xl:ml-[20%] w-full max-w-lg xl:max-w-4xl md:max-w-lg border-4 border-navborder relative mt-20 mb-20">
        <button
          className="absolute bg-black w-8 h-8 xl:w-10 xl:h-10 rounded-full top-4 right-4 text-xl xl:text-2xl text-white flex items-center justify-center"
          onClick={handleClose}
        >
          &times;
        </button>
        <h2 className="text-lg text-left xl:text-[42px]  font-extrabold text-[#0B2F3D] leading-tight mb-6 md:mb-0 font-[Tropiline]">
          Get An Extra $20 Off <br /> Your First Clean!
        </h2>

        <div className="flex justify-center items-center text-lg xl:text-3xl md:text-4xl font-bold text-[#FF3366] mt-10 mb-2 gap-2 md:gap-4 relative">
          {formatTime(timeLeft).map((char, index) => (
            <div key={index} className="flex flex-col items-center">
              <div
                className={`$ {
                  char === ":"
                    ? "text-[46px] flex justify-center items-center -mt-1 px-2"
                    : "bg-white border-2 xl:border-4 border-[#FF3366] rounded-xl px-4 py-2 text-center text-[20px] xl:text-[32px] md:text-[36px]"
                }}`}
              >
                {char}
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-evenly w-full max-w-[300px] mx-auto text-[#0B2F3D] text-base font-[Montserrat] font-medium leading-[150%] mt-6 md:mt-2 xl:text-xl">
          <span>Minutes</span>
          <span>Seconds</span>
        </div>

        <p className="text-lg xl:text-xl font-[Montserrat] text-center text-[#0B2F3D] font-medium mt-10">
          Use the code at checkout:
        </p>
        <div className="flex items-center justify-center bg-[#FFEEB6] border-4 border-[#0B2F3D] rounded-2xl py-2 px-4 w-full max-w-xs mx-auto mt-4">
          <h3 className="font-[Tropiline] text-2xl xl:text-3xl md:text-4xl font-extrabold text-[#0B2F3D]">
            {discountCode}
          </h3>
        </div>

        <p className="font-[Montserrat] text-sm xl:text-xl text-center text-[#0B2F3D] font-medium mt-6">
          Available to all new customers' first clean
        </p>
        <h3 className=" font-[Tropiline] text-4xl xl:text-3xl md:text-4xl font-extrabold text-[#0B2F3D] text-center mt-4">
          AusiWipe
        </h3>
      </div>
    </div>
  );
};

export default DiscountPopup;

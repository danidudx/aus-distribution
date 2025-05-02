"use client";

import { FaArrowRight } from "react-icons/fa";
import { useRef, useEffect, useState } from "react";

const steps = [
  {
    icon: "/assets/Images/w1.png",
    title: "Get An Instant Quote",
    description: "Ideal for home maintenance and upkeep",
    position:
      "xl:top-[20%] xl:left-[12%] top-[8%] left-[5%] md:top-[10%] md:left-[10%] flex-warp w-64 md:w-72",
  },
  {
    icon: "/assets/Images/w2.png",
    title: "Complete Your Booking",
    description:
      "Customize your cleaning service request according to your needs and enjoy a fast checkout process",
    position:
      "xl:top-[280px] xl:left-[32%] top-[25%] right-[5%] flex-warp xl:w-64 md:w-72 items-center xl:items-start md:top-[25%] md:left-[55%] md:items-start",
  },
  {
    icon: "/assets/Images/w3.png",
    title: "Experience The Cleaning Magic",
    description:
      "Relax as our experienced cleaning professional cleans your space for you on your selected schedule",
    position:
      "xl:top-[20%] xl:left-[55%] top-[5%] left-[5%] md:top-[40%] md:left-[20%] flex-warp xl:w-64 md:w-72",
  },
  {
    icon: "/assets/Images/w4.png",
    title: "Leave A Review",
    description:
      "If you are happy with our service provide feedback and receive a discount for your next home clean!",
    position:
      "xl:bottom-[25%] xl:right-[8%] 2xl:right-[15%] bottom-[10%] right-[5%] items-center xl:items-start md:bottom-[20%] md:right-[15%] md:items-start flex-warp xl:w-64 md:w-72",
  },
];

const HowItWorks = () => {
  return (
    <div>
      <section className="bg-[#FFEEB6] relative mt-[-1px] xl:h-[800px] h-[1500px]">
        <img
          src="/assets/Images/star2.png"
          alt="Star1"
          className="xl:top-[-10px] xl:left-40 md:top-[60px] top-[40px] absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star2"
          className="xl:top-[90px] xl:left-[350px] left-[75%] top-[55%] absolute"
        />
        <img
          src="/assets/Images/star2.png"
          alt="Star2"
          className="xl:top-[-10px] xl:right-[370px] hidden md:block md:left-[75%] md:top-[15%] absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star1"
          className="xl:top-[60px] xl:right-40 top-[35%] absolute"
        />
        <div className="xl:w-auto w-[90%] mx-auto">
          <h2 className="xl:text-[64px] md:text-[48px] text-[30px] font-[Tropiline] font-extrabold text-center text-[#0B2F3D] xl:leading-[90px]">
            How Does It <span className="text-[#FF3366]">Works</span>?
          </h2>
          <p className="text-[#0B2F3D] font-[Montserrat] text-base md:text-xl xl:text-3xl font-medium text-center mt-4 mb-12 xl:mb-10 xl:leading-[150%]">
            You are just four steps away.
          </p>

          {/* Mobile View */}
          <div className="flex md:hidden xl:hidden flex-col xl:flex-row xl:justify-between xl:items-start relative">
            {steps.map((step, index) => {
              const contentRef = useRef(null);
              const [lineHeight, setLineHeight] = useState(0);

              useEffect(() => {
                if (contentRef.current) {
                  setLineHeight(contentRef.current.offsetHeight);
                }
              }, [step]);

              return (
                <div key={index} className="flex items-start xl:items-center">
                  <div className="flex flex-col items-center xl:flex-row xl:items-center xl:gap-4 mr-4 xl:mr-0 py-0">
                    {/* Step Number Circle */}
                    <div className="w-10 h-10 rounded-full bg-white text-black border-2 border-black flex items-center justify-center text-lg font-bold mb-0 py-0">
                      {index + 1}
                    </div>

                    {/* Dotted Line */}
                    {index !== steps.length && (
                      <>
                        <div className="hidden xl:block h-0.5 w-20 border-t-2 border-dotted border-black py-0"></div>
                        <div
                          className="block xl:hidden w-px border-l-2 border-dashed border-black mt-0 mb-0 py-0"
                          style={{ height: `${lineHeight}px` }}
                        ></div>
                      </>
                    )}
                  </div>

                  {/* Step Content */}
                  <div className="mt-0 mb-0" ref={contentRef}>
                    <img
                      src={step.icon}
                      alt={step.title}
                      className="w-14 h-auto xl:w-16 xl:h-16 object-contain"
                    />
                    <h3
                      className="text-[#0B2F3D] font-[Tropiline] font-extrabold text-left text-lg mt-6 xl:mt-0 leading-[150%]"
                      dangerouslySetInnerHTML={{ __html: step.title }}
                    />
                    <p
                      className="xl:text-sm text-sm text-[#0B2F3D] mt-2 font-medium text-left font-[Montserrat] leading-[150%]"
                      dangerouslySetInnerHTML={{ __html: step.description }}
                    />
                  </div>
                </div>
              );
            })}
          </div>

          {/* Desktop View */}
          <div className="hidden xl:block md:block w-full md:w-auto">
            {steps.map((step, index) => (
              <div
                key={index}
                className={`absolute ${step.position} flex flex-col text-center py-12`}
              >
                <div>
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-14 h-14 xl:w-auto xl:h-auto xl:mx-0 "
                  />
                </div>
                <h3
                  className="text-[#0B2F3D] font-[Tropiline] font-extrabold text-left text-2xl md:text-lg mt-6 leading-[150%]"
                  dangerouslySetInnerHTML={{ __html: step.title }}
                />
                <p
                  className="xl:text-sm text-base md:text-base text-[#0B2F3D] mt-2 font-medium text-left font-[Montserrat] leading-[150%]"
                  dangerouslySetInnerHTML={{ __html: step.description }}
                />
              </div>
            ))}
          </div>
          <div className="hidden md:block xl:relative w-full h-[600px] xl:h-[150px]">
            <img
              src="/assets/Images/a3.png"
              className="absolute xl:top-[28%] xl:left-[22%] xl:w-[162px] xl:h-[162px] w-[120px] h-[120px] top-[20%] left-[35%] md:top-[20%] md:left-[40%] md:w-[162px] md:h-[162px]"
            />
            <img
              src="/assets/Images/a2.png"
              className="absolute xl:top-[60%] xl:left-[41%] xl:w-[140px] xl:h-[162px] w-[120px] h-[120px] xl:rotate-0 rotate-180 top-[47%] left-[40%] md:top-[40%] md:left-[38%] md:w-[162px] md:h-[162px]"
            />
            <img
              src="/assets/Images/a1.png"
              className="absolute xl:top-[165%] xl:right-[25%] 2xl:right-[28%] xl:w-[120px] xl:h-[120px] xl:rotate-0 rotate-180 w-[120px] h-[120px] top-[62%] right-[20%] xl:scale-x-[1] scale-x-[-1] md:top-[55%] md:right-[38%] md:w-[162px] md:h-[140px]"
            />
          </div>
          {/* CTA Button */}
          <div className="flex justify-center xl:mt-72 md:mt-96 md:pt-32 xl:pt-0 pt-0 mt-20 relative">
            {/* Pink Shadow Background */}
            <div className="absolute w-[280px] h-12 bg-[#FF4081] rounded-full z-0 translate-x-[6px] translate-y-[6px]"></div>

            {/* Button */}
            <button className="bg-white text-navborder w-[280px] h-12 rounded-full flex items-center justify-center z-10 border-2 border-navborder gap-3 hover:scale-105 active:scale-95 relative">
              <span className="text-base font-[Montserrat] font-semibold leading-[150%]">
                Get Started
              </span>
              <div className="w-6 h-6 bg-navbackground rounded-full flex items-center justify-center">
                <FaArrowRight
                  className="w-3.5 h-3.5 cursor-pointer relative z-10"
                  color="white"
                />
              </div>
            </button>
          </div>
        </div>
      </section>
      <div className="relative">
        <img
          src="/assets/Images/Vector3.png"
          alt="Vector"
          className="w-full mb-[-5%]"
        />
      </div>
    </div>
  );
};

export default HowItWorks;

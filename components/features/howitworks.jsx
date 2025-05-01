"use client";

import { FaArrowRight } from "react-icons/fa";

const steps = [
  {
    icon: "/assets/Images/w1.png",
    title: "Get An Instant <br /> Quote",
    description: "Ideal for home maintenance <br /> and upkeep",
    position:
      "xl:top-[20%] xl:left-[12%] top-[8%] left-[5%] md:top-[10%] md:left-[10%]",
  },
  {
    icon: "/assets/Images/w2.png",
    title: "Complete Your <br /> Booking",
    description:
      "Customize your cleaning service <br /> request according to your needs and <br /> enjoy a fast checkout process",
    position:
      "xl:top-[280px] xl:left-[32%] top-[25%] right-[5%] items-center xl:items-start md:top-[25%] md:left-[55%] md:items-start",
  },
  {
    icon: "/assets/Images/w3.png",
    title: "Experience The <br /> Cleaning Magic",
    description:
      "Relax as our experienced cleaning <br /> professional cleans your space for <br /> you on your selected schedule",
    position:
      "xl:top-[20%] xl:left-[55%] top-[5%] left-[5%] md:top-[40%] md:left-[20%]",
  },
  {
    icon: "/assets/Images/w4.png",
    title: "Leave A Review",
    description:
      "If you are happy with our service <br /> provide feedback and receive a <br /> discount for your next home clean!",
    position:
      "xl:bottom-[25%] xl:right-[8%] 2xl:right-[15%] bottom-[10%] right-[5%] items-center xl:items-start md:bottom-[20%] md:right-[15%] md:items-start",
  },
];

const HowItWorks = () => {
  return (
    <div>
      <section className="bg-[#FFEEB6] relative xl:h-[800px] h-[1500px]">
        <img
          src="/assets/Images/star2.png"
          alt="Star1"
          className="xl:top-[-10px] xl:left-40 md:top-[60px] absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star2"
          className="xl:top-[90px] xl:left-[350px] left-[75%] top-[55%] absolute"
        />
        <img
          src="/assets/Images/star2.png"
          alt="Star2"
          className="xl:top-[-10px] xl:right-[370px] left-[75%] top-[15%] absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star1"
          className="xl:top-[60px] xl:right-40 top-[35%] absolute"
        />
        <div className="xl:w-auto w-[90%] mx-auto">
          <h2 className="xl:text-[64px] md:text-[48px] pt-6 text-[30px] font-[Tropiline] font-extrabold text-center text-[#0B2F3D] xl:leading-[90px]">
            How Does It <span className="text-[#FF3366]">Works</span>?
          </h2>
          <p className="text-[#0B2F3D] font-[Montserrat] text-xl font-medium text-center mt-4 mb-6 xl:mb-10 xl:leading-[150%]">
            You are just four steps away.
          </p>

          {/* Mobile View */}
          <div className="flex md:hidden xl:hidden flex-col xl:flex-row xl:justify-between xl:items-start relative">
            {steps.map((step, index) => (
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
                      <div className="block xl:hidden h-64 w-px border-l-2 border-dotted border-black mt-0 mb-0 py-0"></div>
                    </>
                  )}
                </div>

                {/* Step Content */}
                <div className="mt-0 mb-0">
                  <img
                    src={step.icon}
                    alt={step.title}
                    className="w-14 h-14 xl:w-16 xl:h-16 object-contain"
                  />
                  <h3
                    className="text-[#0B2F3D] font-[Tropiline] font-extrabold text-left text-xl mt-6 xl:mt-0 leading-[150%]"
                    dangerouslySetInnerHTML={{ __html: step.title }}
                  />
                  <p
                    className="xl:text-sm text-base text-[#0B2F3D] mt-2 font-medium text-left font-[Montserrat] leading-[150%]"
                    dangerouslySetInnerHTML={{ __html: step.description }}
                  />
                </div>
              </div>
            ))}
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
              className="absolute xl:top-[165%] xl:right-[25%] 2xl:right-[28%] xl:w-[120px] xl:h-[120px] xl:rotate-0 rotate-180 w-[120px] h-[120px] top-[62%] right-[20%] xl:scale-x-[1] scale-x-[-1] md:top-[58%] md:right-[38%] md:w-[162px] md:h-[140px]"
            />
          </div>
          {/* CTA Button */}
          <div className="flex justify-center xl:mt-0 mt-20 md:mt-0">
            <button className="bg-white text-navborder xl:top-[340px] md:top-[530px] -top-8 w-[280px] h-12 rounded-full flex items-center justify-center relative z-10 border-2 border-navborder gap-3 hover:scale-105 active:scale-95">
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
            <div className="absolute transform -translate-x-1/2 mt-14 md:mt-0 bg-[#FF4081] md:top-[1300px] 2xs:top-[1320px] 3xs:top-[1365px] xl:top-[700px] xl:bottom-[110px] md:bottom-[4.2%] left-[51%] xl:left-[50.2%] md:left-[50.2%] rounded-full w-[280px] h-12"></div>
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

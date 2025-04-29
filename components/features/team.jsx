"use client";

import { FaArrowRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

const MeetTheTeam = () => {
  return (
    <section className="bg-[#fffae7] xl:h-[824px] xl:py-0 py-20">
      <div className="container flex xl:flex-row flex-col xl:w-[90%] 2xl:w-[80%] w-[90%] mx-auto relative xl:justify-between">
        {/* Decorative Stars */}
        <img
          src="/assets/Images/star2.png"
          alt="Star1"
          className="xl:top-[10px] top-[-60px] left-0 absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star2"
          className="xl:top-[500px] top-[280px] right-[-20px] xl:left-[400px] md:left-[80%] absolute"
        />

        {/* Left content */}
        <div className="flex flex-col xl:items-left items-center mb-20">
          <h2 className="xl:text-[64px] text-[30px] text-center font-[Tropiline] font-extrabold text-[#0B2F3D] mb-6 xl:leading-[90px] xl:mt-20">
            Meet{" "}
            <span className="text-[#FF3366]">
              The Team <br />
            </span>{" "}
            Behind Clean.
          </h2>
          <p className="text-[#0B2F3D] font-[Montserrat] text-wrap xl:text-xl text-sm text-center xl:text-left xl:font-medium xl:w-[500px] xl:mb-10 mb-0 xl:leading-[150%]">
            Since 2021 our dedicated team at AusiWipe has
            been professionally transforming spaces with
            unparalleled expertise & commitment. We are
            here to cater to clean spaces, better places.
          </p>
          <div className="flex justify-center items-center top-0 absolute">
            <button className="bg-white text-navborder xl:top-[450px] md:top-[180px] top-[230px] w-[280px] h-12 rounded-full flex items-center justify-center shadow-md relative z-10 border-2 border-navborder gap-3 hover:scale-105 active:scale-95">
              <span className="text-base font-[Montserrat] font-semibold leading-[150%]">
                Book Now
              </span>
              <div className="w-6 h-6 bg-navbackground rounded-full flex items-center justify-center">
                <FaArrowRight
                  className="w-3.5 h-3.5 cursor-pointer relative z-10"
                  color="white"
                />
              </div>
            </button>
            <div className="absolute transform -translate-x-1/2 bg-[#FF4081] xl:top-[455px] md:top-[184px] top-[234px] left-[51%] rounded-full w-[280px] h-12"></div>
          </div>
        </div>

        {/* Right content */}
        <div className="flex flex-col mt-8 items-center gap-6 xl:w-[50%] w-full">
          {/* Main Static Image */}
          <img
            className="rounded-[32px] w-full xl:h-[400px] 2xl:h-[440px] md:h-[400px] object-cover"
            src="/assets/Images/c1.jpg"
            alt="Team Main"
          />

          {/* Swiper for mobile/tablet */}
          <div className="xl:hidden w-full px-4">
            <Swiper
              spaceBetween={10}
              slidesPerView={1.2}
              breakpoints={{
                640: { slidesPerView: 2.2 },
                768: { slidesPerView: 3 },
              }}
            >
              {["c2.jpg", "c3.jpg", "c4.jpg"].map((img, idx) => {
                const imgPath = `/assets/Images/${img}`;
                return (
                  <SwiperSlide key={idx}>
                    <img
                      className="rounded-2xl w-full h-auto object-cover"
                      src={imgPath}
                      alt={`Team member ${idx + 2}`}
                    />
                  </SwiperSlide>
                );
              })}
            </Swiper>
          </div>

          {/* Static row for desktop */}
          <div className="hidden xl:flex gap-6 w-full items-center justify-center">
            {["c2.jpg", "c3.jpg", "c4.jpg"].map((img, idx) => (
              <img
                key={idx}
                className="rounded-2xl w-1/3 h-[180px] object-cover"
                src={`/assets/Images/${img}`}
                alt={`Team member ${idx + 2}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;

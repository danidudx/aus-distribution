"use client";

import { FaArrowRight } from "react-icons/fa";

const MeetTheTeam = () => {
  return (
    <section className="bg-[#fffae7]  xl:h-[824px] xl:py-0 py-20">
      <div className="container flex xl:flex-row flex-col xl:w-[90%] 2xl:w-[80%] w-[90%] mx-auto relative xl:justify-between">
        <img
          src="/assets/Images/star2.png"
          alt="Star1"
          className="xl:top-[10px] top-[-60px] left-0 absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star2"
          className="xl:top-[500px] top-[220px] right-[-20px] xl:left-[400px] md:left-[80%] absolute"
        />
        <div className="flex flex-col xl:items-left mb-20">
          <h2 className="xl:text-[64px] text-[40px] font-[Tropiline] font-extrabold text-[#0B2F3D] mb-6 xl:leading-[90px] xl:mt-20">
            Meet{" "}
            <span className="text-[#FF3366]">
              The Team <br />
            </span>{" "}
            Behind Clean.
          </h2>
          <p className="text-[#0B2F3D] font-[Montserrat] xl:text-xl text-lg xl:font-medium xl:w-[500px] xl:mb-10 mb-10 xl:leading-[150%]">
            Since 2021 our dedicated team at AusiWipe has <br />
            been professionally transforming spaces with <br />
            unparalleled expertise & commitment. We are <br />
            here to cater to clean spaces, better places.
          </p>
          <div className="flex justify-center items-center top-0 absolute ">
            <button className="bg-white text-navborder xl:top-[450px] top-[280px] w-[330px] h-12 rounded-full flex items-center justify-center shadow-md relative z-10 border-2 border-navborder gap-3 hover:scale-105 active:scale-95">
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
            <div className="absolute transform -translate-x-1/2 bg-[#FF4081] xl:top-[455px] top-[284px] left-[51%] rounded-full w-[330px] h-12"></div>
          </div>
        </div>
        <div className="grid gap-4">
          <img
            className="rounded-[32px] xl:w-[100%] 2xl:w-[100%] md:w-full xl:h-[400px] 2xl:h-[440px] md:h-[400px]"
            src="/assets/Images/c1.jpg"
          />
          <div className="flex xl:flex-row md:flex-row flex-col xl:gap-6 gap-4 xl:w-[31%] 2xl:w-[32%] md:w-[32%] xl:h-[180px] 2xl:h-[200px] md:h-full object-cover">
            <img className="rounded-2xl" src="/assets/Images/c2.jpg" />
            <img className="rounded-2xl" src="/assets/Images/c3.jpg" />
            <img className="rounded-2xl" src="/assets/Images/c4.jpg" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeetTheTeam;

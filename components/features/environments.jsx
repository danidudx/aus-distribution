"use client";

import Image from "next/image";

const TransformSpaces = () => {
  const features = [
    { icon: "/assets/Images/icon1.png", title: "Price Best <br /> Guaranteed" },
    {
      icon: "/assets/Images/icon2.png",
      title: "Real Estate <br /> Guaranteed",
    },
    { icon: "/assets/Images/icon3.png", title: "Locally <br /> Owned" },
    { icon: "/assets/Images/icon4.png", title: "Fully <br /> Insured" },
  ];

  return (
    <div className="bg-[#fffae7] xl:h-[670px] h-auto pb-20 xl:p-20">
      <div className="flex flex-col w-[90%] mx-auto ">
        <h1 className="xl:text-7xl md:text-[48px] text-[30px] font-extrabold xl:text-left text-center font-[Tropiline] xl:leading-[90px] xl:mt-0 mt-10">
          <span className="text-[#0B2F3D]">
            At AusiWipe We Transform Spaces Into{" "}
          </span>
          <span className="text-[#FF3366]">Spotless Environments</span>
        </h1>

        <div className="xl:flex grid grid-cols-2 justify-center xl:gap-16 2xl:gap-48 gap-4 mt-10 xl:flex-row">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center xl:gap-4 mx-16 xl:mx-10"
            >
              <div className="flex items-center justify-center mb-4 border-[#FF3366] bg-clip-border text-[#FF3366] w-14 h-14 sm:w-full sm:h-full">
                <Image src={feature.icon} alt="icon" width={80} height={80} />
              </div>
              <p
                className="text-[#0B2F3D] xl:text-3xl lg:text-2xl sm:text-xl text-lg font-semibold font-[Tropiline] text-center leading-[150%]"
                dangerouslySetInnerHTML={{ __html: feature.title }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TransformSpaces;

"use client";

import { FaArrowRight } from "react-icons/fa";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const services = [
  {
    title: "Standard Cleaning",
    description: [
      "Ideal for home maintenance <br /> and upkeep",
      "Covers daily cleaning tasks",
      "Available once-off or on a <br /> recurring basis",
    ],
    image: "/assets/Images/clean1.jpg",
  },
  {
    title: "Deep Cleaning",
    description: [
      "Ideal for home maintenance <br /> and upkeep",
      "Covers daily cleaning tasks",
      "Available once-off or on a <br /> recurring basis",
    ],
    image: "/assets/Images/clean2.jpg",
    popular: true,
  },
  {
    title: "Commercial Cleaning",
    description: [
      "Ideal for home maintenance <br /> and upkeep",
      "Covers daily cleaning tasks",
      "Available once-off or on a <br /> recurring basis",
    ],
    image: "/assets/Images/clean3.jpg",
  },
  {
    title: "Vacate Cleaning",
    description: [
      "Ideal for home maintenance <br /> and upkeep",
      "Covers daily cleaning tasks",
      "Available once-off or on a <br /> recurring basis",
    ],
    image: "/assets/Images/clean4.jpg",
  },
];

const Services = () => {
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  const renderServiceCard = (service, index) => (
    <div
      key={index}
      className="bg-[#FFFAE8] 2xl:w-[302px] xl:w-[280px] w-full border border-[#0B2F3D] rounded-2xl p-6 relative flex flex-col items-center justify-center mx-auto"
    >
      {service.popular && (
        <span className="absolute top-4 left-4 bg-[#FFC914] text-black px-4 py-1 rounded-full text-xs">
          Popular
        </span>
      )}
      <img
        src={service.image}
        alt={service.title}
        className="2xl:w-[262px] xl:h-[160px] md:w-full md:h-[213px] 2xl:h-[213px] object-cover rounded-2xl"
      />
      <h3 className="text-[#0B2F3D] font-[Tropiline] text-xl text-center font-extrabold mt-6 leading-[150%]">
        {service.title}
      </h3>
      <ul className="mt-4 text-[#0B2F3D] text-sm font-medium space-y-4 text-left">
        {service.description.map((point, i) => (
          <li key={i} className="flex items-baseline gap-2">
            <span className="flex items-center justify-center w-4 h-4 bg-white border border-black rounded-full">
              <span className="w-2 h-2 bg-black rounded-full"></span>
            </span>
            <span dangerouslySetInnerHTML={{ __html: point }} />
          </li>
        ))}
      </ul>
      <button className="bg-white text-navborder top-4 mb-4 w-[232px] h-12 rounded-full flex items-center justify-center shadow-md relative z-10 border-2 border-navborder gap-3 hover:scale-105 active:scale-95">
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
      <div className="absolute transform -translate-x-1/2 bg-[#FF4081] bottom-[19px] left-[51%] rounded-full w-[232px] h-12"></div>
    </div>
  );

  return (
    <div className="relative">
      <div>
        <img
          src="/assets/Images/Vector1.png"
          alt="Vector"
          className="w-full h-full mt-[-5%]"
        />
      </div>
      <div className="bg-[#FFEEB6] py-20 relative">
        {/* Decorative Stars */}
        <img
          src="/assets/Images/star1.png"
          alt="Star1"
          className="top-[-20px] xl:left-20 md:left-[4%] left-0 absolute"
        />
        <img
          src="/assets/Images/star2.png"
          alt="Star2"
          className="top-[120px] xl:left-[320px] 2xl:left-[30%] md:left-[4%] lg:left-[25%] absolute"
        />
        <img
          src="/assets/Images/star2.png"
          alt="Star2"
          className="xl:top-16 xl:right-[22%] 2xl:right-[30%] lg:right-[25%] md:right-4 right-0 top-8 absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star1"
          className="xl:top-[200px] xl:right-[4%] 2xl:right-[10%] md:top-[14%] right-4 top-[250px] absolute"
        />

        {/* Header */}
        <div className="text-center mb-12 w-[90%] mx-auto">
          <h1 className="xl:text-[64px] md:text-[48px] text-[30px] font-[Tropiline] font-extrabold text-[#0B2F3D] leading-[90px] flex items-center justify-center">
            What's Your
            <span className="text-[#FF3366] pl-3"> Plan?</span>
          </h1>
          <p className="md:text-xl text-base font-[Montserrat] text-[#0B2F3D] mt-4 leading-[150%]">
            We provide you a bunch of cleaning services plans so you can exactly
            choose the service we have to cater your needs.
          </p>
        </div>

        {/* Grid for larger screens */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 2xl:grid-cols-4 gap-8 mx-auto w-[90%] 2xl:w-[80%] xl:w-[90%]">
          {services.map((service, index) => renderServiceCard(service, index))}
        </div>

        {/* Slider for mobile screens */}
        <div className="md:hidden w-[90%] mx-auto">
          <Slider {...sliderSettings}>
            {services.map((service, index) => (
              <div key={index} className="px-4">
                {renderServiceCard(service, index)}
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </div>
  );
};

export default Services;

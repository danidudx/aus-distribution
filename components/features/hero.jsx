"use client";

import { useState, useEffect } from "react";
import { Dropdown, Menu } from "antd";
import { DownOutlined } from "@ant-design/icons";
import { FaFacebook, FaInstagram, FaWhatsapp } from "react-icons/fa";
import { IoBedOutline } from "react-icons/io5";
import { PiBathtubLight } from "react-icons/pi";
import { MdOutlineCleaningServices } from "react-icons/md";
import { RiPriceTag3Line } from "react-icons/ri";
import { FaArrowRight } from "react-icons/fa";

const carouselImages = [
  "/assets/Images/carosul.jpeg",
  "/assets/Images/c1.jpg",
  "/assets/Images/c2.jpg",
  "/assets/Images/c3.jpg",
  "/assets/Images/c4.jpg",
];

export default function HeroSection() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedSize, setSelectedSize] = useState(4);
  const [selectedBedroom, setSelectedBedroom] = useState(4);
  const [selectedBathroom, setSelectedBathroom] = useState(2);
  const [selectedService, setSelectedService] = useState("Standard");
  const [selectedDiscount, setSelectedDiscount] = useState("10%");

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % carouselImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const sizeMenu = (
    <Menu onClick={(e) => setSelectedSize(e.key)}>
      <Menu.Item key="1">1 Bedroom</Menu.Item>
      <Menu.Item key="2">2 Bedroom</Menu.Item>
      <Menu.Item key="3">3 Bedroom</Menu.Item>
      <Menu.Item key="4">4 Bedroom</Menu.Item>
    </Menu>
  );

  const bedroomMenu = (
    <Menu onClick={(e) => setSelectedBedroom(e.key)}>
      <Menu.Item key="1">1 Bedroom</Menu.Item>
      <Menu.Item key="2">2 Bedroom</Menu.Item>
      <Menu.Item key="3">3 Bedroom</Menu.Item>
      <Menu.Item key="4">4 Bedroom</Menu.Item>
    </Menu>
  );

  const bathroomMenu = (
    <Menu onClick={(e) => setSelectedBathroom(e.key)}>
      <Menu.Item key="1">1 Bathroom</Menu.Item>
      <Menu.Item key="2">2 Bathroom</Menu.Item>
      <Menu.Item key="3">3 Bathroom</Menu.Item>
    </Menu>
  );

  const serviceMenu = (
    <Menu onClick={(e) => setSelectedService(e.key)}>
      <Menu.Item key="Standard">Standard</Menu.Item>
      <Menu.Item key="Deep Clean">Deep Clean</Menu.Item>
      <Menu.Item key="Premium">Premium</Menu.Item>
    </Menu>
  );

  const discountMenu = (
    <Menu onClick={(e) => setSelectedDiscount(e.key)}>
      <Menu.Item key="5%">5% Off</Menu.Item>
      <Menu.Item key="10%">10% Off</Menu.Item>
      <Menu.Item key="15%">15% Off</Menu.Item>
    </Menu>
  );

  return (
    <div className="relative w-full xl:h-[832px] bg-gradient-to-b from-[#FF3366] to-[#FFD143] text-white flex items-center px-8">
      <div className="flex flex-col xl:flex-row md:flex-row w-full xl:pl-20 md:pl-10 items-center gap-8">
        {/* Left Section */}
        <div className="xl:w-1/2 md:w-1/2 text-center xl:text-left md:text-left">
          <img
            src="/assets/Images/s1.png"
            alt="Star1"
            className="absolute top-0 left-0 xl:w-auto xl:h-auto w-10 h-18"
          />
          <img
            src="/assets/Images/s2.png"
            alt="Star2"
            className="absolute xl:top-[647px] right-0 top-[80%] xl:w-auto xl:h-auto w-10 h-18"
          />
          <img
            src="/assets/Images/s3.png"
            alt="Star3"
            className="absolute xl:top-[20%] xl:left-[32%] top-[5%] left-[82%] xl:w-auto xl:h-auto w-12 h-12 md:top-[25%] md:left-[35%]"
          />
          <img
            src="/assets/Images/s4.png"
            alt="Star4"
            className="absolute xl:top-[488px] xl:left-20 top-[20%] left-[10%] xl:w-auto xl:h-auto w-10 h-18 md:top-[50%] md:left-[2%]"
          />
          <img
            src="/assets/Images/8.png"
            alt="curveArrow"
            className="absolute xl:top-[75%] xl:left-[27%] top-[31%] left-[80%] xl:w-auto xl:h-auto w-16 h-18 md:top-[68%] md:left-[30%]"
          />
          <div className="flex items-center gap-2 mb-4 justify-center xl:justify-start md:justify-start">
            <img
              src="/assets/Images/rating.png"
              alt="Rating"
              className="relative 2xl:left-20  xl:top-[-100px] 2xl:w-[50%] xl:w-[70%] lg:w-[70%] top-4 w-[80%] h-10 xl:h-auto md:w-[70%] md:h-auto md:top-[-100px]"
            />
          </div>
          <div className="flex flex-col">
            <h1 className="relative 2xl:left-20 text-[#0B2F3D] font-extrabold md:text-[48px] xl:text-[72px] text-[40px] xl:leading-[90px] md:leading-[60px] xl:top-[-60px] md:top-[-60px] font-[Tropiline] mt-6 md:mt-0">
              We Clean <br />
              <span className="text-white">
                Rockhampton,
                <br /> Yeppoon,
                <br /> Gracemere
              </span>
            </h1>
            <p className="relative font-[Montserrat] text-xl font-medium 2xl:ml-[80px] xl:top-[-40px] md:top-[-40px] xl:leading-[150%] mt-4">
              Your perfect clean is just a click away.
            </p>

            {/* Social Media Icons */}
            <div className="flex gap-3 2xl:ml-[80px] md:mt-0 xl:mt-[-20px] mt-8 justify-center xl:justify-start md:justify-start">
              <div className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full cursor-pointer hover:bg-opacity-90 border-2 border-navborder">
                <FaFacebook size={24} />
              </div>
              <div className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full cursor-pointer hover:bg-opacity-90 border-2 border-navborder">
                <FaWhatsapp size={24} />
              </div>
              <div className="w-16 h-16 flex items-center justify-center bg-white text-black rounded-full cursor-pointer hover:bg-opacity-90 border-2 border-navborder">
                <FaInstagram size={24} />
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="xl:w-1/2 md:w-1/2 w-[100%] flex flex-col items-center xl:top-[-20px] md:top-8 xl:left-[-60px] relative xl:pb-0 md:pb-16 pb-10">
          {/* Image Carousel */}
          <div className="xl:w-[100%] xl:h-[343px] lg:w-[100%]  md:w-[100%] md:h-[250px] w-full h-[250px] rounded-3xl overflow-hidden relative">
            {carouselImages.map((image, index) => (
              <img
                key={index}
                src={image}
                alt="carousel"
                className={`absolute xl:w-full xl:h-full object-cover transition-opacity duration-1000 ${
                  index === activeIndex ? "opacity-100" : "opacity-0"
                }`}
              />
            ))}
          </div>

          {/* Dots Indicator */}
          <div className="relative flex justify-center top-[-30px] gap-2">
            {carouselImages.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  index === activeIndex ? "bg-white" : "bg-gray-400"
                }`}
                onClick={() => setActiveIndex(index)}
              ></div>
            ))}
          </div>

          {/* Booking Form */}
          <div className="mt-6 bg-white text-black p-6 rounded-3xl shadow-lg xl:w-[100%] xl:h-[343px] md:w-[100%] w-full">
            <div className="xl:grid xl:grid-cols-2 gap-4">
              {/* Dropdowns */}
              <Dropdown menu={sizeMenu} trigger={["click"]}>
                <div className="flex items-center gap-2 border-2 border-navborder p-3 rounded-lg cursor-pointer xl:mb-0 mb-4">
                  <MdOutlineCleaningServices size={20} />
                  <span>By Size {selectedSize}</span>
                  <DownOutlined className="ml-auto" />
                </div>
              </Dropdown>

              <Dropdown menu={sizeMenu} trigger={["click"]}>
                <div className="flex items-center gap-2 border-2 border-navborder p-3 rounded-lg cursor-pointer xl:mb-0  mb-4">
                  <IoBedOutline size={20} />
                  <span>Bedroom {selectedBedroom}</span>
                  <DownOutlined className="ml-auto" />
                </div>
              </Dropdown>

              <Dropdown menu={sizeMenu} trigger={["click"]}>
                <div className="flex items-center gap-2 border-2 border-navborder p-3 rounded-lg cursor-pointer xl:mb-0 mb-4">
                  <PiBathtubLight size={20} />
                  <span>Bathroom {selectedBathroom}</span>
                  <DownOutlined className="ml-auto" />
                </div>
              </Dropdown>

              <Dropdown menu={sizeMenu} trigger={["click"]}>
                <div className="flex items-center gap-2 border-2 border-navborder p-3 rounded-lg cursor-pointer xl:mb-0 mb-4">
                  <MdOutlineCleaningServices size={20} />
                  <span>{selectedService}</span>
                  <DownOutlined className="ml-auto" />
                </div>
              </Dropdown>

              <Dropdown menu={sizeMenu} trigger={["click"]}>
                <div className="flex items-center gap-2 border-2 border-navborder p-3 rounded-lg cursor-pointer col-span-2 xl:mb-0 mb-4">
                  <RiPriceTag3Line size={20} />
                  <span>Once Off {selectedDiscount}</span>
                  <DownOutlined className="ml-auto" />
                </div>
              </Dropdown>
            </div>

            {/* Book Now Button */}
            <div className="mt-6 flex items-center justify-center border-t pt-4 relative hover:scale-105 active:scale-95">
              <button className="bg-buttonyellow text-navborder px-6 w-[100%] h-[56px] rounded-full flex items-center justify-center shadow-md relative z-10 border-2 border-navborder gap-3">
                <span className="text-xl font-semibold">$119 | Book Now</span>
                <div className="w-8 h-8 bg-navbackground rounded-full flex items-center justify-center">
                  <FaArrowRight
                    className="w-3.5 h-3.5 cursor-pointer relative z-10"
                    color="#FFC914"
                  />
                </div>
              </button>
              <div className="absolute transform -translate-x-1/2 bg-navborder mt-[10px] left-[50.5%] rounded-full xl:w-[100%] h-[56px] w-full "></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

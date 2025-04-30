"use client";

import { useState } from "react";
import Link from "next/link";
import {
  FaSearch,
  FaChevronDown,
  FaPhoneAlt,
  FaBars,
  FaTimes,
} from "react-icons/fa";

export default function Navbar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="w-full">
      {/* Promo Bar */}
      <div className="bg-navbackground text-white text-center h-[40px] py-2 text-sm xl:text-xl font-[Montserrat] leading-[150%]">
        10% off weekly & fortnightly cleans{" "}
        <Link href="/Booking" className="font-bold cursor-pointer">
          Book Now
        </Link>
      </div>

      {/* Navbar */}
      <nav className="bg-primary text-white h-[88px] py-4 px-2 flex items-center justify-between border-b-2 border-navborder relative">
        {/* Mobile Menu Button */}
        <button
          className="xl:hidden mx-2 text-white text-2xl justify-start"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>
        {/* Left - Brand Logo */}
        <Link
          href="/"
          className="font-[Tropiline] font-bold text-[20px] xl:text-[40px] leading-[150%]"
        >
          AusiWipe
        </Link>

        {/* Call Button & Search for Mobile */}
        <div className="hidden flex-row pl-6 md:pl-[60%] gap-4 xl:hidden">
          {/* Call Button */}
          <button className="bg-buttonyellow text-navborder w-12 h-12 rounded-full xl:flex hidden items-center justify-center shadow-md border-2 border-navborder ">
            <FaPhoneAlt className=" text-navborder" />
          </button>

          {/* Search Icon */}
          <div className="xl:relative hidden xl:flex items-center justify-center">
            <FaSearch
              className="text-xl w-10 cursor-pointer relative z-10"
              color="0B2F3D"
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-2 border-navborder"></div>
          </div>
        </div>

        

        {/* Center - Navigation Links */}
        <div
          className={`absolute top-[88px] flex flex-col items-left justify-start left-0 w-full bg-[#FFF8E5] xl:bg-transparent xl:static xl:flex xl:items-center xl:justify-center xl:gap-6 text-lg xl:text-2xl font-[Montserrat] font-semibold text-[20px] leading-[200%] transition-transform xl:pl-20 ${isMenuOpen ? "translate-x-0" : "-translate-x-full"} xl:translate-x-0 xl:flex-row xl:gap-10 py-8 xl:py-0 shadow-md xl:shadow-none z-10`}
        >
          <Link
            href="/Booking"
            className="relative text-[#0B2F3D] xl:text-white w-auto px-4 py-4 border-b border-[#0B2F3D]/20 xl:border-none after:block after:h-[3px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform flex justify-between items-center"
          >
            Book
            <span className="xl:hidden">&gt;</span>
          </Link>
          <div className="relative w-auto px-4 py-4 border-b border-[#0B2F3D]/20 xl:border-none">
            <button
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="flex items-center justify-between w-full text-[#0B2F3D] xl:text-white xl:w-auto"
            >
              Services
              <FaChevronDown className="text-sm xl:ml-1" />
            </button>
            {isDropdownOpen && (
              <div className="absolute text-lg bg-white text-black rounded-md shadow-md mt-2 py-2 w-60">
                <Link
                  href="/CleaningDetails"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Cleaning Details
                </Link>
                <Link
                  href="/CustomerDetails"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Customer Details
                </Link>
              </div>
            )}
          </div>
          <Link
            href="/Contact"
            className="relative text-[#0B2F3D] xl:text-white w-auto px-4 py-4 border-b border-[#0B2F3D]/20 xl:border-none after:block after:h-[3px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform justify-between items-center"
          >
            Contact Us
            <span className="xl:hidden">&gt;</span>
          </Link>
          <Link
            href="/Blog"
            className="relative text-[#0B2F3D] xl:text-white w-auto px-4 py-4 border-b border-[#0B2F3D]/20 xl:border-none after:block after:h-[3px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform justify-between items-center"
          >
            Blog
            <span className="xl:hidden">&gt;</span>
          </Link>
          <Link
            href="/FAQ"
            className="relative text-[#0B2F3D] xl:text-white w-auto px-4 py-4 border-b border-[#0B2F3D]/20 xl:border-none after:block after:h-[3px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform justify-between items-center"
          >
            FAQ
            <span className="xl:hidden">&gt;</span>
          </Link>
          <div className="w-auto px-4 py-4 xl:hidden">
            <div className="relative flex items-center justify-center w-full">
              <input
                type="text"
                placeholder="Search Anything"
                className="w-full h-12 pl-4 pr-12 rounded-full border-2 border-[#0B2F3D] text-[#0B2F3D] placeholder-[#0B2F3D] focus:outline-none"
              />
              <FaSearch
                className="absolute right-4 text-xl cursor-pointer"
                color="#0B2F3D"
              />
            </div>
          </div>
        </div>

        {/* Right - Call Button, User Avatar & Search */}
        <div className="flex items-center gap-8 relative">
          {/* Call Button with Rectangle Below */}
          <div className="md:flex xl:flex relative hover:scale-105 active:scale-95">
            <button className="bg-buttonyellow text-navborder text-[10px] xl:text-lg px-4 w-auto xl:w-[220px] h-auto xl:h-12 py-2 rounded-full flex items-center justify-between gap-2 xl:gap-0 shadow-md relative z-10 border-2 border-navborder transition-all duration-300 ">
              Call 0423 383 684
              <FaPhoneAlt
                className="left-0 w-3.5 h-3.5 cursor-pointer text-center relative z-10"
                color="#FFC914"
              />
              <div className="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-navbackground rounded-full"></div>
            </button>
            {/* Rectangle below button */}
            <div className="absolute transform -translate-x-1/2 bg-navborder bottom-[-5px] left-[51%] rounded-full w-auto h-12"></div>
          </div>

          {/* Search Icon with Circle */}
          <div className="hidden xl:flex  relative active:scale-95 hover:scale-105">
            <FaSearch
              className="text-xl w-10 cursor-pointer relative z-10 transition-all duration-300 hover:text-gray-600"
              color="0B2F3D"
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-2 border-navborder transition-all duration-300 hover:bg-gray-200"></div>
          </div>
        </div>
      </nav>
    </div>
  );
}

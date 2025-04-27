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
      <div className="bg-navbackground text-white text-center h-[40px] py-2 font-medium font-[Montserrat] text-[16px] leading-[150%]">
        10% off weekly & fortnightly cleans{" "}
        <Link href="/Booking" className="font-bold cursor-pointer">
          Book Now
        </Link>
      </div>

      {/* Navbar */}
      <nav className="bg-primary text-white h-[88px] py-4 px-6 flex items-center justify-between border-b-2 border-navborder relative">
        {/* Left - Brand Logo */}
        <Link
          href="/"
          className="font-[Tropiline] font-bold text-[30px] xl:text-[40px] leading-[150%]"
        >
          AusiWipe
        </Link>

        {/* Call Button & Search for Mobile */}
        <div className="flex flex-row pl-6 md:pl-[60%] gap-4 xl:hidden">
          {/* Call Button */}
          <button className="bg-buttonyellow text-navborder w-12 h-12 rounded-full flex items-center justify-center shadow-md border-2 border-navborder ">
            <FaPhoneAlt className=" text-navborder" />
          </button>

          {/* Search Icon */}
          <div className="relative flex items-center justify-center">
            <FaSearch
              className="text-xl w-10 cursor-pointer relative z-10"
              color="0B2F3D"
            />
            <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-white rounded-full border-2 border-navborder"></div>
          </div>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="xl:hidden text-white text-2xl"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          {isMenuOpen ? <FaTimes /> : <FaBars />}
        </button>

        {/* Center - Navigation Links */}
        <div
          className={`absolute top-[88px] flex flex-col items-center justify-center left-0 w-full bg-primary xl:bg-transparent xl:static xl:flex xl:items-center xl:gap-6 text-lg font-[Montserrat] font-semibold text-[20px] leading-[200%] transition-transform xl:pl-20 ${
            isMenuOpen ? "translate-x-0" : "-translate-x-full"
          } xl:translate-x-0 xl:flex-row xl:gap-10 py-4 xl:py-0 shadow-md xl:shadow-none z-10 `}
        >
          <Link
            href="/Booking"
            className="relative after:block after:h-[3px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Book
          </Link>
          <div className="relative">
            <button
              onMouseEnter={() => setIsDropdownOpen(true)}
              onMouseLeave={() => setIsDropdownOpen(false)}
              className="flex items-center gap-1"
            >
              Services <FaChevronDown className="text-sm" />
            </button>
            {isDropdownOpen && (
              <div className="absolute bg-white text-black rounded-md shadow-md mt-2 py-2 w-40">
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
            className="relative after:block after:h-[3px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Contact Us
          </Link>
          <Link
            href="/Blog"
            className="relative after:block after:h-[3px] after:w-full after:bg-white after:scale-x-0 hover:after:scale-x-100 after:transition-transform"
          >
            Blog
          </Link>
        </div>

        {/* Right - Call Button, User Avatar & Search */}
        <div className="hidden xl:flex items-center gap-8 relative">
          {/* Call Button with Rectangle Below */}
          <div className="relative hover:scale-105 active:scale-95">
            <button className="bg-buttonyellow text-navborder px-6 w-[217px] h-12 rounded-full flex items-center shadow-md relative z-10 border-2 border-navborder transition-all duration-300 ">
              Call 0423 383 684
              <FaPhoneAlt
                className="left-7 w-3.5 h-3.5 cursor-pointer relative z-10"
                color="#FFC914"
              />
              <div className="absolute right-0 top-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-navbackground rounded-full"></div>
            </button>
            {/* Rectangle below button */}
            <div className="absolute transform -translate-x-1/2 bg-navborder bottom-[-5px] left-[51%] rounded-full w-[217px] h-12"></div>
          </div>

          {/* Search Icon with Circle */}
          <div className="relative active:scale-95 hover:scale-105">
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

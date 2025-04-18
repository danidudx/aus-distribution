"use client";

import Image from "next/image";

export default function CleaningServices() {
  return (
    <div className="bg-[#fffae7] xl:py-10 md:py-10 xl:px-6 py-5 xl:pb-40 pb-10 md:pb-20">
      <div className="flex flex-col justify-center w-[90%] mx-auto">
        <h1 className="xl:text-[32px] text-2xl text-[#0B2F3D] font-extrabold text-center mb-6 xl:leading-[48px] font-[Tropiline]">
          Want To Change Cleaning Companies For 2025? AusiWipe Is Here
        </h1>
        <div className="flex justify-center">
          <Image
            src="/assets/Images/c4.jpg"
            alt="Cleaning team at work"
            width={800}
            height={450}
            className="xl:w-[1280px] xl:h-[550px] rounded-3xl object-cover "
          />
        </div>
        <div className="flex flex-col justify-center mt-10 xl:pl-10 xl:mx-[15%] xl:w-[1280px]">
          <p className="text-[#8F9FA6] xl:text-xl text-lg font-medium font-[Montserrat] leading-[150%] mb-4">
            Date 03/03/2025
          </p>
          <p className="text-[#0B2F3D] xl:text-xl text-lg xl:font-medium font-[Montserrat] leading-[150%] mb-6">
            As a business owner, you know that a clean workspace is more than
            just a nice-to-have; it's essential for creating a healthy,
            productive, and professional environment. Yet not all cleaning
            companies deliver the same standard of care and attention to detail,
            and many Australian businesses find themselves less than satisfied
            with their current cleaners. Whether it's due to inconsistent
            results, poor communication, or unmet expectations, if you're
            considering a change for 2025, AusiWipe is here to help.
            <br /> <br />
            At AusiWipe, we specialize in high-quality commercial
            cleaning,office cleaning, and end-of-year cleaning services designed
            to provide Ausi businesses with the reliability and quality they
            deserve. Read on to learn why switching to AusiWipe could be the
            best decision you make for your business this coming year.
          </p>
          <h2 className="xl:text-[32px] text-2xl font-extrabold xl:leading-[48px] text-[#0B2F3D] font-[Tropiline] mt-8 mb-6">
            Why You Should Consider Changing Cleaning Companies
          </h2>
          <p className="text-[#0B2F3D] xl:text-xl text-lg font-medium font-[Montserrat] leading-[150%] mb-6">
            If you're thinking about switching cleaning companies, there are
            usually specific issues that have led you to consider a new
            provider. Here are a few common reasons businesses decide to change
            cleaners:
          </p>
          <ul className="list-decimal list-inside text-[#0B2F3D] space-y-4 xl:text-xl xl:font-medium font-[Montserrat] leading-[150%]">
            <li>
              <strong className="text-[#0B2F3D] xl:text-xl text-lg font-bold font-[Montserrat] leading-[150%]">
                Inconsistent Quality:
              </strong>{" "}
              Some companies deliver a thorough clean one week but miss critical
              details the next.
            </li>
            <li>
              <strong className="text-[#0B2F3D] xl:text-xl text-lg xl:font-bold font-[Montserrat] leading-[150%]">
                Lack of Transparency and Poor Communication:
              </strong>{" "}
              Businesses often face challenges when their cleaning provider
              fails to address feedback.
            </li>
            <li>
              <strong className="text-[#0B2F3D] xl:text-xl text-lg xl:font-bold font-[Montserrat] leading-[150%]">
                Outdated or Inefficient Cleaning Practices:
              </strong>{" "}
              If your provider isn’t using modern techniques and eco-friendly
              practices, it may be time for a switch.
            </li>
            <li>
              <strong className="text-[#0B2F3D] xl:text-xl text-lg xl:font-bold font-[Montserrat] leading-[150%]">
                Cost vs. Value:
              </strong>{" "}
              If you’re not getting the value you expect for what you’re paying,
              consider alternative providers.
            </li>
          </ul>
          <p className="text-[#0B2F3D] xl:text-xl text-lg xl:font-medium font-[Montserrat] leading-[150%] mt-8 mb-6">
            If any of these reasons resonate with your experience, then AusiWipe
            may be the perfect partner for a fresh start in 2025.
          </p>
          <h2 className="xl:text-[32px] text-2xl font-extrabold leading-[48px] text-[#0B2F3D] font-[Tropiline] mt-8 mb-6">
            Ready For A Better Cleaning Experience?
          </h2>
          <p className="text-[#0B2F3D] xl:text-xl text-lg xl:font-medium font-[Montserrat] leading-[150%]">
            <strong className="xl:font-semibold font-[Montserrat] leading-[200%]">
              {" "}
              Contact AusiWipe now{" "}
            </strong>{" "}
            to discuss your 2025 cleaning needs and experience a seamless
            transition to superior service!
          </p>
        </div>
      </div>
    </div>
  );
}

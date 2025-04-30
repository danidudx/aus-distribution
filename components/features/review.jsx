"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { PiSealCheckFill } from "react-icons/pi";
import { FaStar } from "react-icons/fa";

const ClientReviews = () => {
  const reviews = [
    {
      name: "Caimen Potts",
      text: "We had an amazing first experience with Clean. We came to them after being let down by another service, and I'm really glad we did.",
    },
    {
      name: "Gill Lugton",
      text: "Excellent service! The team was professional and left our office sparkling clean. Will definitely hire them again.",
    },
    {
      name: "Maria Wilkinson",
      text: "Absolutely fantastic! The team was thorough and super friendly. Highly recommend their cleaning services.",
    },
    {
      name: "Edward Philip",
      text: "From booking to cleaning, everything was smooth. Their attention to detail is unmatched!",
    },
  ];

  const teamImages = [
    "/assets/Images/c1.jpg",
    "/assets/Images/c2.jpg",
    "/assets/Images/c3.jpg",
    "/assets/Images/c4.jpg",
  ];

  return (
    <section className="bg-[#fffae7] py-16 overflow-hidden">
      <div className=" w-auto relative">
        {/* Background Decorations */}
        <img
          src="/assets/Images/star2.png"
          alt="Star1"
          className="absolute xl:top-[-40px] 2xl:left-40 xl:left-[5%] top-[-60px] left-0"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star2"
          className="absolute xl:top-[50px] md:top-[20px] top-[80px] xl:right-[160px] right-[10px]"
        />

        {/* Heading */}
        <h2 className="xl:text-[64px] text-[36px] font-[Tropiline] text-center xl:text-center font-extrabold text-[#0B2F3D] mb-10 xl:leading-[90px] w-auto">
          Reviews From <span className="text-[#FF3366]">Satisfied </span>Clients
        </h2>

        {/* Auto-moving Image Slider */}
        <div className="relative w-full overflow-hidden mt-12 mb-10">
          <div className="flex w-max animate-scroll">
            {[...teamImages, ...teamImages].map((img, index) => (
              <img
                key={index}
                src={img}
                className="rounded-[20px] xl:w-[470px] xl:h-[350px] h-[250px] object-cover mx-2"
                alt="Client"
              />
            ))}
          </div>
        </div>

        {/* Reviews Slider */}
        <Swiper
          slidesPerView={1}
          spaceBetween={20}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          dir="rtl"
          breakpoints={{
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 2,
            },
            1024: {
              slidesPerView: 2,
            },
            1280: {
              slidesPerView: 3,
            },
          }}
        >
          {reviews.map((review, index) => (
            <SwiperSlide key={index}>
              <div className="bg-white p-6 mx-4 md:p-8 rounded-2xl xl:min-w-[410px] xl:mx-0 xl:h-[200px] text-left">
                <div>
                  <div className="flex justify-end gap-1 mb-4">
                    {Array(5)
                      .fill(0)
                      .map((_, index) => (
                        <img
                          key={index}
                          src="/assets/images/review-star.png"
                          alt="Star"
                          className="w-5 h-5"
                        />
                      ))}
                  </div>
                  <p className="text-[#0B2F3D] font-medium text-[12px] leading-[150%]">
                    {review.text}
                  </p>
                </div>
                <div className="flex justify-end gap-2 items-center mt-4">
                  <span className="text-[#0B2F3D] font-semibold font-[Montserrat] text-[10px] xl:text-sm leading-[150%]">
                    Verified Client
                  </span>
                  <PiSealCheckFill className="text-blue-600" />
                  <span className="text-gray-400">|</span>
                  <h4 className="text-[#0B2F3D] font-semibold font-[Montserrat] text-[10px] xl:text-sm leading-[150%]">
                    {review.name}
                  </h4>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }

        .animate-scroll {
          display: flex;
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default ClientReviews;

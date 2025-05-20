import React from "react";

const logo = [
  {
    src: "assets/Images/LOGO1.png",
    alt: "Elite Real Estate Agency Rockhampton",
  },
  { src: "assets/Images/LOGO2.png", alt: "HHH Accountants" },
  { src: "assets/Images/LOGO3.png", alt: "JUCY Rentals" },
  { src: "assets/Images/LOGO4.png", alt: "Konnect" },
  { src: "assets/Images/LOGO5.png", alt: "LeapIn" },
  { src: "assets/Images/LOGO6.png", alt: "LJ Hooker Rockhampton" },
  { src: "assets/Images/LOGO7.png", alt: "Mr Real Estate Rockhampton" },
  { src: "assets/Images/LOGO8.png", alt: "Pat O'Driscoll Real Estate" },
  { src: "assets/Images/LOGO9.png", alt: "Ray White Rockhampton" },
];

const Logos = () => {
  return (
    <div className="w-full overflow-hidden bg-white py-8">
      <div className="flex whitespace-nowrap animate-marquee">
        {[...logo, ...logo].map((item, index) => (
          <img
            key={index}
            src={item.src}
            alt={item.alt}
            className="h-10 mx-8 object-contain grayscale opacity-80 hover:opacity-100 transition duration-300"
          />
        ))}
      </div>
    </div>
  );
};

export default Logos;

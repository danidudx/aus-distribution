import React from 'react';

const logo = [
  { src: 'assets/images/LOGO1.png', alt: 'jQuery' },
  { src: 'assets/images/LOGO 2.png', alt: 'Bridgestone' },
  { src: 'assets/images/LOGO 3.png', alt: 'Dash' },
  { src: 'assets/images/LOGO 4.png', alt: 'Dunlop' },
  { src: 'assets/images/LOGO5.png', alt: 'Giant' },
  { src: 'assets/images/LOGO6.png', alt: 'Digg' },
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

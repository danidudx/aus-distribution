"use client";

const data = [
  { feature: "Flexible Scheduling", us: true, others: true },
  { feature: "Free Consultation", us: true, others: false },
  { feature: "Instant Online Booking", us: true, others: false },
  { feature: "Affordable & Transparent Pricing", us: true, others: false },
  { feature: "Real Estate Approved Contractor", us: true, others: false },
  { feature: "Highly Trained & Certified Cleaner", us: true, others: false },
  { feature: "Specialized Commercial Cleaning", us: true, others: false },
  { feature: "Fully Insured & Bonded Services", us: true, others: false },
  { feature: "Advanced Equipment", us: true, others: false },
];

const ComparisonTable = () => {
  return (
    <section className="bg-[#fffae7] xl:pt-40 pb-10 pt-20">
      <div className="flex flex-col xl:flex-row 2xl:w-[80%] xl:w-[90%] w-[90%] mx-auto relative xl:justify-between">
        <img
          src="/assets/Images/star1.png"
          alt="Star1"
          className="xl:top-3 xl:left-0 top-[-12%] md:left-[80%] md:top-[-4%] left-70 absolute"
        />
        <img
          src="/assets/Images/star2.png"
          alt="Star2"
          className="xl:top-[68%] xl:left-0 top-[101%] md:top-[100%] md:left-[90%] left-[80%] absolute"
        />
        <img
          src="/assets/Images/star1.png"
          alt="Star1"
          className="top-[-12%] xl:top-[-15%] xl:right-[8%] md:right-[80%] md:top-[-4%] absolute"
        />
        <div className="flex flex-col">
          <h2 className="xl:text-[64px] md:text-[48px] text-[28px] font-[Tropiline] font-extrabold text-[#0B2F3D] xl:leading-[90px] xl:mt-28 text-center xl:text-left md:text-center">
            Still Doubt
            <br /> <span className="text-[#FF3366]">Choosing </span> Us?
          </h2>
          <img
            src="/assets/Images/emoji.png"
            alt="Emoji"
            className="2xl:p-7 2xl:top-[26%] 2xl:left-[30%] xl:p-5 xl:top-[32%] xl:left-[32%] md:top-[7%] md:left-[70%] top-[7%] right-[5%] xl:w-auto xl:h-auto md:w-14 md:h-14 w-10 h-10 absolute "
          />
          <p className="text-[#0B2F3D] font-[Montserrat] text-base text-center font-medium xl:w-[500px] mt-4 mb-10 xl:leading-[150%] md:text-center xl:text-left">
            Why so skeptical when you can clearly see why you should choose us
            over anyone else. Just book us once and see yourself the difference.
          </p>
        </div>
        <img
          src="/assets/Images/choosingtable.png"
          alt="Table"
          className="2xl:w-[737px] xl:w-[650px] 2xl:h-[682px] xl:h-[600px] md:w-auto md:h-auto"
        />
      </div>
    </section>
  );
};

export default ComparisonTable;

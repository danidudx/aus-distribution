"use client";

import { useState } from "react";
import { FaPlus, FaMinus } from "react-icons/fa";

const terms = [
  { title: "1. Terms" },
  {
    title: "2. Use License",
    content:
      "For all entire home cleans we can offer standard, deep clean, moving in/out and Airbnb cleaning. The differences in each is specified on our services page and will incur different pricing.",
  },
  { title: "3. Disclaimer" },
  { title: "4. Limitations" },
  { title: "5. Revisions and Errata" },
  { title: "6. Links" },
  { title: "7. Site terms of use modifications" },
  { title: "8. Unpaid services" },
  { title: "9. Governing law" },
  { title: "10. Cancelation policy" },
];

const TermsAndConditions = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleTerm = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fffae7] min-h-full xl:pb-40 pb-10 md:pb-20">
      <h1 className="xl:text-[50px] text-[40px] font-extrabold xl:mb-12 mb-6 xl:pt-10 pt-6 text-center font-[Tropiline] xl:leading-[90px]">
        <span className="text-[#FF3366]">Terms </span>
        <span className="text-[#0B2F3D]">and Conditions</span>
      </h1>

      <div className="mx-auto 2xl:w-[80%] w-[90%]">
        {terms.map((term, index) => (
          <div key={index} className="border-t-[3px] border-[#0B2F3D] py-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleTerm(index)}
            >
              <h2 className="text-[#0B2F3D] xl:text-2xl text-xl font-semibold leading-[150%] font-[Montserrat]">
                {term.title}
              </h2>
              <span className="text-[#0B2F3D] xl:text-xl text-lg mr-1">
                {openIndex === index ? <FaMinus /> : <FaPlus />}
              </span>
            </div>
            {openIndex === index && term.content && (
              <p className="mt-2 text-[#0B2F3D] text-xl font-[Montserrat] font-medium">
                {term.content}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TermsAndConditions;

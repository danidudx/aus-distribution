"use client";

import { useState } from "react";
import { FaPlus, FaMinus, FaTimes } from "react-icons/fa";
import { FiX } from "react-icons/fi";

const faqs = [
  {
    question: "What is included in the services?",
    answer:
      "Our services include standard, deep clean, moving in/out, and Airbnb cleaning. Each has different pricing.",
  },
  {
    question: "What are the types of cleans?",
    answer:
      "For all entire home cleans, we can offer standard, deep clean, moving in/out, and Airbnb cleaning. The differences in each are specified on our services page and will incur different pricing.",
  },
  {
    question: "How long will it take to clean my home?",
    answer: "The duration depends on the size and condition of your home.",
  },
  {
    question: "Do I need to be at home?",
    answer: "No, you can provide access to the cleaner without being present.",
  },
  {
    question: "Do I need to provide the cleaner with supplies?",
    answer: "No, our cleaners come with all the necessary supplies.",
  },
  {
    question: "Do I need to have parking for the cleaner?",
    answer: "Yes, providing parking will help avoid additional costs.",
  },
  {
    question: "Can I give the cleaner a key?",
    answer: "Yes, you can securely provide a key for access.",
  },
  {
    question: "Will I get the same cleaner each time?",
    answer: "We try to send the same cleaner whenever possible.",
  },
  {
    question: "How do I pay for the service?",
    answer: "Payment can be made through our secure online system.",
  },
];

const FAQsPage = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="bg-[#fffae7] min-h-full xl:pb-40 pb-10 md:pb-20">
      <h1 className="xl:text-[50px] text-[30px] font-extrabold xl:mb-12 mb-6 xl:pt-10 pt-6 text-center font-[Tropiline] xl:leading-[90px]">
        <span className="text-[#0B2F3D]">
          {" "}
          Frequently <span className="text-[#FF3366] ">
            Asked
          </span> Questions{" "}
        </span>
      </h1>

      <h3 className="text-[#0B2F3D] xl:text-xl text-lg leading-[150%] font-[Montserrat] md:text-center text-left mx-auto 2xl:w-[80%] w-[90%] pb-10">
        A Compiled list of frequently asked question is below. Can’t find the
        answer you’re looking for? Reach out to{" "}
        <span className="text-[#FF3366] leading-[200%] xl:font-semibold">
          {" "}
          here{" "}
        </span>
      </h3>

      <div className="mx-auto 2xl:w-[80%] w-[90%]">
        {faqs.map((faq, index) => (
          <div key={index} className="border-t-[3px] border-[#0B2F3D] py-4">
            <div
              className="flex justify-between items-center cursor-pointer"
              onClick={() => toggleFAQ(index)}
            >
              <h2 className="text-[#0B2F3D] xl:text-2xl text-xl font-semibold leading-[150%] font-[Montserrat]">
                {faq.question}
              </h2>
              <span className="text-[#0B2F3D] xl:text-xl text-lg mr-1">
                {openIndex === index ? <FiX className= "text-2xl" /> : <FaPlus />}
              </span>
            </div>
            {openIndex === index && (
              <p className="my-4 text-[#0B2F3D] md:text-xl text-base font-[Montserrat] font-medium">
                {faq.answer}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FAQsPage;

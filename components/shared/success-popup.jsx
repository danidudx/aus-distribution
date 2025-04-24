"use client";

import { useEffect } from "react";

const SuccessPopup = ({ message, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-2xl max-w-md w-full mx-4 border-4 border-[#0B2F3D] relative transform transition-all">
        <div className="flex items-center justify-center mb-4">
          <svg
            className="w-12 h-12 text-green-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 13l4 4L19 7"
            ></path>
          </svg>
        </div>
        <p className="text-center text-xl font-[Montserrat] text-[#0B2F3D] font-medium">
          {message}
        </p>
      </div>
    </div>
  );
};

export default SuccessPopup;

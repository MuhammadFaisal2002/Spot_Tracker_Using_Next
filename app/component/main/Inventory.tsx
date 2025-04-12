'use client';

import { useState } from "react";
import Popup from "../popups/Popup";

export default function Inventory() {
  // States for controlling popups
  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const [showConsultationPopup, setShowConsultationPopup] = useState(false);

  // Toggle functions
  const toggleDemoPopup = () => {
    setShowDemoPopup(!showDemoPopup); // Toggle Request a Free Demo popup
  };

  const toggleConsultationPopup = () => {
    setShowConsultationPopup(!showConsultationPopup); // Toggle Book Consultation popup
  };

  return (
    <>
      <div className="bg-black text-center my-20 text-white h-auto py-16 px-4 sm:px-10 md:px-[90px]">
        <p className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-[500] leading-tight">
          Ready to Automate Your{" "}
          <span className="font-[900]">Inventory Management?</span>
        </p>
        <p className="p-4 text-sm sm:text-base md:text-lg">
          Discover how Spot Tracker can transform your inventory management process
        </p>
        <div className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6">
          {/* Button for Request a Free Demo */}
          <button
            onClick={toggleDemoPopup}
            className="bg-[#CF2121] text-white text-sm sm:text-base md:text-[18px] font-[700] rounded-full py-3 px-6 sm:py-4 sm:px-8"
          >
            Request a Free Demo
          </button>

          {/* Button for Book Consultation */}
          <button
            onClick={toggleConsultationPopup}
            className="border-4 border-[#CF2121] text-white text-sm sm:text-base md:text-[18px] font-[700] rounded-full py-3 px-6 sm:py-4 sm:px-8"
          >
            Book Consultation
          </button>
        </div>
      </div>

      {/* Popup for Request a Free Demo */}
      {showDemoPopup && (
        <Popup isOpen={showDemoPopup} onClose={() => setShowDemoPopup(false)} />
      )}

      {/* Popup for Book Consultation */}
      {showConsultationPopup && (
        <Popup isOpen={showConsultationPopup} onClose={() => setShowConsultationPopup(false)} />
      )}
    </>
  );
}

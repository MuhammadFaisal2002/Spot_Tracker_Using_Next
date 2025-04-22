'use client';

import { useEffect, useRef, useState } from "react";
import Popup from "../popups/Popup";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Inventory() {
  const [showDemoPopup, setShowDemoPopup] = useState(false);
  const [showConsultationPopup, setShowConsultationPopup] = useState(false);
  const [showModal, setShowModal] = useState(false);
  // Refs for animation
  const headingRef = useRef<HTMLParagraphElement>(null);
  const subTextRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  // Function to toggle Popup visibility
  const togglePopup = () => {
    setShowModal((prev)=> !prev);
  };
  // Scroll animation
  useEffect(() => {
    if (headingRef.current) {
      gsap.fromTo(
        headingRef.current,
        { scale: 0.8, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1.2,
          ease: "power3.out",
          scrollTrigger: {
            trigger: headingRef.current,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (subTextRef.current) {
      gsap.fromTo(
        subTextRef.current,
        { y: 50, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.2,
          scrollTrigger: {
            trigger: subTextRef.current,
            start: "top 85%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    if (buttonsRef.current) {
      gsap.fromTo(
        buttonsRef.current,
        { scale: 0.9, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          delay: 0.4,
          scrollTrigger: {
            trigger: buttonsRef.current,
            start: "top 90%",
            toggleActions: "play none none reverse",
          },
        }
      );
    }

    return () => {
      ScrollTrigger.getAll().forEach(trigger => trigger.kill());
    };
  }, []);

  const toggleDemoPopup = () => {
    setShowDemoPopup(!showDemoPopup);
  };

  const toggleConsultationPopup = () => {
    setShowConsultationPopup(!showConsultationPopup);
  };

  return (
    <>
      <div className="bg-black text-center my-20 text-white h-auto py-16 px-4 sm:px-10 md:px-[90px]">
        <p
          ref={headingRef}
          className="text-[28px] sm:text-[36px] md:text-[48px] lg:text-[64px] font-[500] leading-tight"
        >
          Ready to Automate Your{" "}
          <span className="font-[900]">Inventory Management?</span>
        </p>

        <p
          ref={subTextRef}
          className="p-4 text-sm sm:text-base md:text-lg"
        >
          Discover how Spot Tracker can transform your inventory management process
        </p>

        <div
          ref={buttonsRef}
          className="mt-6 flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6"
        >
          <button
            onClick={togglePopup}
            className="bg-[#CF2121] text-white text-sm sm:text-base md:text-[18px] font-[700] rounded-full py-3 px-6 sm:py-4 sm:px-8"
          >
            Request a Free Demo
          </button>

          <button
            onClick={togglePopup}
            className="border-4 border-[#CF2121] text-white text-sm sm:text-base md:text-[18px] font-[700] rounded-full py-3 px-6 sm:py-4 sm:px-8"
          >
            Book Consultation
          </button>
        </div>
      </div>

      {showDemoPopup && (
        <Popup isOpen={showDemoPopup} onClose={() => setShowDemoPopup(false)} />
      )}

      {showConsultationPopup && (
        <Popup isOpen={showConsultationPopup} onClose={() => setShowConsultationPopup(false)} />
      )}
      <Popup isOpen={showModal} onClose={()=>setShowModal(false)} />
    </>
  );
}

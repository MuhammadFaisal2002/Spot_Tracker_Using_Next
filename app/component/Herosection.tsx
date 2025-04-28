'use client';

import Image from "next/image";
import Herosection1 from "./main/Herosection1";
import Popup from './popups/Popup';
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Herosection() {
  const [showModal, setShowModal] = useState(false);
  const sectionRef = useRef(null);
  const imageRef = useRef(null);
  const contentRef = useRef(null);

  const togglePopup = () => setShowModal((prev) => !prev);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(contentRef.current, {
        x: -100,
        opacity: 0,
        skewX: 10,
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
          toggleActions: "play none none none",
        },
      });
  
      gsap.from(imageRef.current, {
        x: 100,
        opacity: 0,
        skewX: -10,
        duration: 2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: imageRef.current,
          start: "top 85%",
          toggleActions: "play none none none",
        },
      });
    }, sectionRef);
  
    return () => ctx.revert();
  }, []);
  

  return (
    <>
      <section ref={sectionRef} className="relative grid grid-cols-1 lg:grid-cols-3 gap-6 px-4 sm:px-6 md:px-8 lg:px-[105px] pt-4 sm:pt-6 md:pt-8 lg:pt-[100px]">
        {/* Text Content */}
        <article ref={contentRef} className="lg:col-span-2">
          <h1 className="text-[28px] sm:text-[32px] md:text-[36px] lg:text-[48px] font-extrabold">
            <span className="text-[#055FA8]">Revolutionize </span>
            Your Inventory <br />
            Management with <span className="text-[#055FA8]">Spot Tracker</span>
          </h1>

          <p className="text-[#787878] text-[14px] sm:text-[16px] md:text-[18px] font-medium mt-[20px]">
            The ultimate solution for large-scale industries to automate inventory
            orders, eliminate order bookers, and streamline operations effortlessly.
          </p>

          <button
            onClick={togglePopup}
            className="bg-[#CF2121] text-white font-bold text-[14px] sm:text-[16px] h-[45px] w-[190px] md:h-[49px] md:w-[220px] rounded-full mt-[30px]"
          >
            Request a Free Trial
          </button>

          <div className="mt-[40px]">
            <Image
              src="/rating.png"
              alt="Customer Rating"
              width={400}
              height={80}
              className="object-contain"
            />
          </div>
        </article>

        {/* Images */}
        <aside ref={imageRef} className="lg:col-span-1 relative flex justify-center items-center">
          <Image
            src="/hero1.png"
            alt="Dashboard Preview"
            width={1018}
            height={518}
            className="object-contain rounded-[20px] z-10 w-[100%] sm:w-[90%] md:w-[80%] lg:w-[70%]"
          />
          <Image
            src="/hero2.png"
            alt="Top Products Sold"
            width={320}
            height={193}
            className="absolute top-[10%] right-[15%] w-[220px] z-20"
          />
          <Image
            src="/hero3.png"
            alt="Order Overview"
            width={320}
            height={193}
            className="absolute bottom-[12%] right-[20%] w-[250px] z-20"
          />
        </aside>
      </section>

      <Popup isOpen={showModal} onClose={() => setShowModal(false)} />
      <Herosection1 />
    </>
  );
}

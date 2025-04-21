"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Herosection1() {
  const cardsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    cardsRef.current.forEach((card, i) => {
      const direction = i % 2 === 0 ? -1 : 1; // alternate tilt direction

      gsap.fromTo(
        card,
        {
          x: 150 * direction,
          y: 50,
          rotateZ: 100 * direction,
          opacity: 0,
        },
        {
          x: 0,
          y: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        }
      );
    });

    return () => {
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, []);

  return (
    <div className="bg-black text-white w-full px-4 sm:px-6 md:px-8 lg:px-[105px] py-6 sm:py-8 md:py-[60px] lg:py-[80px]">
      {/* Heading */}
      <div className="text-center mb-[40px] sm:mb-[50px] md:mb-[60px]">
        <h2 className="text-[24px] sm:text-[30px] md:text-[36px] lg:text-[45px] font-[700] leading-tight">
          Why Choose Spot Tracker?
        </h2>
        <p className="text-[14px] sm:text-[15px] md:text-[16px] lg:text-[18px] font-[400] mt-2 sm:mt-3 md:mt-4 tracking-tight">
          Choose Spot Tracker for streamlined inventory management, automated workflows,
          <br className="hidden lg:block" />
          and actionable insights. Boost efficiency, reduce costs, and drive business growth.
        </p>
      </div>

      {/* Cards */}
      <div className="flex flex-col sm:flex-row md:flex-row justify-center gap-6 sm:gap-8 md:gap-10">
        {[1, 2, 3].map((_, i) => (
          <div
            key={i}
            ref={(el) => {
              if (el) cardsRef.current[i] = el;
            }}
            className="w-full sm:w-[280px] md:w-[320px] lg:w-[360px] h-[200px] sm:h-[220px] md:h-[240px] lg:h-[250px] bg-[#055FA8] rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] text-white p-6 sm:p-8 md:p-11 text-center"
          >
            <Link href="#">
              <Image
                src={`/card${i + 1}.png`}
                alt={`Card ${i + 1}`}
                width={50}
                height={50}
                className="mx-auto mb-3 sm:mb-4"
              />
              <h3 className="text-[15px] sm:text-[16px] md:text-[17px] font-bold mb-2">
                {i === 0
                  ? "Automated Inventory Orders"
                  : i === 1
                  ? "Seamless Approval & Invoicing"
                  : "Faster Order Processing"}
              </h3>
              <p className="text-[12px] sm:text-[13px] md:text-[14px] tracking-tight">
                {i === 0
                  ? "No need for manual order bookers."
                  : i === 1
                  ? "Back office manages everything in real time."
                  : "Warehouse receives, packs, and delivers."}
              </p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

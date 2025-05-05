"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

export default function DualCard2() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const elements = document.querySelectorAll(".step");

    elements.forEach((el) => {
      gsap.fromTo(
        el,
        {
          opacity: 0,
          y: -500,
          x: 0,
          rotationX: 90,
          scale: 0.5,
        },
        {
          opacity: 1,
          y: 0,
          x: 0,
          rotationX: 0,
          scale: 1,
          ease: "power4.out",
          duration: 2.5,
          scrollTrigger: {
            trigger: el,
            start: "bottom 50%",
            end: "top 50%",
            scrub: 3,
          },
        }
      );
    });
  }, []);

  return (
    <div className="w-full overflow-hidden">
      <section
        id="services"
        aria-labelledby="how-it-works-title"
        className="mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-8 lg:px-[105px] w-full max-w-[100vw]"
      >
        <header className="text-center mb-8 mx-auto w-full max-w-[90vw]">
          <h2
            id="how-it-works-title"
            className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[64px] font-[700] mb-4 sm:mb-6"
          >
            How it Works?
          </h2>
          <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px]">
            Seamless Order Management in 4 Simple Steps
          </p>
        </header>

        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 w-full relative">
          {/* Step 1 - Modified for overlap */}
          <article className="w-full md:w-[48%] bg-white shadow-sm rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden step relative md:mt-12">
            <div className="pb-4 sm:pb-6 md:pb-8">
              <div className="text-[#B0D7F633] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-right pr-4 sm:pr-6 md:pr-8 lg:pr-[12px]">
                01
              </div>
              <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-[-40px]">
                <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                  Step 1
                </h3>
                <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                  Store Orders Inventory
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                  With Spot Tracker, effortlessly manage your store&apos;s inventory and streamline your ordering process.
                </p>
              </div>
            </div>
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] relative">
              <Image
                src="/step1.png"
                alt="Illustration for step 1: Store Orders Inventory"
                fill
                className="object-contain rounded-b-[20px] sm:rounded-b-[25px] lg:rounded-b-[30px]"
              />
            </div>
          </article>

          {/* Step 2 - Adjusted for consistency */}
          <article className="w-full md:w-[48%] bg-white shadow-lg shadow-b-only rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden step">
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] relative mt-8 md:mt-0">
              <Image
                src="/step2.png"
                alt="Illustration for step 2: Back Office Approves"
                fill
                className="object-contain rounded-t-[20px] sm:rounded-t-[25px] lg:rounded-t-[30px]"
              />
            </div>
            <div className="  pb-4 sm:pb-6 md:pb-8">
              <div className="text-[#B0D7F633] mb-10 text-[80px] sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-left pl-4 sm:pl-6 md:pl-8 lg:pl-[12px]">
                02
              </div>
              <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-[-60px]">
                <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                  Step 2
                </h3>
                <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                  Back Office Approves & <br /> Generate Invoices
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                  Our platform enables you to approve orders, generate invoices, and manage payments — all in a seamless workflow.
                </p>
              </div>
            </div>
          </article>
        </div>

        {/* Steps 3 & 4 - Adjusted for consistency */}
        <div className="flex flex-col md:flex-row md:justify-between gap-8 md:gap-10 mt-[20px] sm:mt-[30px] md:mt-[35px] lg:mt-[40px] w-full relative">
          {/* Step 3 */}
          <article className="w-full md:w-[48%] bg-white shadow-sm rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden step relative  md:mt-12">
            <div className="pb-4 sm:pb-6 md:pb-8">
              <div className="text-[#B0D7F633] text-[80px] sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-right pr-4 sm:pr-6 md:pr-8 lg:pr-[12px]">
                03
              </div>
              <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-[-40px]">
                <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                  Step 3
                </h3>
                <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                  Warehouse Packs & Delivers
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                  With Spot Tracker, warehouse operations become faster and more efficient. Our platform enables you to optimize picking and packing, automate shipping labels, and track deliveries in real-time.
                </p>
              </div>
            </div>
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] relative ">
              <Image
                src="/step3.png"
                alt="Illustration for step 3: Warehouse Packs & Delivers"
                fill
                className="object-contain rounded-b-[20px] sm:rounded-b-[25px] lg:rounded-b-[30px] "
              />
            </div>
          </article>

          {/* Step 4 */}
          <article className="w-full md:w-[48%] mb-4 bg-white shadow-lg shadow-b-only rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] overflow-hidden step">
            <div className="w-full h-[400px] md:h-[450px] lg:h-[500px] relative mt-8 md:mt-0">
              <Image
                src="/step4.png"
                alt="Illustration for step 4: Store Receives Order"
                fill
                className="object-contain rounded-t-[20px] sm:rounded-t-[25px] lg:rounded-t-[30px] h-full"
              />
            </div>
            <div className=" sm:pt-6 md:pt-8 pb-4 sm:pb-6 md:pb-8">
              <div className=" text-[#B0D7F633] text-[80px] mb-10 sm:text-[100px] md:text-[120px] lg:text-[174px] font-[800] text-left pl-4 sm:pl-6 md:pl-8 lg:pl-[12px]">
                04
              </div>
              <div className="px-4 sm:px-6 md:px-8 lg:px-10 mt-[-40px]">
                <h3 className="text-[26px] sm:text-[34px] md:text-[40px] lg:text-[50px] font-[600] text-[#055FA8]">
                  Step 4
                </h3>
                <p className="text-[18px] sm:text-[20px] md:text-[24px] lg:text-[28px] font-[600] mt-3 sm:mt-4">
                  Store Receives Order
                </p>
                <p className="text-[14px] sm:text-[16px] md:text-[18px] lg:text-[20px] mt-3 sm:mt-4 leading-snug">
                  Complete the cycle with real-time notifications when orders arrive at your store, ensuring you&apos;re always in the loop.
                </p>
              </div>
            </div>
          </article>
        </div>
      </section>
    </div>
  );
}
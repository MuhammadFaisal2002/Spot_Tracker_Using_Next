'use client';

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function Testimonials() {
  // Typing cardRefs as an array of HTMLDivElement or null
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Loop through each card and apply the turning animation when they come into view
    cardRefs.current.forEach((card, index) => {
      if (card) {
        gsap.fromTo(
          card,
          { rotationY: -180, opacity: 0 }, // Start with the card rotated 180 degrees and hidden
          {
            rotationY: 0, opacity: 1, duration: 2, ease: "power3.out", 
            scrollTrigger: {
              trigger: card,
              start: "top 90%", // Trigger when the top of the card reaches 90% of the viewport
              toggleActions: "play none none reverse", // Play on scroll in, reverse when it leaves
              markers: false, // Remove markers from ScrollTrigger (for debugging purposes)
            }
          }
        );
      }
    });
  }, []);

  return (
    <section id="testi" className="px-6 md:px-[105px] py-20 bg-white">
      {/* Heading */}
      <div className="text-center mb-16">
        <h2 className="text-[40px] md:text-[64px] font-bold">Testimonials</h2>
        <p className="text-lg text-gray-600">What Our Clients Say</p>
      </div>

      {/* Cards Row */}
      <div className="flex flex-col lg:flex-row justify-between gap-8">
        {/* Card 1 */}
        <div
          ref={(el) => { cardRefs.current[0] = el; }} // Save the reference for Card 1
          className="w-full lg:w-[32%] p-8 shadow-lg rounded-lg bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/user1.png"
              alt="Jane Smith"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Jane Smith</h3>
              <p className="text-sm text-gray-500">
                Organization: Transportation Manager, PepsiCo
              </p>
            </div>
          </div>
          <p className="text-[18px] text-gray-700 leading-relaxed">
            We’ve seen a significant reduction in transportation cost and improved
            delivery times since implementing Spot Tracker. Their route optimization
            algorithms have been a game changer for our business.
          </p>
        </div>

        {/* Card 2 */}
        <div
          ref={(el) => { cardRefs.current[1] = el; }} // Save the reference for Card 2
          className="w-full lg:w-[32%] p-8 shadow-lg rounded-lg bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/user2.png"
              alt="Sarah John"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Sarah John</h3>
              <p className="text-sm text-gray-500">
                Organization: Logistics Manager, Nestle
              </p>
            </div>
          </div>
          <p className="text-[18px] text-gray-700 leading-relaxed">
            Spot Tracker has revolutionized our inventory management process. We’ve
            reduced stock outs by 30% and improved delivery times by 25%.
          </p>
        </div>

        {/* Card 3 */}
        <div
          ref={(el) => { cardRefs.current[2] = el; }} // Save the reference for Card 3
          className="w-full lg:w-[32%] p-8 shadow-lg rounded-lg bg-white"
        >
          <div className="flex items-center gap-4 mb-6">
            <Image
              src="/user3.png"
              alt="Rashid Khan"
              width={60}
              height={60}
              className="rounded-full"
            />
            <div>
              <h3 className="font-semibold text-lg">Rashid Khan</h3>
              <p className="text-sm text-gray-500">
                Organization: Marketing Manager, Shan Foods
              </p>
            </div>
          </div>
          <p className="text-[18px] text-gray-700 leading-relaxed">
            We were struggling to keep track of our inventory across multiple
            warehouses. Spot Tracker’s real-time tracking and alerts have saved our
            time and reduced errors.
          </p>
        </div>
      </div>
    </section>
  );
}

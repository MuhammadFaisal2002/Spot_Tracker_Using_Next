"use client";

import { useEffect } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FullCard() {
  useEffect(() => {
    // Prevent horizontal scroll
    gsap.set("body", { overflowX: "hidden" });

    // Animate cards with tilt and smoother transitions
    gsap.utils.toArray<HTMLElement>(".row").forEach((row) => {
      const cards = row.querySelectorAll<HTMLElement>(".card-left, .card-right");
    
      cards.forEach((card) => {
        const isLeft = card.classList.contains("card-left");
        const direction = isLeft ? -1 : 1;
    
        // Strong initial state for dramatic entrance
        gsap.set(card, {
          opacity: 0,
          yPercent: 30 * direction, // More vertical movement
          xPercent: 25 * direction, // Strong horizontal push
          scale: 0.8, // More noticeable shrink
          rotation: 5 * direction, // More rotation
          filter: "blur(2px)", // Subtle blur for depth
        });
    
        ScrollTrigger.create({
          trigger: row, // Trigger on the row for better sync
          start: "10% center", // Perfect center trigger
          end: "center 10%",
          toggleActions: "play none none reverse", // Simpler control
          onEnter: () => {
            gsap.to(card, {
              opacity: 1,
              yPercent: 0,
              xPercent: 0,
              scale: 1,
              rotation: 0,
              filter: "blur(0px)",
              duration: 0.1,
              ease: "back.out(2)", // Stronger overshoot
              stagger: 0.1 // Small stagger if multiple cards
            });
          },
          onLeaveBack: () => {
            gsap.to(card, {
              opacity: 0,
              yPercent: 30 * direction,
              xPercent: 25 * direction,
              scale: 0.8,
              rotation: 5 * direction,
              filter: "blur(0px)",
              duration: 0.9,
              ease: "power3.in"
            });
          }
        });
  
        // Hover animation stays same
        card.addEventListener("mouseenter", () => {
          gsap.to(card, {
            y: -10,
            scale: 1.03,
            duration: 0.3,
            ease: "power2.out",
          });
        });
  
        card.addEventListener("mouseleave", () => {
          gsap.to(card, {
            y: 0,
            scale: 1,
            duration: 0.3,
            ease: "power2.out",
          });
        });
      });
    });

    // Enhanced logo animation
    gsap.fromTo(
      ".logo",
      { scale: 0.7, opacity: 0, rotation: -5 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: "main",
          start: "top 30%",
          toggleActions: "play none none none",
        },
      }
    );

    // Smoother paragraph line animation
    gsap.fromTo(
      ".line-p",
      { y: 30, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.15,
        duration: 0.6,
        ease: "power2.out",
        scrollTrigger: {
          trigger: "main",
          start: "top 80%",
          toggleActions: "play none none none",
        },
      }
    );

    // Enhanced mobile images animation
    gsap.utils.toArray<HTMLElement>(".mobile-img").forEach((img, i) => {
      gsap.fromTo(
        img,
        {
          y: 120,
          rotateZ: i % 2 === 0 ? -12 : 12,
          opacity: 0,
        },
        {
          y: 0,
          rotateZ: 0,
          opacity: 1,
          duration: 1.2,
          delay: i * 0.15,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: img,
            start: "top 85%",
            toggleActions: "play none none none",
          },
        }
      );

      // Add floating animation
      gsap.to(img, {
        y: 15,
        duration: 2,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    });

    return () => {
      ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
    };
  }, []);

  return (
    <div className="overflow-hidden mt-10 sm:mt-16 md:mt-20 px-4 sm:px-6 md:px-8 lg:px-[105px]">
      {/* Header Section */}
      <div className="text-center">
        <h2 className="text-[34px] sm:text-[42px] md:text-[48px] lg:text-[64px] font-[700]">
          Who Can Benefit?
        </h2>
        <p className="text-[16px] sm:text-[18px] md:text-[20px] lg:text-[22px] mt-2 line-p">
          Built for Large-Scale Industries
        </p>
      </div>

      {/* Card Section */}
      <div className="flex flex-col md:flex-row md:justify-between flex-wrap gap-6 md:gap-8 mt-8 row">
        {/* Card 1 */}
        <div className="card-left bg-white w-full sm:w-[80%] md:w-[30%] shadow-lg rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] p-6 sm:p-8 mx-auto md:mx-0 transition-all duration-300 hover:shadow-xl">
          <Image
            src="/benefitlogo1.png"
            alt="Manufacturers & Distributors"
            width={120}
            height={120}
            className="mx-auto mb-6 logo"
          />
          <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-[600] text-center mb-4 line-p">
            Manufacturers & Distributors
          </h3>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-center leading-snug mb-6 line-p">
            Simplify production planning and scheduling with our intuitive platform.
          </p>
          <div className="flex justify-around items-center flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Image 
                key={i}
                src={`/logo1.${i}.png`} 
                alt={`Logo ${i}`} 
                width={50} 
                height={50}
                className="hover:scale-110 transition-transform duration-200"
              />
            ))}
          </div>
        </div>

        {/* Card 2 */}
        <div className="card-right bg-white w-full sm:w-[80%] md:w-[30%] shadow-lg rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] p-6 sm:p-8 mx-auto md:mx-0 transition-all duration-300 hover:shadow-xl">
          <Image
            src="/benefitlogo2.png"
            alt="FMCG Brands"
            width={120}
            height={120}
            className="mx-auto mb-6 logo"
          />
          <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-[600] text-center mb-4 line-p">
            FMCG Brands
          </h3>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-center leading-snug mb-6 line-p">
            Maximize shelf life and minimize waste with our inventory management solutions.
          </p>
          <div className="flex justify-around items-center flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Image 
                key={i}
                src={`/logo2.${i}.png`} 
                alt={`Logo ${i}`} 
                width={50} 
                height={50}
                className="hover:scale-110 transition-transform duration-200"
              />
            ))}
          </div>
        </div>

        {/* Card 3 */}
        <div className="card-left bg-white w-full sm:w-[80%] md:w-[30%] shadow-lg rounded-[20px] sm:rounded-[25px] lg:rounded-[30px] p-6 sm:p-8 mx-auto md:mx-0 transition-all duration-300 hover:shadow-xl">
          <Image
            src="/benefitlogo3.png"
            alt="Retail Chains & Stores"
            width={120}
            height={120}
            className="mx-auto mb-6 logo"
          />
          <h3 className="text-[20px] sm:text-[22px] md:text-[24px] font-[600] text-center mb-4 line-p">
            Retail Chains & Stores
          </h3>
          <p className="text-[14px] sm:text-[16px] md:text-[18px] text-center leading-snug mb-6 line-p">
            Optimize store operations and reduce labor costs with our automated inventory management.
          </p>
          <div className="flex justify-around items-center flex-wrap gap-2">
            {[1, 2, 3, 4].map((i) => (
              <Image 
                key={i}
                src={`/logo3.${i}.png`} 
                alt={`Logo ${i}`} 
                width={50} 
                height={50}
                className="hover:scale-110 transition-transform duration-200"
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Screens Section */}
      <div className="flex flex-col sm:flex-row justify-center items-center gap-8 mt-10 sm:mt-16 md:mt-20">
        <Image
          src="/mob1.png"
          alt="Mobile Screen 1"
          width={261}
          height={550}
          className="w-[180px] sm:w-[200px] md:w-[240px] object-cover mobile-img"
        />
        <Image
          src="/mob2.png"
          alt="Mobile Screen 2"
          width={261}
          height={550}
          className="w-[180px] sm:w-[200px] md:w-[240px] object-cover mobile-img"
        />
      </div>
    </div>
  );
}
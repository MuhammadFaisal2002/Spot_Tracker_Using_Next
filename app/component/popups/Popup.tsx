'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Input from './inputs/Input';
import gsap from 'gsap';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  const [isInputOpen, setIsInputOpen] = useState(false);
  const [inputFormOpen, setInputFormOpen] = useState(false);
  const contentRef = useRef(null);
  const headerRef = useRef(null);
  const textRef = useRef(null);
  const testimonialRef = useRef(null);
  const inputFormRef = useRef(null);

  // Close popup on "Escape" key press
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setIsInputOpen(false);
        setInputFormOpen(false);
        onClose();
      }
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  // Animate header, text, and testimonial if input form is not open
  useEffect(() => {
    if (isOpen && !inputFormOpen) {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(headerRef.current, {
        duration: 2,
        y: -100,
        opacity: 0,
        rotationX: 60,
        ease: 'bounce.out',
      });
      tl.from(
        textRef.current,
        {
          duration: 1.5,
          x: -100,
          y: 100,
          opacity: 0,
          rotationY: 90,
          ease: 'power3.out',
        },
        "-=0.5"
      );
      tl.from(
        testimonialRef.current,
        {
          duration: 0.8,
          x: 100,
          y: 50,
          opacity: 0,
          rotationY: -90,
          ease: 'power3.out',
        },
        "-=1"
      );
    }
  }, [isOpen, inputFormOpen]);

  // Animate the input form overlay when it's opened
  useEffect(() => {
    if (isInputOpen) {
      setInputFormOpen(true);
      gsap.from(inputFormRef.current, {
        duration: 0.1,
        x: '100%',
        opacity: 0,
        ease: 'power3.out',
      });
    }
  }, [isInputOpen]);

  if (!isOpen) return null;

  return (
    <section className="fixed inset-0 z-10 bg-black bg-opacity-50 flex justify-center items-center p-4 overflow-x-hidden">
      <article
        className="relative bg-[#055FA8] w-full max-w-[95vw] sm:max-w-[90vw] md:max-w-[1150px] h-auto max-h-[90vh] md:h-[600px] rounded-[25px] p-4 md:p-6 lg:p-10 shadow-lg animate-slide-up-slow overflow-y-auto"
        ref={contentRef}
        role="dialog"
        aria-modal="true"
      >
        <button
          onClick={() => {
            setIsInputOpen(false);
            setInputFormOpen(false);
            onClose();
          }}
          className="absolute top-2 right-2 md:top-4 md:right-4 bg-[#CF2121] text-white w-8 h-8 md:w-12 md:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 z-30"
          aria-label="Close"
        >
          <X size={16} className="md:w-6 md:h-6" />
        </button>

        {/* Conditionally change inner background: white for main content, blue when input form is active */}
        <section
          className={`${isInputOpen ? "bg-[#055FA8]" : "bg-white"} 
                      w-full h-full rounded-[25px] p-4 md:p-6 lg:p-10 relative overflow-hidden`}
        >
          {/** Do not render the logo header when input form is open */}
          {!isInputOpen && (
            <header className="flex justify-between items-center mb-4 md:mb-8" ref={headerRef}>
              <Image
                src="/logo.png"
                alt="Spot Tracker Logo"
                width={250}
                height={50}
                className="object-contain w-[160px] sm:w-[200px] md:w-[350px]"
                priority
              />
            </header>
          )}

          <main className="flex flex-col px-3 lg:grid lg:grid-cols-2 gap-6 md:gap-8 relative">
            <section ref={textRef} className="order-1 lg:order-none">
              <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold text-[#055FA8] leading-snug">
                Revolutionize Your Inventory Management{" "}
                <span className="text-[#CF2121] block sm:inline">
                  with Spot Tracker
                </span>
              </h1>
              <p className="text-gray-600 mt-2 md:mt-4 text-xs sm:text-sm md:text-base leading-relaxed">
                The ultimate solution for large-scale industries to automate inventory orders,
                eliminate order bookers, and streamline operations effortlessly.
              </p>
              <button
                onClick={() => setIsInputOpen(true)}
                className="mt-4 md:mt-6 bg-[#CF2121] hover:bg-red-700 text-white font-bold py-2 px-4 sm:py-2 sm:px-6 md:py-3 md:px-8 rounded-full transition text-xs sm:text-sm md:text-base"
              >
                Book Your Demo
              </button>
            </section>

            <aside
              className="bg-[#055FA8] rounded-lg p-4 md:p-6 shadow-md h-auto md:h-[250px] flex flex-col justify-between order-2 lg:order-none"
              ref={testimonialRef}
            >
              <blockquote className="text-white italic text-xs sm:text-sm md:text-base leading-relaxed">
  &ldquo;We&rsquo;ve seen a significant reduction in transportation cost and improved delivery
  times since implementing Spot Tracker. Their route optimization algorithms have
  been a game changer for our business.&rdquo;
</blockquote>


              <footer className="flex items-center mt-3 md:mt-4">
                <Image
                  src="/dp.png"
                  alt="Sarah John"
                  width={40}
                  height={40}
                  className="rounded-full w-8 h-8 md:w-10 md:h-10"
                />
                <div className="ml-3">
                  <p className="font-bold text-white text-xs sm:text-sm md:text-base">Sarah John</p>
                  <p className="text-xs text-white opacity-80">Logistics Manager, Nestle</p>
                </div>
              </footer>
            </aside>
          </main>

          {isInputOpen && (
            <section
              ref={inputFormRef}
              className="absolute inset-0 bg-[#055FA8] rounded-[25px] z-20 overflow-y-auto p-4"
            >
              <Input
                isOpen={isInputOpen}
                onClose={() => {
                  setIsInputOpen(false);
                  setInputFormOpen(false);
                  onClose();
                }}
              />
            </section>
          )}
        </section>
      </article>
    </section>
  );
}

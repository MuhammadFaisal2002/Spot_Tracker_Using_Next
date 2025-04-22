'use client';

import React, { useEffect, useState, useRef } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Input from '../inputs/Input';
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
  

  useEffect(() => {
    if (isOpen && !inputFormOpen) {
      const tl = gsap.timeline({ delay: 0.2 });

      tl.from(headerRef.current, {
        duration: 3.2,
        y: -100,
        opacity: 0,
        rotationX: 60,
        ease: 'bounce.out',
      });

      tl.from(
        textRef.current,
        {
          duration: 2.5,
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
          duration: 1.4,
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

  useEffect(() => {
    if (isInputOpen) {
      setInputFormOpen(true);
      gsap.from(inputFormRef.current, {
        duration: 0.8,
        x: '100%',
        opacity: 0,
        ease: 'power3.out'
      });
    }
  }, [isInputOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      <div
        className="relative bg-[#055FA8] w-[90%] lg:w-[1150px] h-[600px] rounded-[25px] p-6 lg:p-10 shadow-lg animate-slide-up-slow overflow-hidden"
        ref={contentRef}
      >
        <button
          onClick={() => {
            setIsInputOpen(false);
            setInputFormOpen(false);
            onClose();
          }}
          className="inherit absolute top-4 right-4 bg-[#CF2121] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition z-30"
        >
          <X size={24} />
        </button>
        <div className="bg-white w-full h-full rounded-[25px] p-10 relative overflow-hidden">
          {/* Header Section */}
          <div className="flex justify-between items-center mb-8" ref={headerRef}>
            <Image
              src="/logo.png"
              alt="Logo"
              width={350}
              height={65}
              className="object-contain"
            />
          </div>

          {/* Main Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative">
            <div ref={textRef}>
              <h1 className="text-3xl lg:text-4xl font-extrabold text-[#055FA8] leading-snug w-full">
                Revolutionize Your Inventory Management <br />
                with <span className="text-[#CF2121]">Spot Tracker</span>
              </h1>
              <p className="text-gray-600 mt-4 leading-relaxed">
                The ultimate solution for large-scale industries to automate inventory orders,
                eliminate order bookers, and streamline operations effortlessly.
              </p>
              <button
                onClick={() => setIsInputOpen(true)}
                className="mt-6 bg-[#CF2121] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition"
              >
                Book Your Demo
              </button>
            </div>

            <div
              className="bg-[#055FA8] rounded-lg p-6 shadow-md h-[250px] flex flex-col justify-between"
              ref={testimonialRef}
            >
              <p className="text-[#ffffff] italic leading-relaxed">
                "We've seen a significant reduction in transportation cost and improved delivery
                times since implementing Spot Tracker. Their route optimization algorithms have
                been a game changer for our business."
              </p>
              <div className="flex items-center mt-4">
                <Image
                  src="/dp.png"
                  alt="Sarah John"
                  width={50}
                  height={50}
                  className="rounded-full"
                />
                <div className="ml-4">
                  <p className="font-bold text-white">Sarah John</p>
                  <p className="text-sm text-white">Logistics Manager, Nestle</p>
                </div>
              </div>
            </div>

            {/* Input Form - Full cover */}
            {isInputOpen && (
              <div
                ref={inputFormRef}
                className="absolute inset-0 bg-white rounded-[25px] z-20"
              >
                <Input
                  isOpen={isInputOpen}
                  onClose={() => {
                    setIsInputOpen(false);
                    setInputFormOpen(false);
                    onClose()
                  }}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
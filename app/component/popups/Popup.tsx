'use client';

import React, { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import Image from 'next/image';
import Input from '../inputs/Input';


interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Popup({ isOpen, onClose }: PopupProps) {
  const [isInputOpen, setIsInputOpen] = useState(false); // Control whether Input component is visible

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      {!isInputOpen ? (
        // Outer Blue Container for Popup
        <div className="relative bg-[#055FA8] w-[90%] lg:w-[1150px] h-[600px] rounded-[25px] p-6 lg:p-10 shadow-lg animate-slide-up">
          {/* Inner White Content */}
          <div className="bg-white w-full h-full rounded-[25px] p-10 relative">
            {/* Styled Close Button */}
            <button
              onClick={onClose}
              className="absolute -top-5 -right-5 bg-[#CF2121] text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition"
            >
              <X size={24} />
            </button>

            {/* Header Section */}
            <div className="flex justify-between items-center mb-8">
              <Image
                src="/logo.png"
                alt="Logo"
                width={350}
                height={65}
                className="object-contain"
              />
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Content: Message and CTA */}
              <div>
                <h1 className="text-3xl lg:text-4xl font-extrabold text-[#055FA8] leading-snug w-full">
                  Revolutionize Your Inventory Management <br />
                  with <span className="text-[#CF2121]">Spot Tracker</span>
                </h1>
                <p className="text-gray-600 mt-4 leading-relaxed">
                  The ultimate solution for large-scale industries to automate inventory orders, eliminate order bookers, and streamline operations effortlessly.
                </p>
                <button
                  onClick={() => setIsInputOpen(true)} // Open Input Component
                  className="mt-6 bg-[#CF2121] hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full transition"
                >
                  Book Your Demo
                </button>
              </div>

              {/* Right Content: Testimonial */}
              <div className="bg-[#055FA8] rounded-lg p-6 shadow-md h-[250px] flex flex-col justify-between">
                <p className="text-[#ffffff] italic leading-relaxed">
                  “We’ve seen a significant reduction in transportation cost and improved delivery times since implementing Spot Tracker. Their route optimization algorithms have been a game changer for our business.”
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
            </div>
          </div>
        </div>
      ) : (
        // Input Component (Sliding In from Right)
        <Input isOpen={isInputOpen} onClose={onClose} />
      )}
    </div>
  );
}

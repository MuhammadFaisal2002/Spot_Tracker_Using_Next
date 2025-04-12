'use client';

import React, { useEffect, useState } from 'react';
import { X, User, Briefcase, Building, AtSign, Phone } from 'lucide-react';
import Image from 'next/image';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Input({ isOpen, onClose }: PopupProps) {
  const [step, setStep] = useState(0); // State to track form steps
  const [inputValue, setInputValue] = useState(''); // State for input field value
  const [errorMessage, setErrorMessage] = useState(''); // State for error messages

  // Handling Escape key for closing
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEsc);
    return () => document.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  if (!isOpen) return null; // Render only when isOpen is true

  // Steps for the form
  const steps = [
    { label: 'Your Full Name', placeholder: 'Enter your full name', question: "Hi there! What's your name?", icon: User, validation: () => true },
    { label: 'Company Name', placeholder: 'Enter your company name', question: "Which company do you work for?", icon: Building, validation: () => true },
    { label: 'Job Title', placeholder: 'Enter your job title', question: "What's your job title?", icon: Briefcase, validation: () => true },
    {
      label: 'Email Address',
      placeholder: 'Enter your email address',
      question: 'Could you share your email address?',
      icon: AtSign,
      validation: (value: string) => value.includes('@'), // Email must contain '@'
    },
    { label: 'Phone No.', placeholder: 'Enter your phone number', question: "What's your phone number?", icon: Phone, validation: () => true },
  ];

  // Handle moving to the next step
  const handleNext = () => {
    const currentStep = steps[step];
    if (!currentStep.validation(inputValue)) {
      setErrorMessage(`Invalid ${currentStep.label}. Please try again.`);
      return; // Prevent moving to the next step
    }

    setErrorMessage(''); // Clear error message
    if (step < steps.length - 1) {
      setStep(step + 1);
      setInputValue(''); // Clear input field
    } else {
      onClose(); // Close popup when all steps are completed
    }
  };

  // Handle moving to the previous step
  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setInputValue(''); // Clear input field
      setErrorMessage(''); // Clear error message
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex justify-center items-center">
      {/* Outer Blue Container */}
      <div className="relative bg-[#055FA8] w-[90%] sm:w-[80%] lg:w-[1150px] h-[90%] sm:h-auto rounded-[25px] p-6 sm:p-8 lg:p-10 shadow-lg animate-slide-from-right">
        {/* Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-4 h-full gap-6">
          {/* Left Column: Progress Tracker */}
          <div className="bg-white col-span-1 h-full rounded-[25px] p-4 sm:p-6 flex flex-col items-center lg:items-start">
            <Image
              src="/logo.png"
              alt="Logo"
              width={150}
              height={40}
              className="object-contain mb-6"
            />
            <ul className="space-y-4">
              {steps.map((stepItem, index) => (
                <li
                  key={index}
                  className={`flex items-center gap-2 text-sm sm:text-base text-gray-600 ${
                    step === index ? 'text-[#055FA8] font-bold' : ''
                  }`}
                >
                  <stepItem.icon className="w-4 h-4 sm:w-5 sm:h-5" /> {stepItem.label}
                </li>
              ))}
            </ul>
          </div>

          {/* Right Column: Chat Interaction */}
          <div className="bg-white col-span-3 h-full rounded-[30px] flex flex-col justify-center items-center p-4 sm:p-6">
            {/* Centered Chat Content */}
            <div className="bg-[#055FA8] text-white p-3 sm:p-4 rounded-xl text-center text-xs sm:text-base">
              <p>{errorMessage || steps[step].question}</p> {/* Show error or question */}
            </div>

            {/* Input Field */}
            <div className="mt-6 sm:mt-8 w-full">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)} // Update input field value
                placeholder={steps[step].placeholder}
                className={`w-full border border-gray-300 rounded-lg py-2 px-3 sm:py-3 sm:px-4 focus:outline-none focus:ring-2 focus:ring-[#055FA8] mb-4 ${
                  errorMessage ? 'border-red-500' : ''
                }`}
              />
              <div className="flex justify-between">
                <button
                  onClick={handleBack} // Go to previous step
                  disabled={step === 0}
                  className={`bg-gray-300 text-xs sm:text-base text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg transition ${
                    step === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext} // Go to next step or close popup
                  className="bg-[#CF2121] text-xs sm:text-base text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-red-700 transition"
                >
                  Next
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute -top-4 sm:-top-5 -right-4 sm:-right-5 bg-[#CF2121] text-white w-10 sm:w-12 h-10 sm:h-12 rounded-full flex items-center justify-center shadow-lg hover:bg-red-700 transition"
        >
          <X size={24} className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>
      </div>
    </div>
  );
}

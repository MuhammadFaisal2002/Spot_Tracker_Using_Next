'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, User, Phone, Building, Briefcase, Bot } from 'lucide-react';
import gsap from 'gsap';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Input({ isOpen, onClose }: PopupProps) {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [collectedValues, setCollectedValues] = useState<Record<string, string>>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const questionRef = useRef<HTMLDivElement>(null);
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const steps = [
    { label: 'User_name', placeholder: 'Enter your full name', question: "Hey! Let's start with your name—what should I call you?", icon: User, validation: (v: string) => v.trim() !== '' },
    { label: 'Phone_no', placeholder: 'Enter your phone number', question: (values: any) => `Awesome ${values['User_name'] || ''}! What's the best phone number to reach you at?`, icon: Phone, validation: (v: string) => /^\d{7,15}$/.test(v) },
    { label: 'Company_name', placeholder: 'Enter your company name', question: "Could you tell me the name of your company or organization?", icon: Building, validation: (v: string) => v.trim() !== '' },
    { label: 'Distribution_challenge', placeholder: "What's the biggest distribution challenge you're facing?", question: "What's the biggest distribution challenge you're looking to solve with Spot Tracker?", icon: Briefcase, validation: (v: string) => v.trim() !== '' },
    { label: 'Reviews_OR_Query', placeholder: 'Any specific questions or feedback for us?', question: "Is there anything specific you'd like to share or ask about how Spot Tracker can support your business?", icon: Briefcase, validation: (v: string) => v.trim() !== '' },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setInputValue('');
      setErrorMessage('');
      setIsSubmitting(false);
      setIsSubmitted(false);
      setCollectedValues({});
      setDisplayedQuestion('');
      gsap.fromTo(
        containerRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    if (inputRef.current) {
      gsap.fromTo(
        inputRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' }
      );
    }
  }, [step]);

  useEffect(() => {
    if (isSubmitted) return;

    let mounted = true;
    if (typingIntervalRef.current) {
      clearInterval(typingIntervalRef.current);
    }

    const startTyping = (text: string, speed: number = 30) => {
      setDisplayedQuestion('');
      setIsTyping(true);
      let currentIndex = 0;
      typingIntervalRef.current = setInterval(() => {
        if (!mounted) return;
        const char = text[currentIndex];
        if (char !== undefined) {
          setDisplayedQuestion(prev => prev + char);
          currentIndex++;
        } else {
          if (typingIntervalRef.current) {
            clearInterval(typingIntervalRef.current);
          }
          setIsTyping(false);
        }
      }, speed);
    };

    const currentStep = steps[step];
    const question = typeof currentStep.question === 'function'
      ? currentStep.question(collectedValues)
      : currentStep.question;
    startTyping(question);

    return () => {
      mounted = false;
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }
    };
  }, [step, collectedValues, isSubmitted]);

  const handleNext = async () => {
    if (isSubmitting) return;

    const currentStep = steps[step];
    if (!currentStep.validation(inputValue)) {
      setErrorMessage(
        `Please enter a valid ${currentStep.label.replace('_', ' ').toLowerCase()}`
      );
      return;
    }

    const newValues = { ...collectedValues, [currentStep.label]: inputValue };
    setCollectedValues(newValues);
    setErrorMessage('');

    if (step === steps.length - 1) {
      setIsSubmitting(true);
      if (typingIntervalRef.current) {
        clearInterval(typingIntervalRef.current);
      }

      setIsSubmitted(true);
      setInputValue('');
      setDisplayedQuestion("");

      gsap.fromTo(
        '.thanks-message',
        { opacity: 0, y: -150 },
        { opacity: 1, y: 0, duration: 1, ease: 'bounce.out' }
      );

      try {
        const res = await fetch('/api/submit', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ data: newValues }),
        });

        if (!res.ok) throw new Error('Failed to submit');

        setTimeout(() => {
          onClose();
        }, 3000);
      } catch (err) {
        setErrorMessage('Submission failed. Please try again.');
        console.error(err);
      } finally {
        setIsSubmitting(false);
      }
    } else {
      gsap.to(containerRef.current, {
        x: '-100%',
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          setStep(prev => prev + 1);
          setInputValue('');
          gsap.fromTo(
            containerRef.current,
            { x: '100%', opacity: 0 },
            { x: 0, opacity: 1, duration: 0.5 }
          );
        }
      });
    }
  };

  const handleBack = () => {
    if (isSubmitted || step === 0) return;
    gsap.to(containerRef.current, {
      x: '100%', opacity: 0, duration: 0.5, onComplete: () => {
        setStep(prev => prev - 1);
        setInputValue('');
        gsap.fromTo(
          containerRef.current,
          { x: '-100%', opacity: 0 },
          { x: 0, opacity: 1, duration: 0.5 }
        );
      }
    });
  };

  return (
    <div ref={containerRef} className="fixed inset-0 bg-white rounded-none sm:rounded-[25px] pt-4 px-4 sm:px-8 h-full w-full overflow-auto flex items-center justify-center">
      {/* Close button for mobile */}
      <button 
        onClick={onClose}
        className="absolute top-4 right-4 sm:hidden z-50 p-2 rounded-full bg-gray-100"
      >
        <X className="w-5 h-5 text-gray-600" />
      </button>

      <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 h-full w-full max-w-6xl mx-auto">
        {/* Sidebar - now appears at top on mobile */}
        <aside className="bg-[#055FA8]/10 rounded-[20px] p-3 sm:p-6 w-full lg:w-auto lg:min-w-[200px]">
          <ul className="flex flex-row lg:flex-col gap-2 sm:gap-4 overflow-x-auto lg:overflow-x-visible lg:overflow-y-auto py-2 lg:py-0">
            {steps.map((stepItem, index) => (
              <li 
                key={index} 
                className={`flex items-center gap-3 text-sm font-medium whitespace-nowrap px-3 py-2 rounded-lg ${step === index && !isSubmitted ? 'bg-[#055FA8] text-white' : 'text-gray-600'}`}
              >
                <stepItem.icon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">{stepItem.label.replace(/_/g, ' ')}</span>
                <span className="sm:hidden">{index + 1}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Main content */}
        <main className="flex-1 flex flex-col items-center justify-center h-full w-full px-2 sm:px-0">
          {isSubmitted ? (
            <div className="thanks-message bg-[#055FA8] text-white p-6 sm:p-8 rounded-[20px] flex items-center justify-center text-center text-lg sm:text-xl md:text-2xl font-bold max-w-xs sm:max-w-md w-full">
              Thanks {collectedValues['User_name']}! We'll reach you soon 🚀
            </div>
          ) : (
            <div className="w-full max-w-md mx-auto">
              {/* Question */}
              <div
                ref={questionRef}
                className="flex items-start gap-3 bg-[#055FA8]/10 border-[#055FA8] border-2 p-3 sm:p-4 rounded-[18px] mb-4 sm:mb-6 w-full"
              >
                <Bot className="text-[#055FA8] w-7 h-7 sm:w-9 sm:h-9 flex-shrink-0" />
                <p className="text-[#055FA8] font-bold text-base sm:text-lg md:text-[20px]">
                  {errorMessage || displayedQuestion}
                </p>
              </div>

              {/* Input */}
              <input
                ref={inputRef}
                type={steps[step].label === 'Phone_no' ? 'tel' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={steps[step].placeholder}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                className={`w-full border-2 rounded-lg sm:rounded-xl py-2 px-4 text-sm sm:text-base mb-4 sm:mb-6 focus:outline-none focus:ring-2 focus:ring-[#055FA8] ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
              />

              {/* Buttons */}
              <div className="flex gap-3 sm:gap-4 w-full">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`bg-gray-300 text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base flex-1 ${step === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-[#055FA8] text-white px-4 sm:px-6 py-2 rounded-lg text-sm sm:text-base flex-1"
                >
                  {isSubmitting ? '...' : step === steps.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
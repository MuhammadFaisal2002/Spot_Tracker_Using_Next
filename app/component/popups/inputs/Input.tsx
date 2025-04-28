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

  // 🔥 Moved outside useEffect — properly defined now
  const startTyping = (text: string, speed: number = 30) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setDisplayedQuestion('');
    setIsTyping(true);
    let currentIndex = 0;
    typingIntervalRef.current = setInterval(() => {
      const char = text[currentIndex];
      if (char !== undefined) {
        setDisplayedQuestion(prev => prev + char);
        currentIndex++;
      } else {
        clearInterval(typingIntervalRef.current!);
        setIsTyping(false);
      }
    }, speed);
  };

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setInputValue('');
      setErrorMessage('');
      setIsSubmitting(false);
      setIsSubmitted(false);
      setCollectedValues({});
      setDisplayedQuestion('');
      gsap.fromTo(containerRef.current, { x: '100%', opacity: 0 }, { x: 0, opacity: 1, duration: 1.2, ease: 'power3.out' });
    }
  }, [isOpen]);

  useEffect(() => {
    if (inputRef.current) {
      gsap.fromTo(inputRef.current, { scale: 0.8, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.5, ease: 'back.out(1.7)' });
    }
  }, [step]);

  useEffect(() => {
    if (isSubmitted) return;

    let mounted = true;
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

    const currentStep = steps[step];
    const question = typeof currentStep.question === 'function'
      ? currentStep.question(collectedValues)
      : currentStep.question;
    startTyping(question);

    return () => {
      mounted = false;
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    };
  }, [step, collectedValues, isSubmitted]);

  const handleNext = async () => {
    if (isSubmitting) return;

    const currentStep = steps[step];
    const currentValue = inputValue.trim();

    if (currentStep.label === 'User_name' && !/^[a-zA-Z\s]+$/.test(currentValue)) {
      startTyping('Name must only contain letters. Please try again!');
      return;
    }

    if (!currentStep.validation(currentValue)) {
      startTyping(`Please enter a valid ${currentStep.label.replace('_', ' ').toLowerCase()}`);
      return;
    }

    const newValues = { ...collectedValues, [currentStep.label]: inputValue };
    setCollectedValues(newValues);
    setErrorMessage('');

    if (step === steps.length - 1) {
      setIsSubmitting(true);
      if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);

      setIsSubmitted(true);
      setInputValue('');
      setDisplayedQuestion('');

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

        setTimeout(() => { onClose(); }, 3000);
      } catch (err) {
        startTyping('Submission failed. Please try again.');
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
          gsap.fromTo(containerRef.current, { x: '100%', opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
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
        gsap.fromTo(containerRef.current, { x: '-100%', opacity: 0 }, { x: 0, opacity: 1, duration: 0.5 });
      }
    });
  };

  return (
    <div ref={containerRef} className="absolute inset-0 bg-white rounded-xl pt-4 px-4 md:px-8 h-full overflow-auto flex flex-col ">
      {!isSubmitted && (
        <div className="lg:hidden bg-[#055FA8]/10 rounded-xl p-4 flex flex-wrap justify-evenly items-center mb-4">
          {steps.map((stepItem, index) => (
            <div key={index} className={`flex flex-col items-center ${step === index ? 'text-[#055FA8] font-semibold' : 'text-gray-600'}`}>
              <stepItem.icon className="w-6 h-6" />
            </div>
          ))}
        </div>
      )}

      <div className="hidden lg:grid lg:grid-cols-4 gap-6 flex-1">
        <aside className="bg-[#055FA8]/10 rounded-xl p-4 md:p-6 h-full">
          <ul className="space-y-4">
            {steps.map((stepItem, index) => (
              <li key={index} className={`flex items-center gap-3 text-sm font-medium ${step === index && !isSubmitted ? 'text-[#055FA8] font-semibold' : 'text-gray-600'}`}>
                <stepItem.icon className="w-5 h-5" />
                {stepItem.label.replace(/_/g, ' ')}
              </li>
            ))}
          </ul>
        </aside>

        <main className="lg:col-span-3 flex flex-col items-center justify-center">
          {!isSubmitted ? (
            <>
              <div ref={questionRef} className="flex items-start gap-3 bg-[#055FA8]/10 border-[#055FA8] border-2 p-4 rounded-xl mb-6 max-w-xl">
                <Bot className="text-[#055FA8] w-9 h-9" />
                <p className="text-[#055FA8] font-bold pt-1 text-lg">{errorMessage || displayedQuestion}</p>
              </div>

              <input
                ref={inputRef}
                type={steps[step].label === 'Phone_no' ? 'number' : 'text'}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder={steps[step].placeholder}
                onKeyDown={(e) => e.key === 'Enter' && handleNext()}
                className={`w-full border-2 rounded-xl py-2 px-4 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-[#055FA8] ${errorMessage ? 'border-red-500' : 'border-gray-300'}`}
              />

              <div className="flex gap-4">
                <button
                  onClick={handleBack}
                  disabled={step === 0}
                  className={`bg-gray-300 text-white px-6 py-2 rounded-lg ${step === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                >
                  Back
                </button>
                <button
                  onClick={handleNext}
                  disabled={isSubmitting}
                  className="bg-[#055FA8] text-white px-6 py-2 rounded-lg"
                >
                  {isSubmitting ? 'Submitting...' : step === steps.length - 1 ? 'Submit' : 'Next'}
                </button>
              </div>
            </>
          ) : (
            <div className="thanks-message bg-[#055FA8] text-white p-8 rounded-xl flex items-center justify-center text-center text-2xl font-bold transition-all duration-500 max-w-md">
              Thanks {collectedValues['User_name']}! We'll reach you soon 🚀
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

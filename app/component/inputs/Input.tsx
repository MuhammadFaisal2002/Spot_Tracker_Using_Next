'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, User, Briefcase, Building, AtSign, Phone, Bot } from 'lucide-react';
import Image from 'next/image';
import gsap from 'gsap';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Input({ isOpen, onClose }: PopupProps) {
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState<string[]>([]);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [isTyping, setIsTyping] = useState(false);
  const steps = [
    {
      label: 'Your Full Name',
      placeholder: 'Enter your full name',
      question: " Hi there!  What's your name?",
      icon: User,
      validation: (value: string) => value.trim() !== '',
    },
    {
      label: 'Company Name',
      placeholder: 'Enter your company name',
      question: 'Which company do you work for?',
      icon: Building,
      validation: (value: string) => value.trim() !== '',
    },
    {
      label: 'Job Title',
      placeholder: 'Enter your job title',
      question: "What's your job title?",
      icon: Briefcase,
      validation: (value: string) => value.trim() !== '',
    },
    {
      label: 'Email Address',
      placeholder: 'Enter your email address',
      question: 'Could you share your email address?',
      icon: AtSign,
      validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      label: 'Phone No.',
      placeholder: 'Enter your phone number',
      question: "What's your phone number?",
      icon: Phone,
      validation: (value: string) => value.trim() !== '',
    },
  ];

  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setFormData([]);
      setInputValue('');
      setErrorMessage('');
      gsap.fromTo(
        containerRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 2, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let mounted = true;
    
    // Reset immediately
    setDisplayedQuestion('');
    setIsTyping(true);

    const question = steps[step].question;
    
    // Small delay before starting to ensure reset is complete
    const startTimeout = setTimeout(() => {
      if (!mounted) return;
      typingInterval = setInterval(() => {
        if (!mounted) return;
        
        if (currentIndex < question.length) {
          setDisplayedQuestion(question.substring(0, currentIndex + 1));
          currentIndex++;
        } else {
          clearInterval(typingInterval);
          setIsTyping(false);
        }
      }, 40);
    }, 50);

    return () => {
      mounted = false;
      clearTimeout(startTimeout);
      clearInterval(typingInterval);
      setIsTyping(false);
    };
  }, [step]); 
  
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [step]);

  const handleNext = () => {
    if (!steps[step].validation(inputValue)) {
      setErrorMessage(`Please enter a valid ${steps[step].label.toLowerCase()}`);
      return;
    }

    setErrorMessage('');
    const newFormData = [...formData];
    newFormData[step] = inputValue;
    setFormData(newFormData);

    if (step < steps.length - 1) {
      setStep(step + 1);
      setInputValue('');
    } else {
      console.log('Form submitted:', newFormData);
      setDisplayedQuestion("Thanks! We'll be in touch soon. 🚀");
      setTimeout(() => {
        onClose();
      }, 1500);
    }
    
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setInputValue(formData[step - 1] || '');
      setErrorMessage('');
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-white rounded-[px] pt-6"
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 h-[400px] gap-6">
        <div className="bg-[#055FA8] h-[320px] bg-opacity-10 rounded-[25px] p-6 flex flex-col">
          <div className="flex justify-between items-center mb-6">
            {/* Keep your logo and close button if needed */}
          </div>
  
          <ul className="space-y-4">
            {steps.map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-3 text-sm font-medium ${
                  step === index ? 'text-[#055FA8] font-semibold' : 'text-gray-600'
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </li>
            ))}
          </ul>
        </div>
  
        <div className="lg:col-span-3 flex flex-col justify-center" ref={formRef}>
          {/* Updated question display with conditional cursor */}
          <div className="flex items-start gap-3 bg-[#055FA8] bg-opacity-10 border-[#055FA8] border-4 border-solid p-4 rounded-[20px] mb-6 max-w-md">
            <Bot className="text-[#055FA8] w-9 h-9 font-[800]" />
            <div className="text-[#055FA8] font-[700] text-md pt-1">
              <p className="whitespace-pre-wrap">
                {errorMessage || displayedQuestion}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>
  
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={steps[step].placeholder}
            className={`w-full border-2 rounded-xl py-3 px-5 text-base mb-6 focus:outline-none focus:ring-2 focus:ring-[#055FA8] ${
              errorMessage ? 'border-red-500' : 'border-gray-300'
            }`}
          />
  
          <div className="flex justify-between items-center gap-4">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`py-2 px-6 rounded-xl text-white transition ${
                step === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600'
              }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              className="bg-[#CF2121] hover:bg-red-700 text-white py-2 px-6 rounded-xl transition"
            >
              {step === steps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
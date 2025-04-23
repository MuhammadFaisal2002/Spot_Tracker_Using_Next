'use client';

import React, { useEffect, useRef, useState } from 'react';
import { X, User, Briefcase, Building, AtSign, Phone, Bot } from 'lucide-react';
import gsap from 'gsap';

interface PopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function Input({ isOpen, onClose }: PopupProps) {
  // State management
  const [step, setStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [displayedQuestion, setDisplayedQuestion] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const [collectedValues, setCollectedValues] = useState<Record<string, string>>({});
  const [isTyping, setIsTyping] = useState(false);

  // Form steps configuration - updated to match Strapi field names
  const steps = [
    {
      label: 'User_name',
      placeholder: 'Enter your full name',
      question: "Hi there! What's your name?",
      icon: User,
      validation: (value: string) => value.trim() !== '',
    },
    {
      label: 'Company_name',
      placeholder: 'Enter your company name',
      question: 'Which company do you work for?',
      icon: Building,
      validation: (value: string) => value.trim() !== '',
    },
    {
      label: 'Job_title',
      placeholder: 'Enter your job title',
      question: "What's your job title?",
      icon: Briefcase,
      validation: (value: string) => value.trim() !== '',
    },
    {
      label: 'Email',
      placeholder: 'Enter your email address',
      question: 'Could you share your email address?',
      icon: AtSign,
      validation: (value: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value),
    },
    {
      label: 'Phone_no',
      placeholder: 'Enter your phone number',
      question: "What's your phone number?",
      icon: Phone,
      validation: (value: string) => value.trim() !== '',
      transform: (value: string) => Number(value) // Convert phone to number
    },
  ];

  // Reset form when opening
  useEffect(() => {
    if (isOpen) {
      setStep(0);
      setInputValue('');
      setErrorMessage('');
      setIsSubmitting(false);
      gsap.fromTo(
        containerRef.current,
        { x: '100%', opacity: 0 },
        { x: 0, opacity: 1, duration: 2, ease: 'power3.out' }
      );
    }
  }, [isOpen]);

  // Typing animation for questions
  useEffect(() => {
    let currentIndex = 0;
    let typingInterval: NodeJS.Timeout;
    let mounted = true;

    setDisplayedQuestion('');
    setIsTyping(true);

    const question = steps[step].question;

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

  // Form animation
  useEffect(() => {
    if (formRef.current) {
      gsap.fromTo(
        formRef.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, ease: 'power2.out' }
      );
    }
  }, [step]);

  // Submit data to Strapi
  const submitToStrapi = async (formData: Record<string, any>) => {
    try {
      console.log('Submitting data:', formData); // Log the payload

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/spot-trackers`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ data: formData })
        }
      );

      if (!response.ok) {
        // Get the error response body
        const errorResponse = await response.json();
        console.error('Error details:', errorResponse);
        throw new Error(errorResponse.error?.message || 'Failed to submit form');
      }

      return await response.json();
    } catch (error) {
      console.error('Full submission error:', error);
      throw error;
    }
  };

  const handleNext = async () => {
    // Validation
    if (!steps[step].validation(inputValue)) {
      setErrorMessage(`Please enter a valid ${steps[step].label.toLowerCase()}`);
      return;
    }

    setErrorMessage('');

    // Store the current value
    setCollectedValues(prev => ({
      ...prev,
      [steps[step].label]: inputValue
    }));

    // On final step, submit to Strapi
    if (step === steps.length - 1) {
      setIsSubmitting(true);

      try {
        // Prepare form data with proper values
        const formData = {
          User_name: collectedValues['User_name'],
          Company_name: collectedValues['Company_name'],
          Job_title: collectedValues['Job_title'],
          Email: collectedValues['Email'],
          Phone_no: Number(inputValue) // Convert only the phone number
        };

        console.log('Submitting data:', formData);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/spot-trackers`,
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ data: formData })
          }
        );

        if (!response.ok) {
          const errorResponse = await response.json();
          throw new Error(errorResponse.error?.message || 'Failed to submit form');
        }

        setDisplayedQuestion("Thanks! We'll be in touch soon. 🚀");
        setTimeout(() => {
          onClose();
        }, 1500);
      } catch (error) {
        if (error instanceof Error) {
          setErrorMessage(error.message);
        } else if (typeof error === 'string') {
          setErrorMessage(error);
        } else {
          setErrorMessage('Submission failed. Please try again.');
        }
      } finally {
        setIsSubmitting(false);
      }
    } else {
      // Move to next question
      setStep(step + 1);
      setInputValue('');
    }
  };

  const handleBack = () => {
    if (step > 0) {
      setStep(step - 1);
      setInputValue('');
      setErrorMessage('');
    }
  };

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 bg-white rounded-[25px] pt-4 px-4 md:px-8 "
    >
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 md:h-[400px] h-auto ">

        {/* Sidebar with progress indicators */}
        <aside className="bg-[#055FA8] bg-opacity-10 rounded-[25px] p-4 md:p-6 flex flex-col h-auto md:h-[320px]">
          <div className="flex justify-between items-center mb-4 md:mb-6">
            {/* Optional: Logo/close button */}
          </div>

          <ul className="space-y-3 md:space-y-4">
            {steps.map((item, index) => (
              <li
                key={index}
                className={`flex items-center gap-2 md:gap-3 text-sm font-medium ${step === index ? 'text-[#055FA8] font-semibold' : 'text-gray-600'
                  }`}
              >
                <item.icon className="w-4 h-4 md:w-5 md:h-5" />
                {item.label.replace('Ab ', '').replace('123 ', '')}
              </li>
            ))}
          </ul>
        </aside>

        {/* Main form area */}
        <main className="lg:col-span-3 flex flex-col justify-center pb-4">

          {/* Question box */}
          <div className="flex items-start gap-2 md:gap-3 bg-[#055FA8] bg-opacity-10 border-[#055FA8] border-2 md:border-4 border-solid p-3 md:p-4 rounded-[20px] mb-4 md:mb-6 max-w-full md:max-w-md">
            <Bot className="text-[#055FA8] w-7 h-7 md:w-9 md:h-9" />
            <div className="text-[#055FA8] font-[700] text-sm md:text-md pt-1">
              <p className="whitespace-pre-wrap">
                {errorMessage || displayedQuestion}
                {isTyping && <span className="animate-pulse">|</span>}
              </p>
            </div>
          </div>

          {/* Input field */}
          <input
            type={steps[step].label === '123 Phone_no' ? 'number' : 'text'}
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={steps[step].placeholder}
            className={`w-full border-2 rounded-xl py-2 md:py-3 px-4 md:px-5 text-sm md:text-base mb-4 md:mb-6 focus:outline-none focus:ring-2 focus:ring-[#055FA8] ${errorMessage ? 'border-red-500' : 'border-gray-300'
              }`}
            onKeyDown={(e) => e.key === 'Enter' && handleNext()}
          />

          {/* Navigation buttons */}
          <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-3 sm:gap-4">
            <button
              onClick={handleBack}
              disabled={step === 0}
              className={`py-2 px-4 sm:px-6 rounded-xl text-white transition text-sm md:text-base ${step === 0
                  ? 'bg-gray-300 cursor-not-allowed'
                  : 'bg-gray-500 hover:bg-gray-600'
                }`}
            >
              Back
            </button>
            <button
              onClick={handleNext}
              disabled={isSubmitting}
              className={`bg-[#CF2121] hover:bg-red-700 text-white py-2 px-4 sm:px-6 rounded-xl transition text-sm md:text-base ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                }`}
            >
              {isSubmitting ? 'Submitting...' : step === steps.length - 1 ? 'Submit' : 'Next'}
            </button>
          </div>
        </main>
      </div>
    </div>

  );
}
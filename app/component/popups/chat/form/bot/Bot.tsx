'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import style from './Bot.module.css'

interface Message {
  sender: 'bot' | 'user' | 'error';
  text: string;
}

interface BotProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onClose: () => void;
}

const questions = [
  "Hey! Let's start with your name—what should I call you?",
  "Awesome. [Name], what's the best phone number to reach you at?",
  "Could you tell me the name of your company or organization?",
  "I'm curious—what's the biggest distribution challenge you're looking to solve with Spot Tracker?",
  "Is there anything specific you'd like to share or ask about how Spot Tracker can support your business?"
];

const TypingIndicator = () => (
  <div className="flex items-center space-x-1">
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
    <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></div>
  </div>
);

const Bot: React.FC<BotProps> = ({ currentStep, setCurrentStep, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (currentStep < questions.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        let questionText = questions[currentStep];
        if (currentStep === 1 && answers[0]) {
          questionText = questionText.replace('[Name]', answers[0]);
        }
        setMessages((prev) => [...prev, { sender: 'bot', text: questionText }]);
        
        // Focus input after bot finishes typing
        if (inputRef.current && !isTyping) {
          inputRef.current.focus();
        }
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [currentStep]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = 0; // Scroll to bottom (0 because of flex-col-reverse)
    }
    // Focus input when messages change (except when bot is typing)
    if (inputRef.current && !isTyping) {
      inputRef.current.focus();
    }
  }, [messages, isTyping]);

  const handleBack = () => {
    if (currentStep > 0) {
      setMessages((prev) => prev.slice(0, -2));
      setAnswers((prev) => prev.slice(0, -1));
      setCurrentStep(currentStep - 1);
    }
  };

  const validateInput = (input: string): string | null => {
    if (!input.trim()) return 'Please provide a response.';

    if (currentStep === 1) {
      const isValidPhone = /^[0-9]{10,15}$/.test(input);
      if (!isValidPhone) return 'Please enter a valid phone number (10–15 digits).';
    }

    return null;
  };

  const formatUserResponse = (input: string, step: number): string => {
    if (step === 0) return `My name is ${input}`;
    if (step === 1) return `My phone number is ${input}`;
    if (step === 2) return `My company is ${input}`;
    return input; // For other steps, use the input as-is
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElem = e.currentTarget.userInput as HTMLInputElement;
    const userText = inputElem.value.trim();

    const error = validateInput(userText);
    if (error) {
      setMessages((prev) => [...prev, { sender: 'error', text: error }]);
      inputElem.value = '';
      return;
    }

    const formattedResponse = formatUserResponse(userText, currentStep);
    setMessages((prev) => [...prev, { sender: 'user', text: formattedResponse }]);
    const updatedAnswers = [...answers, userText];
    setAnswers(updatedAnswers);
    inputElem.value = '';

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final step: Submit to API
      setIsTyping(true);
      setTimeout(async () => {
        const payload = {
          data: {
            User_name: updatedAnswers[0],
            Phone_no: updatedAnswers[1],
            Company_name: updatedAnswers[2],
            Distribution_challenge: updatedAnswers[3],
            Reviews_OR_Query: updatedAnswers[4] || '',
          }
        };

        try {
          const res = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(payload)
          });

          if (!res.ok) throw new Error('Submission failed.');

          const result = await res.json();
          console.log('Submitted:', result);

          // Show typing indicator for the thank you message
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              { sender: 'bot', text: `Thanks ${updatedAnswers[0]}, we'll reach you soon!` }
            ]);
            setTimeout(() => onClose(), 3000);
          }, 1500);

        } catch (err) {
          console.error('Error:', err);
          setIsTyping(true);
          setTimeout(() => {
            setIsTyping(false);
            setMessages((prev) => [
              ...prev,
              { sender: 'error', text: 'Oops! Something went wrong. Please try again later.' }
            ]);
          }, 1500);
        }
      }, 1500);
    }
  };

  return (
    <div className={`${style.messageContainer} w-full h-full pl-[70px] pr-6 bg-white rounded-[20px] flex flex-col relative`}>
      {currentStep > 0 && (
        <button
          onClick={handleBack}
          className="absolute left-4 top-4 text-[25px] font-bold text-[#055FA8] bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10"
          aria-label="Go Back"
        >
          &lt;
        </button>
      )}

      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar flex flex-col-reverse">
        <div className="space-y-3">
          {messages.map((msg, idx) => (
            <div
              key={idx}
              className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              {msg.sender === 'bot' ? (
                <div className="flex items-end space-x-2 max-w-[80%]">
                  <div className="w-20 flex-shrink-0">
                    <Image 
                      src="/BOT.png" 
                      alt="Bot" 
                      width={80} 
                      height={80} 
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-blue-100 text-blue-900 p-3 rounded-lg">
                    {msg.text}
                  </div>
                </div>
              ) : msg.sender === 'user' ? (
                <div className="flex items-end space-x-2 max-w-[80%]">
                  <div className="bg-green-100 text-green-900 p-3 rounded-lg">
                    {msg.text}
                  </div>
                  <div className="w-10 flex-shrink-0">
                    <Image 
                      src="/User.png" 
                      alt="User" 
                      width={40} 
                      height={40} 
                      className="rounded-full" 
                    />
                  </div>
                </div>
              ) : (
                <div className="flex items-end space-x-2 max-w-[80%]">
                  <div className="w-18 flex-shrink-0">
                    <Image 
                      src="/BOT.png" 
                      alt="Bot" 
                      width={80} 
                      height={80} 
                      className="rounded-full"
                    />
                  </div>
                  <div className="bg-red-100 text-red-900 p-3 rounded-lg">
                    {msg.text}
                  </div>
                </div>
              )}
            </div>
          ))}
          {isTyping && (
            <div className="flex justify-start">
              <div className="flex items-end space-x-2 max-w-[80%]">
                <div className="w-20 flex-shrink-0">
                  <Image 
                    src="/BOT.png" 
                    alt="Bot" 
                    width={80} 
                    height={80} 
                    className="rounded-full"
                  />
                </div>
                <div className="bg-blue-100 text-blue-900 p-3 rounded-lg">
                  <TypingIndicator />
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Always visible form (disabled during typing) */}
      {currentStep < questions.length && (
        <form onSubmit={handleSubmit}>
          <input
            ref={inputRef}
            name="userInput"
            type={currentStep === 1 ? 'tel' : 'text'}
            placeholder={isTyping ? "Please wait..." : "Type your response..."}
            className={`flex-grow border-b-2 text-[18px] border-[#055FA8] p-2 focus:outline-none w-full h-[50px] ${
              isTyping ? 'opacity-50 cursor-not-allowed' : ''
            }`}
            disabled={isTyping}
            autoFocus
          />
          <div>
            <button
              type="submit"
              className={`${style.buttonContainer} rounded-[47px] text-[20px] font-bold border-[#BBBBBB] border-2 text-black bg-white ml-5 px-[40px] py-[13px] my-6 ${
                isTyping ? 'opacity-50 cursor-not-allowed' : ''
              }`}
              disabled={isTyping}
            >
              Next
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default Bot;
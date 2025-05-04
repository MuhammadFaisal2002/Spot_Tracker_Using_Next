'use client';

import React, { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

interface Message {
  sender: 'bot' | 'user';
  text: string;
  avatar?: string;
}

interface BotProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  onClose: () => void;
}

const questions = [
  "Hey! Let's start with your name—what should I call you?",
  "Awesome.[Name] What's the best phone number to reach you at?",
  "Could you tell me the name of your company or organization?",
  "I'm curious—what's the biggest distribution challenge you're looking to solve with Spot Tracker?",
  "Is there anything specific you'd like to share or ask about how Spot Tracker can support your business?",
];

const TypingIndicator: React.FC = () => {
  return (
    <div className="flex items-center space-x-1">
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-150"></div>
      <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce delay-300"></div>
    </div>
  );
};

const Bot: React.FC<BotProps> = ({ currentStep, setCurrentStep, onClose }) => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Trigger the bot question when currentStep changes.
  useEffect(() => {
    if (currentStep < questions.length) {
      setIsTyping(true);
      const timer = setTimeout(() => {
        setIsTyping(false);
        let questionText = questions[currentStep];
        if (currentStep === 1 && answers[0]) {
          // Replace placeholder in question 2.
          questionText = questionText.replace("[Name]", answers[0]);
        }
        setMessages((prev) => [...prev, { sender: 'bot', text: questionText }]);
      }, 1500);
      return () => clearTimeout(timer);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentStep]);

  // Auto-scroll to bottom when new messages or typing indicator appear.
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  // Handle Back: Remove last exchange and decrement step.
  const handleBack = () => {
    if (currentStep > 0) {
      setMessages((prev) => {
        const newMessages = [...prev];
        // Remove the last two messages (user and bot exchange) if available.
        if (newMessages.length >= 2) {
          newMessages.splice(newMessages.length - 2, 2);
        } else if (newMessages.length > 0) {
          newMessages.pop();
        }
        return newMessages;
      });
      setAnswers((prev) => prev.slice(0, -1));
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const inputElem = e.currentTarget.userInput as HTMLInputElement;
    const userText = inputElem.value.trim();
    if (!userText) return;


    // Append user's message.
    setMessages((prev) => [
      ...prev,
      { sender: 'user', text: userText},
    ]);
    setAnswers((prev) => [...prev, userText]);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      // Final question answered: Show final message and auto-close after 3 seconds.
      setIsTyping(true);
      setTimeout(() => {
        setIsTyping(false);
        const finalMsg = `Great ${answers[0] || userText}, we'll reach u soon.`;
        setMessages((prev) => [...prev, { sender: 'bot', text: finalMsg }]);
        setTimeout(() => onClose(), 3000);
      }, 1500);
    }
    e.currentTarget.reset();
  };

  return (
    <div className="mx-auto bg-white rounded-[20px] shadow-lg flex flex-col xl:h-[520px] w-[680px] relative">
      
      {/* Back Button (visible if currentStep > 0) */}
      {currentStep > 0 && (
        <button
          onClick={handleBack}
          className="absolute left-4 top-4 text-[30px] font-bold text-black bg-white shadow-md rounded-full w-10 h-10 flex items-center justify-center z-10"
          aria-label="Go Back"
        >
          &lt;
        </button>
      )}

      {/* Hide scrollbar but allow scrolling */}
      <style jsx>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      {/* Chat messages area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-3 hide-scrollbar">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.sender === 'bot' ? 'justify-end' : 'justify-start'}`}
          >
            {msg.sender === 'bot' ? (
              <div className="flex items-end space-x-2">
                <div className="bg-blue-100 text-blue-900 p-3 rounded-lg max-w-[80%]">
                  {msg.text}
                </div>
                {/* Fixed container for bot image */}
                <div className="w-20 flex-shrink-0">
                  <Image
                    src="/BOT.png"
                    alt="Bot"
                    width={80}
                    height={80}
                    className="rounded-full"
                  />
                </div>
              </div>
            ) : (
              <div className="flex items-end space-x-2">
                {/* Fixed container for user image */}
                <div className="w-10 flex-shrink-0">
                  <Image
                    src="/User.png"
                    alt="User"
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                </div>
                <div className="bg-green-100 text-green-900 p-3 pr-8 py-2 rounded-lg max-w-[80%]">
                  {msg.text}
                </div>
              </div>
            )}
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-end">
            <div className="bg-blue-100 text-blue-900 p-3 rounded-lg max-w-[80%]">
              <TypingIndicator />
            </div>
          </div>
        )}
      </div>

      {/* Input Form: Rendered only when bot is not typing and questions remain */}
      {!isTyping && currentStep < questions.length && (<form onSubmit={handleSubmit} className=" border-t border-gray-300 p-4"> <input name="userInput" type="text" placeholder="Type your response..." className="flex-grow border-b-4 text-[20px] border-[#055FA8] p-2 focus:outline-none w-full h-[50px]" /> <div className=' '> <button type="submit" className="rounded-[30px] text-[30px] font-bold border-gray-400 border-2 text-black bg-white ml-5 px-4 mt-2"> Next </button> </div> </form>)}
    </div>
  );
};

export default Bot;

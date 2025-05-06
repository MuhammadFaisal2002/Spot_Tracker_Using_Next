'use client';

import StepSidebar from "./sidestepbar/StepSidebar";
import Bot from "./bot/Bot";
import { useState, useEffect, useRef } from "react";
import gsap from 'gsap';
import styles from './Form.module.css';

type FormProps = {
  onClose: () => void;
  isOpen: boolean; // Add isOpen prop to control animation
}

export default function Form({ onClose, isOpen }: FormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const formContainerRef = useRef<HTMLDivElement>(null);

  // Animation effects
  useEffect(() => {
    if (isOpen && formContainerRef.current) {
      // Slide in from right animation
      gsap.fromTo(formContainerRef.current,
        { x: '100%', opacity: 0 }, // Start from right (outside viewport)
        { 
          x: 0, 
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          immediateRender: false // Important for proper positioning
        }
      );
    }
  }, [isOpen]);

  const handleClose = () => {
    if (formContainerRef.current) {
      // Slide out to right animation
      gsap.to(formContainerRef.current, {
        x: '100%',
        opacity: 0,
        duration: 0.5,
        ease: 'power3.in',
        onComplete: onClose
      });
    } else {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="absolute inset-0 bg-[#055FA8] rounded-[25px] z-20 overflow-hidden">
      <div 
        ref={formContainerRef}
        className="w-full h-full flex justify-center items-center hide-scrollbar"
      >
        <div className={`${styles.formContainer} flex flex-col gap-3 sm:flex-col md:flex-row w-full max-w-[90vw] md:max-w-[1200px] h-[50vh] md:h-[565px] rounded-[20px] overflow-auto hide-scrollbar `}>
          
          {/* Sidebar */}
          <div className="w-full md:w-[30%] md:mr-3 h-full">
            <StepSidebar step={currentStep} />
          </div>
      
          {/* Chat Bot Area */}
          <div className="w-full md:w-[68%]">
            <Bot 
              currentStep={currentStep} 
              setCurrentStep={setCurrentStep} 
              onClose={handleClose} 
            />
          </div>
        </div>
      
        {/* Hide scrollbar styles */}
        <style jsx>{`
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}</style>
      </div>
    </div>
  );
}
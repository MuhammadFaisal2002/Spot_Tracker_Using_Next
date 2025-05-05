import StepSidebar from "../inputs/layout/StepSidebar";
import Bot from "./Bot";
import { useState } from "react";
import styles from './Form.module.css';

type FormProps = {
  onClose: () => void;
}

export default function Form({ onClose }: FormProps) {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div className="w-full h-full flex justify-center items-center hide-scrollbar">
      <div className={`${styles.formContainer}  fixed flex flex-col gap-8 sm:flex-col md:flex-row w-full max-w-[90vw] md:max-w-[1200px] h-[50vh] md:h-[500px] rounded-[20px] overflow-auto hide-scrollbar`}>
        
        {/* Sidebar */}
        <div className="w-full md:w-[30%] md:mr-3 h-full "> {/* Reduced mr-[20px] to mr-3 (12px) */}
          <StepSidebar step={currentStep} />
        </div>
    
        {/* Chat Bot Area */}
        <div className="w-full md:w-[67%]   ">
          <Bot currentStep={currentStep} setCurrentStep={setCurrentStep} onClose={onClose} />
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
  );
}
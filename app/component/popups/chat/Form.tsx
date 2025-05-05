import StepSidebar from "../inputs/layout/StepSidebar"
import Bot from "./Bot";
import { useState } from "react";
type FormProps = {
    onClose: () => void;
  }
  export default function Form({ onClose }: FormProps){
    const [currentStep, setCurrentStep] = useState(0);
    return(
        
        <div className="w-full h-full flex justify-center items-center">
        <div className="flex flex-col gap-10 sm:flex-col md:flex-row w-full max-w-[90vw] md:max-w-[1200px] h-[50vh] md:h-[500px] rounded-[20px] overflow-auto hide-scrollbar">
          
          {/* Sidebar */}
          <div className="w-full md:w-[30%] mr-[20px] h-full">
            <StepSidebar step={currentStep} />
          </div>
      
          {/* Chat Bot Area */}
          <div className="w-full md:w-[67%] h-full">
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
      
    )
}

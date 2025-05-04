import StepSidebar from "../inputs/layout/StepSidebar"
import Bot from "./Bot";
import { useState } from "react";
type FormProps = {
    onClose: () => void;
  }
export default function Form({ onClose }: FormProps){
    const [currentStep, setCurrentStep] = useState(0);
    return(
        <>
            <div className="bg-[#055FA8] fixed inset-0 h-[200px] w-[1000px] flex gap-6">
                <div ><StepSidebar step={currentStep}/></div>
                <div >
                    <Bot currentStep={currentStep} setCurrentStep={setCurrentStep} onClose={onClose}/>
                </div>   
            </div>
        </> 
    )
}
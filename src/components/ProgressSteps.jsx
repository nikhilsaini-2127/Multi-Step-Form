import React from 'react'
import { FaCheck } from "react-icons/fa";

const ProgressSteps = ({ currentStep, steps }) => {
  return (
    <div className="flex justify-between w-full p-2 ">
      {steps.map((step, index) => (
        <>
        <div  className={`step ${index <= currentStep ? 'active bg-[#6366F1] ' : 'bg-[#ede9fe]'}   py-4 px-4 rounded-full flex items-center justify-center border-1 border-[#dbeafe]`}>
          {step.icon && <span className={`step-icon text-2xl ${index <= currentStep ? 'text-[#ede9fe]' : 'text-[#6366F1]'}`}>{index<currentStep ? <FaCheck /> : step.icon}</span>}
        </div>
        {index < steps.length - 1 && <span className={`border-2 h-0 w-full my-auto ${index < currentStep ? 'border-[#6366F1]' : 'border-[#ede9fe]'}`}></span>}
        </>

      ))}
    </div>
  )
}

export default ProgressSteps

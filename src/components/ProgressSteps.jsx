import React from 'react'
import { FaCheck } from "react-icons/fa";

const ProgressSteps = ({ steps, stepStates, onStepSelect }) => {
  return (
    <div className="flex justify-between w-full p-2 ">
      {steps.map((step, index) => {
        const state = stepStates[index];
        const isActive = state === "current";
        const isCompleted = state === "completed";
        const isInvalid = state === "invalid";

        return (
          <React.Fragment key={step.id}>
            <button
              type="button"
              aria-label={`${step.name} - ${state}`}
              aria-current={isActive ? "step" : undefined}
              onClick={() => onStepSelect(index)}
              className={`step ${isActive || isCompleted ? 'active bg-[#6366F1]' : isInvalid ? 'bg-red-100 border-red-500' : 'bg-[#ede9fe]'} py-4 px-4 rounded-full flex items-center justify-center border border-[#dbeafe] focus:outline-none focus:ring-2 focus:ring-[#6366F1]`}
            >
              {step.icon && (
                <span className={`step-icon text-2xl ${isActive || isCompleted ? 'text-[#ede9fe]' : isInvalid ? 'text-red-700' : 'text-[#6366F1]'}`}>
                  {isCompleted ? <FaCheck /> : step.icon}
                </span>
              )}
              <span className="sr-only">{state}</span>
            </button>
            {index < steps.length - 1 && (
              <span className={`border-2 h-0 w-full my-auto ${isCompleted ? 'border-[#6366F1]' : 'border-[#ede9fe]'}`}></span>
            )}
          </React.Fragment>
        );
      })}
    </div>
  )
}

export default ProgressSteps

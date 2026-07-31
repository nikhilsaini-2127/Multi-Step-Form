import React from "react";
import useMultiStepForm from "../../hooks/useMultiStepForm";

const ErrorMsg = ({err,onclick,id}) => {
    const {inputRef}=useMultiStepForm();
    const handleClick=()=>{
        onclick(); 
        window.scrollTo({
            top: 0,
            behavior: "smooth",
          });
          const errId = err.id;
          window.requestAnimationFrame(() => {
            const invalidField =
              inputRef.current?.[errId] ?? document.getElementById(errId);
            invalidField?.focus();
          });
    }
  return (
    <div className="text-[#d32F2F] bg-red-200 rounded-sm text-sm px-1 border-red-500">
    {
      err.map((error,index)=>{
        if(error.id===id){
          return(
            <div
        onClick={handleClick}
        key={`${error.id}-${index}`}
        className=""
      >
        {error.msg}
      </div>
          )
        }
      })
    }
    </div>
  );
};

export default ErrorMsg;

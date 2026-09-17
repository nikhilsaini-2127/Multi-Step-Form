import ProgressSteps from "../components/ProgressSteps";
import PersonalInfoStep from "../components/PersonalInfoStep";
import ProfessionalInfoStep from "../components/ProfessionalInfoStep";
import BillingInfoStep from "../components/BillingInfoStep";
import useMultiStepForm from "../hooks/useMultiStepForm";
import { FaCheck, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const MultiStepForm = () => {
  const {
    currentStep,
    goToPreviousStep,
    goToNextStep,
    isFirstStep,
    isLastStep,
    submitForm,
    resetForm,
    formData,
    updateFormData,
    steps,
    validateStep,
    error,
    isSubmitted,
    stepStates,
    setError,
    setCurrentStep,
    inputRef,
  } = useMultiStepForm();

  const navigate = useNavigate();

  function throttle(func, delay) {
  let isThrottled = false;

  return function (...args) {
    
    if (isThrottled) return;

   
    func.apply(this, args);
    isThrottled = true;

    
    setTimeout(() => {
      isThrottled = false;
    }, delay);
  };
}

  const handleSubmit = () => {
    const isValid = validateStep(currentStep);
    if (!isValid) {
      setTimeout(() => {
        setError([]);
      }, 3000);

      if (error.length > 0) {
        setCurrentStep(error[0].step);
        toast.error("Error in submitting the form")
        setTimeout(() => {
          const invalidField = document.getElementById(error[0].id);
          if (invalidField) {
            invalidField.focus();
          }
        }, 0);
      }

      return;
    }

    submitForm();
  };

  const handleNext = () => {
    const goToNext=throttle(goToNextStep,300);
    goToNext()
    //console.log(error)
  };

  if (isSubmitted) {
    return (
      <div className="flex flex-col items-center justify-around md:w-1/3 w-full bg-[#ddd6fe] mx-auto my-12 p-2 border-2-[#ccc] rounded-md h-[50vh]">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="text-center text-[#8B5CF6] text-2xl font-bold">
          Form Submitted Successfully!
        </div>
        <div className="flex justify-center mt-4 text-4xl text-[#ddd6fe] bg-[#6366F1] p-4 rounded-full shadow-lg  shadow-[#8B5CF6]">
          <FaCheck />
        </div>
        <div className="flex  gap-2 justify-center mt-4">
          <button
            className="bg-[#6366F1] text-sm text-[#ddd6fe] py-2 px-2 rounded"
            onClick={resetForm}
          >
            Submit Another Form
          </button>
          <button
            onClick={() => navigate("/home")}
            className="bg-[#EEF4FF] text-sm text-[#8B5CF6] py-2 px-2 rounded flex justify-center items-center gap-1 "
          >
            <FaHome /> Home
          </button>
        </div>
      </div>
    );
  } else {
    return (
      <div className="flex flex-col items-center justify-center md:w-1/3 w-full bg-[#EEF4FF] mx-auto my-12 p-2 border-2-[#ccc] rounded-md">
        <ToastContainer position="top-right" autoClose={3000} />
        <div className="w-[90%]">
          <ProgressSteps
            currentStep={currentStep}
            steps={steps}
            stepStates={stepStates}
            onStepSelect={setCurrentStep}
          />
        </div>
        <div className="w-full">
          {currentStep === 0 && (
            <PersonalInfoStep
              formData={formData}
              updateFormData={updateFormData}
              currentStep={currentStep}
              inputRefs={inputRef}
              error={error}
            />
          )}
          {currentStep === 1 && (
            <ProfessionalInfoStep
              formData={formData}
              updateFormData={updateFormData}
              currentStep={currentStep}
              inputRefs={inputRef}
              error={error}
            />
          )}
          {currentStep === 2 && (
            <BillingInfoStep
              formData={formData}
              updateFormData={updateFormData}
              currentStep={currentStep}
              inputRefs={inputRef}
              error={error}
            />
          )}
        </div>
        <div className="flex justify-between mt-4 w-full p-2">
          <button
            type="button"
            className={`bg-[#ddd6fe] text-[#8B5CF6] py-2 px-4 rounded ${isFirstStep ? "opacity-50 cursor-not-allowed" : ""}`}
            onClick={goToPreviousStep}
            disabled={isFirstStep}
          >
            Previous
          </button>
          {isLastStep ? (
            <button
              type="submit"
              className="bg-[#8B5CF6] text-[#EEF4FF] py-2 px-4 rounded"
              onClick={handleSubmit}
            >
              Submit
            </button>
          ) : (
            <button
              type="button"
              className="bg-[#8B5CF6] text-[#EEF4FF] py-2 px-4 rounded"
              onClick={handleNext}
              disabled={isLastStep}
            >
              Next
            </button>
          )}
        </div>

        {/* {error.length > 0 && isLastStep && (
          <div className="w-[90%] text-red-700 text-sm mt-2 flex flex-col gap-1 cursor-pointer">
            {error.map((err, index) => (
              <p
                onClick={() => {
                  window.scrollTo({
                    top: 0,
                    behavior: "smooth",
                  });
                  const errId = err.id;
                  setCurrentStep(err.step);
                  window.requestAnimationFrame(() => {
                    const invalidField =
                      inputRef.current?.[errId] ??
                      document.getElementById(errId);
                    invalidField?.focus();
                  });
                }}
                key={`${err.id}-${index}`}
                className="text-center bg-red-300 border border-red-500 px-2 rounded-sm"
              >
                {err.msg}
              </p>
            ))}
          </div>
        )} */}
      </div>
    );
  }
};

export default MultiStepForm;

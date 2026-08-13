import { useState,useRef } from "react";
import { FaRegUser, FaBriefcase } from "react-icons/fa";
import { FaCreditCard } from "react-icons/fa6";
import { toast } from 'react-toastify';

const useMultiStepForm = () => {
  const steps = [
    { id: "personal", name: "Personal Info", icon: <FaRegUser /> },
    { id: "professional", name: "Professional Info", icon: <FaBriefcase /> },
    { id: "billing", name: "Billing Info", icon: <FaCreditCard /> },
  ];

  const formDataSchema = {
    personal: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
    },
    professional: {
      company: "",
      position: "",
      experience: "",
      industry: "",
    },

    billing: {
      cardNumber: "",
      cardHolderName: "",
      expiryDate: "",
      cvv: "",
    },
  };

  const [formData, setFormData] = useState(formDataSchema);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [error, setError] = useState([]);
   const inputRef =useRef({});

  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const schemaValidation = (stepData, stepId, stepErrors, stepIndex) => {
    if (stepId === "personal") {
      const { firstName, lastName, email, phone } = stepData;
      if (typeof firstName !== "string" || firstName.trim() === "") {
        stepErrors.push({
          id: "firstName",
          step: stepIndex,
          msg: "First name should be a string.",
        });
      }
      if (typeof lastName !== "string" || lastName.trim() === "") {
        stepErrors.push({
          id: "lastName",
          step: stepIndex,
          msg: "Last name should be a string.",
        });
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        stepErrors.push({
          id: "email",
          step: stepIndex,
          msg: "Email should be a valid email address.",
        });
      }
      if (typeof phone !== "string" || !/^\d{10}$/.test(phone)) {
        stepErrors.push({
          id: "phone",
          step: stepIndex,
          msg: "Phone should be a valid 10-digit number.",
        });
      }
    } else if (stepId === "professional") {
      const { company, position, experience, industry } = stepData;
      if (typeof company !== "string" || company.trim() === "") {
        stepErrors.push({
          id: "company",
          step: stepIndex,
          msg: "Company should be a string.",
        });
      }
      if (typeof position !== "string" || position.trim() === "") {
        stepErrors.push({
          id: "position",
          step: stepIndex,
          msg: "Position should be a string.",
        });
      }
      if (typeof experience !== "string" || experience.trim() === "") {
        stepErrors.push({
          id: "experience",
          step: stepIndex,
          msg: "Experience should be a number.",
        });
      }
      if (typeof industry !== "string" || industry.trim() === "") {
        stepErrors.push({
          id: "industry",
          step: stepIndex,
          msg: "Industry should be a string.",
        });
      }
    } else if (stepId === "billing") {
      const { cardNumber, cardHolderName, expiryDate, cvv } = stepData;
      if (typeof cardNumber !== "string" || !/^\d{16}$/.test(cardNumber)) {
        stepErrors.push({
          id: "cardNumber",
          step: stepIndex,
          msg: "Card number should be a 16-digit number.",
        });
      }
      if (typeof cardHolderName !== "string" || cardHolderName.trim() === "") {
        stepErrors.push({
          id: "cardHolderName",
          step: stepIndex,
          msg: "Card holder name should be a string.",
        });
      }

      if (
        typeof expiryDate !== "string" ||
        !/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiryDate)
      ) {
        stepErrors.push({
          id: "expiryDate",
          step: stepIndex,
          msg: "Expiry date should be in this format MM/YY.",
        });
      }

      if (typeof cvv !== "string" || !/^\d{3}$/.test(cvv)) {
        stepErrors.push({
          id: "cvv",
          step: stepIndex,
          msg: "CVV should be a 3-digit number.",
        });
      }
    }
  };

  const validateStep = (step) => {
    const stepData = formData[steps[step].id];
    const stepErrors = [];

    schemaValidation(stepData, steps[step].id, stepErrors, step);
    for (let field in stepData) {
      if (!stepData[field]) {
        stepErrors.push({
          id: field,
          step,
          msg: `${field} is required`,
        });
      }
    }
    if(error.length > 24) setError([])

    setError((prev)=>{
      return [...prev,...stepErrors]
    });

    if (stepErrors.length > 0) {
      return false;
    }
    return true;
  };

  const goToNextStep = () => {
    validateStep(currentStep);
    setTimeout(()=>{
      if (!isLastStep) setCurrentStep((prev) => prev + 1);
    },2000)
    
  };

  const goToPreviousStep = () => {
    if (!isFirstStep) setCurrentStep((prev) => prev - 1);
  };

  const updateFormData = (newData, step) => {
    setFormData((prev) => ({ ...prev, [steps[step].id]: { ...prev[steps[step].id], ...newData } }));
  };

  const submitForm = async() => {
    try{
      const response=await fetch("http://localhost:5000/api/formData",{
        method :"post",
         headers: {
        'Content-Type': 'application/json'
      },
        body:JSON.stringify(formData),
      })
      const data=await response.json();
      console.log(data);
       toast.success("Data saved successfully!");
      setIsSubmitted(true);

    }catch(e){
      console.log(`Error Occured while submitting form ${e}`)
      toast.error(`Error Occured while submitting form ${e}`);
    }
    
  };

  const resetForm = () => {
    setFormData(formDataSchema);
    setCurrentStep(0);
    setIsSubmitted(false);
    setError([]);
  };

  return {
    currentStep,
    setFormData,
    formData,
    isFirstStep,
    isLastStep,
    isSubmitted,
    steps,
    goToNextStep,
    goToPreviousStep,
    updateFormData,
    submitForm,
    resetForm,
    validateStep,
    error,
    setError,
    setCurrentStep,
    inputRef
  };
};

export default useMultiStepForm;

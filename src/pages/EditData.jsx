import React, { useState, useEffect } from "react";
import useMultiStepForm from "../hooks/useMultiStepForm";
import "../components/formStyle.css";
import { useNavigate, useParams } from "react-router-dom";
import camelCase from "lodash/camelCase";
import { MdBrowserUpdated } from "react-icons/md";
import { ToastContainer,toast } from "react-toastify";
import "react-toastify/ReactToastify.css";
import ErrorMsg from "../components/ui/ErrorMsg";

const EditData = () => {
  const {
    setFormData,
    formData,
    updateFormData,
    inputRef: inputRefs,
    error,
    validateStep,setError
  } = useMultiStepForm();
  const [loading, setLoading] = useState(false);
  const { id } = useParams();
  const [isUpdated, setIsUpdated] = useState(false);
  const navigate=useNavigate()

  const handleChange = (e, step) => {
    updateFormData({ [e.target.id]: e.target.value }, step);
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      setError([]);
      if(!validateStep(0) || !validateStep(1) || !validateStep(2)) {
        toast.error("Error in submitting form");
        return;
      }

      const response = await fetch(`http://localhost:5000/api/formData/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const res = await response.json();
        if(res.success===true)toast.success("Data updated sucessfully!")
        else toast.error("Couldn't update the data");
      setIsUpdated(true);
      console.log(res);
    } catch (error) {
      console.error("Error while updating", error);
    }
  };

  const keysToCamel = (obj) => {
    if (Array.isArray(obj)) {
      return obj.map(keysToCamel);
    }

    if (obj && typeof obj === "object") {
      return Object.keys(obj).reduce((acc, key) => {
        acc[camelCase(key)] = keysToCamel(obj[key]);
        return acc;
      }, {});
    }

    return obj;
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `http://localhost:5000/api/formData/${id}`,
          {
            method: "get",
          },
        );
        const res = await response.json();
        // console.log(res);
        const data = keysToCamel(res.data);

        setFormData(data);
          if(res.success===true)toast.success("Data fetched sucessfully!")
          else toast.error("Couldn't fetch the data");
        setLoading(false);
      } catch (e) {
        throw e;
      }
    };
    fetchData();
  }, []);


  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-row justify-around">
      <ToastContainer position="top-right" autoClose={3000}/>
      {isUpdated && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Blurred background */}
          <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />

          {/* Card */}
          <div className="relative z-10 flex flex-col items-center justify-center w-1/3 h-32 gap-6 bg-[#ddd6fe] rounded-sm">
            <span className="font-bold text-[#8B5CF6]">
              Data Updated sucessfully!!
            </span>
            <button onClick={()=>navigate("/home")} className="bg-[#8B5CF6] text-[#EEF4FF] px-4 p-1 rounded-sm ">Ok</button>
          </div>
        </div>
      )}
      <div className="border border-[#EEF4FF] w-full md:w-[60%]">
        <form action="" onSubmit={handleSubmit} className="forms">
          <h1 className="font-bold text-2xl">Personal Details</h1>
          <hr />
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={formData.personal.firstName}
            onChange={(e) => handleChange(e, 0)}
            ref={(el) => (inputRefs.current["firstName"] = el)}
          />
          <ErrorMsg err={error} id="firstName" onclick={() => {}} />

          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={formData.personal.lastName}
            onChange={(e) => handleChange(e, 0)}
            ref={(el) => (inputRefs.current["lastName"] = el)}
          />
          <ErrorMsg err={error} id="lastName" onclick={() => {}} />

          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={formData.personal.email}
            onChange={(e) => handleChange(e, 0)}
            ref={(el) => (inputRefs.current["email"] = el)}
          />
          <ErrorMsg err={error} id="email" onclick={() => {}} />

          <label htmlFor="phone">Phone</label>
          <input
            type="text"
            id="phone"
            value={formData.personal.phone}
            onChange={(e) => handleChange(e, 0)}
            ref={(el) => (inputRefs.current["phone"] = el)}
          />
          <ErrorMsg err={error} id="phone" onclick={() => {}} />
          <h1 className="font-bold text-2xl">Professional Details</h1>
          <hr />
          <label htmlFor="company">Company</label>
          <input
            type="text"
            id="company"
            value={formData.professional.company}
            onChange={(e) => handleChange(e, 1)}
            ref={(el) => (inputRefs.current["company"] = el)}
          />
          <ErrorMsg err={error} id="company" onclick={() => {}} />

          <label htmlFor="position">Position</label>
          <input
            type="text"
            id="position"
            value={formData.professional.position}
            onChange={(e) => handleChange(e, 1)}
            ref={(el) => (inputRefs.current["position"] = el)}
          />
          <ErrorMsg err={error} id="position" onclick={() => {}} />

          <label htmlFor="experience">Years of Experience</label>
          <input
            type="number"
            id="experience"
            value={formData.professional.experience}
            onChange={(e) => handleChange(e, 1)}
            ref={(el) => (inputRefs.current["experience"] = el)}
          />
          <ErrorMsg err={error} id="experience" onclick={() => {}} />

          <label htmlFor="industry">Industry</label>
          <input
            type="text"
            id="industry"
            value={formData.professional.industry}
            onChange={(e) => handleChange(e, 1)}
            ref={(el) => (inputRefs.current["industry"] = el)}
          />
          <ErrorMsg err={error} id="industry" onclick={() => {}} />
          <h1 className="font-bold text-2xl">Card Details</h1>
          <hr />
          <label htmlFor="cardNumber">Card Number</label>
          <input
            type="text"
            id="cardNumber"
            value={formData.billing.cardNumber}
            onChange={(e) => handleChange(e, 2)}
            ref={(el) => (inputRefs.current["cardNumber"] = el)}
          />
          <ErrorMsg err={error} id="cardNumber" onclick={() => {}} />

          <label htmlFor="cardHolderName">Card Holder Name</label>
          <input
            type="text"
            id="cardHolderName"
            value={formData.billing.cardHolderName}
            onChange={(e) => handleChange(e, 2)}
            ref={(el) => (inputRefs.current["cardHolderName"] = el)}
          />
          <ErrorMsg err={error} id="cardHolderName" onclick={() => {}} />

          <label htmlFor="expiryDate">Expiry Date</label>
          <input
            type="text"
            id="expiryDate"
            value={formData.billing.expiryDate}
            onChange={(e) => handleChange(e, 2)}
            ref={(el) => (inputRefs.current["expiryDate"] = el)}
          />
          <ErrorMsg err={error} id="expiryDate" onclick={() => {}} />

          <label htmlFor="cvv">CVV</label>
          <input
            type="text"
            id="cvv"
            value={formData.billing.cvv}
            onChange={(e) => handleChange(e, 2)}
            ref={(el) => (inputRefs.current["cvv"] = el)}
          />
          <ErrorMsg err={error} id="cvv" onclick={() => {}} />
          {/* <label htmlFor="image">Upload Image</label>
          <input
            type="file"
            id="image"
            accept="image/"
            onChange={(e) => handleUpload(e)}
          /> */}
          <button
            type="submit"
            className="flex items-center gap-1 justify-center px-2 p-1 bg-[#8B5CF6] text-[#ddd6fe] rounded-sm"
          >
            <MdBrowserUpdated /> Update
          </button>
        </form>
      </div>

      <div className="hidden md:block w-[40%] h-full p-2">
        <img src="/dataFlow.svg" className="mx-auto " alt="Hero illustration" />
      </div>
    </div>
  );
};

export default EditData;

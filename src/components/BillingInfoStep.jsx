import React from "react";
import "./formStyle.css";
import { createWorker } from "tesseract.js";
import ErrorMsg from "./ui/ErrorMsg";

const BillingInfoStep = ({ formData, updateFormData, currentStep, inputRefs, error }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.id]: e.target.value }, currentStep);
  };

  const extractCardDetails = (text) => {
    const numberMatch = text.match(/(?:\d[\s-]*){13,19}/);

    const cardNumber = numberMatch ? numberMatch[0].replace(/\D/g, "") : null;
    console.log("Card Number:", cardNumber);
    const expiryRegex = /([0-1]?\d)\s*[\/\-]\s*([0-9OIlSB]{2,4})/i;

    const match = text.match(expiryRegex);

    if (match) {
      let year = match[2]
        .replace(/O/g, "0")
        .replace(/I|l/g, "1")
        .replace(/S/g, "5")
        .replace(/B/g, "8");

      console.log(match[1], year);
    }
    const expiryDate = match ? match[0] : null;

    const lines = text
      .split("\n")
      .map((x) => x.trim())
      .filter(Boolean);

    const candidates = lines.filter((line) => !/\d/.test(line));
    console.log("Candidates:", candidates);
    const cardHolderName = candidates ? candidates[1] : null;
    return { cardNumber, expiryDate, cardHolderName };
  };

  const handleUpload = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const worker = await createWorker("eng");
      const ret = await worker.recognize(file);
      console.log(ret.data.text);
      const cardDetails = extractCardDetails(ret?.data?.text);
      updateFormData(cardDetails, currentStep);
      await worker.terminate();
    }
  };

  return (
    <div className="forms">
      <label htmlFor="cardNumber">Card Number</label>
      <input
        type="text"
        id="cardNumber"
        value={formData.billing.cardNumber}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['cardNumber'] = el)}
      />
      <ErrorMsg err={error} id="cardNumber" onclick={() => {}} />

      <label htmlFor="cardHolderName">Card Holder Name</label>
      <input
        type="text"
        id="cardHolderName"
        value={formData.billing.cardHolderName}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['cardHolderName'] = el)}
      />
      <ErrorMsg err={error} id="cardHolderName" onclick={() => {}} />

      <label htmlFor="expiryDate">Expiry Date</label>
      <input
        type="text"
        id="expiryDate"
        value={formData.billing.expiryDate}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['expiryDate'] = el)}
      />
      <ErrorMsg err={error} id="expiryDate" onclick={() => {}} />

      <label htmlFor="cvv">CVV</label>
      <input
        type="text"
        id="cvv"
        value={formData.billing.cvv}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['cvv'] = el)}
      />
      <ErrorMsg err={error} id="cvv" onclick={() => {}} />

      <label htmlFor="image">Upload Image</label>
      <input
        type="file"
        id="image"
        accept="image/"
        onChange={(e) => handleUpload(e)}
      />
    </div>
  );
};

export default BillingInfoStep;

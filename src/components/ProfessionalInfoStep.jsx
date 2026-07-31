import React from 'react';
import './formStyle.css';
import ErrorMsg from './ui/ErrorMsg';

const ProfessionalInfoStep = ({ formData, updateFormData, currentStep, inputRefs, error }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.id]: e.target.value }, currentStep);
  };

  return (
    <div className="forms">
      <label htmlFor="company">Company</label>
      <input
        type="text"
        id="company"
        value={formData.professional.company}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['company'] = el)}
      />
      <ErrorMsg err={error} id="company" onclick={() => {}} />

      <label htmlFor="position">Position</label>
      <input
        type="text"
        id="position"
        value={formData.professional.position}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['position'] = el)}
      />
      <ErrorMsg err={error} id="position" onclick={() => {}} />

      <label htmlFor="experience">Years of Experience</label>
      <input
        type="number"
        id="experience"
        value={formData.professional.experience}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['experience'] = el)}
      />
      <ErrorMsg err={error} id="experience" onclick={() => {}} />

      <label htmlFor="industry">Industry</label>
      <input
        type="text"
        id="industry"
        value={formData.professional.industry}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['industry'] = el)}
      />
      <ErrorMsg err={error} id="industry" onclick={() => {}} />
    </div>
  );
};

export default ProfessionalInfoStep;

import './formStyle.css'
import ErrorMsg from './ui/ErrorMsg';

const PersonalInfoStep = ({ formData, updateFormData, currentStep ,inputRefs,error
 }) => {
  const handleChange = (e) => {
    updateFormData({ [e.target.id]: e.target.value }, currentStep);
  };

  return (
    <div className="forms">
      <label htmlFor="firstName">First Name</label>
      <input
        type="text"
        id="firstName"
        value={formData.personal.firstName}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['firstName'] = el)}

      />
       <ErrorMsg err={error} id={"firstName"} onclick={()=>{}}/>
      <label htmlFor="lastName">Last Name</label>
      <input
        type="text"
        id="lastName"
        value={formData.personal.lastName}
        onChange={(e)=> handleChange(e)}
        ref={(el) => (inputRefs.current['lastName'] = el)}
      />
      <ErrorMsg err={error} id={'lastName'} onclick={()=>{}}/>
      <label htmlFor="email">Email</label>
      <input
        type="email"
        id="email"
        value={formData.personal.email}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['email'] = el)}
      />
      <ErrorMsg err={error} id={'email'} onclick={()=>{}}/>
      <label htmlFor="phone">Phone</label>
      <input
        type="text"
        id="phone"
        value={formData.personal.phone}
        onChange={(e) => handleChange(e)}
        ref={(el) => (inputRefs.current['phone'] = el)}
      />
      <ErrorMsg err={error} id={'phone'} onclick={()=>{}}/>
    </div>
  );
};

export default PersonalInfoStep

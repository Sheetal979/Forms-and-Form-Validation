import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useNavigate } from "react-router-dom";

import "./App.css";


function App() {
  const initialValues = {FirstName:"", LastName:"", panNo:"", aadharNo:""};
  const [formValues, setFormValues] = useState(initialValues);
  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const countryOptions = ["Australia","Afghanistan","Aruba","Belgium","Bhutan","Brazil", "Canada","China","Cuba","Egypt",
    "France","Greece","Germany","Hong Kong","India","Iraq","Italy","Japan","Sri Lanka", "USA", "Thailand","Turkey","Zambia"];
  const fullPhone = `${formValues.countryCode} ${formValues.phoneNumber}`;
  console.log("Full Phone:", fullPhone);

  const cityOptions = ["Agra","Amritsar","Ahmadabad","Bangalore","Bhopal","Busan","Bhiwani","Chennai","Capetown","Chicago",
    "Durban","Delhi","Jodphur","Kabul","Kanpur","Lahore","Los Angeles","Lucknow","Melbourne","Mumbai","Paris","Patna","Pune","Surat",
    "Toronto","Zibo"];
    

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValues));
    setIsSubmit(true);
  };
  const navigate = useNavigate();
  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      navigate("/success", { state: { formValues } });
    }
  }, [formErrors, isSubmit, navigate]);
  
  const validate = (values) => {
    const errors = {};
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    if(!values.FirstName) {
      errors.FirstName = "FirstName is required!";
    }
    if(!values.LastName) {
      errors.LastName = "LastName is required!";
    }
    if (!values.username) {
      errors.username = "Username is required!";
    }
    if (!values.email) {
      errors.email = "Email is required!";
    } else if (!regex.test(values.email)) {
      errors.email = "This is not a valid email format!";
    }
    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 4) {
      errors.password = "Password must be more than 4 characters";
    } else if (values.password.length > 10) {
      errors.password = "Password cannot exceed more than 10 characters";
    }
    if(!values.countryCode){
      errors.phoneNumber = "Country Code is required!";
    }
    else if (!/^\+\d{1,4}$/.test(values.countryCode)) {
      errors.phoneNumber = "Invalid country code!";
    }
    if (!values.phoneNumber) {
      errors.phoneNumber = "Phone number is required!";
    } else if (!/^\d{7,12}$/.test(values.phoneNumber)) {
      errors.phoneNumber = "Phone number should be 7–12 digits";
    }
    if(!values.country) {
      errors.country = "Country is required!";
    }
    if(!values.city) {
      errors.city = "City is required!";
    }
    if(!values.panNo){
      errors.panNo = "PAN Number is required!";
    }
    else if (!/^[A-Z]{5}[0-9]{4}[A-Z]{1}$/.test(values.panNo)) {
      errors.panNo = "Invalid PAN format (e.g. ABCDE1234F)";
    }
    if (!values.aadharNo) {
      errors.aadharNo = "Aadhar Number is required!";
    } else if (!/^\d{12}$/.test(values.aadharNo)) {
      errors.aadharNo = "Aadhar must be a 12-digit number!";
    }
    return errors;
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <h1>Forms and Form Validation</h1>
        <div className="ui divider"></div>
        <div className="ui form">
        <div className = "field">
            <label>FirstName: </label>
            <input
              type="text"
              name="FirstName"
              placeholder="Enter First Name"
              value={formValues.FirstName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.FirstName}</p>

          <div className = "field">
            <label>LastName: </label>
            <input
              type="text"
              name="LastName"
              placeholder="Enter Last Name"
              value={formValues.LastName}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.LastName}</p>

          <div className = "field">
            <label>Username: </label>
            <input
              type="text"
              name="username"
              placeholder="Username"
              value={formValues.username}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.username}</p>

          <div className="field">
            <label>Email: </label>
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={formValues.email}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.email}</p>

          <div className="field">
            <label>Password: </label>
            <div style={{ display: "flex", alignItems: "center" }}>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              placeholder="Password"
              value={formValues.password}
              onChange={handleChange}
            />
            <button 
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                marginLeft: "10px",
                padding: "6px 12px",
                curser:"pointer"
              }} >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>
          <p>{formErrors.password}</p>

          <div className="field">
            <label> PhoneNo: </label>
            <div style={{display:"flex", gap:"10px"}}> 
              <input 
                type ="text"
                name="countryCode"
                placeholder="+91"
                style={{ width: "80px" }}
                value={formValues.countryCode}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneNumber"
                placeholder="Enter phone number"
                value={formValues.phoneNumber}
                onChange={handleChange}
              />
            </div>
          </div>
          <p>{formErrors.phoneNumber}</p>

          <div className = "field">
            <label> Country: </label>
            <select name="country" value={formValues.country} onChange={handleChange}>
              <option value="" > -- Select Country --</option>
              {countryOptions.map((country, index) => (
                <option key={index} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>
          <p>{formErrors.country}</p>

          <div className = "field">
            <label> City: </label>
            <select name="city" value={formValues.city} onChange={handleChange}>
              <option value="" > -- Select City --</option>
              {cityOptions.map((city, index) => (
                <option key={index} value={city}>
                  {city}
                </option>
              ))}
            </select>
          </div>
          <p>{formErrors.city}</p>

          <div className = "field">
            <label>PAN Number: </label>
            <input
              type="text"
              name="panNo"
              placeholder="Enter PAN Number"
              value={formValues.panNo}
              onChange={handleChange}
            />
          </div>
          <p>{formErrors.panNo}</p>

          <div className = "field">
            <label>AADHAR Number: </label>
            <input
              type="text"
              name="aadharNo"
              placeholder="Enter AADHAR Number"
              value={formValues.aadharNo}
              onChange={handleChange}
              maxLength={12}
            />
          </div>
          <p>{formErrors.aadharNo}</p>

          <button className="fluid ui button blue">Submit</button>

        </div>
      </form>
    </div>
  );
}

export default App;

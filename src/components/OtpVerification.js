import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom"; // Use useLocation to get the state data
import "../css/login.css";
import axios from 'axios';

function OtpVerification() {
  const [otp, setOtp] = useState("");
  const [errors, setErrors] = useState("");
  const location = useLocation(); // Get the location object which contains state
  const navigate = useNavigate(); // Use useNavigate for navigation

  // Get the passed data (form data) from the SignupForm
  const formData = location.state; // This will hold the data passed from SignupForm

  useEffect(() => {
    // You can log the form data here or use it as needed
    console.log(formData); // You should see the name, email, and other details
  }, [formData]);

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const apiUrl = 'http://127.0.0.1:8000/api/verify-email/otp';

    if (otp.length !== 6) {
      setErrors("OTP must be 6 digits long.");
      return;
    }

    try {
      const response = axios.post(apiUrl, {
        email: formData.email,
        otp: otp,
        name: formData.name,
        password: formData.password
      });
      console.log(response);
    } catch (error) {
      console.error(error);
    }

    // Here, you would send the OTP to your backend for verification
    // Assuming OTP verification is successful:
    navigate("/home"); // Redirect to the dashboard or main page after OTP verification
  };

  return (
    <div className="otp-verification-container login-container">
      <h2>Verify OTP</h2>
      <form onSubmit={handleSubmit}>

      <div className="form-group">
          <input
            type="text"
            value={otp}
            onChange={handleChange}
            required
          />
        {errors && <p style={{ color: "red" }}>{errors}</p>}
        </div>

        
  
        <button className="login-button" type="submit">Verify OTP</button>
      </form>

      {/* You can display the passed data */}
      {/* <div>
        <h3>Signup Details</h3>
        <p>Name: {formData.name}</p>
        <p>Email: {formData.email}</p>
      </div> */}
    </div>
  );
}

export default OtpVerification;

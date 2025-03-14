import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "../css/login.css";
import axios from 'axios';
import logo from '../assets/images/logo.png';

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Use useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.email) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      errors.confirmPassword = "Passwords do not match";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length === 0) {
      // Send the signup data to the backend (e.g., using an API call)
      // After successful signup, navigate to the OTP confirmation page

      //call api to store email and otp of user
      const apiUrl = 'http://127.0.0.1:8000/api/send-email/otp';
      //end of api call
      try {
        const response = axios.post(apiUrl, {
          email: formData.email,
        });
        console.log(response);
      } catch (error) {
        console.error(error);
      }
      navigate("/verify-otp", { state: formData }); // Use navigate to redirect
    } else {
      setErrors(validationErrors);
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>

    <div className="login-container">
      <a href="/">
        <img className="logo" src={logo} alt="Logo" />
      </a>     <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          {errors.name && <p style={{ color: "red" }}>{errors.name}</p>}
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <p style={{ color: "red" }}>{errors.email}</p>}
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <p style={{ color: "red" }}>{errors.password}</p>}
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {errors.confirmPassword && (
            <p style={{ color: "red" }}>{errors.confirmPassword}</p>
          )}
        </div>
        <button type="submit" className="login-button">Next</button>
        <br></br><br></br>
        <p>Already have an account? <a href="/login">Login</a></p>
      </form>
    </div></div>
  );
}

export default Signup;

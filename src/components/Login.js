import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Optional, you can use fetch as well
import "../css/login.css";
import logo from '../assets/images/logo.png';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Example API endpoint, change to your actual endpoint
    const apiUrl = 'http://127.0.0.1:8000/api/login';

    try {
      const response = await axios.post(apiUrl, {
        email: email,
        password: password,
      });

      // Assuming the API response has a token
      const token = response.data.token;

      // Store the token in localStorage
      localStorage.setItem('token', token);

      // Redirect to profile page
      navigate('/profile');
    } catch (err) {
      setError('Invalid login credentials');
    }
  };

  return (
    <div className='container d-flex justify-content-center align-items-center vh-100'>
    <div className="login-container ">
      <a href="/">
        <img className="logo" src={logo} alt="Logo" />
      </a>       {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit" className="login-button">Login</button>
        <br></br><br></br>
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </form>
    </div></div>
  );
};

export default Login;

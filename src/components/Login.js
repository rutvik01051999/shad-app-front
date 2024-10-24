import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';  // Optional, you can use fetch as well

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
    <div>
      <h2>Login</h2>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;

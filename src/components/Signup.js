import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import "../css/login.css";
import axios from 'axios';
import logo from '../assets/images/logo.png';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { subYears } from 'date-fns';

function Signup() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    profile_image: null,
    gender_id: '',
    country_id: '',
    state_id: '',
    city_id: '',
    last_name: "",

  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate(); // Use useNavigate
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
  
          setLatitude(latitude);
          setLongitude(longitude);
  
          console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
        },
        function (error) {
          console.error('Error getting location: ', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }


  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/country', {

        });
        setCountries(response.data.data);
      } catch (error) {
        console.error('Error fetching countries:', error);
      }
    };

    fetchCountries();
  }, []);

  // Fetch genders
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/gender', {

        });
        setGenders(response.data.data);
      } catch (error) {
        console.error('Error fetching genders:', error);
      }
    };

    fetchGenders();
  }, []);

  // Fetch states based on selected country
  useEffect(() => {
    if (formData.country_id) {
      const fetchStates = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/state?country=${formData.country_id}`, {

          }
          );
          setStates(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error('Error fetching states:', error);
        }
      };

      fetchStates();
    }
  }, [formData.country_id]);

  // Fetch cities based on selected state
  useEffect(() => {
    if (formData.state_id) {
      const fetchCities = async () => {
        try {
          const response = await axios.get(
            `http://127.0.0.1:8000/api/city?state=${formData.state_id}`, {
          }
          );
          setCities(response.data.data);
          console.log(response.data.data);
        } catch (error) {
          console.error('Error fetching cities:', error);
        }
      };

      fetchCities();
    }
  }, [formData.state_id]);

  const validate = () => {
    const errors = {};
    if (!formData.name) errors.name = "Name is required";
    if (!formData.gender_id) errors.gender_id = "Gender is required";
    if (!formData.country_id) errors.country_id = "Country is required";
    if (!formData.state_id) errors.state_id = "State is required";
    if (!formData.city_id) errors.city_id = "City is required";
    if (!formData.last_name) errors.last_name = "Last Name is required";
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
        formData.latitude = latitude; 
        formData.longitude = longitude;
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
      <div className="sign-login-container">
        <a href="/">
          <img className="logo" src={logo} alt="Logo" />
        </a>
        <form onSubmit={handleSubmit}>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>First Name:</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Last Name:</label>
                <input
                  type="text"
                  name="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.name && <small className="text-danger">{errors.last_name}</small>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Email:</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Select a Date:</label>
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  dateFormat="yyyy-MM-dd"
                  placeholderText="Click to select DOB"
                  maxDate={subYears(new Date(), 18)} // User must be at least 18 years old
                  showYearDropdown
                  scrollableYearDropdown
                  yearDropdownItemNumber={100}
                  className="form-control"
                />
              </div>
            </div>
          </div>


          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Password:</label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.password && <small className="text-danger">{errors.password}</small>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Confirm Password:</label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="form-control"
                />
                {errors.confirmPassword && <small className="text-danger">{errors.confirmPassword}</small>}
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group">
                <label>Gender</label>
                <select
                  name="gender_id"
                  value={formData.gender_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Gender</option>
                  {genders.map((gender) => (
                    <option key={gender.id} value={gender.id}>
                      {gender.name}
                    </option>
                  ))}
                </select>
                {errors.gender_id && <small className="text-danger">{errors.gender_id}</small>}
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-group">
                <label>Country</label>
                <select
                  name="country_id"
                  value={formData.country_id}
                  onChange={handleChange}
                  className="form-control"
                >
                  <option value="">Select Country</option>
                  {countries.map((country) => (
                    <option key={country.id} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>
                {errors.country_id && <small className="text-danger">{errors.country_id}</small>}
              </div>
            </div>
          </div>

          {formData.country_id && (
            <div className="row">
              <div className="col-md-6">
                <div className="form-group">
                  <label>State</label>
                  <select
                    name="state_id"
                    value={formData.state_id}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Select State</option>
                    {states.map((state) => (
                      <option key={state.id} value={state.id}>
                        {state.name}
                      </option>
                    ))}
                  </select>
                  {errors.state_id && <small className="text-danger">{errors.state_id}</small>}
                </div>
              </div>

              <div className="col-md-6">
                <div className="form-group">
                  <label>City</label>
                  <select
                    name="city_id"
                    value={formData.city_id}
                    onChange={handleChange}
                    className="form-control"
                  >
                    <option value="">Select City</option>
                    {cities.map((city) => (
                      <option key={city.id} value={city.id}>
                        {city.name}
                      </option>
                    ))}
                  </select>
                  {errors.city_id && <small className="text-danger">{errors.city_id}</small>}
                </div>
              </div>
            </div>
          )}

          <div className="mt-4">
            <button type="submit" className="login-button">Next</button>
          </div>

          <div className="mt-3">
            <p>Already have an account? <a href="/login">Login</a></p>
          </div>

        </form>
      </div>
    </div>

  );
}

export default Signup;

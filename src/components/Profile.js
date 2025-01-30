import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../bootstrap/css/style.css';

const Profile = () => {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    address: '',
    bio: '',
    profile_image: null,
    email: '',
    gender_id: '',
    country_id: '',
    state_id: '',
    city_id: '',
    name: '',
    active: true,
  });
  const [countries, setCountries] = useState([]);
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  const [genders, setGenders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState({});
  const [previewImage, setPreviewImage] = useState(null);
  const token = localStorage.getItem('token');


  // Fetch user details and pre-fill form
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/user/details', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
          },
        });
        const userData = response.data;
        console.log(userData);
        setFormData({
          first_name: userData.first_name || '',
          last_name: userData.last_name || '',
          address: userData.address || '',
          bio: userData.bio || '',
          profile_image: null,
          email: userData.email || '',
          gender_id: userData.gender_id || '',
          country_id: userData.country_id || '',
          state_id: userData.state_id || '',
          city_id: userData.city_id || '',
          name: userData.name || '',
          active: userData.active || true,
        });
        setPreviewImage(userData.profile_image_url || null);
      } catch (error) {
        console.error('Error fetching user details:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserDetails();
  }, []);

  // Fetch countries
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/country', {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the header
          }
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
              headers: {
                Authorization: `Bearer ${token}`  // Pass the token in the header
          }
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
              headers: {
                Authorization: `Bearer ${token}`  // Pass the token in the header
              }
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
              headers: {
                Authorization: `Bearer ${token}`  // Pass the token in the header
              }
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

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setErrors({ ...errors, [name]: '' }); // Clear validation error
  };

  // Handle image upload
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, profile_image: file });
      setPreviewImage(URL.createObjectURL(file));
    }
  };

  // Remove image
  const handleRemoveImage = () => {
    setFormData({ ...formData, profile_image: null });
    setPreviewImage(null);
  };

  // Form validation
  const validateForm = () => {
    const newErrors = {};
    if (!formData.first_name) newErrors.first_name = 'First Name is required';
    if (!formData.last_name) newErrors.last_name = 'Last Name is required';
    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.gender_id) newErrors.gender_id = 'Gender is required';
    if (!formData.country_id) newErrors.country_id = 'Country is required';
    if (!formData.state_id) newErrors.state_id = 'State is required';
    if (!formData.city_id) newErrors.city_id = 'City is required';
    return newErrors;
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const data = new FormData();
    for (const key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/profile/update', data, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Profile updated successfully:', response.data);
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error.response?.data || error.message);
      alert('Error updating profile. Please try again.');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="profile-form-container">
    <div className="row">
      <h2>Edit Profile</h2>

      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>First Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
          {errors.first_name && <span className="error">{errors.first_name}</span>}
        </div>

        <div className="form-group">
          <label>Last Name</label>
          <input
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
          {errors.last_name && <span className="error">{errors.last_name}</span>}
        </div>

        <div className="form-group">
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <span className="error">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label>Gender</label>
          <select
            name="gender_id"
            value={formData.gender_id}
            onChange={handleChange}
          >
            <option value="">Select Gender</option>
            {genders.map((gender) => (
              <option key={gender.id} value={gender.id}>
                {gender.name}
              </option>
            ))}
          </select>
          {errors.gender_id && <span className="error">{errors.gender_id}</span>}
        </div>

        <div className="form-group">
          <label>Country</label>
          <select
            name="country_id"
            value={formData.country_id}
            onChange={handleChange}
          >
            <option value="">Select Country</option>
            {countries.map((country) => (
              <option key={country.id} value={country.id}>
                {country.name}
              </option>
            ))}
          </select>
          {errors.country_id && <span className="error">{errors.country_id}</span>}
        </div>

        {formData.country_id && (
          <div className="form-group">
            <label>State</label>
            <select
              name="state_id"
              value={formData.state_id}
              onChange={handleChange}
            >
              <option value="">Select State</option>
              {states.map((state) => (
                <option key={state.id} value={state.id}>
                  {state.name}
                </option>
              ))}
            </select>
            {errors.state_id && <span className="error">{errors.state_id}</span>}
          </div>
        )}

        {formData.state_id && (
          <div className="form-group">
            <label>City</label>
            <select
              name="city_id"
              value={formData.city_id}
              onChange={handleChange}
            >
              <option value="">Select City</option>
              {cities.map((city) => (
                <option key={city.id} value={city.id}>
                  {city.name}
                </option>
              ))}
            </select>
            {errors.city_id && <span className="error">{errors.city_id}</span>}
          </div>
        )}

        <div className="form-group">
          <label>Profile Image</label>
          <input type="file" name="profile_image" onChange={handleImageChange} />
          {previewImage && (
            <div className="image-preview">
              <img src={previewImage} alt="Profile Preview" />
              <button type="button" onClick={handleRemoveImage}>
                Remove
              </button>
            </div>
          )}
        </div>

        <button type="submit" className="submit-button">
          Save
        </button>
      </form>
      </div>
    </div>
  );
};

export default Profile;
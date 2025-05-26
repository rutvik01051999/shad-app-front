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
        if(userData.profile_image) {
        setPreviewImage('http://127.0.0.1:8000/storage/' + userData.profile_image || null);
        }
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
    <div>
      <div className="about-container">
        <section className="about-hero">
          <h1>My Profile</h1>
          <p>Connecting hearts worldwide ❤️</p>
        </section>

        <section className="about-content">

        </section>
      </div>


      <div className="container">
        <div className="row justify-content-center">
          <div className="col-lg-8 col-md-10 col-sm-12">
            <div className="profile-form-container p-4 shadow rounded">
              {/* Profile Image Preview */}
              <div className="text-center mb-4">
                <div className="profile-image-container">
                  {previewImage ? (
                    <>
                      <img
                        src={previewImage}
                        alt="Profile Preview"
                        className="profile-image"
                      />
                      <button
                        type="button"
                        className="btn btn-danger btn-sm mt-2"
                        onClick={handleRemoveImage}
                      >
                        Remove
                      </button>
                    </>
                  ) : (
                    <div className="profile-placeholder">+</div>
                  )}
                </div>
              </div>

              {/* <h2 className="text-center mb-4">Edit Profile</h2> */}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  {/* First Name */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>First Name</label>
                      <input
                        type="text"
                        name="first_name"
                        value={formData.first_name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.first_name && <small className="text-danger">{errors.first_name}</small>}
                    </div>
                  </div>

                  {/* Last Name */}
                  <div className="col-md-6">
                    <div className="form-group">
                      <label>Last Name</label>
                      <input
                        type="text"
                        name="last_name"
                        value={formData.last_name}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.last_name && <small className="text-danger">{errors.last_name}</small>}
                    </div>
                  </div>

                  {/* Email */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Email</label>
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

                  {/* Gender */}
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

                  {/* Country */}
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

                  {/* State (Conditional Rendering) */}
                  {formData.country_id && (
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
                  )}

                  {/* City (Conditional Rendering) */}
                  {formData.state_id && (
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
                  )}

                  {/* Profile Image Upload */}
                  <div className="col-md-12">
                    <div className="form-group">
                      <label>Profile Image</label>
                      <input type="file" name="profile_image" onChange={handleImageChange} className="form-control" />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <div className="col-md-12 text-center">
                    <button type="submit" className="btn btn-danger mt-3 px-5">Save</button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../bootstrap/css/bootstrap.min.css';
import '../bootstrap/css/style.css';
import axios from 'axios';



const Profile = () => {
  const navigate = useNavigate();
  const [profileData, setProfileData] = useState(null);  // State to store profile data
  const [loading, setLoading] = useState(true);          // State to manage loading
  const [error, setError] = useState(null);
  const [countries, setCountries] = useState([]);  // State to store the list of countries
  const [genders, setGenders] = useState([]);  // State to store the list of countries
  const [selectedGender, setSelectedGender] = useState('');  // State to store the selected country
  const [selectedCountry, setSelectedCountry] = useState('');  // State to store the selected country
  const [selectedState, setSelectedState] = useState('');      // State for selected state
  const [loadingCountries, setLoadingCountries] = useState(true);  // Loading state for countries
  const [loadingStates, setLoadingStates] = useState(false);       // Loading state for states
  const [states, setStates] = useState([]);               // State to store states based on selected country
  const [loadingCities, setLoadingCities] = useState(false);       // Loading state for cities
  const [selectedCity, setSelectedCity] = useState('');        // State for selected city
  const [cities, setCities] = useState([]);  // State to store the list of countries
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');
  const [message, setMessage] = useState('');

  // State to store form data
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
  });          // State to handle errors

  const token = localStorage.getItem('token');
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Get the token from localStorage or other storage where you saved it

        // Make the API call to fetch the user profile
        const response = await axios.get('http://127.0.0.1:8000/api/user/details', {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the header
          }
        });

        // Set profile data to state
        setProfileData(response.data);
      } catch (err) {
        setError('Error fetching profile data');
      } finally {
        setLoadingCountries(false);  // Set loading to false once the request is complete
      }
    };

    fetchProfileData();  // Call the function after component mounts
  }, []);  // Empty dependency array means it runs once after the component mounts


  // Fetch the list of countries when the component mounts
  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/country', {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the header
          }
        });

        setCountries(response.data.data);  // Save the fetched country list to state
      } catch (err) {
        setError('Error fetching countries');
      } finally {
        setLoading(false);  // Set loading to false when the fetch is complete
      }
    };

    fetchCountries();
  }, []);  // The empty array ensures this effect runs once when the component mounts


  // Fetch the list of countries when the component mounts
  useEffect(() => {
    const fetchGenders = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/gender', {
          headers: {
            Authorization: `Bearer ${token}`  // Pass the token in the header
          }
        });

        setGenders(response.data.data);  // Save the fetched country list to state
      } catch (err) {
        setError('Error fetching countries');
      } finally {
        setLoading(false);  // Set loading to false when the fetch is complete
      }
    };

    fetchGenders();
  }, []);  // The empty array ensures this effect runs once when the component mounts


  // Fetch states when the selected country changes
  useEffect(() => {
    if (selectedCountry) {
      setLoadingStates(true);  // Set loading for states when country is selected
      const fetchStates = async () => {
        try {
          // Example: Replace with your actual API that provides states based on country
          const response = await axios.get(`http://127.0.0.1:8000/api/state?country=${selectedCountry}`, {
            headers: {
              Authorization: `Bearer ${token}`  // Pass the token in the header
            }
          });
          setStates(response.data.data);  // Set state data based on selected country
        } catch (err) {
          setError('Error fetching states');
        } finally {
          setLoadingStates(false);  // Turn off loading for states
        }
      };

      fetchStates();
    }
  }, [selectedCountry]);  // Re-run when selectedCountry changes



  // Fetch states when the selected country changes
  useEffect(() => {
    if (selectedState) {
      setLoadingCities(true);  // Set loading for states when country is selected
      console.log(selectedState);
      const fetchStates = async () => {
        try {
          // Example: Replace with your actual API that provides states based on country
          const response = await axios.get(`http://127.0.0.1:8000/api/city?state=${selectedState}`, {
            headers: {
              Authorization: `Bearer ${token}`  // Pass the token in the header
            }
          });
          setCities(response.data.data);  // Set state data based on selected country

          console.log(response.data.data);
        } catch (err) {
          setError('Error fetching states');
        } finally {
          setLoadingCities(false);  // Turn off loading for states
        }
      };

      fetchStates();
    }
  }, [selectedState]);  // Re-run when selectedCountry changes

  // If the data is still loading, show a loading message
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there's an error, display the error message
  if (error) {
    return <div>{error}</div>;
  }


  const handleCountryChange = (event) => {
    setSelectedCountry(event.target.value);
    console.log(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  // Handle form input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    alert('Form submitted');
    // Perform form submission logic, like sending data to API

    try {
      const response = await fetch('http://127.0.0.1:8000/api/profile/update', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`  // Pass the token in the header
        },
        body: JSON.stringify({
          formData,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessage('Data stored successfully!');
        console.log(data);
      } else {
        setMessage('Failed to store data.');
        console.log('Error:', response.statusText);
      }
    } catch (error) {
      setMessage('An error occurred.');
      console.error('Error:', error);
    }


    console.log('Form submitted:', formData);
  };

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };


  // Handle change in state dropdown
  const handleStateChange = (event) => {
    setSelectedState(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleCityChange = (event) => {
    setSelectedCity(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleGenderChange = (event) => {
    setSelectedGender(event.target.value);
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  return (
    <>
      {profileData && (
        <div className="container">
          <div className="row">
            <div className="col-md-6">
              <form onSubmit={handleSubmit}>

                <div className="text-center">
                  <div className="file-input-wrapper">
                    <img id="profileImagePreview" src="https://bootdey.com/img/Content/avatar/avatar6.png" className="profile-image" alt="Profile Image" />
                    <div className="upload-btn">
                      <i className="fas fa-camera"></i>
                    </div>
                    <input type="file" id="profileImageInput" accept="image/*" aria-label="Choose Profile Image" onChange={handleFileChange} name="image" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="first_name">First Name</label>
                  <input type="text" className="form-control" name="first_name" onChange={handleChange} id="first_name" placeholder="Enter First Name" />
                </div>
                <div className="form-group">
                  <label htmlFor="last_name">Last Name</label>
                  <input type="text" className="form-control" name="last_name" onChange={handleChange} id="last_name" placeholder="Enter Last Name" />
                </div>

                <div className="form-group">
                  <label htmlFor="last_name">Bio</label>
                  <textarea type="text" className="form-control" name="bio" onChange={handleChange} id="last_name" placeholder="Enter bio" />
                </div>

                <select value={selectedGender} onChange={handleGenderChange} name="gender">
                  <option value="">-- Select a gender --</option>
                  {genders.map((country) => (
                    <option key={country.name} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>


                <select value={selectedCountry} onChange={handleCountryChange} name="country">
                  <option value="">-- Select a country --</option>
                  {countries.map((country) => (
                    <option key={country.name} value={country.id}>
                      {country.name}
                    </option>
                  ))}
                </select>

                {selectedCountry && (
                  <div>
                    <h3>Select State/Province</h3>
                    {loadingStates ? (
                      <div>Loading states...</div>
                    ) : (
                      <select value={selectedState} onChange={handleStateChange} name="state">
                        <option value="">-- Select a state --</option>
                        {states.map((state) => (
                          <option key={state.name} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}


                {selectedState && (
                  <div>
                    <h3>Select city/Province</h3>
                    {loadingCities ? (
                      <div>Loading cities...</div>
                    ) : (
                      <select value={selectedCity} onChange={handleCityChange} name="city">
                        <option value="">-- Select a state --</option>
                        {cities.map((state) => (
                          <option key={state.name} value={state.id}>
                            {state.name}
                          </option>
                        ))}
                      </select>
                    )}
                  </div>
                )}
                <button type="submit" className="btn btn-primary">Save</button>
              </form>
            </div></div>

        </div>
      )}
    </>
  );
};

export default Profile;

import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../css/DatingSlider.css';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes, faFilter } from '@fortawesome/free-solid-svg-icons';
import { API } from '../api';
import { Link } from 'react-router-dom';

const DatingSlider = () => {
  const [userActions, setUserActions] = useState({});
  const [users, setNearByUsers] = useState([]);
  const token = localStorage.getItem('token');

  const [showSlider, setShowSlider] = useState(false);
  const [filters, setFilters] = useState({
    gender: '',
    ageFrom: 18,
    ageTo: 35,
    distance: 10,
  });

  const toggleSlider = () => setShowSlider(!showSlider);

  const handleChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const handleApply = async () => {
    try {
      const response = await axios.post('http://127.0.0.1:8000/api/profile/filter', filters, {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });
      setNearByUsers(response.data.data);
      toggleSlider();
    } catch (error) {
      console.error("Error applying filters:", error);
    }
  };

  const handleAccept = async (userId) => {
    setUserActions(prev => ({ ...prev, [userId]: 1 }));
    try {
      const response = await axios.post(
        API.SEND_REQUEST,
        { userId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      );
      console.log("Accepted user response:", response.data);
    } catch (error) {
      console.error("Error accepting user:", error);
    }
  };

  const handlePass = (userId) => {
    setUserActions(prev => ({ ...prev, [userId]: 0 }));
    console.log("Passed on user", userId);
  };

  useEffect(() => {
    const fetchNearByUsers = async () => {
      try {
        const response = await axios.get('http://127.0.0.1:8000/api/profile/nearby', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNearByUsers(response.data.data);
      } catch (error) {
        console.error('Error fetching nearby users:', error);
      }
    };

    fetchNearByUsers();
  }, []);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="container my-5">
      <h2 className="text-center mb-4">Meet New People</h2>

      {users.length >= 2 && (
        <span onClick={toggleSlider}>
          <FontAwesomeIcon icon={faFilter} size="lg" />
        </span>
      )}

      {users.length <= 1 && (
        <p className="text-center text-muted mt-4">No nearby users available right now.</p>
      )}

      {showSlider && (
        <div className="overlay-slider">
          <div className="slider-content">
            <button className="close-btn" onClick={toggleSlider}>
              <FontAwesomeIcon icon={faTimes} />
            </button>
            <h3>Filter Matches</h3>

            <div className="form-group">
              <label>Gender</label>
              <select name="gender" value={filters.gender} onChange={handleChange}>
                <option value="">Any</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>

            <div className="form-group">
              <label>Age Range</label>
              <div className="age-range">
                <input
                  type="number"
                  name="ageFrom"
                  value={filters.ageFrom}
                  onChange={handleChange}
                  min={18}
                />
                <span>to</span>
                <input
                  type="number"
                  name="ageTo"
                  value={filters.ageTo}
                  onChange={handleChange}
                  max={99}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Distance (km)</label>
              <input
                type="range"
                name="distance"
                min="1"
                max="100"
                value={filters.distance}
                onChange={handleChange}
              />
              <span>{filters.distance} km</span>
            </div>

            <button className="apply-btn" onClick={handleApply}>Apply Filters</button>
          </div>
        </div>
      )}

      {users.length >= 2 && (
        <Slider {...settings}>
          {users.map(user => (
            <div key={user.id} className="p-3">
              <div className="card profile-card shadow-sm position-relative">
                <Link to={`/user/${user.user_id}`}>

                <img
                  src={`http://127.0.0.1:8000/storage/${user.user.profile_image}`}
                  className="card-img-top"
                  alt={user.name}
                />
                </Link>

                <div className="card-body text-center">
                  <h5 className="card-title">{user.user_id}, {user.user_id}</h5>
                  <p className="card-text">{user.bio}</p>

                  {userActions[user.user.id] === 0 && (
                    <p className="mt-3 text-danger fw-bold">You have passed this user.</p>
                  )}

                  {userActions[user.user.id] === 1 && (
                    <p className="mt-3 text-success fw-bold">You like this user!</p>
                  )}

                  {!userActions.hasOwnProperty(user.user_id) && (
                    <div className="d-flex justify-content-center gap-4 mt-3">
                      <button
                        className="btn btn-outline-danger rounded-circle"
                        onClick={() => handlePass(user.user_id)}
                      >
                        <FontAwesomeIcon icon={faTimes} size="lg" />
                      </button>
                      <button
                        className="btn btn-outline-success rounded-circle"
                        onClick={() => handleAccept(user.user_id)}
                      >
                        <FontAwesomeIcon icon={faHeart} size="lg" />
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default DatingSlider;

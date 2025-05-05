import React, { useState, useEffect } from 'react';
import Slider from 'react-slick';
import '../css/DatingSlider.css'; // Import your CSS file for styling
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faTimes } from '@fortawesome/free-solid-svg-icons';


const DatingSlider = () => {
    const [users, setNearByUsers] = useState([]);
    const token = localStorage.getItem('token');
    const handleAccept = (userId) => {
      console.log("Accepted user", userId);
      // Add your like logic here (e.g., API call)
    };
    
    const handlePass = (userId) => {
      console.log("Passed on user", userId);
      // Add your skip logic here
    };
    useEffect(() => {
      const fetchNearByUsers = async () => {
        try {
          const response = await axios.get('http://127.0.0.1:8000/api/profile/nearby', {
            headers: {
              Authorization: `Bearer ${token}`  // Pass the token in the header
            }
          });
          setNearByUsers(response.data.data);
        } catch (error) {
          console.error('Error fetching countries:', error);
        }
      };
  
      fetchNearByUsers();
    }, []);

    // const users = [
    //   { id: 1, name: 'Alice', age: 26, city: 'New York', photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
    //   { id: 2, name: 'Bob', age: 28, city: 'Los Angeles', photo: 'https://randomuser.me/api/portraits/men/2.jpg' },
    //   { id: 3, name: 'Cathy', age: 25, city: 'Chicago', photo: 'https://randomuser.me/api/portraits/women/3.jpg' },
    //   { id: 4, name: 'Daniel', age: 30, city: 'Miami', photo: 'https://randomuser.me/api/portraits/men/4.jpg' },
    //   { id: 5, name: 'Emma', age: 27, city: 'Seattle', photo: 'https://randomuser.me/api/portraits/women/5.jpg' },
    //   { id: 6, name: 'Frank', age: 31, city: 'Houston', photo: 'https://randomuser.me/api/portraits/men/6.jpg' },
    // ];
    
  
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3, // default for desktop
    slidesToScroll: 1,
    swipeToSlide: true,
    responsive: [
      {
        breakpoint: 992, // tablet
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576, // mobile
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="container my-5">
  <h2 className="text-center mb-4">Meet New People</h2>
  <Slider {...settings}>
    {users.map(user => (
      <div key={user.id} className="p-3">
        <div className="card profile-card shadow-sm position-relative">
          <img src={user.image_url} className="card-img-top" alt={user.name} />
          <div className="card-body text-center">
            <h5 className="card-title">{user.name}, {user.age}</h5>
            <p className="card-text">{user.bio}</p>

            <div className="d-flex justify-content-center gap-4 mt-3">
              <button 
                className="btn btn-outline-danger rounded-circle"
                onClick={() => handlePass(user.id)}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>

              <button 
                className="btn btn-outline-success rounded-circle"
                onClick={() => handleAccept(user.id)}
              >
                <FontAwesomeIcon icon={faHeart} size="lg" />
              </button>
            </div>
          </div>
        </div>
      </div>
    ))}
  </Slider>
</div>
  );
};

export default DatingSlider;

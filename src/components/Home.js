import React, { useState, useEffect } from 'react';
import '../css/home.css';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "../css/swipecard.css";
import "../css/heart.css";

const Home = () => {
  const { user } = useContext(AuthContext);
  const data = [
    { title: 'John Doe', description: 'A passionate coder from Reactville.' },
    { title: 'Jane Smith', description: 'Loves photography and traveling.' },
    { title: 'Michael Johnson', description: 'Enjoys hiking and outdoor activities.' },
    { title: 'Emily Davis', description: 'Web designer and tech enthusiast.' },
    // Add more cards as needed
  ];
  const [currentIndex, setCurrentIndex] = useState(0); // Track the current card index
  const [x, setX] = useState(0); // Track the swipe movement of the current card

  const [animate, setAnimate] = useState(false);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setAnimate(true);
  //     setTimeout(() => setAnimate(false), 1000); // Reset animation after 1 second
  //   }, 2000); // Trigger the animation every 2 seconds

  //   // Cleanup interval on component unmount
  //   return () => clearInterval(interval);
  // }, []);

  const handleSwipe = (direction) => {
    // Move the card out of view
    setX(direction === 'right' ? 500 : -500); 
    setTimeout(() => {
      // After the swipe is completed, show the next card
      setCurrentIndex((prevIndex) => prevIndex + 1);
      setX(0); // Reset swipe position
    }, 300); // Timing should match the transition
  };

  // If there are no more cards, show a message or something else
  if (currentIndex >= data.length) {
    return <h2>No more cards!</h2>;
  }

  const card = data[currentIndex];

  
  return (
    <>
     <div className={`heart ${animate ? 'animate' : ''}`}>
        ❤️
      </div>

      {!user && (
        <div className="home-container">

          <section className="hero">
            <h1>Find Your Perfect Match ❤️</h1>
            <p>Join millions finding love, friendship, and connections.</p>
            <button className="btn-primary">Get Started</button>
          </section>

          <section className="featured">
            <h2>Featured Profiles</h2>
            <div className="user-cards">
              {["Alice", "John", "Sophia"].map((user, index) => (
                <div className="card" key={index}>
                  <img
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? "women" : "men"
                      }/${index + 10}.jpg`}
                    alt={user}
                    className="user-img"
                  />
                  <h3>{user}, {20 + index}</h3>
                  <p>📍 New York, USA</p>
                  <button className="btn-secondary">View Profile</button>
                </div>
              ))}
            </div>
          </section>

          <section className="how-it-works">
            <h2>How It Works</h2>
            <div className="steps">
              <div className="step">
                <h3>1. Sign Up</h3>
                <p>Create a profile in minutes.</p>
              </div>
              <div className="step">
                <h3>2. Find Matches</h3>
                <p>Swipe & connect instantly.</p>
              </div>
              <div className="step">
                <h3>3. Start Dating</h3>
                <p>Meet & start your journey.</p>
              </div>
            </div>
          </section>


        </div>
      )}

      <div className="home-container">
     
     <div className="row">
      <div className="col-sm-4">
      <div className="swipe-card-container">
      <div
        className="swipe-card"
        style={{ transform: `translateX(${x}px)` }}
        onMouseDown={(e) => {
          const startX = e.clientX;

          const onMouseMove = (moveEvent) => {
            const moveX = moveEvent.clientX - startX;
            setX(moveX);
          };

          const onMouseUp = () => {
            if (x > 150) {
              handleSwipe('right');
            } else if (x < -150) {
              handleSwipe('left');
            } else {
              setX(0); // Reset position if not swiped far enough
            }

            document.removeEventListener('mousemove', onMouseMove);
            document.removeEventListener('mouseup', onMouseUp);
          };

          document.addEventListener('mousemove', onMouseMove);
          document.addEventListener('mouseup', onMouseUp);
        }}
      >
        <div className="swipe-card-content">
          <h2>{card.title}</h2>
          <p>{card.description}</p>
        </div>
        <div className="swipe-buttons">
          <button onClick={() => handleSwipe('left')} className="left-btn">
            ❌
          </button>
          <button onClick={() => handleSwipe('right')} className="right-btn">
            ✅
          </button>
        </div>
      </div>
      </div>
      </div>
      <div className="col-sm-4">
        ddd
        </div>
     </div>
     
      </div>
    </>
  );
};

export default Home;

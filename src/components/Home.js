import React, { useState, useEffect } from 'react';
import '../css/home.css';
import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import "../css/swipecard.css";
import "../css/heart.css";
import "../css/chat.css";
import DatingSlider from './DatingSlider';
import Offer from './Offer';
import 'bootstrap/dist/css/bootstrap.min.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SubscriptionPlans from './SubscriptionPlans';

const Home = () => {
  const { user } = useContext(AuthContext);
  const [animate, setAnimate] = useState(false);

  return (
    <>
      {user && (
        <>
          <DatingSlider />
        </>
      )}


      <div className={`heart ${animate ? 'animate' : ''}`}>❤️</div>

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
                    src={`https://randomuser.me/api/portraits/${index % 2 === 0 ? "women" : "men"}/${index + 10}.jpg`}
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
          <SubscriptionPlans />
        </div>
        
      )}
    </>
  );
};

export default Home;
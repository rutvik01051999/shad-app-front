import React from "react";
import "../css/about.css";

const About = () => {
  return (
    <div className="about-container">
      <section className="about-hero">
        <h1>About Us</h1>
        <p>Connecting hearts worldwide ❤️</p>
      </section>

      <section className="about-content">
        <h2>Who We Are</h2>
        <p>
          LoveConnect is a modern dating platform designed to help people find love,
          friendship, and meaningful connections. We use smart matchmaking algorithms
          and a user-friendly experience to bring people together.
        </p>

        <h2>Our Mission</h2>
        <p>
          We believe that love knows no boundaries. Our goal is to provide a safe and
          secure platform where people can build meaningful relationships.
        </p>

        <h2>Why Choose Us?</h2>
        <ul>
          <li>✔️ Verified profiles for a safer experience</li>
          <li>✔️ Advanced AI matchmaking</li>
          <li>✔️ 24/7 customer support</li>
          <li>✔️ Global community of singles</li>
        </ul>
      </section>
    </div>
  );
};

export default About;

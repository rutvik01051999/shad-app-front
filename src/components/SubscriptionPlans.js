import React from 'react';
import "../css/subscriptionPlans.css";

const SubscriptionPlans = () => {
  return (
    <div>
      <h1 className="plan-title">My Active Plan</h1>
      <div className="plan-container">
        <div className="plan-card">
          <h2>Standard</h2>
          <h3 className="plan-price">$50</h3>
          <small>Annually</small>
          <p>Up to 3 Websites</p>
          <p>Basic technical support</p>
          <p>Basic access to analytics</p>
          <button className="plan-button">Subscribe</button>
        </div>

        <div className="plan-card plan-card-featured">
          <h2>Premium</h2>
          <small className="plan-badge">Best offer!</small>
          <h3 className="plan-price">$80</h3>
          <small>Annually</small>
          <p>Up to 50 Websites</p>
          <p>14/7 Support</p>
          <p>Limited analytics</p>
          <button className="plan-button">Subscribe</button>
        </div>

        <div className="plan-card">
          <h2>Enterprise</h2>
          <h3 className="plan-price">$200</h3>
          <small>Annually</small>
          <p>Unlimited Websites</p>
          <p>24/7 Support</p>
          <p>Full Access to analytics</p>
          <button className="plan-button">Subscribe</button>
        </div>
      </div>
    </div>
  );
};

export default SubscriptionPlans;

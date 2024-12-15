import React from "react";
import "./Home.css";

const Home = () => {
  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to Iphone Store!</h1>
        <p>Explore the latest iPhones, accessories, and exclusive offers!</p>
        <button
          className="shop-now-button"
          onClick={() => (window.location.href = "Products")}
        >
          Start Shopping
        </button>
      </div>

      {/* Features Section */}
      <div className="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Wide Selection</h3>
            <p>From iPhones to premium accessories, we've got everything.</p>
          </div>
          <div className="feature-card">
            <h3>Great Deals</h3>
            <p>Save big with exclusive offers and discounts.</p>
          </div>
          <div className="feature-card">
            <h3>Fast Delivery</h3>
            <p>Get your orders quickly and reliably.</p>
          </div>
        </div>
      </div>

      {/* Customer Benefits Section */}
      <div className="customer-benefits">
        <h2>Customer Benefits</h2>
        <div className="benefit-cards">
          <div className="benefit-card">
            <h3>1-Year Warranty</h3>
            <p>All our products come with a full one-year warranty.</p>
          </div>
          <div className="benefit-card">
            <h3>24/7 Support</h3>
            <p>Our customer support team is available around the clock.</p>
          </div>
          <div className="benefit-card">
            <h3>Hassle-Free Returns</h3>
            <p>
              Return or exchange products within 30 days, no questions asked.
            </p>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="testimonials">
        <h2>Reviews</h2>
        <div className="testimonial-cards">
          <div className="testimonial-card">
            <p>"Amazing store! Got my iPhone in just two days."</p>
            <h4>- John D.</h4>
          </div>
          <div className="testimonial-card">
            <p>"Best deals and exceptional service. Highly recommended."</p>
            <h4>- Emma W.</h4>
          </div>
          <div className="testimonial-card">
            <p>"The customer support team was so helpful. Five stars!"</p>
            <h4>- Mark P.</h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;

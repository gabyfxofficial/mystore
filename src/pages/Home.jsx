import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Home.css";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="home">
      {/* Hero Section */}
      <div className="hero-section">
        <h1>Welcome to GABY STORE!</h1>
        <p>Explore the latest iPhones and exclusive offers!</p>
        <button
          className="shop-now-button"
          onClick={() => navigate("/products")}
        >
          Start Shopping
        </button>
      </div>

      {/* Promo Section */}
      <div className="promo-section">
        <h2>Special Winter Discount</h2>
        <p>
          Use the code <strong>WINTER</strong> at checkout to get 20% off on all
          products!
        </p>
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

      {/* Snowflakes */}
      {[...Array(50)].map((_, index) => (
        <div
          key={index}
          className="snowflake"
          style={{
            left: `${Math.random() * 100}%`,
            animationDuration: `${5 + Math.random() * 10}s`,
            fontSize: `${1 + Math.random()}em`,
            animationDelay: `${Math.random() * 5}s`,
          }}
        >
          ❄
        </div>
      ))}
    </div>
  );
};

export default Home;

import React from "react";
import { useNavigate } from "react-router-dom";
import "../styles/PurchaseCompleted.css";

const PurchaseCompleted = () => {
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };

  return (
    <div className="purchase-completed">
      <h1>Thank You for Your Purchase!</h1>
      <p>Your order has been successfully placed.</p>
      <p>We appreciate your business and hope to see you again soon!</p>
      <button className="navigate-home-button" onClick={handleNavigateHome}>
        Go to Home Page
      </button>
    </div>
  );
};

export default PurchaseCompleted;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";
import "../styles/CardPayment.css";

const CardPayment = () => {
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    cardholderName: "",
  });

  const [errors, setErrors] = useState({});
  const [notification, setNotification] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCardDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateInputs = () => {
    const newErrors = {};
    if (!cardDetails.cardholderName.trim()) {
      newErrors.cardholderName = "Cardholder name is required.";
    }
    if (
      !cardDetails.cardNumber.trim() ||
      cardDetails.cardNumber.length !== 16
    ) {
      newErrors.cardNumber = "Card number must be 16 digits.";
    }
    if (
      !cardDetails.expiryDate.trim() ||
      !/^(0[1-9]|1[0-2])\/\d{2}$/.test(cardDetails.expiryDate)
    ) {
      newErrors.expiryDate = "Expiry date must be in MM/YY format.";
    }
    if (!cardDetails.cvv.trim() || cardDetails.cvv.length !== 3) {
      newErrors.cvv = "CVV must be 3 digits.";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateInputs()) {
      setNotification({
        type: "success",
        message: "Payment details submitted successfully!",
      });

      setTimeout(() => {
        dispatch(clearCart()); // Golește coșul de produse
        navigate("/purchase-completed");
      }, 1000); // Redirect după 1 secundă
    } else {
      setNotification({
        type: "error",
        message: "Please correct the errors before submitting.",
      });
    }
  };

  return (
    <div className="payment-wrapper">
      <div className="payment-container">
        <h1 className="payment-title">Enter Card Details</h1>
        {notification && (
          <div className={`notification-box ${notification.type}`}>
            {notification.message}
          </div>
        )}
        <form className="payment-form" onSubmit={handleSubmit}>
          <div>
            <input
              type="text"
              name="cardholderName"
              placeholder="Cardholder Name"
              className={`payment-input ${
                errors.cardholderName ? "error" : ""
              }`}
              value={cardDetails.cardholderName}
              onChange={handleInputChange}
            />
            {errors.cardholderName && (
              <div className="input-error-message">{errors.cardholderName}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="cardNumber"
              placeholder="Card Number"
              className={`payment-input ${errors.cardNumber ? "error" : ""}`}
              value={cardDetails.cardNumber}
              onChange={handleInputChange}
            />
            {errors.cardNumber && (
              <div className="input-error-message">{errors.cardNumber}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="expiryDate"
              placeholder="Expiry Date (MM/YY)"
              className={`payment-input ${errors.expiryDate ? "error" : ""}`}
              value={cardDetails.expiryDate}
              onChange={handleInputChange}
            />
            {errors.expiryDate && (
              <div className="input-error-message">{errors.expiryDate}</div>
            )}
          </div>
          <div>
            <input
              type="text"
              name="cvv"
              placeholder="CVV"
              className={`payment-input ${errors.cvv ? "error" : ""}`}
              value={cardDetails.cvv}
              onChange={handleInputChange}
            />
            {errors.cvv && (
              <div className="input-error-message">{errors.cvv}</div>
            )}
          </div>
          <button type="submit" className="payment-button">
            Pay Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default CardPayment;

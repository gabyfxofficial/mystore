import React, { useState } from "react";
import { useCart } from "./CartContext";
import { useNavigate } from "react-router-dom";
import Notification from "./Notification";
import "./Checkout.css";

const Checkout = () => {
  const { cartItems, clearCart } = useCart();
  const navigate = useNavigate();
  const [notification, setNotification] = useState(null);
  const SHIPPING_COST = 5.99;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const grandTotal = totalPrice + SHIPPING_COST;

  const handleCompletePurchase = (event) => {
    event.preventDefault();
    setNotification(null);

    const paymentMethod = document.querySelector(
      'input[name="payment-method"]:checked'
    );
    if (!paymentMethod) {
      setNotification({
        message: "Please select a payment method.",
        type: "error",
      });
      return;
    }

    const billingInputs = document.querySelectorAll(".billing-input");
    for (let input of billingInputs) {
      if (!input.value) {
        setNotification({
          message: "Please fill in all billing details.",
          type: "error",
        });
        return;
      }
    }

    clearCart();
    navigate("/purchase-completed");
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      {notification && (
        <Notification message={notification.message} type={notification.type} />
      )}

      <div className="checkout-container">
        <section className="billing-section">
          <h2>Billing Details</h2>
          <form className="billing-form">
            {[
              "Full Name",
              "Email Address",
              "Address",
              "City",
              "Postal Code",
              "Phone Number",
            ].map((placeholder, index) => (
              <input
                key={index}
                type={
                  placeholder === "Email Address"
                    ? "email"
                    : placeholder === "Phone Number"
                    ? "tel"
                    : "text"
                }
                placeholder={placeholder}
                className="billing-input"
                required
              />
            ))}
          </form>
        </section>

        <section className="order-summary-section">
          <h2>Order Summary</h2>
          {cartItems.length === 0 ? (
            <p className="empty-cart">Your cart is empty.</p>
          ) : (
            <div className="order-items">
              {cartItems.map((item) => (
                <div className="order-item" key={item.id}>
                  <img
                    src={item.image}
                    alt={item.name}
                    className="item-image"
                  />
                  <div className="item-details">
                    <p className="item-name">{item.name}</p>
                    <p className="item-price">
                      ${item.price.toFixed(2)} x {item.quantity}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          )}
          <div className="order-summary-totals">
            <p>
              Subtotal: <span>${totalPrice.toFixed(2)}</span>
            </p>
            <p>
              Shipping: <span>${SHIPPING_COST.toFixed(2)}</span>
            </p>
            <p>
              <strong>
                Total: <span>${grandTotal.toFixed(2)}</span>
              </strong>
            </p>
          </div>
        </section>
      </div>

      <section className="payment-section">
        <h2>Payment Methods</h2>
        <div className="payment-methods-container">
          {["Credit Card", "PayPal", "Cash"].map((method, index) => (
            <label
              className="payment-option-card"
              htmlFor={method.toLowerCase().replace(" ", "-")}
              key={index}
            >
              <input
                type="radio"
                id={method.toLowerCase().replace(" ", "-")}
                name="payment-method"
                required
              />
              <div className="payment-option-content">
                <span className="payment-icon">
                  {method === "Credit Card" && "💳"}
                  {method === "PayPal" && "🅿️"}
                  {method === "Cash" && "💵"}
                </span>
                <span>{method}</span>
              </div>
            </label>
          ))}
        </div>
        <button className="submit-button" onClick={handleCompletePurchase}>
          <b>Complete Purchase</b>
        </button>
      </section>
    </div>
  );
};

export default Checkout;

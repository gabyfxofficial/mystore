import React from "react";
import { useCart } from "../pages/CartContext";
import "./CheckoutPage.css";

const CheckoutPage = () => {
  const { cartItems } = useCart();
  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="checkout-page-wrapper">
      <h1 className="checkout-page-title">Checkout</h1>
      <div className="checkout-page-content">
        <div className="checkout-billing-details">
          <h2 className="billing-section-title">Billing Details</h2>
          <form className="billing-form">
            <input
              type="text"
              className="billing-input"
              placeholder="Full Name"
            />
            <input
              type="email"
              className="billing-input"
              placeholder="Email Address"
            />
            <input
              type="text"
              className="billing-input"
              placeholder="Address"
            />
            <input type="text" className="billing-input" placeholder="City" />
            <input
              type="text"
              className="billing-input"
              placeholder="Postal Code"
            />
            <input
              type="tel"
              className="billing-input"
              placeholder="Phone Number"
            />
          </form>
        </div>

        <div className="checkout-order-summary">
          <h2 className="order-summary-title">Order Summary</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            cartItems.map((item) => (
              <div className="order-summary-item" key={item.id}>
                <div className="order-summary-item-image">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="order-item-image"
                  />
                </div>
                <div className="order-item-details">
                  <p className="order-item-name">{item.name}</p>
                  <p className="order-item-price">
                    ${item.price.toFixed(2)} x {item.quantity}
                  </p>
                  <p className="order-item-total">
                    ${(item.price * item.quantity).toFixed(2)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div className="order-summary-item">
            <p className="order-item-name">Shipping</p>
            <p className="order-item-price">$5.99</p>
          </div>
          <div className="order-total">
            <p className="order-total-text">Total</p>
            <p className="order-total-price">
              ${(totalPrice + 5.99).toFixed(2)}
            </p>
          </div>
        </div>
      </div>

      <div className="checkout-payment-methods">
        <h2 className="payment-methods-title">Payment Methods</h2>
        <div className="payment-method-option">
          <input
            type="radio"
            id="credit-card-option"
            name="payment-method"
            className="payment-method-input"
          />
          <label htmlFor="credit-card-option" className="payment-method-label">
            Credit Card
          </label>
        </div>
        <div className="payment-method-option">
          <input
            type="radio"
            id="paypal-option"
            name="payment-method"
            className="payment-method-input"
          />
          <label htmlFor="paypal-option" className="payment-method-label">
            PayPal
          </label>
        </div>
        <div className="payment-method-option">
          <input
            type="radio"
            id="cash-option"
            name="payment-method"
            className="payment-method-input"
          />
          <label htmlFor="cash-option" className="payment-method-label">
            Cash
          </label>
        </div>
        <button className="checkout-submit-button">Complete Purchase</button>
      </div>
    </div>
  );
};

export default CheckoutPage;

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../slices/cartSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Checkout.css";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const [discountCode, setDiscountCode] = useState("");
  const [isDiscountApplied, setIsDiscountApplied] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    fullName: "",
    email: "",
    address: "",
    city: "",
    postalCode: "",
    phoneNumber: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const SHIPPING_COST = 5.99;

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const discountedTotal = isDiscountApplied ? totalPrice * 0.8 : totalPrice;

  const grandTotal = discountedTotal + SHIPPING_COST;

  const addNotification = (message, type) => {
    const id = Date.now();
    setNotifications((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setNotifications((prev) => prev.filter((notif) => notif.id !== id));
    }, 5000);
  };

  const handleBillingChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber" && !/^\d*$/.test(value)) {
      return;
    }

    setBillingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleApplyDiscount = () => {
    if (discountCode.trim().toUpperCase() === "WINTER") {
      setIsDiscountApplied(true);
      addNotification(
        "Discount code applied successfully! You saved 20%.",
        "success"
      );
    } else {
      addNotification("Invalid discount code. Please try again.", "error");
    }
  };

  const handleCompletePurchase = (event) => {
    event.preventDefault();

    const allFieldsFilled = Object.values(billingDetails).every((value) =>
      value.trim()
    );

    if (!allFieldsFilled) {
      addNotification("Please fill in all billing details.", "error");
      return;
    }

    if (!paymentMethod) {
      addNotification("Please select a payment method.", "error");
      return;
    }

    if (paymentMethod === "credit-card") {
      navigate("/card-payment");
      return;
    }

    dispatch(clearCart());
    addNotification("Purchase completed successfully!", "success");
    setTimeout(() => {
      navigate("/purchase-completed");
    }, 3000);
  };

  return (
    <div className="checkout-page">
      <h1>Checkout</h1>

      <div className="notifications-container">
        {notifications.map((notif) => (
          <div key={notif.id} className={`notification ${notif.type}`}>
            {notif.message}
          </div>
        ))}
      </div>

      <div className="checkout-container">
        <section className="billing-section">
          <h2>Billing Details</h2>
          <form className="billing-form">
            {[
              { name: "fullName", placeholder: "Full Name" },
              { name: "email", placeholder: "Email Address", type: "email" },
              { name: "address", placeholder: "Address" },
              { name: "city", placeholder: "City" },
              { name: "postalCode", placeholder: "Postal Code" },
              { name: "phoneNumber", placeholder: "Phone Number", type: "tel" },
            ].map(({ name, placeholder, type = "text" }, index) => (
              <input
                key={index}
                type={type}
                name={name}
                placeholder={placeholder}
                className="billing-input"
                value={billingDetails[name]}
                onChange={handleBillingChange}
                pattern={name === "phoneNumber" ? "\\d*" : undefined}
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
            {isDiscountApplied && (
              <p>
                Discount (20%): <span>-${(totalPrice * 0.2).toFixed(2)}</span>
              </p>
            )}
            <p>
              Shipping: <span>${SHIPPING_COST.toFixed(2)}</span>
            </p>
            <p>
              <strong>
                Total: <span>${grandTotal.toFixed(2)}</span>
              </strong>
            </p>
          </div>

          <div className="discount-code-section">
            <input
              type="text"
              placeholder="Enter discount code"
              value={discountCode}
              onChange={(e) => setDiscountCode(e.target.value)}
              className="discount-code-input"
            />
            <button
              type="button"
              className="apply-discount-button"
              onClick={handleApplyDiscount}
            >
              Apply Code
            </button>
          </div>
        </section>
      </div>

      <section className="payment-section">
        <h2>Payment Methods</h2>
        <div className="payment-methods-container">
          {["credit-card", "cash"].map((method) => (
            <label
              className="payment-option-card"
              htmlFor={method}
              key={method}
            >
              <input
                type="radio"
                id={method}
                name="payment-method"
                checked={paymentMethod === method}
                onChange={() => setPaymentMethod(method)}
                required
              />
              <div className="payment-option-content">
                <span className="payment-icon">
                  {method === "credit-card" ? "💳" : "💵"}
                </span>
                <span>{method === "credit-card" ? "Credit Card" : "Cash"}</span>
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

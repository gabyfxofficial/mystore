import React, { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faInfoCircle,
  faUsers,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../pages/CartContext";
import "./Header.css";

function Header() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const dropdownRef = useRef(null); // Reference for the dropdown
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);

  const toggleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  const closeAccountMenu = () => {
    setAccountMenuOpen(false); // Close the dropdown
  };

  // Close the dropdown if a click occurs outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        closeAccountMenu();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        {/* Logo */}
        <Link to="/" className="logo">
          IPHONE STORE
        </Link>

        {/* Navigation */}
        <nav className="nav">
          <ul className="nav-links">
            <li>
              <Link to="/">
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li>
              <Link to="/products">
                <FontAwesomeIcon icon={faShoppingCart} /> Products
              </Link>
            </li>
            <li>
              <Link to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
            <li>
              <Link to="/contact">
                <FontAwesomeIcon icon={faUsers} /> Contact
              </Link>
            </li>
          </ul>
        </nav>

        {/* Cart and Account */}
        <div className="cart-account">
          <div className="cart">
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" /> Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
          <div className="account" ref={dropdownRef}>
            <div className="account-icon" onClick={toggleAccountMenu}>
              <FontAwesomeIcon icon={faUserCircle} size="lg" />
            </div>
            <div
              className={`account-dropdown ${accountMenuOpen ? "open" : ""}`}
            >
              <Link to="/orders-history" onClick={closeAccountMenu}>
                Order History
              </Link>
              <Link to="/my-account" onClick={closeAccountMenu}>
                My Account
              </Link>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

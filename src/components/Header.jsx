import React, { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faInfoCircle,
  faUsers,
  faUserCircle,
} from "@fortawesome/free-solid-svg-icons";
import { useCart } from "../pages/CartContext";
import "../styles/Header.css";

function Header() {
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const dropdownRef = useRef(null);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const navigate = useNavigate();

  const toggleAccountMenu = () => {
    setAccountMenuOpen((prev) => !prev);
  };

  const closeAccountMenu = () => {
    setAccountMenuOpen(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

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
        <Link to="/" className="logo">
          GABY STORE
        </Link>
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
              <Link to="/contact">
                <FontAwesomeIcon icon={faUsers} /> Contact
              </Link>
            </li>
            <li>
              <Link to="/about">
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
          </ul>
        </nav>
        <div className="cart-account">
          <div className="cart">
            <Link to="/cart" className="cart-link">
              <FontAwesomeIcon icon={faShoppingCart} size="lg" />
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
              <Link to="/my-account" onClick={closeAccountMenu}>
                My Account
              </Link>
              <button className="logout-button" onClick={handleLogout}>
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

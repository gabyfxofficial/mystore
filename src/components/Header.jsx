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
  const [asideOpen, setAsideOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const { cartItems } = useCart();
  const cartCount = cartItems.reduce((count, item) => count + item.quantity, 0);
  const navigate = useNavigate();
  const dropdownRef = useRef(null);

  const toggleAside = () => setAsideOpen(!asideOpen);

  const toggleAccountMenu = () => setAccountMenuOpen(!accountMenuOpen);

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const closeAccountDropdown = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target) &&
        accountMenuOpen
      ) {
        setAccountMenuOpen(false);
      }
    };

    document.addEventListener("click", closeAccountDropdown);
    return () => {
      document.removeEventListener("click", closeAccountDropdown);
    };
  }, [accountMenuOpen]);

  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          GABY STORE
        </Link>
        <button className="mobile-menu-button" onClick={toggleAside}>
          ☰
        </button>
      </div>

      {/* Aside Menu */}
      <aside className={`aside-menu ${asideOpen ? "open" : ""}`}>
        <button className="close-aside" onClick={toggleAside}>
          ✕
        </button>

        <div className="aside-section">
          <h3>Navigation</h3>
          <ul className="aside-links">
            <li>
              <Link to="/" onClick={toggleAside}>
                <FontAwesomeIcon icon={faHome} /> Home
              </Link>
            </li>
            <li>
              <Link to="/products" onClick={toggleAside}>
                <FontAwesomeIcon icon={faShoppingCart} /> Products
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={toggleAside}>
                <FontAwesomeIcon icon={faUsers} /> Contact
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={toggleAside}>
                <FontAwesomeIcon icon={faInfoCircle} /> About
              </Link>
            </li>
          </ul>
        </div>

        <div className="aside-section">
          <h3>Cart</h3>
          <div className="cart">
            <Link to="/cart" onClick={toggleAside}>
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
              {cartCount > 0 && <span className="cart-count">{cartCount}</span>}
            </Link>
          </div>
        </div>

        <div className="aside-section">
          <h3>Account</h3>
          <div className="account">
            <div className="account-icon" onClick={toggleAccountMenu}>
              <FontAwesomeIcon icon={faUserCircle} />
              My Account
            </div>
            {accountMenuOpen && (
              <div className="account-dropdown" ref={dropdownRef}>
                <Link to="/my-account" onClick={toggleAside}>
                  My Account
                </Link>
                <Link to="/wishlist" onClick={toggleAside}>
                  Wishlist
                </Link>
                <button className="logout-button" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </aside>
    </header>
  );
}

export default Header;

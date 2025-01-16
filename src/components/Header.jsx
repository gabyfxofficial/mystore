import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faShoppingCart,
  faInfoCircle,
  faUsers,
  faUserCircle,
  faHeart,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "../styles/Header.css";

function Header() {
  const [asideOpen, setAsideOpen] = useState(false);
  const cartItems = useSelector((state) => state.cart);
  const wishlist = useSelector((state) => state.wishlist);
  const [cartChanged, setCartChanged] = useState(false);
  const [wishlistChanged, setWishlistChanged] = useState(false);
  const navigate = useNavigate();

  const toggleAside = () => setAsideOpen(!asideOpen);

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  useEffect(() => {
    document.body.classList.toggle("no-scroll", asideOpen);
    return () => document.body.classList.remove("no-scroll");
  }, [asideOpen]);

  useEffect(() => {
    if (totalCartItems > 0) {
      setCartChanged(true);
      setTimeout(() => setCartChanged(false), 500);
    }
  }, [totalCartItems]);

  useEffect(() => {
    if (wishlist.length > 0) {
      setWishlistChanged(true);
      setTimeout(() => setWishlistChanged(false), 500);
    }
  }, [wishlist]);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/">GABY STORE</Link>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-item">
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link to="/products" className="nav-item">
            <FontAwesomeIcon icon={faShoppingCart} /> Products
          </Link>
          <Link to="/contact" className="nav-item">
            <FontAwesomeIcon icon={faUsers} /> Contact
          </Link>
          <Link to="/about" className="nav-item">
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
          <Link to="/wishlist" className="nav-item badge-container">
            <FontAwesomeIcon icon={faHeart} /> Wishlist
            {wishlist.length > 0 && (
              <span
                className={`badge-circle ${wishlistChanged ? "changed" : ""}`}
              >
                {wishlist.length}
              </span>
            )}
          </Link>
          <Link to="/cart" className="nav-item badge-container">
            <FontAwesomeIcon icon={faShoppingCart} /> Cart
            {totalCartItems > 0 && (
              <span className={`badge-circle ${cartChanged ? "changed" : ""}`}>
                {totalCartItems}
              </span>
            )}
          </Link>
          <Link to="/my-account" className="nav-item">
            <FontAwesomeIcon icon={faUserCircle} /> My Account
          </Link>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
            }}
          >
            <FontAwesomeIcon icon={faSignOutAlt} /> Logout
          </button>
        </nav>

        <button
          className="mobile-menu-button"
          onClick={toggleAside}
          aria-label="Toggle menu"
        >
          ☰
        </button>
      </div>

      <aside className={`aside-menu ${asideOpen ? "open" : ""}`}>
        <button
          className="aside-close-button"
          onClick={toggleAside}
          aria-label="Close menu"
        >
          <FontAwesomeIcon icon={faTimes} />
        </button>

        <div className="aside-section-title">Navigation</div>
        <Link to="/" className="aside-item" onClick={toggleAside}>
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link to="/products" className="aside-item" onClick={toggleAside}>
          <FontAwesomeIcon icon={faShoppingCart} /> Products
        </Link>
        <Link to="/contact" className="aside-item" onClick={toggleAside}>
          <FontAwesomeIcon icon={faUsers} /> Contact
        </Link>
        <Link to="/about" className="aside-item" onClick={toggleAside}>
          <FontAwesomeIcon icon={faInfoCircle} /> About
        </Link>

        <div className="aside-divider"></div>

        <div className="aside-section-title">Cart</div>
        <Link
          to="/cart"
          className="aside-item badge-container"
          onClick={toggleAside}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> Cart
          {totalCartItems > 0 && (
            <span className={`badge-circle ${cartChanged ? "changed" : ""}`}>
              {totalCartItems}
            </span>
          )}
        </Link>
        <Link
          to="/wishlist"
          className="aside-item badge-container"
          onClick={toggleAside}
        >
          <FontAwesomeIcon icon={faHeart} /> Wishlist
          {wishlist.length > 0 && (
            <span
              className={`badge-circle ${wishlistChanged ? "changed" : ""}`}
            >
              {wishlist.length}
            </span>
          )}
        </Link>

        <div className="aside-divider"></div>

        <div className="aside-section-title">Account</div>
        <Link to="/my-account" className="aside-item" onClick={toggleAside}>
          <FontAwesomeIcon icon={faUserCircle} /> My Account
        </Link>

        <button
          className="aside-item logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            toggleAside();
            navigate("/login");
          }}
        >
          <FontAwesomeIcon icon={faSignOutAlt} /> Logout
        </button>
      </aside>

      {asideOpen && (
        <div className="aside-backdrop" onClick={toggleAside}></div>
      )}
    </header>
  );
}

export default Header;

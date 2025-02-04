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

  const toggleAside = () => {
    setAsideOpen(!asideOpen);
    document.body.classList.toggle("menu-open", !asideOpen); // Prevent scroll when menu is open
  };

  const totalCartItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

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

  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo">
          <Link to="/" onClick={scrollToTop}>
            GABY STORE
          </Link>
        </div>

        <nav className="nav-links">
          <Link to="/" className="nav-item" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faHome} /> Home
          </Link>
          <Link to="/products" className="nav-item" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faShoppingCart} /> Products
          </Link>
          <Link to="/contact" className="nav-item" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faUsers} /> Contact
          </Link>
          <Link to="/about" className="nav-item" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faInfoCircle} /> About
          </Link>
          <Link to="/my-account" className="nav-item" onClick={scrollToTop}>
            <FontAwesomeIcon icon={faUserCircle} /> My Account
          </Link>
          <button
            className="logout-button"
            onClick={() => {
              localStorage.removeItem("token");
              navigate("/login");
              scrollToTop();
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
        <Link
          to="/"
          className="aside-item"
          onClick={() => {
            toggleAside();
            scrollToTop();
          }}
        >
          <FontAwesomeIcon icon={faHome} /> Home
        </Link>
        <Link
          to="/products"
          className="aside-item"
          onClick={() => {
            toggleAside();
            scrollToTop();
          }}
        >
          <FontAwesomeIcon icon={faShoppingCart} /> Products
        </Link>
        <Link
          to="/contact"
          className="aside-item"
          onClick={() => {
            toggleAside();
            scrollToTop();
          }}
        >
          <FontAwesomeIcon icon={faUsers} /> Contact
        </Link>
        <Link
          to="/about"
          className="aside-item"
          onClick={() => {
            toggleAside();
            scrollToTop();
          }}
        >
          <FontAwesomeIcon icon={faInfoCircle} /> About
        </Link>

        <div className="aside-divider"></div>

        <div className="aside-section-title">Account</div>
        <Link
          to="/my-account"
          className="aside-item"
          onClick={() => {
            toggleAside();
            scrollToTop();
          }}
        >
          <FontAwesomeIcon icon={faUserCircle} /> My Account
        </Link>
        <Link
          to="/cart"
          className="aside-item badge-container"
          onClick={() => {
            toggleAside();
            scrollToTop();
          }}
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
          onClick={() => {
            toggleAside();
            scrollToTop();
          }}
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

        <button
          className="aside-item logout-button"
          onClick={() => {
            localStorage.removeItem("token");
            toggleAside();
            navigate("/login");
            scrollToTop();
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

import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faFacebook,
  faInstagram,
  faTiktok,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";
import "../styles/Footer.css";

function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="brand">
          <h2>GABY STORE</h2>
          <p>Your one-stop shop for everything!</p>
        </div>
        <div className="footer-links">
          <h4>Quick Links</h4>
          <ul>
            <li>
              <Link to="/PrivacyPolicy" onClick={scrollToTop}>
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/TermsOfService" onClick={scrollToTop}>
                Terms of Service
              </Link>
            </li>
          </ul>
        </div>
        <div className="social-media">
          <h4>Follow Us</h4>
          <ul className="social-icons">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <FontAwesomeIcon icon={faFacebook} />
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <FontAwesomeIcon icon={faInstagram} />
              </a>
            </li>
            <li>
              <a
                href="https://tiktok.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
              >
                <FontAwesomeIcon icon={faTiktok} />
              </a>
            </li>
            <li>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <FontAwesomeIcon icon={faYoutube} />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <p className="footer-note">© 2024 GABY STORE. All rights reserved.</p>
    </footer>
  );
}

export default Footer;

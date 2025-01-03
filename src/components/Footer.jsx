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
  return (
    <footer className="footer">
      <p>Copyright © 2024 - GABY STORE</p>
      <ul className="footer-links">
        <li>
          <Link to="/PrivacyPolicy">Privacy Policy</Link>
        </li>
        <li>
          <Link to="/TermsOfService">Terms of Service</Link>
        </li>
      </ul>
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
    </footer>
  );
}

export default Footer;

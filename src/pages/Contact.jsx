import React from "react";
import "../styles/Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Feel free to reach out using the provided
        contact details.
      </p>
      <div className="contact-content">
        <div className="contact-details">
          <h2>Our Contact Information</h2>
          <p>Email: support@gabystore.com</p>
          <p>Phone: 0732612932</p>
          <p>Address: Str. George Enescu Nr. 30, Ialomita, Fetesti</p>
        </div>
      </div>
    </div>
  );
};

export default Contact;

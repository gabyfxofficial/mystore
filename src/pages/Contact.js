import React from "react";
import "./Contact.css";

const Contact = () => {
  return (
    <div className="contact">
      <h1>Contact Us</h1>
      <p>
        We'd love to hear from you! Feel free to reach out through the form
        below or using the provided contact details.
      </p>
      <div className="contact-content">
        <div className="contact-details">
          <h2>Our Contact Information</h2>
          <p>Email: support@iphonestore.com</p>
          <p>Phone: 0732612932</p>
          <p>Address: Str. George Enescu Nr. 30, Ialomita, Fetesti</p>
        </div>
        <div className="contact-form">
          <h2>Send Us a Message</h2>
          <form>
            <div className="form-group">
              <label htmlFor="name">Name:</label>
              <input type="text" id="name" placeholder="Enter your name" />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input type="email" id="email" placeholder="Enter your email" />
            </div>
            <div className="form-group">
              <label htmlFor="message">Message:</label>
              <textarea
                id="message"
                rows="5"
                placeholder="Write your message here"
              ></textarea>
            </div>
            <button type="submit">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;

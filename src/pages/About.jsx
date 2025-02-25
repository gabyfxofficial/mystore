import React from "react";
import "../styles/About.css";

const About = () => {
  const paragraphs = [
    "Welcome to GABY STORE, your go-to destination for the latest Apple devices. We provide a curated selection of the newest iPhones, offering top-tier performance, cutting-edge design, and unmatched quality that Apple is renowned for.",
    "Whether you’re looking for the latest iPhone 16 series, including the iPhone 16, 16 Plus, 16 Pro, or 16 Pro Max, we have the perfect model for you. Each iPhone is equipped with the newest technologies, including the powerful A18 chip, offering a seamless user experience.",
    "Our store offers not only the latest models but also accessories, services, and support, ensuring that your Apple experience is enhanced. From professional photography features to exceptional battery life and display quality, we help you get the most out of your iPhone.",
    "We aim to deliver the best customer service and expert advice to help you make informed decisions. Whether you're upgrading your current device or purchasing your first iPhone, our team is here to assist you every step of the way.",
  ];

  return (
    <div className="about">
      <h1 className="about-title">About Us</h1>
      {paragraphs.map((text, index) => (
        <p key={index} className="about-text" style={{ "--index": index }}>
          {text}
        </p>
      ))}
    </div>
  );
};

export default About;

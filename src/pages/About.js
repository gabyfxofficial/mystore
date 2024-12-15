import React from "react";
import "./About.css";

const About = () => {
  const paragraphs = [
    "In 2024, Apple unveiled the iPhone 16 series, continuing its tradition of innovation and excellence in design and performance. The lineup includes four models: iPhone 16, iPhone 16 Plus, iPhone 16 Pro, and iPhone 16 Pro Max, each offering significant improvements over their predecessors.",
    "Equipped with the powerful A18 chip built on a 3nm process, these devices deliver superior performance and energy efficiency. The Pro models come with the advanced A18 Pro chip, designed for complex tasks and high-performance gaming.",
    "A major highlight of the iPhone 16 series is its enhanced photography capabilities. The standard models feature a 48MP main camera and a 12MP ultra-wide lens, capturing crisp and detailed images. Pro models offer a triple-camera system, including a new telephoto lens on the Pro Max for exceptional flexibility in photography and videography.",
    "All models are equipped with USB-C ports, support for Wi-Fi 7, and Bluetooth 5.3 for faster and more stable connectivity. Prices for the iPhone 16 series start at $799, reflecting Apple’s commitment to delivering high-quality devices tailored to diverse user needs.",
  ];

  return (
    <div className="about">
      <h1>About Us</h1>
      {paragraphs.map((text, index) => (
        <p key={index} style={{ "--index": index }}>
          {text}
        </p>
      ))}
    </div>
  );
};

export default About;

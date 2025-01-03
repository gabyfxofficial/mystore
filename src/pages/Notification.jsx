import React from "react";
import "../styles/Notification.css";

const Notification = ({ message, type }) => {
  return (
    <div className={`notification ${type}`}>
      <span>{message}</span>
    </div>
  );
};

export default Notification;

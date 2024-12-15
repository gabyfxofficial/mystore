import React from "react";
import "./MyAccount.css";

function MyAccount() {
  const user = {
    name: "John Doe",
    email: "johndoe@example.com",
    phone: "+1 123 456 7890",
    address: "123 Main Street, City, Country",
  };

  return (
    <div className="my-account">
      <h1>My Account</h1>
      <div className="account-details">
        <p>
          <strong>Name:</strong> {user.name}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address}
        </p>
      </div>
    </div>
  );
}

export default MyAccount;

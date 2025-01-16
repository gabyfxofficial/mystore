import React, { useState, useEffect } from "react";
import "../styles/MyAccount.css";

function MyAccount() {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/users/1");
        if (!response.ok) {
          throw new Error("Failed to fetch user data.");
        }
        const data = await response.json();
        setUser(data);
        setLoading(false);
      } catch (error) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (error) {
    return <p className="error-message">{error}</p>;
  }

  if (loading) {
    return (
      <div id="preloader">
        <div id="loader"></div>
      </div>
    );
  }

  return (
    <div className="my-account">
      <h1>My Account</h1>
      <div className="account-details">
        <p>
          <strong>Username:</strong> {user.username}
        </p>
        <p>
          <strong>Email:</strong> {user.email}
        </p>
        <p>
          <strong>Phone:</strong> {user.phone}
        </p>
        <p>
          <strong>Address:</strong> {user.address.number} {user.address.street},{" "}
          {user.address.city}, {user.address.zipcode}
        </p>
      </div>
    </div>
  );
}

export default MyAccount;

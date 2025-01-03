import React from "react";
import { useCart } from "./CartContext";
import "../styles/Wishlist.css";

function Wishlist() {
  const { wishlist, removeFromWishlist } = useCart();

  return (
    <div className="wishlist">
      <h1>Your Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <div className="wishlist-items">
          {wishlist.map((item) => (
            <div key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.name} />
              <div className="wishlist-details">
                <h2>{item.name}</h2>
                <p>${item.price.toFixed(2)}</p>
                <button onClick={() => removeFromWishlist(item.id)}>
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Wishlist;

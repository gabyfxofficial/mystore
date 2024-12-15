import React from "react";
import "./OrderHistory.css";

function OrderHistory() {
  const orders = [
    { id: 1, date: "2024-01-01", total: "$199.99", status: "Delivered" },
    { id: 2, date: "2024-01-15", total: "$799.99", status: "In Transit" },
    { id: 3, date: "2024-02-05", total: "$29.99", status: "Cancelled" },
  ];

  return (
    <div className="order-history">
      <h1>Order History</h1>
      <table className="order-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>{order.date}</td>
              <td>{order.total}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default OrderHistory;

import { useEffect, useState } from "react";

const OrdersList = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the array of objects from the API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Make the GET request to fetch the orders data
      const response = await fetch("http://localhost:5000/order/admin"); // Replace with your actual API endpoint
      const data = await response.json();

      console.log(data);
      // Set the orders state with the fetched data
      setOrders(data.data);
    } catch (error) {
      console.error("Error fetching orders:", error);
    }
  };

  return (
    <div className="admin">
      <div className="admin-order">
        <h1 className="admin-h1">Incoming Orders List</h1>
        <h2 className="admin-h2">Admin & Seller Panel</h2>
      </div>

      {orders.map((order) => (
        <div className="admin-list" key={order.order_id}>
          <p>Order ID: {order.order_id}</p>
          <p>Order Date: {order.order_date}</p>
          <p>Transaction Status: {order.transaction_status}</p>
          <p>Quantity: {order.quantity}</p>
          <p>Total Price: {order.total_price}</p>
          <p>Product ID: {order.product_id}</p>
          <p>Shipper ID: {order.shipper_id}</p>
          <p>Seller ID: {order.seller_id}</p>
          <p>User ID: {order.user_id}</p>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;

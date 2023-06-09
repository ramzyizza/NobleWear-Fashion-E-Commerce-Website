import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import { postData } from "../../utils/services";
import { server } from "../../utils/server";

const OrdersList = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const [orders, setOrders] = useState([]); // Add the orders state variable
  const router = useRouter();
  const { handleSubmit } = useForm();

  const handleUpdateOrder = async (orderId) => {
    try {
      const response = await postData(`${server}/order/update`, {
        order_id: orderId,
      });

      if (response.success) {
        router.push(`/admin/updateOrder/?oid=${orderId}`);
        // Do any additional handling or redirection if needed
      } else {
        console.error("Failed to update the order");
        // Handle the error condition appropriately
      }
    } catch (error) {
      console.error("An error occurred while updating the order:", error);
    }
  };

  useEffect(() => {
    // Fetch the array of objects from the API
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      // Make the GET request to fetch the orders data
      const response = await fetch(`${server}/order/admin`);
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
        <div className="btn-admin">
          <a href="/admin/addProduct">Add Product</a>
        </div>
      </div>

      {orders.map((order) => (
        <div className="admin-list" key={order.order_id}>
          <form
            onSubmit={handleSubmit(() => handleUpdateOrder(order.order_id))}
          >
            <p>Order ID: {order.order_id}</p>
            <p>Order Date: {order.order_date}</p>
            <p>Transaction Status: {order.transaction_status}</p>
            <p>Quantity: {order.quantity}</p>
            <p>Total Price: {order.total_price}</p>
            <p>Product ID: {order.product_id}</p>
            <p>Shipper ID: {order.shipper_id}</p>
            <p>Seller ID: {order.seller_id}</p>
            <p>User ID: {order.user_id}</p>
            <button className="small-btn" type="submit">
              Update
            </button>
          </form>
        </div>
      ))}
    </div>
  );
};

export default OrdersList;

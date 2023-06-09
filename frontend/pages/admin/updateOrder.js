import { useRouter } from "next/router";
import { useState } from "react";

function UpdateOrder() {
  const [transactionStatus, setTransactionStatus] = useState("");
  const router = useRouter();
  const { oid } = router.query;

  const handleSubmit = async (event) => {
    event.preventDefault();

    const orderData = {
      order_id: oid,
      transaction_status: transactionStatus,
    };

    try {
      const response = await fetch("http://localhost:5000/order/update", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      const data = await response.json();

      if (response.ok) {
        console.log(data);
        console.log("Order updated successfully.");
        router.push("/admin");
      } else {
        console.error("Failed to update the order.");
      }
    } catch (error) {
      console.error("An error occurred while updating the order:", error);
    }
  };

  return (
    <div>
      <div className="admin-order">
        <h1 className="admin-h1">Update Order Status</h1>
        <h2 className="admin-h2">Admin & Seller Panel</h2>
      </div>
      <div className="div-form">
        <form className="form-update" onSubmit={handleSubmit}>
          <select
            className="cont-form-item mantap-item"
            id="status"
            value={transactionStatus}
            onChange={(e) => setTransactionStatus(e.target.value)}
          >
            <option value="">Select Status</option>
            <option value="Success">Success</option>
            <option value="Pending">Pending</option>
            <option value="Failed">Failed</option>
          </select>
          <button
            type="submit"
            className="btn btn--rounded btn--yellow btn-submit"
          >
            Update
          </button>
        </form>
      </div>
    </div>
  );
}

export default UpdateOrder;

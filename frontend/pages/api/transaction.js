const midtransClient = require("midtrans-client");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-IwTgG4fl_D77N4Y2KSLboaxJ",
});

export default async (req, res) => {
  const formData = JSON.parse(req.body);
  const data = {
    ...formData,
    product_id: 1,
    shipper_id: 1,
    seller_id: 1,
    user_id: 1,
    quantity: 1,
    status: "Pending",
  };
  try {
    // Send a request to the backend server
    const backendResponse = await fetch("http://localhost:5000/order/create", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (backendResponse.ok) {
      const backendData = await backendResponse.json();
      console.log(backendData.data.order_id);
      const parameter = {
        transaction_details: {
          order_id: backendData.data.order_id,
          gross_amount: data.amount,
        },
        credit_card: {
          secure: true,
        },
        customer_details: {
          first_name: data.firstName,
          last_name: data.lastName,
          email: data.email,
          phone: data.phone,
        },
      };

      snap.createTransaction(parameter).then(async (transaction) => {
        const transactionToken = transaction.token;

        const updateOrderStatus = async () => {
          try {
            const updateResponse = await fetch(
              "http://localhost:5000/order/update",
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  order_id: backendData.data.order_id,
                  transaction_status: "Success", // Update the status to "paid" or any desired value
                }),
              }
            );

            if (updateResponse.ok) {
              console.log("Order status updated successfully");
            } else {
              console.log("Failed to update order status");
            }
          } catch (error) {
            console.log("Error updating order status", error);
          }
        };

        res.status(200).json({
          message: "success",
          transactionToken: transactionToken,
          redirect_url: transaction.redirect_url,
          orderId: backendData.data.order_id, // Send the orderId back to the client
        });
        // Call the updateOrderStatus function to update the order status
        await updateOrderStatus();
      });
    } else {
      res.status(500).json({ success: false, error: "Backend request failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

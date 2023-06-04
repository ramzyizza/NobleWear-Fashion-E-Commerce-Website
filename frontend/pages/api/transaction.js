// const midtransClient = require("midtrans-client");

// let snap = new midtransClient.Snap({
//   isProduction: false,
//   serverKey: "SB-Mid-server-IwTgG4fl_D77N4Y2KSLboaxJ",
// });

// // let parameter = {
// //   transaction_details: {
// //     order_id: "YOUR-ORDERID-12",
// //     gross_amount: 10000,
// //   },
// //   credit_card: {
// //     secure: true,
// //   },
// //   customer_details: {
// //     first_name: "budi",
// //     last_name: "pratama",
// //     email: "budi.pra@example.com",
// //     phone: "08111222333",
// //   },
// // };

// let transactionToken; // Declare the variable outside the `then` block

// export default async (req, res) => {
//   const data = JSON.parse(req.body);
//   try {
//     const response = await fetch("https://localhost:5000/order/create", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(data),
//     });
//     if (response.ok) {
//       const responseData = await response.json();
//       res.status(200).json({ success: true });
//     } else {
//       req.status(response.status).json({ success: false });
//     }
//   } catch (error) {
//     res.status(500);
//   }

//   const parameter = {
//     transaction_details: {
//       order_id: "2984203472", //bikin nih riz,
//       gross_amount: data.amount,
//     },
//     credit_card: {
//       secure: true,
//     },
//     customer_details: {
//       first_name: data.firstName, // data.first_name,
//       last_name: data.lastName, // data.last_name
//       email: data.email,
//       phone: data.phone,
//     },
//   };
//   // Use the transactionToken variable here
//   snap.createTransaction(parameter).then((transaction) => {
//     // Assign the value to the variable inside the `then` block
//     transactionToken = transaction.token;
//     res.status(200).json({
//       message: "success",
//       transactionToken: transactionToken,
//       redirect_url: transaction.redirect_url,
//     });
//   });
// };

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

      snap.createTransaction(parameter).then((transaction) => {
        const transactionToken = transaction.token;

        res.status(200).json({
          message: "success",
          transactionToken: transactionToken,
          redirect_url: transaction.redirect_url,
          orderId: backendData.order_id, // Send the orderId back to the client
        });
      });
    } else {
      res.status(500).json({ success: false, error: "Backend request failed" });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: "Internal server error" });
  }
};

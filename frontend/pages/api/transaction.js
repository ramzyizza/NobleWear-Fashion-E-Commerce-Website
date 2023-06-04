const midtransClient = require("midtrans-client");

let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: "SB-Mid-server-IwTgG4fl_D77N4Y2KSLboaxJ",
});

// let parameter = {
//   transaction_details: {
//     order_id: "YOUR-ORDERID-12",
//     gross_amount: 10000,
//   },
//   credit_card: {
//     secure: true,
//   },
//   customer_details: {
//     first_name: "budi",
//     last_name: "pratama",
//     email: "budi.pra@example.com",
//     phone: "08111222333",
//   },
// };

let transactionToken; // Declare the variable outside the `then` block

export default (req, res) => {
  const data = JSON.parse(req.body);
  const parameter = {
    transaction_details: {
      order_id: "2398420347", //bikin nih riz,
      gross_amount: data.amount,
    },
    credit_card: {
      secure: true,
    },
    customer_details: {
      first_name: data.firstName, // data.first_name,
      last_name: data.lastName, // data.last_name
      email: data.email,
      phone: data.phone,
    },
  };

  console.log(data);
  // Use the transactionToken variable here
  snap.createTransaction(parameter).then((transaction) => {
    // Assign the value to the variable inside the `then` block
    transactionToken = transaction.token;
    res.status(200).json({
      message: "success",
      transactionToken: transactionToken,
      redirect_url: transaction.redirect_url,
    });
  });
};

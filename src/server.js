// server.js
const express = require("express");
const stripe = require("stripe")("sk_test_51QObWyCozvwxkumzWj6hTtCsiRBP1vw20vewizbLrJ0vhGxvnLIqvWidsBbVBTXvWUnGuDsQMNxQuJLacskUpHqe00dnZlPwbh"); // Replace with your Secret Key
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount, // Amount in cents
      currency: "usd",
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
});

app.listen(4242, () => console.log("Server running on port 4242"));

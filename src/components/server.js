const express = require("express");
const cors = require("cors");
const stripe = require("stripe")("sk_test_51QObWyCozvwxkumzWj6hTtCsiRBP1vw20vewizbLrJ0vhGxvnLIqvWidsBbVBTXvWUnGuDsQMNxQuJLacskUpHqe00dnZlPwbh");

const app = express();
app.use(cors());
app.use(express.json());

app.post("/create-checkout-session", async (req, res) => {
  try {
    const { cartItems } = req.body;

    const lineItems = cartItems.map((item) => ({
      price_data: {
        currency: "usd",
        product_data: {
          name: item.providerName || item.service,
        },
        unit_amount: Math.round(item.price * 100), // Convert price to cents
      },
      quantity: 1,
    }));

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: "http://localhost:3000/success",
      cancel_url: "http://localhost:3000/cancel",
    });

    console.log("Checkout Session ID:", session.id);
    res.json({ id: session.id });
  } catch (error) {
    console.error("Error creating checkout session:", error.message);
    res.status(500).json({ error: error.message });
  }
});

app.listen(5000, () => console.log("Server running on port 5000"));

const express = require("express");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// router endpoints
router.post("/intents", async (req, res) => {
  try {
    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "lkr",
      automatic_payment_methods: {
        enabled: true,
      },
    });

    // Return the secret
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;

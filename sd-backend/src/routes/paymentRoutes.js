const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/yohan/paymentController");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

// router endpoints
router.post("/intents", async (req, res) => {
  try {
    // Create a PaymentIntent with the amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount, // in cents (100 cents = 1 rupee)
      currency: "LKR",
      automatic_payment_methods: {
        enabled: true,
      },
    });
    // Return the secret to the client
    res.json({ paymentIntent: paymentIntent.client_secret });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

//Save payment
router.post("/save", paymentController.savePayment);

//Get payment by email
router.get("/:email", paymentController.getPaymentByEmail);

module.exports = router;

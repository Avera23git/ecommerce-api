const express = require("express");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY || "fallback_secret_key");

const router = express.Router();

router.post("/create-checkout-session", async (req, res) => {
    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: req.body.items.map(item => ({
                price_data: {
                    currency: "usd",
                    product_data: { name: item.name },
                    unit_amount: item.price * 100
                },
                quantity: item.quantity
            })),
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel"
        });

        res.json({ url: session.url });
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
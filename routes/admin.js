const express = require("express");
const Product = require("../models/product");
const verifyToken = require("../middleware/auth");

const router = express.Router();

// Add a new product
router.post("/add-product", verifyToken, async (req, res) => {
    if (!req.user.isAdmin) return res.status(403).json("Access denied");

    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json("Product added");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
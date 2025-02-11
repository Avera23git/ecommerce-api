const express = require("express");
const Product = require("../models/product");

const router = express.Router();

// Fetch all products with filtering
router.get("/", async (req, res) => {
    try {
        const { category, search, minPrice, maxPrice } = req.query;
        let filter = {};

        if (category) filter.category = category;
        if (search) filter.name = { $regex: search, $options: "i" };
        if (minPrice || maxPrice) filter.price = { $gte: minPrice || 0, $lte: maxPrice || Infinity };

        const products = await Product.find(filter);
        res.json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
require("dotenv").config
const stripe = require("stripe")("sk_test_51Qr1VdKNkgbD8Ie1OiO97Ckubt8NHZzxxFDlKOmFV5pcFz2d8r0xpuZ2QpqF2SqXtTXLvnLtfDq79HSIFVuwtlHg00rNhW7jrw");
const cors = require("cors");
const authRoutes = require("./routes/auth");
const productRoutes = require("./routes/products");
const checkoutRoutes = require("./routes/checkout");
const adminRoutes = require("./routes/admin");

// console.log("stripe key:",
//     process.env.STRIPE_KEY ? "key" : "not found"
// );
dotenv.config();
const app = express();


app.use("/api/admin", adminRoutes);
app.use("/api/checkout", checkoutRoutes);

app.use("/api/products", productRoutes);
app.use("/api/auth", authRoutes);

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
}).then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));

app.get("/", (req, res) => {
    res.send("E-commerce API Running");
});

const PORT = process.env.PORT || 6000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const router = require("express").Router();
const productRoutes = require("./products");
const userRoutes = require("./user");
const cartRoutes = require("./cart");
router.use("/product", productRoutes);
router.use("/user", userRoutes);
router.use("/cart", cartRoutes)
module.exports = router;
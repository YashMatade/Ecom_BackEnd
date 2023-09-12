const router = require("express").Router();
const productController = require("../controllers/products");
router.post("/list", productController.list);
router.post("/add", productController.create);

module.exports = router;
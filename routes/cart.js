const router = require("express").Router();
const cartController = require("../controllers/cart");

router.post("/add", cartController.addToCart);
router.post("/addanother", cartController.addAnother);
router.post("/removeanother", cartController.removeAnother);
router.post("/remove", cartController.removeProducts);
router.post("/list", cartController.getListOfProductsInCart);
module.exports = router;
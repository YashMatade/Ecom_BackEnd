const mongoose = require("mongoose");
const Scheama = mongoose.Schema;
const User = require("./User")
const Product = require("./Product")
const cart = new Scheama({
    userId: {
        type: mongoose.Types.ObjectId,
        ref: User
    },
    productId: {
        type: mongoose.Types.ObjectId,
        ref: Product
    },
    quantity: {
        type: Number,
        default: 1
    }
});
module.exports = mongoose.model("cart", cart);
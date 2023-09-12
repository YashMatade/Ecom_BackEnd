const productsDB = require("../models/Product");
const CartModel = require("../models/cart");

exports.list = async (req, res) => {
    try {
        const { userId } = req.body;
        let data = await productsDB.find({});
        const cartItems = await CartModel.find({ userId });
        data = data.map(product => {
            const isInCart = cartItems.some(cartItem => cartItem.productId.equals(product._id));
            if (isInCart) {
                return { ...product.toObject(), buttonText: "Item in cart" };
            } else {
                return { ...product.toObject(), buttonText: "Add to cart" };
            }
        });
        if (data.length === 0) {
            res.status(200).json({ err: 300, msg: "No Data found" });
        } else {
            if (cartItems.length > 0) {
                res.status(200).json({ err: 200, msg: "Data found", data });
            } else {
                res.status(200).json({ err: 200, msg: "Data found, but no items in the cart for this userId", data });
            }
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error });
    }
};


exports.create = async (req, res) => {
    try {
        const { title, description, image, actualPrice, offerPrice } = req.body;
        let newProduct = new productsDB({
            title, description, image, actualPrice, offerPrice
        });
        let NewPR = await newProduct.save();
        res.status(200).json({ err: 200, msg: "product added successfully", data: NewPR });
    } catch (err) {
        res.status(500).json({ err: 500, msg: err.toString() })
    }
}
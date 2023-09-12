const { default: mongoose } = require("mongoose");
const CartModel = require("../models/cart");

exports.addToCart = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        const existingCartItem = await CartModel.findOne({ userId, productId })
        if (existingCartItem) {
            res.status(200).json({ err: 300, msg: "Already Added to cart" });
        } else {
            const newCartItem = new CartModel({
                userId,
                productId,
                quantity: 1
            });
            await newCartItem.save();
            res.status(200).json({ err: 200, msg: "Cart item created successfully", cartItem: newCartItem });
        }
    } catch (error) {
        res.status(500).json({ err: 500, msg: error });
    }
}
exports.addAnother = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let updateCriteria = {
            userId,
            productId
        }
        let update = { $inc: { quantity: 1 } }
        const updateCartItem = await CartModel.findOneAndUpdate(updateCriteria,
            update,
            { new: true })
        res.status(200).json({ err: 200, msg: "Cart item added successfully", cartItem: updateCartItem });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error });
    }
}

exports.removeAnother = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        let updateCriteria = {
            userId,
            productId
        }
        let update = { $inc: { quantity: -1 } }
        const updateCartItem = await CartModel.findOneAndUpdate(
            updateCriteria,
            update,
            { new: true }
        )
        res.status(200).json({ err: 200, msg: "Cart item updated successfully", cartItem: updateCartItem });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error });
    }
}

exports.getListOfProductsInCart = async (req, res) => {
    try {
        const { userId } = req.body;
        const listOfCartProducts = await CartModel.find({ userId }).populate("productId");
        if (listOfCartProducts.length === 0) {
            res.status(200).json({ err: 300, msg: "Products Not found" });
        } else {
            const modifiedList = listOfCartProducts.map(item => ({
                ...item.toObject(),
                modifiedPrice: item.quantity * item.productId.offerPrice,
            }));
            const totalPrice = modifiedList.reduce((acc, item) => acc + item.modifiedPrice, 0);
            const gstAmount = (18 / 100) * totalPrice;
            const gstPercentage = "18%"
            const totalWithGST = totalPrice + gstAmount;

            res.status(200).json({
                err: 200,
                msg: "Products found successfully",
                listOfCartProducts: modifiedList,
                gstPercentage,
                totalPrice,
                gstAmount,
                totalWithGST,
            });
        }
    } catch (err) {
        res.status(500).json({ err: 500, msg: err });
    }
}

exports.removeProducts = async (req, res) => {
    try {
        const { userId, productId } = req.body;
        await CartModel.findOneAndDelete({ userId, productId });
        res.status(200).json({ err: 200, msg: "Product removed successfully" })
    }
    catch (err) {
        res.status(500).json({ err: 500, msg: err });
    }
}
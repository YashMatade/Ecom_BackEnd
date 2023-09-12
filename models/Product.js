const mongoose = require("mongoose");
const Scheama = mongoose.Schema;
const product = new Scheama({
    title: {
        type: String
    },
    description: {
        type: String
    },
    image: {
        type: String
    },
    actualPrice: {
        type: String
    },
    offerPrice: {
        type: String
    },
});
module.exports = mongoose.model("products", product);
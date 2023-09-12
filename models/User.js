const mongoose = require("mongoose");
const Scheama = mongoose.Schema;
const user = new Scheama({
    name: {
        type: String
    },
    email: {
        type: String
    },
    password: {
        type: String
    },
    product: {
        type: mongoose.Types.ObjectId
    }
});
module.exports = mongoose.model("users", user);
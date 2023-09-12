const mongoose = require("mongoose");
exports.connectionDB = () => {
    mongoose.connect("mongodb+srv://matadeyash1:UraC4os6JF0kUR5e@cluster0.ntzeigm.mongodb.net/?retryWrites=true&w=majority", {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(() => {
        console.log("Connected to database");
    }).catch((error) => {
        console.log("error occured " + error);
    })
}
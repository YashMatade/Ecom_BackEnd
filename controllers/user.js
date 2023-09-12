const userModel = require("../models/User");

exports.signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        const existingUser = await userModel.findOne({ email });

        if (existingUser) {
            return res.status(200).json({ err: 300, msg: "User already exists" });
        }
        const newUser = new userModel({
            name,
            email,
            password,
        });

        await newUser.save();

        res.status(200).json({ err: 200, msg: "User signed up successfully" });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(400).json({ err: 300, msg: "User not found. Please sign up." });
        }
        if (user.password !== password) {
            return res.status(200).json({ err: 300, msg: "Incorrect password" });
        }
        res.status(200).json({ err: 200, msg: "User logged in successfully", data: user });
    } catch (error) {
        res.status(500).json({ err: 500, msg: error });
    }
};

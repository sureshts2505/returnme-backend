const express = require("express");
const router = express.Router();
const User = require("../models/UsersModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const SECRET_KEY = "mysupersecretkey";




router.post("/register", async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({
            name,
            email,
            password: hashedPassword
        });

        await user.save();

        res.send("User Registered");
    } catch (err) {
        res.status(500).send(err.message);
    }
});


router.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ email });

        if (!user) return res.status(400).send("User not found");

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) return res.status(400).send("Wrong password");

        const token = jwt.sign({ id: user._id }, SECRET_KEY, {
            expiresIn: "1h"
        });

        res.json({ token });

    } catch (err) {
        res.status(500).send(err.message);
    }
});




router.post("/logout", (req, res) => {
    res.send("Logout success (frontend lo token remove cheyyi)");
});

module.exports = router;
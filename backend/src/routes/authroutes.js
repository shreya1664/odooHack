const express = require("express");

const {
    registerUser,
    loginUser
} = require("../controllers/authcontroller");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/me", protect, (req, res) => {
    res.status(200).json({
        message: "You are authenticated",
        userId: req.userId
    });
});

module.exports = router;
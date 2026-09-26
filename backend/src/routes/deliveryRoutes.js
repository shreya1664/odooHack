const express = require("express");

const {
    createDelivery,
    getDeliveries,
    validateDelivery
} = require("../controllers/deliveryController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createDelivery);

router.get("/", protect, getDeliveries);

router.patch("/:id/validate", protect, validateDelivery);

module.exports = router;
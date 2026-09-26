const express = require("express");

const {
    createAdjustment,
    getAdjustments,
    validateAdjustment
} = require("../controllers/adjustmentController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createAdjustment);

router.get("/", protect, getAdjustments);

router.patch("/:id/validate", protect, validateAdjustment);

module.exports = router;
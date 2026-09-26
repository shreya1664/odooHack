const express = require("express");

const {
    createReceipt,
    getReceipts,
    validateReceipt
} = require("../controllers/receiptController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createReceipt);

router.get("/", protect, getReceipts);

router.patch("/:id/validate", protect, validateReceipt);

module.exports = router;
const express = require("express");

const {
    createTransfer,
    getTransfers,
    validateTransfer
} = require("../controllers/transferController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createTransfer);

router.get("/", protect, getTransfers);

router.patch("/:id/validate", protect, validateTransfer);

module.exports = router;
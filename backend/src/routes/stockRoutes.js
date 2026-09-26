const express = require("express");

const {
    createStock,
    getStocks
} = require("../controllers/stockController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createStock);
router.get("/", protect, getStocks);

module.exports = router;
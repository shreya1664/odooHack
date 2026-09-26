const express = require("express");

const {
    getStockMovements
} = require("../controllers/stockMovementController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.get("/", protect, getStockMovements);

module.exports = router;
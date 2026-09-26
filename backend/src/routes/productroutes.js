const express = require("express");

const {
    createProduct,
    getProducts,
    getProductById
} = require("../controllers/productController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createProduct);

router.get("/", protect, getProducts);

router.get("/:id", protect, getProductById);

module.exports = router;
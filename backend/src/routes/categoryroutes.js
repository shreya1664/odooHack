const express = require("express");

const {
    createCategory,
    getCategories
} = require("../controllers/categorycontroller");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createCategory);

router.get("/", protect, getCategories);

module.exports = router;
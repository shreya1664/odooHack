const express = require("express");

const {
    createLocation,
    getLocations
} = require("../controllers/locationController");

const protect = require("../middleware/authmiddleware");

const router = express.Router();

router.post("/", protect, createLocation);
router.get("/", protect, getLocations);

module.exports = router;
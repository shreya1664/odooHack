const Location = require("../models/location");

const createLocation = async (req, res) => {
    try {
        const { name, type } = req.body;

        if (!name) {
            return res.status(400).json({
                message: "Location name is required"
            });
        }

        const existingLocation = await Location.findOne({ name });

        if (existingLocation) {
            return res.status(409).json({
                message: "Location already exists"
            });
        }

        const location = await Location.create({
            name,
            type
        });

        res.status(201).json({
            message: "Location created successfully",
            location
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getLocations = async (req, res) => {
    try {
        const locations = await Location.find()
            .sort({ name: 1 });

        res.status(200).json(locations);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createLocation,
    getLocations
};
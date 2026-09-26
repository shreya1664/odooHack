const Adjustment = require("../models/Adjustment");
const Product = require("../models/product");
const Location = require("../models/location");
const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");
const createAdjustment = async (req, res) => {
    try {
        const {
            adjustmentNumber,
            product,
            location,
            countedQuantity,
            reason
        } = req.body;

        if (
            !adjustmentNumber ||
            !product ||
            !location ||
            countedQuantity === undefined ||
            !reason
        ) {
            return res.status(400).json({
                message: "All adjustment fields are required"
            });
        }

        if (countedQuantity < 0) {
            return res.status(400).json({
                message: "Counted quantity cannot be negative"
            });
        }

        const existingAdjustment = await Adjustment.findOne({
            adjustmentNumber
        });

        if (existingAdjustment) {
            return res.status(409).json({
                message: "Adjustment number already exists"
            });
        }

        const productExists = await Product.findById(product);

        if (!productExists) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const locationExists = await Location.findById(location);

        if (!locationExists) {
            return res.status(404).json({
                message: "Location not found"
            });
        }

        const adjustment = await Adjustment.create({
            adjustmentNumber,
            product,
            location,
            countedQuantity,
            reason
        });

        res.status(201).json({
            message: "Adjustment created successfully",
            adjustment
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getAdjustments = async (req, res) => {
    try {
        const adjustments = await Adjustment.find()
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type")
            .sort({ createdAt: -1 });

        res.status(200).json(adjustments);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const validateAdjustment = async (req, res) => {
    try {
        const { id } = req.params;

        const adjustment = await Adjustment.findById(id);

        if (!adjustment) {
            return res.status(404).json({
                message: "Adjustment not found"
            });
        }

        if (adjustment.status !== "draft") {
            return res.status(400).json({
                message: "Only draft adjustments can be validated"
            });
        }

        let stock = await Stock.findOne({
            product: adjustment.product,
            location: adjustment.location
        });

        // Store old quantity before changing stock
        const oldQuantity = stock ? stock.quantity : 0;

        if (!stock) {
            stock = await Stock.create({
                product: adjustment.product,
                location: adjustment.location,
                quantity: adjustment.countedQuantity
            });
        } else {
            stock.quantity = adjustment.countedQuantity;
            await stock.save();
        }

        // Calculate stock difference
        const difference = adjustment.countedQuantity - oldQuantity;

        // Create stock movement record
        await StockMovement.create({
            product: adjustment.product,
            location: adjustment.location,
            type: "adjustment",
            quantity: difference,
            reference: adjustment.adjustmentNumber,
            note: adjustment.reason
        });

        adjustment.status = "done";

        await adjustment.save();

        await adjustment.save();

        const updatedAdjustment = await Adjustment.findById(
            adjustment._id
        )
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type");

        res.status(200).json({
            message: "Adjustment validated and stock updated",
            adjustment: updatedAdjustment,
            newStock: stock.quantity
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createAdjustment,
    getAdjustments,
    validateAdjustment
};
const Transfer = require("../models/Transfer");
const Product = require("../models/product");
const Location = require("../models/location");
const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");
const createTransfer = async (req, res) => {
    try {
        const {
            transferNumber,
            product,
            fromLocation,
            toLocation,
            quantity
        } = req.body;

        if (
            !transferNumber ||
            !product ||
            !fromLocation ||
            !toLocation ||
            quantity === undefined
        ) {
            return res.status(400).json({
                message: "All transfer fields are required"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        if (fromLocation === toLocation) {
            return res.status(400).json({
                message: "Source and destination locations must be different"
            });
        }

        const existingTransfer = await Transfer.findOne({
            transferNumber
        });

        if (existingTransfer) {
            return res.status(409).json({
                message: "Transfer number already exists"
            });
        }

        const productExists = await Product.findById(product);

        if (!productExists) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        const sourceLocation = await Location.findById(fromLocation);

        if (!sourceLocation) {
            return res.status(404).json({
                message: "Source location not found"
            });
        }

        const destinationLocation = await Location.findById(toLocation);

        if (!destinationLocation) {
            return res.status(404).json({
                message: "Destination location not found"
            });
        }

        const transfer = await Transfer.create({
            transferNumber,
            product,
            fromLocation,
            toLocation,
            quantity
        });

        res.status(201).json({
            message: "Transfer created successfully",
            transfer
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getTransfers = async (req, res) => {
    try {
        const transfers = await Transfer.find()
            .populate("product", "name sku unitOfMeasure")
            .populate("fromLocation", "name type")
            .populate("toLocation", "name type")
            .sort({ createdAt: -1 });

        res.status(200).json(transfers);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const validateTransfer = async (req, res) => {
    try {
        const { id } = req.params;

        const transfer = await Transfer.findById(id);

        if (!transfer) {
            return res.status(404).json({
                message: "Transfer not found"
            });
        }

        if (transfer.status !== "draft") {
            return res.status(400).json({
                message: "Only draft transfers can be validated"
            });
        }

        const sourceStock = await Stock.findOne({
            product: transfer.product,
            location: transfer.fromLocation
        });

        if (!sourceStock) {
            return res.status(400).json({
                message: "No stock available at source location"
            });
        }

        if (sourceStock.quantity < transfer.quantity) {
            return res.status(400).json({
                message: "Insufficient stock at source location",
                availableStock: sourceStock.quantity,
                requestedQuantity: transfer.quantity
            });
        }

        let destinationStock = await Stock.findOne({
            product: transfer.product,
            location: transfer.toLocation
        });

        if (!destinationStock) {
            destinationStock = await Stock.create({
                product: transfer.product,
                location: transfer.toLocation,
                quantity: 0
            });
        }

        sourceStock.quantity -= transfer.quantity;

        destinationStock.quantity += transfer.quantity;

        await sourceStock.save();
        await destinationStock.save();

        await StockMovement.create({
            product: transfer.product,
            location: transfer.fromLocation,
            type: "transfer_out",
            quantity: -transfer.quantity,
            reference: transfer.transferNumber,
            note: "Internal transfer"
        });

        await StockMovement.create({
            product: transfer.product,
            location: transfer.toLocation,
            type: "transfer_in",
            quantity: transfer.quantity,
            reference: transfer.transferNumber,
            note: "Internal transfer"
        });
        transfer.status = "done";

        await transfer.save();
        const updatedTransfer = await Transfer.findById(transfer._id)
            .populate("product", "name sku unitOfMeasure")
            .populate("fromLocation", "name type")
            .populate("toLocation", "name type");

        res.status(200).json({
            message: "Transfer validated and stock updated",
            transfer: updatedTransfer,
            sourceStock: sourceStock.quantity,
            destinationStock: destinationStock.quantity
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createTransfer,
    getTransfers,
    validateTransfer
};
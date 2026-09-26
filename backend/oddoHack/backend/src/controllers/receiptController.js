const Receipt = require("../models/Receipt");
const Product = require("../models/product");
const Location = require("../models/location");
const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");
const createReceipt = async (req, res) => {
    try {
        const {
            receiptNumber,
            supplier,
            product,
            location,
            quantity
        } = req.body;

        if (
            !receiptNumber ||
            !supplier ||
            !product ||
            !location ||
            quantity === undefined
        ) {
            return res.status(400).json({
                message: "All receipt fields are required"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        const existingReceipt = await Receipt.findOne({
            receiptNumber
        });

        if (existingReceipt) {
            return res.status(409).json({
                message: "Receipt number already exists"
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

        const receipt = await Receipt.create({
            receiptNumber,
            supplier,
            product,
            location,
            quantity
        });

        res.status(201).json({
            message: "Receipt created successfully",
            receipt
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getReceipts = async (req, res) => {
    try {
        const receipts = await Receipt.find()
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type")
            .sort({ createdAt: -1 });

        res.status(200).json(receipts);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const validateReceipt = async (req, res) => {
    try {
        const { id } = req.params;

        const receipt = await Receipt.findById(id);

        if (!receipt) {
            return res.status(404).json({
                message: "Receipt not found"
            });
        }

        if (receipt.status !== "draft") {
            return res.status(400).json({
                message: "Only draft receipts can be validated"
            });
        }

        let stock = await Stock.findOne({
            product: receipt.product,
            location: receipt.location
        });

        if (!stock) {
            stock = await Stock.create({
                product: receipt.product,
                location: receipt.location,
                quantity: receipt.quantity
            });
        } else {
            stock.quantity += receipt.quantity;
            await stock.save();
        }

        receipt.status = "done";
        await receipt.save();

        const updatedReceipt = await Receipt.findById(receipt._id)
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type");
        await StockMovement.create({
            product: receipt.product,
            location: receipt.location,
            type: "receipt",
            quantity: receipt.quantity,
            reference: receipt.receiptNumber,
            note: `Receipt from ${receipt.supplier}`
        });
        res.status(200).json({
            message: "Receipt validated and stock updated",
            receipt: updatedReceipt,
            stock
        });
        

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createReceipt,
    getReceipts,
    validateReceipt
};
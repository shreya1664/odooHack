const Delivery = require("../models/Delivery");
const Product = require("../models/product");
const Location = require("../models/location");
const Stock = require("../models/Stock");
const StockMovement = require("../models/StockMovement");
const createDelivery = async (req, res) => {
    try {
        const {
            deliveryNumber,
            customer,
            product,
            location,
            quantity
        } = req.body;

        if (
            !deliveryNumber ||
            !customer ||
            !product ||
            !location ||
            quantity === undefined
        ) {
            return res.status(400).json({
                message: "All delivery fields are required"
            });
        }

        if (quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }

        const existingDelivery = await Delivery.findOne({
            deliveryNumber
        });

        if (existingDelivery) {
            return res.status(409).json({
                message: "Delivery number already exists"
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

        const delivery = await Delivery.create({
            deliveryNumber,
            customer,
            product,
            location,
            quantity
        });

        res.status(201).json({
            message: "Delivery created successfully",
            delivery
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getDeliveries = async (req, res) => {
    try {
        const deliveries = await Delivery.find()
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type")
            .sort({ createdAt: -1 });

        res.status(200).json(deliveries);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const validateDelivery = async (req, res) => {
    try {
        const { id } = req.params;

        const delivery = await Delivery.findById(id);

        if (!delivery) {
            return res.status(404).json({
                message: "Delivery not found"
            });
        }

        if (delivery.status !== "draft") {
            return res.status(400).json({
                message: "Only draft deliveries can be validated"
            });
        }

        const stock = await Stock.findOne({
            product: delivery.product,
            location: delivery.location
        });

        if (!stock) {
            return res.status(400).json({
                message: "No stock available for this product at this location"
            });
        }

        if (stock.quantity < delivery.quantity) {
            return res.status(400).json({
                message: "Insufficient stock",
                availableStock: stock.quantity,
                requestedQuantity: delivery.quantity
            });
        }

        stock.quantity -= delivery.quantity;

        await stock.save();
        await StockMovement.create({
            product: delivery.product,
            location: delivery.location,
            type: "delivery",
            quantity: -delivery.quantity,
            reference: delivery.deliveryNumber,
            note: `Delivery to ${delivery.customer}`
        });
        delivery.status = "done";

        await delivery.save();

        const updatedDelivery = await Delivery.findById(delivery._id)
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type");

        res.status(200).json({
            message: "Delivery validated and stock updated",
            delivery: updatedDelivery,
            remainingStock: stock.quantity
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createDelivery,
    getDeliveries,
    validateDelivery
};
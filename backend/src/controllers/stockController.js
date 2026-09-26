const Stock = require("../models/Stock");
const Product = require("../models/product");
const Location = require("../models/location");

const createStock = async (req, res) => {
    try {
        const { product, location, quantity } = req.body;

        if (!product || !location) {
            return res.status(400).json({
                message: "Product and location are required"
            });
        }

        if (quantity === undefined || quantity < 0) {
            return res.status(400).json({
                message: "Quantity must be 0 or greater"
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

        const existingStock = await Stock.findOne({
            product,
            location
        });

        if (existingStock) {
            return res.status(409).json({
                message: "Stock already exists for this product and location"
            });
        }

        const stock = await Stock.create({
            product,
            location,
            quantity
        });

        const populatedStock = await Stock.findById(stock._id)
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type");

        res.status(201).json({
            message: "Stock created successfully",
            stock: populatedStock
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};



    const getStocks = async (req, res) => {
        try {
            const {
                search,
                location,
                lowStock,
                outOfStock
            } = req.query;

            let stocks = await Stock.find()
                .populate(
                    "product",
                    "name sku unitOfMeasure reorderLevel"
                )
                .populate(
                    "location",
                    "name type"
                )
                .sort({ createdAt: -1 });


            // Search by product name or SKU
            if (search) {
                const searchText = search.toLowerCase();

                stocks = stocks.filter(stock =>
                    stock.product &&
                    (
                        stock.product.name
                            .toLowerCase()
                            .includes(searchText) ||

                        stock.product.sku
                            .toLowerCase()
                            .includes(searchText)
                    )
                );
            }


            // Filter by location
            if (location) {
                stocks = stocks.filter(stock =>
                    stock.location &&
                    stock.location._id.toString() === location
                );
            }


            // Filter low stock
            if (lowStock === "true") {
                stocks = stocks.filter(stock =>
                    stock.quantity > 0 &&
                    stock.product &&
                    stock.quantity <= stock.product.reorderLevel
                );
            }


            // Filter out of stock
            if (outOfStock === "true") {
                stocks = stocks.filter(
                    stock => stock.quantity === 0
                );
            }


            res.status(200).json(stocks);

        } catch (error) {

            res.status(500).json({
                message: "Server error",
                error: error.message
            });

        }
    };



module.exports = {
    createStock,
    getStocks
};
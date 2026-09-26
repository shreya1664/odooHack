const Product = require("../models/product");
const Stock = require("../models/Stock");
const Receipt = require("../models/Receipt");
const Delivery = require("../models/Delivery");
const Transfer = require("../models/Transfer");


const getDashboard = async (req, res) => {
    try {

        const products = await Product.find()
            .select("reorderLevel");

        const stocks = await Stock.find()
            .populate("product", "name sku reorderLevel")
            .populate("location", "name type");


        const totalProducts = products.length;

        const totalStockItems = stocks.length;


        const lowStockItems = stocks.filter(
            stock =>
                stock.quantity > 0 &&
                stock.product &&
                stock.quantity <= stock.product.reorderLevel
        );


        const outOfStockItems = stocks.filter(
            stock => stock.quantity === 0
        );


        const pendingReceipts = await Receipt.countDocuments({
            status: "draft"
        });

        const pendingDeliveries = await Delivery.countDocuments({
            status: "draft"
        });

        const pendingTransfers = await Transfer.countDocuments({
            status: "draft"
        });


        res.status(200).json({
    totalProducts,
    totalStockItems,

    lowStockItems: lowStockItems.length,

    lowStockProducts: lowStockItems,

    outOfStockItems: outOfStockItems.length,

    outOfStockProducts: outOfStockItems,

    pendingReceipts,
    pendingDeliveries,
    pendingTransfers
});

    } catch (error) {

        res.status(500).json({
            message: "Server error",
            error: error.message
        });

    }
};


module.exports = {
    getDashboard
};
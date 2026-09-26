const StockMovement = require("../models/StockMovement");

const getStockMovements = async (req, res) => {
    try {
        const movements = await StockMovement.find()
            .populate("product", "name sku unitOfMeasure")
            .populate("location", "name type")
            .sort({ createdAt: -1 });

        res.status(200).json(movements);

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};

module.exports = {
    getStockMovements
};
const mongoose = require("mongoose");

const stockMovementSchema = new mongoose.Schema(
    {
        product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true
        },

        location: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },

        type: {
            type: String,
            enum: [
                "receipt",
                "delivery",
                "transfer_in",
                "transfer_out",
                "adjustment"
            ],
            required: true
        },

        quantity: {
            type: Number,
            required: true
        },

        reference: {
            type: String,
            required: true
        },

        note: {
            type: String,
            trim: true
        }
    },
    {
        timestamps: true
    }
);

const StockMovement = mongoose.model(
    "StockMovement",
    stockMovementSchema
);

module.exports = StockMovement;
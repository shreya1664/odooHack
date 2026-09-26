const mongoose = require("mongoose");

const adjustmentSchema = new mongoose.Schema(
    {
        adjustmentNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

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

        countedQuantity: {
            type: Number,
            required: true,
            min: 0
        },

        reason: {
            type: String,
            required: true,
            trim: true
        },

        status: {
            type: String,
            enum: ["draft", "done", "cancelled"],
            default: "draft"
        }
    },
    {
        timestamps: true
    }
);

const Adjustment = mongoose.model(
    "Adjustment",
    adjustmentSchema
);

module.exports = Adjustment;
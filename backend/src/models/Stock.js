const mongoose = require("mongoose");

const stockSchema = new mongoose.Schema(
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

        quantity: {
            type: Number,
            required: true,
            default: 0,
            min: 0
        }
    },
    {
        timestamps: true
    }
);

stockSchema.index(
    { product: 1, location: 1 },
    { unique: true }
);

const Stock = mongoose.model("Stock", stockSchema);

module.exports = Stock;
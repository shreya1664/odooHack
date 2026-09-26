const mongoose = require("mongoose");

const transferSchema = new mongoose.Schema(
    {
        transferNumber: {
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

        fromLocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },

        toLocation: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Location",
            required: true
        },

        quantity: {
            type: Number,
            required: true,
            min: 0
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

const Transfer = mongoose.model("Transfer", transferSchema);

module.exports = Transfer;
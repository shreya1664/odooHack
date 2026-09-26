const mongoose = require("mongoose");

const deliverySchema = new mongoose.Schema(
    {
        deliveryNumber: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        customer: {
            type: String,
            required: true,
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

const Delivery = mongoose.model("Delivery", deliverySchema);

module.exports = Delivery;
const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },

        type: {
            type: String,
            enum: ["warehouse", "store", "production", "other"],
            default: "warehouse"
        }
    },
    {
        timestamps: true
    }
);

const Location = mongoose.model("Location", locationSchema);

module.exports = Location;
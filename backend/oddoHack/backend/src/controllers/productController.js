const Product = require("../models/product");
const Category = require("../models/category");

const createProduct = async (req, res) => {
    try {
        const {
            name,
            sku,
            category,
            unitOfMeasure
        } = req.body;

        if (!name || !sku || !category || !unitOfMeasure) {
            return res.status(400).json({
                message: "Name, SKU, category and unit of measure are required"
            });
        }

        const existingProduct = await Product.findOne({
            sku: sku.toUpperCase()
        });

        if (existingProduct) {
            return res.status(409).json({
                message: "Product with this SKU already exists"
            });
        }

        const existingCategory = await Category.findById(category);

        if (!existingCategory) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        const product = await Product.create({
            name,
            sku,
            category,
            unitOfMeasure
        });

        const populatedProduct = await Product.findById(product._id)
            .populate("category", "name");

        res.status(201).json({
            message: "Product created successfully",
            product: populatedProduct
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getProducts = async (req, res) => {
    try {
        const products = await Product.find()
            .populate("category", "name")
            .sort({ createdAt: -1 });

        res.status(200).json({
            products
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


const getProductById = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id)
            .populate("category", "name");

        if (!product) {
            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.status(200).json({
            product
        });

    } catch (error) {
        res.status(500).json({
            message: "Server error",
            error: error.message
        });
    }
};


module.exports = {
    createProduct,
    getProducts,
    getProductById
};
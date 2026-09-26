const dns = require("dns");
dns.setServers(["8.8.8.8", "1.1.1.1"]);

const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./src/config/db");
const authRoutes = require("./src/routes/authroutes");
const categoryRoutes = require("./src/routes/categoryroutes");
const productRoutes = require("./src/routes/productroutes");
const locationRoutes = require("./src/routes/locationRoutes");
const stockRoutes = require("./src/routes/stockRoutes");
const receiptRoutes = require("./src/routes/receiptRoutes");
const deliveryRoutes = require("./src/routes/deliveryRoutes");
const transferRoutes = require("./src/routes/transferRoutes");
const adjustmentRoutes = require("./src/routes/adjustmentRoutes");
const stockMovementRoutes =
    require("./src/routes/stockMovementRoutes");
    const dashboardRoutes =
    require("./src/routes/dashboardRoutes");
dotenv.config();

const app = express();

connectDB();

app.use(express.json());

app.get("/", (req, res) => {
    res.send("StockSense API is running");
});
app.use("/api/auth", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/stocks", stockRoutes);
app.use("/api/receipts", receiptRoutes);
app.use("/api/deliveries", deliveryRoutes);
app.use("/api/transfers", transferRoutes);
app.use("/api/adjustments", adjustmentRoutes);
app.use("/api/stock-movements", stockMovementRoutes);
app.use("/api/dashboard", dashboardRoutes);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
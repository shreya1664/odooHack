const API_BASE = "/api";

async function request(endpoint, options = {}) {
    const token = localStorage.getItem("token");

    const response = await fetch(`${API_BASE}${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token ? { Authorization: `Bearer ${token}` } : {}),
            ...(options.headers || {}),
        },
    });

    const data = await response.json();

    if (!response.ok) {
        throw new Error(data.message || "Something went wrong");
    }

    return data;
}

// =========================
// AUTH
// =========================

export const login = (email, password) =>
    request("/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

export const register = (name, email, password) =>
    request("/auth/register", {
        method: "POST",
        body: JSON.stringify({ name, email, password }),
    });


// =========================
// PRODUCTS
// =========================

export const getProducts = () =>
    request("/products");

export const createProduct = (product) =>
    request("/products", {
        method: "POST",
        body: JSON.stringify(product),
    });


// =========================
// DASHBOARD
// =========================

export const getDashboard = () =>
    request("/dashboard");


// =========================
// STOCK
// =========================

export const getStocks = () =>
    request("/stocks");


// =========================
// LOCATIONS
// =========================

export const getLocations = () =>
    request("/locations");


// =========================
// CATEGORIES
// =========================

export const getCategories = () =>
    request("/categories");


// =========================
// RECEIPTS
// =========================

export const createReceipt = (data) =>
    request("/receipts", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const getReceipts = () =>
    request("/receipts");

export const validateReceipt = (id) =>
    request(`/receipts/${id}/validate`, {
        method: "PATCH",
    });


// =========================
// DELIVERIES
// =========================

export const createDelivery = (data) =>
    request("/deliveries", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const getDeliveries = () =>
    request("/deliveries");

export const validateDelivery = (id) =>
    request(`/deliveries/${id}/validate`, {
        method: "PATCH",
    });


// =========================
// TRANSFERS
// =========================

export const createTransfer = (data) =>
    request("/transfers", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const getTransfers = () =>
    request("/transfers");

export const validateTransfer = (id) =>
    request(`/transfers/${id}/validate`, {
        method: "PATCH",
    });


// =========================
// ADJUSTMENTS
// =========================

export const createAdjustment = (data) =>
    request("/adjustments", {
        method: "POST",
        body: JSON.stringify(data),
    });

export const getAdjustments = () =>
    request("/adjustments");

export const validateAdjustment = (id) =>
    request(`/adjustments/${id}/validate`, {
        method: "PATCH",
    });


// =========================
// STOCK LEDGER / MOVEMENTS
// =========================

export const getStockMovements = () =>
    request("/stock-movements");
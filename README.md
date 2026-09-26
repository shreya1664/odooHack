# StockSense 📦

A centralized, real-time inventory management system for smarter warehouse operations.

StockSense replaces scattered spreadsheets and manual inventory registers with a unified platform for tracking products, stock levels, receipts, deliveries, transfers, adjustments, and inventory history.

## 🚀 Why StockSense?

Managing inventory across warehouses can quickly become messy when data is spread across Excel sheets, registers, and disconnected systems.

StockSense brings everything into one place.

- 📊 Real-time inventory dashboard
- 📦 Centralized product & stock management
- 📥 Receipt management
- 📤 Delivery order management
- 🔄 Internal stock transfers
- 🛠️ Inventory adjustments
- 📜 Complete stock movement ledger
- 🏭 Multi-location / warehouse support
- 🔐 Secure authentication
- 🔎 Searchable and structured inventory data

## ✨ Key Features

### 📊 Inventory Dashboard

Get an instant overview of your inventory:

- Total products in stock
- Low / out-of-stock items
- Pending receipts
- Pending deliveries
- Scheduled transfers
- Recent inventory movements

### 📦 Product Management

Manage your complete product catalog with:

- Product names
- SKU identification
- Categories
- Units of measurement
- Reorder levels
- Location-wise stock

### 📥 Receipts

Record incoming inventory from suppliers.

**Example:**

```
+100 kg Steel → Main Warehouse
```

Once validated, StockSense automatically updates the corresponding stock level and records the movement in the inventory ledger.

### 📤 Deliveries

Manage outgoing inventory and customer deliveries.

**Example:**

```
20 kg Steel → Customer
```

Stock is automatically reduced when the delivery is validated, with safeguards against insufficient stock.

### 🔄 Internal Transfers

Move inventory between company locations without changing the overall stock quantity.

**Example:**

```
Main Warehouse → Production Floor
```

Every transfer is recorded for complete traceability.

### 🛠️ Inventory Adjustments

Reconcile system inventory with physical stock and record discrepancies such as damaged or missing items.

### 📜 Stock Ledger

Maintain a complete history of inventory movements, including:

- Receipts
- Deliveries
- Transfers
- Adjustments
- Quantities
- Locations
- References
- Timestamps

## 🏗️ System Architecture

```
                    ┌─────────────────────┐
                    │      StockSense     │
                    │    React Frontend   │
                    └──────────┬──────────┘
                               │
                         REST API / HTTP
                               │
                    ┌──────────▼──────────┐
                    │    Node.js +        │
                    │      Express        │
                    └──────────┬──────────┘
                               │
                    ┌──────────▼──────────┐
                    │      MongoDB        │
                    │      Database       │
                    └─────────────────────┘
```

## 🛠️ Tech Stack

**Frontend**
- React
- Vite
- Tailwind CSS
- Lucide React

**Backend**
- Node.js
- Express.js
- REST APIs

**Database**
- MongoDB
- Mongoose

**Authentication**
- Token-based authentication
- Protected API routes

## 📂 Project Structure

```
StockSense/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── App.jsx
│   └── package.json
│
└── backend/
    ├── controllers/
    ├── models/
    ├── routes/
    ├── middleware/
    ├── server.js
    └── package.json
```

## ⚙️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repository-url>
cd StockSense
```

### 2. Start the backend

```bash
cd backend
npm install
npm start
```

The backend runs on:

```
http://localhost:5000
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at:

```
http://localhost:5173
```

## 🔑 Environment Variables

Create a `.env` file inside the backend directory:

```
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Keep your `.env` file private and never commit credentials to GitHub.

## 🔄 Inventory Flow

```
        Supplier
           │
           ▼
       📥 Receipt
           │
           ▼
     + Inventory
           │
           ▼
     🏭 Warehouse
        /      \
       /        \
      ▼          ▼
🔄 Transfer    📤 Delivery
      │            │
      ▼            ▼
 New Location   - Inventory
       │
       ▼
 🛠️ Adjustment
       │
       ▼
📜 Stock Ledger
```

## 🎯 Example

Suppose the warehouse receives 100 kg of steel:

```
Receipt
   ↓
+100 kg Main Warehouse
   ↓
Transfer 40 kg → Production Floor
   ↓
Deliver 20 kg
   ↓
Adjust 3 kg damaged
```

StockSense keeps every operation synchronized and records each movement in the inventory ledger.

## 🔐 Security

StockSense uses protected backend routes and token-based authentication to ensure inventory operations are accessible only to authenticated users.

## 🌱 Future Scope

Potential extensions include:

- Role-based access control
- Advanced inventory analytics
- Automated reorder notifications
- Barcode / QR-based inventory scanning
- Supplier management
- Audit reports
- Exportable inventory reports
- Real-time notifications
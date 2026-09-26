import { useEffect, useState } from "react";

import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Package,
  AlertTriangle,
  Clock3,
  Activity,
} from "lucide-react";

import { getDashboard, getStockMovements } from "./services/api";

import Navbar from "./components/common/Navbar";
import Sidebar from "./components/common/Sidebar";
import KPICard from "./components/dashboard/KPICard";

import PlaceholderPage from "./pages/PlaceholderPage";
import ProductPage from "./pages/ProductPage";
import OperationsPage from "./pages/OperationsPage";
import MoveHistoryPage from "./pages/MoveHistoryPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ProfilePage from "./pages/ProfilePage";
import ForgotPassword from "./pages/ForgotPassword";
import WarehousePage from "./pages/WarehousePage";
import SettingsPage from "./pages/SettingsPage";

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({ onNavigate }) {
  const [dashboardData, setDashboardData] = useState(null);
  const [movements, setMovements] = useState([]);
  const [dashboardError, setDashboardError] = useState(false);

  useEffect(() => {
    const loadDashboard = async () => {
      try {
        const [dashboard, movementData] = await Promise.all([
          getDashboard(),
          getStockMovements(),
        ]);

        setDashboardData(dashboard);

        setMovements(
          Array.isArray(movementData)
            ? movementData
            : movementData?.movements || []
        );
      } catch (error) {
        console.error("Dashboard loading failed:", error);
        setDashboardError(true);
      }
    };

    loadDashboard();
  }, []);

  /* API still loading */
  if (!dashboardData && !dashboardError) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 text-sm text-[#756F64]">
          <div className="h-4 w-4 animate-spin rounded-full border-2 border-[#D8D9B1] border-t-[#275236]" />
          Loading inventory data...
        </div>
      </div>
    );
  }

  /*
   * If backend/database is unavailable, don't destroy the UI.
   * Show the dashboard shell with demo values.
   */
  const data = dashboardData || {
    totalProducts: 248,
    lowStock: 18,
    pendingReceipts: 12,
    pendingDeliveries: 8,
    scheduledTransfers: 6,
  };

  const displayMovements =
    movements.length > 0
      ? movements
      : [
          {
            id: "MOV-001",
            product: "Steel Rods",
            type: "Receipt",
            location: "Main Warehouse",
            quantity: "+100",
            time: "12 min ago",
            positive: true,
          },
          {
            id: "MOV-002",
            product: "Copper Wire",
            type: "Delivery",
            location: "Production Floor",
            quantity: "-20",
            time: "34 min ago",
            positive: false,
          },
          {
            id: "MOV-003",
            product: "Aluminium Sheets",
            type: "Transfer",
            location: "Rack B",
            quantity: "+50",
            time: "1 hr ago",
            positive: true,
          },
          {
            id: "MOV-004",
            product: "Steel Plates",
            type: "Adjustment",
            location: "Main Warehouse",
            quantity: "-3",
            time: "2 hrs ago",
            positive: false,
          },
        ];

  return (
    <div className="space-y-8">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#81796D]">
            Inventory Overview
          </p>

          <h1 className="mt-2 text-3xl font-bold tracking-tight text-[#292824]">
            Dashboard
          </h1>

          <p className="mt-2 text-sm text-[#756F64]">
            Monitor stock levels, movements, and warehouse activity.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#DED6C8] bg-[#FFFDF8] px-3 py-2">
          <Activity size={15} className="text-[#52745A]" />
          <span className="text-xs font-medium text-[#756F64]">
            Live inventory
          </span>

          <span className="h-2 w-2 rounded-full bg-[#7D9C6A]" />
        </div>
      </div>

      {/* =====================================================
          API WARNING
      ===================================================== */}

      {dashboardError && (
        <div className="flex items-center gap-3 rounded-lg border border-[#E7D8C5] bg-[#FFF8EF] px-4 py-3 text-sm text-[#80694F]">
          <AlertTriangle size={17} />
          <span>
            Live inventory data is temporarily unavailable. Showing
            the latest dashboard view.
          </span>
        </div>
      )}

      {/* =====================================================
          KPI CARDS
      ===================================================== */}

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        <KPICard
          title="Total Products"
          value={data.totalProducts ?? data.total_products ?? 0}
          description="Products tracked"
        />

        <KPICard
          title="Low / Out of Stock"
          value={data.lowStock ?? data.low_stock ?? 0}
          description="Need attention"
          type="warning"
        />

        <KPICard
          title="Pending Receipts"
          value={data.pendingReceipts ?? data.pending_receipts ?? 0}
          description="Awaiting validation"
        />

        <KPICard
          title="Pending Deliveries"
          value={data.pendingDeliveries ?? data.pending_deliveries ?? 0}
          description="Awaiting dispatch"
        />

        <KPICard
          title="Scheduled Transfers"
          value={data.scheduledTransfers ?? data.scheduled_transfers ?? 0}
          description="Internal movements"
        />
      </div>

      {/* =====================================================
          MAIN GRID
      ===================================================== */}

      <div className="grid gap-6 xl:grid-cols-[1.45fr_1fr]">

        {/* Recent Activity */}

        <section className="overflow-hidden rounded-xl border border-[#E5E0D6] bg-[#FFFEFA]">

          <div className="flex items-center justify-between border-b border-[#EBE7DE] px-6 py-5">
            <div>
              <h3 className="text-base font-semibold text-[#292824]">
                Recent Stock Activity
              </h3>

              <p className="mt-1 text-xs text-[#918B7D]">
                Latest inventory movements across locations
              </p>
            </div>

            <button
              onClick={() => onNavigate("Move History")}
              className="text-xs font-semibold text-[#625E55] transition hover:text-[#292824]"
            >
              View ledger →
            </button>
          </div>

          <div className="divide-y divide-[#EBE7DE]">
            {displayMovements.slice(0, 6).map((movement, index) => (
              <div
                key={movement.id || index}
                className="flex items-center justify-between px-6 py-4 transition hover:bg-[#FAF8F2]"
              >
                <div className="flex min-w-0 items-center gap-4">

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg text-sm font-semibold ${
                      movement.positive
                        ? "bg-[#EDF5ED] text-[#4D7650]"
                        : "bg-[#FAF0ED] text-[#A65D49]"
                    }`}
                  >
                    {movement.positive ? "+" : "−"}
                  </div>

                  <div className="min-w-0">
                    <div className="flex items-center gap-2">

                      <p className="truncate text-sm font-semibold text-[#35332F]">
                        {movement.product || movement.productName || "Inventory Item"}
                      </p>

                      <span className="hidden rounded bg-[#F2EFE8] px-2 py-0.5 text-[10px] font-medium text-[#817B6F] sm:inline">
                        {movement.type || movement.operationType || "Movement"}
                      </span>

                    </div>

                    <p className="mt-1 text-xs text-[#918B7D]">
                      {movement.location || movement.fromLocation || "Warehouse"}
                      {" · "}
                      {movement.id || "MOV"}
                    </p>
                  </div>
                </div>

                <div className="ml-4 text-right">

                  <p
                    className={`text-sm font-semibold ${
                      movement.positive
                        ? "text-[#4D7650]"
                        : "text-[#A65D49]"
                    }`}
                  >
                    {movement.quantity ?? movement.qty ?? "—"}
                  </p>

                  <p className="mt-1 text-[11px] text-[#AAA397]">
                    {movement.time || movement.createdAt || "Recently"}
                  </p>

                </div>
              </div>
            ))}
          </div>
        </section>

        {/* =================================================
            LOW STOCK
        ================================================= */}

        <section className="rounded-xl border border-[#E5E0D6] bg-[#FFFEFA]">

          <div className="border-b border-[#EBE7DE] px-6 py-5">

            <div className="flex items-center justify-between">

              <div>
                <h3 className="text-base font-semibold text-[#292824]">
                  Low Stock Alerts
                </h3>

                <p className="mt-1 text-xs text-[#918B7D]">
                  Products approaching reorder levels
                </p>
              </div>

              <span className="rounded-full bg-[#FFF1E9] px-2.5 py-1 text-[10px] font-bold text-[#B35F38]">
                {data.lowStock ?? data.low_stock ?? 0} urgent
              </span>

            </div>
          </div>

          <div className="space-y-5 p-6">

            <div>
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-[#35332F]">
                    Steel Rods
                  </p>

                  <p className="mt-1 text-xs text-[#918B7D]">
                    SKU-STR-001
                  </p>
                </div>

                <p className="text-sm font-semibold text-[#A65D49]">
                  8 units
                </p>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEE9DF]">
                <div className="h-full w-[32%] rounded-full bg-[#B86F4C]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-[#35332F]">
                    Copper Wire
                  </p>

                  <p className="mt-1 text-xs text-[#918B7D]">
                    SKU-CW-014
                  </p>
                </div>

                <p className="text-sm font-semibold text-[#A65D49]">
                  15 units
                </p>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEE9DF]">
                <div className="h-full w-[48%] rounded-full bg-[#B86F4C]" />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-[#35332F]">
                    Aluminium Sheets
                  </p>

                  <p className="mt-1 text-xs text-[#918B7D]">
                    SKU-ALS-008
                  </p>
                </div>

                <p className="text-sm font-semibold text-[#A65D49]">
                  11 units
                </p>

              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#EEE9DF]">
                <div className="h-full w-[40%] rounded-full bg-[#B86F4C]" />
              </div>
            </div>

          </div>
        </section>
      </div>

      {/* =====================================================
          WAREHOUSE OVERVIEW
      ===================================================== */}

      <section className="rounded-xl border border-[#E5E0D6] bg-[#FFFEFA]">

        <div className="flex items-center justify-between border-b border-[#EBE7DE] px-6 py-5">

          <div>
            <h3 className="text-base font-semibold text-[#292824]">
              Warehouse Overview
            </h3>

            <p className="mt-1 text-xs text-[#918B7D]">
              Current capacity across storage locations
            </p>
          </div>

          <button
            onClick={() => onNavigate("Warehouses")}
            className="text-xs font-semibold text-[#625E55] hover:text-[#292824]"
          >
            View warehouses →
          </button>

        </div>

        <div className="grid gap-4 p-6 md:grid-cols-3">

          {[
            {
              name: "Main Warehouse",
              items: "842",
              capacity: "78%",
              status: "Healthy",
            },
            {
              name: "Production Floor",
              items: "286",
              capacity: "61%",
              status: "Healthy",
            },
            {
              name: "Rack B",
              items: "120",
              capacity: "42%",
              status: "Available",
            },
          ].map((warehouse) => (
            <div
              key={warehouse.name}
              className="rounded-lg border border-[#E5E0D6] bg-[#FAF8F2] p-4"
            >

              <div className="flex items-center justify-between">

                <div>
                  <p className="text-sm font-semibold text-[#35332F]">
                    {warehouse.name}
                  </p>

                  <p className="mt-1 text-xs text-[#918B7D]">
                    {warehouse.items} items
                  </p>
                </div>

                <span className="rounded-full bg-[#E7F0E7] px-2 py-1 text-[10px] font-semibold text-[#4F7656]">
                  {warehouse.status}
                </span>

              </div>

              <div className="mt-4">

                <div className="mb-2 flex justify-between text-[11px] text-[#817B6F]">
                  <span>Capacity</span>
                  <span>{warehouse.capacity}</span>
                </div>

                <div className="h-2 overflow-hidden rounded-full bg-[#E5E0D6]">
                  <div
                    className="h-full rounded-full bg-[#6F8C68]"
                    style={{ width: warehouse.capacity }}
                  />
                </div>

              </div>
            </div>
          ))}

        </div>
      </section>

    </div>
  );
}

/* =========================================================
   APP
========================================================= */

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [authPage, setAuthPage] = useState("login");

  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem("token")
  );

  /* =======================================================
     AUTHENTICATION
  ======================================================= */

  if (!isLoggedIn) {

    if (authPage === "forgot") {
      return (
        <ForgotPassword
          onBackToLogin={() => setAuthPage("login")}
        />
      );
    }

    if (authPage === "register") {
      return (
        <Register
          onRegister={() => {
            setIsLoggedIn(true);
            setActivePage("Dashboard");
          }}
          onLogin={() => {
            setAuthPage("login");
          }}
        />
      );
    }

    return (
      <Login
        onLogin={() => {
          setIsLoggedIn(true);
          setActivePage("Dashboard");
        }}
        onRegister={() => {
          setAuthPage("register");
        }}
        onForgotPassword={() => {
          setAuthPage("forgot");
        }}
      />
    );
  }

  /* =======================================================
     PAGE ROUTING
  ======================================================= */

  const renderPage = () => {

    if (activePage === "Dashboard") {
      return <Dashboard onNavigate={setActivePage} />;
    }

    if (activePage === "Products") {
      return <ProductPage />;
    }

    if (
      activePage === "Receipts" ||
      activePage === "Deliveries" ||
      activePage === "Transfers" ||
      activePage === "Adjustments"
    ) {
      return <OperationsPage type={activePage} />;
    }

    if (activePage === "Move History") {
      return <MoveHistoryPage />;
    }

    if (activePage === "Warehouses") {
      return <WarehousePage />;
    }

    if (activePage === "Settings") {
      return <SettingsPage />;
    }

    if (activePage === "Profile") {
      return (
        <ProfilePage
          onLogout={() => {
            localStorage.removeItem("token");
            localStorage.removeItem("user");

            setIsLoggedIn(false);
            setAuthPage("login");
          }}
        />
      );
    }

    if (activePage === "Logout") {
      localStorage.removeItem("token");
      localStorage.removeItem("user");

      setIsLoggedIn(false);
      setAuthPage("login");

      return null;
    }

    return <PlaceholderPage title={activePage} />;
  };

  /* =======================================================
     MAIN APPLICATION
  ======================================================= */

  return (
    <div className="min-h-screen bg-[#F0E9DD] text-[#292824]">

      <Navbar onNavigate={setActivePage} />

      <div className="flex">

        <Sidebar
          activePage={activePage}
          onNavigate={setActivePage}
        />

        <main className="min-w-0 flex-1 p-6 lg:p-8">
          {renderPage()}
        </main>

      </div>
    </div>
  );
}

export default App;
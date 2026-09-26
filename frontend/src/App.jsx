import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  Package,
  AlertTriangle,
  Clock3,
  Activity,
} from "lucide-react";

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

function Dashboard({ onNavigate }) {
  const recentMovements = [
    {
      id: "MOV-001",
      type: "Receipt",
      product: "Steel Rods",
      quantity: "+100 kg",
      location: "Main Warehouse",
      user: "Inventory Manager",
      time: "09:42",
    },
    {
      id: "MOV-002",
      type: "Transfer",
      product: "Steel Rods",
      quantity: "100 kg",
      location: "Main Warehouse → Rack B",
      user: "Warehouse Staff",
      time: "10:18",
    },
    {
      id: "MOV-003",
      type: "Delivery",
      product: "Copper Wire",
      quantity: "-20 units",
      location: "Main Warehouse",
      user: "Inventory Manager",
      time: "11:06",
    },
    {
      id: "MOV-004",
      type: "Adjustment",
      product: "Steel Plates",
      quantity: "-3 units",
      location: "Main Warehouse",
      user: "Warehouse Staff",
      time: "11:34",
    },
    {
      id: "MOV-005",
      type: "Receipt",
      product: "Aluminium Sheets",
      quantity: "+50 units",
      location: "Supplier → Rack B",
      user: "Inventory Manager",
      time: "12:08",
    },
    {
      id: "MOV-006",
      type: "Transfer",
      product: "Copper Wire",
      quantity: "35 units",
      location: "Main Warehouse → Production Floor",
      user: "Warehouse Staff",
      time: "12:26",
    },
  ];

  const typeStyles = {
    Receipt: {
      icon: ArrowDownToLine,
      bg: "bg-[#E7F0E7]",
      text: "text-[#4F7656]",
    },
    Delivery: {
      icon: ArrowUpFromLine,
      bg: "bg-[#F5E8D8]",
      text: "text-[#A66A3F]",
    },
    Transfer: {
      icon: ArrowLeftRight,
      bg: "bg-[#E9E8D0]",
      text: "text-[#275236]",
    },
    Adjustment: {
      icon: AlertTriangle,
      bg: "bg-[#F1E2E0]",
      text: "text-[#9A5B55]",
    },
  };

  return (
    <div className="mx-auto max-w-7xl">

      {/* Header */}
      <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#756F64]">
            Overview
          </p>

          <h1 className="text-2xl font-bold tracking-tight text-[#292824]">
            Inventory Dashboard
          </h1>

          <p className="mt-1 text-sm text-[#756F64]">
            Monitor stock levels and warehouse activity at a glance.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-[#DED6C8] bg-[#FFFDF8] px-3 py-2">
          <span className="h-2 w-2 rounded-full bg-[#668C6A]" />

          <span className="text-xs font-medium text-[#756F64]">
            System operational
          </span>
        </div>

      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">

        <KPICard
          title="Total Products"
          value="248"
          description="Products across locations"
          trend="+12 this month"
        />

        <KPICard
          title="Low / Out of Stock"
          value="18"
          description="Needs attention"
          type="warning"
          trend="7 critical"
        />

        <KPICard
          title="Pending Receipts"
          value="12"
          description="Awaiting validation"
        />

        <KPICard
          title="Pending Deliveries"
          value="8"
          description="Awaiting dispatch"
        />

        <KPICard
          title="Scheduled Transfers"
          value="6"
          description="Internal movements"
        />

      </div>

      {/* Main Content */}
      <div className="mt-6 grid items-start gap-6 xl:grid-cols-[1fr_340px]">

        {/* Recent Activity */}
        <section className="h-fit overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

          <div className="flex items-center justify-between border-b border-[#DED6C8] px-5 py-4">

            <div>
              <h2 className="text-sm font-bold text-[#292824]">
                Recent Stock Movements
              </h2>

              <p className="mt-1 text-xs text-[#756F64]">
                Latest inventory activity across your warehouses.
              </p>
            </div>

            <button
              onClick={() => onNavigate("Move History")}
              className="text-xs font-semibold text-[#4F7656] transition hover:text-[#275236]"
            >
              View ledger →
            </button>

          </div>

          <div className="divide-y divide-[#E7E1D7]">

            {recentMovements.map((movement) => {
              const style = typeStyles[movement.type];
              const Icon = style.icon;

              return (
                <div
                  key={movement.id}
                  className="flex items-center gap-4 px-5 py-4 transition hover:bg-[#FCF8F1]"
                >

                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${style.bg} ${style.text}`}
                  >
                    <Icon size={17} />
                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="flex flex-wrap items-center gap-2">
                      <p className="text-sm font-semibold text-[#292824]">
                        {movement.product}
                      </p>

                      <span className="rounded-md bg-[#F0EDE5] px-2 py-0.5 text-[10px] font-medium text-[#756F64]">
                        {movement.type}
                      </span>
                    </div>

                    <p className="mt-1 truncate text-xs text-[#918A7E]">
                      {movement.location}
                    </p>

                  </div>

                  <div className="hidden text-right sm:block">

                    <p
                      className={`text-sm font-bold ${movement.quantity.startsWith("+")
                          ? "text-[#4F7656]"
                          : movement.quantity.startsWith("-")
                            ? "text-[#9A5B55]"
                            : "text-[#292824]"
                        }`}
                    >
                      {movement.quantity}
                    </p>

                    <p className="mt-1 text-[10px] text-[#918A7E]">
                      {movement.time}
                    </p>

                  </div>

                </div>
              );
            })}

          </div>
        </section>

        {/* Right Column */}
        <div className="space-y-6">

          {/* Stock Health */}
          <section className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-5">

            <div className="flex items-center gap-3">

              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                <Activity size={17} />
              </div>

              <div>
                <h2 className="text-sm font-bold text-[#292824]">
                  Stock Health
                </h2>

                <p className="text-xs text-[#756F64]">
                  Current inventory condition.
                </p>
              </div>

            </div>

            <div className="mt-5">

              <div className="flex items-end justify-between">
                <p className="text-3xl font-bold text-[#292824]">
                  92%
                </p>

                <span className="text-xs font-semibold text-[#4F7656]">
                  Healthy
                </span>
              </div>

              <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#E7E1D7]">
                <div
                  className="h-full rounded-full bg-[#66805D]"
                  style={{ width: "92%" }}
                />
              </div>

              <div className="mt-4 grid grid-cols-3 gap-2 text-center">

                <div>
                  <p className="text-sm font-bold text-[#292824]">
                    230
                  </p>
                  <p className="text-[10px] text-[#918A7E]">
                    Healthy
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#A66A3F]">
                    14
                  </p>
                  <p className="text-[10px] text-[#918A7E]">
                    Low
                  </p>
                </div>

                <div>
                  <p className="text-sm font-bold text-[#9A5B55]">
                    4
                  </p>
                  <p className="text-[10px] text-[#918A7E]">
                    Out
                  </p>
                </div>

              </div>

            </div>
          </section>

          {/* Quick Actions */}
          <section className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-5">

            <div className="mb-4">
              <h2 className="text-sm font-bold text-[#292824]">
                Quick Actions
              </h2>

              <p className="mt-1 text-xs text-[#756F64]">
                Start a common inventory operation.
              </p>
            </div>

            <div className="grid gap-2">

              <button
                onClick={() => onNavigate("Receipts")}
                className="flex items-center gap-3 rounded-lg border border-[#E7E1D7] bg-[#FCF8F1] px-3 py-3 text-left transition hover:border-[#C9C0B2] hover:bg-[#F0E9DD]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E7F0E7] text-[#4F7656]">
                  <ArrowDownToLine size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#292824]">
                    New Receipt
                  </p>
                  <p className="text-[10px] text-[#918A7E]">
                    Add incoming stock
                  </p>
                </div>
              </button>

              <button
                onClick={() => onNavigate("Deliveries")}
                className="flex items-center gap-3 rounded-lg border border-[#E7E1D7] bg-[#FCF8F1] px-3 py-3 text-left transition hover:border-[#C9C0B2] hover:bg-[#F0E9DD]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#F5E8D8] text-[#A66A3F]">
                  <ArrowUpFromLine size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#292824]">
                    New Delivery
                  </p>
                  <p className="text-[10px] text-[#918A7E]">
                    Dispatch inventory
                  </p>
                </div>
              </button>

              <button
                onClick={() => onNavigate("Transfers")}
                className="flex items-center gap-3 rounded-lg border border-[#E7E1D7] bg-[#FCF8F1] px-3 py-3 text-left transition hover:border-[#C9C0B2] hover:bg-[#F0E9DD]"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                  <ArrowLeftRight size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#292824]">
                    Internal Transfer
                  </p>
                  <p className="text-[10px] text-[#918A7E]">
                    Move stock between locations
                  </p>
                </div>
              </button>

            </div>
          </section>

        </div>
      </div>

      {/* Bottom Summary */}
      <div className="mt-6 grid gap-4 sm:grid-cols-3">

        <div className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
              <Package size={17} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                Main Warehouse
              </p>

              <p className="text-sm font-bold text-[#292824]">
                148 products
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#F5E8D8] text-[#A66A3F]">
              <Clock3 size={17} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                Pending Operations
              </p>

              <p className="text-sm font-bold text-[#292824]">
                26 documents
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-4">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E7F0E7] text-[#4F7656]">
              <Activity size={17} />
            </div>

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                Last Sync
              </p>

              <p className="text-sm font-bold text-[#292824]">
                Just now
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}

function App() {
  const [activePage, setActivePage] = useState("Dashboard");
  const [authPage, setAuthPage] = useState("login");
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  /*
   * =========================
   * AUTHENTICATION
   * =========================
   */

  if (!isLoggedIn) {
    if (authPage === "forgot") {
      return (
        <ForgotPassword
          onBackToLogin={() => setAuthPage("login")}
        />
      );
    }
    // Register Page
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

    // Login Page
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
          alert(
            "Password reset will be connected to OTP backend."
          );
        }}
      />
    );
  }

  /*
   * =========================
   * PAGE ROUTING
   * =========================
   */

  const renderPage = () => {
    // Dashboard
    if (activePage === "Dashboard") {
      return <Dashboard onNavigate={setActivePage} />;
    }

    // Products
    if (activePage === "Products") {
      return <ProductPage />;
    }

    // Operations
    if (
      activePage === "Receipts" ||
      activePage === "Deliveries" ||
      activePage === "Transfers" ||
      activePage === "Adjustments"
    ) {
      return <OperationsPage type={activePage} />;
    }

    // Move History
    if (activePage === "Move History") {
      return <MoveHistoryPage />;
    }

    if (activePage === "Warehouses") {
      return <WarehousePage />;
    }

    if (activePage === "Settings") {
      return <SettingsPage />;
    }

    // Profile
    if (activePage === "Profile") {
      return (
        <ProfilePage
          onLogout={() => {
            setIsLoggedIn(false);
            setAuthPage("login");
          }}
        />
      );
    }

    // Logout
    if (activePage === "Logout") {
      setIsLoggedIn(false);
      setAuthPage("login");
      return null;
    }

    // Placeholder for pages not implemented yet
    return <PlaceholderPage title={activePage} />;
  };

  /*
   * =========================
   * MAIN APPLICATION
   * =========================
   */

  return (
    <div className="min-h-screen bg-[#e6dfd2] text-[#292824]">
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
import { useState } from "react";
import {
    Settings,
    Building2,
    Warehouse,
    Bell,
    ShieldCheck,
    Save,
    Check,
} from "lucide-react";

function SettingsPage() {
    const [settings, setSettings] = useState({
        companyName: "StockSense Industries",
        defaultWarehouse: "Main Warehouse",
        lowStockThreshold: 20,
        notifications: true,
    });

    const [saved, setSaved] = useState(false);

    const handleChange = (field, value) => {
        setSettings((prev) => ({
            ...prev,
            [field]: value,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        setSaved(true);

        setTimeout(() => {
            setSaved(false);
        }, 2500);
    };

    return (
        <div className="mx-auto max-w-5xl">

            {/* Header */}
            <div className="mb-7">
                <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#756F64]">
                    System
                </p>

                <div className="flex items-center gap-3">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                        <Settings size={20} />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-[#292824]">
                            Settings
                        </h1>

                        <p className="mt-1 text-sm text-[#756F64]">
                            Configure your inventory workspace and system preferences.
                        </p>
                    </div>
                </div>
            </div>

            <div className="space-y-5">

                {/* Company Settings */}
                <section className="overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                    <div className="flex items-center gap-3 border-b border-[#DED6C8] px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                            <Building2 size={17} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-[#292824]">
                                Company
                            </h2>
                            <p className="text-xs text-[#756F64]">
                                Basic organization information.
                            </p>
                        </div>
                    </div>

                    <div className="grid gap-5 p-5 md:grid-cols-2">

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                Company Name
                            </label>

                            <input
                                value={settings.companyName}
                                onChange={(e) =>
                                    handleChange("companyName", e.target.value)
                                }
                                className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] px-3 py-2.5 text-sm text-[#292824] outline-none transition focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                            />

                            <p className="mt-1.5 text-[11px] text-[#918A7E]">
                                Displayed throughout the inventory system.
                            </p>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                Default Warehouse
                            </label>

                            <div className="relative">
                                <Warehouse
                                    size={16}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#756F64]"
                                />

                                <select
                                    value={settings.defaultWarehouse}
                                    onChange={(e) =>
                                        handleChange(
                                            "defaultWarehouse",
                                            e.target.value
                                        )
                                    }
                                    className="w-full appearance-none rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-2.5 pl-9 pr-3 text-sm text-[#292824] outline-none transition focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                >
                                    <option>Main Warehouse</option>
                                    <option>Production Floor</option>
                                    <option>Rack B</option>
                                </select>
                            </div>

                            <p className="mt-1.5 text-[11px] text-[#918A7E]">
                                Used as the default location for new operations.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Inventory Settings */}
                <section className="overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                    <div className="flex items-center gap-3 border-b border-[#DED6C8] px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                            <Warehouse size={17} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-[#292824]">
                                Inventory
                            </h2>
                            <p className="text-xs text-[#756F64]">
                                Define inventory monitoring behavior.
                            </p>
                        </div>
                    </div>

                    <div className="p-5">

                        <div className="max-w-md">
                            <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                Low Stock Threshold
                            </label>

                            <div className="flex items-center gap-3">
                                <input
                                    type="number"
                                    min="0"
                                    value={settings.lowStockThreshold}
                                    onChange={(e) =>
                                        handleChange(
                                            "lowStockThreshold",
                                            e.target.value
                                        )
                                    }
                                    className="w-32 rounded-lg border border-[#DED6C8] bg-[#FCF8F1] px-3 py-2.5 text-sm text-[#292824] outline-none transition focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                />

                                <span className="text-sm text-[#756F64]">
                                    units
                                </span>
                            </div>

                            <p className="mt-1.5 text-[11px] text-[#918A7E]">
                                Products at or below this quantity will be marked
                                as low stock.
                            </p>
                        </div>

                    </div>
                </section>

                {/* Notifications */}
                <section className="overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                    <div className="flex items-center gap-3 border-b border-[#DED6C8] px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                            <Bell size={17} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-[#292824]">
                                Notifications
                            </h2>
                            <p className="text-xs text-[#756F64]">
                                Control inventory alerts and system updates.
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between gap-4 p-5">

                        <div>
                            <p className="text-sm font-semibold text-[#292824]">
                                Inventory alerts
                            </p>

                            <p className="mt-1 max-w-xl text-xs leading-5 text-[#756F64]">
                                Receive alerts when products reach the configured
                                low-stock threshold.
                            </p>
                        </div>

                        <button
                            type="button"
                            onClick={() =>
                                handleChange(
                                    "notifications",
                                    !settings.notifications
                                )
                            }
                            className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                                settings.notifications
                                    ? "bg-[#275236]"
                                    : "bg-[#C9C2B7]"
                            }`}
                        >
                            <span
                                className={`absolute top-1 h-4 w-4 rounded-full bg-white shadow-sm transition ${
                                    settings.notifications
                                        ? "left-6"
                                        : "left-1"
                                }`}
                            />
                        </button>

                    </div>
                </section>

                {/* Security */}
                <section className="overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                    <div className="flex items-center gap-3 border-b border-[#DED6C8] px-5 py-4">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E7F0E7] text-[#4F7656]">
                            <ShieldCheck size={17} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-[#292824]">
                                Security
                            </h2>
                            <p className="text-xs text-[#756F64]">
                                Account and access information.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">

                        <div>
                            <p className="text-sm font-semibold text-[#292824]">
                                Authentication
                            </p>

                            <p className="mt-1 text-xs text-[#756F64]">
                                JWT-based authentication and role-based access
                                control will be handled by the backend.
                            </p>
                        </div>

                        <span className="inline-flex w-fit items-center gap-1.5 rounded-full bg-[#F0EDE5] px-3 py-1.5 text-[11px] font-semibold text-[#756F64]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#8B857A]" />
                            Backend integration pending
                        </span>

                    </div>
                </section>

                {/* Save */}
                <div className="flex items-center justify-end gap-3 border-t border-[#DED6C8] pt-5">

                    {saved && (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-[#4F7656]">
                            <Check size={15} />
                            Settings saved
                        </span>
                    )}

                    <button
                        onClick={handleSave}
                        className="inline-flex items-center gap-2 rounded-lg bg-[#1F442D] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173722]"
                    >
                        <Save size={16} />
                        Save Changes
                    </button>

                </div>

            </div>
        </div>
    );
}

export default SettingsPage;
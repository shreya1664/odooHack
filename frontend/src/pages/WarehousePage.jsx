import { useState } from "react";
import {
    Warehouse,
    Plus,
    MapPin,
    Package,
    Boxes,
    MoreHorizontal,
    X,
} from "lucide-react";

function WarehousePage() {
    const [showForm, setShowForm] = useState(false);

    const [warehouses, setWarehouses] = useState([
        {
            id: 1,
            name: "Main Warehouse",
            code: "WH-MAIN",
            location: "Building A",
            products: 248,
            capacity: "78%",
            status: "Operational",
        },
        {
            id: 2,
            name: "Production Floor",
            code: "WH-PROD",
            location: "Building B",
            products: 126,
            capacity: "64%",
            status: "Operational",
        },
        {
            id: 3,
            name: "Rack B",
            code: "WH-RACK-B",
            location: "Building A · Rack B",
            products: 84,
            capacity: "41%",
            status: "Operational",
        },
    ]);

    const [form, setForm] = useState({
        name: "",
        code: "",
        location: "",
    });

    const handleChange = (e) => {
        setForm({
            ...form,
            [e.target.name]: e.target.value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!form.name || !form.code || !form.location) return;

        setWarehouses([
            ...warehouses,
            {
                id: Date.now(),
                name: form.name,
                code: form.code.toUpperCase(),
                location: form.location,
                products: 0,
                capacity: "0%",
                status: "Operational",
            },
        ]);

        setForm({
            name: "",
            code: "",
            location: "",
        });

        setShowForm(false);
    };

    return (
        <div className="mx-auto max-w-7xl">

            {/* Header */}
            <div className="mb-7 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <p className="mb-1 text-xs font-semibold uppercase tracking-[0.16em] text-[#756F64]">
                        System
                    </p>

                    <h1 className="text-2xl font-bold tracking-tight text-[#292824]">
                        Warehouses
                    </h1>

                    <p className="mt-1 text-sm text-[#756F64]">
                        Manage storage locations and inventory capacity.
                    </p>
                </div>

                <button
                    onClick={() => setShowForm(true)}
                    className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#1F442D] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173722]"
                >
                    <Plus size={17} />
                    Add Warehouse
                </button>
            </div>

            {/* Overview */}
            <div className="mb-6 grid gap-4 sm:grid-cols-3">

                <div className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#756F64]">
                            Total Warehouses
                        </p>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                            <Warehouse size={18} />
                        </div>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#292824]">
                        {warehouses.length}
                    </p>

                    <p className="mt-1 text-xs text-[#756F64]">
                        Active storage locations
                    </p>
                </div>

                <div className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#756F64]">
                            Products Stored
                        </p>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                            <Boxes size={18} />
                        </div>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#292824]">
                        {warehouses.reduce((sum, w) => sum + w.products, 0)}
                    </p>

                    <p className="mt-1 text-xs text-[#756F64]">
                        Across all locations
                    </p>
                </div>

                <div className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-5">
                    <div className="flex items-center justify-between">
                        <p className="text-sm font-medium text-[#756F64]">
                            Operational
                        </p>
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E7F0E7] text-[#4F7656]">
                            <Package size={18} />
                        </div>
                    </div>

                    <p className="mt-3 text-2xl font-bold text-[#292824]">
                        {warehouses.filter((w) => w.status === "Operational").length}
                    </p>

                    <p className="mt-1 text-xs text-[#756F64]">
                        All systems running normally
                    </p>
                </div>
            </div>

            {/* Warehouse List */}
            <div className="overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                <div className="border-b border-[#DED6C8] px-5 py-4">
                    <h2 className="text-sm font-bold text-[#292824]">
                        Storage Locations
                    </h2>

                    <p className="mt-1 text-xs text-[#756F64]">
                        Current warehouse configuration and capacity.
                    </p>
                </div>

                <div className="divide-y divide-[#DED6C8]">
                    {warehouses.map((warehouse) => (
                        <div
                            key={warehouse.id}
                            className="flex flex-col gap-4 px-5 py-5 transition hover:bg-[#FCF8F1] lg:flex-row lg:items-center lg:justify-between"
                        >

                            {/* Name */}
                            <div className="flex items-start gap-4">
                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                                    <Warehouse size={20} />
                                </div>

                                <div>
                                    <div className="flex flex-wrap items-center gap-2">
                                        <h3 className="text-sm font-bold text-[#292824]">
                                            {warehouse.name}
                                        </h3>

                                        <span className="rounded-md bg-[#F0EDE5] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[#756F64]">
                                            {warehouse.code}
                                        </span>
                                    </div>

                                    <div className="mt-1 flex items-center gap-1.5 text-xs text-[#756F64]">
                                        <MapPin size={13} />
                                        {warehouse.location}
                                    </div>
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 lg:min-w-[430px]">

                                <div>
                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                                        Products
                                    </p>
                                    <p className="mt-1 text-sm font-bold text-[#292824]">
                                        {warehouse.products}
                                    </p>
                                </div>

                                <div>
                                    <div className="flex items-center justify-between">
                                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                                            Capacity
                                        </p>
                                        <span className="text-xs font-semibold text-[#756F64]">
                                            {warehouse.capacity}
                                        </span>
                                    </div>

                                    <div className="mt-2 h-1.5 w-28 overflow-hidden rounded-full bg-[#E7E1D7]">
                                        <div
                                            className="h-full rounded-full bg-[#66805D]"
                                            style={{
                                                width: warehouse.capacity,
                                            }}
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center gap-3">
                                    <span className="inline-flex items-center gap-1.5 rounded-full bg-[#E7F0E7] px-2.5 py-1 text-[11px] font-semibold text-[#4F7656]">
                                        <span className="h-1.5 w-1.5 rounded-full bg-[#668C6A]" />
                                        {warehouse.status}
                                    </span>

                                    <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[#756F64] transition hover:bg-[#F0E9DD] hover:text-[#292824]">
                                        <MoreHorizontal size={17} />
                                    </button>
                                </div>

                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Add Warehouse Modal */}
            {showForm && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-[#292824]/35 p-4 backdrop-blur-sm">

                    <div className="w-full max-w-md rounded-2xl border border-[#DED6C8] bg-[#FFFDF8] shadow-xl">

                        <div className="flex items-start justify-between border-b border-[#DED6C8] px-6 py-5">
                            <div>
                                <h2 className="text-lg font-bold text-[#292824]">
                                    Add Warehouse
                                </h2>
                                <p className="mt-1 text-xs text-[#756F64]">
                                    Create a new inventory storage location.
                                </p>
                            </div>

                            <button
                                onClick={() => setShowForm(false)}
                                className="flex h-8 w-8 items-center justify-center rounded-lg text-[#756F64] hover:bg-[#F0E9DD]"
                            >
                                <X size={18} />
                            </button>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4 p-6">

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                    Warehouse Name
                                </label>
                                <input
                                    name="name"
                                    value={form.name}
                                    onChange={handleChange}
                                    placeholder="e.g. Finished Goods"
                                    className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] px-3 py-2.5 text-sm outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                    Warehouse Code
                                </label>
                                <input
                                    name="code"
                                    value={form.code}
                                    onChange={handleChange}
                                    placeholder="e.g. WH-FG"
                                    className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] px-3 py-2.5 text-sm uppercase outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                />
                            </div>

                            <div>
                                <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                    Location
                                </label>
                                <input
                                    name="location"
                                    value={form.location}
                                    onChange={handleChange}
                                    placeholder="e.g. Building C"
                                    className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] px-3 py-2.5 text-sm outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                />
                            </div>

                            <div className="flex justify-end gap-3 border-t border-[#DED6C8] pt-5">
                                <button
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="rounded-lg border border-[#DED6C8] px-4 py-2.5 text-sm font-medium text-[#756F64] transition hover:bg-[#F0E9DD]"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    className="rounded-lg bg-[#1F442D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#173722]"
                                >
                                    Create Warehouse
                                </button>
                            </div>

                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}

export default WarehousePage;
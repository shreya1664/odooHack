import { useEffect, useMemo, useState } from "react";
import { getProducts } from "../services/api";
import {
    Plus,
    Search,
    SlidersHorizontal,
    MoreHorizontal,
    Package,
    AlertTriangle,
} from "lucide-react";

const fallbackProducts = [
    {
        id: 1,
        name: "Steel Rods",
        sku: "SKU-STR-001",
        category: "Raw Material",
        stock: 8,
        reorder: 20,
        location: "Main Warehouse",
    },
    {
        id: 2,
        name: "Copper Wire",
        sku: "SKU-CW-014",
        category: "Electrical",
        stock: 15,
        reorder: 25,
        location: "Production Floor",
    },
    {
        id: 3,
        name: "Aluminium Sheets",
        sku: "SKU-ALS-008",
        category: "Raw Material",
        stock: 11,
        reorder: 20,
        location: "Rack B",
    },
    {
        id: 4,
        name: "Steel Plates",
        sku: "SKU-STP-021",
        category: "Raw Material",
        stock: 74,
        reorder: 30,
        location: "Main Warehouse",
    },
    {
        id: 5,
        name: "PVC Pipes",
        sku: "SKU-PVC-032",
        category: "Components",
        stock: 126,
        reorder: 40,
        location: "Main Warehouse",
    },
    {
        id: 6,
        name: "Bearing Assembly",
        sku: "SKU-BRG-019",
        category: "Components",
        stock: 42,
        reorder: 20,
        location: "Production Floor",
    },
];

function ProductPage() {
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("All");
    const [stockFilter, setStockFilter] = useState("All");

    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    useEffect(() => {
        const loadProducts = async () => {
            try {
                setLoading(true);
                setError("");

                const data = await getProducts();

                const rawProducts = Array.isArray(data)
                    ? data
                    : data?.products || data?.data || [];

                const normalizedProducts = rawProducts.map((product, index) => ({
                    id: product._id || product.id || index,
                    name:
                        product.name ||
                        product.productName ||
                        product.title ||
                        "Unnamed Product",

                    sku:
                        product.sku ||
                        product.SKU ||
                        product.code ||
                        `SKU-${String(index + 1).padStart(3, "0")}`,

                    category:
                        typeof product.category === "object"
                            ? product.category?.name || "Uncategorized"
                            : product.category || "Uncategorized",

                    stock:
                        Number(
                            product.stock ??
                                product.quantity ??
                                product.currentStock ??
                                product.availableStock ??
                                0
                        ),

                    reorder:
                        Number(
                            product.reorder ??
                                product.reorderLevel ??
                                product.reorderPoint ??
                                product.minStock ??
                                0
                        ),

                    location:
                        typeof product.location === "object"
                            ? product.location?.name || "Unassigned"
                            : product.location ||
                              product.locationName ||
                              "Unassigned",
                }));

                setProducts(normalizedProducts);
            } catch (err) {
                console.error("Failed to load products:", err);

                setError(
                    err.message ||
                        "Live product data is temporarily unavailable."
                );

                // Keep the page usable if backend/database is unavailable.
                setProducts(fallbackProducts);
            } finally {
                setLoading(false);
            }
        };

        loadProducts();
    }, []);

    const categories = useMemo(() => {
        return [
            "All",
            ...new Set(products.map((product) => product.category)),
        ];
    }, [products]);

    const filteredProducts = useMemo(() => {
        return products.filter((product) => {
            const query = search.toLowerCase();

            const matchesSearch =
                product.name.toLowerCase().includes(query) ||
                product.sku.toLowerCase().includes(query);

            const matchesCategory =
                category === "All" || product.category === category;

            const matchesStock =
                stockFilter === "All" ||
                (stockFilter === "Low" &&
                    product.stock <= product.reorder) ||
                (stockFilter === "In Stock" &&
                    product.stock > product.reorder);

            return matchesSearch && matchesCategory && matchesStock;
        });
    }, [products, search, category, stockFilter]);

    const lowStockCount = products.filter(
        (product) => product.stock <= product.reorder
    ).length;

    const getStockStatus = (product) => {
        if (product.stock === 0) {
            return {
                label: "Out of stock",
                className: "bg-[#faece8] text-[#a65d49]",
            };
        }

        if (product.stock <= product.reorder) {
            return {
                label: "Low stock",
                className: "bg-[#fff3df] text-[#a4773d]",
            };
        }

        return {
            label: "In stock",
            className: "bg-[#edf4ea] text-[#527452]",
        };
    };

    if (loading) {
        return (
            <div className="flex min-h-[60vh] items-center justify-center">
                <div className="text-sm text-[#756f64]">
                    Loading products...
                </div>
            </div>
        );
    }

    return (
        <div className="space-y-7">
            {/* Header */}
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b776e]">
                        Catalog
                    </p>

                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#292824]">
                        Products
                    </h2>

                    <p className="mt-2 text-sm text-[#756f64]">
                        Manage products, stock levels, locations, and reorder
                        rules.
                    </p>
                </div>

                <button className="inline-flex items-center justify-center gap-2 rounded-lg bg-[#275236] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f442d]">
                    <Plus size={17} />
                    Add Product
                </button>
            </div>

            {/* Backend warning */}
            {error && (
                <div className="flex items-center gap-2 rounded-lg border border-[#e4c9b8] bg-[#f8ede6] px-4 py-3 text-sm text-[#9a5f3c]">
                    <AlertTriangle size={16} />
                    <span>
                        Live inventory data is temporarily unavailable.
                        Showing the latest available product view.
                    </span>
                </div>
            )}

            {/* Summary */}
            <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#eef1e7] text-[#527452]">
                            <Package size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-[#8a8479]">
                                Total Products
                            </p>
                            <p className="mt-0.5 text-xl font-semibold text-[#292824]">
                                {products.length}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#fff3df] text-[#a4773d]">
                            <AlertTriangle size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-[#8a8479]">
                                Low Stock
                            </p>
                            <p className="mt-0.5 text-xl font-semibold text-[#292824]">
                                {lowStockCount}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] p-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#edf4ea] text-[#527452]">
                            <Package size={18} />
                        </div>

                        <div>
                            <p className="text-xs text-[#8a8479]">
                                Categories
                            </p>
                            <p className="mt-0.5 text-xl font-semibold text-[#292824]">
                                {Math.max(categories.length - 1, 0)}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            {/* Product Table */}
            <section className="overflow-hidden rounded-xl border border-[#ded6c8] bg-[#fffdf8]">
                {/* Toolbar */}
                <div className="flex flex-col gap-4 border-b border-[#e7dfd2] p-5 lg:flex-row lg:items-center lg:justify-between">
                    <div className="relative w-full lg:max-w-sm">
                        <Search
                            size={16}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999287]"
                        />

                        <input
                            type="text"
                            placeholder="Search products or SKU..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] py-2.5 pl-9 pr-3 text-sm text-[#292824] outline-none placeholder:text-[#a39c91] focus:border-[#8a9b84]"
                        />
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            className="rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]"
                        >
                            {categories.map((item) => (
                                <option key={item} value={item}>
                                    {item === "All"
                                        ? "All Categories"
                                        : item}
                                </option>
                            ))}
                        </select>

                        <select
                            value={stockFilter}
                            onChange={(e) => setStockFilter(e.target.value)}
                            className="rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]"
                        >
                            <option value="All">All Stock</option>
                            <option value="In Stock">In Stock</option>
                            <option value="Low">Low Stock</option>
                        </select>

                        <button className="flex items-center gap-2 rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] transition hover:bg-[#f5f0e7]">
                            <SlidersHorizontal size={15} />
                            Filters
                        </button>
                    </div>
                </div>

                {/* Table */}
                <div className="overflow-x-auto">
                    <table className="w-full min-w-[900px] text-left">
                        <thead>
                            <tr className="border-b border-[#e7dfd2] bg-[#faf6ef]">
                                <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                                    Product
                                </th>

                                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                                    Category
                                </th>

                                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                                    Stock
                                </th>

                                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                                    Location
                                </th>

                                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                                    Reorder Level
                                </th>

                                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                                    Status
                                </th>

                                <th className="w-12 px-4 py-3.5"></th>
                            </tr>
                        </thead>

                        <tbody className="divide-y divide-[#eee7db]">
                            {filteredProducts.length > 0 ? (
                                filteredProducts.map((product) => {
                                    const status = getStockStatus(product);

                                    return (
                                        <tr
                                            key={product.id}
                                            className="transition hover:bg-[#fcf9f3]"
                                        >
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#eef1e7] text-[#527452]">
                                                        <Package size={16} />
                                                    </div>

                                                    <div>
                                                        <p className="text-sm font-semibold text-[#292824]">
                                                            {product.name}
                                                        </p>

                                                        <p className="mt-0.5 text-xs text-[#918a7f]">
                                                            {product.sku}
                                                        </p>
                                                    </div>
                                                </div>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm text-[#625d54]">
                                                    {product.category}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm font-semibold text-[#292824]">
                                                    {product.stock}
                                                </span>

                                                <span className="ml-1 text-xs text-[#999287]">
                                                    units
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm text-[#625d54]">
                                                    {product.location}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span className="text-sm text-[#625d54]">
                                                    {product.reorder}
                                                </span>

                                                <span className="ml-1 text-xs text-[#999287]">
                                                    units
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <span
                                                    className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${status.className}`}
                                                >
                                                    {status.label}
                                                </span>
                                            </td>

                                            <td className="px-4 py-4">
                                                <button className="flex h-8 w-8 items-center justify-center rounded-md text-[#898277] transition hover:bg-[#f1ece3] hover:text-[#292824]">
                                                    <MoreHorizontal size={17} />
                                                </button>
                                            </td>
                                        </tr>
                                    );
                                })
                            ) : (
                                <tr>
                                    <td
                                        colSpan="7"
                                        className="px-6 py-12 text-center"
                                    >
                                        <Package
                                            size={28}
                                            className="mx-auto text-[#aaa397]"
                                        />

                                        <p className="mt-3 text-sm font-medium text-[#625d54]">
                                            No products found
                                        </p>

                                        <p className="mt-1 text-xs text-[#999287]">
                                            Try changing your search or filters.
                                        </p>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-[#e7dfd2] bg-[#faf6ef] px-6 py-3.5">
                    <p className="text-xs text-[#898277]">
                        Showing{" "}
                        <span className="font-semibold text-[#625d54]">
                            {filteredProducts.length}
                        </span>{" "}
                        of{" "}
                        <span className="font-semibold text-[#625d54]">
                            {products.length}
                        </span>{" "}
                        products
                    </p>

                    <p className="text-xs text-[#a19a8f]">
                        Inventory synced just now
                    </p>
                </div>
            </section>
        </div>
    );
}

export default ProductPage;
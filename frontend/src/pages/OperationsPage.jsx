import { useEffect, useState } from "react";
import {
    ArrowDownToLine,
    ArrowUpFromLine,
    ArrowLeftRight,
    SlidersHorizontal,
    CheckCircle2,
    Package,
    MapPin,
    User,
    Hash,
    Clock3,
    AlertTriangle,
} from "lucide-react";

import {
    createReceipt,
    getReceipts,
    validateReceipt,
    createDelivery,
    getDeliveries,
    validateDelivery,
    getProducts,
    getLocations,
} from "../services/api";

const configs = {
    Receipts: {
        title: "Receipts",
        subtitle: "Record incoming goods and update warehouse stock.",
        icon: ArrowDownToLine,
        color: "green",
    },
    Deliveries: {
        title: "Deliveries",
        subtitle: "Manage outgoing goods and customer shipments.",
        icon: ArrowUpFromLine,
        color: "blue",
    },
    Transfers: {
        title: "Internal Transfers",
        subtitle: "Move inventory between internal locations.",
        icon: ArrowLeftRight,
        color: "purple",
    },
    Adjustments: {
        title: "Inventory Adjustments",
        subtitle: "Reconcile recorded stock with physical counts.",
        icon: SlidersHorizontal,
        color: "orange",
    },
};

function OperationsPage({ type = "Receipts" }) {
    const config = configs[type] || configs.Receipts;
    const Icon = config.icon;

    const [records, setRecords] = useState([]);
    const [products, setProducts] = useState([]);
    const [locations, setLocations] = useState([]);

    const isReceipt = type === "Receipts";
    const isDelivery = type === "Deliveries";

    const [loading, setLoading] = useState(isReceipt || isDelivery);
    const [submitting, setSubmitting] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");

    const [form, setForm] = useState({
        number: "",
        party: "",
        product: "",
        location: "",
        quantity: "",
    });

    /*
     * =========================
     * LOAD RECEIPTS + FORM DATA
     * =========================
     */

    useEffect(() => {
        if (!isReceipt && !isDelivery) {
            setLoading(false);
            return;
        }
        loadData();
    }, [type]);

    const loadData = async () => {
        try {
            setLoading(true);
            setError("");

            const [recordData, productData, locationData] =
                await Promise.all([
                    isReceipt ? getReceipts() : getDeliveries(),
                    getProducts(),
                    getLocations(),
                ]);

            setRecords(
                Array.isArray(recordData)
                    ? recordData
                    : recordData?.receipts ||
                      recordData?.deliveries ||
                      recordData?.data ||
                      []
            );

            setProducts(
                Array.isArray(productData)
                    ? productData
                    : productData?.products || productData?.data || []
            );

            setLocations(
                Array.isArray(locationData)
                    ? locationData
                    : locationData?.locations || locationData?.data || []
            );
        } catch (err) {
            console.error("Failed to load operation data:", err);
            setError(err.message || "Failed to load data.");
        } finally {
            setLoading(false);
        }
    };

    /*
     * =========================
     * FORM HANDLING
     * =========================
     */

    const handleChange = (e) => {
        const { name, value } = e.target;

        setForm((previous) => ({
            ...previous,
            [name]: value,
        }));

        setError("");
        setSuccess("");
    };

    const handleCreate = async (e) => {
        e.preventDefault();

        if (
            !form.number ||
            !form.party ||
            !form.product ||
            !form.location ||
            !form.quantity
        ) {
            setError(`Please fill in all ${isReceipt ? "receipt" : "delivery"} fields.`);
            return;
        }

        if (Number(form.quantity) <= 0) {
            setError("Quantity must be greater than 0.");
            return;
        }

        try {
            setSubmitting(true);
            setError("");
            setSuccess("");

            if (isReceipt) {
                await createReceipt({
                    receiptNumber: form.number,
                    supplier: form.party,
                    product: form.product,
                    location: form.location,
                    quantity: Number(form.quantity),
                });

                setSuccess(
                    "Receipt created successfully. It is now waiting for validation."
                );
            } else {
                await createDelivery({
                    deliveryNumber: form.number,
                    customer: form.party,
                    product: form.product,
                    location: form.location,
                    quantity: Number(form.quantity),
                });

                setSuccess(
                    "Delivery created successfully. Validate it to reduce stock."
                );
            }

            setForm({
                number: "",
                party: "",
                product: "",
                location: "",
                quantity: "",
            });

            await loadData();
        } catch (err) {
            console.error("Create failed:", err);
            setError(
                err.message ||
                    `Failed to create ${isReceipt ? "receipt" : "delivery"}.`
            );
        } finally {
            setSubmitting(false);
        }
    };

    const handleValidate = async (id) => {
        try {
            setError("");
            setSuccess("");

            if (isReceipt) {
                await validateReceipt(id);
                setSuccess(
                    "Receipt validated. Stock has been updated and the movement has been logged."
                );
            } else {
                await validateDelivery(id);
                setSuccess(
                    "Delivery validated. Stock has been reduced and the movement has been logged."
                );
            }

            await loadData();
        } catch (err) {
            console.error("Validation failed:", err);
            setError(err.message || "Validation failed.");
        }
    };

    /*
     * =========================
     * NON-RECEIPT OPERATIONS
     * =========================
     */

    if (!isReceipt && !isDelivery) {
        return (
            <div className="space-y-7">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b776e]">
                        Operations
                    </p>

                    <div className="mt-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#e9e8d0] text-[#275236]">
                            <Icon size={19} />
                        </div>

                        <h2 className="text-3xl font-semibold tracking-tight text-[#292824]">
                            {config.title}
                        </h2>
                    </div>

                    <p className="mt-2 text-sm text-[#756f64]">
                        {config.subtitle}
                    </p>
                </div>

                <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] p-8">
                    <div className="mx-auto max-w-lg text-center">
                        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-xl bg-[#e9e8d0] text-[#275236]">
                            <Icon size={25} />
                        </div>

                        <h3 className="mt-5 text-lg font-semibold text-[#292824]">
                            {config.title} backend integration
                        </h3>

                        <p className="mt-2 text-sm leading-6 text-[#756f64]">
                            The frontend workflow is ready. This operation
                            will be connected once its backend request and
                            validation contract is wired.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    const noun = isReceipt ? "Receipt" : "Delivery";
    const partyLabel = isReceipt ? "Supplier" : "Customer";
    const numberPlaceholder = isReceipt ? "REC-001" : "DEL-001";

    return (
        <div className="space-y-7">
            <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
                <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b776e]">
                        Operations
                    </p>
                    <h2 className="mt-2 text-3xl font-semibold tracking-tight text-[#292824]">
                        {config.title}
                    </h2>
                    <p className="mt-2 text-sm text-[#756f64]">{config.subtitle}</p>
                </div>

                <div className="flex items-center gap-2 rounded-lg border border-[#ded6c8] bg-[#fffdf8] px-3 py-2 text-xs text-[#756f64]">
                    <Clock3 size={14} />
                    Draft → Validate → Stock Updated
                </div>
            </div>

            {error && (
                <div className="flex items-center gap-2 rounded-lg border border-[#e4c9b8] bg-[#f8ede6] px-4 py-3 text-sm text-[#9a5f3c]">
                    <AlertTriangle size={16} />
                    {error}
                </div>
            )}

            {success && (
                <div className="flex items-center gap-2 rounded-lg border border-[#cdddc9] bg-[#edf5ed] px-4 py-3 text-sm text-[#527452]">
                    <CheckCircle2 size={16} />
                    {success}
                </div>
            )}

            <section className="rounded-xl border border-[#ded6c8] bg-[#fffdf8]">
                <div className="border-b border-[#e7dfd2] px-6 py-5">
                    <div className="flex items-center gap-3">
                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#e9e8d0] text-[#275236]">
                            <Icon size={18} />
                        </div>
                        <div>
                            <h3 className="text-base font-semibold text-[#292824]">
                                Create {noun}
                            </h3>
                            <p className="mt-1 text-xs text-[#918a7e]">
                                {isReceipt
                                    ? "Add incoming stock from a supplier."
                                    : "Record outgoing stock for a customer."}
                            </p>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleCreate} className="grid gap-5 p-6 md:grid-cols-2">
                    <div>
                        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#625d54]">
                            <Hash size={14} /> {noun} Number
                        </label>
                        <input
                            name="number"
                            value={form.number}
                            onChange={handleChange}
                            placeholder={numberPlaceholder}
                            className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#aaa397] focus:border-[#8a9b84]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#625d54]">
                            <User size={14} /> {partyLabel}
                        </label>
                        <input
                            name="party"
                            value={form.party}
                            onChange={handleChange}
                            placeholder={`${partyLabel} name`}
                            className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#aaa397] focus:border-[#8a9b84]"
                        />
                    </div>

                    <div>
                        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#625d54]">
                            <Package size={14} /> Product
                        </label>
                        <select
                            name="product"
                            value={form.product}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]"
                        >
                            <option value="">Select product</option>
                            {products.map((product) => (
                                <option key={product._id || product.id} value={product._id || product.id}>
                                    {product.name} {product.sku ? `— ${product.sku}` : ""}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 flex items-center gap-2 text-xs font-semibold text-[#625d54]">
                            <MapPin size={14} /> Location
                        </label>
                        <select
                            name="location"
                            value={form.location}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]"
                        >
                            <option value="">Select location</option>
                            {locations.map((location) => (
                                <option key={location._id || location.id} value={location._id || location.id}>
                                    {location.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-xs font-semibold text-[#625d54]">
                            Quantity
                        </label>
                        <input
                            name="quantity"
                            type="number"
                            min="1"
                            value={form.quantity}
                            onChange={handleChange}
                            placeholder="100"
                            className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm outline-none placeholder:text-[#aaa397] focus:border-[#8a9b84]"
                        />
                    </div>

                    <div className="flex items-end justify-end">
                        <button
                            type="submit"
                            disabled={submitting}
                            className="inline-flex items-center gap-2 rounded-lg bg-[#275236] px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1f442d] disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            + {submitting ? "Creating..." : `Create ${noun}`}
                        </button>
                    </div>
                </form>
            </section>

            <section className="overflow-hidden rounded-xl border border-[#ded6c8] bg-[#fffdf8]">
                <div className="flex items-center justify-between border-b border-[#e7dfd2] px-6 py-5">
                    <div>
                        <h3 className="text-base font-semibold text-[#292824]">
                            Recent {config.title}
                        </h3>
                        <p className="mt-1 text-xs text-[#918a7e]">
                            Draft records can be validated to update stock.
                        </p>
                    </div>
                    <span className="rounded-full bg-[#eef1e7] px-2.5 py-1 text-[10px] font-semibold text-[#527452]">
                        {records.length} records
                    </span>
                </div>

                {loading ? (
                    <div className="px-6 py-12 text-center text-sm text-[#756f64]">
                        Loading {config.title.toLowerCase()}...
                    </div>
                ) : records.length === 0 ? (
                    <div className="px-6 py-12 text-center">
                        <Package size={28} className="mx-auto text-[#aaa397]" />
                        <p className="mt-3 text-sm font-medium text-[#625d54]">
                            No {config.title.toLowerCase()} found
                        </p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[850px] text-left">
                            <thead>
                                <tr className="border-b border-[#e7dfd2] bg-[#faf6ef]">
                                    {["Document", "Product", partyLabel, "Location", "Quantity", "Status", "Action"].map((h) => (
                                        <th key={h} className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                                            {h}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-[#eee7db]">
                                {records.map((record) => {
                                    const isDraft = record.status === "draft";
                                    const number = isReceipt ? record.receiptNumber : record.deliveryNumber;
                                    const party = isReceipt ? record.supplier : record.customer;

                                    return (
                                        <tr key={record._id} className="transition hover:bg-[#fcf9f3]">
                                            <td className="px-4 py-4 text-sm font-semibold text-[#292824]">{number}</td>
                                            <td className="px-4 py-4">
                                                <p className="text-sm font-medium text-[#292824]">{record.product?.name || "Unknown product"}</p>
                                                <p className="mt-0.5 text-xs text-[#918a7e]">{record.product?.sku || "—"}</p>
                                            </td>
                                            <td className="px-4 py-4 text-sm text-[#625d54]">{party}</td>
                                            <td className="px-4 py-4 text-sm text-[#625d54]">{record.location?.name || "—"}</td>
                                            <td className="px-4 py-4 text-sm font-semibold text-[#292824]">{record.quantity}</td>
                                            <td className="px-4 py-4">
                                                <span className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${isDraft ? "bg-[#fff3df] text-[#a4773d]" : "bg-[#edf4ea] text-[#527452]"}`}>
                                                    {record.status}
                                                </span>
                                            </td>
                                            <td className="px-4 py-4">
                                                {isDraft ? (
                                                    <button
                                                        onClick={() => handleValidate(record._id)}
                                                        className="inline-flex items-center gap-1.5 rounded-lg bg-[#275236] px-3 py-2 text-xs font-semibold text-white transition hover:bg-[#1f442d]"
                                                    >
                                                        <CheckCircle2 size={14} /> Validate
                                                    </button>
                                                ) : (
                                                    <span className="text-xs font-medium text-[#527452]">Completed</span>
                                                )}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                )}
            </section>
        </div>
    );

}


export default OperationsPage;
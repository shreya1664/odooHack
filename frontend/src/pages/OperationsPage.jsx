import { useState } from "react";
import {
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  SlidersHorizontal,
  FileText,
  Package,
  MapPin,
  CheckCircle2,
  Clock3,
} from "lucide-react";

function OperationsPage({ type }) {
  const [status, setStatus] = useState("Draft");

  const config = {
    Receipts: {
      icon: ArrowDownToLine,
      eyebrow: "Operations / Inbound",
      title: "Receipts",
      description: "Record incoming inventory and add received quantities to stock.",
      action: "Validate Receipt",
      color: "green",
      reference: "REC-001",
      sourceLabel: "Supplier",
      destinationLabel: "Destination Warehouse",
    },

    Deliveries: {
      icon: ArrowUpFromLine,
      eyebrow: "Operations / Outbound",
      title: "Deliveries",
      description: "Prepare outgoing inventory and validate deliveries against stock.",
      action: "Validate Delivery",
      color: "orange",
      reference: "DEL-001",
      sourceLabel: "Source Warehouse",
      destinationLabel: "Customer",
    },

    Transfers: {
      icon: ArrowLeftRight,
      eyebrow: "Operations / Internal",
      title: "Internal Transfers",
      description: "Move inventory between warehouses and internal locations.",
      action: "Validate Transfer",
      color: "olive",
      reference: "TRF-001",
      sourceLabel: "Source Location",
      destinationLabel: "Destination Location",
    },

    Adjustments: {
      icon: SlidersHorizontal,
      eyebrow: "Operations / Inventory",
      title: "Inventory Adjustments",
      description: "Reconcile recorded stock with the physical inventory count.",
      action: "Apply Adjustment",
      color: "red",
      reference: "ADJ-001",
      sourceLabel: "Current Location",
      destinationLabel: "Adjustment Reason",
    },
  };

  const current = config[type] || config.Receipts;
  const Icon = current.icon;

  const accentClasses = {
    green: {
      icon: "bg-[#edf4ea] text-[#527452]",
      badge: "bg-[#edf4ea] text-[#527452]",
      button: "bg-[#275236] hover:bg-[#1f442d]",
    },

    orange: {
      icon: "bg-[#fff1e9] text-[#a65d49]",
      badge: "bg-[#fff1e9] text-[#a65d49]",
      button: "bg-[#8d6248] hover:bg-[#76503b]",
    },

    olive: {
      icon: "bg-[#f1f0df] text-[#6f753c]",
      badge: "bg-[#f1f0df] text-[#6f753c]",
      button: "bg-[#59632f] hover:bg-[#4c5528]",
    },

    red: {
      icon: "bg-[#faece8] text-[#a65d49]",
      badge: "bg-[#faece8] text-[#a65d49]",
      button: "bg-[#8f4f40] hover:bg-[#783f32]",
    },
  };

  const accent = accentClasses[current.color];

  const handleSubmit = (e) => {
    e.preventDefault();
    setStatus("Validated");
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b776e]">
            {current.eyebrow}
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-lg ${accent.icon}`}
            >
              <Icon size={19} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#292824]">
              {current.title}
            </h2>
          </div>

          <p className="mt-3 text-sm text-[#756f64]">
            {current.description}
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span
            className={`rounded-full px-3 py-1.5 text-xs font-semibold ${accent.badge}`}
          >
            {status}
          </span>

          <span className="text-xs text-[#918a7f]">
            Reference: {current.reference}
          </span>
        </div>
      </div>

      {/* Progress */}
      <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] px-6 py-5">
        <div className="flex items-center">
          <div className="flex items-center gap-2">
            <div className="flex h-7 w-7 items-center justify-center rounded-full bg-[#275236] text-xs font-semibold text-white">
              1
            </div>
            <span className="text-xs font-semibold text-[#292824]">
              Create
            </span>
          </div>

          <div className="mx-3 h-px flex-1 bg-[#ded6c8]" />

          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                status === "Validated"
                  ? "bg-[#275236] text-white"
                  : "bg-[#ebe6dc] text-[#918a7f]"
              }`}
            >
              2
            </div>
            <span className="text-xs font-semibold text-[#625d54]">
              Validate
            </span>
          </div>

          <div className="mx-3 h-px flex-1 bg-[#ded6c8]" />

          <div className="flex items-center gap-2">
            <div
              className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${
                status === "Validated"
                  ? "bg-[#275236] text-white"
                  : "bg-[#ebe6dc] text-[#918a7f]"
              }`}
            >
              3
            </div>
            <span className="text-xs font-semibold text-[#625d54]">
              Stock Updated
            </span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 xl:grid-cols-[1fr_320px]">
        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="rounded-xl border border-[#ded6c8] bg-[#fffdf8]"
        >
          <div className="border-b border-[#e7dfd2] px-6 py-5">
            <div className="flex items-center gap-3">
              <FileText size={18} className="text-[#777267]" />

              <div>
                <h3 className="text-base font-semibold text-[#292824]">
                  Operation Details
                </h3>

                <p className="mt-1 text-xs text-[#918a7f]">
                  Enter the information required to process this operation.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-6 p-6">
            {/* Reference + Product */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#625d54]">
                  Reference
                </label>

                <input
                  value={current.reference}
                  readOnly
                  className="w-full rounded-lg border border-[#ddd5c8] bg-[#f7f3eb] px-3.5 py-2.5 text-sm font-medium text-[#625d54] outline-none"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#625d54]">
                  Product
                </label>

                <select className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3.5 py-2.5 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]">
                  <option>Steel Rods</option>
                  <option>Copper Wire</option>
                  <option>Aluminium Sheets</option>
                  <option>Steel Plates</option>
                </select>
              </div>
            </div>

            {/* Quantity */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-[#625d54]">
                Quantity
              </label>

              <div className="relative">
                <Package
                  size={16}
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999287]"
                />

                <input
                  type="number"
                  min="1"
                  placeholder="Enter quantity"
                  className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] py-2.5 pl-9 pr-16 text-sm text-[#292824] outline-none placeholder:text-[#a39c91] focus:border-[#8a9b84]"
                />

                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#999287]">
                  units
                </span>
              </div>
            </div>

            {/* Locations */}
            <div className="grid gap-5 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs font-semibold text-[#625d54]">
                  {current.sourceLabel}
                </label>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999287]"
                  />

                  <select className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] py-2.5 pl-9 pr-3 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]">
                    <option>Main Warehouse</option>
                    <option>Production Floor</option>
                    <option>Rack B</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-2 block text-xs font-semibold text-[#625d54]">
                  {current.destinationLabel}
                </label>

                <div className="relative">
                  <MapPin
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-[#999287]"
                  />

                  <select className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] py-2.5 pl-9 pr-3 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]">
                    <option>Main Warehouse</option>
                    <option>Production Floor</option>
                    <option>Rack B</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Notes */}
            <div>
              <label className="mb-2 block text-xs font-semibold text-[#625d54]">
                Notes
              </label>

              <textarea
                rows="4"
                placeholder="Add any relevant notes..."
                className="w-full resize-none rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3.5 py-3 text-sm text-[#292824] outline-none placeholder:text-[#a39c91] focus:border-[#8a9b84]"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-col-reverse justify-end gap-3 border-t border-[#e7dfd2] pt-6 sm:flex-row">
              <button
                type="button"
                onClick={() => setStatus("Draft")}
                className="rounded-lg border border-[#d9d1c4] px-5 py-2.5 text-sm font-semibold text-[#625d54] transition hover:bg-[#f6f1e8]"
              >
                Save as Draft
              </button>

              <button
                type="submit"
                className={`rounded-lg px-5 py-2.5 text-sm font-semibold text-white shadow-sm transition ${accent.button}`}
              >
                {current.action}
              </button>
            </div>
          </div>
        </form>

        {/* Side Information */}
        <div className="space-y-6">
          {/* Current Status */}
          <section className="rounded-xl border border-[#ded6c8] bg-[#fffdf8]">
            <div className="border-b border-[#e7dfd2] px-5 py-4">
              <h3 className="text-sm font-semibold text-[#292824]">
                Current Status
              </h3>
            </div>

            <div className="space-y-4 p-5">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#edf4ea] text-[#527452]">
                  <CheckCircle2 size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#625d54]">
                    Stock Available
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#918a7f]">
                    148 units currently recorded
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#f1eee7] text-[#777267]">
                  <Clock3 size={16} />
                </div>

                <div>
                  <p className="text-xs font-semibold text-[#625d54]">
                    Last Movement
                  </p>
                  <p className="mt-0.5 text-[11px] text-[#918a7f]">
                    12 minutes ago
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Stock Impact */}
          <section className="rounded-xl border border-[#ded6c8] bg-[#fffdf8]">
            <div className="border-b border-[#e7dfd2] px-5 py-4">
              <h3 className="text-sm font-semibold text-[#292824]">
                Stock Impact
              </h3>

              <p className="mt-1 text-[11px] text-[#918a7f]">
                What happens after validation
              </p>
            </div>

            <div className="p-5">
              {type === "Receipts" && (
                <div className="rounded-lg bg-[#edf4ea] p-4">
                  <p className="text-xs font-semibold text-[#527452]">
                    Inventory increases
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#668166]">
                    Validating this receipt will add the received quantity to
                    the selected warehouse stock level.
                  </p>
                </div>
              )}

              {type === "Deliveries" && (
                <div className="rounded-lg bg-[#fff1e9] p-4">
                  <p className="text-xs font-semibold text-[#a65d49]">
                    Inventory decreases
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#956b5c]">
                    Validating this delivery will deduct the delivered
                    quantity from the selected source location.
                  </p>
                </div>
              )}

              {type === "Transfers" && (
                <div className="rounded-lg bg-[#f1f0df] p-4">
                  <p className="text-xs font-semibold text-[#6f753c]">
                    Location changes
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#7d8058]">
                    Total company inventory remains unchanged while stock
                    moves between internal locations.
                  </p>
                </div>
              )}

              {type === "Adjustments" && (
                <div className="rounded-lg bg-[#faece8] p-4">
                  <p className="text-xs font-semibold text-[#a65d49]">
                    Inventory reconciled
                  </p>
                  <p className="mt-1 text-[11px] leading-5 text-[#956b5c]">
                    The adjustment updates recorded stock to match the
                    verified physical quantity and creates a ledger entry.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Ledger note */}
          <div className="rounded-xl border border-[#ded6c8] bg-[#f7f2e9] p-5">
            <p className="text-xs font-semibold text-[#625d54]">
              Ledger tracking
            </p>

            <p className="mt-2 text-[11px] leading-5 text-[#8c857a]">
              Once validated, this operation will create an immutable stock
              movement in the inventory ledger.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OperationsPage;
import { useMemo, useState } from "react";
import {
  Search,
  SlidersHorizontal,
  ArrowDownToLine,
  ArrowUpFromLine,
  ArrowLeftRight,
  SlidersHorizontal as AdjustmentIcon,
  ArrowUpRight,
  ArrowDownRight,
  ClipboardList,
} from "lucide-react";

function MoveHistoryPage() {
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [locationFilter, setLocationFilter] = useState("All");

  const movements = [
    {
      id: "MOV-001",
      reference: "REC-001",
      type: "Receipt",
      product: "Steel Rods",
      quantity: 100,
      source: "Supplier",
      destination: "Main Warehouse",
      user: "Inventory Manager",
      date: "Today, 09:42 AM",
    },
    {
      id: "MOV-002",
      reference: "TRF-004",
      type: "Transfer",
      product: "Steel Rods",
      quantity: 100,
      source: "Main Warehouse",
      destination: "Rack B",
      user: "Warehouse Staff",
      date: "Today, 10:18 AM",
    },
    {
      id: "MOV-003",
      reference: "DEL-008",
      type: "Delivery",
      product: "Copper Wire",
      quantity: 20,
      source: "Main Warehouse",
      destination: "Customer",
      user: "Inventory Manager",
      date: "Today, 11:06 AM",
    },
    {
      id: "MOV-004",
      reference: "ADJ-002",
      type: "Adjustment",
      product: "Steel Plates",
      quantity: 3,
      source: "Main Warehouse",
      destination: "Damaged",
      user: "Warehouse Staff",
      date: "Today, 11:34 AM",
    },
    {
      id: "MOV-005",
      reference: "REC-002",
      type: "Receipt",
      product: "Aluminium Sheets",
      quantity: 50,
      source: "Supplier",
      destination: "Rack B",
      user: "Inventory Manager",
      date: "Yesterday, 04:21 PM",
    },
    {
      id: "MOV-006",
      reference: "TRF-005",
      type: "Transfer",
      product: "Copper Wire",
      quantity: 35,
      source: "Main Warehouse",
      destination: "Production Floor",
      user: "Warehouse Staff",
      date: "Yesterday, 02:48 PM",
    },
  ];

  const filteredMovements = useMemo(() => {
    return movements.filter((movement) => {
      const query = search.toLowerCase();

      const matchesSearch =
        movement.id.toLowerCase().includes(query) ||
        movement.reference.toLowerCase().includes(query) ||
        movement.product.toLowerCase().includes(query) ||
        movement.user.toLowerCase().includes(query);

      const matchesType =
        typeFilter === "All" || movement.type === typeFilter;

      const matchesLocation =
        locationFilter === "All" ||
        movement.source === locationFilter ||
        movement.destination === locationFilter;

      return matchesSearch && matchesType && matchesLocation;
    });
  }, [search, typeFilter, locationFilter]);

  const getMovementConfig = (type) => {
    switch (type) {
      case "Receipt":
        return {
          icon: ArrowDownToLine,
          iconClass: "bg-[#edf4ea] text-[#527452]",
          badgeClass: "bg-[#edf4ea] text-[#527452]",
          amountClass: "text-[#527452]",
          prefix: "+",
        };

      case "Delivery":
        return {
          icon: ArrowUpFromLine,
          iconClass: "bg-[#fff1e9] text-[#a65d49]",
          badgeClass: "bg-[#fff1e9] text-[#a65d49]",
          amountClass: "text-[#a65d49]",
          prefix: "-",
        };

      case "Transfer":
        return {
          icon: ArrowLeftRight,
          iconClass: "bg-[#f1f0df] text-[#6f753c]",
          badgeClass: "bg-[#f1f0df] text-[#6f753c]",
          amountClass: "text-[#6f753c]",
          prefix: "",
        };

      default:
        return {
          icon: AdjustmentIcon,
          iconClass: "bg-[#faece8] text-[#a65d49]",
          badgeClass: "bg-[#faece8] text-[#a65d49]",
          amountClass: "text-[#a65d49]",
          prefix: "-",
        };
    }
  };

  return (
    <div className="space-y-7">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 md:flex-row md:items-end">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#7b776e]">
            Audit
          </p>

          <div className="mt-2 flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#eef1e7] text-[#527452]">
              <ClipboardList size={19} />
            </div>

            <h2 className="text-3xl font-semibold tracking-tight text-[#292824]">
              Move History
            </h2>
          </div>

          <p className="mt-3 text-sm text-[#756f64]">
            Track every inventory movement across warehouses and locations.
          </p>
        </div>

        <div className="rounded-lg border border-[#ded6c8] bg-[#fffdf8] px-4 py-2.5">
          <p className="text-[10px] uppercase tracking-[0.12em] text-[#918a7f]">
            Total movements
          </p>

          <p className="mt-0.5 text-lg font-semibold text-[#292824]">
            1,284
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] p-5">
          <p className="text-xs text-[#898277]">Inbound</p>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-semibold text-[#292824]">438</p>

            <div className="flex items-center gap-1 text-xs font-semibold text-[#527452]">
              <ArrowUpRight size={14} />
              Receipts
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] p-5">
          <p className="text-xs text-[#898277]">Outbound</p>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-semibold text-[#292824]">312</p>

            <div className="flex items-center gap-1 text-xs font-semibold text-[#a65d49]">
              <ArrowDownRight size={14} />
              Deliveries
            </div>
          </div>
        </div>

        <div className="rounded-xl border border-[#ded6c8] bg-[#fffdf8] p-5">
          <p className="text-xs text-[#898277]">Internal</p>

          <div className="mt-2 flex items-end justify-between">
            <p className="text-2xl font-semibold text-[#292824]">534</p>

            <div className="flex items-center gap-1 text-xs font-semibold text-[#6f753c]">
              <ArrowLeftRight size={14} />
              Transfers
            </div>
          </div>
        </div>
      </div>

      {/* Ledger */}
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
              placeholder="Search movement, reference, product..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] py-2.5 pl-9 pr-3 text-sm text-[#292824] outline-none placeholder:text-[#a39c91] focus:border-[#8a9b84]"
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]"
            >
              <option value="All">All Types</option>
              <option value="Receipt">Receipts</option>
              <option value="Delivery">Deliveries</option>
              <option value="Transfer">Transfers</option>
              <option value="Adjustment">Adjustments</option>
            </select>

            <select
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] outline-none focus:border-[#8a9b84]"
            >
              <option value="All">All Locations</option>
              <option value="Main Warehouse">Main Warehouse</option>
              <option value="Production Floor">Production Floor</option>
              <option value="Rack B">Rack B</option>
            </select>

            <button className="flex items-center gap-2 rounded-lg border border-[#ddd5c8] bg-[#fcf8f1] px-3 py-2.5 text-sm text-[#625d54] transition hover:bg-[#f5f0e7]">
              <SlidersHorizontal size={15} />
              Filters
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1050px] text-left">
            <thead>
              <tr className="border-b border-[#e7dfd2] bg-[#faf6ef]">
                <th className="px-6 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                  Movement
                </th>

                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                  Type
                </th>

                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                  Product
                </th>

                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                  Movement
                </th>

                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                  User
                </th>

                <th className="px-4 py-3.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[#898277]">
                  Date
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-[#eee7db]">
              {filteredMovements.map((movement) => {
                const config = getMovementConfig(movement.type);
                const Icon = config.icon;

                return (
                  <tr
                    key={movement.id}
                    className="transition hover:bg-[#fcf9f3]"
                  >
                    {/* Movement */}
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.iconClass}`}
                        >
                          <Icon size={16} />
                        </div>

                        <div>
                          <p className="text-sm font-semibold text-[#292824]">
                            {movement.id}
                          </p>

                          <p className="mt-0.5 text-xs text-[#918a7f]">
                            {movement.reference}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Type */}
                    <td className="px-4 py-4">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[10px] font-semibold ${config.badgeClass}`}
                      >
                        {movement.type}
                      </span>
                    </td>

                    {/* Product */}
                    <td className="px-4 py-4">
                      <p className="text-sm font-medium text-[#292824]">
                        {movement.product}
                      </p>
                    </td>

                    {/* Movement */}
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <div>
                          <p className="text-xs text-[#918a7f]">
                            {movement.source}
                          </p>

                          <p className="text-xs text-[#b0a89d]">to</p>

                          <p className="text-xs font-medium text-[#625d54]">
                            {movement.destination}
                          </p>
                        </div>

                        <span
                          className={`ml-2 text-sm font-bold ${config.amountClass}`}
                        >
                          {config.prefix}
                          {movement.quantity}
                        </span>
                      </div>
                    </td>

                    {/* User */}
                    <td className="px-4 py-4">
                      <span className="text-sm text-[#625d54]">
                        {movement.user}
                      </span>
                    </td>

                    {/* Date */}
                    <td className="px-4 py-4">
                      <span className="text-xs text-[#898277]">
                        {movement.date}
                      </span>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Footer */}
        <div className="flex items-center justify-between border-t border-[#e7dfd2] bg-[#faf6ef] px-6 py-3.5">
          <p className="text-xs text-[#898277]">
            Showing{" "}
            <span className="font-semibold text-[#625d54]">
              {filteredMovements.length}
            </span>{" "}
            movements
          </p>

          <p className="text-xs text-[#a19a8f]">
            Ledger is append-only
          </p>
        </div>
      </section>
    </div>
  );
}

export default MoveHistoryPage;
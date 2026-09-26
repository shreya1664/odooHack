import {
    Package,
    AlertTriangle,
    ArrowDownToLine,
    ArrowUpFromLine,
    ArrowLeftRight,
} from "lucide-react";

const iconMap = {
    "Total Products": Package,
    "Low / Out of Stock": AlertTriangle,
    "Pending Receipts": ArrowDownToLine,
    "Pending Deliveries": ArrowUpFromLine,
    "Scheduled Transfers": ArrowLeftRight,
};

function KPICard({ title, value, description, trend, type }) {
    const Icon = iconMap[title] || Package;

    const isWarning =
        type === "warning" ||
        title === "Low / Out of Stock";

    return (
        <div className="rounded-xl border border-[#DED6C8] bg-[#FFFDF8] p-5 transition hover:border-[#C9C0B2] hover:shadow-sm">

            <div className="flex items-start justify-between">

                <div>
                    <p className="text-xs font-semibold uppercase tracking-wide text-[#756F64]">
                        {title}
                    </p>

                    <p className="mt-2 text-3xl font-bold tracking-tight text-[#292824]">
                        {value}
                    </p>
                </div>

                <div
                    className={`flex h-10 w-10 items-center justify-center rounded-lg ${
                        isWarning
                            ? "bg-[#F5E8D8] text-[#A66A3F]"
                            : "bg-[#E9E8D0] text-[#275236]"
                    }`}
                >
                    <Icon size={19} />
                </div>

            </div>

            <div className="mt-4 flex items-center justify-between gap-2">

                <p className="text-xs text-[#918A7E]">
                    {description}
                </p>

                {trend && (
                    <span className="whitespace-nowrap rounded-full bg-[#E7F0E7] px-2 py-1 text-[10px] font-semibold text-[#4F7656]">
                        {trend}
                    </span>
                )}

            </div>
        </div>
    );
}

export default KPICard;
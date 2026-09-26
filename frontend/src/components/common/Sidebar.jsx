import {
    LayoutDashboard,
    Package,
    ArrowDownToLine,
    ArrowUpFromLine,
    ArrowLeftRight,
    SlidersHorizontal,
    ClipboardList,
    Warehouse,
    Settings,
    User,
    LogOut,
    Activity,
} from "lucide-react";

function Sidebar({ activePage, onNavigate }) {
    const mainItems = [
        { name: "Dashboard", icon: LayoutDashboard },
    ];

    const catalogItems = [
        { name: "Products", icon: Package },
    ];

    const operationItems = [
        { name: "Receipts", icon: ArrowDownToLine },
        { name: "Deliveries", icon: ArrowUpFromLine },
        { name: "Transfers", icon: ArrowLeftRight },
        { name: "Adjustments", icon: SlidersHorizontal },
    ];

    const auditItems = [
        { name: "Move History", icon: ClipboardList },
    ];

    const systemItems = [
        { name: "Warehouses", icon: Warehouse },
        { name: "Settings", icon: Settings },
        { name: "Profile", icon: User },
        { name: "Logout", icon: LogOut },
    ];

    const renderSection = (title, items) => (
        <div className="mb-7">
            <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-[0.14em] text-[#B7C8B8]">
                {title}
            </p>

            <div className="space-y-0.5">
                {items.map((item) => {
                    const Icon = item.icon;
                    const isActive = activePage === item.name;

                    return (
                        <button
                            key={item.name}
                            onClick={() => onNavigate(item.name)}
                            className={`group flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                isActive
                                    ? "bg-[#D8D9B1] font-medium text-[#275236] shadow-sm"
                                    : "text-[#E8EEE5] hover:bg-[#1F442D] hover:text-white"
                            }`}
                        >
                            <Icon
                                size={17}
                                strokeWidth={isActive ? 2.2 : 1.8}
                                className={
                                    isActive
                                        ? "text-[#275236]"
                                        : "text-[#B9C9BB] group-hover:text-white"
                                }
                            />

                            <span>{item.name}</span>
                        </button>
                    );
                })}
            </div>
        </div>
    );

    return (
        <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 self-start border-r border-[#1F442D] bg-[#275236] lg:block">
            <div className="flex h-full flex-col overflow-y-auto px-3 py-6">

                {/* Main Navigation */}
                {renderSection("Overview", mainItems)}

                {renderSection("Catalog", catalogItems)}

                {renderSection("Operations", operationItems)}

                {renderSection("Audit", auditItems)}

                {renderSection("System", systemItems)}

                {/* Status Card */}
                <div className="mt-auto pt-4">
                    <div className="rounded-xl border border-[#45644F] bg-[#1F442D] p-4">

                        <div className="flex items-center gap-2">
                            <Activity
                                size={15}
                                className="text-[#D8D9B1]"
                            />

                            <span className="text-xs font-semibold text-white">
                                Inventory Status
                            </span>
                        </div>

                        <div className="mt-3 flex items-center gap-2">
                            <span className="h-2 w-2 rounded-full bg-[#8BA66F]" />

                            <span className="text-[11px] text-[#C9D5CA]">
                                System operational
                            </span>
                        </div>

                        <div className="mt-3 border-t border-[#45644F] pt-3">
                            <p className="text-[10px] text-[#91A898]">
                                Last synchronized
                            </p>

                            <p className="mt-1 text-xs font-medium text-[#E8EEE5]">
                                Just now
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </aside>
    );
}

export default Sidebar;
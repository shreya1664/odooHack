import { Bell, Search, ChevronDown } from "lucide-react";

function Navbar({ onNavigate }) {
    return (
        <header className="sticky top-0 z-50 h-16 border-b border-[#192E60] bg-[#203B75]">
            <div className="flex h-full items-center justify-between px-6">

                {/* Brand */}
                <button
                    onClick={() => onNavigate("Dashboard")}
                    className="flex items-center gap-3"
                >
                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#D8D9B1] text-sm font-bold text-[#233D7B] shadow-sm">
                        S
                    </div>

                    <div className="hidden text-left sm:block">
                        <p className="text-sm font-bold tracking-tight text-white">
                            StockSense
                        </p>

                        <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#C5D0E5]">
                            Inventory OS
                        </p>
                    </div>
                </button>

                {/* Right Controls */}
                <div className="flex items-center gap-3">

                    {/* Search */}
                    <button className="hidden items-center gap-2 rounded-lg border border-[#40558B] bg-[#2D4888] px-3 py-2 text-sm text-[#D5DDEA] transition hover:border-[#5269A0] hover:bg-[#345092] md:flex">
                        <Search size={16} />

                        <span>Search</span>

                        <kbd className="ml-6 rounded border border-[#5269A0] bg-[#1D3267] px-1.5 py-0.5 text-[10px] text-[#C5D0E5]">
                            /
                        </kbd>
                    </button>

                    {/* Notification */}
                    <button className="relative flex h-9 w-9 items-center justify-center rounded-lg text-[#D5DDEA] transition hover:bg-[#2D4888] hover:text-white">
                        <Bell size={18} />

                        <span className="absolute right-2 top-2 h-1.5 w-1.5 rounded-full bg-[#D27A55]" />
                    </button>

                    {/* Profile */}
                    <button
                        onClick={() => onNavigate("Profile")}
                        className="flex items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-[#2D4888]"
                    >
                        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#D8D9B1] text-xs font-semibold text-[#233D7B]">
                            A
                        </div>

                        <div className="hidden text-left lg:block">
                            <p className="text-xs font-semibold text-white">
                                Inventory Manager
                            </p>

                            <p className="text-[11px] text-[#C5D0E5]">
                                Administrator
                            </p>
                        </div>

                        <ChevronDown
                            size={14}
                            className="hidden text-[#C5D0E5] lg:block"
                        />
                    </button>

                </div>
            </div>
        </header>
    );
}

export default Navbar;
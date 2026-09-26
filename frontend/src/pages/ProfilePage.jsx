import { useState } from "react";
import {
    User,
    Mail,
    ShieldCheck,
    Building2,
    Pencil,
    Save,
    Check,
} from "lucide-react";

function ProfilePage() {
    const [profile, setProfile] = useState({
        name: "Inventory Manager",
        email: "manager@stocksense.com",
        role: "Inventory Manager",
        department: "Operations",
    });

    const [editing, setEditing] = useState(false);
    const [saved, setSaved] = useState(false);

    const handleChange = (field, value) => {
        setProfile((prev) => ({
            ...prev,
            [field]: value,
        }));

        setSaved(false);
    };

    const handleSave = () => {
        setEditing(false);
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
                    Account
                </p>

                <h1 className="text-2xl font-bold tracking-tight text-[#292824]">
                    My Profile
                </h1>

                <p className="mt-1 text-sm text-[#756F64]">
                    Manage your account information and access details.
                </p>
            </div>

            {/* Profile Hero */}
            {/* Profile Hero */}
            <section className="mb-5 overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                {/* Green banner */}
                <div className="h-20 bg-[#275236]" />

                {/* Profile information */}
                <div className="relative px-5 pb-5">

                    <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between">

                        {/* Avatar + Identity */}
                        <div className="flex items-center gap-4">

                            {/* Avatar */}
                            <div className="-mt-12 flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-4 border-[#FFFDF8] bg-[#D8D9B1] text-2xl font-bold text-[#275236] shadow-sm">
                                A
                            </div>

                            {/* Identity */}
                            <div>
                                <h2 className="text-lg font-bold text-[#292824]">
                                    {profile.name}
                                </h2>

                                <p className="mt-0.5 text-sm text-[#756F64]">
                                    {profile.email}
                                </p>
                            </div>

                        </div>

                        {/* Edit button */}
                        {!editing && (
                            <button
                                onClick={() => setEditing(true)}
                                className="inline-flex items-center justify-center gap-2 self-start rounded-lg border border-[#DED6C8] bg-[#FCF8F1] px-4 py-2.5 text-sm font-semibold text-[#292824] transition hover:bg-[#F0E9DD] sm:self-auto"
                            >
                                <Pencil size={15} />
                                Edit Profile
                            </button>
                        )}

                    </div>
                </div>
            </section>
            <div className="grid gap-5 lg:grid-cols-3">

                {/* Personal Information */}
                <section className="overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8] lg:col-span-2">

                    <div className="flex items-center gap-3 border-b border-[#DED6C8] px-5 py-4">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                            <User size={17} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-[#292824]">
                                Personal Information
                            </h2>

                            <p className="text-xs text-[#756F64]">
                                Your account details.
                            </p>
                        </div>

                    </div>

                    <div className="grid gap-5 p-5 sm:grid-cols-2">

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                Full Name
                            </label>

                            <input
                                value={profile.name}
                                disabled={!editing}
                                onChange={(e) =>
                                    handleChange("name", e.target.value)
                                }
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${editing
                                        ? "border-[#DED6C8] bg-[#FCF8F1] text-[#292824] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        : "border-[#E7E1D7] bg-[#F5F0E8] text-[#756F64]"
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                Email Address
                            </label>

                            <div className="relative">
                                <Mail
                                    size={15}
                                    className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#918A7E]"
                                />

                                <input
                                    value={profile.email}
                                    disabled
                                    className="w-full rounded-lg border border-[#E7E1D7] bg-[#F5F0E8] py-2.5 pl-9 pr-3 text-sm text-[#756F64] outline-none"
                                />
                            </div>

                            <p className="mt-1.5 text-[11px] text-[#918A7E]">
                                Email changes require verification.
                            </p>
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                Department
                            </label>

                            <input
                                value={profile.department}
                                disabled={!editing}
                                onChange={(e) =>
                                    handleChange(
                                        "department",
                                        e.target.value
                                    )
                                }
                                className={`w-full rounded-lg border px-3 py-2.5 text-sm outline-none transition ${editing
                                        ? "border-[#DED6C8] bg-[#FCF8F1] text-[#292824] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        : "border-[#E7E1D7] bg-[#F5F0E8] text-[#756F64]"
                                    }`}
                            />
                        </div>

                        <div>
                            <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                Role
                            </label>

                            <div className="flex h-[42px] items-center gap-2 rounded-lg border border-[#E7E1D7] bg-[#F5F0E8] px-3">
                                <ShieldCheck
                                    size={15}
                                    className="text-[#4F7656]"
                                />

                                <span className="text-sm text-[#756F64]">
                                    {profile.role}
                                </span>
                            </div>
                        </div>

                    </div>

                    {editing && (
                        <div className="flex justify-end gap-3 border-t border-[#DED6C8] px-5 py-4">

                            <button
                                onClick={() => setEditing(false)}
                                className="rounded-lg border border-[#DED6C8] px-4 py-2.5 text-sm font-medium text-[#756F64] transition hover:bg-[#F0E9DD]"
                            >
                                Cancel
                            </button>

                            <button
                                onClick={handleSave}
                                className="inline-flex items-center gap-2 rounded-lg bg-[#1F442D] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#173722]"
                            >
                                <Save size={15} />
                                Save Changes
                            </button>

                        </div>
                    )}
                </section>

                {/* Access Card */}
                <section className="h-fit overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                    <div className="flex items-center gap-3 border-b border-[#DED6C8] px-5 py-4">

                        <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E7F0E7] text-[#4F7656]">
                            <ShieldCheck size={17} />
                        </div>

                        <div>
                            <h2 className="text-sm font-bold text-[#292824]">
                                Access
                            </h2>

                            <p className="text-xs text-[#756F64]">
                                Your system permissions.
                            </p>
                        </div>

                    </div>

                    <div className="space-y-4 p-5">

                        <div>
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                                Account Role
                            </p>

                            <p className="mt-1 text-sm font-semibold text-[#292824]">
                                Inventory Manager
                            </p>
                        </div>

                        <div className="border-t border-[#E7E1D7] pt-4">
                            <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                                Permissions
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                                {[
                                    "Products",
                                    "Operations",
                                    "Adjustments",
                                    "Reports",
                                ].map((permission) => (
                                    <span
                                        key={permission}
                                        className="rounded-md bg-[#F0EDE5] px-2.5 py-1 text-[11px] font-medium text-[#756F64]"
                                    >
                                        {permission}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="border-t border-[#E7E1D7] pt-4">
                            <div className="flex items-center gap-2">
                                <span className="h-2 w-2 rounded-full bg-[#668C6A]" />

                                <span className="text-xs font-medium text-[#4F7656]">
                                    Account active
                                </span>
                            </div>
                        </div>

                    </div>
                </section>

            </div>

            {/* Workspace */}
            <section className="mt-5 overflow-hidden rounded-xl border border-[#DED6C8] bg-[#FFFDF8]">

                <div className="flex items-center gap-3 border-b border-[#DED6C8] px-5 py-4">

                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#E9E8D0] text-[#275236]">
                        <Building2 size={17} />
                    </div>

                    <div>
                        <h2 className="text-sm font-bold text-[#292824]">
                            Workspace
                        </h2>

                        <p className="text-xs text-[#756F64]">
                            Current organization and inventory environment.
                        </p>
                    </div>

                </div>

                <div className="grid gap-5 p-5 sm:grid-cols-3">

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                            Organization
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#292824]">
                            StockSense Industries
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                            Default Warehouse
                        </p>

                        <p className="mt-1 text-sm font-semibold text-[#292824]">
                            Main Warehouse
                        </p>
                    </div>

                    <div>
                        <p className="text-[10px] font-semibold uppercase tracking-wide text-[#918A7E]">
                            Environment
                        </p>

                        <span className="mt-1 inline-flex items-center gap-1.5 rounded-full bg-[#E7F0E7] px-2.5 py-1 text-[11px] font-semibold text-[#4F7656]">
                            <span className="h-1.5 w-1.5 rounded-full bg-[#668C6A]" />
                            Operational
                        </span>
                    </div>

                </div>
            </section>

            {/* Save confirmation */}
            {saved && (
                <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#C9D9CA] bg-[#F2F8F2] px-4 py-3 text-sm font-semibold text-[#4F7656] shadow-lg">
                    <Check size={16} />
                    Profile updated successfully
                </div>
            )}

        </div>
    );
}

export default ProfilePage;
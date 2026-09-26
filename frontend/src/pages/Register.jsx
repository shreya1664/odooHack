import { useState } from "react";
import {
    User,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    Package,
    ShieldCheck,
} from "lucide-react";

function Register({ onRegister, onLogin }) {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [form, setForm] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (field, value) => {
        setForm((prev) => ({
            ...prev,
            [field]: value,
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (form.password !== form.confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        onRegister();
    };

    return (
        <div className="min-h-screen bg-[#F0E9DD] text-[#292824]">

            <div className="grid min-h-screen lg:grid-cols-[0.95fr_1.05fr]">

                {/* Left Panel */}
                <div className="relative hidden overflow-hidden bg-[#1F442D] lg:flex">

                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#45644F] opacity-50" />
                    <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-[#45644F] opacity-40" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        {/* Brand */}
                        <div className="flex items-center gap-3">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#D8D9B1] text-sm font-bold text-[#275236]">
                                S
                            </div>

                            <div>
                                <p className="text-sm font-bold text-white">
                                    StockSense
                                </p>

                                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#B9C9BB]">
                                    Inventory OS
                                </p>
                            </div>

                        </div>

                        {/* Message */}
                        <div className="max-w-lg">

                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D8D9B1] text-[#275236]">
                                <Package size={23} />
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                                Build a clearer
                                <br />
                                <span className="text-[#D8D9B1]">
                                    inventory workflow.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-sm leading-6 text-[#C9D5CA]">
                                Centralize products, warehouses, stock
                                movements, receipts, deliveries, and
                                adjustments in one workspace.
                            </p>

                            <div className="mt-8 space-y-3">

                                {[
                                    "Centralized inventory tracking",
                                    "Multi-warehouse operations",
                                    "Complete stock movement history",
                                ].map((item) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-[#E8EEE5]"
                                    >
                                        <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#45644F]">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[#D8D9B1]" />
                                        </div>

                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-2 text-xs text-[#91A898]">
                            <ShieldCheck size={14} />
                            Secure inventory workspace
                        </div>

                    </div>
                </div>

                {/* Right Panel */}
                <div className="flex items-center justify-center px-5 py-10 sm:px-8">

                    <div className="w-full max-w-md">

                        {/* Mobile Brand */}
                        <div className="mb-8 flex items-center gap-3 lg:hidden">

                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#1F442D] text-sm font-bold text-[#D8D9B1]">
                                S
                            </div>

                            <div>
                                <p className="text-sm font-bold text-[#292824]">
                                    StockSense
                                </p>

                                <p className="text-[10px] font-medium uppercase tracking-[0.18em] text-[#756F64]">
                                    Inventory OS
                                </p>
                            </div>

                        </div>

                        {/* Heading */}
                        <div className="mb-7">

                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#756F64]">
                                Get started
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight text-[#292824]">
                                Create your account
                            </h2>

                            <p className="mt-2 text-sm text-[#756F64]">
                                Set up your StockSense inventory workspace.
                            </p>

                        </div>

                        {/* Form Card */}
                        <div className="rounded-2xl border border-[#DED6C8] bg-[#FFFDF8] p-6 shadow-sm sm:p-7">

                            <form
                                onSubmit={handleSubmit}
                                className="space-y-4"
                            >

                                {/* Name */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                        Full Name
                                    </label>

                                    <div className="relative">

                                        <User
                                            size={16}
                                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#918A7E]"
                                        />

                                        <input
                                            type="text"
                                            value={form.name}
                                            onChange={(e) =>
                                                handleChange(
                                                    "name",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Enter your name"
                                            required
                                            className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-3 text-sm text-[#292824] outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        />

                                    </div>
                                </div>

                                {/* Email */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                        Email Address
                                    </label>

                                    <div className="relative">

                                        <Mail
                                            size={16}
                                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#918A7E]"
                                        />

                                        <input
                                            type="email"
                                            value={form.email}
                                            onChange={(e) =>
                                                handleChange(
                                                    "email",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="you@company.com"
                                            required
                                            className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-3 text-sm text-[#292824] outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        />

                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                        Password
                                    </label>

                                    <div className="relative">

                                        <Lock
                                            size={16}
                                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#918A7E]"
                                        />

                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={form.password}
                                            onChange={(e) =>
                                                handleChange(
                                                    "password",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Create a password"
                                            required
                                            minLength={6}
                                            className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-11 text-sm text-[#292824] outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(
                                                    !showPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#918A7E] hover:text-[#292824]"
                                        >
                                            {showPassword ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>

                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div>
                                    <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                        Confirm Password
                                    </label>

                                    <div className="relative">

                                        <Lock
                                            size={16}
                                            className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-[#918A7E]"
                                        />

                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            value={form.confirmPassword}
                                            onChange={(e) =>
                                                handleChange(
                                                    "confirmPassword",
                                                    e.target.value
                                                )
                                            }
                                            placeholder="Confirm your password"
                                            required
                                            minLength={6}
                                            className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-11 text-sm text-[#292824] outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-[#918A7E] hover:text-[#292824]"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff size={16} />
                                            ) : (
                                                <Eye size={16} />
                                            )}
                                        </button>

                                    </div>
                                </div>

                                {/* Terms */}
                                <p className="pt-1 text-[11px] leading-5 text-[#918A7E]">
                                    By creating an account, you agree to use
                                    StockSense according to your organization's
                                    access and inventory policies.
                                </p>

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="group mt-1 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F442D] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173722]"
                                >
                                    Create Account
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                </button>

                            </form>

                            {/* Login */}
                            <div className="mt-6 border-t border-[#E7E1D7] pt-5 text-center">

                                <p className="text-sm text-[#756F64]">
                                    Already have an account?{" "}
                                    <button
                                        onClick={onLogin}
                                        className="font-semibold text-[#275236] hover:underline"
                                    >
                                        Sign in
                                    </button>
                                </p>

                            </div>

                        </div>

                        <p className="mt-6 text-center text-[11px] text-[#918A7E]">
                            StockSense Inventory Management System
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default Register;
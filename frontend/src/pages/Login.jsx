import { useState } from "react";
import {
    Package,
    Mail,
    Lock,
    Eye,
    EyeOff,
    ArrowRight,
    ShieldCheck,
} from "lucide-react";
import { login } from "../services/api";

function Login({ onLogin, onRegister, onForgotPassword }) {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        const data = await login(email, password);

        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));

        onLogin(data.user);
    } catch (error) {
        alert(error.message);
    }
};

    return (
        <div className="min-h-screen bg-[#F0E9DD] text-[#292824]">

            <div className="grid min-h-screen lg:grid-cols-[1.05fr_0.95fr]">

                {/* Left Panel */}
                <div className="relative hidden overflow-hidden bg-[#1F442D] lg:flex">

                    {/* Decorative shapes */}
                    <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-[#45644F] opacity-50" />
                    <div className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-[#45644F] opacity-40" />

                    <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

                        {/* Brand */}
                        <div>
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
                        </div>

                        {/* Main Message */}
                        <div className="max-w-lg">

                            <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-xl bg-[#D8D9B1] text-[#275236]">
                                <Package size={23} />
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                                Inventory control,
                                <br />
                                <span className="text-[#D8D9B1]">
                                    without the clutter.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-sm leading-6 text-[#C9D5CA]">
                                Track products, manage warehouse operations,
                                monitor stock levels, and keep every inventory
                                movement in one place.
                            </p>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {[
                                    "Live inventory",
                                    "Multi-warehouse",
                                    "Stock ledger",
                                ].map((item) => (
                                    <span
                                        key={item}
                                        className="rounded-full border border-[#45644F] bg-[#275236] px-3 py-1.5 text-xs font-medium text-[#E8EEE5]"
                                    >
                                        {item}
                                    </span>
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
                        <div className="mb-10 flex items-center gap-3 lg:hidden">

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
                        <div className="mb-8">

                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#756F64]">
                                Welcome back
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight text-[#292824]">
                                Sign in to StockSense
                            </h2>

                            <p className="mt-2 text-sm text-[#756F64]">
                                Access your inventory workspace and operations.
                            </p>

                        </div>

                        {/* Form Card */}
                        <div className="rounded-2xl border border-[#DED6C8] bg-[#FFFDF8] p-6 shadow-sm sm:p-7">

                            <form onSubmit={handleSubmit} className="space-y-5">

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
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            placeholder="you@company.com"
                                            required
                                            className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-3 text-sm text-[#292824] outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        />

                                    </div>
                                </div>

                                {/* Password */}
                                <div>
                                    <div className="mb-1.5 flex items-center justify-between">

                                        <label className="text-xs font-semibold text-[#292824]">
                                            Password
                                        </label>

                                        <button
                                            type="button"
                                            onClick={onForgotPassword}
                                            className="text-xs font-medium text-[#4F7656] hover:text-[#275236]"
                                        >
                                            Forgot password?
                                        </button>

                                    </div>

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
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            placeholder="Enter your password"
                                            required
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

                                {/* Submit */}
                                <button
                                    type="submit"
                                    className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F442D] py-3 text-sm font-semibold text-white shadow-sm transition hover:bg-[#173722]"
                                >
                                    Sign In
                                    <ArrowRight
                                        size={16}
                                        className="transition-transform group-hover:translate-x-0.5"
                                    />
                                </button>

                            </form>

                            {/* Register */}
                            <div className="mt-6 border-t border-[#E7E1D7] pt-5 text-center">

                                <p className="text-sm text-[#756F64]">
                                    Don't have an account?{" "}
                                    <button
                                        onClick={onRegister}
                                        className="font-semibold text-[#275236] hover:underline"
                                    >
                                        Create one
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

export default Login;
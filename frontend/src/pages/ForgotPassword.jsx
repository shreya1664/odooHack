import { useState } from "react";
import {
    ArrowLeft,
    ArrowRight,
    CheckCircle2,
    KeyRound,
    Lock,
    Mail,
    Package,
    ShieldCheck,
    Eye,
    EyeOff,
} from "lucide-react";

function ForgotPassword({ onBackToLogin }) {
    const [step, setStep] = useState(1);
    const [email, setEmail] = useState("");
    const [otp, setOtp] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleEmailSubmit = (e) => {
        e.preventDefault();
        setStep(2);
    };

    const handleOtpSubmit = (e) => {
        e.preventDefault();
        setStep(3);
    };

    const handlePasswordSubmit = (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Passwords do not match.");
            return;
        }

        setStep(4);
    };

    return (
        <div className="min-h-screen bg-[#F0E9DD] text-[#292824]">

            <div className="grid min-h-screen lg:grid-cols-[0.9fr_1.1fr]">

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
                                <KeyRound size={23} />
                            </div>

                            <h1 className="text-4xl font-bold leading-tight tracking-tight text-white xl:text-5xl">
                                Account recovery,
                                <br />
                                <span className="text-[#D8D9B1]">
                                    kept simple.
                                </span>
                            </h1>

                            <p className="mt-5 max-w-md text-sm leading-6 text-[#C9D5CA]">
                                Verify your account and create a new password
                                to get back into your inventory workspace.
                            </p>

                            <div className="mt-8 space-y-3">

                                {[
                                    "Verify your registered email",
                                    "Confirm your one-time code",
                                    "Create a new password",
                                ].map((item, index) => (
                                    <div
                                        key={item}
                                        className="flex items-center gap-3 text-sm text-[#E8EEE5]"
                                    >
                                        <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full border border-[#607A68] text-[10px] font-bold text-[#D8D9B1]">
                                            {index + 1}
                                        </div>

                                        {item}
                                    </div>
                                ))}

                            </div>

                        </div>

                        {/* Footer */}
                        <div className="flex items-center gap-2 text-xs text-[#91A898]">
                            <ShieldCheck size={14} />
                            Secure account recovery
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

                        {/* Progress */}
                        {step < 4 && (
                            <div className="mb-7 flex items-center gap-2">

                                {[1, 2, 3].map((item) => (
                                    <div
                                        key={item}
                                        className={`h-1.5 flex-1 rounded-full ${
                                            item <= step
                                                ? "bg-[#275236]"
                                                : "bg-[#D8D1C6]"
                                        }`}
                                    />
                                ))}

                            </div>
                        )}

                        {/* Heading */}
                        <div className="mb-7">

                            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-[#756F64]">
                                Account recovery
                            </p>

                            <h2 className="text-3xl font-bold tracking-tight text-[#292824]">
                                {step === 1 && "Forgot your password?"}
                                {step === 2 && "Verify your email"}
                                {step === 3 && "Create new password"}
                                {step === 4 && "Password updated"}
                            </h2>

                            <p className="mt-2 text-sm leading-5 text-[#756F64]">
                                {step === 1 &&
                                    "Enter your registered email to begin account recovery."}

                                {step === 2 &&
                                    `Enter the verification code sent to ${email}.`}

                                {step === 3 &&
                                    "Choose a new password for your StockSense account."}

                                {step === 4 &&
                                    "Your password has been changed successfully."}
                            </p>

                        </div>

                        {/* Card */}
                        <div className="rounded-2xl border border-[#DED6C8] bg-[#FFFDF8] p-6 shadow-sm sm:p-7">

                            {/* STEP 1 */}
                            {step === 1 && (
                                <form
                                    onSubmit={handleEmailSubmit}
                                    className="space-y-5"
                                >
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
                                                className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-3 text-sm outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                            />

                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F442D] py-3 text-sm font-semibold text-white transition hover:bg-[#173722]"
                                    >
                                        Send Verification Code
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-0.5"
                                        />
                                    </button>
                                </form>
                            )}

                            {/* STEP 2 */}
                            {step === 2 && (
                                <form
                                    onSubmit={handleOtpSubmit}
                                    className="space-y-5"
                                >
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                            Verification Code
                                        </label>

                                        <input
                                            type="text"
                                            inputMode="numeric"
                                            maxLength={6}
                                            value={otp}
                                            onChange={(e) =>
                                                setOtp(
                                                    e.target.value.replace(
                                                        /\D/g,
                                                        ""
                                                    )
                                                )
                                            }
                                            placeholder="Enter 6-digit code"
                                            required
                                            className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] px-3 py-3 text-center text-lg font-semibold tracking-[0.35em] outline-none transition placeholder:text-sm placeholder:font-normal placeholder:tracking-normal placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                        />

                                        <p className="mt-2 text-center text-[11px] text-[#918A7E]">
                                            For this frontend demo, any
                                            6-digit code will continue.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F442D] py-3 text-sm font-semibold text-white transition hover:bg-[#173722]"
                                    >
                                        Verify Code
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-0.5"
                                        />
                                    </button>
                                </form>
                            )}

                            {/* STEP 3 */}
                            {step === 3 && (
                                <form
                                    onSubmit={handlePasswordSubmit}
                                    className="space-y-4"
                                >
                                    <div>
                                        <label className="mb-1.5 block text-xs font-semibold text-[#292824]">
                                            New Password
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
                                                value={password}
                                                onChange={(e) =>
                                                    setPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Enter new password"
                                                minLength={6}
                                                required
                                                className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-11 text-sm outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#918A7E]"
                                            >
                                                {showPassword ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>

                                        </div>
                                    </div>

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
                                                value={confirmPassword}
                                                onChange={(e) =>
                                                    setConfirmPassword(
                                                        e.target.value
                                                    )
                                                }
                                                placeholder="Confirm new password"
                                                minLength={6}
                                                required
                                                className="w-full rounded-lg border border-[#DED6C8] bg-[#FCF8F1] py-3 pl-10 pr-11 text-sm outline-none transition placeholder:text-[#A29B90] focus:border-[#66805D] focus:ring-2 focus:ring-[#66805D]/10"
                                            />

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    setShowConfirmPassword(
                                                        !showConfirmPassword
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#918A7E]"
                                            >
                                                {showConfirmPassword ? (
                                                    <EyeOff size={16} />
                                                ) : (
                                                    <Eye size={16} />
                                                )}
                                            </button>

                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        className="group flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F442D] py-3 text-sm font-semibold text-white transition hover:bg-[#173722]"
                                    >
                                        Reset Password
                                        <ArrowRight
                                            size={16}
                                            className="transition-transform group-hover:translate-x-0.5"
                                        />
                                    </button>
                                </form>
                            )}

                            {/* STEP 4 */}
                            {step === 4 && (
                                <div className="text-center">

                                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-[#E7F0E7] text-[#4F7656]">
                                        <CheckCircle2 size={28} />
                                    </div>

                                    <h3 className="mt-5 text-base font-bold text-[#292824]">
                                        You're all set
                                    </h3>

                                    <p className="mt-2 text-sm leading-5 text-[#756F64]">
                                        Your password has been updated. You can
                                        now sign in with your new credentials.
                                    </p>

                                    <button
                                        onClick={onBackToLogin}
                                        className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-[#1F442D] py-3 text-sm font-semibold text-white transition hover:bg-[#173722]"
                                    >
                                        Back to Sign In
                                        <ArrowRight size={16} />
                                    </button>

                                </div>
                            )}

                            {/* Back */}
                            {step < 4 && (
                                <button
                                    onClick={onBackToLogin}
                                    className="mt-5 flex w-full items-center justify-center gap-2 text-xs font-medium text-[#756F64] transition hover:text-[#275236]"
                                >
                                    <ArrowLeft size={14} />
                                    Back to Sign In
                                </button>
                            )}

                        </div>

                        <p className="mt-6 flex items-center justify-center gap-1.5 text-[11px] text-[#918A7E]">
                            <Package size={12} />
                            StockSense Inventory Management System
                        </p>

                    </div>
                </div>

            </div>
        </div>
    );
}

export default ForgotPassword;
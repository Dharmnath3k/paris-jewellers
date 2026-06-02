import { useState } from "react";
import { User, Mail, Lock, Phone, ArrowLeft, ShieldCheck } from "lucide-react";

export default function RegistrationPageView({ onRouteChange }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!name || !email || !password || !confirmPassword || !phone) {
      setError("Please fill out all mandatory customer parameters.");
      return;
    }

    if (password.length < 6) {
      setError("Security safeguard: Password must contain at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Password mismatch! Please double-check password verification.");
      return;
    }

    // 1. Fetch existing accounts from local storage
    const existingAccounts = JSON.parse(localStorage.getItem("paris_cl_accounts") || "[]");

    // 2. Check if email already exists
    const emailExists = existingAccounts.some((acc) => acc.email.toLowerCase() === email.toLowerCase());
    if (emailExists || email.toLowerCase() === "admin@paris.com") {
      setError("This email address is already verified on our servers. Kindly log in.");
      return;
    }

    // 3. Save new account
    const newAccount = { name, email, phone, password };
    existingAccounts.push(newAccount);
    localStorage.setItem("paris_cl_accounts", JSON.stringify(existingAccounts));

    setSuccess("Luxury account generated successfully! Redirecting to secure login gateway...");
    
    setTimeout(() => {
      onRouteChange("login");
    }, 1800);
  };

  return (
    <div className="max-w-md mx-auto my-12 px-6 py-10 bg-white border border-[#e6dfd3] shadow-md relative" id="registration-module">
      
      {/* Top Banner Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#c3a475]"></div>

      <button
        onClick={() => onRouteChange("login")}
        className="inline-flex items-center gap-1.5 text-xs text-gray-500 hover:text-[#c3a475] font-semibold transition-colors mb-6 cursor-pointer"
      >
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
      </button>

      <div className="text-center mb-6">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c3a475] block mb-2">
          New Member Registry
        </span>
        <h2 className="text-3xl font-serif text-[#23221f]">Create Luxury Account</h2>
        <div className="w-12 h-[1px] bg-[#c3a475] mx-auto mt-3"></div>
      </div>

      {error && (
        <div className="p-3 bg-red-50 border-l-2 border-red-500 text-xs text-red-700 mb-6 font-medium">
          ⚠️ {error}
        </div>
      )}

      {success && (
        <div className="p-3 bg-emerald-50 border-l-2 border-[#10b981] text-xs text-emerald-800 mb-6 font-medium">
          ✨ {success}
        </div>
      )}

      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        {/* Full Name */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#23221f] uppercase tracking-wider block">
            Full Name
          </label>
          <div className="relative">
            <User className="absolute left-3 top-3.5 w-4 h-4 text-[#c3a475]" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aditya Sharma"
              className="w-full h-11 pl-10 pr-4 border border-[#e6dfd3] focus:border-[#c3a475] focus:outline-none text-xs font-semibold tracking-wide bg-neutral-50 transition-colors"
              required
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#23221f] uppercase tracking-wider block">
            Email Address
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 w-4 h-4 text-[#c3a475]" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="w-full h-11 pl-10 pr-4 border border-[#e6dfd3] focus:border-[#c3a475] focus:outline-none text-xs font-semibold tracking-wide bg-neutral-50 transition-colors"
              required
            />
          </div>
        </div>

        {/* Mobile Phone */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#23221f] uppercase tracking-wider block">
            Contact Number
          </label>
          <div className="relative">
            <Phone className="absolute left-3 top-3.5 w-4 h-4 text-[#c3a475]" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="w-full h-11 pl-10 pr-4 border border-[#e6dfd3] focus:border-[#c3a475] focus:outline-none text-xs font-semibold tracking-wide bg-neutral-50 transition-colors"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#23221f] uppercase tracking-wider block">
            Select secure password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-[#c3a475]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="w-full h-11 pl-10 pr-4 border border-[#e6dfd3] focus:border-[#c3a475] focus:outline-none text-xs font-semibold tracking-widest bg-neutral-50 transition-colors"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#23221f] uppercase tracking-wider block">
            Confirm secure password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-[#c3a475]" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="w-full h-11 pl-10 pr-4 border border-[#e6dfd3] focus:border-[#c3a475] focus:outline-none text-xs font-semibold tracking-widest bg-neutral-50 transition-colors"
              required
            />
          </div>
        </div>

        {/* Consent checkbox */}
        <div className="pt-2 flex items-start gap-2.5">
          <input
            type="checkbox"
            id="marketing-consent"
            className="mt-0.5 accent-[#c3a475]"
            defaultChecked
            required
          />
          <label htmlFor="marketing-consent" className="text-[10px] text-gray-500 leading-normal font-medium">
            I certify the accuracy of these details and agree to receive secure tracker PINs, billing invoices, and complimentary jewelry inspection updates from Paris Jewellers.
          </label>
        </div>

        <button
          type="submit"
          className="w-full h-11 bg-[#23221f] hover:bg-[#c3a475] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer mt-4"
          id="btn-register-submit"
        >
          Create Luxury Account <ShieldCheck className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-6 pt-5 border-t border-[#f2ece2] text-center">
        <p className="text-xs text-gray-500 font-medium">
          Already a Member?{" "}
          <button
            onClick={() => onRouteChange("login")}
            className="text-[#c3a475] hover:text-[#b08f5e] font-bold underline cursor-pointer"
          >
            Sign In Here
          </button>
        </p>
      </div>

    </div>
  );
}

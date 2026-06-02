import { useState } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight, Info } from "lucide-react";

export default function LoginPageView({ onLoginSuccess, onRouteChange }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!email || !password) {
      setError("Please fill in all security parameter credentials.");
      return;
    }

    // 1. Check local storage accounts list
    const existingAccounts = JSON.parse(localStorage.getItem("paris_cl_accounts") || "[]");
    
    // Default demo account
    const defaultAccount = {
      name: "Pranav Mehra",
      email: "admin@paris.com",
      password: "password123",
      phone: "+91 98765 43210"
    };

    const matchedUser = existingAccounts.find(
      (acc) => acc.email.toLowerCase() === email.toLowerCase() && acc.password === password
    ) || (email.toLowerCase() === defaultAccount.email && password === defaultAccount.password ? defaultAccount : null);

    if (matchedUser) {
      setSuccess(`Welcome back, ${matchedUser.name}! Opening private profile portal...`);
      setTimeout(() => {
        onLoginSuccess(matchedUser);
        onRouteChange("orders"); // Route to My Profile / Track Orders
      }, 1500);
    } else {
      setError("Authorization failed! Invalid email address or secure password.");
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 px-6 py-10 bg-white border border-[#e6dfd3] shadow-md relative" id="login-module">
      
      {/* Visual Accent */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-[#c3a475]"></div>

      <div className="text-center mb-8">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c3a475] block mb-2">
          Secure Brand Portal
        </span>
        <h2 className="text-3xl font-serif text-[#23221f]">Member Sign In</h2>
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

      <form onSubmit={handleLoginSubmit} className="space-y-5">
        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#23221f] uppercase tracking-wider block">
            Email address
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

        <div className="space-y-1">
          <label className="text-[11px] font-semibold text-[#23221f] uppercase tracking-wider block">
            Secure Password
          </label>
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 w-4 h-4 text-[#c3a475]" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="w-full h-11 pl-10 pr-4 border border-[#e6dfd3] focus:border-[#c3a475] focus:outline-none text-xs bg-neutral-50 font-semibold tracking-widest transition-colors"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full h-11 bg-[#23221f] hover:bg-[#c3a475] text-white hover:text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer mt-2"
          id="btn-login-submit"
        >
          Sign In Securely <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="mt-8 pt-6 border-t border-[#f2ece2] text-center space-y-4">
        <p className="text-xs text-gray-500 font-medium">
          No luxury profile registered yet?{" "}
          <button
            onClick={() => onRouteChange("register")}
            className="text-[#c3a475] hover:text-[#b08f5e] font-bold underline cursor-pointer"
          >
            Create an Account
          </button>
        </p>

        {/* Demo Credentials Box */}
        <div className="p-4 bg-[#faf7f2] border border-[#e6dfd3] text-left rounded-sm">
          <div className="flex items-center gap-2 text-xs font-serif font-bold text-[#c3a475] mb-1">
            <Info className="w-3.5 h-3.5" />
            <span>Complimentary Demo Portal Access</span>
          </div>
          <p className="text-[10px] text-gray-600 leading-normal leading-relaxed">
            You can sign in directly using our sample credential to track historic orders, or register a new account:
          </p>
          <div className="mt-2 text-[10px] font-mono text-gray-700 bg-white p-2 border border-[#f2ece2] rounded-sm space-y-0.5">
            <div>Email: <strong className="select-all">admin@paris.com</strong></div>
            <div>Password: <strong className="select-all">password123</strong></div>
          </div>
        </div>

        <div className="flex items-center justify-center gap-1.5 text-[10px] text-gray-400 font-medium font-mono uppercase tracking-wider">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c3a475]" /> SSL Gateway Armed
        </div>
      </div>

    </div>
  );
}

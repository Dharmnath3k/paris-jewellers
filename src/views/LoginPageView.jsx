import { useState } from "react";
import { Mail, Lock, ShieldCheck, ArrowRight, Info } from "lucide-react";
import "./LoginPageView.css";

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
    const existingAccounts = JSON.parse(
      localStorage.getItem("paris_cl_accounts") || "[]",
    );

    // Default demo account
    const defaultAccount = {
      name: "Pranav Mehra",
      email: "admin@paris.com",
      password: "password123",
      phone: "+91 98765 43210",
    };

    const matchedUser =
      existingAccounts.find(
        (acc) =>
          acc.email.toLowerCase() === email.toLowerCase() &&
          acc.password === password,
      ) ||
      (email.toLowerCase() === defaultAccount.email &&
      password === defaultAccount.password
        ? defaultAccount
        : null);

    if (matchedUser) {
      setSuccess(
        `Welcome back, ${matchedUser.name}! Opening private profile portal...`,
      );
      setTimeout(() => {
        onLoginSuccess(matchedUser);
        onRouteChange("orders"); // Route to My Profile / Track Orders
      }, 1500);
    } else {
      setError(
        "Authorization failed! Invalid email address or secure password.",
      );
    }
  };

  return (
    <div className="login-container" id="login-module">
      {/* Visual Accent */}
      <div className="login-accent-bar"></div>

      <div className="login-header">
        <span className="login-subtitle">Secure Brand Portal</span>
        <h2 className="login-title">Member Sign In</h2>
        <div className="login-divider"></div>
      </div>

      {error && <div className="login-error-alert">⚠️ {error}</div>}

      {success && <div className="login-success-alert">✨ {success}</div>}

      <form onSubmit={handleLoginSubmit} className="login-form">
        <div className="login-form-group">
          <label className="login-form-label">Email address</label>
          <div className="login-input-wrapper">
            <Mail className="login-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="login-input-field"
              required
            />
          </div>
        </div>

        <div className="login-form-group">
          <label className="login-form-label">Secure Password</label>
          <div className="login-input-wrapper">
            <Lock className="login-input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••••••"
              className="login-input-field login-password-field"
              required
            />
          </div>
        </div>

        <button
          type="submit"
          className="login-submit-btn"
          id="btn-login-submit">
          Sign In Securely <ArrowRight className="w-4 h-4" />
        </button>
      </form>

      <div className="login-footer">
        <p className="login-switch-text">
          No luxury profile registered yet?{" "}
          <button
            onClick={() => onRouteChange("register")}
            className="login-switch-btn">
            Create an Account
          </button>
        </p>

        {/* Demo Credentials Box */}
        <div className="login-demo-box">
          <div className="login-demo-header">
            <Info className="w-3.5 h-3.5" />
            <span>Complimentary Demo Portal Access</span>
          </div>
          <p className="login-demo-desc">
            You can sign in directly using our sample credential to track
            historic orders, or register a new account:
          </p>
          <div className="login-demo-credentials">
            <div>
              Email: <strong className="select-all">admin@paris.com</strong>
            </div>
            <div>
              Password: <strong className="select-all">password123</strong>
            </div>
          </div>
        </div>

        <div className="login-ssl-seal">
          <ShieldCheck className="w-3.5 h-3.5 text-[#c3a475]" /> SSL Gateway
          Armed
        </div>
      </div>
    </div>
  );
}

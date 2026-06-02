import { useState } from "react";
import { User, Mail, Lock, Phone, ArrowLeft, ShieldCheck } from "lucide-react";
import "./RegistrationPageView.css";

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
      setError(
        "Security safeguard: Password must contain at least 6 characters.",
      );
      return;
    }

    if (password !== confirmPassword) {
      setError("Password mismatch! Please double-check password verification.");
      return;
    }

    // 1. Fetch existing accounts from local storage
    const existingAccounts = JSON.parse(
      localStorage.getItem("paris_cl_accounts") || "[]",
    );

    // 2. Check if email already exists
    const emailExists = existingAccounts.some(
      (acc) => acc.email.toLowerCase() === email.toLowerCase(),
    );
    if (emailExists || email.toLowerCase() === "admin@paris.com") {
      setError(
        "This email address is already verified on our servers. Kindly log in.",
      );
      return;
    }

    // 3. Save new account
    const newAccount = { name, email, phone, password };
    existingAccounts.push(newAccount);
    localStorage.setItem("paris_cl_accounts", JSON.stringify(existingAccounts));

    setSuccess(
      "Luxury account generated successfully! Redirecting to secure login gateway...",
    );

    setTimeout(() => {
      onRouteChange("login");
    }, 1800);
  };

  return (
    <div className="register-container" id="registration-module">
      {/* Top Banner Accent */}
      <div className="register-accent-bar"></div>

      <button
        onClick={() => onRouteChange("login")}
        className="register-back-btn">
        <ArrowLeft className="w-3.5 h-3.5" /> Back to Sign In
      </button>

      <div className="register-header">
        <span className="register-subtitle">New Member Registry</span>
        <h2 className="register-title">Create Luxury Account</h2>
        <div className="register-divider"></div>
      </div>

      {error && <div className="register-error-alert">⚠️ {error}</div>}

      {success && <div className="register-success-alert">✨ {success}</div>}

      <form onSubmit={handleRegisterSubmit} className="register-form">
        {/* Full Name */}
        <div className="register-form-group">
          <label className="register-form-label">Full Name</label>
          <div className="register-input-wrapper">
            <User className="register-input-icon" />
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Aditya Sharma"
              className="register-input-field"
              required
            />
          </div>
        </div>

        {/* Email Address */}
        <div className="register-form-group">
          <label className="register-form-label">Email Address</label>
          <div className="register-input-wrapper">
            <Mail className="register-input-icon" />
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@domain.com"
              className="register-input-field"
              required
            />
          </div>
        </div>

        {/* Mobile Phone */}
        <div className="register-form-group">
          <label className="register-form-label">Contact Number</label>
          <div className="register-input-wrapper">
            <Phone className="register-input-icon" />
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 XXXXX XXXXX"
              className="register-input-field"
              required
            />
          </div>
        </div>

        {/* Password */}
        <div className="register-form-group">
          <label className="register-form-label">Select secure password</label>
          <div className="register-input-wrapper">
            <Lock className="register-input-icon" />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Min 6 characters"
              className="register-input-field register-password-field"
              required
            />
          </div>
        </div>

        {/* Confirm Password */}
        <div className="register-form-group">
          <label className="register-form-label">Confirm secure password</label>
          <div className="register-input-wrapper">
            <Lock className="register-input-icon" />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm password"
              className="register-input-field register-password-field"
              required
            />
          </div>
        </div>

        {/* Consent checkbox */}
        <div className="register-consent-row">
          <input
            type="checkbox"
            id="marketing-consent"
            className="register-consent-checkbox"
            defaultChecked
            required
          />
          <label htmlFor="marketing-consent" className="register-consent-label">
            I certify the accuracy of these details and agree to receive secure
            tracker PINs, billing invoices, and complimentary jewelry inspection
            updates from Paris Jewellers.
          </label>
        </div>

        <button
          type="submit"
          className="register-submit-btn"
          id="btn-register-submit">
          Create Luxury Account <ShieldCheck className="w-4 h-4" />
        </button>
      </form>

      <div className="register-footer">
        <p className="register-switch-text">
          Already a Member?{" "}
          <button
            onClick={() => onRouteChange("login")}
            className="register-switch-btn">
            Sign In Here
          </button>
        </p>
      </div>
    </div>
  );
}

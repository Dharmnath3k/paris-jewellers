import { useState } from "react";
import { Check, ShieldCheck, Mail, Lock, CreditCard, ChevronDown, Building2 } from "lucide-react";
import { formatCurrency } from "../lib/api";
import "./CheckoutPageView.css";

const indianStates = [
  { code: "DL", name: "Delhi NCR", tax: 0.03 },
  { code: "MH", name: "Maharashtra", tax: 0.03 },
  { code: "KA", name: "Karnataka", tax: 0.03 },
  { code: "TN", name: "Tamil Nadu", tax: 0.03 },
  { code: "TS", name: "Telangana", tax: 0.03 },
  { code: "HR", name: "Haryana", tax: 0.03 }
];

export default function CheckoutView({ cart, onClearCart }) {
  // Input fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [activeState, setActiveState] = useState(indianStates[0]);
  const [pinCode, setPinCode] = useState("");
  const [phone, setPhone] = useState("");
  
  // Razorpay simulation states
  const [showRazorpayModal, setShowRazorpayModal] = useState(false);
  const [rzpPaymentMethod, setRzpPaymentMethod] = useState("upi");
  const [rzpCardNumber, setRzpCardNumber] = useState("");
  const [rzpCardExpiry, setRzpCardExpiry] = useState("");
  const [rzpCardCVV, setRzpCardCVV] = useState("");
  const [rzpUpiId, setRzpUpiId] = useState("");
  const [rzpSelectedBank, setRzpSelectedBank] = useState("sbi");

  // Workflow states
  const [isProcessing, setIsProcessing] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [generatedOrderNumber, setGeneratedOrderNumber] = useState("");

  // Mathematics
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  
  // Insured delivery inside India at ₹50,000+ is free, otherwise ₹950 standard courier charge
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 950;
  const taxCost = Math.floor(subtotal * activeState.tax);
  const grandTotal = subtotal + shipping + taxCost;

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!email || !firstName || !lastName || !address || !city || !pinCode || !phone) {
      alert("Please check that all mandatory courier shipping fields are correctly entered!");
      return;
    }

    setShowRazorpayModal(true);
  };

  const handleRazorpayPaymentSubmit = (e) => {
    e.preventDefault();
    
    if (rzpPaymentMethod === "upi" && !rzpUpiId) {
      alert("Please enter a valid UPI ID (e.g., name@okicici)!");
      return;
    }
    if (rzpPaymentMethod === "card") {
      if (rzpCardNumber.replace(/\s/g, "").length < 12 || !rzpCardExpiry || rzpCardCVV.length < 3) {
        alert("Please enter valid card parameters (number, expiry, CVV)!");
        return;
      }
    }

    setIsProcessing(true);

    setTimeout(() => {
      setIsProcessing(false);
      setShowRazorpayModal(false);
      setIsSuccess(true);
      const generatedNo = "PJ-IN-2026-" + Math.floor(100000 + Math.random() * 900000);
      setGeneratedOrderNumber(generatedNo);

      // Save order in localStorage so it can be tracked live in OrderStatusPageView
      try {
        const existingOrders = JSON.parse(localStorage.getItem("paris_cl_orders") || "[]");
        const firstCartItem = cart[0];
        
        const newOrder = {
          orderNumber: generatedNo,
          email: email.toLowerCase(),
          name: `${firstName} ${lastName}`,
          date: new Date().toISOString().split('T')[0], // YYYY-MM-DD
          productName: firstCartItem ? firstCartItem.product.name : "Luxury Solitaire Setting",
          selectedMetal: firstCartItem ? firstCartItem.selectedMetal : "18Kt Yellow Gold",
          price: firstCartItem ? firstCartItem.product.price : subtotal,
          totalBilled: grandTotal,
          imageUrl: firstCartItem && firstCartItem.product.images ? firstCartItem.product.images[0] : "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
          status: "pending", // initial status
          address: address,
          city: city,
          pinCode: pinCode,
          courierName: "Blue Dart Insured Safe-Transit"
        };
        
        existingOrders.unshift(newOrder);
        localStorage.setItem("paris_cl_orders", JSON.stringify(existingOrders));
      } catch (e) {
        console.error("Local order persistence error:", e);
      }

      onClearCart();
    }, 2800); // simulated Razorpay gateway latency
  };

  const handleStateChange = (e) => {
    const code = e.target.value;
    const state = indianStates.find(s => s.code === code);
    if (state) {
      setActiveState(state);
    }
  };

  if (isSuccess) {
    return (
      <div className="checkout-success-slate">
        <div className="success-shield-circle" style={{ backgroundColor: "#c3a475" }}>
          <Check className="w-10 h-10" style={{ strokeWidth: "3px", color: "#ffffff" }} />
        </div>
        
        <div className="success-header-group">
          <span className="success-badge-tag" style={{ color: "#c3a475", borderColor: "#c3a475" }}>
            Order Securely Confirmed
          </span>
          <h2 className="success-title-gorgeous">Your Story of Love is Celebrated!</h2>
          <p className="success-body-p">
            Thank you, <strong>{firstName} {lastName}</strong>. Your payment was verified securely via Razorpay, and your custom Paris Jewellers order is officially registered in our regional distribution warehouse. A complimentary, luxury velvet jewelry case with secure transit tracking has been applied.
          </p>
        </div>

        {/* Invoice Summary Receipt Card */}
        <div className="invoice-receipt-card">
          <div className="invoice-header-row">
            <span>Customer Receipt Invoice</span>
            <span className="invoice-order-no">{generatedOrderNumber}</span>
          </div>

          <div className="invoice-specs-scent">
            <div className="invoice-spec-item">
              <span>Customer Email Link</span>
              <span>{email}</span>
            </div>
            <div className="invoice-spec-item">
              <span>Delivery Address</span>
              <span style={{ wordBreak: "break-all", maxWidth: "200px", textAlign: "right" }}>
                {address}, {city}, {activeState.name} - {pinCode}
              </span>
            </div>
            <div className="invoice-spec-item">
              <span>Payment Protocol</span>
              <span style={{ color: "#c3a475", fontWeight: 700, textTransform: "uppercase" }}>
                Razorpay ({rzpPaymentMethod.toUpperCase()})
              </span>
            </div>
          </div>

          <div className="invoice-specs-divider" />

          <div className="invoice-total-row">
            <span>Purchase Total Billed</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>
        </div>

        <div className="success-notice-pillow">
          <Building2 className="w-5 h-5 text-gold-champagne shrink-0" style={{ color: "#c3a475" }} />
          <div className="success-notice-msg">
            <strong>What happens next?</strong> Our master jewelers will inspect, sonically polish, and package your piece within 24 hours. A FedEx/Blue Dart trackable dispatch code will be wired directly to <strong>{email}</strong>.
          </div>
        </div>

        <button
          onClick={() => window.location.reload()}
          className="success-home-cta-btn"
        >
          Return to Home Center
        </button>
      </div>
    );
  }

  return (
    <div className="checkout-container">
      
      {/* Page Title */}
      <div className="checkout-title-header">
        <span className="checkout-title-sub">Secure Gateways</span>
        <h1 className="checkout-title-h1">Shipping & Checkout</h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="checkout-split-grid">
        
        {/* Left Side fields components (8 cols) */}
        <div className="checkout-inputs-panel">
          
          {/* Customer info section */}
          <div className="checkout-brick-station">
            <h3 className="checkout-station-title">
              <Mail className="w-4 h-4" style={{ color: "#c3a475" }} /> 1. Customer Contact Details
            </h3>
            
            <div className="input-row-halves">
              <div className="input-control-glove">
                <label className="input-label-tag">Email Address (Invoicing)</label>
                <input 
                  type="email" 
                  required
                  placeholder="name@domain.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="checkout-styled-input"
                />
              </div>
              <div className="input-control-glove">
                <label className="input-label-tag">Mobile Number (Courier SMS Alerts)</label>
                <input 
                  type="tel" 
                  required
                  placeholder="+91 XXXXX XXXXX"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="checkout-styled-input"
                />
              </div>
            </div>
          </div>

          {/* Delivery Courier Address */}
          <div className="checkout-brick-station">
            <h3 className="checkout-station-title">
              📦 2. Safe Insured Express India Courier Address
            </h3>

            <div className="input-row-halves">
              <div className="input-control-glove">
                <label className="input-label-tag">First Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Aditya"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="checkout-styled-input"
                />
              </div>
              <div className="input-control-glove">
                <label className="input-label-tag">Last Name</label>
                <input 
                  type="text" 
                  required
                  placeholder="Sharma"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="checkout-styled-input"
                />
              </div>
            </div>

            <div className="input-control-glove">
              <label className="input-label-tag">Delivery Street Address</label>
              <input 
                type="text" 
                required
                placeholder="Apartment, unit, villa or suite number, street name"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="checkout-styled-input"
              />
            </div>

            <div className="input-row-thirds">
              <div className="input-control-glove">
                <label className="input-label-tag">City</label>
                <input 
                  type="text" 
                  required
                  placeholder="Mumbai"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="checkout-styled-input"
                />
              </div>
              
              <div className="input-control-glove">
                <label className="input-label-tag">State (GST Location)</label>
                <div className="select-container-pillow">
                  <select
                    value={activeState.code}
                    onChange={handleStateChange}
                    className="checkout-styled-input"
                    style={{ appearance: "none", fontWeight: 600 }}
                  >
                    {indianStates.map((s) => (
                      <option key={s.code} value={s.code}>{s.name}</option>
                    ))}
                  </select>
                  <ChevronDown className="w-4 h-4 select-arrow-deco" />
                </div>
              </div>

              <div className="input-control-glove">
                <label className="input-label-tag">PIN Code (6 digits)</label>
                <input 
                  type="text" 
                  maxLength={6}
                  required
                  placeholder="400013"
                  value={pinCode}
                  onChange={(e) => setPinCode(e.target.value)}
                  className="checkout-styled-input"
                  style={{ fontWeight: 600, fontFamily: "monospace" }}
                />
              </div>
            </div>
          </div>

          {/* Secure Payment details */}
          <div className="checkout-brick-station">
            <h3 className="checkout-station-title">
              <Lock className="w-4 h-4" style={{ color: "#c3a475" }} /> 3. Secure Razorpay Payment Checkout
            </h3>

            <div className="razorpay-direct-info-card" style={{ border: "1px solid #c3a475", padding: "16px", borderRadius: "2px", backgroundColor: "#fafcfc" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                <span style={{ fontSize: "11px", fontWeight: "800", color: "#c3a475", letterSpacing: "0.1em", textTransform: "uppercase" }}>RAZORPAY SECURE ENCRYPTED</span>
                <span style={{ fontSize: "11px", color: "#10b981", fontWeight: "700" }}>● READY TO PAY</span>
              </div>
              <p style={{ fontSize: "12px", color: "#52525b", lineHeight: "1.6", margin: "0 0 12px 0" }}>
                Your order is processed instantly via the secure **Razorpay** platform. Click "Pay Securely via Razorpay" to trigger the Razorpay overlay pop-up, supporting UPI, credit/debit cards, and all Indian Netbanking services.
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px" }}>
                <span style={{ fontSize: "10px", padding: "4px 8px", backgroundColor: "#f4f4f5", borderRadius: "1px", fontWeight: "600", color: "#18181b" }}>⚡ Bhim UPI / GPAY / PHONEPE</span>
                <span style={{ fontSize: "10px", padding: "4px 8px", backgroundColor: "#f4f4f5", borderRadius: "1px", fontWeight: "600", color: "#18181b" }}>💳 Visa, MasterCard, RuPay Card</span>
                <span style={{ fontSize: "10px", padding: "4px 8px", backgroundColor: "#f4f4f5", borderRadius: "1px", fontWeight: "600", color: "#18181b" }}>🏦 ALL INDIAN NETBANKING</span>
              </div>
            </div>
          </div>

        </div>

        {/* Right Side summary column (4 cols) */}
        <div className="checkout-summary-column">
          <h3 className="totals-card-title">
            Order Secure Review
          </h3>

          {/* Render individual items briefly */}
          <div className="summary-items-basket">
            {cart.map((item, idx) => (
              <div key={idx} className="basket-item-row">
                <img 
                  src={item.product.images[0]} 
                  alt={item.product.name} 
                  referrerPolicy="no-referrer"
                  className="basket-item-img"
                />
                <div className="basket-item-p-meta">
                  <h4 className="basket-item-name">{item.product.name}</h4>
                  <span className="basket-item-details">Qty: {item.quantity} • {item.selectedMetal}</span>
                </div>
                <span className="basket-item-cost">
                  {formatCurrency(item.product.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ width: "100%", height: "1px", backgroundColor: "#f1f1f1" }} />

          {/* Pricing parameters calculations */}
          <div className="totals-items-scent" style={{ paddingBottom: "12px", borderBottom: "1px solid #f1f1f1" }}>
            <div className="totals-row-item">
              <span>Catalog Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="totals-row-item">
              <span>FedEx/Express Delivery</span>
              <span style={{ color: "#c3a475", fontWeight: 600 }}>
                {shipping === 0 ? "Complimentary Insured" : formatCurrency(shipping)}
              </span>
            </div>
            <div className="totals-row-item">
              <span>Standard GST Tax (3%)</span>
              <span>{formatCurrency(taxCost)}</span>
            </div>
          </div>

          {/* Grand totals display */}
          <div className="totals-row-final">
            <span style={{ fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em" }}>Total Billed</span>
            <span>{formatCurrency(grandTotal)}</span>
          </div>

          {/* New Razorpay CTA */}
          <button
            type="submit"
            className="place-order-cta-btn"
            style={{ backgroundColor: "#c3a475" }}
            id="place-order-submit"
          >
            <ShieldCheck className="w-5 h-5" style={{ color: "#ffffff" }} /> Pay Securely via Razorpay
          </button>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px", fontSize: "9px", color: "#9ca3af", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em" }}>
            <span>🛡️ SSL Secured Encryption</span>
            <span>•</span>
            <span>💎 BIS Hallmarked Standard</span>
          </div>
        </div>

      </form>

      {/* simulated RAZORPAY MODAL COMPONENT */}
      {showRazorpayModal && (
        <div className="rzp-backdrop-shield" style={{
          position: "fixed",
          inset: 0,
          backgroundColor: "rgba(10, 15, 30, 0.75)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: "16px",
          fontFamily: "Inter, sans-serif"
        }}>
          <div className="rzp-dialog-box" style={{
            width: "100%",
            maxWidth: "460px",
            backgroundColor: "#ffffff",
            borderRadius: "6px",
            boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.25)",
            overflow: "hidden",
            border: "1px solid #eaeaea",
            textAlign: "left"
          }}>
            {/* RZP Header */}
            <div style={{
              background: "linear-gradient(135deg, #092c5c 0%, #164082 100%)",
              padding: "18px 24px",
              color: "#ffffff",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center"
            }}>
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
                  <div style={{
                    width: "18px",
                    height: "18px",
                    backgroundColor: "#3399ff",
                    borderRadius: "3px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "900",
                    fontSize: "11px",
                    color: "#ffffff"
                  }}>R</div>
                  <span style={{ fontSize: "14px", fontWeight: "700", letterSpacing: "0.03em" }}>Razorpay Secure</span>
                </div>
                <div style={{ fontSize: "10px", color: "rgba(255,255,255,0.7)", marginTop: "2px" }}>
                  Billed to: {firstName} ({phone || "Customer"})
                </div>
              </div>
              <button 
                type="button"
                onClick={() => setShowRazorpayModal(false)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#ffffff",
                  fontSize: "20px",
                  cursor: "pointer",
                  outline: "none"
                }}
              >×</button>
            </div>

            {/* RZP Info Header */}
            <div style={{
              backgroundColor: "#f5f8fc",
              padding: "12px 24px",
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderBottom: "1px solid #e1e7f0"
            }}>
              <span style={{ fontSize: "12px", color: "#475569", fontWeight: "600" }}>Paris Jewellers India</span>
              <span style={{ fontSize: "15px", color: "#092c5c", fontWeight: "800" }}>
                {formatCurrency(grandTotal)}
              </span>
            </div>

            {/* RZP Form options */}
            <form onSubmit={handleRazorpayPaymentSubmit} style={{ padding: "20px 24px" }}>
              {isProcessing ? (
                <div style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  padding: "40px 0",
                  textAlign: "center"
                }}>
                  <div className="rzp-dual-ring" style={{
                    display: "inline-block",
                    width: "48px",
                    height: "48px",
                    border: "3px solid #3399ff",
                    borderRadius: "50%",
                    borderTopColor: "transparent",
                    animation: "spin 1s linear infinite",
                    marginBottom: "16px"
                  }} />
                  <p style={{ fontSize: "13px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                    Processing Safe Payment via Razorpay...
                  </p>
                  <p style={{ fontSize: "11px", color: "#64748b", marginTop: "4px" }}>
                    Please do not close this window or reload the page.
                  </p>
                </div>
              ) : (
                <>
                  <p style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.05em", color: "#64748b", margin: "0 0 12px 0" }}>
                    SELECT PREFERRED PAYMENT OPTION:
                  </p>

                  {/* Payment option selectors */}
                  <div style={{ display: "flex", gap: "6px", marginBottom: "16px" }}>
                    <button
                      type="button"
                      onClick={() => setRzpPaymentMethod("upi")}
                      style={{
                        flex: 1,
                        padding: "10px",
                        fontSize: "11px",
                        fontWeight: "700",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: rzpPaymentMethod === "upi" ? "#3399ff" : "#e2e8f0",
                        backgroundColor: rzpPaymentMethod === "upi" ? "#eff6ff" : "#ffffff",
                        color: rzpPaymentMethod === "upi" ? "#1d4ed8" : "#475569",
                        cursor: "pointer",
                        outline: "none"
                      }}
                    >
                      ⚡ BHIM UPI
                    </button>
                    <button
                      type="button"
                      onClick={() => setRzpPaymentMethod("card")}
                      style={{
                        flex: 1,
                        padding: "10px",
                        fontSize: "11px",
                        fontWeight: "700",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: rzpPaymentMethod === "card" ? "#3399ff" : "#e2e8f0",
                        backgroundColor: rzpPaymentMethod === "card" ? "#eff6ff" : "#ffffff",
                        color: rzpPaymentMethod === "card" ? "#1d4ed8" : "#475569",
                        cursor: "pointer",
                        outline: "none"
                      }}
                    >
                      💳 Card Pay
                    </button>
                    <button
                      type="button"
                      onClick={() => setRzpPaymentMethod("netbanking")}
                      style={{
                        flex: 1,
                        padding: "10px",
                        fontSize: "11px",
                        fontWeight: "700",
                        borderRadius: "4px",
                        border: "1px solid",
                        borderColor: rzpPaymentMethod === "netbanking" ? "#3399ff" : "#e2e8f0",
                        backgroundColor: rzpPaymentMethod === "netbanking" ? "#eff6ff" : "#ffffff",
                        color: rzpPaymentMethod === "netbanking" ? "#1d4ed8" : "#475569",
                        cursor: "pointer",
                        outline: "none"
                      }}
                    >
                      🏦 Netbanking
                    </button>
                  </div>

                  {/* Option screens */}
                  {rzpPaymentMethod === "upi" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Enter UPI ID / VPA</label>
                        <input
                          type="text"
                          required={rzpPaymentMethod === "upi"}
                          placeholder="paytmuser@paytm"
                          value={rzpUpiId}
                          onChange={(e) => setRzpUpiId(e.target.value)}
                          style={{
                            width: "100%",
                            height: "38px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            padding: "0 12px",
                            fontSize: "12px",
                            outline: "none",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "12px",
                        backgroundColor: "#f8fafc",
                        border: "1px solid #e2e8f0",
                        padding: "10px",
                        borderRadius: "4px",
                        boxSizing: "border-box"
                      }}>
                        <div style={{
                          width: "50px",
                          height: "50px",
                          backgroundColor: "#ffffff",
                          border: "1px solid #cbd5e1",
                          borderRadius: "3px",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "8px",
                          fontWeight: "bold",
                          color: "#c3a475",
                          textAlign: "center"
                        }}>
                          [QR CODE]
                        </div>
                        <div>
                          <p style={{ fontSize: "11px", fontWeight: "700", color: "#1e293b", margin: 0 }}>
                            Scan QR with GPay / PhonePe
                          </p>
                          <p style={{ fontSize: "9px", color: "#64748b", margin: "2px 0 0 0" }}>
                            You can also scan this 3D code directly using your camera.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {rzpPaymentMethod === "card" && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                      <div>
                        <label style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Card Number</label>
                        <input
                          type="text"
                          required={rzpPaymentMethod === "card"}
                          placeholder="4315 8890 2345 6789"
                          value={rzpCardNumber}
                          onChange={(e) => setRzpCardNumber(e.target.value)}
                          style={{
                            width: "100%",
                            height: "38px",
                            border: "1px solid #cbd5e1",
                            borderRadius: "4px",
                            padding: "0 12px",
                            fontSize: "12px",
                            fontFamily: "monospace",
                            letterSpacing: "0.08em",
                            outline: "none",
                            boxSizing: "border-box"
                          }}
                        />
                      </div>
                      <div style={{ display: "flex", gap: "12px" }}>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>Expiry MM/YY</label>
                          <input
                            type="text"
                            required={rzpPaymentMethod === "card"}
                            placeholder="09/29"
                            value={rzpCardExpiry}
                            onChange={(e) => setRzpCardExpiry(e.target.value)}
                            style={{
                              width: "100%",
                              height: "38px",
                              border: "1px solid #cbd5e1",
                              borderRadius: "4px",
                              padding: "0 12px",
                              fontSize: "12px",
                              fontFamily: "monospace",
                              outline: "none",
                              boxSizing: "border-box"
                            }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <label style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "4px" }}>CVV</label>
                          <input
                            type="password"
                            required={rzpPaymentMethod === "card"}
                            placeholder="•••"
                            maxLength={3}
                            value={rzpCardCVV}
                            onChange={(e) => setRzpCardCVV(e.target.value)}
                            style={{
                              width: "100%",
                              height: "38px",
                              border: "1px solid #cbd5e1",
                              borderRadius: "4px",
                              padding: "0 12px",
                              fontSize: "12px",
                              fontFamily: "monospace",
                              outline: "none",
                              boxSizing: "border-box"
                            }}
                          />
                        </div>
                      </div>
                    </div>
                  )}

                  {rzpPaymentMethod === "netbanking" && (
                    <div>
                      <label style={{ fontSize: "10px", fontWeight: "700", color: "#64748b", textTransform: "uppercase", display: "block", marginBottom: "6px" }}>Select Bank</label>
                      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "8px", marginBottom: "12px" }}>
                        <button
                          type="button"
                          onClick={() => setRzpSelectedBank("sbi")}
                          style={{
                            padding: "8px",
                            fontSize: "10px",
                            fontWeight: rzpSelectedBank === "sbi" ? "700" : "500",
                            border: "1px solid",
                            borderColor: rzpSelectedBank === "sbi" ? "#3399ff" : "#e2e8f0",
                            backgroundColor: rzpSelectedBank === "sbi" ? "#f0f7ff" : "#ffffff",
                            textAlign: "center",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          🏦 State Bank Of India
                        </button>
                        <button
                          type="button"
                          onClick={() => setRzpSelectedBank("hdfc")}
                          style={{
                            padding: "8px",
                            fontSize: "10px",
                            fontWeight: rzpSelectedBank === "hdfc" ? "700" : "500",
                            border: "1px solid",
                            borderColor: rzpSelectedBank === "hdfc" ? "#3399ff" : "#e2e8f0",
                            backgroundColor: rzpSelectedBank === "hdfc" ? "#f0f7ff" : "#ffffff",
                            textAlign: "center",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          🏦 HDFC Bank
                        </button>
                        <button
                          type="button"
                          onClick={() => setRzpSelectedBank("icici")}
                          style={{
                            padding: "8px",
                            fontSize: "10px",
                            fontWeight: rzpSelectedBank === "icici" ? "700" : "500",
                            border: "1px solid",
                            borderColor: rzpSelectedBank === "icici" ? "#3399ff" : "#e2e8f0",
                            backgroundColor: rzpSelectedBank === "icici" ? "#f0f7ff" : "#ffffff",
                            textAlign: "center",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          🏦 ICICI Bank
                        </button>
                        <button
                          type="button"
                          onClick={() => setRzpSelectedBank("axis")}
                          style={{
                            padding: "8px",
                            fontSize: "10px",
                            fontWeight: rzpSelectedBank === "axis" ? "700" : "500",
                            border: "1px solid",
                            borderColor: rzpSelectedBank === "axis" ? "#3399ff" : "#e2e8f0",
                            backgroundColor: rzpSelectedBank === "axis" ? "#f0f7ff" : "#ffffff",
                            textAlign: "center",
                            borderRadius: "4px",
                            cursor: "pointer"
                          }}
                        >
                          🏦 Axis Bank
                        </button>
                      </div>
                    </div>
                  )}

                  {/* PCI stamp */}
                  <div style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "6px",
                    color: "#64748b",
                    fontSize: "10px",
                    justifyContent: "center",
                    marginTop: "20px",
                    marginBottom: "16px"
                  }}>
                    <span>🛡️ Secure PCI-DSS Level 1 Encrypted Connection</span>
                  </div>

                  {/* Submission CTA */}
                  <button
                    type="submit"
                    style={{
                      width: "100%",
                      height: "44px",
                      backgroundColor: "#3399ff",
                      color: "#ffffff",
                      fontSize: "13px",
                      fontWeight: "700",
                      borderRadius: "4px",
                      border: "none",
                      cursor: "pointer",
                      transition: "background-color 0.2s"
                    }}
                  >
                    PAY {formatCurrency(grandTotal)} SECURELY NOW
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      )}

    </div>
  );
}

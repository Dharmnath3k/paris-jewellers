import { useState, useEffect } from "react";
import {
  Search,
  MapPin,
  Truck,
  CheckCircle2,
  Package,
  ShieldCheck,
  Clock,
  User,
  LogOut,
  ArrowRight,
} from "lucide-react";
import { formatCurrency } from "../lib/api";
import "./OrderStatusPageView.css";

const initialSampleOrders = [
  {
    orderNumber: "PJ-IN-2026-102554",
    email: "admin@paris.com",
    name: "Pranav Mehra",
    date: "2026-05-28",
    productName: "Glow Classic Solitaire Ring",
    selectedMetal: "18Kt Rose Gold",
    price: 68600,
    totalBilled: 71608,
    imageUrl:
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    status: "polished", // pending, crafting, polished, shipped, delivered
    address: "B-402 Shanti Niketan, Chanakyapuri",
    city: "New Delhi",
    pinCode: "110021",
    courierName: "Blue Dart Insured",
  },
  {
    orderNumber: "PJ-IN-2026-382901",
    email: "guest@paris.com",
    name: "Aditya Sharma",
    date: "2026-05-12",
    productName: "Vintage Chantilly Ring",
    selectedMetal: "14Kt Yellow Gold",
    price: 125000,
    totalBilled: 128750,
    imageUrl:
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
    status: "delivered",
    address: "Flat 101, Sea Breeze Apartments, Bandra West",
    city: "Mumbai",
    pinCode: "400050",
    courierName: "FedEx Express (Hand Delivered)",
  },
  {
    orderNumber: "PJ-IN-2026-884920",
    email: "admin@paris.com",
    name: "Pranav Mehra",
    date: "2026-06-01",
    productName: "Disney Enchanted Belle Ring",
    selectedMetal: "14Kt Rose Gold",
    price: 49500,
    totalBilled: 51935,
    imageUrl:
      "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=600&auto=format&fit=crop",
    status: "crafting",
    address: "B-402 Shanti Niketan, Chanakyapuri",
    city: "New Delhi",
    pinCode: "110021",
    courierName: "Blue Dart Insured",
  },
];

export default function OrderStatusPageView({
  currentUser,
  onLogout,
  onRouteChange,
}) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchResult, setActiveSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [allOrders, setAllOrders] = useState([]);

  // Load standard orders + any locally placed orders
  useEffect(() => {
    // Check local storage for orders placed through checkout
    const localPlacedOrders = JSON.parse(
      localStorage.getItem("paris_cl_orders") || "[]",
    );
    const merged = [...localPlacedOrders, ...initialSampleOrders];
    setAllOrders(merged);
  }, []);

  const handleTrackSearch = (e) => {
    e.preventDefault();
    setSearchError("");
    setActiveSearchResult(null);

    if (!searchQuery.trim()) {
      setSearchError("Please specify a valid invoice ID number or query.");
      return;
    }

    const queryClean = searchQuery.trim().toLowerCase();

    // Matching order number OR matching email addresses
    const found = allOrders.find(
      (ord) =>
        ord.orderNumber.toLowerCase() === queryClean ||
        ord.orderNumber.replace(/-/g, "").toLowerCase() ===
          queryClean.replace(/-/g, ""),
    );

    if (found) {
      setActiveSearchResult(found);
    } else {
      // Find sample orders that match email address query
      const matchingEmailOrders = allOrders.filter(
        (ord) => ord.email.toLowerCase() === queryClean,
      );
      if (matchingEmailOrders.length > 0) {
        // Just show the latest one or notify that the user should sign in to see multiple
        setActiveSearchResult(matchingEmailOrders[0]);
        setSearchError(
          `Found ${matchingEmailOrders.length} orders on this email. Displaying latest.`,
        );
      } else {
        setSearchError(
          "No active order registry found with that criteria. Please double check.",
        );
      }
    }
  };

  const getStepIndex = (status) => {
    switch (status) {
      case "pending":
        return 1;
      case "crafting":
        return 2;
      case "polished":
        return 3;
      case "shipped":
        return 4;
      case "delivered":
        return 5;
      default:
        return 1;
    }
  };

  const currentStatusMilestones = [
    {
      label: "Ordered Placed",
      desc: "Registered in Database",
      icon: CheckCircle2,
    },
    { label: "Crafting Studio", desc: "Master Jewellers Set", icon: Package },
    {
      label: "Quality Inspected",
      desc: "BIS Hallmark Certification",
      icon: ShieldCheck,
    },
    { label: "Expedited Transit", desc: "Insured Guard Dispatch", icon: Truck },
    { label: "Safe Handover", desc: "Delivered & Inspected", icon: MapPin },
  ];

  // User's own orders if logged in
  const userOrders = currentUser
    ? allOrders.filter(
        (ord) => ord.email.toLowerCase() === currentUser.email.toLowerCase(),
      )
    : [];

  return (
    <div className="order-workspace-container" id="order-status-workspace">
      {/* Title */}
      <div className="order-main-header">
        <span className="order-subtitle">Concierge Services</span>
        <h1 className="order-title">Order Tracking & Profiles</h1>
        <p className="order-desc">
          Verify the real-time dispatch progress, custom crafting stages, and
          BIS hallmarking progress of your Paris Jewellers purchases.
        </p>
        <div className="order-divider"></div>
      </div>

      {/* Main Grid: Left tracking input, Right Profile dashboard */}
      <div className="order-layout-grid">
        {/* Left Tracking Workspace */}
        <div className="order-tracking-column">
          <div className="order-accent-bar"></div>

          <h3 className="order-tracking-title">
            🔍 Track Your Purchase Shipment
          </h3>
          <p className="order-tracking-intro">
            No registration needed. Simply enter your Order Number (e.g.,{" "}
            <strong>PJ-IN-2026-102554</strong>) to track.
          </p>

          <form onSubmit={handleTrackSearch} className="tracker-search-form">
            <div className="tracker-input-wrapper">
              <Search className="tracker-input-icon" />
              <input
                type="text"
                placeholder="Enter Invoice Number (e.g., PJ-IN-2026-102554)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="tracker-input-field"
                id="inp-order-search"
              />
            </div>
            <button
              type="submit"
              className="tracker-search-btn"
              id="btn-order-search-submit">
              Verify Tracker
            </button>
          </form>

          {searchError && (
            <p className="tracker-error-text">⚠️ {searchError}</p>
          )}

          {/* If search query produced no active selected Result but user is logged in, default activeResult to first user order */}
          {!activeSearchResult && userOrders.length > 0 && (
            <div className="tracker-not-selected-box">
              <p className="tracker-not-selected-box-p">
                Select one of your accounts products below to inspect tracking
                status:
              </p>
              <div className="tracker-quick-select-panel">
                {userOrders.map((ord, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSearchResult(ord)}
                    className="tracker-quick-select-btn">
                    Select: {ord.orderNumber}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stepper details */}
          {activeSearchResult ? (
            <div className="tracker-details-area" id="active-tracking-display">
              {/* Summary Header */}
              <div className="tracker-result-header">
                <div className="tracker-header-info">
                  <span>Active Tracker Match</span>
                  <h4>{activeSearchResult.orderNumber}</h4>
                  <p>Billed on Date: {activeSearchResult.date}</p>
                </div>
                <div className="tracker-stage-badge">
                  Stage: {activeSearchResult.status.toUpperCase()}
                </div>
              </div>

              {/* Graphical Stepper */}
              <div>
                <div className="tracker-stepper-container">
                  {/* Stepper bar connector */}
                  <div className="tracker-stepper-line-bg">
                    <div
                      className={`tracker-stepper-line-fill ${
                        activeSearchResult.status === "pending"
                          ? "w-0"
                          : activeSearchResult.status === "crafting"
                            ? "w-1/4"
                            : activeSearchResult.status === "polished"
                              ? "w-1/2"
                              : activeSearchResult.status === "shipped"
                                ? "w-3/4"
                                : activeSearchResult.status === "delivered"
                                  ? "w-full"
                                  : "w-0"
                      }`}
                    />
                  </div>

                  {currentStatusMilestones.map((milestone, idx) => {
                    const stepNum = idx + 1;
                    const isActive =
                      stepNum <= getStepIndex(activeSearchResult.status);
                    const IconComp = milestone.icon;

                    return (
                      <div key={idx} className="step-node">
                        <div
                          className={`step-bubble ${
                            isActive
                              ? "step-bubble-active"
                              : "step-bubble-inactive"
                          }`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span
                          className={`step-label ${
                            isActive
                              ? "step-label-active"
                              : "step-label-inactive"
                          }`}>
                          {milestone.label}
                        </span>
                        <span className="step-description">
                          {milestone.desc}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Info Specs */}
              <div className="tracker-specs-area">
                {/* Image & Title Link */}
                <div className="tracker-specs-product">
                  <img
                    src={
                      activeSearchResult.imageUrl ||
                      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"
                    }
                    alt={activeSearchResult.productName}
                    referrerPolicy="no-referrer"
                    className="tracker-product-image"
                  />
                  <div className="tracker-product-meta">
                    <span className="tracker-product-tag">
                      Authenticated Item
                    </span>
                    <h5 className="tracker-product-title">
                      {activeSearchResult.productName}
                    </h5>
                    <p className="tracker-product-sub">
                      {activeSearchResult.selectedMetal}
                    </p>
                    <p className="tracker-product-value">
                      {formatCurrency(activeSearchResult.price)}
                    </p>
                  </div>
                </div>

                {/* Delivery Specifications */}
                <div className="tracker-specs-details">
                  <div className="tracker-spec-row">
                    <span className="tracker-spec-row-label">
                      Security Consignee
                    </span>
                    <strong className="tracker-spec-row-value">
                      {activeSearchResult.name}
                    </strong>
                  </div>
                  <div className="tracker-spec-row">
                    <span className="tracker-spec-row-label">
                      Secure Dispatch Target
                    </span>
                    <strong
                      className="tracker-spec-row-value"
                      title={`${activeSearchResult.address}, ${activeSearchResult.city}`}>
                      {activeSearchResult.address}, {activeSearchResult.city}
                    </strong>
                  </div>
                  <div className="tracker-spec-row">
                    <span className="tracker-spec-row-label">
                      Insured Transport Courier
                    </span>
                    <strong className="tracker-spec-row-value accent-gold">
                      {activeSearchResult.courierName || "Safe Transit Desk"}
                    </strong>
                  </div>
                  <div className="tracker-spec-row">
                    <span className="tracker-spec-row-label">
                      Grand Billed Total
                    </span>
                    <strong className="tracker-spec-row-value accent-gold">
                      {formatCurrency(activeSearchResult.totalBilled)}
                    </strong>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="tracker-empty-search">
              <p className="tracker-empty-search-p">
                No active shipment selected above. Enter a secure order invoice
                ID now.
              </p>
            </div>
          )}
        </div>

        {/* Right Dashboard panel */}
        <div className="order-profile-column">
          <div className="order-accent-bar"></div>

          {currentUser ? (
            <div className="member-profile-active" id="member-profile-active">
              {/* Member banner */}
              <div className="member-profile-header">
                <div className="member-avatar">
                  {currentUser.name ? currentUser.name.charAt(0) : "U"}
                </div>
                <span className="member-badge">Authenticated Member</span>
                <h4 className="member-name">{currentUser.name}</h4>
                <p className="member-email">{currentUser.email}</p>
              </div>

              {/* Member credentials details info */}
              <div className="member-summary-box">
                <div className="member-summary-row">
                  <span className="member-summary-label">Member Status</span>
                  <span className="member-summary-value accent-gold">
                    VIP Concierge
                  </span>
                </div>
                <div className="member-summary-row">
                  <span className="member-summary-label">Phone Code</span>
                  <span className="member-summary-value">
                    {currentUser.phone || "+91 98765 43210"}
                  </span>
                </div>
                <div className="member-summary-row">
                  <span className="member-summary-label">
                    Complimentary polish
                  </span>
                  <span className="member-summary-value accent-green">
                    2 Available / Year
                  </span>
                </div>
              </div>

              {/* Order history list under this member account */}
              <div className="member-orders-group">
                <h5 className="member-orders-headline">
                  Your Orders History ({userOrders.length})
                </h5>

                {userOrders.length > 0 ? (
                  <div className="member-history-list">
                    {userOrders.map((ord, idx) => (
                      <div
                        key={idx}
                        onClick={() => setActiveSearchResult(ord)}
                        className={`member-history-item ${
                          activeSearchResult?.orderNumber === ord.orderNumber
                            ? "member-history-item-active"
                            : "member-history-item-inactive"
                        }`}>
                        <div className="history-item-details-left">
                          <p className="history-item-no">{ord.orderNumber}</p>
                          <p className="history-item-product">
                            {ord.productName}
                          </p>
                        </div>
                        <div className="history-item-details-right">
                          <p className="history-item-price">
                            {formatCurrency(ord.totalBilled)}
                          </p>
                          <p
                            className={`history-item-status ${
                              activeSearchResult?.orderNumber ===
                              ord.orderNumber
                                ? "history-item-status-active"
                                : "history-item-status-inactive"
                            }`}>
                            {ord.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="member-empty-history-box">
                    <p className="member-empty-history-p">
                      You haven't placed any luxury brand orders yet. When you
                      complete checkout, your order will render in this panel.
                    </p>
                  </div>
                )}
              </div>

              {/* Logout button */}
              <button onClick={onLogout} className="close-session-btn">
                <LogOut className="w-3.5 h-3.5" /> Close Member Session
              </button>
            </div>
          ) : (
            <div
              className="member-profile-inactive"
              id="member-profile-inactive">
              <div className="profile-lock-avatar">
                <User className="w-5 h-5 text-[#c3a475]" />
              </div>
              <h4 className="profile-lock-title">Member Secure Vault</h4>
              <p className="profile-lock-desc">
                Log into your VIP account profile to easily check saved shipping
                cards, review unlimited order history databases, and redeem
                complimentary goldsmith cleaning tokens.
              </p>

              <button
                onClick={() => onRouteChange("login")}
                className="profile-login-action-btn">
                Sign Into Your Profile <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="profile-register-switch">
                New to Paris Jewellers?{" "}
                <button
                  onClick={() => onRouteChange("register")}
                  className="profile-register-btn">
                  Create registry
                </button>
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

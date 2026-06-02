import { useState, useEffect } from "react";
import { Search, MapPin, Truck, CheckCircle2, Package, ShieldCheck, Clock, User, LogOut, ArrowRight } from "lucide-react";
import { formatCurrency } from "../lib/api";

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
    imageUrl: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop",
    status: "polished", // pending, crafting, polished, shipped, delivered
    address: "B-402 Shanti Niketan, Chanakyapuri",
    city: "New Delhi",
    pinCode: "110021",
    courierName: "Blue Dart Insured"
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
    imageUrl: "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?q=80&w=600&auto=format&fit=crop",
    status: "delivered",
    address: "Flat 101, Sea Breeze Apartments, Bandra West",
    city: "Mumbai",
    pinCode: "400050",
    courierName: "FedEx Express (Hand Delivered)"
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
    imageUrl: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?q=80&w=600&auto=format&fit=crop",
    status: "crafting",
    address: "B-402 Shanti Niketan, Chanakyapuri",
    city: "New Delhi",
    pinCode: "110021",
    courierName: "Blue Dart Insured"
  }
];

export default function OrderStatusPageView({ currentUser, onLogout, onRouteChange }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeSearchResult, setActiveSearchResult] = useState(null);
  const [searchError, setSearchError] = useState("");
  const [allOrders, setAllOrders] = useState([]);

  // Load standard orders + any locally placed orders
  useEffect(() => {
    // Check local storage for orders placed through checkout
    const localPlacedOrders = JSON.parse(localStorage.getItem("paris_cl_orders") || "[]");
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
        ord.orderNumber.replace(/-/g, "").toLowerCase() === queryClean.replace(/-/g, "")
    );

    if (found) {
      setActiveSearchResult(found);
    } else {
      // Find sample orders that match email address query
      const matchingEmailOrders = allOrders.filter(
        (ord) => ord.email.toLowerCase() === queryClean
      );
      if (matchingEmailOrders.length > 0) {
        // Just show the latest one or notify that the user should sign in to see multiple
        setActiveSearchResult(matchingEmailOrders[0]);
        setSearchError(`Found ${matchingEmailOrders.length} orders on this email. Displaying latest.`);
      } else {
        setSearchError("No active order registry found with that criteria. Please double check.");
      }
    }
  };

  const getStepIndex = (status) => {
    switch (status) {
      case "pending": return 1;
      case "crafting": return 2;
      case "polished": return 3;
      case "shipped": return 4;
      case "delivered": return 5;
      default: return 1;
    }
  };

  const currentStatusMilestones = [
    { label: "Ordered Placed", desc: "Registered in Database", icon: CheckCircle2 },
    { label: "Crafting Studio", desc: "Master Jewellers Set", icon: Package },
    { label: "Quality Inspected", desc: "BIS Hallmark Certification", icon: ShieldCheck },
    { label: "Expedited Transit", desc: "Insured Guard Dispatch", icon: Truck },
    { label: "Safe Handover", desc: "Delivered & Inspected", icon: MapPin }
  ];

  // User's own orders if logged in
  const userOrders = currentUser
    ? allOrders.filter((ord) => ord.email.toLowerCase() === currentUser.email.toLowerCase())
    : [];

  return (
    <div className="max-w-6xl mx-auto my-12 px-4 sm:px-6" id="order-status-workspace">
      
      {/* Title */}
      <div className="text-center mb-12">
        <span className="text-[10px] uppercase tracking-widest font-semibold text-[#c3a475] block mb-2">
          Concierge Services
        </span>
        <h1 className="text-4xl font-serif text-[#23221f] leading-tight">Order Tracking & Profiles</h1>
        <p className="text-xs text-gray-500 font-medium max-w-md mx-auto mt-2">
          Verify the real-time dispatch progress, custom crafting stages, and BIS hallmarking progress of your Paris Jewellers purchases.
        </p>
        <div className="w-12 h-[1px] bg-[#c3a475] mx-auto mt-4"></div>
      </div>

      {/* Main Grid: Left tracking input, Right Profile dashboard */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Tracking Workspace */}
        <div className="lg:col-span-8 space-y-8 bg-white border border-[#e6dfd3] p-6 sm:p-8 relative">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#c3a475]"></div>

          <h3 className="text-xl font-serif text-[#23221f] flex items-center gap-2 mb-2">
            🔍 Track Your Purchase Shipment
          </h3>
          <p className="text-xs text-gray-500 mb-6 font-medium">
            No registration needed. Simply enter your Order Number (e.g., <span className="text-[#c3a475] font-bold select-all">PJ-IN-2026-102554</span>) to track.
          </p>

          <form onSubmit={handleTrackSearch} className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-3.5 w-4 h-4 text-[#c3a475]" />
              <input
                type="text"
                placeholder="Enter Invoice Number (e.g., PJ-IN-2026-102554)"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full h-11 pl-10 pr-4 border border-[#e6dfd3] focus:border-[#c3a475] text-xs font-semibold focus:outline-none bg-neutral-50 transition-colors"
                id="inp-order-search"
              />
            </div>
            <button
              type="submit"
              className="h-11 px-6 bg-[#23221f] hover:bg-[#c3a475] text-white text-xs font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-2 cursor-pointer"
              id="btn-order-search-submit"
            >
              Verify Tracker
            </button>
          </form>

          {searchError && (
            <p className="text-xs text-red-600 font-medium pt-2">
              ⚠️ {searchError}
            </p>
          )}

          {/* If search query produced no active selected Result but user is logged in, default activeResult to first user order */}
          {!activeSearchResult && userOrders.length > 0 && (
            <div className="p-4 bg-[#faf7f2] border border-[#e6dfd3] rounded-sm text-center">
              <p className="text-xs font-medium text-[#23221f] mb-3">
                Select one of your accounts products below to inspect tracking status:
              </p>
              <div className="flex flex-wrap gap-2 justify-center">
                {userOrders.map((ord, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveSearchResult(ord)}
                    className="px-3 py-1.5 bg-white border border-[#c3a475] text-[#23221f] text-[10px] font-bold hover:bg-[#23221f] hover:text-white transition-colors"
                  >
                    Select: {ord.orderNumber}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Stepper details */}
          {activeSearchResult ? (
            <div className="border-t border-[#f2ece2] pt-8 space-y-8" id="active-tracking-display">
              
              {/* Summary Header */}
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-neutral-50 p-4 border border-[#f2ece2]">
                <div>
                  <span className="text-[9px] uppercase tracking-wider font-bold text-gray-400 block mb-1">Active Tracker Match</span>
                  <h4 className="text-lg font-serif font-bold text-[#c3a475]">{activeSearchResult.orderNumber}</h4>
                  <p className="text-[10px] text-gray-500 font-semibold font-mono">Billed on Date: {activeSearchResult.date}</p>
                </div>
                <div className="bg-emerald-50 text-emerald-800 border border-emerald-100 px-3 py-1.5 rounded-sm select-none">
                  <div className="text-[10px] font-bold tracking-widest uppercase">
                    Stage: {activeSearchResult.status.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Graphical Stepper */}
              <div className="py-2">
                <div className="relative flex justify-between items-center w-full">
                  
                  {/* Stepper bar connector */}
                  <div className="absolute left-0 top-[22px] right-0 h-1 bg-gray-200 -z-10 rounded-full">
                    <div 
                      className="h-full bg-[#c3a475] transition-all duration-1000" 
                      style={{ width: `${((getStepIndex(activeSearchResult.status) - 1) / 4) * 100}%` }}
                    />
                  </div>

                  {currentStatusMilestones.map((milestone, idx) => {
                    const stepNum = idx + 1;
                    const isActive = stepNum <= getStepIndex(activeSearchResult.status);
                    const IconComp = milestone.icon;

                    return (
                      <div key={idx} className="flex flex-col items-center flex-1 position-relative text-center select-none">
                        <div className={`w-11 h-11 rounded-full border-2 flex items-center justify-center transition-all bg-white shadow-sm ${
                          isActive 
                            ? "border-[#c3a475] text-[#c3a475]" 
                            : "border-gray-200 text-gray-300"
                        }`}>
                          <IconComp className="w-5 h-5" />
                        </div>
                        <span className={`text-[10px] font-bold mt-2 tracking-wide uppercase ${
                          isActive ? "text-[#23221f]" : "text-gray-400"
                        }`}>
                          {milestone.label}
                        </span>
                        <span className="text-[8px] text-gray-400 max-w-[80px] leading-tight hidden md:inline mt-0.5">
                          {milestone.desc}
                        </span>
                      </div>
                    );
                  })}

                </div>
              </div>

              {/* Order Info Specs */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 pt-4 border-t border-[#f2ece2]">
                
                {/* Image & Title Link */}
                <div className="md:col-span-5 flex gap-4">
                  <img 
                    src={activeSearchResult.imageUrl || "https://images.unsplash.com/photo-1605100804763-247f67b3557e?q=80&w=600&auto=format&fit=crop"} 
                    alt={activeSearchResult.productName} 
                    referrerPolicy="no-referrer"
                    className="w-24 h-24 object-cover border border-[#e6dfd3] p-1 shrink-0"
                  />
                  <div className="space-y-1">
                    <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#c3a475]" style={{ letterSpacing: "0.15em" }}>Authenticated Item</span>
                    <h5 className="font-serif font-bold text-sm text-[#23221f]">{activeSearchResult.productName}</h5>
                    <p className="text-[10px] text-gray-500 font-semibold">{activeSearchResult.selectedMetal}</p>
                    <p className="text-xs font-serif font-bold text-[#c3a475] pt-1">{formatCurrency(activeSearchResult.price)}</p>
                  </div>
                </div>

                {/* Delivery Specifications */}
                <div className="md:col-span-7 space-y-3 text-xs bg-neutral-50 border border-[#f2ece2] p-4 text-[#23221f] font-medium">
                  <div className="flex justify-between border-b border-[#f2ece2] pb-1.5">
                    <span className="text-gray-500">Security Consignee</span>
                    <strong className="text-right">{activeSearchResult.name}</strong>
                  </div>
                  <div className="flex justify-between border-b border-[#f2ece2] pb-1.5">
                    <span className="text-gray-500">Secure Dispatch Target</span>
                    <strong className="text-right max-w-[180px] truncate" title={`${activeSearchResult.address}, ${activeSearchResult.city}`}>
                      {activeSearchResult.address}, {activeSearchResult.city}
                    </strong>
                  </div>
                  <div className="flex justify-between border-b border-[#f2ece2] pb-1.5">
                    <span className="text-gray-500">Insured Transport Courier</span>
                    <strong className="text-right font-semibold text-[#c3a475]">{activeSearchResult.courierName || "Safe Transit Desk"}</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Grand Billed Total</span>
                    <strong className="text-right text-[#c3a475]">{formatCurrency(activeSearchResult.totalBilled)}</strong>
                  </div>
                </div>

              </div>

            </div>
          ) : (
            <div className="border-t border-[#f2ece2] pt-8 text-center py-6 text-gray-400">
              <p className="text-xs italic font-medium">No active shipment selected above. Enter a secure order invoice ID now.</p>
            </div>
          )}

        </div>

        {/* Right Dashboard panel */}
        <div className="lg:col-span-4 bg-white border border-[#e6dfd3] p-6 relative">
          
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#c3a475]"></div>

          {currentUser ? (
            <div className="space-y-6" id="member-profile-active">
              
              {/* Member banner */}
              <div className="text-center pb-4 border-b border-[#f2ece2]">
                <div className="w-14 h-14 bg-[#faf7f2] border border-[#c3a475] rounded-full mx-auto flex items-center justify-center text-[#c3a475] font-serif text-xl font-semibold mb-2 shadow-sm">
                  {currentUser.name ? currentUser.name.charAt(0) : "U"}
                </div>
                <span className="text-[9px] uppercase tracking-wider font-extrabold text-[#c3a475]">Authenticated Member</span>
                <h4 className="text-xl font-serif text-[#23221f]">{currentUser.name}</h4>
                <p className="text-[10px] text-gray-500 font-medium font-mono">{currentUser.email}</p>
              </div>

              {/* Member credentials details info */}
              <div className="text-xs space-y-2 text-[#23221f] font-medium p-3 bg-[#faf7f2] border border-[#f2ece2] rounded-sm">
                <div className="flex justify-between">
                  <span className="text-gray-400">Member Status</span>
                  <span className="text-[#c3a475] font-bold">VIP Concierge</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Phone Code</span>
                  <span>{currentUser.phone || "+91 98765 43210"}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Complimentary polish</span>
                  <span className="text-emerald-700 font-semibold">2 Available / Year</span>
                </div>
              </div>

              {/* Order history list under this member account */}
              <div className="space-y-3">
                <h5 className="text-xs uppercase tracking-widest font-extrabold text-[#23221f]">Your Orders History ({userOrders.length})</h5>
                
                {userOrders.length > 0 ? (
                  <div className="space-y-2 max-h-[220px] overflow-y-auto pr-1">
                    {userOrders.map((ord, idx) => (
                      <div 
                        key={idx}
                        onClick={() => setActiveSearchResult(ord)}
                        className={`p-3 border text-left cursor-pointer transition-colors flex items-center justify-between ${
                          activeSearchResult?.orderNumber === ord.orderNumber
                            ? "bg-[#23221f] border-[#23221f] text-white"
                            : "bg-white hover:bg-neutral-50 border-[#e6dfd3]"
                        }`}
                      >
                        <div>
                          <p className="text-[10px] font-bold tracking-tight">{ord.orderNumber}</p>
                          <p className="text-[9px] text-gray-400 pt-0.5">{ord.productName}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[10px] font-bold font-serif text-[#c3a475]">{formatCurrency(ord.totalBilled)}</p>
                          <p className="text-[8px] uppercase tracking-wider font-extrabold text-emerald-600 font-mono mt-0.5" style={{ color: activeSearchResult?.orderNumber === ord.orderNumber ? "#c3a475" : "" }}>
                            {ord.status}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-[#e6dfd3] p-4 text-center rounded-sm">
                    <p className="text-[10px] italic text-gray-400">You haven't placed any luxury brand orders yet. When you complete checkout, your order will render in this panel.</p>
                  </div>
                )}
              </div>

              {/* Logout button */}
              <button
                onClick={onLogout}
                className="w-full h-10 border border-red-200 text-red-600 hover:bg-red-50 text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                <LogOut className="w-3.5 h-3.5" /> Close Member Session
              </button>

            </div>
          ) : (
            <div className="text-center py-8 space-y-4" id="member-profile-inactive">
              <div className="w-12 h-12 bg-[#faf7f2] border border-[#e6dfd3] rounded-full mx-auto flex items-center justify-center text-gray-400 font-serif text-lg mb-2 shadow-sm">
                <User className="w-5 h-5 text-[#c3a475]" />
              </div>
              <h4 className="text-lg font-serif text-[#23221f]">Member Secure Vault</h4>
              <p className="text-xs text-gray-500 leading-relaxed font-medium">
                Log into your VIP account profile to easily check saved shipping cards, review unlimited order history databases, and redeem complimentary goldsmith cleaning tokens.
              </p>
              
              <button
                onClick={() => onRouteChange("login")}
                className="w-full h-10 bg-[#23221f] hover:bg-[#c3a475] text-white text-[10px] font-bold uppercase tracking-widest transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
              >
                Sign Into Your Profile <ArrowRight className="w-3.5 h-3.5" />
              </button>

              <p className="text-[10px] text-gray-400 font-medium">
                New to Paris Jewellers?{" "}
                <button
                  onClick={() => onRouteChange("register")}
                  className="text-[#c3a475] font-bold hover:underline cursor-pointer"
                >
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

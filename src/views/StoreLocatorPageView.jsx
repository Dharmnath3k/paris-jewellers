import { useState, useMemo } from "react";
import { Search, MapPin, Phone, Clock, CalendarCheck, Check, Smile, Compass, AlertCircle } from "lucide-react";
import { storesData, provinces } from "../data/stores";
import "./StoreLocatorPageView.css";

export default function StoreLocatorView() {
  const [selectedProvince, setSelectedProvince] = useState("All Provinces");
  const [searchCityQuery, setSearchCityQuery] = useState("");
  const [selectedStoreForConsultation, setSelectedStoreForConsultation] = useState(null);

  // Form parameters
  const [bookDate, setBookDate] = useState("");
  const [bookTime, setBookTime] = useState("");
  const [bookName, setBookName] = useState("");
  const [bookEmail, setBookEmail] = useState("");
  const [bookingFinished, setBookingFinished] = useState(false);

  // Filtering lists of outlets
  const filteredStores = useMemo(() => {
    return storesData.filter((store) => {
      // 1. Filter by Province (mapped to State)
      if (selectedProvince !== "All Provinces" && store.province !== selectedProvince) return false;

      // 2. Filter by Search Query
      if (searchCityQuery.trim()) {
        const q = searchCityQuery.toLowerCase();
        const matchesCity = store.city.toLowerCase().includes(q);
        const matchesName = store.name.toLowerCase().includes(q);
        const matchesAddress = store.address.toLowerCase().includes(q);
        if (!matchesCity && !matchesName && !matchesAddress) return false;
      }
      return true;
    });
  }, [selectedProvince, searchCityQuery]);

  const handleBookingSubmit = (e) => {
    e.preventDefault();
    if (!bookDate || !bookTime || !bookName || !bookEmail || !selectedStoreForConsultation) {
      alert("Please complete the appointment scheduler details!");
      return;
    }

    setBookingFinished(true);
    setTimeout(() => {
      setBookingFinished(false);
      setSelectedStoreForConsultation(null);
      setBookDate("");
      setBookTime("");
      setBookName("");
      setBookEmail("");
    }, 5000);
  };

  return (
    <div className="sl-container">
      
      {/* Page Title */}
      <div className="sl-header">
        <div className="sl-header-left">
          <span className="sl-header-sub font-bold">Showroom Finder</span>
          <h1 className="sl-header-title">Store Locator ({storesData.length} Flagships)</h1>
        </div>
        <p className="sl-header-desc">
          Book an intimate, complimentary ring resizing, diamond curation, or styling session at any of our outlets.
        </p>
      </div>

      {/* Main split components layout */}
      <div className="sl-split-layout">
        
        {/* Left Side: Outlets lists controller and directory list */}
        <div className="sl-list-panel">
          
          {/* Controls Bar */}
          <div className="sl-filters-card">
            
            {/* Province drop selector */}
            <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
              <label className="sl-filters-lbl">Filter by state / territory</label>
              <div className="sl-filters-row">
                {provinces.map((prov) => (
                  <button
                    key={prov}
                    type="button"
                    onClick={() => setSelectedProvince(prov)}
                    className={`sl-filter-chip-btn ${selectedProvince === prov ? "chip-active" : "chip-inactive"}`}
                  >
                    {prov === "All Provinces" ? "🌍 All India" : prov}
                  </button>
                ))}
              </div>
            </div>

            {/* City Search counter */}
            <div className="sl-search-carrier">
              <input 
                type="text" 
                placeholder="Search state, city, center or PIN code..." 
                value={searchCityQuery}
                onChange={(e) => setSearchCityQuery(e.target.value)}
                className="sl-search-input"
              />
              <Search className="w-4 h-4 sl-search-icon" />
            </div>

          </div>

          {/* Core directories maps */}
          <div className="sl-stores-scroller">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <div 
                  key={store.id} 
                  className={`sl-store-card ${selectedStoreForConsultation?.id === store.id ? "store-active" : "store-inactive"}`}
                  id={`store-card-${store.id}`}
                >
                  <div className="sl-store-top-block">
                    <span className="sl-store-province-badge">
                      {store.province} Showroom
                    </span>
                    <h3 className="sl-store-title-h3">{store.name}</h3>
                    <p className="sl-store-address-p">
                      <MapPin className="w-4 h-4" style={{ color: "#c3a475", flexShrink: 0, marginTop: "2px" }} /> 
                      <span>{store.address}</span>
                    </p>
                  </div>

                  <div className="sl-store-hours-grid">
                    <div className="sl-store-hours-col">
                      <strong>Showroom Support</strong>
                      <span className="phone-link">
                        <Phone className="w-3 h-3" style={{ color: "#c3a475" }} /> {store.phone}
                      </span>
                    </div>
                    <div className="sl-store-hours-col">
                      <strong>Showroom Hours</strong>
                      <span>
                        Daily: {store.hours.weekdays}
                      </span>
                    </div>
                  </div>

                  {/* Actions appointments selectors */}
                  <button
                    onClick={() => {
                      setSelectedStoreForConsultation(store);
                      const container = document.getElementById("appointment-booking-block");
                      if (container) {
                        container.scrollIntoView({ behavior: "smooth" });
                      }
                    }}
                    className="sl-store-select-btn"
                  >
                    <CalendarCheck className="w-4 h-4" style={{ color: "#c3a475" }} /> Schedule consultation
                  </button>
                </div>
              ))
            ) : (
              <div className="sl-no-results">
                <AlertCircle className="w-8 h-8" style={{ color: "#c3a475" }} />
                <h4>No Showrooms Found</h4>
                <p>We currently operate flagships inside Maharashtra, Delhi NCR, Karnataka, Tamil Nadu, and Telangana. Try selecting other filters above.</p>
              </div>
            )}
          </div>

        </div>

        {/* Right Side: Showcase fake map layout + appointment booking */}
        <div className="sl-map-panel">
          
          {/* Mock Map canvas widget layout */}
          <div className="sl-mock-map-well">
            {/* Visual background lines representing a map */}
            <div className="map-deco-dot-grid" />
            <div className="map-deco-road-1" />
            <div className="map-deco-road-2" />
            
            <div className="sl-map-overlay-card">
              <Compass className="w-8 h-8 text-emerald-deep" style={{ color: "#c3a475" }} />
              <h3>Interactive Showroom Compass Grid</h3>
              {selectedStoreForConsultation ? (
                <div style={{ display: "flex", flexDirection: "column", gap: "2px" }}>
                  <p style={{ color: "#c3a475", fontWeight: 700 }}>Active center: {selectedStoreForConsultation.name}</p>
                  <p style={{ fontSize: "10px", color: "#a1a1aa" }}>{selectedStoreForConsultation.address}</p>
                </div>
              ) : (
                <p>Select an outlet from the left directory column to load physical vector coordinates and calculate shortest travel coordinates automatically.</p>
              )}
            </div>
          </div>

          {/* Booking appointment block form */}
          <div id="appointment-booking-block" className="sl-booking-card">
            <h3 className="sl-booking-title">
              📅 Personal Consultation Appointment Planner
            </h3>

            {bookingFinished ? (
              <div className="sl-booking-success">
                <div className="sl-booking-success-circle">
                  <Check className="w-5 h-5" style={{ strokeWidth: "3px" }} />
                </div>
                <h4 className="sl-booking-success-lbl">Appointment Booked!</h4>
                <p className="sl-booking-success-descr">
                  Excellent, <strong>{bookName}</strong>. A reservation notification has been wired to <strong>{bookEmail}</strong>. We look forward to greeting you on <strong>{bookDate}</strong> at <strong>{bookTime}</strong>.
                </p>
              </div>
            ) : selectedStoreForConsultation ? (
              <form onSubmit={handleBookingSubmit} style={{ display: "flex", flexDirection: "column", gap: "16px" }}>
                <div className="sl-booking-summary-well">
                  <p>Showroom Selected: {selectedStoreForConsultation.name}</p>
                  <p>{selectedStoreForConsultation.address}</p>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Your Name</label>
                    <input 
                      type="text" 
                      required
                      placeholder="Ananya Roy"
                      value={bookName}
                      onChange={(e) => setBookName(e.target.value)}
                      className="sl-search-input"
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Your Email Address</label>
                    <input 
                      type="email" 
                      required
                      placeholder="ananya@gmail.com"
                      value={bookEmail}
                      onChange={(e) => setBookEmail(e.target.value)}
                      className="sl-search-input"
                    />
                  </div>
                </div>

                <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "16px" }}>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Preferred Date</label>
                    <input 
                      type="date" 
                      required
                      value={bookDate}
                      onChange={(e) => setBookDate(e.target.value)}
                      className="sl-search-input"
                      style={{ fontWeight: 600, fontFamily: "monospace" }}
                    />
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
                    <label style={{ fontSize: "10px", fontWeight: 700, color: "#9ca3af", textTransform: "uppercase" }}>Preferred Time Slot</label>
                    <select
                      required
                      value={bookTime}
                      onChange={(e) => setBookTime(e.target.value)}
                      className="sl-search-input"
                      style={{ fontWeight: 600 }}
                    >
                      <option value="">Select a slot...</option>
                      <option value="11:30 AM">11:30 AM (Complimentary Curation)</option>
                      <option value="1:30 PM">01:30 PM (Custom Engagement Fitting)</option>
                      <option value="3:00 PM">03:00 PM (Anniversary & Fine Gifts)</option>
                      <option value="5:30 PM">05:30 PM (Evening styling consultancy)</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="sl-booking-submit-btn"
                >
                  Confirm In-Store Appointment Curation
                </button>
              </form>
            ) : (
              <div className="sl-empty-booking">
                <Smile className="w-8 h-8" style={{ color: "#c3a475" }} />
                <h4>No Store Selected</h4>
                <p>Please click &ldquo;Schedule consultation&rdquo; on any showroom card in the left list first to load the real-time calendar agenda fields.</p>
              </div>
            )}
          </div>

        </div>

      </div>
    </div>
  );
}

import { useState, useRef, useEffect } from "react";
import HeroSlider from "../components/HomeHeroSlider";
import ProductCard from "../components/ProductCardComponent";
import { ArrowUp, ChevronLeft, ChevronRight, Truck, CreditCard, RotateCcw, Award } from "lucide-react";
import "./HomePageView.css";

export default function HomeView({
  products,
  onProductClick,
  onRouteChange,
  onToggleWishlist,
  wishlist,
  currency
}) {
  const [newsEmail, setNewsEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const pearlContainerRef = useRef(null);
  const [activePearlIndex, setActivePearlIndex] = useState(0);
  const [numSlots, setNumSlots] = useState(3);

  // Filter and duplicate to 6 products to support smooth sliding and exactly 3 dots on desktop (4 columns)
  const uniquePearls = products.filter((p) => p.collection === "pearl");
  const pearlProducts = [
    ...uniquePearls,
    ...uniquePearls.slice(0, 2)
  ];

  const updateSlots = () => {
    if (pearlContainerRef.current) {
      const container = pearlContainerRef.current;
      const card = container.querySelector(".pearl-slide-item");
      if (card) {
        const cardWidth = card.offsetWidth;
        const gap = 24;
        const step = cardWidth + gap;
        const maxScrollLeft = container.scrollWidth - container.clientWidth;
        const slots = Math.round(maxScrollLeft / step) + 1;
        setNumSlots(slots > 0 ? slots : 1);
      }
    }
  };

  useEffect(() => {
    updateSlots();
    // Tiny delay to ensure browser layout is painted and clients / scrollWidth is ready
    const timer = setTimeout(updateSlots, 100);
    window.addEventListener("resize", updateSlots);
    return () => {
      clearTimeout(timer);
      window.removeEventListener("resize", updateSlots);
    };
  }, []);

  const scrollPearl = (direction) => {
    if (pearlContainerRef.current) {
      const container = pearlContainerRef.current;
      const card = container.querySelector(".pearl-slide-item");
      if (!card) return;
      const cardWidth = card.offsetWidth;
      const gap = 24;
      const step = cardWidth + gap;
      
      const scrollPos = container.scrollLeft;
      const maxScrollLeft = container.scrollWidth - container.clientWidth;
      
      if (maxScrollLeft <= 0) return; // All products fit (e.g., in a 4-item desktop view)
      
      const currentIndex = Math.round(scrollPos / step);
      const maxIndex = Math.round(maxScrollLeft / step);
      
      let nextIndex;
      if (direction === "left") {
        nextIndex = currentIndex - 1;
        if (nextIndex < 0) {
          nextIndex = maxIndex; // Wrap around to the last valid slot
        }
      } else {
        nextIndex = currentIndex + 1;
        if (nextIndex > maxIndex) {
          nextIndex = 0; // Wrap around to the beginning
        }
      }
      
      container.scrollTo({ left: nextIndex * step, behavior: "smooth" });
      setActivePearlIndex(nextIndex);
    }
  };

  const handlePearlScroll = (e) => {
    const container = e.currentTarget;
    const card = container.querySelector(".pearl-slide-item");
    if (!card) return;
    const cardWidth = card.offsetWidth;
    const gap = 24;
    const scrollPos = container.scrollLeft;
    const step = cardWidth + gap;
    
    const calculatedIndex = Math.round(scrollPos / step);
    
    setActivePearlIndex((prev) => {
      if (prev !== calculatedIndex) {
        return calculatedIndex;
      }
      return prev;
    });

    const maxScrollLeft = container.scrollWidth - container.clientWidth;
    const slots = Math.round(maxScrollLeft / step) + 1;
    setNumSlots(slots > 0 ? slots : 1);
  };

  const handleSubscribeSubmit = (e) => {
    e.preventDefault();
    if (newsEmail.trim()) {
      setSubscribed(true);
      setNewsEmail("");
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="home-root" id="homepage-root">
      
      {/* 1. COMPONENT: Primary Centered Hero Header */}
      <HeroSlider onRouteChange={onRouteChange} />

      {/* 2. COMPONENT: Three Grid Promotion Cards (Page 1 Screenshot) */}
      <section className="promo-grid-section">
        <div className="promo-cards-row">
          
          {/* Card 1: 25-50% OFF Engagement Rings */}
          <div 
            onClick={() => onRouteChange("shop", { category: "engagement" })}
            className="promo-card-item"
            id="promo-card-engagement"
          >
            <img 
              src="https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80" 
              alt="Engagement Rings Promo" 
              referrerPolicy="no-referrer"
              className="promo-card-bg-img"
            />
            {/* Soft Dark Vignette Overlay */}
            <div className="promo-card-overlay-vignette">
              <span className="promo-card-subtitle">
                25-50% OFF
              </span>
              <h3 className="promo-card-title">
                Engagement Rings
              </h3>
              <button className="promo-card-cta-btn">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Card 2: 25-50% OFF Wedding Bands */}
          <div 
            onClick={() => onRouteChange("shop", { category: "wedding" })}
            className="promo-card-item"
            id="promo-card-wedding"
          >
            <img 
              src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80" 
              alt="Wedding Bands Promo" 
              referrerPolicy="no-referrer"
              className="promo-card-bg-img"
            />
            <div className="promo-card-overlay-vignette">
              <span className="promo-card-subtitle">
                25-50% OFF
              </span>
              <h3 className="promo-card-title">
                Wedding Bands
              </h3>
              <button className="promo-card-cta-btn">
                SHOP NOW
              </button>
            </div>
          </div>

          {/* Card 3: Diamond Favourites */}
          <div 
            onClick={() => onRouteChange("shop", { category: "earrings" })}
            className="promo-card-item"
            id="promo-card-favourites"
          >
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80" 
              alt="Diamond Favourites Promo" 
              referrerPolicy="no-referrer"
              className="promo-card-bg-img"
            />
            <div className="promo-card-overlay-vignette">
              <span className="promo-card-subtitle">
                Essentials
              </span>
              <h3 className="promo-card-title">
                Diamond Favourites
              </h3>
              <button className="promo-card-cta-btn">
                SHOP NOW
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 3. COMPONENT: Intermediate Landscape Banner ("GOLD JEWELLERY") (Page 1 Screenshot) */}
      <section className="gold-landscape-banner-section">
        <div className="gold-landscape-banner-backdrop" id="intermediate-banner-gold">
          {/* Main model showcase backdrop */}
          <div 
            className="gold-landscape-banner-bg" 
            style={{ 
              backgroundImage: `linear-gradient(to right, rgba(0, 0, 0, 0.45) 0%, rgba(0, 0, 0, 0.25) 50%, rgba(0, 0, 0, 0) 100%), url('https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=1600&auto=format&fit=crop&q=80')` 
            }} 
          />
          
          {/* Overlay text on the Left conforming to Page 1 screenshot */}
          <div className="gold-landscape-overlay-content">
            <h2 className="gold-landscape-title">
              GOLD JEWELLERY
            </h2>
            <p className="gold-landscape-desc">
              Timeless high-quality accessories. Everyday gold favourites. From best selling bracelets to personalized pendants.
            </p>
            <div className="gold-landscape-btn-container">
              <button 
                onClick={() => onRouteChange("shop")}
                className="gold-landscape-cta"
              >
                SHOP NOW
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 4. COMPONENT: PEARL COLLECTION Shelf and Header (Page 1 & 2 Screenshot) */}
      <section className="pearl-shelf-section">
        <div className="pearl-shelf-header-row" id="pearl-collection-header-row">
          <h2 className="pearl-shelf-title">
            PEARL COLLECTION
          </h2>
          <div className="pearl-slider-controls">
            <button 
              onClick={() => onRouteChange("shop", { category: undefined, collection: "pearl" })}
              className="pearl-shelf-all-btn"
              id="btn-pearl-shop-all"
            >
              SHOP ALL
            </button>
          </div>
        </div>

        {/* Dynamic Horizontal slider track */}
        <div className="pearl-slider-wrapper">
          {/* Left Arrow Button positioned absolutely overlapping the left edge */}
          <button 
            onClick={() => scrollPearl("left")}
            className="pearl-slider-arrow left"
            aria-label="Previous items"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          {/* Right Arrow Button positioned absolutely overlapping the right edge */}
          <button 
            onClick={() => scrollPearl("right")}
            className="pearl-slider-arrow right"
            aria-label="Next items"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          <div 
            className="pearl-slider-track" 
            ref={pearlContainerRef}
            onScroll={handlePearlScroll}
            id="pearl-products-grid"
          >
            {pearlProducts.map((product, idx) => (
              <div key={`${product.id}-${idx}`} className="pearl-slide-item">
                <ProductCard
                  product={product}
                  onProductClick={onProductClick}
                  onToggleWishlist={onToggleWishlist}
                  isWishlisted={wishlist.includes(product.id)}
                  currency={currency}
                />
              </div>
            ))}
          </div>

          {/* Dots Indicator based on computed slots */}
          <div className="pearl-slider-dots">
            {Array.from({ length: numSlots }).map((_, idx) => (
              <span 
                key={idx}
                className={`pearl-slider-dot ${idx === activePearlIndex ? "active" : ""}`}
                onClick={() => {
                  if (pearlContainerRef.current) {
                    const container = pearlContainerRef.current;
                    const card = container.querySelector(".pearl-slide-item");
                    const cardWidth = card ? card.offsetWidth : 300;
                    const gap = 24;
                    const step = cardWidth + gap;
                    
                    container.scrollTo({ left: idx * step, behavior: "smooth" });
                    setActivePearlIndex(idx);
                  }
                }}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 5. COMPONENT: "As Seen In" Logos marquee auto-scroll slider (Page 2 Screenshot) */}
      <section className="as-seen-in-shingle" id="as-seen-in-section">
        <span className="as-seen-in-label">
          As Seen In
        </span>
        
        {/* Logos container converted into smooth luxury continuous loop slider */}
        <div className="as-seen-in-slider-container">
          <div className="as-seen-in-slider-track">
            {/* Track Group 1 */}
            <div className="as-seen-in-logos-group">
              <span className="logo-item-serif">BRIDES</span>
              <span className="logo-item-italic">the knot</span>
              <div className="logo-item-double">
                <span className="logo-sublabel">THE TONIGHT SHOW</span>
                <span className="logo-mainlabel">JIMMY FALLON</span>
              </div>
              <span className="logo-item-bold-italic">ELLE</span>
              <div className="logo-item-mono">
                <span>OFFICIAL RING MAKER</span>
                PWHL
              </div>
              <span className="logo-item-heavy">People</span>
            </div>

            {/* Track Group 2 */}
            <div className="as-seen-in-logos-group" aria-hidden="true">
              <span className="logo-item-serif">BRIDES</span>
              <span className="logo-item-italic">the knot</span>
              <div className="logo-item-double">
                <span className="logo-sublabel">THE TONIGHT SHOW</span>
                <span className="logo-mainlabel">JIMMY FALLON</span>
              </div>
              <span className="logo-item-bold-italic">ELLE</span>
              <div className="logo-item-mono">
                <span>OFFICIAL RING MAKER</span>
                PWHL
              </div>
              <span className="logo-item-heavy">People</span>
            </div>

            {/* Track Group 3 */}
            <div className="as-seen-in-logos-group" aria-hidden="true">
              <span className="logo-item-serif">BRIDES</span>
              <span className="logo-item-italic">the knot</span>
              <div className="logo-item-double">
                <span className="logo-sublabel">THE TONIGHT SHOW</span>
                <span className="logo-mainlabel">JIMMY FALLON</span>
              </div>
              <span className="logo-item-bold-italic">ELLE</span>
              <div className="logo-item-mono">
                <span>OFFICIAL RING MAKER</span>
                PWHL
              </div>
              <span className="logo-item-heavy">People</span>
            </div>
          </div>
        </div>
      </section>

      {/* 6. COMPONENT: Store Showroom promo block (Page 2 Screenshot) */}
      <section className="store-interior-section">
        <div className="store-showroom-grid">
          
          {/* Left: High Resolution lit up Paris Jewellers Storefront interior */}
          <div className="store-showroom-img-pane">
            <img 
              src="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80" 
              alt="Paris Jewellers Store Showroom Interior" 
              referrerPolicy="no-referrer"
              className="store-showroom-img"
              id="showroom-interior-image"
            />
          </div>

          {/* Right: White Booking Container */}
          <div className="store-booking-container">
            <h3 className="booking-title">
              We're Here For You, In Person And Online
            </h3>
            
            <p className="booking-desc">
              Whether It's At A Store Near You Or Online, We Curate Your Appointment Just For You.
            </p>

            {/* Subscribe email form block with success state */}
            <div className="newsletter-subscription-box">
              {!subscribed ? (
                <form onSubmit={handleSubscribeSubmit}>
                  <button 
                    type="submit" 
                    className="newsletter-trigger-btn"
                  >
                    Subscribe To Newsletter
                  </button>
                  <input 
                    type="email" 
                    required
                    placeholder="Enter your email to join the newsletter" 
                    value={newsEmail}
                    onChange={(e) => setNewsEmail(e.target.value)}
                    className="newsletter-input-field"
                  />
                </form>
              ) : (
                <p className="newsletter-success-notice">
                  ✓ Thank you! You have successfully subscribed to the Paris newsletter list.
                </p>
              )}
            </div>

            {/* Highly customized Tan/Khaki Buttons conforming to Page 2 coloring */}
            <div className="booking-action-buttons">
              <button 
                onClick={() => onRouteChange("locator")}
                className="booking-btn-khaki"
              >
                VISIT A STORE
              </button>
              <button 
                onClick={() => alert("Write to helpdesk@parisjewellers.ca / online@parisjewellers.ca for instant checkout custom-sizing or direct help.")}
                className="booking-btn-khaki"
              >
                CONTACT US ONLINE
              </button>
            </div>
          </div>

        </div>
      </section>

      {/* 7. COMPONENT: Universal Trust Scrolling / Feature line badge row (Page 2 Screenshot) */}
      <section className="trust-badges-bar" id="trust-features-section">
        <div className="trust-badges-slider-container">
          <div className="trust-badges-slider-track">
            {/* Track Group 1 */}
            <div className="trust-badges-group">
              <div className="trust-badge-item">
                <Truck className="trust-icon" />
                <span>Free Shipping on order $75+ within Canada</span>
              </div>
              <div className="trust-badge-item">
                <CreditCard className="trust-icon" />
                <span>Flexible Payment Options</span>
              </div>
              <div className="trust-badge-item">
                <RotateCcw className="trust-icon" />
                <span>35-Day Returns & Exchanges</span>
              </div>
              <div className="trust-badge-item">
                <Award className="trust-icon" />
                <span>High Quality Guaranteed</span>
              </div>
            </div>

            {/* Track Group 2 */}
            <div className="trust-badges-group" aria-hidden="true">
              <div className="trust-badge-item">
                <Truck className="trust-icon" />
                <span>Free Shipping on order $75+ within Canada</span>
              </div>
              <div className="trust-badge-item">
                <CreditCard className="trust-icon" />
                <span>Flexible Payment Options</span>
              </div>
              <div className="trust-badge-item">
                <RotateCcw className="trust-icon" />
                <span>35-Day Returns & Exchanges</span>
              </div>
              <div className="trust-badge-item">
                <Award className="trust-icon" />
                <span>High Quality Guaranteed</span>
              </div>
            </div>

            {/* Track Group 3 */}
            <div className="trust-badges-group" aria-hidden="true">
              <div className="trust-badge-item">
                <Truck className="trust-icon" />
                <span>Free Shipping on order $75+ within Canada</span>
              </div>
              <div className="trust-badge-item">
                <CreditCard className="trust-icon" />
                <span>Flexible Payment Options</span>
              </div>
              <div className="trust-badge-item">
                <RotateCcw className="trust-icon" />
                <span>35-Day Returns & Exchanges</span>
              </div>
              <div className="trust-badge-item">
                <Award className="trust-icon" />
                <span>High Quality Guaranteed</span>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}

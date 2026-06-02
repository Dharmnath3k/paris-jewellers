import { useState, useEffect } from "react";
import { Search, Heart, ShoppingBag, Menu, X, ChevronDown, User } from "lucide-react";
import "./AppHeader.css";

export default function Header({
  currentRoute,
  onRouteChange,
  cart,
  wishlistCount,
  onSearchQuery,
  currency,
  onCurrencyChange,
  currentUser
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [hoveredMenu, setHoveredMenu] = useState(null); // 'engagement' | 'jewellery' | 'collections' | null

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const totalCartItems = cart.reduce((acc, item) => acc + item.quantity, 0);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchInput.trim()) {
      onSearchQuery(searchInput);
      onRouteChange("shop", { category: undefined, collection: undefined });
      setSearchOpen(false);
    }
  };

  const handleNavClick = (route, params) => {
    onRouteChange(route, params);
    setMobileMenuOpen(false);
    setHoveredMenu(null);
  };

  return (
    <header className="header-wrapper" id="paris-brand-header">
      
      {/* 1. Official Black Promo Banner */}
      <div className="promo-banner">
        <div className="promo-banner-container">
          <span>25-50% OFF All Bridal!</span>
          <button 
            onClick={() => handleNavClick("shop", { category: "engagement" })}
            className="promo-banner-btn"
            id="banner-engagement-link"
          >
            Shop Engagement
          </button>
          <span className="promo-banner-separator">|</span>
          <button 
            onClick={() => handleNavClick("shop", { category: "wedding" })}
            className="promo-banner-btn"
            id="banner-wedding-link"
          >
            Shop Wedding Bands
          </button>
        </div>
      </div>

      {/* 2. Main Luxury Row Navigation Header (Logo Left, Links Center, Icons Right) */}
      <div className={`main-header ${scrolled ? "scrolled-mode" : "static-mode"}`}>
        <div className="main-header-row">
          
          {/* Mobile Left Menu Trigger */}
          <button 
            className="mobile-nav-trigger"
            onClick={() => setMobileMenuOpen(true)}
            id="mobile-menu-trigger"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-6 h-6" />
          </button>

          {/* Left Side: Elegant Serif Logo */}
          <button 
            className="brand-identity"
            onClick={() => handleNavClick("home")}
            id="header-brand-logo"
          >
            <h1 className="brand-title-serif">PARIS</h1>
            <p className="brand-subtitle-sans">JEWELLERS</p>
          </button>

          {/* Center Side: Desktop Navigation Links */}
          <nav className="desktop-nav-menu" id="header-desktop-navigation">
            <button 
              onClick={() => handleNavClick("shop", { category: "engagement" })}
              className={`desktop-nav-link ${currentRoute === "shop" ? "active-link" : ""}`}
            >
              New In
            </button>

            {/* Engagement & Wedding dropdown */}
            <div 
              className="nav-dropdown-holder"
              onMouseEnter={() => setHoveredMenu("engagement")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button 
                onClick={() => handleNavClick("shop", { category: "engagement" })}
                className="nav-dropdown-btn"
              >
                Engagement & Wedding <ChevronDown className="nav-dropdown-arrow" />
              </button>

              {hoveredMenu === "engagement" && (
                <div className="luxury-dropdown-menu" id="dropdown-engagement">
                  <button onClick={() => handleNavClick("shop", { category: "engagement" })} className="luxury-dropdown-item">Engagement Rings</button>
                  <button onClick={() => handleNavClick("shop", { category: "wedding" })} className="luxury-dropdown-item">Wedding Bands</button>
                  <button onClick={() => handleNavClick("shop", { collection: "glow" })} className="luxury-dropdown-item">Glow Diamond Rings</button>
                  <button onClick={() => handleNavClick("shop", { collection: "chantilly" })} className="luxury-dropdown-item">Vintage Chantilly Rings</button>
                </div>
              )}
            </div>

            {/* Jewellery dropdown */}
            <div 
              className="nav-dropdown-holder"
              onMouseEnter={() => setHoveredMenu("jewellery")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button 
                onClick={() => handleNavClick("shop")}
                className="nav-dropdown-btn"
              >
                Jewellery <ChevronDown className="nav-dropdown-arrow" />
              </button>

              {hoveredMenu === "jewellery" && (
                <div className="luxury-dropdown-menu" id="dropdown-jewellery">
                  <button onClick={() => handleNavClick("shop", { category: "necklaces" })} className="luxury-dropdown-item">Necklaces</button>
                  <button onClick={() => handleNavClick("shop", { category: "earrings" })} className="luxury-dropdown-item">Earrings</button>
                  <button onClick={() => handleNavClick("shop", { category: "bracelets" })} className="luxury-dropdown-item">Bracelets</button>
                </div>
              )}
            </div>

            {/* Collections dropdown */}
            <div 
              className="nav-dropdown-holder"
              onMouseEnter={() => setHoveredMenu("collections")}
              onMouseLeave={() => setHoveredMenu(null)}
            >
              <button 
                onClick={() => handleNavClick("shop")}
                className="nav-dropdown-btn"
              >
                Collections <ChevronDown className="nav-dropdown-arrow" />
              </button>

              {hoveredMenu === "collections" && (
                <div className="luxury-dropdown-menu" id="dropdown-collections">
                  <button onClick={() => handleNavClick("shop", { collection: "glow" })} className="luxury-dropdown-item">Glow Collection</button>
                  <button onClick={() => handleNavClick("shop", { collection: "disney" })} className="luxury-dropdown-item">Enchanted Disney</button>
                  <button onClick={() => handleNavClick("shop", { collection: "chantilly" })} className="luxury-dropdown-item">Chantilly Vintage</button>
                </div>
              )}
            </div>

            <button 
              onClick={() => handleNavClick("shop", { category: "necklaces" })}
              className="desktop-nav-link"
            >
              Gemstones
            </button>

            <button 
              onClick={() => handleNavClick("shop", { category: "earrings" })}
              className="desktop-nav-link"
            >
              Gifts
            </button>

            <button 
              onClick={() => handleNavClick("shop", { category: "engagement" })}
              className="desktop-nav-link sale-link"
            >
              Sale
            </button>

            <button 
              onClick={() => handleNavClick("story")}
              className="desktop-nav-link"
            >
              Explore
            </button>

            <button 
              onClick={() => handleNavClick("orders")}
              className={`desktop-nav-link ${currentRoute === "orders" ? "active-link font-bold text-[#c3a475]" : ""}`}
            >
              Track Order
            </button>
          </nav>

          {/* Right Side: Elegant Icons */}
          <div className="utility-icons-group">
            <button 
              onClick={() => setSearchOpen(!searchOpen)} 
              className="utility-icon-btn"
              title="Search"
              id="btn-trigger-search"
            >
              <Search className="w-5 h-5" />
            </button>

            <button 
              onClick={() => handleNavClick(currentUser ? "orders" : "login")}
              className={`utility-icon-btn relative ${currentUser ? "text-[#c3a475]" : ""}`}
              title={currentUser ? `My Account (${currentUser.name})` : "My Account"}
              id="btn-account-dashboard"
            >
              <User className="w-5 h-5" />
              {currentUser && (
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 bg-emerald-500 rounded-full border border-white" />
              )}
            </button>

            <button 
              onClick={() => handleNavClick("shop")} 
              className="utility-icon-btn"
              title="Wishlist"
              id="btn-wishlist-view"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="utility-indicator-badge">
                  {wishlistCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => handleNavClick("cart")} 
              className="utility-icon-btn"
              title="Shopping Cart"
              id="btn-cart-view"
            >
              <ShoppingBag className="w-5 h-5" />
              {totalCartItems > 0 && (
                <span className="utility-indicator-badge black-badge">
                  {totalCartItems}
                </span>
              )}
            </button>
          </div>

        </div>

        {/* Global Search input bar */}
        {searchOpen && (
          <div className="global-search-drawer">
            <form onSubmit={handleSearchSubmit} className="global-search-form">
              <Search className="w-4 h-4 search-icon-inside" />
              <input 
                type="text" 
                placeholder="Search collection (e.g., Pearl, Engagement, studs...)" 
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="search-field-input"
                autoFocus
              />
              {searchInput && (
                <button type="button" onClick={() => setSearchInput("")} className="search-clear-action">
                  Clear
                </button>
              )}
              <button type="submit" className="search-submit-action">
                GO
              </button>
            </form>
          </div>
        )}

      </div>

      {/* 4. Mobile Navigation Side Menu Drawer */}
      {mobileMenuOpen && (
        <div className="mobile-overlay-background" id="mobile-menu-overlay">
          <div className="mobile-navigation-drawer">
            <div className="mobile-drawer-header-row">
              <span className="mobile-drawer-title-serif">PARIS LUXURY MENU</span>
              <button 
                onClick={() => setMobileMenuOpen(false)} 
                className="mobile-drawer-close-btn"
                id="close-mobile-menu"
                aria-label="Close Mobile Drawer"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Mobile Search input */}
            <div className="mobile-drawer-search-row">
              <form onSubmit={handleSearchSubmit} className="mobile-drawer-search-form">
                <Search className="w-4 h-4 search-icon-inside" />
                <input 
                  type="text" 
                  placeholder="Search rings & gemstones..." 
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                  className="mobile-drawer-search-input"
                />
                <button type="submit" className="mobile-drawer-search-go">GO</button>
              </form>
            </div>

            {/* Mobile links directory */}
            <div className="mobile-drawer-links-scrollarea">
              <button 
                onClick={() => handleNavClick("shop", { category: "engagement" })}
                className="mobile-drawer-item"
              >
                💍 Engagement Rings <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick("shop", { category: "wedding" })}
                className="mobile-drawer-item"
              >
                Wedding Bands <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick("shop", { category: "necklaces" })}
                className="mobile-drawer-item"
              >
                Necklaces & Gems <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick("shop", { category: "earrings" })}
                className="mobile-drawer-item"
              >
                Luxury Earrings <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick("shop", { category: "bracelets" })}
                className="mobile-drawer-item"
              >
                Bracelets Collection <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick("story")}
                className="mobile-drawer-item"
              >
                Our Heritage Story <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick("orders")}
                className="mobile-drawer-item font-semibold text-[#c3a475]"
              >
                📦 Track Order Status <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick(currentUser ? "orders" : "login")}
                className="mobile-drawer-item mt-1"
              >
                👤 {currentUser ? `Hello, ${currentUser.name}` : "Member Profile Login"} <span>→</span>
              </button>
              <button 
                onClick={() => handleNavClick("locator")}
                className="mobile-drawer-item green-brand-item"
              >
                Boutique Locations <span>→</span>
              </button>
            </div>

            <div className="mobile-drawer-brand-footer">
              <p className="mobile-drawer-footer-title">PARIS JEWELLERS</p>
              <p className="mobile-drawer-footer-text">Celebrating beautiful life milestones over diamonds and ethical gold since 1987 in Canada.</p>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}

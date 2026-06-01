import { useState, useEffect } from "react";
import Header from "./components/AppHeader";
import Footer from "./components/AppFooter";
import HomeView from "./views/HomePageView";
import ListingView from "./views/ProductListingPageView";
import DetailView from "./views/ProductDetailPageView";
import CartView from "./views/CartPageView";
import CheckoutView from "./views/CheckoutPageView";
import StoryView from "./views/BrandStoryPageView";
import StoreLocatorView from "./views/StoreLocatorPageView";
import "./App.css";

import { productsData } from "./data/products";

export default function App() {
  const [activeRoute, setActiveRoute] = useState("home");
  const [selectedProductId, setSelectedProductId] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [initialCategory, setInitialCategory] = useState(undefined);
  const [initialCollection, setInitialCollection] = useState(undefined);
  const [currency, setCurrency] = useState(localStorage.getItem("paris_cl_currency") || "INR");

  const handleCurrencyChange = (newCurrency) => {
    setCurrency(newCurrency);
    localStorage.setItem("paris_cl_currency", newCurrency);
  };

  // Cart & Wishlist Global State
  const [cart, setCart] = useState([]);
  const [wishlist, setWishlist] = useState([]);

  // Sync state with standard client local storage for premium durable user experience
  useEffect(() => {
    const storedCart = localStorage.getItem("paris_cl_cart");
    const storedWishlist = localStorage.getItem("paris_cl_wishlist");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (e) {
        console.error(e);
      }
    }
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const saveCart = (newCart) => {
    setCart(newCart);
    localStorage.setItem("paris_cl_cart", JSON.stringify(newCart));
  };

  const saveWishlist = (newWishlist) => {
    setWishlist(newWishlist);
    localStorage.setItem("paris_cl_wishlist", JSON.stringify(newWishlist));
  };

  // Route Controllers
  const handleRouteChange = (route, params) => {
    setActiveRoute(route);
    setSearchQuery("");
    
    if (params) {
      if (params.category !== undefined) setInitialCategory(params.category);
      if (params.collection !== undefined) setInitialCollection(params.collection);
    } else {
      setInitialCategory(undefined);
      setInitialCollection(undefined);
    }

    if (route !== "detail") {
      setSelectedProductId(null);
    }
    
    // Scroll to top of window on transitions
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleProductClick = (productId) => {
    setSelectedProductId(productId);
    setActiveRoute("detail");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // Cart Actions
  const handleAddToCart = (product, quantity, metal, size) => {
    const existingIndex = cart.findIndex(
      (item) => item.product.id === product.id && item.selectedMetal === metal && item.selectedSize === size
    );

    if (existingIndex > -1) {
      const updated = [...cart];
      updated[existingIndex].quantity += quantity;
      saveCart(updated);
    } else {
      const newItem = {
        product,
        quantity,
        selectedMetal: metal,
        selectedSize: size
      };
      saveCart([...cart, newItem]);
    }
  };

  const handleUpdateQuantity = (index, quantity) => {
    if (quantity < 1) return;
    const updated = [...cart];
    updated[index].quantity = quantity;
    saveCart(updated);
  };

  const handleRemoveItem = (index) => {
    const updated = cart.filter((_, idx) => idx !== index);
    saveCart(updated);
  };

  const handleClearCart = () => {
    saveCart([]);
  };

  // Wishlist Actions
  const handleToggleWishlist = (productId) => {
    const isPresent = wishlist.includes(productId);
    let updated;
    if (isPresent) {
      updated = wishlist.filter((id) => id !== productId);
    } else {
      updated = [...wishlist, productId];
    }
    saveWishlist(updated);
  };

  const handleSearchTrigger = (query) => {
    setSearchQuery(query);
  };

  // Find selected item
  const activeProduct = productsData.find((p) => p.id === selectedProductId);

  return (
    <div className="app-root-container">
      
      {/* Vertical INR/CAD/USD Currency Toggle Pinned on Left Margin as seen in official screenshot preview */}
      <div className="currency-sidebar-pill" id="global-currency-sidebar">
        <button 
          onClick={() => handleCurrencyChange("INR")}
          className={`currency-sidebar-btn border-sep ${currency === "INR" ? "btn-active" : "btn-inactive"}`}
          title="Switch to Indian Rupee (INR)"
          id="toggle-currency-inr"
        >
          INR
        </button>
        <button 
          onClick={() => handleCurrencyChange("CAD")}
          className={`currency-sidebar-btn border-sep ${currency === "CAD" ? "btn-active" : "btn-inactive"}`}
          title="Switch to Canadian Dollar (CAD)"
          id="toggle-currency-cad"
        >
          CAD
        </button>
        <button 
          onClick={() => handleCurrencyChange("USD")}
          className={`currency-sidebar-btn ${currency === "USD" ? "btn-active" : "btn-inactive"}`}
          title="Switch to US Dollar (USD)"
          id="toggle-currency-usd"
        >
          USD
        </button>
      </div>

      {/* Central Header Navigation */}
      <Header
        currentRoute={activeRoute}
        onRouteChange={handleRouteChange}
        cart={cart}
        wishlistCount={wishlist.length}
        onSearchQuery={handleSearchTrigger}
        currency={currency}
        onCurrencyChange={handleCurrencyChange}
      />

      {/* Primary Rendering Workspace based on active state routes */}
      <main className="main-content-layout">
        {activeRoute === "home" && (
          <HomeView
            products={productsData}
            onProductClick={handleProductClick}
            onRouteChange={handleRouteChange}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            currency={currency}
          />
        )}

        {activeRoute === "shop" && (
          <ListingView
            products={productsData}
            onProductClick={handleProductClick}
            onToggleWishlist={handleToggleWishlist}
            wishlist={wishlist}
            initialCategory={initialCategory}
            initialCollection={initialCollection}
            searchQuery={searchQuery}
            currency={currency}
          />
        )}

        {activeRoute === "detail" && activeProduct && (
          <DetailView
            product={activeProduct}
            allProducts={productsData}
            onProductClick={handleProductClick}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlist.includes(activeProduct.id)}
            onBackToShop={() => handleRouteChange("shop")}
            currency={currency}
          />
        )}

        {activeRoute === "cart" && (
          <CartView
            cart={cart}
            onUpdateQuantity={handleUpdateQuantity}
            onRemoveItem={handleRemoveItem}
            onRouteChange={handleRouteChange}
            currency={currency}
          />
        )}

        {activeRoute === "checkout" && (
          <CheckoutView
            cart={cart}
            onClearCart={handleClearCart}
            currency={currency}
          />
        )}

        {activeRoute === "story" && <StoryView />}

        {activeRoute === "locator" && <StoreLocatorView />}
      </main>

      {/* Dynamic Aesthetic Footer Section */}
      <Footer onRouteChange={handleRouteChange} />
    </div>
  );
}

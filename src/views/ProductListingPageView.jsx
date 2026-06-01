import { useState, useMemo, useEffect, useRef } from "react";
import {
  SlidersHorizontal,
  ArrowUpDown,
  RefreshCw,
  Search,
  Smile,
} from "lucide-react";
import { formatCurrency } from "../lib/api";
import ProductCard from "../components/ProductCardComponent";
import "./ProductListingPageView.css";

export default function ListingView({
  products,
  onProductClick,
  onToggleWishlist,
  wishlist,
  initialCategory,
  initialCollection,
  searchQuery = "",
}) {
  // Filters State
  const [selectedCategory, setSelectedCategory] = useState(
    initialCategory || "all",
  );
  const [selectedCollection, setSelectedCollection] = useState(
    initialCollection || "all",
  );
  const [selectedMetal, setSelectedMetal] = useState("all");
  const [maxPrice, setMaxPrice] = useState(500000); // 5 Lakhs default
  const [onlyCanadianMined, setOnlyCanadianMined] = useState(false); // Map to Kimberley Certified
  const [sortOption, setSortOption] = useState("default");
  const [searchText, setSearchText] = useState(searchQuery);

  // Sync state if initial props change
  useMemo(() => {
    if (initialCategory) setSelectedCategory(initialCategory);
    if (initialCollection) setSelectedCollection(initialCollection);
  }, [initialCategory, initialCollection]);

  // Sync search text if external search query updates
  useMemo(() => {
    if (searchQuery) setSearchText(searchQuery);
  }, [searchQuery]);

  // Handle resets
  const handleResetFilters = () => {
    setSelectedCategory("all");
    setSelectedCollection("all");
    setSelectedMetal("all");
    setMaxPrice(500000);
    setOnlyCanadianMined(false);
    setSearchText("");
    setSortOption("default");
  };

  // Lazy Loading / Infinite Scroll state (showing 6 items initially)
  const [visibleCount, setVisibleCount] = useState(6);
  const [isFetchingMore, setIsFetchingMore] = useState(false);
  const observerRef = useRef(null);

  // Derive filtered items list
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // 1. Category Filter
        if (selectedCategory !== "all" && product.category !== selectedCategory)
          return false;

        // 2. Collection Filter
        if (
          selectedCollection !== "all" &&
          product.collection !== selectedCollection
        )
          return false;

        // 3. Metal Filter
        if (selectedMetal !== "all") {
          const matchesMetal = product.metals.some((m) =>
            m.toLowerCase().includes(selectedMetal.toLowerCase()),
          );
          if (!matchesMetal) return false;
        }

        // 4. Price Filter
        if (product.price > maxPrice) return false;

        // 5. Kimberley Certified check (maps to isCanadianMined or represents high-end check)
        if (onlyCanadianMined && !product.isCanadianMined) return false;

        // 6. Search Text
        if (searchText.trim()) {
          const query = searchText.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(query);
          const matchesDesc = product.description.toLowerCase().includes(query);
          const matchesCat = product.category.toLowerCase().includes(query);
          const matchesCol =
            product.collection?.toLowerCase().includes(query) || false;
          if (!matchesName && !matchesDesc && !matchesCat && !matchesCol)
            return false;
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting
        if (sortOption === "price-asc") return a.price - b.price;
        if (sortOption === "price-desc") return b.price - a.price;
        if (sortOption === "rating") return b.rating - a.rating;
        if (sortOption === "newest") return a.isNewArrival ? -1 : 1;
        return 0; // default order
      });
  }, [
    products,
    selectedCategory,
    selectedCollection,
    selectedMetal,
    maxPrice,
    onlyCanadianMined,
    sortOption,
    searchText,
  ]);

  // Reset page limit to 6 on any filter, sort, or search change
  useEffect(() => {
    setVisibleCount(6);
    setIsFetchingMore(false);
  }, [
    selectedCategory,
    selectedCollection,
    selectedMetal,
    maxPrice,
    onlyCanadianMined,
    sortOption,
    searchText,
  ]);

  // Auto load 6 more products when user scrolls down to show the sentinel
  useEffect(() => {
    if (visibleCount >= filteredProducts.length || isFetchingMore) return;

    const currentRef = observerRef.current;
    if (!currentRef) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetchingMore) {
          setIsFetchingMore(true);
          // 850ms premium feedback delay so the user clearly registers the loader & skeletons
          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + 6, filteredProducts.length),
            );
            setIsFetchingMore(false);
          }, 850);
        }
      },
      {
        threshold: 0.1,
        rootMargin: "30px", // Trigger when the footer/sentinel is in view
      },
    );

    observer.observe(currentRef);

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [filteredProducts.length, visibleCount, isFetchingMore]);

  return (
    <div className="listing-container">
      {/* 1. Page Header visual banner */}
      <div className="listing-header">
        <span className="listing-sub">FINE JEWELRY & HEIRLOOMS</span>
        <h1 className="listing-title">
          {selectedCategory !== "all"
            ? `${selectedCategory} Collection`
            : selectedCollection !== "all"
              ? `${selectedCollection} Signature Line`
              : "Paris Jewellers Catalogue"}
        </h1>
        <p className="listing-desc">
          Browse our stunning assortments. All our diamonds are hand-selected,
          certified ethical, customizable in fine white gold, yellow gold or
          romantic rose gold, and backed by a lifetime of professional showroom
          care.
        </p>

        {searchText && (
          <div className="search-badge-notice">
            <Search className="w-4 h-4" style={{ color: "#c3a475" }} />
            <span>
              Search results for: <strong>"{searchText}"</strong> (
              {filteredProducts.length} items found)
            </span>
            <button
              onClick={() => setSearchText("")}
              className="search-badge-clear">
              Clear
            </button>
          </div>
        )}
      </div>

      <div className="listing-dual-column">
        {/* 2. Side filter control station */}
        <aside className="sidebar-filters-panel">
          <div className="filter-top-bar">
            <h3 className="filter-heading">
              <SlidersHorizontal
                className="w-4 h-4"
                style={{ color: "#c3a475" }}
              />{" "}
              Filters
            </h3>
            <button
              onClick={handleResetFilters}
              className="filter-reset-action">
              <RefreshCw className="w-3 h-3" /> Reset all
            </button>
          </div>

          {/* Filter block: Category selection */}
          <div className="filter-group">
            <label className="filter-label-txt">Jewelry Type</label>
            <div className="filter-buttons-list">
              {[
                "all",
                "engagement",
                "wedding",
                "necklaces",
                "earrings",
                "bracelets",
                "Dharm",
              ].map((cat) => (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`filter-pill-btn ${selectedCategory === cat ? "pill-active" : "pill-inactive"}`}>
                  {cat === "all" ? "All Categories" : cat}
                </button>
              ))}
            </div>
          </div>

          {/* Filter block: Signature lines */}
          <div className="filter-group">
            <label className="filter-label-txt">Signature Collections</label>
            <div className="filter-buttons-list">
              {[
                "all",
                "glow",
                "disney",
                "canadian",
                "chantilly",
                "serendipity",
              ].map((col) => (
                <button
                  key={col}
                  onClick={() => setSelectedCollection(col)}
                  className={`filter-sig-pill-btn ${selectedCollection === col ? "sig-active" : "sig-inactive"}`}>
                  {col === "all" ? "All Collections" : col}
                </button>
              ))}
            </div>
          </div>

          {/* Filter block: Metal color */}
          <div className="filter-group">
            <label className="filter-label-txt">Precious Metal</label>
            <div className="metals-bubble-grid">
              {[
                "all",
                "White Gold",
                "Yellow Gold",
                "Rose Gold",
                "Platinum",
              ].map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`metal-tag-btn ${selectedMetal === metal ? "tag-active" : ""}`}>
                  {metal === "all" ? "All Metals" : metal}
                </button>
              ))}
            </div>
          </div>

          {/* Filter block: Price slider */}
          <div className="filter-group">
            <div className="price-row-spread">
              <label className="filter-label-txt">Max Price Limits</label>
              <span className="price-val-loud">{formatCurrency(maxPrice)}</span>
            </div>
            <input
              type="range"
              min="3000"
              max="500000"
              step="10000"
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="slider-input-range"
            />
          </div>

          {/* Filter block: Ethical Kimberley process toggle */}
          <div className="ethical-checkbox-row">
            <span className="ethical-checklist-label">
              💎 Kimberley conflict-free
            </span>
            <input
              type="checkbox"
              checked={onlyCanadianMined}
              onChange={(e) => setOnlyCanadianMined(e.target.checked)}
              className="ethical-square-box"
            />
          </div>
        </aside>

        {/* 3. Main listings section */}
        <main className="listing-main-content">
          {/* Top sorting & layout bar */}
          <div className="listing-top-controls">
            <div className="showing-count-txt">
              Showing{" "}
              <strong className="font-bold">
                {Math.min(visibleCount, filteredProducts.length)}
              </strong>{" "}
              of{" "}
              <strong className="font-bold">{filteredProducts.length}</strong>{" "}
              luxurious designs
            </div>

            {/* Sorters */}
            <div className="sorters-group">
              <div className="sorters-label">
                <ArrowUpDown
                  className="w-3.5 h-3.5"
                  style={{ color: "#c3a475" }}
                />{" "}
                Sort:
              </div>
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="sorters-select">
                <option value="default">Signature Favorites</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
                <option value="newest">New arrivals</option>
              </select>
            </div>
          </div>

          {/* Grid layout list */}
          {filteredProducts.length > 0 ? (
            <>
              <div className="grid-responsive-wrap">
                {filteredProducts.slice(0, visibleCount).map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onProductClick={onProductClick}
                    onToggleWishlist={onToggleWishlist}
                    isWishlisted={wishlist.includes(product.id)}
                  />
                ))}

                {/* Show beautiful shimmer skeletons as real card placeholders when fetching further items */}
                {isFetchingMore &&
                  Array.from({
                    length: Math.min(3, filteredProducts.length - visibleCount),
                  }).map((_, idx) => (
                    <div
                      key={`skeleton-${idx}`}
                      className="skeleton-product-card"
                      id={`skeleton-placeholder-${idx}`}>
                      <div className="skeleton-image">
                        <span className="skeleton-logo-hint">Paris</span>
                      </div>
                      <div className="skeleton-meta-box">
                        <div className="skeleton-text skeleton-shimmer-brand"></div>
                        <div className="skeleton-text skeleton-shimmer-title"></div>
                        <div className="skeleton-text skeleton-shimmer-price"></div>
                      </div>
                    </div>
                  ))}
              </div>

              {/* Elegant Auto Loader Anchor */}
              {(visibleCount < filteredProducts.length || isFetchingMore) && (
                <div
                  ref={observerRef}
                  className="auto-loader-sentinel"
                  id="listing-lazy-loader">
                  <div className="pulse-loader">
                    <span className="loader-dot"></span>
                    <span className="loader-dot"></span>
                    <span className="loader-dot"></span>
                  </div>
                  <p className="loader-text-accent">
                    {isFetchingMore
                      ? "Unveiling further exquisite handcrafts..."
                      : "Loading more exceptional designs..."}
                  </p>
                </div>
              )}
            </>
          ) : (
            <div className="not-found-card">
              <Smile className="not-found-icon-large" />
              <h3 className="not-found-title">No Matches Found</h3>
              <p className="not-found-desc">
                We couldn’t find any jewelry design matching your active
                selection set. Please try lowering your price thresholds,
                choosing another metal, or resetting filters.
              </p>
              <button
                onClick={handleResetFilters}
                className="not-found-reset-btn">
                Clear all filters
              </button>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

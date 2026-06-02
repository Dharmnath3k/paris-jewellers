import { useState } from "react";
import { Star, Heart, ArrowRight } from "lucide-react";
import { formatCurrency } from "../lib/api";
import "./ProductCardComponent.css";

export default function ProductCard({
  product,
  onProductClick,
  onToggleWishlist,
  isWishlisted,
  currency
}) {
  const [selectedMetalColor, setSelectedMetalColor] = useState(product.metals[0]);

  // Map metal names to safe CSS class identifiers
  const getMetalThemeClass = (metal) => {
    const name = metal.toLowerCase();
    if (name.includes("yellow")) return "yellow-gold";
    if (name.includes("rose")) return "rose-gold";
    if (name.includes("platinum")) return "platinum";
    if (name.includes("silver")) return "silver";
    return "white-gold"; // Default fallback
  };

  const handleCardClick = () => {
    onProductClick(product.id);
  };

  return (
    <div className="product-card-container" id={`product-card-${product.id}`}>
      
      {/* 1. Badge stickers */}
      <div className="badges-stack">
        {product.isCanadianMined && (
          <span className="badge-item ethical-badge">
            💎 Ethical Sourced
          </span>
        )}
        {product.isBestSeller && (
          <span className="badge-item bestseller-badge">
            🔥 Best Seller
          </span>
        )}
        {product.isNewArrival && (
          <span className="badge-item arrival-badge">
            New Arrival
          </span>
        )}
        {product.originalPrice && product.originalPrice > product.price && (
          <span className="badge-item discount-badge">
            Save {formatCurrency(product.originalPrice - product.price, currency)}
          </span>
        )}
      </div>

      {/* 2. Wishlist Heart Trigger */}
      <button
        onClick={(e) => {
          e.stopPropagation();
          onToggleWishlist(product.id);
        }}
        className="wishlist-absolute-btn"
        id={`heart-btn-${product.id}`}
        aria-label="Add to Wishlist"
      >
        <Heart className={`wishlist-heart-icon ${isWishlisted ? "filled-active" : ""}`} />
      </button>

      {/* 3. Image Showcase Area */}
      <div 
        onClick={handleCardClick}
        className="product-image-frame"
      >
        <img
          src={product.images[0]}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="product-image-shown"
        />
        
        {/* Soft overlay action hint */}
        <div className="hover-configure-reveal">
          <span className="hover-configure-text">
            Configure Design <ArrowRight className="w-3.5 h-3.5" />
          </span>
        </div>
      </div>

      {/* 4. Product description block details */}
      <div className="product-details-block">
        {/* Collection & Rating Row */}
        <div className="collection-row">
          <span>{product.collection ? `${product.collection} Line` : "Paris Essentials"}</span>
          <div className="rating-inline">
            <Star className="collection-star-icon" />
            <span className="rating-number-score">{product.rating}</span>
          </div>
        </div>

        {/* Product Name */}
        <h3 
          onClick={handleCardClick}
          className="product-name-heading"
        >
          {product.name}
        </h3>

        {/* Metals Config Selector */}
        <div className="metal-selector-row">
          <span className="metal-txt">Metal:</span>
          <div className="metal-bubbles">
            {product.metals.map((metal) => {
              const metalClass = getMetalThemeClass(metal);
              const isActive = selectedMetalColor === metal;
              return (
                <button
                  key={metal}
                  title={metal}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedMetalColor(metal);
                  }}
                  className={`metal-bubble-btn ${metalClass} ${isActive ? "bubble-active" : "bubble-inactive"}`}
                />
              );
            })}
          </div>
        </div>

        {/* Price Tag values */}
        <div className="card-footer">
          <div className="price-row">
            <span className="price-current">
              {formatCurrency(product.price, currency)}
            </span>
            {product.originalPrice && (
              <span className="price-original">
                {formatCurrency(product.originalPrice, currency)}
              </span>
            )}
            <span className="currency-tag-badge">
              {currency || "CAD"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo, useEffect } from "react";
import { Star, Shield, Truck, RefreshCw, Ruler, Info, X, ChevronRight, Plus, Minus, Maximize2, Share2, Heart, Check, CreditCard, ShoppingBag } from "lucide-react";
import { formatCurrency } from "../lib/api";
import "./ProductDetailPageView.css";

export default function DetailView({
  product,
  allProducts = [],
  onProductClick,
  onAddToCart,
  onToggleWishlist,
  isWishlisted,
  onBackToShop,
  currency
}) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedMetal, setSelectedMetal] = useState(product.metals[0] || "10kt Yellow Gold");
  const [selectedSize, setSelectedSize] = useState(product.sizes ? product.sizes[0] : 0);
  const [quantity, setQuantity] = useState(1);

  // Sync state when product ID changes (critical to prevent stale configuration index and blank images)
  useEffect(() => {
    setActiveImageIndex(0);
    setSelectedMetal(product.metals[0] || "10kt Yellow Gold");
    setSelectedSize(product.sizes ? product.sizes[0] : 0);
    setQuantity(1);
  }, [product.id]);
  const [activeAccordion, setActiveAccordion] = useState("description");
  const [sizeGuideOpen, setSizeGuideOpen] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  // Styling Plan state
  const [selectedCarePlan, setSelectedCarePlan] = useState("none");
  const [giftWrapAdded, setGiftWrapAdded] = useState(false);

  // Reviews Submit logic state
  const [hoveredStar, setHoveredStar] = useState(0);
  const [selectedRating, setSelectedRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviewAuthor, setReviewAuthor] = useState("");
  const [reviewEmail, setReviewEmail] = useState("");
  const [userReviewsList, setUserReviewsList] = useState(product.reviews || []);
  const [reviewMessage, setReviewMessage] = useState("");

  const [shareCopied, setShareCopied] = useState(false);
  const [cartNotification, setCartNotification] = useState(null);

  const toggleAccordion = (name) => {
    setActiveAccordion(activeAccordion === name ? "" : name);
  };

  const handleShareClick = () => {
    navigator.clipboard.writeText(window.location.href);
    setShareCopied(true);
    setTimeout(() => setShareCopied(false), 2500);
  };

  const currentCarePlanCost = useMemo(() => {
    if (selectedCarePlan === "lifetime") return 69.99;
    if (selectedCarePlan === "threeyear") return 39.99;
    return 0;
  }, [selectedCarePlan]);

  const handleAddToCartClick = () => {
    let finalDetails = `Metal: ${selectedMetal}`;
    if (product.sizes) finalDetails += `, Size: ${selectedSize}`;
    if (selectedCarePlan !== "none") {
      finalDetails += `, Care Plan: ${selectedCarePlan === "lifetime" ? "Lifetime Upgrade" : "3-Year Basic"}`;
    }
    if (giftWrapAdded) finalDetails += `, Gift wrapping inclusive`;

    // Compute price adjustment with care plan & gift wrap
    const basePrice = product.price;
    const adjustedPrice = basePrice + currentCarePlanCost + (giftWrapAdded ? 4.95 : 0);

    // Call state handle
    onAddToCart(
      { ...product, price: adjustedPrice },
      quantity,
      selectedMetal,
      product.sizes ? selectedSize : undefined
    );

    setCartNotification({
      productName: product.name,
      quantity,
      details: finalDetails,
      price: adjustedPrice
    });

    // Auto dismiss after 5 seconds
    setTimeout(() => {
      setCartNotification(null);
    }, 5000);
  };

  const handleSubmitReview = (e) => {
    e.preventDefault();
    if (!reviewText || !reviewAuthor || !reviewEmail) {
      alert("Please complete all required fields (*).");
      return;
    }

    const newRev = {
      id: `rev-${Date.now()}`,
      author: reviewAuthor,
      date: new Date().toLocaleDateString("en-IN", { year: "numeric", month: "long", day: "numeric" }),
      rating: selectedRating,
      title: selectedRating >= 4 ? "Exceptional quality!" : "Beautiful craft piece",
      content: reviewText
    };

    setUserReviewsList((prev) => [newRev, ...prev]);
    setReviewMessage("Your review has been successfully submitted and verified! Thank you for sharing your experience.");
    setReviewText("");
    setReviewAuthor("");
    setReviewEmail("");
    setSelectedRating(5);

    setTimeout(() => {
      setReviewMessage("");
    }, 6000);
  };

  // Compute Additional Information technical specifications dynamically
  const technicalSpecs = useMemo(() => {
    const specs = {
      caratWeight: product.carat || ".04",
      diamondClarity: "I12",
      diamondColour: "HIJ",
      metalColour: selectedMetal.toLowerCase().includes("yellow") ? "Yellow" : selectedMetal.toLowerCase().includes("rose") ? "Rose" : "White",
      metalContent: selectedMetal.includes("10kt") || selectedMetal.includes("10K") ? "10K" : selectedMetal.includes("14kt") || selectedMetal.includes("14K") ? "14K" : selectedMetal.includes("18kt") || selectedMetal.includes("18K") ? "18K" : "14K",
      metalType: selectedMetal.toLowerCase().includes("two-tone") ? "Two-Tone Gold" : selectedMetal.toLowerCase().includes("platinum") ? "Platinum" : "Gold, " + (selectedMetal.toLowerCase().includes("yellow") ? "Yellow Gold" : selectedMetal.toLowerCase().includes("rose") ? "Rose Gold" : "White Gold"),
      gemstones: product.collection === "pearl" ? "Diamond, Freshwater Pearl, Pearl" : product.category === "engagement" ? "Diamond" : "Diamond, Fine Gemstone"
    };

    if (product.details) {
      product.details.forEach(d => {
        const lower = d.toLowerCase();
        if (lower.includes("carat") || lower.includes("ctw") || lower.includes("ct.")) {
          const match = d.match(/([0-9.]+)\s*(Carat|ctw|ct|carats)/i);
          if (match) specs.caratWeight = match[1];
        }
        if (lower.includes("clarity")) {
          const parts = d.split(/clarity:?/i);
          if (parts[1]) specs.diamondClarity = parts[1].trim().replace(/[.,;]$/, "");
        }
        if (lower.includes("color") || lower.includes("colour")) {
          const parts = d.split(/colou?r:?/i);
          if (parts[1]) specs.diamondColour = parts[1].trim().replace(/[.,;]$/, "");
        }
        if (lower.includes("gemstone") || lower.includes("pearl")) {
          if (lower.includes("pearl") && lower.includes("diamond")) {
            specs.gemstones = "Diamond, Freshwater Pearl, Pearl";
          }
        }
      });
    }

    return specs;
  }, [product, selectedMetal]);

  // Dynamic Suggestion Recommendation system: exactly 4 cards
  const relatedRecommendations = useMemo(() => {
    let sameCategory = allProducts.filter(p => p.id !== product.id && p.category === product.category);
    if (sameCategory.length < 4) {
      const leftover = allProducts.filter(p => p.id !== product.id && p.category !== product.category);
      sameCategory = [...sameCategory, ...leftover];
    }
    return sameCategory.slice(0, 4);
  }, [allProducts, product]);

  const breadcrumbCategory = product.category
    ? product.category.charAt(0).toUpperCase() + product.category.slice(1)
    : "Fine Jewelry";

  return (
    <div className="detail-container" id="paris-lux-view-container">
      
      {/* Editorial Breadcrumb Navigation path */}
      <div className="paris-luxury-breadcrumb" id="paris-breadcrumbs">
        <button onClick={onBackToShop} className="breadcrumb-path-link">Home</button>
        <ChevronRight className="breadcrumb-arrow-icon" />
        <button onClick={onBackToShop} className="breadcrumb-path-link">Catalog</button>
        <ChevronRight className="breadcrumb-arrow-icon" />
        <button onClick={onBackToShop} className="breadcrumb-path-link">{breadcrumbCategory}</button>
        <ChevronRight className="breadcrumb-arrow-icon" />
        <span className="breadcrumb-path-active">{product.name}</span>
      </div>

      {/* Back to collection bar */}
      <div className="back-to-shop-row">
        <button onClick={onBackToShop} className="back-to-shop-btn">
          ← Return to full Collection
        </button>
      </div>

      <div className="detail-split-layout">
        
        {/* Left column: Image showcase & carousel */}
        <div className="img-carousel-column">
          <div className="carousel-main-viewport">
            
            {/* Tag Badges */}
            <div className="carousel-badges-holder">
              {product.isCanadianMined && (
                <span className="tag-badge-canadian">
                   Ethically Mined Canadian Diamond
                </span>
              )}
              {product.isBestSeller && (
                <span className="tag-badge-bestseller">
                  🔥 Best Seller
                </span>
              )}
            </div>

            {/* Expand / Lightbox Button */}
            <button 
              onClick={() => setIsLightboxOpen(true)} 
              className="image-expand-lightbox-btn"
              title="Expand High-Res Frame"
            >
              <Maximize2 className="w-4 h-4 text-zinc-700" />
            </button>

            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              referrerPolicy="no-referrer"
              className="carousel-main-img cursor-zoom-in"
              onClick={() => setIsLightboxOpen(true)}
            />
          </div>

          {/* Sub thumbnails list */}
          {product.images.length > 1 && (
            <div className="carousel-thumbnails-strip">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`thumb-btn-pillow ${activeImageIndex === idx ? "thumb-active" : "thumb-inactive"}`}
                >
                  <img src={img} alt="Product Thumb" className="thumb-img-inner" referrerPolicy="no-referrer" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Configurator & Selection forms */}
        <div className="configurator-column">
          
          <div className="config-headline-block">
            <span className="config-collection-slug">
              {product.collection ? `${product.collection} signature collection` : "Paris Essentials"}
            </span>
            <h1 className="config-product-title">
              {product.name}
            </h1>

            <div className="rating-summary-wrap">
              <div className="stars-strip">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className="w-3.5 h-3.5"
                    style={{ 
                      fill: Math.floor(product.rating || 5) > i ? "#c3a475" : "none",
                      color: Math.floor(product.rating || 5) > i ? "#c3a475" : "#d1d5db"
                    }}
                  />
                ))}
              </div>
              <span className="config-divider-line" style={{ width: "1px", height: "14px", backgroundColor: "#e4e4e7" }} />
              <span className="reviews-count-slug">
                {userReviewsList.length} reviews
              </span>
            </div>
          </div>

          <div className="config-divider-line" />

          {/* Pricing Row */}
          <div className="pricing-showcase-row">
            <div className="price-row-spread-large">
              <span className="price-loud-amount">
                {formatCurrency(product.price)}
              </span>
              {product.originalPrice && (
                <span className="price-original">
                  {formatCurrency(product.originalPrice)}
                </span>
              )}
            </div>
          </div>

          {/* 1. Metal Selection */}
          <div className="option-selection-block">
            <label className="option-block-title">
              Precious Metal Configuration
            </label>
            <div className="metals-option-glove">
              {product.metals && product.metals.map((metal) => (
                <button
                  key={metal}
                  onClick={() => setSelectedMetal(metal)}
                  className={`metal-selection-row-btn ${selectedMetal === metal ? "opt-active" : "opt-inactive"}`}
                >
                  <span>{metal}</span>
                  <div 
                    className="metal-tint-dot" 
                    style={{
                      backgroundColor: metal.toLowerCase().includes("yellow") ? "#e1cca0" : metal.toLowerCase().includes("rose") ? "#e3bcb3" : "#ebebe3"
                    }}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* 2. Sizes Selection */}
          {product.sizes && (
            <div className="option-selection-block">
              <div className="option-header-spread">
                <label className="option-block-title">
                  {product.category === "necklaces" ? "Choose Chain Length" :
                   product.category === "earrings" ? "Design Variant & Fit" :
                   product.category === "bracelets" ? "Choose Bracelet Size" :
                   "Choose Ring Size"}
                </label>
                {(!product.category || (product.category !== "necklaces" && product.category !== "earrings" && product.category !== "bracelets")) && (
                  <button 
                    onClick={() => setSizeGuideOpen(true)}
                    className="trigger-size-guide-link"
                  >
                    <Ruler className="w-3.5 h-3.5" /> Ring Size Guide Chart
                  </button>
                )}
              </div>
              <div className="sizes-bubble-strip">
                {product.sizes.map((size) => {
                  const isLongSize = String(size).length > 3;
                  return (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`size-circle-btn ${isLongSize ? "size-pill-btn" : ""} ${selectedSize === size ? "size-active" : "size-inactive"}`}
                    >
                      {size}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* 3. Care Plan Segment (Screenshot replica) */}
          <div className="option-selection-block">
            <label className="option-block-title">Care Plan</label>
            <div className="custom-dropdown-select-wrapper">
              <select 
                value={selectedCarePlan} 
                onChange={(e) => setSelectedCarePlan(e.target.value)}
                className="care-plan-dropdown-select"
              >
                <option value="none">None</option>
                <option value="threeyear">3-Year Jewellery Protection Care Plan (+{formatCurrency(39.99)})</option>
                <option value="lifetime">Lifetime Jewellery Care Plan Upgrade (+{formatCurrency(69.99)})</option>
              </select>
            </div>
          </div>

          {/* 4. Gift Wrapping Option (Screenshot replica) */}
          <div className="option-selection-block">
            <label className="option-block-title">Gift Wrapping</label>
            <div className="gift-wrap-checkbox-card">
              <label className="checkbox-spread-label">
                <input 
                  type="checkbox" 
                  checked={giftWrapAdded}
                  onChange={(e) => setGiftWrapAdded(e.target.checked)}
                  className="gift-wrapping-native-input"
                />
                <span className="gift-check-text font-medium text-xs text-neutral-800">
                  Add to Order (+{formatCurrency(4.95)})
                </span>
              </label>
            </div>
          </div>

          {/* 5. Quantities Counter & ADD TO CART (Screenshot horizontal align) */}
          <div className="control-action-bar-strip">
            
            {/* Quantity Stepper */}
            <div className="qty-stepper-box">
              <button 
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="qty-step-trigger-btn"
                aria-label="Decrease quantity"
              >
                -
              </button>
              <span className="qty-display-middle">
                {quantity}
              </span>
              <button 
                onClick={() => setQuantity((q) => q + 1)}
                className="qty-step-trigger-btn"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>

            {/* Submitting button */}
            <button
              onClick={handleAddToCartClick}
              className="add-to-bag-cta-btn"
              id="add-to-cart-action"
            >
              ADD TO CART
            </button>
          </div>

          {/* Secondary Action CTAs */}
          <div className="detail-meta-actions-strip">
            <button 
              onClick={() => onToggleWishlist(product.id)}
              className={`meta-pill-action-link ${isWishlisted ? "active-loved" : ""}`}
            >
              <Heart className="w-4 h-4" style={{ fill: isWishlisted ? "currentColor" : "none" }} />
              <span>{isWishlisted ? "WISHLISTED" : "ADD TO WISHLIST"}</span>
            </button>
            <button 
              onClick={handleShareClick}
              className="meta-pill-action-link relative"
            >
              <Share2 className="w-4 h-4" />
              <span>{shareCopied ? "LINK COPIED!" : "SHARE"}</span>
            </button>
          </div>

          <div className="paris-editorial-taglinks">
            <div className="taglink-item">
              <span className="taglink-bold">SKU:</span>
              <span className="taglink-muted">EAR-GEM-{String(product.id || "1678").slice(0, 4).toUpperCase()}</span>
            </div>
            <div className="taglink-item">
              <span className="taglink-muted tracking-widest text-[#c3a475] font-semibold text-[10px]">FREE 30 DAY RETURNS</span>
            </div>
            <div className="taglink-item">
              <span className="taglink-muted tracking-widest text-[#c3a475] font-semibold text-[10px]">FREE SHIPPING ON ORDERS $75+</span>
            </div>
          </div>

        </div>
      </div>

      {/* Full-width Collapsible Drawers / Accordions below splits section */}
      <div className="paris-accordions-group" id="paris-product-technical-drawers">
        
        {/* Item 1: Description (Expanded by default) */}
        <div className="paris-acc-card">
          <button 
            onClick={() => toggleAccordion("description")} 
            className="paris-acc-header"
            aria-expanded={activeAccordion === "description"}
          >
            <span>Description</span>
            {activeAccordion === "description" ? <X className="paris-drawer-cross" /> : <Plus className="paris-drawer-plus" />}
          </button>
          <div className={`paris-acc-panel ${activeAccordion === "description" ? "acc-expanded" : "acc-collapsed"}`}>
            <div className="paris-acc-content">
              <p className="description-clean-doc">
                {product.description || `Exquisite handcraft details featuring luxury finishes. Sourced ethically for Paris Jewellers under strict hallmark guidelines.`}
              </p>
            </div>
          </div>
        </div>

        {/* Item 2: Additional Information (Specs Grid) */}
        <div className="paris-acc-card" id="drawer-additional-info">
          <button 
            onClick={() => toggleAccordion("details")} 
            className="paris-acc-header"
            aria-expanded={activeAccordion === "details"}
          >
            <span>Additional Information</span>
            {activeAccordion === "details" ? <X className="paris-drawer-cross" /> : <Plus className="paris-drawer-plus" />}
          </button>
          <div className={`paris-acc-panel ${activeAccordion === "details" ? "acc-expanded" : "acc-collapsed"}`}>
            <div className="paris-acc-content">
              <div className="additional-info-technical-grid">
                
                <div className="tech-info-row">
                  <span className="tech-label">TOTAL CARAT WEIGHT:</span>
                  <span className="tech-value">{technicalSpecs.caratWeight}</span>
                </div>
                <div className="tech-info-row">
                  <span className="tech-label">SIDESTONE DIAMOND CLARITY:</span>
                  <span className="tech-value">{technicalSpecs.diamondClarity}</span>
                </div>
                <div className="tech-info-row">
                  <span className="tech-label">SIDESTONE DIAMOND COLOUR:</span>
                  <span className="tech-value">{technicalSpecs.diamondColour}</span>
                </div>
                <div className="tech-info-row">
                  <span className="tech-label">METAL COLOUR:</span>
                  <span className="tech-value">{technicalSpecs.metalColour}</span>
                </div>
                <div className="tech-info-row">
                  <span className="tech-label">METAL CONTENT:</span>
                  <span className="tech-value">{technicalSpecs.metalContent}</span>
                </div>
                <div className="tech-info-row">
                  <span className="tech-label">METAL TYPE:</span>
                  <span className="tech-value">{technicalSpecs.metalType}</span>
                </div>
                <div className="tech-info-row">
                  <span className="tech-label">GEMSTONE:</span>
                  <span className="tech-value">{technicalSpecs.gemstones}</span>
                </div>

              </div>
            </div>
          </div>
        </div>

        {/* Item 3: Reviews Form and Ratings (Collapsible Drawer with ✕) */}
        <div className="paris-acc-card" id="drawer-product-reviews">
          <button 
            onClick={() => toggleAccordion("reviews")} 
            className="paris-acc-header"
            aria-expanded={activeAccordion === "reviews"}
          >
            <span>Reviews ({userReviewsList.length})</span>
            {activeAccordion === "reviews" ? <X className="paris-drawer-cross" /> : <Plus className="paris-drawer-plus" />}
          </button>
          <div className={`paris-acc-panel ${activeAccordion === "reviews" ? "acc-expanded" : "acc-collapsed"}`}>
            <div className="paris-acc-content">
              <div className="reviews-accordion-interior">

                {/* Submited Alert message banner */}
                {reviewMessage && (
                  <div className="reviews-success-banner">
                    {reviewMessage}
                  </div>
                )}

                {/* Listing of current review bricks */}
                {userReviewsList.length > 0 && (
                  <div className="verified-list-bricks-container">
                    {userReviewsList.map((rev) => (
                      <div key={rev.id} className="review-brick-card">
                        <div className="review-brick-header">
                          <div>
                            <span className="review-brick-author-txt">{rev.author}</span>
                            <div className="review-brick-meta-row">
                              <span className="review-brick-badge-verified">Verified Buyer</span>
                              <span className="review-brick-date-stamp">{rev.date}</span>
                            </div>
                          </div>
                          <div className="star-rating-read-only">
                            {[...Array(5)].map((_, i) => (
                              <Star 
                                key={i} 
                                className="w-3 h-3" 
                                style={{ 
                                  fill: rev.rating > i ? "#c3a475" : "none", 
                                  color: rev.rating > i ? "#c3a475" : "#e4e4e7" 
                                }} 
                              />
                            ))}
                          </div>
                        </div>
                        <h4 className="review-brick-title-bold text-neutral-800 text-xs font-semibold">{rev.title}</h4>
                        <p className="review-brick-body-desc text-neutral-600 text-xs mt-1 leading-relaxed">{rev.content}</p>
                      </div>
                    ))}
                  </div>
                )}

                {/* Authentic Blank Reviews form when there is zero reviews or user wants to add review */}
                <div className="review-submission-feedback-glove">
                  <h3 className="rev-write-anchor-hdr">
                    Be The First To Review &ldquo;{product.name}&rdquo;
                  </h3>
                  <p className="rev-sub-notif">
                    Your email address will not be published. Required fields are marked *
                  </p>

                  <form onSubmit={handleSubmitReview} className="rev-form-wrap">
                    
                    {/* Star selection */}
                    <div className="interactive-stars-group">
                      <span className="stars-lbl-txt">YOUR RATING *</span>
                      <div className="stars-inputs-strip">
                        {[1, 2, 3, 4, 5].map((num) => (
                          <button
                            type="button"
                            key={num}
                            onClick={() => setSelectedRating(num)}
                            onMouseEnter={() => setHoveredStar(num)}
                            onMouseLeave={() => setHoveredStar(0)}
                            className="interactive-star-btn"
                          >
                            <Star 
                              className="w-5 h-5 transition-transform hover:scale-110"
                              style={{
                                fill: (hoveredStar || selectedRating) >= num ? "#c3a475" : "none",
                                color: (hoveredStar || selectedRating) >= num ? "#c3a475" : "#d1d5db"
                              }}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Review text area input */}
                    <div className="form-input-block-fld">
                      <label className="form-fld-lbl">Your review *</label>
                      <textarea 
                        required 
                        rows={5}
                        placeholder="Share your experience wearing this exceptional luxury design..."
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        className="form-fld-textarea"
                      />
                    </div>

                    {/* Name & Email fields side-by-side */}
                    <div className="form-inputs-pair-grid">
                      <div className="form-input-block-fld">
                        <label className="form-fld-lbl">Name *</label>
                        <input 
                          type="text" 
                          required 
                          placeholder="Your Name"
                          value={reviewAuthor}
                          onChange={(e) => setReviewAuthor(e.target.value)}
                          className="form-fld-val-input"
                        />
                      </div>
                      <div className="form-input-block-fld">
                        <label className="form-fld-lbl">Email *</label>
                        <input 
                          type="email" 
                          required 
                          placeholder="Your email address"
                          value={reviewEmail}
                          onChange={(e) => setReviewEmail(e.target.value)}
                          className="form-fld-val-input"
                        />
                      </div>
                    </div>

                    {/* Approval disclaimer */}
                    <div className="checkbox-consent-card">
                      <input type="checkbox" required defaultChecked className="consent-chk" id="comment-cookies-chk" />
                      <label htmlFor="comment-cookies-chk" className="consent-lbl-txt text-neutral-600 text-xs">
                        Save my name, email, and website in this browser for the next time I comment.
                      </label>
                    </div>

                    <button type="submit" className="scented-form-submit-btn">
                      SUBMIT
                    </button>

                  </form>
                </div>

              </div>
            </div>
          </div>
        </div>

      </div>

      {/* Related Products: You May Also Like replica */}
      <section className="you-may-also-like-section">
        <div className="luxury-section-divider">
          <div className="horiz-rule" />
          <h2 className="related-scented-section-title">You May Also Like</h2>
          <div className="horiz-rule" />
        </div>

        <div className="related-bento-grid">
          {relatedRecommendations.map((relProduct) => {
            const relCost = Math.floor(relProduct.price / 6);
            return (
              <div 
                key={relProduct.id} 
                className="related-item-card-mini"
                onClick={() => onProductClick(relProduct.id)}
              >
                <div className="related-img-holder">
                  <img 
                    src={relProduct.images[0]} 
                    alt={relProduct.name} 
                    className="related-img-frame" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="related-meta-frame">
                  <h3 className="related-item-title">{relProduct.name}</h3>
                  <span className="related-item-price-lbl">{formatCurrency(relProduct.price)}</span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Trust Badges Scented Ribbon Banner (replica of footer logos) */}
      <section className="paris-trust-ribbon">
        <div className="trust-card-badge">
          <Truck className="w-5 h-5 text-neutral-800" />
          <span className="trust-badge-primary-lbl">Free Shipping on order $75+ within Canada</span>
        </div>
        <div className="trust-card-badge">
          <CreditCard className="w-5 h-5 text-neutral-800" />
          <span className="trust-badge-primary-lbl">Flexible Payment Options</span>
        </div>
        <div className="trust-card-badge">
          <RefreshCw className="w-5 h-5 text-neutral-800" />
          <span className="trust-badge-primary-lbl">30 Day Returns</span>
        </div>
        <div className="trust-card-badge">
          <Shield className="w-5 h-5 text-neutral-800" />
          <span className="trust-badge-primary-lbl">High Quality Guarantee</span>
        </div>
        <div className="trust-card-badge">
          <Truck className="w-5 h-5 text-neutral-800" />
          <span className="trust-badge-primary-lbl">Insured Courier Delivery Services</span>
        </div>
      </section>

      {/* Size guide Dialogue Chart Overlay */}
      {sizeGuideOpen && (
        <div className="size-guide-dialog-shield" id="size-guide-modal">
          <div className="size-guide-modal-inner">
            <button 
              onClick={() => setSizeGuideOpen(false)} 
              className="close-guide-dismiss-btn"
              id="close-size-modal"
              aria-label="Dismiss chart"
            >
              <X className="w-5 h-5" />
            </button>
            
            <Ruler className="w-8 h-8" style={{ color: "#c3a475", marginBottom: "12px" }} />
            <h3 className="modal-gorge-title">Finding Your Perfect Ring Size</h3>
            <p className="modal-sub">
              A ring should fit comfortably—snug enough not to fall off, but loose enough to slide over your knuckle with light resistance. Indian standard scale sizes represent internal ring diameters in millimeters.
            </p>

            <div style={{ borderTop: "1px solid #e4e4e7", borderBottom: "1px solid #e4e4e7", padding: "12px 0", marginBottom: "16px" }}>
              <div className="chart-grid-legend">
                <span>Indian Size</span>
                <span>Finger Circumference (mm)</span>
              </div>
              <div className="chart-rows-scroller">
                <div className="chart-item-record"><span>Size 6</span> <span>46.8 mm</span></div>
                <div className="chart-item-record"><span>Size 8</span> <span>49.3 mm</span></div>
                <div className="chart-item-record"><span>Size 10</span> <span>51.9 mm</span></div>
                <div className="chart-item-record"><span>Size 12</span> <span>54.4 mm</span></div>
                <div className="chart-item-record"><span>Size 14</span> <span>57.0 mm</span></div>
                <div className="chart-item-record"><span>Size 16</span> <span>59.5 mm</span></div>
                <div className="chart-item-record"><span>Size 18</span> <span>62.1 mm</span></div>
              </div>
            </div>

            <div className="guide-warning-block">
              <Info className="w-4 h-4 text-amber-500 flex-shrink-0" />
              <span>
                <strong>Have peace of mind:</strong> Don&rsquo;t worry if you configure or buy the wrong size. We offer one-time complimentary size adjustments on all ring bands resizing within 30 days of purchase.
              </span>
            </div>

            <button
              onClick={() => setSizeGuideOpen(false)}
              className="bottom-guide-cta-btn"
            >
              Close Guide Chart
            </button>
          </div>
        </div>
      )}

      {/* Gorgeous High-Res Lightbox Dialog Overlay */}
      {isLightboxOpen && (
        <div className="lightbox-dialog-backdrop" onClick={() => setIsLightboxOpen(false)}>
          <div className="lightbox-inner-frame" onClick={(e) => e.stopPropagation()}>
            <button 
              onClick={() => setIsLightboxOpen(false)} 
              className="lightbox-close-btn"
              aria-label="Close high-res modal"
            >
              <X className="w-6 h-6" />
            </button>
            <div className="lightbox-image-viewport">
              <img 
                src={product.images[activeImageIndex] || product.images[0]} 
                alt={product.name} 
                className="lightbox-full-image" 
                referrerPolicy="no-referrer"
              />
            </div>
            <div className="lightbox-caption-bar-spread">
              <span className="light-caption-title">{product.name}</span>
              <span className="light-caption-metal">{selectedMetal}</span>
            </div>
          </div>
        </div>
      )}

      {/* Premium Luxury Toast Notification */}
      {cartNotification && (
        <div className="cart-toast-notification-banner" style={{
          position: "fixed",
          bottom: "24px",
          right: "24px",
          backgroundColor: "#18181b",
          border: "1px solid #c3a475",
          borderRadius: "4px",
          boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.4), 0 8px 10px -6px rgba(0, 0, 0, 0.4)",
          color: "#ffffff",
          padding: "16px",
          maxWidth: "420px",
          width: "calc(100% - 48px)",
          zIndex: 1100,
          display: "flex",
          gap: "12px",
          animation: "slideInUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)",
          fontFamily: "Montserrat, Inter, sans-serif"
        }}>
          <div style={{
            width: "40px",
            height: "40px",
            borderRadius: "50%",
            backgroundColor: "#27272a",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0,
            border: "1px solid #c3a475"
          }}>
            <ShoppingBag className="w-5 h-5" style={{ color: "#c3a475" }} />
          </div>
          
          <div style={{ flex: 1 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "4px" }}>
              <span style={{ fontSize: "11px", fontWeight: "700", textTransform: "uppercase", letterSpacing: "0.1em", color: "#c3a475" }}>
                Added to Shopping Bag
              </span>
              <button 
                onClick={() => setCartNotification(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: "#a1a1aa",
                  fontSize: "18px",
                  cursor: "pointer",
                  padding: 0,
                  lineHeight: "1",
                  marginTop: "-4px"
                }}
              >
                ×
              </button>
            </div>
            
            <p style={{ fontSize: "13px", fontWeight: "600", color: "#f4f4f5", margin: "0 0 4px 0", lineHeight: "1.4" }}>
              {cartNotification.quantity}x {cartNotification.productName}
            </p>
            
            <p style={{ fontSize: "11px", color: "#a1a1aa", margin: "0 0 8px 0", lineHeight: "1.3" }}>
              {cartNotification.details}
            </p>

            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: "12px", fontWeight: "700", color: "#ffffff" }}>
                {formatCurrency(cartNotification.price * cartNotification.quantity)}
              </span>
              <button
                onClick={() => {
                  setCartNotification(null);
                  onBackToShop();
                }}
                style={{
                  backgroundColor: "#c3a475",
                  color: "#18181b",
                  border: "none",
                  padding: "5px 12px",
                  fontSize: "10px",
                  fontWeight: "700",
                  textTransform: "uppercase",
                  borderRadius: "2px",
                  cursor: "pointer",
                  letterSpacing: "0.05em"
                }}
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}

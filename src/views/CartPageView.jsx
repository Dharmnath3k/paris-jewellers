import { Trash2, ArrowRight, ShieldCheck, ShoppingBag, Landmark } from "lucide-react";
import { formatCurrency } from "../lib/api";
import "./CartPageView.css";

export default function CartView({
  cart,
  onUpdateQuantity,
  onRemoveItem,
  onRouteChange
}) {
  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.product.price * item.quantity, 0);
  const originalSubtotal = cart.reduce((acc, item) => {
    const p = item.product.originalPrice || item.product.price;
    return acc + p * item.quantity;
  }, 0);
  
  const discountSavings = originalSubtotal - subtotal;
  
  // Jewelry free delivery at ₹50,000+ otherwise ₹950 insured courier standard charges
  const shipping = subtotal > 50000 || subtotal === 0 ? 0 : 950;
  
  const grandTotal = subtotal + shipping;

  return (
    <div className="cart-container">
      
      {/* Page Title */}
      <div className="cart-header">
        <span className="cart-sub">Your Selection Bag</span>
        <h1 className="cart-title">Shopping Cart</h1>
      </div>

      {cart.length > 0 ? (
        <div className="cart-dual-layout">
          
          {/* Cart items list table (cols: 8) */}
          <div className="cart-items-panel">
            {cart.map((item, index) => {
              const itemTotal = item.product.price * item.quantity;
              return (
                <div 
                  key={`${item.product.id}-${index}`}
                  className="cart-item-brick"
                  id={`cart-item-row-${item.product.id}`}
                >
                  
                  {/* Item Image */}
                  <div className="cart-item-img-wrap">
                    <img 
                      src={item.product.images[0]} 
                      alt={item.product.name} 
                      referrerPolicy="no-referrer"
                      className="cart-item-thumb" 
                    />
                  </div>

                  {/* Informational item details */}
                  <div className="cart-item-info">
                    <span className="cart-item-collection">
                      {item.product.collection ? `${item.product.collection} Line` : "Paris Original"}
                    </span>
                    <h3 className="cart-item-name">
                      {item.product.name}
                    </h3>
                    
                    {/* Metal selection & sizes details */}
                    <div className="cart-item-meta-badges">
                      <span className="cart-meta-badge">
                        Metal: <strong>{item.selectedMetal}</strong>
                      </span>
                      {item.selectedSize ? (
                        <span className="cart-meta-badge">
                          Size: <strong>{item.selectedSize}</strong>
                        </span>
                      ) : null}
                    </div>

                    <div className="cart-pricing-row-small">
                      <span className="cart-price-active">{formatCurrency(item.product.price)}</span>
                      {item.product.originalPrice && (
                        <span className="cart-price-original">{formatCurrency(item.product.originalPrice)}</span>
                      )}
                    </div>
                  </div>

                  {/* Pricing adjustment panel (controls) */}
                  <div className="cart-controls-column">
                    
                    {/* Multiplier controller */}
                    <div className="cart-step-steppers">
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity - 1)}
                        className="cart-step-btn"
                      >
                        -
                      </button>
                      <span className="cart-qty-mid-read">
                        {item.quantity}
                      </span>
                      <button 
                        onClick={() => onUpdateQuantity(index, item.quantity + 1)}
                        className="cart-step-btn"
                      >
                        +
                      </button>
                    </div>

                    {/* Cost and removal trashcan */}
                    <div className="cart-item-cost-column">
                      <span className="cart-total-brick-label">{formatCurrency(itemTotal)}</span>
                      <button 
                        onClick={() => onRemoveItem(index)}
                        className="cart-item-remove-btn"
                        id={`trash-btn-${item.product.id}`}
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Remove
                      </button>
                    </div>

                  </div>
                </div>
              );
            })}

            {/* Subtotal summary guarantees banner */}
            <div className="checkout-insurance-pillow">
              <ShieldCheck className="w-5 h-5 text-gold-champagne shrink-0 mt-0.5" style={{ color: "#c3a475" }} />
              <div className="checkout-insurance-msg">
                <strong>Certified Checkout Guarantee:</strong> Your purchase is backed by our Lifetime Diamond Guarantee, offering lifetime diagnostics, sonic polishing, claw audits, and sizing adjustments across any of our high-end boutiques in India.
              </div>
            </div>
          </div>

          {/* Cart Summary station totals (cols: 4) */}
          <div className="cart-totals-station">
            <div className="totals-group-block">
              <h3 className="totals-card-title">
                Purchase Order Details
              </h3>

              {/* Breakdowns table */}
              <div className="totals-items-scent">
                <div className="totals-row-item">
                  <span>Cart jewelry count</span>
                  <span>
                    {cart.reduce((a, b) => a + b.quantity, 0)} Items
                  </span>
                </div>

                <div className="totals-row-item">
                  <span>Subtotal catalog value</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                {discountSavings > 0 && (
                  <div className="totals-row-item savings-row">
                    <span>Exclusive promotional savings</span>
                    <span>-{formatCurrency(discountSavings)}</span>
                  </div>
                )}

                <div className="totals-row-item">
                  <span>Secure Insured Delivery</span>
                  <span className="delivery-green">
                    {shipping === 0 ? "🇮🇳 Free Secure Express" : formatCurrency(shipping)}
                  </span>
                </div>

                <div className="totals-row-item">
                  <span>Estimated GST (3%)</span>
                  <span style={{ color: "#9ca3af" }}>Calculated at checkout</span>
                </div>

                <div className="totals-divider-row" />

                <div className="totals-row-final">
                  <span>Total Billed Amount</span>
                  <span>{formatCurrency(grandTotal)}</span>
                </div>
              </div>

            </div>

            {/* Triggers links */}
            <div className="cart-actions-column">
              <button
                onClick={() => onRouteChange("checkout")}
                className="trigger-checkout-btn"
                id="checkout-trigger-btn"
              >
                Proceed To Secure Checkout <ArrowRight className="w-4 h-4 shrink-0" style={{ color: "#c3a475" }} />
              </button>
              
              <button
                onClick={() => onRouteChange("shop")}
                className="shun-checkout-btn"
              >
                Continue Selecting Rings
              </button>
            </div>
          </div>

        </div>
      ) : (
        /* Empty basket view */
        <div className="empty-cart-state-card">
          <div className="empty-cart-circle-icon">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="empty-cart-title">Your Jewelry Bag Is Empty</h2>
          <p className="empty-cart-desc">
            Beautiful moments are meant to be celebrated. Browse our stunning diamond catalogs to discover beautiful keepsakes, promise rings, and fine gifts.
          </p>
          <button
            onClick={() => onRouteChange("shop")}
            className="empty-cart-shop-btn"
          >
            <ShoppingBag className="w-4 h-4" /> Browse Catalog Collections
          </button>
        </div>
      )}

    </div>
  );
}

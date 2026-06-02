import { Facebook, Instagram, Phone, Clock, Mail, ChevronUp, MessageSquare } from "lucide-react";
import "./AppFooter.css";

export default function Footer({ onRouteChange }) {
  const handleNavClick = (route, params) => {
    onRouteChange(route, params);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="brand-footer" id="paris-footer">
      <div className="footer-grid-row">
        
        {/* Column 1: PARIS */}
        <div className="col-group">
          <h4 className="col-heading">
            PARIS
          </h4>
          <div className="col-links">
            <span onClick={() => handleNavClick("story")}>Our Story</span>
            <span onClick={() => handleNavClick("locator")}>Find A Store</span>
            <span onClick={() => handleNavClick("login")} className="font-bold text-[#c5a880]">Member Login & Registry</span>
            <span onClick={() => alert("Stay updated with latest brand announcements, lookbooks, and media highlights.")}>Press</span>
            <span onClick={() => alert("View and apply eligible promo discounts during checkout.")}>Promo Offers & Exlusions</span>
            <span onClick={() => handleNavClick("story")}>Careers</span>
          </div>
        </div>

        {/* Column 2: RESOURCES */}
        <div className="col-group">
          <h4 className="col-heading">
            RESOURCES
          </h4>
          <div className="col-links">
            <span onClick={() => alert("We support standard ring sizes 4-13. Resizing kit details dispatched upon request.")}>Sizing</span>
            <span onClick={() => handleNavClick("story")}>Blog</span>
            <span onClick={() => alert("Bespoke customized adjustments, claw retipping and high polish deep cleanings carried by master goldsmiths in premium boutiques.")}>Goldsmith Services</span>
            <span onClick={() => alert("Join our premium newsletter for exclusive lookbooks and styling updates.")}>Email Sign Up</span>
            <span onClick={() => handleNavClick("locator")} style={{ color: "#c5a880", fontWeight: 600 }}>Financing and Layaway</span>
          </div>
        </div>

        {/* Column 3: CUSTOMER CARE */}
        <div id="customer-care-col" className="col-group">
          <h4 className="col-heading">
            CUSTOMER CARE
          </h4>
          <div className="col-links">
            <span onClick={() => handleNavClick("orders")} className="font-bold text-[#c5a880]">Track Order Status</span>
            <span onClick={() => alert("Review frequently asked questions regarding insured shipping and lifetime warranties.")}>FAQ</span>
            <span onClick={() => alert("We offer a 30-day protected return or exchange for items in original unworn state with security tags intact.")}>Returns & Exchanges</span>
            <span onClick={() => alert("Complimentary expedited insured shipping on checkout values above $75 within Canada.")}>Shipping Policy</span>
            <span onClick={() => alert("Annual inspections, claw tightness checkups, and standard deep cleaning complimentary on all certified bridal purchases.")}>Jewellery Care Plan</span>
            <span onClick={() => alert("Need help immediately? Email helpdesk@parisjewellers.ca or telephone our hotline.")}>Contact Us</span>
          </div>
        </div>

        {/* Column 4: OUR CONTACTS */}
        <div className="col-group">
          <h4 className="col-heading">
            OUR CONTACTS
          </h4>
          <div className="col-links">
            <span onClick={() => alert("Call toll free: 1-866-78-PARIS")} className="flex items-center gap-2 contact-clickable-span">
              <Phone className="w-4 h-4 text-[#c5a880]" /> 1-866-78-PARIS
            </span>
            <span className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[#c5a880]" /> Mon - Fri: 8:30 - 17:00
            </span>
            <a href="mailto:online@parisjewellers.ca" className="flex items-center gap-2">
              <Mail className="w-4 h-4 text-[#c5a880]" /> online@parisjewellers.ca
            </a>

            {/* Social icons matching screenshot */}
            <div className="social-strip">
              <a href="https://facebook.com" target="_blank" rel="noreferrer" className="social-circle-btn">
                <Facebook className="w-4 h-4" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="social-circle-btn">
                <Instagram className="w-4 h-4" />
              </a>
              {/* Custom X Logo */}
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="social-circle-btn">
                <svg viewBox="0 0 24 24" className="w-3.5 h-3.5 fill-current">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              {/* Custom Pinterest Logo */}
              <a href="https://pinterest.com" target="_blank" rel="noreferrer" className="social-circle-btn">
                <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current">
                  <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.965 1.406-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.775 2.169 2.13 0 3.769-2.248 3.769-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.204 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.164 0 7.397 2.967 7.397 6.93 0 4.136-2.607 7.464-6.227 7.464-1.215 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12.017 24c6.62 0 11.983-5.367 11.983-11.987C24 5.367 18.63 0 12.017 0z"/>
                </svg>
              </a>
            </div>

            {/* Premium Logo Payment Cards exactly matching the picture */}
            <div className="payment-badges" id="footer-payment-badges-row">
              {/* VISA */}
              <div className="custom-payment-card visa-card" title="Visa">
                <svg viewBox="0 0 60 38" className="payment-svg">
                  <rect width="60" height="38" rx="4" fill="#1434CB" />
                  <text x="30" y="24" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="13" fill="#ffffff" textAnchor="middle" fontStyle="italic">VISA</text>
                  <polygon points="4,24 8,30 7,30 3,24" fill="#F7B600" />
                </svg>
              </div>

              {/* Mastercard */}
              <div className="custom-payment-card mastercard-card" title="Mastercard">
                <svg viewBox="0 0 60 38" className="payment-svg">
                  <rect width="60" height="38" rx="4" fill="#1b1b1b" />
                  <circle cx="24" cy="19" r="8" fill="#eb001b" opacity="0.95" />
                  <circle cx="36" cy="19" r="8" fill="#f79e1b" opacity="0.95" />
                  <path d="M 30,13.5 A 8,8 0 0,0 30,24.5 A 8,8 0 0,0 30,13.5" fill="#ff5f00" opacity="0.8" />
                </svg>
              </div>

              {/* PayPal */}
              <div className="custom-payment-card paypal-card" title="PayPal">
                <svg viewBox="0 0 60 38" className="payment-svg">
                  <rect width="60" height="38" rx="4" fill="#ffffff" />
                  <path d="M22,10 L28,10 C32,10 34,12 33,15 C32,18 30,19 26,19 L23,19 L21,28 L17,28 L22,10 Z" fill="#003087" />
                  <path d="M25,14 L31,14 C35,14 37,16 36,19 C35,22 33,23 29,23 L26,23 L24,32 L20,32 L25,14 Z" fill="#0079C1" opacity="0.85" />
                </svg>
              </div>

              {/* Amex */}
              <div className="custom-payment-card amex-card" title="American Express">
                <svg viewBox="0 0 60 38" className="payment-svg">
                  <rect width="60" height="38" rx="4" fill="#0170b2" />
                  <rect x="3" y="3" width="54" height="32" rx="2" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.3" />
                  <text x="30" y="23" fontFamily="'Montserrat', sans-serif" fontWeight="800" fontSize="9" fill="#ffffff" textAnchor="middle" letterSpacing="1">AMEX</text>
                </svg>
              </div>

              {/* Klarna */}
              <div className="custom-payment-card klarna-card" title="Klarna">
                <svg viewBox="0 0 60 38" className="payment-svg">
                  <rect width="60" height="38" rx="4" fill="#ffb3c7" />
                  <text x="30" y="24" fontFamily="'Inter', sans-serif" fontWeight="900" fontSize="12" fill="#000000" textAnchor="middle">Klarna.</text>
                </svg>
              </div>
            </div>

          </div>
        </div>

      </div>

      {/* 2. Bottom copyright block */}
      <div className="footer-ground-wrap">
        
        {/* Left: T&C + Copyright */}
        <div className="copyright-line">
          <div className="copyright-sublinks">
            <span className="copyright-link">Terms & Conditions</span>
            <span>|</span>
            <span className="copyright-link">Private Policy</span>
            <span>|</span>
            <span className="copyright-link">Accessibilities</span>
          </div>
        </div>

        {/* Right: Copyright Year */}
        <div className="copyright-year-box">
          &copy; 2024 Paris Jewellers. All Rights Reserved.
        </div>

      </div>

      {/* Circular floating scroll-to-top button stacked on the bottom-right */}
      <button 
        onClick={scrollToTop} 
        className="footer-scroll-top-btn"
        title="Scroll back to top"
      >
        <ChevronUp className="w-5 h-5 text-white" />
      </button>

      {/* Floating customer support messaging widget in bottom-right corner */}
      <div 
        className="footer-chat-widget-pillow"
        onClick={() => alert("Thank you for choosing Paris Jewellers Customer Support. Connecting you to a concierge assistant.")}
        title="Live Chat Assistance"
      >
        <MessageSquare className="w-5 h-5 text-white" />
      </div>

    </footer>
  );
}

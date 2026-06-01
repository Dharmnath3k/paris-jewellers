import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import "./HomeHeroSlider.css";

const slides = [
  {
    id: 1,
    image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=1600&auto=format&fit=crop&q=80",
    subtitle: "Up To",
    title: "25-50% OFF",
    tagline: "ALL BRIDAL",
    cta1: "SHOP ENGAGEMENT RINGS",
    cta2: "SHOP WEDDING BANDS",
    route1: "shop",
    params1: { category: "engagement" },
    route2: "shop",
    params2: { category: "wedding" }
  },
  {
    id: 2,
    image: "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=1600&auto=format&fit=crop&q=80",
    subtitle: "Sovereign Fine Artistry",
    title: "GLOW DIAMONDS",
    tagline: "DOUBLE THE NATURAL LIGHT VALUE",
    cta1: "EXPLORE GLOW LINE",
    cta2: "EXPLORE ALL PRODUCTS",
    route1: "shop",
    params1: { collection: "glow" },
    route2: "shop",
    params2: {}
  }
];

export default function HeroSlider({ onRouteChange }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % slides.length);
    }, 8000);
    return () => clearInterval(timer);
  }, []);

  const current = slides[index];

  return (
    <div className="hero-slider-container" id="paris-hero-slider">
      
      {/* Background Slides with Fade and Ken Burns Zoom effect */}
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          className="hero-slide-bg"
          style={{ 
            backgroundImage: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4) 0%, rgba(0, 0, 0, 0.5) 100%), url(${current.image})` 
          }}
          initial={{ opacity: 0, scale: 1.05 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.4, ease: "easeOut" }}
        />
      </AnimatePresence>

      {/* Centered Overlay Content matching Screenshot Page 1 */}
      <div className="hero-content-center">
        <div className="hero-inner-box">
          
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="hero-text-anim"
            >
              {/* Up To subtitle */}
              <span className="hero-subtitle-ital">
                {current.subtitle}
              </span>
              
              {/* 25-50% OFF Title */}
              <h2 className="hero-title-headline">
                {current.title}
              </h2>
              
              {/* ALL BRIDAL tagline */}
              <p className="hero-tagline-gold">
                {current.tagline}
              </p>

              {/* Action buttons stacked and framed elegantly like the official store */}
              <div className="hero-actions-container">
                <button
                  onClick={() => onRouteChange(current.route1, current.params1)}
                  className="hero-cta-btn"
                >
                  {current.cta1}
                </button>
                <button
                  onClick={() => onRouteChange(current.route2, current.params2)}
                  className="hero-cta-btn"
                >
                  {current.cta2}
                </button>
              </div>
            </motion.div>
          </AnimatePresence>

        </div>
      </div>

      {/* Manual Slide Dots indicator */}
      <div className="manual-dots-list">
        {slides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => setIndex(idx)}
            className={`manual-dot-btn ${index === idx ? "dot-active" : ""}`}
            title={`Slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

import { Award, Heart, Sprout } from "lucide-react";
import "./BrandStoryPageView.css";

export default function StoryView() {
  return (
    <div className="story-container">
      
      {/* 1. Header Banner */}
      <div className="story-banner">
        <span className="story-header-tag">
          THE APPRECIATED HAPPY BRAND
        </span>
        <h1 className="story-title-loud">
          Celebrating Your Sparkle Since 1987
        </h1>
        <div className="story-gold-divider-short" />
        <p className="story-intro-desc">
          Starting with a modest counter, Paris Jewellers has grown to operate exquisite flagships and virtual luxury lounges across Canada and India, grounded in heartfelt hospitality, family trust, and beautiful certified diamonds.
        </p>
      </div>

      {/* 2. Photo Grid and Introduction Essay */}
      <div className="founders-brick-grid">
        <div className="founders-image-carrier">
          <div className="founders-main-photo-pillow">
            <img 
              src="https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80" 
              alt="Humble beginnings" 
              referrerPolicy="no-referrer"
              className="founder-img-element"
            />
          </div>
          <div className="founders-absolute-stamp">
            <span>Owned & Run By</span>
            <span>Chau & Trang Lui</span>
          </div>
        </div>

        <div className="founders-text-carrier">
          <h2 className="founders-text-title">
            Our Founders&rsquo; Inspiring Journey
          </h2>
          <p className="founders-essay-paragraph">
            In 1980, our parents arrived from Vietnam with little English and nothing but a dream to build a secure, peaceful future. They settled and took apprenticeships at a local jewelry bench. Day and night, our mother polished gold rings, soldered gold claws, and learned the precision craft of fine diamonds.
          </p>
          <p className="founders-essay-paragraph">
            By 1987, through sheer dedication and saving every possible dollar, she opened a modest 400 square-foot outlet. As sisters growing up, Chau and Trang Lui spent their after-school evenings packaging velvet boxes, cleaning display cabinets, and learning our mother&rsquo;s core creed: <strong>&ldquo;Customer gratitude comes first. Treat everyone like family.&rdquo;</strong>
          </p>
          <p className="founders-essay-paragraph">
            Today, Chau and Trang lead Paris Jewellers with that exact same heartbeat. We have expanded our family to multiple physical retail showrooms across Canada and premium metropolitan flagships inside India, without ever losing our signature humble, personalized hospitality.
          </p>
        </div>
      </div>

      {/* 3. Paris Brand Guarantees and Principles */}
      <div className="story-guarantees-garrison">
        <div className="story-guarantees-titles">
          <span className="story-guarantees-header-lbl">THE HEART OF OUR PROCESS</span>
          <h2 className="story-guarantees-title-loud">Our Core Brand Guarantees</h2>
          <p className="story-guarantees-sub">Selected, polished, and finished with flawless integrity. Experience our three standard brand values:</p>
        </div>

        <div className="story-guarantees-tri-grid">
          
          <div className="guarantee-triple-card">
            <div className="guarantee-icon-circle">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="guarantee-card-title">1. Certified Ethical Sourcing</h3>
            <p className="guarantee-card-desc">
              We stand against conflict gems. Our diamonds conform strictly to the international Kimberley Process and carrying legal, trackable origin certificates.
            </p>
          </div>

          <div className="guarantee-triple-card">
            <div className="guarantee-icon-circle">
              <Sprout className="w-6 h-6" />
            </div>
            <h3 className="guarantee-card-title">2. Hallmarked & Recycled Gold</h3>
            <p className="guarantee-card-desc">
              Each piece of jewelry is forged using Indian BIS Hallmark standards and certified post-consumer recycled gold to ensure environmental consciousness and pure gold weight integrity.
            </p>
          </div>

          <div className="guarantee-triple-card">
            <div className="guarantee-icon-circle">
              <Heart className="w-6 h-6" />
            </div>
            <h3 className="guarantee-card-title">3. Giving Back Globally & Locally</h3>
            <p className="guarantee-card-desc">
              We are proud supporters of local child welfare foundations, Make-A-Wish, and educational programs. Over the years, our family enterprise has raised and donated significant funds to secure healthy futures for children with complex conditions.
            </p>
          </div>

        </div>
      </div>

      {/* 4. Timeline history snapshot cards */}
      <div className="milestones-dark-station">
        <div className="milestones-dark-inner">
          <h2 className="milestones-headline">
            Our Milestones Timeline
          </h2>

          <div className="milestones-flows-timeline">
            {/* Timeline node 1 */}
            <div className="milestone-node">
              <div className="milestone-bullet-circle" />
              <div className="milestone-text-block">
                <span className="milestone-year-text">1987</span>
                <h4 className="milestone-card-subtitle">The First Counter</h4>
                <p className="milestone-card-descr">Our parents open Paris Jewellers, serving citizens with exquisite jewelry repairs and handcrafted wedding bands.</p>
              </div>
            </div>

            {/* Timeline node 2 */}
            <div className="milestone-node">
              <div className="milestone-bullet-circle" />
              <div className="milestone-text-block">
                <span className="milestone-year-text">Corporate Succession</span>
                <h4 className="milestone-card-subtitle">Management Leadership and Brand Success</h4>
                <p className="milestone-card-descr">Sisters Chau and Trang Lui officially assume complete management, executing modern branding strategies and expanding locations.</p>
              </div>
            </div>

            {/* Timeline node 3 */}
            <div className="milestone-node">
              <div className="milestone-bullet-circle" />
              <div className="milestone-text-block">
                <span className="milestone-year-text">Today</span>
                <h4 className="milestone-card-subtitle">Global Presence and Multiple Flagships</h4>
                <p className="milestone-card-descr">National and international expansion, serving fine jewelry appreciators across Canada and India with certified diamonds and BIS hallmarked gold.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  );
}

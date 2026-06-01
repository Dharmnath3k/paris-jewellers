/**
 * Dynamic API Layer for Paris Jewellers Clone
 * 
 * To integrate your own real backend database later, simply uncomment the fetch template 
 * inside the functions and provide your backend API URLs.
 */

// Local static product data represented in Indian Rupees (₹) for luxury retail
const productsData = [
  {
    id: "glow-emerald-halo",
    name: "The Glow Emerald-Cut Halo Diamond Ring",
    price: 249999,
    originalPrice: 299999,
    category: "engagement",
    collection: "glow",
    images: [
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Part of our signature Glow Diamond Collection, this breathtaking ring features an emerald-cut center-stone framed by a brilliant halo of round-cut diamonds. Paris Jewellers' unique multi-faceted setting reflects maximum light, causing the diamonds to glow from every possible angle.",
    details: [
      "Center Stone: 0.70 Carat Emerald-Cut Certified Diamond",
      "Total Weight: 1.25 Carat Total Weight (CTW)",
      "Diamond Color: G-H, Diamond Clarity: SI1-SI2",
      "Band Width: 1.8mm sleek luxury profile",
      "Crafted in India with premium hand-polishing",
      "Comes with Paris Jewellers Lifetime Guarantee"
    ],
    metals: ["14kt White Gold", "14kt Yellow Gold", "14kt Rose Gold"],
    sizes: [5, 5.5, 6, 6.5, 7, 7.5, 8, 8.5],
    carat: "1.25 ctw",
    isBestSeller: true,
    isNewArrival: false,
    isCanadianMined: false,
    rating: 4.9,
    reviewsCount: 38,
    reviews: [
      {
        id: "r1",
        author: "Sarah M.",
        rating: 5,
        date: "2026-03-12",
        title: "Dazzling and Unique!",
        content: "My fiancé proposed with this ring and I am in complete awe. The glow is unbelievable under the sun, it feels like it has its own light source! I get compliments on it every single day.",
        verified: true
      },
      {
        id: "r2",
        author: "David K.",
        rating: 5,
        date: "2026-04-05",
        title: "Phenomenal guidance",
        content: "Bought this at the premium showroom. The hospitality is top-tier. The ring fits perfect and she said YES!",
        verified: true
      }
    ]
  },
  {
    id: "disney-cinderella-carriage",
    name: "Enchanted Disney Cinderella Carriage Diamond Ring",
    price: 129999,
    originalPrice: 159999,
    category: "engagement",
    collection: "disney",
    images: [
      "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Celebrate your royal love story with this officially licensed Enchanted Disney Fine Jewelry Cinderella Carriage ring. Exquisitely shaped like a fairytale carriage outline in high-clarity diamonds, with elegant filigree and tiara scroll crowns in two-tone precious gold.",
    details: [
      "Total Diamond Weight: 0.50 Carat Total Weight",
      "Setting: Majestic Carriage Design in Two-Tone finish",
      "Diamond Color: I, Diamond Clarity: I1",
      "Official Disney Licensed Collection with Certificate of Authenticity",
      "Polished to a flawless mirror shine"
    ],
    metals: ["14kt White & Yellow Gold Two-Tone", "14kt White & Rose Gold Two-Tone"],
    sizes: [5, 6, 7, 8, 9],
    carat: "0.50 ctw",
    isBestSeller: true,
    isNewArrival: false,
    isCanadianMined: false,
    rating: 4.8,
    reviewsCount: 52,
    reviews: [
      {
        id: "r3",
        author: "Grace L.",
        rating: 5,
        date: "2026-01-20",
        title: "A dream come true",
        content: "This feels like a true princess ring. The details on the carriage side-profile are absolutely exquisite. I cannot stop staring at it on my hand.",
        verified: true
      }
    ]
  },
  {
    id: "canadian-maple-leaf-solitaire",
    name: "Maple Leaf Diamonds Certified Canadian Solitaire Ring",
    price: 399999,
    originalPrice: 469999,
    category: "engagement",
    collection: "canadian",
    images: [
      "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Representing the pristine beauty of the Canadian North, this magnificent solitaire engagement ring features a certified Maple Leaf Diamond. Mined ethically in Canada's Northwest Territories, laser inscribed with a unique trackable registry number and a tiny maple leaf symbol.",
    details: [
      "Center Diamond: 1.00 Carats of Pure Ethical Canadian Diamond",
      "Exquisite 6-prong high crown setting",
      "Ethical Traceability: Trackable right back to the northern mine",
      "Diamond Color: F-G (Premium Colorless), Clarity: VS2",
      "Includes Maple Leaf Certificate & Canada Mark card"
    ],
    metals: ["18kt White Gold & Canadian Gold", "18kt Yellow Gold & Canadian Gold"],
    sizes: [5, 6, 7, 8],
    carat: "1.00 ct.",
    isBestSeller: false,
    isNewArrival: true,
    isCanadianMined: true,
    rating: 5.0,
    reviewsCount: 19,
    reviews: [
      {
        id: "r4",
        author: "Emily T.",
        rating: 5,
        date: "2026-05-02",
        title: "Pure northern brilliance",
        content: "Knowing my diamond is 100% ethically mined in Canada is very important to me. The stone is incredibly clean and reflects light beautifully.",
        verified: true
      }
    ]
  },
  {
    id: "disney-belle-rose",
    name: "Enchanted Disney Belle Rose Tourmaline & Diamond Ring",
    price: 99999,
    originalPrice: 119999,
    category: "engagement",
    collection: "disney",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1543294001-f7cbfe92237e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Inspired by Belle's enchanted rose, this breathtaking rose gold ring holds a vibrant pink tourmaline center-stone nestled in detailed rose petals covered in micro-paved sparkling white diamonds. Perfect for an unconventional, romantic engagement.",
    details: [
      "Gemstone: Vibrant Round Pink Tourmaline",
      "Diamond Accents: 0.25 Carat Total Weight",
      "Metal: 14kt Rose Gold",
      "Authentic Enchanted Disney Fine Jewelry stamp",
      "Exclusive vintage detailing"
    ],
    metals: ["14kt Rose Gold", "14kt Yellow Gold"],
    sizes: [5, 6, 7, 8],
    carat: "0.25 Ctw Accents",
    isBestSeller: false,
    isNewArrival: true,
    isCanadianMined: false,
    rating: 4.7,
    reviewsCount: 12
  },
  {
    id: "chantilly-vintage-lace-morganite",
    name: "Chantilly Vintage Lace Cushion Morganite Ring",
    price: 79999,
    originalPrice: 99999,
    category: "engagement",
    collection: "chantilly",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Our Chantilly Lace collection is designed to capture the elegance of vintage bridal veils. Features a pillow-soft cushion-cut pink morganite focal stone encircled by a delicate lace border of milgrain beads and round-cut diamonds.",
    details: [
      "Focal Stone: 8mm Genuine Cushion Pink Morganite",
      "Diamond Halo: 0.15 Carat Total Weight SI clarity",
      "Delicate vintage hand-carved beaded milgrain styling",
      "Extremely comfortable tapered wear profile"
    ],
    metals: ["14kt Rose Gold", "14kt White Gold", "14kt Yellow Gold"],
    sizes: [5, 6, 7, 8, 9],
    isBestSeller: true,
    isNewArrival: false,
    isCanadianMined: false,
    rating: 4.9,
    reviewsCount: 24
  },
  {
    id: "wedding-diamond-infinity",
    name: "Serendipity Diamond Curved Wedding Band",
    price: 49999,
    originalPrice: 59999,
    category: "wedding",
    collection: "serendipity",
    images: [
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&auto=format&fit=crop&q=80"
    ],
    description: "The Serendipity curved band is designed with a gentle contour to sit perfectly flush next to most engagement rings. Embedded with micro-set diamonds for a delicate shimmer that outlines your proposal solitaire.",
    details: [
      "Diamond Weight: 0.20 Carat Total Weight",
      "Shape: Contoured Curved Nesting Ring Profile",
      "Perfect match for solitaires, ovals, and pear shapes",
      "Available in multiple premium golds"
    ],
    metals: ["14kt Yellow Gold", "14kt White Gold", "14kt Rose Gold"],
    sizes: [5, 6, 7, 8, 9],
    rating: 4.6,
    reviewsCount: 15
  },
  {
    id: "wedding-mens-milgrain",
    name: "Classic Milgrain Comfort-Fit Men's Band",
    price: 59999,
    originalPrice: 69999,
    category: "wedding",
    images: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&auto=format&fit=crop&q=80"
    ],
    description: "A premium 6mm men's wedding band combining high-polish borders and a brushed matte center divided by exquisite handmade milgrain tracks. Crafted with a heavy comfort-fit rounded interior.",
    details: [
      "Band Width: 6mm heavy masculine scale",
      "Inside: Domed comfort-fit interior profiles",
      "Finish: Center brushed matte, side bevels high-polish",
      "Ultra durable everyday luxury design"
    ],
    metals: ["14kt White Gold", "14kt Yellow Gold", "Platinum"],
    sizes: [8, 9, 10, 11, 12, 13],
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 46
  },
  {
    id: "necklace-glow-pendant",
    name: "The Glow Round Diamond Pendant Necklace",
    price: 89999,
    originalPrice: 109999,
    category: "necklaces",
    collection: "glow",
    images: [
      "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Give the gift of celestial light with our classic Glow Diamond Pendant. Features a round-cut diamond suspended inside our signature faceted setting. Hangs gracefully from a 14kt fine gold cable chain.",
    details: [
      "Total Carat Weight: 0.35 Carat Center-Stone",
      "Setting: High brilliance faceted 4-prong base",
      "Chain: 18-inch adjustable 14kt Gold Cable Chain",
      "Secured with convenient lobster lock clasp"
    ],
    metals: ["14kt Yellow Gold", "14kt White Gold", "14kt Rose Gold"],
    isBestSeller: true,
    rating: 4.9,
    reviewsCount: 30
  },
  {
    id: "necklace-disney-ariel",
    name: "Enchanted Disney Ariel Princess Diamond Necklace",
    price: 44999,
    originalPrice: 54999,
    category: "necklaces",
    collection: "disney",
    images: [
      "https://images.unsplash.com/photo-1611085583191-a3b1a30def5f?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Inspired by Disney's Ariel, this whimsical starfish necklace is decorated with paved shimmering diamonds and a genuine purple amethyst gemstone at the center. Bring the magical ocean tide style with you, wherever you go.",
    details: [
      "Gemstone: 3mm Natural Dark Amethyst",
      "Accent Diamonds: 0.10 Carat Total Weight",
      "Official fine Enchanted Disney hallmark on rear",
      "Comes with beautiful signature sea glass shell boxed case"
    ],
    metals: ["14kt Yellow Gold", "Sterling Silver & Rose Gold Accent"],
    rating: 4.7,
    reviewsCount: 18
  },
  {
    id: "earrings-diamond-bezels",
    name: "Classic Bezel-Set Round Diamond Studs",
    price: 39999,
    originalPrice: 49999,
    category: "earrings",
    images: [
      "https://images.unsplash.com/photo-1635767798638-3e25273a8236?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Essential style for daily wear. Clean, minimalist bezel settings trace the perimeter of two round brilliant-cut diamonds, adding contemporary sparkle that never catches on fabrics or hair.",
    details: [
      "Diamond Weight: 0.25 Carat Total Weight (Pair)",
      "Setting Type: Modern Bezel edge cups",
      "Safety: Sturdy threaded post screw-backs"
    ],
    metals: ["14kt White Gold", "14kt Yellow Gold", "14kt Rose Gold"],
    isBestSeller: true,
    rating: 4.8,
    reviewsCount: 65
  },
  {
    id: "earrings-disney-snowflake",
    name: "Enchanted Disney Elsa Snowflake Diamond Earrings",
    price: 64999,
    originalPrice: 79999,
    category: "earrings",
    collection: "disney",
    images: [
      "https://images.unsplash.com/photo-1630019852942-f89202989a59?w=800&auto=format&fit=crop&q=80"
    ],
    description: "Channel Elsa's ice palace elegance with these stunning, multi-tiered snowflake drop-earrings. Gleaming with iced white diamonds and soft blue aquamarine highlights, they capture light with every sway.",
    details: [
      "Accent Stones: Genuine Light Blue Aquamarines",
      "Diamonds: Paved 0.30 Carat ctw SI clarity",
      "Official Disney Enchanted Elsa collection item",
      "Drop Length: 1.25 inches delicate movement"
    ],
    metals: ["14kt White Gold", "Sterling Silver & 10kt Gold Accents"],
    isNewArrival: true,
    rating: 4.9,
    reviewsCount: 11
  },
  {
    id: "bracelet-infinity-links",
    name: "Infinity Diamond Seamless Link Bracelet",
    price: 119999,
    originalPrice: 139999,
    category: "bracelets",
    images: [
      "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&auto=format&fit=crop&q=80"
    ],
    description: "An elegant row of alternating high-polished gold infinity symbols and shimmering diamond blocks. A beautiful tribute to everlasting love and appreciation, and perfect for stacking with luxury watches.",
    details: [
      "Length: Standard 7-inch wrist drape scale",
      "Diamonds: 0.50 Carat Total Weight",
      "Clasp: Invisible fold-over safety lock clasp"
    ],
    metals: ["14kt Yellow Gold", "14kt White Gold", "14kt Rose Gold"],
    rating: 4.7,
    reviewsCount: 22
  }
];

// Local static showroom stores data represented for local support
const storesData = [
  {
    id: "delhi-dlf",
    name: "Paris Jewellers - DLF Emporio Showroom",
    address: "Second Floor, DLF Emporio, Nelson Mandela Marg, Vasant Kunj, New Delhi, Delhi 110070",
    phone: "+91 11-46098200",
    city: "Delhi",
    province: "Delhi NCR",
    hours: {
      weekdays: "11:00 AM - 9:00 PM",
      saturday: "11:00 AM - 10:00 PM",
      sunday: "11:00 AM - 10:00 PM"
    }
  },
  {
    id: "mumbai-palladium",
    name: "Paris Jewellers - Palladium Mall Showroom",
    address: "First Floor, Palladium Mall, High Street Phoenix, Senapati Bapat Marg, Lower Parel, Mumbai, Maharashtra 400013",
    phone: "+91 22-43470000",
    city: "Mumbai",
    province: "Maharashtra",
    hours: {
      weekdays: "11:00 AM - 10:00 PM",
      saturday: "11:00 AM - 10:30 PM",
      sunday: "11:00 AM - 10:30 PM"
    }
  },
  {
    id: "bangalore-ubcity",
    name: "Paris Jewellers - UB City Collection",
    address: "Ground Floor, UB City Piazza, Vittal Mallya Road, Bengaluru, Karnataka 560001",
    phone: "+91 80-41738888",
    city: "Bengaluru",
    province: "Karnataka",
    hours: {
      weekdays: "10:30 AM - 8:30 PM",
      saturday: "10:30 AM - 9:00 PM",
      sunday: "11:00 AM - 9:00 PM"
    }
  }
];

const provincesList = ["All Regions", "Delhi NCR", "Maharashtra", "Karnataka"];

/**
 * Helper to format price values dynamically in INR, CAD or USD
 * INR uses the original base values formatted in Indian Style (e.g. ₹2,49,999)
 * CAD uses original base values formatted as standard dollar (e.g. $249,999.00)
 * USD converts with a 0.73 exchange rate (e.g. $182,499.27)
 * @param {number} amount - The amount to format
 * @param {string} [currency] - Optional currency selection overriding default
 * @returns {string} The styled currency value
 */
export function formatCurrency(amount, currency = null) {
  const activeCurrency = currency || localStorage.getItem("paris_cl_currency") || "INR";
  if (activeCurrency === "INR") {
    return "₹" + Number(amount).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 2 });
  }
  if (activeCurrency === "USD") {
    const converted = amount * 0.73;
    return "$" + converted.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  }
  // Default to CAD as backup originator brand
  return "$" + Number(amount).toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

/**
 * Fetch all products dynamically from backend or local database
 * To connect to your real API:
 * 1. Uncomment the fetch code
 * 2. Set the actual REST API endpoint URL
 * 3. Make sure your server returns the appropriate products array format
 */
export async function fetchProducts() {
  /*
  try {
    const response = await fetch("https://your-api-domain.com/api/products");
    if (!response.ok) throw new Error("API call failed");
    return await response.json();
  } catch (error) {
    console.warn("Falling back to local high-fidelity products dataset:", error);
    return productsData;
  }
  */
  
  // Simulated database network latency
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(productsData);
    }, 150);
  });
}

/**
 * Fetch store locations dynamically
 */
export async function fetchStores() {
  /*
  try {
    const response = await fetch("https://your-api-domain.com/api/stores");
    if (!response.ok) throw new Error("API call failed");
    return await response.json();
  } catch (error) {
    console.warn("Falling back to local high-fidelity stores dataset:", error);
    return storesData;
  }
  */
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ stores: storesData, provinces: provincesList });
    }, 150);
  });
}

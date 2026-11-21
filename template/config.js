/**
 * ═══════════════════════════════════════════════════════════════
 *  AYA CORE STUDIOS — Hospitality Site Template
 *  config.js  —  Edit this file only. Everything else auto-fills.
 * ═══════════════════════════════════════════════════════════════
 *
 *  HOW TO USE:
 *  1. Fill in every field below for your new client.
 *  2. Drop their photos into the images/ folder using the filenames
 *     referenced in IMAGES and ROOMS[].image below.
 *  3. Open index.html in a browser — done.
 *  4. If the brand font is a custom TTF, place it in fonts/ and set
 *     BRAND_FONT.type to "local". Otherwise use a Google Fonts name.
 * ═══════════════════════════════════════════════════════════════
 */

window.SITE = {

  /* ── IDENTITY ─────────────────────────────────────────────── */
  PROPERTY_NAME:   "Nonesi Lodge",
  TAGLINE:         "Southbourne · Komani, Eastern Cape",
  SITE_URL:        "https://nonesi-lodge.vercel.app",

  /* ── HERO ──────────────────────────────────────────────────── */
  HERO: {
    greeting:    "Molo,\nwamkelekile.",   // \n = line break in the greeting
    location:    "Southbourne · Komani, Eastern Cape",
    description: "A warm B&B and self-catering stay in Queenstown, Eastern Cape.",
    description_extra: " For families, business travellers, and anyone who'd rather feel at home than just checked in.",
  },

  /* ── BRAND COLORS ──────────────────────────────────────────── */
  // Change these to match each client's brand. Use CSS hex values.
  COLORS: {
    green:    "#2C4235",   // primary — nav, headings, footer
    gold:     "#C86D51",   // accent — buttons, eyebrows, highlights
    gold_h:   "#B35A3E",   // accent hover
    bg:       "#FBF9F5",   // page background
    surface:  "#F2EFE8",   // alternating section surface
  },

  /* ── BRAND FONT ─────────────────────────────────────────────── */
  // For a custom local TTF: type "local", file "fonts/YourFont.ttf"
  // For a Google Font: type "google", name "Great Vibes" (loaded automatically)
  BRAND_FONT: {
    type:   "local",           // "local" | "google"
    file:   "fonts/Geraldine.ttf",   // only used when type = "local"
    name:   "Geraldine",       // font-family name used in CSS
    google: "",                // Google Fonts family name (type = "google" only)
  },

  /* ── CONTACT ───────────────────────────────────────────────── */
  CONTACT: {
    phone1:      "072 570 3772",
    phone1_href: "+27725703772",
    phone2:      "071 414 7919",
    phone2_href: "+27714147919",
    email:       "nonesilodge@gmail.com",
    address_line1: "24 Komani Street, Southbourne",
    address_line2: "Komani (Queenstown), 5320, Eastern Cape",
    whatsapp:    "+27725703772",   // number for wa.me links (no spaces/dashes)
    instagram:   "https://www.instagram.com/nonesi_lodge_",
  },

  /* ── ABOUT SECTION ─────────────────────────────────────────── */
  ABOUT: {
    pull:  "Nonesi Lodge is a B&B and self-catering lodge in Southbourne. Friendly staff, a relaxed feel, and Queenstown's shops and restaurants close by.",
    body:  "Whether you're here for work, a family occasion, or just passing through Komani — we welcome you like a neighbour, not a reservation number.",
    badge: "Komani, EC",
    // 3 stat boxes
    stats: [
      { num: "4",    suffix: "",   label: "Room types"      },
      { num: "1.3",  suffix: "km", label: "To town centre"  },
      { num: "24",   suffix: "hr", label: "Secure access"   },
    ],
    // Up to 10 highlight ticks. icon: one of the icon keys defined in index.html
    ticks: [
      { icon: "calendar", text: "Check-in from 14:00 · Check-out by 10:00" },
      { icon: "parking",  text: "Free private parking & Wi-Fi throughout" },
      { icon: "pool",     text: "Outdoor swimming pool & well-groomed garden" },
      { icon: "coffee",   text: "Hearty breakfast available on request — ask when booking" },
      { icon: "clean",    text: "Daily housekeeping, laundry & ironing" },
      { icon: "events",   text: "Event & function venue setup available" },
      { icon: "power",    text: "Backup power & water supply on-site" },
      { icon: "security", text: "Security alarm, heating, non-smoking rooms" },
      { icon: "payment",  text: "Visa, Mastercard, Maestro & cashless payments" },
      { icon: "family",   text: "Quiet, family-friendly — no parties or groups" },
    ],
  },

  /* ── IMAGES ────────────────────────────────────────────────── */
  IMAGES: {
    hero:            "images/hero.png",
    about_main:      "images/gallery-pool.png",    // large photo in About cluster
    about_secondary: "images/about-main.png",      // small overlapping photo
    footer_bg:       "images/about-main.png",      // blurred footer background
  },

  /* ── ROOMS ─────────────────────────────────────────────────── */
  // Up to 6 rooms. Remove entries for fewer rooms.
  ROOMS: [
    {
      name:       "Double or Twin Room",
      image:      "images/room-twin.png",
      image_alt:  "Double or Twin Room interior",
      portrait:   false,    // true = portrait photo (gets CSS contain treatment)
      specs:      ["Sleeps 2", "16 m²", "Double / Twin bed", "Private bathroom"],
      amenities:  [
        { icon: "view",    text: "Garden view & private terrace" },
        { icon: "wifi",    text: "Free Wi-Fi" },
        { icon: "tv",      text: "Flat-screen TV with Netflix" },
        { icon: "desk",    text: "Work desk" },
        { icon: "kitchen", text: "Fridge, microwave & kettle" },
        { icon: "safe",    text: "Safety deposit box" },
      ],
      price:      "R700",
      select_key: "Double or Twin Room",   // text pre-filled in booking form
    },
    {
      name:       "Deluxe Double Room",
      image:      "images/gallery-rooms.png",
      image_alt:  "Deluxe Double Room interior",
      portrait:   false,
      img_position: "center 25%",
      specs:      ["Sleeps 2", "16 m²", "Double bed", "Shower bathroom"],
      amenities:  [
        { icon: "wifi",    text: "Free Wi-Fi" },
        { icon: "tv",      text: "Flat-screen TV with Netflix" },
        { icon: "desk",    text: "Work desk" },
        { icon: "kitchen", text: "Fridge, microwave & kettle" },
        { icon: "safe",    text: "Safety deposit box" },
        { icon: "heating", text: "Heating" },
      ],
      price:      "R750",
      select_key: "Deluxe Double Room with Shower",
    },
    {
      name:       "Family Room <em style='font-size:.82em;opacity:.65'>with Shower</em>",
      image:      "images/room-family-beds.png",
      image_alt:  "Family Room with two beds",
      portrait:   true,
      specs:      ["Sleeps 3", "20 m²", "3 Single beds", "Shower bathroom"],
      amenities:  [
        { icon: "view",    text: "Garden view" },
        { icon: "wifi",    text: "Free Wi-Fi" },
        { icon: "tv",      text: "Flat-screen TV with Netflix" },
        { icon: "desk",    text: "Work desk" },
        { icon: "kitchen", text: "Fridge, microwave & kettle" },
        { icon: "heating", text: "Heating" },
      ],
      price:      "R850",
      select_key: "Family Room with Shower",
    },
    {
      name:       "Family Room",
      image:      "images/room-terrace.png",
      image_alt:  "Family Room private terrace",
      portrait:   true,
      specs:      ["Sleeps 4", "22 m²", "Double + Twin beds", "Private bathroom"],
      amenities:  [
        { icon: "terrace", text: "Private terrace" },
        { icon: "wifi",    text: "Free Wi-Fi" },
        { icon: "tv",      text: "Flat-screen TV with Netflix" },
        { icon: "desk",    text: "Work desk" },
        { icon: "kitchen", text: "Fridge, microwave & kettle" },
        { icon: "heating", text: "Heating" },
      ],
      price:      "R950",
      select_key: "Family Room",
    },
  ],

  /* ── GALLERY ───────────────────────────────────────────────── */
  // First 6 show in the mosaic grid. All items (including extras) go in the lightbox.
  GALLERY: [
    { src: "images/about-main.png",           alt: "Thatched lounge and pool",      caption: "Lodge & Pool",       position: "center 40%" },
    { src: "images/gallery-entrance.png",     alt: "Lodge entrance and arrival",    caption: "Arrival",            position: "center 20%" },
    { src: "images/gallery-rooms.png",        alt: "Comfortable guest rooms",       caption: "Guest Rooms",        position: "center 30%" },
    { src: "images/gallery-events-actual.png",alt: "Formal dining setup",           caption: "Events & Dining",    position: "center 25%" },
    { src: "images/gallery-selfcatering.png", alt: "Self-catering kitchenette",     caption: "Self-Catering",      position: "center 30%" },
    { src: "images/gallery-pool.png",         alt: "Garden and poolside",           caption: "Garden & Pool",      position: "center"     },
    // Extra images — appear in lightbox thumbnail strip only
    { src: "images/gallery-selfcatering.png", alt: "Self-catering kitchenette",     caption: "Self-Catering" },
    { src: "images/room-terrace.png",         alt: "Private terrace",               caption: "Private Terrace" },
    { src: "images/room-family-beds.png",     alt: "Family room",                   caption: "Family Room" },
    { src: "images/gallery-rooms.png",        alt: "Rooms",                         caption: "Rooms" },
    { src: "images/gallery-events.png",       alt: "Amenities",                     caption: "Amenities" },
    { src: "images/gallery-flyer.png",        alt: "Lodge overview",                caption: "Lodge Overview" },
  ],

  /* ── LOCATION ──────────────────────────────────────────────── */
  LOCATION: {
    heading:     "Close to town,\nquiet at night.",
    map_embed:   "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3313.1!2d26.8742!3d-31.8975!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x1e8f4b3c4c4c4c4c%3A0x4c4c4c4c4c4c4c4c!2s24%20Komani%20St%2C%20Southbourne%2C%20Komani%2C%205320!5e0!3m2!1sen!2sza!4v1699999999999!5m2!1sen!2sza",
    map_label:   "24 Komani Street, Southbourne",
    landmarks: [
      { name: "Queenstown City Centre",          dist: "1.3 km"   },
      { name: "Queenstown Frontier Museum",      dist: "1.4 km"   },
      { name: "NG Church Queenstown",            dist: "1.8 km"   },
      { name: "Lawrence De Lange Nature Reserve",dist: "4.0 km"   },
      { name: "Longhill Game Reserve",           dist: "4.1 km"   },
      { name: "Queenstown Golf Club",            dist: "~\u200A4.2 km" },
    ],
    walking: [
      { name: "Tiffany's Tavern",   dist: "350 m" },
      { name: "KFC Nonesi Mall",    dist: "350 m" },
      { name: "Wimpy",              dist: "400 m" },
      { name: "Equatorial Coffee",  dist: "750 m" },
    ],
  },

  /* ── REVIEWS ───────────────────────────────────────────────── */
  REVIEWS: {
    rating:      "4.7",
    platform:    "Google",
    items: [
      {
        quote:  "The room was exactly as in the pictures and spacious enough for a couple to stay for a night. TV with Netflix was a pleasant surprise!",
        name:   "Verified Couple",
        source: "Booking.com",
      },
      {
        quote:  "Friendly host and very helpful. Easily accessible location close to everything in town.",
        name:   "Verified Guest",
        source: "Booking.com",
      },
      {
        quote:  "Great stopover in Komani — the electric blanket was such a thoughtful touch for chilly Eastern Cape nights.",
        name:   "Verified Group Stay",
        source: "Booking.com",
      },
    ],
  },

  /* ── FAQ ───────────────────────────────────────────────────── */
  FAQ: [
    {
      q: "What are the check-in and check-out times?",
      a: "Standard check-in is from 14:00 to 20:00, and check-out is by 10:00. Arriving later in the evening? Just let us know in advance on WhatsApp and we'll arrange a smooth arrival.",
    },
    {
      q: "Is breakfast included, and what are the options?",
      a: "A hearty breakfast is available on request — just let us know when you book or message us on WhatsApp. The lodge also has full self-catering facilities in every room (fridge, microwave, kettle) if you prefer to sort yourself out.",
    },
    {
      q: "Are children and families welcome?",
      a: "Absolutely — children of all ages are welcome. We're a quiet, family-friendly lodge. Cribs and extra beds aren't available, and pets aren't permitted on the premises.",
    },
    {
      q: "What payments do you accept?",
      a: "Card and cashless payments — Visa, Mastercard, and Maestro. Cash is not accepted on-site.",
    },
    {
      q: "What is your cancellation and group policy?",
      a: "Cancellation terms depend on the room and dates — we'll communicate these clearly upfront. We're a quiet family lodge; we don't accommodate bachelor, bachelorette, or similar party groups.",
    },
  ],

  /* ── BOOKING SECTION ───────────────────────────────────────── */
  BOOKING: {
    heading:     "Let's sort your stay.",
    description: "Send your dates and we'll reply via WhatsApp with availability and rates — usually within a few hours.",
  },

  /* ── SEO / META ────────────────────────────────────────────── */
  SEO: {
    title:       "Nonesi Lodge | B&B & Self-Catering in Komani, Queenstown",
    description: "Warm B&B and self-catering accommodation in Southbourne, Komani (Queenstown), Eastern Cape. Family rooms, pool, garden, free Wi-Fi.",
    og_title:    "Nonesi Lodge | B&B & Self-Catering in Komani",
    og_desc:     "A warm, family-friendly lodge in Southbourne, Komani. Pool, garden, 4 room types, free Wi-Fi. Book directly via WhatsApp.",
    og_image:    "images/hero.png",
    favicon_letter: "N",   // Single letter for the SVG favicon
  },

  /* ── STUDIO CREDIT ─────────────────────────────────────────── */
  STUDIO_URL: "https://ayacorestudios.vercel.app",

};

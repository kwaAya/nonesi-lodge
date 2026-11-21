# Aya Core Studios — Hospitality Site Template

A fully reusable, single-file hospitality website. Every client-specific value lives in `config.js`. The HTML and CSS never need to change between clients.

---

## Folder structure

```
template/
├── index.html        ← The site. Never edit this directly.
├── config.js         ← Edit this for every new client.
├── fonts/            ← Drop custom TTF/OTF brand fonts here.
│   └── Geraldine.ttf
├── images/           ← Drop client photos here (see naming guide below).
│   ├── hero.png
│   ├── about-main.png
│   ├── gallery-pool.png
│   ├── room-twin.png
│   └── …
└── README.md
```

---

## How to spin up a new client in 4 steps

### 1. Copy the template folder

Duplicate this entire `template/` folder and rename it to the client's property name, e.g. `valley-view-lodge/`.

```
cp -r template/ valley-view-lodge/
```

### 2. Edit `config.js`

Open `config.js` and fill in every field. The file is fully commented — every section explains what it controls. Key things to change:

| Section | What to update |
|---|---|
| `PROPERTY_NAME` | Client's lodge / B&B name |
| `TAGLINE` | Suburb · Town, Province |
| `SITE_URL` | Final Vercel URL once deployed |
| `HERO` | Greeting text, location label, description |
| `COLORS` | Brand palette (see Color Guide below) |
| `BRAND_FONT` | Local TTF or Google Font (see Font Guide below) |
| `CONTACT` | Phone, email, WhatsApp number, Instagram |
| `ABOUT` | Pull quote, body copy, badge text, stats, ticks |
| `IMAGES` | Filenames for hero, about cluster, footer bg |
| `ROOMS` | 1–6 rooms with specs, amenities, price, image |
| `GALLERY` | 6 mosaic images + extras for the lightbox strip |
| `LOCATION` | Google Maps embed URL, address, distances |
| `REVIEWS` | Rating, platform, 3 review cards |
| `FAQ` | 3–6 Q&A accordion items |
| `BOOKING` | Heading and description text |
| `SEO` | Page title, meta description, OG tags |

### 3. Add photos

Drop the client's photos into the `images/` folder using the filenames you set in `config.js`. Recommended sizes:

| Image | Recommended size | Notes |
|---|---|---|
| `hero.png` | 1600 × 1000 px min | Landscape. Best: exterior, pool, or garden. |
| `about-main.png` | 900 × 1100 px | Portrait-ish. The larger About cluster photo. |
| `about-secondary.png` | 700 × 850 px | Smaller overlapping photo. |
| `gallery-*.png` | 1200 × 900 px | Landscape preferred for the mosaic grid. |
| `room-*.png` | 800 × 600 px | 4:3 ratio works best on the cards. |

**Portrait photos** (taller than wide) still work for room cards — set `portrait: true` on that room entry in `config.js` and the card will use `object-fit: contain` instead of cropping.

If a photo is in portrait orientation but you want it to show as landscape in the gallery mosaic, crop it first. The mosaic grid uses fixed-height rows.

### 4. Deploy

#### Local preview
Open `index.html` directly in Chrome — it works without a build step or server.

#### Vercel (recommended)
```bash
# From inside the client's folder
git init
git add .
git commit -m "Initial: [Client Name] site"
gh repo create [client-name] --public --source=. --remote=origin --push
```
Then connect the repo on [vercel.com/new](https://vercel.com/new). Vercel detects it as a static site automatically — no build config needed.

---

## Color guide

The `COLORS` block in `config.js` maps directly to CSS custom properties:

```js
COLORS: {
  green:    "#2C4235",   // → --green   (primary: nav, headings, footer bg)
  gold:     "#C86D51",   // → --gold    (accent: buttons, eyebrows, icons)
  gold_h:   "#B35A3E",   // → --gold-h  (accent hover — slightly darker)
  bg:       "#FBF9F5",   // → --bg      (page background)
  surface:  "#F2EFE8",   // → --surface (alternating section background)
}
```

**Tips for choosing a client palette:**
- Keep `green` dark enough for white text to pass WCAG AA contrast on the footer.
- `gold` should read clearly on both the dark (`green`) and light (`bg`) backgrounds.
- `surface` should be a slightly warmer/cooler tint of `bg` — not dramatically different.
- Test contrast at [webaim.org/resources/contrastchecker](https://webaim.org/resources/contrastchecker).

**Warm palette examples for other accommodation types:**

| Style | green | gold | bg |
|---|---|---|---|
| Coastal / Beach house | `#1A3A4A` | `#D4845A` | `#F8F6F2` |
| Mountain / Rustic | `#3B2E1E` | `#B8853A` | `#FAF7F3` |
| Modern / Minimalist | `#1C1C1E` | `#8A7560` | `#FAFAFA` |
| Fynbos / Cape | `#3D4A2E` | `#C4934F` | `#F7F4EF` |

---

## Font guide

### Option A — Custom local font (like Geraldine)
```js
BRAND_FONT: {
  type:  "local",
  file:  "fonts/YourFont.ttf",   // relative path from index.html
  name:  "YourFont",             // the font-family name you want
  google: "",
}
```
Place the TTF/OTF file in the `fonts/` folder. The template loads it via a generated `@font-face` rule.

> **Licensing:** Always confirm the font license allows web embedding. "Personal use" fonts cannot be used on commercial client sites. Check with the client or use a licensed alternative.

### Option B — Google Font
```js
BRAND_FONT: {
  type:   "google",
  file:   "",
  name:   "",
  google: "Great Vibes",   // exact Google Fonts family name
}
```
The template automatically inserts the Google Fonts `<link>` tag. Good cursive options: `Great Vibes`, `Alex Brush`, `Allura`, `Pinyon Script`.

### Body and heading fonts
`Cormorant Garamond` (editorial headings) and `Plus Jakarta Sans` (body/buttons) are always loaded from Google Fonts. These don't need to change per client — they work with any brand color and font combination.

---

## Room cards

Each room in the `ROOMS` array renders a full card. You can have 1–6 rooms:

```js
{
  name:       "Superior King Room",
  image:      "images/room-king.png",
  image_alt:  "Superior King Room interior",
  portrait:   false,          // true = portrait photo (uses contain, not crop)
  img_position: "center 30%", // optional CSS object-position
  specs:      ["Sleeps 2", "24 m²", "King bed", "Ensuite bathroom"],
  amenities:  [
    { icon: "wifi",    text: "Free Wi-Fi" },
    { icon: "tv",      text: "Smart TV with Netflix" },
    { icon: "desk",    text: "Work desk" },
    { icon: "kitchen", text: "Minibar fridge & kettle" },
    { icon: "safe",    text: "In-room safe" },
    { icon: "terrace", text: "Private balcony" },
  ],
  price:      "R1,200",
  select_key: "Superior King Room",  // pre-filled in the booking form
}
```

**Available amenity icons:** `wifi`, `tv`, `desk`, `kitchen`, `safe`, `view`, `terrace`, `heating`, `pool`, `parking`, `coffee`, `clean`, `security`, `events`, `family`, `power`, `payment`, `calendar`

---

## Google Maps embed

1. Go to [maps.google.com](https://maps.google.com)
2. Search for the property address
3. Click **Share** → **Embed a map** → Copy the `src="…"` URL only
4. Paste it into `LOCATION.map_embed` in `config.js`

---

## WhatsApp booking flow

The booking form pre-builds a WhatsApp message with:
- Guest name, phone, email
- Check-in / check-out dates
- Number of adults and children
- Room preference (auto-filled when a room card's "Select this room" is clicked)
- Any additional notes

The message goes to the `CONTACT.whatsapp` number. Format: country code + number, no spaces or `+`, e.g. `27725703772`.

---

## Checklist before handing over to a client

- [ ] All `config.js` fields filled in — no placeholder text remaining
- [ ] Real photos in `images/` — no broken image slots
- [ ] Google Maps embed shows the correct pin
- [ ] WhatsApp number tested — tapping "Send on WhatsApp" opens the right chat
- [ ] Check-in/out times confirmed with client
- [ ] Room prices confirmed with client ("From R___" is an estimate — add a disclaimer if needed)
- [ ] Site URL updated in `config.js` → `SITE_URL` and `SEO.og_image` path
- [ ] Custom domain registered and pointed at Vercel
- [ ] Google Search Console submitted once live

---

## Maintained by

[Aya Core Studios](https://ayacorestudios.vercel.app) · ayacorestudios@gmail.com

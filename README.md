# The Calm Circus — Website

A fully responsive, single-page static website for **The Calm Circus**, a nature-based wellness experience brand based in Bangalore.

---

## ✅ Completed Features

### Design & Palette (v5 — Jewel & Bold)
- **Deep jewel-tone palette**: Midnight navy (`#0d1f4a`), bold emerald (`#1e6641`), crimson-orange (`#c0390e`), deep teal (`#0a7c6c`), rich amber (`#b06800`), deep royal blue (`#1558a8`), royal violet (`#5b2fa0`), metallic gold (`#c89010` / `#f0c840`)
- **Hard flat-shadow cards** with 6–10 px offset in brand jewel tones
- **Asymmetric card rotations** throughout all sections
- Multi-colour rainbow gradient top-border stripes on every section
- High-contrast section backgrounds using rich gradients

### Navigation
- Fixed dark navy navbar with deep terracotta bottom border (switches to gold on scroll)
- Desktop nav links with hover pill style
- Social icons: Instagram, YouTube, LinkedIn
- Prominent "Book Your Spot" CTA pill
- Mobile hamburger menu with slide-down overlay

### Sections (top → bottom)
1. **Hero** — Full-bleed background, navy-teal gradient overlay, gold badge, headline with gold highlight underline, CTAs, avatar proof strip
2. **Marquee Strips** — Terracotta/crimson strip + reverse navy strip
3. **About** ("What is this?") — Two-image asymmetric stack with coloured hard shadows, 4 styled NOT-items with coloured left-border cards
4. **Who Is This For** ("Is this you?") — 4 asymmetric cards (terracotta, teal, amber, emerald) with SVG doodle icons
5. **Experience Flow** — Full-bleed navy-teal overlay, 6 colour-coded steps with connecting arrows
6. **Gallery Strip** — Horizontal scroll, 9 images, per-image coloured hard shadows, drag-to-scroll
7. **Outcomes** — Two-image stack, 4 coloured outcome cards, handwritten quote
8. **Upcoming Experiences** — Featured "Open Calm Circus" card with price, meta info, booking CTA
9. **Schedule** — 6-month grid (May–Oct 2026), each month a differently-coloured card
10. **Corporate** ("For Teams") — Two-image stack, 3 option cards, "Talk to Us" CTA
11. **What's Included** ("All In") — 6-item grid with coloured bordered cards + icon wraps
12. **Testimonials** — 3 cards with coloured borders + initial avatars (Priya, Arun, Sneha), 3 event photos
13. **The Calm Circus Way** — Full-bleed dark overlay (navy→green), 4 philosophy pillars
14. **FAQ** — Sticky sidebar header, 6 accordion items
15. **Booking** — 3-step flow: Form → Payment (UPI/QR + Bank Transfer) → Confirmation
16. **Final CTA** — Full-bleed overlay with gold italic headline
17. **Footer** — Navy background, rainbow top border, social links (Instagram, YouTube, LinkedIn, WhatsApp, Email)

### Social / Contact Links
- Instagram: https://www.instagram.com/thecalmcircus/
- YouTube: https://www.youtube.com/@TheCalmCircus
- LinkedIn: https://www.linkedin.com/in/the-clam-circus-71b1b5400
- WhatsApp: https://wa.me/919845271737
- Email: thecalmcircus@gmail.com

---

## 📍 Entry Points

| Path | Description |
|------|-------------|
| `/index.html` | Single-page website (all sections) |
| `#about` | About / "What is this?" |
| `#who` | Target audience cards |
| `#flow` | Experience flow steps |
| `#outcomes` | What you leave with |
| `#experiences` | Upcoming Experiences card |
| `#schedule` | 6-month schedule |
| `#corporate` | Corporate enquiry |
| `#included` | What's included |
| `#testimonials` | Testimonials |
| `#way` | The Calm Circus Way |
| `#faq` | FAQ accordion |
| `#book` | Booking form + payment |

---

## 🗂 File Structure

```
index.html          Main single-page site
css/
  style.css         Full stylesheet (v5 Jewel & Bold palette)
js/
  main.js           Navbar scroll, mobile menu, FAQ accordion, booking form
README.md
```

---

## 💳 Payment Details (hardcoded in HTML)
- UPI ID: romeomahato@okhdfcbank
- Phone / UPI: 9845271737
- Bank: HDFC Bank, Kasturba Road, Bengaluru

---

## 🚀 Not Yet Implemented
- Email confirmation delivery (requires backend)
- Server-side form submission / booking persistence
- Automated WhatsApp group invite after payment
- CMS / content editing interface

## 📌 Recommended Next Steps
1. Connect booking form to a backend (e.g. Formspree, Netlify Forms) for email notifications
2. Add an admin dashboard to view bookings
3. Implement UTM tracking and Google Analytics
4. Add Open Graph meta tags for social sharing previews
5. Consider adding a "Past Events" or "Community" gallery page

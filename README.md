# Boostad — Marketing Agency Website

A premium, modern multi-page website for **Boostad**, a Moroccan digital
marketing agency. Built with plain HTML5, CSS3, and vanilla JavaScript —
no build step, no dependencies to install.

## Structure

```
boostad/
├── index.html         Homepage — hero, stats, services, why us, process,
│                       portfolio, results, testimonials, clients, CTA, contact
├── services.html       Full services detail page
├── portfolio.html      Full portfolio grid with filtering
├── about.html           Agency story, values, stats
├── contact.html         Standalone contact page with the same form
├── blog.html             Blog listing (placeholder articles)
├── css/style.css        All styles, design tokens, responsive rules
├── js/main.js            Nav, scroll reveal, counters, filters, form validation, language switch
├── js/i18n.js             AR / FR / EN translation dictionary
└── assets/
    ├── logo.png           Official Boostad logo (used exactly as supplied)
    ├── portfolio/          Placeholder project images (generated locally,
    │                       replace with real project photography)
    └── images/, icons/     Empty folders reserved for future assets
```

## Opening the site

No server or build tools are required. Just open `index.html` in a browser,
or upload the whole `boostad` folder to any static host.

## Language switcher (AR | FR | EN)

The switcher in the header/mobile menu toggles `dir` (RTL/LTR) and swaps
text for navigation, hero, section headers/leads, CTAs, form labels and the
footer, using `js/i18n.js`. Card-level content (individual services,
portfolio captions, testimonials) stays in Arabic across all three
languages, since Arabic is the primary market language — swap in FR/EN
copy for those cards in the HTML if you want full per-card translation.

## Things to personalize before launch

- `assets/portfolio/project-*.jpg` — replace with real client work.
- WhatsApp number — currently a placeholder (`212600000000`) in the header
  CTA, floating WhatsApp button, final CTA, and contact sections.
- Instagram / Facebook / TikTok links — currently `#` placeholders in the
  contact section and footer.
- Testimonials and client logos in the marquee — marked as demo content.
- The contact form currently validates and shows a success message in the
  browser only; connect it to your email service or CRM of choice (e.g. a
  form backend, serverless function, or booking tool) to actually receive
  submissions.

## Notes

- The "الأرقام تتحدث" results section is explicitly labeled as illustrative
  examples, not real client data, per the brief.
- Fonts: Tajawal (Arabic) and Poppins (Latin/numerals), loaded from Google
  Fonts.
- Fully responsive from 390px mobile up to 1920px desktop.

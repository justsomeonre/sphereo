# SPHEREO — AI-Powered Indian Artisan Marketplace
> **“AI that respects human hands.”**

[![Next.js](https://img.shields.io/badge/Next.js-14.2.15-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-18.3.1-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6.3-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4.13-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![Build Status](https://img.shields.io/badge/build-passing-brightgreen)](#)
[![Tests](https://img.shields.io/badge/tests-6%20passed-brightgreen)](#)

---

## 1. What is SphereO?

**SPHEREO** is a premium, AI-enabled global e-commerce marketplace connecting verified Indian master artisans with patrons across India and the world. 

SphereO is built on a foundational philosophy: **technology should expand the possibilities of human craftsmanship, not replace the people behind it.**

Unlike generic image-generation bots that hallucinate impossible shapes and synthetic materials, **SphereO AI** is an artisan-aware creative engine. It validates patron prompts against the selected master artisan’s verified skills, available raw materials, chemical combinations, prepared mineral pigments, and kiln firing temperatures before generating feasible design proposals. Final creative and manufacturing approval rests strictly with the human master artisan.

---

## 2. Key Product Differentiators

1. **Artisan-Aware Capability Matrix:** AI prompts are audited against live workshop stock, natural mineral pigment formulas, and physical craft limits.
2. **Explicit Constraint Validation:** Unsupported details (e.g. synthetic volatile neon dyes on natural lac resin) are flagged, rejected, and paired with authentic traditional alternatives.
3. **Mandatory Artisan Authority:** Computer-generated previews are conceptual; crafting begins only upon explicit artisan sign-off in the artisan studio queue.
4. **Direct Patron-Artisan Collaboration:** Book 45-minute live consultations with conflict-preventing scheduling and an in-platform virtual studio room with real-time transcript notes.
5. **Slow Commerce & Transparent Pricing:** Integer-paise precision currency calculations, 5% handicraft GST calculation, complimentary insured shipping over ₹1,999, and direct fair-wage attribution.
6. **Living Taxonomy of 12 GI Guilds:** 300 distinctive seeded products and 40 master artisans representing Jaipur Blue Pottery, Lac Bangles, Kutch Ajrakh, Bastar Dhokra, Channapatna Woodcraft, and more.

---

## 3. Technology Stack & Architecture

- **Framework:** Next.js 14 (App Router with nested layouts & static/dynamic route optimization)
- **Language:** TypeScript 5.6 (Strict type safety across catalog, AI engine, and commerce)
- **Styling & Design System:** Tailwind CSS with custom editorial palette:
  - Warm Ivory (`#F7F4ED`), Deep Charcoal (`#252720`), Linen (`#EAE3D7`), Earthy Terracotta (`#B66A4B`), Muted Brass (`#B69A63`), Sage, Clay, Indigo, and Sand.
- **Iconography:** Lucide React
- **Animations:** Framer Motion & CSS hardware-accelerated transitions
- **Schema Validation:** Zod (Shipping addresses, booking appointments, newsletter signups)
- **Local Persistence:** Unified browser storage (`localStorage`) supporting multi-role switching between Patron, Master Artisan, and Platform Admin.
- **Automated Testing:** Node.js native test runner executed via `tsx` with 100% pass rate.

---

## 4. Complete Route Inventory

| Route | Purpose | Key Features |
|---|---|---|
| `/` | Homepage | Editorial Hero, Explore by Craft, Featured Heirlooms, Meet Makers, AI Pipeline, Stories |
| `/discover` | Marketplace Catalog | Search, multi-facet filtering (craft, price, material, ready-to-ship, customizable), sorting |
| `/categories` | 12 Craft Guilds | Overview of all 12 regional traditions, heritage eras, and ancestral materials |
| `/categories/[slug]` | Guild Deep-Dive | Category history, verified masters in guild, listed catalog pieces |
| `/product/[slug]` | Product Details | Gallery zoom, artisan lineage attribution, customizers, specs, reviews, care |
| `/customize/[productId]` | Customization Studio | Live visual preview, color swatches, materials, proportions, hand-engraving, live pricing |
| `/ai-studio` | SphereO AI Studio | Conversational idea prompt, constraint validation engine, feasible proposals, review transmission |
| `/designs` | Patron AI Portfolio | Track submitted proposals across status lifecycle: Draft, Ready for Review, Approved |
| `/artisans` | Artisan Directory | Browse 40 verified master craftspeople with region, craft, and experience filters |
| `/artisan/[slug]` | Master Artisan Profile | Ancestral story, workshop imagery, verified techniques, inventory stock, booking trigger |
| `/cart` | Interactive Cart | Quantity stepper, customization preservation, coupon codes (`HERITAGE10`), tax & shipping |
| `/checkout` | Simulated Checkout | Address validation, delivery preferences, simulated UPI / Card / COD payment |
| `/checkout/success` | Order Confirmation | Generated order number, tracking timeline link, receipt summary |
| `/consultation/[bookingId]` | Live Studio Room | In-platform video simulation, AV controls, collaborative transcript chat, design brief |
| `/account` | Patron Dashboard | Overview of active commissions, saved designs, consultations, and favorites |
| `/account/orders` | Order Ledger | List of all patron commissions with live status |
| `/account/orders/[orderId]` | Order Tracking | Full 8-stage visual timeline from Order Placed to Crafting in Progress to Delivered |
| `/account/bookings` | Appointments | Manage scheduled artisan consultations with conflict prevention |
| `/account/settings` | Preferences | Display preferences, currency selector, and Reset Demo Data button |
| `/favorites` | Curated Favorites | Bookmarked products with quick add-to-cart |
| `/stories` | SphereO Journal | Long-form editorial essays on Indian craft alchemies and histories |
| `/stories/[slug]` | Editorial Article | Illustrated story, cultural & ritual context, preservation effort, artisan link |
| `/dashboard/artisan` | Artisan Studio Home | Studio overview, switch active artisan persona, KPIs, urgent AI review queue |
| `/dashboard/artisan/design-requests` | AI Review Queue | Approve, reject with reason, or request changes on patron AI proposals |
| `/dashboard/artisan/orders` | Production Stages | Advance order stages: Materials Prepared → Crafting in Progress → Quality Check |
| `/dashboard/artisan/products` | Listed Inventory | Manage pieces, made-to-order lead times, stock quantities |
| `/dashboard/artisan/bookings` | Artisan Calendar | Review patron briefs and enter live consultation room as artisan |
| `/dashboard/artisan/inventory` | Material Stock | Audit raw resin, clay, bell-metal bronze, and living indigo vats |
| `/dashboard/artisan/profile` | Craft Constraints | Manage allowable colors, custom sizing rules, and disallowed combinations |
| `/dashboard/admin` | Admin Governance | Platform gross metrics, catalog oversight, artisan GI verifications, order ledgers |
| `/dashboard/admin/artisans` | Artisan Audit | Interactive toggle to verify or audit master artisan GI credentials |
| `/dashboard/admin/products` | Catalog Audit | Platform-wide inventory inspection |
| `/dashboard/admin/orders` | Orders Audit | Platform-wide commissions inspector |
| `/dashboard/admin/categories` | Taxonomy Metrics | Category distribution, artisan counts, and listing totals |
| `/about` | Brand Identity | Tagline, core philosophy, fair trade principles, ethical AI charter |
| `/help` | Support & FAQ | Frequently asked questions regarding AI feasibility, orders, and consultations |
| `/shipping-returns` | Transit Guarantee | Insured courier packaging, 7-day return policy, transit breakage protection |
| `/privacy` | Privacy Policy | Local session privacy, zero ad-network tracking |
| `/terms` | Terms of Service | Handmade natural variation standards and artisan creative sovereignty |

---

## 5. Prototype Features vs. Production Integrations

| Feature Area | Current Prototype Capability | Future Production Integration |
|---|---|---|
| **SphereO AI Engine** | **Fully Functional Local Intelligence:** Parses prompts, audits against artisan capability rules, detects chemical/material conflicts, suggests authentic mineral alternatives, and computes price & lead time deterministically. | Configurable LLM API adapter (OpenAI / Claude / Gemini) with fine-tuned craft embeddings and diffusion image generation. |
| **Constraint Validation** | **Fully Functional:** Checks color allowlists, raw material stock, and disallowed combinations (e.g. synthetic neon, plastics, acid tarnishing). | Automated spectral pigment analysis & 3D CAD stress simulation for structural wood/metal objects. |
| **Artisan Review Flow** | **Fully Functional & Connected:** Submitting from AI Studio places proposal in Artisan Queue (`/dashboard/artisan/design-requests`). Clicking Approve instantly updates status and reflects in Patron Portfolio (`/designs`). | Real-time WebSocket / Push notifications & WhatsApp Business API gateway for rural artisans. |
| **Live Consultation Room** | **Fully Functional Simulated Room:** Video feeds, mute/video toggles, active design brief inspector, and live two-way simulated chat with automatic artisan responses. | WebRTC peer-to-peer audio/video or Daily.co / Twilio Video integration. |
| **Cart & Pricing Engine** | **Fully Functional:** Integer paise math, coupons (`HERITAGE10`, `SPHEREO500`), 5% handicraft GST, free shipping above ₹1,999. | Multi-currency real-time FOREX engine and automatic cross-border customs duty calculations. |
| **Checkout & Payments** | **Fully Functional Demo Flow:** Supports simulated UPI (Google Pay, PhonePe), Card Gateway, and COD. Generates real unique order numbers and persistent timelines. | Live Razorpay / Stripe gateway with webhooks, biometric 3DS verification, and automated escrow payouts to artisan bank accounts. |
| **Data Persistence** | **Fully Functional Local Session:** Cart, orders, proposals, bookings, and favorites persist across browser reloads via `localStorage`. Role switcher enables testing as Patron, Artisan, or Admin. | PostgreSQL database hosted on Supabase with Prisma ORM and row-level security (RLS). |
| **Media & Assets** | **Fully Functional:** Original brand vector SVGs, favicon, and 300+ curated high-fidelity craft photographs indexed in `public/asset-manifest.json`. | Cloudflare R2 / AWS S3 object storage with on-the-fly edge image optimization. |

---

## 6. Getting Started Locally

### Prerequisites
- Node.js v18.0.0 or higher (Tested and verified on Node.js v24.11.0)
- npm v9.0.0 or higher

### Installation
```bash
# 1. Clone repository or navigate to project directory
cd sphereo

# 2. Install dependencies
npm install

# 3. Run automated test suite
npm test

# 4. Start local development server
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## 7. Running the Automated Test Suite

SphereO includes a zero-dependency automated test suite verifying all critical business rules:
```bash
npm test
```
**Test Results:**
- `✔ 1. Pricing Engine - Accurate Integer Paise & Currency Math`
- `✔ 2. SphereO AI - Constraint Engine & Chemical/Material Auditing`
- `✔ 3. Catalog Scale & Product-Artisan Relationship Integrity`
- `✔ 4. Catalog Filtering, Multi-Facet Search & Indexing`
- `✔ 5. Consultation Booking Conflict Prevention Rule`
- `✔ 6. Complete Flow Verification (Flows A through G)`

**Status: 6 suites passed, 0 failures.**

---

## 8. Verifying a Production Build

To verify that all 36 routes and dynamic pages compile with zero TypeScript errors:
```bash
npm run build
```
Output confirms:
- `✓ Compiled successfully`
- `✓ Generating static pages (36/36)`
- `✓ Finalizing page optimization`

---

## 9. Deployment Guide

### Deploying to Vercel
1. Push this repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete SphereO artisan marketplace prototype"
   git remote add origin https://github.com/your-username/sphereo.git
   git push -u origin main
   ```
2. Log into [Vercel](https://vercel.com) and click **"Add New Project"**.
3. Import the `sphereo` repository.
4. Set the Framework Preset to **Next.js**.
5. Copy any variables from `.env.example` into Vercel Project Settings (optional, as demo mode runs out of the box).
6. Click **Deploy**. Vercel will build and serve the application globally on edge CDN.

---

## 10. Role Switching & Interactive Demo Personas

SphereO features a floating **Demo Role Switcher** in the top navigation bar:
- **Patron Mode (Customer):** Browse catalog, customize pieces, test SphereO AI Studio, add to cart, and simulate checkout.
- **Artisan Studio Mode (Master Ramesh Chandra / Leela Devi):** Open the artisan queue, review pending AI proposals, click Approve/Reject, advance order production stages, and enter live consultation calls.
- **Platform Admin Mode:** Review artisan GI credentials, inspect catalog metadata, and review platform-wide commission metrics.
- **Reset Demo Data:** At any time, click "Reset Prototype Demo State" to restore fresh seeded data.

---

*SPHEREO — Built with pride for Indian artisans.*

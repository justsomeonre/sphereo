'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CRAFTS } from '../data/crafts';
import { ARTISANS } from '../data/artisans';
import { PRODUCTS } from '../data/products';
import { ProductCard } from '../components/product/ProductCard';
import { ArtisanCard } from '../components/artisan/ArtisanCard';
import { Button } from '../components/common/Button';
import { Badge } from '../components/common/Badge';
import {
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Flame,
  Layers,
  Clock,
  Compass,
  CheckCircle2,
  HeartHandshake,
  SlidersHorizontal,
  ChevronRight,
} from 'lucide-react';

export default function HomePage() {
  const featuredProducts = PRODUCTS.slice(0, 8);
  const featuredArtisans = ARTISANS.slice(0, 4);
  const topCrafts = CRAFTS.slice(0, 8);

  return (
    <div className="space-y-20 pb-16">
      {/* SECTION B: MAIN HERO */}
      <section className="relative overflow-hidden bg-gradient-to-b from-sphereo-linen/50 via-sphereo-ivory to-sphereo-ivory pt-8 pb-16 lg:py-24 border-b border-sphereo-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Hero Copy */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sphereo-linen border border-sphereo-border text-xs font-semibold uppercase tracking-wider text-sphereo-terracotta">
                <Sparkles size={13} className="text-sphereo-terracotta animate-pulse" />
                <span>AI That Respects Human Hands</span>
              </div>

              <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-bold text-sphereo-charcoal tracking-tight leading-[1.1]">
                Not mass-made. <br />
                <span className="italic font-normal text-sphereo-terracotta">
                  Meaningfully made.
                </span>
              </h1>

              <p className="text-base sm:text-lg text-sphereo-wood/85 max-w-xl leading-relaxed">
                Discover remarkable handmade pieces from independent Indian master artisans. Make them truly yours with creativity guided by the people who know their craft best.
              </p>

              <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
                <Link
                  href="/discover"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm bg-sphereo-terracotta text-sphereo-ivory font-semibold text-sm hover:bg-sphereo-terracotta-dark shadow-sm transition-all"
                >
                  <span>Explore the Collection</span>
                  <ArrowRight size={16} />
                </Link>

                <Link
                  href="/ai-studio"
                  className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-sm bg-sphereo-charcoal text-sphereo-ivory font-semibold text-sm hover:bg-sphereo-charcoal/90 shadow-sm transition-all"
                >
                  <Sparkles size={15} className="text-sphereo-brass" />
                  <span>Create with SphereO AI</span>
                </Link>
              </div>

              {/* Provenance Stat Counters */}
              <div className="pt-8 border-t border-sphereo-border grid grid-cols-3 gap-6 text-left">
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal block">
                    300+
                  </span>
                  <span className="text-xs text-sphereo-wood/75">
                    Seeded Craft Creations
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal block">
                    40
                  </span>
                  <span className="text-xs text-sphereo-wood/75">
                    Verified Master Artisans
                  </span>
                </div>
                <div>
                  <span className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal block">
                    100%
                  </span>
                  <span className="text-xs text-sphereo-wood/75">
                    Direct Fair Trade Wages
                  </span>
                </div>
              </div>
            </div>

            {/* Right Hero Visual Collage */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-full rounded-lg overflow-hidden border border-sphereo-border shadow-hover bg-sphereo-sand/40">
                <Image
                  src="https://images.unsplash.com/photo-1596704017254-9b121068fb31?auto=format&fit=crop&w=1000&q=80"
                  alt="Master artisan shaping natural lac over glowing charcoal embers in Jaipur"
                  fill
                  priority
                  className="object-cover object-center"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sphereo-charcoal/70 via-transparent to-transparent" />

                <div className="absolute bottom-5 left-5 right-5 p-4 rounded bg-sphereo-ivory/95 backdrop-blur-md border border-sphereo-border shadow-sm text-xs">
                  <div className="flex items-center justify-between text-sphereo-terracotta font-semibold text-[10px] uppercase tracking-wider mb-1">
                    <span>Authentic Living Provenance</span>
                    <span>Jaipur, Rajasthan</span>
                  </div>
                  <p className="font-serif text-sm font-semibold text-sphereo-charcoal">
                    Ramesh Chandra Soni shaping charcoal-heated natural lac bangles
                  </p>
                  <p className="text-[11px] text-sphereo-wood/80 mt-0.5">
                    “Lac remembers the temperature of the artisan’s fingers.”
                  </p>
                </div>
              </div>

              {/* Floating Badge */}
              <div className="hidden sm:flex absolute -top-4 -left-4 items-center gap-2 p-3 rounded bg-sphereo-ivory border border-sphereo-border shadow-modal text-xs">
                <ShieldCheck size={18} className="text-emerald-700" />
                <div>
                  <div className="font-bold text-sphereo-charcoal">GI Certified Craft</div>
                  <div className="text-[10px] text-sphereo-wood/70">Verified Ancestral Lineages</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: EXPLORE BY CRAFT */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="terracotta" size="sm" className="mb-2">
              Heritage Taxonomy
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
              Explore by Craft Guild
            </h2>
            <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1 max-w-xl">
              From charcoal-fired lac resin in Jaipur to 4,000-year-old lost wax bronze casting in Bastar.
            </p>
          </div>
          <Link
            href="/categories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sphereo-terracotta hover:underline uppercase tracking-wider"
          >
            <span>View All 12 Craft Guilds</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {topCrafts.map((craft) => (
            <Link
              key={craft.id}
              href={`/categories/${craft.slug}`}
              className="group relative rounded-md overflow-hidden aspect-[4/5] border border-sphereo-border shadow-xs hover:shadow-hover transition-all duration-300"
            >
              <Image
                src={craft.image}
                alt={craft.name}
                fill
                sizes="(max-width: 640px) 50vw, 25vw"
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-sphereo-charcoal/90 via-sphereo-charcoal/30 to-transparent" />

              <div className="absolute bottom-3 left-3 right-3 text-white space-y-1">
                <span className="text-[10px] text-sphereo-brass uppercase font-bold tracking-widest block">
                  {craft.region.split(',')[0]}
                </span>
                <h3 className="font-serif text-sm sm:text-base font-bold text-sphereo-ivory group-hover:text-sphereo-brass-light transition-colors leading-snug">
                  {craft.name}
                </h3>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* SECTION D: FEATURED COLLECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="brass" size="sm" className="mb-2">
              Curated Heirlooms
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
              Featured Handmade Pieces
            </h2>
            <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
              Individually crafted by master artisans. Available ready-to-ship or tailored to your specifications.
            </p>
          </div>
          <Link
            href="/discover"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sphereo-terracotta hover:underline uppercase tracking-wider"
          >
            <span>Browse Full Catalog</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      </section>

      {/* SECTION F: SPHEREO AI — "IMAGINE FREELY. CREATE RESPONSIBLY." */}
      <section className="bg-sphereo-charcoal text-sphereo-linen py-16 lg:py-20 border-y border-sphereo-charcoal/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sphereo-terracotta/20 border border-sphereo-terracotta/40 text-xs font-bold uppercase tracking-wider text-sphereo-terracotta">
                <Sparkles size={13} className="text-sphereo-brass" />
                <span>The Core Differentiator</span>
              </div>

              <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-bold text-sphereo-ivory tracking-tight">
                Imagine freely. <br />
                <span className="italic text-sphereo-brass font-normal">
                  Create responsibly.
                </span>
              </h2>

              <p className="text-sm sm:text-base text-sphereo-linen/80 leading-relaxed">
                Generic AI promises that any hallucinated picture can be built. SphereO AI works differently: it audits the selected artisan’s verified skills, available mineral pigments, kiln temperatures, and material stocks before proposing a feasible design.
              </p>

              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Material Compatibility Check:</strong> Prevents incompatible combinations (e.g. synthetic neon dyes on natural lac resin).
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Artisan Review Gate:</strong> Conceptual designs are never manufactured without explicit approval from the artisan.
                  </span>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />
                  <span>
                    <strong>Feasible Alternatives:</strong> When an idea exceeds physical constraints, the AI suggests viable traditional finishes.
                  </span>
                </div>
              </div>

              <div className="pt-4 flex flex-wrap gap-4">
                <Link
                  href="/ai-studio"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-sphereo-brass text-sphereo-charcoal font-bold text-xs uppercase tracking-wider rounded-sm hover:bg-sphereo-brass-light transition-colors"
                >
                  <Sparkles size={14} />
                  <span>Try the AI Studio</span>
                </Link>
                <Link
                  href="/about"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-sphereo-linen/30 text-sphereo-ivory font-medium text-xs rounded-sm hover:bg-sphereo-linen/10 transition-colors"
                >
                  <span>Our Ethical AI Charter</span>
                </Link>
              </div>
            </div>

            {/* Interactive Visual Process Flow Diagram */}
            <div className="lg:col-span-6 bg-sphereo-ivory text-sphereo-charcoal p-6 sm:p-8 rounded-lg border border-sphereo-border shadow-modal space-y-4">
              <h3 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-3 flex items-center justify-between">
                <span>The Artisan-Aware Pipeline</span>
                <span className="text-[10px] uppercase font-bold text-sphereo-terracotta tracking-wider">
                  Live Simulation
                </span>
              </h3>

              <div className="space-y-3 text-xs">
                {/* Step 1: Customer Input */}
                <div className="p-3 bg-sphereo-linen/50 rounded border border-sphereo-border space-y-1">
                  <div className="flex items-center justify-between font-bold text-sphereo-charcoal">
                    <span>1. Customer Prompt</span>
                    <span className="text-[10px] text-sphereo-wood/70">Raw Inspiration</span>
                  </div>
                  <p className="italic text-sphereo-charcoal/80 font-serif">
                    “I want a traditional Rajasthani lac bangle set inspired by the night sky, in deep indigo with gold details...”
                  </p>
                </div>

                {/* Step 2: Capability Engine */}
                <div className="p-3 bg-sphereo-linen/50 rounded border border-sphereo-border space-y-1">
                  <div className="flex items-center justify-between font-bold text-sphereo-charcoal">
                    <span>2. Artisan Capability Check</span>
                    <span className="text-[10px] text-emerald-700 font-bold">Passed</span>
                  </div>
                  <p className="text-[11px] text-sphereo-wood/80">
                    Checked Ramesh Chandra Soni: Kusmi Lac in stock, natural mineral indigo pigment verified, charcoal ember heating capacity confirmed.
                  </p>
                </div>

                {/* Step 3: Feasible Proposal */}
                <div className="p-3 bg-emerald-50 rounded border border-emerald-200 text-emerald-950 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>3. Structured Design Proposal</span>
                    <span className="text-[10px] font-bold">Estimated: ₹4,200 | ~14 Days</span>
                  </div>
                  <p className="text-[11px]">
                    Validated spec: Natural Lac Resin + Pure Brass Micro-studs + Natural Mineral Indigo.
                  </p>
                </div>

                {/* Step 4: Mandatory Review */}
                <div className="p-3 bg-amber-50 rounded border border-amber-200 text-amber-950 space-y-1">
                  <div className="flex items-center justify-between font-bold">
                    <span>4. Artisan Final Authority</span>
                    <span className="text-[10px] font-bold uppercase">Mandatory Approval</span>
                  </div>
                  <p className="text-[11px]">
                    Transmitted to master artisan&apos;s queue. Crafting begins only upon mutual alignment.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION E: MEET THE MAKERS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="sage" size="sm" className="mb-2">
              Living Heritage
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
              Meet the Masters Behind the Craft
            </h2>
            <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
              Generational custodians preserving slow techniques and passing them forward.
            </p>
          </div>
          <Link
            href="/artisans"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sphereo-terracotta hover:underline uppercase tracking-wider"
          >
            <span>View All 40 Artisans</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredArtisans.map((artisan) => (
            <ArtisanCard key={artisan.id} artisan={artisan} />
          ))}
        </div>
      </section>

      {/* SECTION H: HOW IT WORKS */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <Badge variant="charcoal" size="sm" className="mb-2">
            The SphereO Journey
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
            How Slow Handmade Commerce Works
          </h2>
          <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
            Bridging mindful patrons with ancestral craftspeople across six transparent steps.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            { step: '01', title: 'Discover Craft Lineages', desc: 'Browse verified artisans across 12 GI-tagged traditional craft categories throughout India.' },
            { step: '02', title: 'Describe or Select', desc: 'Pick an existing catalog heirloom or describe your dream piece in conversational plain language.' },
            { step: '03', title: 'Validate Feasibility', desc: 'SphereO AI validates allowable materials, pigments, dimensions, and realistic workshop lead times.' },
            { step: '04', title: 'Artisan Review', desc: 'The master craftsperson inspects your design proposal, adjusts parameters if needed, and signs off.' },
            { step: '05', title: 'Follow the Making', desc: 'Track your creation through transparent status updates: materials prepared, shaping, and quality checks.' },
            { step: '06', title: 'Cherish an Heirloom', desc: 'Receive your handmade piece in custom archival packaging complete with a certificate of maker provenance.' },
          ].map((item) => (
            <div
              key={item.step}
              className="p-6 bg-sphereo-ivory border border-sphereo-border rounded-md shadow-xs space-y-2 hover:border-sphereo-terracotta/40 transition-colors"
            >
              <span className="font-serif text-3xl font-bold text-sphereo-brass block">
                {item.step}
              </span>
              <h3 className="font-serif text-lg font-bold text-sphereo-charcoal">
                {item.title}
              </h3>
              <p className="text-xs text-sphereo-wood/80 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION I: ARTISAN STORIES */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <Badge variant="terracotta" size="sm" className="mb-2">
              SphereO Journal
            </Badge>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
              Stories from the Hearth
            </h2>
            <p className="text-xs sm:text-sm text-sphereo-wood/80 mt-1">
              Editorial essays exploring the history, materials, and living cultures of Indian craft.
            </p>
          </div>
          <Link
            href="/stories"
            className="inline-flex items-center gap-1.5 text-xs font-bold text-sphereo-terracotta hover:underline uppercase tracking-wider"
          >
            <span>Read All Stories</span>
            <ChevronRight size={14} />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <article className="group bg-sphereo-ivory border border-sphereo-border rounded-md overflow-hidden flex flex-col justify-between hover:shadow-hover transition-all">
            <div className="relative aspect-video w-full overflow-hidden bg-sphereo-sand">
              <Image
                src="https://images.unsplash.com/photo-1611591475879-1f4803975073?auto=format&fit=crop&w=800&q=80"
                alt="Maniharon Ka Rasta Jaipur lac craft"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sphereo-terracotta">
                Jaipur, Rajasthan • 6 Min Read
              </span>
              <h3 className="font-serif text-xl font-bold text-sphereo-charcoal group-hover:text-sphereo-terracotta transition-colors">
                <Link href="/stories/the-alchemy-of-lac-maniharon-ka-rasta">
                  The Fire and the Amber: Maniharon Ka Rasta’s Living Legacy
                </Link>
              </h3>
              <p className="text-xs text-sphereo-wood/80 leading-relaxed line-clamp-2">
                Step into the 300-year-old lane of Maniharon ka Rasta in Jaipur’s Walled City, where master artisans shape purified insect resin with bare fingertips over charcoal coals.
              </p>
              <div className="pt-2">
                <Link
                  href="/stories/the-alchemy-of-lac-maniharon-ka-rasta"
                  className="text-xs font-semibold text-sphereo-charcoal underline"
                >
                  Read Full Story →
                </Link>
              </div>
            </div>
          </article>

          <article className="group bg-sphereo-ivory border border-sphereo-border rounded-md overflow-hidden flex flex-col justify-between hover:shadow-hover transition-all">
            <div className="relative aspect-video w-full overflow-hidden bg-sphereo-sand">
              <Image
                src="https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80"
                alt="Singing quartz Jaipur blue pottery"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            <div className="p-6 space-y-2">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sphereo-terracotta">
                Kot Jewar, Rajasthan • 8 Min Read
              </span>
              <h3 className="font-serif text-xl font-bold text-sphereo-charcoal group-hover:text-sphereo-terracotta transition-colors">
                <Link href="/stories/singing-quartz-the-clay-free-ceramics-of-jaipur">
                  Singing Quartz: The Clay-Free Ceramics of Kot Jewar
                </Link>
              </h3>
              <p className="text-xs text-sphereo-wood/80 leading-relaxed line-clamp-2">
                Unique in the global ceramic landscape, Jaipur Blue Pottery contains zero clay. Discover how quartz boulders and copper oxides are hand-molded into iconic turquoise objects.
              </p>
              <div className="pt-2">
                <Link
                  href="/stories/singing-quartz-the-clay-free-ceramics-of-jaipur"
                  className="text-xs font-semibold text-sphereo-charcoal underline"
                >
                  Read Full Story →
                </Link>
              </div>
            </div>
          </article>
        </div>
      </section>

      {/* SECTION J: TRUST & TRANSPARENCY */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-sphereo-linen/60 border border-sphereo-border rounded-lg p-8 sm:p-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-sphereo-ivory flex items-center justify-center text-sphereo-terracotta border border-sphereo-border">
                <ShieldCheck size={20} />
              </div>
              <h4 className="font-serif text-base font-bold text-sphereo-charcoal">
                Direct Maker Attribution
              </h4>
              <p className="text-xs text-sphereo-wood/80 leading-relaxed">
                Every piece is credited to its specific artisan master or guild. No anonymous white-label factories.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-sphereo-ivory flex items-center justify-center text-sphereo-terracotta border border-sphereo-border">
                <HeartHandshake size={20} />
              </div>
              <h4 className="font-serif text-base font-bold text-sphereo-charcoal">
                Transparent Pricing
              </h4>
              <p className="text-xs text-sphereo-wood/80 leading-relaxed">
                Clear breakdowns showing artisan labor, material costs, and platform logistics. Artisans receive fair, dignity-first compensation.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-sphereo-ivory flex items-center justify-center text-sphereo-terracotta border border-sphereo-border">
                <Flame size={20} />
              </div>
              <h4 className="font-serif text-base font-bold text-sphereo-charcoal">
                Ancestral Techniques
              </h4>
              <p className="text-xs text-sphereo-wood/80 leading-relaxed">
                Techniques vetted by craft experts. Natural plant dyes, wood-kiln firings, and certified non-chemical materials.
              </p>
            </div>

            <div className="space-y-2">
              <div className="w-10 h-10 rounded-full bg-sphereo-ivory flex items-center justify-center text-sphereo-terracotta border border-sphereo-border">
                <Clock size={20} />
              </div>
              <h4 className="font-serif text-base font-bold text-sphereo-charcoal">
                Respect for Slow Time
              </h4>
              <p className="text-xs text-sphereo-wood/80 leading-relaxed">
                Handmade pieces require unhurried curing and setting. We communicate honest production schedules.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

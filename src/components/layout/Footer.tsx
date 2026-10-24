'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Logo } from '../common/Logo';
import { Button } from '../common/Button';
import { newsletterSchema } from '../../lib/validation';
import { CheckCircle2, ShieldCheck, HeartHandshake, Globe } from 'lucide-react';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    const result = newsletterSchema.safeParse({ email, consent });
    if (!result.success) {
      setErrorMsg(result.error.errors[0]?.message || 'Please verify your email & consent');
      return;
    }

    try {
      const stored = localStorage.getItem('sphereo_newsletter_subs') || '[]';
      const list = JSON.parse(stored);
      if (list.includes(email)) {
        setErrorMsg('This email is already subscribed to SphereO Craft Gazettes.');
        return;
      }
      list.push(email);
      localStorage.setItem('sphereo_newsletter_subs', JSON.stringify(list));
      setIsSuccess(true);
      setEmail('');
    } catch {
      setIsSuccess(true);
    }
  };

  return (
    <footer className="bg-sphereo-charcoal text-sphereo-linen border-t border-sphereo-charcoal/30 pt-16 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Top Newsletter & Brand Statement Banner */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 pb-12 border-b border-sphereo-linen/15 items-center">
          <div className="lg:col-span-6 space-y-3">
            <Logo variant="full" theme="light" size="lg" />
            <p className="font-serif italic text-lg text-sphereo-brass">
              “AI that respects human hands.”
            </p>
            <p className="text-sm text-sphereo-linen/75 max-w-lg leading-relaxed">
              SphereO unites independent Indian master craftspeople with patrons worldwide. Our artisan-aware intelligence translates personal visions into feasible creations that celebrate human craftsmanship.
            </p>
          </div>

          <div className="lg:col-span-6 bg-sphereo-charcoal/60 border border-sphereo-linen/15 p-6 rounded-md">
            <h4 className="font-serif text-lg text-sphereo-ivory font-medium">
              The SphereO Craft Gazette
            </h4>
            <p className="text-xs text-sphereo-linen/70 mt-1 mb-4">
              Monthly essays on living Indian heritage, studio journals, and new limited artisan collections.
            </p>

            {isSuccess ? (
              <div className="p-3 bg-emerald-950/60 border border-emerald-500/40 rounded flex items-center gap-2.5 text-xs text-emerald-200">
                <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                <span>Thank you for subscribing! Demo confirmation recorded locally.</span>
              </div>
            ) : (
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email address"
                    className="flex-1 px-3.5 py-2 text-sm bg-sphereo-linen/10 border border-sphereo-linen/25 rounded-sm text-sphereo-ivory placeholder:text-sphereo-linen/40 focus:outline-none focus:ring-2 focus:ring-sphereo-brass"
                  />
                  <Button variant="brass" size="md" type="submit">
                    Subscribe
                  </Button>
                </div>
                <label className="flex items-start gap-2 cursor-pointer text-[11px] text-sphereo-linen/60">
                  <input
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-0.5 rounded text-sphereo-brass focus:ring-sphereo-brass"
                  />
                  <span>
                    I agree to receive monthly craft stories and understand this prototype runs in demo mode.
                  </span>
                </label>
                {errorMsg && (
                  <p className="text-xs text-red-300 font-medium">{errorMsg}</p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Multi-column Navigation Links */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8 py-12 text-xs border-b border-sphereo-linen/15">
          {/* Col 1: Shop */}
          <div className="space-y-3">
            <h5 className="font-sans uppercase font-bold tracking-widest text-sphereo-brass text-[11px]">
              Explore Marketplace
            </h5>
            <ul className="space-y-2">
              <li><Link href="/discover" className="hover:text-sphereo-ivory transition-colors">Complete Catalog (300+)</Link></li>
              <li><Link href="/categories" className="hover:text-sphereo-ivory transition-colors">12 Heritage Craft Guilds</Link></li>
              <li><Link href="/categories/jaipur-blue-pottery" className="hover:text-sphereo-ivory transition-colors">Jaipur Blue Pottery</Link></li>
              <li><Link href="/categories/lacquer-and-lac-bangles" className="hover:text-sphereo-ivory transition-colors">Lacquer & Lac Bangles</Link></li>
              <li><Link href="/categories/handloom-and-textiles" className="hover:text-sphereo-ivory transition-colors">Handloom & Brocades</Link></li>
              <li><Link href="/categories/woodcraft-and-carving" className="hover:text-sphereo-ivory transition-colors">Channapatna Woodcraft</Link></li>
            </ul>
          </div>

          {/* Col 2: Artisans */}
          <div className="space-y-3">
            <h5 className="font-sans uppercase font-bold tracking-widest text-sphereo-brass text-[11px]">
              Artisan Guilds
            </h5>
            <ul className="space-y-2">
              <li><Link href="/artisans" className="hover:text-sphereo-ivory transition-colors">Meet the 40 Makers</Link></li>
              <li><Link href="/artisan/ramesh-chandra-babu" className="hover:text-sphereo-ivory transition-colors">Master Ramesh Chandra</Link></li>
              <li><Link href="/artisan/leela-devi-sharma" className="hover:text-sphereo-ivory transition-colors">Leela Devi Kumawat</Link></li>
              <li><Link href="/artisan/mukesh-khatri" className="hover:text-sphereo-ivory transition-colors">Mukesh Ismail Khatri</Link></li>
              <li><Link href="/artisans" className="hover:text-sphereo-ivory transition-colors">Book a Consultation</Link></li>
              <li><Link href="/dashboard/artisan" className="hover:text-sphereo-ivory transition-colors">Artisan Studio Login</Link></li>
            </ul>
          </div>

          {/* Col 3: SphereO AI */}
          <div className="space-y-3">
            <h5 className="font-sans uppercase font-bold tracking-widest text-sphereo-brass text-[11px]">
              SphereO AI Studio
            </h5>
            <ul className="space-y-2">
              <li><Link href="/ai-studio" className="hover:text-sphereo-ivory transition-colors">Interactive AI Studio</Link></li>
              <li><Link href="/ai-studio#how-it-works" className="hover:text-sphereo-ivory transition-colors">Artisan-Aware Intelligence</Link></li>
              <li><Link href="/ai-studio#constraints" className="hover:text-sphereo-ivory transition-colors">Material Constraint Checks</Link></li>
              <li><Link href="/designs" className="hover:text-sphereo-ivory transition-colors">Saved Design Proposals</Link></li>
              <li><Link href="/about" className="hover:text-sphereo-ivory transition-colors">Our Ethical AI Charter</Link></li>
            </ul>
          </div>

          {/* Col 4: Editorial & Stories */}
          <div className="space-y-3">
            <h5 className="font-sans uppercase font-bold tracking-widest text-sphereo-brass text-[11px]">
              Stories & Mission
            </h5>
            <ul className="space-y-2">
              <li><Link href="/stories" className="hover:text-sphereo-ivory transition-colors">All Craft Stories</Link></li>
              <li><Link href="/stories/the-alchemy-of-lac-maniharon-ka-rasta" className="hover:text-sphereo-ivory transition-colors">Maniharon Ka Rasta</Link></li>
              <li><Link href="/stories/singing-quartz-the-clay-free-ceramics-of-jaipur" className="hover:text-sphereo-ivory transition-colors">Singing Quartz of Jaipur</Link></li>
              <li><Link href="/about" className="hover:text-sphereo-ivory transition-colors">About SphereO</Link></li>
              <li><Link href="/about#transparency" className="hover:text-sphereo-ivory transition-colors">Fair Pricing Breakdown</Link></li>
            </ul>
          </div>

          {/* Col 5: Help & Governance */}
          <div className="space-y-3 col-span-2 sm:col-span-1">
            <h5 className="font-sans uppercase font-bold tracking-widest text-sphereo-brass text-[11px]">
              Customer Care
            </h5>
            <ul className="space-y-2">
              <li><Link href="/help" className="hover:text-sphereo-ivory transition-colors">Help Center & FAQ</Link></li>
              <li><Link href="/shipping-returns" className="hover:text-sphereo-ivory transition-colors">Insured Shipping & Returns</Link></li>
              <li><Link href="/account/orders" className="hover:text-sphereo-ivory transition-colors">Track an Order</Link></li>
              <li><Link href="/privacy" className="hover:text-sphereo-ivory transition-colors">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-sphereo-ivory transition-colors">Terms of Craftsmanship</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Trust & Compliance Bar */}
        <div className="pt-8 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sphereo-linen/60">
          <div className="flex flex-wrap items-center gap-6">
            <span className="flex items-center gap-1.5">
              <ShieldCheck size={14} className="text-sphereo-brass" />
              100% Verified Artisan Lineages
            </span>
            <span className="flex items-center gap-1.5">
              <HeartHandshake size={14} className="text-sphereo-brass" />
              Direct Fair Trade Wages
            </span>
            <span className="flex items-center gap-1.5">
              <Globe size={14} className="text-sphereo-brass" />
              Currency: INR (₹) | Worldwide Delivery Simulation
            </span>
          </div>

          <p className="text-center md:text-right">
            © {new Date().getFullYear()} SPHEREO. All rights reserved. Built with pride for Indian artisans.
          </p>
        </div>
      </div>
    </footer>
  );
};

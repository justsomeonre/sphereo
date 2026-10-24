'use client';

import React from 'react';
import Link from 'next/link';
import { Badge } from '../../components/common/Badge';
import { HelpCircle, Truck, RefreshCw, ShieldCheck, Video, Sparkles } from 'lucide-react';

export default function HelpPage() {
  const faqs = [
    {
      q: 'How does SphereO AI ensure that custom designs can physically be made?',
      a: 'SphereO AI runs an automated capability check against the selected artisan’s verified profile: checking allowable raw materials, kiln temperatures, natural mineral pigments, and tool capacities. If a requested element is impossible (such as synthetic neon dye in natural lac resin), the AI explains the restriction and recommends an authentic alternative.',
    },
    {
      q: 'Who has the final say on my custom design proposal?',
      a: 'The master artisan has 100% final creative and manufacturing authority. A computer-generated preview is merely a proposal; work never begins until the artisan explicitly signs off in their studio queue.',
    },
    {
      q: 'How do video consultations work?',
      a: 'You can book a 45-minute live consultation directly on any artisan’s profile. Our platform includes an in-platform virtual meeting room with live simulated messaging and design brief preview without requiring third-party software.',
    },
    {
      q: 'What are the shipping timelines for bespoke creations?',
      a: 'Ready-to-ship catalog items dispatch within 3 business days. Made-to-order and custom pieces require between 7 to 30 days depending on natural drying, wood-kiln firing, and setting schedules.',
    },
    {
      q: 'How do payments work in this prototype?',
      a: 'This application operates in safe Demo Mode. Transactions are simulated realistically using local persistence so you can test the complete cart, order generation, and artisan workflow without real payment credentials.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="border-b border-sphereo-border pb-6 space-y-2">
        <Badge variant="terracotta" size="sm">
          Support & Guidance
        </Badge>
        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-sphereo-charcoal">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-sphereo-wood/80">
          Everything you need to know about commissioning, artisan consultations, and shipping.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((faq, idx) => (
          <div key={idx} className="p-5 bg-sphereo-ivory border border-sphereo-border rounded-lg space-y-2 shadow-xs">
            <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
              {faq.q}
            </h3>
            <p className="text-xs text-sphereo-wood/85 leading-relaxed">
              {faq.a}
            </p>
          </div>
        ))}
      </div>

      <div className="p-6 bg-sphereo-linen/50 border border-sphereo-border rounded-lg text-xs space-y-2">
        <span className="font-bold text-sphereo-charcoal block">Need direct concierge assistance?</span>
        <p className="text-sphereo-wood/80">
          Our craft advisors are available to guide custom wedding commissions, architectural tile orders, or institutional gifting. Contact us anytime at <strong>patron@sphereo.art</strong>.
        </p>
      </div>
    </div>
  );
}

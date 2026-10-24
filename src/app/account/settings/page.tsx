'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSphereoStore } from '../../../lib/store';
import { Badge } from '../../../components/common/Badge';
import { Button } from '../../../components/common/Button';
import { ArrowLeft, RefreshCw, CheckCircle2 } from 'lucide-react';

export default function AccountSettingsPage() {
  const { resetDemoData } = useSphereoStore();
  const [saved, setSaved] = useState(false);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/account"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="terracotta" size="sm" className="mb-0.5">
              Patron Preferences
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Account Settings
            </h1>
          </div>
        </div>
      </div>

      <div className="space-y-6 text-xs text-sphereo-charcoal">
        {/* Profile Card */}
        <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4 shadow-xs">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2">
            Patron Profile Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold mb-1">Display Name</label>
              <input
                type="text"
                defaultValue="Ananya Deshmukh"
                className="w-full p-2 bg-sphereo-linen/40 border border-sphereo-border rounded text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Email Address</label>
              <input
                type="email"
                defaultValue="ananya.deshmukh@example.com"
                className="w-full p-2 bg-sphereo-linen/40 border border-sphereo-border rounded text-xs"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Preferred Currency</label>
              <select className="w-full p-2 bg-sphereo-linen/40 border border-sphereo-border rounded text-xs font-semibold">
                <option>INR (₹) — Indian Rupee</option>
                <option>USD ($) — US Dollar (Simulated Exchange)</option>
                <option>EUR (€) — Euro (Simulated Exchange)</option>
                <option>GBP (£) — British Pound (Simulated Exchange)</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold mb-1">Timezone for Consultations</label>
              <select className="w-full p-2 bg-sphereo-linen/40 border border-sphereo-border rounded text-xs font-semibold">
                <option>Asia/Kolkata (IST +5:30)</option>
                <option>Europe/London (GMT / BST)</option>
                <option>America/New_York (EST / EDT)</option>
                <option>America/Los_Angeles (PST / PDT)</option>
              </select>
            </div>
          </div>

          <div className="pt-2">
            <Button
              variant="primary"
              size="sm"
              onClick={() => {
                setSaved(true);
                setTimeout(() => setSaved(false), 2000);
              }}
            >
              <span>{saved ? 'Preferences Saved!' : 'Save Preferences'}</span>
            </Button>
          </div>
        </div>

        {/* Demo Mode & Prototype Reset Box */}
        <div className="bg-sphereo-linen/50 border border-sphereo-border rounded-lg p-6 space-y-3">
          <h3 className="font-serif text-base font-bold text-sphereo-charcoal">
            Prototype Demo Data Management
          </h3>
          <p className="text-sphereo-wood/80 leading-relaxed">
            Need to reset all orders, customized designs, and bookings back to their original factory-seeded states? You can clear local demo persistence at any time.
          </p>
          <div className="pt-2">
            <Button
              variant="outline"
              size="sm"
              className="text-red-700 hover:bg-red-50 hover:border-red-300"
              onClick={() => {
                if (confirm('Reset prototype demo state to factory seeded records?')) {
                  resetDemoData();
                }
              }}
            >
              <RefreshCw size={13} />
              <span>Reset All Demo Data</span>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { useSphereoStore } from '../../lib/store';
import { UserCheck, ShieldAlert, Sparkles, RefreshCw, ChevronDown, Check } from 'lucide-react';

export const DemoRoleSwitcher: React.FC = () => {
  const { role, switchRole, resetDemoData } = useSphereoStore();
  const [isOpen, setIsOpen] = useState(false);

  const roleLabels = {
    customer: { label: 'Patron Mode', icon: UserCheck, desc: 'Shop, customize & create with AI' },
    artisan: { label: 'Artisan Studio Mode', icon: Sparkles, desc: 'Review AI designs & fulfill orders' },
    admin: { label: 'Platform Admin Mode', icon: ShieldAlert, desc: 'Manage catalog, verifications & analytics' },
  };

  const CurrentIcon = roleLabels[role].icon;

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-medium rounded-full bg-sphereo-linen border border-sphereo-border text-sphereo-charcoal hover:bg-sphereo-sand/60 transition-colors shadow-xs"
        aria-label="Switch demo mode"
      >
        <span className="w-2 h-2 rounded-full bg-emerald-600 animate-ping" />
        <CurrentIcon size={13} className="text-sphereo-terracotta" />
        <span className="hidden sm:inline font-semibold">{roleLabels[role].label}</span>
        <ChevronDown size={12} className="opacity-60" />
      </button>

      {isOpen && (
        <div className="origin-top-right absolute right-0 mt-2 w-72 rounded-md shadow-modal bg-sphereo-ivory border border-sphereo-border ring-1 ring-black ring-opacity-5 z-50 p-2 text-xs">
          <div className="px-2 py-1.5 border-b border-sphereo-border mb-1">
            <p className="font-semibold text-sphereo-charcoal">Demo Role Switcher</p>
            <p className="text-[11px] text-sphereo-wood/70">
              Explore SphereO from different perspectives:
            </p>
          </div>

          {(['customer', 'artisan', 'admin'] as const).map((r) => {
            const ItemIcon = roleLabels[r].icon;
            const isSelected = role === r;
            return (
              <button
                key={r}
                onClick={() => {
                  switchRole(r);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-2 rounded flex items-start gap-2.5 transition-colors ${
                  isSelected
                    ? 'bg-sphereo-linen font-medium text-sphereo-charcoal'
                    : 'hover:bg-sphereo-linen/50 text-sphereo-charcoal/80'
                }`}
              >
                <ItemIcon size={15} className="text-sphereo-terracotta shrink-0 mt-0.5" />
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-sphereo-charcoal">{roleLabels[r].label}</span>
                    {isSelected && <Check size={13} className="text-emerald-700" />}
                  </div>
                  <p className="text-[11px] text-sphereo-charcoal/60 leading-tight mt-0.5">
                    {roleLabels[r].desc}
                  </p>
                </div>
              </button>
            );
          })}

          <div className="pt-2 mt-1 border-t border-sphereo-border">
            <button
              onClick={() => {
                if (confirm('Reset all demo state to fresh seeded data?')) {
                  resetDemoData();
                  setIsOpen(false);
                }
              }}
              className="w-full text-left px-2.5 py-1.5 rounded text-[11px] text-sphereo-charcoal/70 hover:text-red-700 hover:bg-red-50 flex items-center gap-1.5 transition-colors"
            >
              <RefreshCw size={12} />
              <span>Reset Prototype Demo State</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

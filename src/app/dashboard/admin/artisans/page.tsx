'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ARTISANS } from '../../../../data/artisans';
import { Badge } from '../../../../components/common/Badge';
import { ArrowLeft, ShieldCheck, Check, X } from 'lucide-react';

export default function AdminArtisansPage() {
  const [artisansList, setArtisansList] = useState(ARTISANS);

  const toggleVerification = (id: string) => {
    setArtisansList((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isVerified: !a.isVerified } : a))
    );
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link
            href="/dashboard/admin"
            className="p-1 rounded text-sphereo-wood hover:text-sphereo-charcoal hover:bg-sphereo-linen"
          >
            <ArrowLeft size={16} />
          </Link>
          <div>
            <Badge variant="charcoal" size="sm" className="mb-0.5">
              Admin Governance
            </Badge>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal">
              Artisan Verifications & Lineages ({artisansList.length})
            </h1>
          </div>
        </div>
      </div>

      <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg overflow-hidden shadow-xs">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs text-sphereo-charcoal">
            <thead className="bg-sphereo-linen/60 border-b border-sphereo-border text-[11px] uppercase tracking-wider text-sphereo-wood font-semibold">
              <tr>
                <th className="p-3.5">Master Artisan</th>
                <th className="p-3.5">Guild Specialization</th>
                <th className="p-3.5">Hearth Region</th>
                <th className="p-3.5">Experience</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Verification Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-sphereo-border">
              {artisansList.map((a) => (
                <tr key={a.id} className="hover:bg-sphereo-linen/30 transition-colors">
                  <td className="p-3.5 flex items-center gap-2.5">
                    <div className="relative w-8 h-8 rounded-full overflow-hidden bg-sphereo-sand shrink-0">
                      <Image src={a.avatar} alt={a.name} fill className="object-cover" />
                    </div>
                    <div>
                      <strong className="block text-sphereo-charcoal">{a.name}</strong>
                      <span className="text-[10px] text-sphereo-wood/70">{a.headline}</span>
                    </div>
                  </td>
                  <td className="p-3.5">{a.craftName}</td>
                  <td className="p-3.5">{a.region}</td>
                  <td className="p-3.5">{a.experienceYears} Years</td>
                  <td className="p-3.5">
                    {a.isVerified ? (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-emerald-100 text-emerald-800 flex items-center gap-1 w-max">
                        <ShieldCheck size={11} />
                        Verified GI
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider bg-amber-100 text-amber-900 w-max block">
                        Pending Audit
                      </span>
                    )}
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      type="button"
                      onClick={() => toggleVerification(a.id)}
                      className={`px-3 py-1 rounded text-xs font-semibold transition-colors ${
                        a.isVerified
                          ? 'bg-stone-200 text-stone-800 hover:bg-stone-300'
                          : 'bg-emerald-700 text-white hover:bg-emerald-800'
                      }`}
                    >
                      {a.isVerified ? 'Revoke Status' : 'Approve GI Lineage'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

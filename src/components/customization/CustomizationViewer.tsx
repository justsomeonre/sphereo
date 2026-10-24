'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Product, SelectedCustomization } from '../../lib/types';
import { formatINR } from '../../lib/pricing';
import { useSphereoStore } from '../../lib/store';
import { Button } from '../common/Button';
import { Sparkles, Check, Clock, ShieldCheck, ShoppingBag, Bookmark, ArrowRight } from 'lucide-react';

interface CustomizationViewerProps {
  product: Product;
}

export const CustomizationViewer: React.FC<CustomizationViewerProps> = ({ product }) => {
  const router = useRouter();
  const { addToCart, saveCustomDesign } = useSphereoStore();

  const options = product.customizationOptions;

  // Selected state
  const [selectedColor, setSelectedColor] = useState(options?.colors?.[0]?.name || product.colors[0] || 'Default');
  const [colorPrice, setColorPrice] = useState(options?.colors?.[0]?.priceAdd || 0);

  const [selectedMaterial, setSelectedMaterial] = useState(options?.materials?.[0]?.name || product.materials[0] || 'Standard');
  const [materialPrice, setMaterialPrice] = useState(options?.materials?.[0]?.priceAdd || 0);

  const [selectedSize, setSelectedSize] = useState(options?.sizes?.[0]?.name || 'Standard');
  const [sizePrice, setSizePrice] = useState(options?.sizes?.[0]?.priceAdd || 0);

  const [selectedFinish, setSelectedFinish] = useState(options?.finishes?.[0]?.name || 'Standard Finish');
  const [finishPrice, setFinishPrice] = useState(options?.finishes?.[0]?.priceAdd || 0);

  const [engravingText, setEngravingText] = useState('');
  const [engravingActive, setEngravingActive] = useState(false);
  const engravingPrice = engravingActive ? (options?.engravingPrice || 250) : 0;

  const [isSavedFeedback, setIsSavedFeedback] = useState(false);
  const [isCartFeedback, setIsCartFeedback] = useState(false);

  const totalAddedPrice = colorPrice + materialPrice + sizePrice + finishPrice + engravingPrice;
  const finalPrice = product.basePrice + totalAddedPrice;

  // Current customization object
  const currentCustomization: SelectedCustomization = {
    color: selectedColor,
    material: selectedMaterial,
    size: selectedSize,
    finish: selectedFinish,
    engravingText: engravingActive ? engravingText : undefined,
    addedPrice: totalAddedPrice,
  };

  const handleAddToCart = () => {
    addToCart(product, 1, currentCustomization);
    setIsCartFeedback(true);
    setTimeout(() => setIsCartFeedback(false), 2500);
  };

  const handleSaveDesign = () => {
    saveCustomDesign(product.id, currentCustomization);
    setIsSavedFeedback(true);
    setTimeout(() => setIsSavedFeedback(false), 2500);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Visual Preview Column (Sticky on desktop) */}
      <div className="lg:col-span-6 lg:sticky lg:top-28 space-y-4">
        <div className="relative aspect-square w-full rounded-md overflow-hidden bg-sphereo-linen/40 border border-sphereo-border shadow-card">
          <Image
            src={product.images[0] || 'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80'}
            alt={product.title}
            fill
            className="object-cover transition-all duration-300"
          />

          {/* Color Tint / Finish Simulation Overlay */}
          <div
            className="absolute inset-0 pointer-events-none mix-blend-overlay opacity-30 transition-colors duration-500"
            style={{
              backgroundColor:
                options?.colors?.find((c) => c.name === selectedColor)?.hex ||
                'transparent',
            }}
          />

          {/* Live Engraving Overlay Tag if specified */}
          {engravingActive && engravingText.trim() && (
            <div className="absolute bottom-4 left-4 right-4 bg-sphereo-charcoal/80 backdrop-blur-md text-sphereo-ivory py-2 px-3 rounded text-center border border-sphereo-brass/40 animate-fadeIn">
              <span className="text-[10px] uppercase font-bold tracking-widest text-sphereo-brass block">
                Artisan Hand-Engraved Inscription
              </span>
              <span className="font-serif italic text-sm tracking-widest text-sphereo-ivory">
                “{engravingText}”
              </span>
            </div>
          )}

          <div className="absolute top-4 left-4 bg-sphereo-ivory/90 backdrop-blur-md px-3 py-1 rounded text-xs font-semibold text-sphereo-charcoal border border-sphereo-border flex items-center gap-1.5 shadow-xs">
            <Sparkles size={14} className="text-sphereo-terracotta" />
            <span>Interactive Customization Preview</span>
          </div>
        </div>

        {/* Selected Specifications Card */}
        <div className="p-4 bg-sphereo-ivory border border-sphereo-border rounded-md text-xs space-y-2">
          <h4 className="font-semibold text-sphereo-charcoal uppercase tracking-wider text-[11px] border-b border-sphereo-border pb-1.5">
            Active Configuration
          </h4>
          <div className="grid grid-cols-2 gap-2 text-sphereo-charcoal/80">
            <div><span className="text-sphereo-wood/70">Colorway:</span> <strong className="text-sphereo-charcoal">{selectedColor}</strong></div>
            <div><span className="text-sphereo-wood/70">Material:</span> <strong className="text-sphereo-charcoal">{selectedMaterial}</strong></div>
            <div><span className="text-sphereo-wood/70">Proportions:</span> <strong className="text-sphereo-charcoal">{selectedSize}</strong></div>
            <div><span className="text-sphereo-wood/70">Finish:</span> <strong className="text-sphereo-charcoal">{selectedFinish}</strong></div>
          </div>
          {engravingActive && (
            <div className="pt-1 text-sphereo-terracotta font-medium">
              Engraving: “{engravingText || '(Enter text)'}” (+{formatINR(engravingPrice)})
            </div>
          )}
        </div>
      </div>

      {/* Customization Controls Column */}
      <div className="lg:col-span-6 space-y-6">
        <div>
          <span className="text-xs uppercase font-semibold tracking-wider text-sphereo-terracotta">
            Artisan Studio Customization
          </span>
          <h1 className="font-serif text-2xl sm:text-3xl font-bold text-sphereo-charcoal mt-1">
            {product.title}
          </h1>
          <p className="text-xs text-sphereo-wood/80 mt-1">
            Handcrafted by <strong>{product.artisanName}</strong> in {product.craftName}
          </p>
        </div>

        {/* 1. Color Palette Options */}
        {options?.colors && options.colors.length > 0 && (
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal">
                1. Select Prepared Pigment / Color
              </label>
              <span className="text-xs text-sphereo-charcoal/70">{selectedColor}</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {options.colors.map((color) => {
                const isSelected = selectedColor === color.name;
                return (
                  <button
                    key={color.name}
                    type="button"
                    onClick={() => {
                      setSelectedColor(color.name);
                      setColorPrice(color.priceAdd);
                    }}
                    className={`flex items-center gap-2 p-2.5 rounded border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-sphereo-terracotta bg-sphereo-terracotta/5 font-semibold text-sphereo-charcoal ring-1 ring-sphereo-terracotta'
                        : 'border-sphereo-border hover:bg-sphereo-linen/40 text-sphereo-charcoal/80'
                    }`}
                  >
                    <span
                      className="w-4 h-4 rounded-full border border-black/10 shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <div className="truncate flex-1">
                      <div className="truncate">{color.name}</div>
                      <div className="text-[10px] text-sphereo-wood/70">
                        {color.priceAdd > 0 ? `+${formatINR(color.priceAdd)}` : 'Included'}
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 2. Material Selections */}
        {options?.materials && options.materials.length > 0 && (
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal block">
              2. Material Formulation
            </label>
            <div className="space-y-2">
              {options.materials.map((mat) => {
                const isSelected = selectedMaterial === mat.name;
                return (
                  <button
                    key={mat.name}
                    type="button"
                    onClick={() => {
                      setSelectedMaterial(mat.name);
                      setMaterialPrice(mat.priceAdd);
                    }}
                    className={`w-full flex items-center justify-between p-3 rounded border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-sphereo-terracotta bg-sphereo-terracotta/5 font-semibold text-sphereo-charcoal ring-1 ring-sphereo-terracotta'
                        : 'border-sphereo-border hover:bg-sphereo-linen/40 text-sphereo-charcoal/80'
                    }`}
                  >
                    <div>
                      <span className="font-semibold">{mat.name}</span>
                      {mat.desc && <p className="text-[11px] text-sphereo-wood/70 mt-0.5">{mat.desc}</p>}
                    </div>
                    <span className="text-xs font-medium text-sphereo-wood">
                      {mat.priceAdd > 0 ? `+${formatINR(mat.priceAdd)}` : 'Base Material'}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 3. Sizes & Dimensions */}
        {options?.sizes && options.sizes.length > 0 && (
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal block">
              3. Artisan Dimensions & Proportions
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {options.sizes.map((sz) => {
                const isSelected = selectedSize === sz.name;
                return (
                  <button
                    key={sz.name}
                    type="button"
                    onClick={() => {
                      setSelectedSize(sz.name);
                      setSizePrice(sz.priceAdd);
                    }}
                    className={`p-2.5 rounded border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-sphereo-terracotta bg-sphereo-terracotta/5 font-semibold text-sphereo-charcoal ring-1 ring-sphereo-terracotta'
                        : 'border-sphereo-border hover:bg-sphereo-linen/40 text-sphereo-charcoal/80'
                    }`}
                  >
                    <div className="font-semibold">{sz.name}</div>
                    <div className="text-[11px] text-sphereo-wood/70">{sz.dimensions}</div>
                    <div className="text-[10px] text-sphereo-terracotta font-medium mt-1">
                      {sz.priceAdd > 0 ? `+${formatINR(sz.priceAdd)}` : sz.priceAdd < 0 ? `-${formatINR(Math.abs(sz.priceAdd))}` : 'Standard size'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 4. Finishes */}
        {options?.finishes && options.finishes.length > 0 && (
          <div className="space-y-2.5">
            <label className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal block">
              4. Surface Texture & Finish
            </label>
            <div className="grid grid-cols-2 gap-2">
              {options.finishes.map((f) => {
                const isSelected = selectedFinish === f.name;
                return (
                  <button
                    key={f.name}
                    type="button"
                    onClick={() => {
                      setSelectedFinish(f.name);
                      setFinishPrice(f.priceAdd);
                    }}
                    className={`p-2.5 rounded border text-left text-xs transition-all ${
                      isSelected
                        ? 'border-sphereo-terracotta bg-sphereo-terracotta/5 font-semibold text-sphereo-charcoal ring-1 ring-sphereo-terracotta'
                        : 'border-sphereo-border hover:bg-sphereo-linen/40 text-sphereo-charcoal/80'
                    }`}
                  >
                    <div>{f.name}</div>
                    <div className="text-[10px] text-sphereo-wood/70">
                      {f.priceAdd > 0 ? `+${formatINR(f.priceAdd)}` : 'Standard Polish'}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* 5. Hand Engraving */}
        {options?.allowsEngraving && (
          <div className="p-3.5 bg-sphereo-linen/40 border border-sphereo-border rounded-md space-y-2.5">
            <label className="flex items-center justify-between cursor-pointer">
              <span className="text-xs font-bold uppercase tracking-wider text-sphereo-charcoal flex items-center gap-1.5">
                <span>Personalized Inscription / Engraving</span>
                <span className="text-[10px] text-sphereo-brass font-bold">(+{formatINR(options.engravingPrice || 250)})</span>
              </span>
              <input
                type="checkbox"
                checked={engravingActive}
                onChange={(e) => setEngravingActive(e.target.checked)}
                className="rounded text-sphereo-terracotta focus:ring-sphereo-terracotta"
              />
            </label>

            {engravingActive && (
              <div className="space-y-1 pt-1 animate-fadeIn">
                <input
                  type="text"
                  maxLength={options.engravingMaxChars || 16}
                  value={engravingText}
                  onChange={(e) => setEngravingText(e.target.value)}
                  placeholder={`Initials, names or dates (max ${options.engravingMaxChars || 16} chars)`}
                  className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                />
                <p className="text-[11px] text-sphereo-wood/70">
                  Carefully hand-inscribed by the artisan before final firing or setting.
                </p>
              </div>
            )}
          </div>
        )}

        {/* Price Breakdown & Production Timeline */}
        <div className="p-4 bg-sphereo-linen/70 border border-sphereo-border rounded-md space-y-3">
          <div className="flex items-center justify-between text-xs text-sphereo-charcoal/80">
            <span>Base Artisan Price:</span>
            <span>{formatINR(product.basePrice)}</span>
          </div>
          {totalAddedPrice > 0 && (
            <div className="flex items-center justify-between text-xs text-sphereo-terracotta font-medium">
              <span>Custom Material & Finish Modifiers:</span>
              <span>+{formatINR(totalAddedPrice)}</span>
            </div>
          )}
          <div className="flex items-center justify-between pt-2 border-t border-sphereo-border font-serif text-lg font-bold text-sphereo-charcoal">
            <span>Total Configured Price:</span>
            <span>{formatINR(finalPrice)}</span>
          </div>

          <div className="flex items-center gap-2 pt-1 text-xs text-sphereo-wood/80">
            <Clock size={14} className="text-sphereo-terracotta shrink-0" />
            <span>Estimated Production Lead Time: <strong>~{product.leadTimeDays + 3} days</strong></span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2.5 pt-2">
          <div className="flex flex-col sm:flex-row gap-2.5">
            <Button
              variant="primary"
              size="lg"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingBag size={16} />
              <span>{isCartFeedback ? 'Added to Cart!' : 'Add Customized Piece to Cart'}</span>
            </Button>

            <Button
              variant="outline"
              size="lg"
              onClick={handleSaveDesign}
              title="Save this custom variation to your design journal"
            >
              <Bookmark size={16} />
              <span>{isSavedFeedback ? 'Design Saved!' : 'Save Design'}</span>
            </Button>
          </div>

          <button
            type="button"
            onClick={() => {
              router.push(`/ai-studio?artisan=${product.artisanId}`);
            }}
            className="w-full text-center py-2 text-xs text-sphereo-wood hover:text-sphereo-terracotta underline flex items-center justify-center gap-1 transition-colors"
          >
            <Sparkles size={13} />
            <span>Want a completely original concept? Open SphereO AI Studio with this artisan</span>
          </button>
        </div>
      </div>
    </div>
  );
};

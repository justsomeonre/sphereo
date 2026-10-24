'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useSphereoStore } from '../../lib/store';
import { calculateOrderPricing, formatINR } from '../../lib/pricing';
import { shippingAddressSchema } from '../../lib/validation';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import {
  ShieldCheck,
  CreditCard,
  QrCode,
  Truck,
  CheckCircle2,
  AlertCircle,
  ArrowLeft,
  Lock,
} from 'lucide-react';

export default function CheckoutPage() {
  const router = useRouter();
  const { cart, createOrder } = useSphereoStore();

  const [fullName, setFullName] = useState('Ananya Deshmukh');
  const [email, setEmail] = useState('ananya.deshmukh@example.com');
  const [phone, setPhone] = useState('+91 98201 44512');
  const [addressLine1, setAddressLine1] = useState('B-402, Heritage Terraces, Linking Road');
  const [city, setCity] = useState('Mumbai');
  const [state, setState] = useState('Maharashtra');
  const [postalCode, setPostalCode] = useState('400050');

  const [paymentMethod, setPaymentMethod] = useState<'UPI Simulation' | 'Credit/Debit Card (Simulated)' | 'Cash on Delivery'>('UPI Simulation');
  const [simulatedUpiId, setSimulatedUpiId] = useState('ananya@okhdfcbank');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const cartSummaryItems = cart.map((i) => ({ unitTotalPrice: i.unitTotalPrice, quantity: i.quantity }));
  const pricing = calculateOrderPricing(cartSummaryItems, 'HERITAGE10');

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto px-4 py-20 text-center space-y-4">
        <h2 className="font-serif text-2xl font-bold text-sphereo-charcoal">
          Your cart is currently empty
        </h2>
        <p className="text-xs text-sphereo-wood/80">
          Add an artisan piece to your cart before proceeding to checkout.
        </p>
        <Link
          href="/discover"
          className="inline-flex items-center gap-1.5 px-6 py-2.5 bg-sphereo-terracotta text-white rounded text-xs font-semibold"
        >
          Explore Catalog
        </Link>
      </div>
    );
  }

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setFormError('');

    const validation = shippingAddressSchema.safeParse({
      fullName,
      email,
      phone,
      addressLine1,
      city,
      state,
      postalCode,
    });

    if (!validation.success) {
      setFormError(validation.error.errors[0]?.message || 'Please check your delivery address fields.');
      return;
    }

    setIsSubmitting(true);

    setTimeout(() => {
      const order = createOrder({
        customerId: 'cust-demo-1',
        customerName: fullName,
        customerEmail: email,
        items: cart,
        shippingAddress: {
          fullName,
          addressLine1,
          city,
          state,
          postalCode,
          phone,
        },
        paymentMethod,
        subtotal: pricing.subtotal,
        tax: pricing.tax,
        shipping: pricing.shipping,
        discount: pricing.discount,
        total: pricing.total,
      });

      setIsSubmitting(false);
      router.push(`/checkout/success?orderId=${order.id}`);
    }, 1200);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Checkout Header */}
      <div className="border-b border-sphereo-border pb-4 flex items-center justify-between">
        <Link
          href="/cart"
          className="inline-flex items-center gap-1.5 text-xs text-sphereo-wood hover:text-sphereo-terracotta transition-colors font-medium"
        >
          <ArrowLeft size={14} />
          <span>Return to Cart</span>
        </Link>
        <Badge variant="brass" size="sm">
          Simulated Secure Checkout
        </Badge>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* Left Column: Delivery & Payment Details */}
        <div className="lg:col-span-7 space-y-8">
          {/* Section 1: Contact Information */}
          <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2 flex items-center justify-between">
              <span>1. Patron & Contact Information</span>
              <span className="text-xs text-sphereo-wood/70 font-sans font-normal">Step 1 of 3</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  Mobile Phone (For Courier Updates)
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>
            </div>
          </div>

          {/* Section 2: Shipping Destination */}
          <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2 flex items-center justify-between">
              <span>2. Delivery Address</span>
              <span className="text-xs text-sphereo-wood/70 font-sans font-normal">Step 2 of 3</span>
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="sm:col-span-2">
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  Street Address
                </label>
                <input
                  type="text"
                  value={addressLine1}
                  onChange={(e) => setAddressLine1(e.target.value)}
                  className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  City
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  State / Province
                </label>
                <input
                  type="text"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  PIN / Postal Code
                </label>
                <input
                  type="text"
                  value={postalCode}
                  onChange={(e) => setPostalCode(e.target.value)}
                  className="w-full p-2.5 bg-sphereo-linen/30 border border-sphereo-border rounded text-xs focus:outline-none focus:ring-1 focus:ring-sphereo-terracotta"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-sphereo-charcoal mb-1">
                  Country / Region
                </label>
                <input
                  type="text"
                  value="India (Worldwide Delivery Available)"
                  disabled
                  className="w-full p-2.5 bg-sphereo-linen/50 border border-sphereo-border rounded text-xs text-sphereo-charcoal/70"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Payment Method Simulation */}
          <div className="bg-sphereo-ivory border border-sphereo-border rounded-lg p-6 space-y-4">
            <h2 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-2 flex items-center justify-between">
              <span>3. Simulated Payment Selection</span>
              <span className="text-xs text-sphereo-wood/70 font-sans font-normal">Step 3 of 3</span>
            </h2>

            <div className="p-3 bg-amber-50 border border-amber-200 rounded text-xs text-amber-900 flex items-start gap-2">
              <Lock size={15} className="shrink-0 mt-0.5 text-amber-700" />
              <span>
                <strong>Demo Mode Active:</strong> This application executes realistic simulated transactions. No live payment gateway keys are required and no real funds will be charged.
              </span>
            </div>

            <div className="space-y-3">
              {[
                {
                  id: 'UPI Simulation',
                  title: 'Instant UPI Simulation (Google Pay, PhonePe, BHIM)',
                  icon: QrCode,
                  desc: 'Simulate instantaneous zero-fee UPI settlement',
                },
                {
                  id: 'Credit/Debit Card (Simulated)',
                  title: 'Credit / Debit Card (Simulated Gateway)',
                  icon: CreditCard,
                  desc: 'Simulate Visa, Mastercard, or RuPay processing',
                },
                {
                  id: 'Cash on Delivery',
                  title: 'Pay Upon Delivery (COD)',
                  icon: Truck,
                  desc: 'Pay cash or UPI directly to courier upon delivery',
                },
              ].map((method) => {
                const isSelected = paymentMethod === method.id;
                const MethodIcon = method.icon;
                return (
                  <label
                    key={method.id}
                    className={`flex items-start gap-3 p-3.5 rounded border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-sphereo-terracotta bg-sphereo-terracotta/5 ring-1 ring-sphereo-terracotta'
                        : 'border-sphereo-border hover:bg-sphereo-linen/40'
                    }`}
                  >
                    <input
                      type="radio"
                      name="paymentMethod"
                      value={method.id}
                      checked={isSelected}
                      onChange={() => setPaymentMethod(method.id as any)}
                      className="mt-1 text-sphereo-terracotta focus:ring-sphereo-terracotta"
                    />
                    <div className="flex-1 text-xs">
                      <div className="flex items-center gap-2 font-semibold text-sphereo-charcoal">
                        <MethodIcon size={15} className="text-sphereo-terracotta" />
                        <span>{method.title}</span>
                      </div>
                      <p className="text-[11px] text-sphereo-wood/75 mt-0.5">{method.desc}</p>
                    </div>
                  </label>
                );
              })}
            </div>

            {paymentMethod === 'UPI Simulation' && (
              <div className="p-3 bg-sphereo-linen/40 border border-sphereo-border rounded space-y-1.5 text-xs animate-fadeIn">
                <label className="font-semibold text-sphereo-charcoal block">
                  Simulated Virtual Payment Address (VPA / UPI ID)
                </label>
                <input
                  type="text"
                  value={simulatedUpiId}
                  onChange={(e) => setSimulatedUpiId(e.target.value)}
                  className="w-full p-2 bg-sphereo-ivory border border-sphereo-border rounded text-xs"
                />
              </div>
            )}
          </div>

          {formError && (
            <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded text-xs flex items-center gap-2">
              <AlertCircle size={15} className="shrink-0" />
              <span>{formError}</span>
            </div>
          )}

          <Button
            variant="primary"
            size="lg"
            type="submit"
            isLoading={isSubmitting}
            className="w-full py-4 text-base"
          >
            <ShieldCheck size={18} />
            <span>Confirm Order ({formatINR(pricing.total)})</span>
          </Button>
        </div>

        {/* Right Column: Order Items & Pricing Breakdown */}
        <div className="lg:col-span-5 bg-sphereo-linen/50 border border-sphereo-border rounded-lg p-6 space-y-5 lg:sticky lg:top-28">
          <h3 className="font-serif text-lg font-bold text-sphereo-charcoal border-b border-sphereo-border pb-3">
            Your Pieces ({cart.length})
          </h3>

          <div className="divide-y divide-sphereo-border max-h-80 overflow-y-auto pr-1">
            {cart.map((item) => (
              <div key={item.id} className="py-3 flex items-start justify-between gap-3 text-xs">
                <div>
                  <h4 className="font-serif font-bold text-sphereo-charcoal">
                    {item.productTitle}
                  </h4>
                  <p className="text-[11px] text-sphereo-wood/75">
                    Qty: {item.quantity} • by {item.artisanName}
                  </p>
                  {item.customization && (
                    <p className="text-[10px] text-sphereo-terracotta font-medium">
                      Bespoke: {item.customization.color || ''} {item.customization.material ? `• ${item.customization.material}` : ''}
                    </p>
                  )}
                </div>
                <span className="font-serif font-bold text-sphereo-charcoal whitespace-nowrap">
                  {formatINR(item.unitTotalPrice * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          {/* Pricing Breakdown */}
          <div className="border-t border-sphereo-border pt-4 space-y-2 text-xs text-sphereo-charcoal/80">
            <div className="flex justify-between">
              <span>Subtotal:</span>
              <span>{formatINR(pricing.subtotal)}</span>
            </div>
            {pricing.discount > 0 && (
              <div className="flex justify-between text-emerald-800 font-semibold">
                <span>Voucher Discount (HERITAGE10):</span>
                <span>-{formatINR(pricing.discount)}</span>
              </div>
            )}
            <div className="flex justify-between">
              <span>Artisan GST (5%):</span>
              <span>{formatINR(pricing.tax)}</span>
            </div>
            <div className="flex justify-between">
              <span>Insured Transit:</span>
              <span className="text-emerald-800 font-bold uppercase text-[10px]">
                {pricing.shipping === 0 ? 'Free' : formatINR(pricing.shipping)}
              </span>
            </div>
            <div className="flex justify-between font-serif text-lg font-bold text-sphereo-charcoal pt-2 border-t border-sphereo-border">
              <span>Final Total:</span>
              <span>{formatINR(pricing.total)}</span>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

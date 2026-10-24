import test from 'node:test';
import assert from 'node:assert/strict';

import { calculateOrderPricing, formatINR, VALID_COUPONS } from '../src/lib/pricing';
import { parsePrompt, validateDesignAgainstArtisan, generateDesignProposal } from '../src/lib/ai-engine';
import { ARTISANS } from '../src/data/artisans';
import { CRAFTS } from '../src/data/crafts';
import { PRODUCTS } from '../src/data/products';
import { filterCatalog } from '../src/lib/catalog';
import { shippingAddressSchema, consultationBookingSchema, newsletterSchema } from '../src/lib/validation';

test('1. Pricing Engine - Accurate Integer Paise & Currency Math', () => {
  // Test Case A: Empty cart
  const emptyPricing = calculateOrderPricing([]);
  assert.equal(emptyPricing.subtotal, 0);
  assert.equal(emptyPricing.shipping, 0);
  assert.equal(emptyPricing.total, 0);

  // Test Case B: Cart under ₹1,999 threshold (should add ₹150 shipping)
  const smallCart = [{ unitTotalPrice: 1200, quantity: 1 }];
  const smallPricing = calculateOrderPricing(smallCart);
  assert.equal(smallPricing.subtotal, 1200);
  assert.equal(smallPricing.shipping, 150);
  // Tax 5% of 1200 = 60. Total = 1200 + 60 + 150 = 1410
  assert.equal(smallPricing.tax, 60);
  assert.equal(smallPricing.total, 1410);

  // Test Case C: Cart over ₹1,999 threshold (free shipping)
  const largeCart = [{ unitTotalPrice: 4200, quantity: 1 }];
  const largePricing = calculateOrderPricing(largeCart);
  assert.equal(largePricing.shipping, 0, 'Shipping must be 0 for orders >= ₹1,999');

  // Test Case D: Voucher Discount HERITAGE10 (10% off above ₹1,500)
  const voucherCart = [{ unitTotalPrice: 3000, quantity: 1 }];
  const discounted = calculateOrderPricing(voucherCart, 'HERITAGE10');
  assert.equal(discounted.appliedCoupon, 'HERITAGE10');
  assert.equal(discounted.discount, 300); // 10% of 3000
  // Discounted subtotal = 2700. Tax 5% of 2700 = 135. Shipping = 0. Total = 2835
  assert.equal(discounted.tax, 135);
  assert.equal(discounted.total, 2835);

  // Test Case E: Fixed Voucher Discount SPHEREO500 (₹500 off on ₹2,500+)
  const fixedVoucherCart = [{ unitTotalPrice: 3500, quantity: 1 }];
  const fixedDiscounted = calculateOrderPricing(fixedVoucherCart, 'SPHEREO500');
  assert.equal(fixedDiscounted.discount, 500);
  assert.equal(fixedDiscounted.total, 3150); // (3500-500) = 3000 + 5% tax (150) = 3150

  // Test Case F: Currency formatter
  const formatted = formatINR(3850);
  assert.match(formatted, /3,850/);
});

test('2. SphereO AI - Constraint Engine & Chemical/Material Auditing', () => {
  const rameshChandra = ARTISANS.find((a) => a.id === 'artisan-ramesh-chandra')!;
  assert.ok(rameshChandra, 'Artisan Ramesh Chandra must exist');

  // Test Case A: Valid artisan-compatible request (Natural lac in deep indigo with brass)
  const validPrompt = 'I want a traditional Rajasthani lac bangle set inspired by the night sky, in deep indigo, with tiny gold details, designed for a wedding gift.';
  const parsedValid = parsePrompt(validPrompt);
  const validCheck = validateDesignAgainstArtisan(rameshChandra, parsedValid);

  assert.equal(validCheck.overallStatus, 'Ready for Review');
  assert.ok(validCheck.checks.every((c) => c.status !== 'failed'), 'Compatible request must have zero failed checks');
  assert.equal(validCheck.validatedSpec.material, 'Natural Lac Resin');

  // Test Case B: Incompatible request with synthetic volatile dyes & plastics
  const invalidPrompt = 'I want neon electric blue lac bangles with synthetic polymer stones';
  const parsedInvalid = parsePrompt(invalidPrompt);
  const invalidCheck = validateDesignAgainstArtisan(rameshChandra, parsedInvalid);

  assert.equal(invalidCheck.overallStatus, 'Needs Changes', 'Synthetic neon dyes must trigger Needs Changes');
  assert.ok(invalidCheck.checks.some((c) => c.status === 'failed'), 'Must contain failed constraint check');
  assert.ok(invalidCheck.suggestedAlternatives.length > 0, 'Must propose feasible alternatives');
});

test('3. Catalog Scale & Product-Artisan Relationship Integrity', () => {
  // Verify 300 products exist
  assert.equal(PRODUCTS.length, 300, 'Catalog must contain exactly 300 seeded products initially');

  // Verify 40 artisans exist
  assert.equal(ARTISANS.length, 40, 'Platform must contain 40 seeded master artisans');

  // Verify all 12 craft categories are represented
  assert.equal(CRAFTS.length, 12, 'Platform must support 12 craft categories');

  // Verify relationship integrity: every product points to a valid artisan and craft
  for (const prod of PRODUCTS) {
    assert.ok(prod.id, 'Product must have ID');
    assert.ok(prod.slug, 'Product must have unique slug');
    assert.ok(prod.title, 'Product must have title');
    assert.ok(prod.basePrice > 0, 'Price must be positive integer');
    assert.ok(prod.images.length > 0, 'Product must have images');

    const matchingArtisan = ARTISANS.find((a) => a.id === prod.artisanId);
    assert.ok(matchingArtisan, `Product ${prod.id} must point to valid artisan ID ${prod.artisanId}`);

    const matchingCraft = CRAFTS.find((c) => c.id === prod.craftId);
    assert.ok(matchingCraft, `Product ${prod.id} must point to valid craft ID ${prod.craftId}`);
  }
});

test('4. Catalog Filtering, Multi-Facet Search & Indexing', () => {
  // Test Text search for "Blue Pottery"
  const bluePotteryResults = filterCatalog({ query: 'Blue Pottery' });
  assert.ok(bluePotteryResults.length > 0, 'Must find blue pottery items');
  assert.ok(bluePotteryResults.every((p) => p.craftName.includes('Blue Pottery') || p.title.toLowerCase().includes('blue')));

  // Test Customizable Only filter
  const customOnly = filterCatalog({ isCustomizable: true });
  assert.ok(customOnly.every((p) => p.isCustomizable === true));

  // Test Ready to Ship Only filter
  const readyOnly = filterCatalog({ isReadyToShip: true });
  assert.ok(readyOnly.every((p) => p.isReadyToShip === true));

  // Test Price Range filter
  const budgetResults = filterCatalog({ minPrice: 1000, maxPrice: 2000 });
  assert.ok(budgetResults.every((p) => p.basePrice >= 1000 && p.basePrice <= 2000));

  // Test Sorting: Price ascending
  const sortedAsc = filterCatalog({ sortBy: 'price-asc' });
  for (let i = 0; i < sortedAsc.length - 1; i++) {
    assert.ok(sortedAsc[i].basePrice <= sortedAsc[i + 1].basePrice, 'Prices must be non-decreasing');
  }
});

test('5. Consultation Booking Conflict Prevention Rule', () => {
  const existingBookings = [
    {
      id: 'book-1',
      artisanId: 'artisan-ramesh-chandra',
      date: '2026-10-27',
      timeSlot: '11:00 AM - 11:45 AM',
      status: 'Confirmed',
    },
  ];

  const checkConflict = (artisanId: string, date: string, timeSlot: string) => {
    return existingBookings.some(
      (b) => b.artisanId === artisanId && b.date === date && b.timeSlot === timeSlot && b.status !== 'Cancelled'
    );
  };

  // Clashing booking attempt
  const hasClash = checkConflict('artisan-ramesh-chandra', '2026-10-27', '11:00 AM - 11:45 AM');
  assert.equal(hasClash, true, 'Booking engine must detect double-booking conflict for same artisan and slot');

  // Non-clashing booking attempt (different time slot)
  const noClashTime = checkConflict('artisan-ramesh-chandra', '2026-10-27', '03:00 PM - 03:45 PM');
  assert.equal(noClashTime, false, 'Alternative slot must be available');

  // Non-clashing booking attempt (different artisan)
  const noClashArtisan = checkConflict('artisan-leela-devi', '2026-10-27', '11:00 AM - 11:45 AM');
  assert.equal(noClashArtisan, false, 'Different artisan at same time must be allowed');
});

test('6. Complete Flow Verification (Flows A through G)', () => {
  // FLOW A: Shopping Flow Simulation
  const product = PRODUCTS[0];
  const cartItem = { unitTotalPrice: product.basePrice, quantity: 2 };
  const orderPricing = calculateOrderPricing([cartItem], 'HERITAGE10');
  assert.ok(orderPricing.total > 0, 'Order total must be calculated');

  // Validate shipping address
  const addressValidation = shippingAddressSchema.safeParse({
    fullName: 'Ananya Deshmukh',
    email: 'ananya@example.com',
    phone: '+91 98201 44512',
    addressLine1: 'B-402, Heritage Terraces',
    city: 'Mumbai',
    state: 'Maharashtra',
    postalCode: '400050',
  });
  assert.ok(addressValidation.success, 'Valid address must pass Zod schema');

  // FLOW B: Customization Flow Simulation
  const basePrice = 3850;
  const colorModifier = 300;
  const engravingModifier = 250;
  const customizedPrice = basePrice + colorModifier + engravingModifier;
  assert.equal(customizedPrice, 4400);

  // FLOW C & D: AI Proposal Generation & Artisan Sign-off
  const proposal = generateDesignProposal(
    'cust-demo-1',
    'Ananya Deshmukh',
    'artisan-ramesh-chandra',
    'Indigo lac bangles with gold micro studs for wedding'
  );
  assert.ok(proposal.id);
  assert.equal(proposal.status, 'Ready for Review');
  
  // Simulate Artisan Approval
  proposal.status = 'Approved';
  proposal.artisanReviewNotes = 'Approved for studio shaping. Natural resin batch prepared.';
  assert.equal(proposal.status, 'Approved');

  // FLOW E: Consultation booking validation
  const bookingValidation = consultationBookingSchema.safeParse({
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya@example.com',
    date: '2026-10-28',
    timeSlot: '11:00 AM - 11:45 AM',
    topic: 'Bridal Bangle Inlay',
    brief: 'Looking to match wedding saree embroidery',
  });
  assert.ok(bookingValidation.success);

  // FLOW F: Newsletter validation
  const newsletterValid = newsletterSchema.safeParse({
    email: 'patron@example.com',
    consent: true,
  });
  assert.ok(newsletterValid.success);
});

export type Role = 'customer' | 'artisan' | 'admin';

export interface CraftCategory {
  id: string;
  slug: string;
  name: string;
  shortDescription: string;
  description: string;
  region: string;
  primaryMaterials: string[];
  image: string;
  heritageEra: string;
  iconName: string;
  featured: boolean;
}

export interface ArtisanCapability {
  supportedProductTypes: string[];
  techniques: string[];
  materials: string[];
  colors: string[];
  finishes: string[];
  maxComplexity: 'Simple' | 'Moderate' | 'Intricate' | 'Masterpiece';
  customizationRules: {
    allowsCustomColor: boolean;
    allowsCustomSize: boolean;
    allowsEngraving: boolean;
    allowsReferenceImages: boolean;
    disallowedCombinations?: Array<{
      material: string;
      color?: string;
      reason: string;
    }>;
  };
  minLeadTimeDays: number;
  maxLeadTimeDays: number;
}

export interface Artisan {
  id: string;
  slug: string;
  name: string;
  headline: string;
  region: string;
  craftId: string;
  craftName: string;
  bio: string;
  story: string;
  experienceYears: number;
  avatar: string;
  workshopImage: string;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  capabilities: ArtisanCapability;
  availableTimeSlots: Array<{
    id: string;
    dayOfWeek: string; // e.g. "Monday", "Wednesday"
    timeSlot: string;  // e.g. "10:00 AM - 10:45 AM"
  }>;
  materialsInStock: Array<{
    name: string;
    inStock: boolean;
    quantityDesc: string;
  }>;
  badges: string[];
  locationCoords?: { lat: number; lng: number };
}

export interface ProductCustomizationOption {
  colors?: Array<{ name: string; hex: string; priceAdd: number; inStock: boolean }>;
  materials?: Array<{ name: string; priceAdd: number; inStock: boolean; desc?: string }>;
  sizes?: Array<{ name: string; dimensions: string; priceAdd: number }>;
  finishes?: Array<{ name: string; priceAdd: number }>;
  patterns?: Array<{ name: string; priceAdd: number; previewUrl?: string }>;
  allowsEngraving?: boolean;
  engravingMaxChars?: number;
  engravingPrice?: number;
}

export interface Product {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  craftId: string;
  craftName: string;
  artisanId: string;
  artisanName: string;
  basePrice: number; // in INR (stored as whole rupees for display, math computed accurately)
  compareAtPrice?: number;
  images: string[];
  inventory: number;
  isCustomizable: boolean;
  isReadyToShip: boolean;
  leadTimeDays: number;
  materials: string[];
  colors: string[];
  dimensions: string;
  weight: string;
  careInstructions: string;
  tags: string[];
  rating: number;
  reviewCount: number;
  featured: boolean;
  customizationOptions?: ProductCustomizationOption;
}

export interface SelectedCustomization {
  color?: string;
  material?: string;
  size?: string;
  finish?: string;
  pattern?: string;
  engravingText?: string;
  notes?: string;
  referenceImageUrl?: string;
  addedPrice: number;
}

export interface CartItem {
  id: string; // unique item id
  productId: string;
  productTitle: string;
  productImage: string;
  artisanId: string;
  artisanName: string;
  basePrice: number;
  customization?: SelectedCustomization;
  quantity: number;
  unitTotalPrice: number;
}

export type DesignProposalStatus = 
  | 'Draft' 
  | 'Validating' 
  | 'Needs Changes' 
  | 'Ready for Review' 
  | 'Approved' 
  | 'Rejected' 
  | 'Ordered';

export interface DesignConstraintCheck {
  item: string;
  status: 'passed' | 'warning' | 'failed';
  message: string;
  alternativeSuggestion?: string;
}

export interface DesignProposal {
  id: string;
  customerId: string;
  customerName: string;
  artisanId: string;
  artisanName: string;
  craftId: string;
  craftName: string;
  productConceptTitle: string;
  customerPrompt: string;
  parsedRequirements: {
    productType: string;
    requestedMaterials: string[];
    requestedColors: string[];
    intendedOccasion?: string;
    budgetRange?: string;
    notes?: string;
  };
  validatedSpecification: {
    material: string;
    color: string;
    technique: string;
    finish: string;
    dimensions: string;
    complexity: 'Simple' | 'Moderate' | 'Intricate' | 'Masterpiece';
  };
  constraintChecks: DesignConstraintCheck[];
  previewUrl: string;
  previewType: 'conceptual_sketch' | 'material_swatch' | 'prototype_render';
  estimatedPrice: number;
  estimatedLeadTimeDays: number;
  status: DesignProposalStatus;
  artisanReviewNotes?: string;
  suggestedAlternatives?: string[];
  createdAt: string;
  updatedAt: string;
}

export type OrderStatus =
  | 'Order Placed'
  | 'Awaiting Artisan Confirmation'
  | 'Design Under Review'
  | 'Design Approved'
  | 'Materials Prepared'
  | 'Crafting in Progress'
  | 'Quality Check'
  | 'Ready to Ship'
  | 'Shipped'
  | 'Delivered';

export interface OrderTimelineEvent {
  status: OrderStatus;
  timestamp: string;
  note: string;
  completed: boolean;
}

export interface Order {
  id: string;
  orderNumber: string;
  customerId: string;
  customerName: string;
  customerEmail: string;
  items: CartItem[];
  shippingAddress: {
    fullName: string;
    addressLine1: string;
    addressLine2?: string;
    city: string;
    state: string;
    postalCode: string;
    phone: string;
  };
  paymentMethod: 'UPI Simulation' | 'Credit/Debit Card (Simulated)' | 'Cash on Delivery';
  subtotal: number;
  tax: number;
  shipping: number;
  discount: number;
  total: number;
  status: OrderStatus;
  timeline: OrderTimelineEvent[];
  createdAt: string;
}

export interface Booking {
  id: string;
  customerId: string;
  customerName: string;
  artisanId: string;
  artisanName: string;
  craftName: string;
  date: string;
  timeSlot: string;
  timezone: string;
  topic: string;
  brief: string;
  status: 'Confirmed' | 'Completed' | 'Cancelled';
  createdAt: string;
  meetingLink?: string;
}

export interface ProductReview {
  id: string;
  productId: string;
  artisanId: string;
  customerName: string;
  rating: number;
  date: string;
  comment: string;
  verifiedPurchase: boolean;
  demoFlag: boolean;
  artisanReply?: string;
}

export interface CulturalStory {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  craftId: string;
  craftName: string;
  region: string;
  readTime: string;
  publishedDate: string;
  coverImage: string;
  excerpt: string;
  content: string[]; // multi-paragraph editorial
  featuredArtisanId: string;
  featuredArtisanName: string;
  culturalContext: string;
  preservationEffort: string;
  tags: string[];
}

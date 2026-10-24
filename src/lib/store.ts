'use client';

import { useState, useEffect, useCallback } from 'react';
import {
  CartItem,
  DesignProposal,
  Order,
  Booking,
  Role,
  SelectedCustomization,
  Product,
} from './types';
import { ARTISANS } from '../data/artisans';
import { PRODUCTS } from '../data/products';

const STORAGE_KEYS = {
  CART: 'sphereo_cart_v1',
  ROLE: 'sphereo_role_v1',
  ACTIVE_ARTISAN: 'sphereo_active_artisan_v1',
  ORDERS: 'sphereo_orders_v1',
  PROPOSALS: 'sphereo_proposals_v1',
  BOOKINGS: 'sphereo_bookings_v1',
  FAVORITES: 'sphereo_favorites_v1',
  SAVED_DESIGNS: 'sphereo_saved_designs_v1',
};

// Seed sample orders for demo richness
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'ord-sph-98214',
    orderNumber: 'SPH-2026-98214',
    customerId: 'cust-demo-1',
    customerName: 'Ananya Deshmukh',
    customerEmail: 'ananya.deshmukh@example.com',
    items: [
      {
        id: 'ci-1',
        productId: 'prod-indigo-lac-bangles',
        productTitle: 'Indigo Garden Heritage Lac Bangle Set',
        productImage: 'https://images.unsplash.com/photo-1611591475879-1f4803975073?auto=format&fit=crop&w=800&q=80',
        artisanId: 'artisan-ramesh-chandra',
        artisanName: 'Ramesh Chandra Soni',
        basePrice: 3850,
        quantity: 1,
        unitTotalPrice: 4200,
        customization: {
          color: 'Deep Indigo',
          material: 'Natural Lac + Swarovski Glass Crystals',
          size: 'Size 2.6',
          finish: 'Lustre Polished',
          engravingText: 'AD & VK',
          addedPrice: 350,
        },
      },
    ],
    shippingAddress: {
      fullName: 'Ananya Deshmukh',
      addressLine1: 'B-402, Heritage Terraces, Linking Road',
      city: 'Mumbai',
      state: 'Maharashtra',
      postalCode: '400050',
      phone: '+91 98201 44512',
    },
    paymentMethod: 'UPI Simulation',
    subtotal: 4200,
    tax: 210,
    shipping: 0,
    discount: 420,
    total: 3990,
    status: 'Crafting in Progress',
    timeline: [
      { status: 'Order Placed', timestamp: '2026-10-20T14:30:00Z', note: 'Patron order recorded via SphereO simulation', completed: true },
      { status: 'Design Approved', timestamp: '2026-10-21T09:15:00Z', note: 'Master Ramesh confirmed crystal spacing and lac formulation', completed: true },
      { status: 'Materials Prepared', timestamp: '2026-10-22T11:00:00Z', note: 'Charcoal prepared, kusmi grade lac refined with natural indigo', completed: true },
      { status: 'Crafting in Progress', timestamp: '2026-10-23T16:00:00Z', note: 'Bangles shaped on wooden lathe; brass beads embedded', completed: true },
      { status: 'Quality Check', timestamp: '', note: 'Artisan inspects symmetry and crystal seating', completed: false },
      { status: 'Ready to Ship', timestamp: '', note: 'Artisanal gift box packing with certificate of provenance', completed: false },
      { status: 'Shipped', timestamp: '', note: 'Dispatched via premium insured courier', completed: false },
      { status: 'Delivered', timestamp: '', note: 'Delivered to patron', completed: false },
    ],
    createdAt: '2026-10-20T14:30:00Z',
  },
];

// Initial seeded proposals awaiting artisan review
const INITIAL_DEMO_PROPOSALS: DesignProposal[] = [
  {
    id: 'prop-demo-seed-1',
    customerId: 'cust-demo-1',
    customerName: 'Ananya Deshmukh',
    artisanId: 'artisan-ramesh-chandra',
    artisanName: 'Ramesh Chandra Soni',
    craftId: 'craft-lac-bangles',
    craftName: 'Lacquer & Lac Bangles',
    productConceptTitle: 'Night Sky Starlight Bridal Lac Bangle Set',
    customerPrompt: 'I want a traditional Rajasthani lac bangle set inspired by the night sky, in deep indigo, with tiny gold details, designed for a wedding gift.',
    parsedRequirements: {
      productType: 'Traditional Bangle Sets',
      requestedMaterials: ['Natural Lac Resin', 'Pure Brass Micro-beads'],
      requestedColors: ['Deep Indigo', 'Antique Gold'],
      intendedOccasion: 'Wedding / Bridal Celebration',
    },
    validatedSpecification: {
      material: 'Natural Lac Resin',
      color: 'Deep Indigo',
      technique: 'Charcoal Ember Heating',
      finish: 'Antique Brass Studded',
      dimensions: 'Bangle Size 2.6 (Inner Dia 60mm)',
      complexity: 'Masterpiece',
    },
    constraintChecks: [
      {
        item: 'Product Type Compatibility',
        status: 'passed',
        message: 'Ramesh Chandra Soni has verified mastery in producing Traditional Bangle Sets.',
      },
      {
        item: 'Color Formulation: Deep Indigo',
        status: 'passed',
        message: 'Natural mineral indigo batch is verified in workshop pigment inventory.',
      },
      {
        item: 'Material Authenticity: Natural Lac Resin',
        status: 'passed',
        message: 'Certified genuine Kusmi Grade Lac in verified stock.',
      },
    ],
    previewUrl: 'https://images.unsplash.com/photo-1611591475879-1f4803975073?auto=format&fit=crop&w=800&q=80',
    previewType: 'conceptual_sketch',
    estimatedPrice: 4200,
    estimatedLeadTimeDays: 14,
    status: 'Ready for Review',
    createdAt: '2026-10-23T11:20:00Z',
    updatedAt: '2026-10-23T11:20:00Z',
  },
];

// Initial bookings
const INITIAL_DEMO_BOOKINGS: Booking[] = [
  {
    id: 'book-sph-101',
    customerId: 'cust-demo-1',
    customerName: 'Ananya Deshmukh',
    artisanId: 'artisan-ramesh-chandra',
    artisanName: 'Ramesh Chandra Soni',
    craftName: 'Lacquer & Lac Bangles',
    date: '2026-10-27',
    timeSlot: '11:00 AM - 11:45 AM',
    timezone: 'Asia/Kolkata (IST)',
    topic: 'Custom Bridal Bangle Design & Sizing Consultation',
    brief: 'Would love to discuss integrating heirloom gold thread from my grandmother into the lac design.',
    status: 'Confirmed',
    createdAt: '2026-10-22T10:00:00Z',
    meetingLink: '/consultation/book-sph-101',
  },
];

export function useSphereoStore() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [role, setRole] = useState<Role>('customer');
  const [activeArtisanId, setActiveArtisanId] = useState<string>('artisan-ramesh-chandra');
  const [orders, setOrders] = useState<Order[]>([]);
  const [proposals, setProposals] = useState<DesignProposal[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [favorites, setFavorites] = useState<string[]>(['prod-indigo-lac-bangles', 'prod-blue-courtyard-vase']);
  const [savedDesigns, setSavedDesigns] = useState<Array<{ id: string; productId: string; title: string; image: string; customization: SelectedCustomization; price: number; savedAt: string }>>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(STORAGE_KEYS.CART);
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedRole = localStorage.getItem(STORAGE_KEYS.ROLE);
      if (storedRole) setRole(storedRole as Role);

      const storedArtisan = localStorage.getItem(STORAGE_KEYS.ACTIVE_ARTISAN);
      if (storedArtisan) setActiveArtisanId(storedArtisan);

      const storedOrders = localStorage.getItem(STORAGE_KEYS.ORDERS);
      setOrders(storedOrders ? JSON.parse(storedOrders) : INITIAL_DEMO_ORDERS);

      const storedProposals = localStorage.getItem(STORAGE_KEYS.PROPOSALS);
      setProposals(storedProposals ? JSON.parse(storedProposals) : INITIAL_DEMO_PROPOSALS);

      const storedBookings = localStorage.getItem(STORAGE_KEYS.BOOKINGS);
      setBookings(storedBookings ? JSON.parse(storedBookings) : INITIAL_DEMO_BOOKINGS);

      const storedFavorites = localStorage.getItem(STORAGE_KEYS.FAVORITES);
      if (storedFavorites) setFavorites(JSON.parse(storedFavorites));

      const storedDesigns = localStorage.getItem(STORAGE_KEYS.SAVED_DESIGNS);
      if (storedDesigns) setSavedDesigns(JSON.parse(storedDesigns));
    } catch (e) {
      console.warn('LocalStorage error or SSR environment:', e);
    }
    setIsInitialized(true);
  }, []);

  // Save changes to localStorage
  const saveToStorage = useCallback((key: string, data: any) => {
    try {
      localStorage.setItem(key, JSON.stringify(data));
    } catch (e) {
      console.warn('Storage save failed:', e);
    }
  }, []);

  // Cart actions
  const addToCart = (product: Product, quantity = 1, customization?: SelectedCustomization) => {
    const unitPrice = product.basePrice + (customization?.addedPrice || 0);
    const cartItemId = `cart-item-${product.id}-${Date.now()}`;
    const newItem: CartItem = {
      id: cartItemId,
      productId: product.id,
      productTitle: product.title,
      productImage: product.images[0] || '',
      artisanId: product.artisanId,
      artisanName: product.artisanName,
      basePrice: product.basePrice,
      customization,
      quantity,
      unitTotalPrice: unitPrice,
    };

    setCart((prev) => {
      const updated = [...prev, newItem];
      saveToStorage(STORAGE_KEYS.CART, updated);
      return updated;
    });
  };

  const updateCartQuantity = (itemId: string, quantity: number) => {
    setCart((prev) => {
      let updated: CartItem[];
      if (quantity <= 0) {
        updated = prev.filter((i) => i.id !== itemId);
      } else {
        updated = prev.map((i) => (i.id === itemId ? { ...i, quantity } : i));
      }
      saveToStorage(STORAGE_KEYS.CART, updated);
      return updated;
    });
  };

  const removeFromCart = (itemId: string) => {
    setCart((prev) => {
      const updated = prev.filter((i) => i.id !== itemId);
      saveToStorage(STORAGE_KEYS.CART, updated);
      return updated;
    });
  };

  const clearCart = () => {
    setCart([]);
    saveToStorage(STORAGE_KEYS.CART, []);
  };

  // Role switching
  const switchRole = (newRole: Role) => {
    setRole(newRole);
    saveToStorage(STORAGE_KEYS.ROLE, newRole);
  };

  const selectActiveArtisan = (artisanId: string) => {
    setActiveArtisanId(artisanId);
    saveToStorage(STORAGE_KEYS.ACTIVE_ARTISAN, artisanId);
  };

  // Order creation
  const createOrder = (orderData: Omit<Order, 'id' | 'orderNumber' | 'timeline' | 'status' | 'createdAt'>): Order => {
    const orderId = `ord-sph-${Date.now().toString().slice(-6)}`;
    const orderNumber = `SPH-2026-${Math.floor(10000 + Math.random() * 90000)}`;
    const now = new Date().toISOString();

    const newOrder: Order = {
      ...orderData,
      id: orderId,
      orderNumber,
      status: 'Order Placed',
      timeline: [
        { status: 'Order Placed', timestamp: now, note: 'Order registered via SphereO checkout simulation', completed: true },
        { status: 'Awaiting Artisan Confirmation', timestamp: '', note: 'Artisan notified to review schedule & material availability', completed: false },
        { status: 'Materials Prepared', timestamp: '', note: 'Natural pigments and raw materials prepared in workshop', completed: false },
        { status: 'Crafting in Progress', timestamp: '', note: 'Handcrafting underway', completed: false },
        { status: 'Quality Check', timestamp: '', note: 'Inspected for authentic standards', completed: false },
        { status: 'Ready to Ship', timestamp: '', note: 'Carefully packaged with artisan certificate', completed: false },
        { status: 'Shipped', timestamp: '', note: 'In transit', completed: false },
        { status: 'Delivered', timestamp: '', note: 'Delivered to patron', completed: false },
      ],
      createdAt: now,
    };

    setOrders((prev) => {
      const updated = [newOrder, ...prev];
      saveToStorage(STORAGE_KEYS.ORDERS, updated);
      return updated;
    });

    clearCart();
    return newOrder;
  };

  // Update order status (for artisan & admin dashboards)
  const updateOrderStatus = (orderId: string, newStatus: any, note?: string) => {
    setOrders((prev) => {
      const updated = prev.map((ord) => {
        if (ord.id !== orderId) return ord;
        const now = new Date().toISOString();
        const updatedTimeline = ord.timeline.map((ev) => {
          if (ev.status === newStatus) {
            return { ...ev, completed: true, timestamp: now, note: note || ev.note };
          }
          return ev;
        });
        return { ...ord, status: newStatus, timeline: updatedTimeline };
      });
      saveToStorage(STORAGE_KEYS.ORDERS, updated);
      return updated;
    });
  };

  // Design proposal management
  const addProposal = (proposal: DesignProposal) => {
    setProposals((prev) => {
      const updated = [proposal, ...prev];
      saveToStorage(STORAGE_KEYS.PROPOSALS, updated);
      return updated;
    });
  };

  const updateProposalStatus = (
    proposalId: string,
    status: any,
    notes?: string,
    alternatives?: string[]
  ) => {
    setProposals((prev) => {
      const updated = prev.map((p) => {
        if (p.id !== proposalId) return p;
        return {
          ...p,
          status,
          artisanReviewNotes: notes || p.artisanReviewNotes,
          suggestedAlternatives: alternatives || p.suggestedAlternatives,
          updatedAt: new Date().toISOString(),
        };
      });
      saveToStorage(STORAGE_KEYS.PROPOSALS, updated);
      return updated;
    });
  };

  // Bookings with slot conflict prevention!
  const createBooking = (
    customerId: string,
    customerName: string,
    artisanId: string,
    date: string,
    timeSlot: string,
    topic: string,
    brief: string
  ): { success: boolean; booking?: Booking; error?: string } => {
    // Check if slot is already booked for this artisan on this date
    const hasConflict = bookings.some(
      (b) => b.artisanId === artisanId && b.date === date && b.timeSlot === timeSlot && b.status !== 'Cancelled'
    );

    if (hasConflict) {
      return {
        success: false,
        error: `Slot conflict: This artisan is already booked for ${timeSlot} on ${date}. Please select an alternative time slot.`,
      };
    }

    const artisan = ARTISANS.find((a) => a.id === artisanId);
    const bookingId = `book-sph-${Date.now().toString().slice(-6)}`;
    const newBooking: Booking = {
      id: bookingId,
      customerId,
      customerName,
      artisanId,
      artisanName: artisan?.name || 'Artisan Master',
      craftName: artisan?.craftName || 'Heritage Craft',
      date,
      timeSlot,
      timezone: 'Asia/Kolkata (IST)',
      topic,
      brief,
      status: 'Confirmed',
      createdAt: new Date().toISOString(),
      meetingLink: `/consultation/${bookingId}`,
    };

    setBookings((prev) => {
      const updated = [newBooking, ...prev];
      saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
      return updated;
    });

    return { success: true, booking: newBooking };
  };

  const cancelBooking = (bookingId: string) => {
    setBookings((prev) => {
      const updated = prev.map((b) => (b.id === bookingId ? { ...b, status: 'Cancelled' as const } : b));
      saveToStorage(STORAGE_KEYS.BOOKINGS, updated);
      return updated;
    });
  };

  // Favorites
  const toggleFavorite = (productId: string) => {
    setFavorites((prev) => {
      const exists = prev.includes(productId);
      const updated = exists ? prev.filter((id) => id !== productId) : [...prev, productId];
      saveToStorage(STORAGE_KEYS.FAVORITES, updated);
      return updated;
    });
  };

  // Saved Custom Designs
  const saveCustomDesign = (
    productId: string,
    customization: SelectedCustomization
  ) => {
    const product = PRODUCTS.find((p) => p.id === productId);
    if (!product) return;

    const newDesign = {
      id: `saved-des-${Date.now()}`,
      productId,
      title: product.title,
      image: product.images[0] || '',
      customization,
      price: product.basePrice + customization.addedPrice,
      savedAt: new Date().toISOString(),
    };

    setSavedDesigns((prev) => {
      const updated = [newDesign, ...prev];
      saveToStorage(STORAGE_KEYS.SAVED_DESIGNS, updated);
      return updated;
    });
  };

  // Reset Demo Data
  const resetDemoData = () => {
    localStorage.clear();
    setCart([]);
    setRole('customer');
    setActiveArtisanId('artisan-ramesh-chandra');
    setOrders(INITIAL_DEMO_ORDERS);
    setProposals(INITIAL_DEMO_PROPOSALS);
    setBookings(INITIAL_DEMO_BOOKINGS);
    setFavorites(['prod-indigo-lac-bangles', 'prod-blue-courtyard-vase']);
    setSavedDesigns([]);
    alert('SphereO demo state has been reset to factory seeded demo data.');
  };

  return {
    isInitialized,
    cart,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    role,
    switchRole,
    activeArtisanId,
    selectActiveArtisan,
    orders,
    createOrder,
    updateOrderStatus,
    proposals,
    addProposal,
    updateProposalStatus,
    bookings,
    createBooking,
    cancelBooking,
    favorites,
    toggleFavorite,
    savedDesigns,
    saveCustomDesign,
    resetDemoData,
  };
}

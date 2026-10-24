import { Product } from '../lib/types';
import { ARTISANS } from './artisans';
import { CRAFTS } from './crafts';

// Curated high-fidelity craft imagery collections
const CRAFT_IMAGE_BANKS: Record<string, string[]> = {
  'craft-lac-bangles': [
    'https://images.unsplash.com/photo-1611591475879-1f4803975073?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1602751584552-8ba73aad10e1?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-blue-pottery': [
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1612196808214-b8e1d6145a8c?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-pottery-ceramics': [
    'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-handloom-textiles': [
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-embroidery': [
    'https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-woodcraft': [
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1538688525198-9b88f6f53126?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-metalwork-dhokra': [
    'https://images.unsplash.com/photo-1534447677768-be436bb09401?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-block-printing': [
    'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1606760227091-3dd870d97f1d?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-handwoven-baskets': [
    'https://images.unsplash.com/photo-1590736969955-71cc94801759?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1615529182904-14819c35db37?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-leathercraft': [
    'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-jewelry': [
    'https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1611591475879-1f4803975073?auto=format&fit=crop&w=800&q=80',
  ],
  'craft-paper-paintings': [
    'https://images.unsplash.com/photo-1579783902614-a3fb3927b675?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
  ],
};

// Curated flagship headline items
const FLAGSHIP_ITEMS: Partial<Product>[] = [
  {
    id: 'prod-indigo-lac-bangles',
    slug: 'indigo-garden-lac-bangle-set',
    title: 'Indigo Garden Heritage Lac Bangle Set',
    shortDescription: 'Charcoal-shaped natural lac set in deep indigo with delicate embedded brass floral motifs.',
    description: 'Masterfully crafted over open charcoal hearths in Jaipur, this bridal and festive set captures the star-lit Rajasthan night sky. Hand-tinted with crushed mineral indigo and finished with antique brass micro-beads.',
    craftId: 'craft-lac-bangles',
    craftName: 'Lacquer & Lac Bangles',
    artisanId: 'artisan-ramesh-chandra',
    artisanName: 'Ramesh Chandra Soni',
    basePrice: 3850,
    compareAtPrice: 4600,
    inventory: 14,
    isCustomizable: true,
    isReadyToShip: false,
    leadTimeDays: 10,
    materials: ['Natural Lac Resin', 'Pure Brass Granules', 'Mineral Indigo'],
    colors: ['Deep Indigo', 'Antique Gold', 'Forest Emerald'],
    dimensions: 'Set of 4 Bangles | Size 2.4 / 2.6 / 2.8',
    weight: '180g',
    careInstructions: 'Keep away from direct high heat or solvents. Store in a soft cotton pouch.',
    tags: ['bangles', 'lac', 'jewelry', 'wedding', 'rajasthan', 'handmade'],
    rating: 4.98,
    reviewCount: 38,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-lac-bangles'],
    customizationOptions: {
      colors: [
        { name: 'Deep Indigo', hex: '#2B3E51', priceAdd: 0, inStock: true },
        { name: 'Royal Crimson', hex: '#8B1E27', priceAdd: 300, inStock: true },
        { name: 'Forest Green', hex: '#2D4B39', priceAdd: 200, inStock: true },
        { name: 'Antique Ochre', hex: '#B69A63', priceAdd: 150, inStock: true },
      ],
      materials: [
        { name: 'Natural Lac + Micro Brass Beads', priceAdd: 0, inStock: true },
        { name: 'Natural Lac + Swarovski Glass Crystals', priceAdd: 850, inStock: true },
      ],
      sizes: [
        { name: 'Size 2.4 (Small - 2.25 inch inner dia)', dimensions: '57mm diameter', priceAdd: 0 },
        { name: 'Size 2.6 (Medium - 2.37 inch inner dia)', dimensions: '60mm diameter', priceAdd: 0 },
        { name: 'Size 2.8 (Large - 2.5 inch inner dia)', dimensions: '63.5mm diameter', priceAdd: 200 },
      ],
      finishes: [
        { name: 'Lustre Polished', priceAdd: 0 },
        { name: 'Matte Earth Finish', priceAdd: 150 },
      ],
      allowsEngraving: true,
      engravingMaxChars: 16,
      engravingPrice: 350,
    },
  },
  {
    id: 'prod-blue-courtyard-vase',
    slug: 'blue-courtyard-ceramic-vase',
    title: 'Blue Courtyard Floral Ceramic Vase',
    shortDescription: 'Clay-free quartz pottery hand-painted in Persian cobalt and turquoise botanical vine scrolls.',
    description: 'Reviving royal Sawai Ram Singh court aesthetics, this clay-free quartz vase is individually thrown, sun-dried, and painted using natural mineral oxides. Fired once at 850°C to achieve a luminous vitreous lustre.',
    craftId: 'craft-blue-pottery',
    craftName: 'Jaipur Blue Pottery',
    artisanId: 'artisan-leela-devi',
    artisanName: 'Leela Devi Kumawat',
    basePrice: 4200,
    compareAtPrice: 4900,
    inventory: 8,
    isCustomizable: true,
    isReadyToShip: true,
    leadTimeDays: 14,
    materials: ['Crushed Quartz Stone', 'Katira Gond Gum', 'Cobalt Oxide', 'Glass Cullet'],
    colors: ['Cobalt Blue', 'Turquoise', 'Ivory White'],
    dimensions: '11" Height x 6" Base Diameter',
    weight: '1.2 kg',
    careInstructions: 'Wipe clean with a damp microfiber cloth. Not suitable for microwave heating.',
    tags: ['pottery', 'vase', 'home decor', 'blue pottery', 'ceramics', 'jaipur'],
    rating: 4.95,
    reviewCount: 42,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-blue-pottery'],
    customizationOptions: {
      colors: [
        { name: 'Cobalt & Persian Turquoise', hex: '#1E4B6E', priceAdd: 0, inStock: true },
        { name: 'Mustard Gold & Ochre', hex: '#C49A45', priceAdd: 400, inStock: true },
        { name: 'Sage Green & Celadon', hex: '#68826D', priceAdd: 400, inStock: true },
      ],
      sizes: [
        { name: 'Classic Studio (9" Height)', dimensions: '9" x 5"', priceAdd: -400 },
        { name: 'Grand Urn (11" Height)', dimensions: '11" x 6"', priceAdd: 0 },
        { name: 'Statement Floor Vase (16" Height)', dimensions: '16" x 8.5"', priceAdd: 1800 },
      ],
      patterns: [
        { name: 'Jaipur Mughal Poppy Scroll', priceAdd: 0 },
        { name: 'Geometric Chevron Lattice', priceAdd: 350 },
      ],
      finishes: [
        { name: 'High-Gloss Vitreous Glaze', priceAdd: 0 },
        { name: 'Semi-Matte Bisque', priceAdd: 250 },
      ],
    },
  },
  {
    id: 'prod-terracotta-dawn-planter',
    slug: 'terracotta-dawn-fluted-planter',
    title: 'Terracotta Dawn Hand-Fluted Planter',
    shortDescription: 'River alluvial clay planter footwheel-thrown and pebble-burnished with red ochre slip.',
    description: 'Pebble-burnished by hand before open-firing in an earthen pit kiln. Its natural microporosity allows roots to breathe and naturally regulates soil humidity for healthier botanicals.',
    craftId: 'craft-pottery-ceramics',
    craftName: 'Terracotta & Studio Ceramics',
    artisanId: 'artisan-arjun-prajapati',
    artisanName: 'Arjun Prajapati & Sons',
    basePrice: 1850,
    compareAtPrice: 2200,
    inventory: 22,
    isCustomizable: true,
    isReadyToShip: true,
    leadTimeDays: 8,
    materials: ['Riverine Alluvial Clay', 'Natural Ochre Slip'],
    colors: ['Terracotta Rust', 'Smoked Carbon Black'],
    dimensions: '8" Diameter x 7.5" Height',
    weight: '1.4 kg',
    careInstructions: 'Indoor and outdoor use. Wash with plain water without harsh detergents.',
    tags: ['terracotta', 'planter', 'garden', 'clay', 'natural'],
    rating: 4.88,
    reviewCount: 56,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-pottery-ceramics'],
    customizationOptions: {
      colors: [
        { name: 'Natural Earthen Rust', hex: '#B66A4B', priceAdd: 0, inStock: true },
        { name: 'Smoked Carbon Grey', hex: '#3C3D37', priceAdd: 250, inStock: true },
      ],
      sizes: [
        { name: 'Small Herb Pot (6" Dia)', dimensions: '6" x 5.5"', priceAdd: -350 },
        { name: 'Standard Medium (8" Dia)', dimensions: '8" x 7.5"', priceAdd: 0 },
        { name: 'Large Statement (12" Dia)', dimensions: '12" x 11"', priceAdd: 950 },
      ],
      finishes: [
        { name: 'Pebble-Burnished Smooth', priceAdd: 0 },
        { name: 'Hand-Carved Fluted Ribs', priceAdd: 300 },
      ],
      allowsEngraving: true,
      engravingMaxChars: 12,
      engravingPrice: 200,
    },
  },
  {
    id: 'prod-ajrakh-modal-stole',
    slug: 'midnight-loom-ajrakh-stole',
    title: 'Midnight Loom Ajrakh Modal Silk Stole',
    shortDescription: '16-stage hand-block printed stole in fermented indigo, madder root, and iron rust.',
    description: 'Immersed in living indigo vats and stamped with precision hand-carved teakwood blocks. The geometric star motifs (Chaukadi) embody cosmic symmetry and slow craftsmanship.',
    craftId: 'craft-block-printing',
    craftName: 'Hand Block Printing',
    artisanId: 'artisan-mukesh-khatri',
    artisanName: 'Mukesh Ismail Khatri',
    basePrice: 3200,
    compareAtPrice: 3800,
    inventory: 18,
    isCustomizable: true,
    isReadyToShip: true,
    leadTimeDays: 12,
    materials: ['Modal Silk & Desi Cotton Blend', 'Living Indigo', 'Madder Root', 'Alum Mordant'],
    colors: ['Deep Indigo', 'Madder Crimson', 'Charcoal Rust'],
    dimensions: '22" Width x 78" Length',
    weight: '140g',
    careInstructions: 'Dry clean recommended for first two washes; subsequently gentle cold hand wash.',
    tags: ['ajrakh', 'stole', 'silk', 'block print', 'kutch', 'scarf'],
    rating: 4.97,
    reviewCount: 64,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-block-printing'],
    customizationOptions: {
      colors: [
        { name: 'Traditional Indigo & Crimson', hex: '#2B3E51', priceAdd: 0, inStock: true },
        { name: 'Earth Ochre & Charcoal', hex: '#6A5438', priceAdd: 300, inStock: true },
      ],
      finishes: [
        { name: 'Hand-Twisted Fringe Hem', priceAdd: 0 },
        { name: 'Tasselled Zari Edge', priceAdd: 400 },
      ],
    },
  },
  {
    id: 'prod-dhokra-elephant-totem',
    slug: 'bastar-dhokra-elephant-sculpture',
    title: 'Bastar Lost-Wax Dhokra Elephant Totem',
    shortDescription: 'Hand-sculpted beeswax wire casting in bell-metal bronze from ancient Bastar tribal lore.',
    description: 'Carrying auspicious ceremonial bells, this royal elephant sculpture is shaped from beeswax threads around an earthen core before being cast in recycled bell-metal bronze.',
    craftId: 'craft-metalwork-dhokra',
    craftName: 'Dhokra & Brass Metalwork',
    artisanId: 'artisan-sukhranjan-dhokra',
    artisanName: 'Sukhranjan Baghel',
    basePrice: 5600,
    compareAtPrice: 6500,
    inventory: 5,
    isCustomizable: true,
    isReadyToShip: false,
    leadTimeDays: 18,
    materials: ['Bell Metal Bronze', 'Forest Beeswax Core', 'Alluvial Pit Sand'],
    colors: ['Burnished Bronze', 'Raw Golden Brass'],
    dimensions: '7.5" Height x 8.5" Length x 4" Depth',
    weight: '1.8 kg',
    careInstructions: 'Clean with dry cloth. Do not apply abrasive brass polishes to maintain natural tribal patina.',
    tags: ['dhokra', 'metal', 'sculpture', 'bastar', 'tribal', 'brass', 'elephant'],
    rating: 4.96,
    reviewCount: 31,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-metalwork-dhokra'],
    customizationOptions: {
      sizes: [
        { name: 'Desk Miniature (5" Height)', dimensions: '5" x 5"', priceAdd: -1600 },
        { name: 'Heirloom Tabletop (7.5" Height)', dimensions: '7.5" x 8.5"', priceAdd: 0 },
        { name: 'Imperial Temple Guard (12" Height)', dimensions: '12" x 14"', priceAdd: 4200 },
      ],
      finishes: [
        { name: 'Warm Burnished Bronze', priceAdd: 0 },
        { name: 'Verdigris Aged Patina', priceAdd: 500 },
      ],
      allowsEngraving: true,
      engravingMaxChars: 14,
      engravingPrice: 400,
    },
  },
  {
    id: 'prod-channapatna-wooden-stacker',
    slug: 'channapatna-botanical-wooden-stacker',
    title: 'Channapatna Botanical Lacquer Toy Stacker',
    shortDescription: 'Lathe-turned Wrightia tinctoria ivory wood tinted with non-toxic turmeric & indigo lac.',
    description: 'Crafted in the historic toy town of Karnataka. Sanded to a silky luster using talipot palm leaves, this child-safe tactile puzzle honors 200 years of artisan turning traditions.',
    craftId: 'craft-woodcraft',
    craftName: 'Fine Woodcraft & Lacquer Turning',
    artisanId: 'artisan-syed-channapatna',
    artisanName: 'Syed Khaleel Ahmed',
    basePrice: 1450,
    compareAtPrice: 1800,
    inventory: 35,
    isCustomizable: true,
    isReadyToShip: true,
    leadTimeDays: 6,
    materials: ['Wrightia Tinctoria Wood', 'Natural Shellac', 'Turmeric & Kumkum Pigment'],
    colors: ['Solar Yellow', 'Lac Vermilion', 'Emerald Leaf', 'Natural Cream'],
    dimensions: '9" Height x 4.5" Diameter Base',
    weight: '480g',
    careInstructions: 'Wipe with a slightly damp cloth. Never submerge in water.',
    tags: ['toys', 'wood', 'channapatna', 'montessori', 'kids', 'natural'],
    rating: 4.94,
    reviewCount: 78,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-woodcraft'],
    customizationOptions: {
      colors: [
        { name: 'Heritage Jewel Tones', hex: '#B66A4B', priceAdd: 0, inStock: true },
        { name: 'Nordic Pastel Botanicals', hex: '#8A9A86', priceAdd: 250, inStock: true },
      ],
      allowsEngraving: true,
      engravingMaxChars: 20,
      engravingPrice: 200,
    },
  },
  {
    id: 'prod-chikankari-silk-pouch',
    slug: 'kutch-chikankari-embroidered-potli',
    title: 'Lucknowi Chikankari Heirloom Potli Pouch',
    shortDescription: 'Delicate Bakhiya shadow stitch and mukaish gold wire embroidery on mulberry silk.',
    description: 'Stitched by women artisans in Old Lucknow havelis. Finished with braided silk cords, pearl tassels, and delicate metallic badla work.',
    craftId: 'craft-embroidery',
    craftName: 'Heritage Needlework & Embroidery',
    artisanId: 'artisan-shabana-begum',
    artisanName: 'Shabana Begum',
    basePrice: 2400,
    compareAtPrice: 2900,
    inventory: 19,
    isCustomizable: true,
    isReadyToShip: true,
    leadTimeDays: 8,
    materials: ['Mulberry Silk Crepe', 'Cotton Silk Threads', 'Gold Mukaish Wire', 'Cultured Pearls'],
    colors: ['Ivory Pearl', 'Dusty Rose', 'Midnight Emerald'],
    dimensions: '8.5" Height x 6.5" Width',
    weight: '120g',
    careInstructions: 'Dry clean only to protect hand-stitched mirror work and embroidery.',
    tags: ['potli', 'embroidery', 'chikankari', 'wedding', 'pouch', 'silk'],
    rating: 4.96,
    reviewCount: 52,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-embroidery'],
    customizationOptions: {
      colors: [
        { name: 'Ivory Pearl', hex: '#F7F4ED', priceAdd: 0, inStock: true },
        { name: 'Dusty Rose', hex: '#C47D61', priceAdd: 200, inStock: true },
        { name: 'Midnight Noir', hex: '#252720', priceAdd: 200, inStock: true },
      ],
      finishes: [
        { name: 'Pearl Beaded Handle', priceAdd: 0 },
        { name: 'Braided Zari Cord Handle', priceAdd: 250 },
      ],
      allowsEngraving: true,
      engravingMaxChars: 3,
      engravingPrice: 300,
    },
  },
  {
    id: 'prod-kadwa-silk-saree',
    slug: 'varanasi-kadwa-katan-silk-saree',
    title: 'Varanasi Kadwa Handwoven Katan Silk Saree',
    shortDescription: 'Pure mulberry silk saree with hand-engraved floating gold zari shikargah motifs.',
    description: 'Weaving each kadwa motif requires the artisan to lift individual warp yarns with bamboo needles, ensuring zero loose float threads on the reverse side. An enduring heirloom for generations.',
    craftId: 'craft-handloom-textiles',
    craftName: 'Handloom & Heritage Weaves',
    artisanId: 'artisan-suresh-ansari',
    artisanName: 'Tariq & Suresh Ansari',
    basePrice: 28500,
    compareAtPrice: 34000,
    inventory: 4,
    isCustomizable: true,
    isReadyToShip: false,
    leadTimeDays: 28,
    materials: ['Pure Katan Mulberry Silk', 'Tested Gold & Silver Zari'],
    colors: ['Deep Vermilion Red', 'Royal Imperial Cobalt', 'Forest Emerald'],
    dimensions: '6.5 Meters (Includes 1m Unstitched Blouse Piece)',
    weight: '750g',
    careInstructions: 'Strictly dry clean only. Wrap in unbleached muslin cloth away from plastic.',
    tags: ['saree', 'silk', 'varanasi', 'kadwa', 'bridal', 'handloom'],
    rating: 5.0,
    reviewCount: 22,
    featured: true,
    images: CRAFT_IMAGE_BANKS['craft-handloom-textiles'],
    customizationOptions: {
      colors: [
        { name: 'Deep Vermilion Red', hex: '#8B1E27', priceAdd: 0, inStock: true },
        { name: 'Royal Imperial Cobalt', hex: '#1E355B', priceAdd: 1200, inStock: true },
        { name: 'Antique Wine Plum', hex: '#5E2238', priceAdd: 1200, inStock: true },
      ],
      finishes: [
        { name: 'Standard Zari Pallu', priceAdd: 0 },
        { name: 'Full Heavy Kadwa Shikargah Pallu', priceAdd: 4500 },
      ],
    },
  },
];

// Generator for the complete catalog of 300 distinctive items
export function generateCatalog(): Product[] {
  const products: Product[] = [];
  
  // 1. Add our 8 flagship items
  FLAGSHIP_ITEMS.forEach((item) => {
    products.push(item as Product);
  });

  // 2. Generate remaining 292 unique craft products across all 12 categories & 40 artisans
  const craftProductTemplates: Record<string, { titles: string[]; descriptions: string[]; basePrices: number[]; materials: string[][] }> = {
    'craft-lac-bangles': {
      titles: [
        'Celestial Mirrorwork Lac Chooda',
        'Jaipur Royal Meenakari Kada',
        'Starlight Ochre Lac Bangle Set',
        'Ruby Glow Rajasthani Lac Torus',
        'Hand-Painted Floral Lac Trinket Box',
        'Peacock Motif Lacquered Wristlet',
      ],
      descriptions: [
        'Naturally processed lac resin heated over glowing coals and embellished with fine brass studs.',
        'Refined Rajasthani bangle pair featuring mirror glass stones embedded in purified scarlet resin.',
        'Festive jewelry set handcrafted with timeless Maniharon ka Rasta technique.',
      ],
      basePrices: [1400, 2200, 3100, 1850, 4200, 2750],
      materials: [
        ['Natural Lac', 'Brass Filigree', 'Mineral Indigo'],
        ['Kusmi Lac', 'Glass Mirror', 'Kumkum Powder'],
        ['Purified Lac', 'Zari Foil', 'Copper Beading'],
      ],
    },
    'craft-blue-pottery': {
      titles: [
        'Sanganeri Cobalt Floral Platter',
        'Jaipur Turquoise Studio Planter',
        'Sunlit Ochre Blue Pottery Coasters (Set of 6)',
        'Mughal Arch Decorative Ceramic Wall Plate',
        'Lotus Pond Hand-Painted Water Pitcher',
        'Miniature Floral Perfume Bottle',
      ],
      descriptions: [
        'Authentic clay-free quartz pottery hand-painted with cobalt oxide and fired once to glassy perfection.',
        'Luminous quartz dish featuring floral spirals that echo ancient Rajput pavilion ceilings.',
        'A balanced union of crushed glass, quartz powder, and natural gum crafted without a potter wheel.',
      ],
      basePrices: [1600, 2400, 1250, 3800, 4500, 950],
      materials: [
        ['Quartz Powder', 'Cobalt Oxide', 'Glass Cullet'],
        ['Quartz Stone', 'Copper Sulphate Glaze', 'Multani Mitti'],
        ['Katira Gond Gum', 'Mineral Turmeric', 'Quartz'],
      ],
    },
    'craft-pottery-ceramics': {
      titles: [
        'Gorakhpur Fluted Alluvial Pitcher',
        'Smoked Carbon Pebble Bowl',
        'Terracotta Sunburst Wall Diya',
        'Rustic Stoneware Tea Kulhar Set of 4',
        'Hand-Pinched Earthen Oil Carafe',
        'Heritage Alluvial Clay Fermentation Jar',
      ],
      descriptions: [
        'Earthen clay sourced from river basins, footwheel-thrown and wood-kiln fired for organic tactile beauty.',
        'Unglazed porous terracotta celebrated for its ability to breathe and naturally cool liquids.',
        'Hand-burnished with smooth river pebbles and coated with natural iron-rich ochre slip.',
      ],
      basePrices: [850, 1400, 650, 1100, 1800, 2600],
      materials: [
        ['River Alluvial Clay', 'Natural Ochre Slip'],
        ['Red Earthen Mud', 'Rice Husk Carbon'],
        ['Khurja Stoneware Clay', 'Wood Ash Slip'],
      ],
    },
    'craft-handloom-textiles': {
      titles: [
        'Chanderi Gossamer Silk Cotton Dupatta',
        'Maheshwari Geometric Border Stole',
        'Varanasi Butidar Silk Pocket Square',
        'Desi Organic Cotton Handspun Table Runner',
        'Kashmir Pashmina Handwoven Shawl',
        'Pochampally Ikat Handloom Throw',
      ],
      descriptions: [
        'Slow-woven on ancestral pit looms with unbleached yarns and vegetable-dyed accents.',
        'Breathable heritage handloom textile balancing featherweight softness with rich zari motifs.',
        'Rhythmically shuttled by master weavers honoring regional weaving heritage.',
      ],
      basePrices: [2800, 3600, 1200, 1950, 14500, 4800],
      materials: [
        ['Mulberry Silk', 'Desi Cotton', 'Zari'],
        ['Organic Handspun Cotton', 'Natural Dyes'],
        ['Chanderi Silk-Cotton', 'Tested Silver Zari'],
      ],
    },
    'craft-embroidery': {
      titles: [
        'Kutch Ahir Hand-Embroidered Cushion Cover',
        'Chikankari Jaali Muslin Scarf',
        'Rabari Convex Mirror Travel Pouch',
        'Phulkari Geometric Floral Shawl',
        'Zardozi Metallic Thread Wall Panel',
        'Suf Needlework Silk Clutches',
      ],
      descriptions: [
        'Hand-stitched needlework preserving pastoral nomad heritage and centuries-old embroidery vocabularies.',
        'Fine shadow embroidery on sheer fabric requiring hundreds of precise needle passes per motif.',
        'Embellished with authentic convex mirrors that shimmer in candle and sunlight.',
      ],
      basePrices: [1850, 2900, 1400, 4600, 6800, 2200],
      materials: [
        ['Pure Cotton Cambric', 'Silk Floss', 'Convex Mirrors'],
        ['Mulberry Silk', 'Fine Zari Wire'],
        ['Handspun Khadi', 'Vegetable-Dyed Thread'],
      ],
    },
    'craft-woodcraft': {
      titles: [
        'Channapatna Lacquer Peppercorn Grinder',
        'Saharanpur Carved Sheesham Book Stand',
        'Neem Wood Ergonomic Salad Servers',
        'Wrightia Tinctoria Turned Bud Vase',
        'Kinetic Wooden Acrobat Desk Toy',
        'Carved Teakwood Keepsake Chest',
      ],
      descriptions: [
        'Turned on high-speed lathes and friction-polished with organic talipot palm leaves and natural shellac.',
        'Hand-carved from responsibly harvested seasoned timber with smooth edges and natural wood grain.',
        'Finished with food-safe botanical oils and turmeric-kumkum natural dyes.',
      ],
      basePrices: [1200, 2100, 950, 1650, 1100, 4800],
      materials: [
        ['Wrightia Tinctoria Wood', 'Natural Shellac'],
        ['Reclaimed Sheesham', 'Beeswax Polish'],
        ['Neem Wood', 'Cold-Pressed Walnut Oil'],
      ],
    },
    'craft-metalwork-dhokra': {
      titles: [
        'Dhokra Tribal Musician Quintet',
        'Bastar Bronze Sun Wall Medallion',
        'Lost-Wax Cast Brass Oil Lamp',
        'Dhokra Deer & Forest Animal Totem',
        'Hand-Forged Bell Metal Door Pulls',
        'Tribal Village Harvest Sculpture',
      ],
      descriptions: [
        'Ancient cire-perdue non-ferrous bronze casting crafted from pure beeswax filaments.',
        'Individual earthen furnace mold broken after casting, ensuring every finished piece is one-of-a-kind.',
        'Retains the tactile striations of hand-wound wax wire and natural fire patina.',
      ],
      basePrices: [3400, 4800, 2200, 3900, 2700, 8900],
      materials: [
        ['Recycled Bell Metal Bronze', 'Beeswax', 'Pit Clay'],
        ['Solid Brass', 'Natural Patina'],
        ['Bronze Alloy', 'Coal Kiln Melt'],
      ],
    },
    'craft-block-printing': {
      titles: [
        'Bagru Syahi-Begar Dabu Table Cloth',
        'Ajrakhpur Geometric Star Bandana',
        'Sanganeri Jasmine Motif Bedspread',
        'Indigo Dabu Mud-Resist Cotton Kaftan',
        'Teakwood Block Print Journal Notebook',
        'Botanical Madder Dyed Apron',
      ],
      descriptions: [
        'Carved teakwood blocks stamped in rhythm with natural mud-resist paste and fermented indigo.',
        'River-washed pure cotton treated with harda myrobalan and sun-cured over desert riverbanks.',
        'Authentic layered hand-stamping with subtle human alignment nuances that prove handmade origin.',
      ],
      basePrices: [2100, 950, 3800, 2900, 850, 1450],
      materials: [
        ['Handloom Cotton', 'Living Indigo', 'Madder Root'],
        ['Kora Cambric', 'Teak Block Print', 'Alum Mordant'],
        ['Recycled Cotton Paper', 'Pomegranate Rind Dye'],
      ],
    },
    'craft-handwoven-baskets': {
      titles: [
        'Chettinad Kottan Palm Storage Basket',
        'Assam Wild Cane Gathering Tray',
        'Coiled Sabai Grass Planter Basket',
        'Bamboo Hexagonal Fruit Basket',
        'Braided Date Palm Picnic Hamper',
        'Water Hyacinth Structural Magazine Holder',
      ],
      descriptions: [
        'Wild wetland fiber harvested, sun-bleached, and hand-coiled into lightweight utilitarian vessels.',
        'Woven using pliable cane splints by indigenous artisan collectives in the northeastern valleys.',
        '100% biodegradable and sturdy, offering tactile organic warmth to any living space.',
      ],
      basePrices: [1100, 1650, 950, 1350, 2400, 1850],
      materials: [
        ['Wild Palm Fronds', 'Natural Vegetable Dye'],
        ['Assam Cane', 'Bamboo Splints'],
        ['Sabai Grass', 'Raw Jute Cord'],
      ],
    },
    'craft-leathercraft': {
      titles: [
        'Hand-Braided Kolhapuri T-Strap Sandals',
        'Vegetable-Tanned Babul Bark Journal',
        'Shantiniketan Embossed Leather Tote',
        'Saddle-Stitched Leather Passport Folio',
        'Hand-Burnished Natural Leather Belt',
        'Punche-Work Vegetable Leather Coin Pouch',
      ],
      descriptions: [
        'Tanned naturally using babul tree bark and plant extracts without toxic chromium salts.',
        'Hand-cut, edge-burnished with beeswax, and stitched using wax-coated cotton cord.',
        'Develops a deep, rich amber patina with regular use and care.',
      ],
      basePrices: [2200, 1750, 4800, 1600, 1950, 850],
      materials: [
        ['Vegetable-Tanned Buff Leather', 'Babul Bark Extract', 'Cotton Thread'],
        ['Full Grain Eco-Leather', 'Beeswax Finish'],
        ['Cruelty-Free Fallen Hide', 'Natural Plant Oil'],
      ],
    },
    'craft-jewelry': {
      titles: [
        'Kundan Uncut Glass Floral Jhumkas',
        'Cuttack Tarakasi Silver Filigree Choker',
        'Meenakari Vitreous Enamel Ring',
        'Handmade 925 Silver Tribal Bangle',
        'Polki & Emerald Seed Bead Necklace',
        'Floral Silver Hair Pin (Juda Pin)',
      ],
      descriptions: [
        'Handcrafted with fine 24k gold foil stone seating and reverse-side enamel miniature artwork.',
        'Spun from hair-thin sterling silver wire coils welded over charcoal flame in Cuttack havelis.',
        'A regal adornment carrying centuries of royal Indian court metalcraft heritage.',
      ],
      basePrices: [3900, 6800, 2400, 4500, 12500, 1800],
      materials: [
        ['925 Sterling Silver', '24k Gold Leaf Foil', 'Vitreous Cloisonné Enamel'],
        ['Fine Silver Wire', 'Natural Seed Pearls'],
        ['Brass Alloy', 'Uncut Polki Stones', 'Green Meenakari'],
      ],
    },
    'craft-paper-paintings': {
      titles: [
        'Raghurajpur Tree of Life Pattachitra Canvas',
        'Madhubani Sun & Fish Folk Painting',
        'Tamarind-Bonded Cloth Bookmark Set of 4',
        'Gond Forest Deer Painting on Hand-Made Paper',
        'Kalamkari Hand-Drawn Wall Scroll',
        'Miniature Palm-Leaf Engraved Etching',
      ],
      descriptions: [
        'Canvas constructed from layered cotton bonded with tamarind seed glue and conch shell powder.',
        'Hand-painted with brushes made from animal whiskers and bamboo needles using stone pigments.',
        'Depicting sacred forest harmonies and folk mythology in meticulous rhythmic linework.',
      ],
      basePrices: [3200, 2600, 650, 3900, 4800, 1950],
      materials: [
        ['Cotton Cloth', 'Tamarind Seed Glue', 'Conch Shell Powder', 'Stone Pigments'],
        ['Handmade Recycled Rag Paper', 'Natural Mineral Dyes'],
        ['Cured Palm Leaf', 'Iron Stylus Inscription', 'Lamp Black'],
      ],
    },
  };

  let count = products.length;
  const targetTotal = 300;

  // Distribute products evenly across the 12 craft categories
  while (count < targetTotal) {
    const craft = CRAFTS[count % CRAFTS.length];
    const matchingArtisans = ARTISANS.filter((a) => a.craftId === craft.id);
    const artisan = matchingArtisans.length > 0 
      ? matchingArtisans[count % matchingArtisans.length] 
      : ARTISANS[count % ARTISANS.length];

    const templateData = craftProductTemplates[craft.id] || craftProductTemplates['craft-pottery-ceramics'];
    const titleTemplate = templateData.titles[count % templateData.titles.length];
    const descTemplate = templateData.descriptions[count % templateData.descriptions.length];
    const basePrice = templateData.basePrices[count % templateData.basePrices.length] + ((count * 35) % 800);
    const materials = templateData.materials[count % templateData.materials.length];

    const imagePool = CRAFT_IMAGE_BANKS[craft.id] || CRAFT_IMAGE_BANKS['craft-pottery-ceramics'];
    const primaryImg = imagePool[count % imagePool.length];
    const secondaryImg = imagePool[(count + 1) % imagePool.length];

    const productNumber = count + 1;
    const title = `${titleTemplate} No. ${productNumber}`;
    const slug = `${craft.slug}-${count + 1}-${titleTemplate.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')}`;

    const isCustomizable = (count % 3 !== 0); // 66% of items are customizable
    const isReadyToShip = (count % 2 === 0);

    const product: Product = {
      id: `prod-${craft.id}-${count + 1}`,
      slug,
      title,
      shortDescription: descTemplate,
      description: `${descTemplate} Made by ${artisan.name} in ${artisan.region} using traditional techniques passed down through generations. Each piece reflects slight natural variations that honor its handmade authenticity.`,
      craftId: craft.id,
      craftName: craft.name,
      artisanId: artisan.id,
      artisanName: artisan.name,
      basePrice,
      compareAtPrice: count % 4 === 0 ? Math.round(basePrice * 1.2) : undefined,
      images: [primaryImg, secondaryImg],
      inventory: (count % 15) + 3,
      isCustomizable,
      isReadyToShip,
      leadTimeDays: isReadyToShip ? 3 : artisan.capabilities.minLeadTimeDays,
      materials,
      colors: artisan.capabilities.colors.slice(0, 3),
      dimensions: `${8 + (count % 10)}" x ${5 + (count % 6)}"`,
      weight: `${150 + (count * 20) % 900}g`,
      careInstructions: 'Handle with mindful care. Keep away from harsh industrial detergents.',
      tags: [craft.slug, 'handmade', 'artisan', 'india', 'craft'],
      rating: +(4.8 + ((count % 20) * 0.01)).toFixed(2),
      reviewCount: 12 + (count % 45),
      featured: count < 18,
      customizationOptions: isCustomizable ? {
        colors: artisan.capabilities.colors.map((c, i) => ({
          name: c,
          hex: ['#2B3E51', '#B66A4B', '#8A9A86', '#B69A63', '#252720'][i % 5],
          priceAdd: i === 0 ? 0 : 250,
          inStock: true,
        })),
        sizes: [
          { name: 'Standard Edition', dimensions: 'Standard', priceAdd: 0 },
          { name: 'Custom Studio Dimensions', dimensions: 'Tailored', priceAdd: 450 },
        ],
        finishes: artisan.capabilities.finishes.map((f, i) => ({
          name: f,
          priceAdd: i === 0 ? 0 : 200,
        })),
        allowsEngraving: artisan.capabilities.customizationRules.allowsEngraving,
        engravingMaxChars: 16,
        engravingPrice: 250,
      } : undefined,
    };

    products.push(product);
    count++;
  }

  return products;
}

export const PRODUCTS: Product[] = generateCatalog();

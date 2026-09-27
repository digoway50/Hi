import { Product } from '../types/garments';
import hoodieImg from '../assets/images/product_heavyweight_hoodie_1790497338187.jpg';
import teeImg from '../assets/images/product_relaxed_tee_1790497353770.jpg';
import cargoImg from '../assets/images/product_tailored_cargo_1790497370584.jpg';
import overshirtImg from '../assets/images/product_wool_overshirt_1790497386025.jpg';

export const PRODUCTS: Product[] = [
  {
    id: 'flx-01',
    name: 'Heavyweight Boxy Fleece Hoodie',
    tagline: '500 GSM Brushed Organic Cotton Fleece',
    category: 'hoodies',
    price: 88,
    originalPrice: 110,
    image: hoodieImg,
    description: 'An architectural staple engineered with custom-milled 500 GSM loopback cotton fleece. Features dropped shoulders, a double-layered structured hood with no drawstrings for a modern minimal look, and dense ribbed trims.',
    fabric: '100% Combed Organic Cotton Fleece',
    weight: '500 GSM Heavyweight',
    fit: 'Boxy, Dropped Shoulder',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Washed Charcoal', hex: '#262626', inStock: true },
      { name: 'Bone White', hex: '#EAE6DF', inStock: true },
      { name: 'Deep Sage', hex: '#4A554A', inStock: true }
    ],
    inStock: true,
    badge: 'Signature Staple',
    rating: 4.9,
    reviewsCount: 148,
    features: [
      'Preshrunk fabric with zero shrinkage wash guarantee',
      'Double-stitched kangaroo pocket with reinforced bartacks',
      'Seamless 2x2 ribbing at cuff and hem',
      'Double-ply clean silhouette hood'
    ]
  },
  {
    id: 'flx-02',
    name: 'Relaxed Combed Crewneck Tee',
    tagline: '280 GSM Heavyweight Jersey',
    category: 'tees',
    price: 42,
    image: teeImg,
    description: 'The definitive daily t-shirt. Cut from substantial 280 GSM long-staple combed cotton with a thick 1-inch bound collar that maintains its shape wash after wash. Smooth, dense drape with a relaxed torso.',
    fabric: '100% Long-Staple Combed Cotton',
    weight: '280 GSM Heavyweight Jersey',
    fit: 'Relaxed Casual Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Chalk Ivory', hex: '#F4F2EC', inStock: true },
      { name: 'Pitch Black', hex: '#111111', inStock: true },
      { name: 'Dusty Heather', hex: '#9E9E9C', inStock: true }
    ],
    inStock: true,
    badge: 'Bestseller',
    rating: 4.8,
    reviewsCount: 220,
    features: [
      '1.1-inch reinforced ribbed collar retains structure',
      'Enzyme washed for unmatched skin softness',
      'Blind stitched hems for a refined minimalist finish',
      'Oeko-Tex certified non-toxic dyes'
    ]
  },
  {
    id: 'flx-03',
    name: 'Tailored Pleated Cargo Trousers',
    tagline: 'High-Density Cotton Twill with Stretch',
    category: 'bottoms',
    price: 95,
    originalPrice: 120,
    image: cargoImg,
    description: 'A crossover between sartorial tailoring and modern utilitarian utility. Cut with single front pleats, discrete low-profile cargo pockets with hidden snap closures, and an adjustable internal drawstring waistband.',
    fabric: '97% Compact Cotton Twill, 3% Elastane',
    weight: '340 GSM Structured Twill',
    fit: 'Relaxed Straight Leg',
    sizes: ['S (30)', 'M (32)', 'L (34)', 'XL (36)'],
    colors: [
      { name: 'Matte Olive', hex: '#485344', inStock: true },
      { name: 'Obsidian Black', hex: '#1C1C1E', inStock: true },
      { name: 'Desert Sand', hex: '#D2C8B8', inStock: true }
    ],
    inStock: true,
    badge: 'Editor Pick',
    rating: 4.9,
    reviewsCount: 84,
    features: [
      'Integrated internal comfort drawstring at waistband',
      'Low-profile origami cargo pockets with flush lines',
      'Reinforced crotch gusset for unrestricted movement',
      'YKK metal zip fly and horn button closure'
    ]
  },
  {
    id: 'flx-04',
    name: 'Brushed Wool Blend Overshirt',
    tagline: '420 GSM Melton Wool Structure',
    category: 'outerwear',
    price: 135,
    originalPrice: 165,
    image: overshirtImg,
    description: 'Designed as a transitional jacket or heavy layering overshirt. Crafted from insulating brushed wool blend with twin chest patch pockets, custom-engraved horn buttons, and a clean point collar.',
    fabric: '70% Recycled Wool, 30% Polyamide',
    weight: '420 GSM Melton Wool',
    fit: 'Oversized Boxy Cut for Layering',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Espresso Brown', hex: '#3B2F2F', inStock: true },
      { name: 'Charcoal Melange', hex: '#333333', inStock: true },
      { name: 'Camel Tan', hex: '#B89B72', inStock: true }
    ],
    inStock: true,
    badge: 'Limited Run',
    rating: 5.0,
    reviewsCount: 62,
    features: [
      'Naturally water-repellent and thermal-insulating melton wool',
      'Satin-lined sleeves for effortless on-and-off layering',
      'Dual chest flap pockets with concealed snaps',
      'Curved shirt-tail hem with side gussets'
    ]
  },
  {
    id: 'flx-05',
    name: 'Zip-Up Heavyweight Thermal Fleece',
    tagline: '480 GSM Double-Faced Cotton Fleece',
    category: 'hoodies',
    price: 98,
    image: hoodieImg,
    description: 'A full-zip rendition of our iconic fleece. Equipped with a two-way matte black YKK zipper allowing versatile silhouette styling, dropped shoulders, and ribbed storm cuffs.',
    fabric: '100% Combed Cotton Heavyweight Fleece',
    weight: '480 GSM',
    fit: 'Relaxed Silhouette',
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    colors: [
      { name: 'Washed Charcoal', hex: '#262626', inStock: true },
      { name: 'Obsidian Black', hex: '#111111', inStock: true }
    ],
    inStock: true,
    badge: 'New Arrival',
    rating: 4.8,
    reviewsCount: 47,
    features: [
      'Two-way matte black metal zipper',
      'Split pouch pockets with concealed interior phone slot',
      'Heavyweight 2x2 ribbed side panel inserts for ergonomic fit',
      'Zero synthetic blend interior for breathable warmth'
    ]
  },
  {
    id: 'flx-06',
    name: 'Washed Minimalist Mockneck Long Sleeve',
    tagline: '310 GSM Interlock Knit',
    category: 'tees',
    price: 54,
    image: teeImg,
    description: 'Elevated base-layer featuring a comfortable 1.5-inch micro-rib mockneck collar. Dense interlock knit holds structure and creates a streamlined, architectural frame under jackets or solo.',
    fabric: '100% Pima Cotton Interlock',
    weight: '310 GSM Interlock',
    fit: 'Standard Architectural Fit',
    sizes: ['S', 'M', 'L', 'XL'],
    colors: [
      { name: 'Chalk Ivory', hex: '#F4F2EC', inStock: true },
      { name: 'Pitch Black', hex: '#111111', inStock: true }
    ],
    inStock: true,
    badge: 'Essential',
    rating: 4.7,
    reviewsCount: 93,
    features: [
      'Ergonomic micro mockneck collar that never sags',
      'Pre-washed and garment-dyed for vintage drape',
      'Clean finished cuffs with subtle thumb-notch detail',
      'Side seam split vent at hem'
    ]
  }
];

export const CATEGORIES = [
  { id: 'all', label: 'All Garments', count: 6 },
  { id: 'hoodies', label: 'Hoodies & Fleece', count: 2 },
  { id: 'tees', label: 'T-Shirts & Tops', count: 2 },
  { id: 'bottoms', label: 'Pants & Cargos', count: 1 },
  { id: 'outerwear', label: 'Outerwear', count: 1 }
] as const;

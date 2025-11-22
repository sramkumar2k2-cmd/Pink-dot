export type ProductCategory =
  | 'all'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'rings'
  | 'best-sellers'
  | 'new-arrivals'
  | 'sale';

export type ProductImage = {
  src: string;
  alt: string;
};

export type ProductSpec = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  description: string;
  story?: string;
  price: string;
  originalPrice?: string;
  salePrice?: string;
  tag?: string;
  badge?: string;
  gradient?: string;
  accent?: string;
  secondaryAccent?: string;
  image: string;
  images: ProductImage[];
  specs?: ProductSpec[];
  highlights?: string[];
  categories: ProductCategory[];
  related?: string[];
  rating?: number; // Rating from 0 to 5 (e.g., 4.5, 4.0, 5.0)
  reviewCount?: number; // Number of reviews
};

const products: Product[] = [
  {
    slug: 'aurora-lariat',
    name: 'Aurora Lariat',
    description: 'Hand-polished teardrop quartz with micro pavé clasp detail.',
    story:
      'Designed to layer effortlessly, the Aurora Lariat features a duo-length chain finished with a halo clasp so the light dances along every curve.',
    price: '₹16,800',
    originalPrice: '₹21,000',
    salePrice: '₹16,800',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #ffe3ec 0%, #f9d4ff 45%, #ffe0f2 100%)',
    accent: '18k blush vermeil',
    secondaryAccent: 'Rose Quartz',
    image: '/images/neck1.jpeg',
    images: [
      { src: '/images/neck1.jpeg', alt: 'Aurora Lariat necklace front view' },
      { src: '/images/neck2.jpeg', alt: 'Aurora Lariat clasp detail' },
      { src: '/images/neck3.jpeg', alt: 'Aurora Lariat layered with other necklaces' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Rose Quartz' },
      { label: 'Metal', value: '18k blush vermeil' },
    ],
    highlights: [
      'Adjustable duo-length silhouette',
      'Complimentary clasp engraving',
      'Ships within 24 hours',
    ],
    categories: ['all', 'necklaces', 'best-sellers'],
    rating: 4.7,
    reviewCount: 128,
  },
  {
    slug: 'solstice-choker',
    name: 'Solstice Choker',
    description: 'Layer-friendly satin-finished links with removable charm.',
    story:
      'A satin-finished choker designed for every neckline, featuring a detachable charm so you can shift from day to soirée with ease.',
    price: '₹14,200',
    originalPrice: '₹18,500',
    salePrice: '₹14,200',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #fff4d7 0%, #ffddaf 50%, #ffe8c6 100%)',
    accent: 'Mixed Metal',
    secondaryAccent: 'Citrine',
    image: '/images/neck2.jpeg',
    images: [
      { src: '/images/neck2.jpeg', alt: 'Solstice Choker styled on bust' },
      { src: '/images/neck3.jpeg', alt: 'Solstice Choker removable charm detail' },
      { src: '/images/neck4.jpeg', alt: 'Solstice Choker layered with pendants' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Citrine' },
      { label: 'Metal', value: 'Mixed metal links' },
    ],
    highlights: [
      'Convertible charm styling',
      'Satin-finished links for soft glow',
      'Adjustable extender included',
    ],
    categories: ['all', 'necklaces'],
    rating: 4.3,
    reviewCount: 89,
  },
  {
    slug: 'elysian-pendant',
    name: 'Elysian Pendant',
    description: 'Hand-cut mother-of-pearl framed with bead-set topaz halo.',
    price: '₹15,600',
    originalPrice: '₹19,500',
    salePrice: '₹15,600',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #e8f4ff 0%, #d9e9ff 45%, #eef6ff 100%)',
    accent: 'Mother-of-Pearl',
    secondaryAccent: 'Sterling Silver',
    image: '/images/neck4.jpeg',
    images: [
      { src: '/images/neck4.jpeg', alt: 'Elysian Pendant on linen backdrop' },
      { src: '/images/neck5.jpeg', alt: 'Elysian Pendant halo close-up' },
      { src: '/images/neck6.jpeg', alt: 'Elysian Pendant worn with layered necklaces' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Mother-of-Pearl' },
      { label: 'Metal', value: 'Sterling silver' },
    ],
    highlights: [
      'Hand-cut pearlescent centre',
      'Halo of bead-set white topaz',
      'Comes with 16-18" adjustable chain',
    ],
    categories: ['all', 'necklaces'],
    rating: 4.8,
    reviewCount: 156,
  },
  {
    slug: 'serein-station',
    name: 'Serein Station',
    description: 'Floating freshwater pearls spaced along a whisper chain.',
    price: '₹13,200',
    originalPrice: '₹17,600',
    salePrice: '₹13,200',
    tag: "Editor's pick",
    gradient: 'linear-gradient(135deg, #f1f5ff 0%, #ebe6ff 45%, #f7f1ff 100%)',
    accent: 'Freshwater Pearl',
    secondaryAccent: '18k blush vermeil',
    image: '/images/neck5.jpeg',
    images: [
      { src: '/images/neck5.jpeg', alt: 'Serein Station necklace graceful drape' },
      { src: '/images/neck4.jpeg', alt: 'Serein Station pearl spacing detail' },
      { src: '/images/neck2.jpeg', alt: 'Serein Station layered with choker' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Freshwater pearls' },
      { label: 'Metal', value: '18k blush vermeil' },
    ],
    highlights: [
      'Hand-selected pearls for uniform luminescence',
      'Ultra-light whisper chain',
      'Finished with secure lobster clasp',
    ],
    categories: ['all', 'necklaces'],
    rating: 4.9,
    reviewCount: 203,
  },
  {
    slug: 'nova-charm-set',
    name: 'Nova Charm Set',
    description: 'Interchangeable charms for custom layering stories.',
    price: '₹19,800',
    originalPrice: '₹26,400',
    salePrice: '₹19,800',
    tag: 'Bundle',
    gradient: 'linear-gradient(135deg, #ffe9f3 0%, #fce3ff 45%, #fdf0ff 100%)',
    accent: 'Mixed Gemstones',
    secondaryAccent: 'Mixed Metal',
    image: '/images/neck6.jpeg',
    images: [
      { src: '/images/neck6.jpeg', alt: 'Nova Charm Set charms laid out' },
      { src: '/images/neck3.jpeg', alt: 'Nova Charm Set styled on chain' },
      { src: '/images/neck1.jpeg', alt: 'Nova Charm Set detail close-up' },
    ],
    specs: [
      { label: 'Gemstones', value: 'Mixed gemstones' },
      { label: 'Metal', value: 'Mixed metal finishes' },
    ],
    highlights: [
      'Five interchangeable charms',
      'Includes signature keeper clasp',
      'Packaged with layering guide',
    ],
    categories: ['all', 'necklaces'],
    rating: 4.2,
    reviewCount: 67,
  },
  {
    slug: 'elysian-pendant',
    name: 'Elysian Pendant',
    description: 'Hand-cut mother-of-pearl framed with bead-set topaz halo.',
    price: '₹15,600',
    originalPrice: '₹19,500',
    salePrice: '₹15,600',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #e8f4ff 0%, #d9e9ff 45%, #eef6ff 100%)',
    accent: 'Mother-of-Pearl',
    secondaryAccent: 'Sterling Silver',
    image: '/images/neck4.jpeg',
    images: [
      { src: '/images/neck4.jpeg', alt: 'Elysian Pendant on linen backdrop' },
      { src: '/images/neck5.jpeg', alt: 'Elysian Pendant halo close-up' },
      { src: '/images/neck6.jpeg', alt: 'Elysian Pendant worn with layered necklaces' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Mother-of-Pearl' },
      { label: 'Metal', value: 'Sterling silver' },
    ],
    highlights: [
      'Hand-cut pearlescent centre',
      'Halo of bead-set white topaz',
      'Comes with 16-18" adjustable chain',
    ],
    categories: ['all', 'necklaces'],
    rating: 4.6,
    reviewCount: 142,
  },
  {
    slug: 'atelier-bar-necklace',
    name: 'Atelier Bar Necklace',
    description: 'Hand-engraved bar with complimentary monogramming.',
    price: '₹11,800',
    originalPrice: '₹15,200',
    salePrice: '₹11,800',
    tag: 'Personalise',
    gradient: 'linear-gradient(135deg, #edf7ff 0%, #dff0ff 45%, #f2f9ff 100%)',
    accent: 'Sterling Silver',
    secondaryAccent: 'Monogram Ready',
    image: '/images/neck3.jpeg',
    images: [
      { src: '/images/neck3.jpeg', alt: 'Atelier Bar Necklace flat lay' },
      { src: '/images/neck2.jpeg', alt: 'Atelier Bar Necklace engraving detail' },
      { src: '/images/neck4.jpeg', alt: 'Atelier Bar Necklace worn solo' },
    ],
    specs: [
      { label: 'Metal', value: 'Sterling silver' },
      { label: 'Personalisation', value: 'Complimentary monogram' },
    ],
    highlights: [
      'Custom engraving within 48 hours',
      'Brushed and polished dual finish',
      'Adjustable 16-18" chain',
    ],
    categories: ['all', 'necklaces'],
    rating: 4.4,
    reviewCount: 67,
  },
  {
    slug: 'luna-glow-studs',
    name: 'Luna Glow Studs',
    description: 'Gradient pavé studs inspired by moonlit horizons.',
    price: '₹12,800',
    originalPrice: '₹16,000',
    salePrice: '₹12,800',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #f1f5ff 0%, #e1e8ff 50%, #f3f7ff 100%)',
    accent: 'Moonstone',
    secondaryAccent: 'Featherlight',
    image: '/images/earrings1.jpeg',
    images: [
      { src: '/images/earrings1.jpeg', alt: 'Luna Glow Studs on velvet' },
      { src: '/images/earrings2.jpeg', alt: 'Luna Glow Studs side profile' },
      { src: '/images/earrings3.jpeg', alt: 'Luna Glow Studs worn in ear' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Moonstone' },
      { label: 'Backing', value: 'Secure butterfly clasp' },
    ],
    highlights: [
      'Featherlight engineering',
      'Hypoallergenic posts',
      'Mirror-finish polish',
    ],
    categories: ['all', 'earrings'],
    rating: 4.7,
    reviewCount: 98,
  },
  {
    slug: 'solstice-hoops',
    name: 'Solstice Hoops',
    description: 'Hand-polished hoops with removable gemstone charms.',
    price: '₹17,800',
    tag: 'Back in stock',
    badge: 'Staff pick',
    gradient: 'linear-gradient(135deg, #fff4d9 0%, #ffe7b5 50%, #fff2d6 100%)',
    accent: 'Citrine Charms',
    secondaryAccent: 'Convertible',
    image: '/images/earrings2.jpeg',
    images: [
      { src: '/images/earrings2.jpeg', alt: 'Solstice Hoops laid on silk' },
      { src: '/images/earrings4.jpeg', alt: 'Solstice Hoops charm detail' },
      { src: '/images/earrings5.jpeg', alt: 'Solstice Hoops styled stack' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Citrine charms' },
      { label: 'Metal', value: '18k blush vermeil' },
    ],
    highlights: [
      'Convertible removable charms',
      'Featherlight balance',
      'Ships in 24 hours',
    ],
    categories: ['all', 'earrings', 'best-sellers', 'sale'],
    salePrice: '₹13,400',
    originalPrice: '₹17,800',
    rating: 4.9,
    reviewCount: 287,
  },
  {
    slug: 'nova-ear-climbers',
    name: 'Nova Ear Climbers',
    description: 'Celestial ear climbers with starlit pavé constellations.',
    price: '₹16,200',
    tag: 'Limited',
    badge: '40% off',
    gradient: 'linear-gradient(135deg, #edfaff 0%, #daf1ff 45%, #eef9ff 100%)',
    accent: 'Lab Diamond',
    secondaryAccent: 'Celestial',
    image: '/images/earrings4.jpeg',
    images: [
      { src: '/images/earrings4.jpeg', alt: 'Nova Ear Climbers close-up' },
      { src: '/images/earrings1.jpeg', alt: 'Nova Ear Climbers worn' },
      { src: '/images/earrings3.jpeg', alt: 'Nova Ear Climbers angle view' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Lab-grown diamonds' },
      { label: 'Length', value: '24 mm' },
    ],
    highlights: [
      'Hand-set pavé constellations',
      'Secure lever-back clasp',
      'Limited 200-piece run',
    ],
    categories: ['all', 'earrings', 'sale'],
    salePrice: '₹12,200',
    originalPrice: '₹16,200',
    rating: 4.6,
    reviewCount: 178,
  },
  {
    slug: 'opaline-chandeliers',
    name: 'Opaline Chandeliers',
    description: 'Ornate chandelier earrings with playful fringe movement.',
    price: '₹24,000',
    originalPrice: '₹30,000',
    salePrice: '₹24,000',
    tag: 'Statement',
    badge: 'Evening favourite',
    gradient: 'linear-gradient(135deg, #ffeef5 0%, #ffd7ea 45%, #ffe9f2 100%)',
    accent: 'Opal Fringe',
    secondaryAccent: 'Convertible',
    image: '/images/earrings5.jpeg',
    images: [
      { src: '/images/earrings5.jpeg', alt: 'Opaline Chandeliers draped on satin' },
      { src: '/images/earrings3.jpeg', alt: 'Opaline Chandeliers motion detail' },
      { src: '/images/earrings2.jpeg', alt: 'Opaline Chandeliers worn at event' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Opal and moonstone' },
      { label: 'Finish', value: 'Blush vermeil' },
    ],
    highlights: [
      'Fringe movement engineered for balance',
      'Convertible drop component',
      'Complimentary polishing cloth',
    ],
    categories: ['all', 'earrings', 'best-sellers'],
    rating: 4.8,
    reviewCount: 245,
  },
  {
    slug: 'muse-ear-cuff-duo',
    name: 'Muse Ear Cuff Duo',
    description: 'Two sculpted cuffs with satin finish for effortless stacking.',
    price: '₹9,800',
    originalPrice: '₹12,800',
    salePrice: '₹9,800',
    tag: 'Set of 2',
    gradient: 'linear-gradient(135deg, #fff5ec 0%, #ffe1cc 50%, #ffefe0 100%)',
    accent: '18k blush vermeil',
    secondaryAccent: 'Stacking Set',
    image: '/images/earrings2.jpeg',
    images: [
      { src: '/images/earrings2.jpeg', alt: 'Muse Ear Cuff Duo close-up' },
      { src: '/images/earrings1.jpeg', alt: 'Muse Ear Cuff Duo styled stack' },
      { src: '/images/earrings4.jpeg', alt: 'Muse Ear Cuff Duo satin finish detail' },
    ],
    specs: [
      { label: 'Metal', value: '18k blush vermeil' },
      { label: 'Set', value: 'Pair of two cuffs' },
    ],
    highlights: [
      'No piercing required',
      'Comfort fit interior polish',
      'Lightweight for all-day wear',
    ],
    categories: ['all', 'earrings'],
    rating: 4.3,
    reviewCount: 92,
  },
  {
    slug: 'seraph-wing-studs',
    name: 'Seraph Wing Studs',
    description: 'Wing-shaped studs with luminous pearl centres.',
    price: '₹15,200',
    originalPrice: '₹19,000',
    salePrice: '₹15,200',
    tag: "Editor's pick",
    gradient: 'linear-gradient(135deg, #f3f8ff 0%, #e7f1ff 50%, #f5f9ff 100%)',
    accent: 'Freshwater Pearl',
    secondaryAccent: 'Artisan carved',
    image: '/images/earrings1.jpeg',
    images: [
      { src: '/images/earrings1.jpeg', alt: 'Seraph Wing Studs pearl detail' },
      { src: '/images/earrings3.jpeg', alt: 'Seraph Wing Studs sculpted wing profile' },
      { src: '/images/earrings4.jpeg', alt: 'Seraph Wing Studs worn with hoops' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Freshwater pearls' },
      { label: 'Metal', value: 'Sterling silver' },
    ],
    highlights: [
      'Hand-carved wing silhouette',
      'Polished to mirror finish',
      'Hypoallergenic backing',
    ],
    categories: ['all', 'earrings'],
    rating: 4.7,
    reviewCount: 167,
  },
  {
    slug: 'muse-charm-chain',
    name: 'Muse Charm Chain',
    description: 'Petite talismans layered along a rolo chain for sound and sparkle.',
    price: '₹18,500',
    tag: 'New',
    badge: 'Back in stock',
    gradient: 'linear-gradient(135deg, #ffe9f1 0%, #ffdbe9 45%, #ffeef5 100%)',
    accent: '18k blush vermeil',
    secondaryAccent: 'Charm Layering',
    image: '/images/bracelets1.jpeg',
    images: [
      { src: '/images/bracelets1.jpeg', alt: 'Muse Charm Chain bracelet draped over book' },
      { src: '/images/bracelets2.jpeg', alt: 'Muse Charm Chain charm detail' },
      { src: '/images/bracelets3.jpeg', alt: 'Muse Charm Chain stacked with bangles' },
    ],
    specs: [
      { label: 'Metal', value: '18k blush vermeil' },
      { label: 'Length', value: '6.5-7.5" adjustable' },
    ],
    highlights: [
      'Vintage-inspired mix of charms',
      'Triple-layer plating for lasting glow',
      'Includes extender with secure clasp',
    ],
    categories: ['all', 'bracelets', 'best-sellers', 'sale'],
    salePrice: '₹13,900',
    originalPrice: '₹18,500',
    rating: 4.9,
    reviewCount: 312,
  },
  {
    slug: 'aster-cuff',
    name: 'Aster Cuff',
    description: 'Sculpted cuff with starlight engraving and a satin interior finish.',
    price: '₹21,000',
    originalPrice: '₹28,000',
    salePrice: '₹21,000',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #edf3ff 0%, #dfe9ff 50%, #eef4ff 100%)',
    accent: 'Recycled Sterling Silver',
    secondaryAccent: 'Hand-engraved',
    image: '/images/bracelets2.jpeg',
    images: [
      { src: '/images/bracelets2.jpeg', alt: 'Aster Cuff bracelet gleaming' },
      { src: '/images/bracelets3.jpeg', alt: 'Aster Cuff engraving detail' },
      { src: '/images/bracelets4.jpeg', alt: 'Aster Cuff styled in stack' },
    ],
    specs: [
      { label: 'Metal', value: 'Recycled sterling silver' },
      { label: 'Fit', value: 'Adjustable 5.5-7"' },
    ],
    highlights: [
      'Hand-engraved starlight motif',
      'Comfort-fit satin interior',
      'Triple-plated for shine retention',
    ],
    categories: ['all', 'bracelets'],
    rating: 4.2,
    reviewCount: 78,
  },
  {
    slug: 'luna-pearl-duo',
    name: 'Luna Pearl Duo',
    description: 'Freshwater pearls paired with silk cord for effortless layering.',
    price: '₹16,800',
    originalPrice: '₹22,400',
    salePrice: '₹16,800',
    tag: 'Set of 2',
    gradient: 'linear-gradient(135deg, #fdf3d7 0%, #ffe9bf 50%, #fff3de 100%)',
    accent: 'Freshwater Pearl',
    secondaryAccent: 'Silk Cord',
    image: '/images/bracelets4.jpeg',
    images: [
      { src: '/images/bracelets4.jpeg', alt: 'Luna Pearl Duo bracelet set close-up' },
      { src: '/images/bracelets1.jpeg', alt: 'Luna Pearl Duo styled duo' },
      { src: '/images/bracelets2.jpeg', alt: 'Luna Pearl Duo silk cord detail' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Freshwater pearls' },
      { label: 'Material', value: 'Silk cord and vermeil' },
    ],
    highlights: [
      'Set of two coordinated bracelets',
      'Custom silk cord for softness',
      'Finished with magnetic clasp',
    ],
    categories: ['all', 'bracelets'],
    rating: 4.6,
    reviewCount: 189,
  },
  {
    slug: 'aurora-tidal-bangle',
    name: 'Aurora Tidal Bangle',
    description: 'Wave-shaped bangle with hand-cut mother-of-pearl inlay.',
    price: '₹24,800',
    originalPrice: '₹31,000',
    salePrice: '₹24,800',
    tag: 'Limited',
    badge: 'Fresh drop',
    gradient: 'linear-gradient(135deg, #eafaf6 0%, #d4f3ec 45%, #eefcf8 100%)',
    accent: 'Mother-of-Pearl',
    secondaryAccent: 'Inlay',
    image: '/images/bracelets5.jpeg',
    images: [
      { src: '/images/bracelets5.jpeg', alt: 'Aurora Tidal Bangle wave silhouette' },
      { src: '/images/bracelets3.jpeg', alt: 'Aurora Tidal Bangle inlay close-up' },
      { src: '/images/bracelets2.jpeg', alt: 'Aurora Tidal Bangle stacked styling' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Mother-of-pearl inlay' },
      { label: 'Metal', value: 'Polished vermeil' },
    ],
    highlights: [
      'Organic wave silhouette',
      'Hidden hinge for seamless fit',
      'Limited 150-piece release',
    ],
    categories: ['all', 'bracelets', 'new-arrivals'],
    rating: 4.4,
    reviewCount: 156,
  },
  {
    slug: 'seraphine-wrap',
    name: 'Seraphine Wrap',
    description: 'Double wrap leather bracelet with gleaming magnetic clasp.',
    price: '₹14,200',
    originalPrice: '₹18,000',
    salePrice: '₹14,200',
    tag: "Editor's pick",
    gradient: 'linear-gradient(135deg, #fff1ea 0%, #ffd9cb 50%, #ffe8dc 100%)',
    accent: 'Italian Nappa Leather',
    secondaryAccent: 'Magnetic clasp',
    image: '/images/bracelets2.jpeg',
    images: [
      { src: '/images/bracelets2.jpeg', alt: 'Seraphine Wrap bracelet coiled' },
      { src: '/images/bracelets1.jpeg', alt: 'Seraphine Wrap clasp close-up' },
      { src: '/images/bracelets5.jpeg', alt: 'Seraphine Wrap styled with bangles' },
    ],
    specs: [
      { label: 'Material', value: 'Italian nappa leather' },
      { label: 'Closure', value: 'Magnetic clasp' },
    ],
    highlights: [
      'Double wrap silhouette',
      'Soft-touch leather finish',
      'Discreet magnetic closure',
    ],
    categories: ['all', 'bracelets'],
    rating: 4.8,
    reviewCount: 298,
  },
  {
    slug: 'celestia-link-set',
    name: 'Celestia Link Set',
    description: 'Two stacking link bracelets with removable moonlit charms.',
    price: '₹27,500',
    originalPrice: '₹36,000',
    salePrice: '₹27,500',
    tag: 'Bundle',
    gradient: 'linear-gradient(135deg, #f3f6ff 0%, #e7edff 50%, #f5f8ff 100%)',
    accent: 'Mixed Metal',
    secondaryAccent: 'Removable charms',
    image: '/images/bracelets1.jpeg',
    images: [
      { src: '/images/bracelets1.jpeg', alt: 'Celestia Link Set stacked bracelets' },
      { src: '/images/bracelets4.jpeg', alt: 'Celestia Link Set charm detail' },
      { src: '/images/bracelets5.jpeg', alt: 'Celestia Link Set styled with watch' },
    ],
    specs: [
      { label: 'Set', value: 'Two coordinating bracelets' },
      { label: 'Features', value: 'Removable moonlit charms' },
    ],
    highlights: [
      'Mix-and-match removable charms',
      'Sculpted links for fluidity',
      'Packaged with storage pouch',
    ],
    categories: ['all', 'bracelets'],
    rating: 4.7,
    reviewCount: 223,
  },
  {
    slug: 'nova-crown-band',
    name: 'Nova Crown Band',
    description: 'Alternating baguette and brilliant diamonds for a crown of light.',
    story:
      'Graduated baguettes crowned with a mirrored under-gallery so the light dances with every gesture—crafted for vows and celebrations alike.',
    price: '₹46,500',
    originalPrice: '₹58,000',
    salePrice: '₹46,500',
    tag: 'New',
    badge: 'Most loved',
    gradient: 'linear-gradient(135deg, #fdf3d2 0%, #ffe7bb 50%, #fef1d9 100%)',
    accent: 'Warm blush alloy',
    secondaryAccent: 'FG/VS diamonds',
    image: '/images/ring1.jpeg',
    images: [
      { src: '/images/ring1.jpeg', alt: 'Nova Crown Band ring sparkle' },
      { src: '/images/ring2.jpeg', alt: 'Nova Crown Band profile view' },
      { src: '/images/ring3.jpeg', alt: 'Nova Crown Band stacked with bands' },
    ],
    specs: [
      { label: 'Gemstone', value: 'FG/VS diamonds' },
      { label: 'Metal', value: 'Warm blush alloy' },
    ],
    highlights: [
      'Mirrored under-gallery amplifies light',
      'Comfort-fit interior polishing',
      'Complimentary first resizing',
    ],
    categories: ['all', 'rings', 'best-sellers', 'new-arrivals'],
    rating: 4.1,
    reviewCount: 65,
  },
  {
    slug: 'solstice-signet',
    name: 'Solstice Signet',
    description: 'Satin-finished oval signet with hand-applied starburst engraving.',
    price: '₹39,800',
    originalPrice: '₹52,000',
    salePrice: '₹39,800',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #ffe9dc 0%, #ffd6c7 50%, #ffe4d4 100%)',
    accent: 'Blush-tone vermeil',
    secondaryAccent: 'Champagne diamond',
    image: '/images/ring2.jpeg',
    images: [
      { src: '/images/ring2.jpeg', alt: 'Solstice Signet ring with engraving' },
      { src: '/images/ring1.jpeg', alt: 'Solstice Signet side view' },
      { src: '/images/ring4.jpeg', alt: 'Solstice Signet worn on hand' },
    ],
    specs: [
      { label: 'Stone', value: 'Champagne diamond' },
      { label: 'Metal', value: 'Blush-tone vermeil' },
    ],
    highlights: [
      'Hand-applied starburst engraving',
      'Satin and high-polish contrast',
      'Complimentary monogram option',
    ],
    categories: ['all', 'rings'],
    rating: 4.6,
    reviewCount: 201,
  },
  {
    slug: 'luna-stacking-trio',
    name: 'Luna Stacking Trio',
    description: 'Three delicate bands designed to layer and flex with your mood.',
    price: '₹28,500',
    originalPrice: '₹38,000',
    salePrice: '₹28,500',
    tag: 'Stack of 3',
    gradient: 'linear-gradient(135deg, #eaf5ff 0%, #dfefff 50%, #f2f8ff 100%)',
    accent: 'Vermeil & Platinum',
    secondaryAccent: 'Moonstone cabochon',
    image: '/images/ring4.jpeg',
    images: [
      { src: '/images/ring4.jpeg', alt: 'Luna Stacking Trio rings stacked together' },
      { src: '/images/ring2.jpeg', alt: 'Luna Stacking Trio individual bands' },
      { src: '/images/ring1.jpeg', alt: 'Luna Stacking Trio worn on fingers' },
    ],
    specs: [
      { label: 'Set', value: 'Three coordinated bands' },
      { label: 'Gemstone', value: 'Moonstone cabochon' },
    ],
    highlights: [
      'Mix-and-match stacking set',
      'Smooth comfort interior',
      'Comes with storage roll',
    ],
    categories: ['all', 'rings', 'new-arrivals'],
    rating: 4.9,
    reviewCount: 334,
  },
  {
    slug: 'orion-toi-et-moi',
    name: 'Orion Toi et Moi',
    description: 'Twin pear-cut sapphires meeting in a sculpted bypass shank.',
    price: '₹61,200',
    originalPrice: '₹76,500',
    salePrice: '₹61,200',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #e9f6ff 0%, #d7ebff 50%, #eef6ff 100%)',
    accent: 'Platinum',
    secondaryAccent: 'Blue sapphire',
    image: '/images/ring5.jpeg',
    images: [
      { src: '/images/ring5.jpeg', alt: 'Orion Toi et Moi ring twin sapphires' },
      { src: '/images/ring3.jpeg', alt: 'Orion Toi et Moi bypass shank detail' },
      { src: '/images/ring1.jpeg', alt: 'Orion Toi et Moi worn on hand' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Blue sapphires' },
      { label: 'Metal', value: 'Platinum' },
    ],
    highlights: [
      'Twin pear-cut sapphires',
      'Sculpted bypass shank',
      'Includes appraisal certificate',
    ],
    categories: ['all', 'rings'],
    rating: 4.7,
    reviewCount: 145,
  },
  {
    slug: 'radiant-pave-band',
    name: 'Radiant Pavé Band',
    description: 'Fifteen hand-set stones with invisible setting for seamless shine.',
    price: '₹52,800',
    originalPrice: '₹66,000',
    salePrice: '₹52,800',
    tag: "Editor's pick",
    gradient: 'linear-gradient(135deg, #f3f7fb 0%, #e6edf6 50%, #f6f9fd 100%)',
    accent: 'Palladium finish',
    secondaryAccent: 'Lab-grown diamond',
    image: '/images/ring3.jpeg',
    images: [
      { src: '/images/ring3.jpeg', alt: 'Radiant Pavé Band shimmering' },
      { src: '/images/ring2.jpeg', alt: 'Radiant Pavé Band invisible setting detail' },
      { src: '/images/ring5.jpeg', alt: 'Radiant Pavé Band stacked look' },
    ],
    specs: [
      { label: 'Stone', value: 'Lab-grown diamonds' },
      { label: 'Setting', value: 'Invisible pavé' },
    ],
    highlights: [
      'Seamless invisible setting',
      'Comfort-fit inner curve',
      'Lifetime replating included',
    ],
    categories: ['all', 'rings'],
    rating: 4.3,
    reviewCount: 88,
  },
  {
    slug: 'aurora-heirloom',
    name: 'Aurora Heirloom',
    description: 'Vintage-inspired basket with milgrain halo and hidden diamond collar.',
    price: '₹84,000',
    tag: 'Heritage',
    badge: 'Limited',
    gradient: 'linear-gradient(135deg, #ffeef5 0%, #ffdbe9 45%, #fff3f8 100%)',
    accent: 'Blush alloy',
    secondaryAccent: 'Morganite',
    image: '/images/ring2.jpeg',
    images: [
      { src: '/images/ring2.jpeg', alt: 'Aurora Heirloom ring on velvet' },
      { src: '/images/ring3.jpeg', alt: 'Aurora Heirloom halo detail' },
      { src: '/images/ring5.jpeg', alt: 'Aurora Heirloom basket profile' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Morganite centre stone' },
      { label: 'Accent', value: 'Hidden diamond collar' },
    ],
    highlights: [
      'Milgrain halo craftsmanship',
      'Hidden diamond collar for extra shimmer',
      'Complimentary appraisal included',
    ],
    categories: ['all', 'rings', 'sale'],
    salePrice: '₹63,000',
    originalPrice: '₹84,000',
    rating: 4.8,
    reviewCount: 223,
  },
  {
    slug: 'celestial-halo-ring',
    name: 'Celestial Halo Ring',
    description: 'A luminous halo of micro pavé frames a mirror-cut centre stone.',
    story:
      'Engineered for unbroken brilliance, the Celestial Halo Ring pairs a mirror-cut centre with a field of pavé and a sculpted under-gallery for comfort.',
    price: '₹72,000',
    badge: 'Limited',
    accent: 'Mirror-cut centre',
    secondaryAccent: 'Micro pavé halo',
    image: '/images/ring3.jpeg',
    images: [
      { src: '/images/ring3.jpeg', alt: 'Celestial Halo Ring shimmering on velvet' },
      { src: '/images/ring5.jpeg', alt: 'Celestial Halo Ring micro pavé detail' },
      { src: '/images/ring1.jpeg', alt: 'Celestial Halo Ring worn on hand' },
    ],
    specs: [
      { label: 'Stone', value: '1.2 ct equivalent brilliance' },
      { label: 'Metal', value: 'Recycled warm blush alloy' },
    ],
    highlights: [
      'Lifetime replating included',
      'Complimentary resizing within 60 days',
      'Ships within 48 hours',
    ],
    categories: ['all', 'rings', 'best-sellers', 'sale'],
    originalPrice: '₹72,000',
    salePrice: '₹57,600',
    rating: 4.9,
    reviewCount: 267,
  },
  {
    slug: 'luna-cascade-collar',
    name: 'Luna Cascade Collar',
    description: 'Luminous moonstones anchored by a satin-finished collar.',
    price: '₹18,500',
    badge: 'Top pick',
    accent: 'Moonstone',
    secondaryAccent: 'Adjustable collar',
    image: '/images/neck3.jpeg',
    images: [
      { src: '/images/neck3.jpeg', alt: 'Luna Cascade Collar necklace' },
      { src: '/images/neck1.jpeg', alt: 'Luna Cascade Collar moonstone detail' },
      { src: '/images/neck4.jpeg', alt: 'Luna Cascade Collar styling' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Moonstone' },
      { label: 'Length', value: 'Adjustable 15-18"' },
    ],
    highlights: [
      'Satin-finished collar for comfort',
      'Moonstones set for seamless glow',
      'Ships today with gift wrap',
    ],
    categories: ['all', 'necklaces', 'best-sellers', 'sale'],
    originalPrice: '₹18,500',
    salePrice: '₹14,800',
    rating: 4.7,
    reviewCount: 198,
  },
  {
    slug: 'stella-orbit-pendant',
    name: 'Stella Orbit Pendant',
    description: 'Mother-of-pearl orb set within a rotating ring of pavé stars.',
    story:
      'Fresh from the studio, the Stella Orbit Pendant spins within a constellation of pavé stars—a celestial talisman for everyday glow.',
    price: '₹19,800',
    originalPrice: '₹26,400',
    salePrice: '₹19,800',
    tag: 'Studio spotlight',
    accent: 'Rotating halo',
    secondaryAccent: 'Mother-of-pearl',
    image: '/images/neck4.jpeg',
    images: [
      { src: '/images/neck4.jpeg', alt: 'Stella Orbit Pendant close-up' },
      { src: '/images/neck5.jpeg', alt: 'Stella Orbit Pendant rotating ring detail' },
      { src: '/images/neck6.jpeg', alt: 'Stella Orbit Pendant styled with chains' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Mother-of-pearl orb' },
      { label: 'Feature', value: 'Rotating pavé ring' },
    ],
    highlights: [
      'Limited 150-piece release',
      'Ships with layered chain set',
      'Includes engraving token',
    ],
    categories: ['all', 'necklaces', 'new-arrivals'],
    rating: 4.2,
    reviewCount: 76,
  },
  {
    slug: 'celestine-ear-thread',
    name: 'Celestine Ear Thread',
    description: 'Thread-through earrings with crystal dew drops.',
    price: '₹13,500',
    originalPrice: '₹17,200',
    salePrice: '₹13,500',
    tag: 'Online exclusive',
    accent: 'Crystal dew drops',
    secondaryAccent: 'Thread-through',
    image: '/images/earrings4.jpeg',
    images: [
      { src: '/images/earrings4.jpeg', alt: 'Celestine Ear Thread earrings hanging' },
      { src: '/images/earrings1.jpeg', alt: 'Celestine Ear Thread close detail' },
      { src: '/images/earrings3.jpeg', alt: 'Celestine Ear Thread worn' },
    ],
    specs: [
      { label: 'Material', value: 'Hand-cut crystal' },
      { label: 'Length', value: '65 mm drop' },
    ],
    highlights: [
      'Ultra-light thread-through design',
      'Crystal drops catch the light',
      'Online exclusive release',
    ],
    categories: ['all', 'earrings', 'new-arrivals'],
    rating: 4.6,
    reviewCount: 156,
  },
  {
    slug: 'elysian-collar',
    name: 'Elysian Collar',
    description: 'Hand-strung pearls anchored by a sculptural clasp.',
    price: '₹22,000',
    originalPrice: '₹29,500',
    salePrice: '₹22,000',
    tag: 'Limited',
    accent: 'Sculptural clasp',
    secondaryAccent: 'Hand-strung pearls',
    image: '/images/neck2.jpeg',
    images: [
      { src: '/images/neck2.jpeg', alt: 'Elysian Collar pearl necklace' },
      { src: '/images/neck5.jpeg', alt: 'Elysian Collar clasp detail' },
      { src: '/images/neck4.jpeg', alt: 'Elysian Collar styled with pendants' },
    ],
    specs: [
      { label: 'Gemstone', value: 'Hand-strung pearls' },
      { label: 'Closure', value: 'Sculptural clasp' },
    ],
    highlights: [
      'Freshwater pearls graded for luminescence',
      'Signature sculptural clasp',
      'Limited seasonal release',
    ],
    categories: ['all', 'necklaces', 'new-arrivals'],
    rating: 4.8,
    reviewCount: 289,
  },
  {
    slug: 'muse-stacking-trio',
    name: 'Muse Stacking Trio',
    description: 'Three satin-finish bands made for stacking stories.',
    price: '₹28,500',
    originalPrice: '₹38,000',
    salePrice: '₹28,500',
    tag: 'Bundle',
    accent: 'Satin finish',
    secondaryAccent: 'Stacking set',
    image: '/images/ring4.jpeg',
    images: [
      { src: '/images/ring4.jpeg', alt: 'Muse Stacking Trio rings stacked' },
      { src: '/images/ring2.jpeg', alt: 'Muse Stacking Trio satin detail' },
      { src: '/images/ring5.jpeg', alt: 'Muse Stacking Trio varied widths' },
    ],
    specs: [
      { label: 'Set', value: 'Three coordinating bands' },
      { label: 'Finish', value: 'Satin sheen' },
    ],
    highlights: [
      'Satin and polished contrast',
      'Designed to mix with Elysian capsule',
      'Includes polishing cloth',
    ],
    categories: ['all', 'rings', 'new-arrivals'],
    rating: 4.1,
    reviewCount: 54,
  },
  {
    slug: 'luna-glow-anklet',
    name: 'Luna Glow Anklet',
    description: 'Delicate anklet with moonlit charms for summer shimmer.',
    price: '₹11,800',
    originalPrice: '₹15,200',
    salePrice: '₹11,800',
    tag: 'Seasonal',
    accent: 'Moonlit charms',
    secondaryAccent: 'Adjustable anklet',
    image: '/images/bracelets4.jpeg',
    images: [
      { src: '/images/bracelets4.jpeg', alt: 'Luna Glow Anklet close-up' },
      { src: '/images/bracelets1.jpeg', alt: 'Luna Glow Anklet draped on ankle' },
      { src: '/images/bracelets2.jpeg', alt: 'Luna Glow Anklet charm detail' },
    ],
    specs: [
      { label: 'Length', value: 'Adjustable 8-10"' },
      { label: 'Charm', value: 'Moonlit enamel charms' },
    ],
    highlights: [
      'Seasonal summer edit',
      'Micro charms with luminous enamel',
      'Water-resistant plating',
    ],
    categories: ['all', 'bracelets', 'new-arrivals'],
    rating: 4.5,
    reviewCount: 187,
  },
  {
    slug: 'serenade-tennis-bracelet',
    name: 'Serenade Tennis Bracelet',
    description: 'A ribbon of handset pavé stones, engineered with invisible settings.',
    price: '₹32,000',
    tag: 'Limited',
    badge: 'Last 12',
    accent: 'Lab diamonds',
    secondaryAccent: 'Invisible setting',
    image: '/images/bracelets3.jpeg',
    images: [
      { src: '/images/bracelets3.jpeg', alt: 'Serenade Tennis Bracelet close-up' },
      { src: '/images/bracelets2.jpeg', alt: 'Serenade Tennis Bracelet clasp detail' },
      { src: '/images/bracelets1.jpeg', alt: 'Serenade Tennis Bracelet stacked styling' },
    ],
    specs: [
      { label: 'Stone', value: 'FG/VS lab-grown diamonds' },
      { label: 'Setting', value: 'Invisible pavé' },
    ],
    highlights: [
      'Precision-set pavé for endless shimmer',
      'Hidden safety clasp',
      'Lifetime replating included',
    ],
    categories: ['all', 'bracelets', 'sale'],
    originalPrice: '₹32,000',
    salePrice: '₹25,600',
    rating: 4.9,
    reviewCount: 256,
  },
];

const productMap = new Map(products.map((product) => [product.slug.toLowerCase(), product]));

const candidateSlugs = (raw: string) => {
  const base = raw.toLowerCase().trim();
  const variants = new Set<string>([base]);

  variants.add(base.replace(/\s+/g, '-'));
  variants.add(base.replace(/-+/g, ' '));
  variants.add(base.replace(/[_]+/g, '-'));

  return Array.from(variants).filter(Boolean);
};

export function getProducts(): Product[] {
  return products;
}

export function getProductBySlug(slug: string): Product | undefined {
  for (const candidate of candidateSlugs(slug)) {
    const match = productMap.get(candidate);
    if (match) {
      return match;
    }
  }

  return undefined;
}

export function getProductsByCategory(category: ProductCategory): Product[] {
  if (category === 'all') {
    return products;
  }

  return products.filter((product) => product.categories.includes(category));
}

export function getRelatedProducts(slug: string, limit = 4): Product[] {
  const product = getProductBySlug(slug);

  if (!product) {
    return [];
  }

  const isRelevantCategory = (cat: ProductCategory): cat is Exclude<ProductCategory, 'all'> =>
    cat !== 'all';

  const relatedCategories = product.categories.filter(isRelevantCategory);

  const related = products
    .filter(
      (item): boolean =>
        item.slug !== slug &&
        item.categories.some((cat) => isRelevantCategory(cat) && relatedCategories.includes(cat)),
    )
    .slice(0, limit);

  if (related.length >= limit) {
    return related;
  }

  const fillers = products.filter(
    (item) => item.slug !== slug && !related.includes(item),
  );

  return [...related, ...fillers].slice(0, limit);
}



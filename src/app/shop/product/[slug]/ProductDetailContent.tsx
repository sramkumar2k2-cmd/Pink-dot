// src/app/shop/productData.ts

// 🧩 Define all valid product categories — added "all" here to fix the build error
export type ProductCategory =
  | 'all'
  | 'necklaces'
  | 'earrings'
  | 'bracelets'
  | 'rings'
  | 'best-sellers'
  | 'new-arrivals'
  | 'sale';

// 🛍️ Define the Product type
export type Product = {
  slug: string;
  name: string;
  description: string;
  price: string;
  salePrice?: string;
  originalPrice?: string;
  images: { src: string; alt: string }[];
  categories: ProductCategory[];
  highlights?: string[];
  specs?: { label: string; value: string }[];
  secondaryAccent?: string;
  story?: string;
};

// 💎 Product Data — You can extend this list with your own products
export const products: Product[] = [
  {
    slug: 'gold-necklace',
    name: 'Elegant Gold Necklace',
    description: 'A timeless 18K gold necklace for any occasion.',
    price: '$299',
    salePrice: '$249',
    originalPrice: '$299',
    categories: ['necklaces', 'best-sellers'],
    images: [
      { src: '/images/products/gold-necklace-1.jpg', alt: 'Elegant Gold Necklace' },
      { src: '/images/products/gold-necklace-2.jpg', alt: 'Gold Necklace side view' },
    ],
    highlights: ['18K Gold', 'Handcrafted', 'Premium Finish'],
    specs: [
      { label: 'Material', value: '18K Gold' },
      { label: 'Length', value: '18 inches' },
    ],
    secondaryAccent: 'Yellow Gold',
    story:
      'This handcrafted necklace brings together timeless design and contemporary craftsmanship.',
  },
  {
    slug: 'diamond-earrings',
    name: 'Diamond Drop Earrings',
    description: 'Sparkling diamond earrings with a sleek modern silhouette.',
    price: '$499',
    categories: ['earrings', 'new-arrivals'],
    images: [
      { src: '/images/products/diamond-earrings-1.jpg', alt: 'Diamond Drop Earrings' },
      { src: '/images/products/diamond-earrings-2.jpg', alt: 'Diamond Earrings alternate view' },
    ],
    highlights: ['Certified Diamonds', 'Sterling Silver Base', 'Elegant Design'],
    specs: [
      { label: 'Material', value: 'Silver & Diamond' },
      { label: 'Length', value: '2 inches' },
    ],
    story:
      'Expertly crafted with precision-set diamonds, these earrings radiate elegance and light.',
  },
  {
    slug: 'silver-bracelet',
    name: 'Classic Silver Bracelet',
    description: 'A versatile bracelet crafted in sterling silver.',
    price: '$149',
    categories: ['bracelets', 'sale'],
    images: [
      { src: '/images/products/silver-bracelet-1.jpg', alt: 'Classic Silver Bracelet' },
      { src: '/images/products/silver-bracelet-2.jpg', alt: 'Silver Bracelet alternate view' },
    ],
    highlights: ['Sterling Silver', 'Adjustable Size', 'Minimalist Design'],
    specs: [
      { label: 'Material', value: 'Sterling Silver' },
      { label: 'Weight', value: '20 grams' },
    ],
    secondaryAccent: 'Polished Silver',
    story:
      'This bracelet combines minimalist design with fine silver craftsmanship, perfect for daily wear.',
  },
  {
    slug: 'pearl-ring',
    name: 'Elegant Pearl Ring',
    description: 'A modern twist on a timeless pearl ring design.',
    price: '$199',
    categories: ['rings', 'all'],
    images: [
      { src: '/images/products/pearl-ring-1.jpg', alt: 'Elegant Pearl Ring' },
      { src: '/images/products/pearl-ring-2.jpg', alt: 'Pearl Ring alternate view' },
    ],
    highlights: ['Freshwater Pearl', 'Adjustable Band', 'Elegant Look'],
    specs: [
      { label: 'Material', value: 'Pearl & Gold Plating' },
      { label: 'Size', value: 'Adjustable' },
    ],
    secondaryAccent: 'White Pearl',
    story:
      'This adjustable pearl ring embodies sophistication and grace, blending tradition with modern style.',
  },
  {
    slug: 'rose-gold-bangle',
    name: 'Rose Gold Bangle',
    description: 'A chic bangle plated in beautiful rose gold.',
    price: '$179',
    categories: ['bracelets', 'new-arrivals'],
    images: [
      { src: '/images/products/rose-gold-bangle-1.jpg', alt: 'Rose Gold Bangle' },
      { src: '/images/products/rose-gold-bangle-2.jpg', alt: 'Rose Gold Bangle side view' },
    ],
    highlights: ['Rose Gold Plating', 'Lightweight', 'Comfort Fit'],
    specs: [
      { label: 'Material', value: 'Rose Gold Plating on Brass' },
      { label: 'Diameter', value: '6.5 cm' },
    ],
    secondaryAccent: 'Rose Gold',
    story:
      'Inspired by modern femininity, this bangle adds a touch of glamour and warmth to any ensemble.',
  },
];

// 🔍 Utility Function: Get product by slug
export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug);
}

// 🤝 Utility Function: Get related products
export function getRelatedProducts(
  slug: string,
  relatedCategories: ProductCategory[],
  limit = 4
): Product[] {
  const related = products
    .filter(
      (item) =>
        item.slug !== slug &&
        item.categories.some((cat) => relatedCategories.includes(cat))
    )
    .slice(0, limit);

  if (related.length >= limit) {
    return related;
  }

  // Fallback — fill with other products if not enough related
  const others = products.filter((p) => p.slug !== slug);
  const additional = others.slice(0, limit - related.length);
  return [...related, ...additional];
}

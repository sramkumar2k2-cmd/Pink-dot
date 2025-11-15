import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { ProductCard } from '@/app/components/ProductCard';
import {
  type Product,
  type ProductCategory,
  getProductBySlug,
  getProducts,
  getRelatedProducts,
} from '@/app/shop/productData';
import styles from './page.module.css';
import { ProductDetailContent } from './ProductDetailContent';

type ProductPageProps = {
  params: Promise<{
    slug: string;
  }>;
};

const categoryLabels: Record<ProductCategory, { label: string; href: string }> = {
  all: { label: 'All Jewellery', href: '/shop/all-jewellery' },
  necklaces: { label: 'Necklaces', href: '/shop/necklaces' },
  earrings: { label: 'Earrings', href: '/shop/earrings' },
  bracelets: { label: 'Bracelets', href: '/shop/bracelets' },
  rings: { label: 'Rings', href: '/shop/rings' },
  'best-sellers': { label: 'Best Sellers', href: '/shop/best-sellers' },
  'new-arrivals': { label: 'New Arrivals', href: '/shop/new-arrivals' },
  sale: { label: 'Sale', href: '/shop/sale' },
};

const categoryPreference: ProductCategory[] = [
  'necklaces',
  'rings',
  'earrings',
  'bracelets',
  'best-sellers',
  'new-arrivals',
  'sale',
  'all',
];

function getBreadcrumb(product: Product) {
  const category = categoryPreference.find((cat) => product.categories.includes(cat));
  return category ? categoryLabels[category] ?? null : null;
}

const normalizeSlug = (slug: string) =>
  decodeURIComponent(slug)
    .replace(/\u200B/g, '')
    .trim()
    .toLowerCase();

export const dynamicParams = true;

export function generateStaticParams() {
  return getProducts().map((product) => ({
    slug: product.slug.toLowerCase(),
  }));
}

export async function generateMetadata({ params }: ProductPageProps): Promise<Metadata> {
  const { slug: rawSlug } = await params;
  const slug = normalizeSlug(rawSlug);
  const product = getProductBySlug(slug);

  if (!product) {
    return {
      title: 'Product not found | Pink Dot',
      robots: {
        index: false,
        follow: false,
      },
    };
  }

  return {
    title: `${product.name} | Pink Dot Jewellery`,
    description: product.story ?? product.description,
    openGraph: {
      title: `${product.name} | Pink Dot Jewellery`,
      description: product.story ?? product.description,
      images: product.images.map((image) => ({ url: image.src, alt: image.alt })),
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug: rawSlug } = await params;

  if (!rawSlug) {
    notFound();
    return null;
  }

  const slug = normalizeSlug(rawSlug);
  const product = getProductBySlug(slug);

  if (!product) {
    console.error(`[ProductPage] Missing product for slug "${slug}"`);
    notFound();
    return null;
  }

  const breadcrumb = getBreadcrumb(product);
  const related = getRelatedProducts(product.slug, 4);

  return (
    <div className={styles.page}>
      <ProductDetailContent product={product} breadcrumb={breadcrumb} />

      {related.length ? (
        <section className={styles.relatedSection} aria-labelledby="related-heading">
          <div className={styles.relatedHeader}>
            <h2 id="related-heading">Pairs perfectly together</h2>
            <p>Curated by our stylists to complement {product.name}.</p>
          </div>
          <div className={styles.relatedGrid}>
            {related.map((relatedProduct) => (
              <ProductCard key={relatedProduct.slug} product={relatedProduct} />
            ))}
          </div>
        </section>
      ) : null}
    </div>
  );
}

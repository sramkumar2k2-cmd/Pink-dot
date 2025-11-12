import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import { ProductCard } from '@/app/components/ProductCard';
import type { Product } from '@/app/shop/productData';
import { getProductBySlug } from '@/app/shop/productData';
import styles from './page.module.css';

const heroHighlights = [
  'Loved by over 25,000 Pink Dot collectors worldwide',
  'Shipped within 24 hours with complimentary gift wrap',
  'Lifetime replating and resizing on signature favourites',
];

const heroSpotlight = {
  badge: 'Top rated',
  name: 'Luna Cascade Collar',
  description:
    'Our most-requested layering piece, with luminous moonstones anchored by a satin-finished collar.',
  image: '/images/neck3.jpeg',
  imageAlt: 'Luna Cascade Collar showcased on velvet',
  meta: ['₹18,500', 'Ships today'],
  swatches: ['4.9 ★ (1,280 reviews)', 'Ships today', 'Lifetime replating'],
};

const bestSellerSlugs = [
  'nova-crown-band',
  'solstice-hoops',
  'muse-charm-chain',
  'celestial-halo-ring',
  'aurora-lariat',
  'opaline-chandeliers',
];

const bestSellers = bestSellerSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item));

const testimonials = [
  {
    quote:
      'The Luna Cascade Collar is the necklace I reach for every morning. It layers with everything and still feels special.',
    name: 'Elena H. — London',
  },
  {
    quote:
      'Pink Dot hoops are the only ones that never irritate my ears. The Solstice pair is featherlight!',
    name: 'Priya S. — Mumbai',
  },
  {
    quote: 'We chose the Nova Crown Band as our anniversary ring—sparkle for days and custom sizing was a breeze.',
    name: 'Jordan + Alex — New York',
  },
];

export default function BestSellersPage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Best Sellers"
        title="Pieces our community can’t stop wearing"
        subtitle="Explore the jewels that sell out every season—crafted in limited runs and restocked by popular demand."
        backgroundImage="/images/earrings5.jpeg"
        actions={[
          { label: 'See what’s new', href: '/shop/new-arrivals' },
          { label: 'View full edit', href: '/collections/best-sellers', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(24, 18, 28, 0.6), rgba(92, 54, 71, 0.3))"
        glowColors={{
          primary: 'rgba(255, 208, 220, 0.7)',
          secondary: 'rgba(135, 105, 220, 0.5)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <section className={styles.collectionSection}>
          <div className={styles.sectionHeading}>
            <h2>Most-loved jewels right now</h2>
            <p>Limited runs that rarely stay in stock. Add to your collection while they’re still glowing on our shelves.</p>
          </div>
          <div className={styles.productsGrid}>
            {bestSellers.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeading}>
            <h2>Why they sell out</h2>
            <p>Three reasons these designs top every wish list—season after season.</p>
          </div>
          <div className={styles.storyGrid}>
            <div className={styles.storyCard}>
              <h3>Limited runs</h3>
              <p>We craft in small batches to keep our edits intentional, with restocks guided by community votes.</p>
            </div>
            <div className={styles.storyCard}>
              <h3>Finite details</h3>
              <p>Hand-set stones, hidden engravings, and custom clasps make each piece feel tailor-made.</p>
            </div>
            <div className={styles.storyCard}>
              <h3>Lifetime care</h3>
              <p>Every bestseller includes complimentary replating and a yearly polish—on the house.</p>
            </div>
          </div>
        </section>

        <section className={styles.testimonialSection}>
          <div className={styles.sectionHeading}>
            <h2>Loved in the wild</h2>
            <p>Stories from Pink Dot collectors who made these best sellers part of their everyday glow.</p>
          </div>
          <ul className={styles.testimonialList}>
            {testimonials.map((testimonial) => (
              <li key={testimonial.name}>
                <blockquote>{testimonial.quote}</blockquote>
                <cite>{testimonial.name}</cite>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.ctaBanner}>
          <div>
            <h2>Be first to know about restocks</h2>
            <p>Join the Pink Dot insider list and receive early access to our best seller drops.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Join the list
            </Link>
            <Link href="/collections" className={styles.secondaryButton}>
              Explore collections
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import { ProductCard } from '@/app/components/ProductCard';
import type { Product } from '@/app/shop/productData';
import { getProductBySlug } from '@/app/shop/productData';
import styles from './page.module.css';

const saleHighlights = [
  'Ends Sunday midnight BST',
  'Complimentary gift wrap on all sale orders',
  'Final few pieces—no restocks once they sparkle out',
];

const heroDeal = {
  name: 'Celestial Halo Ring',
  was: '₹72,000',
  now: '₹57,600',
  image: '/images/ring3.jpeg',
  description: 'Our signature halo ring with micro pavé brilliance—25% off this weekend only.',
  perks: ['Lifetime replating included', 'Free resizing within 60 days', 'Ships within 48hrs'],
};

const heroSpotlight = {
  badge: 'Weekend deal',
  name: heroDeal.name,
  description: heroDeal.description,
  image: heroDeal.image,
  imageAlt: `${heroDeal.name} sale highlight`,
  meta: [heroDeal.was, heroDeal.now],
  swatches: heroDeal.perks,
};

const saleSlugs = [
  'luna-cascade-collar',
  'muse-charm-chain',
  'solstice-hoops',
  'aurora-heirloom',
  'nova-ear-climbers',
  'serenade-tennis-bracelet',
];

const saleProducts = saleSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item));

const bundles = [
  {
    name: 'Layered Glow Set',
    description: 'Aurora Lariat + Muse Charm Chain + Luna Glow Studs',
    price: '₹39,900',
    value: 'Value ₹53,100',
    image: '/images/neck2.jpeg',
  },
  {
    name: 'Evening Muse Kit',
    description: 'Opaline Chandeliers + Celestial Halo Ring + Aster Cuff',
    price: '₹59,800',
    value: 'Value ₹79,200',
    image: '/images/earrings5.jpeg',
  },
];

export default function SalePage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Archive Sale"
        title="Signature pieces, shimmered down"
        subtitle="Last chance to collect limited-run jewels before they retire to the archive. Prices marked down up to 30%—no code needed."
        backgroundImage="/images/ring2.jpeg"
        actions={[
          { label: 'Shop all sale', href: '/shop/all-jewellery' },
          { label: 'See antique jewellery', href: '/collections/antique-jewellery', variant: 'ghost' },
        ]}
        highlights={saleHighlights}
        overlayGradient="linear-gradient(135deg, rgba(28, 18, 16, 0.62), rgba(120, 60, 48, 0.28))"
        glowColors={{
          primary: 'rgba(255, 200, 168, 0.7)',
          secondary: 'rgba(204, 90, 60, 0.52)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <section className={styles.saleSection}>
          <div className={styles.sectionHeading}>
            <h2>Steals before they’re gone</h2>
            <p>Once these pieces sell through, they return to the archive. Elevate your stack while the sparkle lasts.</p>
          </div>
          <div className={styles.productsGrid}>
            {saleProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className={styles.bundleSection}>
          <div className={styles.sectionHeading}>
            <h2>Bundle & glow</h2>
            <p>Curated sets designed by our stylists—crafted to coordinate seamlessly and priced to delight.</p>
          </div>
          <div className={styles.bundleGrid}>
            {bundles.map((bundle) => (
              <article key={bundle.name} className={styles.bundleCard}>
                <div className={styles.bundleImageWrapper}>
                  <Image
                    src={bundle.image}
                    alt={bundle.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 260px"
                    className={styles.bundleImage}
                  />
                </div>
                <div className={styles.bundleContent}>
                  <h3>{bundle.name}</h3>
                  <p>{bundle.description}</p>
                  <div className={styles.bundlePricing}>
                    <span>{bundle.price}</span>
                    <span>{bundle.value}</span>
                  </div>
                  <Link href="/contact">Reserve bundle</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ctaBanner}>
          <div>
            <h2>Need styling support?</h2>
            <p>Book a complimentary sale styling session. We’ll help you pair pieces, confirm sizes, and wrap gifts.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Book now
            </Link>
            <Link href="/support/returns" className={styles.secondaryButton}>
              View sale terms
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
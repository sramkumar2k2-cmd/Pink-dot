import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import { ProductCard } from '@/app/components/ProductCard';
import type { Product } from '@/app/shop/productData';
import { getProductBySlug } from '@/app/shop/productData';
import styles from './page.module.css';

const heroHighlights = [
  'Hand-polished links for fluid movement and a seamless drape',
  'Adjustable extenders on every bracelet for perfect fit',
  'Nickel-safe plating layered 3x for lasting glow',
];

const heroSpotlight = {
  badge: 'Stylist favourite',
  name: 'Muse Charm Chain',
  description:
    'Borrowing inspiration from Parisian flea markets, this charm chain mixes vintage silhouettes with modern polish.',
  image: '/images/bracelets1.jpeg',
  imageAlt: 'Muse Charm Chain bracelet draped over a book',
  meta: ['₹18,500', 'Ships in 24hrs'],
  swatches: ['Hand-cut charms', 'Lightweight links', 'Custom extender'],
};

const spotlight = {
  name: 'Serenade Tennis Bracelet',
  description:
    'A ribbon of handset pavé stones, engineered with invisible settings so the shimmer never breaks.',
  price: '₹32,000',
  features: ['FG/VS lab-grown diamonds', 'Luminous white vermeil', 'Adjustable 6"–7.5"'],
  image: '/images/bracelets3.jpeg',
};

const braceletSlugs = [
  'muse-charm-chain',
  'aster-cuff',
  'luna-pearl-duo',
  'aurora-tidal-bangle',
  'seraphine-wrap',
  'celestia-link-set',
];

const products = braceletSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item));

const craftsmanshipHighlights = [
  'Each clasp is strength-tested to 5x daily wear to avoid mid-day slippage.',
  'We add a layer of e-coating to preserve lustre and resist tarnish.',
  'Sizing consultations available virtually to craft the perfect stack.',
];

export default function BraceletsPage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Bracelet Atelier"
        title="Bracelets that sway with your rhythm"
        subtitle="Layer luminous chains, heirloom cuffs, and talisman charms designed to shimmer through every gesture—from morning coffee runs to midnight encores."
        backgroundImage="/images/bracelets5.jpeg"
        actions={[
          { label: 'Shop all bracelets', href: '/shop/bracelets' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(32, 24, 18, 0.62), rgba(112, 72, 48, 0.28))"
        glowColors={{
          primary: 'rgba(255, 216, 180, 0.7)',
          secondary: 'rgba(204, 154, 43, 0.52)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <section className={styles.highlightSection}>
          <div className={styles.highlightVisual}>
            <Image
              src={spotlight.image}
              alt="Serenade Tennis Bracelet close up"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={styles.highlightImage}
            />
          </div>
          <div className={styles.highlightContent}>
            <span className={styles.highlightTag}>Spotlight</span>
            <h2 className={styles.highlightTitle}>{spotlight.name}</h2>
            <p className={styles.highlightDescription}>{spotlight.description}</p>
            <div className={styles.highlightFeatures}>
              {spotlight.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
            <div className={styles.highlightFooter}>
              <span className={styles.highlightPrice}>{spotlight.price}</span>
              <Link href="/collections/antique-jewellery" className={styles.highlightLink}>
                Discover limited edit
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.collectionSection}>
          <div className={styles.sectionHeading}>
            <h2>Stacks that tell your story</h2>
            <p>Mix textures, metals, and motifs to compose a wrist narrative as unique as your pulse.</p>
          </div>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeading}>
            <h2>The Pink Dot bracelet promise</h2>
            <p>Crafted in our Jaipur and Vicenza ateliers, finished with a personal touch before it leaves our studio.</p>
          </div>
          <ul className={styles.storyList}>
            {craftsmanshipHighlights.map((highlight) => (
              <li key={highlight}>
                <div className={styles.storyIcon}>✶</div>
                <p>{highlight}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.ctaBanner}>
          <div>
            <h2>Build your bracelet stack</h2>
            <p>Reserve a 20-minute styling session to layer textures, metals, and charms curated for you.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Book a stylist
            </Link>
            <Link href="/support/returns" className={styles.secondaryButton}>
              View care tips
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
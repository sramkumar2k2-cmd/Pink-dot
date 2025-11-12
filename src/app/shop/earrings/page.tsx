import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import { ProductCard } from '@/app/components/ProductCard';
import type { Product } from '@/app/shop/productData';
import { getProductBySlug } from '@/app/shop/productData';
import styles from './page.module.css';

const heroHighlights = [
  'Featherlight engineering for all-day comfort',
  'Hypoallergenic posts crafted with surgical steel',
  'Hand-set stones with mirror polish for extra brilliance',
];

const heroSpotlight = {
  badge: 'Stylist favourite',
  name: 'Solstice Hoops',
  description:
    'Removable charms and polished hoops, balancing statement shimmer with everyday ease.',
  image: '/images/earrings2.jpeg',
  imageAlt: 'Solstice hoop earrings resting on silk fabric',
  meta: ['₹17,800', 'Ships in 24hrs'],
  swatches: ['Featherlight', 'Hypoallergenic', 'Convertible charms'],
};

const spotlight = {
  name: 'Aurora Cascade Drops',
  description:
    'A trio of iridescent stones suspended in a shimmering cascade, designed to catch the light with every turn of your head.',
  price: '₹21,500',
  features: ['Moonstone & topaz', 'Blush vermeil plating', 'Hand-balanced for comfort'],
  image: '/images/earrings3.jpeg',
};

const earringSlugs = [
  'luna-glow-studs',
  'solstice-hoops',
  'nova-ear-climbers',
  'opaline-chandeliers',
  'muse-ear-cuff-duo',
  'seraph-wing-studs',
];

const products = earringSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item));

const craftsmanshipHighlights = [
  'Every hinge is tested 500 cycles to ensure secure closures that never pinch.',
  'We hand-buff each post and backing for a seamless feel against the skin.',
  'Ear stacks curated virtually—book a styling call to tailor your mix.',
];

export default function EarringsPage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Earring Studio"
        title="Earrings that dance with every expression"
        subtitle="From whisper-light studs to sculptural chandeliers, discover silhouettes that illuminate your face and carry your stories skyward."
        backgroundImage="/images/earrings5.jpeg"
        actions={[
          { label: 'Shop all earrings', href: '/shop/earrings' },
          { label: 'Styling tips', href: '/support/size-guide', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(30, 20, 35, 0.6), rgba(112, 68, 120, 0.28))"
        glowColors={{
          primary: 'rgba(255, 204, 226, 0.75)',
          secondary: 'rgba(194, 24, 91, 0.52)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <section className={styles.highlightSection}>
          <div className={styles.highlightVisual}>
            <Image
              src={spotlight.image}
              alt="Aurora Cascade Drops earrings close up"
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
              <Link href="/collections/celestial-dreams" className={styles.highlightLink}>
                Explore celestial edit
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.collectionSection}>
          <div className={styles.sectionHeading}>
            <h2>Pairs that frame your light</h2>
            <p>Mix silhouettes, metals, and stones to build a personalised ear stack that feels confidently you.</p>
          </div>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeading}>
            <h2>The Pink Dot earring difference</h2>
            <p>Designed in London, crafted in Jaipur, Seoul, and Vicenza with artisanal precision.</p>
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
            <h2>Design your ear stack</h2>
            <p>Book a styling consult and we’ll craft a bespoke ear party—from first piercings to constellation stacks.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Book a styling call
            </Link>
            <Link href="/support/returns" className={styles.secondaryButton}>
              Care for your jewels
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import { ProductGrid } from '@/app/components/ProductGrid/ProductGrid';
import type { Product } from '@/app/shop/productData';
import { getProductBySlug } from '@/app/shop/productData';
import styles from './page.module.css';

const heroHighlights = [
  'Hypoallergenic and nickel-free finishes',
  'Lifetime re-plating on signature pieces',
  'Hand-set gemstones sourced in Jaipur',
];

const heroSpotlight = {
  badge: 'Editor’s favourite',
  name: 'Aurora Lariat',
  description:
    'A duo-length lariat finished with a halo clasp so the light dances along every curve.',
  image: '/images/neck2.jpeg',
  meta: ['₹16,800', 'Ships in 24hrs'],
  swatches: ['Layered textures', 'Hand-polished', 'Moonlit palette'],
};

const bestSeller = {
  name: 'Luna Cascade Collar',
  description:
    'Luminous moonstones float on a delicate adjustable collar. Perfect on its own or as the anchor to your favourite layering stack.',
  price: '₹18,500',
  features: ['Adjustable 15"–18"', 'Moonstone + mother-of-pearl', 'Limited 300-piece run'],
  image: '/images/neck3.jpeg',
};

const necklaceSlugs = [
  'aurora-lariat',
  'solstice-choker',
  'elysian-pendant',
  'serein-station',
  'nova-charm-set',
  'atelier-bar-necklace',
];

const products = necklaceSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item));

const storyHighlights = [
  'Every clasp is inspected by hand to ensure whisper-smooth movement.',
  'We plate twice as thick as the industry standard for lasting glow.',
  'Each order arrives in our keepsake box with layered styling guide.',
];

export default function NecklacesPage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Necklace Atelier"
        title="Necklaces that layer every chapter of you"
        subtitle="From luminous collars to whisper-fine chains, discover silhouettes crafted to mix, match, and tell your story in quiet shimmer."
        backgroundImage="/images/neck1.jpeg"
        actions={[
          { label: 'Shop all necklaces', href: '/shop/necklaces' },
          { label: 'Book a styling session', href: '/support/styling', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(20, 16, 22, 0.62), rgba(92, 54, 71, 0.28))"
        glowColors={{
          primary: 'rgba(255, 208, 220, 0.75)',
          secondary: 'rgba(196, 24, 91, 0.52)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <section className={styles.highlightSection}>
          <div className={styles.highlightVisual}>
            <Image
              src={bestSeller.image}
              alt="Luna Cascade Collar necklace"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={styles.highlightImage}
            />
          </div>
          <div className={styles.highlightContent}>
            <span className={styles.highlightTag}>Best seller</span>
            <h2 className={styles.highlightTitle}>{bestSeller.name}</h2>
            <p className={styles.highlightDescription}>{bestSeller.description}</p>
            <div className={styles.highlightFeatures}>
              {bestSeller.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
            <div className={styles.highlightFooter}>
              <span className={styles.highlightPrice}>{bestSeller.price}</span>
              <Link href="/collections/limited-edition" className={styles.highlightLink}>
                View limited run
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.collectionSection}>
          <div className={styles.sectionHeading}>
            <h2>Signature layering pieces</h2>
            <p>Curated by our studio stylists to mix seamlessly with your current favourites.</p>
          </div>
          <ProductGrid products={products} />
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeading}>
            <h2>The Pink Dot necklace difference</h2>
            <p>Designed in our London studio, finished by heritage artisans across India and Italy.</p>
          </div>
          <ul className={styles.storyList}>
            {storyHighlights.map((highlight) => (
              <li key={highlight}>
                <div className={styles.storyIcon}>✶</div>
                <p>{highlight}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.ctaBanner}>
          <div>
            <h2>Need help layering?</h2>
            <p>Book a complimentary 15-minute styling consult and we’ll design a stack just for you.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Reserve a consult
            </Link>
            <Link href="/support/returns" className={styles.secondaryButton}>
              Explore our care guide
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
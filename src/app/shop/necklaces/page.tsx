import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
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

const products = [
  {
    name: 'Aurora Lariat',
    description: 'Hand-polished teardrop quartz with micro pavé clasp detail.',
    price: '₹16,800',
    gemstone: 'Rose Quartz',
    metal: '18k blush vermeil',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #ffe3ec 0%, #f9d4ff 45%, #ffe0f2 100%)',
    image: '/images/neck1.jpeg',
  },
  {
    name: 'Solstice Choker',
    description: 'Layer-friendly satin-finished links with removable charm.',
    price: '₹14,200',
    gemstone: 'Citrine',
    metal: 'Mixed Metal',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #fff4d7 0%, #ffddaf 50%, #ffe8c6 100%)',
    image: '/images/neck2.jpeg',
  },
  {
    name: 'Elysian Pendant',
    description: 'Hand-cut mother-of-pearl framed with bead-set topaz halo.',
    price: '₹15,600',
    gemstone: 'Mother-of-Pearl',
    metal: 'Sterling Silver',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #e8f4ff 0%, #d9e9ff 45%, #eef6ff 100%)',
    image: '/images/neck4.jpeg',
  },
  {
    name: 'Serein Station',
    description: 'Floating freshwater pearls spaced along a whisper chain.',
    price: '₹13,200',
    gemstone: 'Freshwater Pearl',
    metal: '18k blush vermeil',
    tag: 'Editor’s pick',
    gradient: 'linear-gradient(135deg, #f1f5ff 0%, #ebe6ff 45%, #f7f1ff 100%)',
    image: '/images/neck5.jpeg',
  },
  {
    name: 'Nova Charm Set',
    description: 'Interchangeable charms for custom layering stories.',
    price: '₹19,800',
    gemstone: 'Mixed Gemstones',
    metal: 'Mixed Metal',
    tag: 'Bundle',
    gradient: 'linear-gradient(135deg, #ffe9f3 0%, #fce3ff 45%, #fdf0ff 100%)',
    image: '/images/neck6.jpeg',
  },
  {
    name: 'Atelier Bar Necklace',
    description: 'Hand-engraved bar with complimentary monogramming.',
    price: '₹11,800',
    gemstone: 'Polished Granite',
    metal: 'Sterling Silver',
    tag: 'Personalise',
    gradient: 'linear-gradient(135deg, #edf7ff 0%, #dff0ff 45%, #f2f9ff 100%)',
    image: '/images/neck3.jpeg',
  },
];

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
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <article key={product.name} className={styles.productCard}>
                <div className={styles.productVisual} style={{ backgroundImage: product.gradient }}>
                  <span className={styles.productTag}>{product.tag}</span>
                  <div className={styles.productMetal}>{product.metal}</div>
                  <div className={styles.productImageWrapper}>
                    <Image
                      src={product.image}
                      alt={`${product.name} necklace`}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className={styles.productImage}
                    />
                  </div>
                </div>
                <div className={styles.productContent}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.productDetails}>
                    <span>{product.gemstone}</span>
                    <span>{product.price}</span>
                  </div>
                  <button type="button" className={styles.productButton}>
                    Quick add
                  </button>
                </div>
              </article>
            ))}
          </div>
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
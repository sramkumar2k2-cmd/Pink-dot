import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
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

const products = [
  {
    name: 'Muse Charm Chain',
    description: 'Petite talismans layered along a rolo chain for sound and sparkle.',
    price: '₹18,500',
    detail: '18k blush vermeil',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #ffe9f1 0%, #ffdbe9 45%, #ffeef5 100%)',
    image: '/images/bracelets1.jpeg',
  },
  {
    name: 'Aster Cuff',
    description: 'Sculpted cuff with starlight engraving and a satin interior finish.',
    price: '₹21,000',
    detail: 'Recycled Sterling Silver',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #edf3ff 0%, #dfe9ff 50%, #eef4ff 100%)',
    image: '/images/bracelets2.jpeg',
  },
  {
    name: 'Luna Pearl Duo',
    description: 'Freshwater pearls paired with silk cord for effortless layering.',
    price: '₹16,800',
    detail: 'Freshwater Pearl',
    tag: 'Set of 2',
    gradient: 'linear-gradient(135deg, #fdf3d7 0%, #ffe9bf 50%, #fff3de 100%)',
    image: '/images/bracelets4.jpeg',
  },
  {
    name: 'Aurora Tidal Bangle',
    description: 'Wave-shaped bangle with hand-cut mother-of-pearl inlay.',
    price: '₹24,800',
    detail: 'Mother-of-Pearl',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #eafaf6 0%, #d4f3ec 45%, #eefcf8 100%)',
    image: '/images/bracelets5.jpeg',
  },
  {
    name: 'Seraphine Wrap',
    description: 'Double wrap leather bracelet with gleaming magnetic clasp.',
    price: '₹14,200',
    detail: 'Italian Nappa Leather',
    tag: 'Editor’s pick',
    gradient: 'linear-gradient(135deg, #fff1ea 0%, #ffd9cb 50%, #ffe8dc 100%)',
    image: '/images/bracelets2.jpeg',
  },
  {
    name: 'Celestia Link Set',
    description: 'Two stacking link bracelets with removable moonlit charms.',
    price: '₹27,500',
    detail: 'Mixed Metal',
    tag: 'Bundle',
    gradient: 'linear-gradient(135deg, #f3f6ff 0%, #e7edff 50%, #f5f8ff 100%)',
    image: '/images/bracelets1.jpeg',
  },
];

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
          { label: 'Find your fit', href: '/support/size-guide', variant: 'ghost' },
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
              <Link href="/collections/limited-edition" className={styles.highlightLink}>
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
              <article key={product.name} className={styles.productCard}>
                <div className={styles.productVisual} style={{ backgroundImage: product.gradient }}>
                  <span className={styles.productTag}>{product.tag}</span>
                  <div className={styles.productAccent}>{product.detail}</div>
                  <div className={styles.productImageWrapper}>
                    <Image
                      src={product.image}
                      alt={`${product.name} bracelet`}
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
                    <span>{product.detail}</span>
                    <span>{product.price}</span>
                  </div>
                  <button type="button" className={styles.productButton}>
                    Add to cart
                  </button>
                </div>
              </article>
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
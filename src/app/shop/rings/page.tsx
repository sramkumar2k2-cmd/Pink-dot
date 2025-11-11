import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import styles from './page.module.css';

const heroHighlights = [
  'Conflict-free gemstones curated in Jaipur & Antwerp',
  'Hand-set pavé under magnification for seamless sparkle',
  'Lifetime resizing and complimentary annual polishing',
];

const heroSpotlight = {
  badge: 'Stylist favourite',
  name: 'Nova Crown Band',
  description:
    'Graduated baguettes crowned with a mirrored under-gallery so the light dances with every gesture.',
  image: '/images/ring1.jpeg',
  imageAlt: 'Nova Crown Band ring resting on velvet ribbon',
  meta: ['₹46,500', 'Ships in 48hrs'],
  swatches: ['Artisan pavé', 'Warm champagne sheen', 'Sculpted under-gallery'],
};

const bestSeller = {
  name: 'Celestial Halo Ring',
  description:
    'A luminous halo of micro pavé frames a mirror-cut centre stone, engineered to catch every glint of light.',
  price: '₹72,000',
  features: ['1.2ct equivalent brilliance', 'Recycled warm blush alloy', 'Limited 250-piece run'],
  image: '/images/ring3.jpeg',
};

const products = [
  {
    name: 'Nova Crown Band',
    description: 'Alternating baguette and brilliant diamonds for a crown of light.',
    price: '₹46,500',
    stone: 'FG/VS diamonds',
    metal: 'Warm blush alloy',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #fdf3d2 0%, #ffe7bb 50%, #fef1d9 100%)',
    image: '/images/ring1.jpeg',
  },
  {
    name: 'Solstice Signet',
    description: 'Satin-finished oval signet with hand-applied starburst engraving.',
    price: '₹39,800',
    stone: 'Champagne diamond',
    metal: 'Blush-tone vermeil',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #ffe9dc 0%, #ffd6c7 50%, #ffe4d4 100%)',
    image: '/images/ring2.jpeg',
  },
  {
    name: 'Luna Stacking Trio',
    description: 'Three delicate bands designed to layer and flex with your mood.',
    price: '₹28,500',
    stone: 'Moonstone cabochon',
    metal: 'Vermeil & Platinum',
    tag: 'Stack of 3',
    gradient: 'linear-gradient(135deg, #eaf5ff 0%, #dfefff 50%, #f2f8ff 100%)',
    image: '/images/ring4.jpeg',
  },
  {
    name: 'Orion Toi et Moi',
    description: 'Twin pear-cut sapphires meeting in a sculpted bypass shank.',
    price: '₹61,200',
    stone: 'Blue sapphire',
    metal: 'Platinum',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #e9f6ff 0%, #d7ebff 50%, #eef6ff 100%)',
    image: '/images/ring5.jpeg',
  },
  {
    name: 'Radiant Pavé Band',
    description: 'Fifteen hand-set stones with invisible setting for seamless shine.',
    price: '₹52,800',
    stone: 'Lab-grown diamond',
    metal: 'Bright palladium finish',
    tag: 'Editor’s pick',
    gradient: 'linear-gradient(135deg, #f3f7fb 0%, #e6edf6 50%, #f6f9fd 100%)',
    image: '/images/ring3.jpeg',
  },
  {
    name: 'Aurora Heirloom',
    description: 'Vintage-inspired basket with milgrain halo and hidden diamond collar.',
    price: '₹84,000',
    stone: 'Morganite',
    metal: 'Blush alloy',
    tag: 'Heritage',
    gradient: 'linear-gradient(135deg, #ffeef5 0%, #ffdbe9 45%, #fff3f8 100%)',
    image: '/images/ring2.jpeg',
  },
];

const craftsmanshipHighlights = [
  'Every prong is polished by hand to a mirror-finish for a comfortable fit.',
  'Our metals are 100% recycled and alloyed in small batches for richer tone.',
  'We laser-inscribe each ring with a unique serial for authenticity.',
];

export default function RingsPage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Ring Atelier"
        title="Rings that frame every vow, victory, and everyday sparkle"
        subtitle="Discover radiant solitaires, sculptural stacks, and personalised signets—each crafted to become the jewel box pieces you reach for decades from now."
        backgroundImage="/images/ring5.jpeg"
        actions={[
          { label: 'Shop all rings', href: '/shop/rings' },
          { label: 'Find your ring size', href: '/support/size-guide', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(28, 21, 30, 0.62), rgba(91, 60, 74, 0.3))"
        glowColors={{
          primary: 'rgba(255, 216, 180, 0.75)',
          secondary: 'rgba(204, 154, 43, 0.55)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <section className={styles.highlightSection}>
          <div className={styles.highlightVisual}>
            <Image
              src={bestSeller.image}
              alt="Celestial Halo Ring close up"
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
                View limited release
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.collectionSection}>
          <div className={styles.sectionHeading}>
            <h2>Sculpted to stack & shine</h2>
            <p>Piece together an intentional stack, or let a single statement steal the spotlight.</p>
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
                      alt={`${product.name} ring`}
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
                    <span>{product.stone}</span>
                    <span>{product.price}</span>
                  </div>
                  <button type="button" className={styles.productButton}>
                    Reserve now
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeading}>
            <h2>The Pink Dot ring difference</h2>
            <p>Designed in London, perfected across ateliers in Jaipur, Antwerp, and Valenza.</p>
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
            <h2>Design your forever ring</h2>
            <p>
              Book a bespoke consult with our stylists to sketch a custom ring, select stones, and curate engraving details.
            </p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Schedule a consult
            </Link>
            <Link href="/support/returns" className={styles.secondaryButton}>
              Explore our care promise
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
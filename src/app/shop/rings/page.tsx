import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const filters = [
  {
    label: 'Cut',
    options: ['Round brilliant', 'Emerald', 'Oval', 'Radiant', 'Pear'],
  },
  {
    label: 'Metal',
    options: ['18k Yellow Gold', 'Platinum', '14k Rose Gold', 'White Gold', 'Mixed Metal'],
  },
  {
    label: 'Occasion',
    options: ['Engagement', 'Anniversary', 'Everyday Luxe', 'Statement', 'Stacking'],
  },
];

const heroHighlights = [
  'Conflict-free gemstones curated in Jaipur & Antwerp',
  'Hand-set pavé under magnification for seamless sparkle',
  'Lifetime resizing and complimentary annual polishing',
];

const bestSeller = {
  name: 'Celestial Halo Ring',
  description:
    'A luminous halo of micro pavé frames a mirror-cut centre stone, engineered to catch every glint of light.',
  price: '£720',
  features: ['1.2ct equivalent brilliance', '18k recycled yellow gold', 'Limited 250-piece run'],
  image: '/images/ring3.jpeg',
};

const products = [
  {
    name: 'Nova Crown Band',
    description: 'Alternating baguette and brilliant diamonds for a crown of light.',
    price: '£465',
    stone: 'FG/VS diamonds',
    metal: '18k Yellow Gold',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #fdf3d2 0%, #ffe7bb 50%, #fef1d9 100%)',
    image: '/images/ring1.jpeg',
  },
  {
    name: 'Solstice Signet',
    description: 'Satin-finished oval signet with hand-applied starburst engraving.',
    price: '£398',
    stone: 'Champagne diamond',
    metal: '14k Rose Gold',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #ffe9dc 0%, #ffd6c7 50%, #ffe4d4 100%)',
    image: '/images/ring2.jpeg',
  },
  {
    name: 'Luna Stacking Trio',
    description: 'Three delicate bands designed to layer and flex with your mood.',
    price: '£285',
    stone: 'Moonstone cabochon',
    metal: 'Vermeil & Platinum',
    tag: 'Stack of 3',
    gradient: 'linear-gradient(135deg, #eaf5ff 0%, #dfefff 50%, #f2f8ff 100%)',
    image: '/images/ring4.jpeg',
  },
  {
    name: 'Orion Toi et Moi',
    description: 'Twin pear-cut sapphires meeting in a sculpted bypass shank.',
    price: '£612',
    stone: 'Blue sapphire',
    metal: 'Platinum',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #e9f6ff 0%, #d7ebff 50%, #eef6ff 100%)',
    image: '/images/ring5.jpeg',
  },
  {
    name: 'Radiant Pavé Band',
    description: 'Fifteen hand-set stones with invisible setting for seamless shine.',
    price: '£528',
    stone: 'Lab-grown diamond',
    metal: '18k White Gold',
    tag: 'Editor’s pick',
    gradient: 'linear-gradient(135deg, #f3f7fb 0%, #e6edf6 50%, #f6f9fd 100%)',
    image: '/images/ring3.jpeg',
  },
  {
    name: 'Aurora Heirloom',
    description: 'Vintage-inspired basket with milgrain halo and hidden diamond collar.',
    price: '£840',
    stone: 'Morganite',
    metal: '18k Rose Gold',
    tag: 'Heritage',
    gradient: 'linear-gradient(135deg, #ffeef5 0%, #ffdbe9 45%, #fff3f8 100%)',
    image: '/images/ring2.jpeg',
  },
];

const craftsmanshipHighlights = [
  'Every prong is polished by hand to a mirror-finish for a comfortable fit.',
  'Our gold is 100% recycled and alloyed in small batches for richer tone.',
  'We laser-inscribe each ring with a unique serial for authenticity.',
];

export default function RingsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Ring Atelier</span>
          <h1 className={styles.heroTitle}>Rings that frame every vow, victory, and everyday sparkle</h1>
          <p className={styles.heroSubtitle}>
            Discover radiant solitaires, sculptural stacks, and personalised signets—each crafted to become the jewel
            box pieces you reach for decades from now.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop/rings" className={styles.primaryButton}>
              Shop all rings
            </Link>
            <Link href="/support/size-guide" className={styles.secondaryButton}>
              Find your ring size
            </Link>
          </div>
          <ul className={styles.heroHighlights}>
            {heroHighlights.map((highlight) => (
              <li key={highlight}>
                <span className={styles.highlightIcon} />
                {highlight}
              </li>
            ))}
          </ul>
        </div>
        <div className={styles.heroShowcase}>
          <div className={styles.heroCard}>
            <div className={styles.heroBadge}>Stylist favourite</div>
            <h2 className={styles.heroCardName}>Nova Crown Band</h2>
            <p className={styles.heroCardDescription}>
              Graduated baguettes crowned with a mirrored under-gallery so the light dances with every gesture.
            </p>
            <div className={styles.heroCardMeta}>
              <span>£465</span>
              <span>Ships in 48hrs</span>
            </div>
            <div className={styles.heroCardImage}>
              <Image
                src="/images/ring1.jpeg"
                alt="Nova Crown Band ring resting on velvet ribbon"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                priority
                className={styles.heroCardPhoto}
              />
            </div>
          </div>
          <div className={styles.heroSwatch}>
            <span>Artisan pavé</span>
            <span>Warm champagne gold</span>
            <span>Sculpted under-gallery</span>
          </div>
        </div>
      </section>

      <section className={styles.filterSection}>
        <div className={styles.sectionHeading}>
          <h2>Curate by feeling</h2>
          <p>Select the energy you want to carry and let our stylists refine the details for you.</p>
        </div>
        <div className={styles.filterGroups}>
          {filters.map((group) => (
            <div key={group.label} className={styles.filterGroup}>
              <span className={styles.filterLabel}>{group.label}</span>
              <div className={styles.filterChips}>
                {group.options.map((option, index) => (
                  <button
                    key={option}
                    type="button"
                    className={`${styles.filterChip} ${index === 0 ? styles.filterChipActive : ''}`}
                    aria-pressed={index === 0}
                  >
                    {option}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

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
  );
}
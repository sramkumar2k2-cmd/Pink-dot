import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const filters = [
  {
    label: 'Style',
    options: ['Hoops', 'Studs', 'Drops', 'Ear Climbers', 'Ear Cuffs'],
  },
  {
    label: 'Gemstone',
    options: ['Pearl', 'Diamond', 'Quartz', 'Sapphire', 'Opal'],
  },
  {
    label: 'Occasion',
    options: ['Everyday', 'Evening', 'Wedding', 'Workday', 'Festival'],
  },
];

const heroHighlights = [
  'Featherlight engineering for all-day comfort',
  'Hypoallergenic posts crafted with surgical steel',
  'Hand-set stones with mirror polish for extra brilliance',
];

const spotlight = {
  name: 'Aurora Cascade Drops',
  description:
    'A trio of iridescent stones suspended in a shimmering cascade, designed to catch the light with every turn of your head.',
  price: '£215',
  features: ['Moonstone & topaz', '14k rose gold vermeil', 'Hand-balanced for comfort'],
  image: '/images/earrings3.jpeg',
};

const products = [
  {
    name: 'Luna Glow Studs',
    description: 'Gradient pavé studs inspired by moonlit horizons.',
    price: '£128',
    detail: 'Moonstone',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #f1f5ff 0%, #e1e8ff 50%, #f3f7ff 100%)',
    image: '/images/earrings1.jpeg',
  },
  {
    name: 'Solstice Hoops',
    description: 'Hand-polished hoops with removable gemstone charms.',
    price: '£178',
    detail: 'Citrine',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #fff4d9 0%, #ffe7b5 50%, #fff2d6 100%)',
    image: '/images/earrings2.jpeg',
  },
  {
    name: 'Nova Ear Climbers',
    description: 'Celestial ear climbers with starlit pavé constellations.',
    price: '£162',
    detail: 'Lab Diamond',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #edfaff 0%, #daf1ff 45%, #eef9ff 100%)',
    image: '/images/earrings4.jpeg',
  },
  {
    name: 'Opaline Chandeliers',
    description: 'Ornate chandelier earrings with playful fringe movement.',
    price: '£240',
    detail: 'Opal',
    tag: 'Statement',
    gradient: 'linear-gradient(135deg, #ffeef5 0%, #ffd7ea 45%, #ffe9f2 100%)',
    image: '/images/earrings5.jpeg',
  },
  {
    name: 'Muse Ear Cuff Duo',
    description: 'Two sculpted cuffs with satin finish for effortless stacking.',
    price: '£98',
    detail: '18k Gold Vermeil',
    tag: 'Set of 2',
    gradient: 'linear-gradient(135deg, #fff5ec 0%, #ffe1cc 50%, #ffefe0 100%)',
    image: '/images/earrings2.jpeg',
  },
  {
    name: 'Seraph Wing Studs',
    description: 'Wing-shaped studs with luminous pearl centres.',
    price: '£152',
    detail: 'Freshwater Pearl',
    tag: 'Editor’s pick',
    gradient: 'linear-gradient(135deg, #f3f8ff 0%, #e7f1ff 50%, #f5f9ff 100%)',
    image: '/images/earrings1.jpeg',
  },
];

const craftsmanshipHighlights = [
  'Every hinge is tested 500 cycles to ensure secure closures that never pinch.',
  'We hand-buff each post and backing for a seamless feel against the skin.',
  'Ear stacks curated virtually—book a styling call to tailor your mix.',
];

export default function EarringsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Earring Studio</span>
          <h1 className={styles.heroTitle}>Earrings that dance with every expression</h1>
          <p className={styles.heroSubtitle}>
            From whisper-light studs to sculptural chandeliers, discover silhouettes that illuminate your face and carry
            your stories skyward.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop/earrings" className={styles.primaryButton}>
              Shop all earrings
            </Link>
            <Link href="/support/size-guide" className={styles.secondaryButton}>
              Styling tips
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
            <h2 className={styles.heroCardName}>Solstice Hoops</h2>
            <p className={styles.heroCardDescription}>
              Removable charms and polished hoops, balancing statement shimmer with everyday ease.
            </p>
            <div className={styles.heroCardMeta}>
              <span>£178</span>
              <span>Ships in 24hrs</span>
            </div>
            <div className={styles.heroCardImage}>
              <Image
                src="/images/earrings2.jpeg"
                alt="Solstice hoop earrings resting on silk fabric"
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                priority
                className={styles.heroCardPhoto}
              />
            </div>
          </div>
          <div className={styles.heroSwatch}>
            <span>Featherlight</span>
            <span>Hypoallergenic</span>
            <span>Convertible charms</span>
          </div>
        </div>
      </section>

      <section className={styles.filterSection}>
        <div className={styles.sectionHeading}>
          <h2>Curate by mood</h2>
          <p>Find your perfect pair—start with the silhouette, then play with gemstones and finishes.</p>
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
            <article key={product.name} className={styles.productCard}>
              <div className={styles.productVisual} style={{ backgroundImage: product.gradient }}>
                <span className={styles.productTag}>{product.tag}</span>
                <div className={styles.productAccent}>{product.detail}</div>
                <div className={styles.productImageWrapper}>
                  <Image
                    src={product.image}
                    alt={`${product.name} earrings`}
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
  );
}
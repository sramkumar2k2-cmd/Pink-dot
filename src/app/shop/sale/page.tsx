import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const saleHighlights = [
  'Ends Sunday midnight BST',
  'Complimentary gift wrap on all sale orders',
  'Final few pieces—no restocks once they sparkle out',
];

const heroDeal = {
  name: 'Celestial Halo Ring',
  was: '£720',
  now: '£576',
  image: '/images/ring3.jpeg',
  description: 'Our signature halo ring with micro pavé brilliance—25% off this weekend only.',
  perks: ['Lifetime replating included', 'Free resizing within 60 days', 'Ships within 48hrs'],
};

const saleProducts = [
  {
    name: 'Luna Cascade Collar',
    category: 'Necklace',
    was: '£185',
    now: '£148',
    image: '/images/neck3.jpeg',
    badge: 'Top pick',
  },
  {
    name: 'Muse Charm Chain',
    category: 'Bracelet',
    was: '£185',
    now: '£139',
    image: '/images/bracelets1.jpeg',
    badge: 'Extra 20%',
  },
  {
    name: 'Solstice Hoops',
    category: 'Earrings',
    was: '£178',
    now: '£134',
    image: '/images/earrings2.jpeg',
    badge: 'Just added',
  },
  {
    name: 'Aurora Heirloom',
    category: 'Ring',
    was: '£840',
    now: '£630',
    image: '/images/ring2.jpeg',
    badge: 'Limited',
  },
  {
    name: 'Nova Ear Climbers',
    category: 'Earrings',
    was: '£162',
    now: '£122',
    image: '/images/earrings4.jpeg',
    badge: '40% off',
  },
  {
    name: 'Serenade Tennis Bracelet',
    category: 'Bracelet',
    was: '£320',
    now: '£256',
    image: '/images/bracelets3.jpeg',
    badge: 'Last 12',
  },
];

const bundles = [
  {
    name: 'Layered Glow Set',
    description: 'Aurora Lariat + Muse Charm Chain + Luna Glow Studs',
    price: '£399',
    value: 'Value £531',
    image: '/images/neck2.jpeg',
  },
  {
    name: 'Evening Muse Kit',
    description: 'Opaline Chandeliers + Celestial Halo Ring + Aster Cuff',
    price: '£598',
    value: 'Value £792',
    image: '/images/earrings5.jpeg',
  },
];

export default function SalePage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Archive Sale</span>
          <h1 className={styles.heroTitle}>Signature pieces, shimmered down</h1>
          <p className={styles.heroSubtitle}>
            Last chance to collect limited-run jewels before they retire to the archive. Prices marked down up to 30%—no
            code needed.
          </p>
          <ul className={styles.heroHighlights}>
            {saleHighlights.map((highlight) => (
              <li key={highlight}>
                <span className={styles.highlightIcon} />
                {highlight}
              </li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link href="/shop/all-jewellery" className={styles.primaryButton}>
              Shop all sale
            </Link>
            <Link href="/collections/limited-edition" className={styles.secondaryButton}>
              See limited editions
            </Link>
          </div>
        </div>
        <div className={styles.heroDeal}>
          <div className={styles.dealCard}>
            <span className={styles.dealBadge}>Weekend deal</span>
            <div className={styles.dealImage}>
              <Image
                src={heroDeal.image}
                alt={`${heroDeal.name} sale highlight`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                priority
                className={styles.dealPhoto}
              />
            </div>
            <h2>{heroDeal.name}</h2>
            <p>{heroDeal.description}</p>
            <div className={styles.dealPricing}>
              <span className={styles.wasPrice}>{heroDeal.was}</span>
              <span className={styles.nowPrice}>{heroDeal.now}</span>
            </div>
            <ul className={styles.dealPerks}>
              {heroDeal.perks.map((perk) => (
                <li key={perk}>{perk}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.saleSection}>
        <div className={styles.sectionHeading}>
          <h2>Steals before they’re gone</h2>
          <p>Once these pieces sell through, they return to the archive. Elevate your stack while the sparkle lasts.</p>
        </div>
        <div className={styles.productsGrid}>
          {saleProducts.map((product) => (
            <article key={product.name} className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className={styles.productImage}
                />
                <span className={styles.productBadge}>{product.badge}</span>
              </div>
              <div className={styles.productContent}>
                <span className={styles.productCategory}>{product.category}</span>
                <h3>{product.name}</h3>
                <div className={styles.productPricing}>
                  <span className={styles.wasPrice}>{product.was}</span>
                  <span className={styles.nowPrice}>{product.now}</span>
                </div>
                <button type="button">Add to basket</button>
              </div>
            </article>
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
  );
}
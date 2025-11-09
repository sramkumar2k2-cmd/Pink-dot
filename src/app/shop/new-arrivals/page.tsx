import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const spotlight = {
  name: 'Stella Orbit Pendant',
  description:
    'A radiant orb of polished mother-of-pearl, set within a rotating ring of pavé stars for cosmic movement.',
  price: '£198',
  image: '/images/neck4.jpeg',
  features: ['Limited 150-piece release', 'Ships with layered chain set', 'Includes engraving token'],
};

const arrivals = [
  {
    name: 'Aurora Tidal Bangle',
    category: 'Bracelet',
    description: 'Wave-shaped bangle with glistening abalone inlay.',
    price: '£248',
    image: '/images/bracelets5.jpeg',
    badge: 'Fresh drop',
  },
  {
    name: 'Celestine Ear Thread',
    category: 'Earrings',
    description: 'Thread-through earrings with crystal dew drops.',
    price: '£135',
    image: '/images/earrings4.jpeg',
    badge: 'Online exclusive',
  },
  {
    name: 'Nova Crown Band',
    category: 'Ring',
    description: 'New champagne gold variation with baguette brilliance.',
    price: '£472',
    image: '/images/ring2.jpeg',
    badge: 'New finish',
  },
  {
    name: 'Elysian Collar',
    category: 'Necklace',
    description: 'Hand-strung pearls anchored by a sculptural clasp.',
    price: '£220',
    image: '/images/neck2.jpeg',
    badge: 'Limited',
  },
  {
    name: 'Muse Stacking Trio',
    category: 'Ring',
    description: 'Three satin-finish bands made for stacking stories.',
    price: '£285',
    image: '/images/ring4.jpeg',
    badge: 'Bundle',
  },
  {
    name: 'Luna Glow Anklet',
    category: 'Bracelet',
    description: 'Delicate anklet with moonlit charms for summer shimmer.',
    price: '£118',
    image: '/images/bracelets4.jpeg',
    badge: 'Seasonal',
  },
];

const launchHighlights = [
  'Weekly studio drops every Thursday at 7pm BST',
  'Early access for Pink Dot insiders and stylist clients',
  'Each launch includes personalised styling tips from our team',
];

const capsules = [
  {
    name: 'Sunrise Palette',
    image: '/images/neck5.jpeg',
    description: 'A warm medley of citrine, peach moonstone, and polished vermeil.',
    href: '/collections/summer-collection',
  },
  {
    name: 'Moonlit Reverie',
    image: '/images/earrings1.jpeg',
    description: 'Iridescent opals and lab-grown diamonds that glow after dusk.',
    href: '/collections/celestial-dreams',
  },
  {
    name: 'City Siren',
    image: '/images/ring5.jpeg',
    description: 'Architectural silhouettes and satin finishes for statement nights.',
    href: '/collections/art-deco-revival',
  },
];

export default function NewArrivalsPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroAura} />
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Fresh from the studio</span>
          <h1 className={styles.heroTitle}>New arrivals to start the next chapter</h1>
          <p className={styles.heroSubtitle}>
            Meet the jewels that just landed on our styling desk—limited drops with sculptural silhouettes and luminous
            stones.
          </p>
          <div className={styles.heroHighlights}>
            {launchHighlights.map((highlight) => (
              <span key={highlight}>
                <span className={styles.highlightIcon} />
                {highlight}
              </span>
            ))}
          </div>
          <div className={styles.heroActions}>
            <Link href="/shop/all-jewellery" className={styles.primaryButton}>
              Shop entire edit
            </Link>
            <Link href="/blog" className={styles.secondaryButton}>
              Read launch notes
            </Link>
          </div>
        </div>
        <div className={styles.heroSpotlight}>
          <div className={styles.spotlightCard}>
            <span className={styles.spotlightBadge}>Studio spotlight</span>
            <div className={styles.spotlightImage}>
              <Image
                src={spotlight.image}
                alt={`${spotlight.name} new arrival`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                priority
                className={styles.spotlightPhoto}
              />
            </div>
            <h2>{spotlight.name}</h2>
            <p>{spotlight.description}</p>
            <div className={styles.spotlightMeta}>
              <span>{spotlight.price}</span>
              <Link href="/collections/limited-edition">Limited drop</Link>
            </div>
            <ul className={styles.spotlightFeatures}>
              {spotlight.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.arrivalsSection}>
        <div className={styles.sectionHeading}>
          <h2>Just in—this week’s jewels</h2>
          <p>These pieces were crafted in limited runs. Add them to your collection before the next drop arrives.</p>
        </div>
        <div className={styles.arrivalsGrid}>
          {arrivals.map((item) => (
            <article key={item.name} className={styles.arrivalCard}>
              <div className={styles.arrivalImageWrapper}>
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className={styles.arrivalImage}
                />
                <span className={styles.arrivalBadge}>{item.badge}</span>
              </div>
              <div className={styles.arrivalContent}>
                <span className={styles.arrivalCategory}>{item.category}</span>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <div className={styles.arrivalFooter}>
                  <span>{item.price}</span>
                  <button type="button">Add to bag</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.capsuleSection}>
        <div className={styles.sectionHeading}>
          <h2>Capsules launching next</h2>
          <p>Preview upcoming palettes and reserve your favourites before the official release.</p>
        </div>
        <div className={styles.capsuleGrid}>
          {capsules.map((capsule) => (
            <article key={capsule.name} className={styles.capsuleCard}>
              <div className={styles.capsuleImageWrapper}>
                <Image
                  src={capsule.image}
                  alt={capsule.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 260px"
                  className={styles.capsuleImage}
                />
              </div>
              <div className={styles.capsuleContent}>
                <span className={styles.capsuleLabel}>Coming soon</span>
                <h3>{capsule.name}</h3>
                <p>{capsule.description}</p>
                <Link href={capsule.href}>Join waitlist</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div>
          <h2>Never miss a drop</h2>
          <p>Subscribe to Pink Dot Moments for early access to studio releases, styling sessions, and exclusive previews.</p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryButton}>
            Subscribe
          </Link>
          <Link href="/collections" className={styles.secondaryButton}>
            Explore collections
          </Link>
      </div>
      </section>
    </main>
  );
}
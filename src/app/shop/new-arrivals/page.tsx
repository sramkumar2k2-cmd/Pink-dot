import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import styles from './page.module.css';

const spotlight = {
  name: 'Stella Orbit Pendant',
  description:
    'A radiant orb of polished mother-of-pearl, set within a rotating ring of pavé stars for cosmic movement.',
  price: '₹19,800',
  image: '/images/neck4.jpeg',
  features: ['Limited 150-piece release', 'Ships with layered chain set', 'Includes engraving token'],
};

const heroSpotlight = {
  badge: 'Studio spotlight',
  name: spotlight.name,
  description: spotlight.description,
  image: spotlight.image,
  imageAlt: `${spotlight.name} new arrival`,
  meta: [spotlight.price, 'Limited drop'],
  swatches: spotlight.features,
};

const arrivals = [
  {
    name: 'Aurora Tidal Bangle',
    category: 'Bracelet',
    description: 'Wave-shaped bangle with glistening abalone inlay.',
    price: '₹24,800',
    image: '/images/bracelets5.jpeg',
    badge: 'Fresh drop',
  },
  {
    name: 'Celestine Ear Thread',
    category: 'Earrings',
    description: 'Thread-through earrings with crystal dew drops.',
    price: '₹13,500',
    image: '/images/earrings4.jpeg',
    badge: 'Online exclusive',
  },
  {
    name: 'Nova Crown Band',
    category: 'Ring',
    description: 'New champagne sheen variation with baguette brilliance.',
    price: '₹47,200',
    image: '/images/ring2.jpeg',
    badge: 'New finish',
  },
  {
    name: 'Elysian Collar',
    category: 'Necklace',
    description: 'Hand-strung pearls anchored by a sculptural clasp.',
    price: '₹22,000',
    image: '/images/neck2.jpeg',
    badge: 'Limited',
  },
  {
    name: 'Muse Stacking Trio',
    category: 'Ring',
    description: 'Three satin-finish bands made for stacking stories.',
    price: '₹28,500',
    image: '/images/ring4.jpeg',
    badge: 'Bundle',
  },
  {
    name: 'Luna Glow Anklet',
    category: 'Bracelet',
    description: 'Delicate anklet with moonlit charms for summer shimmer.',
    price: '₹11,800',
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
    <div className={styles.page}>
      <AnimatedHero
        tag="Fresh from the studio"
        title="New arrivals to start the next chapter"
        subtitle="Meet the jewels that just landed on our styling desk—limited drops with sculptural silhouettes and luminous stones."
        backgroundImage="/images/neck5.jpeg"
        actions={[
          { label: 'Shop entire edit', href: '/shop/all-jewellery' },
          { label: 'Read launch notes', href: '/blog', variant: 'ghost' },
        ]}
        highlights={launchHighlights}
        overlayGradient="linear-gradient(135deg, rgba(24, 18, 28, 0.62), rgba(92, 68, 120, 0.28))"
        glowColors={{
          primary: 'rgba(255, 208, 220, 0.75)',
          secondary: 'rgba(135, 105, 220, 0.52)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
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
    </div>
  );
}
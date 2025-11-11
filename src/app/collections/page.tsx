import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import styles from './page.module.css';

const heroHighlights = [
  'Mindfully designed in London, crafted by heritage ateliers',
  'Limited runs with traceable gemstones and recycled metals',
  'Complimentary styling sessions to curate your signature stack',
];

const heroSpotlight = {
  badge: 'Featured capsule',
  name: 'Celestial Dreamscape',
  description: 'Moonstone halo necklace, orbit climber earrings, and shimmer cuffs curated for twilight gatherings.',
  image: '/images/neck2.jpeg',
  imageAlt: 'Celestial Dreamscape capsule trio',
  meta: ['₹38,500 curated trio', 'Ships in 48hrs'],
  swatches: ['Moonlit sheen', 'Twilight blush', 'Stellar clasp'],
};

const featuredCollections = [
  {
    name: 'Celestial Dreams',
    description:
      'A luminous ode to moonlit nights—ethereal gemstones, halo details, and shimmering silhouettes to light up every celebration.',
    image: '/images/neck3.jpeg',
    href: '/collections/celestial-dreams',
    badge: 'Bestselling edit',
  },
  {
    name: 'Art Deco Revival',
    description:
      'Architectural lines, mirrored surfaces, and bold geometry inspired by the glamour of the Roaring Twenties.',
    image: '/images/ring3.jpeg',
    href: '/collections/art-deco-revival',
    badge: 'Limited edition',
  },
];

const capsulePreviews = [
  {
    name: 'Minimalist Threads',
    description:
      'Sleek silhouettes and whisper-thin chains with a modern, everyday sensibility. Perfect for layering lightly.',
    image: '/images/bracelets4.jpeg',
    href: '/collections/minimalist-threads',
  },
  {
    name: 'Summer Collection',
    description:
      'Sunlit gemstones, ocean-hued enamels, and textures that echo summer escapades from dawn to dusk.',
    image: '/images/neck6.jpeg',
    href: '/collections/summer-collection',
  },
  {
    name: 'Limited Edition Studio',
    description:
      'Small-batch treasures co-created with our ateliers—each piece individually numbered with a signature card.',
    image: '/images/earrings4.jpeg',
    href: '/collections/limited-edition',
  },
];

export default function CollectionsPage() {
  return (
    <>
      <AnimatedHero
        tag="Pink Dot Collections"
        title="Curated worlds of shimmer, tailored to every chapter"
        subtitle="Dive into our signature edits—each collection brimming with handcrafted details, thoughtful stories, and the glow of artistry passed through generations."
        backgroundImage="/images/neck6.jpeg"
        backgroundAlt="Pink Dot collection showcase"
        actions={[
          { label: 'Shop all jewellery', href: '/shop/all-jewellery' },
          { label: 'Book a styling consult', href: '/contact', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(120deg, rgba(22, 16, 32, 0.75), rgba(92, 48, 96, 0.42))"
        glowColors={{ primary: 'rgba(248, 210, 255, 0.7)', secondary: 'rgba(188, 142, 255, 0.55)' }}
        spotlight={heroSpotlight}
        theme="collections-lumina"
        backgroundFilter="brightness(0.74) saturate(1.08)"
        sparkleStyle={{
          gradient: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(214, 182, 255, 0.45) 70%)',
          shadow: '0 0 24px rgba(212, 182, 255, 0.5)',
          size: '16px',
        }}
      />

      <main className={styles.page}>
        <section className={styles.featuredSection}>
          <div className={styles.sectionHeading}>
            <h2>Signature edits</h2>
            <p>Our community favourites—restocked in limited runs and accompanied by bespoke styling notes.</p>
          </div>
          <div className={styles.featuredGrid}>
            {featuredCollections.map((collection) => (
              <article key={collection.name} className={styles.featuredCard}>
                <div className={styles.featuredImage}>
                  <Image
                    src={collection.image}
                    alt={collection.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 320px"
                    className={styles.cardImage}
                  />
                  <span className={styles.featuredBadge}>{collection.badge}</span>
                </div>
                <div className={styles.featuredContent}>
                  <h3>{collection.name}</h3>
                  <p>{collection.description}</p>
                  <Link href={collection.href}>Explore collection</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.capsulesSection}>
          <div className={styles.sectionHeading}>
            <h2>Capsules to fall in love with</h2>
            <p>Each capsule is crafted around a mood—discover the palette that feels most like you.</p>
          </div>
          <div className={styles.capsulesGrid}>
            {capsulePreviews.map((capsule) => (
              <article key={capsule.name} className={styles.capsuleCard}>
                <div className={styles.capsuleVisual}>
                  <Image
                    src={capsule.image}
                    alt={capsule.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 280px"
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.capsuleContent}>
                  <span>Now available</span>
                  <h3>{capsule.name}</h3>
                  <p>{capsule.description}</p>
                  <Link href={capsule.href}>Shop the capsule</Link>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.ctaBanner}>
          <div>
            <h2>Need help building your stack?</h2>
            <p>Share a few details about your style and we’ll curate three collection pieces tailored just for you.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Start styling consult
            </Link>
            <Link href="/support/size-guide" className={styles.secondaryButton}>
              View care & sizing
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

export const dynamic = 'force-static';
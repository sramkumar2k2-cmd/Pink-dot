import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const heroHighlights = [
  'Mindfully designed in London, crafted by heritage ateliers',
  'Limited runs with traceable gemstones and recycled metals',
  'Complimentary styling sessions to curate your signature stack',
];

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
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroDecorations}>
          <span className={`${styles.heroOrb} ${styles.heroOrbOne}`} />
          <span className={`${styles.heroOrb} ${styles.heroOrbTwo}`} />
          <span className={`${styles.heroBeam} ${styles.heroBeamOne}`} />
          <span className={`${styles.heroBeam} ${styles.heroBeamTwo}`} />
          <span className={`${styles.heroSpark} ${styles.heroSparkOne}`} />
          <span className={`${styles.heroSpark} ${styles.heroSparkTwo}`} />
        </div>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Pink Dot Collections</span>
          <h1 className={styles.heroTitle}>Curated worlds of shimmer, tailored to every chapter</h1>
          <p className={styles.heroSubtitle}>
            Dive into our signature edits—each collection brimming with handcrafted details, thoughtful stories, and the
            glow of artistry passed through generations.
          </p>
          <ul className={styles.heroHighlights}>
            {heroHighlights.map((highlight) => (
              <li key={highlight}>
                <span className={styles.highlightDot} />
                {highlight}
              </li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link href="/shop/all-jewellery" className={styles.primaryButton}>
              Shop all jewellery
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              Book a styling consult
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPrimary}>
            <Image
              src="/images/neck2.jpeg"
              alt="Pink Dot collection hero imagery"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className={styles.heroImage}
              priority
            />
          </div>
          <div className={styles.heroSecondary}>
            <Image
              src="/images/bracelets1.jpeg"
              alt="Bracelet collection detail"
              fill
              sizes="(max-width: 1024px) 50vw, 200px"
              className={styles.heroImage}
            />
            <Image
              src="/images/ring4.jpeg"
              alt="Ring stack from Pink Dot collections"
              fill
              sizes="(max-width: 1024px) 50vw, 200px"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

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
  );
}

export const dynamic = 'force-static';
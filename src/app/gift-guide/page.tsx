import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const recipientGuides = [
  {
    title: 'For the romantic',
    blurb: 'Blush-toned gemstones, heart-led silhouettes, and engravable keepsakes.',
    image: '/images/neck5.jpeg',
    href: '/shop/rings',
  },
  {
    title: 'For the minimalist',
    blurb: 'Clean lines, whisper-light chains, and subtle sparkle for everyday elegance.',
    image: '/images/bracelets1.jpeg',
    href: '/shop/bracelets',
  },
  {
    title: 'For the showstopper',
    blurb: 'Statement earrings and bold rings crafted to catch the limelight.',
    image: '/images/earrings5.jpeg',
    href: '/shop/earrings',
  },
  {
    title: 'For the storyteller',
    blurb: 'Charm bracelets, locket necklaces, and bespoke engravings to keep memories close.',
    image: '/images/neck2.jpeg',
    href: '/collections/limited-edition',
  },
];

const priceEdits = [
  {
    priceRange: 'Under £150',
    pieces: ['Luna Glow Studs', 'Seren Wrap Anklet', 'Stella Orbit Charm'],
    image: '/images/earrings1.jpeg',
  },
  {
    priceRange: 'Under £300',
    pieces: ['Muse Charm Chain', 'Nova Ear Climbers', 'Celestine Ear Thread'],
    image: '/images/bracelets4.jpeg',
  },
  {
    priceRange: 'Under £500',
    pieces: ['Aurora Tidal Bangle', 'Solstice Hoops', 'Elysian Collar'],
    image: '/images/neck4.jpeg',
  },
];

const experiences = [
  {
    title: 'Bespoke engraving',
    description: 'Complimentary engraving on signet rings, lockets, and bar necklaces—hand finished in London.',
    href: '/support/returns',
  },
  {
    title: 'Virtual styling session',
    description: 'Book a 20-minute gift styling call and we’ll curate pieces to match their style and story.',
    href: '/contact',
  },
  {
    title: 'Keepsake gift wrap',
    description: 'Every order arrives in our signature blush box with ribbon, polish cloth, and handwritten note.',
    href: '/support/shipping',
  },
];

const curatedSets = [
  {
    name: 'Morning Muse Trio',
    description: 'Solstice Hoops, Muse Charm Chain, and Nova Crown Band for the everyday glow-getter.',
    price: '£520 bundle',
    image: '/images/bracelets2.jpeg',
  },
  {
    name: 'Moonlit Soirée Set',
    description: 'Opaline Chandeliers, Celestial Halo Ring, and Aurora Lariat for an evening to remember.',
    price: '£895 bundle',
    image: '/images/ring5.jpeg',
  },
];

export default function GiftGuidePage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Pink Dot Gift Guide</span>
          <h1 className={styles.heroTitle}>Gifts that sparkle with their story</h1>
          <p className={styles.heroSubtitle}>
            Discover jewellery chosen to celebrate every moment—from first milestones to golden anniversaries. Curated
            edits, bespoke services, and thoughtful finishing touches make gifting effortless.
          </p>
          <div className={styles.heroActions}>
            <Link href="/shop/all-jewellery" className={styles.primaryButton}>
              Shop all gifts
            </Link>
            <Link href="/contact" className={styles.secondaryButton}>
              Book gifting consult
            </Link>
          </div>
          <ul className={styles.heroHighlights}>
            <li>Complimentary next-day dispatch on UK orders</li>
            <li>Handwritten note and keepsake gift wrap with every piece</li>
            <li>Free exchanges until 14 January on festive gifts</li>
          </ul>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroPrimary}>
            <Image
              src="/images/neck3.jpeg"
              alt="Pink Dot gift box with necklace"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className={styles.heroImage}
              priority
            />
          </div>
          <div className={styles.heroSecondary}>
            <Image
              src="/images/ring3.jpeg"
              alt="Ring displayed in Pink Dot box"
              fill
              sizes="(max-width: 1024px) 50vw, 200px"
              className={styles.heroImage}
            />
          </div>
        </div>
      </section>

      <section className={styles.recipientSection}>
        <div className={styles.sectionHeading}>
          <h2>Guides by personality</h2>
          <p>Start with who you’re shopping for and let us offer the pieces that will light them up.</p>
        </div>
        <div className={styles.recipientGrid}>
          {recipientGuides.map((guide) => (
            <article key={guide.title} className={styles.recipientCard}>
              <div className={styles.recipientImage}>
                <Image
                  src={guide.image}
                  alt={guide.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.recipientContent}>
                <h3>{guide.title}</h3>
                <p>{guide.blurb}</p>
                <Link href={guide.href}>Explore the edit</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.priceSection}>
        <div className={styles.sectionHeading}>
          <h2>Gifts by price</h2>
          <p>Find the perfect spark within your budget—each piece ready to gift in our signature keepsake box.</p>
        </div>
        <div className={styles.priceGrid}>
          {priceEdits.map((edit) => (
            <article key={edit.priceRange} className={styles.priceCard}>
              <div className={styles.priceImage}>
                <Image
                  src={edit.image}
                  alt={`${edit.priceRange} gift ideas`}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.priceContent}>
                <span>{edit.priceRange}</span>
                <ul>
                  {edit.pieces.map((piece) => (
                    <li key={piece}>{piece}</li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.setsSection}>
        <div className={styles.sectionHeading}>
          <h2>Curated gift sets</h2>
          <p>Ready-to-gift combinations our stylists created for instant delight—limited quantities available.</p>
        </div>
        <div className={styles.setsGrid}>
          {curatedSets.map((set) => (
            <article key={set.name} className={styles.setCard}>
              <div className={styles.setImage}>
                <Image
                  src={set.image}
                  alt={set.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.cardImage}
                />
              </div>
              <div className={styles.setContent}>
                <h3>{set.name}</h3>
                <p>{set.description}</p>
                <span>{set.price}</span>
                <Link href="/shop/best-sellers">Add to basket</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.experienceSection}>
        <div className={styles.sectionHeading}>
          <h2>Finishing touches & services</h2>
          <p>Make it deeply personal with our trio of gifting experiences, complimentary with every order.</p>
        </div>
        <div className={styles.experienceGrid}>
          {experiences.map((experience) => (
            <article key={experience.title} className={styles.experienceCard}>
              <h3>{experience.title}</h3>
              <p>{experience.description}</p>
              <Link href={experience.href}>Learn more</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div>
          <h2>Not sure where to begin?</h2>
          <p>Share their style notes and we’ll handpick three ideas within your budget, complete with styling tips.</p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryButton}>
            Start gifting consult
          </Link>
          <Link href="/collections" className={styles.secondaryButton}>
            Browse collections
          </Link>
        </div>
      </section>
    </main>
  );
}

export const dynamic = 'force-static';
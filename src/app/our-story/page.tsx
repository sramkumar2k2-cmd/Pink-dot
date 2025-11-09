import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const milestones = [
  {
    year: '2014',
    title: 'Sketching in Shoreditch',
    description:
      'Our founder Amara began hand-sketching pieces in a tiny shared studio in Shoreditch, with a single workbench and a dream to create accessible luxury.',
  },
  {
    year: '2016',
    title: 'First Jaipur Atelier',
    description:
      'We partnered with a third-generation family atelier in Jaipur to bring our gemstone stories to life, prioritising slow craft and fair wages.',
  },
  {
    year: '2019',
    title: 'Sustainable Metals Pledge',
    description:
      'Committed to recycled precious metals and conflict-free stones. Every piece now includes a traceable origin card signed by the artisan team.',
  },
  {
    year: '2022',
    title: 'Pink Dot Bespoke',
    description:
      'Launched our bespoke service, inviting clients to co-create heirloom pieces with our London design house and global ateliers.',
  },
];

const values = [
  {
    title: 'Intentional design',
    description:
      'We blueprint each collection around the feelings we want you to carry—confidence, nostalgia, celebration—and obsess over every curve and clasp.',
  },
  {
    title: 'Slow craft',
    description:
      'Each jewel passes through at least eight artisan hands across Jaipur, Vicenza, and Lisbon, ensuring the finish is worthy of becoming your next heirloom.',
  },
  {
    title: 'Circular mindset',
    description:
      'Lifetime replating, resizing, and repair services keep your favourite pieces in rotation and out of the drawer.',
  },
];

const atelierLocations = [
  {
    city: 'London, UK',
    focus: 'Concept, prototypes, bespoke sketches',
    image: '/images/neck1.jpeg',
  },
  {
    city: 'Jaipur, India',
    focus: 'Gemstone cutting, stone setting, enamel work',
    image: '/images/ring4.jpeg',
  },
  {
    city: 'Vicenza, Italy',
    focus: 'Metal casting, polishing, chain weaving',
    image: '/images/bracelets5.jpeg',
  },
];

const craftsmanshipHighlights = [
  'Gemstones are cut, sorted, and matched by hand to ensure balanced light play.',
  'Each clasp is strength-tested to withstand years of dance-floor spins and daily wear.',
  'We apply three layers of plating and a final e-coat for glow that truly lasts.',
];

export default function OurStoryPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>The Pink Dot journey</span>
          <h1 className={styles.heroTitle}>Crafted for the moments you will retell forever</h1>
          <p className={styles.heroSubtitle}>
            From a single London workbench to a global atelier family, we design jewellery that keeps your stories close.
            Every collection is a love letter to slow craft, modern nostalgia, and the people who wear our pieces daily.
          </p>
          <ul className={styles.heroHighlights}>
            {craftsmanshipHighlights.map((highlight) => (
              <li key={highlight}>
                <span className={styles.heroDot} />
                {highlight}
              </li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link href="/collections" className={styles.primaryButton}>
              Explore collections
            </Link>
            <Link href="/support/size-guide" className={styles.secondaryButton}>
              Learn about our craft
            </Link>
          </div>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroImage}>
            <Image
              src="/images/earrings3.jpeg"
              alt="Pink Dot artisans setting gemstones"
              fill
              sizes="(max-width: 1024px) 100vw, 500px"
              className={styles.storyPhoto}
              priority
            />
          </div>
          <div className={styles.heroInset}>
            <Image
              src="/images/ring2.jpeg"
              alt="Close-up of Pink Dot ring design"
              fill
              sizes="(max-width: 1024px) 50vw, 220px"
              className={styles.storyPhoto}
            />
          </div>
        </div>
      </section>

      <section className={styles.timelineSection}>
        <div className={styles.sectionHeading}>
          <h2>Milestones that shaped us</h2>
          <p>Highlights from a decade of designing modern heirlooms for the stories that matter most.</p>
        </div>
        <div className={styles.timeline}>
          {milestones.map((milestone) => (
            <article key={milestone.year} className={styles.timelineItem}>
              <span className={styles.timelineYear}>{milestone.year}</span>
              <h3>{milestone.title}</h3>
              <p>{milestone.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.valuesSection}>
        <div className={styles.sectionHeading}>
          <h2>What we believe in</h2>
          <p>We promise to create jewellery that feels personal, intentional, and endlessly wearable.</p>
        </div>
        <div className={styles.valuesGrid}>
          {values.map((value) => (
            <article key={value.title} className={styles.valueCard}>
              <h3>{value.title}</h3>
              <p>{value.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.atelierSection}>
        <div className={styles.sectionHeading}>
          <h2>Our ateliers around the world</h2>
          <p>The Pink Dot signature is a collaboration of experts across three continents.</p>
        </div>
        <div className={styles.atelierGrid}>
          {atelierLocations.map((atelier) => (
            <article key={atelier.city} className={styles.atelierCard}>
              <div className={styles.atelierImage}>
                <Image
                  src={atelier.image}
                  alt={`${atelier.city} atelier`}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.storyPhoto}
                />
              </div>
              <div className={styles.atelierContent}>
                <span>{atelier.city}</span>
                <h3>{atelier.focus}</h3>
                <p>
                  Every piece includes a signature card detailing which atelier completed the final touches—so you always
                  know who helped create your jewel.
                </p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.founderSection}>
        <div className={styles.founderImage}>
          <Image
            src="/images/neck5.jpeg"
            alt="Founder of Pink Dot jewellery"
            fill
            sizes="(max-width: 768px) 100vw, 420px"
            className={styles.storyPhoto}
          />
        </div>
        <div className={styles.founderContent}>
          <span className={styles.founderTag}>From our founder</span>
          <blockquote>
            “Jewellery is the tiny archive of our lives. I wanted to create pieces that move with you—from the Monday
            commute to the midnight toast—while carrying the warmth of the hands that made them.”
          </blockquote>
          <cite>— Amara Collins, Founder & Creative Director</cite>
          <div className={styles.founderActions}>
            <Link href="/blog" className={styles.secondaryButton}>
              Read studio journal
            </Link>
            <Link href="/our-story/page" className={styles.subtleLink}>
              Meet the design team
            </Link>
          </div>
        </div>
      </section>

      <section className={styles.ctaBanner}>
        <div>
          <h2>Become part of our story</h2>
          <p>Join the Pink Dot circle for launch previews, bespoke appointments, and gatherings in our London studio.</p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryButton}>
            Book a studio visit
          </Link>
          <Link href="/collections/limited-edition" className={styles.secondaryButton}>
            Discover limited editions
          </Link>
        </div>
      </section>
    </main>
  );
}

export const dynamic = 'force-static';
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

const craftsmanshipHighlights = [
  'Gemstones are cut, sorted, and matched by hand to ensure balanced light play.',
  'Each clasp is strength-tested to withstand years of dance-floor spins and daily wear.',
  'We apply three layers of plating and a final e-coat for glow that truly lasts.',
];

const craftRituals = [
  {
    title: 'Sketch to Storyboard',
    summary:
      'Every Pink Dot piece starts with an analogue sketch and a moodboard of fabrics, fragrances, and handwritten notes from our community.',
    highlights: [
      'Weekly open-studio sessions where clients vote on trims and textures.',
      'Paper prototypes tested for balance before we ever cast in metal.',
      'Colour palettes built around seasonal stories and everyday rituals.',
    ],
  },
  {
    title: 'Material Alchemy',
    summary:
      'We source recycled metals and traceable stones, then let our makers experiment with finishes that feel soft against the skin.',
    highlights: [
      'Triple-layer plating sealed with a hypoallergenic e-coat for lasting glow.',
      'Pebble tumbling and hand-polishing for a satin finish that resists wear.',
      'Collaborations with small-batch lapidarists who cut specifically for our silhouettes.',
    ],
  },
  {
    title: 'Wear-Tested Moments',
    summary:
      'Before a collection launches, each design is worn by our in-house team for everyday trials—school runs, studio days, dance floors.',
    highlights: [
      'Comfort tweaks captured in a shared “daybook” before final approval.',
      'Hidden hinge tests to ensure clasps stay secure yet gentle.',
      'Packaging designed to be reused as keepsake boxes for future treasures.',
    ],
  },
];

export default function OurStoryPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>The Pink Dot journey</span>
          <h1 className={styles.heroTitle}>Crafted for the moments you will retell forever</h1>
          <p className={styles.heroSubtitle}>
            From a single London workbench to a close circle of makers, we design jewellery that keeps your stories close.
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

      <section className={styles.craftSection}>
        <div className={styles.sectionHeading}>
          <h2>How we bring each piece to life</h2>
          <p>
            Pink Dot is built on in-house rituals—design reviews over coffee, material experiments, and real-life wear
            tests—that make every jewel feel like it was made just for you.
          </p>
        </div>
        <div className={styles.craftGrid}>
          {craftRituals.map((ritual) => (
            <article key={ritual.title} className={styles.craftCard}>
              <h3>{ritual.title}</h3>
              <p>{ritual.summary}</p>
              <ul className={styles.craftHighlights}>
                {ritual.highlights.map((highlight) => (
                  <li key={highlight}>{highlight}</li>
                ))}
              </ul>
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
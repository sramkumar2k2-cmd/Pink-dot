import Link from "next/link";
import styles from "./page.module.css";

const featureCards = [
  {
    title: "Signature Collections",
    description:
      "Explore curated edits featuring celestial motifs, timeless pearls, and art deco inspirations.",
    className: styles.cardOne,
  },
  {
    title: "Heirloom Craft",
    description:
      "Limited-run pieces crafted with precious metals and gemstones—made to be treasured for generations.",
    className: styles.cardTwo,
  },
  {
    title: "Personalised Touch",
    description:
      "Enjoy complimentary engraving, bespoke sizing, and gifting services tailored to your celebrations.",
    className: styles.cardThree,
  },
];

export default function Home() {
  return (
    <main className={styles.hero}>
      <div className={styles.decorations}>
        <span className={`${styles.sparkle} ${styles.sparkleOne}`} />
        <span className={`${styles.sparkle} ${styles.sparkleTwo}`} />
        <span className={`${styles.sparkle} ${styles.sparkleThree}`} />
      </div>

      <div className={styles.glowOrb} />
      <div className={styles.glowOrbSecondary} />

      <div className={styles.content}>
        <span className={styles.kicker}>Curated Jewellery Collections</span>
        <h1 className={styles.title}>
          Discover the <span className={styles.highlight}>Pink Dot Shop</span>
        </h1>
        <p className={styles.subtitle}>
          Browse our full assortment of handcrafted jewels, from everyday essentials to heirloom-worthy statements.
          Each piece is thoughtfully designed to shimmer with your story.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/shop/new-arrivals" className={styles.primaryCta}>
            Shop New Arrivals
          </Link>
          <Link href="/shop/all-jewellery" className={styles.secondaryCta}>
            View All Jewellery
          </Link>
        </div>

        <section className={styles.grid}>
          {featureCards.map((card) => (
            <article key={card.title} className={`${styles.card} ${card.className}`}>
              <div className={styles.cardHalo} />
              <h2 className={styles.cardTitle}>{card.title}</h2>
              <p className={styles.cardText}>{card.description}</p>
            </article>
          ))}
        </section>
      </div>
    </main>
  );
}

export const dynamic = 'force-static';

import Link from "next/link";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.decorations}>
        <span className={`${styles.sparkle} ${styles.sparkleOne}`} />
        <span className={`${styles.sparkle} ${styles.sparkleTwo}`} />
        <span className={`${styles.sparkle} ${styles.sparkleThree}`} />
      </div>

      <div className={styles.glowOrb} />
      <div className={styles.glowOrbSecondary} />

      <div className={styles.content}>
        <span className={styles.kicker}>Artisanal Jewellery Studio</span>
        <h1 className={styles.title}>
          Welcome to <span className={styles.highlight}>Pink Dot</span>
        </h1>
        <p className={styles.subtitle}>
          Discover handcrafted pieces that shimmer with personality. From statement rings to delicate chains, every detail is designed to celebrate your story.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/shop/new-arrivals" className={styles.primaryCta}>
            Shop New Arrivals
          </Link>
          <Link href="/collections" className={styles.secondaryCta}>
            Explore Collections
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.cardOne}`}>
            <div className={styles.cardHalo} />
            <h2 className={styles.cardTitle}>New Arrivals</h2>
            <p className={styles.cardText}>
              Explore fresh silhouettes and gemstone palettes curated for the season ahead.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardTwo}`}>
            <div className={styles.cardHalo} />
            <h2 className={styles.cardTitle}>Heirloom Spotlight</h2>
            <p className={styles.cardText}>
              Limited-edition pieces inspired by vintage treasures—crafted to be passed down.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardThree}`}>
            <div className={styles.cardHalo} />
            <h2 className={styles.cardTitle}>Gifting Concierge</h2>
            <p className={styles.cardText}>
              Complimentary wrapping, personalised notes, and curated sets for every celebration.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-static';

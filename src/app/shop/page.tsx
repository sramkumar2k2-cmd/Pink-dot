import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";

export default function ShopPage() {
  const spotlightCategories = [
    {
      name: "All Jewellery",
      href: "/shop/all-jewellery",
      description:
        "Browse every Pink Dot creation in one glittering gallery of signature favourites.",
      image: "/images/neck1.jpeg",
      price: "From ₹2,499",
      badge: "Featured",
    },
    {
      name: "Necklaces",
      href: "/shop/necklaces",
      description:
        "Layerable chains, pendants, and pearls that frame every neckline with radiance.",
      image: "/images/neck2.jpeg",
      price: "From ₹3,199",
      badge: "New Drops",
    },
    {
      name: "Earrings",
      href: "/shop/earrings",
      description:
        "Statement studs and dancing hoops crafted to sparkle with every expression.",
      image: "/images/neck3.jpeg",
      price: "From ₹1,899",
      badge: "Best Seller",
    },
    {
      name: "Rings",
      href: "/shop/rings",
      description:
        "Sculpted bands and gemstones designed for stacking, gifting, and celebrating.",
      image: "/images/neck4.jpeg",
      price: "From ₹2,299",
      badge: "Limited",
    },
    {
      name: "Bracelets",
      href: "/shop/bracelets",
      description:
        "Charm-laden chains and cuffs to complete your everyday or occasion ensemble.",
      image: "/images/neck5.jpeg",
      price: "From ₹2,099",
      badge: "Editor’s Pick",
    },
  ];

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
        <span className={styles.kicker}>Curated Jewellery Collections</span>
        <h1 className={styles.title}>
          Discover the <span className={styles.highlight}>Pink Dot Shop</span>
        </h1>
        <p className={styles.subtitle}>
          Browse our full assortment of handcrafted jewels, from everyday essentials
          to heirloom-worthy statements. Each piece is thoughtfully designed to
          shimmer with your story.
        </p>

        <div className={styles.ctaGroup}>
          <Link href="/shop/new-arrivals" className={styles.primaryCta}>
            Shop New Arrivals
          </Link>
          <Link href="/shop/all-jewellery" className={styles.secondaryCta}>
            View All Jewellery
          </Link>
        </div>

        <div className={styles.grid}>
          <div className={`${styles.card} ${styles.cardOne}`}>
            <div className={styles.cardHalo} />
            <h2 className={styles.cardTitle}>Signature Collections</h2>
            <p className={styles.cardText}>
              Explore curated edits featuring celestial motifs, timeless pearls,
              and art deco inspirations.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardTwo}`}>
            <div className={styles.cardHalo} />
            <h2 className={styles.cardTitle}>Heirloom Craft</h2>
            <p className={styles.cardText}>
              Limited-run pieces crafted with precious metals and gemstones—made
              to be treasured for generations.
            </p>
          </div>

          <div className={`${styles.card} ${styles.cardThree}`}>
            <div className={styles.cardHalo} />
            <h2 className={styles.cardTitle}>Personalised Touch</h2>
            <p className={styles.cardText}>
              Enjoy complimentary engraving, bespoke sizing, and gifting services
              tailored to your celebrations.
            </p>
          </div>
        </div>

        <section className={styles.shopCategoryGrid}>
          {spotlightCategories.map((category) => (
            <div className={styles.shopCategoryCard} key={category.name}>
              <Link
                href={category.href}
                className={styles.shopCategoryImageWrapper}
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  width={520}
                  height={360}
                  className={styles.shopCategoryImage}
                  priority={category.name === "All Jewellery"}
                />
                <span className={styles.shopCategoryBadge}>
                  {category.badge}
                </span>
              </Link>

              <div className={styles.shopCategoryContent}>
                <span className={styles.shopCategoryPrice}>
                  {category.price}
                </span>
                <h3 className={styles.shopCategoryTitle}>{category.name}</h3>
                <p className={styles.shopCategoryDescription}>
                  {category.description}
                </p>
                <div className={styles.shopCategoryActions}>
                  <Link
                    href={category.href}
                    className={styles.shopButtonPrimary}
                  >
                    Shop Now
                  </Link>
                  <Link
                    href={category.href}
                    className={styles.shopButtonGhost}
                    aria-label={`View ${category.name} collection`}
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </section>
      </div>
    </div>
  );
}

export const dynamic = 'force-static';
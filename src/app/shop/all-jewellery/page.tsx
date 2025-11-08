"use client";

import Image from "next/image";
import Link from "next/link";
import styles from "../page.module.css";
import { collections } from "../../collections/collectionData";

const heroFilters = [
  { label: "All", href: "/shop/all-jewellery" },
  { label: "Necklaces", href: "/shop/necklaces" },
  { label: "Earrings", href: "/shop/earrings" },
  { label: "Rings", href: "/shop/rings" },
  { label: "Bracelets", href: "/shop/bracelets" },
  { label: "Collections", href: "/collections" },
];

const featuredProducts = [
  {
    name: "Celestial Pearl Necklace",
    description: "Freshwater pearls with rose-gold accents",
    price: "₹4,499",
    href: "/shop/necklaces",
    image: "/images/neck1.jpeg",
    badge: "New Arrival",
  },
  {
    name: "Aurora Hoop Earrings",
    description: "Iridescent crystal hoops for evening shimmer",
    price: "₹3,299",
    href: "/shop/earrings",
    image: "/images/neck3.jpeg",
    badge: "Bestseller",
  },
  {
    name: "Muse Stacking Rings",
    description: "Set of three satin-finish bands",
    price: "₹2,799",
    href: "/shop/rings",
    image: "/images/neck4.jpeg",
    badge: "Limited",
  },
  {
    name: "Serenade Charm Bracelet",
    description: "Charms inspired by musical motifs",
    price: "₹3,099",
    href: "/shop/bracelets",
    image: "/images/neck5.jpeg",
    badge: "Editor’s Pick",
  },
  {
    name: "Luna Drop Earrings",
    description: "Moonstone drops with pavé halos",
    price: "₹3,499",
    href: "/shop/earrings",
    image: "/images/neck2.jpeg",
    badge: "Back in Stock",
  },
  {
    name: "Opaline Pendant",
    description: "Opal cabochon on fine cable chain",
    price: "₹2,999",
    href: "/shop/necklaces",
    image: "/images/neck6.jpeg",
    badge: "Gift Favorite",
  },
];

const collectionSpotlights = collections.map((collection) => ({
  name: collection.name,
  blurb: collection.tagline,
  href: `/collections/${collection.slug}`,
  image: collection.heroImage,
  badge: collection.featuredProducts[0]?.badge ?? "Signature",
  price: collection.featuredProducts[0]?.price ?? "Explore Collection",
}));

export default function AllJewelleryPage() {
  return (
    <div className={styles.page}>
      <section className={styles.allJewelleryHero}>
        <div className={styles.allJewelleryHeroAura} />
        <div className={styles.allJewelleryHeroDust} />
        <div className={styles.allJewelleryHeroInner}>
          <div className={styles.allJewelleryHeroContent}>
            <span className={styles.allJewelleryKicker}>Curated for every story</span>
            <h1 className={styles.allJewelleryHeroTitle}>
              All Jewellery <span className={styles.highlight}>by Pink Dot</span>
            </h1>
            <p className={styles.allJewelleryHeroCopy}>
              Handpicked creations to illuminate every chapter—from dawn rituals to moonlit soirées.
              Explore the pieces that have defined our signature sparkle.
            </p>
            <div className={styles.allJewelleryHeroActions}>
              <Link href="/shop/new-arrivals" className={styles.heroPrimaryCta}>
                Shop New Arrivals
              </Link>
              <Link href="/collections" className={styles.heroSecondaryCta}>
                Explore Collections
              </Link>
            </div>
          </div>
          <div className={styles.heroVisual}>
            <div className={styles.heroNecklaceFrame} />
            <Image
              src="/images/neck1.jpeg"
              alt="Pink Dot necklace showcase"
              width={720}
              height={480}
              className={styles.heroNecklaceImage}
              priority
            />
            <span className={`${styles.heroSparkle} ${styles.heroSparkleOne}`} />
            <span className={`${styles.heroSparkle} ${styles.heroSparkleTwo}`} />
            <span className={`${styles.heroSparkle} ${styles.heroSparkleThree}`} />
            <span className={`${styles.heroSparkle} ${styles.heroSparkleFour}`} />
          </div>
        </div>
      </section>

      <nav className={styles.allJewelleryFilterBar} aria-label="Shop filters">
        {heroFilters.map((filter) => (
          <Link
            key={filter.label}
            href={filter.href}
            className={`${styles.filterPill} ${
              filter.label === "All" ? styles.filterPillActive : ""
            }`}
          >
            {filter.label}
          </Link>
        ))}
      </nav>

      <div className={styles.allJewelleryProductGrid}>
        {featuredProducts.map((product) => (
          <div className={styles.allJewelleryProductCard} key={product.name}>
            <Link
              href={product.href}
              className={styles.allJewelleryProductImageWrapper}
              aria-label={`View ${product.name}`}
            >
              <Image
                src={product.image}
                alt={product.name}
                width={420}
                height={420}
                className={styles.allJewelleryProductImage}
              />
              <span className={styles.allJewelleryBadge}>{product.badge}</span>
            </Link>
            <div className={styles.allJewelleryProductInfo}>
              <span className={styles.allJewelleryPriceTag}>
                {product.price}
              </span>
              <h3 className={styles.allJewelleryProductTitle}>
                {product.name}
              </h3>
              <p className={styles.allJewelleryProductDescription}>
                {product.description}
              </p>
            </div>
            <div className={styles.allJewelleryActions}>
              <Link href={product.href} className={styles.primaryButton}>
                View Details
              </Link>
              <Link href={product.href} className={styles.ghostButton}>
                Add to Wishlist
              </Link>
            </div>
          </div>
        ))}
      </div>

      <section className={styles.collectionSpotlightSection}>
        <div className={styles.collectionSectionHeading}>
          <h2 className={styles.collectionSectionTitle}>Discover Signature Collections</h2>
          <p className={styles.collectionSectionSubtitle}>
            Journey through the themed edits that define Pink Dot’s world—from celestial nights to golden daylight.
          </p>
        </div>
        <div className={styles.allJewelleryProductGrid}>
          {collectionSpotlights.map((collection) => (
            <div className={styles.allJewelleryProductCard} key={collection.name}>
              <Link href={collection.href} className={styles.allJewelleryProductImageWrapper}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  width={520}
                  height={360}
                  className={styles.allJewelleryProductImage}
                />
                <span className={styles.allJewelleryBadge}>{collection.badge}</span>
              </Link>
              <div className={styles.allJewelleryProductInfo}>
                <span className={styles.allJewelleryPriceTag}>{collection.price}</span>
                <h3 className={styles.allJewelleryProductTitle}>{collection.name}</h3>
                <p className={styles.allJewelleryProductDescription}>{collection.blurb}</p>
              </div>
              <div className={styles.allJewelleryActions}>
                <Link href={collection.href} className={styles.primaryButton}>
                  View Collection
                </Link>
                <Link href={collection.href} className={styles.ghostButton}>
                  Add to Wishlist
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
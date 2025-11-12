import Link from "next/link";
import { AnimatedHero } from "@/app/components/AnimatedHero";
import { ProductCard } from "@/app/components/ProductCard";
import type { Product } from "@/app/shop/productData";
import { getProductBySlug } from "@/app/shop/productData";
import styles from "../collectionDetail.module.css";
import { getCollectionBySlug } from "../collectionData";

const collection = getCollectionBySlug("art-deco-revival");

export default function ArtDecoRevivalPage() {
  if (!collection) {
    return null;
  }

  const featuredProducts = collection.featuredProducts
    .map((slug) => getProductBySlug(slug))
    .filter((product): product is Product => Boolean(product));

  const primaryProduct = featuredProducts[0];

  const heroHighlights = [collection.tagline, ...collection.highlights.slice(0, 2)].filter(Boolean);
  const heroSpotlight = {
    badge: "Signature Collection",
    name: collection.name,
    description: collection.description,
    image: collection.heroImage,
    imageAlt: `${collection.name} hero visual`,
    meta: [`${collection.featuredProducts.length} featured pieces`, "Architectural accents"],
    swatches: collection.highlights.slice(0, 3),
  };

  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Signature Collection"
        title={`Discover ${collection.name}`}
        subtitle="Bold lines and mirrored symmetry recast the glamour of the jazz age for today’s soirées."
        backgroundImage={collection.heroImage}
        actions={[
          {
            label: "Shop featured pieces",
            href: primaryProduct ? `/shop/product/${primaryProduct.slug}` : "/shop/all-jewellery",
          },
          { label: "View all collections", href: "/collections", variant: "ghost" },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(24, 18, 18, 0.62), rgba(120, 80, 60, 0.32))"
        glowColors={{ primary: "rgba(255, 210, 180, 0.55)", secondary: "rgba(210, 130, 60, 0.45)" }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <nav className={styles.breadcrumbs} aria-label="Breadcrumb">
          <Link href="/shop/all-jewellery" className={styles.breadcrumbLink}>
            Shop
          </Link>
          <span>/</span>
          <Link href="/collections" className={styles.breadcrumbLink}>
            Collections
          </Link>
          <span>/</span>
          <span>{collection.name}</span>
        </nav>

        <section className={styles.overview}>
          <div className={styles.infoColumn}>
            <span className={styles.badge}>Signature Collection</span>
            <h1 className={styles.title}>{collection.name}</h1>
            {collection.tagline ? <p className={styles.tagline}>{collection.tagline}</p> : null}
            {collection.highlights.length ? (
              <ul className={styles.list}>
                {collection.highlights.slice(0, 3).map((highlight) => (
                  <li key={highlight} className={styles.listItem}>
                    {highlight}
                  </li>
                ))}
              </ul>
            ) : null}
          </div>

        </section>

        <section className={styles.featuredSection}>
          <div className={styles.featuredHeader}>
            <span className={styles.featuredEyebrow}>Featured Pieces</span>
            <h2 className={styles.featuredTitle}>Complete your {collection.name} story</h2>
            <p className={styles.featuredIntro}>
              Curated accents chosen to layer with the hero looks from this edit.
            </p>
          </div>

          <div className={styles.featuredProducts}>
            {featuredProducts.map((product) => (
              <ProductCard key={product.slug} product={product} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
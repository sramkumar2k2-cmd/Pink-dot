import Image from "next/image";
import Link from "next/link";
import { AnimatedHero } from "@/app/components/AnimatedHero";
import styles from "../collectionDetail.module.css";
import { getCollectionBySlug } from "../collectionData";

const collection = getCollectionBySlug("summer-collection");

export default function SummerCollectionPage() {
  if (!collection) {
    return null;
  }

  const galleryImages = collection.gallery.filter((image) => image !== collection.heroImage);
  const heroHighlights = [collection.tagline, collection.highlights[0], collection.highlights[1]].filter(Boolean) as string[];
  const heroSpotlight = {
    badge: "Signature Collection",
    name: collection.name,
    description: collection.description,
    image: collection.heroImage,
    imageAlt: `${collection.name} hero visual`,
    meta: [`${collection.featuredProducts.length} featured pieces`, "Sunset-ready palette"],
    swatches: collection.highlights.slice(0, 3),
  };

  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Signature Collection"
        title={`Discover ${collection.name}`}
        subtitle="Colour-drenched gems designed for golden hours and getaway adventures."
        backgroundImage={collection.heroImage}
        actions={[
          { label: "Shop featured pieces", href: collection.featuredProducts[0]?.href ?? "/shop/all-jewellery" },
          { label: "View all collections", href: "/collections", variant: "ghost" },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(28, 18, 16, 0.6), rgba(218, 122, 64, 0.32))"
        glowColors={{ primary: "rgba(255, 196, 140, 0.55)", secondary: "rgba(255, 150, 120, 0.48)" }}
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
            <p className={styles.tagline}>{collection.tagline}</p>
            <p className={styles.description}>{collection.description}</p>

            <div className={styles.story}>{collection.story}</div>

            <div>
              <div className={styles.sectionTitle}>Highlights</div>
              <ul className={styles.list}>
                {collection.highlights.map((highlight) => (
                  <li key={highlight} className={styles.listItem}>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.moodNote}>{collection.mood}</div>
          </div>

          <div className={styles.galleryColumn}>
            <div className={styles.primaryImage}>
              <Image
                src={collection.heroImage}
                alt={`${collection.name} primary visual`}
                width={900}
                height={720}
                className={styles.primaryPhoto}
                priority
              />
            </div>
            {galleryImages.length > 0 && (
              <div className={styles.galleryGrid}>
                {galleryImages.map((image) => (
                  <div className={styles.galleryThumb} key={image}>
                    <Image
                      src={image}
                      alt={`${collection.name} alternate view`}
                      width={320}
                      height={240}
                      className={styles.galleryImage}
                    />
                  </div>
                ))}
              </div>
            )}
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
            {collection.featuredProducts.map((product) => (
              <article className={styles.productCard} key={product.name}>
                <Link href={product.href} className={styles.productImageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={420}
                    height={320}
                    className={styles.productImage}
                  />
                  <span className={styles.productBadge}>{product.badge}</span>
                </Link>
                <div className={styles.productMeta}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productPrice}>{product.price}</div>
                  <div className={styles.productActions}>
                    <Link href={product.href} className={styles.primaryButton}>
                      View Piece
                    </Link>
                    <Link href={product.href} className={styles.secondaryButton}>
                      Add to Wishlist
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
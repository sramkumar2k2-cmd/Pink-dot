import Image from "next/image";
import Link from "next/link";
import styles from "../collectionDetail.module.css";
import { getCollectionBySlug } from "../collectionData";

const collection = getCollectionBySlug("limited-edition");

export default function LimitedEditionPage() {
  if (!collection) {
    return null;
  }

  const galleryImages = collection.gallery.filter((image) => image !== collection.heroImage);

  return (
    <div className={styles.page}>
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

      <div className={styles.mediaColumn}>
        <div className={styles.heroImageWrapper}>
          <Image
            src={collection.heroImage}
            alt={collection.name}
            width={900}
            height={720}
            className={styles.heroImage}
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

        <div>
          <div className={styles.sectionTitle}>Featured Pieces</div>
          <div className={styles.featuredProducts}>
            {collection.featuredProducts.map((product) => (
              <div className={styles.productCard} key={product.name}>
                <Link href={product.href} className={styles.productImageWrapper}>
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={320}
                    height={240}
                    className={styles.productImage}
                  />
                  <span className={styles.productBadge}>{product.badge}</span>
                </Link>
                <div className={styles.productMeta}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <div className={styles.productPrice}>{product.price}</div>
                  <Link href={product.href} className={styles.productLink}>
                    View Details →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
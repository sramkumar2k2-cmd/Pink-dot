'use client';

import { useState, type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/app/shop/productData';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

type CardStyle = CSSProperties & {
  '--card-gradient'?: string;
};

export function ProductCard({ product }: ProductCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);

  const cardStyle: CardStyle = {};

  if (product.gradient) {
    cardStyle['--card-gradient'] = product.gradient;
  }

  const specs =
    product.specs?.map((spec) => spec.value) ??
    (product.secondaryAccent ? [product.secondaryAccent] : []);

  const uniqueSpecs = Array.from(
    new Set([product.secondaryAccent, ...specs].filter(Boolean)),
  ) as string[];

  const displaySpecs = uniqueSpecs.slice(0, 2);

  const primaryPrice =
    product.salePrice && product.originalPrice ? product.salePrice : product.price;

  const heroImage = product.images[0];

  return (
    <article className={styles.card} style={cardStyle}>
      <div className={styles.visual}>
        {product.tag ? <span className={styles.tag}>{product.tag}</span> : null}
        {product.badge ? <span className={styles.badge}>{product.badge}</span> : null}

        <button
          type="button"
          className={styles.favoriteButton}
          data-active={isFavorite}
          aria-pressed={isFavorite}
          aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
          onClick={() => setIsFavorite((prev) => !prev)}
        >
          {isFavorite ? '♥' : '♡'}
        </button>

        <Link
          href={`/shop/product/${product.slug}`}
          className={styles.imageLink}
          aria-label={`View details for ${product.name}`}
        >
          <Image
            src={heroImage.src}
            alt={heroImage.alt}
            fill
            sizes="(max-width: 768px) 100vw, 320px"
            className={styles.productImage}
            priority={false}
          />
        </Link>

        {product.accent ? <span className={styles.accent}>{product.accent}</span> : null}
      </div>

      <div className={styles.content}>
        <Link href={`/shop/product/${product.slug}`} className={styles.titleLink}>
          <h3 className={styles.name}>{product.name}</h3>
        </Link>
        <p className={styles.description}>{product.description}</p>

        {displaySpecs.length ? (
          <div className={styles.specs}>
            {displaySpecs.map((spec) => (
              <span key={spec} className={styles.specChip}>
                {spec}
              </span>
            ))}
          </div>
        ) : null}

        <div className={styles.priceRow}>
          {product.salePrice && product.originalPrice ? (
            <>
              <span className={styles.originalPrice}>{product.originalPrice}</span>
              <span className={styles.price}>{product.salePrice}</span>
            </>
          ) : (
            <span className={styles.price}>{primaryPrice}</span>
          )}
        </div>

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.addToCart}`}
            onClick={() => {
              console.info(`Added ${product.slug} to cart`);
            }}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.buyNow}`}
            onClick={() => {
              console.info(`Buying ${product.slug} now`);
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    </article>
  );
}



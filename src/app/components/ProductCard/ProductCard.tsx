'use client';

import { type CSSProperties } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/app/shop/productData';
import { HeartIcon } from '@/app/components/HeartIcon';
import { CartIcon } from '@/app/components/CartIcon';
import { useFavoriteProduct } from '@/app/lib/useFavoriteProduct';
import { useCartProduct } from '@/app/lib/useCartProduct';
import { handleBuyNow } from '@/app/lib/whatsappUtils';
import { calculateDiscountPercentage } from '@/app/lib/priceUtils';
import styles from './ProductCard.module.css';

type ProductCardProps = {
  product: Product;
};

type CardStyle = CSSProperties & {
  '--card-gradient'?: string;
};

export function ProductCard({ product }: ProductCardProps) {
  const { isFavorite, toggleFavorite } = useFavoriteProduct(product.slug);
  const { isInCart, addToCart, toggleCart } = useCartProduct(product.slug);

  const cardStyle: CardStyle = {};
  const hasBadge = Boolean(product.badge);

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

  const hasDiscount = Boolean(product.salePrice && product.originalPrice);
  const discountPercentage = hasDiscount && product.originalPrice && product.salePrice
    ? calculateDiscountPercentage(product.originalPrice, product.salePrice)
    : 0;
  const primaryPrice = hasDiscount && product.salePrice ? product.salePrice : product.price;

  const heroImage =
    product.images?.[0] ??
    (product.image
      ? { src: product.image, alt: product.name }
      : {
          src: `https://images.unsplash.com/seed/${encodeURIComponent(
            `${product.slug}-card`,
          )}/900x1200?auto=format&fit=crop&w=900&q=80`,
          alt: product.name,
        });

  return (
    <article className={styles.card} style={cardStyle}>
      <div className={styles.visual}>
        {/* Show badge if exists, otherwise show tag - both on bottom-left */}
        {hasBadge ? (
          <span className={styles.badge}>{product.badge}</span>
        ) : product.tag ? (
          <span className={styles.tag}>{product.tag}</span>
        ) : null}

        <div className={styles.topActions}>
          <button
            type="button"
            className={styles.favoriteButton}
            data-active={isFavorite}
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleFavorite();
            }}
          >
            <HeartIcon filled={isFavorite} className={styles.favoriteIcon} />
          </button>
          <button
            type="button"
            className={styles.cartButton}
            data-active={isInCart}
            aria-pressed={isInCart}
            aria-label={isInCart ? 'Remove from cart' : 'Add to cart'}
            onClick={(event) => {
              event.preventDefault();
              event.stopPropagation();
              toggleCart();
            }}
          >
            <CartIcon filled={isInCart} />
          </button>
        </div>

        <Link
          href={`/shop/product/${encodeURIComponent(product.slug.toLowerCase())}`}
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
            unoptimized={heroImage.src.startsWith('http')}
          />
        </Link>
        {product.accent ? (
          <span
            className={`${styles.accent} ${hasBadge ? styles.accentWithBadge : ''}`.trim()}
          >
            {product.accent}
          </span>
        ) : null}
      </div>

      <div className={styles.content}>
        <Link
          href={`/shop/product/${encodeURIComponent(product.slug.toLowerCase())}`}
          className={styles.titleLink}
        >
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
          {hasDiscount ? (
            <>
              <div className={styles.priceContainer}>
                <span className={styles.originalPrice}>{product.originalPrice}</span>
                <span className={styles.salePrice}>{product.salePrice}</span>
              </div>
              {discountPercentage > 0 && (
                <span className={styles.discountBadge}>{discountPercentage}% OFF</span>
              )}
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
              addToCart();
              console.info(`Added ${product.slug} to cart`);
            }}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.buyNow}`}
            onClick={() => {
              handleBuyNow([product]);
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    </article>
  );
}



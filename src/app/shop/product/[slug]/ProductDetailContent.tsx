'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/app/shop/productData';
import { HeartIcon } from '@/app/components/HeartIcon';
import { useFavoriteProduct } from '@/app/lib/useFavoriteProduct';
import { getWhatsAppUrl } from '@/app/lib/whatsappUtils';
import styles from './page.module.css';

type Breadcrumb = {
  label: string;
  href: string;
} | null;

type ProductDetailContentProps = {
  product: Product;
  breadcrumb: Breadcrumb;
};

export function ProductDetailContent({ product, breadcrumb }: ProductDetailContentProps) {
  const { isFavorite, toggleFavorite } = useFavoriteProduct(product.slug);
  const [selectedIndex, setSelectedIndex] = useState(0);

  const galleryImages = useMemo(() => {
    const baseImages = (product.images ?? []).filter(
      (image): image is { src: string; alt: string } => Boolean(image?.src),
    );

    const required = Math.max(3, baseImages.length);
    const placeholders =
      baseImages.length >= required
        ? []
        : Array.from({ length: required - baseImages.length }, (_, index) => ({
            src: `https://images.unsplash.com/seed/${encodeURIComponent(
              `${product.slug}-${index}`,
            )}/900x1200?auto=format&fit=crop&w=900&q=80`,
            alt: `${product.name} alternate view ${baseImages.length + index + 1}`,
          }));

    return [...baseImages, ...placeholders];
  }, [product]);

  const primaryImage = galleryImages[selectedIndex] ?? galleryImages[0];

  const specs = useMemo(() => {
    if (!product.specs?.length) {
      return product.secondaryAccent ? [product.secondaryAccent] : [];
    }

    return product.specs.map((spec) => spec.value);
  }, [product]);

  const highlights = product.highlights ?? [];
  const story = product.story ?? product.description;

  const displayedPrice =
    product.salePrice && product.originalPrice ? product.salePrice : product.price;

  return (
    <section className={styles.detail}>
      <div className={styles.gallery}>
        {breadcrumb ? (
          <nav className={styles.breadcrumb} aria-label="Breadcrumb">
            <Link href="/shop/all-jewellery">Shop</Link>
            <span aria-hidden="true">/</span>
            <Link href={breadcrumb.href}>{breadcrumb.label}</Link>
            <span aria-hidden="true">/</span>
            <span>{product.name}</span>
          </nav>
        ) : null}

        <div className={styles.mainImage}>
          <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
            className={styles.favoriteButton}
            data-active={isFavorite}
            onClick={() => {
              toggleFavorite();
            }}
          >
            <HeartIcon filled={isFavorite} className={styles.favoriteIcon} />
          </button>
          <Image
            src={primaryImage.src}
            alt={primaryImage.alt}
            fill
            className={styles.mainPhoto}
            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
            priority
            unoptimized={primaryImage.src.startsWith('http')}
          />
        </div>

        {galleryImages.length > 1 ? (
          <div className={styles.thumbnails}>
            {galleryImages.map((image, index) => (
              <button
                key={image.src}
                type="button"
                className={styles.thumbnailButton}
                data-active={index === selectedIndex}
                onClick={() => setSelectedIndex(index)}
                aria-label={`Show alternate view ${index + 1} for ${product.name}`}
              >
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className={styles.thumbnailImage}
                    sizes="(max-width: 768px) 16vw, 120px"
                    unoptimized={image.src.startsWith('http')}
                  />
              </button>
            ))}
          </div>
        ) : null}
      </div>

      <div className={styles.info}>
        <div className={styles.header}>
          <h1 className={styles.name}>{product.name}</h1>
          <p className={styles.subtitle}>{product.description}</p>
          <div className={styles.priceRow}>
            {product.salePrice && product.originalPrice ? (
              <>
                <span className={styles.originalPrice}>{product.originalPrice}</span>
                <span className={styles.price}>{product.salePrice}</span>
              </>
            ) : (
              <span className={styles.price}>{displayedPrice}</span>
            )}
          </div>
        </div>

        {specs.length ? (
          <div className={styles.specs}>
            {specs.map((spec) => (
              <span key={spec} className={styles.spec}>
                {spec}
              </span>
            ))}
          </div>
        ) : null}

        <p className={styles.story}>{story}</p>

        {highlights.length ? (
          <ul className={styles.highlights}>
            {highlights.map((highlight) => (
              <li key={highlight}>{highlight}</li>
            ))}
          </ul>
        ) : null}

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.addToCart}`}
            onClick={() => {
              console.info(`Added ${product.slug} to cart from detail page`);
            }}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.buyNow}`}
            onClick={() => {
              const whatsappUrl = getWhatsAppUrl([product]);
              window.location.href = whatsappUrl;
            }}
          >
            Buy now
          </button>
        </div>
      </div>
    </section>
  );
}

'use client';

import { useMemo, useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { Product } from '@/app/shop/productData';
import { HeartIcon } from '@/app/components/HeartIcon';
import { useFavoriteProduct } from '@/app/lib/useFavoriteProduct';
import { useCartProduct } from '@/app/lib/useCartProduct';
import { handleBuyNow } from '@/app/lib/whatsappUtils';
import { FavoriteDialog } from '@/app/components/FavoriteDialog/FavoriteDialog';
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
  const { isFavorite, toggleFavorite, saveFavoriteWithCustomName } = useFavoriteProduct(product.slug);
  const { isInCart, quantity: cartQuantity, setQuantity } = useCartProduct(product.slug);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [showFavoriteDialog, setShowFavoriteDialog] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [pendingQuantity, setPendingQuantity] = useState(1);
  const [quantityInput, setQuantityInput] = useState('1');
  const mainImageRef = useRef<HTMLDivElement>(null);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);
  const hasInitialized = useRef(false);

  // Handle client-side mounting to avoid hydration mismatch
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Initialize pending quantity from cart quantity on mount only
  useEffect(() => {
    if (isMounted && !hasInitialized.current) {
      hasInitialized.current = true;
      if (cartQuantity > 0) {
        setPendingQuantity(cartQuantity);
        setQuantityInput(cartQuantity.toString());
      } else {
        setPendingQuantity(1);
        setQuantityInput('1');
      }
    }
  }, [isMounted, cartQuantity]);

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

  const handleImagePrev = () => {
    setSelectedIndex((prev) => (prev > 0 ? prev - 1 : galleryImages.length - 1));
  };

  const handleImageNext = () => {
    setSelectedIndex((prev) => (prev < galleryImages.length - 1 ? prev + 1 : 0));
  };

  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    touchEndX.current = null;
    touchStartX.current = e.targetTouches[0].clientX;
  };

  const onTouchMove = (e: React.TouchEvent) => {
    touchEndX.current = e.targetTouches[0].clientX;
  };

  const onTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      handleImageNext();
    }
    if (isRightSwipe) {
      handleImagePrev();
    }
  };

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

        <div 
          className={styles.mainImage}
          ref={mainImageRef}
          onTouchStart={onTouchStart}
          onTouchMove={onTouchMove}
          onTouchEnd={onTouchEnd}
        >
          <button
            type="button"
            aria-pressed={isFavorite}
            aria-label={isFavorite ? 'Remove from favourites' : 'Add to favourites'}
            className={styles.favoriteButton}
            data-active={isFavorite}
            onClick={() => {
              if (isFavorite) {
                // If already favorite, just remove it
                toggleFavorite();
              } else {
                // If not favorite, show dialog to ask for custom name/folder
                setShowFavoriteDialog(true);
              }
            }}
          >
            <HeartIcon filled={isFavorite} className={styles.favoriteIcon} />
          </button>
          
          {galleryImages.length > 1 && (
            <>
              <button
                type="button"
                className={`${styles.mainCarouselButton} ${styles.mainCarouselPrev}`}
                onClick={handleImagePrev}
                aria-label="Previous image"
              >
                <svg className={styles.carouselIcon} viewBox="0 0 24 24">
                  <path d="M15 18l-6-6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <button
                type="button"
                className={`${styles.mainCarouselButton} ${styles.mainCarouselNext}`}
                onClick={handleImageNext}
                aria-label="Next image"
              >
                <svg className={styles.carouselIcon} viewBox="0 0 24 24">
                  <path d="M9 18l6-6-6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </>
          )}

          <div className={styles.mainImageContainer}>
            {galleryImages.map((image, index) => (
              <div
                key={image.src}
                className={`${styles.mainImageSlide} ${
                  index === selectedIndex ? styles.mainImageSlideActive : ''
                }`}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className={styles.mainPhoto}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 480px"
                  priority={index === 0}
                  unoptimized={image.src.startsWith('http')}
                />
              </div>
            ))}
          </div>

          {galleryImages.length > 1 && (
            <div className={styles.imageIndicators}>
              {galleryImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  className={`${styles.indicator} ${
                    index === selectedIndex ? styles.indicatorActive : ''
                  }`}
                  onClick={() => setSelectedIndex(index)}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
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
          <div className={styles.quantityControls}>
            <button
              type="button"
              className={styles.quantityButton}
              onClick={() => {
                if (pendingQuantity > 1) {
                  const newQty = pendingQuantity - 1;
                  setPendingQuantity(newQty);
                  setQuantityInput(newQty.toString());
                }
              }}
              disabled={!isMounted || pendingQuantity <= 1}
              aria-label="Decrease quantity"
            >
              −
            </button>
            <input
              type="number"
              min="1"
              value={quantityInput}
              onChange={(e) => {
                const value = e.target.value;
                setQuantityInput(value);
              }}
              onBlur={(e) => {
                const numValue = parseInt(e.target.value, 10);
                if (!isNaN(numValue) && numValue >= 1) {
                  setPendingQuantity(numValue);
                  setQuantityInput(numValue.toString());
                } else {
                  setQuantityInput(pendingQuantity.toString());
                }
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.currentTarget.blur();
                }
              }}
              className={styles.quantityInput}
              aria-label="Quantity"
            />
            <button
              type="button"
              className={styles.quantityButton}
              onClick={() => {
                const newQty = pendingQuantity + 1;
                setPendingQuantity(newQty);
                setQuantityInput(newQty.toString());
              }}
              aria-label="Increase quantity"
            >
              +
            </button>
          </div>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.addToCart}`}
            onClick={() => {
              setQuantity(pendingQuantity);
              console.info(`Added ${pendingQuantity} x ${product.slug} to cart from detail page`);
            }}
          >
            Add to cart
          </button>
          <button
            type="button"
            className={`${styles.actionButton} ${styles.buyNow}`}
            onClick={() => {
              // Set quantity in cart first, then proceed to buy
              setQuantity(pendingQuantity);
              // Store product for Buy Now flow (quantity is already in cart)
              handleBuyNow([product]);
            }}
          >
            Buy now
          </button>
        </div>
      </div>

      <FavoriteDialog
        productName={product.name}
        isOpen={showFavoriteDialog}
        onSave={(customName, folder) => {
          saveFavoriteWithCustomName(customName, folder);
          setShowFavoriteDialog(false);
        }}
        onSkip={() => {
          saveFavoriteWithCustomName(null, null);
          setShowFavoriteDialog(false);
        }}
        onClose={() => {
          setShowFavoriteDialog(false);
        }}
      />
    </section>
  );
}

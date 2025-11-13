'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/app/components/ProductCard';
import { useFavoriteSlugs } from '@/app/lib/useFavoriteProduct';
import { getProducts } from '@/app/shop/productData';
import styles from './FavoritesGrid.module.css';

const allProducts = getProducts();

export function FavoritesGrid() {
  const favoriteSlugs = useFavoriteSlugs();

  const favoriteProducts = useMemo(() => {
    if (!favoriteSlugs.length) {
      return [];
    }

    const favoritesSet = new Set(favoriteSlugs);
    return allProducts.filter((product) => favoritesSet.has(product.slug));
  }, [favoriteSlugs]);

  if (!favoriteProducts.length) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyCard}>
          <p className={styles.emptyTitle}>No favourites... yet.</p>
          <p className={styles.emptyDescription}>
            Tap the heart on any product to keep it here. Your saved pieces will stay even after you
            refresh.
          </p>
          <Link href="/shop" className={styles.exploreLink}>
            Explore the shop
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.grid}>
      {favoriteProducts.map((product) => (
        <ProductCard key={product.slug} product={product} />
      ))}
    </div>
  );
}



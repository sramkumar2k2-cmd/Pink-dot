'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/app/components/ProductCard';
import { useCartSlugs } from '@/app/lib/useCartProduct';
import { getProducts } from '@/app/shop/productData';
import { calculateTotal, formatPrice, getEffectivePrice } from '@/app/lib/priceUtils';
import { handleBuyNow } from '@/app/lib/whatsappUtils';
import styles from './CartGrid.module.css';

const allProducts = getProducts();

export function CartGrid() {
  const cartSlugs = useCartSlugs();

  const cartProducts = useMemo(() => {
    if (!cartSlugs.length) {
      return [];
    }

    const cartSet = new Set(cartSlugs);
    return allProducts.filter((product) => cartSet.has(product.slug));
  }, [cartSlugs]);

  const totalPrice = useMemo(() => {
    return calculateTotal(cartProducts);
  }, [cartProducts]);

  if (!cartProducts.length) {
    return (
      <div className={styles.emptyState}>
        <div className={styles.emptyCard}>
          <p className={styles.emptyTitle}>Your cart is waiting.</p>
          <p className={styles.emptyDescription}>
            Add pieces from any collection and they'll stay here—even after you refresh—until you're
            ready to check out.
          </p>
          <Link href="/shop" className={styles.exploreLink}>
            Start exploring
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className={styles.cartContainer}>
        <div className={styles.grid}>
          {cartProducts.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
        
        <div className={styles.buyNowSection}>
          <div className={styles.productsList}>
            <h3 className={styles.productsListTitle}>Products in Cart:</h3>
            <div className={styles.productsNames}>
              {cartProducts.map((product) => (
                <div key={product.slug} className={styles.productNameItem}>
                  <span className={styles.productNameText}>{product.name}</span>
                  <span className={styles.productNamePrice}>
                    {getEffectivePrice(product)}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={styles.totalInfo}>
            <span className={styles.totalLabel}>Total Amount:</span>
            <span className={styles.totalPrice}>{formatPrice(totalPrice)}</span>
          </div>
          <button
            type="button"
            onClick={() => handleBuyNow(cartProducts)}
            className={styles.buyNowButton}
          >
            Buy Now
          </button>
        </div>
      </div>
    </>
  );
}



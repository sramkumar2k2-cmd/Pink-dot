'use client';

import { useMemo, useState, useEffect } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/app/components/ProductCard';
import { useCartSlugs } from '@/app/lib/useCartProduct';
import { getCartItems, subscribeToQuantityChanges } from '@/app/lib/cartUtils';
import { getProducts } from '@/app/shop/productData';
import { calculateTotal, formatPrice, getEffectivePrice, parsePrice } from '@/app/lib/priceUtils';
import { handleBuyNow } from '@/app/lib/whatsappUtils';
import styles from './CartGrid.module.css';

const allProducts = getProducts();

type CartProductWithQuantity = {
  product: ReturnType<typeof getProducts>[0];
  quantity: number;
};

export function CartGrid() {
  const cartSlugs = useCartSlugs();
  const [quantityVersion, setQuantityVersion] = useState(0);
  
  // Subscribe to quantity changes to force re-render
  useEffect(() => {
    const unsubscribe = subscribeToQuantityChanges(() => {
      setQuantityVersion(prev => prev + 1);
    });
    return unsubscribe;
  }, []);

  const cartItemsWithQuantity = useMemo(() => {
    if (!cartSlugs.length) {
      return [];
    }

    const cartItems = getCartItems();
    const cartProductsWithQty: CartProductWithQuantity[] = [];
    
    cartItems.forEach((item) => {
      const product = allProducts.find((p) => p.slug === item.slug);
      if (product && item.quantity > 0) {
        cartProductsWithQty.push({
          product,
          quantity: item.quantity,
        });
      }
    });

    return cartProductsWithQty;
  }, [cartSlugs, quantityVersion]); // Include quantityVersion to trigger recalculation

  const cartProducts = useMemo(() => {
    return cartItemsWithQuantity.map((item) => item.product);
  }, [cartItemsWithQuantity]);

  const totalPrice = useMemo(() => {
    return cartItemsWithQuantity.reduce((total, item) => {
      const price = parsePrice(getEffectivePrice(item.product));
      return total + price * item.quantity;
    }, 0);
  }, [cartItemsWithQuantity]);

  if (!cartProducts.length || !cartItemsWithQuantity.length) {
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
            <ProductCard key={product.slug} product={product} hideAddToCart={true} />
          ))}
        </div>
        
        <div className={styles.buyNowSection}>
          <div className={styles.productsList}>
            <h3 className={styles.productsListTitle}>Products in Cart:</h3>
            <div className={styles.productsNames}>
              {cartItemsWithQuantity.map(({ product, quantity }) => {
                const itemPrice = parsePrice(getEffectivePrice(product));
                const itemTotal = itemPrice * quantity;
                return (
                  <div key={product.slug} className={styles.productNameItem}>
                    <div className={styles.productNameRow}>
                      <span className={styles.productNameText}>
                        {product.name}
                        {quantity > 1 && (
                          <span className={styles.quantityBadge}> × {quantity}</span>
                        )}
                      </span>
                      <span className={styles.productNamePrice}>
                        {quantity > 1 ? (
                          <>
                            {formatPrice(itemPrice)} × {quantity} = {formatPrice(itemTotal)}
                          </>
                        ) : (
                          formatPrice(itemPrice)
                        )}
                      </span>
                    </div>
                  </div>
                );
              })}
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



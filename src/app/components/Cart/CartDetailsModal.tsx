'use client';

import { useEffect } from 'react';
import { Product } from '@/app/shop/productData';
import { formatPrice, getEffectivePrice } from '@/app/lib/priceUtils';
import styles from './CartDetailsModal.module.css';

type CartDetailsModalProps = {
  products: Product[];
  totalPrice: number;
  onClose: () => void;
};

export function CartDetailsModal({ products, totalPrice, onClose }: CartDetailsModalProps) {
  useEffect(() => {
    // Prevent body scroll when modal is open
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <h2 className={styles.title}>Cart Details</h2>
          <button className={styles.closeButton} onClick={onClose} aria-label="Close">
            ×
          </button>
        </div>

        <div className={styles.content}>
          <div className={styles.productsList}>
            {products.map((product) => {
              const effectivePrice = getEffectivePrice(product);
              const hasSale = product.salePrice && product.originalPrice;

              return (
                <div key={product.slug} className={styles.productItem}>
                  <div className={styles.productImage}>
                    <img
                      src={product.image}
                      alt={product.name}
                      className={styles.image}
                    />
                  </div>
                  <div className={styles.productInfo}>
                    <h3 className={styles.productName}>{product.name}</h3>
                    <p className={styles.productDescription}>{product.description}</p>
                    {product.accent && (
                      <p className={styles.productAccent}>{product.accent}</p>
                    )}
                    <div className={styles.productPrice}>
                      {hasSale ? (
                        <>
                          <span className={styles.originalPrice}>{product.originalPrice}</span>
                          <span className={styles.salePrice}>{product.salePrice}</span>
                        </>
                      ) : (
                        <span className={styles.price}>{effectivePrice}</span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className={styles.summary}>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Number of Items:</span>
              <span className={styles.summaryValue}>{products.length}</span>
            </div>
            <div className={styles.summaryRow}>
              <span className={styles.summaryLabel}>Total Amount:</span>
              <span className={styles.totalAmount}>{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        <div className={styles.footer}>
          <button className={styles.continueButton} onClick={onClose}>
            Continue Shopping
          </button>
          <button className={styles.checkoutButton}>
            Proceed to Checkout
          </button>
        </div>
      </div>
    </div>
  );
}


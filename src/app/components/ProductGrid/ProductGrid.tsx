'use client';

import { useState } from 'react';
import { ProductCard } from '@/app/components/ProductCard';
import { getRelatedProducts } from '@/app/shop/productData';
import type { Product } from '@/app/shop/productData';
import styles from './ProductGrid.module.css';

type ProductGridProps = {
  products: Product[];
};

export function ProductGrid({ products }: ProductGridProps) {
  const [expandedProductSlug, setExpandedProductSlug] = useState<string | null>(null);

  const handleProductClick = (e: React.MouseEvent, productSlug: string) => {
    // Only handle click if not clicking on a link or button
    const target = e.target as HTMLElement;
    if (target.closest('a') || target.closest('button')) {
      return; // Let links and buttons work normally
    }
    
    // Toggle: if same product clicked, collapse it; otherwise expand new one
    setExpandedProductSlug(expandedProductSlug === productSlug ? null : productSlug);
  };

  const getRelatedProductsForProduct = (productSlug: string) => {
    return getRelatedProducts(productSlug, 4);
  };

  return (
    <div className={styles.productGridContainer}>
      {products.map((product) => {
        const isExpanded = expandedProductSlug === product.slug;
        const relatedProducts = isExpanded ? getRelatedProductsForProduct(product.slug) : [];

        return (
          <div key={product.slug} className={styles.productWrapper}>
            <div 
              className={styles.productCardWrapper}
              onClick={(e) => handleProductClick(e, product.slug)}
            >
              <ProductCard product={product} />
            </div>
            
            {isExpanded && relatedProducts.length > 0 && (
              <div className={styles.relatedProductsSection}>
                <h3 className={styles.relatedProductsTitle}>Related Products</h3>
                <div className={styles.relatedProductsGrid}>
                  {relatedProducts.map((relatedProduct) => (
                    <ProductCard key={relatedProduct.slug} product={relatedProduct} />
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}


import styles from './page.module.css';

export default function ShopPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Shop</h1>
      <div className={styles.grid}>
        {/* Product grid will be added here */}
      </div>
    </div>
  );
}

export const dynamic = 'force-static';
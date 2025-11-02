import styles from './page.module.css';

export default function SummerCollectionPage() {
  return (
    <main className={styles.main}>
      <div className={styles.collectionHeader}>
        <h1 className={styles.title}>Summer Collection</h1>
        <p className={styles.description}>Light and breezy pieces for the perfect summer wardrobe</p>
      </div>
      <div className={styles.productsGrid}>
        {/* Product grid will be added here */}
      </div>
    </main>
  );
}
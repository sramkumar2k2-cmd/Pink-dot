import styles from './page.module.css';

export default function MinimalistThreadsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.collectionHeader}>
        <h1 className={styles.title}>Minimalist Threads</h1>
        <p className={styles.description}>Essential pieces with clean lines and timeless appeal</p>
      </div>
      <div className={styles.productsGrid}>
        {/* Product grid will be added here */}
      </div>
    </main>
  );
}
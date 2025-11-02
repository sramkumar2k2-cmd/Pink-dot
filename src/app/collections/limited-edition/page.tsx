import styles from './page.module.css';

export default function LimitedEditionPage() {
  return (
    <main className={styles.main}>
      <div className={styles.collectionHeader}>
        <h1 className={styles.title}>Limited Edition</h1>
        <p className={styles.description}>Exclusive pieces available for a limited time only</p>
      </div>
      <div className={styles.productsGrid}>
        {/* Product grid will be added here */}
      </div>
    </main>
  );
}
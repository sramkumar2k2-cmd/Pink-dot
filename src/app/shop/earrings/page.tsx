import styles from './page.module.css';

export default function EarringsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Earrings</h1>
        <p className={styles.description}>Statement earrings that complement your style</p>
      </div>
      <div className={styles.filterSection}>
        {/* Filters will be added here */}
      </div>
      <div className={styles.productsGrid}>
        {/* Products will be added here */}
      </div>
    </main>
  );
}
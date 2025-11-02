import styles from './page.module.css';

export default function RingsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Rings</h1>
        <p className={styles.description}>Beautiful rings for every finger</p>
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
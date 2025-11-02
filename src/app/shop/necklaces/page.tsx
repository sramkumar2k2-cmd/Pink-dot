import styles from './page.module.css';

export default function NecklacesPage() {
  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>Necklaces</h1>
        <p className={styles.description}>Elegant necklaces for every occasion</p>
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
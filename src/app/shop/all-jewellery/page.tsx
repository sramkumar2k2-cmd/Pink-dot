import styles from './page.module.css';

export default function AllJewelleryPage() {
  return (
    <main className={styles.main}>
      <div className={styles.pageHeader}>
        <h1 className={styles.title}>All Jewellery</h1>
        <p className={styles.description}>Discover our complete collection of handcrafted pieces</p>
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
import styles from './page.module.css';

export default function ArtDecoRevivalPage() {
  return (
    <main className={styles.main}>
      <div className={styles.collectionHeader}>
        <h1 className={styles.title}>Art Deco Revival</h1>
        <p className={styles.description}>Elegant designs inspired by the glamour of the Art Deco era</p>
      </div>
      <div className={styles.productsGrid}>
        {/* Product grid will be added here */}
      </div>
    </main>
  );
}
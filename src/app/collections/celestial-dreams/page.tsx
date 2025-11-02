import styles from './page.module.css';

export default function CelestialDreamsPage() {
  return (
    <main className={styles.main}>
      <div className={styles.collectionHeader}>
        <h1 className={styles.title}>Celestial Dreams</h1>
        <p className={styles.description}>A collection inspired by the mystique of the night sky</p>
      </div>
      <div className={styles.productsGrid}>
        {/* Product grid will be added here */}
      </div>
    </main>
  );
}
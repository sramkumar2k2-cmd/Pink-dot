import styles from './page.module.css';

export default function SalePage() {
  return (
    <main className={styles.main}>
      <h1 className={styles.title}>Sale</h1>
      <div className={styles.productsGrid}>
        {/* Product grid will be added here */}
      </div>
    </main>
  );
}
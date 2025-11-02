import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.hero}>
      <div className={styles.content}>
        <h1 className={styles.title}>Welcome to Pink Dot</h1>
        <p className={styles.subtitle}>
          Discover our unique collection of thoughtfully curated items
        </p>
        
        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>New Arrivals</h2>
            <p className={styles.cardText}>
              Explore our latest collections and stay ahead of trends
            </p>
          </div>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Featured Collections</h2>
            <p className={styles.cardText}>
              Handpicked items that define style and elegance
            </p>
          </div>
          
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Gift Ideas</h2>
            <p className={styles.cardText}>
              Perfect presents for every special occasion
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export const dynamic = 'force-static';

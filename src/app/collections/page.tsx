import styles from './page.module.css';

export default function CollectionsPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Collections</h1>
      <div className={styles.collections}>
        {/* Collections content will be added here */}
      </div>
    </div>
  );
}

export const dynamic = 'force-static';
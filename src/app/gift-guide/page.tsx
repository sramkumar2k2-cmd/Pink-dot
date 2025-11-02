import styles from './page.module.css';

export default function GiftGuidePage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Gift Guide</h1>
      <div className={styles.guides}>
        {/* Gift guides will be added here */}
      </div>
    </div>
  );
}

export const dynamic = 'force-static';
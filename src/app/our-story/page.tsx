import styles from './page.module.css';

export default function OurStoryPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Our Story</h1>
      <div className={styles.content}>
        {/* Story content will be added here */}
      </div>
    </div>
  );
}

export const dynamic = 'force-static';
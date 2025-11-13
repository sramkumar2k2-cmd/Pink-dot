import styles from './page.module.css';
import { FavoritesGrid } from '@/app/components/Favorites/FavoritesGrid';

export const metadata = {
  title: 'Your Favourites · Pink Dot',
  description: 'All the pieces you have saved in one place.',
};

export default function FavoritesPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Favourites</h1>
          <p className={styles.subtitle}>
            The pieces you heart stay saved here so you can compare, share, or pick up where you
            left off—no matter when you come back.
          </p>
        </div>

        <FavoritesGrid />
      </main>
    </div>
  );
}



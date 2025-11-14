import styles from './page.module.css';
import { CartGrid } from '@/app/components/Cart/CartGrid';

export const metadata = {
  title: 'Your Cart · Pink Dot',
  description: 'Review the pieces waiting in your Pink Dot cart.',
};

export default function CartPage() {
  return (
    <div className={styles.page}>
      <main className={styles.main}>
        <div className={styles.header}>
          <h1 className={styles.title}>Your Cart</h1>
          <p className={styles.subtitle}>
            Every product you add stays here securely in your browser, ready whenever you decide to
            checkout.
          </p>
        </div>

        <CartGrid />
      </main>
    </div>
  );
}



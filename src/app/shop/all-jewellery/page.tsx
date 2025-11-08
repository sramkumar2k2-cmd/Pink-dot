"use client";

import Link from "next/link";
import styles from "../page.module.css";

export default function AllJewelleryPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>All Jewellery</h1>
      <p className={styles.subtitle}>
        Explore the full Pink Dot collection, thoughtfully curated to add a
        touch of sparkle to every moment.
      </p>

      <div className={styles.grid}>
        <div className={styles.card}>
          <h2>Shop by Category</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/shop/necklaces">Necklaces</Link>
            </li>
            <li>
              <Link href="/shop/earrings">Earrings</Link>
            </li>
            <li>
              <Link href="/shop/bracelets">Bracelets</Link>
            </li>
            <li>
              <Link href="/shop/rings">Rings</Link>
            </li>
          </ul>
        </div>

        <div className={styles.card}>
          <h2>Featured Highlights</h2>
          <ul className={styles.list}>
            <li>
              <Link href="/shop/new-arrivals">New Arrivals</Link>
            </li>
            <li>
              <Link href="/shop/best-sellers">Best Sellers</Link>
            </li>
            <li>
              <Link href="/collections/limited-edition">Limited Edition</Link>
            </li>
            <li>
              <Link href="/gift-guide">Gift Guide</Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
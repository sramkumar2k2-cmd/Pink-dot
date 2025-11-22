"use client";

import styles from "../support.module.css";

export default function ReturnsPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Returns & Exchanges</h1>
      <div className={styles.content}>
        <p>
          We want you to adore every Pink Dot purchase. If something isn&apos;t quite right, you can request a return or exchange within <span className={styles.highlight}>5 days</span> of delivery.
        </p>
        <ul className={styles.list}>
          <li>Items must be unworn, in their original packaging, and accompanied by proof of purchase.</li>
          <li>Custom or engraved pieces are final sale unless there is a production issue.</li>
          <li>Return shipping labels are provided for all orders.</li>
        </ul>
        <p className={styles.callout}>
          To start a return, email <a href="mailto:pinkdotfashionjewellery@gmail.com">pinkdotfashionjewellery@gmail.com</a> with your order number and reason for return. We&apos;ll take it from there.
        </p>
      </div>
    </section>
  );
}


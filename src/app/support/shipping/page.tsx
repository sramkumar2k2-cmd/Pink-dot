"use client";

import styles from "../support.module.css";

export default function ShippingInformationPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Shipping Information</h1>
      <div className={styles.content}>
        <p>
          We dispatch all Pink Dot orders within <span className={styles.highlight}>1-2 business days</span>.
          You will receive tracking details via WhatsApp as soon as your parcel leaves our warehouse.
        </p>
        <ul className={styles.list}>
          <li><span className={styles.highlight}>Delivery:</span> 5-7 business days via our trusted courier partners.</li>
          <li><span className={styles.highlight}>Express shipping:</span> Available for an additional fee at checkout.</li>
        </ul>
        <p className={styles.callout}>
          If you need assistance tracking your package or adjusting your delivery address, please reach out to our customer care team at <a href="pinkdotfashionjewellery@gmail.com">pinkdotfashionjewellery@gmail.com</a>.
        </p>
      </div>
    </section>
  );
}


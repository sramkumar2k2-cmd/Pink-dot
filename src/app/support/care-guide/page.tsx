"use client";

import styles from "../support.module.css";

export default function CareGuidePage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Care Instructions</h1>
      <div className={styles.content}>
        <p>
          With a little love, your Pink Dot jewelry will stay luminous for years. Follow our care essentials to keep every piece glowing.
        </p>
        <ul className={styles.list}>
          <li>Store jewelry in the Pink Dot pouch provided to prevent scratching and tangling.</li>
          <li>Avoid contact with water, lotions, and perfumes to preserve plating and shine.</li>
          <li>Polish with a soft, lint-free cloth after each wear to remove natural oils.</li>
          <li>For deeper cleaning, gently soak in warm water with a drop of mild soap, rinse, and pat dry.</li>
        </ul>
        <p className={styles.callout}>
          Professional refresh? Book a complimentary polish by emailing <a href="pinkdotfashionjewellery@gmail.com">pinkdotfashionjewellery@gmail.com</a>. We&apos;re here to keep your sparkle alive.
        </p>
      </div>
    </section>
  );
}


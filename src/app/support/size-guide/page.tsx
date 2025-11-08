"use client";

import styles from "../support.module.css";

const sizeTips = [
  {
    title: "Rings",
    copy: "Measure the inside diameter of a ring you already own and match it to our chart. Between sizes? We recommend sizing up for comfort."
  },
  {
    title: "Necklaces",
    copy: "Our chains are adjustable between 16-18 inches. For layered looks, combine a 16 inch chain with a 20 inch piece for definition."
  },
  {
    title: "Bracelets",
    copy: "Our standard bracelets measure 6.5 inches with a 1 inch extender. For a relaxed fit, fasten to the extender&apos;s final loop."
  }
];

export default function SizeGuidePage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Size Guide</h1>
      <div className={styles.content}>
        <p>
          Finding the perfect fit ensures your Pink Dot piece feels as good as it looks. Use the guide below to select the right size for every style.
        </p>
        <div>
          {sizeTips.map((tip) => (
            <div key={tip.title} style={{ marginBottom: "1.25rem" }}>
              <p className={styles.highlight}>{tip.title}</p>
              <p>{tip.copy}</p>
            </div>
          ))}
        </div>
        <p className={styles.callout}>
          Need a custom size? Reach out to <a href="mailto:custom@pinkdot.com">custom@pinkdot.com</a> and we&apos;ll craft something just for you.
        </p>
      </div>
    </section>
  );
}


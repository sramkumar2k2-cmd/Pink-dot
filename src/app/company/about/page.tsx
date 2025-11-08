"use client";

import styles from "../company.module.css";

const values = [
  {
    title: "Thoughtful Design",
    copy: "Every Pink Dot piece starts with a sketch inspired by real stories—celebrations, milestones, and the quiet joy of everyday rituals."
  },
  {
    title: "Consciously Crafted",
    copy: "We partner with small-batch artisans who share our commitment to ethically sourced materials and gentle production practices."
  },
  {
    title: "Community First",
    copy: "From limited collaborations to pop-up workshops, we invest in experiences that spark connection and creativity."
  }
];

export default function AboutPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Our Story</h1>
      <p className={styles.subtitle}>
        Pink Dot was born in a sunlit studio with a simple idea: jewelry should feel like a love letter—to yourself,
        to the people you cherish, and to the chapters you&apos;re still writing.
      </p>
      <div className={styles.story}>
        <p>
          What began as a weekend passion project quickly grew into a community of makers, dreamers, and style enthusiasts.
          Each release is designed in-house, refined with our artisan partners, and finished by hand to capture that perfect balance of
          softness and sparkle.
        </p>
        <p>
          While our roots are in modern heirlooms, we&apos;re always exploring new textures, colors, and collaborations. We believe in slow,
          intentional collections that feel personal and timeless—no matter how you wear them.
        </p>
      </div>
      <div className={styles.grid}>
        {values.map((value) => (
          <div key={value.title} className={styles.card}>
            <p className={styles.cardTitle}>{value.title}</p>
            <p>{value.copy}</p>
          </div>
        ))}
      </div>
    </section>
  );
}


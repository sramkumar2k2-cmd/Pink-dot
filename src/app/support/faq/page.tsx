"use client";

import styles from "../support.module.css";

const faqs = [
  {
    question: "When will my order ship?",
    answer: "Orders ship within 1-2 business days. You will receive tracking information as soon as your package leaves our studio."
  },
  {
    question: "Do you offer gift wrapping?",
    answer: "Yes! Select gift wrap at checkout and we will add our signature Pink Dot wrap, ribbon, and a handwritten note."
  },
  {
    question: "Can I update my shipping address?",
    answer: "If your order has not shipped yet, contact us immediately at hello@pinkdot.com and we will update the address for you."
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept mobile payment transfer using QR codes and bank transfers for qualifying orders."
  }
];

export default function FAQPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Frequently Asked Questions</h1>
      <div className={styles.content}>
        {faqs.map((item) => (
          <div key={item.question}>
            <p className={styles.highlight}>{item.question}</p>
            <p>{item.answer}</p>
          </div>
        ))}
        <p className={styles.callout}>
          Didn&apos;t find what you were looking for? Send us a note at <a href="pinkdotfashionjewellery@gmail.com">pinkdotfashionjewellery@gmail.com</a> and we&apos;ll be happy to help.
        </p>
      </div>
    </section>
  );
}


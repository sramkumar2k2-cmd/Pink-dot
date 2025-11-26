"use client";

import styles from "../legal.module.css";

export default function PrivacyPolicyPage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Privacy Policy</h1>
      <p className={styles.updated}>Last updated: November 2025</p>
      <div className={styles.content}>
        <div>
          <p className={styles.heading}>Your Trust Matters</p>
          <p>
            Pink Dot collects only the information we need to fulfill your orders, personalize your shopping experience,
            and keep you in the loop about new pieces we think you&apos;ll love. We never sell your data and limit sharing
            to partners who help us process payments, ship orders, and improve our services.
          </p>
        </div>
        <div>
          <p className={styles.heading}>What We Collect</p>
          <ul className={styles.list}>
            <li>Contact details such as your name, email address, and shipping address.</li>
            <li>Order history, preferences, and notes you share with our customer care team.</li>
            <li>Website analytics to understand how Pink Dot is discovered and enjoyed.</li>
          </ul>
        </div>
        <div>
          <p className={styles.heading}>Your Choices</p>
          <p>
            You can update your details, opt out of marketing emails, or delete your account at any time by contacting
            <a href="pinkdotfashionjewellery@gmail.com"> pinkdotfashionjewellery@gmail.com</a>. We respond to all privacy requests within 48 hours.
          </p>
        </div>
      </div>
    </section>
  );
}


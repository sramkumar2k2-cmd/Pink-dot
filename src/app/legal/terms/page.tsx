"use client";

import styles from "../legal.module.css";

export default function TermsOfServicePage() {
  return (
    <section className={styles.page}>
      <h1 className={styles.title}>Terms of Service</h1>
      <p className={styles.updated}>Effective date: November 2025</p>
      <div className={styles.content}>
        <div>
          <p className={styles.heading}>Welcome to Pink Dot</p>
          <p>
            By visiting our site or purchasing something from Pink Dot, you agree to these terms. We design every policy to keep
            your experience transparent, secure, and delightfully simple.
          </p>
        </div>
        <div>
          <p className={styles.heading}>Ordering & Availability</p>
          <p>
            All prices are listed in INR unless noted otherwise. We reserve the right to update product listings,
            adjust pricing, or limit quantities to ensure fair access to limited-edition pieces.
          </p>
        </div>
        <div>
          <p className={styles.heading}>Use of Our Services</p>
          <ul className={styles.list}>
            <li>You must provide accurate account and payment information.</li>
            <li>Content on Pink Dot is protected by intellectual property laws; please ask before sharing.</li>
            <li>We may suspend accounts engaged in fraudulent or abusive activity.</li>
          </ul>
        </div>
        <div>
          <p className={styles.heading}>Need Support?</p>
          <p>
            Reach out to <a href="mailto:legal@pinkdot.com">legal@pinkdot.com</a> with any questions about these terms.
            We&apos;re always happy to help.
          </p>
        </div>
      </div>
    </section>
  );
}


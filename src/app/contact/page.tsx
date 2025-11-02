import styles from './page.module.css';

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <h1 className={styles.title}>Contact Us</h1>
      <form className={styles.form}>
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            name="email"
            className={styles.input}
            required
          />
        </div>
        
        <div className={styles.formGroup}>
          <label className={styles.label} htmlFor="message">Message</label>
          <textarea
            id="message"
            name="message"
            className={styles.textarea}
            required
          />
        </div>
        
        <button type="submit" className={styles.button}>
          Send Message
        </button>
      </form>
    </div>
  );
}

export const dynamic = 'force-static';
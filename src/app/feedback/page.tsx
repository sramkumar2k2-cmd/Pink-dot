"use client";

import Image from 'next/image';
import styles from './page.module.css';

// Feedback data - You can update this with your Google reviews/feedback
// Add images by placing them in the /public/images/feedback/ folder
const feedbackData = [
  {
    id: 1,
    name: "Priya Sharma",
    location: "Mumbai",
    rating: 5,
    text: "The quality is exceptional and the designs are absolutely stunning. I receive compliments every time I wear my Pink Dot pieces!",
    date: "2024-01-15",
    image: "/images/feedback/feedback1.jpg", // Add your images here
    verified: true,
  },
  {
    id: 2,
    name: "Ananya Patel",
    location: "Delhi",
    rating: 5,
    text: "Beautiful craftsmanship and attention to detail. The jewelry feels luxurious and makes me feel special every day.",
    date: "2024-01-20",
    image: "/images/feedback/feedback2.jpg",
    verified: true,
  },
  {
    id: 3,
    name: "Meera Reddy",
    location: "Bangalore",
    rating: 5,
    text: "Fast shipping and excellent customer service. The pieces are even more beautiful in person than in photos!",
    date: "2024-02-01",
    image: "/images/feedback/feedback3.jpg",
    verified: true,
  },
  {
    id: 4,
    name: "Kavya Nair",
    location: "Chennai",
    rating: 5,
    text: "I've been a customer for over a year now and every piece I've purchased has exceeded my expectations. Highly recommend!",
    date: "2024-02-10",
    image: "/images/feedback/feedback4.jpg",
    verified: true,
  },
  {
    id: 5,
    name: "Riya Kapoor",
    location: "Pune",
    rating: 5,
    text: "The packaging is so elegant and the jewelry itself is even more beautiful than I imagined. Will definitely order again!",
    date: "2024-02-15",
    image: "/images/feedback/feedback5.jpg",
    verified: true,
  },
  {
    id: 6,
    name: "Sneha Desai",
    location: "Ahmedabad",
    rating: 5,
    text: "Amazing quality and the customer service team is so helpful. They helped me choose the perfect piece for my sister's birthday.",
    date: "2024-02-20",
    image: "/images/feedback/feedback6.jpg",
    verified: true,
  },
];

export default function FeedbackPage() {
  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Customer Feedback</h1>
        <p className={styles.subtitle}>
          Real reviews from our valued customers sharing their Pink Dot experience
        </p>
      </div>

      <div className={styles.statsSection}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>4.9</div>
          <div className={styles.statLabel}>Average Rating</div>
          <div className={styles.statStars}>⭐⭐⭐⭐⭐</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>500+</div>
          <div className={styles.statLabel}>Happy Customers</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>98%</div>
          <div className={styles.statLabel}>Would Recommend</div>
        </div>
      </div>

      <div className={styles.feedbackGrid}>
        {feedbackData.map((feedback) => (
          <article key={feedback.id} className={styles.feedbackCard}>
            <div className={styles.feedbackHeader}>
              <div className={styles.customerInfo}>
                <div className={styles.avatar}>
                  {feedback.name.charAt(0)}
                </div>
                <div className={styles.customerDetails}>
                  <div className={styles.customerName}>
                    {feedback.name}
                    {feedback.verified && (
                      <span className={styles.verifiedBadge} title="Verified Purchase">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" fill="currentColor"/>
                        </svg>
                      </span>
                    )}
                  </div>
                  <div className={styles.customerLocation}>{feedback.location}</div>
                </div>
              </div>
              <div className={styles.feedbackRating}>
                {Array.from({ length: 5 }).map((_, i) => (
                  <span
                    key={i}
                    className={`${styles.star} ${i < feedback.rating ? styles.starFilled : styles.starEmpty}`}
                  >
                    ⭐
                  </span>
                ))}
              </div>
            </div>

            <p className={styles.feedbackText}>"{feedback.text}"</p>

            {feedback.image && (
              <div className={styles.feedbackImageWrapper}>
                <Image
                  src={feedback.image}
                  alt={`${feedback.name}'s feedback`}
                  fill
                  className={styles.feedbackImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  onError={(e) => {
                    // Hide image if it doesn't exist
                    (e.target as HTMLImageElement).style.display = 'none';
                  }}
                />
              </div>
            )}

            <div className={styles.feedbackFooter}>
              <span className={styles.feedbackDate}>
                {new Date(feedback.date).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </span>
              <a
                href="https://g.page/r/YOUR_GOOGLE_BUSINESS_PAGE"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.googleLink}
              >
                View on Google
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </article>
        ))}
      </div>

      <div className={styles.ctaSection}>
        <h2 className={styles.ctaTitle}>Share Your Experience</h2>
        <p className={styles.ctaSubtitle}>
          Love your Pink Dot pieces? We'd love to hear from you!
        </p>
        <div className={styles.ctaButtons}>
          <a
            href="https://g.page/r/YOUR_GOOGLE_BUSINESS_PAGE"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.primaryButton}
          >
            Leave a Review on Google
          </a>
          <a
            href="/contact"
            className={styles.secondaryButton}
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
}


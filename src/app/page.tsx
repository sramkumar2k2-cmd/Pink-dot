'use client';

import Link from "next/link";
import Image from "next/image";
import { ProductCard } from "@/app/components/ProductCard";
import { getProductsByCategory } from "@/app/shop/productData";
import styles from "./page.module.css";

const featureCards = [
  {
    title: "Signature Collections",
    description:
      "Explore curated edits featuring celestial motifs, timeless pearls, and art deco inspirations.",
    className: styles.cardOne,
  },
  {
    title: "Heirloom Craft",
    description:
      "Limited-run pieces crafted with precious metals and gemstones—made to be treasured for generations.",
    className: styles.cardTwo,
  },
  {
    title: "Personalised Touch",
    description:
      "Enjoy complimentary engraving, bespoke sizing, and gifting services tailored to your celebrations.",
    className: styles.cardThree,
  },
];

const collections = [
  {
    name: "Celestial Dreams",
    description: "Ethereal gemstones and moonlit silhouettes",
    image: "/images/neck3.jpeg",
    href: "/collections/celestial-dreams",
  },
  {
    name: "Art Deco Revival",
    description: "Bold geometry and architectural elegance",
    image: "/images/ring3.jpeg",
    href: "/collections/art-deco-revival",
  },
  {
    name: "Summer Collection",
    description: "Vibrant hues for sun-kissed moments",
    image: "/images/earrings2.jpeg",
    href: "/collections/summer-collection",
  },
];

const testimonials = [
  {
    name: "Priya Sharma",
    location: "Mumbai",
    text: "The quality is exceptional and the designs are absolutely stunning. I receive compliments every time I wear my Pink Dot pieces!",
    rating: 5,
  },
  {
    name: "Ananya Patel",
    location: "Delhi",
    text: "Beautiful craftsmanship and attention to detail. The jewelry feels luxurious and makes me feel special every day.",
    rating: 5,
  },
  {
    name: "Meera Reddy",
    location: "Bangalore",
    text: "Fast shipping and excellent customer service. The pieces are even more beautiful in person than in photos!",
    rating: 5,
  },
];

const whyChooseUs = [
  {
    icon: "✨",
    title: "Handcrafted Excellence",
    description: "Each piece is meticulously crafted by skilled artisans using traditional techniques.",
  },
  {
    icon: "💎",
    title: "Premium Materials",
    description: "We use only the finest metals and gemstones, ensuring lasting beauty and quality.",
  },
  {
    icon: "🎁",
    title: "Perfect Gifts",
    description: "Complimentary gift wrapping and personalized engraving available for special occasions.",
  },
  {
    icon: "🚚",
    title: "Fast Delivery",
    description: "Secure packaging and express shipping options to get your treasures to you quickly.",
  },
];

export default function Home() {
  const bestSellers = getProductsByCategory('best-sellers').slice(0, 4);
  const newArrivals = getProductsByCategory('new-arrivals').slice(0, 4);

  return (
    <>
      <main className={styles.hero}>
        <div className={styles.decorations}>
          <span className={`${styles.sparkle} ${styles.sparkleOne}`} />
          <span className={`${styles.sparkle} ${styles.sparkleTwo}`} />
          <span className={`${styles.sparkle} ${styles.sparkleThree}`} />
        </div>

        <div className={styles.glowOrb} />
        <div className={styles.glowOrbSecondary} />

        <div className={styles.content}>
          <span className={styles.kicker}>Curated Jewellery Collections</span>
          <h1 className={styles.title}>
            Discover the <span className={styles.highlight}>Pink Dot Shop</span>
          </h1>
          <p className={styles.subtitle}>
            Browse our full assortment of handcrafted jewels, from everyday essentials to heirloom-worthy statements.
            Each piece is thoughtfully designed to shimmer with your story.
          </p>

          <div className={styles.ctaGroup}>
            <Link href="/shop/new-arrivals" className={styles.primaryCta}>
              Shop New Arrivals
            </Link>
            <Link href="/shop/all-jewellery" className={styles.secondaryCta}>
              View All Jewellery
            </Link>
          </div>

          <section className={styles.grid}>
            {featureCards.map((card) => (
              <article key={card.title} className={`${styles.card} ${card.className}`}>
                <div className={styles.cardHalo} />
                <h2 className={styles.cardTitle}>{card.title}</h2>
                <p className={styles.cardText}>{card.description}</p>
              </article>
            ))}
          </section>
        </div>
      </main>

      {/* Best Sellers Section */}
      {bestSellers.length > 0 && (
        <section className={styles.bestSellersSection}>
          <div className={styles.bestSellersBackground}>
            <div className={styles.bestSellersPattern}></div>
          </div>
          <div className={styles.bestSellersContent}>
            <div className={styles.bestSellersHeader}>
              <div className={styles.bestSellersBadge}>
                <span className={styles.badgeIcon}>⭐</span>
                <span>Customer Favorites</span>
              </div>
              <h2 className={styles.bestSellersTitle}>Best Sellers</h2>
              <p className={styles.bestSellersSubtitle}>
                Discover the pieces our customers love most—handpicked for their timeless beauty and exceptional quality
              </p>
            </div>
            <div className={styles.bestSellersGrid}>
              {bestSellers.map((product) => (
                <div key={product.slug} className={styles.bestSellerCard}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className={styles.bestSellersCta}>
              <Link href="/shop/best-sellers" className={styles.bestSellersButton}>
                Explore All Best Sellers
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* New Arrivals Section */}
      {newArrivals.length > 0 && (
        <section className={styles.newArrivalsSection}>
          <div className={styles.newArrivalsBackground}>
            <div className={styles.newArrivalsPattern}></div>
          </div>
          <div className={styles.newArrivalsContent}>
            <div className={styles.newArrivalsHeader}>
              <div className={styles.newArrivalsBadge}>
                <span className={styles.badgeIcon}>✨</span>
                <span>Just In</span>
              </div>
              <h2 className={styles.newArrivalsTitle}>New Arrivals</h2>
              <p className={styles.newArrivalsSubtitle}>
                Be the first to discover our latest designs—fresh pieces that bring new elegance to your collection
              </p>
            </div>
            <div className={styles.newArrivalsGrid}>
              {newArrivals.map((product) => (
                <div key={product.slug} className={styles.newArrivalCard}>
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className={styles.newArrivalsCta}>
              <Link href="/shop/new-arrivals" className={styles.newArrivalsButton}>
                Shop All New Arrivals
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* Collections Section */}
      <section className={styles.collectionsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Explore Our Collections</h2>
          <p className={styles.sectionSubtitle}>Curated themes to match your style</p>
        </div>
        <div className={styles.collectionsGrid}>
          {collections.map((collection) => (
            <Link key={collection.name} href={collection.href} className={styles.collectionCard}>
              <div className={styles.collectionImageWrapper}>
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className={styles.collectionImage}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
              <div className={styles.collectionContent}>
                <h3 className={styles.collectionName}>{collection.name}</h3>
                <p className={styles.collectionDescription}>{collection.description}</p>
              </div>
            </Link>
          ))}
        </div>
        <div className={styles.collectionsCta}>
          <Link href="/collections" className={styles.primaryCta}>
            View All Collections
          </Link>
        </div>
      </section>

      {/* Why Choose Us Section */}
      <section className={styles.whyChooseSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Why Choose Pink Dot</h2>
          <p className={styles.sectionSubtitle}>What makes us special</p>
        </div>
        <div className={styles.featuresGrid}>
          {whyChooseUs.map((feature, index) => (
            <div key={index} className={styles.featureCard}>
              <div className={styles.featureIcon}>{feature.icon}</div>
              <h3 className={styles.featureTitle}>{feature.title}</h3>
              <p className={styles.featureDescription}>{feature.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Testimonials Section */}
      <section className={styles.testimonialsSection}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>What Our Customers Say</h2>
          <p className={styles.sectionSubtitle}>Real stories from real customers</p>
        </div>
        <div className={styles.testimonialsGrid}>
          {testimonials.map((testimonial, index) => (
            <div key={index} className={styles.testimonialCard}>
              <div className={styles.testimonialStars}>
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </div>
              <p className={styles.testimonialText}>"{testimonial.text}"</p>
              <div className={styles.testimonialAuthor}>
                <strong>{testimonial.name}</strong>
                <span>{testimonial.location}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Newsletter Section */}
      <section className={styles.newsletterSection}>
        <div className={styles.newsletterContent}>
          <h2 className={styles.newsletterTitle}>Stay in the Loop</h2>
          <p className={styles.newsletterSubtitle}>
            Be the first to know about new arrivals, exclusive offers, and styling tips
          </p>
          <form className={styles.newsletterForm}>
            <input
              type="email"
              placeholder="Enter your email address"
              className={styles.newsletterInput}
              required
            />
            <button type="submit" className={styles.newsletterButton}>
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </>
  );
}

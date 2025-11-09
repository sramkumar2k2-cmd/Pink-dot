import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const heroHighlights = [
  'Loved by over 25,000 Pink Dot collectors worldwide',
  'Shipped within 24 hours with complimentary gift wrap',
  'Lifetime replating and resizing on signature favourites',
];

const topSeller = {
  name: 'Luna Cascade Collar',
  description:
    'Our most-requested layering piece, with luminous moonstones anchored by a satin-finished collar.',
  price: '£185',
  image: '/images/neck3.jpeg',
  stats: ['4.9 ★ (1,280 reviews)', 'Ships today', 'Lifetime replating'],
};

const bestSellers = [
  {
    name: 'Nova Crown Band',
    category: 'Ring',
    price: '£465',
    description: 'Alternating baguette brilliance for a crown of light.',
    image: '/images/ring1.jpeg',
    badge: 'Most loved',
  },
  {
    name: 'Solstice Hoops',
    category: 'Earrings',
    price: '£178',
    description: 'Convertible hoops with removable gemstone charms.',
    image: '/images/earrings2.jpeg',
    badge: 'Staff pick',
  },
  {
    name: 'Muse Charm Chain',
    category: 'Bracelet',
    price: '£185',
    description: 'Vintage-inspired charms strung along a rolo chain.',
    image: '/images/bracelets1.jpeg',
    badge: 'Back in stock',
  },
  {
    name: 'Celestial Halo Ring',
    category: 'Ring',
    price: '£720',
    description: 'Mirror-cut centre stone framed with micro pavé halo.',
    image: '/images/ring3.jpeg',
    badge: 'Limited',
  },
  {
    name: 'Aurora Lariat',
    category: 'Necklace',
    price: '£168',
    description: 'Hand-polished quartz anchored to a duo-length lariat.',
    image: '/images/neck1.jpeg',
    badge: 'Bestseller',
  },
  {
    name: 'Opaline Chandeliers',
    category: 'Earrings',
    price: '£240',
    description: 'Iridescent fringe with every step—crafted for soirées.',
    image: '/images/earrings5.jpeg',
    badge: 'Evening favourite',
  },
];

const testimonials = [
  {
    quote:
      'The Luna Cascade Collar is the necklace I reach for every morning. It layers with everything and still feels special.',
    name: 'Elena H. — London',
  },
  {
    quote:
      'Pink Dot hoops are the only ones that never irritate my ears. The Solstice pair is featherlight!',
    name: 'Priya S. — Mumbai',
  },
  {
    quote: 'We chose the Nova Crown Band as our anniversary ring—sparkle for days and custom sizing was a breeze.',
    name: 'Jordan + Alex — New York',
  },
];

export default function BestSellersPage() {
  return (
    <main className={styles.main}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <span className={styles.heroTag}>Best Sellers</span>
          <h1 className={styles.heroTitle}>Pieces our community can’t stop wearing</h1>
          <p className={styles.heroSubtitle}>
            Explore the jewels that sell out every season—crafted in limited runs and restocked by popular demand.
          </p>
          <ul className={styles.heroHighlights}>
            {heroHighlights.map((highlight) => (
              <li key={highlight}>
                <span className={styles.highlightIcon} />
                {highlight}
              </li>
            ))}
          </ul>
          <div className={styles.heroActions}>
            <Link href="/shop/new-arrivals" className={styles.primaryButton}>
              See what’s new
            </Link>
            <Link href="/collections/best-sellers" className={styles.secondaryButton}>
              View full edit
            </Link>
          </div>
        </div>
        <div className={styles.heroShowcase}>
          <div className={styles.heroCard}>
            <span className={styles.heroBadge}>Top rated</span>
            <h2 className={styles.heroCardTitle}>{topSeller.name}</h2>
            <p className={styles.heroCardDescription}>{topSeller.description}</p>
            <div className={styles.heroCardMeta}>
              <span>{topSeller.price}</span>
              <span>Ships today</span>
            </div>
            <div className={styles.heroCardImage}>
              <Image
                src={topSeller.image}
                alt={`${topSeller.name} showcased on velvet`}
                fill
                sizes="(max-width: 768px) 100vw, 320px"
                priority
                className={styles.heroCardPhoto}
              />
            </div>
            <ul className={styles.heroStats}>
              {topSeller.stats.map((stat) => (
                <li key={stat}>{stat}</li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className={styles.collectionSection}>
        <div className={styles.sectionHeading}>
          <h2>Most-loved jewels right now</h2>
          <p>Limited runs that rarely stay in stock. Add to your collection while they’re still glowing on our shelves.</p>
        </div>
        <div className={styles.productsGrid}>
          {bestSellers.map((product) => (
            <article key={product.name} className={styles.productCard}>
              <div className={styles.productImageWrapper}>
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 280px"
                  className={styles.productImage}
                />
                <span className={styles.productBadge}>{product.badge}</span>
              </div>
              <div className={styles.productContent}>
                <span className={styles.productCategory}>{product.category}</span>
                <h3 className={styles.productName}>{product.name}</h3>
                <p className={styles.productDescription}>{product.description}</p>
                <div className={styles.productFooter}>
                  <span>{product.price}</span>
                  <button type="button" className={styles.productButton}>
                    Quick add
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.storySection}>
        <div className={styles.sectionHeading}>
          <h2>Why they sell out</h2>
          <p>Three reasons these designs top every wish list—season after season.</p>
        </div>
        <div className={styles.storyGrid}>
          <div className={styles.storyCard}>
            <h3>Limited runs</h3>
            <p>We craft in small batches to keep our edits intentional, with restocks guided by community votes.</p>
          </div>
          <div className={styles.storyCard}>
            <h3>Finite details</h3>
            <p>Hand-set stones, hidden engravings, and custom clasps make each piece feel tailor-made.</p>
          </div>
          <div className={styles.storyCard}>
            <h3>Lifetime care</h3>
            <p>Every bestseller includes complimentary replating and a yearly polish—on the house.</p>
          </div>
        </div>
      </section>

      <section className={styles.testimonialSection}>
        <div className={styles.sectionHeading}>
          <h2>Loved in the wild</h2>
          <p>Stories from Pink Dot collectors who made these best sellers part of their everyday glow.</p>
        </div>
        <ul className={styles.testimonialList}>
          {testimonials.map((testimonial) => (
            <li key={testimonial.name}>
              <blockquote>{testimonial.quote}</blockquote>
              <cite>{testimonial.name}</cite>
            </li>
          ))}
        </ul>
      </section>

      <section className={styles.ctaBanner}>
        <div>
          <h2>Be first to know about restocks</h2>
          <p>Join the Pink Dot insider list and receive early access to our best seller drops.</p>
        </div>
        <div className={styles.ctaActions}>
          <Link href="/contact" className={styles.primaryButton}>
            Join the list
          </Link>
          <Link href="/collections" className={styles.secondaryButton}>
            Explore collections
          </Link>
        </div>
      </section>
    </main>
  );
}
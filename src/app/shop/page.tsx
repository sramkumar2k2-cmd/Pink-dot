import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import { ProductCard } from '@/app/components/ProductCard';
import { getProductBySlug, getProductsByCategory } from '@/app/shop/productData';
import type { Product } from '@/app/shop/productData';
import styles from './page.module.css';
import FadeReveal from '@/app/components/FadeReveal/FadeReveal';
import fadeStyles from '@/app/components/FadeReveal/FadeReveal.module.css';

const heroHighlights = [
  'New studio drops every Thursday evening',
  'Precious metals recycled and hand-finished in Jaipur & Vicenza',
  'Complimentary engraving, gift wrap, and lifetime replating',
];

const heroSpotlight = {
  badge: 'Curated trio',
  name: 'Layered Radiance',
  description: 'Aurora Lariat, Luna Glow Studs, and Muse Charm Chain layered to perfection.',
  image: '/images/neck3.jpeg',
  imageAlt: 'Layered Radiance trio styled together',
  meta: ['₹49,500 trio value', 'Ships in 24hrs'],
  swatches: heroHighlights,
};

const categoryCards = [
  {
    name: 'All Jewellery',
    description: 'Explore every Pink Dot treasure in one shimmering gallery.',
    href: '/shop/all-jewellery',
    image: '/images/neck6.jpeg',
    badge: 'Everything',
  },
  {
    name: 'Necklaces',
    description: 'Layerable collars, pendants, and chains for every neckline.',
    href: '/shop/necklaces',
    image: '/images/neck2.jpeg',
    badge: 'Layering sets',
  },
  {
    name: 'Earrings',
    description: 'From whisper-light studs to chandelier statements.',
    href: '/shop/earrings',
    image: '/images/earrings5.jpeg',
    badge: 'Ear party',
  },
  {
    name: 'Rings',
    description: 'Stacks, solitaires, and personalised signets.',
    href: '/shop/rings',
    image: '/images/ring3.jpeg',
    badge: 'Stack & shine',
  },
  {
    name: 'Bracelets',
    description: 'Tennis classics, charm chains, and sculptural cuffs.',
    href: '/shop/bracelets',
    image: '/images/bracelets3.jpeg',
    badge: 'Wrist candy',
  },
  {
    name: 'Best Sellers',
    description: 'Beloved treasures that sell out every season.',
    href: '/shop/best-sellers',
    image: '/images/neck1.jpeg',
    badge: 'Trending now',
  },
];

const curatedSets = [
  {
    name: 'Layered Radiance',
    description: 'Aurora Lariat, Luna Glow Studs, and Muse Charm Chain layered to perfection.',
    price: '₹49,500 trio value',
    originalPrice: '₹62,000',
    image: '/images/neck3.jpeg',
    href: '/collections/oxidised-jewellery',
    badge: 'Best Value',
    features: ['3-piece set', 'Perfect for layering', 'Studio styled'],
    savings: 'Save ₹12,500',
  },
  {
    name: 'Celestial Night Out',
    description: 'Opaline Chandeliers paired with Celestial Halo Ring for after-dark shimmer.',
    price: '₹79,900 set',
    image: '/images/earrings3.jpeg',
    href: '/collections/american-diamond-jewellery',
    badge: 'Antique Jewellery',
    features: ['Evening elegance', 'Hand-set stones', 'Exclusive design'],
    savings: null,
  },
  {
    name: 'Everyday Muse',
    description: 'Solstice Hoops, Muse Charm Bracelet, and Nova Crown Band for daily shine.',
    price: '₹58,900 trio',
    image: '/images/bracelets1.jpeg',
    href: '/shop/new-arrivals',
    badge: 'Daily Wear',
    features: ['Comfortable fit', 'Versatile styling', 'Lifetime care'],
    savings: null,
  },
  {
    name: 'Bridal Elegance',
    description: 'A complete bridal set featuring Nova Crown Band, Opaline Chandeliers, and Aurora Lariat.',
    price: '₹1,25,000 set',
    originalPrice: '₹1,48,000',
    image: '/images/neck1.jpeg',
    href: '/collections/antique-jewellery',
    badge: 'Wedding Collection',
    features: ['Complete set', 'Customizable', 'Gift packaging'],
    savings: 'Save ₹23,000',
  },
  {
    name: 'Minimalist Stack',
    description: 'Clean lines with Luna Stacking Trio, Solstice Signet, and Muse Charm Chain.',
    price: '₹42,500 set',
    image: '/images/ring2.jpeg',
    href: '/collections/kundan-jewellery',
    badge: 'Minimalist',
    features: ['Stackable pieces', 'Modern design', 'Everyday luxury'],
    savings: null,
  },
  {
    name: 'Premium Gold Plated Jewellery',
    description: 'Vintage-inspired elegance with geometric patterns and bold statements.',
    price: '₹95,000 collection',
    image: '/images/neck2.jpeg',
    href: '/collections/premium-gold-plated-jewellery',
    badge: 'Vintage Style',
    features: ['Art deco inspired', 'Statement pieces', 'Unique designs'],
    savings: null,
  },
];

const services = [
  {
    title: 'Virtual Styling',
    blurb: 'Book a 20-minute styling session to design your stack with our studio team.',
    href: '/contact',
    linkLabel: 'Reserve a consult',
    icon: '✨',
  },
  {
    title: 'Bespoke Studio',
    blurb: 'Sketch something uniquely yours with custom stones, engraving, and metal choices.',
    href: '/collections/antique-jewellery',
    linkLabel: 'Design bespoke',
    icon: '🎨',
  },
];

const featuredProductSlugs = [
  'nova-crown-band',
  'solstice-hoops',
  'muse-charm-chain',
  'aurora-lariat',
];

const newArrivalSlugs = [
  'celestial-halo-ring',
  'opaline-chandeliers',
  'luna-cascade-collar',
  'radiant-pave-band',
];

const bestSellerSlugs = [
  'nova-crown-band',
  'solstice-hoops',
  'muse-charm-chain',
  'aurora-lariat',
  'luna-cascade-collar',
  'opaline-chandeliers',
];

const saleProductSlugs = [
  'radiant-pave-band',
  'solstice-signet',
  'luna-stacking-trio',
];

const featuredProducts = featuredProductSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item))
  .slice(0, 4);

const newArrivals = newArrivalSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item))
  .slice(0, 4);

const bestSellers = bestSellerSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item))
  .slice(0, 6);

const saleProducts = saleProductSlugs
  .map((slug) => getProductBySlug(slug))
  .filter((item): item is Product => Boolean(item))
  .slice(0, 3);

const collections = [
  {
    name: 'American Diamond Jewellery',
    description: 'Ethereal gemstones and moonlit silhouettes that capture the magic of the night sky.',
    image: '/images/neck3.jpeg',
    href: '/collections/american-diamond-jewellery',
    badge: 'New',
  },
  {
    name: 'Premium Gold Plated Jewellery',
    description: 'Bold geometry and architectural elegance inspired by the roaring twenties.',
    image: '/images/ring3.jpeg',
    href: '/collections/premium-gold-plated-jewellery',
    badge: 'Limited',
  },
  {
    name: 'Oxidised Jewellery',
    description: 'Vibrant hues and lightweight designs perfect for sun-kissed moments.',
    image: '/images/earrings2.jpeg',
    href: '/collections/oxidised-jewellery',
    badge: 'Seasonal',
  },
  {
    name: 'Kundan Jewellery',
    description: 'Clean lines and understated elegance for everyday sophistication.',
    image: '/images/bracelets2.jpeg',
    href: '/collections/kundan-jewellery',
    badge: 'Essentials',
  },
];

const whyChooseUs = [
  {
    icon: '✨',
    title: 'Handcrafted Excellence',
    description: 'Each piece is meticulously crafted by skilled artisans using traditional techniques passed down through generations.',
  },
  {
    icon: '💎',
    title: 'Premium Materials',
    description: 'We use only the finest recycled metals and ethically sourced gemstones, ensuring lasting beauty and quality.',
  },
  {
    icon: '🎁',
    title: 'Perfect Gifts',
    description: 'Complimentary gift wrapping, personalized engraving, and custom sizing available for every special occasion.',
  },
  {
    icon: '🚚',
    title: 'Fast Delivery',
    description: 'Secure packaging and express shipping options to get your treasures to you quickly and safely.',
  },
  {
    icon: '🔄',
    title: 'Lifetime Care',
    description: 'Complimentary replating, resizing, and annual polishing services to keep your jewels shining forever.',
  },
  {
    icon: '💝',
    title: 'Personal Styling',
    description: 'Book a virtual consultation with our stylists to create the perfect stack tailored to your unique style.',
  },
];

const testimonials = [
  {
    quote: 'Every piece feels like it was made just for me. The quality is exceptional and the designs are timeless.',
    author: 'Sarah M.',
    location: 'Mumbai',
    rating: 5,
  },
  {
    quote: 'I love how Pink Dot pieces layer together. My collection has become my signature style.',
    author: 'Priya K.',
    location: 'Delhi',
    rating: 5,
  },
  {
    quote: 'The customer service is outstanding, and the jewellery is even more beautiful in person.',
    author: 'Ananya R.',
    location: 'Bangalore',
    rating: 5,
  },
];

export default function ShopPage() {
  return (
    <>
      <AnimatedHero
        tag="The Pink Dot Atelier"
        title="Jewellery designed to illuminate every chapter"
        subtitle="Discover signature silhouettes, studio-fresh arrivals, and limited-run heirlooms—each crafted by our artisans to be layered, loved, and lived in."
        backgroundImage="/images/neck4.jpeg"
        actions={[
          { label: 'Shop fresh arrivals', href: '/shop/new-arrivals' },
          { label: 'View entire collection', href: '/shop/all-jewellery', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(122deg, rgba(12, 18, 36, 0.74), rgba(86, 46, 126, 0.38))"
        glowColors={{ primary: 'rgba(236, 197, 255, 0.68)', secondary: 'rgba(132, 214, 255, 0.48)' }}
        spotlight={heroSpotlight}
        theme="shop-aurora"
        backgroundFilter="brightness(0.78) saturate(1.12)"
        sparkleStyle={{
          gradient: 'radial-gradient(circle, rgba(255, 255, 255, 0.95) 0%, rgba(186, 218, 255, 0.45) 70%)',
          shadow: '0 0 24px rgba(176, 216, 255, 0.55)',
          size: '18px',
        }}
      />

      <div className={styles.shopPage}>
        <main className={styles.shopSections}>
          <FadeReveal />

          <section
            className={[styles.shopHighlightsSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.18s' }}
          >
            <div className={fadeStyles.fadeInStart} data-fade style={{ transitionDelay: '0.22s' }}>
              <h2>What’s glowing right now</h2>
              <p>
                Curated edits to find your perfect match—browse by category or dive straight into the pieces our collectors
                love most.
              </p>
            </div>
            <div className={styles.shopStats}>
              <div className={fadeStyles.fadeInStart} data-fade style={{ transitionDelay: '0.26s' }}>
                <span>250+</span>
                <p>Jewellery designs available online</p>
              </div>
              <div className={fadeStyles.fadeInStart} data-fade style={{ transitionDelay: '0.32s' }}>
                <span>72 hrs</span>
                <p>Average delivery on in-stock pieces</p>
              </div>
              <div className={fadeStyles.fadeInStart} data-fade style={{ transitionDelay: '0.38s' }}>
                <span>Lifetime</span>
                <p>Complimentary replating & sizing</p>
              </div>
            </div>
          </section>

          <section
            className={[styles.shopFeaturedSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.2s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.24s' }}>
              <h2>Featured Treasures</h2>
              <p>Handpicked favorites from our studio—each piece tells a story of craftsmanship and elegance.</p>
            </div>
            <div className={styles.shopProductsGrid}>
              {featuredProducts.map((product, index) => (
                <div
                  key={product.slug}
                  className={fadeStyles.fadeInStart}
                  data-fade
                  style={{ transitionDelay: `${index * 0.1 + 0.28}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className={[styles.shopViewAll, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.32s' }}>
              <Link href="/shop/all-jewellery" className={styles.shopButtonPrimary}>
                View All Products
              </Link>
            </div>
          </section>

          <section
            className={[styles.shopNewArrivalsSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.22s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.26s' }}>
              <h2>Fresh from the Studio</h2>
              <p>New arrivals that just landed—be the first to discover these antique jewellery pieces.</p>
            </div>
            <div className={styles.shopProductsGrid}>
              {newArrivals.map((product, index) => (
                <div
                  key={product.slug}
                  className={fadeStyles.fadeInStart}
                  data-fade
                  style={{ transitionDelay: `${index * 0.1 + 0.3}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className={[styles.shopViewAll, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.34s' }}>
              <Link href="/shop/new-arrivals" className={styles.shopButtonPrimary}>
                Explore New Arrivals
              </Link>
            </div>
          </section>

          <section
            className={[styles.shopBestSellersSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.24s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.28s' }}>
              <h2>Best Sellers</h2>
              <p>Beloved treasures that sell out every season—these are the pieces our collectors can't get enough of.</p>
            </div>
            <div className={styles.shopProductsGrid}>
              {bestSellers.map((product, index) => (
                <div
                  key={product.slug}
                  className={fadeStyles.fadeInStart}
                  data-fade
                  style={{ transitionDelay: `${index * 0.08 + 0.32}s` }}
                >
                  <ProductCard product={product} />
                </div>
              ))}
            </div>
            <div className={[styles.shopViewAll, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.4s' }}>
              <Link href="/shop/best-sellers" className={styles.shopButtonPrimary}>
                View All Best Sellers
              </Link>
            </div>
          </section>

          {saleProducts.length > 0 && (
            <section
              className={[styles.shopSaleSection, fadeStyles.fadeInStart].join(' ')}
              data-fade
              style={{ transitionDelay: '0.26s' }}
            >
              <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.3s' }}>
                <h2>Special Offers</h2>
                <p>Limited-time deals on select pieces—don't miss out on these exclusive savings.</p>
              </div>
              <div className={styles.shopProductsGrid}>
                {saleProducts.map((product, index) => (
                  <div
                    key={product.slug}
                    className={fadeStyles.fadeInStart}
                    data-fade
                    style={{ transitionDelay: `${index * 0.1 + 0.34}s` }}
                  >
                    <ProductCard product={product} />
                  </div>
                ))}
              </div>
              <div className={[styles.shopViewAll, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.38s' }}>
                <Link href="/shop/sale" className={styles.shopButtonPrimary}>
                  Shop All Sales
                </Link>
              </div>
            </section>
          )}

          <section
            className={[styles.shopCollectionsSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.28s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.32s' }}>
              <h2>Explore Our Collections</h2>
              <p>Curated themes that tell a story—each collection is designed around a unique aesthetic and mood.</p>
            </div>
            <div className={styles.shopCollectionsGrid}>
              {collections.map((collection, index) => (
                <article
                  key={collection.name}
                  className={[styles.shopCollectionCard, fadeStyles.fadeInStart].join(' ')}
                  data-fade
                  style={{ transitionDelay: `${index * 0.1 + 0.36}s` }}
                >
                  <Link href={collection.href} className={styles.shopCollectionImageLink}>
                    <div className={styles.shopCollectionImage}>
                      <Image
                        src={collection.image}
                        alt={collection.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className={styles.shopCollectionPhoto}
                      />
                      {collection.badge && (
                        <span className={styles.shopCollectionBadge}>{collection.badge}</span>
                      )}
                    </div>
                  </Link>
                  <div className={styles.shopCollectionContent}>
                    <h3>{collection.name}</h3>
                    <p>{collection.description}</p>
                    <Link href={collection.href} className={styles.shopCollectionLink}>
                      Explore Collection
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className={[styles.shopCategorySection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.24s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.28s' }}>
              <h2>Shop by mood or moment</h2>
              <p>Choose your starting point and build your story from there.</p>
            </div>
            <div className={styles.shopCategoryGrid}>
              {categoryCards.map((category, index) => (
                <article
                  key={category.name}
                  className={[styles.shopCategoryCard, fadeStyles.fadeInStart].join(' ')}
                  data-fade
                  style={{ transitionDelay: `${index * 0.08 + 0.18}s` }}
                >
                  <Link href={category.href} className={styles.shopCategoryImageWrapper} aria-label={category.name}>
                    <Image
                      src={category.image}
                      alt={`${category.name} showcase`}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className={styles.shopCategoryImage}
                    />
                    <span className={styles.shopCategoryBadge}>{category.badge}</span>
                  </Link>
                  <div className={styles.shopCategoryContent}>
                    <h3>{category.name}</h3>
                    <p>{category.description}</p>
                    <div className={styles.shopCategoryActions}>
                      <Link href={category.href} className={styles.shopButtonPrimary}>
                        Explore
                      </Link>
                      <Link href={category.href} className={styles.shopButtonGhost}>
                        View details
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className={[styles.shopCuratedSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.28s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.32s' }}>
              <h2>Curated sets from the studio</h2>
              <p>Ready-to-wear combinations designed by our stylists for instant polish.</p>
            </div>
            <div className={styles.shopCuratedGrid}>
              {curatedSets.map((set, index) => (
                <article
                  key={set.name}
                  className={[styles.shopCuratedCard, fadeStyles.fadeInStart].join(' ')}
                  data-fade
                  style={{ transitionDelay: `${index * 0.08 + 0.36}s` }}
                >
                  <Link href={set.href} className={styles.shopCuratedImageLink}>
                    <div className={styles.shopCuratedImage}>
                      <Image
                        src={set.image}
                        alt={set.name}
                        fill
                        sizes="(max-width: 768px) 100vw, 320px"
                        className={styles.shopCuratedPhoto}
                      />
                      {set.badge && (
                        <span className={styles.shopCuratedBadge}>{set.badge}</span>
                      )}
                      {set.savings && (
                        <span className={styles.shopCuratedSavings}>{set.savings}</span>
                      )}
                    </div>
                  </Link>
                  <div className={styles.shopCuratedContent}>
                    <div className={styles.shopCuratedPriceRow}>
                      <span className={styles.shopCuratedPrice}>{set.price}</span>
                      {set.originalPrice && (
                        <span className={styles.shopCuratedOriginalPrice}>{set.originalPrice}</span>
                      )}
                    </div>
                    <h3>{set.name}</h3>
                    <p>{set.description}</p>
                    {set.features && set.features.length > 0 && (
                      <ul className={styles.shopCuratedFeatures}>
                        {set.features.map((feature, idx) => (
                          <li key={idx}>{feature}</li>
                        ))}
                      </ul>
                    )}
                    <Link href={set.href} className={styles.shopCuratedLink}>
                      Explore Collection
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </Link>
                  </div>
                </article>
              ))}
            </div>
            <div className={[styles.shopViewAll, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.44s' }}>
              <Link href="/collections" className={styles.shopButtonPrimary}>
                View All Collections
              </Link>
            </div>
          </section>

          <section
            className={[styles.shopServicesSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.32s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.36s' }}>
              <h2>Design with us</h2>
              <p>Our concierge team is here to help you find, personalise, and care for your jewels.</p>
            </div>
            <div className={styles.shopServicesGrid}>
              {services.map((service, index) => (
                <article
                  key={service.title}
                  className={[styles.shopServiceCard, fadeStyles.fadeInStart].join(' ')}
                  data-fade
                  style={{ transitionDelay: `${index * 0.1 + 0.22}s` }}
                >
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h3>{service.title}</h3>
                  <p>{service.blurb}</p>
                  <Link href={service.href} className={styles.serviceLink}>{service.linkLabel}</Link>
                </article>
              ))}
            </div>
          </section>

          <section
            className={[styles.shopWhyChooseSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.3s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.34s' }}>
              <h2>Why Choose Pink Dot</h2>
              <p>What sets us apart—discover the values and services that make every Pink Dot piece special.</p>
            </div>
            <div className={styles.shopWhyChooseGrid}>
              {whyChooseUs.map((feature, index) => (
                <article
                  key={feature.title}
                  className={[styles.shopWhyChooseCard, fadeStyles.fadeInStart].join(' ')}
                  data-fade
                  style={{ transitionDelay: `${index * 0.08 + 0.38}s` }}
                >
                  <div className={styles.whyChooseIcon}>{feature.icon}</div>
                  <h3>{feature.title}</h3>
                  <p>{feature.description}</p>
                </article>
              ))}
            </div>
          </section>

          <section
            className={[styles.shopTestimonialsSection, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.34s' }}
          >
            <div className={[styles.sectionHeading, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.38s' }}>
              <h2>Loved by Our Community</h2>
              <p>Real stories from collectors who have made Pink Dot part of their everyday elegance.</p>
            </div>
            <div className={styles.shopTestimonialsGrid}>
              {testimonials.map((testimonial, index) => (
                <article
                  key={index}
                  className={[styles.shopTestimonialCard, fadeStyles.fadeInStart].join(' ')}
                  data-fade
                  style={{ transitionDelay: `${index * 0.1 + 0.42}s` }}
                >
                  <div className={styles.testimonialStars}>
                    {'★'.repeat(testimonial.rating)}
                  </div>
                  <p className={styles.testimonialQuote}>"{testimonial.quote}"</p>
                  <div className={styles.testimonialAuthor}>
                    <span className={styles.authorName}>{testimonial.author}</span>
                    <span className={styles.authorLocation}>{testimonial.location}</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section
            className={[styles.shopCtaBanner, fadeStyles.fadeInStart].join(' ')}
            data-fade
            style={{ transitionDelay: '0.36s' }}
          >
            <div className={fadeStyles.fadeInStart} data-fade style={{ transitionDelay: '0.4s' }}>
              <h2>Join the Pink Dot circle</h2>
              <p>Subscribe for launch previews, styling notes, and members-only events direct from the studio.</p>
            </div>
            <div className={[styles.shopCtaActions, fadeStyles.fadeInStart].join(' ')} data-fade style={{ transitionDelay: '0.44s' }}>
              <Link href="/contact" className={styles.shopPrimaryButton}>
                Join the list
              </Link>
              <Link href="/collections" className={styles.shopSecondaryButton}>
                Explore collections
              </Link>
            </div>
          </section>
        </main>
      </div>
    </>
  );
}

export const dynamic = 'force-static';
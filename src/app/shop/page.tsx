import Image from 'next/image';
import Link from 'next/link';
import styles from './page.module.css';

const heroHighlights = [
  'New studio drops every Thursday evening',
  'Precious metals recycled and hand-finished in Jaipur & Vicenza',
  'Complimentary engraving, gift wrap, and lifetime replating',
];

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
    price: '£495 trio value',
    image: '/images/neck3.jpeg',
    href: '/collections/summer-collection',
  },
  {
    name: 'Celestial Night Out',
    description: 'Opaline Chandeliers paired with Celestial Halo Ring for after-dark shimmer.',
    price: '£799 set',
    image: '/images/earrings3.jpeg',
    href: '/collections/celestial-dreams',
  },
  {
    name: 'Everyday Muse',
    description: 'Solstice Hoops, Muse Charm Bracelet, and Nova Crown Band for daily shine.',
    price: '£589 trio',
    image: '/images/bracelets1.jpeg',
    href: '/shop/new-arrivals',
  },
];

const services = [
  {
    title: 'Virtual Styling',
    blurb: 'Book a 20-minute styling session to design your stack with our studio team.',
    href: '/contact',
    linkLabel: 'Reserve a consult',
  },
  {
    title: 'Size & Care Guides',
    blurb: 'From ring sizing to tarnish care, discover tips to treasure your jewels longer.',
    href: '/support/size-guide',
    linkLabel: 'Find your fit',
  },
  {
    title: 'Bespoke Studio',
    blurb: 'Sketch something uniquely yours with custom stones, engraving, and metal choices.',
    href: '/collections/limited-edition',
    linkLabel: 'Design bespoke',
  },
];

export default function ShopPage() {
  return (
    <main className={styles.shopPage}>
      <section className={styles.shopHero}>
        <div className={styles.shopHeroContent}>
          <span className={styles.shopHeroTag}>The Pink Dot Atelier</span>
          <h1 className={styles.shopHeroTitle}>
            Jewellery designed to illuminate every chapter
          </h1>
          <p className={styles.shopHeroSubtitle}>
            Discover signature silhouettes, studio-fresh arrivals, and limited-run heirlooms—each crafted by our artisans
            to be layered, loved, and lived in.
          </p>
          <ul className={styles.shopHeroHighlights}>
            {heroHighlights.map((highlight) => (
              <li key={highlight}>
                <span className={styles.shopHighlightDot} />
                {highlight}
              </li>
            ))}
          </ul>
          <div className={styles.shopHeroActions}>
            <Link href="/shop/new-arrivals" className={styles.shopPrimaryButton}>
              Shop fresh arrivals
            </Link>
            <Link href="/shop/all-jewellery" className={styles.shopSecondaryButton}>
              View entire collection
            </Link>
          </div>
        </div>
        <div className={styles.shopHeroMosaic}>
          <div className={styles.shopHeroPrimary}>
            <Image
              src="/images/neck4.jpeg"
              alt="Layered Pink Dot necklaces"
              fill
              sizes="(max-width: 1024px) 100vw, 420px"
              className={styles.shopHeroImage}
              priority
            />
          </div>
          <div className={styles.shopHeroSecondary}>
            <div className={styles.shopHeroTile}>
              <Image
                src="/images/ring5.jpeg"
                alt="Pink Dot rings stacked together"
                fill
                sizes="(max-width: 1024px) 50vw, 180px"
                className={styles.shopHeroImage}
              />
            </div>
            <div className={styles.shopHeroTile}>
              <Image
                src="/images/bracelets4.jpeg"
                alt="Bracelet stack on wrist"
                fill
                sizes="(max-width: 1024px) 50vw, 180px"
                className={styles.shopHeroImage}
              />
            </div>
          </div>
        </div>
      </section>

      <section className={styles.shopHighlightsSection}>
        <div>
          <h2>What’s glowing right now</h2>
          <p>
            Curated edits to find your perfect match—browse by category or dive straight into the pieces our collectors
            love most.
          </p>
        </div>
        <div className={styles.shopStats}>
          <div>
            <span>250+</span>
            <p>Jewellery designs available online</p>
          </div>
          <div>
            <span>72 hrs</span>
            <p>Average delivery on in-stock pieces</p>
          </div>
          <div>
            <span>Lifetime</span>
            <p>Complimentary replating & sizing</p>
          </div>
        </div>
      </section>

      <section className={styles.shopCategorySection}>
        <div className={styles.sectionHeading}>
          <h2>Shop by mood or moment</h2>
          <p>Choose your starting point and build your story from there.</p>
        </div>
        <div className={styles.shopCategoryGrid}>
          {categoryCards.map((category) => (
            <article key={category.name} className={styles.shopCategoryCard}>
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

      <section className={styles.shopCuratedSection}>
        <div className={styles.sectionHeading}>
          <h2>Curated sets from the studio</h2>
          <p>Ready-to-wear combinations designed by our stylists for instant polish.</p>
        </div>
        <div className={styles.shopCuratedGrid}>
          {curatedSets.map((set) => (
            <article key={set.name} className={styles.shopCuratedCard}>
              <div className={styles.shopCuratedImage}>
                <Image
                  src={set.image}
                  alt={set.name}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className={styles.shopCuratedPhoto}
                />
              </div>
              <div className={styles.shopCuratedContent}>
                <span>{set.price}</span>
                <h3>{set.name}</h3>
                <p>{set.description}</p>
                <Link href={set.href}>View the set</Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.shopServicesSection}>
        <div className={styles.sectionHeading}>
          <h2>Design with us</h2>
          <p>Our concierge team is here to help you find, personalise, and care for your jewels.</p>
        </div>
        <div className={styles.shopServicesGrid}>
          {services.map((service) => (
            <article key={service.title} className={styles.shopServiceCard}>
              <h3>{service.title}</h3>
              <p>{service.blurb}</p>
              <Link href={service.href}>{service.linkLabel}</Link>
            </article>
          ))}
        </div>
      </section>

      <section className={styles.shopCtaBanner}>
        <div>
          <h2>Join the Pink Dot circle</h2>
          <p>Subscribe for launch previews, styling notes, and members-only events direct from the studio.</p>
        </div>
        <div className={styles.shopCtaActions}>
          <Link href="/contact" className={styles.shopPrimaryButton}>
            Join the list
          </Link>
          <Link href="/collections" className={styles.shopSecondaryButton}>
            Explore collections
          </Link>
        </div>
      </section>
    </main>
  );
}

export const dynamic = 'force-static';
import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
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
    image: '/images/neck3.jpeg',
    href: '/collections/summer-collection',
  },
  {
    name: 'Celestial Night Out',
    description: 'Opaline Chandeliers paired with Celestial Halo Ring for after-dark shimmer.',
    price: '₹79,900 set',
    image: '/images/earrings3.jpeg',
    href: '/collections/celestial-dreams',
  },
  {
    name: 'Everyday Muse',
    description: 'Solstice Hoops, Muse Charm Bracelet, and Nova Crown Band for daily shine.',
    price: '₹58,900 trio',
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
                  style={{ transitionDelay: `${index * 0.1 + 0.22}s` }}
                >
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
                  <h3>{service.title}</h3>
                  <p>{service.blurb}</p>
                  <Link href={service.href}>{service.linkLabel}</Link>
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
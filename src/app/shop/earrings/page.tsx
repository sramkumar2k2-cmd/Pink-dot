import Image from 'next/image';
import Link from 'next/link';
import { AnimatedHero } from '@/app/components/AnimatedHero';
import styles from './page.module.css';

const heroHighlights = [
  'Featherlight engineering for all-day comfort',
  'Hypoallergenic posts crafted with surgical steel',
  'Hand-set stones with mirror polish for extra brilliance',
];

const heroSpotlight = {
  badge: 'Stylist favourite',
  name: 'Solstice Hoops',
  description:
    'Removable charms and polished hoops, balancing statement shimmer with everyday ease.',
  image: '/images/earrings2.jpeg',
  imageAlt: 'Solstice hoop earrings resting on silk fabric',
  meta: ['₹17,800', 'Ships in 24hrs'],
  swatches: ['Featherlight', 'Hypoallergenic', 'Convertible charms'],
};

const spotlight = {
  name: 'Aurora Cascade Drops',
  description:
    'A trio of iridescent stones suspended in a shimmering cascade, designed to catch the light with every turn of your head.',
  price: '₹21,500',
  features: ['Moonstone & topaz', 'Blush vermeil plating', 'Hand-balanced for comfort'],
  image: '/images/earrings3.jpeg',
};

const products = [
  {
    name: 'Luna Glow Studs',
    description: 'Gradient pavé studs inspired by moonlit horizons.',
    price: '₹12,800',
    detail: 'Moonstone',
    tag: 'New',
    gradient: 'linear-gradient(135deg, #f1f5ff 0%, #e1e8ff 50%, #f3f7ff 100%)',
    image: '/images/earrings1.jpeg',
  },
  {
    name: 'Solstice Hoops',
    description: 'Hand-polished hoops with removable gemstone charms.',
    price: '₹17,800',
    detail: 'Citrine',
    tag: 'Back in stock',
    gradient: 'linear-gradient(135deg, #fff4d9 0%, #ffe7b5 50%, #fff2d6 100%)',
    image: '/images/earrings2.jpeg',
  },
  {
    name: 'Nova Ear Climbers',
    description: 'Celestial ear climbers with starlit pavé constellations.',
    price: '₹16,200',
    detail: 'Lab Diamond',
    tag: 'Limited',
    gradient: 'linear-gradient(135deg, #edfaff 0%, #daf1ff 45%, #eef9ff 100%)',
    image: '/images/earrings4.jpeg',
  },
  {
    name: 'Opaline Chandeliers',
    description: 'Ornate chandelier earrings with playful fringe movement.',
    price: '₹24,000',
    detail: 'Opal',
    tag: 'Statement',
    gradient: 'linear-gradient(135deg, #ffeef5 0%, #ffd7ea 45%, #ffe9f2 100%)',
    image: '/images/earrings5.jpeg',
  },
  {
    name: 'Muse Ear Cuff Duo',
    description: 'Two sculpted cuffs with satin finish for effortless stacking.',
    price: '₹9,800',
    detail: '18k blush vermeil',
    tag: 'Set of 2',
    gradient: 'linear-gradient(135deg, #fff5ec 0%, #ffe1cc 50%, #ffefe0 100%)',
    image: '/images/earrings2.jpeg',
  },
  {
    name: 'Seraph Wing Studs',
    description: 'Wing-shaped studs with luminous pearl centres.',
    price: '₹15,200',
    detail: 'Freshwater Pearl',
    tag: 'Editor’s pick',
    gradient: 'linear-gradient(135deg, #f3f8ff 0%, #e7f1ff 50%, #f5f9ff 100%)',
    image: '/images/earrings1.jpeg',
  },
];

const craftsmanshipHighlights = [
  'Every hinge is tested 500 cycles to ensure secure closures that never pinch.',
  'We hand-buff each post and backing for a seamless feel against the skin.',
  'Ear stacks curated virtually—book a styling call to tailor your mix.',
];

export default function EarringsPage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Earring Studio"
        title="Earrings that dance with every expression"
        subtitle="From whisper-light studs to sculptural chandeliers, discover silhouettes that illuminate your face and carry your stories skyward."
        backgroundImage="/images/earrings5.jpeg"
        actions={[
          { label: 'Shop all earrings', href: '/shop/earrings' },
          { label: 'Styling tips', href: '/support/size-guide', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(30, 20, 35, 0.6), rgba(112, 68, 120, 0.28))"
        glowColors={{
          primary: 'rgba(255, 204, 226, 0.75)',
          secondary: 'rgba(194, 24, 91, 0.52)',
        }}
        spotlight={heroSpotlight}
      />

      <main className={styles.main}>
        <section className={styles.highlightSection}>
          <div className={styles.highlightVisual}>
            <Image
              src={spotlight.image}
              alt="Aurora Cascade Drops earrings close up"
              fill
              sizes="(max-width: 768px) 100vw, 420px"
              className={styles.highlightImage}
            />
          </div>
          <div className={styles.highlightContent}>
            <span className={styles.highlightTag}>Spotlight</span>
            <h2 className={styles.highlightTitle}>{spotlight.name}</h2>
            <p className={styles.highlightDescription}>{spotlight.description}</p>
            <div className={styles.highlightFeatures}>
              {spotlight.features.map((feature) => (
                <span key={feature}>{feature}</span>
              ))}
            </div>
            <div className={styles.highlightFooter}>
              <span className={styles.highlightPrice}>{spotlight.price}</span>
              <Link href="/collections/celestial-dreams" className={styles.highlightLink}>
                Explore celestial edit
              </Link>
            </div>
          </div>
        </section>

        <section className={styles.collectionSection}>
          <div className={styles.sectionHeading}>
            <h2>Pairs that frame your light</h2>
            <p>Mix silhouettes, metals, and stones to build a personalised ear stack that feels confidently you.</p>
          </div>
          <div className={styles.productsGrid}>
            {products.map((product) => (
              <article key={product.name} className={styles.productCard}>
                <div className={styles.productVisual} style={{ backgroundImage: product.gradient }}>
                  <span className={styles.productTag}>{product.tag}</span>
                  <div className={styles.productAccent}>{product.detail}</div>
                  <div className={styles.productImageWrapper}>
                    <Image
                      src={product.image}
                      alt={`${product.name} earrings`}
                      fill
                      sizes="(max-width: 768px) 100vw, 280px"
                      className={styles.productImage}
                    />
                  </div>
                </div>
                <div className={styles.productContent}>
                  <h3 className={styles.productName}>{product.name}</h3>
                  <p className={styles.productDescription}>{product.description}</p>
                  <div className={styles.productDetails}>
                    <span>{product.detail}</span>
                    <span>{product.price}</span>
                  </div>
                  <button type="button" className={styles.productButton}>
                    Add to cart
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.storySection}>
          <div className={styles.sectionHeading}>
            <h2>The Pink Dot earring difference</h2>
            <p>Designed in London, crafted in Jaipur, Seoul, and Vicenza with artisanal precision.</p>
          </div>
          <ul className={styles.storyList}>
            {craftsmanshipHighlights.map((highlight) => (
              <li key={highlight}>
                <div className={styles.storyIcon}>✶</div>
                <p>{highlight}</p>
              </li>
            ))}
          </ul>
        </section>

        <section className={styles.ctaBanner}>
          <div>
            <h2>Design your ear stack</h2>
            <p>Book a styling consult and we’ll craft a bespoke ear party—from first piercings to constellation stacks.</p>
          </div>
          <div className={styles.ctaActions}>
            <Link href="/contact" className={styles.primaryButton}>
              Book a styling call
            </Link>
            <Link href="/support/returns" className={styles.secondaryButton}>
              Care for your jewels
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
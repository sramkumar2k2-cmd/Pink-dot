"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatedHero } from "@/app/components/AnimatedHero";
import styles from "./page.module.css";

const quickLinks = [
  {
    title: "New Arrivals",
    description:
      "Be first to explore this week’s studio drops, limited capsules, and styling notes straight from the bench.",
    href: "/shop/new-arrivals",
    image: "/images/neck4.jpeg",
    badge: "Latest edit",
    secondaryLabel: "Launch notes",
    secondaryHref: "/blog",
  },
  {
    title: "Necklaces",
    description: "Layer luminous collars, pendants, and custom charms designed to move with every moment.",
    href: "/shop/necklaces",
    image: "/images/neck2.jpeg",
    badge: "Necklaces",
  },
  {
    title: "Earrings",
    description: "Discover featherlight studs, convertible hoops, and chandelier statements for every expression.",
    href: "/shop/earrings",
    image: "/images/earrings5.jpeg",
    badge: "Earrings",
  },
  {
    title: "Rings",
    description: "From sculpted stacks to bespoke solitaires, curate rings that celebrate every vow and victory.",
    href: "/shop/rings",
    image: "/images/ring3.jpeg",
    badge: "Rings",
  },
  {
    title: "Bracelets",
    description: "Mix tennis classics, charm chains, and wrap bracelets crafted for effortless layering.",
    href: "/shop/bracelets",
    image: "/images/bracelets3.jpeg",
    badge: "Bracelets",
  },
  {
    title: "Signature Collections",
    description: "Step inside thematic edits—Celestial Dreams, Minimalist Threads, and more—crafted as immersive worlds.",
    href: "/collections",
    image: "/images/neck5.jpeg",
    badge: "Collections",
  },
  {
    title: "Sale Spotlight",
    description: "Catch limited-quantity archive pieces and bundles before they shimmer out of stock.",
    href: "/shop/sale",
    image: "/images/earrings2.jpeg",
    badge: "Limited",
  },
];

const heroHighlights = ["Curated for every story", "Navigate by category in one tap", "Explore Pink Dot’s signatures"];

export default function AllJewelleryPage() {
  return (
    <div className={styles.page}>
      <AnimatedHero
        tag="Curated for every story"
        title={
          <>All Jewellery <span className={styles.highlight}>by Pink Dot</span></>
        }
        subtitle="Handpicked creations to illuminate every chapter—from dawn rituals to moonlit soirées. Explore the pieces that have defined our signature sparkle."
        backgroundImage="/images/neck1.jpeg"
        actions={[
          { label: 'Shop New Arrivals', href: '/shop/new-arrivals' },
          { label: 'Explore Collections', href: '/collections', variant: 'ghost' },
        ]}
        highlights={heroHighlights}
        overlayGradient="linear-gradient(135deg, rgba(24, 18, 28, 0.6), rgba(92, 54, 71, 0.3))"
        glowColors={{
          primary: 'rgba(255, 208, 220, 0.7)',
          secondary: 'rgba(135, 105, 220, 0.5)',
        }}
      />

      <main className={styles.main}>
        <section className={styles.collectionSpotlightSection}>
          <div className={styles.collectionSectionHeading}>
            <h2 className={styles.collectionSectionTitle}>Choose a heading to continue</h2>
            <p className={styles.collectionSectionSubtitle}>
              Keep this page light—select the destination that matches what you’re looking for and we’ll take you straight there.
            </p>
          </div>
          <div className={styles.shopCategoryGrid}>
            {quickLinks.map((card) => {
              const primaryLabel = `Go to ${card.title}`;
              const secondaryLabel = card.secondaryLabel ?? 'Learn more';

              return (
                <article key={card.title} className={styles.shopCategoryCard}>
                  <Link
                    href={card.href}
                    className={styles.shopCategoryImageWrapper}
                    aria-label={card.title}
                  >
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 320px"
                      className={styles.shopCategoryImage}
                    />
                    <span className={styles.shopCategoryBadge}>{card.badge}</span>
                  </Link>
                  <div className={styles.shopCategoryContent}>
                    <h3 className={styles.shopCategoryTitle}>{card.title}</h3>
                    <p className={styles.shopCategoryDescription}>{card.description}</p>
                    <div className={styles.shopCategoryActions}>
                      <Link href={card.href} className={styles.shopButtonPrimary}>
                        {primaryLabel}
                      </Link>
                      {card.secondaryHref ? (
                        <Link href={card.secondaryHref} className={styles.shopButtonGhost}>
                          {secondaryLabel}
                        </Link>
                      ) : null}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </section>
      </main>
    </div>
  );
}
export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  description: string;
  story: string;
  highlights: string[];
  featuredProducts: Array<{
    name: string;
    href: string;
    price: string;
    image: string;
    badge: string;
  }>;
  mood: string;
};

export const collections: Collection[] = [
  {
    slug: "celestial-dreams",
    name: "Celestial Dreams",
    tagline: "A luminous edit inspired by constellations and midnight skies.",
    heroImage: "/images/neck1.jpeg",
    gallery: ["/images/neck1.jpeg", "/images/neck2.jpeg", "/images/neck6.jpeg", "/images/neck3.jpeg"],
    description:
      "Our Celestial Dreams collection captures the shimmer of starlit evenings through luminous pearls, iridescent moonstones, and delicate halos of pavé crystal. Designed for the modern romantic, these pieces glow softly in candlelight and sparkle under the spotlight.",
    story:
      "Each design begins with vintage charts of the night sky, tracing constellations that have guided storytellers for centuries. From there, our artisans translate these patterns into jewellery that feels both ethereal and wearable. Expect soft curves, floating gemstones, and the quiet drama of the cosmos.",
    highlights: [
      "Hand-selected freshwater pearls paired with moonstone accents",
      "Signature Pink Dot pavé halos inspired by clusters of stars",
      "Modular elements that layer effortlessly for celestial storytelling",
    ],
    featuredProducts: [
      {
        name: "Celestial Pearl Necklace",
        href: "/shop/necklaces",
        price: "₹4,499",
        image: "/images/neck1.jpeg",
        badge: "New Arrival",
      },
      {
        name: "Luna Drop Earrings",
        href: "/shop/earrings",
        price: "₹3,499",
        image: "/images/neck2.jpeg",
        badge: "Back in Stock",
      },
      {
        name: "Opaline Pendant",
        href: "/shop/necklaces",
        price: "₹2,999",
        image: "/images/neck6.jpeg",
        badge: "Gift Favorite",
      },
    ],
    mood: "Think: moonlit rooftops, whispered wishes, midnight celebrations.",
  },
  {
    slug: "art-deco-revival",
    name: "Art Deco Revival",
    tagline: "Geometric glamour reimagined for modern soirées.",
    heroImage: "/images/neck2.jpeg",
    gallery: ["/images/neck2.jpeg", "/images/neck3.jpeg", "/images/neck4.jpeg", "/images/neck5.jpeg"],
    description:
      "Bold lines, mirrored symmetry, and a touch of jazz-age drama define the Art Deco Revival collection. Inspired by the golden age of cocktail parties, each piece pairs architectural silhouettes with luxurious finishes.",
    story:
      "We dug through archives of 1920s invitation cards, skyscraper blueprints, and flapper embellishments to create a collection rich in history yet unmistakably contemporary. Sleek enamel, mixed metals, and sharp profiles bring vintage nostalgia into the present.",
    highlights: [
      "Hand-cut crystal baguettes arranged in sunburst motifs",
      "Contrasting finishes of matte satin and high-polish gloss",
      "Convertible designs that transition from desk to dance floor",
    ],
    featuredProducts: [
      {
        name: "Aurora Hoop Earrings",
        href: "/shop/earrings",
        price: "₹3,299",
        image: "/images/neck3.jpeg",
        badge: "Bestseller",
      },
      {
        name: "Muse Stacking Rings",
        href: "/shop/rings",
        price: "₹2,799",
        image: "/images/neck4.jpeg",
        badge: "Limited",
      },
      {
        name: "Serenade Charm Bracelet",
        href: "/shop/bracelets",
        price: "₹3,099",
        image: "/images/neck5.jpeg",
        badge: "Editor’s Pick",
      },
    ],
    mood: "Think: glittering marquees, clinking coupes, late-night jazz.",
  },
  {
    slug: "minimalist-threads",
    name: "Minimalist Threads",
    tagline: "Weightless silhouettes for everyday elegance.",
    heroImage: "/images/neck3.jpeg",
    gallery: ["/images/neck3.jpeg", "/images/neck5.jpeg", "/images/neck1.jpeg", "/images/neck4.jpeg"],
    description:
      "Minimalist Threads strips jewellery down to its essence: fine lines, featherlight movement, and pieces that become part of your daily uniform. Subtle sheen and tactile finishes invite mixing and stacking.",
    story:
      "Our designers explored textile draping and architectural wire sculptures to create jewellery that mirrors the effortless flow of fabric. The result: pieces that are barely there yet quietly transformative.",
    highlights: [
      "Ultra-light construction for day-to-night comfort",
      "Interlocking elements that can be worn multiple ways",
      "Soft satin finishes that complement every skin tone",
    ],
    featuredProducts: [
      {
        name: "Muse Stacking Rings",
        href: "/shop/rings",
        price: "₹2,799",
        image: "/images/neck4.jpeg",
        badge: "Limited",
      },
      {
        name: "Opaline Pendant",
        href: "/shop/necklaces",
        price: "₹2,999",
        image: "/images/neck6.jpeg",
        badge: "Gift Favorite",
      },
      {
        name: "Celestial Pearl Necklace",
        href: "/shop/necklaces",
        price: "₹4,499",
        image: "/images/neck1.jpeg",
        badge: "New Arrival",
      },
    ],
    mood: "Think: airy studios, sunlit commutes, effortless layering.",
  },
  {
    slug: "summer-collection",
    name: "Summer Collection",
    tagline: "Colour-drenched gems made for golden hours and getaway adventures.",
    heroImage: "/images/neck5.jpeg",
    gallery: ["/images/neck5.jpeg", "/images/neck2.jpeg", "/images/neck6.jpeg", "/images/neck3.jpeg"],
    description:
      "The Summer Collection is drenched in warm hues and fluid forms that mirror ocean waves and beachside sunsets. Each piece is a postcard from a sun-soaked escape.",
    story:
      "We followed the sun from dawn to dusk, collecting colours from seaside shells, sorbet carts, and tropical gardens. Those hues appear in enamel accents, cascading crystals, and freeform shapes.",
    highlights: [
      "Watercolour enamel detailing that resists fading",
      "Adjustable lengths to style with swimwear or evening silk",
      "Vacation-ready pieces packaged in travel-safe pouches",
    ],
    featuredProducts: [
      {
        name: "Serenade Charm Bracelet",
        href: "/shop/bracelets",
        price: "₹3,099",
        image: "/images/neck5.jpeg",
        badge: "Editor’s Pick",
      },
      {
        name: "Aurora Hoop Earrings",
        href: "/shop/earrings",
        price: "₹3,299",
        image: "/images/neck3.jpeg",
        badge: "Bestseller",
      },
      {
        name: "Luna Drop Earrings",
        href: "/shop/earrings",
        price: "₹3,499",
        image: "/images/neck2.jpeg",
        badge: "Back in Stock",
      },
    ],
    mood: "Think: barefoot balconies, citrus spritzers, sunset soundtrack.",
  },
  {
    slug: "limited-edition",
    name: "Limited Edition",
    tagline: "Collector-worthy jewels crafted in intentionally tiny batches.",
    heroImage: "/images/neck6.jpeg",
    gallery: ["/images/neck6.jpeg", "/images/neck5.jpeg", "/images/neck1.jpeg", "/images/neck4.jpeg"],
    description:
      "Our Limited Edition pieces celebrate artisan techniques and rare materials. Once these jewels find their homes, they won’t return — each drop is designed as a fleeting moment of magic.",
    story:
      "We partner with boutique workshops and gem cutters to secure rare cuts and unexpected colour pairings. Every design features a hand-numbered charm, making it a true keepsake.",
    highlights: [
      "Tiny-batch production runs with numbered authenticity tags",
      "Signature Pink Dot clasp crafted in recycled sterling silver",
      "Keepsake packaging with handwritten note from our studio",
    ],
    featuredProducts: [
      {
        name: "Celestial Pearl Necklace",
        href: "/shop/necklaces",
        price: "₹4,499",
        image: "/images/neck1.jpeg",
        badge: "New Arrival",
      },
      {
        name: "Muse Stacking Rings",
        href: "/shop/rings",
        price: "₹2,799",
        image: "/images/neck4.jpeg",
        badge: "Limited",
      },
      {
        name: "Opaline Pendant",
        href: "/shop/necklaces",
        price: "₹2,999",
        image: "/images/neck6.jpeg",
        badge: "Gift Favorite",
      },
    ],
    mood: "Think: private viewings, heirloom hopes, future keepsakes.",
  },
];

export const getCollectionBySlug = (slug: string) =>
  collections.find((collection) => collection.slug === slug);


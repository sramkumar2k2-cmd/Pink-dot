export type Collection = {
  slug: string;
  name: string;
  tagline: string;
  heroImage: string;
  gallery: string[];
  description: string;
  story: string;
  highlights: string[];
  featuredProducts: string[];
  mood: string;
};

export const collections: Collection[] = [
  {
    slug: "american-diamond-jewellery",
    name: "American Diamond Jewellery",
    tagline: "A luminous edit inspired by constellations and midnight skies.",
    heroImage: "/images/neck1.jpeg",
    gallery: ["/images/neck1.jpeg", "/images/neck2.jpeg", "/images/neck6.jpeg", "/images/neck3.jpeg"],
    description:
      "Our American Diamond Jewellery collection captures the shimmer of starlit evenings through luminous pearls, iridescent moonstones, and delicate halos of pavé crystal. Designed for the modern romantic, these pieces glow softly in candlelight and sparkle under the spotlight.",
    story:
      "Each design begins with vintage charts of the night sky, tracing constellations that have guided storytellers for centuries. From there, our artisans translate these patterns into jewellery that feels both ethereal and wearable. Expect soft curves, floating gemstones, and the quiet drama of the cosmos.",
    highlights: [
      "Hand-selected freshwater pearls paired with moonstone accents",
      "Signature Pink Dot pavé halos inspired by clusters of stars",
      "Modular elements that layer effortlessly for celestial storytelling",
    ],
    featuredProducts: [
      "luna-cascade-collar",
      "opaline-chandeliers",
      "celestial-halo-ring",
      "solstice-hoops",
      "seraphine-wrap",
      "nova-crown-band",
    ],
    mood: "Think: moonlit rooftops, whispered wishes, midnight celebrations.",
  },
  {
    slug: "premium-gold-plated-jewellery",
    name: "Premium Gold Plated Jewellery",
    tagline: "Geometric glamour reimagined for modern soirées.",
    heroImage: "/images/neck2.jpeg",
    gallery: ["/images/neck2.jpeg", "/images/neck3.jpeg", "/images/neck4.jpeg", "/images/neck5.jpeg"],
    description:
      "Bold lines, mirrored symmetry, and a touch of jazz-age drama define the Premium Gold Plated Jewellery collection. Inspired by the glittering age of cocktail parties, each piece pairs architectural silhouettes with luxurious finishes.",
    story:
      "We dug through archives of 1920s invitation cards, skyscraper blueprints, and flapper embellishments to create a collection rich in history yet unmistakably contemporary. Sleek enamel, mixed metals, and sharp profiles bring vintage nostalgia into the present.",
    highlights: [
      "Hand-cut crystal baguettes arranged in sunburst motifs",
      "Contrasting finishes of matte satin and high-polish gloss",
      "Convertible designs that transition from desk to dance floor",
    ],
    featuredProducts: [
      "radiant-pave-band",
      "orion-toi-et-moi",
      "aurora-heirloom",
      "solstice-signet",
      "nova-crown-band",
      "muse-charm-chain",
    ],
    mood: "Think: glittering marquees, clinking coupes, late-night jazz.",
  },
  {
    slug: "kundan-jewellery",
    name: "Kundan Jewellery",
    tagline: "Weightless silhouettes for everyday elegance.",
    heroImage: "/images/neck3.jpeg",
    gallery: ["/images/neck3.jpeg", "/images/neck5.jpeg", "/images/neck1.jpeg", "/images/neck4.jpeg"],
    description:
      "Kundan Jewellery strips jewellery down to its essence: fine lines, featherlight movement, and pieces that become part of your daily uniform. Subtle sheen and tactile finishes invite mixing and stacking.",
    story:
      "Our designers explored textile draping and architectural wire sculptures to create jewellery that mirrors the effortless flow of fabric. The result: pieces that are barely there yet quietly transformative.",
    highlights: [
      "Ultra-light construction for day-to-night comfort",
      "Interlocking elements that can be worn multiple ways",
      "Soft satin finishes that complement every skin tone",
    ],
    featuredProducts: [
      "luna-stacking-trio",
      "atelier-bar-necklace",
      "muse-ear-cuff-duo",
      "elysian-pendant",
      "serein-station",
      "solstice-choker",
    ],
    mood: "Think: airy studios, sunlit commutes, effortless layering.",
  },
  {
    slug: "oxidised-jewellery",
    name: "Oxidised Jewellery",
    tagline: "Colour-drenched gems made for sunset hours and getaway adventures.",
    heroImage: "/images/neck5.jpeg",
    gallery: ["/images/neck5.jpeg", "/images/neck2.jpeg", "/images/neck6.jpeg", "/images/neck3.jpeg"],
    description:
      "The Oxidised Jewellery collection is drenched in warm hues and fluid forms that mirror ocean waves and beachside sunsets. Each piece is a postcard from a sun-soaked escape.",
    story:
      "We followed the sun from dawn to dusk, collecting colours from seaside shells, sorbet carts, and tropical gardens. Those hues appear in enamel accents, cascading crystals, and freeform shapes.",
    highlights: [
      "Watercolour enamel detailing that resists fading",
      "Adjustable lengths to style with swimwear or evening silk",
      "Vacation-ready pieces packaged in travel-safe pouches",
    ],
    featuredProducts: [
      "aurora-tidal-bangle",
      "celestine-ear-thread",
      "luna-glow-anklet",
      "solstice-hoops",
      "muse-charm-chain",
      "elysian-collar",
    ],
    mood: "Think: barefoot balconies, citrus spritzers, sunset soundtrack.",
  },
  {
    slug: "antique-jewellery",
    name: "Antique Jewellery",
    tagline: "Collector-worthy jewels crafted in intentionally tiny batches.",
    heroImage: "/images/neck6.jpeg",
    gallery: ["/images/neck6.jpeg", "/images/neck5.jpeg", "/images/neck1.jpeg", "/images/neck4.jpeg"],
    description:
      "Our Antique Jewellery pieces celebrate artisan techniques and rare materials. Once these jewels find their homes, they won't return — each drop is designed as a fleeting moment of magic.",
    story:
      "We partner with boutique workshops and gem cutters to secure rare cuts and unexpected colour pairings. Every design features a hand-numbered charm, making it a true keepsake.",
    highlights: [
      "Tiny-batch production runs with numbered authenticity tags",
      "Signature Pink Dot clasp crafted in recycled sterling silver",
      "Keepsake packaging with handwritten note from our studio",
    ],
    featuredProducts: [
      "aurora-heirloom",
      "serenade-tennis-bracelet",
      "nova-ear-climbers",
      "celestial-halo-ring",
      "aurora-tidal-bangle",
      "solstice-signet",
    ],
    mood: "Think: private viewings, heirloom hopes, future keepsakes.",
  },
  {
    slug: "premium-panchaloham",
    name: "Premium Panchaloham",
    tagline: "Sacred metals crafted with traditional artistry and modern elegance.",
    heroImage: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=800&fit=crop",
    gallery: [
      "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1603561591411-07134e71a2a9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1506630448388-4e683c67ddb0?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1596944924616-7b38e7cfac36?w=800&h=800&fit=crop",
    ],
    description:
      "Our Premium Panchaloham collection celebrates the ancient art of five-metal alloy jewellery. Each piece is crafted with gold, silver, copper, zinc, and iron—blended in sacred proportions to create heirloom-worthy treasures that honor tradition while embracing contemporary design.",
    story:
      "Panchaloham, meaning 'five metals' in Sanskrit, has been revered for centuries for its spiritual significance and healing properties. Our artisans in South India masterfully blend these metals using time-honored techniques passed down through generations, creating jewellery that connects you to ancient wisdom and timeless beauty.",
    highlights: [
      "Authentic five-metal alloy crafted by master artisans",
      "Traditional techniques combined with modern design sensibilities",
      "Each piece blessed and crafted with spiritual significance",
    ],
    featuredProducts: [
      "luna-cascade-collar",
      "opaline-chandeliers",
      "celestial-halo-ring",
      "solstice-hoops",
      "seraphine-wrap",
      "nova-crown-band",
    ],
    mood: "Think: sacred ceremonies, timeless traditions, spiritual elegance.",
  },
];

export const getCollectionBySlug = (slug: string) =>
  collections.find((collection) => collection.slug === slug);


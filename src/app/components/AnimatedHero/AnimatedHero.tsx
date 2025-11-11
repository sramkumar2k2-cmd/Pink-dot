import Image from 'next/image';
import Link from 'next/link';
import { ReactNode } from 'react';
import styles from './AnimatedHero.module.css';

type HeroAction = {
  label: string;
  href: string;
  variant?: 'primary' | 'secondary' | 'ghost';
};

type HeroSpotlight = {
  badge: string;
  name: string;
  description: string;
  image: string;
  imageAlt?: string;
  meta?: string[];
  swatches?: string[];
};

type CSSVars = React.CSSProperties & {
  '--hero-overlay'?: string;
  '--hero-glow-primary'?: string;
  '--hero-glow-secondary'?: string;
  '--hero-min-height'?: string;
  '--hero-background-filter'?: string;
  '--hero-sparkle-gradient'?: string;
  '--hero-sparkle-shadow'?: string;
  '--hero-sparkle-size'?: string;
};

type AnimatedHeroProps = {
  tag: string;
  title: ReactNode;
  subtitle: string;
  backgroundImage: string;
  backgroundAlt?: string;
  actions: HeroAction[];
  highlights?: string[];
  spotlight?: HeroSpotlight;
  overlayGradient?: string;
  glowColors?: {
    primary?: string;
    secondary?: string;
  };
  minHeight?: string;
  className?: string;
  theme?: string;
  backgroundFilter?: string;
  sparkleStyle?: {
    gradient?: string;
    shadow?: string;
    size?: string;
  };
};

export function AnimatedHero({
  tag,
  title,
  subtitle,
  backgroundImage,
  backgroundAlt = '',
  actions,
  highlights,
  spotlight,
  overlayGradient,
  glowColors,
  minHeight,
  className,
  theme,
  backgroundFilter,
  sparkleStyle,
}: AnimatedHeroProps) {
  const styleVars: CSSVars = {};

  if (overlayGradient) {
    styleVars['--hero-overlay'] = overlayGradient;
  }

  if (glowColors?.primary) {
    styleVars['--hero-glow-primary'] = glowColors.primary;
  }

  if (glowColors?.secondary) {
    styleVars['--hero-glow-secondary'] = glowColors.secondary;
  }

  if (minHeight) {
    styleVars['--hero-min-height'] = minHeight;
  }

  if (backgroundFilter) {
    styleVars['--hero-background-filter'] = backgroundFilter;
  }

  if (sparkleStyle?.gradient) {
    styleVars['--hero-sparkle-gradient'] = sparkleStyle.gradient;
  }

  if (sparkleStyle?.shadow) {
    styleVars['--hero-sparkle-shadow'] = sparkleStyle.shadow;
  }

  if (sparkleStyle?.size) {
    styleVars['--hero-sparkle-size'] = sparkleStyle.size;
  }

  return (
    <section
      className={`${styles.wrapper} ${className ?? ''}`.trim()}
      style={styleVars}
      data-hero-theme={theme ?? undefined}
    >
      <div className={styles.background}>
        <Image
          src={backgroundImage}
          alt={backgroundAlt || typeof title === 'string' ? (title as string) : 'Hero background'}
          fill
          priority
          sizes="100vw"
          className={styles.backgroundImage}
        />
      </div>
      <div className={styles.overlay} />
      <div className={`${styles.glow} ${styles.glowPrimary}`} />
      <div className={`${styles.glow} ${styles.glowSecondary}`} />
      <span className={`${styles.sparkle} ${styles.sparkleOne}`} />
      <span className={`${styles.sparkle} ${styles.sparkleTwo}`} />
      <span className={`${styles.sparkle} ${styles.sparkleThree}`} />

      <div className={styles.inner}>
        <div className={styles.copy}>
          <span className={styles.tag}>{tag}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
          {actions.length > 0 ? (
            <div className={styles.actions}>
              {actions.map((action) => {
                const variantClass =
                  action.variant === 'ghost'
                    ? styles.actionGhost
                    : action.variant === 'secondary'
                    ? styles.actionSecondary
                    : styles.actionPrimary;

                return (
                  <Link key={action.href} href={action.href} className={`${styles.action} ${variantClass}`}>
                    {action.label}
                  </Link>
                );
              })}
            </div>
          ) : null}
          {highlights?.length ? (
            <ul className={styles.highlights}>
              {highlights.map((highlight) => (
                <li key={highlight}>
                  <span className={styles.highlightIcon} />
                  {highlight}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        {spotlight ? (
          <div className={styles.spotlight}>
            <div className={styles.spotlightCard}>
              <span className={styles.spotlightBadge}>{spotlight.badge}</span>
              <div className={styles.spotlightImage}>
                <Image
                  src={spotlight.image}
                  alt={spotlight.imageAlt ?? spotlight.name}
                  fill
                  priority
                  sizes="(max-width: 768px) 80vw, 340px"
                  className={styles.spotlightPhoto}
                />
              </div>
              <h2 className={styles.spotlightName}>{spotlight.name}</h2>
              <p className={styles.spotlightDescription}>{spotlight.description}</p>
              {spotlight.meta?.length ? (
                <div className={styles.spotlightMeta}>
                  {spotlight.meta.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              ) : null}
              {spotlight.swatches?.length ? (
                <div className={styles.spotlightSwatch}>
                  {spotlight.swatches.map((item) => (
                    <span key={item}>{item}</span>
                  ))}
                </div>
              ) : null}
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}


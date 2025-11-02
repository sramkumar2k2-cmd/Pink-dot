import Link from 'next/link';
import Image from 'next/image';
import styles from './footer.module.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: 'Shop',
      links: [
        { name: 'All Jewellery', href: '/shop/all-jewellery' },
        { name: 'Necklaces', href: '/shop/necklaces' },
        { name: 'Earrings', href: '/shop/earrings' },
        { name: 'Bracelets', href: '/shop/bracelets' },
        { name: 'Rings', href: '/shop/rings' },
        { name: 'New Arrivals', href: '/shop/new-arrivals' },
        { name: 'Best Sellers', href: '/shop/best-sellers' },
      ],
    },
    {
      title: 'Collections',
      links: [
        { name: 'Celestial Dreams', href: '/collections/celestial-dreams' },
        { name: 'Art Deco Revival', href: '/collections/art-deco-revival' },
        { name: 'Minimalist Threads', href: '/collections/minimalist-threads' },
        { name: 'Summer Collection', href: '/collections/summer-collection' },
        { name: 'Limited Edition', href: '/collections/limited-edition' },
      ],
    },
    {
      title: 'Customer Service',
      links: [
        { name: 'Contact Us', href: '/support/contact' },
        { name: 'Shipping Information', href: '/support/shipping' },
        { name: 'Returns & Exchanges', href: '/support/returns' },
        { name: 'FAQ', href: '/support/faq' },
        { name: 'Size Guide', href: '/support/size-guide' },
        { name: 'Care Instructions', href: '/support/care-guide' },
      ],
    },
    {
      title: 'Legal & Company',
      links: [
        { name: 'About Us', href: '/company/about' },
        { name: 'Privacy Policy', href: '/legal/privacy' },
        { name: 'Terms of Service', href: '/legal/terms' },
        { name: 'Cookie Policy', href: '/legal/cookies' },
      ],
    },
  ];

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.footerTop}>
          <div className={styles.logoSection}>
            <Link href="/" className={styles.footerLogo}>
              <Image
                src="/images/footer-logo.png"
                alt="Pink Dot"
                width={160}
                height={56}
                className={styles.logoImage}
              />
            </Link>
            <p className={styles.logoText}>
              Discover the beauty in everyday moments with our curated collection.
            </p>
            <div className={styles.socialLinks}>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                Instagram
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                Facebook
              </a>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                Twitter
              </a>
            </div>
          </div>
          <div className={styles.linksGrid}>
            {footerSections.map((section) => (
              <div 
                key={section.title} 
                className={`${styles.section} ${section.title === 'Shop' || section.title === 'Collections' ? styles.largeFontSection : ''}`}
              >
                <h3>{section.title}</h3>
                <div className={styles.links}>
                  {section.links.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      className={styles.link}
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.copyrightContainer}>
          <p className={styles.copyright}>
            © {currentYear} Pink Dot. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
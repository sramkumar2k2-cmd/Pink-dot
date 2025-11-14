"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import { HeartIcon } from '@/app/components/HeartIcon';
import { useFavoriteSlugs } from '@/app/lib/useFavoriteProduct';
import { useCartSlugs } from '@/app/lib/useCartProduct';
import styles from './header.module.css';
import { CartIcon } from '@/app/components/CartIcon';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const closeTimeoutRef = useRef<number | null>(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpenSections, setMobileOpenSections] = useState<Record<string, boolean>>({
    Shop: true,
    Collections: false,
  });
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const favoriteSlugs = useFavoriteSlugs();
  const favoritesCount = favoriteSlugs.length;
  const hasFavoritesActive = favoritesCount > 0 || pathname === '/favorites';
  const cartSlugs = useCartSlugs();
  const cartCount = cartSlugs.length;
  const hasCartActive = cartCount > 0 || pathname === '/cart';

  const shopMenu = {
    categories: [
      { name: 'All Jewellery', href: '/shop/all-jewellery' },
      { name: 'Necklaces', href: '/shop/necklaces' },
      { name: 'Earrings', href: '/shop/earrings' },
      { name: 'Bracelets', href: '/shop/bracelets' },
      { name: 'Rings', href: '/shop/rings' },
    ],
    featured: [
      { name: 'New Arrivals', href: '/shop/new-arrivals' },
      { name: 'Best Sellers', href: '/shop/best-sellers' },
    ],
  };

  const collectionsMenu = {
    items: [
      { name: 'Celestial Dreams', href: '/collections/celestial-dreams' },
      { name: 'Art Deco Revival', href: '/collections/art-deco-revival' },
      { name: 'Minimalist Threads', href: '/collections/minimalist-threads' },
      { name: 'Summer Collection', href: '/collections/summer-collection' },
      { name: 'Limited Edition', href: '/collections/limited-edition' },
    ],
  };

  const navigation = [
    { 
      name: 'Shop', 
      href: '/shop',
      hasDropdown: true 
    },
    { name: 'Collections', href: '/collections', hasDropdown: true },
    { name: 'Our Story', href: '/our-story' },
    { name: 'Gift Guide', href: '/gift-guide' },
    { name: 'Contact', href: '/contact' },
  ];

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleMobileSection = (sectionName: string) => {
    setMobileOpenSections((prev) => ({
      ...prev,
      [sectionName]: !prev[sectionName],
    }));
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Close dropdown when route changes
  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setOpenDropdown(null);
      setIsMobileMenuOpen(false);
    }, 0);

    return () => window.clearTimeout(timeoutId);
  }, [pathname]);

  // Prevent body scroll when mobile menu is open, but allow menu to scroll
  useEffect(() => {
    if (isMobileMenuOpen) {
      // Save current scroll position
      const scrollY = window.scrollY;
      document.body.style.position = 'fixed';
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = '100%';
      document.body.style.overflow = 'hidden';
    } else {
      // Restore body scroll
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || '0') * -1);
      }
    }

    // Cleanup on unmount
    return () => {
      document.body.style.position = '';
      document.body.style.top = '';
      document.body.style.width = '';
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Close dropdown when clicking outside, but not when interacting with dropdown
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Pink Dot"
            width={160}
            height={56}
            className={styles.logoImage}
            priority
            style={{ height: 'auto', width: '160px', maxWidth: '100%' }}
          />
        </Link>

        <div className={styles.desktopNavGroup}>
          <nav className={styles.nav}>
            {navigation.map((item) =>
              item.hasDropdown ? (
                <div
                  key={item.name}
                  ref={openDropdown === item.name ? dropdownRef : null}
                  className={styles.dropdown}
                  onMouseEnter={() => {
                    if (closeTimeoutRef.current !== null) {
                      window.clearTimeout(closeTimeoutRef.current);
                      closeTimeoutRef.current = null;
                    }
                    setOpenDropdown(item.name);
                  }}
                  onMouseLeave={() => {
                    closeTimeoutRef.current = window.setTimeout(() => {
                      setOpenDropdown((current) => (current === item.name ? null : current));
                    }, 120);
                  }}
                >
                  <div className={`${styles.dropdownHeader} dropdownHeader`}>
                    <Link
                      href={item.href}
                      className={`${styles.link} ${
                        pathname.startsWith(item.href) || openDropdown === item.name
                          ? styles.active
                          : ''
                      }`}
                      aria-expanded={openDropdown === item.name}
                      onClick={(event) => {
                        if (
                          event.metaKey ||
                          event.ctrlKey ||
                          event.shiftKey ||
                          event.button !== 0
                        ) {
                          return;
                        }

                        if (openDropdown !== item.name) {
                          event.preventDefault();
                          setOpenDropdown(item.name);
                          return;
                        }

                        closeDropdown();
                      }}
                      onKeyDown={(event) => {
                        if (event.key === 'Enter' || event.key === ' ') {
                          event.preventDefault();

                          if (openDropdown !== item.name) {
                            setOpenDropdown(item.name);
                          } else {
                            closeDropdown();
                          }
                        }
                      }}
                      onTouchStart={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        if (openDropdown !== item.name) {
                          setOpenDropdown(item.name);
                        } else {
                          closeDropdown();
                        }
                      }}
                    >
                      {item.name}
                    </Link>
                  </div>
                  <div
                    className={`${styles.dropdownContent} ${
                      openDropdown === item.name ? styles.dropdownOpen : ''
                    }`}
                    onTouchStart={(e) => {
                      // Prevent touch from bubbling up and closing dropdown
                      e.stopPropagation();
                      e.preventDefault();
                    }}
                    onTouchEnd={(e) => {
                      // Prevent touch end from bubbling
                      e.stopPropagation();
                    }}
                    onMouseDown={(e) => {
                      // Prevent mousedown from bubbling and closing dropdown
                      e.stopPropagation();
                    }}
                    onClick={(e) => {
                      // Prevent click from bubbling up and closing dropdown unless it's a link
                      const link = (e.target as HTMLElement).closest('a.dropdownLink');
                      if (!link) {
                        e.stopPropagation();
                      }
                    }}
                  >
                    {item.name === 'Shop' && (
                      <>
                        <div className={styles.categoryHeader}>Categories</div>
                        {shopMenu.categories.map((category) => (
                          <Link
                            key={category.name}
                            href={category.href}
                            className={`${styles.dropdownLink} dropdownLink`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              closeDropdown();
                            }}
                          >
                            {category.name}
                          </Link>
                        ))}
                        <div className={styles.dropdownDivider} />
                        {shopMenu.featured.map((featured) => (
                          <Link
                            key={featured.name}
                            href={featured.href}
                            className={`${styles.dropdownLink} dropdownLink`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              closeDropdown();
                            }}
                          >
                            {featured.name}
                          </Link>
                        ))}
                      </>
                    )}

                    {item.name === 'Collections' && (
                      <>
                        <div className={styles.categoryHeader}>Collections</div>
                        {collectionsMenu.items.map((col) => (
                          <Link
                            key={col.name}
                            href={col.href}
                            className={`${styles.dropdownLink} dropdownLink`}
                            onClick={() => {
                              setIsMobileMenuOpen(false);
                              closeDropdown();
                            }}
                          >
                            {col.name}
                          </Link>
                        ))}
                      </>
                    )}
                  </div>
                </div>
              ) : (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.link} ${pathname === item.href ? styles.active : ''}`}
                >
                  {item.name}
                </Link>
              ),
            )}
          </nav>

          <div className={styles.actions}>
            <Link
              href="/favorites"
              className={styles.favoritesLink}
              aria-label={
                favoritesCount
                  ? `View ${favoritesCount} favourite product${favoritesCount === 1 ? '' : 's'}`
                  : 'View favourite products'
              }
              data-active={pathname === '/favorites'}
            >
              <HeartIcon filled={hasFavoritesActive} className={styles.favoritesIcon} />
              {favoritesCount > 0 ? (
                <span className={styles.favoritesBadge}>{favoritesCount}</span>
              ) : null}
            </Link>
            <Link
              href="/cart"
              className={styles.cartLink}
              aria-label={
                cartCount
                  ? `View ${cartCount} item${cartCount === 1 ? '' : 's'} in cart`
                  : 'View cart'
              }
              data-active={pathname === '/cart'}
            >
              <CartIcon filled={hasCartActive} className={styles.cartIcon} />
              {cartCount > 0 ? <span className={styles.cartBadge}>{cartCount}</span> : null}
            </Link>
          </div>
        </div>

        <button 
          className={`${styles.mobileButton} ${isMobileMenuOpen ? styles.open : ''}`}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
          aria-controls="pinkdot-mobile-menu"
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div 
        className={`${styles.mobileMenuBackdrop} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div
        id="pinkdot-mobile-menu"
        className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className={styles.mobileMenuHeader}>
          <Link href="/" className={styles.mobileLogo} onClick={() => setIsMobileMenuOpen(false)}>
            <Image
              src="/images/logo.png"
              alt="Pink Dot"
              width={120}
              height={42}
              priority
              className={styles.mobileLogoImage}
            />
          </Link>
          <button
            type="button"
            className={styles.mobileCloseButton}
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <span />
            <span />
          </button>
        </div>

        <div className={styles.mobileMenuContent}>
          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionHeaderRow}>
              <Link
                href="/shop"
                className={`${styles.mobileSectionLink} ${pathname.startsWith('/shop') ? styles.active : ''}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setOpenDropdown(null);
                }}
              >
                Shop
              </Link>
              <button
                type="button"
                className={`${styles.mobileSectionToggle} ${mobileOpenSections.Shop ? styles.open : ''}`}
                onClick={() => toggleMobileSection('Shop')}
                aria-expanded={mobileOpenSections.Shop}
                aria-controls="mobile-section-shop"
              >
                <svg className={styles.mobileSectionIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div
              id="mobile-section-shop"
              className={`${styles.mobileSectionContent} ${mobileOpenSections.Shop ? styles.open : ''}`}
            >
              <div className={styles.mobileGroupHeading}>Categories</div>
              {shopMenu.categories.map((category) => (
                <Link
                  key={category.name}
                  href={category.href}
                  className={styles.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
              <div className={styles.mobileGroupHeading}>Featured</div>
              {shopMenu.featured.map((featured) => (
                <Link
                  key={featured.name}
                  href={featured.href}
                  className={styles.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {featured.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.mobileSection}>
            <div className={styles.mobileSectionHeaderRow}>
              <Link
                href="/collections"
                className={`${styles.mobileSectionLink} ${pathname.startsWith('/collections') ? styles.active : ''}`}
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setOpenDropdown(null);
                }}
              >
                Collections
              </Link>
              <button
                type="button"
                className={`${styles.mobileSectionToggle} ${mobileOpenSections.Collections ? styles.open : ''}`}
                onClick={() => toggleMobileSection('Collections')}
                aria-expanded={mobileOpenSections.Collections}
                aria-controls="mobile-section-collections"
              >
                <svg className={styles.mobileSectionIcon} width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </div>
            <div
              id="mobile-section-collections"
              className={`${styles.mobileSectionContent} ${mobileOpenSections.Collections ? styles.open : ''}`}
            >
              {collectionsMenu.items.map((col) => (
                <Link
                  key={col.name}
                  href={col.href}
                  className={styles.link}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {col.name}
                </Link>
              ))}
            </div>
          </div>

          <div className={styles.mobileSection}>
            <div className={styles.mobileGroupHeading}>Explore</div>
            {navigation
              .filter((item) => !item.hasDropdown)
              .map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`${styles.link} ${pathname === item.href ? styles.active : ''}`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            <Link
              href="/favorites"
              className={`${styles.link} ${pathname === '/favorites' ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Favourites
            </Link>
            <Link
              href="/cart"
              className={`${styles.link} ${pathname === '/cart' ? styles.active : ''}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Cart
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

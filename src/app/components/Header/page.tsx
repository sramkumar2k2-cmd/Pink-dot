"use client";

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState, useEffect, useRef } from 'react';
import styles from './header.module.css';

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const touchStartTimeRef = useRef<number>(0);
  const lastTouchTargetRef = useRef<HTMLElement | null>(null);

  const shopMenu = {
    categories: [
      { name: 'All Jewellery', href: '/shop' },
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
    { name: 'Home', href: '/' },
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

  const toggleDropdown = (dropdownName: string) => {
    setOpenDropdown(openDropdown === dropdownName ? null : dropdownName);
  };

  const closeDropdown = () => {
    setOpenDropdown(null);
  };

  // Close dropdown when route changes
  useEffect(() => {
    setOpenDropdown(null);
    setIsMobileMenuOpen(false); // Close mobile menu on route change
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
    const handleClickOutside = (event: MouseEvent | TouchEvent) => {
      if (openDropdown && dropdownRef.current) {
        const target = (event.target as HTMLElement) || 
                      (event instanceof TouchEvent && event.touches?.[0]?.target as HTMLElement);
        
        if (!target) return;
        
        // Don't close if clicking inside the dropdown
        if (dropdownRef.current.contains(target)) {
          return;
        }
        
        // Don't close if clicking on the dropdown toggle button
        const toggleButton = target.closest('button.dropdownToggle');
        if (toggleButton) {
          return;
        }
        
        // Don't close if clicking on the dropdown header
        const dropdownHeader = target.closest('.dropdownHeader');
        if (dropdownHeader) {
          return;
        }
        
        // Close if clicking outside
        setOpenDropdown(null);
      }
    };

    // Only add listener when dropdown is open
    if (openDropdown) {
      // Use setTimeout to avoid immediate closure
      const timeoutId = setTimeout(() => {
        document.addEventListener('mousedown', handleClickOutside as EventListener);
        document.addEventListener('touchstart', handleClickOutside as EventListener, { passive: true });
      }, 150);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('mousedown', handleClickOutside as EventListener);
        document.removeEventListener('touchstart', handleClickOutside as EventListener);
      };
    }
  }, [openDropdown]);

  return (
    <header className={styles.header}>
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

        <nav className={styles.nav}>
          {navigation.map((item) => (
            item.hasDropdown ? (
              <div 
                key={item.name}
                ref={openDropdown === item.name ? dropdownRef : null}
                className={styles.dropdown}
                onMouseEnter={() => setOpenDropdown(item.name)}
                onMouseLeave={(e) => {
                  // Don't close if moving to dropdown content
                  const relatedTarget = e.relatedTarget as HTMLElement;
                  if (!relatedTarget || !dropdownRef.current?.contains(relatedTarget)) {
                    setOpenDropdown(null);
                  }
                }}
              >
                <div className={`${styles.dropdownHeader} dropdownHeader`}>
                  <Link 
                    href={item.href}
                    className={`${styles.link} ${pathname.startsWith(item.href) ? styles.active : ''}`}
                    onClick={(e) => {
                      // On click, navigate to page (don't prevent default)
                      // Close dropdown if it's open when clicking
                      if (openDropdown === item.name) {
                        closeDropdown();
                      }
                    }}
                    onTouchStart={(e) => {
                      // On touch, open dropdown without navigating
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDropdown(item.name);
                    }}
                  >
                    {item.name}
                  </Link>
                  <button
                    className={`${styles.dropdownToggle} dropdownToggle`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDropdown(item.name);
                    }}
                    aria-label="Toggle dropdown"
                    onTouchStart={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      toggleDropdown(item.name);
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M6 9L12 15L18 9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                </div>
                <div 
                  className={`${styles.dropdownContent} ${openDropdown === item.name ? styles.dropdownOpen : ''}`}
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
                          onClick={closeDropdown}
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
                          onClick={closeDropdown}
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
                          onClick={closeDropdown}
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
            )
          ))}
        </nav>

        <button 
          className={styles.mobileButton}
          onClick={toggleMobileMenu}
          aria-label="Toggle menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      <div 
        className={`${styles.mobileMenuBackdrop} ${isMobileMenuOpen ? styles.open : ''}`}
        onClick={() => setIsMobileMenuOpen(false)}
      />
      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        {/* Shop Categories */}
        <div className={styles.mobileSection}>
        <Link
          href="/"
          className={`${styles.link} ${pathname === '/' ? styles.active : ''}`}
          onClick={() => setIsMobileMenuOpen(false)}
        >
          Home
        </Link>
      </div>

      <div className={styles.mobileSection}>
          <div className={styles.mobileSectionHeader}>Shop</div>
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
        </div>
        
        {/* Featured */}
        <div className={styles.mobileSection}>
          <div className={styles.mobileSectionHeader}>Featured</div>
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

        {/* Collections (mobile) */}
        <div className={styles.mobileSection}>
          <div className={styles.mobileSectionHeader}>Collections</div>
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

        {/* Other Navigation Items */}
        <div className={styles.mobileSection}>
        {navigation
          .filter((item) => !item.hasDropdown && item.name !== 'Home')
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
        </div>
      </div>
    </header>
  );
}

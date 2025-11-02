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
  }, [pathname]);

  // Close dropdown when clicking anywhere (inside or outside), but not on menu link or toggle button
  useEffect(() => {
    const handleTouchStart = (event: TouchEvent) => {
      touchStartTimeRef.current = Date.now();
      lastTouchTargetRef.current = event.target as HTMLElement;
    };

    const handleClickAnywhere = (event: MouseEvent) => {
      // Ignore clicks that happen immediately after touch (mobile devices)
      const timeSinceTouch = Date.now() - touchStartTimeRef.current;
      if (timeSinceTouch < 300 && lastTouchTargetRef.current) {
        // This is likely a click from a touch event, ignore it
        const target = event.target as HTMLElement;
        if (lastTouchTargetRef.current.contains(target) || target.contains(lastTouchTargetRef.current)) {
          return;
        }
      }

      if (openDropdown) {
        const target = event.target as HTMLElement;
        // Check if click is on the toggle button - if so, let it handle the toggle
        const toggleButton = target.closest('button.dropdownToggle');
        if (toggleButton) {
          return; // Let the toggle button handle it
        }
        // Check if click is inside the dropdown header (menu link area) - let it handle toggle
        const dropdownHeader = target.closest('.dropdownHeader');
        if (dropdownHeader) {
          // It's inside the menu link area, let it handle the toggle
          return;
        }
        // Check if click is inside the dropdown content area - don't close on click inside
        if (dropdownRef.current && dropdownRef.current.contains(target)) {
          // Inside dropdown content, only close if clicking a dropdown link
          const dropdownLink = target.closest('a.dropdownLink');
          if (dropdownLink) {
            setOpenDropdown(null);
            return; // Link's onClick will also handle it, but we close here too
          }
          // If clicking inside dropdown but not on a link, don't close
          return;
        }
        // Close only if clicking outside the dropdown
        setOpenDropdown(null);
      }
    };

    document.addEventListener('touchstart', handleTouchStart, { passive: true });

    if (openDropdown) {
      // Use a small delay to allow touch events to process first
      const timeoutId = setTimeout(() => {
        document.addEventListener('click', handleClickAnywhere, true);
      }, 100);

      return () => {
        clearTimeout(timeoutId);
        document.removeEventListener('click', handleClickAnywhere, true);
        document.removeEventListener('touchstart', handleTouchStart);
      };
    }

    return () => {
      document.removeEventListener('touchstart', handleTouchStart);
    };
  }, [openDropdown]);

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link href="/" className={styles.logo}>
          <Image
            src="/images/logo.png"
            alt="Pink Dot"
            width={400}
            height={115}
            className={styles.logoImage}
            priority
            style={{ height: 'auto', width: '400px' }}
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
                    // Mark this touch so clicks don't close dropdown
                    touchStartTimeRef.current = Date.now();
                    lastTouchTargetRef.current = e.currentTarget as HTMLElement;
                  }}
                  onTouchEnd={(e) => {
                    // Prevent touch end from bubbling
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
          {isMobileMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div className={`${styles.mobileMenu} ${isMobileMenuOpen ? styles.open : ''}`}>
        {/* Shop Categories */}
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
          {navigation.slice(1).map((item) => (
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

"use client";

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './Navigation.module.css';

const Navigation = () => {
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isCollectionsOpen, setIsCollectionsOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const shopDropdownRef = useRef<HTMLDivElement>(null);
  const collectionsDropdownRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  const shopMenu = {
    categories: [
      { name: 'Necklaces', path: '/shop/necklaces' },
      { name: 'Earrings', path: '/shop/earrings' },
      { name: 'Bracelets', path: '/shop/bracelets' },
      { name: 'Rings', path: '/shop/rings' },
    ],
    featured: [
      { name: 'New Arrivals', path: '/shop/new-arrivals' },
      { name: 'Best Sellers', path: '/shop/best-sellers' },
    ],
  };

  const collectionsMenu = {
    items: [
      { name: 'American Diamond Jewellery', path: '/collections/american-diamond-jewellery' },
      { name: 'Premium Gold Plated Jewellery', path: '/collections/premium-gold-plated-jewellery' },
      { name: 'Kundan Jewellery', path: '/collections/kundan-jewellery' },
      { name: 'Oxidised Jewellery', path: '/collections/oxidised-jewellery' },
      { name: 'Antique Jewellery', path: '/collections/antique-jewellery' },
      { name: 'Premium Panchaloham', path: '/collections/premium-panchaloham' },
    ],
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (shopDropdownRef.current && !shopDropdownRef.current.contains(target)) {
        setIsShopOpen(false);
      }
      if (collectionsDropdownRef.current && !collectionsDropdownRef.current.contains(target)) {
        setIsCollectionsOpen(false);
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(target) && !target.closest(`.${styles.hamburgerMenu}`)) {
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    if (!isShopOpen && !isCollectionsOpen && !isMobileMenuOpen) {
      return;
    }

    const frameId = window.requestAnimationFrame(() => {
      if (isShopOpen) {
        setIsShopOpen(false);
      }
      if (isCollectionsOpen) {
        setIsCollectionsOpen(false);
      }
      if (isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    });

    return () => window.cancelAnimationFrame(frameId);
  }, [pathname, isShopOpen, isCollectionsOpen, isMobileMenuOpen]);

  const handleDropdownClick = () => {
    if (window.innerWidth <= 968) {
      setIsShopOpen(false);
      setIsCollectionsOpen(false);
      setIsMobileMenuOpen(false);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  return (
    <nav className={styles.navigation}>
      <div className={styles.navContainer}>
        <Link href="/" className={styles.navLogo}>
          Pink Dot
        </Link>

        <div className={styles.desktopMenu}>
          <Link
            href="/shop/all-jewellery"
            className={`${styles.navLink} ${pathname === '/shop/all-jewellery' ? styles.active : ''}`}
          >
            All Jewellery
          </Link>
          {/* Shop Section with Page Link AND Dropdown */}
          <div className={styles.servicesNavItem}>
            <Link
              href="/shop"
              className={`${styles.navLink} ${styles.servicesPageLink} ${pathname === '/shop' || pathname.startsWith('/shop/') ? styles.active : ''}`}
              onMouseEnter={() => window.innerWidth > 968 && setIsShopOpen(true)}
            >
              Shop
            </Link>

            {/* Shop Dropdown */}
            <div className={styles.servicesDropdown} ref={shopDropdownRef}>
              <button
                className={styles.dropdownArrowBtn}
                onClick={() => setIsShopOpen(!isShopOpen)}
                onMouseEnter={() => window.innerWidth > 968 && setIsShopOpen(true)}
                aria-label="Toggle shop dropdown"
              >
                <span className={`${styles.dropdownArrow} ${isShopOpen ? styles.open : ''}`}>
                  ▼
                </span>
              </button>

              <div
                className={`${styles.dropdownMenu} ${isShopOpen ? styles.show : ''}`}
                onMouseLeave={() => window.innerWidth > 968 && setIsShopOpen(false)}
              >
                <div className={styles.categoryHeader}>Categories</div>
                {shopMenu.categories.map((category, index) => (
                  <Link
                    key={index}
                    href={category.path}
                    className={`${styles.dropdownItem} ${pathname === category.path ? styles.active : ''}`}
                    onClick={handleDropdownClick}
                  >
                    {category.name}
                  </Link>
                ))}
                <div className={styles.dropdownDivider}></div>
                {shopMenu.featured.map((featured, index) => (
                  <Link
                    key={index}
                    href={featured.path}
                    className={`${styles.dropdownItem} ${pathname === featured.path ? styles.active : ''}`}
                    onClick={handleDropdownClick}
                  >
                    {featured.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          {/* Collections Section with Page Link AND Dropdown */}
          <div className={styles.servicesNavItem}>
            <Link
              href="/collections"
              className={`${styles.navLink} ${styles.servicesPageLink} ${pathname === '/collections' || pathname.startsWith('/collections/') ? styles.active : ''}`}
              onMouseEnter={() => window.innerWidth > 968 && setIsCollectionsOpen(true)}
            >
              Collections
            </Link>

            {/* Collections Dropdown */}
            <div className={styles.servicesDropdown} ref={collectionsDropdownRef}>
              <button
                className={styles.dropdownArrowBtn}
                onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                onMouseEnter={() => window.innerWidth > 968 && setIsCollectionsOpen(true)}
                aria-label="Toggle collections dropdown"
              >
                <span className={`${styles.dropdownArrow} ${isCollectionsOpen ? styles.open : ''}`}>
                  ▼
                </span>
              </button>

              <div
                className={`${styles.dropdownMenu} ${isCollectionsOpen ? styles.show : ''}`}
                onMouseLeave={() => window.innerWidth > 968 && setIsCollectionsOpen(false)}
              >
                <div className={styles.categoryHeader}>Collections</div>
                {collectionsMenu.items.map((collection, index) => (
                  <Link
                    key={index}
                    href={collection.path}
                    className={`${styles.dropdownItem} ${pathname === collection.path ? styles.active : ''}`}
                    onClick={handleDropdownClick}
                  >
                    {collection.name}
                  </Link>
                ))}
              </div>
            </div>
          </div>

          <Link
            href="/our-story"
            className={`${styles.navLink} ${pathname === '/our-story' ? styles.active : ''}`}
          >
            Our Story
          </Link>
          <Link
            href="/contact"
            className={`${styles.navLink} ${pathname === '/contact' ? styles.active : ''}`}
          >
            Contact
          </Link>
        </div>

        {/* Mobile Hamburger Menu */}
        <div className={styles.mobileMenuContainer} ref={mobileMenuRef}>
          <button
            className={`${styles.hamburgerMenu} ${isMobileMenuOpen ? styles.active : ''}`}
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            <span></span>
            <span></span>
            <span></span>
          </button>

          {/* Mobile Navigation Menu */}
          <div className={`${styles.mobileNavMenu} ${isMobileMenuOpen ? styles.active : ''}`}>
            <Link
              href="/shop/all-jewellery"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              All Jewellery
            </Link>
            <Link
              href="/shop"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Shop
            </Link>

            <div className={styles.mobileServicesSection}>
              <div className={styles.mobileServicesHeader}>Categories</div>
              {shopMenu.categories.map((category, index) => (
                <Link
                  key={index}
                  href={category.path}
                  className={styles.mobileServiceItem}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {category.name}
                </Link>
              ))}
            </div>

            <div className={styles.mobileServicesSection}>
              <div className={styles.mobileServicesHeader}>Featured</div>
              {shopMenu.featured.map((featured, index) => (
                <Link
                  key={index}
                  href={featured.path}
                  className={styles.mobileServiceItem}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {featured.name}
                </Link>
              ))}
            </div>

            {/* Collections Section */}
            <Link
              href="/collections"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Collections
            </Link>

            <div className={styles.mobileServicesSection}>
              <div className={styles.mobileServicesHeader}>Our Collections:</div>
              {collectionsMenu.items.map((collection, index) => (
                <Link
                  key={index}
                  href={collection.path}
                  className={styles.mobileServiceItem}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  {collection.name}
                </Link>
              ))}
            </div>

            <Link
              href="/our-story"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Our Story
            </Link>
            <Link
              href="/contact"
              className={styles.mobileNavLink}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;

'use client';

import { useEffect } from 'react';
import styles from './FadeReveal.module.css';

export default function FadeReveal() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('[data-fade]'));

    if (elements.length === 0) {
      return;
    }

    const reveal = (element: HTMLElement) => {
      element.classList.add(styles.isVisible);
    };

    if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
      elements.forEach(reveal);
      return;
    }

    const observer = new IntersectionObserver(
      (entries, observerInstance) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target as HTMLElement);
            observerInstance.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.2,
        rootMargin: '0px 0px -10% 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return null;
}


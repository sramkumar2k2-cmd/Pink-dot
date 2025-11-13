'use client';

import { useEffect, useRef, useState } from 'react';

type UseHideOnScrollOptions = {
  threshold?: number;
  downTolerance?: number;
  upTolerance?: number;
  disabled?: boolean;
};

export function useHideOnScroll({
  threshold = 120,
  downTolerance = 5,
  upTolerance = 5,
  disabled = false,
}: UseHideOnScrollOptions = {}) {
  const [isHidden, setIsHidden] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const lastScrollYRef = useRef(0);
  const tickingRef = useRef(false);

  useEffect(() => {
    const update = () => {
      const currentY = window.scrollY;
      const previousY = lastScrollYRef.current;
      const delta = currentY - previousY;
      const scrollingDown = delta > downTolerance;
      const scrollingUp = delta < -upTolerance;

      setIsScrolled(currentY > 8);

      if (disabled) {
        setIsHidden(false);
      } else if (scrollingDown && currentY > threshold) {
        setIsHidden(true);
      } else if (scrollingUp || currentY < threshold) {
        setIsHidden(false);
      }

      lastScrollYRef.current = currentY <= 0 ? 0 : currentY;
      tickingRef.current = false;
    };

    const handleScroll = () => {
      if (!tickingRef.current) {
        tickingRef.current = true;
        window.requestAnimationFrame(update);
      }
    };

    lastScrollYRef.current = window.scrollY;
    update();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => window.removeEventListener('scroll', handleScroll);
  }, [threshold, downTolerance, upTolerance, disabled]);

  return { isHidden, isScrolled };
}



'use client';

import { useCallback, useMemo, useSyncExternalStore } from 'react';

const STORAGE_KEY = 'pinkdot:cart';

const isBrowser = () => typeof window !== 'undefined';

const parseCart = (rawValue: string | null): string[] => {
  if (!rawValue) {
    return [];
  }

  try {
    const parsed = JSON.parse(rawValue);
    if (Array.isArray(parsed)) {
      return parsed.filter((value): value is string => typeof value === 'string');
    }

    return [];
  } catch (error) {
    console.warn('Could not parse cart items from storage', error);
    return [];
  }
};

const readCartFromStorage = (): string[] => {
  if (!isBrowser()) {
    return [];
  }

  return parseCart(window.localStorage.getItem(STORAGE_KEY));
};

let cartSlugsCache: string[] = [];

const listeners = new Set<() => void>();

const emitChange = () => {
  listeners.forEach((listener) => listener());
};

const arraysEqual = (a: string[], b: string[]) => {
  if (a === b) {
    return true;
  }

  if (a.length !== b.length) {
    return false;
  }

  for (let index = 0; index < a.length; index += 1) {
    if (a[index] !== b[index]) {
      return false;
    }
  }

  return true;
};

const setCacheIfChanged = (next: string[]) => {
  if (arraysEqual(cartSlugsCache, next)) {
    return false;
  }

  cartSlugsCache = next;
  return true;
};

const writeCart = (slugs: string[]) => {
  if (!isBrowser()) {
    return;
  }

  const uniqueSlugs = Array.from(new Set(slugs));

  if (setCacheIfChanged(uniqueSlugs)) {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueSlugs));
    emitChange();
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueSlugs));
};

const handleStorageEvent = (event: StorageEvent) => {
  if (event.key && event.key !== STORAGE_KEY) {
    return;
  }

  const nextValue =
    typeof event.newValue === 'string' ? parseCart(event.newValue) : readCartFromStorage();

  if (setCacheIfChanged(nextValue)) {
    emitChange();
  }
};

let windowListenersBound = false;

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (isBrowser()) {
    const next = readCartFromStorage();
    if (setCacheIfChanged(next)) {
      queueMicrotask(() => emitChange());
    }
  }

  if (isBrowser() && !windowListenersBound) {
    window.addEventListener('storage', handleStorageEvent);
    windowListenersBound = true;
  }

  return () => {
    listeners.delete(listener);

    if (listeners.size === 0 && isBrowser() && windowListenersBound) {
      window.removeEventListener('storage', handleStorageEvent);
      windowListenersBound = false;
    }
  };
};

const refreshCacheFromStorage = () => {
  if (!isBrowser()) {
    return;
  }

  const next = readCartFromStorage();
  setCacheIfChanged(next);
};

const getClientSnapshot = () => {
  refreshCacheFromStorage();
  return cartSlugsCache;
};

const getServerSnapshot = () => cartSlugsCache;

export function useCartProduct(slug: string | undefined | null) {
  const normalizedSlug = useMemo(() => slug?.trim() ?? '', [slug]);
  const cartSlugs = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const isInCart = useMemo(() => {
    if (!normalizedSlug) {
      return false;
    }

    return cartSlugs.includes(normalizedSlug);
  }, [cartSlugs, normalizedSlug]);

  const addToCart = useCallback(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    if (cartSlugsCache.includes(normalizedSlug)) {
      return;
    }

    writeCart([...cartSlugsCache, normalizedSlug]);
  }, [normalizedSlug]);

  const removeFromCart = useCallback(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    if (!cartSlugsCache.includes(normalizedSlug)) {
      return;
    }

    writeCart(cartSlugsCache.filter((value) => value !== normalizedSlug));
  }, [normalizedSlug]);

  const toggleCart = useCallback(() => {
    if (!normalizedSlug) {
      return;
    }

    if (cartSlugsCache.includes(normalizedSlug)) {
      removeFromCart();
    } else {
      addToCart();
    }
  }, [addToCart, removeFromCart, normalizedSlug]);

  return {
    isInCart,
    addToCart,
    removeFromCart,
    toggleCart,
  };
}

export function useCartSlugs() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}



'use client';

import { useCallback, useMemo, useSyncExternalStore, useState, useEffect } from 'react';
import { addToCartWithTimestamp, removeFromCartWithTimestamp, getCartQuantity, setCartQuantity, getCartItems, subscribeToQuantityChanges } from './cartUtils';

const STORAGE_KEY = 'pinkdot:cart';
const QUANTITIES_KEY = 'pinkdot:cart_quantities';

const isBrowser = () => typeof window !== 'undefined';

const readCartFromStorage = (): string[] => {
  if (!isBrowser()) {
    return [];
  }

  try {
    const cartItems = getCartItems();
    return cartItems.map(item => item.slug);
  } catch (error) {
    console.warn('Could not read cart from storage', error);
    return [];
  }
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
    // Update legacy format for backward compatibility
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueSlugs));
    emitChange();
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(uniqueSlugs));
};

const handleStorageEvent = (event: StorageEvent) => {
  if (event.key && (event.key !== STORAGE_KEY && event.key !== QUANTITIES_KEY)) {
    return;
  }

  const nextValue = readCartFromStorage();

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

  // Subscribe to quantity changes
  const [quantityVersion, setQuantityVersion] = useState(0);
  
  useEffect(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }
    
    const unsubscribe = subscribeToQuantityChanges(() => {
      setQuantityVersion(prev => prev + 1);
    });
    
    return unsubscribe;
  }, [normalizedSlug]);

  const quantity = useMemo(() => {
    if (!normalizedSlug || !isBrowser()) {
      return 0;
    }
    // Include quantityVersion to force recalculation
    return getCartQuantity(normalizedSlug);
  }, [normalizedSlug, cartSlugs, quantityVersion]);

  const addToCart = useCallback(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    const currentQty = getCartQuantity(normalizedSlug);
    setCartQuantity(normalizedSlug, currentQty + 1);
    refreshCacheFromStorage();
  }, [normalizedSlug]);

  const removeFromCart = useCallback(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    setCartQuantity(normalizedSlug, 0);
    refreshCacheFromStorage();
  }, [normalizedSlug]);

  const setQuantity = useCallback((qty: number) => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    const validQty = Math.max(0, Math.floor(qty));
    const wasInCart = cartSlugsCache.includes(normalizedSlug);
    setCartQuantity(normalizedSlug, validQty);
    
    // Update cart slugs based on new quantity
    if (validQty > 0 && !wasInCart) {
      writeCart([...cartSlugsCache, normalizedSlug]);
    } else if (validQty === 0 && wasInCart) {
      writeCart(cartSlugsCache.filter((value) => value !== normalizedSlug));
    } else {
      refreshCacheFromStorage();
    }
  }, [normalizedSlug]);

  const incrementQuantity = useCallback(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    const currentQty = getCartQuantity(normalizedSlug);
    const newQty = currentQty + 1;
    setCartQuantity(normalizedSlug, newQty);
    
    // Update cart slugs if item wasn't in cart
    if (currentQty === 0 && !cartSlugsCache.includes(normalizedSlug)) {
      writeCart([...cartSlugsCache, normalizedSlug]);
    } else {
      refreshCacheFromStorage();
    }
  }, [normalizedSlug]);

  const decrementQuantity = useCallback(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    const currentQty = getCartQuantity(normalizedSlug);
    if (currentQty > 0) {
      const newQty = currentQty - 1;
      setCartQuantity(normalizedSlug, newQty);
      
      // Update cart slugs if quantity becomes 0
      if (newQty === 0 && cartSlugsCache.includes(normalizedSlug)) {
        writeCart(cartSlugsCache.filter((value) => value !== normalizedSlug));
      } else {
        refreshCacheFromStorage();
      }
    }
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
    quantity,
    addToCart,
    removeFromCart,
    setQuantity,
    incrementQuantity,
    decrementQuantity,
    toggleCart,
  };
}

export function useCartSlugs() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}



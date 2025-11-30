import { useCallback, useMemo, useSyncExternalStore } from 'react';
import { saveFavoriteWithMetadata, removeFavoriteMetadata } from './favoriteUtils';

const STORAGE_KEY = 'pinkdot:favorites';

const isBrowser = () => typeof window !== 'undefined';

const parseFavorites = (rawValue: string | null): string[] => {
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
    console.warn('Could not parse favorite products from storage', error);
    return [];
  }
};

const readFavoritesFromStorage = (): string[] => {
  if (!isBrowser()) {
    return [];
  }

  return parseFavorites(window.localStorage.getItem(STORAGE_KEY));
};

let favoriteSlugsCache: string[] = [];

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
  if (arraysEqual(favoriteSlugsCache, next)) {
    return false;
  }

  favoriteSlugsCache = next;
  return true;
};

const writeFavorites = (slugs: string[]) => {
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
    typeof event.newValue === 'string' ? parseFavorites(event.newValue) : readFavoritesFromStorage();

  if (setCacheIfChanged(nextValue)) {
    emitChange();
  }
};

let windowListenersBound = false;

const subscribe = (listener: () => void) => {
  listeners.add(listener);

  if (isBrowser()) {
    const next = readFavoritesFromStorage();
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

  const next = readFavoritesFromStorage();
  setCacheIfChanged(next);
};

const getClientSnapshot = () => {
  refreshCacheFromStorage();
  return favoriteSlugsCache;
};

const getServerSnapshot = () => favoriteSlugsCache;

export function useFavoriteProduct(slug: string | undefined | null) {
  const normalizedSlug = useMemo(() => slug?.trim() ?? '', [slug]);
  const favoriteSlugs = useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);

  const isFavorite = useMemo(() => {
    if (!normalizedSlug) {
      return false;
    }

    return favoriteSlugs.includes(normalizedSlug);
  }, [favoriteSlugs, normalizedSlug]);

  const toggleFavorite = useCallback(() => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    const currentFavorites = favoriteSlugsCache;
    const alreadyFavorite = currentFavorites.includes(normalizedSlug);
    const shouldFavorite = !alreadyFavorite;
    const nextFavorites = shouldFavorite
      ? [...currentFavorites, normalizedSlug]
      : currentFavorites.filter((value) => value !== normalizedSlug);

    writeFavorites(nextFavorites);

    // Remove metadata if unfavoriting
    if (!shouldFavorite) {
      removeFavoriteMetadata(normalizedSlug);
    }
  }, [normalizedSlug]);

  const saveFavoriteWithCustomName = useCallback((customName?: string | null, folder?: string | null) => {
    if (!isBrowser() || !normalizedSlug) {
      return;
    }

    try {
      // Ensure it's in favorites first
      const currentFavorites = favoriteSlugsCache;
      if (!currentFavorites.includes(normalizedSlug)) {
        writeFavorites([...currentFavorites, normalizedSlug]);
      }

      // Save metadata
      saveFavoriteWithMetadata(normalizedSlug, customName, folder);
    } catch (error) {
      console.error('Error saving favorite with custom name:', error);
    }
  }, [normalizedSlug]);

  return {
    isFavorite,
    toggleFavorite,
    saveFavoriteWithCustomName,
  };
}

export function useFavoriteSlugs() {
  return useSyncExternalStore(subscribe, getClientSnapshot, getServerSnapshot);
}


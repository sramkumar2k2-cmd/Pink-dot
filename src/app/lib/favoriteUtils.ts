/**
 * Utility functions for managing favorites with custom names and folders
 */

const FAVORITES_STORAGE_KEY = 'pinkdot:favorites';
const FAVORITES_METADATA_KEY = 'pinkdot:favorites_metadata';

export type FavoriteMetadata = {
  slug: string;
  customName?: string;
  folder?: string;
  addedAt: string;
};

const isBrowser = () => typeof window !== 'undefined';

/**
 * Get all favorite metadata
 */
export function getFavoriteMetadata(): FavoriteMetadata[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const metadataJson = localStorage.getItem(FAVORITES_METADATA_KEY);
    if (!metadataJson) {
      return [];
    }

    return JSON.parse(metadataJson) as FavoriteMetadata[];
  } catch (error) {
    console.error('Error reading favorite metadata:', error);
    return [];
  }
}

/**
 * Get metadata for a specific product slug
 */
export function getFavoriteMetadataBySlug(slug: string): FavoriteMetadata | null {
  const allMetadata = getFavoriteMetadata();
  return allMetadata.find(m => m.slug === slug) || null;
}

/**
 * Save favorite with custom name and folder
 */
export function saveFavoriteWithMetadata(
  slug: string,
  customName?: string | null,
  folder?: string | null
): void {
  if (!isBrowser()) {
    return;
  }

  try {
    const metadata = getFavoriteMetadata();
    
    // Remove existing metadata for this slug if any
    const filteredMetadata = metadata.filter(m => m.slug !== slug);
    
    // Add new metadata
    const newMetadata: FavoriteMetadata = {
      slug,
      addedAt: new Date().toISOString(),
    };

    if (customName && customName.trim()) {
      newMetadata.customName = customName.trim();
    }

    if (folder && folder.trim()) {
      newMetadata.folder = folder.trim();
    }

    filteredMetadata.push(newMetadata);
    localStorage.setItem(FAVORITES_METADATA_KEY, JSON.stringify(filteredMetadata));
  } catch (error) {
    console.error('Error saving favorite metadata:', error);
  }
}

/**
 * Remove favorite metadata
 */
export function removeFavoriteMetadata(slug: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    const metadata = getFavoriteMetadata();
    const filteredMetadata = metadata.filter(m => m.slug !== slug);
    localStorage.setItem(FAVORITES_METADATA_KEY, JSON.stringify(filteredMetadata));
  } catch (error) {
    console.error('Error removing favorite metadata:', error);
  }
}

/**
 * Get display name for a favorite (custom name or product name)
 */
export function getFavoriteDisplayName(slug: string, productName: string): string {
  const metadata = getFavoriteMetadataBySlug(slug);
  return metadata?.customName || productName;
}

/**
 * Get folder for a favorite
 */
export function getFavoriteFolder(slug: string): string | null {
  const metadata = getFavoriteMetadataBySlug(slug);
  return metadata?.folder || null;
}


/**
 * Utility functions for managing cart with purchase timestamps
 */

const CART_STORAGE_KEY = 'pinkdot:cart';
const CART_TIMESTAMPS_KEY = 'pinkdot:cart_timestamps';

export type CartItemWithTimestamp = {
  slug: string;
  addedAt: string; // ISO timestamp
};

const isBrowser = () => typeof window !== 'undefined';

/**
 * Get all cart items with their timestamps
 * If a product is in cart but doesn't have a timestamp, it will be added
 */
export function getCartItemsWithTimestamps(): CartItemWithTimestamp[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    if (!cartJson) {
      return [];
    }

    const cartSlugs: string[] = JSON.parse(cartJson);
    const timestampsJson = localStorage.getItem(CART_TIMESTAMPS_KEY);
    const timestamps: Record<string, string> = timestampsJson 
      ? JSON.parse(timestampsJson) 
      : {};

    // Ensure all cart items have timestamps (add missing ones)
    let timestampsUpdated = false;
    const now = new Date().toISOString();
    
    const items: CartItemWithTimestamp[] = cartSlugs.map(slug => {
      if (!timestamps[slug]) {
        timestamps[slug] = now;
        timestampsUpdated = true;
      }
      return {
        slug,
        addedAt: timestamps[slug],
      };
    });

    // Save updated timestamps if any were added
    if (timestampsUpdated) {
      localStorage.setItem(CART_TIMESTAMPS_KEY, JSON.stringify(timestamps));
    }

    return items;
  } catch (error) {
    console.error('Error reading cart with timestamps:', error);
    return [];
  }
}

/**
 * Add a product to cart with timestamp
 */
export function addToCartWithTimestamp(slug: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    // Get existing cart
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    const cartSlugs: string[] = cartJson ? JSON.parse(cartJson) : [];

    // Add slug if not already present
    if (!cartSlugs.includes(slug)) {
      cartSlugs.push(slug);
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartSlugs));

      // Store timestamp
      const timestampsJson = localStorage.getItem(CART_TIMESTAMPS_KEY);
      const timestamps: Record<string, string> = timestampsJson 
        ? JSON.parse(timestampsJson) 
        : {};

      timestamps[slug] = new Date().toISOString();
      localStorage.setItem(CART_TIMESTAMPS_KEY, JSON.stringify(timestamps));
    }
  } catch (error) {
    console.error('Error adding to cart with timestamp:', error);
  }
}

/**
 * Remove a product from cart (and its timestamp)
 */
export function removeFromCartWithTimestamp(slug: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    // Get existing cart
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    const cartSlugs: string[] = cartJson ? JSON.parse(cartJson) : [];

    // Remove slug
    const updatedSlugs = cartSlugs.filter(s => s !== slug);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(updatedSlugs));

    // Remove timestamp
    const timestampsJson = localStorage.getItem(CART_TIMESTAMPS_KEY);
    if (timestampsJson) {
      const timestamps: Record<string, string> = JSON.parse(timestampsJson);
      delete timestamps[slug];
      localStorage.setItem(CART_TIMESTAMPS_KEY, JSON.stringify(timestamps));
    }
  } catch (error) {
    console.error('Error removing from cart with timestamp:', error);
  }
}

/**
 * Format date, month, and time in a readable format
 * Example: "15 January 2024, 2:30 PM"
 */
export function formatPurchaseDateTime(isoString: string | undefined | null): string {
  try {
    // If no timestamp provided, use current date/time
    if (!isoString) {
      isoString = new Date().toISOString();
    }
    
    const date = new Date(isoString);
    
    // Check if date is valid
    if (isNaN(date.getTime())) {
      // Invalid date, use current date
      const now = new Date();
      const day = now.getDate();
      const monthNames = [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December'
      ];
      const month = monthNames[now.getMonth()];
      const year = now.getFullYear();
      let hours = now.getHours();
      const minutes = now.getMinutes();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      hours = hours % 12;
      hours = hours ? hours : 12;
      const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
      return `${day} ${month} ${year}, ${hours}:${minutesStr} ${ampm}`;
    }
    
    const day = date.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[date.getMonth()];
    const year = date.getFullYear();
    
    let hours = date.getHours();
    const minutes = date.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // 0 should be 12
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${day} ${month} ${year}, ${hours}:${minutesStr} ${ampm}`;
  } catch (error) {
    console.error('Error formatting date:', error);
    // Return current date/time as fallback
    const now = new Date();
    const day = now.getDate();
    const monthNames = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const month = monthNames[now.getMonth()];
    const year = now.getFullYear();
    let hours = now.getHours();
    const minutes = now.getMinutes();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12;
    const minutesStr = minutes < 10 ? `0${minutes}` : minutes;
    return `${day} ${month} ${year}, ${hours}:${minutesStr} ${ampm}`;
  }
}

/**
 * Get formatted date/time for a product slug
 */
export function getProductPurchaseDateTime(slug: string): string | null {
  if (!isBrowser()) {
    return null;
  }

  try {
    const timestampsJson = localStorage.getItem(CART_TIMESTAMPS_KEY);
    if (!timestampsJson) {
      return null;
    }

    const timestamps: Record<string, string> = JSON.parse(timestampsJson);
    const timestamp = timestamps[slug];
    
    if (!timestamp) {
      return null;
    }

    return formatPurchaseDateTime(timestamp);
  } catch (error) {
    console.error('Error getting product purchase date:', error);
    return null;
  }
}


/**
 * Utility functions for managing cart with purchase timestamps
 */

const CART_STORAGE_KEY = 'pinkdot:cart';
const CART_QUANTITIES_KEY = 'pinkdot:cart_quantities';
const CART_TIMESTAMPS_KEY = 'pinkdot:cart_timestamps';

// Store listeners for quantity changes
const quantityListeners = new Set<() => void>();

const emitQuantityChange = () => {
  quantityListeners.forEach((listener) => listener());
};

export type CartItemWithTimestamp = {
  slug: string;
  addedAt: string; // ISO timestamp
  quantity?: number;
};

export type CartItem = {
  slug: string;
  quantity: number;
};

const isBrowser = () => typeof window !== 'undefined';

/**
 * Get cart items with quantities (migrates old format if needed)
 */
export function getCartItems(): CartItem[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const cartJson = localStorage.getItem(CART_STORAGE_KEY);
    const quantitiesJson = localStorage.getItem(CART_QUANTITIES_KEY);
    
    if (!cartJson) {
      return [];
    }

    // Try to parse as new format (object with quantities)
    let cartItems: CartItem[] = [];
    try {
      const parsed = JSON.parse(cartJson);
      if (Array.isArray(parsed)) {
        // Old format: array of slugs - migrate to new format
        const quantities: Record<string, number> = quantitiesJson 
          ? JSON.parse(quantitiesJson) 
          : {};
        
        cartItems = parsed.map(slug => ({
          slug,
          quantity: quantities[slug] || 1,
        }));
        
        // Save in new format
        const newFormat: Record<string, number> = {};
        cartItems.forEach(item => {
          newFormat[item.slug] = item.quantity;
        });
        localStorage.setItem(CART_QUANTITIES_KEY, JSON.stringify(newFormat));
      } else if (typeof parsed === 'object') {
        // New format: object with slug: quantity
        cartItems = Object.entries(parsed).map(([slug, quantity]) => ({
          slug,
          quantity: typeof quantity === 'number' ? quantity : 1,
        }));
      }
    } catch {
      // Fallback: treat as old format
      const cartSlugs: string[] = JSON.parse(cartJson);
      const quantities: Record<string, number> = quantitiesJson 
        ? JSON.parse(quantitiesJson) 
        : {};
      
      cartItems = cartSlugs.map(slug => ({
        slug,
        quantity: quantities[slug] || 1,
      }));
    }

    return cartItems;
  } catch (error) {
    console.error('Error reading cart items:', error);
    return [];
  }
}

/**
 * Get all cart items with their timestamps
 * If a product is in cart but doesn't have a timestamp, it will be added
 */
export function getCartItemsWithTimestamps(): CartItemWithTimestamp[] {
  if (!isBrowser()) {
    return [];
  }

  try {
    const cartItems = getCartItems();
    const timestampsJson = localStorage.getItem(CART_TIMESTAMPS_KEY);
    const timestamps: Record<string, string> = timestampsJson 
      ? JSON.parse(timestampsJson) 
      : {};

    // Ensure all cart items have timestamps (add missing ones)
    let timestampsUpdated = false;
    const now = new Date().toISOString();
    
    const items: CartItemWithTimestamp[] = cartItems.map(item => {
      if (!timestamps[item.slug]) {
        timestamps[item.slug] = now;
        timestampsUpdated = true;
      }
      return {
        slug: item.slug,
        addedAt: timestamps[item.slug],
        quantity: item.quantity,
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
 * Get quantity for a specific product
 */
export function getCartQuantity(slug: string): number {
  if (!isBrowser()) {
    return 0;
  }

  try {
    const cartItems = getCartItems();
    const item = cartItems.find(item => item.slug === slug);
    return item?.quantity || 0;
  } catch (error) {
    console.error('Error getting cart quantity:', error);
    return 0;
  }
}

/**
 * Set quantity for a product (adds to cart if not present, removes if quantity is 0)
 */
export function setCartQuantity(slug: string, quantity: number): void {
  if (!isBrowser()) {
    return;
  }

  try {
    const cartItems = getCartItems();
    const quantities: Record<string, number> = {};
    
    // Build quantities object from existing items
    cartItems.forEach(item => {
      if (item.slug !== slug) {
        quantities[item.slug] = item.quantity;
      }
    });

    // Add or update the item
    if (quantity > 0) {
      quantities[slug] = quantity;
      
      // Update timestamp if adding new item
      if (!cartItems.find(item => item.slug === slug)) {
        const timestampsJson = localStorage.getItem(CART_TIMESTAMPS_KEY);
        const timestamps: Record<string, string> = timestampsJson 
          ? JSON.parse(timestampsJson) 
          : {};
        timestamps[slug] = new Date().toISOString();
        localStorage.setItem(CART_TIMESTAMPS_KEY, JSON.stringify(timestamps));
      }
    } else {
      // Remove timestamp if quantity is 0
      const timestampsJson = localStorage.getItem(CART_TIMESTAMPS_KEY);
      if (timestampsJson) {
        const timestamps: Record<string, string> = JSON.parse(timestampsJson);
        delete timestamps[slug];
        localStorage.setItem(CART_TIMESTAMPS_KEY, JSON.stringify(timestamps));
      }
    }

    // Save quantities
    localStorage.setItem(CART_QUANTITIES_KEY, JSON.stringify(quantities));
    
    // Also update the legacy cart format for backward compatibility
    const slugs = Object.keys(quantities);
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(slugs));
    
    // Trigger change event for listeners
    emitQuantityChange();
    
    // Also trigger storage event for cross-tab sync
    window.dispatchEvent(new StorageEvent('storage', {
      key: CART_QUANTITIES_KEY,
      newValue: JSON.stringify(quantities),
    }));
    window.dispatchEvent(new StorageEvent('storage', {
      key: CART_STORAGE_KEY,
      newValue: JSON.stringify(slugs),
    }));
  } catch (error) {
    console.error('Error setting cart quantity:', error);
  }
}

/**
 * Subscribe to quantity changes
 */
export function subscribeToQuantityChanges(listener: () => void): () => void {
  quantityListeners.add(listener);
  return () => {
    quantityListeners.delete(listener);
  };
}

/**
 * Add a product to cart with timestamp (increments quantity by 1)
 */
export function addToCartWithTimestamp(slug: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    const currentQuantity = getCartQuantity(slug);
    setCartQuantity(slug, currentQuantity + 1);
  } catch (error) {
    console.error('Error adding to cart with timestamp:', error);
  }
}

/**
 * Remove a product from cart (and its timestamp) - sets quantity to 0
 */
export function removeFromCartWithTimestamp(slug: string): void {
  if (!isBrowser()) {
    return;
  }

  try {
    setCartQuantity(slug, 0);
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


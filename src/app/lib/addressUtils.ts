/**
 * Utility functions for managing delivery address in localStorage
 */

const ADDRESS_STORAGE_KEY = 'pink_dot_delivery_address';

export type DeliveryAddress = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  pincode: string;
  address: string; // Complete address field
};

/**
 * Get the saved delivery address from localStorage
 */
export function getSavedAddress(): DeliveryAddress | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const addressJson = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (!addressJson) return null;
    
    const address = JSON.parse(addressJson) as DeliveryAddress;
    
    // Validate that it has required fields
    if (address && typeof address === 'object' && address.name && address.address) {
      return address;
    }
    
    return null;
  } catch (error) {
    console.error('Error reading address from localStorage:', error);
    return null;
  }
}

/**
 * Save delivery address to localStorage
 */
export function saveAddress(address: DeliveryAddress | Partial<DeliveryAddress>): void {
  if (typeof window === 'undefined') return;
  
  try {
    // Merge with existing address if partial update
    const existing = getSavedAddress();
    const fullAddress: DeliveryAddress = {
      name: address.name ?? existing?.name ?? '',
      phone: address.phone ?? existing?.phone ?? '',
      email: address.email ?? existing?.email ?? '',
      street: address.street ?? existing?.street ?? '',
      city: address.city ?? existing?.city ?? '',
      district: address.district ?? existing?.district ?? '',
      pincode: address.pincode ?? existing?.pincode ?? '',
      address: address.address ?? existing?.address ?? '',
    };
    
    localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(fullAddress));
  } catch (error) {
    console.error('Error saving address to localStorage:', error);
  }
}

/**
 * Check if address exists and is complete
 */
export function hasAddress(): boolean {
  const address = getSavedAddress();
  if (!address) return false;
  
  // Check if all required fields are filled
  return !!(
    address.name?.trim() &&
    address.phone?.trim() &&
    address.email?.trim() &&
    address.street?.trim() &&
    address.city?.trim() &&
    address.district?.trim() &&
    address.pincode?.trim() &&
    address.address?.trim()
  );
}

/**
 * Clear the saved address (if needed in future)
 */
export function clearAddress(): void {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.removeItem(ADDRESS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing address from localStorage:', error);
  }
}


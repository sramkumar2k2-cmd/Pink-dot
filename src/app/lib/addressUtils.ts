/**
 * Utility functions for managing delivery address in localStorage
 */

const ADDRESSES_STORAGE_KEY = 'pink_dot_delivery_addresses';
const SELECTED_ADDRESS_ID_KEY = 'pink_dot_selected_address_id';
const ADDRESS_STORAGE_KEY = 'pink_dot_delivery_address'; // Legacy key for backward compatibility

export type DeliveryAddress = {
  id?: string; // Unique ID for the address
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  state: string;
  pincode: string;
  district: string;
  address: string; // Complete address field
  isDefault?: boolean; // Whether this is the default address
  createdAt?: string; // ISO timestamp
  updatedAt?: string; // ISO timestamp
};

export type SavedAddress = DeliveryAddress & {
  id: string;
  createdAt: string;
  updatedAt: string;
};

/**
 * Get all saved addresses from localStorage
 */
export function getAllAddresses(): SavedAddress[] {
  if (typeof window === 'undefined') return [];

  try {
    const addressesJson = localStorage.getItem(ADDRESSES_STORAGE_KEY);
    if (!addressesJson) {
      // Check for legacy single address
      const legacyAddress = getSavedAddress();
      if (legacyAddress && legacyAddress.id) {
        return [legacyAddress as SavedAddress];
      }
      return [];
    }

    const addresses = JSON.parse(addressesJson) as SavedAddress[];
    return addresses.sort((a, b) => {
      // Sort by default first, then by updated date
      if (a.isDefault && !b.isDefault) return -1;
      if (!a.isDefault && b.isDefault) return 1;
      return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
    });
  } catch (error) {
    console.error('Error reading addresses from localStorage:', error);
    return [];
  }
}

/**
 * Get the selected/default delivery address from localStorage
 */
export function getSavedAddress(): SavedAddress | null {
  if (typeof window === 'undefined') return null;

  try {
    // First check for selected address ID
    const selectedId = localStorage.getItem(SELECTED_ADDRESS_ID_KEY);
    const allAddresses = getAllAddresses();
    
    if (selectedId) {
      const selected = allAddresses.find(addr => addr.id === selectedId);
      if (selected) return selected;
    }
    
    // Fall back to default address
    const defaultAddress = allAddresses.find(addr => addr.isDefault);
    if (defaultAddress) return defaultAddress;
    
    // Fall back to most recent address
    if (allAddresses.length > 0) return allAddresses[0];
    
    // Check legacy single address format
    const legacyJson = localStorage.getItem(ADDRESS_STORAGE_KEY);
    if (legacyJson) {
      const legacy = JSON.parse(legacyJson) as DeliveryAddress;
      if (legacy.name || legacy.phone) {
        // Migrate legacy address
        const migrated: SavedAddress = {
          ...legacy,
          id: generateAddressId(),
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          isDefault: true,
        };
        saveAddress(migrated);
        return migrated;
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error reading address from localStorage:', error);
    return null;
  }
}

/**
 * Generate a unique ID for an address
 */
function generateAddressId(): string {
  return `addr_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Save delivery address to localStorage
 * If address has an ID, it updates existing; otherwise creates new
 */
export function saveAddress(address: DeliveryAddress | Partial<DeliveryAddress>): SavedAddress {
  if (typeof window === 'undefined') {
    throw new Error('Cannot save address on server side');
  }

  try {
    const allAddresses = getAllAddresses();
    const now = new Date().toISOString();
    
    let savedAddress: SavedAddress;
    
    if (address.id) {
      // Update existing address
      const existingIndex = allAddresses.findIndex(addr => addr.id === address.id);
      if (existingIndex >= 0) {
        savedAddress = {
          ...allAddresses[existingIndex],
          ...address,
          updatedAt: now,
        } as SavedAddress;
        allAddresses[existingIndex] = savedAddress;
      } else {
        // ID provided but not found, create new
        savedAddress = {
          ...address,
          id: address.id,
          createdAt: now,
          updatedAt: now,
        } as SavedAddress;
        allAddresses.push(savedAddress);
      }
    } else {
      // Create new address
      savedAddress = {
        ...address,
        id: generateAddressId(),
        createdAt: now,
        updatedAt: now,
        isDefault: address.isDefault ?? (allAddresses.length === 0), // First address is default
      } as SavedAddress;
      
      // If this is set as default, unset others
      if (savedAddress.isDefault) {
        allAddresses.forEach(addr => {
          addr.isDefault = false;
        });
      }
      
      allAddresses.push(savedAddress);
    }
    
    // Save all addresses
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(allAddresses));
    
    // If this is the default or only address, also save to legacy key for backward compatibility
    if (savedAddress.isDefault || allAddresses.length === 1) {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(savedAddress));
    }
    
    return savedAddress;
  } catch (error) {
    console.error('Error saving address to localStorage:', error);
    throw error;
  }
}

/**
 * Delete an address by ID
 */
export function deleteAddress(addressId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const allAddresses = getAllAddresses();
    const filtered = allAddresses.filter(addr => addr.id !== addressId);
    
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(filtered));
    
    // If deleted address was selected, clear selection
    const selectedId = localStorage.getItem(SELECTED_ADDRESS_ID_KEY);
    if (selectedId === addressId) {
      localStorage.removeItem(SELECTED_ADDRESS_ID_KEY);
    }
    
    // Update legacy key if needed
    if (filtered.length > 0) {
      const defaultAddr = filtered.find(addr => addr.isDefault) || filtered[0];
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(defaultAddr));
    } else {
      localStorage.removeItem(ADDRESS_STORAGE_KEY);
    }
  } catch (error) {
    console.error('Error deleting address from localStorage:', error);
  }
}

/**
 * Set an address as default
 */
export function setDefaultAddress(addressId: string): void {
  if (typeof window === 'undefined') return;

  try {
    const allAddresses = getAllAddresses();
    
    // Unset all defaults
    allAddresses.forEach(addr => {
      addr.isDefault = addr.id === addressId;
    });
    
    localStorage.setItem(ADDRESSES_STORAGE_KEY, JSON.stringify(allAddresses));
    localStorage.setItem(SELECTED_ADDRESS_ID_KEY, addressId);
    
    // Update legacy key
    const defaultAddr = allAddresses.find(addr => addr.id === addressId);
    if (defaultAddr) {
      localStorage.setItem(ADDRESS_STORAGE_KEY, JSON.stringify(defaultAddr));
    }
  } catch (error) {
    console.error('Error setting default address:', error);
  }
}

/**
 * Get address by ID
 */
export function getAddressById(addressId: string): SavedAddress | null {
  const allAddresses = getAllAddresses();
  return allAddresses.find(addr => addr.id === addressId) || null;
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
    address.state?.trim() &&
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


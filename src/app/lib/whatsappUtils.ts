import { Product } from '@/app/shop/productData';
import { getEffectivePrice, formatPrice, calculateTotal } from './priceUtils';
import { getSavedAddress, hasAddress } from './addressUtils';

// WhatsApp number in international format (without + sign)
const WHATSAPP_NUMBER = '917092939303';

/**
 * Generates a WhatsApp message with cart product details
 */
export function generateWhatsAppMessage(products: Product[]): string {
  if (products.length === 0) {
    return 'Hello! I would like to place an order.';
  }

  const totalPrice = calculateTotal(products);
  const deliveryAddress = getSavedAddress();
  
  // Build message with simple formatting
  let message = 'Order Inquiry from Pink Dot\n\n';
  message += 'Products in Cart:\n\n';
  
  products.forEach((product, index) => {
    const price = getEffectivePrice(product);
    message += `${index + 1}. ${product.name}\n`;
    message += `Price: ${price}\n`;
    message += '\n';
  });
  
  message += '--------------------------------\n';
  message += `Total Amount: ${formatPrice(totalPrice)}\n`;
  message += `Number of Items: ${products.length}\n\n`;
  
  if (deliveryAddress) {
    message += 'Delivery Address Details:\n';
    message += `Name: ${deliveryAddress.name}\n`;
    message += `Phone: ${deliveryAddress.phone}\n`;
    message += `Email: ${deliveryAddress.email}\n`;
    message += `Street: ${deliveryAddress.street}\n`;
    message += `City: ${deliveryAddress.city}\n`;
    message += `District: ${deliveryAddress.district}\n`;
    message += `Pincode: ${deliveryAddress.pincode}\n\n`;
    message += `Complete Address:\n${deliveryAddress.address}\n\n`;
  }
  
  message += 'Please confirm the order details. Thank you!';
  
  return message;
}

/**
 * Detects if the device is mobile
 */
function isMobileDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );
}

/**
 * Generates WhatsApp URL with pre-filled message
 * Uses wa.me format which works best for both WhatsApp Web and mobile app
 * Returns null if address is required but not found
 */
export function getWhatsAppUrl(products: Product[], requireAddress: boolean = true): string | null {
  if (requireAddress && typeof window !== 'undefined') {
    if (!hasAddress()) {
      return null; // Signal that address is required
    }
  }
  
  const message = generateWhatsAppMessage(products);
  
  // Debug: log the message to console
  if (typeof window !== 'undefined') {
    console.log('WhatsApp Message:', message);
  }
  
  // Properly encode the message for URL
  // encodeURIComponent handles newlines as %0A automatically
  const encodedMessage = encodeURIComponent(message);
  
  // Use wa.me format which works best for WhatsApp Web
  // This format ensures the message appears in the chat input bar when continuing to WhatsApp Web
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`;
  
  // Debug: log the URL to console
  if (typeof window !== 'undefined') {
    console.log('WhatsApp URL:', url);
  }
  
  return url;
}

const PENDING_PRODUCTS_STORAGE_KEY = 'pink_dot_pending_products';

/**
 * Store products in sessionStorage for later purchase
 */
export function storePendingProducts(products: Product[]): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.setItem(PENDING_PRODUCTS_STORAGE_KEY, JSON.stringify(products));
  } catch (error) {
    console.error('Error storing pending products:', error);
  }
}

/**
 * Get pending products from sessionStorage
 */
export function getPendingProducts(): Product[] | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const productsJson = sessionStorage.getItem(PENDING_PRODUCTS_STORAGE_KEY);
    if (!productsJson) return null;
    
    return JSON.parse(productsJson) as Product[];
  } catch (error) {
    console.error('Error reading pending products:', error);
    return null;
  }
}

/**
 * Clear pending products from sessionStorage
 */
export function clearPendingProducts(): void {
  if (typeof window === 'undefined') return;
  
  try {
    sessionStorage.removeItem(PENDING_PRODUCTS_STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing pending products:', error);
  }
}

/**
 * Proceed to WhatsApp purchase with pending products
 */
export function proceedToPurchase(): void {
  if (typeof window === 'undefined') return;
  
  const products = getPendingProducts();
  if (!products || products.length === 0) {
    console.error('No pending products found');
    return;
  }
  
  // Clear pending products
  clearPendingProducts();
  
  // Proceed to WhatsApp
  const whatsappUrl = getWhatsAppUrl(products, false);
  if (whatsappUrl) {
    window.location.href = whatsappUrl;
  }
}

/**
 * Check if address is required and handle redirect if missing
 * Now always redirects to delivery address page first
 */
export function handleBuyNow(products: Product[]): void {
  if (typeof window === 'undefined') return;
  
  // Always store products and redirect to delivery address page
  storePendingProducts(products);
  const currentPath = window.location.pathname;
  window.location.href = `/delivery-address?message=address_required&redirect=${encodeURIComponent(currentPath)}`;
}


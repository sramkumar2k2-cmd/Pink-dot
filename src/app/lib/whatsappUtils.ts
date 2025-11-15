import { Product } from '@/app/shop/productData';
import { getEffectivePrice, formatPrice, calculateTotal } from './priceUtils';

// WhatsApp number in international format (without + sign)
const WHATSAPP_NUMBER = '918105555337';

/**
 * Generates a WhatsApp message with cart product details
 */
export function generateWhatsAppMessage(products: Product[]): string {
  if (products.length === 0) {
    return 'Hello! I would like to place an order.';
  }

  const totalPrice = calculateTotal(products);
  
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
 */
export function getWhatsAppUrl(products: Product[]): string {
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


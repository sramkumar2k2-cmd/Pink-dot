/**
 * Parses a price string (e.g., "₹16,800") and returns the numeric value
 */
export function parsePrice(priceString: string): number {
  // Remove currency symbols, commas, and whitespace
  const cleaned = priceString.replace(/[₹,\s]/g, '');
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats a number as Indian Rupee currency string
 */
export function formatPrice(amount: number): string {
  return `₹${amount.toLocaleString('en-IN')}`;
}

/**
 * Gets the effective price of a product (sale price if available, otherwise regular price)
 */
export function getEffectivePrice(product: { price: string; salePrice?: string; originalPrice?: string }): string {
  return product.salePrice && product.originalPrice ? product.salePrice : product.price;
}

/**
 * Calculates the total price of multiple products
 */
export function calculateTotal(products: Array<{ price: string; salePrice?: string; originalPrice?: string }>): number {
  return products.reduce((total, product) => {
    const effectivePrice = getEffectivePrice(product);
    return total + parsePrice(effectivePrice);
  }, 0);
}


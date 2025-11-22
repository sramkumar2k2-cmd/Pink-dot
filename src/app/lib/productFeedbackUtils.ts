// Utility functions for managing product feedbacks in localStorage

export type ProductFeedback = {
  id: string;
  productSlug: string;
  productName: string;
  productImage: string;
  customerName: string;
  rating: number;
  text: string;
  image?: string; // Base64 encoded image
  date: string;
};

const STORAGE_PREFIX = 'pink_dot_product_feedback_';
const ALL_FEEDBACKS_KEY = 'pink_dot_all_feedbacks';

// Get all feedbacks for a specific product
export function getProductFeedbacks(productSlug: string): ProductFeedback[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const key = `${STORAGE_PREFIX}${productSlug}`;
    const stored = localStorage.getItem(key);
    if (!stored) return [];
    
    const feedbacks = JSON.parse(stored) as ProductFeedback[];
    return Array.isArray(feedbacks) ? feedbacks : [];
  } catch (error) {
    console.error('Error loading product feedbacks:', error);
    return [];
  }
}

// Save feedback for a product
export function saveProductFeedback(feedback: Omit<ProductFeedback, 'id' | 'date'>): ProductFeedback {
  if (typeof window === 'undefined') {
    throw new Error('Cannot save feedback on server side');
  }

  const newFeedback: ProductFeedback = {
    ...feedback,
    id: `${feedback.productSlug}-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    date: new Date().toISOString(),
  };

  // Save to product-specific storage
  const key = `${STORAGE_PREFIX}${feedback.productSlug}`;
  const existing = getProductFeedbacks(feedback.productSlug);
  const updated = [...existing, newFeedback];
  localStorage.setItem(key, JSON.stringify(updated));

  // Also save to all feedbacks list for home page
  const allFeedbacks = getAllFeedbacks();
  allFeedbacks.push(newFeedback);
  localStorage.setItem(ALL_FEEDBACKS_KEY, JSON.stringify(allFeedbacks));

  return newFeedback;
}

// Get all feedbacks from all products (for home page)
export function getAllFeedbacks(): ProductFeedback[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(ALL_FEEDBACKS_KEY);
    if (!stored) return [];
    
    const feedbacks = JSON.parse(stored) as ProductFeedback[];
    return Array.isArray(feedbacks) ? feedbacks : [];
  } catch (error) {
    console.error('Error loading all feedbacks:', error);
    return [];
  }
}

// Update existing feedback
export function updateProductFeedback(
  feedbackId: string,
  updates: Partial<Omit<ProductFeedback, 'id' | 'date' | 'productSlug' | 'productName' | 'productImage'>>
): ProductFeedback | null {
  if (typeof window === 'undefined') {
    throw new Error('Cannot update feedback on server side');
  }

  // Find the feedback in all feedbacks
  const allFeedbacks = getAllFeedbacks();
  const feedbackIndex = allFeedbacks.findIndex((f) => f.id === feedbackId);
  
  if (feedbackIndex === -1) return null;

  const feedback = allFeedbacks[feedbackIndex];
  const updatedFeedback: ProductFeedback = {
    ...feedback,
    ...updates,
    date: new Date().toISOString(), // Update date when edited
  };

  // Update in all feedbacks list
  allFeedbacks[feedbackIndex] = updatedFeedback;
  localStorage.setItem(ALL_FEEDBACKS_KEY, JSON.stringify(allFeedbacks));

  // Update in product-specific storage
  const productFeedbacks = getProductFeedbacks(feedback.productSlug);
  const productIndex = productFeedbacks.findIndex((f) => f.id === feedbackId);
  if (productIndex !== -1) {
    productFeedbacks[productIndex] = updatedFeedback;
    const key = `${STORAGE_PREFIX}${feedback.productSlug}`;
    localStorage.setItem(key, JSON.stringify(productFeedbacks));
  }

  return updatedFeedback;
}

// Delete feedback
export function deleteProductFeedback(feedbackId: string): boolean {
  if (typeof window === 'undefined') {
    throw new Error('Cannot delete feedback on server side');
  }

  // Find the feedback
  const allFeedbacks = getAllFeedbacks();
  const feedback = allFeedbacks.find((f) => f.id === feedbackId);
  
  if (!feedback) return false;

  // Remove from all feedbacks list
  const updatedAllFeedbacks = allFeedbacks.filter((f) => f.id !== feedbackId);
  localStorage.setItem(ALL_FEEDBACKS_KEY, JSON.stringify(updatedAllFeedbacks));

  // Remove from product-specific storage
  const productFeedbacks = getProductFeedbacks(feedback.productSlug);
  const updatedProductFeedbacks = productFeedbacks.filter((f) => f.id !== feedbackId);
  const key = `${STORAGE_PREFIX}${feedback.productSlug}`;
  localStorage.setItem(key, JSON.stringify(updatedProductFeedbacks));

  return true;
}

// Convert image file to base64
export function imageToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Failed to convert image to base64'));
      }
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}


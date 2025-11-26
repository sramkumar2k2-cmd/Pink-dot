'use client';

import { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import type { Product } from '@/app/shop/productData';
import { saveProductFeedback, getProductFeedbacks, imageToBase64, updateProductFeedback, deleteProductFeedback, type ProductFeedback } from '@/app/lib/productFeedbackUtils';
import { getSavedAddress, hasAddress } from '@/app/lib/addressUtils';
import { useRouter } from 'next/navigation';
import styles from './ProductFeedback.module.css';

type ProductFeedbackFormProps = {
  product: Product;
};

export function ProductFeedbackForm({ product }: ProductFeedbackFormProps) {
  const router = useRouter();
  const [customerName, setCustomerName] = useState('');
  const [rating, setRating] = useState(5);
  const [text, setText] = useState('');
  const [image, setImage] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [feedbacks, setFeedbacks] = useState<ProductFeedback[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNameFromAddress, setIsNameFromAddress] = useState(false);
  const [editingFeedbackId, setEditingFeedbackId] = useState<string | null>(null);
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  // Load existing feedbacks
  const loadFeedbacks = () => {
    const existing = getProductFeedbacks(product.slug);
    setFeedbacks(existing);
  };

  // Load feedbacks and customer name from delivery address on mount
  useEffect(() => {
    loadFeedbacks();
    
    // Get name from delivery address
    const savedAddress = getSavedAddress();
    if (savedAddress?.name) {
      setCustomerName(savedAddress.name);
      setIsNameFromAddress(true);
    }
  }, [product.slug]);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };

    if (openMenuId) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openMenuId]);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }

    setImageFile(file);
    try {
      const base64 = await imageToBase64(file);
      setImage(base64);
    } catch (error) {
      console.error('Error converting image:', error);
      alert('Failed to process image');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if delivery address is filled before allowing review
    if (!hasAddress()) {
      const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
      router.push(`/support/delivery-address?message=address_required_for_review&redirect=${encodeURIComponent(currentPath)}`);
      return;
    }
    
    if (!customerName.trim() || !text.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    setIsSubmitting(true);

    try {
      if (editingFeedbackId) {
        // Update existing feedback
        updateProductFeedback(editingFeedbackId, {
          customerName: customerName.trim(),
          rating,
          text: text.trim(),
          image: image || undefined,
        });
        alert('Feedback updated successfully!');
      } else {
        // Create new feedback
        await saveProductFeedback({
          productSlug: product.slug,
          productName: product.name,
          productImage: product.image,
          customerName: customerName.trim(),
          rating,
          text: text.trim(),
          image: image || undefined,
        });
        alert('Thank you for your feedback!');
      }

      // Reset form
      setCustomerName('');
      setText('');
      setImage(null);
      setImageFile(null);
      setRating(5);
      setShowForm(false);
      setEditingFeedbackId(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }

      // Reload feedbacks
      loadFeedbacks();
    } catch (error) {
      console.error('Error saving feedback:', error);
      alert('Failed to save feedback. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEdit = (feedback: ProductFeedback) => {
    setEditingFeedbackId(feedback.id);
    setCustomerName(feedback.customerName);
    setRating(feedback.rating);
    setText(feedback.text);
    setImage(feedback.image || null);
    setShowForm(true);
    setOpenMenuId(null); // Close menu
    // Scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDelete = (feedbackId: string) => {
    setOpenMenuId(null); // Close menu
    const confirmMessage = '😢 Are you sure you want to delete this feedback?';
    if (confirm(confirmMessage)) {
      deleteProductFeedback(feedbackId);
      loadFeedbacks();
      alert('Feedback deleted successfully!');
    }
  };

  const toggleMenu = (feedbackId: string) => {
    setOpenMenuId(openMenuId === feedbackId ? null : feedbackId);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingFeedbackId(null);
    setCustomerName('');
    setText('');
    setImage(null);
    setImageFile(null);
    setRating(5);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    // Restore name from address if it was there
    const savedAddress = getSavedAddress();
    if (savedAddress?.name) {
      setCustomerName(savedAddress.name);
      setIsNameFromAddress(true);
    }
  };

  return (
    <div className={styles.feedbackSection}>
      <div className={styles.feedbackHeader}>
        <h2 className={styles.feedbackTitle}>Customer Reviews</h2>
        <button
          type="button"
          onClick={() => {
            if (showForm) {
              handleCancel();
            } else {
              // Check if delivery address is filled before showing form
              if (!hasAddress()) {
                const currentPath = typeof window !== 'undefined' ? window.location.pathname : '';
                router.push(`/support/delivery-address?message=address_required_for_review&redirect=${encodeURIComponent(currentPath)}`);
                return;
              }
              setShowForm(true);
            }
          }}
          className={styles.addReviewButton}
        >
          {showForm ? 'Cancel' : '+ Add Review'}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleSubmit} className={styles.feedbackForm}>
          <div className={styles.formGroup}>
            <label htmlFor="customerName">Your Name *</label>
            <input
              id="customerName"
              type="text"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
              placeholder="Enter your name"
              disabled={isNameFromAddress}
              readOnly={isNameFromAddress}
              className={isNameFromAddress ? styles.nameFieldDisabled : ''}
            />
            {isNameFromAddress && (
              <p className={styles.nameNote}>Name from your delivery address</p>
            )}
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="rating">Rating *</label>
            <div className={styles.ratingInput}>
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className={`${styles.starButton} ${star <= rating ? styles.starActive : ''}`}
                >
                  ⭐
                </button>
              ))}
              <span className={styles.ratingValue}>{rating}/5</span>
            </div>
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="text">Your Review *</label>
            <textarea
              id="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
              required
              rows={4}
              placeholder="Share your experience with this product..."
            />
          </div>

          <div className={styles.formGroup}>
            <label htmlFor="image">Upload Photo (Optional)</label>
            <input
              ref={fileInputRef}
              id="image"
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
            {image && (
              <div className={styles.imagePreview}>
                <Image
                  src={image}
                  alt="Preview"
                  width={150}
                  height={150}
                  className={styles.previewImage}
                />
                <button
                  type="button"
                  onClick={() => {
                    setImage(null);
                    setImageFile(null);
                    if (fileInputRef.current) {
                      fileInputRef.current.value = '';
                    }
                  }}
                  className={styles.removeImageButton}
                >
                  ×
                </button>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className={styles.submitButton}
          >
            {isSubmitting ? (editingFeedbackId ? 'Updating...' : 'Submitting...') : (editingFeedbackId ? 'Update Review' : 'Submit Review')}
          </button>
        </form>
      )}

      <div className={styles.feedbacksList}>
        {feedbacks.length === 0 ? (
          <p className={styles.noFeedbacks}>No reviews yet. Be the first to review!</p>
        ) : (
          feedbacks.map((feedback) => (
            <div key={feedback.id} className={styles.feedbackItem}>
              <div className={styles.feedbackItemHeader}>
                <div className={styles.feedbackCustomerInfo}>
                  <div className={styles.feedbackAvatar}>
                    {feedback.customerName.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <div className={styles.feedbackCustomerName}>{feedback.customerName}</div>
                    <div className={styles.feedbackDate}>
                      {new Date(feedback.date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric',
                      })}
                    </div>
                  </div>
                </div>
                <div className={styles.feedbackHeaderRight}>
                  <div className={styles.feedbackRating}>
                    {Array.from({ length: 5 }).map((_, i) => (
                      <span
                        key={i}
                        className={i < feedback.rating ? styles.starFilled : styles.starEmpty}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <div className={styles.menuContainer} ref={menuRef}>
                    <button
                      type="button"
                      onClick={() => toggleMenu(feedback.id)}
                      className={styles.menuButton}
                      aria-label="More options"
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="5" r="2" fill="currentColor"/>
                        <circle cx="12" cy="12" r="2" fill="currentColor"/>
                        <circle cx="12" cy="19" r="2" fill="currentColor"/>
                      </svg>
                    </button>
                    {openMenuId === feedback.id && (
                      <div className={styles.menuDropdown}>
                        <button
                          type="button"
                          onClick={() => handleEdit(feedback)}
                          className={styles.menuItem}
                        >
                          <span className={styles.menuIcon}>✏️</span>
                          Edit
                        </button>
                        <button
                          type="button"
                          onClick={() => handleDelete(feedback.id)}
                          className={`${styles.menuItem} ${styles.menuItemDelete}`}
                        >
                          <span className={styles.menuIcon}>😢</span>
                          Delete
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              <p className={styles.feedbackText}>{feedback.text}</p>
              {feedback.image && (
                <div className={styles.feedbackImageWrapper}>
                  <Image
                    src={feedback.image}
                    alt={`${feedback.customerName}'s review`}
                    width={300}
                    height={300}
                    className={styles.feedbackImage}
                  />
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}


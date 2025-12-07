"use client";

import { useState, Suspense } from 'react';
import styles from './page.module.css';
import { getProductBySlug, type Product } from '@/app/shop/productData';
import { getEffectivePrice, formatPrice, calculateTotal } from '@/app/lib/priceUtils';
import { getCartItemsWithTimestamps, formatPurchaseDateTime } from '@/app/lib/cartUtils';

function ContactPageContent() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }

    // Hide alert when user starts typing
    if (showAlert) {
      setShowAlert(false);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.subject.trim()) {
      newErrors.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setShowAlert(true);
      // Scroll to first error field
      setTimeout(() => {
        const firstErrorField = Object.keys(newErrors)[0];
        const fieldElement = document.getElementById(firstErrorField);
        if (fieldElement) {
          fieldElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
          (fieldElement as HTMLInputElement | HTMLTextAreaElement).focus();
        }
      }, 100);
      return false;
    }

    return true;
  };

  const handleWhatsAppSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setShowAlert(false);

    const { name, email, phone, subject, message } = formData;

    let whatsappMessage = `*Contact Inquiry - Pink Dot Fashion Jewellery*\n\n` +
      `*Name:* ${name}\n` +
      `${email ? `*Email:* ${email}\n` : ''}` +
      `${phone ? `*Phone:* ${phone}\n` : ''}` +
      `${formData.inquiryType ? `*Inquiry Type:* ${formData.inquiryType}\n` : ''}` +
      `*Subject:* ${subject}\n\n` +
      `*Message:*\n${message}`;

    // If inquiry type is "Order Status", include cart product details
    if (formData.inquiryType === 'Order Status') {
      try {
        // Get cart products with timestamps from localStorage
        const cartItemsWithTimestamps = typeof window !== 'undefined' 
          ? getCartItemsWithTimestamps() 
          : [];
        
        if (cartItemsWithTimestamps.length > 0) {
          const cartProducts: (Product & { addedAt: string })[] = [];
          
          // Get product details for each slug with timestamp
          cartItemsWithTimestamps.forEach(item => {
            const product = getProductBySlug(item.slug);
            if (product) {
              // Ensure we have a valid timestamp
              const timestamp = item.addedAt || new Date().toISOString();
              cartProducts.push({
                ...product,
                addedAt: timestamp,
              });
            }
          });

          if (cartProducts.length > 0) {
            whatsappMessage += `\n\n*━━━━━━━━━━━━━━━━━━━━━━━━━━━━*\n`;
            whatsappMessage += `*ORDER DETAILS*\n`;
            whatsappMessage += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━*\n\n`;
            
            // Add product details with purchase date/time
            cartProducts.forEach((product, index) => {
              const price = getEffectivePrice(product);
              
              // Format purchase date/time - function handles null/undefined
              const purchaseDateTime = formatPurchaseDateTime(product.addedAt);
              
              whatsappMessage += `*${index + 1}. ${product.name}*\n`;
              whatsappMessage += `Price: ${price}\n`;
              whatsappMessage += `Purchased: ${purchaseDateTime}\n`;
              
              if (product.description) {
                whatsappMessage += `Description: ${product.description}\n`;
              }
              
              if (product.specs && product.specs.length > 0) {
                whatsappMessage += `Specs: ${product.specs.map(s => `${s.label}: ${s.value}`).join(', ')}\n`;
              }
              
              whatsappMessage += `\n`;
            });

            // Calculate total
            const totalPrice = calculateTotal(cartProducts);
            whatsappMessage += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━*\n`;
            whatsappMessage += `*Total Items:* ${cartProducts.length}\n`;
            whatsappMessage += `*Total Amount:* ${formatPrice(totalPrice)}\n`;
            whatsappMessage += `*━━━━━━━━━━━━━━━━━━━━━━━━━━━━*\n`;

            // Store order inquiry in localStorage
            const orderInquiry = {
              timestamp: new Date().toISOString(),
              name,
              email: email || '',
              phone: phone || '',
              inquiryType: formData.inquiryType,
              subject,
              message,
              products: cartProducts.map(p => ({
                slug: p.slug,
                name: p.name,
                price: getEffectivePrice(p),
                description: p.description,
                specs: p.specs || [],
                image: p.image,
                purchasedAt: p.addedAt,
                purchasedDateTime: formatPurchaseDateTime(p.addedAt),
              })),
              totalAmount: totalPrice,
              totalItems: cartProducts.length,
            };

            try {
              const orderInquiriesKey = 'pinkdot:order_inquiries';
              const existingInquiries = typeof window !== 'undefined' 
                ? localStorage.getItem(orderInquiriesKey) 
                : null;
              
              const inquiries = existingInquiries ? JSON.parse(existingInquiries) : [];
              inquiries.push(orderInquiry);
              
              if (typeof window !== 'undefined') {
                localStorage.setItem(orderInquiriesKey, JSON.stringify(inquiries));
              }
            } catch (storageError) {
              console.error('Error storing order inquiry:', storageError);
            }
          } else {
            whatsappMessage += `\n\n*Note:* No products found in cart.`;
          }
        } else {
          whatsappMessage += `\n\n*Note:* No products found in cart.`;
        }
      } catch (error) {
        console.error('Error processing cart products:', error);
        whatsappMessage += `\n\n*Note:* Unable to retrieve cart products.`;
      }
    } else {
      // Store regular inquiry in localStorage
      const inquiry = {
        timestamp: new Date().toISOString(),
        name,
        email: email || '',
        phone: phone || '',
        inquiryType: formData.inquiryType || '',
        subject,
        message,
      };

      try {
        const inquiriesKey = 'pinkdot:contact_inquiries';
        const existingInquiries = typeof window !== 'undefined' 
          ? localStorage.getItem(inquiriesKey) 
          : null;
        
        const inquiries = existingInquiries ? JSON.parse(existingInquiries) : [];
        inquiries.push(inquiry);
        
        if (typeof window !== 'undefined') {
          localStorage.setItem(inquiriesKey, JSON.stringify(inquiries));
        }
      } catch (storageError) {
        console.error('Error storing contact inquiry:', storageError);
      }
    }

    setIsSubmitting(false);
    window.open(`https://wa.me/917092939303?text=${encodeURIComponent(whatsappMessage)}`, '_blank');

    // Reset form after opening WhatsApp
    setFormData({
      name: '',
      email: '',
      phone: '',
      inquiryType: '',
      subject: '',
      message: '',
    });
    setErrors({});
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1 className={styles.title}>Get in Touch</h1>
        <p className={styles.subtitle}>
          We&rsquo;d love to hear from you. Send us a message and we&rsquo;ll respond as soon as possible.
        </p>
      </div>

      <div className={styles.content}>
        <div className={styles.contactInfo}>
          <div className={styles.infoSection}>
            <h2 className={styles.infoTitle}>Contact Information</h2>
            <p className={styles.infoDescription}>
              Reach out to us through any of these channels. We&rsquo;re here to help!
            </p>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 8L10.89 13.26C11.2187 13.4793 11.6049 13.5963 12 13.5963C12.3951 13.5963 12.7813 13.4793 13.11 13.26L21 8M5 19H19C19.5304 19 20.0391 18.7893 20.4142 18.4142C20.7893 18.0391 21 17.5304 21 17V7C21 6.46957 20.7893 5.96086 20.4142 5.58579C20.0391 5.21071 19.5304 5 19 5H5C4.46957 5 3.96086 5.21071 3.58579 5.58579C3.21071 5.96086 3 6.46957 3 7V17C3 17.5304 3.21071 18.0391 3.58579 18.4142C3.96086 18.7893 4.46957 19 5 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Email</h3>
                <p>
                  <a
                    href="mailto:pinkdotfashionjewellery@gmail.com"
                    className={styles.infoLink}
                  >
                    pinkdotfashionjewellery@gmail.com
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M3 5C3 3.89543 3.89543 3 5 3H8.27924C8.70967 3 9.09181 3.27543 9.22792 3.68377L10.7257 8.17721C10.8831 8.64932 10.6694 9.16531 10.2243 9.38787L7.96701 10.5165C9.06925 12.9612 11.0388 14.9308 13.4835 16.033L14.6121 13.7757C14.8347 13.3306 15.3507 13.1169 15.8228 13.2743L20.3162 14.7721C20.7246 14.9082 21 15.2903 21 15.7208V19C21 20.1046 20.1046 21 19 21H18C9.71573 21 3 14.2843 3 6V5Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Phone</h3>
                <p>
                  <a href="https://wa.me/917092939303" className={styles.infoLink} target="_blank" rel="noopener noreferrer">
                    +91 70929 39303
                  </a>
                </p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M21 10C21 17 12 23 12 23C12 23 3 17 3 10C3 7.61305 3.94821 5.32387 5.63604 3.63604C7.32387 1.94821 9.61305 1 12 1C14.3869 1 16.6761 1.94821 18.364 3.63604C20.0518 5.32387 21 7.61305 21 10Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Address</h3>
                <p>1023, Basement, Geetha Arcade, Kammasandra - Ananth Nagar Main Rd, opposite to McDonald&apos;s, Ananth Nagar, Phase 1, Kammasandra, Electronic City, Bengaluru, Karnataka 560100</p>
              </div>
            </div>

            <div className={styles.infoItem}>
              <div className={styles.infoIcon}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 6V12L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </div>
              <div className={styles.infoContent}>
                <h3>Business Hours</h3>
                <p>Sunday: 10:30 am - 9:30 pm</p>
                <p>Monday: 9:30 am - 9:30 pm</p>
                <p>Tuesday: 9:30 am - 9:30 pm</p>
                <p>Wednesday: 9:30 am - 9:30 pm</p>
                <p>Thursday: 9:30 am - 9:30 pm</p>
                <p>Friday: 9:30 am - 9:30 pm</p>
                <p>Saturday: 9:30 am - 9:30 pm</p>
              </div>
            </div>

            <div className={styles.socialLinks}>
              <div className={styles.socialIcons}>
                <a
                  href="https://www.instagram.com/pink_dot_fashion?igsh=cnMwZGlnbWU1b2cx"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className={styles.socialLink}
                >
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/917092939303"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="WhatsApp"
                  className={styles.socialLink}
                >
                  <svg className={styles.socialIcon} viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.553-8.485" />
                  </svg>
                </a>
              </div>
            </div>

          </div>
        </div>

        <div className={styles.formSection}>
          <h2 className={styles.formTitle}>Any Queries?</h2>

          {showAlert && (
            <div className={styles.alertMessage}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <span>Please fill all required fields before sending your message.</span>
            </div>
          )}


          <form className={styles.form}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="name">
                Full Name <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className={`${styles.input} ${errors.name ? styles.inputError : ''}`}
                placeholder="Enter your full name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <span className={styles.errorText}>{errors.name}</span>}
            </div>

            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="phone">Phone</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={styles.input}
                  placeholder="(999) 999-9999"
                  value={formData.phone}
                  onChange={handleInputChange}
                />
              </div>

              <div className={styles.formGroup}>
                <label className={styles.label} htmlFor="email">Email (Optional)</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={styles.input}
                  placeholder="your.email@example.com"
                  value={formData.email}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="inquiryType">
                Inquiry Type
              </label>
              <select
                id="inquiryType"
                name="inquiryType"
                className={styles.select}
                value={formData.inquiryType}
                onChange={handleInputChange}
              >
                <option value="">Select inquiry type</option>
                <option value="Product Inquiry">Product Inquiry</option>
                <option value="Order Status">Order Status</option>
                <option value="Returns & Exchanges">Returns & Exchanges</option>
                <option value="Wholesale">Wholesale Inquiry</option>
                <option value="General Question">General Question</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="subject">
                Subject <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="subject"
                name="subject"
                className={`${styles.input} ${errors.subject ? styles.inputError : ''}`}
                placeholder="What is this regarding?"
                value={formData.subject}
                onChange={handleInputChange}
                required
              />
              {errors.subject && <span className={styles.errorText}>{errors.subject}</span>}
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="message">
                Message <span className={styles.required}>*</span>
              </label>
              <textarea
                id="message"
                name="message"
                className={`${styles.textarea} ${errors.message ? styles.inputError : ''}`}
                placeholder="Tell us more about your inquiry..."
                value={formData.message}
                onChange={handleInputChange}
                required
              />
              {errors.message && <span className={styles.errorText}>{errors.message}</span>}
            </div>

            <div className={styles.buttonGroup}>
              <button
                type="button"
                onClick={handleWhatsAppSubmit}
                className={`${styles.button} ${styles.whatsappButton}`}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                        <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite" />
                        <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite" />
                      </circle>
                    </svg>
                    Opening...
                  </>
                ) : (
                  <>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893-.001-3.189-1.262-6.209-3.553-8.485" />
                    </svg>
                    Send on WhatsApp
                  </>
                )}
              </button>
            </div>
          </form>
        </div>
      </div>

      <div className={styles.mapSection}>
        <div className={styles.mapContainer}>
          <h2 className={styles.mapTitle}>Locate Our Store</h2>
          <div className={styles.mapWrapper}>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.115914494258!2d77.69097529999999!3d12.835785500000002!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae6db276f5e855%3A0x2386a4a7ee3b513b!2sPink%20Dot%20Fashion%20Jewellery!5e0!3m2!1sen!2sin!4v1762795591265!5m2!1sen!2sin"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Pink Dot Fashion Jewellery Location"
              className={styles.mapFrame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function ContactPage() {
  return (
    <Suspense fallback={
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </div>
    }>
      <ContactPageContent />
    </Suspense>
  );
}
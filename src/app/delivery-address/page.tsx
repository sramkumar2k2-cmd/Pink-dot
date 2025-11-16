"use client";

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import styles from './page.module.css';
import { getSavedAddress, saveAddress, type DeliveryAddress } from '@/app/lib/addressUtils';
import { sendDeliveryAddressThankYouEmail } from '@/app/lib/emailUtils';

function DeliveryAddressContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const showAddressMessage = searchParams?.get('message') === 'address_required';
  
  const [formData, setFormData] = useState<DeliveryAddress>({
    name: '',
    phone: '',
    email: '',
    street: '',
    city: '',
    district: '',
    pincode: '',
    address: '',
  });
  
  const [errors, setErrors] = useState<Partial<Record<keyof DeliveryAddress, string>>>({});
  const [showAlert, setShowAlert] = useState(false);
  const [hasSavedAddress, setHasSavedAddress] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error' | null; message: string }>({ type: null, message: '' });

  useEffect(() => {
    // Load saved address if exists
    const savedAddress = getSavedAddress();
    if (savedAddress) {
      setFormData(savedAddress);
      setHasSavedAddress(true);
    }
    
    // Show alert if redirected from Buy Now
    if (showAddressMessage) {
      setShowAlert(true);
      // Scroll to form
      setTimeout(() => {
        const formElement = document.getElementById('delivery-address-form');
        if (formElement) {
          formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
          const nameField = document.getElementById('name');
          if (nameField) {
            (nameField as HTMLInputElement).focus();
          }
        }
      }, 300);
    }
  }, [showAddressMessage]);

  const handleEditAddress = () => {
    // Scroll to form and focus on first field
    setTimeout(() => {
      const formElement = document.getElementById('delivery-address-form');
      if (formElement) {
        formElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
        const nameField = document.getElementById('name');
        if (nameField) {
          (nameField as HTMLInputElement).focus();
        }
      }
    }, 100);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error for this field
    if (errors[name as keyof DeliveryAddress]) {
      setErrors(prev => ({ ...prev, [name as keyof DeliveryAddress]: '' }));
    }
    
    // Auto-save to localStorage as user types
    const updatedData = { ...formData, [name]: value };
    saveAddress(updatedData);
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof DeliveryAddress, string>> = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }
    
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    
    if (!formData.street.trim()) {
      newErrors.street = 'Street address is required';
    }
    
    if (!formData.city.trim()) {
      newErrors.city = 'City is required';
    }
    
    if (!formData.district.trim()) {
      newErrors.district = 'District is required';
    }
    
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }
    
    if (!formData.address.trim()) {
      newErrors.address = 'Complete address is required';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      setEmailStatus({ type: null, message: '' });
      
      // Save address first
      saveAddress(formData);
      setHasSavedAddress(true);
      setShowAlert(false);
      
      // Send thank you email
      try {
        const emailResult = await sendDeliveryAddressThankYouEmail(formData);
        
        if (emailResult.success) {
          setEmailStatus({
            type: 'success',
            message: 'Address saved! A confirmation email has been sent to your email address.',
          });
        } else {
          // Address is saved, but email might have failed (configuration issue)
          setEmailStatus({
            type: 'error',
            message: 'Address saved successfully, but confirmation email could not be sent.',
          });
        }
      } catch (error) {
        setEmailStatus({
          type: 'error',
          message: 'Address saved successfully, but confirmation email could not be sent.',
        });
      } finally {
        setIsSubmitting(false);
      }
      
      // Redirect after showing success message
      setTimeout(() => {
        const redirect = searchParams?.get('redirect');
        if (redirect && redirect !== window.location.pathname) {
          window.location.href = redirect;
        } else {
          // If no redirect, just refresh to show saved state
          window.location.href = '/delivery-address';
        }
      }, 2000);
    }
  };

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.headerTop}>
          <div>
            <h1 className={styles.title}>Delivery Address</h1>
            <p className={styles.subtitle}>
              {hasSavedAddress 
                ? 'Your delivery address is saved. You can edit it below if needed.'
                : 'Please provide your delivery address details for easy courier processing.'}
            </p>
          </div>
          {hasSavedAddress && (
            <button
              type="button"
              onClick={handleEditAddress}
              className={styles.editButton}
              aria-label="Edit Address"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M11 4H4C3.46957 4 2.96086 4.21071 2.58579 4.58579C2.21071 4.96086 2 5.46957 2 6V20C2 20.5304 2.21071 21.0391 2.58579 21.4142C2.96086 21.7893 3.46957 22 4 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M18.5 2.50023C18.8978 2.10243 19.4374 1.87891 20 1.87891C20.5626 1.87891 21.1022 2.10243 21.5 2.50023C21.8978 2.89804 22.1213 3.43762 22.1213 4.00023C22.1213 4.56284 21.8978 5.10243 21.5 5.50023L12 15.0002L8 16.0002L9 12.0002L18.5 2.50023Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Edit Address
            </button>
          )}
        </div>
      </div>

      {showAlert && (
        <div className={styles.alertMessage}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span>Please fill your delivery address to complete your purchase.</span>
        </div>
      )}

      {emailStatus.type && (
        <div className={`${styles.alertMessage} ${emailStatus.type === 'success' ? styles.successMessage : styles.errorMessage}`}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            {emailStatus.type === 'success' ? (
              <>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9 12L11 14L15 10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </>
            ) : (
              <>
                <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M12 8V12M12 16H12.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </>
            )}
          </svg>
          <span>{emailStatus.message}</span>
        </div>
      )}

      <div className={styles.formSection}>
        <form id="delivery-address-form" className={styles.form} onSubmit={handleSubmit}>
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
              <label className={styles.label} htmlFor="phone">
                Phone Number <span className={styles.required}>*</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className={`${styles.input} ${errors.phone ? styles.inputError : ''}`}
                placeholder="10-digit phone number"
                value={formData.phone}
                onChange={handleInputChange}
                maxLength={10}
                required
              />
              {errors.phone && <span className={styles.errorText}>{errors.phone}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="email">
                Email ID <span className={styles.required}>*</span>
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className={`${styles.input} ${errors.email ? styles.inputError : ''}`}
                placeholder="your.email@example.com"
                value={formData.email}
                onChange={handleInputChange}
                required
              />
              {errors.email && <span className={styles.errorText}>{errors.email}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="street">
              Street Address <span className={styles.required}>*</span>
            </label>
            <input
              type="text"
              id="street"
              name="street"
              className={`${styles.input} ${errors.street ? styles.inputError : ''}`}
              placeholder="House/Flat number, Building name, Street"
              value={formData.street}
              onChange={handleInputChange}
              required
            />
            {errors.street && <span className={styles.errorText}>{errors.street}</span>}
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="city">
                City <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="city"
                name="city"
                className={`${styles.input} ${errors.city ? styles.inputError : ''}`}
                placeholder="City"
                value={formData.city}
                onChange={handleInputChange}
                required
              />
              {errors.city && <span className={styles.errorText}>{errors.city}</span>}
            </div>
            
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="district">
                District <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="district"
                name="district"
                className={`${styles.input} ${errors.district ? styles.inputError : ''}`}
                placeholder="District"
                value={formData.district}
                onChange={handleInputChange}
                required
              />
              {errors.district && <span className={styles.errorText}>{errors.district}</span>}
            </div>
          </div>

          <div className={styles.formRow}>
            <div className={styles.formGroup}>
              <label className={styles.label} htmlFor="pincode">
                Pincode <span className={styles.required}>*</span>
              </label>
              <input
                type="text"
                id="pincode"
                name="pincode"
                className={`${styles.input} ${errors.pincode ? styles.inputError : ''}`}
                placeholder="6-digit pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                maxLength={6}
                pattern="[0-9]{6}"
                required
              />
              {errors.pincode && <span className={styles.errorText}>{errors.pincode}</span>}
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label} htmlFor="address">
              Complete Address <span className={styles.required}>*</span>
            </label>
            <textarea
              id="address"
              name="address"
              className={`${styles.textarea} ${errors.address ? styles.inputError : ''}`}
              placeholder="Enter your complete delivery address including all details"
              value={formData.address}
              onChange={handleInputChange}
              rows={4}
              required
            />
            {errors.address && <span className={styles.errorText}>{errors.address}</span>}
            <p className={styles.helperText}>
              Your address will be saved and automatically included in all your orders for easy courier delivery.
            </p>
          </div>

          <div className={styles.buttonGroup}>
            <button 
              type="submit" 
              className={styles.submitButton}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <svg className={styles.spinner} width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="32" strokeDashoffset="32">
                      <animate attributeName="stroke-dasharray" dur="2s" values="0 32;16 16;0 32;0 32" repeatCount="indefinite"/>
                      <animate attributeName="stroke-dashoffset" dur="2s" values="0;-16;-32;-32" repeatCount="indefinite"/>
                    </circle>
                  </svg>
                  Saving...
                </>
              ) : (
                <>
                  {hasSavedAddress ? 'Update Address & Send Email' : 'Save Address & Send Email'}
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default function DeliveryAddressPage() {
  return (
    <Suspense fallback={
      <div className={styles.page}>
        <div className={styles.header}>
          <h1 className={styles.title}>Delivery Address</h1>
          <p className={styles.subtitle}>Loading...</p>
        </div>
      </div>
    }>
      <DeliveryAddressContent />
    </Suspense>
  );
}


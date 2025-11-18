import emailjs from '@emailjs/browser';

// EmailJS Configuration
// These values will be set when EmailJS account is configured
// For now, using placeholder values that can be updated later
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_nx9wa2d',
  TEMPLATE_ID_DELIVERY_ADDRESS: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_DELIVERY_ADDRESS || 'template_0nob934',
  TEMPLATE_ID_CONTACT: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT || 'template_t5zk1w1',
  TEMPLATE_ID_DELIVERY_NOTIFICATION: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_DELIVERY_NOTIFICATION || 'template_0nob934',
  TEMPLATE_ID_CONTACT_NOTIFICATION: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_NOTIFICATION || 'template_t5zk1w1',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '9dm0OwOcsme-4j0Ik',
  BUSINESS_EMAIL: 'pinkdotfashionjewellery@gmail.com',
};

// Initialize EmailJS (call this once in your app)
export function initEmailJS() {
  if (typeof window !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY && EMAILJS_CONFIG.PUBLIC_KEY !== 'your_public_key') {
    emailjs.init(EMAILJS_CONFIG.PUBLIC_KEY);
  }
}

export type DeliveryAddressData = {
  name: string;
  phone: string;
  email: string;
  street: string;
  city: string;
  district: string;
  pincode: string;
  address: string;
};

export type ContactFormData = {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
};

/**
 * Send thank you email for delivery address submission
 */
export async function sendDeliveryAddressThankYouEmail(
  addressData: DeliveryAddressData
): Promise<{ success: boolean; error?: string }> {
  // Don't send email if EmailJS is not configured (only check if values are missing or placeholders)
  if (
    !EMAILJS_CONFIG.SERVICE_ID ||
    !EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS ||
    !EMAILJS_CONFIG.PUBLIC_KEY ||
    EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS === 'your_template_id_delivery' ||
    EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key'
  ) {
    console.warn('EmailJS is not configured. Skipping email send.');
    return { success: false, error: 'EmailJS not configured' };
  }

  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Cannot send email on server side' };
    }

    // Validate configuration before proceeding
    if (!EMAILJS_CONFIG.SERVICE_ID || !EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS || !EMAILJS_CONFIG.PUBLIC_KEY) {
      console.warn('EmailJS configuration incomplete');
      return { success: false, error: 'EmailJS configuration incomplete' };
    }

    // Initialize EmailJS
    try {
      initEmailJS();
    } catch (initError) {
      console.error('Failed to initialize EmailJS:', initError);
      return { success: false, error: 'Failed to initialize EmailJS' };
    }

    // Validate email address before sending
    if (!addressData.email || !addressData.email.trim()) {
      throw new Error('Recipient email address is required');
    }

    const templateParams = {
      // CRITICAL: Template MUST use {{to_email}} in "To Email" field
      to_email: addressData.email.trim(),
      to_name: addressData.name,
      
      // Template variables (matching your EmailJS template)
      full_name: addressData.name,
      phone: addressData.phone,
      email: addressData.email.trim(),
      street_address: addressData.street,
      city: addressData.city,
      district: addressData.district,
      pincode: addressData.pincode,
      complete_address: addressData.address,
      
      // Additional variables for compatibility
      customer_name: addressData.name,
      customer_email: addressData.email.trim(),
      customer_phone: addressData.phone,
      delivery_street: addressData.street,
      delivery_city: addressData.city,
      delivery_district: addressData.district,
      delivery_pincode: addressData.pincode,
      delivery_address: addressData.address,
      
      subject: 'Thank You for Adding Your Delivery Address - Pink Dot Fashion Jewellery',
      message: `Dear ${addressData.name},

Thank you for adding your delivery address to Pink Dot Fashion Jewellery!

Your address has been successfully saved:
${addressData.address}

Street: ${addressData.street}
City: ${addressData.city}
District: ${addressData.district}
Pincode: ${addressData.pincode}

This address will be automatically included in all your future orders for easy and convenient delivery.

We appreciate your trust in Pink Dot Fashion Jewellery and look forward to serving you!

Best regards,
Pink Dot Fashion Jewellery Team`,
    };

    console.log('Sending delivery address email:', {
      service_id: EMAILJS_CONFIG.SERVICE_ID,
      template_id: EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS,
      to_email: addressData.email,
      to_email_in_params: templateParams.to_email,
      public_key_set: !!EMAILJS_CONFIG.PUBLIC_KEY,
      all_params: Object.keys(templateParams),
    });

    // Send email with proper error handling
    let result;
    try {
      result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS,
        templateParams
      );
    } catch (sendError: any) {
      // Re-throw with more context
      const errorMsg = sendError?.text || sendError?.message || sendError?.toString() || 'Unknown EmailJS error';
      throw new Error(`EmailJS send failed: ${errorMsg}`);
    }

    // Check if result indicates success
    if (result && (result.status === 200 || result.text === 'OK')) {
      console.log('Delivery address email sent successfully:', result);
      return { success: true };
    } else {
      const status = result?.status || 'unknown';
      const text = result?.text || 'No response text';
      throw new Error(`EmailJS returned unexpected status: ${status}, text: ${text}`);
    }
  } catch (error: any) {
    console.error('Error sending delivery address thank you email:', error);
    
    // Log comprehensive error details
    const errorDetails: any = {
      error_type: typeof error,
      error_constructor: error?.constructor?.name,
      service_id: EMAILJS_CONFIG.SERVICE_ID,
      template_id: EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS,
      public_key_set: !!EMAILJS_CONFIG.PUBLIC_KEY,
    };
    
    if (error && typeof error === 'object') {
      errorDetails.error_keys = Object.keys(error);
      errorDetails.error_stringified = JSON.stringify(error);
      
      // Check for EmailJS specific error properties
      if ('text' in error) errorDetails.error_text = error.text;
      if ('status' in error) errorDetails.error_status = error.status;
      if ('message' in error) errorDetails.error_message = error.message;
    }
    
    console.error('Error details:', errorDetails);
    
    // Handle different error types
    let errorMessage = 'Failed to send email';
    if (error instanceof Error) {
      errorMessage = error.message;
    } else if (error && typeof error === 'object') {
      const err = error as any;
      if (err.text && typeof err.text === 'string') {
        errorMessage = err.text;
      } else if (err.message && typeof err.message === 'string') {
        errorMessage = err.message;
      } else if (err.status !== undefined) {
        errorMessage = `EmailJS error: Status ${err.status}`;
      } else if (Object.keys(err).length === 0) {
        errorMessage = 'EmailJS configuration error - please verify template ID (template_0nob934) and service ID are correct in EmailJS dashboard';
      } else {
        try {
          errorMessage = JSON.stringify(error);
        } catch {
          errorMessage = 'EmailJS error occurred - check console for details';
        }
      }
    }
    
    return {
      success: false,
      error: errorMessage,
    };
  }
}

/**
 * Send thank you email for contact form submission
 */
export async function sendContactThankYouEmail(
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  // Don't send email if EmailJS is not configured (only check if values are missing or placeholders)
  if (
    !EMAILJS_CONFIG.SERVICE_ID ||
    !EMAILJS_CONFIG.TEMPLATE_ID_CONTACT ||
    !EMAILJS_CONFIG.PUBLIC_KEY ||
    EMAILJS_CONFIG.SERVICE_ID === 'your_service_id' ||
    EMAILJS_CONFIG.TEMPLATE_ID_CONTACT === 'your_template_id_contact' ||
    EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key'
  ) {
    console.warn('EmailJS is not configured. Skipping email send.');
    return { success: false, error: 'EmailJS not configured' };
  }

  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Cannot send email on server side' };
    }

    initEmailJS();

    const templateParams = {
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      // Additional formatted content for template
      to_email: formData.email,
      to_name: formData.name,
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone || 'Not provided',
      inquiry_subject: formData.subject,
      inquiry_message: formData.message,
      email_subject: 'Thank You for Contacting Us - Pink Dot Fashion Jewellery',
      formatted_message: `Dear ${formData.name},

Thank you for reaching out to Pink Dot Fashion Jewellery!

We have received your inquiry regarding: "${formData.subject}"

Your Message:
${formData.message}

Our team will review your message and get back to you as soon as possible. We typically respond within 24-48 hours during business days.

If you have any urgent queries, please feel free to contact us at:
- Phone: +91 70929 39303
- Email: pinkdotfashionjewellery@gmail.com

We appreciate your interest in Pink Dot Fashion Jewellery and look forward to assisting you!

Best regards,
Pink Dot Fashion Jewellery Team`,
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CONTACT,
      templateParams
    );

    return { success: true };
  } catch (error) {
    console.error('Error sending contact thank you email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send notification email to Pink Dot when customer updates/saves delivery address
 */
export async function sendDeliveryAddressNotificationEmail(
  addressData: DeliveryAddressData
): Promise<{ success: boolean; error?: string }> {
  // Don't send if template ID is not configured
  if (
    !EMAILJS_CONFIG.SERVICE_ID ||
    !EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_NOTIFICATION ||
    !EMAILJS_CONFIG.PUBLIC_KEY ||
    EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_NOTIFICATION === '' ||
    EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key'
  ) {
    console.warn('Delivery address notification email template not configured. Skipping notification.');
    return { success: false, error: 'Notification template not configured' };
  }

  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Cannot send email on server side' };
    }

    // Initialize EmailJS
    try {
      initEmailJS();
    } catch (initError) {
      console.error('Failed to initialize EmailJS:', initError);
      return { success: false, error: 'Failed to initialize EmailJS' };
    }

    const templateParams = {
      // CRITICAL: Template MUST use {{to_email}} in "To Email" field set to company email
      to_email: EMAILJS_CONFIG.BUSINESS_EMAIL,
      
      // Customer information
      full_name: addressData.name,
      phone: addressData.phone,
      email: addressData.email.trim(),
      street_address: addressData.street,
      city: addressData.city,
      district: addressData.district,
      pincode: addressData.pincode,
      complete_address: addressData.address,
      
      // Additional variables for compatibility
      customer_name: addressData.name,
      customer_email: addressData.email.trim(),
      customer_phone: addressData.phone,
      delivery_street: addressData.street,
      delivery_city: addressData.city,
      delivery_district: addressData.district,
      delivery_pincode: addressData.pincode,
      delivery_address: addressData.address,
      
      subject: 'New Delivery Address Update - Pink Dot Fashion Jewellery',
      message: `A customer has ${addressData.email ? 'updated' : 'saved'} their delivery address:

Customer Name: ${addressData.name}
Email: ${addressData.email}
Phone: ${addressData.phone}

Delivery Address:
${addressData.address}

Street: ${addressData.street}
City: ${addressData.city}
District: ${addressData.district}
Pincode: ${addressData.pincode}

This address will be used for future orders from this customer.`,
    };

    console.log('Sending delivery address notification to company:', {
      service_id: EMAILJS_CONFIG.SERVICE_ID,
      template_id: EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_NOTIFICATION,
      to_email: EMAILJS_CONFIG.BUSINESS_EMAIL,
    });

    // Send email
    let result;
    try {
      result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_NOTIFICATION,
        templateParams
      );
    } catch (sendError: any) {
      const errorMsg = sendError?.text || sendError?.message || sendError?.toString() || 'Unknown EmailJS error';
      throw new Error(`EmailJS send failed: ${errorMsg}`);
    }

    // Check if result indicates success
    if (result && (result.status === 200 || result.text === 'OK')) {
      console.log('Delivery address notification email sent successfully to company:', result);
      return { success: true };
    } else {
      const status = result?.status || 'unknown';
      const text = result?.text || 'No response text';
      throw new Error(`EmailJS returned unexpected status: ${status}, text: ${text}`);
    }
  } catch (error: any) {
    console.error('Error sending delivery address notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send notification email to Pink Dot when customer submits contact form
 */
export async function sendContactNotificationEmail(
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  // Don't send if template ID is not configured
  if (
    !EMAILJS_CONFIG.SERVICE_ID ||
    !EMAILJS_CONFIG.TEMPLATE_ID_CONTACT_NOTIFICATION ||
    !EMAILJS_CONFIG.PUBLIC_KEY ||
    EMAILJS_CONFIG.TEMPLATE_ID_CONTACT_NOTIFICATION === '' ||
    EMAILJS_CONFIG.PUBLIC_KEY === 'your_public_key'
  ) {
    console.warn('Contact notification email template not configured. Skipping notification.');
    return { success: false, error: 'Notification template not configured' };
  }

  try {
    if (typeof window === 'undefined') {
      return { success: false, error: 'Cannot send email on server side' };
    }

    // Initialize EmailJS
    try {
      initEmailJS();
    } catch (initError) {
      console.error('Failed to initialize EmailJS:', initError);
      return { success: false, error: 'Failed to initialize EmailJS' };
    }

    const templateParams = {
      // CRITICAL: Template MUST use {{to_email}} in "To Email" field set to company email
      to_email: EMAILJS_CONFIG.BUSINESS_EMAIL,
      
      // Contact form data
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      
      // Additional variables for compatibility
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone || 'Not provided',
      inquiry_subject: formData.subject,
      inquiry_message: formData.message,
      
      email_subject: `New Contact Form Inquiry: ${formData.subject}`,
      formatted_message: `You have received a new inquiry from your website:

From: ${formData.name}
Email: ${formData.email}
Phone: ${formData.phone || 'Not provided'}

Subject: ${formData.subject}

Message:
${formData.message}

---
Please respond to this inquiry at your earliest convenience.`,
    };

    console.log('Sending contact notification to company:', {
      service_id: EMAILJS_CONFIG.SERVICE_ID,
      template_id: EMAILJS_CONFIG.TEMPLATE_ID_CONTACT_NOTIFICATION,
      to_email: EMAILJS_CONFIG.BUSINESS_EMAIL,
    });

    // Send email
    let result;
    try {
      result = await emailjs.send(
        EMAILJS_CONFIG.SERVICE_ID,
        EMAILJS_CONFIG.TEMPLATE_ID_CONTACT_NOTIFICATION,
        templateParams
      );
    } catch (sendError: any) {
      const errorMsg = sendError?.text || sendError?.message || sendError?.toString() || 'Unknown EmailJS error';
      throw new Error(`EmailJS send failed: ${errorMsg}`);
    }

    // Check if result indicates success
    if (result && (result.status === 200 || result.text === 'OK')) {
      console.log('Contact notification email sent successfully to company:', result);
      return { success: true };
    } else {
      const status = result?.status || 'unknown';
      const text = result?.text || 'No response text';
      throw new Error(`EmailJS returned unexpected status: ${status}, text: ${text}`);
    }
  } catch (error: any) {
    console.error('Error sending contact notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}


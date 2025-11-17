import emailjs from '@emailjs/browser';

// EmailJS Configuration
// These values will be set when EmailJS account is configured
// For now, using placeholder values that can be updated later
export const EMAILJS_CONFIG = {
  SERVICE_ID: process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || 'service_nx9wa2d',
  TEMPLATE_ID_DELIVERY_ADDRESS: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_DELIVERY_ADDRESS || 'your_template_id_delivery',
  TEMPLATE_ID_CONTACT: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT || 'template_t5zk1w1',
  TEMPLATE_ID_CONTACT_NOTIFICATION: process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT_NOTIFICATION || 'template_t5zk1w1',
  PUBLIC_KEY: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || '9dm0OwOcsme-4j0Ik',
  PINK_DOT_EMAIL: process.env.NEXT_PUBLIC_PINK_DOT_EMAIL || 'pinkdotfashionjewellery@gmail.com',
};

// Initialize EmailJS (call this once in your app)
export function initEmailJS() {
  if (typeof window !== 'undefined' && EMAILJS_CONFIG.PUBLIC_KEY !== '9dm0OwOcsme-4j0Ik') {
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
  // Don't send email if EmailJS is not configured
  if (
    EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS === 'your_template_id_delivery' ||
    EMAILJS_CONFIG.PUBLIC_KEY === '9dm0OwOcsme-4j0Ik'
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
      to_email: addressData.email,
      to_name: addressData.name,
      customer_name: addressData.name,
      customer_email: addressData.email,
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

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_DELIVERY_ADDRESS,
      templateParams
    );

    return { success: true };
  } catch (error) {
    console.error('Error sending delivery address thank you email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}

/**
 * Send thank you email for contact form submission
 */
export async function sendContactThankYouEmail(
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  // Don't send email if EmailJS is not configured
  if (
    EMAILJS_CONFIG.SERVICE_ID === 'service_nx9wa2d' ||
    EMAILJS_CONFIG.TEMPLATE_ID_CONTACT === 'template_4uzarom' ||
    EMAILJS_CONFIG.PUBLIC_KEY === '9dm0OwOcsme-4j0Ik'
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
 * Send notification email to Pink Dot for contact form submission
 */
export async function sendContactNotificationEmail(
  formData: ContactFormData
): Promise<{ success: boolean; error?: string }> {
  // Don't send email if EmailJS is not configured
  if (
    EMAILJS_CONFIG.SERVICE_ID === 'service_nx9wa2d' ||
    EMAILJS_CONFIG.TEMPLATE_ID_CONTACT_NOTIFICATION === 'template_t5zk1w1' ||
    EMAILJS_CONFIG.PUBLIC_KEY === '9dm0OwOcsme-4j0Ik'
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
      to_email: EMAILJS_CONFIG.PINK_DOT_EMAIL,
      to_name: 'Pink Dot Fashion Jewellery',
      full_name: formData.name,
      email: formData.email,
      phone: formData.phone || 'Not provided',
      subject: formData.subject,
      message: formData.message,
      // Additional formatted content for template
      customer_name: formData.name,
      customer_email: formData.email,
      customer_phone: formData.phone || 'Not provided',
      inquiry_subject: formData.subject,
      inquiry_message: formData.message,
      email_subject: `New Contact Form Submission: ${formData.subject}`,
      formatted_message: `New Contact Form Submission

Customer Details:
- Name: ${formData.name}
- Email: ${formData.email}
- Phone: ${formData.phone || 'Not provided'}

Subject: ${formData.subject}

Message:
${formData.message}

---
This is an automated notification from the Pink Dot Fashion Jewellery contact form.`,
    };

    await emailjs.send(
      EMAILJS_CONFIG.SERVICE_ID,
      EMAILJS_CONFIG.TEMPLATE_ID_CONTACT_NOTIFICATION,
      templateParams
    );

    return { success: true };
  } catch (error) {
    console.error('Error sending contact notification email:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error occurred',
    };
  }
}


# EmailJS Configuration Guide

This project uses EmailJS to send thank you emails to customers when they:
1. Submit their delivery address
2. Send a contact inquiry

## Setup Instructions

### 1. Create an EmailJS Account

1. Go to [EmailJS.com](https://www.emailjs.com/)
2. Sign up for a free account (200 emails/month on free plan)
3. Verify your email address

### 2. Create an Email Service

1. In EmailJS dashboard, go to **Email Services**
2. Click **Add New Service**
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. Note your **Service ID**

### 3. Create Email Templates

You need to create **2 templates**:

#### Template 1: Delivery Address Thank You Email

1. Go to **Email Templates** in EmailJS dashboard
2. Click **Create New Template**
3. Set **Template Name**: `delivery_address_thank_you`
4. Set **Subject**: `Thank You for Adding Your Delivery Address - Pink Dot Fashion Jewellery`
5. **Email Content**:
   ```
   Dear {{customer_name}},

   Thank you for adding your delivery address to Pink Dot Fashion Jewellery!

   Your address has been successfully saved:
   {{delivery_address}}

   Street: {{delivery_street}}
   City: {{delivery_city}}
   District: {{delivery_district}}
   Pincode: {{delivery_pincode}}

   This address will be automatically included in all your future orders for easy and convenient delivery.

   We appreciate your trust in Pink Dot Fashion Jewellery and look forward to serving you!

   Best regards,
   Pink Dot Fashion Jewellery Team
   ```
6. Note the **Template ID**

#### Template 2: Contact Form Thank You Email

1. Create another template
2. Set **Template Name**: `contact_inquiry_thank_you`
3. Set **Subject**: `Thank You for Contacting Us - Pink Dot Fashion Jewellery`
4. **Email Content**:
   ```
   Dear {{customer_name}},

   Thank you for reaching out to Pink Dot Fashion Jewellery!

   We have received your inquiry regarding: "{{inquiry_subject}}"

   Your Message:
   {{inquiry_message}}

   Our team will review your message and get back to you as soon as possible. We typically respond within 24-48 hours during business days.

   If you have any urgent queries, please feel free to contact us at:
   - Phone: +91 70929 39303
   - Email: pinkdotfashionjewellery@gmail.com

   We appreciate your interest in Pink Dot Fashion Jewellery and look forward to assisting you!

   Best regards,
   Pink Dot Fashion Jewellery Team
   ```
5. Note the **Template ID**

### 4. Get Your Public Key

1. Go to **Account** → **General** in EmailJS dashboard
2. Find **Public Key** under API Keys
3. Copy the Public Key

### 5. Configure Environment Variables

Create a `.env.local` file in the root of your project and add:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_DELIVERY_ADDRESS=your_delivery_template_id_here
NEXT_PUBLIC_EMAILJS_TEMPLATE_CONTACT=your_contact_template_id_here
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key_here
```

Replace the placeholder values with your actual IDs and keys from EmailJS dashboard.

### 6. Restart Your Development Server

After adding the environment variables, restart your Next.js development server:

```bash
npm run dev
```

## Testing

1. **Test Delivery Address Email**:
   - Go to `/delivery-address` page
   - Fill in the form and submit
   - Check your email for the thank you message

2. **Test Contact Form Email**:
   - Go to `/contact` page
   - Fill in the form and click "Send on Email" or "Send on WhatsApp"
   - Check your email for the thank you message

## Troubleshooting

- **Emails not sending**: Check browser console for errors
- **Configuration errors**: Ensure all environment variables are set correctly
- **Template variables**: Make sure template variable names match exactly (case-sensitive)
- **Rate limits**: Free plan has 200 emails/month limit

## Template Variables Reference

### Delivery Address Template Variables:
- `{{to_email}}` - Recipient email
- `{{to_name}}` - Recipient name
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email
- `{{customer_phone}}` - Customer's phone
- `{{delivery_street}}` - Street address
- `{{delivery_city}}` - City
- `{{delivery_district}}` - District
- `{{delivery_pincode}}` - Pincode
- `{{delivery_address}}` - Complete address

### Contact Form Template Variables:
- `{{to_email}}` - Recipient email
- `{{to_name}}` - Recipient name
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email
- `{{customer_phone}}` - Customer's phone (or "Not provided")
- `{{inquiry_subject}}` - Inquiry subject
- `{{inquiry_message}}` - Inquiry message

## Notes

- The email functionality will gracefully handle cases where EmailJS is not configured yet
- If configuration is missing, the forms will still work, but emails won't be sent
- All email sending is asynchronous and won't block form submission
- Success/error messages are shown to users after email sending attempts


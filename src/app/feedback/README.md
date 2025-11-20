# Feedback Page Setup Guide

## How to Add Your Google Feedback

### Step 1: Add Your Feedback Data

1. Open `src/app/feedback/page.tsx`
2. Find the `feedbackData` array (around line 7)
3. Update the array with your actual Google reviews/feedback

### Step 2: Add Images

1. Create a folder: `public/images/feedback/`
2. Add your feedback images to this folder (e.g., `feedback1.jpg`, `feedback2.jpg`, etc.)
3. Update the `image` property in each feedback object to match your image filenames

**Example:**
```typescript
{
  id: 1,
  name: "Your Customer Name",
  location: "City",
  rating: 5,
  text: "Your feedback text here...",
  date: "2024-01-15",
  image: "/images/feedback/your-image.jpg", // Update this path
  verified: true,
}
```

### Step 3: Update Google Business Link

1. In `src/app/feedback/page.tsx`, find `YOUR_GOOGLE_BUSINESS_PAGE` (appears twice)
2. Replace it with your actual Google Business page URL

**Example:**
```typescript
href="https://g.page/r/YOUR_GOOGLE_BUSINESS_PAGE"
// Replace with:
href="https://g.page/r/your-actual-google-business-page"
```

### Step 4: Customize Stats

Update the stats section (around line 50) with your actual numbers:
- Average Rating
- Number of Happy Customers
- Recommendation Percentage

## Image Requirements

- **Format**: JPG, PNG, or WebP
- **Recommended size**: 800x600px or similar aspect ratio
- **File size**: Keep under 500KB for best performance
- **Naming**: Use descriptive names like `feedback1.jpg`, `customer-review-1.jpg`, etc.

## Notes

- If an image doesn't exist, it will automatically be hidden (no error shown)
- You can add as many feedback items as you want
- The page is fully responsive and will look great on all devices
- Verified badge shows for verified purchases (set `verified: true`)

## Tips

- Use high-quality images that showcase your products
- Keep feedback text concise but meaningful
- Update dates to reflect when reviews were received
- Regularly update with new feedback to keep the page fresh


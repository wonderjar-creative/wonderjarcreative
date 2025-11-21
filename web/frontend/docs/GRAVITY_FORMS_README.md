# Gravity Forms Integration

This implementation integrates Gravity Forms with your Next.js frontend using the Gravity Forms REST API.

## Setup

### 1. WordPress Setup

1. Install and activate Gravity Forms plugin
2. Go to WordPress Admin > Forms > Settings > REST API
3. Click "Add Key" to generate API credentials
4. Copy the Consumer Key and Consumer Secret

### 2. Environment Variables

Add the following to your `.env.local` file:

```bash
GRAVITY_FORMS_CONSUMER_KEY=ck_your_consumer_key_here
GRAVITY_FORMS_CONSUMER_SECRET=cs_your_consumer_secret_here
NEXT_PUBLIC_WORDPRESS_API_URL=http://your-wordpress-site.com
```

### 3. How It Works

The integration consists of:

- **Form Component** (`/components/Blocks/GravityForms/Form/Form.tsx`): Client-side React component that renders the form
- **API Routes**: 
  - `/api/gravity-forms/[id]/route.ts`: Fetches form structure from WordPress
  - `/api/gravity-forms/[id]/submit/route.ts`: Submits form data to WordPress

### 4. Features

- ✅ Fetches form structure dynamically from Gravity Forms
- ✅ Renders all common field types (text, email, textarea, select, radio, checkbox, etc.)
- ✅ Respects Gravity Forms styling attributes (colors, sizes, borders)
- ✅ Client-side validation
- ✅ AJAX form submission
- ✅ Success/error message handling
- ✅ Required field indicators

### 5. Block Attributes

The Gravity Forms block supports these attributes:

```typescript
{
  formId: string;                          // ID of the Gravity Form
  title: boolean;                          // Show form title
  description: boolean;                    // Show form description
  ajax: boolean;                           // Enable AJAX submission
  inputSize: 'sm' | 'md' | 'lg';          // Input field size
  inputBorderRadius: number;               // Border radius in pixels
  inputBorderColor: string;                // Border color
  inputBackgroundColor: string;            // Background color
  inputColor: string;                      // Text color
  inputPrimaryColor: string;               // Primary accent color
  labelFontSize: number;                   // Label font size
  labelColor: string;                      // Label color
  descriptionFontSize: number;             // Description font size
  descriptionColor: string;                // Description color
  buttonPrimaryBackgroundColor: string;    // Submit button background
  buttonPrimaryColor: string;              // Submit button text color
}
```

### 6. Usage in WordPress

Simply add a Gravity Forms block in the WordPress block editor and select your form. The form will automatically render on your Next.js frontend.

### 7. Supported Field Types

- Text
- Email
- Phone
- Number
- Textarea
- Select (dropdown)
- Radio buttons
- Checkboxes

### 8. API Endpoints

**GET /api/gravity-forms/[id]**
- Fetches form structure
- Cached for 1 hour (ISR)
- Returns form fields, title, description

**POST /api/gravity-forms/[id]/submit**
- Submits form data
- Returns validation errors or success message
- Handles server-side validation

### 9. Security

- API credentials are stored server-side only
- Never exposed to the client
- Uses WordPress's built-in authentication
- Form validation happens on both client and server

### 10. Customization

You can customize the form styling by:

1. Modifying the block attributes in WordPress
2. Editing the component's inline styles
3. Adding custom CSS classes
4. Using Tailwind utility classes

## Troubleshooting

### Forms not loading
- Check that Gravity Forms REST API is enabled
- Verify API credentials in `.env.local`
- Check browser console for errors

### Submissions failing
- Verify form ID is correct
- Check WordPress admin for spam/validation settings
- Review server logs for authentication errors

### Styling issues
- Ensure all color values are valid hex codes
- Check that font sizes are numbers (not strings)
- Verify Tailwind classes are properly applied

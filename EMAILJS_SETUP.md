# EmailJS Setup Guide for TraveloOps

## Overview

Professional HTML email templates have been implemented for booking confirmations. Follow these steps to set them up in EmailJS.

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up for a free account
3. Complete email verification

## Step 2: Create Email Service

1. Go to **Email Services** in the dashboard
2. Click **Add New Service**
3. Choose your email provider (Gmail recommended)
4. Connect your email account (use `arhamjainarj@gmail.com`)
5. Copy the **Service ID** (e.g., `service_xyz123`)

## Step 3: Create Email Templates

### Template 1: Admin Booking Notification

1. Go to **Email Templates**
2. Click **Create New Template**
3. Template Name: `Booking Notification`
4. Template ID: `template_booking`
5. **Subject**: `{{subject}}`
6. **Content**: Use HTML mode and paste:

```html
{{{html_content}}}
```

7. In the **To Email** field: `{{to_email}}`
8. **From Name**: `TraveloOps Bookings`
9. **Reply To**: `{{from_email}}`
10. Click **Save**

### Template 2: User Booking Confirmation

1. Click **Create New Template** again
2. Template Name: `User Booking Confirmation`
3. Template ID: `template_booking_confirm`
4. **Subject**: `{{subject}}`
5. **Content**: Use HTML mode and paste:

```html
{{{html_content}}}
```

6. In the **To Email** field: `{{user_email}}`
7. **From Name**: `TraveloOps Team`
8. **Reply To**: `arhamjainarj@gmail.com`
9. Click **Save**

### Template 3: Contact Form (Optional - already working)

Keep your existing `template_contact` or create:

1. Template ID: `template_contact`
2. Subject: `New Contact: {{from_name}}`
3. Content:

```html
<h2>New Contact Form Submission</h2>
<p><strong>Name:</strong> {{from_name}}</p>
<p><strong>Email:</strong> {{from_email}}</p>
<p><strong>Phone:</strong> {{phone}}</p>
<p><strong>Company:</strong> {{company}}</p>
<p><strong>Message:</strong></p>
<p>{{message}}</p>
```

## Step 4: Update Environment Variables

Add these to your `.env.local` file:

```env
# EmailJS Configuration
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_your_service_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=template_contact
NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID=template_booking
NEXT_PUBLIC_EMAILJS_BOOKING_CONFIRM_TEMPLATE_ID=template_booking_confirm
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

**How to find these:**

- **Service ID**: Found in Email Services section
- **Template IDs**: Found in each template's settings
- **Public Key**: Go to Account > General > API Keys

## Step 5: Test the Integration

1. Start your development server:

```bash
npm run dev
```

2. Open the website at `http://localhost:3000`
3. Click "Book a Call" button
4. Fill out the form with test data
5. Submit the form

**Expected behavior:**

- ✅ Success toast notification appears
- ✅ Modal closes automatically
- ✅ Admin receives HTML email at `arhamjainarj@gmail.com`
- ✅ User receives confirmation email at their provided address
- ✅ Both emails are beautifully formatted with gradients

## Email Template Features

### Admin Email Includes:

- 🎯 Professional gradient header
- 👤 Client information card with all details
- 📅 Preferred date and time prominently displayed
- 💬 Client message (if provided)
- ✉️ Quick action buttons (Reply via Email, Call Client)
- 📧 Footer with branding

### User Confirmation Email Includes:

- ✨ Welcoming thank you message
- ✅ Booking confirmation badge
- 📅 Booking details summary
- 🔢 "What Happens Next" 3-step process
- 📞 Contact support button
- 🌐 Social media links in footer

## Troubleshooting

### Emails not sending?

1. Check browser console for errors
2. Verify all environment variables are set correctly
3. Ensure EmailJS service is connected to your email
4. Check EmailJS dashboard for failed sends
5. Verify template IDs match exactly (case-sensitive)

### HTML not rendering?

1. Make sure you use `{{{html_content}}}` (triple braces) not `{{html_content}}`
2. Triple braces preserve HTML, double braces escape it

### Template variables not showing?

1. Verify variable names match exactly in template
2. Check that data is being passed from the form
3. Look at EmailJS dashboard > History to see actual values sent

## Testing Checklist

- [ ] Admin receives booking notification email
- [ ] User receives confirmation email
- [ ] Email HTML renders correctly (gradients, buttons, layout)
- [ ] All booking details appear in emails
- [ ] Links work (mailto, tel)
- [ ] Mobile email rendering looks good
- [ ] Spam folder check

## Admin Email Address

The admin email is set to: `arhamjainarj@gmail.com`

To change it, update the `ADMIN_EMAIL` constant in:
`/src/lib/email.ts` (line 15)

## Email Preview

The emails are designed with:

- Modern gradient headers (purple/violet)
- Glass-morphism inspired cards
- Professional typography
- Mobile-responsive layout
- Clear call-to-action buttons
- Brand-consistent colors

## Need Help?

- EmailJS Docs: https://www.emailjs.com/docs/
- Test emails in EmailJS dashboard before deploying
- Use EmailJS "Test Email" feature in template editor

---

**Note**: The free EmailJS plan includes 200 emails/month. For production with high volume, consider upgrading to a paid plan or using a transactional email service like SendGrid or AWS SES.

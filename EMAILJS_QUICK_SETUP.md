# 🚀 Quick EmailJS Setup Guide

## ❌ Current Error

You're seeing `Error sending booking email: {}` because EmailJS is not configured yet.

## ✅ Quick Fix (5 minutes)

### Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Sign up with your Google account (`arhamjainarj@gmail.com`)
3. Verify your email

### Step 2: Add Email Service

1. Click **"Add New Service"** in the dashboard
2. Choose **Gmail**
3. Click **"Connect Account"** and sign in with `arhamjainarj@gmail.com`
4. **Copy the Service ID** (looks like `service_abc123`)

### Step 3: Create Email Templates

#### Template 1: Admin Booking Notification

1. Go to **Email Templates** → **Create New Template**
2. **Template Name**: `Admin Booking Notification`
3. **Subject**: `{{subject}}`
4. **Content**: Switch to HTML mode and paste:
   ```html
   {{{html_content}}}
   ```
5. **To Email**: `{{to_email}}`
6. **From Name**: `TraveloOps Bookings`
7. **Reply To**: `{{from_email}}`
8. Click **Save**
9. **Copy the Template ID** (shown at the top, looks like `template_xyz789`)

#### Template 2: User Confirmation

1. Click **Create New Template** again
2. **Template Name**: `User Booking Confirmation`
3. **Subject**: `{{subject}}`
4. **Content**: HTML mode:
   ```html
   {{{html_content}}}
   ```
5. **To Email**: `{{user_email}}`
6. **From Name**: `TraveloOps Team`
7. **Reply To**: `arhamjainarj@gmail.com`
8. Click **Save**
9. **Copy the Template ID**

### Step 4: Get Your Public Key

1. Go to **Account** → **General** → **API Keys**
2. **Copy your Public Key** (looks like `AbCdEfGhIjKlMnOp`)

### Step 5: Create .env.local File

Create a file named `.env.local` in your project root with:

```env
# Firebase Configuration (you already have this)
NEXT_PUBLIC_FIREBASE_API_KEY=your_existing_firebase_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_existing_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_existing_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_existing_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_existing_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_existing_app_id

# EmailJS Configuration - REPLACE THESE VALUES
NEXT_PUBLIC_EMAILJS_SERVICE_ID=service_abc123
NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID=template_xyz789
NEXT_PUBLIC_EMAILJS_BOOKING_CONFIRM_TEMPLATE_ID=template_user123
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=AbCdEfGhIjKlMnOp
```

### Step 6: Restart Dev Server

```bash
# Stop your dev server (Ctrl+C)
# Then restart it
npm run dev
```

## 🧪 Test It

1. Open your site: `http://localhost:3000`
2. Click **"Book a Call"**
3. Fill out the form
4. Submit

**Expected Console Output:**

```
✅ EmailJS initialized successfully
📧 Sending booking email to admin...
✅ Booking email sent successfully to admin
📧 Sending confirmation email to user...
✅ User confirmation email sent successfully
```

## 🐛 Troubleshooting

### Still seeing errors? Check the console for:

**❌ "EmailJS Public Key is not configured"**

- Make sure you created `.env.local` file (not `.env.local.example`)
- Make sure you replaced `your_public_key` with your actual key
- Restart dev server after creating .env.local

**❌ "EmailJS Service ID not configured"**

- Replace `service_abc123` with your actual Service ID from EmailJS dashboard
- Restart dev server

**❌ "Template ID is missing"**

- Make sure you created BOTH templates in EmailJS
- Copy the correct Template IDs
- Use triple braces `{{{html_content}}}` in templates, not double `{{html_content}}`

**❌ "Failed to send" or "Invalid template"**

- Check template settings in EmailJS dashboard
- Make sure **To Email** field uses `{{to_email}}` for admin template
- Make sure **To Email** field uses `{{user_email}}` for user template
- Template content must have `{{{html_content}}}` (three braces!)

## 📧 Email Template Settings Checklist

### Admin Template Settings:

- ✅ Subject: `{{subject}}`
- ✅ Content: `{{{html_content}}}` (HTML mode, triple braces)
- ✅ To Email: `{{to_email}}`
- ✅ From Name: `TraveloOps Bookings`
- ✅ Reply To: `{{from_email}}`

### User Template Settings:

- ✅ Subject: `{{subject}}`
- ✅ Content: `{{{html_content}}}` (HTML mode, triple braces)
- ✅ To Email: `{{user_email}}`
- ✅ From Name: `TraveloOps Team`
- ✅ Reply To: `arhamjainarj@gmail.com`

## 💡 Quick Check

Open browser console when submitting the form. You should see:

```
✅ EmailJS initialized successfully
📧 Sending booking email to admin...
Configuration check: {
  serviceId: "service_abc123",
  templateId: "template_xyz789",
  publicKeySet: true
}
✅ Booking email sent successfully to admin
```

If you see ❌ errors, they will tell you exactly what's missing!

## 🎯 Free Plan Limits

EmailJS free plan includes:

- ✅ 200 emails per month
- ✅ Perfect for testing and small projects
- ✅ Can upgrade later if needed

---

**Need Help?**
Check the detailed setup guide: `EMAILJS_SETUP.md`

**After Setup:**
Delete this file or the detailed guide - you won't need them anymore! 🎉

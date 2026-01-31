# Firebase Setup Instructions

This application uses Firebase for analytics and data tracking. Follow these steps to set up Firebase properly.

## 1. Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Create a new project or select an existing one
3. Add a web app to your project

## 2. Get Firebase Configuration

From your Firebase project settings, copy the configuration object and update the `.env.local` file with these values:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

## 3. Set Up Firestore Database

1. In Firebase Console, go to **Firestore Database**
2. Click **Create database**
3. Choose **Start in production mode** (we'll set up rules next)
4. Select a region close to your users

## 4. Configure Firestore Security Rules

Go to the **Rules** tab in Firestore and replace the default rules with:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Allow all reads and writes to activities collection
    match /activities/{document=**} {
      allow read, write: if true;
    }

    // Allow all reads and writes to leads collection
    match /leads/{document=**} {
      allow read, write: if true;
    }

    // Allow all reads and writes to bookings collection
    match /bookings/{document=**} {
      allow read, write: if true;
    }
  }
}
```

**Note:** These rules allow anyone to read/write. For production, you should implement proper authentication and restrict access:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Only allow writes, no public reads
    match /activities/{document=**} {
      allow write: if true;
      allow read: if false;
    }

    match /leads/{document=**} {
      allow write: if true;
      allow read: if false;
    }

    match /bookings/{document=**} {
      allow write: if true;
      allow read: if false;
    }
  }
}
```

## 5. Enable Firebase Analytics

1. In Firebase Console, go to **Analytics**
2. Click **Enable Google Analytics**
3. Follow the setup wizard
4. Copy your measurement ID to the `.env.local` file

## 6. Set Up EmailJS (Optional)

If you want email functionality to work:

1. Go to [EmailJS](https://www.emailjs.com/)
2. Create a free account
3. Add an email service (Gmail, Outlook, etc.)
4. Create email templates for:
   - Contact form
   - Booking requests
   - Newsletter signups
5. Add these to `.env.local`:

```env
NEXT_PUBLIC_EMAILJS_SERVICE_ID=your_service_id
NEXT_PUBLIC_EMAILJS_CONTACT_TEMPLATE_ID=your_contact_template_id
NEXT_PUBLIC_EMAILJS_BOOKING_TEMPLATE_ID=your_booking_template_id
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=your_public_key
```

## 7. Verify Setup

1. Start your development server: `npm run dev`
2. Open the browser console
3. Submit a form or interact with the site
4. Check Firebase Console > Firestore to see if data is being saved
5. Check Firebase Console > Analytics to see events

## Troubleshooting

### "Missing or insufficient permissions" Error

This means your Firestore security rules are too restrictive. Update them as shown in step 4.

### Firebase Not Initializing

- Check that all environment variables are set correctly
- Ensure `.env.local` file is in the project root
- Restart your dev server after changing environment variables

### Email Not Sending

- Verify EmailJS credentials
- Check browser console for errors
- Ensure email templates are set up in EmailJS dashboard
- Verify your email service is connected in EmailJS

## Development vs Production

The app is designed to work gracefully without Firebase. If Firebase is not configured:

- Forms will still work (client-side only)
- Analytics won't be tracked
- No errors will break the UI
- Console will show warnings in development mode

For production, ensure Firebase is properly configured for tracking and analytics.

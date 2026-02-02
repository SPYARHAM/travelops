# TravelOps Firebase Data Structure & Dashboard Use Cases

## 1. Gmail SMTP Email Sending Limits

- **Gmail SMTP (App Password)**:
  - Free Gmail: ~500 emails/day (sending limit)
  - Google Workspace: ~2,000 emails/day
  - If you exceed limits, emails will be blocked for 24 hours
  - For bulk/marketing, use a dedicated service (SendGrid, Mailgun, etc.)

## 2. When is Firebase Triggered?

- **Firebase is used for:**
  - Storing user data (bookings, contacts, newsletter signups)
  - Analytics (page views, events)
  - File uploads (if enabled)
- **API routes trigger Firebase functions:**
  - `/api/booking` → Store booking data in Firestore
  - `/api/contact` → Store contact form data in Firestore
  - `/api/newsletter` → Store newsletter signup in Firestore
- **Notebooks** (if you mean Jupyter/Colab):
  - Not directly related to Firebase unless you run code that connects to Firebase

## 3. Firebase Data Structure Example

### Firestore Collections

- **bookings**
  - `id` (auto)
  - `name`
  - `email`
  - `phone`
  - `company`
  - `preferredDate`
  - `preferredTime`
  - `message`
  - `createdAt`
- **contacts**
  - `id` (auto)
  - `name`
  - `email`
  - `message`
  - `company`
  - `phone`
  - `createdAt`
- **newsletter_signups**
  - `id` (auto)
  - `email`
  - `createdAt`

### Example Firestore Document

```json
// bookings/{id}
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "1234567890",
  "company": "Acme Inc",
  "preferredDate": "2026-02-10",
  "preferredTime": "10:00 AM",
  "message": "Looking forward to the call!",
  "createdAt": "2026-02-03T12:34:56Z"
}
```

## 4. Dashboard Use Cases

- **Bookings Table**: See all consultation requests, filter by date/company
- **Contacts Table**: View all contact form submissions
- **Newsletter Table**: List of all newsletter subscribers
- **Analytics**: Show total bookings, contacts, signups over time
- **Export**: Download data as CSV for marketing/follow-up
- **User Profiles**: (if you add authentication)
- **File Uploads**: (if enabled, e.g. for travel docs)

## 5. How Data is Used

- **Admin Dashboard**: Review, manage, and respond to leads
- **Automated Emails**: Triggered on new booking/contact/newsletter
- **Business Insights**: Track growth, conversion rates
- **Marketing**: Use newsletter list for campaigns
- **Support**: Use contact form data for follow-up

---

**Tip:**

- Always secure your Firestore rules to prevent unauthorized access
- Use server-side API routes to write to Firestore, not client-side
- For advanced analytics, connect Firestore to BigQuery or other BI tools

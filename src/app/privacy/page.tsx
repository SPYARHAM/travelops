import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, Shield } from "lucide-react";

export const metadata: Metadata = {
  title: "Privacy Policy - TraveloOps",
  description: "Privacy policy for TraveloOps custom travel operator system.",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 via-white to-slate-50">
      {/* Header Spacer */}
      <div className="h-16" />

      <div className="max-w-4xl mx-auto px-4 md:px-6 py-12 md:py-16">
        {/* Back Button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-gray-600 hover:text-violet-600 transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Home
        </Link>

        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full glass-card text-sm font-medium text-violet-700 mb-4">
            <Shield className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Privacy Policy
          </h1>
          <p className="text-sm text-gray-500">
            Last updated: February 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-600 mb-4">
              We collect information you provide directly to us when you:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>Create an account or use our services</li>
              <li>Request a consultation or book a call</li>
              <li>Subscribe to our newsletter</li>
              <li>Contact us for support</li>
              <li>Participate in surveys or promotions</li>
            </ul>
            <p className="text-gray-600">
              This information may include your name, email address, phone
              number, company name, and any other information you choose to
              provide.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-600 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide, maintain, and improve our services</li>
              <li>Process your requests and transactions</li>
              <li>Send you technical notices and support messages</li>
              <li>Respond to your comments and questions</li>
              <li>Send you marketing communications (with your consent)</li>
              <li>Monitor and analyze trends and usage</li>
              <li>Detect and prevent fraud and abuse</li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-gray-600 mb-4">
              We do not sell your personal information. We may share your
              information in the following situations:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                <strong>Service Providers:</strong> With vendors and service
                providers who perform services on our behalf
              </li>
              <li>
                <strong>Legal Requirements:</strong> When required by law or to
                protect our rights
              </li>
              <li>
                <strong>Business Transfers:</strong> In connection with a
                merger, acquisition, or sale of assets
              </li>
              <li>
                <strong>With Your Consent:</strong> When you direct us to share
                information
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-600">
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no security system is
              impenetrable, and we cannot guarantee the security of our systems
              100%. We use industry-standard encryption for data transmission
              and storage.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              5. Your Rights
            </h2>
            <p className="text-gray-600 mb-4">
              Depending on your location, you may have certain rights regarding
              your personal information:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Access and receive a copy of your personal information</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your personal information</li>
              <li>Object to or restrict processing of your information</li>
              <li>Withdraw consent where processing is based on consent</li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              6. Cookies and Tracking
            </h2>
            <p className="text-gray-600">
              We use cookies and similar tracking technologies to collect
              information about your browsing activities. You can control
              cookies through your browser settings. Note that disabling cookies
              may affect the functionality of our services.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              7. Data Retention
            </h2>
            <p className="text-gray-600">
              We retain your personal information for as long as necessary to
              provide our services, comply with legal obligations, resolve
              disputes, and enforce our agreements. When we no longer need your
              information, we will securely delete or anonymize it.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              8. Children's Privacy
            </h2>
            <p className="text-gray-600">
              Our services are not directed to children under 13 years of age.
              We do not knowingly collect personal information from children
              under 13. If you believe we have collected information from a
              child under 13, please contact us immediately.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              9. International Data Transfers
            </h2>
            <p className="text-gray-600">
              Your information may be transferred to and processed in countries
              other than your own. We ensure appropriate safeguards are in place
              to protect your information in accordance with this Privacy Policy
              and applicable laws.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              10. Changes to This Policy
            </h2>
            <p className="text-gray-600">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new policy on this page
              and updating the "Last updated" date. We encourage you to review
              this policy periodically.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:privacy@traveloops.com"
                  className="text-violet-600 hover:text-violet-700"
                >
                  jainarham@gmail.com
                </a>
              </li>
              <li>
                <strong>Phone Number:</strong> 774001952
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

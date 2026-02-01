import { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Terms of Service - TraveloOps",
  description: "Terms of service for TraveloOps custom travel operator system.",
};

export default function TermsPage() {
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
            <FileText className="w-4 h-4" />
            Legal
          </div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Terms of Service
          </h1>
          <p className="text-sm text-gray-500">
            Last updated: February 1, 2026
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-gray max-w-none">
          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-600">
              By accessing or using TraveloOps services, you agree to be bound
              by these Terms of Service and all applicable laws and regulations.
              If you do not agree with any of these terms, you are prohibited
              from using or accessing our services. We reserve the right to
              modify these terms at any time without prior notice.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              2. Description of Service
            </h2>
            <p className="text-gray-600 mb-4">
              TraveloOps provides custom travel operator system development
              services, including but not limited to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Custom dashboard and workflow design</li>
              <li>AI-powered travel assistant development</li>
              <li>Integration with existing systems</li>
              <li>Consultation and strategy services</li>
              <li>Ongoing support and maintenance</li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              3. User Obligations
            </h2>
            <p className="text-gray-600 mb-4">
              When using our services, you agree to:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Provide accurate and complete information</li>
              <li>Maintain the security of your account credentials</li>
              <li>Use the services only for lawful purposes</li>
              <li>Not interfere with or disrupt the services or servers</li>
              <li>Not attempt to gain unauthorized access to any systems</li>
              <li>Comply with all applicable local, state, and federal laws</li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              4. Payment Terms
            </h2>
            <p className="text-gray-600 mb-4">
              For custom development services:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2 mb-4">
              <li>
                All fees and payment schedules will be outlined in a separate
                service agreement
              </li>
              <li>Payment is due according to the agreed-upon schedule</li>
              <li>Late payments may incur additional fees</li>
              <li>
                Refunds are subject to the terms outlined in your service
                agreement
              </li>
              <li>All fees are quoted in USD unless otherwise specified</li>
            </ul>
            <p className="text-gray-600">
              We reserve the right to suspend or terminate services for
              non-payment.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              5. Intellectual Property Rights
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>Our Property:</strong> All content, features, and
              functionality of our services, including but not limited to text,
              graphics, logos, and software, are owned by TraveloOps and
              protected by copyright, trademark, and other intellectual property
              laws.
            </p>
            <p className="text-gray-600 mb-4">
              <strong>Your Content:</strong> You retain all rights to any
              content you provide. By using our services, you grant us a license
              to use, modify, and display your content solely for the purpose of
              providing our services.
            </p>
            <p className="text-gray-600">
              <strong>Custom Development:</strong> Ownership of custom-developed
              systems will be outlined in your specific service agreement.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              6. Confidentiality
            </h2>
            <p className="text-gray-600">
              Both parties agree to maintain the confidentiality of any
              proprietary or confidential information disclosed during the
              course of our business relationship. This obligation continues
              even after the termination of services. We will not disclose your
              business information, data, or strategies to third parties without
              your explicit consent.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              7. Service Level and Availability
            </h2>
            <p className="text-gray-600 mb-4">
              While we strive to provide uninterrupted service:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>Services may be temporarily unavailable for maintenance</li>
              <li>We do not guarantee 100% uptime or error-free operation</li>
              <li>Support response times will be outlined in your agreement</li>
              <li>
                We reserve the right to modify or discontinue features with
                notice
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              8. Limitation of Liability
            </h2>
            <p className="text-gray-600 mb-4">
              To the maximum extent permitted by law:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>
                TraveloOps shall not be liable for any indirect, incidental, or
                consequential damages
              </li>
              <li>
                Our total liability shall not exceed the amount paid by you in
                the 12 months preceding the claim
              </li>
              <li>
                We are not responsible for losses due to factors beyond our
                control
              </li>
              <li>
                Some jurisdictions do not allow limitation of liability, so
                these limitations may not apply to you
              </li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              9. Warranties and Disclaimers
            </h2>
            <p className="text-gray-600 mb-4">
              <strong>Limited Warranty:</strong> We warrant that our services
              will be performed in a professional and workmanlike manner.
            </p>
            <p className="text-gray-600">
              <strong>Disclaimer:</strong> Except as expressly stated, our
              services are provided "as is" without warranties of any kind,
              either express or implied, including but not limited to warranties
              of merchantability, fitness for a particular purpose, or
              non-infringement.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              10. Termination
            </h2>
            <p className="text-gray-600 mb-4">
              Either party may terminate services under the following
              conditions:
            </p>
            <ul className="list-disc list-inside text-gray-600 space-y-2">
              <li>With written notice as specified in the service agreement</li>
              <li>Immediately for material breach of these terms</li>
              <li>Immediately for non-payment</li>
              <li>At our discretion for violation of terms</li>
            </ul>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              11. Indemnification
            </h2>
            <p className="text-gray-600">
              You agree to indemnify and hold TraveloOps harmless from any
              claims, losses, damages, liabilities, and expenses (including
              legal fees) arising from your use of our services, violation of
              these terms, or violation of any rights of another party.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              12. Governing Law and Disputes
            </h2>
            <p className="text-gray-600 mb-4">
              These terms shall be governed by and construed in accordance with
              the laws of the State of California, without regard to its
              conflict of law provisions.
            </p>
            <p className="text-gray-600">
              Any disputes arising from these terms or our services shall be
              resolved through binding arbitration in San Francisco, California,
              except that either party may seek injunctive relief in court.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              13. Changes to Terms
            </h2>
            <p className="text-gray-600">
              We reserve the right to modify these Terms of Service at any time.
              We will notify users of any material changes via email or through
              our services. Your continued use of our services after such
              changes constitutes acceptance of the new terms.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 mb-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">
              14. Severability
            </h2>
            <p className="text-gray-600">
              If any provision of these terms is found to be unenforceable or
              invalid, that provision will be limited or eliminated to the
              minimum extent necessary, and the remaining provisions will remain
              in full force and effect.
            </p>
          </div>

          <div className="glass-card rounded-2xl p-6 md:p-8 bg-gradient-to-r from-violet-50 to-indigo-50 border-violet-200">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Contact Us</h2>
            <p className="text-gray-600 mb-4">
              If you have any questions about these Terms of Service, please
              contact us:
            </p>
            <ul className="text-gray-600 space-y-2">
              <li>
                <strong>Email:</strong>{" "}
                <a
                  href="mailto:legal@traveloops.com"
                  className="text-violet-600 hover:text-violet-700"
                >
                  legal@traveloops.com
                </a>
              </li>
              <li>
                <strong>Address:</strong> San Francisco, CA
              </li>
            </ul>
          </div>
        </div>
      </div>
    </main>
  );
}

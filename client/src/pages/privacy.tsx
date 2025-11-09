import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Briefcase } from "lucide-react";

export default function Privacy() {
  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card border-border">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-resume-display font-semibold text-foreground">
                NewHire
              </h1>
            </Link>
            <Link href="/">
              <Button variant="outline" size="sm" data-testid="button-home">
                <Home className="h-4 w-4 mr-2" />
                Home
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <h1 className="text-4xl font-bold mb-4 text-foreground" data-testid="text-privacy-title">
          Privacy Policy
        </h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: October 1, 2025
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground leading-relaxed">
              Welcome to NewHire. We respect your privacy and are committed to protecting your personal data. 
              This privacy policy will inform you about how we handle your data when you visit our website and 
              use our resume builder service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">2. Data We Collect</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              When you use NewHire, we may collect the following types of information:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Personal information you provide (name, email, phone number, work history, education)</li>
              <li>Resume content and formatting preferences</li>
              <li>Usage data and analytics (how you interact with our service)</li>
              <li>Technical data (browser type, IP address, device information)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">3. How We Use Your Data</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              We use your data for the following purposes:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>To provide and maintain our resume building service</li>
              <li>To generate and export your resume as PDF</li>
              <li>To improve our service and user experience</li>
              <li>To analyze usage patterns and optimize our platform</li>
              <li>To communicate with you about updates or issues</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">4. Data Storage</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your resume data is primarily stored locally in your browser using local storage. This means:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Your data remains on your device and is not automatically sent to our servers</li>
              <li>You maintain full control over your resume information</li>
              <li>Clearing your browser data will remove your stored resume</li>
              <li>We recommend downloading your resume as backup</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Data Sharing</h2>
            <p className="text-muted-foreground leading-relaxed">
              We do not sell, trade, or rent your personal information to third parties. We may share your data only in the following circumstances:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>With your explicit consent</li>
              <li>To comply with legal obligations</li>
              <li>To protect our rights and prevent fraud</li>
              <li>With service providers who assist in operating our platform (under strict confidentiality agreements)</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Your Rights</h2>
            <p className="text-muted-foreground leading-relaxed mb-3">
              You have the following rights regarding your data:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground">
              <li>Right to access your personal data</li>
              <li>Right to correct inaccurate data</li>
              <li>Right to delete your data</li>
              <li>Right to restrict processing</li>
              <li>Right to data portability</li>
              <li>Right to withdraw consent</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Cookies and Tracking</h2>
            <p className="text-muted-foreground leading-relaxed">
              We use cookies and similar tracking technologies to improve your experience on our website. 
              You can control cookie preferences through your browser settings. Note that disabling cookies 
              may affect some functionality of our service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Security</h2>
            <p className="text-muted-foreground leading-relaxed">
              We implement appropriate technical and organizational measures to protect your data against 
              unauthorized access, alteration, disclosure, or destruction. However, no internet transmission 
              is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Children's Privacy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our service is not directed to individuals under the age of 16. We do not knowingly collect 
              personal information from children. If you are a parent or guardian and believe your child has 
              provided us with personal data, please contact us.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">10. Changes to This Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this privacy policy from time to time. We will notify you of any changes by 
              posting the new policy on this page and updating the "Last Updated" date. We encourage you 
              to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">11. Contact Us</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this privacy policy or our data practices, please contact us at:
            </p>
            <div className="mt-3 p-4 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">Email: aritik70@gmail.com</p>
              <p className="text-muted-foreground">Name: Ritik Arora</p>
            </div>
          </section>
        </div>
      </main>

      <footer className="border-t mt-12 py-6">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground">
            <Link href="/faq" className="hover:text-foreground transition-colors" data-testid="link-footer-faq">
              FAQ
            </Link>
            <Link href="/privacy" className="hover:text-foreground transition-colors" data-testid="link-footer-privacy">
              Privacy Policy
            </Link>
            <Link href="/disclaimer" className="hover:text-foreground transition-colors" data-testid="link-footer-disclaimer">
              Disclaimer
            </Link>
            <Link href="/contact" className="hover:text-foreground transition-colors" data-testid="link-footer-contact">
              Contact Us
            </Link>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-4">
            © 2025 NewHire. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

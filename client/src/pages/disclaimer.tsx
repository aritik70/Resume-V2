import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Briefcase } from "lucide-react";

export default function Disclaimer() {
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
        <h1 className="text-4xl font-bold mb-4 text-foreground" data-testid="text-disclaimer-title">
          Disclaimer
        </h1>
        <p className="text-muted-foreground mb-8">
          Last Updated: October 1, 2025
        </p>

        <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">1. General Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              The information provided by NewHire ("we," "us," or "our") on our website and through our resume 
              builder service is for general informational purposes only. All information is provided in good faith, 
              however we make no representation or warranty of any kind, express or implied, regarding the accuracy, 
              adequacy, validity, reliability, availability, or completeness of any information.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">2. No Professional Advice</h2>
            <p className="text-muted-foreground leading-relaxed">
              The content on our platform is not intended to be a substitute for professional career advice, 
              resume writing services, or recruitment consultation. You should always seek the advice of qualified 
              professionals with any questions you may have regarding your career path, job applications, or resume content.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">3. No Guarantee of Results</h2>
            <p className="text-muted-foreground leading-relaxed">
              While our resume builder is designed to help create professional, ATS-optimized resumes, we make no 
              guarantees or promises regarding:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Job interview invitations or job offers</li>
              <li>Resume acceptance by any specific ATS system</li>
              <li>Success rate in job applications</li>
              <li>Compatibility with all recruitment systems</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              Employment outcomes depend on many factors beyond resume quality, and individual results will vary.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">4. User Responsibility</h2>
            <p className="text-muted-foreground leading-relaxed">
              Users are solely responsible for:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>The accuracy and truthfulness of information entered into their resume</li>
              <li>Verifying that resume content meets the requirements of their target positions</li>
              <li>Ensuring compliance with any applicable laws or regulations</li>
              <li>Reviewing and proofreading their resume before use</li>
              <li>Backing up their resume data</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">5. Third-Party Links</h2>
            <p className="text-muted-foreground leading-relaxed">
              Our website may contain links to third-party websites or services that are not owned or controlled 
              by NewHire. We have no control over, and assume no responsibility for, the content, privacy policies, 
              or practices of any third-party websites or services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">6. Service Availability</h2>
            <p className="text-muted-foreground leading-relaxed">
              We strive to keep our service available and functional at all times. However, we do not guarantee 
              that our service will be:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Available at all times or without interruption</li>
              <li>Free from errors, bugs, or technical issues</li>
              <li>Compatible with all devices, browsers, or operating systems</li>
              <li>Secure from unauthorized access or cyber attacks</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">7. Data Loss</h2>
            <p className="text-muted-foreground leading-relaxed">
              Resume data is stored locally in your browser. We are not responsible for any data loss that may occur due to:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Browser cache clearing or cookie deletion</li>
              <li>Device failure or malfunction</li>
              <li>Software updates or incompatibilities</li>
              <li>User error or accidental deletion</li>
            </ul>
            <p className="text-muted-foreground leading-relaxed mt-3">
              We strongly recommend regularly downloading and backing up your resume.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">8. Limitation of Liability</h2>
            <p className="text-muted-foreground leading-relaxed">
              To the fullest extent permitted by applicable law, NewHire shall not be liable for any indirect, 
              incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether 
              incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from:
            </p>
            <ul className="list-disc list-inside space-y-2 text-muted-foreground mt-3">
              <li>Your use or inability to use our service</li>
              <li>Any unauthorized access to or use of our servers</li>
              <li>Any bugs, viruses, or other harmful code</li>
              <li>Any errors or omissions in content</li>
              <li>User-generated content or conduct of third parties</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">9. Changes to Service</h2>
            <p className="text-muted-foreground leading-relaxed">
              We reserve the right to modify, suspend, or discontinue any aspect of our service at any time 
              without prior notice. We will not be liable to you or any third party for any modification, 
              suspension, or discontinuance of the service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">10. Accuracy of Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              While we strive to provide accurate and up-to-date information about ATS systems, resume best practices, 
              and career guidance, we cannot guarantee that all information is current, complete, or error-free. 
              Industry standards and best practices evolve over time.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">11. Updates to Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              We may update this disclaimer from time to time. Changes will be posted on this page with an updated 
              revision date. Your continued use of our service after any changes indicates your acceptance of the 
              updated disclaimer.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold mb-3 text-foreground">12. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about this disclaimer, please contact us:
            </p>
            <div className="mt-3 p-4 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground">Email: aritik70@gmail.com</p>
              <p className="text-muted-foreground">Name: Ritik Arora</p>
            </div>
          </section>

          <section className="mt-8 p-6 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900 rounded-lg">
            <h2 className="text-xl font-semibold mb-2 text-amber-900 dark:text-amber-100">Important Notice</h2>
            <p className="text-amber-800 dark:text-amber-200">
              By using NewHire, you acknowledge that you have read, understood, and agree to be bound by this 
              disclaimer. If you do not agree with any part of this disclaimer, please do not use our service.
            </p>
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

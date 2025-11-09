import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, Mail, User, Briefcase } from "lucide-react";

export default function Contact() {
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
        <h1 className="text-4xl font-bold mb-4 text-foreground" data-testid="text-contact-title">
          Contact Us
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Have questions or feedback? We'd love to hear from you!
        </p>

        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Get in Touch</h2>
            
            <div className="space-y-6">
              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg" data-testid="contact-info-owner">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <User className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Owner</h3>
                  <p className="text-muted-foreground">Ritik Arora</p>
                </div>
              </div>

              <div className="flex items-start gap-4 p-4 bg-card border border-border rounded-lg" data-testid="contact-info-email">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Mail className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-1">Email</h3>
                  <a 
                    href="mailto:aritik70@gmail.com" 
                    className="text-primary hover:underline"
                    data-testid="link-email"
                  >
                    aritik70@gmail.com
                  </a>
                </div>
              </div>
            </div>

            <div className="mt-8 p-6 bg-primary/5 border border-primary/20 rounded-lg">
              <h3 className="font-semibold text-foreground mb-2">Response Time</h3>
              <p className="text-muted-foreground text-sm">
                We typically respond to all inquiries within 24-48 hours during business days. 
                Thank you for your patience!
              </p>
            </div>
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-6 text-foreground">Common Inquiries</h2>
            
            <div className="space-y-4">
              <div className="p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Technical Support</h3>
                <p className="text-sm text-muted-foreground">
                  Experiencing issues with the resume builder? Email us with details about 
                  your problem, including your browser and device information.
                </p>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Feature Requests</h3>
                <p className="text-sm text-muted-foreground">
                  Have an idea for a new feature or template? We'd love to hear your suggestions 
                  to help improve NewHire.
                </p>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">General Questions</h3>
                <p className="text-sm text-muted-foreground">
                  For questions about how to use the platform or our privacy practices, 
                  please check our FAQ page or reach out directly.
                </p>
              </div>

              <div className="p-4 bg-card border border-border rounded-lg">
                <h3 className="font-semibold text-foreground mb-2">Business Inquiries</h3>
                <p className="text-sm text-muted-foreground">
                  Interested in partnerships or collaboration? Contact us to discuss opportunities.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 text-center">
          <h2 className="text-xl font-semibold mb-4 text-foreground">Before You Contact Us</h2>
          <p className="text-muted-foreground mb-6">
            You might find answers to your questions in our FAQ section
          </p>
          <Link href="/faq">
            <Button variant="outline" data-testid="button-visit-faq">
              Visit FAQ
            </Button>
          </Link>
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

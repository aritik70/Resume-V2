import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Home, ChevronDown, Briefcase } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQ() {
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
        <h1 className="text-4xl font-bold mb-4 text-foreground" data-testid="text-faq-title">
          Frequently Asked Questions
        </h1>
        <p className="text-muted-foreground mb-8 text-lg">
          Find answers to common questions about our resume builder
        </p>

        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" data-testid="faq-item-1">
            <AccordionTrigger className="text-lg font-semibold">
              What is NewHire?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              NewHire is an AI-powered resume builder that helps you create ATS-optimized resumes in under 15 minutes. 
              Our platform offers multiple professional templates, real-time preview, and PDF export functionality.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" data-testid="faq-item-2">
            <AccordionTrigger className="text-lg font-semibold">
              Is NewHire free to use?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! NewHire is completely free to use. You can create unlimited resumes, use all our templates, 
              and download your resumes as PDFs without any cost.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" data-testid="faq-item-3">
            <AccordionTrigger className="text-lg font-semibold">
              What is an ATS-optimized resume?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              An ATS (Applicant Tracking System) optimized resume is designed to be easily read by automated systems 
              that companies use to filter job applications. Our templates are specifically designed to pass through 
              ATS systems while maintaining a professional appearance.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" data-testid="faq-item-4">
            <AccordionTrigger className="text-lg font-semibold">
              How many templates are available?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              We offer multiple professional templates across different categories including Traditional, Modern, 
              Creative, Executive, and ATS-optimized designs. Each template can be customized with different 
              color schemes and fonts.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" data-testid="faq-item-5">
            <AccordionTrigger className="text-lg font-semibold">
              Can I save my resume and come back later?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Currently, your resume data is stored in your browser's local storage. This means you can continue 
              working on it as long as you use the same browser and don't clear your browser data.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" data-testid="faq-item-6">
            <AccordionTrigger className="text-lg font-semibold">
              How do I download my resume?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Simply click the "Download PDF" button in the header while building your resume. Your resume will be 
              instantly downloaded as a professional PDF file that you can use for job applications.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-7" data-testid="faq-item-7">
            <AccordionTrigger className="text-lg font-semibold">
              Can I add custom sections to my resume?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! Our resume builder allows you to add custom sections beyond the standard ones. You can include 
              sections like certifications, projects, languages, volunteer work, or any other information relevant 
              to your career.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-8" data-testid="faq-item-8">
            <AccordionTrigger className="text-lg font-semibold">
              What is the ATS score feature?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              The ATS score analyzes your resume and provides insights on how well it would perform with automated 
              tracking systems. It checks for keyword density, formatting issues, and other factors that affect 
              your resume's chances of getting through initial screening.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-9" data-testid="faq-item-9">
            <AccordionTrigger className="text-lg font-semibold">
              Is my data secure?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Your privacy is important to us. All resume data is stored locally in your browser and is never sent 
              to our servers unless you explicitly choose to save it. We do not collect or share your personal 
              information. For more details, please see our Privacy Policy.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-10" data-testid="faq-item-10">
            <AccordionTrigger className="text-lg font-semibold">
              Can I use NewHire on mobile devices?
            </AccordionTrigger>
            <AccordionContent className="text-muted-foreground">
              Yes! NewHire is fully responsive and works on all devices including smartphones and tablets. 
              However, for the best experience, we recommend using a desktop or laptop computer for building 
              and editing your resume.
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="mt-12 p-6 bg-card border border-border rounded-lg">
          <h2 className="text-xl font-semibold mb-2">Still have questions?</h2>
          <p className="text-muted-foreground mb-4">
            Can't find the answer you're looking for? Please get in touch with our team.
          </p>
          <Link href="/contact">
            <Button data-testid="button-contact-us">Contact Us</Button>
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

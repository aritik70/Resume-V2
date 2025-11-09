import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { FileText, Zap, Download, Palette, Users, Star, CheckCircle, TrendingUp, Award, Shield, Sparkles, ArrowRight, Play, Briefcase, Laptop, Paintbrush, GraduationCap, Trophy, Rocket, Check } from "lucide-react";
import { Link } from "wouter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-resume-display font-semibold">NewHire</h1>
            </div>
            <div className="flex items-center gap-4">
              <Badge variant="secondary" className="hidden md:flex">
                <Star className="h-3 w-3 mr-1 fill-current" />
                4.9/5 on Reviews
              </Badge>
              <Link href="/builder">
                <Button data-testid="button-start-building" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  Start Building
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-24 md:py-32 bg-gradient-to-br from-background via-primary/5 to-secondary/10 overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-grid-pattern opacity-20"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-r from-primary/20 to-secondary/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <Badge variant="outline" className="mb-6 px-4 py-2 text-sm font-medium">
            <TrendingUp className="h-4 w-4 mr-2" />
            Trusted by 50,000+ professionals
          </Badge>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-resume-display font-black mb-8 text-foreground leading-[0.9]">
            Build Your<br/>
            <span className="bg-gradient-to-r from-primary via-purple-500 to-secondary bg-clip-text text-transparent">
              Dream Career
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
            Create ATS-optimized resumes that get you noticed. Our AI-powered builder 
            helps you land interviews at top companies in <span className="text-primary font-semibold">under 15 minutes</span>.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link href="/builder">
              <Button size="lg" className="gap-3 px-8 py-6 text-lg font-semibold group" data-testid="button-create-resume">
                <FileText className="h-5 w-5" />
                Create My Resume Free
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Button 
              variant="outline" 
              size="lg" 
              className="gap-3 px-8 py-6 text-lg font-semibold group" 
              data-testid="button-view-demo"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                if (featuresSection) {
                  featuresSection.scrollIntoView({ behavior: 'smooth' });
                }
              }}
            >
              <Play className="h-5 w-5" />
              Watch Demo
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center items-center gap-8 text-sm text-muted-foreground">
            <div className="flex items-center gap-2" data-testid="trust-free-to-start">
              <CheckCircle className="h-4 w-4 text-green-500" />
              <span>100% Free to Start</span>
            </div>
            <div className="flex items-center gap-2" data-testid="trust-ats-optimized">
              <Shield className="h-4 w-4 text-blue-500" />
              <span>ATS-Optimized</span>
            </div>
            <div className="flex items-center gap-2" data-testid="trust-hr-approved">
              <Award className="h-4 w-4 text-yellow-500" />
              <span>HR-Approved Templates</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features - Bento Grid Style */}
      <section id="features" className="py-24 bg-muted/30">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Zap className="h-4 w-4 mr-2" />
              Powerful Features
            </Badge>
            <h2 className="text-4xl md:text-5xl font-resume-display font-bold mb-6">
              Everything you need to
              <span className="text-primary block">stand out</span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Built by career experts and trusted by thousands of professionals worldwide
            </p>
          </div>

          {/* Bento Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-4 lg:grid-cols-6 gap-6 max-w-7xl mx-auto">
            {/* AI-Powered Builder - Large */}
            <Card className="md:col-span-2 lg:col-span-3 bg-gradient-to-br from-primary/10 to-secondary/10 border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3 mb-4">
                  <div className="p-3 bg-primary/20 rounded-xl">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <Badge variant="secondary">Most Popular</Badge>
                </div>
                <CardTitle className="text-2xl">AI-Powered Builder</CardTitle>
                <CardDescription className="text-base">
                  Our intelligent system suggests content, optimizes keywords, and ensures ATS compatibility automatically.
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center gap-2 text-sm text-primary font-medium">
                  <CheckCircle className="h-4 w-4" />
                  90% faster than traditional builders
                </div>
              </CardContent>
            </Card>

            {/* Professional Templates */}
            <Card className="md:col-span-2 lg:col-span-2 hover:shadow-lg transition-all duration-300 group">
              <CardHeader>
                <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-xl w-fit mb-4">
                  <Palette className="h-6 w-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl">25+ Templates</CardTitle>
                <CardDescription>
                  Designer-crafted templates for every industry and career level.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* ATS Score */}
            <Card className="md:col-span-2 lg:col-span-1 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="text-3xl font-bold text-green-600 mb-2">98%</div>
                <CardTitle className="text-lg">ATS Score</CardTitle>
                <CardDescription className="text-sm">
                  Average score improvement
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Quick Export */}
            <Card className="md:col-span-2 lg:col-span-2 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-xl w-fit mb-4">
                  <Download className="h-6 w-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl">Instant Export</CardTitle>
                <CardDescription>
                  Download as PDF, Word, or share with a custom link in seconds.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Real-time Preview */}
            <Card className="md:col-span-2 lg:col-span-2 hover:shadow-lg transition-all duration-300">
              <CardHeader>
                <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-xl w-fit mb-4">
                  <Zap className="h-6 w-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl">Real-time Preview</CardTitle>
                <CardDescription>
                  See your changes instantly as you type with live formatting.
                </CardDescription>
              </CardHeader>
            </Card>

            {/* Success Rate */}
            <Card className="md:col-span-2 lg:col-span-2 bg-gradient-to-br from-yellow-50 to-amber-50 dark:from-yellow-900/20 dark:to-amber-900/20 hover:shadow-lg transition-all duration-300">
              <CardHeader className="text-center">
                <div className="p-3 bg-yellow-100 dark:bg-yellow-900/20 rounded-xl w-fit mx-auto mb-4">
                  <TrendingUp className="h-6 w-6 text-yellow-600" />
                </div>
                <CardTitle className="text-xl">3x More Interviews</CardTitle>
                <CardDescription>
                  Users report getting significantly more interview calls
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </section>

      {/* Social Proof & Success Stories */}
      <section className="py-24">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <Badge variant="outline" className="mb-4">
              <Trophy className="h-4 w-4 mr-2" />
              Success Stories
            </Badge>
            <h2 className="text-4xl md:text-5xl font-resume-display font-bold mb-6">
              Join <span className="text-primary">50,000+</span> professionals
              <br />who landed their dream jobs
            </h2>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            <div className="text-center" data-testid="stat-resumes-created">
              <div className="text-4xl md:text-5xl font-bold text-primary mb-2">50K+</div>
              <div className="text-muted-foreground">Resumes Created</div>
            </div>
            <div className="text-center" data-testid="stat-ats-pass-rate">
              <div className="text-4xl md:text-5xl font-bold text-green-600 mb-2">98%</div>
              <div className="text-muted-foreground">ATS Pass Rate</div>
            </div>
            <div className="text-center" data-testid="stat-user-rating">
              <div className="flex items-center justify-center gap-2 mb-2">
                <div className="text-4xl md:text-5xl font-bold text-blue-600">4.9</div>
                <Star className="h-6 w-6 md:h-8 md:w-8 fill-blue-600 text-blue-600" />
              </div>
              <div className="text-muted-foreground">User Rating</div>
            </div>
            <div className="text-center" data-testid="stat-build-time">
              <div className="text-4xl md:text-5xl font-bold text-purple-600 mb-2">15min</div>
              <div className="text-muted-foreground">Average Build Time</div>
            </div>
          </div>

          {/* Template Categories - Carousel Style */}
          <div className="mb-16">
            <h3 className="text-2xl font-bold text-center mb-8">Choose from 25+ Professional Templates</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
              {[
                { name: 'Traditional', desc: 'ATS-friendly classics', Icon: FileText, color: 'from-blue-100 to-blue-200 dark:from-blue-900/20 dark:to-blue-800/20' },
                { name: 'Modern', desc: 'Clean & contemporary', Icon: Sparkles, color: 'from-purple-100 to-purple-200 dark:from-purple-900/20 dark:to-purple-800/20' },
                { name: 'Creative', desc: 'Stand out designs', Icon: Paintbrush, color: 'from-pink-100 to-pink-200 dark:from-pink-900/20 dark:to-pink-800/20' },
                { name: 'Executive', desc: 'Senior-level polish', Icon: Briefcase, color: 'from-gray-100 to-gray-200 dark:from-gray-900/20 dark:to-gray-800/20' },
                { name: 'Tech', desc: 'Developer-focused', Icon: Laptop, color: 'from-green-100 to-green-200 dark:from-green-900/20 dark:to-green-800/20' }
              ].map((category) => (
                <Link key={category.name} href={`/builder?category=${category.name.toLowerCase()}`}>
                  <Card className={`text-center hover:scale-105 transition-all duration-300 cursor-pointer bg-gradient-to-br ${category.color} border-0`} data-testid={`template-category-${category.name.toLowerCase()}`}>
                    <CardContent className="pt-6 pb-6">
                      <category.Icon className="h-8 w-8 mx-auto mb-3 text-gray-700 dark:text-gray-300" />
                      <h3 className="font-semibold mb-1 text-sm">{category.name}</h3>
                      <p className="text-xs text-muted-foreground">{category.desc}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-0 shadow-lg" data-testid="testimonial-sarah">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Got 3 interview calls within a week of using NewHire. The ATS optimization really works!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      SC
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">Sarah Chen</div>
                    <div className="text-xs text-muted-foreground">Software Engineer</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg" data-testid="testimonial-marcus">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "The templates are gorgeous and the AI suggestions saved me hours. Highly recommend!"
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-green-500 to-teal-500 text-white">
                      MR
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">Marcus Rodriguez</div>
                    <div className="text-xs text-muted-foreground">Marketing Manager</div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg" data-testid="testimonial-lisa">
              <CardContent className="pt-6">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-muted-foreground mb-4">
                  "Finally landed my dream job! The executive template was perfect for my senior role."
                </p>
                <div className="flex items-center gap-3">
                  <Avatar>
                    <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                      LT
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="font-semibold text-sm">Lisa Thompson</div>
                    <div className="text-xs text-muted-foreground">Operations Director</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-24 bg-gradient-to-r from-primary via-purple-600 to-secondary text-white relative overflow-hidden">
        {/* Background decoration */}
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-white/10 rounded-full blur-2xl"></div>
        
        <div className="container mx-auto px-6 text-center relative z-10">
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30">
            <Rocket className="h-4 w-4 mr-2" />
            Ready to Launch Your Career?
          </Badge>
          
          <h2 className="text-4xl md:text-6xl font-resume-display font-bold mb-6 leading-tight">
            Start Building Your
            <br />
            <span className="text-yellow-300">Success Story</span>
          </h2>
          
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Join thousands who've transformed their careers with NewHire. 
            Your dream job is just one resume away.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
            <Link href="/builder">
              <Button size="lg" variant="secondary" className="gap-3 px-8 py-6 text-lg font-semibold bg-white text-gray-900 border border-white/30 group" data-testid="button-get-started">
                <FileText className="h-5 w-5" />
                Build My Resume Now
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>

          <div className="flex flex-wrap justify-center items-center gap-6 text-sm text-white/80">
            <div className="flex items-center gap-2" data-testid="text-no-cc">
              <Check className="h-4 w-4" />
              <span>No credit card required</span>
            </div>
            <div className="flex items-center gap-2" data-testid="text-free-forever">
              <Check className="h-4 w-4" />
              <span>Free forever plan</span>
            </div>
            <div className="flex items-center gap-2" data-testid="text-export-immediately">
              <Check className="h-4 w-4" />
              <span>Export immediately</span>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-50 dark:bg-gray-900 border-t py-12">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div className="flex items-center gap-2 mb-6 md:mb-0">
              <div className="h-8 w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <Briefcase className="h-5 w-5 text-white" />
              </div>
              <span className="text-xl font-resume-display font-semibold">NewHire</span>
            </div>
            
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <Star className="h-4 w-4 text-yellow-500 fill-current" />
                <span>4.9/5 rating</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-blue-500" />
                <span>50,000+ users</span>
              </div>
              <div className="flex items-center gap-2">
                <Shield className="h-4 w-4 text-green-500" />
                <span>100% secure</span>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap justify-center gap-6 text-sm text-muted-foreground mb-8">
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
          
          <div className="border-t pt-8 text-center text-muted-foreground">
            <p>&copy; 2025 NewHire. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
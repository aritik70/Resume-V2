import { useState, useEffect } from "react";
import Header from "./Header";
import TemplateSelector, { Template } from "./TemplateSelector";
import ResumeForm, { ResumeData } from "./ResumeForm";
import ResumePreview from "./ResumePreview";
import ATSScore from "./ATSScore";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { CheckCircle, Brain, ArrowRight, Eye } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// Sample resume data for template previews
const sampleResumeData: ResumeData = {
  personalInfo: {
    fullName: "Alex Johnson",
    email: "alex.johnson@email.com",
    phone: "(555) 123-4567",
    location: "San Francisco, CA",
    linkedin: "linkedin.com/in/alexjohnson",
    website: "alexjohnson.dev",
    summary: "Experienced software engineer with 5+ years developing scalable web applications and leading cross-functional teams.",
    photo: ""
  },
  experience: [
    {
      id: "1",
      title: "Senior Software Engineer",
      company: "TechCorp",
      duration: "2022 - Present",
      description: "Led development of microservices architecture serving 1M+ users. Reduced system latency by 40% through performance optimization."
    },
    {
      id: "2", 
      title: "Software Engineer",
      company: "StartupXYZ",
      duration: "2020 - 2022",
      description: "Built full-stack web applications using React and Node.js. Implemented CI/CD pipelines reducing deployment time by 60%."
    }
  ],
  education: [
    {
      id: "1",
      degree: "Bachelor of Science in Computer Science",
      school: "University of California, Berkeley",
      year: "2020",
      description: "Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Database Systems."
    }
  ],
  skills: ["JavaScript", "React", "Node.js", "Python", "AWS", "Docker", "PostgreSQL"],
  certifications: [],
  projects: [],
  languages: [],
  customSections: [],
  sectionOrder: ["personal", "experience", "education", "skills"]
};

// Mini preview component for template cards
function MiniResumePreview({ template }: { template: Template }) {
  const colors = template.colors;
  const fontFamily = template.fontFamily === 'serif' ? 'font-serif' : 
                    template.fontFamily === 'display' ? 'font-sans' : 'font-sans';
  
  const getBgColor = (category: string) => {
    switch (category) {
      case 'traditional': return 'bg-blue-50';
      case 'modern': return 'bg-purple-50';
      case 'creative': return 'bg-orange-50';
      case 'executive': return 'bg-gray-50';
      case 'ats': return 'bg-green-50';
      default: return 'bg-gray-50';
    }
  };
  
  return (
    <div className={`w-full h-full ${getBgColor(template.category)} rounded overflow-hidden ${fontFamily} text-[0.35rem] leading-tight`}>
      {/* Header */}
      <div className="p-1" style={{ backgroundColor: colors[0] + '10' }}>
        <div className="font-bold text-[0.4rem]" style={{ color: colors[0] }}>
          {sampleResumeData.personalInfo.fullName}
        </div>
        <div className="text-gray-600 text-[0.25rem] mt-0.5">
          {sampleResumeData.personalInfo.email} • {sampleResumeData.personalInfo.phone}
        </div>
      </div>
      
      {/* Content */}
      <div className="p-1 space-y-1">
        {/* Summary */}
        <div>
          <div className="font-semibold text-[0.3rem]" style={{ color: colors[0] }}>PROFESSIONAL SUMMARY</div>
          <div className="text-gray-700 text-[0.25rem] leading-tight mt-0.5">
            Experienced software engineer with 5+ years...
          </div>
        </div>
        
        {/* Experience */}
        <div>
          <div className="font-semibold text-[0.3rem]" style={{ color: colors[0] }}>EXPERIENCE</div>
          <div className="mt-0.5">
            <div className="font-medium text-[0.28rem]">Senior Software Engineer</div>
            <div className="text-gray-600 text-[0.25rem]">TechCorp • 2022 - Present</div>
            <div className="text-gray-700 text-[0.22rem] leading-tight">
              Led development of microservices architecture...
            </div>
          </div>
        </div>
        
        {/* Education */}
        <div>
          <div className="font-semibold text-[0.3rem]" style={{ color: colors[0] }}>EDUCATION</div>
          <div className="mt-0.5">
            <div className="font-medium text-[0.28rem]">Bachelor of Science in Computer Science</div>
            <div className="text-gray-600 text-[0.25rem]">UC Berkeley • 2020</div>
          </div>
        </div>
        
        {/* Skills */}
        <div>
          <div className="font-semibold text-[0.3rem]" style={{ color: colors[0] }}>SKILLS</div>
          <div className="flex flex-wrap gap-0.5 mt-0.5">
            {['JavaScript', 'React', 'Node.js', 'Python'].map(skill => (
              <span key={skill} className="text-[0.22rem] px-0.5 rounded text-gray-700" 
                    style={{ backgroundColor: colors[1] + '20' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// todo: remove mock functionality - Templates should come from a database or API
const templates: Template[] = [
  {
    id: 'cascade',
    name: 'Cascade',
    category: 'traditional',
    description: 'Clean professional layout with clear hierarchy',
    colors: ['#2563EB', '#64748B', '#000000'],
    fontFamily: 'serif'
  },
  {
    id: 'modern-pro',
    name: 'Modern Pro',
    category: 'modern',
    description: 'Contemporary design with subtle accents',
    colors: ['#10B981', '#6B7280', '#111827'],
    fontFamily: 'sans'
  },
  {
    id: 'creative-edge',
    name: 'Creative Edge',
    category: 'creative',
    description: 'Bold design for creative professionals',
    colors: ['#F59E0B', '#EF4444', '#1F2937'],
    fontFamily: 'display'
  },
  {
    id: 'executive-elite',
    name: 'Executive Elite',
    category: 'executive',
    description: 'Sophisticated layout for senior positions',
    colors: ['#1E293B', '#64748B', '#0F172A'],
    fontFamily: 'serif'
  },
  {
    id: 'ats-standard',
    name: 'ATS Standard',
    category: 'ats',
    description: 'Simple, machine-readable format',
    colors: ['#000000', '#374151', '#9CA3AF'],
    fontFamily: 'sans'
  },
  {
    id: 'minimal-classic',
    name: 'Minimal Classic',
    category: 'traditional',
    description: 'Timeless design for conservative industries',
    colors: ['#1F2937', '#6B7280', '#9CA3AF'],
    fontFamily: 'serif'
  },
  {
    id: 'tech-modern',
    name: 'Tech Modern',
    category: 'modern',
    description: 'Perfect for technology professionals',
    colors: ['#3B82F6', '#64748B', '#0EA5E9'],
    fontFamily: 'sans'
  },
  {
    id: 'creative-studio',
    name: 'Creative Studio',
    category: 'creative',
    description: 'Artistic layout for design professionals',
    colors: ['#8B5CF6', '#EC4899', '#F59E0B'],
    fontFamily: 'display'
  },
  {
    id: 'photo-professional',
    name: 'Photo Professional',
    category: 'modern',
    description: 'Clean layout with prominent photo display',
    colors: ['#2563EB', '#64748B', '#1E293B'],
    fontFamily: 'sans'
  },
  {
    id: 'photo-creative',
    name: 'Photo Creative',
    category: 'creative',
    description: 'Bold design showcasing personality with photo',
    colors: ['#F59E0B', '#10B981', '#EF4444'],
    fontFamily: 'display'
  },
  {
    id: 'minimal-sidebar',
    name: 'Minimal Sidebar',
    category: 'modern',
    description: 'Clean minimalist design with left sidebar layout',
    colors: ['#000000', '#6B7280', '#9CA3AF'],
    fontFamily: 'sans'
  },
  {
    id: 'professional-blue',
    name: 'Professional Blue',
    category: 'traditional',
    description: 'Professional design with photo and blue accents',
    colors: ['#3B82F6', '#475569', '#1E293B'],
    fontFamily: 'sans'
  },
  {
    id: 'green-sidebar',
    name: 'Green Sidebar',
    category: 'creative',
    description: 'Bold green sidebar with clean white content area',
    colors: ['#065F46', '#10B981', '#FFFFFF'],
    fontFamily: 'sans'
  },
  {
    id: 'photo-executive',
    name: 'Photo Executive',
    category: 'executive',
    description: 'Premium executive template with professional photo',
    colors: ['#1E293B', '#475569', '#64748B'],
    fontFamily: 'serif'
  },
  {
    id: 'compact-modern',
    name: 'Compact Modern',
    category: 'modern',
    description: 'Space-efficient design with clean typography',
    colors: ['#0EA5E9', '#6B7280', '#1F2937'],
    fontFamily: 'sans'
  },
  {
    id: 'timeline-classic',
    name: 'Timeline Classic',
    category: 'traditional',
    description: 'Timeline-based layout for career progression',
    colors: ['#059669', '#6B7280', '#374151'],
    fontFamily: 'serif'
  },
  {
    id: 'sidebar-modern',
    name: 'Sidebar Modern',
    category: 'modern',
    description: 'Two-column layout with sidebar highlights',
    colors: ['#7C3AED', '#64748B', '#1F2937'],
    fontFamily: 'sans'
  },
  {
    id: 'minimal-elegant',
    name: 'Minimal Elegant',
    category: 'executive',
    description: 'Ultra-clean design for senior professionals',
    colors: ['#374151', '#6B7280', '#9CA3AF'],
    fontFamily: 'serif'
  },
  // Additional 20 professional templates
  {
    id: 'blue-professional',
    name: 'Blue Professional',
    category: 'traditional',
    description: 'Classic blue theme for corporate environments',
    colors: ['#1E40AF', '#64748B', '#0F172A'],
    fontFamily: 'sans'
  },
  {
    id: 'green-modern',
    name: 'Green Modern',
    category: 'modern',
    description: 'Fresh green accent for innovative professionals',
    colors: ['#059669', '#6B7280', '#111827'],
    fontFamily: 'sans'
  },
  {
    id: 'purple-creative',
    name: 'Purple Creative',
    category: 'creative',
    description: 'Bold purple design for creative minds',
    colors: ['#7C3AED', '#EC4899', '#F59E0B'],
    fontFamily: 'display'
  },
  {
    id: 'red-executive',
    name: 'Red Executive',
    category: 'executive',
    description: 'Strong red theme for leadership roles',
    colors: ['#DC2626', '#475569', '#64748B'],
    fontFamily: 'serif'
  },
  {
    id: 'orange-dynamic',
    name: 'Orange Dynamic',
    category: 'modern',
    description: 'Energetic orange for dynamic professionals',
    colors: ['#EA580C', '#6B7280', '#1F2937'],
    fontFamily: 'sans'
  },
  {
    id: 'teal-corporate',
    name: 'Teal Corporate',
    category: 'traditional',
    description: 'Professional teal for corporate positions',
    colors: ['#0D9488', '#64748B', '#374151'],
    fontFamily: 'serif'
  },
  {
    id: 'navy-executive',
    name: 'Navy Executive',
    category: 'executive',
    description: 'Deep navy for senior management roles',
    colors: ['#1E293B', '#475569', '#64748B'],
    fontFamily: 'serif'
  },
  {
    id: 'mint-fresh',
    name: 'Mint Fresh',
    category: 'modern',
    description: 'Clean mint design for tech professionals',
    colors: ['#10B981', '#6B7280', '#111827'],
    fontFamily: 'sans'
  },
  {
    id: 'rose-elegant',
    name: 'Rose Elegant',
    category: 'creative',
    description: 'Sophisticated rose theme for creative roles',
    colors: ['#E11D48', '#BE185D', '#F59E0B'],
    fontFamily: 'display'
  },
  {
    id: 'slate-minimal',
    name: 'Slate Minimal',
    category: 'ats',
    description: 'Clean slate design optimized for ATS systems',
    colors: ['#475569', '#64748B', '#9CA3AF'],
    fontFamily: 'sans'
  },
  {
    id: 'indigo-tech',
    name: 'Indigo Tech',
    category: 'modern',
    description: 'Tech-focused indigo theme for developers',
    colors: ['#4338CA', '#6366F1', '#8B5CF6'],
    fontFamily: 'sans'
  },
  {
    id: 'amber-warm',
    name: 'Amber Warm',
    category: 'creative',
    description: 'Warm amber tones for approachable professionals',
    colors: ['#D97706', '#F59E0B', '#FCD34D'],
    fontFamily: 'display'
  },
  {
    id: 'emerald-finance',
    name: 'Emerald Finance',
    category: 'traditional',
    description: 'Professional emerald for finance sector',
    colors: ['#059669', '#065F46', '#064E3B'],
    fontFamily: 'serif'
  },
  {
    id: 'cyan-digital',
    name: 'Cyan Digital',
    category: 'modern',
    description: 'Digital cyan for tech and digital roles',
    colors: ['#0891B2', '#0E7490', '#164E63'],
    fontFamily: 'sans'
  },
  {
    id: 'pink-marketing',
    name: 'Pink Marketing',
    category: 'creative',
    description: 'Vibrant pink for marketing professionals',
    colors: ['#EC4899', '#BE185D', '#9D174D'],
    fontFamily: 'display'
  },
  {
    id: 'gray-corporate',
    name: 'Gray Corporate',
    category: 'executive',
    description: 'Professional gray for corporate executives',
    colors: ['#374151', '#4B5563', '#6B7280'],
    fontFamily: 'serif'
  },
  {
    id: 'lime-energy',
    name: 'Lime Energy',
    category: 'modern',
    description: 'Energetic lime for dynamic careers',
    colors: ['#65A30D', '#84CC16', '#A3E635'],
    fontFamily: 'sans'
  },
  {
    id: 'violet-creative',
    name: 'Violet Creative',
    category: 'creative',
    description: 'Creative violet for artistic professionals',
    colors: ['#8B5CF6', '#A855F7', '#C084FC'],
    fontFamily: 'display'
  },
  {
    id: 'brown-classic',
    name: 'Brown Classic',
    category: 'traditional',
    description: 'Classic brown for traditional industries',
    colors: ['#92400E', '#B45309', '#D97706'],
    fontFamily: 'serif'
  },
  {
    id: 'steel-industrial',
    name: 'Steel Industrial',
    category: 'ats',
    description: 'Industrial steel theme for technical roles',
    colors: ['#475569', '#64748B', '#94A3B8'],
    fontFamily: 'sans'
  }
];

// Sample data for template preview
const sampleData: ResumeData = {
  personalInfo: {
    fullName: 'John Anderson',
    email: 'john.anderson@email.com',
    phone: '+1 (555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/johnanderson',
    website: 'www.johnanderson.dev',
    summary: 'Results-driven Software Engineer with 5+ years of experience developing scalable web applications. Passionate about creating efficient solutions and leading cross-functional teams to deliver high-quality products.',
    photo: ''
  },
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'TechCorp Solutions',
      duration: 'Jan 2022 - Present',
      description: 'Led development of microservices architecture serving 1M+ users daily. Implemented CI/CD pipelines reducing deployment time by 60%. Mentored junior developers and conducted code reviews.'
    },
    {
      id: '2',
      title: 'Software Engineer',
      company: 'StartupXYZ',
      duration: 'Jun 2020 - Dec 2021',
      description: 'Built responsive web applications using React and Node.js. Optimized database queries improving performance by 40%. Collaborated with product team to deliver features on tight deadlines.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      year: '2020',
      description: 'Graduated Magna Cum Laude. Relevant coursework: Data Structures, Algorithms, Software Engineering.'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'PostgreSQL', 'Git', 'Agile/Scrum'],
  certifications: [
    {
      id: '1',
      name: 'AWS Certified Solutions Architect',
      issuer: 'Amazon Web Services',
      date: '2023',
      expiryDate: '2026'
    }
  ],
  projects: [
    {
      id: '1',
      name: 'E-commerce Platform',
      description: 'Full-stack web application with payment integration and real-time inventory management.',
      technologies: 'React, Node.js, PostgreSQL, Stripe API',
      link: 'github.com/john/ecommerce-platform'
    }
  ],
  languages: [
    {
      id: '1',
      name: 'English',
      proficiency: 'Native'
    },
    {
      id: '2',
      name: 'Spanish',
      proficiency: 'Conversational'
    }
  ],
  customSections: [],
  sectionOrder: ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages']
};

// Empty initial data for actual form filling
const initialData: ResumeData = {
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    location: '',
    linkedin: '',
    website: '',
    summary: '',
    photo: ''
  },
  experience: [],
  education: [],
  skills: [],
  certifications: [],
  projects: [],
  languages: [],
  customSections: [],
  sectionOrder: ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages']
};

// Multi-step flow types
type Step = 'method' | 'template-selection' | 'preparing' | 'building';

// Step indicator component
function StepIndicator({ currentStep }: { currentStep: Step }) {
  const steps = [
    { id: 'method', label: 'Choose Method', number: 1 },
    { id: 'template-selection', label: 'Select Template', number: 2 },
    { id: 'building', label: 'Build Resume', number: 3 },
  ];

  const getStepIndex = (stepId: string) => steps.findIndex(s => s.id === stepId);
  const currentIndex = getStepIndex(currentStep === 'preparing' ? 'template-selection' : currentStep);

  return (
    <div className="flex items-center justify-center py-6 bg-card border-b">
      <div className="flex items-center space-x-4">
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex || (currentStep === 'preparing' && step.id === 'template-selection');
          const isCurrent = index === currentIndex || (currentStep === 'preparing' && step.id === 'template-selection');
          
          return (
            <div key={step.id} className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  isCompleted 
                    ? 'bg-green-500 text-white' 
                    : isCurrent 
                      ? 'bg-primary text-white' 
                      : 'bg-gray-200 text-gray-500'
                }`}>
                  {isCompleted ? <CheckCircle className="w-4 h-4" /> : step.number}
                </div>
                <span className={`text-sm font-medium hidden md:block ${
                  isCompleted || isCurrent ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step.label}
                </span>
              </div>
              {index < steps.length - 1 && (
                <div className={`w-8 h-px mx-2 ${
                  index < currentIndex ? 'bg-green-500' : 'bg-gray-200'
                }`} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

// Interactive Template Selection Component (Step 3)
function InteractiveTemplateSelector({ 
  templates, 
  selectedTemplate, 
  onTemplateSelect, 
  selectedCategory,
  onCategorySelect,
  onNext,
  currentTemplate,
  resumeData
}: { 
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  onNext: () => void;
  currentTemplate: Template;
  resumeData: ResumeData;
}) {
  const [showPreview, setShowPreview] = useState(false);
  const [previewTemplate, setPreviewTemplate] = useState<Template | null>(null);

  const categories = [
    { id: 'all', label: 'All Templates' },
    { id: 'traditional', label: 'Traditional' },
    { id: 'modern', label: 'Modern' },
    { id: 'creative', label: 'Creative' },
    { id: 'executive', label: 'Executive' },
    { id: 'ats', label: 'ATS-Optimized' },
  ];

  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  const handleTemplateClick = (template: Template) => {
    onTemplateSelect(template.id);
  };

  const handlePreviewClick = (template: Template, e: React.MouseEvent) => {
    e.stopPropagation();
    setPreviewTemplate(template);
    setShowPreview(true);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'traditional': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-300';
      case 'modern': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-300';
      case 'creative': return 'bg-pink-100 text-pink-800 dark:bg-pink-900/20 dark:text-pink-300';
      case 'executive': return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
      case 'ats': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-300';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-300';
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-7xl">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Choose Your <span className="text-primary">Template</span>
          </h1>
          <p className="text-muted-foreground mb-6">
            Select a professional template that matches your style and industry
          </p>
          
          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                size="sm"
                onClick={() => onCategorySelect(category.id)}
                data-testid={`button-category-${category.id}`}
                className="px-4 py-2"
              >
                {category.label}
              </Button>
            ))}
          </div>
        </div>

        {/* Templates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-8">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:scale-105 ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary border-primary shadow-lg' 
                  : 'border-border hover:border-primary/50'
              }`}
              onClick={() => handleTemplateClick(template)}
              data-testid={`card-template-${template.id}`}
            >
              <CardContent className="p-4">
                {/* Template Preview Thumbnail */}
                <div className="relative bg-muted rounded-lg p-2 mb-4 h-32 flex flex-col items-center justify-center">
                  <div className="w-16 h-20 bg-white border border-gray-200 rounded shadow-sm mb-2 overflow-hidden">
                    <MiniResumePreview template={template} />
                  </div>
                  <div className="flex space-x-1 justify-center">
                    {template.colors.slice(0, 3).map((color, index) => (
                      <div
                        key={index}
                        className="w-3 h-3 rounded-full border border-gray-200"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  {/* Preview Button */}
                  <Button
                    size="sm"
                    variant="secondary"
                    className="absolute top-2 right-2 h-8 w-8 p-0"
                    onClick={(e) => handlePreviewClick(template, e)}
                    data-testid={`button-preview-${template.id}`}
                  >
                    <Eye className="h-4 w-4" />
                  </Button>

                  {/* Selected Indicator */}
                  {selectedTemplate === template.id && (
                    <div className="absolute top-2 left-2 bg-primary text-white rounded-full p-1">
                      <CheckCircle className="h-4 w-4" />
                    </div>
                  )}
                </div>

                {/* Template Info */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <h3 className="font-semibold text-sm">{template.name}</h3>
                    <Badge className={`text-xs ${getCategoryColor(template.category)}`}>
                      {template.category}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {template.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Continue Button */}
        {selectedTemplate && (
          <div className="text-center">
            <Button 
              onClick={onNext}
              size="lg"
              className="px-8 py-4 text-lg"
              data-testid="button-continue-template"
            >
              Continue with {currentTemplate.name}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        )}

        {/* Preview Modal */}
        <Dialog open={showPreview} onOpenChange={setShowPreview}>
          <DialogContent className="max-w-4xl h-[90vh] flex flex-col">
            <DialogHeader className="flex-shrink-0">
              <DialogTitle className="flex items-center justify-between">
                <div>
                  <span>Preview: {previewTemplate?.name}</span>
                  <Badge className={`ml-2 ${getCategoryColor(previewTemplate?.category || '')}`}>
                    {previewTemplate?.category}
                  </Badge>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    if (previewTemplate) {
                      onTemplateSelect(previewTemplate.id);
                      setShowPreview(false);
                    }
                  }}
                  data-testid="button-select-from-preview"
                >
                  Select This Template
                </Button>
              </DialogTitle>
            </DialogHeader>
            <div className="flex-1 overflow-auto bg-muted p-4 rounded-lg">
              {previewTemplate && (
                <ResumePreview data={resumeData} template={previewTemplate} />
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}


// Loading/Preparation Screen Component (Step 3.5)
function PreparationScreen({ 
  selectedTemplate, 
  onComplete 
}: { 
  selectedTemplate: string;
  onComplete: () => void;
}) {
  const [progress, setProgress] = useState(0);
  const template = templates.find(t => t.id === selectedTemplate);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 500);
          return 100;
        }
        return prev + Math.random() * 15 + 5;
      });
    }, 200);

    return () => clearInterval(timer);
  }, [onComplete]);

  const getStatusMessage = () => {
    if (progress < 30) return "Setting up workspace...";
    if (progress < 60) return "Applying template formatting";
    if (progress < 90) return "Optimizing for ATS systems";
    return "Finalizing your resume builder";
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <Card className="w-full max-w-2xl text-center">
        <CardHeader>
          <CardTitle className="text-3xl font-bold mb-4">
            Preparing your workspace
          </CardTitle>
          <p className="text-xl text-muted-foreground mb-8">
            Setting up the <span className="text-primary font-semibold">{template?.name || 'Executive Bold'}</span> template for you...
          </p>
        </CardHeader>
        <CardContent className="space-y-8">
          {/* Progress Circle */}
          <div className="relative w-32 h-32 mx-auto">
            <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
            <div 
              className="absolute inset-0 rounded-full border-8 border-primary border-t-transparent animate-spin"
              style={{
                transform: `rotate(${(progress / 100) * 360}deg)`,
                animation: progress >= 100 ? 'none' : undefined
              }}
            ></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <Brain className="w-8 h-8 text-primary mx-auto mb-1" />
                <div className="text-2xl font-bold text-primary">{Math.round(progress)}%</div>
              </div>
            </div>
          </div>

          {/* Status Message */}
          <div className="space-y-4">
            <p className="text-lg font-medium">{getStatusMessage()}</p>
            
            {/* Status Items */}
            <div className="bg-muted p-4 rounded-lg space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  Template: {template?.name || 'Executive Bold'}
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                  Layout: Multi-column
                </span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-purple-500 rounded-full"></div>
                  Method: From scratch
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function ResumeBuilder() {
  const [currentStep, setCurrentStep] = useState<Step>('template-selection');
  const [selectedTemplate, setSelectedTemplate] = useState('cascade');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [resumeData, setResumeData] = useState<ResumeData>(sampleData);
  const [showPreview, setShowPreview] = useState(true);
  const [showATSScore, setShowATSScore] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const { toast } = useToast();

  const currentTemplate = templates.find(t => t.id === selectedTemplate) || templates[0];

  // Step navigation handlers
  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId);
  };

  const handleTemplateNext = () => {
    setCurrentStep('preparing');
  };

  const handlePreparationComplete = () => {
    setCurrentStep('building');
    setShowPreview(true);
    // Reset to initial empty data when building starts
    setResumeData(initialData);
    toast({
      title: "Welcome to Your Resume Builder!",
      description: "Your workspace is ready. Start building your professional resume.",
      duration: 4000,
    });
  };

  const handleBackToTemplateSelection = () => {
    setCurrentStep('template-selection');
    toast({
      title: "Back to Template Selection",
      description: "Choose a different template for your resume.",
    });
  };

  const handleExportPDF = async () => {
    try {
      // Make sure preview is visible first
      if (!showPreview) {
        setShowPreview(true);
        // Wait for the preview to render
        await new Promise(resolve => setTimeout(resolve, 500));
      }
      
      const resumeElement = document.querySelector('[data-testid="resume-preview"]') as HTMLElement;
      if (!resumeElement) {
        // Try alternative selectors
        const alternativeElement = document.querySelector('.resume-preview') as HTMLElement;
        if (!alternativeElement) {
          console.error('Resume preview element not found');
          console.log('Available elements:', document.querySelectorAll('[data-testid]'));
          toast({
            title: "Error",
            description: "Resume preview not found. Please make sure the preview is visible and try again.",
            variant: "destructive"
          });
          return;
        }
        // Use alternative element if found
        return handleExportPDF();
      }
      
      // Check if element has content
      if (resumeElement.offsetHeight === 0 || resumeElement.offsetWidth === 0) {
        console.error('Resume element has no dimensions:', {
          height: resumeElement.offsetHeight,
          width: resumeElement.offsetWidth,
          display: getComputedStyle(resumeElement).display,
          visibility: getComputedStyle(resumeElement).visibility
        });
        toast({
          title: "Error",
          description: "Resume preview is not properly rendered. Please refresh and try again.",
          variant: "destructive"
        });
        return;
      }

      console.log('Starting PDF generation with element:', {
        element: resumeElement,
        dimensions: {
          width: resumeElement.offsetWidth,
          height: resumeElement.offsetHeight,
          scrollWidth: resumeElement.scrollWidth,
          scrollHeight: resumeElement.scrollHeight
        },
        styles: {
          display: getComputedStyle(resumeElement).display,
          visibility: getComputedStyle(resumeElement).visibility,
          position: getComputedStyle(resumeElement).position
        }
      });
      
      toast({
        title: "Generating PDF",
        description: "Please wait while we prepare your resume for download...",
      });

      // Add PDF export mode class to remove card borders and shadows
      resumeElement.classList.add('pdf-export-mode');
      
      // Allow fonts to load properly before capturing
      await new Promise(resolve => setTimeout(resolve, 300));
      
      // Force a repaint to ensure all styles are applied
      resumeElement.style.opacity = '0.99';
      resumeElement.offsetHeight; // Force reflow
      resumeElement.style.opacity = '1';

      // Create canvas from the resume element for high-quality rendering
      console.log('Starting html2canvas capture...');
      
      let canvas;
      try {
        canvas = await html2canvas(resumeElement, {
        scale: 2, // Reduce scale to prevent memory issues
        useCORS: true,
        allowTaint: true,
        backgroundColor: '#ffffff',
        logging: true, // Enable logging to debug issues
        letterRendering: true,
        foreignObjectRendering: false, // Disable to prevent rendering issues
        imageTimeout: 15000,
        removeContainer: true,
        onclone: (clonedDoc) => {
          // Ensure list styles are preserved in the cloned document
          const clonedElement = clonedDoc.querySelector('[data-testid="resume-preview"]');
          if (clonedElement) {
            clonedElement.classList.add('pdf-export-mode');
            
            // Fix list numbering in cloned document
            const lists = clonedElement.querySelectorAll('ol, ul');
            lists.forEach((list, index) => {
              if (list.tagName === 'OL') {
                list.style.listStyleType = 'decimal';
                list.style.listStylePosition = 'outside';
                list.style.paddingLeft = '1.5em';
              } else if (list.tagName === 'UL') {
                list.style.listStyleType = 'disc';
                list.style.listStylePosition = 'outside';
                list.style.paddingLeft = '1.5em';
              }
            });
            
            // Ensure list items display correctly
            const listItems = clonedElement.querySelectorAll('li');
            listItems.forEach(li => {
              li.style.display = 'list-item';
              li.style.listStyle = 'inherit';
              li.style.margin = '0.25em 0';
            });
          }
        }
      });
      } catch (canvasError) {
        console.error('html2canvas error:', canvasError);
        resumeElement.classList.remove('pdf-export-mode');
        toast({
          title: "Canvas Error",
          description: "Failed to capture resume content. Please try refreshing the page and try again.",
          variant: "destructive"
        });
        return;
      }
      
      console.log('Canvas created:', {
        width: canvas.width,
        height: canvas.height,
        hasData: canvas.width > 0 && canvas.height > 0,
        dataURL: canvas.toDataURL().substring(0, 50) + '...'
      });
      
      // Validate canvas has content
      if (canvas.width === 0 || canvas.height === 0) {
        console.error('Canvas has zero dimensions');
        toast({
          title: "Error",
          description: "Failed to capture resume content. Please try again.",
          variant: "destructive"
        });
        return;
      }

      // Remove PDF export mode class after capture
      resumeElement.classList.remove('pdf-export-mode');

      // Create PDF
      console.log('Creating PDF document...');
      const pdf = new jsPDF('p', 'mm', 'a4');
      
      // Get PDF page dimensions
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();
      
      // Add margins for better presentation (in mm)
      const marginTop = 10;
      const marginBottom = 10;
      const marginLeft = 10;
      const marginRight = 10;
      const contentWidth = pdfWidth - marginLeft - marginRight;
      const contentHeight = pdfHeight - marginTop - marginBottom;
      
      // Calculate scale to fit width (maintaining aspect ratio)
      const imgWidth = canvas.width;
      const imgHeight = canvas.height;
      const widthRatio = contentWidth / imgWidth;
      
      // Derive the actual scale used by html2canvas
      const canvasScale = canvas.width / resumeElement.offsetWidth;
      
      // Detect safe breakpoints based on content sections to avoid mid-text cuts
      // Include common section wrappers used across templates and list items
      const contentElements = resumeElement.querySelectorAll(`
        h1, h2, h3, h4, h5, h6,
        p,
        li,
        div.mb-6, div.mb-4, div.mb-8,
        div.border-b,
        div.space-y-3 > div,
        div.space-y-4 > div,
        div.space-y-6 > div,
        [data-section],
        .section,
        .resume-section
      `);
      const breakpoints: number[] = [0]; // Start with 0
      
      contentElements.forEach(element => {
        const rect = element.getBoundingClientRect();
        const elementTopRelative = rect.top - resumeElement.getBoundingClientRect().top;
        const elementBottomRelative = rect.bottom - resumeElement.getBoundingClientRect().top;
        
        // Convert to canvas pixels using the derived scale
        const canvasYTop = elementTopRelative * canvasScale;
        const canvasYBottom = elementBottomRelative * canvasScale;
        
        // Add both top and bottom positions as potential break points
        if (canvasYTop > 0 && canvasYTop < imgHeight) {
          breakpoints.push(canvasYTop);
        }
        if (canvasYBottom > 0 && canvasYBottom < imgHeight && canvasYBottom !== canvasYTop) {
          breakpoints.push(canvasYBottom);
        }
      });
      
      // Sort breakpoints, remove duplicates, and ensure we have the end point
      breakpoints.sort((a, b) => a - b);
      const uniqueBreakpoints = Array.from(new Set(breakpoints));
      uniqueBreakpoints.push(imgHeight);
      
      // Add pages with content-aware breaks
      let currentPage = 0;
      let currentY = 0;
      
      console.log('Starting page generation:', {
        totalHeight: imgHeight,
        widthRatio,
        contentWidth,
        contentHeight,
        uniqueBreakpoints: uniqueBreakpoints.slice(0, 10) // Show first 10 breakpoints
      });
      
      while (currentY < imgHeight) {
        if (currentPage > 0) {
          pdf.addPage();
        }
        
        // Calculate ideal end position for this page
        const idealEndY = currentY + (contentHeight / widthRatio);
        
        // Find the best breakpoint (closest to ideal within tolerance, either before or after)
        const tolerance = (contentHeight / widthRatio) * 0.2;
        let bestBreakpoint = Math.min(idealEndY, imgHeight);
        let bestDistance = Infinity;
        
        for (const breakpoint of uniqueBreakpoints) {
          if (breakpoint > currentY && breakpoint <= imgHeight) {
            const distance = Math.abs(breakpoint - idealEndY);
            if (distance < tolerance && distance < bestDistance) {
              bestBreakpoint = breakpoint;
              bestDistance = distance;
            }
          }
        }
        
        // If no good breakpoint found within tolerance, use ideal position
        if (bestDistance === Infinity) {
          bestBreakpoint = Math.min(idealEndY, imgHeight);
        }
        
        const sourceHeight = bestBreakpoint - currentY;
        
        console.log(`Creating page ${currentPage + 1}:`, {
          currentY,
          bestBreakpoint,
          sourceHeight,
          idealEndY
        });
        
        if (sourceHeight > 0) {
          // Create a temporary canvas for this page's content
          const pageCanvas = document.createElement('canvas');
          pageCanvas.width = imgWidth;
          pageCanvas.height = sourceHeight;
          
          const pageCtx = pageCanvas.getContext('2d');
          if (pageCtx) {
            // Fill with white background
            pageCtx.fillStyle = '#ffffff';
            pageCtx.fillRect(0, 0, imgWidth, sourceHeight);
            
            // Draw the specific portion directly from the original canvas
            pageCtx.drawImage(
              canvas,
              0, currentY, // Source x, y
              imgWidth, sourceHeight, // Source width, height
              0, 0, // Destination x, y
              imgWidth, sourceHeight // Destination width, height
            );
            
            // Add this page's image to the PDF with margins
            const pageImgData = pageCanvas.toDataURL('image/png');
            const pageScaledHeight = sourceHeight * widthRatio;
            const destHeight = Math.min(pageScaledHeight, contentHeight);
            pdf.addImage(pageImgData, 'PNG', marginLeft, marginTop, contentWidth, destHeight);
          }
        }
        
        currentY = bestBreakpoint;
        currentPage++;
        
        // Safety check to prevent infinite loops
        if (currentPage > 50) {
          console.warn('PDF generation: Maximum page limit reached');
          break;
        }
      }
      
      // Generate filename from user's name or use default
      const fileName = resumeData.personalInfo.fullName 
        ? `${resumeData.personalInfo.fullName.replace(/[^a-zA-Z0-9]/g, '_')}_Resume.pdf`
        : 'Resume.pdf';
      
      console.log('Saving PDF:', {
        fileName,
        totalPages: currentPage,
        finalY: currentY
      });
      
      pdf.save(fileName);

      // Track download
      try {
        await fetch('/api/downloads', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });
      } catch (error) {
        // Silent fail - don't interrupt user experience if tracking fails
        console.error('Failed to track download:', error);
      }

      toast({
        title: "Download Complete",
        description: `Your resume has been downloaded successfully${currentPage > 1 ? ` (${currentPage} pages)` : ''}!`,
      });
    } catch (error) {
      console.error('PDF generation error:', error);
      toast({
        title: "Download Failed",
        description: "There was an error generating your PDF. Please try again.",
        variant: "destructive"
      });
    }
  };

  const handlePreviewToggle = () => {
    setShowPreview(!showPreview);
  };

  const handleATSToggle = () => {
    setShowATSScore(!showATSScore);
  };

  const handleTemplatesToggle = () => {
    setShowTemplates(!showTemplates);
  };


  // Render based on current step
  if (currentStep === 'template-selection') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={currentStep} />
        <InteractiveTemplateSelector
          templates={templates}
          selectedTemplate={selectedTemplate}
          onTemplateSelect={handleTemplateSelect}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
          onNext={handleTemplateNext}
          currentTemplate={currentTemplate}
          resumeData={sampleData}
        />
      </div>
    );
  }

  if (currentStep === 'preparing') {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <StepIndicator currentStep={currentStep} />
        <PreparationScreen 
          selectedTemplate={selectedTemplate}
          onComplete={handlePreparationComplete}
        />
      </div>
    );
  }

  // Final step - building (full resume builder)
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <StepIndicator currentStep={currentStep} />
      <Header 
        onPreviewToggle={handlePreviewToggle}
        onExportPDF={handleExportPDF}
        onATSToggle={handleATSToggle}
        onTemplatesToggle={handleTemplatesToggle}
        onBackToTemplateSelection={handleBackToTemplateSelection}
        showPreview={showPreview}
        showATSScore={showATSScore}
        showTemplates={showTemplates}
        isTemplateSelectionMode={false}
      />
      
      <div className="flex-1 flex flex-col lg:flex-row">
        {/* Templates Sidebar */}
        {showTemplates && (
          <div className="w-full lg:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r">
            <TemplateSelector
              templates={templates}
              selectedTemplate={selectedTemplate}
              onTemplateSelect={handleTemplateSelect}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              isTemplateSelectionMode={false}
            />
          </div>
        )}

        {/* Form */}
        <div className={`w-full ${showPreview ? 'lg:w-2/5' : 'lg:flex-1'} ${showTemplates ? '' : 'border-r'} bg-background`}>
          <ResumeForm data={resumeData} onChange={setResumeData} />
        </div>

        {/* Preview and ATS Score */}
        {(showPreview || showATSScore) && (
          <div className="w-full lg:flex-1 overflow-auto bg-muted p-3 md:p-6 space-y-6">
            {showPreview && (
              <ResumePreview data={resumeData} template={currentTemplate} />
            )}
            {showATSScore && (
              <ATSScore data={resumeData} />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Check } from "lucide-react";

export interface Template {
  id: string;
  name: string;
  category: 'traditional' | 'modern' | 'creative' | 'executive' | 'ats';
  description: string;
  colors: string[];
  fontFamily: string;
}

interface TemplateSelectorProps {
  templates: Template[];
  selectedTemplate: string;
  onTemplateSelect: (templateId: string) => void;
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  isTemplateSelectionMode?: boolean;
  onContinue?: () => void;
}

const categories = [
  { id: 'all', label: 'All Templates' },
  { id: 'traditional', label: 'Traditional' },
  { id: 'modern', label: 'Modern' },
  { id: 'creative', label: 'Creative' },
  { id: 'executive', label: 'Executive' },
  { id: 'ats', label: 'ATS-Optimized' },
];

export default function TemplateSelector({
  templates,
  selectedTemplate,
  onTemplateSelect,
  selectedCategory,
  onCategorySelect,
  isTemplateSelectionMode = false,
  onContinue,
}: TemplateSelectorProps) {
  const filteredTemplates = selectedCategory === 'all' 
    ? templates 
    : templates.filter(t => t.category === selectedCategory);

  return (
    <div className="flex flex-col bg-card md:border-r md:h-full">
      <div className="p-3 md:p-4 border-b">
        <h2 className="font-resume-display font-semibold text-base md:text-lg mb-3 md:mb-4">
          {isTemplateSelectionMode ? 'Choose Your Template' : 'Choose Template'}
        </h2>
        
        {isTemplateSelectionMode && (
          <p className="text-xs md:text-sm text-muted-foreground mb-3 md:mb-4">
            <span className="hidden sm:inline">Select a template below and see how your resume will look. Click Continue when you find the perfect design.</span>
            <span className="sm:hidden">Select a template and click Continue.</span>
          </p>
        )}
        
        <div className="flex flex-wrap gap-1 md:gap-2">
          {categories.map((category) => (
            <Button
              key={category.id}
              variant={selectedCategory === category.id ? "default" : "outline"}
              size="sm"
              onClick={() => onCategorySelect(category.id)}
              data-testid={`button-category-${category.id}`}
              className="text-xs px-2 py-1 md:px-3 md:py-2"
            >
              <span className="hidden sm:inline">{category.label}</span>
              <span className="sm:hidden">
                {category.id === 'all' ? 'All' : 
                 category.id === 'traditional' ? 'Trad' : 
                 category.id === 'modern' ? 'Mod' : 
                 category.id === 'creative' ? 'Crea' : 
                 category.id === 'executive' ? 'Exec' : 'ATS'}
              </span>
            </Button>
          ))}
        </div>

        {isTemplateSelectionMode && (
          <div className="mt-3 md:mt-4">
            <Button
              onClick={onContinue}
              className="w-full"
              size="lg"
              data-testid="button-continue-template"
            >
              <span className="hidden sm:inline">Continue with {templates.find(t => t.id === selectedTemplate)?.name}</span>
              <span className="sm:hidden">Continue</span>
            </Button>
          </div>
        )}
      </div>

      <ScrollArea className="flex-1 p-2 md:p-4">
        <div className="grid gap-2 md:gap-4">
          {filteredTemplates.map((template) => (
            <Card
              key={template.id}
              className={`cursor-pointer transition-all hover-elevate border ${
                selectedTemplate === template.id 
                  ? 'ring-2 ring-primary border-primary' 
                  : 'border-border'
              }`}
              onClick={() => onTemplateSelect(template.id)}
              data-testid={`card-template-${template.id}`}
            >
              <CardContent className="p-3 md:p-4">
                <div className="flex items-start justify-between mb-2">
                  <h3 className="font-medium text-xs md:text-sm font-resume-sans">
                    {template.name}
                  </h3>
                  {selectedTemplate === template.id && (
                    <Check className="h-3 w-3 md:h-4 md:w-4 text-primary" />
                  )}
                </div>
                
                <p className="text-xs text-muted-foreground mb-2 md:mb-3 line-clamp-2">
                  {template.description}
                </p>
                
                <div className="flex items-center justify-between">
                  <div className="flex gap-1">
                    {template.colors.map((color, index) => (
                      <div
                        key={index}
                        className="w-2 h-2 md:w-3 md:h-3 rounded-full border border-border"
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                  
                  <Badge variant="secondary" className="text-xs">
                    {template.category}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
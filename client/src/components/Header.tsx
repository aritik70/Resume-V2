import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, Download, Eye, BarChart, Menu, Home, Palette, ArrowLeft, Briefcase } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onPreviewToggle: () => void;
  onExportPDF: () => void;
  onATSToggle: () => void;
  onTemplatesToggle: () => void;
  onBackToTemplateSelection?: () => void;
  showPreview: boolean;
  showATSScore: boolean;
  showTemplates: boolean;
  isTemplateSelectionMode?: boolean;
}

export default function Header({ onPreviewToggle, onExportPDF, onATSToggle, onTemplatesToggle, onBackToTemplateSelection, showPreview, showATSScore, showTemplates, isTemplateSelectionMode = false }: HeaderProps) {
  return (
    <TooltipProvider>
    <header className="border-b bg-card border-border">
      <div className="flex flex-wrap items-center justify-between px-3 md:px-6 py-3 md:py-4 gap-2">
        <div className="flex items-center gap-2 md:gap-3 min-w-0 shrink-0">
          {/* NewHire Logo - Moved to far left */}
          <Link href="/" className="flex items-center gap-1 md:gap-2 hover:opacity-80 transition-opacity shrink-0">
            <div className="h-6 w-6 md:h-8 md:w-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
              <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-white" />
            </div>
            <h1 className="text-lg md:text-xl font-resume-display font-semibold text-foreground truncate">
              NewHire
            </h1>
          </Link>
          
          {/* Back to Template Selection Button - Only show when not in template selection mode */}
          {!isTemplateSelectionMode && onBackToTemplateSelection && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToTemplateSelection}
                  data-testid="button-back-to-templates"
                  className="gap-1 md:gap-2 text-xs md:text-sm shrink-0"
                >
                  <ArrowLeft className="h-3 w-3 md:h-4 md:w-4" />
                  <span className="hidden sm:inline">Change Template</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="sm:hidden">
                <p>Back to Template Selection</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {/* Template Toggle with Icon - Hidden in template selection mode */}
          {!isTemplateSelectionMode && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onTemplatesToggle}
                  data-testid="button-templates-toggle"
                  className="shrink-0"
                  aria-expanded={showTemplates}
                  aria-controls="template-sidebar"
                >
                  <Palette className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p>{showTemplates ? 'Hide Templates' : 'Show Templates'}</p>
              </TooltipContent>
            </Tooltip>
          )}
        </div>
        
        <div className="flex flex-wrap items-center gap-1 md:gap-3 min-w-0">
          {/* Hide these buttons in template selection mode */}
          {!isTemplateSelectionMode && (
            <>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onPreviewToggle}
                    data-testid="button-preview-toggle"
                    className="gap-1 md:gap-2 text-xs md:text-sm shrink-0"
                  >
                    {showPreview ? (
                      <>
                        <Eye className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Hide Preview</span>
                      </>
                    ) : (
                      <>
                        <Eye className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Show Preview</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">
                  <p>{showPreview ? 'Hide Preview' : 'Show Preview'}</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onATSToggle}
                    data-testid="button-ats-toggle"
                    className="gap-1 md:gap-2 text-xs md:text-sm shrink-0"
                  >
                    {showATSScore ? (
                      <>
                        <BarChart className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Hide ATS Score</span>
                      </>
                    ) : (
                      <>
                        <BarChart className="h-3 w-3 md:h-4 md:w-4" />
                        <span className="hidden sm:inline">Show ATS Score</span>
                      </>
                    )}
                  </Button>
                </TooltipTrigger>
                <TooltipContent className="sm:hidden">
                  <p>{showATSScore ? 'Hide ATS Score' : 'Show ATS Score'}</p>
                </TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    onClick={onExportPDF}
                    size="sm"
                    data-testid="button-export-pdf"
                    className="shrink-0"
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download PDF</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
          
          {/* Template selection mode header */}
          {isTemplateSelectionMode && (
            <div className="text-xs md:text-sm text-muted-foreground">
              <span className="hidden sm:inline">Choose your preferred template design</span>
              <span className="sm:hidden">Choose template</span>
            </div>
          )}
        </div>
      </div>
    </header>
    </TooltipProvider>
  );
}
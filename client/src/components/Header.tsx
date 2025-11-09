import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FileText, Download, Eye, BarChart, Menu, Home, Palette, ArrowLeft, Briefcase, Upload, Sparkles, Zap } from "lucide-react";
import { Link } from "wouter";

interface HeaderProps {
  onPreviewToggle: () => void;
  onExportPDF: () => void;
  onATSToggle: () => void;
  onTemplatesToggle: () => void;
  onBackToTemplateSelection?: () => void;
  onImportResume?: () => void;
  showPreview: boolean;
  showATSScore: boolean;
  showTemplates: boolean;
  isTemplateSelectionMode?: boolean;
}

export default function Header({ onPreviewToggle, onExportPDF, onATSToggle, onTemplatesToggle, onBackToTemplateSelection, onImportResume, showPreview, showATSScore, showTemplates, isTemplateSelectionMode = false }: HeaderProps) {
  return (
    <TooltipProvider>
    <header className="relative border-b bg-gradient-to-r from-slate-50 via-white to-slate-50 dark:from-slate-900 dark:via-slate-800 dark:to-slate-900 border-border/50 backdrop-blur-sm shadow-sm">
      {/* Decorative gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 via-purple-500/5 to-cyan-500/5 pointer-events-none" />
      
      <div className="relative flex flex-wrap items-center justify-between px-3 md:px-6 py-3 md:py-4 gap-2">
        <div className="flex items-center gap-2 md:gap-4 min-w-0 shrink-0">
          {/* Enhanced NewHire Logo */}
          <Link href="/" className="group flex items-center gap-2 md:gap-3 hover:scale-105 transition-all duration-300 shrink-0">
            <div className="relative">
              <div className="h-8 w-8 md:h-10 md:w-10 bg-gradient-to-br from-blue-600 via-purple-600 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:rotate-3">
                <Briefcase className="h-4 w-4 md:h-5 md:w-5 text-white" />
              </div>
              <div className="absolute -top-1 -right-1 h-3 w-3 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full opacity-80 animate-pulse">
                <Sparkles className="h-2 w-2 text-white m-0.5" />
              </div>
            </div>
            <div className="flex flex-col">
              <h1 className="text-xl md:text-2xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-cyan-600 bg-clip-text text-transparent truncate leading-tight group-hover:scale-105 transition-transform duration-300">
                NewHire
              </h1>
              <span className="text-xs text-muted-foreground font-medium tracking-wide hidden md:block">
                AI Resume Builder
              </span>
            </div>
          </Link>
          
          {/* Enhanced Back to Template Selection Button */}
          {!isTemplateSelectionMode && onBackToTemplateSelection && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onBackToTemplateSelection}
                  data-testid="button-back-to-templates"
                  className="group gap-1 md:gap-2 text-xs md:text-sm shrink-0 bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-purple-50 border-slate-200 hover:border-blue-300 transition-all duration-300 hover:scale-105 hover:shadow-md"
                >
                  <ArrowLeft className="h-3 w-3 md:h-4 md:w-4 group-hover:text-blue-600 transition-colors duration-300 group-hover:-translate-x-1" />
                  <span className="hidden sm:inline group-hover:text-blue-600 font-medium transition-colors duration-300">Change Template</span>
                </Button>
              </TooltipTrigger>
              <TooltipContent className="sm:hidden">
                <p>Back to Template Selection</p>
              </TooltipContent>
            </Tooltip>
          )}
          
          {/* Enhanced Template Toggle with Icon */}
          {!isTemplateSelectionMode && (
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={onTemplatesToggle}
                  data-testid="button-templates-toggle"
                  className={`group shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                    showTemplates 
                      ? 'bg-gradient-to-r from-purple-100 to-pink-100 border-purple-300 text-purple-700' 
                      : 'bg-gradient-to-r from-slate-50 to-slate-100 hover:from-purple-50 hover:to-pink-50 border-slate-200 hover:border-purple-300'
                  }`}
                  aria-expanded={showTemplates}
                  aria-controls="template-sidebar"
                >
                  <Palette className={`h-4 w-4 transition-all duration-300 group-hover:rotate-12 ${
                    showTemplates ? 'text-purple-700' : 'group-hover:text-purple-600'
                  }`} />
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
              {/* Enhanced Import Resume Button */}
              {onImportResume && (
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={onImportResume}
                      data-testid="button-import-resume"
                      className="group gap-1 md:gap-2 text-xs md:text-sm shrink-0 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-green-200 hover:border-green-300 transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                      <Upload className="h-3 w-3 md:h-4 md:w-4 group-hover:text-green-600 transition-all duration-300 group-hover:-translate-y-1" />
                      <span className="hidden sm:inline group-hover:text-green-600 font-medium transition-colors duration-300">Import</span>
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Import Existing Resume</p>
                  </TooltipContent>
                </Tooltip>
              )}
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={onPreviewToggle}
                    data-testid="button-preview-toggle"
                    className={`group gap-1 md:gap-2 text-xs md:text-sm shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                      showPreview
                        ? 'bg-gradient-to-r from-blue-100 to-cyan-100 border-blue-300 text-blue-700'
                        : 'bg-gradient-to-r from-slate-50 to-slate-100 hover:from-blue-50 hover:to-cyan-50 border-slate-200 hover:border-blue-300'
                    }`}
                  >
                    <Eye className={`h-3 w-3 md:h-4 md:w-4 transition-all duration-300 group-hover:scale-110 ${
                      showPreview ? 'text-blue-700' : 'group-hover:text-blue-600'
                    }`} />
                    <span className={`hidden sm:inline font-medium transition-colors duration-300 ${
                      showPreview ? 'text-blue-700' : 'group-hover:text-blue-600'
                    }`}>
                      {showPreview ? 'Hide Preview' : 'Show Preview'}
                    </span>
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
                    className={`group gap-1 md:gap-2 text-xs md:text-sm shrink-0 transition-all duration-300 hover:scale-105 hover:shadow-md ${
                      showATSScore
                        ? 'bg-gradient-to-r from-amber-100 to-yellow-100 border-amber-300 text-amber-700'
                        : 'bg-gradient-to-r from-slate-50 to-slate-100 hover:from-amber-50 hover:to-yellow-50 border-slate-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="relative">
                      <BarChart className={`h-3 w-3 md:h-4 md:w-4 transition-all duration-300 group-hover:scale-110 ${
                        showATSScore ? 'text-amber-700' : 'group-hover:text-amber-600'
                      }`} />
                      {showATSScore && (
                        <Zap className="absolute -top-1 -right-1 h-2 w-2 text-amber-500 animate-ping" />
                      )}
                    </div>
                    <span className={`hidden sm:inline font-medium transition-colors duration-300 ${
                      showATSScore ? 'text-amber-700' : 'group-hover:text-amber-600'
                    }`}>
                      {showATSScore ? 'Hide ATS Score' : 'Show ATS Score'}
                    </span>
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
                    className="group shrink-0 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-white/10 to-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <Download className="h-4 w-4 transition-all duration-300 group-hover:scale-110 group-hover:-translate-y-0.5 relative z-10" />
                    <span className="hidden md:inline ml-2 font-medium relative z-10">Download</span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Download PDF Resume</p>
                </TooltipContent>
              </Tooltip>
            </>
          )}
          
          {/* Enhanced Template selection mode header */}
          {isTemplateSelectionMode && (
            <div className="flex items-center gap-2 text-sm md:text-base">
              <div className="flex items-center gap-1">
                <Sparkles className="h-4 w-4 text-purple-500 animate-pulse" />
                <span className="bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent font-semibold">
                  <span className="hidden sm:inline">Choose your perfect template design</span>
                  <span className="sm:hidden">Choose template</span>
                </span>
              </div>
              <div className="hidden md:flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full text-xs font-medium text-purple-700 border border-purple-200">
                <Palette className="h-3 w-3" />
                <span>Step 2 of 3</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
    </TooltipProvider>
  );
}
import Header from '../Header';

export default function HeaderExample() {
  return (
    <div className="min-h-screen bg-background">
      <Header 
        onPreviewToggle={() => console.log('Preview toggled')}
        onExportPDF={() => console.log('PDF export triggered')}
        onATSToggle={() => console.log('ATS Score toggled')}
        onTemplatesToggle={() => console.log('Templates toggled')}
        onBackToTemplateSelection={() => console.log('Back to template selection')}
        showPreview={false}
        showATSScore={false}
        showTemplates={false}
        isTemplateSelectionMode={false}
      />
      <div className="p-8">
        <h2 className="text-2xl font-bold mb-4">Header Example</h2>
        <p className="text-muted-foreground">
          This shows the fixed header buttons with the new "Change Template" back button. 
          The buttons no longer have redundant text and include clean navigation options.
        </p>
      </div>
    </div>
  );
}
import TemplateSelector, { Template } from '../TemplateSelector';
import { useState } from 'react';

// todo: remove mock functionality
const mockTemplates: Template[] = [
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
  }
];

export default function TemplateSelectorExample() {
  const [selectedTemplate, setSelectedTemplate] = useState('cascade');
  const [selectedCategory, setSelectedCategory] = useState('all');

  return (
    <div className="h-96 w-80">
      <TemplateSelector
        templates={mockTemplates}
        selectedTemplate={selectedTemplate}
        onTemplateSelect={setSelectedTemplate}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
      />
    </div>
  );
}
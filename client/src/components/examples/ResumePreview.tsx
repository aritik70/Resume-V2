import ResumePreview from '../ResumePreview';
import { ResumeData } from '../ResumeForm';
import { Template } from '../TemplateSelector';

// todo: remove mock functionality
const mockData: ResumeData = {
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarah-johnson',
    website: 'sarahjohnson.dev',
    summary: 'Experienced software engineer with 5+ years building scalable web applications and leading cross-functional teams to deliver innovative solutions.',
    photo: ''
  },
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      duration: 'Jan 2022 - Present',
      description: 'Led development of microservices architecture serving 1M+ users. Improved system performance by 40% through code optimization and caching strategies.'
    }
  ],
  education: [
    {
      id: '1',
      degree: 'Bachelor of Science in Computer Science',
      school: 'University of California, Berkeley',
      year: '2019',
      description: 'Graduated Magna Cum Laude'
    }
  ],
  skills: ['JavaScript', 'React', 'Node.js', 'Python', 'AWS', 'Docker'],
  certifications: [],
  projects: [],
  languages: [],
  customSections: [],
  sectionOrder: ['personalInfo', 'experience', 'education', 'skills']
};

const mockTemplate: Template = {
  id: 'modern-pro',
  name: 'Modern Pro',
  category: 'modern',
  description: 'Contemporary design with subtle accents',
  colors: ['#10B981', '#6B7280', '#F59E0B'],
  fontFamily: 'sans'
};

export default function ResumePreviewExample() {
  return (
    <div className="h-96 overflow-auto">
      <ResumePreview data={mockData} template={mockTemplate} />
    </div>
  );
}
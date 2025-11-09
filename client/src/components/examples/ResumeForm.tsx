import ResumeForm, { ResumeData } from '../ResumeForm';
import { useState } from 'react';

// todo: remove mock functionality
const mockData: ResumeData = {
  personalInfo: {
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@email.com',
    phone: '(555) 123-4567',
    location: 'San Francisco, CA',
    linkedin: 'linkedin.com/in/sarah-johnson',
    website: 'sarahjohnson.dev',
    summary: 'Experienced software engineer with 5+ years building scalable web applications and leading cross-functional teams.',
    photo: ''
  },
  experience: [
    {
      id: '1',
      title: 'Senior Software Engineer',
      company: 'Tech Company Inc.',
      duration: 'Jan 2022 - Present',
      description: 'Led development of microservices architecture serving 1M+ users. Improved system performance by 40% through optimization.'
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

export default function ResumeFormExample() {
  const [data, setData] = useState<ResumeData>(mockData);

  return (
    <div className="h-96 w-96">
      <ResumeForm data={data} onChange={setData} />
    </div>
  );
}
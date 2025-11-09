import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RichTextEditor } from "@/components/ui/rich-text-editor";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MonthYearPicker } from "@/components/ui/month-year-picker";
import { Plus, Minus, User, Briefcase, GraduationCap, Award, BadgeCheck, FolderOpen, Globe, Camera, X, Edit3, GripVertical } from "lucide-react";

export interface ResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin: string;
    website: string;
    summary: string;
    photo: string;
  };
  experience: Array<{
    id: string;
    title: string;
    company: string;
    duration: string;
    description: string;
  }>;
  education: Array<{
    id: string;
    degree: string;
    school: string;
    year: string;
    description: string;
  }>;
  skills: string[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
    expiryDate: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies: string;
    link: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
  customSections: Array<{
    id: string;
    title: string;
    content: string;
  }>;
  sectionOrder: string[];
}

interface ResumeFormProps {
  data: ResumeData;
  onChange: (data: ResumeData) => void;
}

export default function ResumeForm({ data, onChange }: ResumeFormProps) {
  // Accordion state - tracks which section is currently open
  const [openSection, setOpenSection] = useState<string>('personal');

  // Date utility functions
  const parseDateFromString = (dateString: string): { date?: Date; isPresent: boolean } => {
    if (!dateString) return { isPresent: false };
    if (dateString.toLowerCase().includes('present') || dateString.toLowerCase().includes('current')) {
      return { isPresent: true };
    }
    
    // Try to parse various date formats
    const patterns = [
      /^(\w+)\s+(\d{4})$/, // "Jan 2020", "January 2020"
      /^(\d{1,2})\/(\d{4})$/, // "01/2020"
      /^(\d{4})-(\d{1,2})$/, // "2020-01"
    ];
    
    for (const pattern of patterns) {
      const match = dateString.match(pattern);
      if (match) {
        const [, monthStr, yearStr] = match;
        const year = parseInt(yearStr);
        let month = 0;
        
        if (isNaN(parseInt(monthStr))) {
          // Parse month name
          const monthNames = ['january', 'february', 'march', 'april', 'may', 'june',
                             'july', 'august', 'september', 'october', 'november', 'december'];
          const shortMonthNames = ['jan', 'feb', 'mar', 'apr', 'may', 'jun',
                                  'jul', 'aug', 'sep', 'oct', 'nov', 'dec'];
          const monthIndex = monthNames.findIndex(m => m.startsWith(monthStr.toLowerCase())) ||
                           shortMonthNames.findIndex(m => m === monthStr.toLowerCase());
          if (monthIndex !== -1) month = monthIndex;
        } else {
          month = parseInt(monthStr) - 1; // Convert to 0-based index
        }
        
        return { date: new Date(year, month, 1), isPresent: false };
      }
    }
    
    return { isPresent: false };
  };
  
  const formatDateToString = (date: Date | undefined, isPresent: boolean): string => {
    if (isPresent) return 'Present';
    if (!date) return '';
    const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                       'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    return `${monthNames[date.getMonth()]} ${date.getFullYear()}`;
  };
  
  const formatDateRange = (startDate: Date | undefined, startPresent: boolean, 
                          endDate: Date | undefined, endPresent: boolean): string => {
    const start = formatDateToString(startDate, startPresent);
    const end = formatDateToString(endDate, endPresent);
    if (!start && !end) return '';
    if (!end || endPresent) return `${start} - Present`;
    return `${start} - ${end}`;
  };
  
  // Defensive defaults for safe operations
  const customSections = data.customSections ?? [];
  const currentSectionOrder = Array.isArray(data.sectionOrder) ? data.sectionOrder : [];
  const updatePersonalInfo = (field: string, value: string) => {
    onChange({
      ...data,
      personalInfo: { ...data.personalInfo, [field]: value }
    });
  };

  const addExperience = () => {
    const newExp = {
      id: Date.now().toString(),
      title: '',
      company: '',
      duration: '',
      description: ''
    };
    onChange({
      ...data,
      experience: [...data.experience, newExp]
    });
  };

  const updateExperience = (id: string, field: string, value: string) => {
    const updated = data.experience.map(exp => 
      exp.id === id ? { ...exp, [field]: value } : exp
    );
    onChange({ ...data, experience: updated });
  };

  const removeExperience = (id: string) => {
    onChange({
      ...data,
      experience: data.experience.filter(exp => exp.id !== id)
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: Date.now().toString(),
      degree: '',
      school: '',
      year: '',
      description: ''
    };
    onChange({
      ...data,
      education: [...data.education, newEdu]
    });
  };

  const updateEducation = (id: string, field: string, value: string) => {
    const updated = data.education.map(edu => 
      edu.id === id ? { ...edu, [field]: value } : edu
    );
    onChange({ ...data, education: updated });
  };

  const removeEducation = (id: string) => {
    onChange({
      ...data,
      education: data.education.filter(edu => edu.id !== id)
    });
  };

  const updateSkills = (skillsText: string) => {
    const skills = skillsText.split(',').map(s => s.trim()).filter(s => s);
    onChange({ ...data, skills });
  };

  const addSkill = () => {
    if (data.skills.length === 0 || data.skills[data.skills.length - 1].trim() !== '') {
      onChange({ ...data, skills: [...data.skills, ''] });
    }
  };

  const updateSkill = (index: number, value: string) => {
    const updated = [...data.skills];
    updated[index] = value;
    onChange({ ...data, skills: updated });
  };

  const removeSkill = (index: number) => {
    const updated = data.skills.filter((_, i) => i !== index);
    onChange({ ...data, skills: updated });
  };

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const result = e.target?.result as string;
        updatePersonalInfo('photo', result);
      };
      reader.readAsDataURL(file);
    }
  };

  const addCertification = () => {
    const newCert = {
      id: Date.now().toString(),
      name: '',
      issuer: '',
      date: '',
      expiryDate: ''
    };
    onChange({
      ...data,
      certifications: [...data.certifications, newCert]
    });
  };

  const updateCertification = (id: string, field: string, value: string) => {
    const updated = data.certifications.map(cert => 
      cert.id === id ? { ...cert, [field]: value } : cert
    );
    onChange({ ...data, certifications: updated });
  };

  const removeCertification = (id: string) => {
    onChange({
      ...data,
      certifications: data.certifications.filter(cert => cert.id !== id)
    });
  };

  const addProject = () => {
    const newProject = {
      id: Date.now().toString(),
      name: '',
      description: '',
      technologies: '',
      link: ''
    };
    onChange({
      ...data,
      projects: [...data.projects, newProject]
    });
  };

  const updateProject = (id: string, field: string, value: string) => {
    const updated = data.projects.map(project => 
      project.id === id ? { ...project, [field]: value } : project
    );
    onChange({ ...data, projects: updated });
  };

  const removeProject = (id: string) => {
    onChange({
      ...data,
      projects: data.projects.filter(project => project.id !== id)
    });
  };

  const addLanguage = () => {
    const newLang = {
      id: Date.now().toString(),
      name: '',
      proficiency: ''
    };
    onChange({
      ...data,
      languages: [...data.languages, newLang]
    });
  };

  const updateLanguage = (id: string, field: string, value: string) => {
    const updated = data.languages.map(lang => 
      lang.id === id ? { ...lang, [field]: value } : lang
    );
    onChange({ ...data, languages: updated });
  };

  const removeLanguage = (id: string) => {
    onChange({
      ...data,
      languages: data.languages.filter(lang => lang.id !== id)
    });
  };

  // Custom sections management
  const addCustomSection = (sectionType: string = 'custom') => {
    const predefinedTitles: { [key: string]: string } = {
      'interests': 'Interests',
      'achievements': 'Achievements & Awards',
      'references': 'References', 
      'signature': 'Signature',
      'custom': ''
    };
    
    const newSection = {
      id: Date.now().toString(),
      title: predefinedTitles[sectionType] || '',
      content: ''
    };
    const newSectionId = `custom-${newSection.id}`;
    // Ensure new custom sections are always added at the end
    const updatedOrder = [...currentSectionOrder, newSectionId];
    onChange({
      ...data,
      customSections: [...customSections, newSection],
      sectionOrder: updatedOrder
    });
  };

  const updateCustomSection = (id: string, field: string, value: string) => {
    const updated = customSections.map(section => 
      section.id === id ? { ...section, [field]: value } : section
    );
    onChange({ ...data, customSections: updated });
  };

  const removeCustomSection = (id: string) => {
    const updatedCustomSections = customSections.filter(section => section.id !== id);
    const updatedSectionOrder = currentSectionOrder.filter(sectionId => sectionId !== `custom-${id}`);
    onChange({
      ...data,
      customSections: updatedCustomSections,
      sectionOrder: normalizeOrder(updatedCustomSections, updatedSectionOrder)
    });
  };

  // Section order normalization utility
  const defaultSectionOrder = ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
  
  const normalizeOrder = (currentCustomSections: Array<{id: string}>, currentOrder: string[]) => {
    const customSectionIds = currentCustomSections.map(s => `custom-${s.id}`);
    const allValidIds = [...defaultSectionOrder, ...customSectionIds];
    
    // Filter out invalid IDs from current order
    const validExistingOrder = currentOrder.filter(id => allValidIds.includes(id));
    
    // Find missing sections
    const missingBaseIds = defaultSectionOrder.filter(id => !validExistingOrder.includes(id));
    const missingCustomIds = customSectionIds.filter(id => !validExistingOrder.includes(id));
    
    // If no missing base sections, just append missing custom sections to maintain order
    if (missingBaseIds.length === 0) {
      return [...validExistingOrder, ...missingCustomIds];
    }
    
    // Insert missing base sections in their proper position within the default order
    // while preserving the position of existing custom sections
    const result = [...validExistingOrder];
    
    // Split result into base sections and custom sections
    const baseSectionsInOrder = result.filter(id => defaultSectionOrder.includes(id));
    const customSectionsInOrder = result.filter(id => id.startsWith('custom-'));
    
    // Create a properly ordered base section list with missing ones inserted
    const completeBaseOrder = [];
    for (const baseId of defaultSectionOrder) {
      if (baseSectionsInOrder.includes(baseId) || missingBaseIds.includes(baseId)) {
        completeBaseOrder.push(baseId);
      }
    }
    
    // Combine: complete base order + existing custom sections + new custom sections
    return [...completeBaseOrder, ...customSectionsInOrder, ...missingCustomIds];
  };

  // Normalized section order for rendering
  const sectionOrder = normalizeOrder(customSections, currentSectionOrder);

  // Drag and drop state
  const [draggedSection, setDraggedSection] = useState<string | null>(null);
  const [touchStartY, setTouchStartY] = useState<number>(0);
  const [isDragging, setIsDragging] = useState<boolean>(false);

  // Desktop drag and drop handlers
  const handleDragStart = (e: React.DragEvent, sectionId: string) => {
    setDraggedSection(sectionId);
    e.dataTransfer.effectAllowed = 'move';
    e.dataTransfer.setData('text/plain', sectionId);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
  };

  const handleDrop = (e: React.DragEvent, targetSectionId: string) => {
    e.preventDefault();
    if (!draggedSection || draggedSection === targetSectionId) {
      setDraggedSection(null);
      return;
    }

    reorderSections(draggedSection, targetSectionId);
    setDraggedSection(null);
  };

  const handleDragEnd = () => {
    setDraggedSection(null);
  };

  // Touch handlers for mobile
  const handleTouchStart = (e: React.TouchEvent, sectionId: string) => {
    const touch = e.touches[0];
    setTouchStartY(touch.clientY);
    setDraggedSection(sectionId);
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!draggedSection) return;
    
    const touch = e.touches[0];
    const deltaY = Math.abs(touch.clientY - touchStartY);
    
    // Start dragging if moved more than 10px
    if (deltaY > 10 && !isDragging) {
      setIsDragging(true);
      e.preventDefault(); // Prevent scrolling
    }
    
    if (isDragging) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: React.TouchEvent, targetSectionId?: string) => {
    if (!draggedSection || !isDragging) {
      setDraggedSection(null);
      setIsDragging(false);
      return;
    }

    // Find the element under the touch point
    const touch = e.changedTouches[0];
    const elementBelow = document.elementFromPoint(touch.clientX, touch.clientY);
    const sectionElement = elementBelow?.closest('[data-section-id]');
    const targetId = sectionElement?.getAttribute('data-section-id');
    
    if (targetId && targetId !== draggedSection) {
      reorderSections(draggedSection, targetId);
    }
    
    setDraggedSection(null);
    setIsDragging(false);
  };

  // Shared reorder logic
  const reorderSections = (draggedId: string, targetId: string) => {
    const currentIndex = sectionOrder.indexOf(draggedId);
    const targetIndex = sectionOrder.indexOf(targetId);
    
    if (currentIndex !== -1 && targetIndex !== -1) {
      const newOrder = [...sectionOrder];
      newOrder.splice(currentIndex, 1);
      newOrder.splice(targetIndex, 0, draggedId);
      onChange({ ...data, sectionOrder: newOrder });
    }
  };


  // Get section info for accordion rendering
  const getSectionInfo = (sectionId: string) => {
    const sectionMap = {
      personal: { icon: User, title: 'Personal Information' },
      experience: { icon: Briefcase, title: 'Work Experience' },
      education: { icon: GraduationCap, title: 'Education' },
      skills: { icon: Award, title: 'Skills' },
      certifications: { icon: BadgeCheck, title: 'Certifications' },
      projects: { icon: FolderOpen, title: 'Projects' },
      languages: { icon: Globe, title: 'Languages' },
    };
    
    if (sectionId.startsWith('custom-')) {
      const customId = sectionId.replace('custom-', '');
      const customSection = customSections.find(s => s.id === customId);
      return {
        icon: Edit3,
        title: customSection?.title || 'Custom Section'
      };
    }
    
    return sectionMap[sectionId] || { icon: Edit3, title: 'Unknown Section' };
  };

  // Section renderers - now return content only, not full cards
  const renderPersonalSectionContent = () => (
    <div className="space-y-4 p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="fullName">Full Name</Label>
          <Input
            id="fullName"
            value={data.personalInfo.fullName}
            onChange={(e) => updatePersonalInfo('fullName', e.target.value)}
            data-testid="input-full-name"
          />
        </div>
        <div>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            type="email"
            value={data.personalInfo.email}
            onChange={(e) => updatePersonalInfo('email', e.target.value)}
            data-testid="input-email"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="phone">Phone</Label>
          <Input
            id="phone"
            value={data.personalInfo.phone}
            onChange={(e) => updatePersonalInfo('phone', e.target.value)}
            data-testid="input-phone"
          />
        </div>
        <div>
          <Label htmlFor="location">Location</Label>
          <Input
            id="location"
            value={data.personalInfo.location}
            onChange={(e) => updatePersonalInfo('location', e.target.value)}
            data-testid="input-location"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <Label htmlFor="linkedin">LinkedIn</Label>
          <Input
            id="linkedin"
            value={data.personalInfo.linkedin}
            onChange={(e) => updatePersonalInfo('linkedin', e.target.value)}
            placeholder="linkedin.com/in/your-profile"
            data-testid="input-linkedin"
          />
        </div>
        <div>
          <Label htmlFor="website">Website/Portfolio</Label>
          <Input
            id="website"
            value={data.personalInfo.website}
            onChange={(e) => updatePersonalInfo('website', e.target.value)}
            placeholder="yourwebsite.com"
            data-testid="input-website"
          />
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="photo">Profile Photo</Label>
        <div className="flex items-center gap-4">
          <input
            type="file"
            id="photo"
            accept="image/*"
            onChange={handlePhotoUpload}
            className="hidden"
          />
          <Button
            type="button"
            variant="outline"
            onClick={() => document.getElementById('photo')?.click()}
            className="flex items-center gap-2"
            data-testid="button-upload-photo"
          >
            <Camera className="h-4 w-4" />
            Upload Photo
          </Button>
          {data.personalInfo.photo && (
            <div className="flex items-center gap-2">
              <img
                src={data.personalInfo.photo}
                alt="Profile"
                className="w-10 h-10 rounded-full object-cover"
              />
              <Button
                size="sm"
                variant="ghost"
                onClick={() => updatePersonalInfo('photo', '')}
                data-testid="button-remove-photo"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
      <div>
        <Label>Professional Summary</Label>
        <RichTextEditor
          value={data.personalInfo.summary}
          onChange={(value) => updatePersonalInfo('summary', value)}
          data-testid="textarea-summary"
          className="min-h-20"
        />
      </div>
    </div>
  );

  const renderExperienceSectionContent = () => (
    <div className="space-y-4 p-4">
      {data.experience.map((exp, index) => (
        <div key={exp.id} className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">Experience {index + 1}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeExperience(exp.id)}
              data-testid={`button-remove-experience-${index}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Job Title"
              value={exp.title}
              onChange={(e) => updateExperience(exp.id, 'title', e.target.value)}
              data-testid={`input-experience-title-${index}`}
            />
            <Input
              placeholder="Company"
              value={exp.company}
              onChange={(e) => updateExperience(exp.id, 'company', e.target.value)}
              data-testid={`input-experience-company-${index}`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Start Date</Label>
              <MonthYearPicker
                date={parseDateFromString(exp.duration.split(' - ')[0] || '').date}
                onDateChange={(date) => {
                  const endPart = exp.duration.split(' - ')[1] || '';
                  const { date: endDate, isPresent: endPresent } = parseDateFromString(endPart);
                  const newDuration = formatDateRange(date, false, endDate, endPresent);
                  updateExperience(exp.id, 'duration', newDuration);
                }}
                placeholder="Start date"
                className="w-full"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <MonthYearPicker
                date={parseDateFromString(exp.duration.split(' - ')[1] || '').date}
                isPresent={parseDateFromString(exp.duration.split(' - ')[1] || '').isPresent}
                onDateChange={(date) => {
                  const startPart = exp.duration.split(' - ')[0] || '';
                  const { date: startDate } = parseDateFromString(startPart);
                  const newDuration = formatDateRange(startDate, false, date, false);
                  updateExperience(exp.id, 'duration', newDuration);
                }}
                onPresentChange={(isPresent) => {
                  const startPart = exp.duration.split(' - ')[0] || '';
                  const { date: startDate } = parseDateFromString(startPart);
                  const newDuration = formatDateRange(startDate, false, undefined, isPresent);
                  updateExperience(exp.id, 'duration', newDuration);
                }}
                placeholder="End date"
                allowPresent={true}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <Label>Job Description & Achievements</Label>
            <RichTextEditor
              value={exp.description}
              onChange={(value) => updateExperience(exp.id, 'description', value)}
              placeholder="Job description and achievements..."
              data-testid={`textarea-experience-description-${index}`}
              className="min-h-16"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderEducationSectionContent = () => (
    <div className="space-y-4 p-4">
      {data.education.map((edu, index) => (
        <div key={edu.id} className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">Education {index + 1}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeEducation(edu.id)}
              data-testid={`button-remove-education-${index}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Degree"
              value={edu.degree}
              onChange={(e) => updateEducation(edu.id, 'degree', e.target.value)}
              data-testid={`input-education-degree-${index}`}
            />
            <Input
              placeholder="School/University"
              value={edu.school}
              onChange={(e) => updateEducation(edu.id, 'school', e.target.value)}
              data-testid={`input-education-school-${index}`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Start Date</Label>
              <MonthYearPicker
                date={parseDateFromString(edu.year.split(' - ')[0] || edu.year.split('-')[0] || '').date}
                onDateChange={(date) => {
                  const endPart = edu.year.split(' - ')[1] || edu.year.split('-')[1] || '';
                  const { date: endDate, isPresent: endPresent } = parseDateFromString(endPart);
                  const newYear = formatDateRange(date, false, endDate, endPresent);
                  updateEducation(edu.id, 'year', newYear);
                }}
                placeholder="Start date"
                className="w-full"
              />
            </div>
            <div>
              <Label>End Date</Label>
              <MonthYearPicker
                date={parseDateFromString(edu.year.split(' - ')[1] || edu.year.split('-')[1] || '').date}
                isPresent={parseDateFromString(edu.year.split(' - ')[1] || edu.year.split('-')[1] || '').isPresent}
                onDateChange={(date) => {
                  const startPart = edu.year.split(' - ')[0] || edu.year.split('-')[0] || '';
                  const { date: startDate } = parseDateFromString(startPart);
                  const newYear = formatDateRange(startDate, false, date, false);
                  updateEducation(edu.id, 'year', newYear);
                }}
                onPresentChange={(isPresent) => {
                  const startPart = edu.year.split(' - ')[0] || edu.year.split('-')[0] || '';
                  const { date: startDate } = parseDateFromString(startPart);
                  const newYear = formatDateRange(startDate, false, undefined, isPresent);
                  updateEducation(edu.id, 'year', newYear);
                }}
                placeholder="End date"
                allowPresent={true}
                className="w-full"
              />
            </div>
          </div>
          <div>
            <Label>Additional Details (optional)</Label>
            <RichTextEditor
              value={edu.description}
              onChange={(value) => updateEducation(edu.id, 'description', value)}
              placeholder="Additional details (optional)..."
              data-testid={`textarea-education-description-${index}`}
              className="min-h-16"
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderSkillsSectionContent = () => (
    <div className="space-y-4 p-4">
      {data.skills.map((skill, index) => (
        <div key={index} className="flex items-center gap-2">
          <Input
            placeholder="Skill"
            value={skill}
            onChange={(e) => updateSkill(index, e.target.value)}
            data-testid={`input-skill-${index}`}
            className="flex-1"
          />
          <Button
            size="sm"
            variant="outline"
            onClick={() => removeSkill(index)}
            data-testid={`button-remove-skill-${index}`}
          >
            <Minus className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <div className="pt-2">
        <Label>Or add multiple skills (comma-separated)</Label>
        <Textarea
          placeholder="JavaScript, React, Node.js, Python..."
          onChange={(e) => updateSkills(e.target.value)}
          data-testid="textarea-skills-bulk"
          className="min-h-16"
        />
      </div>
    </div>
  );

  const renderCertificationsSectionContent = () => (
    <div className="space-y-4 p-4">
      {data.certifications.map((cert, index) => (
        <div key={cert.id} className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">Certification {index + 1}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeCertification(cert.id)}
              data-testid={`button-remove-certification-${index}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Certification Name"
              value={cert.name}
              onChange={(e) => updateCertification(cert.id, 'name', e.target.value)}
              data-testid={`input-certification-name-${index}`}
            />
            <Input
              placeholder="Issuing Organization"
              value={cert.issuer}
              onChange={(e) => updateCertification(cert.id, 'issuer', e.target.value)}
              data-testid={`input-certification-issuer-${index}`}
            />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <Label>Issue Date</Label>
              <MonthYearPicker
                date={parseDateFromString(cert.date).date}
                onDateChange={(date) => {
                  const dateStr = formatDateToString(date, false);
                  updateCertification(cert.id, 'date', dateStr);
                }}
                placeholder="Issue date"
                className="w-full"
              />
            </div>
            <div>
              <Label>Expiry Date (optional)</Label>
              <MonthYearPicker
                date={parseDateFromString(cert.expiryDate).date}
                onDateChange={(date) => {
                  const dateStr = formatDateToString(date, false);
                  updateCertification(cert.id, 'expiryDate', dateStr);
                }}
                placeholder="Expiry date"
                className="w-full"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderProjectsSectionContent = () => (
    <div className="space-y-4 p-4">
      {data.projects.map((project, index) => (
        <div key={project.id} className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">Project {index + 1}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeProject(project.id)}
              data-testid={`button-remove-project-${index}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <Input
            placeholder="Project Name"
            value={project.name}
            onChange={(e) => updateProject(project.id, 'name', e.target.value)}
            data-testid={`input-project-name-${index}`}
          />
          <Textarea
            placeholder="Project Description"
            value={project.description}
            onChange={(e) => updateProject(project.id, 'description', e.target.value)}
            data-testid={`textarea-project-description-${index}`}
            className="min-h-16"
          />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Technologies Used"
              value={project.technologies}
              onChange={(e) => updateProject(project.id, 'technologies', e.target.value)}
              data-testid={`input-project-technologies-${index}`}
            />
            <Input
              placeholder="Project Link (optional)"
              value={project.link}
              onChange={(e) => updateProject(project.id, 'link', e.target.value)}
              data-testid={`input-project-link-${index}`}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderLanguagesSectionContent = () => (
    <div className="space-y-4 p-4">
      {data.languages.map((lang, index) => (
        <div key={lang.id} className="border rounded-md p-4 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-sm font-medium">Language {index + 1}</span>
            <Button
              size="sm"
              variant="outline"
              onClick={() => removeLanguage(lang.id)}
              data-testid={`button-remove-language-${index}`}
            >
              <Minus className="h-4 w-4" />
            </Button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="Language"
              value={lang.name}
              onChange={(e) => updateLanguage(lang.id, 'name', e.target.value)}
              data-testid={`input-language-name-${index}`}
            />
            <Input
              placeholder="Proficiency Level"
              value={lang.proficiency}
              onChange={(e) => updateLanguage(lang.id, 'proficiency', e.target.value)}
              data-testid={`input-language-proficiency-${index}`}
            />
          </div>
        </div>
      ))}
    </div>
  );

  const renderCustomSectionContent = (section: { id: string; title: string; content: string }) => (
    <div className="space-y-4 p-4">
      <div>
        <Label>Section Title</Label>
        <Input
          value={section.title}
          onChange={(e) => updateCustomSection(section.id, 'title', e.target.value)}
          placeholder="Enter section title..."
          data-testid={`input-custom-section-title-${section.id}`}
        />
      </div>
      <div>
        <Label>Content</Label>
        <RichTextEditor
          value={section.content}
          onChange={(value) => updateCustomSection(section.id, 'content', value)}
          placeholder="Enter section content..."
          className="min-h-20"
        />
      </div>
    </div>
  );


  // Dynamic section content rendering for accordion
  const renderSectionContent = (sectionId: string) => {
    switch (sectionId) {
      case 'personal':
        return renderPersonalSectionContent();
      case 'experience':
        return renderExperienceSectionContent();
      case 'education':
        return renderEducationSectionContent();
      case 'skills':
        return renderSkillsSectionContent();
      case 'certifications':
        return renderCertificationsSectionContent();
      case 'projects':
        return renderProjectsSectionContent();
      case 'languages':
        return renderLanguagesSectionContent();
      default:
        if (sectionId.startsWith('custom-')) {
          const customId = sectionId.replace('custom-', '');
          const customSection = customSections.find(s => s.id === customId);
          return customSection ? renderCustomSectionContent(customSection) : null;
        }
        return null;
    }
  };

  return (
    <ScrollArea className="h-full">
      <div className="p-6">
        <div className="space-y-4">
          {sectionOrder.map(sectionId => {
            const { icon: Icon, title } = getSectionInfo(sectionId);
            return (
              <div 
                key={sectionId} 
                data-section-id={sectionId}
                className={`border rounded-lg shadow-sm bg-card hover:shadow-md transition-all duration-200 ${
                  draggedSection === sectionId ? 'opacity-50 scale-95' : ''
                } ${
                  draggedSection && draggedSection !== sectionId ? 'border-primary/50 border-dashed' : ''
                } ${
                  isDragging ? 'touch-none' : ''
                }`}
                draggable
                onDragStart={(e) => handleDragStart(e, sectionId)}
                onDragOver={handleDragOver}
                onDrop={(e) => handleDrop(e, sectionId)}
                onDragEnd={handleDragEnd}
                onTouchStart={(e) => handleTouchStart(e, sectionId)}
                onTouchMove={handleTouchMove}
                onTouchEnd={(e) => handleTouchEnd(e, sectionId)}
              >
                <div className="px-4 py-3 flex items-center justify-between w-full cursor-pointer hover:bg-muted/30 transition-colors rounded-t-lg group select-none" onClick={() => setOpenSection(openSection === sectionId ? '' : sectionId)}>
                  <div className="flex items-center gap-3">
                    <div 
                      className={`drag-handle transition-all duration-200 cursor-grab active:cursor-grabbing touch-manipulation ${
                        isDragging && draggedSection === sectionId 
                          ? 'opacity-100 scale-110 text-primary' 
                          : 'opacity-60 hover:opacity-90 md:opacity-40 md:group-hover:opacity-70'
                      }`}
                      onClick={(e) => e.stopPropagation()}
                      style={{ touchAction: 'none' }}
                    >
                      <GripVertical className="h-4 w-4" />
                    </div>
                    <Icon className="h-4 w-4 text-muted-foreground" />
                    <span className="font-medium">{title}</span>
                    {isDragging && draggedSection === sectionId && (
                      <span className="text-xs text-primary font-medium ml-2 animate-pulse">
                        Drag to reorder
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                    {/* Action buttons with better styling */}
                    <div className="flex items-center gap-1">
                      {sectionId === 'experience' && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            addExperience();
                            setOpenSection(sectionId);
                          }} 
                          data-testid="button-add-experience" 
                          className="h-7 px-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                      {sectionId === 'education' && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            addEducation();
                            setOpenSection(sectionId);
                          }} 
                          data-testid="button-add-education" 
                          className="h-7 px-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                      {sectionId === 'skills' && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            addSkill();
                            setOpenSection(sectionId);
                          }} 
                          data-testid="button-add-skill" 
                          className="h-7 px-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                      {sectionId === 'certifications' && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            addCertification();
                            setOpenSection(sectionId);
                          }} 
                          data-testid="button-add-certification" 
                          className="h-7 px-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                      {sectionId === 'projects' && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            addProject();
                            setOpenSection(sectionId);
                          }} 
                          data-testid="button-add-project" 
                          className="h-7 px-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                      {sectionId === 'languages' && (
                        <Button 
                          size="sm" 
                          onClick={(e) => {
                            e.stopPropagation();
                            addLanguage();
                            setOpenSection(sectionId);
                          }} 
                          data-testid="button-add-language" 
                          className="h-7 px-2 bg-primary/10 hover:bg-primary/20 text-primary border-primary/20 transition-colors"
                          variant="outline"
                        >
                          <Plus className="h-3 w-3 mr-1" />
                          Add
                        </Button>
                      )}
                      {sectionId.startsWith('custom-') && (
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={(e) => {
                            e.stopPropagation();
                            removeCustomSection(sectionId.replace('custom-', ''));
                          }}
                          className="h-7 w-7 p-0 border-destructive/20 bg-destructive/10 hover:bg-destructive/20 text-destructive transition-colors"
                          title="Remove Section"
                        >
                          <X className="h-3 w-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
                {openSection === sectionId && (
                  <div className="border-t">
                    {renderSectionContent(sectionId)}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        
        {/* Add Custom Section Options */}
        <Card className="mt-6 border-dashed border-2 hover:border-primary/30 transition-colors">
          <CardContent className="p-4">
            <div className="space-y-3">
              <h3 className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                <Plus className="h-3 w-3" />
                Add New Section
              </h3>
              <div className="grid grid-cols-2 gap-2">
                <Button 
                  onClick={() => addCustomSection('interests')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start h-8 text-xs hover:bg-accent/50 transition-colors"
                  data-testid="button-add-interests"
                >
                  <Plus className="h-3 w-3" />
                  Interests
                </Button>
                <Button 
                  onClick={() => addCustomSection('achievements')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start h-8 text-xs hover:bg-accent/50 transition-colors"
                  data-testid="button-add-achievements"
                >
                  <Plus className="h-3 w-3" />
                  Awards
                </Button>
                <Button 
                  onClick={() => addCustomSection('references')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start h-8 text-xs hover:bg-accent/50 transition-colors"
                  data-testid="button-add-references"
                >
                  <Plus className="h-3 w-3" />
                  References
                </Button>
                <Button 
                  onClick={() => addCustomSection('signature')} 
                  variant="outline" 
                  className="flex items-center gap-2 justify-start h-8 text-xs hover:bg-accent/50 transition-colors"
                  data-testid="button-add-signature"
                >
                  <Plus className="h-3 w-3" />
                  Signature
                </Button>
              </div>
              <Button 
                onClick={() => addCustomSection('custom')} 
                variant="outline" 
                className="w-full flex items-center gap-2 h-9 bg-muted/30 hover:bg-muted/50 transition-colors font-medium"
                data-testid="button-add-custom-section"
              >
                <Plus className="h-4 w-4" />
                Custom Section
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </ScrollArea>
  );
}
import { ResumeData } from '../components/ResumeForm';

// Define types for parsed resume data
export interface ParsedResumeData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    website?: string;
    summary?: string;
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
  }>;
  skills: string[];
  certifications: Array<{
    id: string;
    name: string;
    issuer: string;
    date: string;
  }>;
  projects: Array<{
    id: string;
    name: string;
    description: string;
    technologies?: string;
    link?: string;
  }>;
  languages: Array<{
    id: string;
    name: string;
    proficiency: string;
  }>;
}

class ResumeParserService {
  /**
   * Parse resume file and extract structured data
   */
  async parseResumeFile(file: File): Promise<ParsedResumeData> {
    let text = '';

    try {
      // Extract text based on file type
      switch (file.type) {
        case 'application/pdf':
          text = await this.extractTextFromPDF(file);
          break;
        case 'application/vnd.openxmlformats-officedocument.wordprocessingml.document':
        case 'application/msword':
          text = await this.extractTextFromDOCX(file);
          break;
        case 'text/plain':
          text = await this.extractTextFromTXT(file);
          break;
        default:
          throw new Error(`Unsupported file type: ${file.type}`);
      }

      // Parse the extracted text into structured data
      return this.parseTextToResumeData(text);
    } catch (error) {
      console.error('Error parsing resume:', error);
      // Re-throw the error if it's already user-friendly, otherwise provide a generic message
      if (error.message.includes('Unable to') || error.message.includes('Please')) {
        throw error;
      }
      throw new Error('Failed to parse resume. Please try a different file format or ensure your file is not corrupted.');
    }
  }

  /**
   * Extract text from PDF file using server-side parsing
   */
  private async extractTextFromPDF(file: File): Promise<string> {
    return this.extractTextUsingServer(file);
  }

  /**
   * Extract text from DOCX file using server-side parsing
   */
  private async extractTextFromDOCX(file: File): Promise<string> {
    return this.extractTextUsingServer(file);
  }

  /**
   * Extract text from TXT file
   */
  private async extractTextFromTXT(file: File): Promise<string> {
    try {
      return await file.text();
    } catch (error) {
      console.error('TXT parsing error:', error);
      throw new Error('Unable to read text file. Please ensure the file is not corrupted.');
    }
  }

  /**
   * Extract text using server-side API
   */
  private async extractTextUsingServer(file: File): Promise<string> {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await fetch('/api/parse-resume', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        throw new Error(errorData.error || `Server error: ${response.status}`);
      }

      const data = await response.json();
      return data.text || '';
    } catch (error) {
      console.error('Server-side parsing error:', error);
      if (error.message.includes('Server error') || error.message.includes('fetch')) {
        throw new Error('Unable to process the document. Please try again or use a different file format.');
      }
      throw error;
    }
  }

  /**
   * Parse extracted text into structured resume data
   */
  private parseTextToResumeData(text: string): ParsedResumeData {
    const normalizedText = this.normalizeText(text);
    
    return {
      personalInfo: this.extractPersonalInfo(normalizedText),
      experience: this.extractExperience(normalizedText),
      education: this.extractEducation(normalizedText),
      skills: this.extractSkills(normalizedText),
      certifications: this.extractCertifications(normalizedText),
      projects: this.extractProjects(normalizedText),
      languages: this.extractLanguages(normalizedText),
    };
  }

  /**
   * Normalize text for better parsing
   */
  private normalizeText(text: string): string {
    return text
      .replace(/\r\n/g, '\n')
      .replace(/\r/g, '\n')
      .replace(/\s+/g, ' ')
      .trim();
  }

  /**
   * Extract personal information
   */
  private extractPersonalInfo(text: string): ParsedResumeData['personalInfo'] {
    const lines = text.split('\n');
    
    // Extract name (usually the first substantial line)
    let fullName = '';
    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.length > 2 && !this.isContactInfo(trimmed) && !this.isCommonHeader(trimmed)) {
        fullName = trimmed;
        break;
      }
    }

    // Extract email
    const emailRegex = /\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g;
    const emailMatch = text.match(emailRegex);
    const email = emailMatch ? emailMatch[0] : '';

    // Extract phone
    const phoneRegex = /(?:\+?1[-.\s]?)?\(?([0-9]{3})\)?[-.\s]?([0-9]{3})[-.\s]?([0-9]{4})/g;
    const phoneMatch = text.match(phoneRegex);
    const phone = phoneMatch ? phoneMatch[0] : '';

    // Extract location (look for city, state patterns)
    const locationRegex = /([A-Za-z\s]+,\s*[A-Z]{2}(?:\s+\d{5})?)/g;
    const locationMatch = text.match(locationRegex);
    const location = locationMatch ? locationMatch[0] : '';

    // Extract LinkedIn
    const linkedinRegex = /(?:linkedin\.com\/in\/|linkedin\.com\/profile\/view\?id=)([A-Za-z0-9-]+)/gi;
    const linkedinMatch = text.match(linkedinRegex);
    const linkedin = linkedinMatch ? linkedinMatch[0] : '';

    // Extract website/portfolio
    const websiteRegex = /(?:https?:\/\/)?(?:www\.)?([A-Za-z0-9-]+(?:\.[A-Za-z]{2,})+(?:\/[^\s]*)?)/g;
    const websiteMatches = text.match(websiteRegex) || [];
    const website = websiteMatches.find(url => !url.includes('linkedin.com') && !url.includes('mailto:')) || '';

    // Extract summary/objective (look for summary-like sections)
    const summary = this.extractSummary(text);

    return {
      fullName,
      email,
      phone,
      location,
      linkedin,
      website,
      summary,
    };
  }

  /**
   * Extract professional summary
   */
  private extractSummary(text: string): string {
    const summaryHeaders = [
      'summary', 'professional summary', 'profile', 'objective', 
      'career objective', 'about', 'overview', 'bio', 'biography'
    ];

    const lines = text.split('\n');
    let summaryStartIndex = -1;
    let summaryEndIndex = -1;

    // Find summary section
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (summaryHeaders.some(header => line.includes(header)) && line.length < 50) {
        summaryStartIndex = i + 1;
        break;
      }
    }

    if (summaryStartIndex === -1) return '';

    // Find end of summary (next section header or empty line)
    const sectionHeaders = [
      'experience', 'employment', 'work history', 'education', 'skills',
      'certifications', 'projects', 'achievements', 'accomplishments'
    ];

    for (let i = summaryStartIndex; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (line === '' || sectionHeaders.some(header => line.includes(header))) {
        summaryEndIndex = i;
        break;
      }
    }

    if (summaryEndIndex === -1) summaryEndIndex = Math.min(summaryStartIndex + 5, lines.length);

    return lines.slice(summaryStartIndex, summaryEndIndex).join(' ').trim();
  }

  /**
   * Extract work experience
   */
  private extractExperience(text: string): ParsedResumeData['experience'] {
    const experience: ParsedResumeData['experience'] = [];
    const lines = text.split('\n');

    const experienceHeaders = [
      'experience', 'employment', 'work history', 'professional experience',
      'career history', 'work experience', 'employment history'
    ];

    let startIndex = -1;
    let endIndex = lines.length;

    // Find experience section
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (experienceHeaders.some(header => line.includes(header)) && line.length < 50) {
        startIndex = i + 1;
        break;
      }
    }

    if (startIndex === -1) return experience;

    // Find end of experience section
    const nextSectionHeaders = ['education', 'skills', 'certifications', 'projects'];
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (nextSectionHeaders.some(header => line.includes(header)) && line.length < 50) {
        endIndex = i;
        break;
      }
    }

    const experienceText = lines.slice(startIndex, endIndex).join('\n');
    return this.parseExperienceEntries(experienceText);
  }

  /**
   * Parse individual experience entries
   */
  private parseExperienceEntries(text: string): ParsedResumeData['experience'] {
    const entries: ParsedResumeData['experience'] = [];
    const lines = text.split('\n').filter(line => line.trim());

    let currentEntry: Partial<ParsedResumeData['experience'][0]> = {};
    let descriptionLines: string[] = [];

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim();
      
      // Check if this might be a job title (often in caps or bold-looking)
      if (this.looksLikeJobTitle(line)) {
        // Save previous entry if it exists
        if (currentEntry.title && currentEntry.company) {
          entries.push({
            id: `exp-${entries.length + 1}`,
            title: currentEntry.title || '',
            company: currentEntry.company || '',
            duration: currentEntry.duration || '',
            description: descriptionLines.join(' ').trim(),
          });
        }

        // Start new entry
        currentEntry = { title: line };
        descriptionLines = [];
      }
      // Check if this looks like a company name with dates
      else if (this.looksLikeCompanyWithDates(line)) {
        const { company, duration } = this.parseCompanyAndDates(line);
        currentEntry.company = company;
        currentEntry.duration = duration;
      }
      // Otherwise, treat as description
      else if (line.length > 10) {
        descriptionLines.push(line);
      }
    }

    // Add the last entry
    if (currentEntry.title && currentEntry.company) {
      entries.push({
        id: `exp-${entries.length + 1}`,
        title: currentEntry.title || '',
        company: currentEntry.company || '',
        duration: currentEntry.duration || '',
        description: descriptionLines.join(' ').trim(),
      });
    }

    return entries;
  }

  /**
   * Extract education information
   */
  private extractEducation(text: string): ParsedResumeData['education'] {
    const education: ParsedResumeData['education'] = [];
    const lines = text.split('\n');

    const educationHeaders = ['education', 'academic background', 'qualifications'];
    let startIndex = -1;
    let endIndex = lines.length;

    // Find education section
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (educationHeaders.some(header => line.includes(header)) && line.length < 50) {
        startIndex = i + 1;
        break;
      }
    }

    if (startIndex === -1) return education;

    // Find end of education section
    const nextSectionHeaders = ['skills', 'certifications', 'projects', 'experience'];
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (nextSectionHeaders.some(header => line.includes(header)) && line.length < 50) {
        endIndex = i;
        break;
      }
    }

    const educationLines = lines.slice(startIndex, endIndex);
    
    // Parse education entries
    let currentDegree = '';
    let currentSchool = '';
    let currentYear = '';

    for (const line of educationLines) {
      const trimmed = line.trim();
      if (!trimmed) continue;

      // Look for degree patterns
      const degreeKeywords = ['bachelor', 'master', 'phd', 'doctorate', 'associate', 'certificate', 'diploma'];
      if (degreeKeywords.some(keyword => trimmed.toLowerCase().includes(keyword))) {
        if (currentDegree && currentSchool) {
          education.push({
            id: `edu-${education.length + 1}`,
            degree: currentDegree,
            school: currentSchool,
            year: currentYear,
          });
        }
        currentDegree = trimmed;
        currentSchool = '';
        currentYear = '';
      }
      // Look for year patterns
      else if (/\b(19|20)\d{2}\b/.test(trimmed)) {
        const yearMatch = trimmed.match(/\b(19|20)\d{2}\b/);
        currentYear = yearMatch ? yearMatch[0] : '';
        
        // Remove year from line and use remainder as school
        const schoolName = trimmed.replace(/\b(19|20)\d{2}\b/g, '').trim();
        if (schoolName && !currentSchool) {
          currentSchool = schoolName;
        }
      }
      // Assume it's a school name
      else if (!currentSchool && trimmed.length > 5) {
        currentSchool = trimmed;
      }
    }

    // Add the last entry
    if (currentDegree && currentSchool) {
      education.push({
        id: `edu-${education.length + 1}`,
        degree: currentDegree,
        school: currentSchool,
        year: currentYear,
      });
    }

    return education;
  }

  /**
   * Extract skills
   */
  private extractSkills(text: string): string[] {
    const skillsHeaders = ['skills', 'technical skills', 'core competencies', 'technologies', 'expertise'];
    const lines = text.split('\n');
    let startIndex = -1;
    let endIndex = lines.length;

    // Find skills section
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (skillsHeaders.some(header => line.includes(header)) && line.length < 50) {
        startIndex = i + 1;
        break;
      }
    }

    if (startIndex === -1) return [];

    // Find end of skills section
    const nextSectionHeaders = ['certifications', 'projects', 'education', 'experience', 'languages'];
    for (let i = startIndex; i < lines.length; i++) {
      const line = lines[i].trim().toLowerCase();
      if (nextSectionHeaders.some(header => line.includes(header)) && line.length < 50) {
        endIndex = i;
        break;
      }
    }

    const skillsText = lines.slice(startIndex, endIndex).join(' ');
    
    // Parse skills (split by common delimiters)
    const skills = skillsText
      .split(/[,•·\n•]/)
      .map(skill => skill.trim())
      .filter(skill => skill.length > 1 && skill.length < 50)
      .slice(0, 20); // Limit to 20 skills

    return skills;
  }

  /**
   * Extract certifications
   */
  private extractCertifications(text: string): ParsedResumeData['certifications'] {
    // Basic implementation - can be enhanced
    return [];
  }

  /**
   * Extract projects
   */
  private extractProjects(text: string): ParsedResumeData['projects'] {
    // Basic implementation - can be enhanced
    return [];
  }

  /**
   * Extract languages
   */
  private extractLanguages(text: string): ParsedResumeData['languages'] {
    // Basic implementation - can be enhanced
    return [];
  }

  // Helper methods
  private isContactInfo(line: string): boolean {
    return /[@.]/.test(line) || /\d{3}[-.\s]?\d{3}[-.\s]?\d{4}/.test(line);
  }

  private isCommonHeader(line: string): boolean {
    const headers = ['resume', 'curriculum vitae', 'cv'];
    return headers.some(header => line.toLowerCase().includes(header));
  }

  private looksLikeJobTitle(line: string): boolean {
    const jobTitleKeywords = [
      'engineer', 'developer', 'manager', 'analyst', 'specialist', 'coordinator',
      'director', 'lead', 'senior', 'junior', 'associate', 'assistant', 'consultant'
    ];
    
    return jobTitleKeywords.some(keyword => 
      line.toLowerCase().includes(keyword)
    ) && line.length < 100;
  }

  private looksLikeCompanyWithDates(line: string): boolean {
    return /\b(19|20)\d{2}\b/.test(line) || 
           /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)/i.test(line) ||
           /present/i.test(line);
  }

  private parseCompanyAndDates(line: string): { company: string; duration: string } {
    // Extract dates
    const datePatterns = [
      /\b(19|20)\d{2}\s*[-–—]\s*(19|20)\d{2}\b/,
      /\b(19|20)\d{2}\s*[-–—]\s*present\b/i,
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(19|20)\d{2}\s*[-–—]\s*(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(19|20)\d{2}/i,
      /(jan|feb|mar|apr|may|jun|jul|aug|sep|oct|nov|dec)\s+(19|20)\d{2}\s*[-–—]\s*present/i
    ];

    let duration = '';
    let company = line;

    for (const pattern of datePatterns) {
      const match = line.match(pattern);
      if (match) {
        duration = match[0];
        company = line.replace(pattern, '').trim();
        break;
      }
    }

    return { company, duration };
  }
}

export const resumeParserService = new ResumeParserService();
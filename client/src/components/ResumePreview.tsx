import { Card } from "@/components/ui/card";
import { ResumeData } from "./ResumeForm";
import { Template } from "./TemplateSelector";
import DOMPurify from "dompurify";

interface ResumePreviewProps {
  data: ResumeData;
  template: Template;
}

const getTemplateFontClass = (fontFamily: string) => {
  switch (fontFamily) {
    case 'serif': return 'font-resume-serif';
    case 'display': return 'font-resume-display';
    default: return 'font-resume-sans';
  }
};

const getTemplateColors = (template: Template) => {
  const [primary, secondary, accent] = template.colors;
  return { primary, secondary, accent };
};

const sanitizeHTML = (html: string) => {
  return DOMPurify.sanitize(html, {
    ALLOWED_TAGS: ['b', 'i', 'u', 'strong', 'em', 'span', 'div', 'p', 'ul', 'ol', 'li', 'br'],
    ALLOWED_ATTR: ['style', 'class'],
    KEEP_CONTENT: true
  });
};

// Helper function to clean up list content by removing manual numbering when HTML lists are present
const cleanListContent = (html: string): string => {
  if (!html) return html;
  
  // Create a temporary div to parse HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = html;
  
  // Find all list items
  const listItems = tempDiv.querySelectorAll('li');
  
  listItems.forEach(li => {
    let content = li.textContent || '';
    
    // Remove manual numbering patterns at the start of list items
    // Patterns: "1.", "2)", "1:", "a.", "i.", etc.
    content = content.replace(/^\s*(?:\d+[.):]|[a-z][.):]|[ivx]+[.):]|•)\s*/i, '');
    
    // Update the list item content
    if (content !== li.textContent) {
      li.textContent = content;
    }
  });
  
  return tempDiv.innerHTML;
};

// Combined sanitize and clean function
const sanitizeAndCleanHTML = (html: string) => {
  const sanitized = sanitizeHTML(html);
  return cleanListContent(sanitized);
};

export default function ResumePreview({ data, template }: ResumePreviewProps) {
  const fontClass = getTemplateFontClass(template.fontFamily);
  const colors = getTemplateColors(template);
  
  // Custom section renderer
  const renderCustomSection = (customSection: { id: string; title: string; content: string }, isTraditional = false) => {
    if (!customSection.title && !customSection.content) return null;
    
    const titleStyle = isTraditional 
      ? { color: colors.primary }
      : template.category === 'creative' 
        ? { color: colors.primary }
        : { color: colors.primary, borderColor: colors.primary };
    
    const titleClasses = isTraditional 
      ? "text-lg font-semibold mb-3 uppercase tracking-wide"
      : template.category === 'creative'
        ? "text-xl font-bold"
        : "text-lg font-medium mb-3 pb-1 border-b";
    
    return (
      <div className="mb-6" key={`custom-${customSection.id}`}>
        {template.category === 'creative' ? (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
            <h2 className={titleClasses} style={titleStyle}>
              {customSection.title || 'Custom Section'}
            </h2>
          </div>
        ) : (
          <h2 className={titleClasses} style={titleStyle}>
            {customSection.title || 'Custom Section'}
          </h2>
        )}
        <div className={`text-sm leading-relaxed ${template.category === 'creative' ? 'pl-11' : ''}`} 
             dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(customSection.content) }}>
        </div>
      </div>
    );
  };
  
  // Section renderer that handles both standard and custom sections
  const renderSection = (sectionId: string, isTraditional = false, isSidebar = false) => {
    // Handle custom sections
    if (sectionId.startsWith('custom-')) {
      const customId = sectionId.replace('custom-', '');
      const customSection = data.customSections?.find(s => s.id === customId);
      return customSection ? renderCustomSection(customSection, isTraditional) : null;
    }
    
    // Handle standard sections
    switch (sectionId) {
      case 'personal':
        return null; // Personal info is handled separately in header
      case 'experience':
        return data.experience.length > 0 ? renderExperienceSection(isTraditional, isSidebar) : null;
      case 'education':
        return data.education.length > 0 ? renderEducationSection(isTraditional, isSidebar) : null;
      case 'skills':
        return data.skills.length > 0 ? renderSkillsSection(isTraditional, isSidebar) : null;
      case 'certifications':
        return data.certifications.length > 0 ? renderCertificationsSection(isTraditional, isSidebar) : null;
      case 'projects':
        return data.projects.length > 0 ? renderProjectsSection(isTraditional, isSidebar) : null;
      case 'languages':
        return data.languages.length > 0 ? renderLanguagesSection(isTraditional, isSidebar) : null;
      default:
        return null;
    }
  };
  
  // Helper functions for rendering standard sections
  const renderExperienceSection = (isTraditional = false, isSidebar = false) => (
    <div className="mb-6">
      <h2 className={isTraditional ? "text-lg font-semibold mb-3 uppercase tracking-wide" : template.category === 'creative' ? "text-xl font-bold" : "text-lg font-medium mb-3 pb-1 border-b"} 
          style={isTraditional ? { color: colors.primary } : template.category === 'creative' ? { color: colors.primary } : { color: colors.primary, borderColor: colors.primary }}>
        {template.category === 'creative' && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
            Experience
          </div>
        )}
        {template.category !== 'creative' && (isTraditional ? 'Work Experience' : 'Experience')}
      </h2>
      {data.experience.map((exp) => (
        <div key={exp.id} className="mb-4">
          <div className="flex justify-between items-start mb-1">
            <p className={`font-medium ${template.category === 'modern' ? '' : ''}`} 
               style={{ color: template.category === 'modern' ? colors.primary : colors.secondary }}>
              {exp.company}
            </p>
            <span className="text-sm" style={{ color: colors.secondary }}>{exp.duration}</span>
          </div>
          <h3 className="font-semibold mb-1">{exp.title}</h3>
          <div className={`text-sm leading-relaxed ${template.category === 'creative' ? 'pl-11' : ''}`} 
               dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(exp.description) }}>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderEducationSection = (isTraditional = false, isSidebar = false) => (
    <div className="mb-6">
      <h2 className={isTraditional ? "text-lg font-semibold mb-3 uppercase tracking-wide" : template.category === 'creative' ? "text-xl font-bold" : "text-lg font-medium mb-3 pb-1 border-b"} 
          style={isTraditional ? { color: colors.primary } : template.category === 'creative' ? { color: colors.primary } : { color: colors.primary, borderColor: colors.primary }}>
        {template.category === 'creative' && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
            Education
          </div>
        )}
        {template.category !== 'creative' && 'Education'}
      </h2>
      {data.education.map((edu) => (
        <div key={edu.id} className={`mb-${isSidebar ? '3' : '2'}`}>
          <div className={isSidebar ? "" : "flex justify-between items-start"}>
            <div>
              <h3 className={`font-${isSidebar ? 'medium' : 'semibold'} ${isSidebar ? 'text-sm' : ''}`}>{edu.degree}</h3>
              <p className={isSidebar ? 'text-sm' : ''} style={{ color: colors.secondary }}>{edu.school}</p>
            </div>
            <span className={`text-${isSidebar ? 'xs' : 'sm'} ${isSidebar ? '' : ''}`} 
                  style={{ color: isSidebar ? colors.accent : colors.secondary }}>
              {edu.year}
            </span>
          </div>
        </div>
      ))}
    </div>
  );
  
  const renderSkillsSection = (isTraditional = false, isSidebar = false) => (
    <div className="mb-6">
      <h2 className={isTraditional ? "text-lg font-semibold mb-3 uppercase tracking-wide" : template.category === 'creative' ? "text-xl font-bold" : "text-lg font-medium mb-3 pb-1 border-b"} 
          style={isTraditional ? { color: colors.primary } : template.category === 'creative' ? { color: colors.primary } : { color: colors.primary, borderColor: colors.primary }}>
        {template.category === 'creative' && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
            Skills
          </div>
        )}
        {template.category !== 'creative' && 'Skills'}
      </h2>
      <div className={isTraditional ? "flex flex-wrap gap-2" : isSidebar ? "space-y-1" : "space-y-1"}>
        {data.skills.map((skill, index) => (
          isSidebar ? (
            <div key={index} className="text-sm">{skill}</div>
          ) : (
            <span key={index} className="text-sm">
              {skill}{index < data.skills.length - 1 ? ' •' : ''}
            </span>
          )
        ))}
      </div>
    </div>
  );
  
  const renderCertificationsSection = (isTraditional = false, isSidebar = false) => (
    <div className="mb-6">
      <h2 className={isTraditional ? "text-lg font-semibold mb-3 uppercase tracking-wide" : template.category === 'creative' ? "text-xl font-bold" : "text-lg font-medium mb-3 pb-1 border-b"} 
          style={isTraditional ? { color: colors.primary } : template.category === 'creative' ? { color: colors.primary } : { color: colors.primary, borderColor: colors.primary }}>
        {template.category === 'creative' && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
            Certifications
          </div>
        )}
        {template.category !== 'creative' && 'Certifications'}
      </h2>
      {data.certifications.map((cert) => (
        <div key={cert.id} className={`mb-${isSidebar ? '2' : '3'}`}>
          <div className={isSidebar ? "" : "flex justify-between items-start"}>
            <h3 className={`font-${isSidebar ? 'medium' : 'semibold'} ${isSidebar ? 'text-sm' : ''}`}>{cert.name}</h3>
            {!isSidebar && <span className="text-sm" style={{ color: colors.secondary }}>{cert.date}</span>}
          </div>
          <p className={isSidebar ? 'text-xs' : ''} style={{ color: colors.secondary }}>{cert.issuer}</p>
          {isSidebar && <p className="text-xs" style={{ color: colors.accent }}>{cert.date}</p>}
          {cert.expiryDate && (
            <p className={`text-${isSidebar ? 'xs' : 'sm'}`} style={{ color: colors.accent }}>
              Expires: {cert.expiryDate}
            </p>
          )}
        </div>
      ))}
    </div>
  );
  
  const renderProjectsSection = (isTraditional = false, isSidebar = false) => (
    <div className="mb-6">
      <h2 className={isTraditional ? "text-lg font-semibold mb-3 uppercase tracking-wide" : template.category === 'creative' ? "text-xl font-bold" : "text-lg font-medium mb-3 pb-1 border-b"} 
          style={isTraditional ? { color: colors.primary } : template.category === 'creative' ? { color: colors.primary } : { color: colors.primary, borderColor: colors.primary }}>
        {template.category === 'creative' && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
            Projects
          </div>
        )}
        {template.category !== 'creative' && 'Projects'}
      </h2>
      {data.projects.map((project) => (
        <div key={project.id} className={`mb-${isSidebar ? '3' : '4'}`}>
          <h3 className={`font-${isSidebar ? 'medium' : 'semibold'} ${isSidebar ? 'text-sm' : ''}`}>{project.name}</h3>
          <p className={`text-${isSidebar ? 'xs' : 'sm'} leading-relaxed ${isSidebar ? '' : 'mb-1'}`}>{project.description}</p>
          {project.technologies && (
            <p className={`text-${isSidebar ? 'xs' : 'sm'}`} style={{ color: colors.secondary }}>
              {isSidebar ? 'Tech: ' : 'Technologies: '}{project.technologies}
            </p>
          )}
          {project.link && (
            <p className={`text-${isSidebar ? 'xs' : 'sm'}`} style={{ color: colors.accent }}>
              {isSidebar ? '' : 'Link: '}{project.link}
            </p>
          )}
        </div>
      ))}
    </div>
  );
  
  const renderLanguagesSection = (isTraditional = false, isSidebar = false) => (
    <div className="mb-6">
      <h2 className={isTraditional ? "text-lg font-semibold mb-3 uppercase tracking-wide" : template.category === 'creative' ? "text-xl font-bold" : "text-lg font-medium mb-3 pb-1 border-b"} 
          style={isTraditional ? { color: colors.primary } : template.category === 'creative' ? { color: colors.primary } : { color: colors.primary, borderColor: colors.primary }}>
        {template.category === 'creative' && (
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
            Languages
          </div>
        )}
        {template.category !== 'creative' && 'Languages'}
      </h2>
      <div className={isTraditional ? "space-y-1" : isSidebar ? "" : "space-y-1"}>
        {data.languages.map((lang) => (
          <div key={lang.id} className={isTraditional ? "flex justify-between" : isSidebar ? "text-sm mb-1" : "text-sm mb-1"}>
            <span className={isSidebar ? "" : "text-sm"}>{lang.name}</span>
            <span className={`text-${isSidebar ? 'xs ml-2' : 'sm'}`} style={{ color: colors.secondary }}>
              {isSidebar ? `(${lang.proficiency})` : lang.proficiency}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
  
  // Traditional Template
  if (template.category === 'traditional') {
    const sectionOrder = data.sectionOrder || ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
    
    return (
      <Card className="resume-preview p-4 md:p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed`}>
          {/* Header */}
          <div className="text-center mb-6 border-b-2 pb-4" style={{ borderColor: colors.primary }}>
            {data.personalInfo.photo && (
              <div className="mb-4 flex justify-center">
                <img 
                  src={data.personalInfo.photo} 
                  alt="Profile" 
                  className="w-24 h-24 rounded-full object-cover border-2"
                  style={{ borderColor: colors.primary }}
                />
              </div>
            )}
            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="text-sm space-y-1" style={{ color: colors.secondary }}>
              <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
              {(data.personalInfo.linkedin || data.personalInfo.website) && (
                <p>
                  {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                  {data.personalInfo.linkedin && data.personalInfo.website && <span> | </span>}
                  {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                </p>
              )}
            </div>
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-base md:text-lg font-semibold mb-2 uppercase tracking-wide" style={{ color: colors.primary }}>
                Professional Summary
              </h2>
              <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
            </div>
          )}

          {/* Dynamic sections based on sectionOrder */}
          {sectionOrder.filter(sectionId => sectionId !== 'personal').map(sectionId => (
            <div key={sectionId}>{renderSection(sectionId, true, false)}</div>
          ))}
        </div>
      </Card>
    );
  }

  // Photo Professional Template (special photo layout)
  if (template.id === 'photo-professional') {
    const sectionOrder = data.sectionOrder || ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
    
    // Separate main content sections (experience) from sidebar sections
    const mainSections = sectionOrder.filter(id => id === 'experience' || (id.startsWith('custom-') && data.customSections?.find(s => s.id === id.replace('custom-', ''))?.title?.toLowerCase().includes('experience')));
    const sidebarSections = sectionOrder.filter(id => !mainSections.includes(id) && id !== 'personal');
    
    return (
      <Card className="resume-preview p-4 md:p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed`}>
          {/* Header with Photo */}
          <div className="flex items-start gap-6 mb-8 pb-6 border-b" style={{ borderColor: colors.secondary }}>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-3" style={{ color: colors.primary }}>
                {data.personalInfo.fullName || 'Your Name'}
              </h1>
              <div className="space-y-1 text-sm" style={{ color: colors.secondary }}>
                <p>{data.personalInfo.email} | {data.personalInfo.phone}</p>
                <p>{data.personalInfo.location}</p>
                {(data.personalInfo.linkedin || data.personalInfo.website) && (
                  <p>
                    {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                    {data.personalInfo.linkedin && data.personalInfo.website && <span> | </span>}
                    {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                  </p>
                )}
              </div>
            </div>
            {data.personalInfo.photo && (
              <div className="shrink-0">
                <img 
                  src={data.personalInfo.photo} 
                  alt="Profile" 
                  className="w-28 h-28 rounded-lg object-cover border-2"
                  style={{ borderColor: colors.primary }}
                />
              </div>
            )}
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-semibold mb-3" style={{ color: colors.primary }}>
                Professional Summary
              </h2>
              <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
            </div>
          )}

          {/* Two-column layout for remaining content */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="md:col-span-2">
              {/* Main sections (experience and related custom sections) */}
              {mainSections.map(sectionId => (
                <div key={sectionId}>{renderSection(sectionId, false, false)}</div>
              ))}
            </div>

            <div>
              {/* Sidebar sections */}
              {sidebarSections.map(sectionId => (
                <div key={sectionId}>{renderSection(sectionId, false, true)}</div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Modern Template
  if (template.category === 'modern') {
    const sectionOrder = data.sectionOrder || ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
    
    // Separate main content sections from sidebar sections
    const mainSections = sectionOrder.filter(id => id === 'experience' || (id.startsWith('custom-') && data.customSections?.find(s => s.id === id.replace('custom-', ''))?.title?.toLowerCase().includes('experience')));
    const sidebarSections = sectionOrder.filter(id => !mainSections.includes(id) && id !== 'personal');
    
    return (
      <Card className="resume-preview p-4 md:p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed`}>
          {/* Header */}
          <div className="mb-8">
            {data.personalInfo.photo && (
              <div className="float-right ml-6 mb-4">
                <img 
                  src={data.personalInfo.photo} 
                  alt="Profile" 
                  className="w-20 h-20 rounded-full object-cover border-2"
                  style={{ borderColor: colors.primary }}
                />
              </div>
            )}
            <h1 className="text-4xl font-light mb-3" style={{ color: colors.primary }}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-sm" style={{ color: colors.secondary }}>
              <div>{data.personalInfo.email}</div>
              <div>{data.personalInfo.phone}</div>
              <div className="col-span-2">{data.personalInfo.location}</div>
              {(data.personalInfo.linkedin || data.personalInfo.website) && (
                <div className="col-span-2">
                  {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                  {data.personalInfo.linkedin && data.personalInfo.website && <span> | </span>}
                  {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                </div>
              )}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8">
            <div className="md:col-span-2">
              {/* Summary */}
              {data.personalInfo.summary && (
                <div className="mb-6">
                  <h2 className="text-lg font-medium mb-3 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                    Summary
                  </h2>
                  <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
                </div>
              )}

              {/* Main sections (experience and related custom sections) */}
              {mainSections.map(sectionId => renderSection(sectionId, false, false))}
            </div>

            <div>
              {/* Sidebar sections */}
              {sidebarSections.map(sectionId => (
                <div key={sectionId}>{renderSection(sectionId, false, true)}</div>
              ))}
            </div>
          </div>
        </div>
      </Card>
    );
  }

  // Creative Template
  if (template.category === 'creative') {
    const sectionOrder = data.sectionOrder || ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
    
    return (
      <Card className="resume-preview p-4 md:p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed`}>
          {/* Header */}
          <div className="relative mb-8 p-6 rounded-lg" style={{ backgroundColor: `${colors.primary}15` }}>
            <div className="absolute top-0 left-0 w-2 h-full rounded-l-lg" style={{ backgroundColor: colors.primary }}></div>
            <h1 className="text-2xl md:text-3xl font-bold mb-2" style={{ color: colors.primary }}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="text-sm space-y-1">
              <p>{data.personalInfo.email} • {data.personalInfo.phone}</p>
              <p>{data.personalInfo.location}</p>
            </div>
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-8 h-1 rounded" style={{ backgroundColor: colors.accent }}></div>
                <h2 className="text-xl font-bold" style={{ color: colors.primary }}>About Me</h2>
              </div>
              <div className="text-sm leading-relaxed pl-11" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
            </div>
          )}

          {/* Dynamic sections based on sectionOrder */}
          {sectionOrder.filter(sectionId => sectionId !== 'personal').map(sectionId => (
            <div key={sectionId}>{renderSection(sectionId, false, false)}</div>
          ))}
        </div>
      </Card>
    );
  }

  // Executive Template
  if (template.category === 'executive') {
    return (
      <Card className="resume-preview p-4 md:p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed`}>
          {/* Header */}
          <div className="text-left mb-8 pb-6" style={{ borderBottom: `3px solid ${colors.primary}` }}>
            <h1 className="text-4xl font-bold mb-3" style={{ color: colors.primary }}>
              {data.personalInfo.fullName || 'Your Name'}
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 md:gap-4 text-sm" style={{ color: colors.secondary }}>
              <div>{data.personalInfo.email}</div>
              <div>{data.personalInfo.phone}</div>
              <div>{data.personalInfo.location}</div>
              {(data.personalInfo.linkedin || data.personalInfo.website) && (
                <div>
                  {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                  {data.personalInfo.linkedin && data.personalInfo.website && <span> | </span>}
                  {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                </div>
              )}
            </div>
          </div>

          {/* Executive Summary */}
          {data.personalInfo.summary && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
                Executive Summary
              </h2>
              <div className="leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
            </div>
          )}

          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <div className="mb-8">
              <h2 className="text-xl font-bold mb-4" style={{ color: colors.primary }}>
                Professional Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-6">
                  <div className="flex justify-between items-start mb-2">
                    <p className="font-semibold" style={{ color: colors.accent }}>
                      {exp.company}
                    </p>
                    <span className="text-sm font-medium" style={{ color: colors.secondary }}>
                      {exp.duration}
                    </span>
                  </div>
                  <h3 className="text-lg font-bold mb-3">{exp.title}</h3>
                  <div className="leading-relaxed text-justify" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(exp.description) }}></div>
                </div>
              ))}
            </div>
          )}

          <div className="grid grid-cols-2 gap-8">
            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
                  Education
                </h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-4">
                    <h3 className="font-semibold">{edu.degree}</h3>
                    <p style={{ color: colors.secondary }}>{edu.school}</p>
                    <p className="text-sm" style={{ color: colors.accent }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Core Competencies */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
                  Core Competencies
                </h2>
                <div className="space-y-1">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="text-sm">• {skill}</div>
                  ))}
                </div>
              </div>
            )}

            {/* Professional Certifications */}
            {data.certifications.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
                  Professional Certifications
                </h2>
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="mb-3">
                    <h3 className="font-semibold">{cert.name}</h3>
                    <p style={{ color: colors.secondary }}>{cert.issuer}</p>
                    <p className="text-sm" style={{ color: colors.accent }}>{cert.date}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Key Projects */}
            {data.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-4" style={{ color: colors.primary }}>
                  Key Projects
                </h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-4">
                    <h3 className="font-semibold">{project.name}</h3>
                    <p className="text-sm leading-relaxed mb-1">{project.description}</p>
                    {project.technologies && (
                      <p className="text-sm" style={{ color: colors.secondary }}>
                        Technologies: {project.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Minimal Sidebar Template
  if (template.id === 'minimal-sidebar') {
    const sectionOrder = data.sectionOrder || ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
    
    // Separate sidebar sections (details, skills, languages) from main content
    const sidebarSections = ['skills', 'education', 'languages', 'certifications'];
    const mainSections = sectionOrder.filter(id => !sidebarSections.includes(id) && id !== 'personal');
    
    return (
      <Card className="resume-preview p-0 max-w-2xl mx-auto bg-white text-black overflow-hidden" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed flex`}>
          {/* Left Sidebar */}
          <div className="w-1/3 bg-gray-50 p-6 border-r border-gray-200">
            {/* Personal Details */}
            <div className="mb-6">
              <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
                Details
              </h2>
              <div className="text-xs space-y-2" style={{ color: colors.secondary }}>
                <div>
                  <p className="font-medium">{data.personalInfo.phone}</p>
                </div>
                <div>
                  <p className="font-medium">{data.personalInfo.email}</p>
                </div>
                <div>
                  <p className="font-medium">{data.personalInfo.location}</p>
                </div>
                {data.personalInfo.linkedin && (
                  <div>
                    <p className="font-medium break-all">{data.personalInfo.linkedin}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Skills Section */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
                  Skills
                </h2>
                <div className="space-y-1">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="text-xs" style={{ color: colors.secondary }}>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}
            
            {/* Education in sidebar */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
                  Education
                </h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h3 className="text-xs font-semibold">{edu.degree}</h3>
                    <p className="text-xs" style={{ color: colors.secondary }}>{edu.school}</p>
                    <p className="text-xs" style={{ color: colors.secondary }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            )}
            
            {/* Languages in sidebar */}
            {data.languages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xs font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
                  Languages
                </h2>
                <div className="space-y-1">
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="text-xs flex justify-between">
                      <span>{lang.name}</span>
                      <span style={{ color: colors.secondary }}>{lang.proficiency}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Main Content Area */}
          <div className="flex-1 p-8">
            {/* Header */}
            <div className="mb-6 pb-4 border-b" style={{ borderColor: colors.secondary }}>
              <h1 className="text-3xl font-bold mb-1" style={{ color: colors.primary }}>
                {data.personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-sm" style={{ color: colors.secondary }}>
                {data.personalInfo.summary ? 'Programmer' : ''}
              </p>
            </div>

            {/* Profile/Summary */}
            {data.personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
                  Profile
                </h2>
                <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.personalInfo.summary) }}></div>
              </div>
            )}

            {/* Employment History */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
                  Employment History
                </h2>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <div className="flex justify-between items-start mb-1">
                      <p className="font-semibold text-sm">{exp.title}, {exp.company}</p>
                      <span className="text-xs" style={{ color: colors.secondary }}>{exp.duration}</span>
                    </div>
                    <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHTML(exp.description) }}></div>
                  </div>
                ))}
              </div>
            )}
            
            {/* Projects */}
            {data.projects.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3" style={{ color: colors.primary }}>
                  Projects
                </h2>
                {data.projects.map((project) => (
                  <div key={project.id} className="mb-3">
                    <h3 className="font-semibold text-sm">{project.name}</h3>
                    <p className="text-sm leading-relaxed">{project.description}</p>
                    {project.technologies && (
                      <p className="text-xs mt-1" style={{ color: colors.secondary }}>
                        {project.technologies}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // Professional Blue Template
  if (template.id === 'professional-blue') {
    const sectionOrder = data.sectionOrder || ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
    
    return (
      <Card className="resume-preview p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed`}>
          {/* Header with Photo */}
          <div className="flex items-start gap-6 mb-6 pb-4 border-b-2" style={{ borderColor: colors.primary }}>
            <div className="flex-1">
              <h1 className="text-3xl font-bold mb-2" style={{ color: colors.primary }}>
                {data.personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-lg mb-3" style={{ color: colors.secondary }}>
                {data.personalInfo.summary ? 'Financial Analyst' : ''}
              </p>
              <div className="text-sm space-y-1" style={{ color: colors.secondary }}>
                <p>{data.personalInfo.location} | {data.personalInfo.phone} | {data.personalInfo.email}</p>
              </div>
            </div>
            {data.personalInfo.photo && (
              <div className="shrink-0">
                <img 
                  src={data.personalInfo.photo} 
                  alt="Profile" 
                  className="w-24 h-24 rounded object-cover border-2"
                  style={{ borderColor: colors.primary }}
                />
              </div>
            )}
          </div>

          {/* Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                Summary
              </h2>
              <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
            </div>
          )}

          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                Professional Experience
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold">{exp.company}</p>
                    <span className="text-sm" style={{ color: colors.secondary }}>{exp.duration}</span>
                  </div>
                  <h3 className="font-semibold mb-2" style={{ color: colors.secondary }}>{exp.title}</h3>
                  <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(exp.description) }}></div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                Education
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p style={{ color: colors.secondary }}>{edu.school}</p>
                    </div>
                    <span className="text-sm" style={{ color: colors.secondary }}>{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Technical Skills */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                Technical Skills
              </h2>
              <div className="grid grid-cols-3 gap-2 text-sm">
                {data.skills.map((skill, index) => (
                  <div key={index}>{skill}</div>
                ))}
              </div>
            </div>
          )}

          {/* Additional Information */}
          {data.languages.length > 0 && (
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 pb-1 border-b" style={{ color: colors.primary, borderColor: colors.primary }}>
                Additional Information
              </h2>
              <div>
                <p className="text-sm mb-2"><strong>Languages:</strong> {data.languages.map(l => `${l.name}, ${l.proficiency}`).join('; ')}</p>
                {data.certifications.length > 0 && (
                  <p className="text-sm"><strong>Certifications:</strong> {data.certifications.map(c => c.name).join(', ')}</p>
                )}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // Green Sidebar Template
  if (template.id === 'green-sidebar') {
    const sectionOrder = data.sectionOrder || ['personal', 'experience', 'education', 'skills', 'certifications', 'projects', 'languages'];
    
    return (
      <Card className="resume-preview p-0 max-w-2xl mx-auto bg-white text-black overflow-hidden" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed flex`}>
          {/* Left Sidebar - Dark Green */}
          <div className="w-2/5 p-8 text-white" style={{ backgroundColor: colors.primary }}>
            {/* Photo */}
            {data.personalInfo.photo && (
              <div className="mb-6 flex justify-center">
                <img 
                  src={data.personalInfo.photo} 
                  alt="Profile" 
                  className="w-28 h-28 rounded-full object-cover border-4 border-white"
                />
              </div>
            )}
            
            {/* Name */}
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-white mb-1">
                {data.personalInfo.fullName || 'Your Name'}
              </h1>
              <p className="text-sm uppercase tracking-wide" style={{ color: colors.secondary }}>
                Customer Service Representative
              </p>
            </div>

            {/* Details */}
            <div className="mb-6">
              <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-white">
                Details
              </h2>
              <div className="text-xs space-y-2 text-white">
                <p>{data.personalInfo.location}</p>
                <p>{data.personalInfo.phone}</p>
                <p className="break-all">{data.personalInfo.email}</p>
              </div>
            </div>

            {/* Skills */}
            {data.skills.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-white">
                  Skills
                </h2>
                <div className="space-y-2">
                  {data.skills.map((skill, index) => (
                    <div key={index} className="text-xs text-white">
                      {skill}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Languages */}
            {data.languages.length > 0 && (
              <div className="mb-6">
                <h2 className="text-sm font-bold uppercase tracking-wider mb-3 text-white">
                  Languages
                </h2>
                <div className="space-y-1">
                  {data.languages.map((lang) => (
                    <div key={lang.id} className="text-xs text-white">
                      {lang.name} - {lang.proficiency}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Right Content Area */}
          <div className="flex-1 p-8">
            {/* Profile */}
            {data.personalInfo.summary && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                  Profile
                </h2>
                <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHTML(data.personalInfo.summary) }}></div>
              </div>
            )}

            {/* Employment History */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                  Employment History
                </h2>
                {data.experience.map((exp) => (
                  <div key={exp.id} className="mb-4">
                    <p className="font-semibold">{exp.title}, {exp.company}</p>
                    <p className="text-sm mb-2" style={{ color: colors.secondary }}>{exp.duration}</p>
                    <div className="text-sm leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeHTML(exp.description) }}></div>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                  Education
                </h2>
                {data.education.map((edu) => (
                  <div key={edu.id} className="mb-3">
                    <h3 className="font-semibold">{edu.degree}, {edu.school}</h3>
                    <p className="text-sm" style={{ color: colors.secondary }}>{edu.year}</p>
                  </div>
                ))}
              </div>
            )}

            {/* References */}
            {data.certifications.length > 0 && (
              <div>
                <h2 className="text-lg font-bold mb-3" style={{ color: colors.primary }}>
                  Certifications
                </h2>
                {data.certifications.map((cert) => (
                  <div key={cert.id} className="mb-2">
                    <p className="font-semibold text-sm">{cert.name}</p>
                    <p className="text-xs" style={{ color: colors.secondary }}>{cert.issuer} | {cert.date}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </Card>
    );
  }

  // ATS-Optimized Template
  if (template.category === 'ats') {
    return (
      <Card className="resume-preview p-4 md:p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
        <div className={`${fontClass} leading-relaxed`}>
          {/* Header - Clean and Simple */}
          <div className="text-center mb-8 pb-4 border-b border-gray-300">
            <h1 className="text-2xl font-bold mb-2 uppercase tracking-wide">
              {data.personalInfo.fullName || 'YOUR NAME'}
            </h1>
            <div className="text-sm space-y-1">
              <p>{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
              {(data.personalInfo.linkedin || data.personalInfo.website) && (
                <p>
                  {data.personalInfo.linkedin && <span>{data.personalInfo.linkedin}</span>}
                  {data.personalInfo.linkedin && data.personalInfo.website && <span> | </span>}
                  {data.personalInfo.website && <span>{data.personalInfo.website}</span>}
                </p>
              )}
            </div>
          </div>

          {/* Professional Summary */}
          {data.personalInfo.summary && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                PROFESSIONAL SUMMARY
              </h2>
              <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
            </div>
          )}

          {/* Core Qualifications */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                CORE QUALIFICATIONS
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {data.skills.map((skill, index) => (
                  <div key={index} className="text-sm">• {skill}</div>
                ))}
              </div>
            </div>
          )}

          {/* Professional Experience */}
          {data.experience.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                PROFESSIONAL EXPERIENCE
              </h2>
              {data.experience.map((exp) => (
                <div key={exp.id} className="mb-4">
                  <div className="flex justify-between items-start mb-1">
                    <p className="font-semibold">{exp.company}</p>
                    <span className="text-sm">{exp.duration}</span>
                  </div>
                  <h3 className="font-bold uppercase mb-2">{exp.title}</h3>
                  <div className="leading-relaxed" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(exp.description) }}></div>
                </div>
              ))}
            </div>
          )}

          {/* Education */}
          {data.education.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                EDUCATION
              </h2>
              {data.education.map((edu) => (
                <div key={edu.id} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{edu.degree}</h3>
                      <p>{edu.school}</p>
                    </div>
                    <span className="text-sm">{edu.year}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Certifications */}
          {data.certifications.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                CERTIFICATIONS
              </h2>
              {data.certifications.map((cert) => (
                <div key={cert.id} className="mb-2">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">{cert.name}</h3>
                      <p>{cert.issuer}</p>
                    </div>
                    <span className="text-sm">{cert.date}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Projects */}
          {data.projects.length > 0 && (
            <div className="mb-6">
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                PROJECTS
              </h2>
              {data.projects.map((project) => (
                <div key={project.id} className="mb-3">
                  <h3 className="font-semibold">{project.name}</h3>
                  <p className="leading-relaxed mb-1">{project.description}</p>
                  {project.technologies && (
                    <p className="text-sm">Technologies: {project.technologies}</p>
                  )}
                  {project.link && (
                    <p className="text-sm">Link: {project.link}</p>
                  )}
                </div>
              ))}
            </div>
          )}

          {/* Languages */}
          {data.languages.length > 0 && (
            <div>
              <h2 className="text-lg font-bold mb-3 uppercase tracking-wide border-b border-gray-300 pb-1">
                LANGUAGES
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-1">
                {data.languages.map((lang) => (
                  <div key={lang.id} className="text-sm">
                    {lang.name} ({lang.proficiency})
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </Card>
    );
  }

  // Default fallback (similar to traditional)
  return (
    <Card className="resume-preview p-8 max-w-2xl mx-auto bg-white text-black" data-testid="resume-preview">
      <div className={`${fontClass} leading-relaxed`}>
        <div className="text-center mb-6">
          <h1 className="text-2xl font-bold mb-2">{data.personalInfo.fullName || 'Your Name'}</h1>
          <p className="text-sm">{data.personalInfo.email} | {data.personalInfo.phone} | {data.personalInfo.location}</p>
        </div>
        
        {data.personalInfo.summary && (
          <div className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Summary</h2>
            <div className="text-sm" dangerouslySetInnerHTML={{ __html: sanitizeAndCleanHTML(data.personalInfo.summary) }}></div>
          </div>
        )}
        
        {/* Add other sections similarly */}
      </div>
    </Card>
  );
}
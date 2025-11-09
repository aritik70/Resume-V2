import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ResumeData } from "./ResumeForm";
import { CheckCircle, XCircle, AlertCircle, Target } from "lucide-react";

interface ATSScoreProps {
  data: ResumeData;
}

interface ScoreItem {
  category: string;
  score: number;
  maxScore: number;
  status: 'good' | 'warning' | 'error';
  message: string;
}

export default function ATSScore({ data }: ATSScoreProps) {
  const calculateATSScore = (resumeData: ResumeData): { items: ScoreItem[], totalScore: number, maxTotalScore: number } => {
    const items: ScoreItem[] = [];
    
    // 1. Contact Information Completeness (20 points)
    const contactFields = [
      resumeData.personalInfo.fullName,
      resumeData.personalInfo.email,
      resumeData.personalInfo.phone,
      resumeData.personalInfo.location
    ];
    const contactScore = contactFields.filter(field => field?.trim()).length * 5;
    items.push({
      category: "Contact Information",
      score: contactScore,
      maxScore: 20,
      status: contactScore >= 15 ? 'good' : contactScore >= 10 ? 'warning' : 'error',
      message: contactScore >= 15 ? "Complete contact info" : "Missing important contact details"
    });

    // 2. Professional Summary (15 points)
    const summaryScore = resumeData.personalInfo.summary?.length > 50 ? 15 : 
                        resumeData.personalInfo.summary?.length > 0 ? 8 : 0;
    items.push({
      category: "Professional Summary",
      score: summaryScore,
      maxScore: 15,
      status: summaryScore >= 12 ? 'good' : summaryScore >= 5 ? 'warning' : 'error',
      message: summaryScore >= 12 ? "Strong summary present" : 
               summaryScore > 0 ? "Summary could be more detailed" : "Missing professional summary"
    });

    // 3. Work Experience Quality (25 points)
    let experienceScore = 0;
    if (resumeData.experience.length > 0) {
      const hasDescriptions = resumeData.experience.filter(exp => exp.description?.length > 50).length;
      const hasCompanies = resumeData.experience.filter(exp => exp.company?.trim()).length;
      const hasTitles = resumeData.experience.filter(exp => exp.title?.trim()).length;
      const hasDurations = resumeData.experience.filter(exp => exp.duration?.trim()).length;
      
      experienceScore = Math.min(25, (hasDescriptions * 8) + (hasCompanies * 4) + (hasTitles * 4) + (hasDurations * 3));
    }
    items.push({
      category: "Work Experience",
      score: experienceScore,
      maxScore: 25,
      status: experienceScore >= 20 ? 'good' : experienceScore >= 12 ? 'warning' : 'error',
      message: experienceScore >= 20 ? "Well-detailed work history" : 
               experienceScore >= 10 ? "Good experience, needs more details" : "Incomplete work experience"
    });

    // 4. Education Information (10 points)
    const educationScore = resumeData.education.length > 0 ? 
      Math.min(10, resumeData.education.length * 3 + 
      resumeData.education.filter(edu => edu.degree?.trim()).length * 2 +
      resumeData.education.filter(edu => edu.school?.trim()).length * 2) : 0;
    items.push({
      category: "Education",
      score: educationScore,
      maxScore: 10,
      status: educationScore >= 8 ? 'good' : educationScore >= 4 ? 'warning' : 'error',
      message: educationScore >= 8 ? "Complete education info" : 
               educationScore > 0 ? "Education section needs details" : "Missing education information"
    });

    // 5. Skills Section (15 points)
    const skillsScore = resumeData.skills.length >= 8 ? 15 :
                       resumeData.skills.length >= 5 ? 12 :
                       resumeData.skills.length >= 3 ? 8 :
                       resumeData.skills.length > 0 ? 4 : 0;
    items.push({
      category: "Skills",
      score: skillsScore,
      maxScore: 15,
      status: skillsScore >= 12 ? 'good' : skillsScore >= 6 ? 'warning' : 'error',
      message: skillsScore >= 12 ? "Good variety of skills listed" :
               skillsScore >= 4 ? "Add more relevant skills" : "Skills section is missing"
    });

    // 6. Additional Sections (15 points)
    let additionalScore = 0;
    if (resumeData.certifications.length > 0) additionalScore += 5;
    if (resumeData.projects.length > 0) additionalScore += 5;
    if (resumeData.languages.length > 0) additionalScore += 5;
    items.push({
      category: "Additional Sections",
      score: additionalScore,
      maxScore: 15,
      status: additionalScore >= 10 ? 'good' : additionalScore >= 5 ? 'warning' : 'error',
      message: additionalScore >= 10 ? "Great additional content" :
               additionalScore >= 5 ? "Some additional sections present" : "Consider adding certifications, projects, or languages"
    });

    const totalScore = items.reduce((sum, item) => sum + item.score, 0);
    const maxTotalScore = items.reduce((sum, item) => sum + item.maxScore, 0);

    return { items, totalScore, maxTotalScore };
  };

  const { items, totalScore, maxTotalScore } = calculateATSScore(data);
  const percentage = Math.round((totalScore / maxTotalScore) * 100);

  const getScoreColor = (percentage: number) => {
    if (percentage >= 80) return "text-green-600";
    if (percentage >= 60) return "text-yellow-600";
    return "text-red-600";
  };

  const getScoreBadgeVariant = (percentage: number): "default" | "secondary" | "destructive" | "outline" => {
    if (percentage >= 80) return "default";
    if (percentage >= 60) return "secondary";
    return "destructive";
  };

  const getStatusIcon = (status: 'good' | 'warning' | 'error') => {
    switch (status) {
      case 'good': return <CheckCircle className="h-4 w-4 text-green-600" />;
      case 'warning': return <AlertCircle className="h-4 w-4 text-yellow-600" />;
      case 'error': return <XCircle className="h-4 w-4 text-red-600" />;
    }
  };

  return (
    <Card className="w-full" data-testid="ats-score-card">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Target className="h-5 w-5 text-primary" />
          ATS Compatibility Score
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="text-center space-y-2">
          <div className={`text-3xl font-bold ${getScoreColor(percentage)}`}>
            {percentage}%
          </div>
          <Badge variant={getScoreBadgeVariant(percentage)} data-testid="ats-score-badge">
            {percentage >= 80 ? 'Excellent' : percentage >= 60 ? 'Good' : 'Needs Improvement'}
          </Badge>
          <Progress value={percentage} className="w-full" data-testid="ats-progress" />
        </div>

        <div className="space-y-3">
          <h4 className="font-semibold text-sm">Score Breakdown:</h4>
          {items.map((item, index) => (
            <div key={index} className="flex items-center justify-between p-2 rounded border" data-testid={`ats-item-${index}`}>
              <div className="flex items-center gap-2">
                {getStatusIcon(item.status)}
                <div>
                  <div className="font-medium text-sm">{item.category}</div>
                  <div className="text-xs text-muted-foreground">{item.message}</div>
                </div>
              </div>
              <div className="text-sm font-medium">
                {item.score}/{item.maxScore}
              </div>
            </div>
          ))}
        </div>

        <div className="bg-muted p-3 rounded text-sm space-y-2">
          <h5 className="font-semibold">💡 ATS Tips:</h5>
          <ul className="space-y-1 text-muted-foreground">
            <li>• Use standard section headings (Experience, Education, Skills)</li>
            <li>• Include relevant keywords from job descriptions</li>
            <li>• Use simple, clean formatting without complex graphics</li>
            <li>• Save as PDF for best compatibility</li>
            <li>• Include quantifiable achievements in experience</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
}
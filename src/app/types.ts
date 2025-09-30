import type {
  ExtractResumeDataOutput,
} from '@/ai/flows/extract-resume-data';
import type {
  GenerateConciseSummaryOutput,
} from '@/ai/flows/generate-concise-summary';
import type {
  RateResumeClarityOutput,
} from '@/ai/flows/rate-resume-clarity';
import type {
  SuggestResumeImprovementsOutput,
} from '@/ai/flows/suggest-resume-improvements';
import type {
  AnalyzeSkillsGapOutput,
} from '@/ai/flows/analyze-skills-gap';

export type ResumeAnalysisData = {
  extractedData: ExtractResumeDataOutput;
  summary: GenerateConciseSummaryOutput;
  clarity: RateResumeClarityOutput;
  suggestions: SuggestResumeImprovementsOutput;
};

export type SkillsGapData = AnalyzeSkillsGapOutput;

export type ResumeData = {
  personal: {
    name: string;
    email: string;
    phone: string;
    location: string;
    website: string;
  };
  summary: string;
  experience: {
    id: string;
    title: string;
    company: string;
    dates: string;
    description: string;
  }[];
  education: {
    id: string;
    school: string;
    degree: string;
    dates: string;
  }[];
  skills: {
    id: string;
    name: string;
  }[];
  projects: {
    id: string;
    name: string;
    description: string;
  }[];
};

export function constructResumeText(data: ExtractResumeDataOutput | undefined): string {
  if (!data) return '';

  const sections = [];

  if (data.personalDetails) {
    sections.push(
      `Personal Details:\n${Object.entries(data.personalDetails)
        .map(([key, value]) => `${key}: ${value}`)
        .join('\n')}`
    );
  }

  if (data.skills && data.skills.length > 0) {
    sections.push(`Skills:\n${data.skills.join(', ')}`);
  }

  if (data.workExperience && data.workExperience.length > 0) {
    sections.push(
      'Work Experience:\n' +
        data.workExperience
          .map(
            (job) =>
              `Title: ${job.title}\nCompany: ${job.company}\nDates: ${
                job.startDate
              } - ${job.endDate || 'Present'}\nDescription: ${job.description}`
          )
          .join('\n\n')
    );
  }

  if (data.education && data.education.length > 0) {
    sections.push(
      'Education:\n' +
        data.education
          .map(
            (edu) =>
              `Institution: ${edu.institution}\nDegree: ${edu.degree}\nDates: ${
                edu.startDate
              } - ${edu.endDate || 'Present'}`
          )
          .join('\n\n')
    );
  }

  if (data.projects && data.projects.length > 0) {
    sections.push(
      'Projects:\n' +
        data.projects
          .map((proj) => `Name: ${proj.name}\nDescription: ${proj.description}`)
          .join('\n\n')
    );
  }

  return sections.join('\n\n');
}

export function mapExtractedDataToResumeData(
  extractedData?: ExtractResumeDataOutput,
  summary?: GenerateConciseSummaryOutput
): ResumeData {
  if (!extractedData) {
    return {
      personal: { name: '', email: '', phone: '', location: '', website: '' },
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
    };
  }

  return {
    personal: {
      name: extractedData.personalDetails?.name || '',
      email: extractedData.personalDetails?.email || '',
      phone: extractedData.personalDetails?.phone || '',
      location: extractedData.personalDetails?.location || '',
      website: '', // No website field in extracted data
    },
    summary: summary?.summary || '',
    experience: (extractedData.workExperience || []).map((exp, index) => ({
      id: `exp${index + 1}`,
      title: exp.title,
      company: exp.company,
      dates: `${exp.startDate} - ${exp.endDate || 'Present'}`,
      description: exp.description,
    })),
    education: (extractedData.education || []).map((edu, index) => ({
      id: `edu${index + 1}`,
      school: edu.institution,
      degree: edu.degree,
      dates: `${edu.startDate} - ${edu.endDate || 'Present'}`,
    })),
    skills: (extractedData.skills || []).map((skill, index) => ({
      id: `skill${index + 1}`,
      name: skill,
    })),
    projects: (extractedData.projects || []).map((proj, index) => ({
        id: `proj${index + 1}`,
        name: proj.name,
        description: proj.description,
    })),
  };
}

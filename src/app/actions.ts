'use server';

import { extractResumeData } from '@/ai/flows/extract-resume-data';
import { generateConciseSummary } from '@/ai/flows/generate-concise-summary';
import { rateResumeClarity } from '@/ai/flows/rate-resume-clarity';
import { suggestResumeImprovements } from '@/ai/flows/suggest-resume-improvements';
import { analyzeSkillsGap } from '@/ai/flows/analyze-skills-gap';
import { rewriteResumeSection } from '@/ai/flows/rewrite-resume-section';
import { generateCoverLetter, type GenerateCoverLetterInput } from '@/ai/flows/generate-cover-letter';
import { upscaleResumeForAts, type UpscaleResumeForAtsOutput } from '@/ai/flows/upscale-resume-for-ats';

import { type ResumeAnalysisData, type SkillsGapData, constructResumeText } from './types';


export async function analyzeResumeAction(
  resumeDataUri: string
): Promise<{ data: ResumeAnalysisData | null; error: string | null }> {
  try {
    const extractedData = await extractResumeData({ resumeDataUri });

    if (!extractedData || Object.keys(extractedData).length === 0) {
      throw new Error("Could not extract any data from the resume. The document might be empty, corrupted, or in an unsupported format.");
    }

    const resumeText = constructResumeText(extractedData);
    
    if (!resumeText) {
        throw new Error("Extracted data was empty, cannot proceed with analysis.");
    }

    const [summaryResult, clarityResult, suggestionsResult] = await Promise.allSettled([
      generateConciseSummary({
        personalDetails: JSON.stringify(extractedData.personalDetails),
        skills: extractedData.skills?.join(', ') ?? '',
        experience: JSON.stringify(extractedData.workExperience),
        education: JSON.stringify(extractedData.education),
        projects: JSON.stringify(extractedData.projects),
      }),
      rateResumeClarity({ resumeText }),
      suggestResumeImprovements({ resumeText }),
    ]);

    if (summaryResult.status === 'rejected') throw new Error(`Failed to generate summary. Reason: ${summaryResult.reason?.message || 'Unknown'}`);
    if (clarityResult.status === 'rejected') throw new Error(`Failed to rate resume clarity. Reason: ${clarityResult.reason?.message || 'Unknown'}`);
    if (suggestionsResult.status === 'rejected') throw new Error(`Failed to suggest improvements. Reason: ${suggestionsResult.reason?.message || 'Unknown'}`);

    return {
      data: {
        extractedData,
        summary: summaryResult.value,
        clarity: clarityResult.value,
        suggestions: suggestionsResult.value,
      },
      error: null,
    };
  } catch (e: any) {
    console.error('Error in analyzeResumeAction:', e);
    let errorMessage = e.message || 'An unknown error occurred while analyzing the resume.';
    if (e.message?.includes('429')) {
      errorMessage = 'API rate limit exceeded. Please wait a moment before trying again.';
    } else if (e.message?.includes('500') || e.message?.includes('503')) {
        errorMessage = 'The AI service is temporarily unavailable. Please try again later.';
    }
    return { data: null, error: errorMessage };
  }
}

export async function analyzeSkillsGapAction(
  resumeText: string,
  jobDescription: string
): Promise<{ data: SkillsGapData | null; error: string | null }> {
  try {
    if (!jobDescription.trim()) {
        throw new Error("Job description cannot be empty.");
    }
    const result = await analyzeSkillsGap({ resumeText, jobDescription });
    return { data: result, error: null };
  } catch (e: any)
  {
    console.error('Error in analyzeSkillsGapAction:', e);
    return { data: null, error: e.message || 'Failed to analyze skills gap.' };
  }
}

export async function rewriteSectionAction(
  text: string,
  context?: string
): Promise<{ rewrittenText: string | null; error: string | null }> {
  try {
    const result = await rewriteResumeSection({ text, context });
    return { rewrittenText: result.rewrittenText, error: null };
  } catch (e: any) {
    console.error('Error in rewriteSectionAction:', e);
    return { rewrittenText: null, error: e.message || 'Failed to rewrite section.' };
  }
}

export async function generateCoverLetterAction(
  input: GenerateCoverLetterInput
): Promise<{ coverLetter: string | null; error: string | null }> {
    try {
        if (!input.resumeText.trim()) {
            throw new Error("Resume content cannot be empty.");
        }
        if (!input.jobDescription.trim()) {
            throw new Error("Job description cannot be empty.");
        }
        const result = await generateCoverLetter(input);
        return { coverLetter: result.coverLetter, error: null };
    }
    catch (e: any) {
        console.error('Error in generateCoverLetterAction:', e);
        return { coverLetter: null, error: e.message || 'Failed to generate cover letter.' };
    }
}

export async function upscaleResumeForAtsAction(
    resumeText: string,
    jobDescription: string
): Promise<{ data: UpscaleResumeForAtsOutput | null; error: string | null }> {
    try {
        const result = await upscaleResumeForAts({ resumeText, jobDescription });
        return { data: result, error: null };
    } catch (e: any) {
        console.error('Error in upscaleResumeForAtsAction:', e);
        return { data: null, error: e.message || 'Failed to upscale resume for ATS.' };
    }
}

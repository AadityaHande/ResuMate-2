'use server';

/**
 * @fileOverview A skills gap analysis AI agent.
 *
 * - analyzeSkillsGap - A function that handles the skills gap analysis process.
 * - AnalyzeSkillsGapInput - The input type for the analyzeSkillsGap function.
 * - AnalyzeSkillsGapOutput - The return type for the analyzeSkillsGap function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AnalyzeSkillsGapInputSchema = z.object({
  resumeText: z.string().describe('The text content of the resume.'),
  jobDescription: z.string().describe('The job description to compare the resume against.'),
});
export type AnalyzeSkillsGapInput = z.infer<typeof AnalyzeSkillsGapInputSchema>;

const AnalyzeSkillsGapOutputSchema = z.object({
  missingKeywords: z.array(z.string()).describe('Keywords missing from the resume compared to the job description.'),
  inDemandSkills: z.array(z.string()).describe('In-demand skills from the job description not present in the resume.'),
  atsOptimizationOpportunities: z.string().describe('Suggestions for optimizing the resume for Applicant Tracking Systems (ATS).'),
  toLearnOrAdd: z.string().describe('A targeted list of skills to learn or add to the resume.'),
});
export type AnalyzeSkillsGapOutput = z.infer<typeof AnalyzeSkillsGapOutputSchema>;

export async function analyzeSkillsGap(input: AnalyzeSkillsGapInput): Promise<AnalyzeSkillsGapOutput> {
  return analyzeSkillsGapFlow(input);
}

const analyzeSkillsGapPrompt = ai.definePrompt({
  name: 'analyzeSkillsGapPrompt',
  input: {schema: AnalyzeSkillsGapInputSchema},
  output: {schema: AnalyzeSkillsGapOutputSchema},
  prompt: `You are a resume expert. Compare the resume below against the job description and identify any skills gaps.

Resume:
{{resumeText}}

Job Description:
{{jobDescription}}

Provide the following information:
- missingKeywords: Keywords missing from the resume compared to the job description.
- inDemandSkills: In-demand skills from the job description not present in the resume.
- atsOptimizationOpportunities: Suggestions for optimizing the resume for Applicant Tracking Systems (ATS).
- toLearnOrAdd: A targeted list of skills to learn or add to the resume.
`,
});

const analyzeSkillsGapFlow = ai.defineFlow(
  {
    name: 'analyzeSkillsGapFlow',
    inputSchema: AnalyzeSkillsGapInputSchema,
    outputSchema: AnalyzeSkillsGapOutputSchema,
  },
  async input => {
    const {output} = await analyzeSkillsGapPrompt(input);
    return output!;
  }
);

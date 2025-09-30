'use server';

/**
 * @fileOverview An AI flow to rewrite a resume for a high ATS score.
 *
 * - upscaleResumeForAts - A function that rewrites a resume to be optimized for a specific job.
 * - UpscaleResumeForAtsInput - The input type for the upscaleResumeForAts function.
 * - UpscaleResumeForAtsOutput - The return type for the upscaleResumeForAts function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const UpscaleResumeForAtsInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the candidate\'s current resume.'),
  jobDescription: z.string().describe('The full text of the job description to optimize the resume for.'),
});
export type UpscaleResumeForAtsInput = z.infer<typeof UpscaleResumeForAtsInputSchema>;

const UpscaleResumeForAtsOutputSchema = z.object({
  upscaledResumeText: z.string().describe('The rewritten, ATS-optimized resume text.'),
  explanation: z.string().describe('A brief explanation of the key changes made to improve the ATS score.'),
});
export type UpscaleResumeForAtsOutput = z.infer<typeof UpscaleResumeForAtsOutputSchema>;

export async function upscaleResumeForAts(
  input: UpscaleResumeForAtsInput
): Promise<UpscaleResumeForAtsOutput> {
  return upscaleResumeForAtsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'upscaleResumeForAtsPrompt',
  input: {schema: UpscaleResumeForAtsInputSchema},
  output: {schema: UpscaleResumeForAtsOutputSchema},
  prompt: `You are a world-class resume writer and career coach who specializes in optimizing resumes for Applicant Tracking Systems (ATS) to achieve a score of 9/10 or higher.

Your task is to rewrite the provided resume to be perfectly tailored to the given job description.

**Original Resume:**
---
{{{resumeText}}}
---

**Target Job Description:**
---
{{{jobDescription}}}
---

**Instructions:**
1.  **Analyze and Integrate Keywords:** Scrutinize the job description to identify all critical keywords, skills, technologies, and qualifications. Seamlessly integrate these keywords into the resume's experience, skills, and summary sections.
2.  **Use Action Verbs:** Start bullet points in the experience section with strong, results-oriented action verbs.
3.  **Quantify Achievements:** Wherever possible, add quantifiable metrics and achievements. If the original resume lacks them, use industry-standard examples based on the roles described (e.g., "Increased efficiency by 15%", "Managed a budget of $50,000").
4.  **Structure and Formatting:** Maintain a clean, professional, and ATS-friendly format. Ensure standard section headers (e.g., "Work Experience," "Skills," "Education").
5.  **Professional Summary:** Rewrite the summary to be a powerful, 2-3 sentence pitch that directly mirrors the core requirements of the job description.
6.  **Return the Full Rewritten Resume:** Output the entire, rewritten resume text in the 'upscaledResumeText' field.
7.  **Provide an Explanation:** In the 'explanation' field, provide a brief summary of the most important changes you made and why they will improve the ATS score.

The final output must be a complete, professional resume ready to be sent to a recruiter.`,
});

const upscaleResumeForAtsFlow = ai.defineFlow(
  {
    name: 'upscaleResumeForAtsFlow',
    inputSchema: UpscaleResumeForAtsInputSchema,
    outputSchema: UpscaleResumeForAtsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

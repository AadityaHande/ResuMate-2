'use server';

/**
 * @fileOverview Generates a concise, professional summary of skills and experience.
 *
 * - generateConciseSummary - A function that generates a concise summary.
 * - GenerateConciseSummaryInput - The input type for the generateConciseSummary function.
 * - GenerateConciseSummaryOutput - The return type for the generateConciseSummary function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateConciseSummaryInputSchema = z.object({
  personalDetails: z.string().describe('Personal details of the candidate'),
  skills: z.string().describe('List of skills'),
  experience: z.string().describe('Summary of work experience'),
  education: z.string().describe('Summary of education'),
  projects: z.string().describe('Summary of personal projects'),
});
export type GenerateConciseSummaryInput = z.infer<typeof GenerateConciseSummaryInputSchema>;

const GenerateConciseSummaryOutputSchema = z.object({
  summary: z.string().describe('A concise, professional summary of the candidate.'),
});
export type GenerateConciseSummaryOutput = z.infer<typeof GenerateConciseSummaryOutputSchema>;

export async function generateConciseSummary(
  input: GenerateConciseSummaryInput
): Promise<GenerateConciseSummaryOutput> {
  return generateConciseSummaryFlow(input);
}

const generateConciseSummaryPrompt = ai.definePrompt({
  name: 'generateConciseSummaryPrompt',
  input: {schema: GenerateConciseSummaryInputSchema},
  output: {schema: GenerateConciseSummaryOutputSchema},
  prompt: `Given the following details, create a concise, professional 2-line summary highlighting core strengths, key skills, and differentiators, tailored for recruiter attention.\n\nPersonal Details: {{{personalDetails}}}\nSkills: {{{skills}}}\nExperience: {{{experience}}}\nEducation: {{{education}}}\nProjects: {{{projects}}}`,
});

const generateConciseSummaryFlow = ai.defineFlow(
  {
    name: 'generateConciseSummaryFlow',
    inputSchema: GenerateConciseSummaryInputSchema,
    outputSchema: GenerateConciseSummaryOutputSchema,
  },
  async input => {
    const {output} = await generateConciseSummaryPrompt(input);
    return output!;
  }
);

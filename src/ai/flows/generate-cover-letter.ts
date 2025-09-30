'use server';

/**
 * @fileOverview Generates a personalized cover letter based on a resume and job description.
 *
 * - generateCoverLetter - A function that handles the cover letter generation process.
 * - GenerateCoverLetterInput - The input type for the generateCoverLetter function.
 * - GenerateCoverLetterOutput - The return type for the generateCoverLetter function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCoverLetterInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the candidate\'s resume.'),
  jobDescription: z.string().describe('The full text of the job description the user is applying for.'),
  userName: z.string().describe('The name of the user applying for the job.'),
});
export type GenerateCoverLetterInput = z.infer<typeof GenerateCoverLetterInputSchema>;

const GenerateCoverLetterOutputSchema = z.object({
  coverLetter: z.string().describe('The generated, personalized cover letter in Markdown format.'),
});
export type GenerateCoverLetterOutput = z.infer<typeof GenerateCoverLetterOutputSchema>;

export async function generateCoverLetter(
  input: GenerateCoverLetterInput
): Promise<GenerateCoverLetterOutput> {
  return generateCoverLetterFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCoverLetterPrompt',
  input: {schema: GenerateCoverLetterInputSchema},
  output: {schema: GenerateCoverLetterOutputSchema},
  prompt: `You are a professional career coach and expert cover letter writer. Your task is to write a compelling, professional, and personalized cover letter for a job application.

The user's name is: {{{userName}}}

Here is the user's resume:
---
{{{resumeText}}}
---

Here is the job description they are applying for:
---
{{{jobDescription}}}
---

Based on the resume and the job description, write a cover letter that:
1.  Is addressed to the "Hiring Manager" unless a specific name is available in the job description.
2.  Highlights the most relevant skills and experiences from the resume that match the requirements in the job description.
3.  Uses a professional and confident tone.
4.  Quantifies achievements where possible, drawing connections between past accomplishments and future contributions.
5.  Is structured correctly with an introduction, body paragraphs, and a conclusion with a strong call to action.
6.  The output should be in Markdown format.

Do not invent any information. Base the entire cover letter on the information provided.
`,
});

const generateCoverLetterFlow = ai.defineFlow(
  {
    name: 'generateCoverLetterFlow',
    inputSchema: GenerateCoverLetterInputSchema,
    outputSchema: GenerateCoverLetterOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

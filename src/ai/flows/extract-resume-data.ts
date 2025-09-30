'use server';

/**
 * @fileOverview Resume data extraction flow.
 *
 * - extractResumeData - Extracts key information from a resume.
 * - ExtractResumeDataInput - The input type for the extractResumeData function.
 * - ExtractResumeDataOutput - The return type for the extractResumeData function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractResumeDataInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      'The resume as a data URI that must include a MIME type and use Base64 encoding. Expected format: \'data:<mimetype>;base64,<encoded_data>\'.' 
    ),
});
export type ExtractResumeDataInput = z.infer<typeof ExtractResumeDataInputSchema>;

const ExtractResumeDataOutputSchema = z.object({
  personalDetails: z.object({
    name: z.string().describe('The name of the person.'),
    email: z.string().describe('The email address of the person.'),
    phone: z.string().describe('The phone number of the person.').optional(),
    location: z.string().describe('The location of the person.').optional(),
  }).optional(),
  skills: z.array(z.string()).describe('A list of skills.'),
  workExperience: z.array(z.object({
    title: z.string().describe('The job title.'),
    company: z.string().describe('The company name.'),
    startDate: z.string().describe('The start date of the job.'),
    endDate: z.string().describe('The end date of the job.').optional(),
    description: z.string().describe('The description of the job.'),
  })).optional(),
  education: z.array(z.object({
    institution: z.string().describe('The name of the institution.'),
    degree: z.string().describe('The degree name.'),
    startDate: z.string().describe('The start date of the education.'),
    endDate: z.string().describe('The end date of the education.').optional(),
    description: z.string().describe('The description of the education.').optional(),
  })).optional(),
  projects: z.array(z.object({
    name: z.string().describe('The name of the project.'),
    description: z.string().describe('The description of the project.'),
  })).optional(),
  keywords: z.array(z.string()).describe('A list of keywords.'),
});
export type ExtractResumeDataOutput = z.infer<typeof ExtractResumeDataOutputSchema>;

export async function extractResumeData(input: ExtractResumeDataInput): Promise<ExtractResumeDataOutput> {
  return extractResumeDataFlow(input);
}

const extractResumeDataPrompt = ai.definePrompt({
  name: 'extractResumeDataPrompt',
  input: {schema: ExtractResumeDataInputSchema},
  output: {schema: ExtractResumeDataOutputSchema},
  prompt: `You are an expert resume parser. Extract the following information from the resume.

Resume: {{media url=resumeDataUri}}

Output the extracted information in JSON format.`,
});

const extractResumeDataFlow = ai.defineFlow(
  {
    name: 'extractResumeDataFlow',
    inputSchema: ExtractResumeDataInputSchema,
    outputSchema: ExtractResumeDataOutputSchema,
  },
  async input => {
    const {output} = await extractResumeDataPrompt(input);
    return output!;
  }
);

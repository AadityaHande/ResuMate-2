'use server';

/**
 * @fileOverview Rewrites a section of a resume for better impact and clarity.
 *
 * - rewriteResumeSection - A function that rewrites a given text section.
 * - RewriteResumeSectionInput - The input type for the rewriteResumeSection function.
 * - RewriteResumeSectionOutput - The return type for the rewriteResumeSection function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RewriteResumeSectionInputSchema = z.object({
  text: z.string().describe('The text content of the resume section to be rewritten.'),
  context: z.string().describe('Optional context, such as the job title or company, to tailor the rewrite.').optional(),
});
export type RewriteResumeSectionInput = z.infer<typeof RewriteResumeSectionInputSchema>;

const RewriteResumeSectionOutputSchema = z.object({
  rewrittenText: z.string().describe('The rewritten, improved resume section text.'),
});
export type RewriteResumeSectionOutput = z.infer<typeof RewriteResumeSectionOutputSchema>;

export async function rewriteResumeSection(
  input: RewriteResumeSectionInput
): Promise<RewriteResumeSectionOutput> {
  return rewriteResumeSectionFlow(input);
}

const prompt = ai.definePrompt({
  name: 'rewriteResumeSectionPrompt',
  input: {schema: RewriteResumeSectionInputSchema},
  output: {schema: RewriteResumeSectionOutputSchema},
  prompt: `You are an expert resume writer. Rewrite the following resume section to be more impactful, professional, and concise. Use action verbs and quantify achievements where possible.

{{#if context}}
Context for this section (e.g., job title, company): {{{context}}}
{{/if}}

Original Text:
"{{{text}}}"

Rewrite the text to highlight skills and accomplishments effectively. Return only the rewritten text in the 'rewrittenText' field.`,
});

const rewriteResumeSectionFlow = ai.defineFlow(
  {
    name: 'rewriteResumeSectionFlow',
    inputSchema: RewriteResumeSectionInputSchema,
    outputSchema: RewriteResumeSectionOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

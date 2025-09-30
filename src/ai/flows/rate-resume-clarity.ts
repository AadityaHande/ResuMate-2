'use server';

/**
 * @fileOverview This file contains a Genkit flow for rating a resume's clarity and content impact.
 *
 * It defines the input and output schemas, the AI prompt, and the flow itself.
 * The flow takes a resume as input and returns a rating (out of 10) for its clarity and content impact.
 *
 * @fileOverview
 * - rateResumeClarity - A function that rates the resume clarity and content impact.
 * - RateResumeClarityInput - The input type for the rateResumeClarity function.
 * - RateResumeClarityOutput - The return type for the rateResumeClarity function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RateResumeClarityInputSchema = z.object({
  resumeText: z
    .string()
    .describe('The text content of the resume to be evaluated.'),
});
export type RateResumeClarityInput = z.infer<typeof RateResumeClarityInputSchema>;

const RateResumeClarityOutputSchema = z.object({
  clarityScore: z
    .number()
    .describe(
      'The overall clarity and content impact score of the resume (out of 10), calculated as the average of the three sub-scores.'
    ),
  explanation: z.string().describe('A brief, overall explanation of the final score.'),
  clarityAndReadability: z.object({
      score: z.number().describe("Score for clarity and readability (1-10)."),
      explanation: z.string().describe("Explanation for the clarity and readability score."),
  }),
  impactAndAchievements: z.object({
      score: z.number().describe("Score for impact and achievements (1-10)."),
      explanation: z.string().describe("Explanation for the impact and achievements score."),
  }),
  structureAndFormatting: z.object({
      score: z.number().describe("Score for structure and formatting (1-10)."),
      explanation: z.string().describe("Explanation for the structure and formatting score."),
  }),
});
export type RateResumeClarityOutput = z.infer<typeof RateResumeClarityOutputSchema>;

export async function rateResumeClarity(input: RateResumeClarityInput): Promise<RateResumeClarityOutput> {
  return rateResumeClarityFlow(input);
}

const rateResumeClarityPrompt = ai.definePrompt({
  name: 'rateResumeClarityPrompt',
  input: {schema: RateResumeClarityInputSchema},
  output: {schema: RateResumeClarityOutputSchema},
  prompt: `You are an expert resume evaluator. Your task is to score a resume based on a detailed rubric.

**Resume Text:**
---
{{{resumeText}}}
---

**Evaluation Rubric:**
Please evaluate the resume based on the following three criteria. For each, provide a score from 1 to 10 and a brief explanation for your rating.

1.  **Clarity and Readability:**
    - Is the language clear, concise, and easy to understand?
    - Is it free of jargon and buzzwords?
    - Are the sentences well-structured?
    - Score (1-10):
    - Explanation:

2.  **Impact and Achievements:**
    - Does the resume use strong action verbs?
    - Does it quantify achievements with numbers and data where possible (e.g., "Increased sales by 20%")?
    - Does it focus on results and accomplishments rather than just listing job duties?
    - Score (1-10):
    - Explanation:

3.  **Structure and Formatting:**
    - Is the layout clean, professional, and easy to scan?
    - Is there a clear hierarchy of information (e.g., clear headings, use of bolding)?
    - Is the formatting consistent across all sections?
    - Score (1-10):
    - Explanation:

**Final Output:**
Based on your evaluation, fill out all the fields in the output JSON. The 'clarityScore' must be the mathematical average of the three sub-scores. Provide a brief, one-sentence overall explanation in the 'explanation' field.
`,
});

const rateResumeClarityFlow = ai.defineFlow(
  {
    name: 'rateResumeClarityFlow',
    inputSchema: RateResumeClarityInputSchema,
    outputSchema: RateResumeClarityOutputSchema,
  },
  async input => {
    const {output} = await rateResumeClarityPrompt(input);
    if (output) {
      // Ensure the overall score is an average.
      const avg = (output.clarityAndReadability.score + output.impactAndAchievements.score + output.structureAndFormatting.score) / 3;
      output.clarityScore = Math.round(avg * 10) / 10; // Round to one decimal place
    }
    return output!;
  }
);

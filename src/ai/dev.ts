import { config } from 'dotenv';
config();

import '@/ai/flows/extract-resume-data.ts';
import '@/ai/flows/generate-concise-summary.ts';
import '@/ai/flows/rate-resume-clarity.ts';
import '@/ai/flows/suggest-resume-improvements.ts';
import '@/ai/flows/analyze-skills-gap.ts';
import '@/ai/flows/rewrite-resume-section.ts';
import '@/ai/flows/generate-cover-letter.ts';
import '@/ai/flows/upscale-resume-for-ats.ts';

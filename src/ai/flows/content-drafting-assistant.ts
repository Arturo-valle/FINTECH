'use server';

/**
 * @fileOverview A content drafting assistant AI agent.
 *
 * - generateContentDraft - A function that handles the content draft generation process.
 * - GenerateContentDraftInput - The input type for the generateContentDraft function.
 * - GenerateContentDraftOutput - The return type for the generateContentDraft function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateContentDraftInputSchema = z.object({
  bullets: z.string().describe('Key points or bullets to be included in the content.'),
  tone: z.string().describe('The desired tone of the content (e.g., professional, friendly, formal).'),
  targetAudience: z.string().describe('The target audience for the content.'),
  contentType: z
    .enum(['news article', 'blog post', 'event description', 'social media message'])
    .describe('The type of content to generate.'),
  length: z.string().optional().describe('The desired length of the content (e.g., short, medium, long).'),
});
export type GenerateContentDraftInput = z.infer<typeof GenerateContentDraftInputSchema>;

const GenerateContentDraftOutputSchema = z.object({
  draft: z.string().describe('The generated content draft.'),
});
export type GenerateContentDraftOutput = z.infer<typeof GenerateContentDraftOutputSchema>;

export async function generateContentDraft(input: GenerateContentDraftInput): Promise<GenerateContentDraftOutput> {
  return generateContentDraftFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateContentDraftPrompt',
  input: {schema: GenerateContentDraftInputSchema},
  output: {schema: GenerateContentDraftOutputSchema},
  prompt: `You are an AI-powered content creation assistant for the Fintech Hub CR Association, an organization dedicated to promoting the fintech ecosystem in Costa Rica.

  You will generate content drafts based on the provided key points, tone, target audience, and content type.
  The generated content should be engaging, informative, and tailored to the specified audience. Please respond in markdown format.

  Key Points: {{{bullets}}}
  Tone: {{{tone}}}
  Target Audience: {{{targetAudience}}}
  Content Type: {{{contentType}}}
  Length: {{{length}}}

  Please generate a draft for the specified content type based on the provided information.`,
});

const generateContentDraftFlow = ai.defineFlow(
  {
    name: 'generateContentDraftFlow',
    inputSchema: GenerateContentDraftInputSchema,
    outputSchema: GenerateContentDraftOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

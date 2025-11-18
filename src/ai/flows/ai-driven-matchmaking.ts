'use server';

/**
 * @fileOverview AI-driven matchmaking flow for recommending potential partners.
 *
 * - generateMatchExplanation - A function that generates an explanation for a potential match between two organizations.
 * - GenerateMatchExplanationInput - The input type for the generateMatchExplanation function.
 * - GenerateMatchExplanationOutput - The return type for the generateMatchExplanation function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateMatchExplanationInputSchema = z.object({
  opportunityDescription: z.string().describe('Description of the opportunity.'),
  sourceOrganizationDescription: z.string().describe('Description of the source organization.'),
  targetOrganizationDescription: z.string().describe('Description of the target organization.'),
});
export type GenerateMatchExplanationInput = z.infer<typeof GenerateMatchExplanationInputSchema>;

const GenerateMatchExplanationOutputSchema = z.object({
  explanation: z.string().describe('Explanation of why the match is relevant.'),
  matchScore: z.number().describe('A score (0-1) indicating the strength of the match.'),
});
export type GenerateMatchExplanationOutput = z.infer<typeof GenerateMatchExplanationOutputSchema>;

export async function generateMatchExplanation(
  input: GenerateMatchExplanationInput
): Promise<GenerateMatchExplanationOutput> {
  return generateMatchExplanationFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateMatchExplanationPrompt',
  input: {schema: GenerateMatchExplanationInputSchema},
  output: {schema: GenerateMatchExplanationOutputSchema},
  prompt: `You are an AI assistant specializing in matchmaking between organizations. Given the description of an opportunity, a source organization, and a target organization, you will generate an explanation of why the match is relevant and assign a match score between 0 and 1.

Opportunity Description: {{{opportunityDescription}}}
Source Organization Description: {{{sourceOrganizationDescription}}}
Target Organization Description: {{{targetOrganizationDescription}}}

Provide a concise explanation and a match score. The score should reflect how well the target organization aligns with the opportunity and the source organization's profile.`,
});

const generateMatchExplanationFlow = ai.defineFlow(
  {
    name: 'generateMatchExplanationFlow',
    inputSchema: GenerateMatchExplanationInputSchema,
    outputSchema: GenerateMatchExplanationOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

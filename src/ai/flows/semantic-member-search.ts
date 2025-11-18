'use server';

/**
 * @fileOverview Implements semantic search for the member directory using Gemini embeddings.
 *
 * - semanticMemberSearch - A function that performs semantic search on member organizations.
 * - SemanticMemberSearchInput - The input type for the semanticMemberSearch function.
 * - SemanticMemberSearchOutput - The return type for the semanticMemberSearch function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SemanticMemberSearchInputSchema = z.object({
  query: z
    .string()
    .describe(
      'The natural language query to search the member directory with (e.g., fintech startups working on alternative credit scoring for SMEs in Costa Rica).'
    ),
});
export type SemanticMemberSearchInput = z.infer<typeof SemanticMemberSearchInputSchema>;

const OrganizationSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: z.string(),
  description: z.string(),
  website: z.string(),
  country: z.string(),
  verticals: z.array(z.string()),
  stage: z.string(),
  needs: z.array(z.string()),
  isMember: z.boolean(),
  membershipTier: z.string(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

const SemanticMemberSearchOutputSchema = z.array(OrganizationSchema).describe('A list of organizations that match the search query, ordered by relevance.');
export type SemanticMemberSearchOutput = z.infer<typeof SemanticMemberSearchOutputSchema>;

export async function semanticMemberSearch(input: SemanticMemberSearchInput): Promise<SemanticMemberSearchOutput> {
  return semanticMemberSearchFlow(input);
}

const semanticMemberSearchPrompt = ai.definePrompt({
  name: 'semanticMemberSearchPrompt',
  input: {schema: SemanticMemberSearchInputSchema},
  output: {schema: SemanticMemberSearchOutputSchema},
  prompt: `You are a search assistant that is helping a user find organizations in a directory.

  The user has provided the following search query:
  {{query}}

  Return a list of organizations that match the query, ordered by relevance. The output should be an array of JSON objects, each representing an organization.
  Do not include any introductory or concluding text, only the JSON array.
  Each object in the array represents an organization. Here's an example:
  {
    "id": "string",
    "name": "string",
    "type": "string",
    "description": "string",
    "website": "string",
    "country": "string",
    "verticals": ["string"],
    "stage": "string",
    "needs": ["string"],
    "isMember": boolean,
    "membershipTier": "string",
    "createdAt": "string",
    "updatedAt": "string",
  }
  `,
});

const semanticMemberSearchFlow = ai.defineFlow(
  {
    name: 'semanticMemberSearchFlow',
    inputSchema: SemanticMemberSearchInputSchema,
    outputSchema: SemanticMemberSearchOutputSchema,
  },
  async input => {
    const {output} = await semanticMemberSearchPrompt(input);
    return output!;
  }
);

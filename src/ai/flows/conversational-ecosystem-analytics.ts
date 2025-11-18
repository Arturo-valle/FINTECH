'use server';

/**
 * @fileOverview Implements the ConversationalEcosystemAnalytics flow, allowing association admins to ask questions about the fintech ecosystem and receive data-driven insights.
 *
 * - conversationalEcosystemAnalytics - A function that handles the analytics process.
 * - ConversationalEcosystemAnalyticsInput - The input type for the conversationalEcosystemAnalytics function.
 * - ConversationalEcosystemAnalyticsOutput - The return type for the conversationalEcosystemAnalytics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ConversationalEcosystemAnalyticsInputSchema = z.object({
  question: z.string().describe('The question about the fintech ecosystem in Costa Rica.'),
});
export type ConversationalEcosystemAnalyticsInput = z.infer<typeof ConversationalEcosystemAnalyticsInputSchema>;

const ConversationalEcosystemAnalyticsOutputSchema = z.object({
  explanation: z.string().describe('The explanation of the data in natural language.'),
  suggestedChartType: z.string().describe('Suggested chart type for visualization (e.g., line, bar).'),
});
export type ConversationalEcosystemAnalyticsOutput = z.infer<typeof ConversationalEcosystemAnalyticsOutputSchema>;

export async function conversationalEcosystemAnalytics(input: ConversationalEcosystemAnalyticsInput): Promise<ConversationalEcosystemAnalyticsOutput> {
  return conversationalEcosystemAnalyticsFlow(input);
}

const conversationalEcosystemAnalyticsPrompt = ai.definePrompt({
  name: 'conversationalEcosystemAnalyticsPrompt',
  input: {schema: ConversationalEcosystemAnalyticsInputSchema},
  output: {schema: ConversationalEcosystemAnalyticsOutputSchema},
  prompt: `You are an expert data analyst for the Fintech Association of Costa Rica.  Your job is to answer questions about the fintech ecosystem based on the data available to you and to suggest visualizations to help the user understand the data.

  Answer the following question:
  {{question}}

  Return an explanation of the data in natural language and suggest a chart type for visualization.
`,
});

const conversationalEcosystemAnalyticsFlow = ai.defineFlow(
  {
    name: 'conversationalEcosystemAnalyticsFlow',
    inputSchema: ConversationalEcosystemAnalyticsInputSchema,
    outputSchema: ConversationalEcosystemAnalyticsOutputSchema,
  },
  async input => {
    // TODO: Implement the data querying logic here.
    // This is a placeholder, and needs to be connected to the actual data.
    // The current implementation simply calls the prompt without any data querying.

    const {output} = await conversationalEcosystemAnalyticsPrompt(input);
    return output!;
  }
);

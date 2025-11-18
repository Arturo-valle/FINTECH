'use server';

/**
 * @fileOverview Regulatory Assistant Chatbot for answering questions about financial regulations in Costa Rica.
 *
 * - regulatoryAssistantChatbot - A function that handles the chatbot process.
 * - RegulatoryAssistantChatbotInput - The input type for the regulatoryAssistantChatbot function.
 * - RegulatoryAssistantChatbotOutput - The return type for the regulatoryAssistantChatbot function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const RegulatoryAssistantChatbotInputSchema = z.object({
  question: z.string().describe('The user question about financial regulations in Costa Rica.'),
  role: z.string().describe('The user role (e.g., fintech, bank, regulator).'),
  language: z.enum(['es', 'en']).describe('The preferred language of the user (es or en).').default('es'),
});
export type RegulatoryAssistantChatbotInput = z.infer<typeof RegulatoryAssistantChatbotInputSchema>;

const RegulatoryAssistantChatbotOutputSchema = z.object({
  answer: z.string().describe('The answer to the user question, with citations to relevant resources.'),
  disclaimer: z.string().describe('A disclaimer stating that the answer is for informational purposes only and not legal advice.'),
});
export type RegulatoryAssistantChatbotOutput = z.infer<typeof RegulatoryAssistantChatbotOutputSchema>;

export async function regulatoryAssistantChatbot(input: RegulatoryAssistantChatbotInput): Promise<RegulatoryAssistantChatbotOutput> {
  return regulatoryAssistantChatbotFlow(input);
}

const prompt = ai.definePrompt({
  name: 'regulatoryAssistantChatbotPrompt',
  input: {schema: RegulatoryAssistantChatbotInputSchema},
  output: {schema: RegulatoryAssistantChatbotOutputSchema},
  prompt: `You are a regulatory assistant chatbot providing information about financial regulations in Costa Rica.

  Answer the user's question in a clear and concise manner, citing the relevant resources.
  Always add the following disclaimer at the end of your response: "Esta respuesta es de carácter informativo y no constituye asesoría legal." if the language is Spanish. If the language is English the disclaimer should be: "This answer is for informational purposes only and does not constitute legal advice."

  Question: {{{question}}}
  Role: {{{role}}}
  Language: {{{language}}}

  Consider the language when generating the disclaimer.
  `,
});

const regulatoryAssistantChatbotFlow = ai.defineFlow(
  {
    name: 'regulatoryAssistantChatbotFlow',
    inputSchema: RegulatoryAssistantChatbotInputSchema,
    outputSchema: RegulatoryAssistantChatbotOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return {
      answer: output?.answer ?? '',
      disclaimer: output?.disclaimer ?? (input.language === 'es' ? 'Esta respuesta es de carácter informativo y no constituye asesoría legal.' : 'This answer is for informational purposes only and does not constitute legal advice.'),
    };
  }
);

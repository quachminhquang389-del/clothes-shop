'use server';

/**
 * @fileOverview An AI agent that provides style suggestions based on the current product catalog and seasonal trends.
 *
 * - getOutfitSuggestions - A function that handles the outfit suggestion process.
 * - OutfitSuggestionsInput - The input type for the getOutfitSuggestions function.
 * - OutfitSuggestionsOutput - The return type for the getOutfitSuggestions function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const OutfitSuggestionsInputSchema = z.object({
  userPreferences: z
    .string()
    .describe('The user preferences for clothing styles, colors, and brands.'),
  seasonalTrends: z
    .string()
    .describe('The current seasonal trends in the fashion industry.'),
  productCatalog: z
    .string()
    .describe('The current product catalog of available clothing items.'),
});
export type OutfitSuggestionsInput = z.infer<typeof OutfitSuggestionsInputSchema>;

const OutfitSuggestionsOutputSchema = z.object({
  outfitSuggestions: z
    .string()
    .describe('A list of outfit suggestions based on the input parameters.'),
});
export type OutfitSuggestionsOutput = z.infer<typeof OutfitSuggestionsOutputSchema>;

export async function getOutfitSuggestions(input: OutfitSuggestionsInput): Promise<OutfitSuggestionsOutput> {
  return outfitSuggestionsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'outfitSuggestionsPrompt',
  input: {schema: OutfitSuggestionsInputSchema},
  output: {schema: OutfitSuggestionsOutputSchema},
  prompt: `You are a personal stylist that provides outfit suggestions based on user preferences, seasonal trends, and the current product catalog.

User Preferences: {{{userPreferences}}}
Seasonal Trends: {{{seasonalTrends}}}
Product Catalog: {{{productCatalog}}}

Provide a list of outfit suggestions that match the user's preferences, are in line with the current seasonal trends, and are available in the product catalog.`,
});

const outfitSuggestionsFlow = ai.defineFlow(
  {
    name: 'outfitSuggestionsFlow',
    inputSchema: OutfitSuggestionsInputSchema,
    outputSchema: OutfitSuggestionsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);

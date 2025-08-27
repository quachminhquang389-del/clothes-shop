"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { getOutfitSuggestions } from "@/ai/flows/style-suggestions";
import { products } from "@/lib/products";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, Sparkles } from "lucide-react";

const formSchema = z.object({
  userPreferences: z
    .string()
    .min(20, {
      message: "Please describe your style in at least 20 characters.",
    })
    .max(500, {
      message: "Your description must not be longer than 500 characters.",
    }),
});

// Hardcoded data for the AI model
const seasonalTrends =
  "Current trends include minimalist aesthetics, oversized silhouettes, sustainable fabrics, and vintage-inspired denim. Neutral tones are popular, with occasional pops of vibrant color like electric blue and kelly green.";
const productCatalog = JSON.stringify(
  products.map((p) => ({
    name: p.name,
    description: p.description,
    category: p.category,
    price: p.price,
  }))
);

export function StyleAssistantForm() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      userPreferences: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    setResult(null);
    setError(null);
    try {
      const response = await getOutfitSuggestions({
        ...values,
        seasonalTrends,
        productCatalog,
      });
      setResult(response.outfitSuggestions);
    } catch (e) {
      setError("Sorry, we couldn't generate suggestions at this time. Please try again later.");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-3xl mx-auto">
      <Card>
        <CardContent className="p-6">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="userPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg font-headline">
                      Describe Your Style
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="e.g., 'I love a casual, comfortable look. I prefer neutral colors like beige and grey, and I often wear jeans and simple t-shirts. I'm looking for some weekend outfits.'"
                        className="min-h-[120px] bg-background"
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      The more detail you provide, the better your suggestions
                      will be. Mention your favorite colors, fits, and occasions.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" disabled={loading} className="w-full md:w-auto bg-accent hover:bg-accent/90">
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating...
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    Get Suggestions
                  </>
                )}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
      {result && (
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="font-headline flex items-center gap-2">
              <Sparkles className="text-accent" />
              Your Style Suggestions
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="prose prose-sm max-w-none text-foreground whitespace-pre-wrap font-body">
                {result}
            </div>
          </CardContent>
        </Card>
      )}
       {error && (
        <Card className="mt-8 border-destructive">
          <CardHeader>
            <CardTitle className="font-headline text-destructive">
              An Error Occurred
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-destructive">{error}</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

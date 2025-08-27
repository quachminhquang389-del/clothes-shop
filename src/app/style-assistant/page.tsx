import { StyleAssistantForm } from "@/components/style-assistant-form";
import { Sparkles } from "lucide-react";

export default function StyleAssistantPage() {
  return (
    <div className="bg-primary/5">
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="max-w-3xl mx-auto text-center">
          <Sparkles className="mx-auto h-12 w-12 text-accent mb-4" />
          <h1 className="text-4xl md:text-5xl font-headline text-primary tracking-tight">
            Your Personal Style Assistant
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Tell us about your style, and our AI will curate outfit
            suggestions just for you from our latest collection.
          </p>
        </div>

        <div className="mt-12">
            <StyleAssistantForm />
        </div>
      </div>
    </div>
  );
}

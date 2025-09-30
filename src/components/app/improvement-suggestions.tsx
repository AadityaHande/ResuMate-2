import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Lightbulb, WandSparkles } from "lucide-react";
import CopyButton from "./copy-button";

interface ImprovementSuggestionsProps {
  suggestions: string[];
}

const ImprovementSuggestions = ({ suggestions }: ImprovementSuggestionsProps) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
            <Lightbulb className="w-6 h-6 text-primary"/>
            <CardTitle className="text-xl font-semibold">
                Intelligent Suggestions
            </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        {suggestions && suggestions.length > 0 ? (
          <Accordion type="single" collapsible className="w-full">
            {suggestions.map((suggestion, index) => (
              <AccordionItem value={`item-${index}`} key={index}>
                <AccordionTrigger className="text-left hover:no-underline">
                  Suggestion #{index + 1}
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex items-start gap-4">
                     <WandSparkles className="w-5 h-5 text-primary flex-shrink-0 mt-1" />
                    <p className="flex-1">{suggestion}</p>
                    <CopyButton textToCopy={suggestion} variant="ghost" size="sm" />
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        ) : (
          <p className="text-muted-foreground">
            No specific improvement suggestions were generated. Your resume looks great!
          </p>
        )}
      </CardContent>
    </Card>
  );
};

export default ImprovementSuggestions;

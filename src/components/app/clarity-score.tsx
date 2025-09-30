"use client";

import { useState, useEffect } from "react";
import { CardTitle, CardDescription, CardHeader, Card, CardContent } from "@/components/ui/card";
import { type RateResumeClarityOutput } from "@/ai/flows/rate-resume-clarity";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { CheckCircle, Shield, Sparkles, WandSparkles } from "lucide-react";

interface ClarityScoreProps {
  clarityData: RateResumeClarityOutput;
}

const ClarityScore = ({ clarityData }: ClarityScoreProps) => {
  const { 
    clarityScore, 
    explanation, 
    clarityAndReadability, 
    impactAndAchievements,
    structureAndFormatting
  } = clarityData;

  const [displayScore, setDisplayScore] = useState(0);

  useEffect(() => {
    const animation = requestAnimationFrame(() => {
      setDisplayScore(clarityScore);
    });
    return () => cancelAnimationFrame(animation);
  }, [clarityScore]);

  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const scorePercentage = (displayScore / 10) * 100;
  const offset = circumference - (scorePercentage / 100) * circumference;

  const scoreColor =
    clarityScore >= 8
      ? "text-green-500"
      : clarityScore >= 5
      ? "text-yellow-500"
      : "text-destructive";

  const subScores = [
    { title: "Clarity & Readability", data: clarityAndReadability, icon: <CheckCircle className="w-5 h-5 text-blue-500"/> },
    { title: "Impact & Achievements", data: impactAndAchievements, icon: <Sparkles className="w-5 h-5 text-purple-500"/> },
    { title: "Structure & Formatting", data: structureAndFormatting, icon: <Shield className="w-5 h-5 text-green-500"/> },
  ]

  return (
     <Card className="h-full">
      <CardHeader>
        <div className="flex items-center gap-3">
            <WandSparkles className="w-6 h-6 text-primary"/>
            <CardTitle className="text-xl font-semibold">
                Overall Score
            </CardTitle>
        </div>
        <CardDescription>{explanation}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col lg:flex-row items-center gap-6">
            {/* Score Donut Chart */}
            <div className="relative h-36 w-36 flex-shrink-0">
                <svg className="h-full w-full" viewBox="0 0 120 120">
                <circle
                    className="stroke-current text-border"
                    strokeWidth="8"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                />
                <circle
                    className={`stroke-current ${scoreColor} transition-all duration-1000 ease-out`}
                    strokeWidth="8"
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    fill="transparent"
                    r={radius}
                    cx="60"
                    cy="60"
                    transform="rotate(-90 60 60)"
                />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${scoreColor}`}>
                    {clarityScore.toFixed(1)}
                </span>
                <span className="text-sm text-muted-foreground">/ 10</span>
                </div>
            </div>

            {/* Score Breakdown */}
            <Accordion type="single" collapsible className="w-full" defaultValue="item-0">
              {subScores.map((item, index) => (
                <AccordionItem value={`item-${index}`} key={index}>
                   <AccordionTrigger className="text-base font-semibold hover:no-underline">
                     <div className="flex items-center gap-3">
                       {item.icon}
                       {item.title}
                       <span className={`font-bold ml-2 ${
                         item.data.score >= 8 ? "text-green-500" : item.data.score >=5 ? "text-yellow-500" : "text-destructive"
                       }`}>
                         ({item.data.score.toFixed(1)})
                       </span>
                     </div>
                   </AccordionTrigger>
                   <AccordionContent>
                      <p className="text-muted-foreground">{item.data.explanation}</p>
                   </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
        </div>
      </CardContent>
    </Card>
  );
};

export default ClarityScore;

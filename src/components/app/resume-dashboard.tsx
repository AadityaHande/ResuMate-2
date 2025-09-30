import { type ResumeAnalysisData, constructResumeText } from "@/app/types";
import { Card } from "@/components/ui/card";
import ClarityScore from "./clarity-score";
import ImprovementSuggestions from "./improvement-suggestions";
import ResumeHeader from "./resume-header";
import SkillsGapAnalysis from "./skills-gap-analysis";
import ExtractedData from "./extracted-data";
import Link from "next/link";
import { Button } from "../ui/button";
import { Pencil, FileQuestion, LayoutDashboard, FileText } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface ResumeDashboardProps {
  analysis: ResumeAnalysisData;
  onReset: () => void;
}

const ResumeDashboard = ({ analysis, onReset }: ResumeDashboardProps) => {
  const resumeText = constructResumeText(analysis.extractedData);
  
  const dataForEditor = {
    extractedData: analysis.extractedData,
    summary: analysis.summary,
  }
  const editorLink = `/editor?data=${encodeURIComponent(JSON.stringify(dataForEditor))}`;


  return (
    <div className="flex-1 flex flex-col">
        <header className="bg-background border-b p-4 flex items-center justify-between sticky top-0 z-10">
            <div>
                 <h1 className="text-xl font-bold tracking-tight">Analysis Result</h1>
                 <p className="text-muted-foreground text-sm">Review your AI-powered resume feedback.</p>
            </div>
             <div className="flex items-center gap-2">
                <Button variant="outline" onClick={onReset}>
                    Analyze Another
                </Button>
                <Button asChild>
                    <Link href={editorLink}>
                        <Pencil className="mr-2" />
                        Open in Editor
                    </Link>
                </Button>
            </div>
        </header>

        <main className="flex-1 p-4 md:p-6 lg:p-8 bg-muted/20">
            <ResumeHeader
                personalDetails={analysis.extractedData.personalDetails}
                summary={analysis.summary.summary}
            />

            <Tabs defaultValue="dashboard" className="mt-6">
                <TabsList className="grid w-full grid-cols-3">
                    <TabsTrigger value="dashboard"><LayoutDashboard className="mr-2"/>Dashboard</TabsTrigger>
                    <TabsTrigger value="content"><FileText className="mr-2" />Extracted Content</TabsTrigger>
                    <TabsTrigger value="gap-analysis"><FileQuestion className="mr-2"/>Skills Gap Analysis</TabsTrigger>
                </TabsList>

                <TabsContent value="dashboard" className="mt-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                        <div className="lg:col-span-2">
                           <ClarityScore clarityData={analysis.clarity}/>
                        </div>
                        <div>
                            <ImprovementSuggestions
                                suggestions={analysis.suggestions.suggestions}
                            />
                        </div>
                    </div>
                </TabsContent>

                <TabsContent value="content" className="mt-6">
                     <ExtractedData extractedData={analysis.extractedData} />
                </TabsContent>
                
                <TabsContent value="gap-analysis" className="mt-6">
                    <SkillsGapAnalysis resumeText={resumeText} />
                </TabsContent>
            </Tabs>
        </main>
    </div>
  );
};

export default ResumeDashboard;

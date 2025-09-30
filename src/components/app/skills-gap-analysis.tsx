"use client";

import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { analyzeSkillsGapAction, upscaleResumeForAtsAction } from "@/app/actions";
import { type SkillsGapData } from "@/app/types";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { LoaderCircle, Target, Lightbulb, CheckCircle, WandSparkles, AlertTriangle, Sparkles, Check } from "lucide-react";
import type { UpscaleResumeForAtsOutput } from "@/ai/flows/upscale-resume-for-ats";
import CopyButton from "./copy-button";

interface SkillsGapAnalysisProps {
  resumeText: string;
}

const SkillsGapAnalysis = ({ resumeText }: SkillsGapAnalysisProps) => {
  const [jobDescription, setJobDescription] = useState("");
  const [analysisResult, setAnalysisResult] = useState<SkillsGapData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleAnalysis = async () => {
    if (!jobDescription.trim()) {
      toast({
        title: "Missing Job Description",
        description: "Please paste a job description to perform the analysis.",
        variant: "destructive",
      });
      return;
    }
    setIsLoading(true);
    setAnalysisResult(null);
    try {
      const result = await analyzeSkillsGapAction(resumeText, jobDescription);
      if (result.error) {
        throw new Error(result.error);
      }
      setAnalysisResult(result.data);
    } catch (e: any) {
      toast({
        title: "Analysis Failed",
        description: e.message || "An unexpected error occurred.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
        <CardHeader>
            <div className="flex items-center gap-3">
                <Target className="w-6 h-6 text-primary" />
                <CardTitle className="text-xl font-semibold">Skills Gap Analysis</CardTitle>
            </div>
            <CardDescription>
                Paste a job description below to see how your resume stacks up.
            </CardDescription>
        </CardHeader>
        <CardContent>
            <div className="grid gap-4">
                <Textarea
                    placeholder="Paste the full job description here..."
                    value={jobDescription}
                    onChange={(e) => setJobDescription(e.target.value)}
                    rows={8}
                    className="bg-background"
                />
                <Button onClick={handleAnalysis} disabled={isLoading}>
                    {isLoading ? (
                        <>
                            <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                            Analyzing...
                        </>
                    ) : (
                        "Analyze Fit"
                    )}
                </Button>
            </div>

            {analysisResult && (
                <div className="mt-6 space-y-6">
                    <UpscaleResumeButton
                        resumeText={resumeText}
                        jobDescription={jobDescription}
                        disabled={isLoading}
                    />

                    <AnalysisSection title="Missing Keywords" icon={<Lightbulb className="w-5 h-5 text-yellow-500" />}>
                        <div className="flex flex-wrap gap-2">
                        {analysisResult.missingKeywords.length > 0 ? (
                            analysisResult.missingKeywords.map((keyword, i) => <Badge variant="outline" key={i}>{keyword}</Badge>)
                        ) : (
                            <p className="text-sm text-muted-foreground">No significant keywords missing. Good job!</p>
                        )}
                        </div>
                    </AnalysisSection>

                    <AnalysisSection title="In-Demand Skills to Add" icon={<CheckCircle className="w-5 h-5 text-green-500" />}>
                        <div className="flex flex-wrap gap-2">
                        {analysisResult.inDemandSkills.length > 0 ? (
                            analysisResult.inDemandSkills.map((skill, i) => <Badge key={i}>{skill}</Badge>)
                        ) : (
                            <p className="text-sm text-muted-foreground">Your resume includes the key in-demand skills for this role.</p>
                        )}
                        </div>
                    </AnalysisSection>

                    <AnalysisSection title="ATS Optimization Opportunities" icon={<Target className="w-5 h-5 text-primary" />}>
                        <p className="text-sm text-muted-foreground">{analysisResult.atsOptimizationOpportunities}</p>
                    </AnalysisSection>
                     <AnalysisSection title="What to Learn or Add" icon={<Lightbulb className="w-5 h-5 text-purple-500" />}>
                        <p className="text-sm text-muted-foreground">{analysisResult.toLearnOrAdd}</p>
                    </AnalysisSection>
                </div>
            )}
        </CardContent>
    </Card>
  );
};

const AnalysisSection = ({ title, icon, children }: { title: string, icon: React.ReactNode, children: React.ReactNode }) => (
    <div>
        <h4 className="flex items-center gap-2 font-semibold mb-2">
            {icon}
            {title}
        </h4>
        {children}
    </div>
)

const UpscaleResumeButton = ({ resumeText, jobDescription, disabled }: { resumeText: string, jobDescription: string, disabled?: boolean}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [upscaledData, setUpscaledData] = useState<UpscaleResumeForAtsOutput | null>(null);
    
    const handleUpscale = async () => {
        setIsLoading(true);
        setError(null);
        setUpscaledData(null);
        try {
            const result = await upscaleResumeForAtsAction(resumeText, jobDescription);
            if (result.error) throw new Error(result.error);
            setUpscaledData(result.data);
        } catch(e: any) {
            setError(e.message || "An unexpected error occurred during upscaling.");
        } finally {
            setIsLoading(false);
        }
    }

    const openDialog = () => {
        setIsOpen(true);
        handleUpscale();
    }
    
    const closeDialog = () => {
        setIsOpen(false);
        setTimeout(() => {
            setIsLoading(false);
            setError(null);
            setUpscaledData(null);
        }, 300);
    }

    return (
        <>
            <Button onClick={openDialog} disabled={disabled || !jobDescription} size="lg" className="w-full">
                <WandSparkles className="mr-2" />
                Upscale Resume for ATS (Get 9+ Score)
            </Button>
            <Dialog open={isOpen} onOpenChange={closeDialog}>
                <DialogContent className="sm:max-w-4xl h-[90vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle className="flex items-center gap-2">
                             <WandSparkles className="text-primary" />
                             ATS-Optimized Resume
                        </DialogTitle>
                         <DialogDescription>
                            The AI has rewritten your resume to maximize its score for this specific job.
                        </DialogDescription>
                    </DialogHeader>
                     <div className="flex-1 overflow-hidden my-4">
                        {isLoading && (
                            <div className="flex flex-col items-center justify-center h-full text-center rounded-lg bg-muted/50">
                                <LoaderCircle className="w-10 h-10 mb-4 animate-spin text-primary" />
                                <h3 className="text-lg font-semibold">Upscaling your resume...</h3>
                                <p className="text-muted-foreground">This can take up to 30 seconds.</p>
                            </div>
                        )}
                        {error && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full text-center rounded-lg bg-destructive/10 text-destructive">
                                <AlertTriangle className="w-10 h-10 mb-4" />
                                <h3 className="text-lg font-semibold">Upscale Failed</h3>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {upscaledData && !isLoading && (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full overflow-hidden">
                                 <Card className="flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold">Original Resume</CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 overflow-auto text-xs whitespace-pre-wrap font-mono text-muted-foreground">
                                        {resumeText}
                                    </CardContent>
                                </Card>
                                 <Card className="border-primary/50 bg-primary/5 flex flex-col">
                                    <CardHeader>
                                        <CardTitle className="text-lg font-semibold flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <Sparkles className="w-5 h-5 text-primary"/>
                                                Upscaled Version
                                            </div>
                                            <CopyButton textToCopy={upscaledData.upscaledResumeText} />
                                        </CardTitle>
                                    </CardHeader>
                                    <CardContent className="flex-1 overflow-auto text-xs whitespace-pre-wrap font-mono">
                                        <p className="font-sans text-sm text-foreground/80 mb-4 p-3 bg-primary/10 rounded-md border border-primary/20"><span className="font-bold">Key Changes:</span> {upscaledData.explanation}</p>
                                        {upscaledData.upscaledResumeText}
                                    </CardContent>
                                </Card>
                            </div>
                        )}
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={closeDialog}>Close</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default SkillsGapAnalysis;

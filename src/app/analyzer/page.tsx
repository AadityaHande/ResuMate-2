"use client";

import { useState } from "react";
import { LoaderCircle, FileX2 } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import { useToast } from "@/hooks/use-toast";
import { type ResumeAnalysisData } from "@/app/types";
import { analyzeResumeAction } from "@/app/actions";
import UploadResume from "@/components/app/upload-resume";
import ResumeDashboard from "@/components/app/resume-dashboard";
import { Button } from "@/components/ui/button";

export default function AnalyzerPage() {
  const [analysis, setAnalysis] = useState<ResumeAnalysisData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();

  const handleResumeAnalysis = async (file: File) => {
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast({
        title: "Invalid File Type",
        description: "Please upload a PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    setError(null);
    setAnalysis(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      try {
        const dataUri = reader.result as string;
        const result = await analyzeResumeAction(dataUri);
        if (result.error) {
          throw new Error(result.error);
        }
        setAnalysis(result.data);
      } catch (e: any) {
        const errorMessage = e.message || "An unexpected error occurred during analysis.";
        setError(errorMessage);
        toast({
          title: "Analysis Failed",
          description: errorMessage,
          variant: "destructive",
        });
      } finally {
        setIsLoading(false);
      }
    };
    reader.onerror = () => {
      const errorMessage = "Failed to read the file.";
      setError(errorMessage);
      toast({
        title: "File Read Error",
        description: errorMessage,
        variant: "destructive",
      });
      setIsLoading(false);
    };
  };

  const handleReset = () => {
    setAnalysis(null);
    setError(null);
  };

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center flex-1">
          <LoaderCircle className="w-12 h-12 mb-4 animate-spin text-primary" />
          <h2 className="text-2xl font-semibold tracking-tight">Analyzing Your Resume...</h2>
          <p className="text-muted-foreground">Our AI is working its magic. This may take a moment.</p>
        </div>
      );
    }

    if (error && !analysis) {
        return (
             <div className="flex flex-col items-center justify-center text-center flex-1">
                <FileX2 className="w-12 h-12 mb-4 text-destructive" />
                <h2 className="text-2xl font-semibold tracking-tight">Analysis Failed</h2>
                <p className="text-muted-foreground max-w-md my-2">{error}</p>
                <Button onClick={handleReset}>Try Again</Button>
            </div>
        )
    }

    if (analysis) {
      return <ResumeDashboard analysis={analysis} onReset={handleReset}/>;
    }

    return <UploadResume onAnalyze={handleResumeAnalysis} />;
  };

  return (
    <div className="flex-1 flex flex-col">
      <Toaster />
       <div className="flex-1 flex flex-col rounded-lg bg-card text-card-foreground min-h-screen">
         {renderContent()}
      </div>
    </div>
  );
}

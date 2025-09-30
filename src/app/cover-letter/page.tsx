'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { generateCoverLetterAction } from '../actions';
import { useToast } from '@/hooks/use-toast';
import { LoaderCircle, FilePenLine, WandSparkles, AlertTriangle } from 'lucide-react';
import { Toaster } from '@/components/ui/toaster';
import CopyButton from '@/components/app/copy-button';
import { Input } from '@/components/ui/input';

export default function CoverLetterPage() {
  const [resumeText, setResumeText] = useState('');
  const [jobDescription, setJobDescription] = useState('');
  const [userName, setUserName] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { toast } = useToast();

  const handleGenerate = async () => {
    if (!userName.trim()) {
      toast({ title: "Name is required", description: "Please enter your name.", variant: "destructive" });
      return;
    }
    if (!resumeText.trim()) {
      toast({ title: "Resume content is required", description: "Please paste your resume content.", variant: "destructive" });
      return;
    }
    if (!jobDescription.trim()) {
      toast({ title: "Job description is required", description: "Please paste the job description.", variant: "destructive" });
      return;
    }

    setIsLoading(true);
    setCoverLetter('');
    setError(null);

    try {
        const result = await generateCoverLetterAction({ resumeText, jobDescription, userName });
        if (result.error) {
            throw new Error(result.error);
        }
        setCoverLetter(result.coverLetter || '');
    } catch(e: any) {
        const errorMessage = e.message || "An unexpected error occurred.";
        setError(errorMessage);
        toast({
          title: "Generation Failed",
          description: errorMessage,
          variant: "destructive",
        });
    } finally {
        setIsLoading(false);
    }
  };

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <Toaster />
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-extrabold tracking-tight">AI Cover Letter Generator</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Create a personalized cover letter in seconds based on your resume and the job you want.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
        {/* Input Form */}
        <Card className="border-border/50">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-xl">
                <FilePenLine className="w-6 h-6 text-primary"/>
                Your Information
            </CardTitle>
             <CardDescription>Fill out the fields below to generate your cover letter.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
             <div className="space-y-2">
              <Label htmlFor="user-name">Your Full Name</Label>
              <Input
                id="user-name"
                placeholder="e.g. Jane Doe"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="resume-text">Your Resume Content</Label>
              <Textarea
                id="resume-text"
                placeholder="Paste the full content of your resume here..."
                value={resumeText}
                onChange={(e) => setResumeText(e.target.value)}
                rows={12}
                className="bg-background"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="job-description">Job Description</Label>
              <Textarea
                id="job-description"
                placeholder="Paste the full job description here..."
                value={jobDescription}
                onChange={(e) => setJobDescription(e.target.value)}
                rows={12}
                className="bg-background"
              />
            </div>
            <Button onClick={handleGenerate} disabled={isLoading} size="lg" className="w-full">
              {isLoading ? (
                <>
                  <LoaderCircle className="mr-2 h-4 w-4 animate-spin" />
                  Generating...
                </>
              ) : (
                <>
                 <WandSparkles className="mr-2" />
                  Generate Cover Letter
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Output Area */}
        <div className="sticky top-20">
            <Card className="flex flex-col border-border/50">
                <CardHeader>
                    <CardTitle className="flex items-center justify-between">
                        <div className="flex items-center gap-3 text-xl">
                         <WandSparkles className="text-primary w-6 h-6"/>
                            Generated Cover Letter
                        </div>
                         {coverLetter && <CopyButton textToCopy={coverLetter} />}
                    </CardTitle>
                    <CardDescription>Your AI-generated cover letter will appear below.</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col">
                    <div className="flex-1 rounded-lg border bg-muted/30 p-4 whitespace-pre-wrap font-mono text-sm overflow-auto h-[50vh] min-h-[400px]">
                        {isLoading && (
                             <div className="flex flex-col items-center justify-center h-full text-center">
                                <LoaderCircle className="w-12 h-12 mb-4 animate-spin text-primary" />
                                <h3 className="text-lg font-semibold">Crafting the perfect message...</h3>
                                <p className="text-muted-foreground">This may take a few seconds.</p>
                            </div>
                        )}
                        {error && !isLoading && (
                            <div className="flex flex-col items-center justify-center h-full text-center text-destructive">
                                 <AlertTriangle className="w-12 h-12 mb-4" />
                                <h3 className="text-lg font-semibold">Generation Failed</h3>
                                <p className="text-sm">{error}</p>
                            </div>
                        )}
                        {!isLoading && !error && !coverLetter && (
                            <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                                <p>Your cover letter will be displayed here once generated.</p>
                            </div>
                        )}
                        {coverLetter}
                    </div>
                </CardContent>
            </Card>
        </div>
      </div>
    </div>
  );
}

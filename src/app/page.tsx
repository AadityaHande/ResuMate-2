import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  FileText,
  Bot,
  Target,
  Pencil,
  LayoutTemplate,
  FilePenLine,
} from "lucide-react";
import Link from "next/link";
import Logo from "@/components/app/logo";
import { ThemeToggle } from "@/components/app/theme-toggle";

export default function HomePage() {
  const features = [
    {
      icon: <FileText className="h-8 w-8 text-primary" />,
      title: "Instant Resume Parsing",
      description:
        "Our AI accurately extracts key details from your resume in seconds, including contact info, skills, and work history.",
    },
    {
      icon: <Bot className="h-8 w-8 text-primary" />,
      title: "AI-Powered Analysis",
      description:
        "Receive an objective score on your resume's clarity and impact, with a professionally written summary to make you stand out.",
    },
    {
      icon: <Target className="h-8 w-8 text-primary" />,
      title: "Skills Gap Identification",
      description:
        "Compare your resume against any job description to identify missing keywords and skills, helping you tailor your application perfectly.",
    },
    {
      icon: <FilePenLine className="h-8 w-8 text-primary" />,
      title: "Cover Letter Generation",
      description:
        "Instantly create a personalized and professional cover letter tailored to the job you're applying for.",
    },
    {
      icon: <LayoutTemplate className="h-8 w-8 text-primary" />,
      title: "Professional Templates",
      description:
        "Choose from a selection of clean, professional templates designed to impress recruiters and pass ATS scans.",
    },
    {
      icon: <Pencil className="h-8 w-8 text-primary" />,
      title: "Interactive Editor",
      description:
        "Easily edit your resume content with a live preview, with drag-and-drop sections and AI-powered rewrite suggestions.",
    },
  ];

  return (
    <div className="min-h-screen bg-transparent text-foreground">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <Logo />
        <div className="flex items-center gap-4">
          <Button asChild variant="secondary">
            <Link href="/analyzer">Get Started</Link>
          </Button>
          <ThemeToggle />
        </div>
      </header>

      <main className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="relative text-center py-20 lg:py-32">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 size-[30rem] lg:size-[40rem] rounded-full bg-primary/10 dark:bg-[radial-gradient(circle_at_center,_#214198_0,transparent_40%)] blur-3xl" />
          <h1 className="relative text-4xl lg:text-6xl font-extrabold tracking-tight text-foreground">
            The AI Co-Pilot for Your Career
          </h1>
          <p className="relative mt-4 max-w-3xl mx-auto text-lg lg:text-xl text-muted-foreground">
            ResuMate analyzes your resume, provides actionable feedback, and
            helps you tailor it to any job description—effortlessly.
          </p>
          <div className="relative mt-8 flex justify-center gap-4">
            <Button asChild size="lg">
              <Link href="/analyzer">Analyze Your Resume</Link>
            </Button>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tight">
              Why ResuMate?
            </h2>
            <p className="mt-2 text-muted-foreground">
              Everything you need to create a job-winning resume.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card
                key={index}
                className="flex flex-col items-center text-center p-6 bg-card border-border/50 hover:border-primary/50 hover:bg-muted transition-all"
              >
                <div className="mb-4 p-3 rounded-full bg-primary/10">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-muted-foreground">{feature.description}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Ready to Land Your Dream Job?
          </h2>
          <p className="mt-3 text-muted-foreground">
            Stop guessing what recruiters want to see. Get data-driven insights
            now.
          </p>
          <div className="mt-6">
            <Button asChild size="lg">
              <Link href="/analyzer">Get Started for Free</Link>
            </Button>
          </div>
        </section>
      </main>

      <footer className="text-center py-8 text-sm text-muted-foreground border-t">
        <p>&copy; {new Date().getFullYear()} ResuMate. All rights reserved.</p>
      </footer>
    </div>
  );
}

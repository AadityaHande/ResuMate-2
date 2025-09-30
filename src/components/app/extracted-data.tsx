"use client";

import type { ExtractResumeDataOutput } from "@/ai/flows/extract-resume-data";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  Briefcase,
  GraduationCap,
  Lightbulb,
  Sparkles,
  ClipboardList,
} from "lucide-react";
import RewriteButton from "./rewrite-button";

interface ExtractedDataProps {
  extractedData: ExtractResumeDataOutput;
}

const ExtractedData = ({ extractedData }: ExtractedDataProps) => {
  const { workExperience, education, projects, skills, keywords } =
    extractedData;

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-3">
          <ClipboardList className="w-6 h-6 text-primary" />
          <CardTitle className="text-xl font-semibold">
            Extracted Resume Content
          </CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <Accordion type="multiple" className="w-full space-y-4">
          {workExperience && workExperience.length > 0 && (
            <AccordionItem value="work">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-3 no-underline hover:no-underline bg-primary/5 px-4 rounded-t-lg">
                <Briefcase className="w-5 h-5 text-primary" />
                Work Experience
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4 border border-t-0 rounded-b-lg">
                {workExperience.map((job, index) => (
                  <div key={index} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <h4 className="font-semibold">{job.title}</h4>
                    <p className="text-sm text-muted-foreground">
                      {job.company} | {job.startDate} - {job.endDate || "Present"}
                    </p>
                    <p className="mt-2 whitespace-pre-wrap">{job.description}</p>
                    <RewriteButton
                      textToRewrite={job.description}
                      context={`Job at ${job.company} as a ${job.title}`}
                      variant="link"
                      className="p-0 h-auto mt-2"
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {education && education.length > 0 && (
            <AccordionItem value="education">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-3 no-underline hover:no-underline bg-primary/5 px-4 rounded-t-lg">
                <GraduationCap className="w-5 h-5 text-primary" />
                Education
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4 border border-t-0 rounded-b-lg">
                {education.map((edu, index) => (
                  <div key={index} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-sm text-muted-foreground">
                      {edu.institution} | {edu.startDate} - {edu.endDate || "Present"}
                    </p>
                     {edu.description && <p className="mt-2">{edu.description}</p>}
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

          {projects && projects.length > 0 && (
             <AccordionItem value="projects">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-3 no-underline hover:no-underline bg-primary/5 px-4 rounded-t-lg">
                <Lightbulb className="w-5 h-5 text-primary" />
                Projects
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4 border border-t-0 rounded-b-lg">
                {projects.map((proj, index) => (
                  <div key={index} className="mb-4 pb-4 border-b last:border-b-0 last:mb-0 last:pb-0">
                    <h4 className="font-semibold">{proj.name}</h4>
                    <p className="mt-2 whitespace-pre-wrap">{proj.description}</p>
                     <RewriteButton
                      textToRewrite={proj.description}
                      context={`Project: ${proj.name}`}
                      variant="link"
                      className="p-0 h-auto mt-2"
                    />
                  </div>
                ))}
              </AccordionContent>
            </AccordionItem>
          )}

           {skills && skills.length > 0 && (
             <AccordionItem value="skills">
              <AccordionTrigger className="text-lg font-semibold flex items-center gap-3 no-underline hover:no-underline bg-primary/5 px-4 rounded-t-lg">
                <Sparkles className="w-5 h-5 text-primary" />
                Skills & Keywords
              </AccordionTrigger>
              <AccordionContent className="px-4 pt-4 border border-t-0 rounded-b-lg">
                 <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                        <span key={skill} className="bg-secondary text-secondary-foreground px-3 py-1 text-sm rounded-full">
                            {skill}
                        </span>
                    ))}
                 </div>
                 {keywords && keywords.length > 0 && <div className="mt-4 flex flex-wrap gap-2">
                    {keywords.map((keyword) => (
                        <span key={keyword} className="bg-muted text-muted-foreground px-3 py-1 text-xs rounded-full">
                            {keyword}
                        </span>
                    ))}
                </div>}
              </AccordionContent>
            </AccordionItem>
          )}

        </Accordion>
      </CardContent>
    </Card>
  );
};

export default ExtractedData;

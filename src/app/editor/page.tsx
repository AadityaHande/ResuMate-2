'use client';
import React, { useState, useMemo, Suspense, useRef, useCallback, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Download, Share2, GripVertical, Bot } from 'lucide-react';
import ClassicTemplate from '@/components/app/templates/classic-template';
import ModernTemplate from '@/components/app/templates/modern-template';
import CreativeTemplate from '@/components/app/templates/creative-template';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import EditorForm from '@/components/app/editor/editor-form';
import type { ResumeData } from '@/app/types';
import { mapExtractedDataToResumeData } from '@/app/types';
import { sampleResumeData } from '@/lib/sample-resume-data';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import CopyButton from '@/components/app/copy-button';

const templates = {
  classic: ClassicTemplate,
  modern: ModernTemplate,
  creative: CreativeTemplate,
};

function EditorPageContent() {
  const searchParams = useSearchParams();
  const { toast } = useToast();
  const templateId = searchParams.get('template') as keyof typeof templates || 'classic';
  
  const getInitialData = () => {
    const dataParam = searchParams.get('data');
    if (dataParam) {
      try {
        const parsedData = JSON.parse(dataParam);
        // The parsed object contains extractedData and an optional summary
        return mapExtractedDataToResumeData(parsedData.extractedData, parsedData.summary);
      } catch (error) {
        console.error("Failed to parse resume data from URL, using sample data.", error);
        return sampleResumeData;
      }
    }
    return sampleResumeData;
  }

  const [resumeData, setResumeData] = useState<ResumeData>(getInitialData);
  const [sidebarWidth, setSidebarWidth] = useState(400);
  const isResizing = useRef(false);

  const SelectedTemplate = templates[templateId] || ClassicTemplate;
  const templateName = templateId.charAt(0).toUpperCase() + templateId.slice(1) + " Template";

  const startResizing = useCallback((e: React.MouseEvent) => {
    isResizing.current = true;
    e.preventDefault();
  }, []);

  const stopResizing = useCallback(() => {
    isResizing.current = false;
  }, []);

  const resize = useCallback((e: MouseEvent) => {
    if (isResizing.current) {
        const newWidth = e.clientX;
        if (newWidth > 300 && newWidth < 800) { // Min and max width constraints
            setSidebarWidth(newWidth);
        }
    }
  }, []);


  useEffect(() => {
    window.addEventListener('mousemove', resize);
    window.addEventListener('mouseup', stopResizing);
    return () => {
      window.removeEventListener('mousemove', resize);
      window.removeEventListener('mouseup', stopResizing);
    };
  }, [resize, stopResizing]);


  const handlePrint = () => {
    window.print();
  };

  const handleShare = () => {
    const url = new URL(window.location.href);
    const dataToShare = {
        // This maps the ResumeData back to a format similar to analysis result for consistency
        extractedData: {
            personalDetails: resumeData.personal,
            summary: { summary: resumeData.summary },
            workExperience: resumeData.experience.map(e => ({...e, startDate: e.dates.split(' - ')[0], endDate: e.dates.split(' - ')[1] })),
            education: resumeData.education.map(e => ({...e, institution: e.school, startDate: e.dates.split(' - ')[0], endDate: e.dates.split(' - ')[1] })),
            skills: resumeData.skills.map(s => s.name),
            projects: resumeData.projects,
        },
        summary: { summary: resumeData.summary },
    };
    url.searchParams.set('data', JSON.stringify(dataToShare));
    navigator.clipboard.writeText(url.toString());
    toast({
        title: "Link Copied!",
        description: "A shareable link has been copied to your clipboard.",
    });
  }

  const handleLoadDemoData = () => {
    setResumeData(sampleResumeData);
  }
  
  return (
    <DndProvider backend={HTML5Backend}>
      <Toaster />
      <div className="flex flex-col h-[calc(100vh-4rem)]">
        <header className="flex items-center justify-between p-4 border-b bg-card flex-shrink-0">
          <div>
            <h1 className="text-xl font-bold">Resume Editor</h1>
            <p className="text-sm text-muted-foreground">{templateName}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={handleLoadDemoData}>
              <Bot className="mr-2 h-4 w-4" /> Load Data
            </Button>
            <Button variant="outline" size="sm" onClick={handleShare}>
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
            <Button size="sm" onClick={handlePrint}>
              <Download className="mr-2 h-4 w-4" /> Download PDF
            </Button>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          {/* Editor Form Panel */}
          <aside 
            className="overflow-y-auto p-6 border-r"
            style={{ width: `${sidebarWidth}px` }}
           >
            <EditorForm resumeData={resumeData} setResumeData={setResumeData} />
          </aside>
          
          {/* Resizer Handle */}
          <div
            className="w-2 cursor-col-resize bg-border/50 hover:bg-border transition-colors flex items-center justify-center"
            onMouseDown={startResizing}
          >
             <GripVertical className="h-6 w-6 text-muted-foreground/50"/>
          </div>


          {/* Resume Preview Panel */}
          <main className="flex-1 overflow-y-auto bg-muted/30 p-8">
            <div className="mx-auto max-w-4xl">
              <div className="rounded-lg shadow-lg overflow-hidden bg-white text-black">
                <SelectedTemplate data={resumeData} />
              </div>
            </div>
          </main>
        </div>
      </div>

       <style jsx global>{`
        @media print {
          body * {
            visibility: hidden;
          }
          #printable-resume, #printable-resume * {
            visibility: visible;
          }
          #printable-resume {
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: auto;
            transform: scale(1);
            box-shadow: none;
            border-radius: 0;
            margin: 0;
            padding: 0;
          }
           main {
             padding: 0 !important;
             background: white !important;
           }
           .mx-auto.max-w-4xl {
             max-width: 100% !important;
             box-shadow: none;
           }
           .rounded-lg.shadow-lg.overflow-hidden {
              border-radius: 0;
              box-shadow: none;
           }
        }
        @page {
          size: A4;
          margin: 0;
        }
      `}</style>
    </DndProvider>
  );
}

// Wrap the component in Suspense to handle dynamic search params
export default function EditorPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <EditorPageContent />
        </Suspense>
    )
}

"use client";

import { useState, useRef, type DragEvent } from "react";
import { UploadCloud } from "lucide-react";
import { Button } from "@/components/ui/button";

interface UploadResumeProps {
  onAnalyze: (file: File) => void;
}

const UploadResume = ({ onAnalyze }: UploadResumeProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragEnter = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      onAnalyze(files[0]);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onAnalyze(files[0]);
    }
  };

  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full h-full flex-1 flex flex-col items-center justify-center p-4 bg-background">
       <div className="text-center mb-8">
            <h1 className="text-2xl font-bold tracking-tight">Resume Analyzer</h1>
            <p className="text-muted-foreground">Upload your resume to get started.</p>
        </div>
      <div
        className={`relative flex flex-col items-center justify-center w-full max-w-3xl p-12 border-2 border-dashed rounded-lg cursor-pointer transition-colors duration-300 ${
          isDragging ? "border-primary bg-primary/10" : "border-border hover:border-primary/50"
        }`}
        onDragEnter={handleDragEnter}
        onDragLeave={handleDragLeave}
        onDragOver={handleDragOver}
        onDrop={handleDrop}
        onClick={handleBrowseClick}
      >
        <UploadCloud className={`w-16 h-16 mb-4 transition-colors duration-300 ${isDragging ? "text-primary": "text-muted-foreground"}`} />
        <p className="mb-2 text-lg font-semibold">
          <span className="text-primary">Click to upload</span> or drag and drop
        </p>
        <p className="text-sm text-muted-foreground">PDF only (max 5MB)</p>
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileSelect}
        />
        <Button size="sm" variant="outline" className="mt-6 pointer-events-none">
          Select Resume PDF
        </Button>
      </div>
    </div>
  );
};

export default UploadResume;

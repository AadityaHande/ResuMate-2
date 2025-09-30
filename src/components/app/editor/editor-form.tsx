'use client';
import React from 'react';
import type { Dispatch, SetStateAction } from 'react';
import type { ResumeData } from '@/app/types';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { GripVertical, PlusCircle, Trash2 } from 'lucide-react';
import { useDrag, useDrop } from 'react-dnd';

interface EditorFormProps {
  resumeData: ResumeData;
  setResumeData: Dispatch<SetStateAction<ResumeData>>;
}

const ItemTypes = {
  EXPERIENCE: 'experience',
  EDUCATION: 'education',
  SKILL: 'skill',
};

const DraggableListItem = ({ id, index, moveItem, children }: any) => {
  const ref = React.useRef<HTMLDivElement>(null);
  const [, drop] = useDrop({
    accept: ItemTypes.EXPERIENCE, // Make this dynamic if you use it for other types
    hover(item: { index: number }) {
      if (item.index !== index) {
        moveItem(item.index, index);
        item.index = index;
      }
    },
  });

  const [{ isDragging }, drag, preview] = useDrag({
    type: ItemTypes.EXPERIENCE,
    item: { id, index },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  preview(drop(ref));

  return (
    <div ref={ref} style={{ opacity: isDragging ? 0.5 : 1 }} className="relative">
      <div ref={drag} className="absolute left-[-20px] top-0 bottom-0 flex items-center cursor-move text-muted-foreground hover:text-foreground">
        <GripVertical size={16} />
      </div>
      {children}
    </div>
  );
};

export default function EditorForm({ resumeData, setResumeData }: EditorFormProps) {
  const handlePersonalChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setResumeData(prev => ({ ...prev, personal: { ...prev.personal, [name]: value } }));
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setResumeData(prev => ({ ...prev, summary: e.target.value }));
  };

  const handleSectionChange = <T extends 'experience' | 'education' | 'skills' | 'projects'>(
    section: T,
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setResumeData(prev => {
      const newSection = [...prev[section]];
      // @ts-ignore
      newSection[index] = { ...newSection[index], [name]: value };
      return { ...prev, [section]: newSection };
    });
  };

  const addSectionItem = <T extends 'experience' | 'education' | 'skills' | 'projects'>(section: T) => {
    setResumeData(prev => {
      const newId = `${section}${prev[section].length + 1}`;
      let newItem;
      if (section === 'experience') {
        newItem = { id: newId, title: '', company: '', dates: '', description: '' };
      } else if (section === 'education') {
        newItem = { id: newId, school: '', degree: '', dates: '' };
      } else if (section === 'skills') {
        newItem = { id: newId, name: '' };
      } else if (section === 'projects') {
        newItem = { id: newId, name: '', description: '' };
      }
      // @ts-ignore
      return { ...prev, [section]: [...prev[section], newItem] };
    });
  };

  const removeSectionItem = <T extends 'experience' | 'education' | 'skills' | 'projects'>(section: T, index: number) => {
    setResumeData(prev => {
      const newSection = prev[section].filter((_, i) => i !== index);
       // @ts-ignore
      return { ...prev, [section]: newSection };
    });
  };

  const moveItem = (fromIndex: number, toIndex: number) => {
    setResumeData(prev => {
      const newExperience = [...prev.experience];
      const [movedItem] = newExperience.splice(fromIndex, 1);
      newExperience.splice(toIndex, 0, movedItem);
      return { ...prev, experience: newExperience };
    });
  };

  return (
    <Accordion type="multiple" defaultValue={['personal', 'summary', 'experience']} className="w-full space-y-4">
      {/* Personal Details */}
      <AccordionItem value="personal">
        <AccordionTrigger>Personal Details</AccordionTrigger>
        <AccordionContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" name="name" value={resumeData.personal.name} onChange={handlePersonalChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={resumeData.personal.email} onChange={handlePersonalChange} />
          </div>
           <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" value={resumeData.personal.phone} onChange={handlePersonalChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input id="location" name="location" value={resumeData.personal.location} onChange={handlePersonalChange} />
          </div>
          <div className="space-y-2">
            <Label htmlFor="website">Website/Portfolio</Label>
            <Input id="website" name="website" value={resumeData.personal.website} onChange={handlePersonalChange} />
          </div>
        </AccordionContent>
      </AccordionItem>
      
      {/* Summary */}
       <AccordionItem value="summary">
        <AccordionTrigger>Professional Summary</AccordionTrigger>
        <AccordionContent>
           <Textarea value={resumeData.summary} onChange={handleSummaryChange} rows={5} placeholder="Write a brief summary about your professional background..."/>
        </AccordionContent>
      </AccordionItem>

      {/* Experience */}
      <AccordionItem value="experience">
        <AccordionTrigger>Work Experience</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {resumeData.experience.map((exp, index) => (
            <DraggableListItem key={exp.id} id={exp.id} index={index} moveItem={moveItem}>
              <div className="p-4 border rounded-md space-y-2 relative">
                <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7" onClick={() => removeSectionItem('experience', index)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
                <div className="space-y-2">
                    <Label>Job Title</Label>
                    <Input name="title" value={exp.title} onChange={(e) => handleSectionChange('experience', index, e)} />
                </div>
                 <div className="space-y-2">
                    <Label>Company</Label>
                    <Input name="company" value={exp.company} onChange={(e) => handleSectionChange('experience', index, e)} />
                </div>
                 <div className="space-y-2">
                    <Label>Dates</Label>
                    <Input name="dates" value={exp.dates} onChange={(e) => handleSectionChange('experience', index, e)} />
                </div>
                 <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea name="description" value={exp.description} onChange={(e) => handleSectionChange('experience', index, e)} />
                </div>
              </div>
            </DraggableListItem>
          ))}
          <Button variant="outline" size="sm" onClick={() => addSectionItem('experience')}><PlusCircle className="mr-2" /> Add Experience</Button>
        </AccordionContent>
      </AccordionItem>
      
        {/* Education */}
      <AccordionItem value="education">
        <AccordionTrigger>Education</AccordionTrigger>
        <AccordionContent className="space-y-6">
          {resumeData.education.map((edu, index) => (
              <div key={edu.id} className="p-4 border rounded-md space-y-2 relative">
                 <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7" onClick={() => removeSectionItem('education', index)}>
                    <Trash2 className="w-4 h-4 text-destructive" />
                </Button>
                <div className="space-y-2">
                    <Label>School</Label>
                    <Input name="school" value={edu.school} onChange={(e) => handleSectionChange('education', index, e)} />
                </div>
                 <div className="space-y-2">
                    <Label>Degree</Label>
                    <Input name="degree" value={edu.degree} onChange={(e) => handleSectionChange('education', index, e)} />
                </div>
                 <div className="space-y-2">
                    <Label>Dates</Label>
                    <Input name="dates" value={edu.dates} onChange={(e) => handleSectionChange('education', index, e)} />
                </div>
              </div>
          ))}
           <Button variant="outline" size="sm" onClick={() => addSectionItem('education')}><PlusCircle className="mr-2" /> Add Education</Button>
        </AccordionContent>
      </AccordionItem>

      {/* Projects */}
        <AccordionItem value="projects">
            <AccordionTrigger>Projects</AccordionTrigger>
            <AccordionContent className="space-y-6">
            {resumeData.projects.map((proj, index) => (
                <div key={proj.id} className="p-4 border rounded-md space-y-2 relative">
                    <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7" onClick={() => removeSectionItem('projects', index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                    <div className="space-y-2">
                        <Label>Project Name</Label>
                        <Input name="name" value={proj.name} onChange={(e) => handleSectionChange('projects', index, e)} />
                    </div>
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea name="description" value={proj.description} onChange={(e) => handleSectionChange('projects', index, e)} />
                    </div>
                </div>
            ))}
            <Button variant="outline" size="sm" onClick={() => addSectionItem('projects')}><PlusCircle className="mr-2" /> Add Project</Button>
            </AccordionContent>
        </AccordionItem>


       {/* Skills */}
      <AccordionItem value="skills">
        <AccordionTrigger>Skills</AccordionTrigger>
        <AccordionContent className="space-y-4">
            <p className="text-sm text-muted-foreground">Enter your skills below.</p>
             {resumeData.skills.map((skill, index) => (
                <div key={skill.id} className="flex items-center gap-2">
                    <Input name="name" value={skill.name} onChange={(e) => handleSectionChange('skills', index, e)} />
                    <Button variant="ghost" size="icon" onClick={() => removeSectionItem('skills', index)}>
                        <Trash2 className="w-4 h-4 text-destructive" />
                    </Button>
                </div>
             ))}
              <Button variant="outline" size="sm" onClick={() => addSectionItem('skills')}><PlusCircle className="mr-2" /> Add Skill</Button>
        </AccordionContent>
      </AccordionItem>

    </Accordion>
  );
}

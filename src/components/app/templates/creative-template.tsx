'use client';
import type { ResumeData } from '@/app/types';
import { Mail, Phone, Globe, MapPin, Briefcase, GraduationCap, Lightbulb, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const CreativeTemplate = ({ data }: TemplateProps) => {
  const { personal, summary, experience, education, skills, projects } = data;

  return (
    <div id="printable-resume" className="p-8 md:p-10 bg-white font-sans text-gray-700 text-base">
      
      {/* Header */}
      <header className="grid grid-cols-3 gap-8 items-center mb-10">
        <div className="col-span-2">
            <h1 className="text-5xl font-extrabold tracking-tighter text-gray-900">{personal.name}</h1>
            <p className="mt-2 text-xl font-medium text-primary">Senior Web Developer</p> {/* Example title */}
        </div>
        <div className="text-right text-xs space-y-2">
             <a href={`mailto:${personal.email}`} className="flex items-center justify-end gap-2 hover:text-primary">
                <span>{personal.email}</span> <Mail size={14} />
            </a>
            <a href={`tel:${personal.phone}`} className="flex items-center justify-end gap-2 hover:text-primary">
                <span>{personal.phone}</span> <Phone size={14} />
            </a>
            <div className="flex items-center justify-end gap-2">
                <span>{personal.location}</span> <MapPin size={14} />
            </div>
            <a href={personal.website} target="_blank" rel="noopener noreferrer" className="flex items-center justify-end gap-2 hover:text-primary">
                <span>{personal.website}</span> <Globe size={14} />
            </a>
        </div>
      </header>

      {/* Main Content */}
      <div className="grid grid-cols-3 gap-12">
        {/* Left Column */}
        <div className="col-span-2 space-y-10">
          {/* Summary */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Profile</h2>
            <p className="leading-relaxed">{summary}</p>
          </section>

          {/* Experience */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Experience</h2>
            <div className="space-y-6">
              {experience.map(job => (
                <div key={job.id} className="relative pl-6 before:absolute before:left-0 before:top-2 before:h-2 before:w-2 before:bg-primary before:rounded-full">
                  <div className="flex justify-between items-baseline">
                    <h3 className="font-bold text-gray-900">{job.title}</h3>
                    <span className="text-xs font-mono text-gray-500">{job.dates}</span>
                  </div>
                  <h4 className="font-semibold text-gray-600">{job.company}</h4>
                  <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column */}
        <div className="space-y-10">
          {/* Skills */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Skills</h2>
            <ul className="space-y-2">
              {skills.map(skill => (
                <li key={skill.id} className="flex items-center gap-2">
                  <Sparkles size={14} className="text-primary" />
                  <span>{skill.name}</span>
                </li>
              ))}
            </ul>
          </section>

           {/* Projects */}
          {projects && projects.length > 0 && (
             <section>
                <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Projects</h2>
                <div className="space-y-4">
                  {projects.map(proj => (
                    <div key={proj.id}>
                      <h3 className="font-bold text-gray-900">{proj.name}</h3>
                      <p className="text-xs mt-1 leading-relaxed whitespace-pre-wrap">{proj.description}</p>
                    </div>
                  ))}
                </div>
            </section>
          )}

          {/* Education */}
          <section>
            <h2 className="text-sm font-bold uppercase tracking-widest text-primary mb-4">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900">{edu.degree}</h3>
                  <p className="font-medium text-gray-600">{edu.school}</p>
                  <p className="text-xs text-gray-500">{edu.dates}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default CreativeTemplate;

'use client';
import type { ResumeData } from '@/app/types';
import { Mail, Phone, Globe, MapPin, Briefcase, GraduationCap, Lightbulb, Sparkles } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ModernTemplate = ({ data }: TemplateProps) => {
  const { personal, summary, experience, education, skills, projects } = data;

  return (
    <div id="printable-resume" className="min-h-[1123px] bg-white text-gray-800 font-sans flex text-sm">
      {/* Left Column */}
      <aside className="w-1/3 bg-gray-100 p-8 text-gray-700">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight">{personal.name.split(' ')[0]}</h1>
            <h1 className="text-4xl font-bold text-primary tracking-tight">{personal.name.split(' ').slice(1).join(' ')}</h1>
        </div>

        <div className="space-y-6">
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Contact</h2>
            <div className="space-y-3">
              <a href={`mailto:${personal.email}`} className="flex items-center gap-3 hover:text-primary">
                <Mail size={16} /> <span>{personal.email}</span>
              </a>
              <a href={`tel:${personal.phone}`} className="flex items-center gap-3 hover:text-primary">
                <Phone size={16} /> <span>{personal.phone}</span>
              </a>
              <div className="flex items-center gap-3">
                <MapPin size={16} /> <span>{personal.location}</span>
              </div>
              <a href={personal.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 hover:text-primary">
                <Globe size={16} /> <span>{personal.website}</span>
              </a>
            </div>
          </div>

          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {skills.map(skill => (
                <span key={skill.id} className="bg-gray-200 text-gray-800 px-3 py-1 text-xs rounded-full">
                  {skill.name}
                </span>
              ))}
            </div>
          </div>
          
          <div>
            <h2 className="text-sm font-bold uppercase tracking-widest text-gray-500 mb-3">Education</h2>
            <div className="space-y-4">
              {education.map(edu => (
                <div key={edu.id}>
                  <h3 className="font-bold text-gray-900">{edu.school}</h3>
                  <p className="font-medium">{edu.degree}</p>
                  <p className="text-xs text-gray-500">{edu.dates}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </aside>

      {/* Right Column */}
      <main className="w-2/3 p-8">
        {/* Summary */}
        <section className="mb-8">
          <p className="leading-relaxed text-base italic">{summary}</p>
        </section>

        {/* Experience */}
        <section className="mb-8">
          <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6 border-b pb-3">
            <Briefcase className="text-primary"/>
            Work Experience
          </h2>
          <div className="space-y-6">
            {experience.map(job => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-base font-bold">{job.title}</h3>
                  <span className="text-xs font-mono text-gray-500">{job.dates}</span>
                </div>
                <h4 className="font-semibold text-primary">{job.company}</h4>
                <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </div>
            ))}
          </div>
        </section>
        
        {/* Projects */}
        {projects && projects.length > 0 && (
          <section>
            <h2 className="flex items-center gap-3 text-xl font-bold text-gray-900 mb-6 border-b pb-3">
               <Lightbulb className="text-primary"/>
                Projects
            </h2>
            <div className="space-y-6">
              {projects.map(proj => (
                <div key={proj.id}>
                    <h3 className="text-base font-bold">{proj.name}</h3>
                    <p className="mt-2 text-sm leading-relaxed whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          </section>
        )}
      </main>
    </div>
  );
};

export default ModernTemplate;

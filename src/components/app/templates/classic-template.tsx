'use client';
import type { ResumeData } from '@/app/types';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';

interface TemplateProps {
  data: ResumeData;
}

const ClassicTemplate = ({ data }: TemplateProps) => {
  const { personal, summary, experience, education, skills, projects } = data;

  return (
    <div id="printable-resume" className="p-8 md:p-12 font-sans text-gray-800 bg-white text-base">
      {/* Header */}
      <header className="text-center mb-8 border-b pb-4">
        <h1 className="text-5xl font-bold tracking-wider uppercase">{personal.name}</h1>
        <div className="flex justify-center items-center gap-x-6 gap-y-2 mt-4 text-base text-gray-600 flex-wrap">
          <a href={`mailto:${personal.email}`} className="flex items-center gap-2 hover:text-blue-600">
            <Mail size={16} />
            <span>{personal.email}</span>
          </a>
          <a href={`tel:${personal.phone}`} className="flex items-center gap-2 hover:text-blue-600">
            <Phone size={16} />
            <span>{personal.phone}</span>
          </a>
           <a href={personal.website} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-blue-600">
            <Globe size={16} />
            <span>{personal.website}</span>
          </a>
          <div className="flex items-center gap-2">
            <MapPin size={16} />
            <span>{personal.location}</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="space-y-8">
        {/* Professional Summary */}
        <div>
          <h2 className="text-2xl font-semibold uppercase border-b-2 border-gray-300 pb-2 mb-4 tracking-widest">Summary</h2>
          <p className="leading-relaxed">{summary}</p>
        </div>

        {/* Work Experience */}
        <div>
          <h2 className="text-2xl font-semibold uppercase border-b-2 border-gray-300 pb-2 mb-4 tracking-widest">Experience</h2>
          <div className="space-y-6">
            {experience.map((job) => (
              <div key={job.id}>
                <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold">{job.title}</h3>
                  <span className="text-sm font-mono text-gray-500">{job.dates}</span>
                </div>
                <h4 className="font-medium text-gray-700">{job.company}</h4>
                <p className="mt-2 leading-relaxed whitespace-pre-wrap">{job.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Projects */}
        {projects && projects.length > 0 && (
          <div>
            <h2 className="text-2xl font-semibold uppercase border-b-2 border-gray-300 pb-2 mb-4 tracking-widest">Projects</h2>
            <div className="space-y-6">
              {projects.map((proj) => (
                <div key={proj.id}>
                  <h3 className="text-lg font-bold">{proj.name}</h3>
                  <p className="mt-2 leading-relaxed whitespace-pre-wrap">{proj.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {/* Skills */}
        <div>
          <h2 className="text-2xl font-semibold uppercase border-b-2 border-gray-300 pb-2 mb-4 tracking-widest">Skills</h2>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
               <span key={skill.id} className="bg-gray-200 text-gray-800 px-4 py-2 text-sm rounded-full font-medium">
                  {skill.name}
              </span>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h2 className="text-2xl font-semibold uppercase border-b-2 border-gray-300 pb-2 mb-4 tracking-widest">Education</h2>
          <div className="space-y-4">
            {education.map((edu) => (
              <div key={edu.id}>
                 <div className="flex justify-between items-baseline">
                  <h3 className="text-lg font-bold">{edu.degree}</h3>
                  <span className="text-sm font-mono text-gray-500">{edu.dates}</span>
                </div>
                <h4 className="font-medium text-gray-700">{edu.school}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClassicTemplate;

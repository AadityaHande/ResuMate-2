import type { ResumeData } from '@/app/types';

export const sampleResumeData: ResumeData = {
  personal: {
    name: 'Aaditya Yuvaraj Hande',
    email: 'aadityahande27@gmail.com',
    phone: '+91 82628 91375',
    location: 'Pune, Maharashtra',
    website: 'github.com/AadityaHande',
  },
  summary:
    'Innovative and driven AI/ML Engineer with a strong foundation in full-stack development and computer science. Adept at designing, training, and deploying machine learning models, with hands-on experience in Natural Language Processing (NLP) and computer vision. Proficient in building scalable, responsive web applications using the MERN stack and Next.js. Seeking to leverage expertise in AI and software engineering to solve complex problems and contribute to a fast-paced, cutting-edge team.',
  experience: [
    {
      id: 'exp1',
      title: 'AI/ML Engineer Intern',
      company: 'NVIDIA, Pune',
      dates: 'May 2025 - Jul 2025',
      description:
        '• Developed and fine-tuned a large language model (LLM) for an internal code generation tool, improving developer productivity by 25%.\n• Built a computer vision-based quality assurance system using PyTorch and OpenCV to detect manufacturing defects, reducing manual inspection time by 60%.\n• Created a full-stack dashboard with Next.js and Express.js to visualize model performance metrics and experimental results in real-time.',
    },
  ],
  education: [
    {
      id: 'edu1',
      school: 'MIT Academy of Engineering, Alandi',
      degree: 'B.Tech in Computer Engineering',
      dates: '2024 - Present',
    },
  ],
  skills: [
    { id: 'skill1', name: 'Python' },
    { id: 'skill2', name: 'TypeScript' },
    { id: 'skill3', name: 'Next.js' },
    { id: 'skill4', name: 'React' },
    { id: 'skill5', name: 'Node.js' },
    { id: 'skill6', name: 'TensorFlow' },
    { id: 'skill7', name: 'PyTorch' },
    { id: 'skill8', name: 'Scikit-learn' },
    { id: 'skill9', name: 'LangChain' },
    { id: 'skill10', name: 'Genkit' },
    { id: 'skill11', name: 'NLP' },
    { id: 'skill12', name: 'Computer Vision' },
    { id: 'skill13', name: 'Docker' },
    { id: 'skill14', name: 'MongoDB' },
    { id: 'skill15', name: 'Firebase' },
    { id: 'skill16', name: 'Tableau' },
    { id: 'skill17', name: 'Git & GitHub' },
  ],
  projects: [
    {
      id: 'proj1',
      name: 'ResuMate: AI-Powered Resume Analyzer & ATS Optimizer',
      description:
        'A full-stack application built with Next.js and Genkit AI that provides instant resume analysis, AI-generated suggestions, and a "Pro ATS" feature to rewrite resumes for a 95%+ score against a specific job description. The project features an interactive resume editor and multiple professional templates.',
    },
    {
      id: 'proj2',
      name: 'AI-Style Fitness & Health Tracker',
      description:
        'Developed a personalized fitness dashboard using React and Firebase that tracks user goals, provides AI-generated health insights, and monitors daily habits. Integrated a Python backend for data analysis and predictive modeling.',
    },
    {
      id: 'proj3',
      name: 'Chemistry Lab Management System',
      description:
        'Created a web-based inventory system using HTML, CSS, JavaScript, and Firebase to manage chemical records. Features include role-based access control (RBAC), real-time search functionality, and a dynamic theme toggle.',
    },
  ],
};

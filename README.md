## ResuMate-2 - The AI Co-Pilot for Your Career

![ResuMate-2 Screenshot](https://raw.githubusercontent.com/AadityaHande/ResuMate/main/public/app-screenshot.jpeg)

**ResuMate-2** is an intelligent, AI-powered resume analyzer and builder designed to help job seekers create professional, job-winning resumes with ease. It leverages the power of Google's Gemini models through Genkit to provide instant analysis, actionable feedback, and powerful editing tools, helping you tailor your resume to any job description effortlessly.

**Live Demo:** [**https://resumate-jet-gamma.vercel.app/**](https://resumate-jet-gamma.vercel.app/)

**Video Demo:** [**Watch the Demo on Google Drive**](https://drive.google.com/file/d/1kkPhMjzEVRW4Vk-rWmrTqk6pTa-baUSL/view?usp=drivesdk)

**Drive Folder:** [**Browse Project Documentation and Prototypes**](https://drive.google.com/drive/folders/1hmjWhtTP2hcjd_ImWLQ3UABwYf3zzpGF?usp=sharing)

---

## ✨ Key Features

ResuMate-2 is packed with features to give you a competitive edge in your job search:

*   **📄 Instant Resume Parsing:** Upload your resume (PDF), and our AI will accurately extract key details in seconds, including contact information, work experience, skills, and education.

*   **🤖 AI-Powered Analysis:** Receive an objective, rubric-based score on your resume's clarity, impact, and formatting. Get a professionally written summary to make your profile stand out.

*   **💡 Intelligent Suggestions:** Get a list of specific, actionable suggestions for improvement, focusing on content, clarity, and impact.

*   **🎯 Skills Gap Analysis:** Compare your resume against any job description to identify missing keywords and in-demand skills, helping you tailor your application perfectly.

*   **🚀 ATS Resume Upscaling:** Automatically rewrite your resume for a specific job description to achieve a high ATS (Applicant Tracking System) score (9/10+), significantly increasing your chances of getting noticed.

*   **✍️ AI-Powered Rewrite:** Select any section of your resume—like a job description or project summary—and let the AI rewrite it to be more impactful, professional, and concise.

*   **✉️ AI Cover Letter Generator:** Instantly create a personalized and professional cover letter based on your resume and the job you're applying for.

*   **🎨 Professional Templates:** Choose from multiple professionally designed templates (Classic, Modern, and Creative) that are both visually appealing and ATS-friendly.

*   **✏️ Interactive Editor:** Easily edit your resume content with a live preview. The editor features drag-and-drop sections, an intuitive form, and one-click demo data loading.

*   **🔗 Download & Share:** Download your final resume as a pixel-perfect PDF or share a unique link with others to view your creation.

*   **🌓 Light & Dark Mode:** A sleek, modern UI with a beautiful celestial-themed dark mode and a clean light mode.

---

## 🛠️ Tech Stack

This project is built with a modern, powerful, and scalable tech stack:

*   **Framework:** [Next.js](https://nextjs.org/) (App Router)
*   **Language:** [TypeScript](https://www.typescriptlang.org/)
*   **AI Framework:** [Genkit (Google)](https://firebase.google.com/docs/genkit)
*   **Generative Model:** [Google AI (Gemini 2.5 Flash)](https://ai.google.dev/)
*   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
*   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
*   **Icons:** [Lucide React](https://lucide.dev/guide/packages/lucide-react)
*   **Form Management:** [React Hook Form](https://react-hook-form.com/)
*   **Drag & Drop:** [React DnD](https://react-dnd.github.io/react-dnd/about)
*   **Deployment:** [Vercel](https://vercel.com/)

---

## 🚀 Getting Started

To run this project locally, follow these steps:

### 1. Clone the Repository

```bash
git clone https://github.com/AadityaHande/ResuMate.git
cd ResuMate
```

### 2. Install Dependencies

```bash
npm install
# or
yarn install
```

### 3. Set Up Environment Variables

Create a `.env` file in the root of the project and add your Google AI API key:

```env
GEMINI_API_KEY=YOUR_GOOGLE_AI_API_KEY
```

You can obtain an API key from [Google AI Studio](https://aistudio.google.com/app/apikey).

### 4. Run the Development Servers

This project requires two development servers running concurrently: one for the Next.js frontend and one for the Genkit AI flows.

*   **Terminal 1: Start the Next.js app**
    ```bash
    npm run dev
    ```
    Your application will be available at [http://localhost:9002](http://localhost:9002).

*   **Terminal 2: Start the Genkit AI flows**
    ```bash
    npm run genkit:watch
    ```
    This command starts the Genkit developer UI and makes the AI flows available to your Next.js application.

---

## 📂 Project Structure

```
.
├── src/
│   ├── app/            # Next.js App Router pages and layouts
│   ├── ai/             # All Genkit-related code
│   │   ├── flows/      # Genkit AI flows for different features
│   │   └── genkit.ts   # Genkit initialization and configuration
│   ├── components/     # Reusable React components (ShadCN UI)
│   │   ├── app/        # Application-specific components
│   │   └── ui/         # Generic UI components
│   ├── lib/            # Utility functions and shared libraries
│   └── hooks/          # Custom React hooks
├── public/             # Static assets
└── ...                 # Configuration files
```

---

## 🌟 Acknowledgements

This project was built as part of a hackathon and showcases the power of modern web technologies and generative AI. Special thanks to the creators of Next.js, Genkit, and ShadCN UI for their incredible tools.

import { dbOperations } from '../db/database.js';

const initialProjects = [
  {
    title: "Notice Hub",
    category: "Full-Stack Architecture",
    description: "Consolidates university announcements and streamlines real-time student communication with high uptime.",
    tags: ["React", "Node.js", "Express", "MongoDB"],
    match: "99%",
    episode: "S01 E01",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  },
  {
    title: "Multi-Tenant SaaS Platform",
    category: "Cloud & Distributed Systems",
    description: "Containerized enterprise SaaS featuring strict database isolation and granular role-based access control.",
    tags: ["Docker", "PostgreSQL", "Node.js", "Express"],
    match: "98%",
    episode: "S01 E02",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  },
  {
    title: "Payment Gateway System",
    category: "Fintech Architecture",
    description: "Simulates complex transaction state management, webhook verification, and multi-method processing.",
    tags: ["JavaScript", "PostgreSQL", "REST APIs", "Docker"],
    match: "97%",
    episode: "S01 E03",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  },
  {
    title: "Productivity Suite Extension",
    category: "Client-Side Engineering",
    description: "Custom Chrome extension built with Chrome APIs and advanced JavaScript for task automation and management.",
    tags: ["JavaScript", "Chrome APIs", "Tailwind CSS", "HTML5"],
    match: "99%",
    episode: "S01 E04",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  },
  {
    title: "AI & ML Diagnostic Engine",
    category: "Artificial Intelligence",
    description: "Intelligent data processing pipeline leveraging machine learning models and NLP workflows.",
    tags: ["Python", "Machine Learning", "NLP", "AWS"],
    match: "96%",
    episode: "S01 E05",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  },
  {
    title: "Algorithmic Problem Solver",
    category: "Competitive Programming",
    description: "Optimized data structure solutions across LeetCode, CodeChef, and GeeksforGeeks platforms.",
    tags: ["Data Structures", "Algorithms", "C++", "JavaScript"],
    match: "99%",
    episode: "S01 E06",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  },
  {
    title: "Portfolio Cinematics v2.6",
    category: "UI/UX & Animation",
    description: "Award-winning dark studio interactive portfolio featuring GSAP physics, Netflix theme, and responsive layouts.",
    tags: ["React", "GSAP", "Tailwind CSS", "Express"],
    match: "100%",
    episode: "S01 E07",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  },
  {
    title: "Cloud CI/CD Pipeline",
    category: "DevOps & Infrastructure",
    description: "Automated deployment workflows using GitHub Actions and containerized Docker environments.",
    tags: ["Docker", "GitHub Actions", "CI/CD", "Render"],
    match: "98%",
    episode: "S01 E08",
    githubUrl: "https://github.com/Ankitapal122",
    liveUrl: ""
  }
];

const initialSkills = [
  { 
    title: 'Frontend Engineering', 
    desc: 'Crafting responsive and interactive user interfaces using React, JavaScript, HTML5, CSS3, and Tailwind CSS.', 
    tag: 'UI / INTERACTION',
    skills: ['React', 'JavaScript', 'Tailwind CSS', 'HTML5', 'CSS3'] 
  },
  { 
    title: 'Backend & Databases', 
    desc: 'Building secure REST APIs, authentication flows, server-side applications, and high-performance database architectures.', 
    tag: 'ARCHITECTURE',
    skills: ['Node.js', 'Express', 'PostgreSQL', 'MongoDB', 'SQLite'] 
  },
  { 
    title: 'AI & Machine Learning', 
    desc: 'Developing intelligent applications leveraging NLP, generative AI workflows, computer vision, and LLM systems.', 
    tag: 'INTELLIGENCE',
    skills: ['NLP', 'Generative AI', 'Computer Vision', 'LLMs', 'AWS AI'] 
  },
  { 
    title: 'Cloud & DevOps', 
    desc: 'Deploying and scaling production-grade applications using Docker containers, GitHub Actions, and CI/CD pipelines.', 
    tag: 'INFRASTRUCTURE',
    skills: ['Docker', 'GitHub', 'CI/CD Pipelines', 'Render', 'Docker Hub'] 
  },
  { 
    title: 'Algorithmic Problem Solving', 
    desc: 'Optimizing data structures and solving complex algorithmic challenges across competitive programming platforms.', 
    tag: 'COMPETITIVE',
    skills: ['Data Structures', 'Algorithms', 'LeetCode', 'CodeChef', 'GFG'] 
  },
  { 
    title: 'Tools & Ecosystem', 
    desc: 'Equipped with industry-grade instruments for version control, productivity extensions, and workflow management.', 
    tag: 'PRODUCTIVITY',
    skills: ['Git', 'Chrome APIs', 'Adobe Express', 'Google Cloud', 'VS Code'] 
  }
];

export const seedDatabaseIfEmpty = () => {
  const existingProjects = dbOperations.getAllProjects();
  if (existingProjects.length === 0) {
    console.log('🌱 Seeding initial projects into database...');
    initialProjects.forEach((p) => dbOperations.insertProject(p));
  }

  const existingSkills = dbOperations.getAllSkills();
  if (existingSkills.length === 0) {
    console.log('🌱 Seeding initial skills into database...');
    initialSkills.forEach((s, idx) => dbOperations.insertSkill(s, idx));
  }
};

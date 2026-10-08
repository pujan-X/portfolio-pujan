export interface ExperienceItem {
  id: number;
  type: "EXPERIENCE" | "EDUCATION";
  role: string;
  company: string;
  initials: string;
  duration: string;
  location?: string;
  bullets?: string[];
  skills?: string[];
  description?: string;
}

export const experiences: ExperienceItem[] = [
  {
    id: 1,
    type: "EXPERIENCE",
    role: "Junior Java Developer Intern",
    company: "YuvaIntern · Internship",
    initials: "YI",
    duration: "AUG 2026 – SEP 2026 · 2 MOS",
    location: "Remote",
    bullets: [
      "Developing and maintaining Java applications in a fully remote environment.",
      "Writing clean, efficient code and performing active debugging and testing.",
    ],
    // [PLACEHOLDER: remaining bullet text and 2 extra skills]
    skills: ["Java", "Software Development"],
  },
  {
    id: 2,
    type: "EXPERIENCE",
    role: "Hackathons",
    company: "Various Teams",
    initials: "VT",
    duration: "ONGOING",
    description: "Collaborated in hackathon teams, communicating technical ideas and shipping prototypes.",
  },
  {
    id: 3,
    type: "EDUCATION",
    role: "B.Sc. in Computer Science",
    company: "Thakur Ramnarayan College of Arts and Commerce, Mumbai",
    initials: "TR",
    duration: "EXPECTED GRADUATION JUNE 2027",
    description: "",
  },
];

export const siteConfig = {
  name: "Pujan Suthar",
  githubUsername: "pujan-x",
  location: "Mumbai, India",
  tagline: "Backend & full-stack developer building AI-integrated applications with Java and Spring Boot.",
  bio: "I'm a B.Sc. Computer Science student (graduating 2027) who specializes in backend and full-stack development with Java, Spring Boot, REST APIs, and MySQL. I build applications end to end, from API design and database architecture to containerized cloud deployment. I enjoy integrating third-party AI APIs, debugging complex systems on my own, and explaining technical ideas clearly, skills I've sharpened by working in hackathon teams.",
  email: "pujansuthar345@gmail.com",
  phone: "+91 9137100301",
  linkedin: "http://linkedin.com/in/pujan-",
  github: "https://github.com/pujan-x",
  resumeUrl: "/resume.pdf",
  roles: [
    "Java Backend Developer",
    "Spring Boot Engineer",
    "Full-Stack Developer",
    "AI-Integrated App Builder"
  ],
  stats: {
    focus: "Backend & full-stack, AI integration",
    education: "B.Sc. CS, expected June 2027",
    coreStack: "Java · Spring Boot · MySQL"
  },
  experiences,
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080"
};


import { GitHubIcon, LinkedInIcon, XIcon } from "@/components/icons";
import { EducationItemType } from "@/components/ui/work";

export const EDUCATION_DATA: EducationItemType[] = [
  {
    id: "sgsits-indore",
    institutionName: "SGSITS Indore",
    positions: [
      {
        id: "btech-cs",
        degree: "Bachelor of Technology",
        field: "Computer Science & Engineering",
        educationPeriod: "2020 — 2024",
        educationType: "Undergraduate",
        icon: "education",
        description:
          "Comprehensive computer science education focusing on software engineering principles, algorithms, and modern development practices.",
        coursework: [
          "Data Structures & Algorithms",
          "Object-Oriented Programming (OOP)",
          "Operating Systems",
          "Database Management Systems (DBMS)",
          "Computer Networks",
          "Software Engineering",
          "Web Technologies",
          "Cloud & Deployment",
        ],
        skills: [
          "Arrays",
          "Linked Lists",
          "Trees",
          "Graphs",
          "Dynamic Programming",
          "Design Principles",
          "Abstraction",
          "Inheritance",
          "Polymorphism",
          "Process Management",
          "Memory Allocation",
          "Synchronization",
          "SQL",
          "Normalization",
          "Transactions",
          "Indexing",
          "TCP/IP",
          "HTTP",
          "Sockets",
          "REST APIs",
          "SDLC",
          "Agile",
          "Git/GitHub",
          "HTML",
          "CSS",
          "JavaScript",
          "React",
          "Next.js",
          "Docker",
          "NGINX",
          "CI/CD",
        ],
        isExpanded: true,
      },
    ],
    isCurrentEducation: false,
  },
  {
    id: "crpf-public-school",
    institutionName: "CRPF Public School Delhi",
    positions: [
      {
        id: "secondary-education",
        degree: "Secondary Education",
        field: "Science Stream",
        educationPeriod: "2018 — 2020",
        educationType: "Secondary",
        icon: "education",
        description:
          "Completed secondary education with focus on science and mathematics, building foundation for engineering studies.",
        isExpanded: false,
      },
    ],
    isCurrentEducation: false,
  },
];

export const CERTIFICATIONS_DATA: EducationItemType[] = [
  {
    id: "professional-courses",
    institutionName: "Development",
    positions: [
      {
        id: "coding-ninjas-dsa",
        degree: "Data Structures & Algorithms",
        field: "Coding Ninjas",
        educationPeriod: "2023",
        educationType: "Certification",
        icon: "code",
        description:
          "Comprehensive DSA course covering advanced algorithms, problem-solving techniques, and competitive programming.",
        skills: [
          "Advanced Algorithms",
          "Problem Solving",
          "Competitive Programming",
        ],
        isExpanded: false,
      },
      {
        id: "frontend-elite",
        degree: "Frontend Elite 2.0",
        field: "Sanket Singh",
        educationPeriod: "2023",
        educationType: "Certification",
        icon: "code",
        description:
          "Advanced frontend development course covering modern React patterns, performance optimization, and industry best practices.",
        skills: [
          "Advanced React",
          "Performance Optimization",
          "Modern Frontend Patterns",
        ],
        isExpanded: false,
      },
      {
        id: "cohort-2-harkirat",
        degree: "Cohort 2.0",
        field: "Harkirat Singh",
        educationPeriod: "2024",
        educationType: "Certification",
        icon: "code",
        description:
          "Full-stack development bootcamp covering modern web technologies, DevOps, and production-ready development practices.",
        skills: ["Full-Stack Development", "DevOps", "Production Systems"],
        isExpanded: false,
      },
    ],
    isCurrentEducation: false,
  },
];

export const RESUME_DATA = {
  name: "Anshul Tatware",
  initials: "A",
  location: "Indore, India",
  about: "Frontend Developer",
  summary:
    "Frontend Developer passionate about crafting modern, high-performance web applications. I specialize in React, Next.js, and Tailwind CSS, building seamless user experiences that combine clean design with scalable architecture. My work focuses on component-driven development, performance optimization, and UI consistency, ensuring products feel as good as they look. With a growing interest in AI-driven interfaces and full-stack integration, I'm driven by the challenge of turning ideas into fast, interactive, and meaningful digital experiences",
  avatarUrl: "https://avatars.githubusercontent.com/u/191676359?v=4",
  personalWebsiteUrl: "https://www.devtriex.com",
  resumeUrl: "/Anshul_Resume.pdf",
  contact: {
    email: "anshultatware01@gmail.com",
    social: [
      {
        name: "GitHub",
        url: "https://github.com/anshul-tatware1712",
        icon: GitHubIcon,
      },
      {
        name: "LinkedIn",
        url: "www.linkedin.com/in/anshul-tatware1712",
        icon: LinkedInIcon,
      },
      {
        name: "X",
        url: "https://x.com/_anshulx01",
        icon: XIcon,
      },
    ],
  },
  education: [
    {
      school: "Shri GS Institute of Technology and Science",
      degree: "Bachelor's Degree in Computer Science Engineering",
      start: "2020",
      end: "2024",
    },
    {
      school: "CRPF Public School",
      degree: "Secondary Education in Science Stream",
      start: "2018",
      end: "2020",
    },
  ],
  work: [
    {
      company: "Pixel Technology",
      link: "https://pixeltechnology.in",
      badges: ["On Site"],
      title: "SDE-1 (Frontend Engineer)",
      start: "Apr 2025",
      end: "Aug 2025",
      description:
        "Led the development of real-time chat and campaign tools for the company’s flagship product. Improved overall app speed and optimized user experience, resulting in faster load times and higher engagement. Contributed to core product features including analytics, documentation, and notification systems. Built reusable design components and improved development efficiency across web and mobile teams.",
    },
    {
      company: "Pixel Technology",
      link: "https://pixeltechnology.in",
      badges: ["On Site"],
      title: "Frontend Developer Intern",
      start: "Dec 2024",
      end: "Mar 2025",
      description:
        "Developed a multi-utility web app from concept to deployment. Translated designs into interactive user interfaces and improved user engagement. Focused on accessibility, SEO, and performance optimizations. Collaborated with the team through version control and contributed to analytics setup and data insights.",
    },
  ],
  skills: {
    "Frontend Development": [
      "React.js",
      "Next.js",
      "TypeScript",
      "JavaScript (ES6+)",
      "HTML5",
      "CSS3",
      "Tailwind CSS",
      "Framer Motion",
    ],
    "Mobile Development": [
      "React Native",
      "Expo",
      "Mobile UI/UX",
      "Cross-Platform Apps",
    ],
    "UI/UX & Design": [
      "Figma",
      "UI/UX Design",
      "Responsive Design",
      "Design Systems",
      "Prototyping",
      "Wireframing",
    ],
    "Development Tools": [
      "Git",
      "GitHub",
      "Vite.js",
      "Webpack",
      "npm/yarn",
      "VS Code",
      "Postman",
    ],
    "AI & Backend (Learning)": [
      "Node.js (Learning)",
      "Express.js (Learning)",
      "REST APIs",
      "API Integration",
      "ChatGPT API",
      "Python (Basic)",
      "Machine Learning (Basic)",
    ],
    "Libraries & More": [
      "Storybook",
      "Redux",
      "Zustand",
      "React Query",
      "Jest",
      "Cypress",
      "Prisma",
      "Socket.io",
    ],
  },

  projects: [
    {
      title: "TrioChat: AI WhatsApp Automation Platform",
      techStack: [
        "Next.js (latest)",
        "React 18+",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN UI",
        "Redux/Zustand",
        "WebSockets",
        "Node.js (API)",
        "Docker",
        "PostHog (Analytics)",
        "Vercel",
      ],
      description:
        "Developed a scalable multitenant SaaS platform for WhatsApp Business automation including campaigns, template management, flows, direct CRM integrations, unified inbox, and real-time analytics. Implemented robust state management (Redux/Zustand), optimized rendering for large chat volumes, and integrated API-based automation for over 10+ enterprise clients.",
      link: {
        label: "triochat.io",
        href: "https://triochat.io/",
      },
    },
    {
      title: "TradeAlchemy: P2P Crypto Trading Platform",
      techStack: [
        "React 18+",
        "Next.js",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN UI",
        "Redux/Zustand",
        "WebSockets",
        "Node.js",
        "Express",
        "MongoDB",
        "Socket.io",
        "Styled Components",
        "Docker",
      ],
      description:
        "Built and deployed a secure peer-to-peer crypto exchange platform with wallet integrations, order book management, real-time P2P chat, robust authentication, and two-factor security. Engineered live trading and real-time updates for thousands of users, with modular UI and scalable microservices backend.",
      link: {
        label: "tradealchemy.io",
        href: "http://13.231.101.157/",
      },
    },
    {
      title: "Devtriex: Freelancing Portfolio Website",
      techStack: [
        "Next.js (latest)",
        "React 18+",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN UI",
        "Zustand",
        "Node.js (API)",
        "Vercel",
        "Framer Motion",
      ],
      description:
        "Built a personal freelancing portfolio to showcase major projects, services, and testimonials, with integrated contact forms and social links. The site features a polished, modern UI, mobile responsiveness, animated transitions, and SEO optimization—streamlining client reachout and elevating professional presence.",
      link: {
        label: "devtriex.com",
        href: "https://www.devtriex.com/",
      },
    },
    {
      title: "Startlyz: Boilerplate-Free SaaS Development Kit",
      techStack: [
        "Next.js 15",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN UI",
        "Zustand",
        "TanStack Query/Router",
        "React-Hook-Form",
        "Framer Motion",
        "SWR",
        "Node.js",
        "MongoDB",
        "Docker",
        "Vercel",
        "PostHog",
        "Sentry",
        "Playwright",
      ],
      description:
        "Designed and shipped a dynamic SaaS starter kit allowing users to scaffold production-grade SaaS codebases (frontend, backend, devops) with zero boilerplate overhead. Features multi-tenancy, role-based access, form generation, real-time microservice support, analytics, automated testing, and CI/CD workflows.",
      link: {
        label: "startlyz.vercel.app",
        href: "https://startlyz.vercel.app/",
      },
    },
    {
      title: "PokéAPI Dashboard",
      techStack: [
        "Next.js 14",
        "TypeScript",
        "Tailwind CSS",
        "ShadCN UI",
        "Zustand",
        "TanStack Query",
        "TanStack Table",
        "PapaParse",
        "IndexedDB",
      ],
      description:
        "A high-performance dashboard for managing and visualizing >1300 Pokémon records with features like parallel API fetching, CSV upload and mapping, offline persistence, dynamic columns, inline editing, global search, and a minimalist responsive UI. State and edits are persisted in IndexedDB and Zustand for seamless reloads and scalability.",
      link: {
        label: "poke-api-dashboard",
        href: "https://poke-api-theta-ashen.vercel.app/",
      },
    },
  ],
  extraCurricular: [
    {
      title: "Google Developers Student Club Lead",
      description:
        "Led the Google Developers Student Club, fostering a collaborative environment for technology enthusiasts at PES University.",
    },
    {
      title: "Samarpana, Shunya Technical Head",
      description:
        "Directed technical teams for Samarpana (a fundraising marathon for families of martyrs) and Shunya (Math club) events.",
    },
    {
      title: "Hackathons Participant",
      description:
        "Won National Level Hackathons in Generative-AI - GenAI-Rush and Kodikon3. Participated in over 25 Hackathons with a 90% finalist selection rate.",
    },
  ],
} as const;

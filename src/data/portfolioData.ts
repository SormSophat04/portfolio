import type { Project, SkillCategory, TimelineItem, ServiceItem, TestimonialItem } from '@/types'

export const heroData = {
  name: "Sorm Sophat",
  title: "Software Engineering Student | Full Stack Developer",
  shortIntro: "Passionate software engineering student and full-stack developer dedicated to building elegant, high-performance web applications. Skilled in modern frontend frameworks, robust backend systems, and cloud infrastructure.",
  location: "Phnom Penh, Cambodia",
  cvUrl: "#",
  socials: [
    { label: "GitHub", href: "https://github.com", icon: "github" },
    { label: "LinkedIn", href: "https://linkedin.com", icon: "linkedin" },
    { label: "Facebook", href: "https://facebook.com", icon: "facebook" }
  ]
}

export const aboutData = {
  intro: "Hi, I'm Sorm Sophat, a dedicated Software Engineering student and Full Stack Developer based in Phnom Penh, Cambodia. I specialize in bridging the gap between elegant frontend user experiences and powerful, secure backend systems. My core objective is to build clean, maintainable software that solves real-world issues.",
  education: "Currently pursuing my Bachelor's degree in Software Engineering in Phnom Penh. My academic studies focus heavily on systems design, advanced database management, algorithm analysis, and software design patterns.",
  passion: "Beyond regular coding, I am fascinated by cloud technologies and server architecture. I spend my free time automating deployments, setting up CI/CD pipelines, containerizing applications with Docker, and building API microservices that scale seamlessly.",
  goals: "My career aspiration is to work with leading tech organizations as a Full Stack Architect and DevOps Engineer. I aim to continuously master new tools, contribute to open-source software, and help build systems that run efficiently at scale."
}

export const skillCategories: SkillCategory[] = [
  {
    name: "Frontend Development",
    icon: "layout",
    skills: [
      { name: "HTML5 & CSS3", level: 95 },
      { name: "JavaScript", level: 90 },
      { name: "TypeScript", level: 85 },
      { name: "React & Next.js", level: 88 },
      { name: "Flutter (Mobile)", level: 80 },
      { name: "Bootstrap & Tailwind CSS", level: 90 }
    ]
  },
  {
    name: "Backend Development",
    icon: "server",
    skills: [
      { name: "Laravel (PHP)", level: 92 },
      { name: "ASP.NET MVC (C#)", level: 85 },
      { name: "Java Spring Boot", level: 75 },
      { name: "Firebase", level: 80 }
    ]
  },
  {
    name: "Database Systems",
    icon: "database",
    skills: [
      { name: "PostgreSQL", level: 88 },
      { name: "MySQL / MariaDB", level: 92 },
      { name: "SQL Server (T-SQL)", level: 85 }
    ]
  },
  {
    name: "Cloud & DevOps",
    icon: "cloud",
    skills: [
      { name: "Amazon Web Services (AWS)", level: 78 },
      { name: "Docker Containerization", level: 82 },
      { name: "GitHub Actions (CI/CD)", level: 80 },
      { name: "Linux System Admin", level: 85 }
    ]
  }
]

export const projects: Project[] = [
  {
    title: "AI-Powered Learning Platform",
    description: "An interactive educational system that generates custom learning roadmaps, interactive quizzes, and summarizes materials using AI models. Features real-time dashboard analytics for tracking student progress.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "AWS S3", "OpenAI API"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    imageUrl: "/project-learning.png",
    featured: true,
    category: "web"
  },
  {
    title: "Lost and Found Management System",
    description: "A centralized platform for university students to report lost belongings, match items using description tagging, and receive instant email alerts. Built to streamline campus operations.",
    tags: ["React", "Node.js", "Express", "MongoDB", "Tailwind CSS", "Nodemailer"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    imageUrl: "/project-lost-found.png",
    featured: true,
    category: "web"
  },
  {
    title: "POS System using Laravel",
    description: "A enterprise-ready Point of Sale application featuring inventory management, barcode scanning support, real-time receipt printing, multi-role staff access, and visual sales reporting charts.",
    tags: ["Laravel", "MySQL", "Livewire", "Alpine.js", "Tailwind CSS", "ChartJS"],
    githubUrl: "https://github.com",
    liveUrl: "https://demo.example.com",
    imageUrl: "/project-pos.png",
    featured: true,
    category: "system"
  },
  {
    title: "Library Management System using C#",
    description: "A desktop management console built with C# and WPF. Handles book cataloging, member registration, automated late return fine calculations, and secure data backup routines.",
    tags: ["C#", "WPF", ".NET Core", "SQL Server", "Entity Framework"],
    githubUrl: "https://github.com",
    liveUrl: "",
    imageUrl: "/project-library.png",
    featured: true,
    category: "system"
  },
  {
    title: "Student Management CRUD System",
    description: "A robust admin portal for managing student academic records, enrollments, course catalogs, and grade tracking. Fully compliant with modern security standards and role-based permissions.",
    tags: ["ASP.NET MVC", "C#", "SQL Server", "Bootstrap", "Entity Framework", "Razor Pages"],
    githubUrl: "https://github.com",
    liveUrl: "",
    imageUrl: "/project-student-crud.png",
    featured: true,
    category: "system"
  }
]

export const timelineItems: TimelineItem[] = [
  {
    id: "t1",
    type: "education",
    title: "Bachelor of Science in Software Engineering",
    organization: "Royal University of Phnom Penh (RUPP)",
    duration: "2023 - Present",
    description: "Focusing on advanced database systems, computer networks, object-oriented programming, data structures, and software architecture. Maintaining a top-tier GPA.",
    tags: ["OOP", "Data Structures", "DBMS", "Networking"]
  },
  {
    id: "t2",
    type: "experience",
    title: "Full Stack Developer Intern",
    organization: "Nexus Tech Solutions",
    duration: "July 2025 - December 2025",
    description: "Assisted in building client-facing web applications using Laravel, MySQL, and Tailwind CSS. Participated in daily stand-ups and code reviews, improving performance of API queries by 30%.",
    tags: ["Laravel", "MySQL", "Git", "API Integration"]
  },
  {
    id: "t3",
    type: "certification",
    title: "AWS Certified Developer - Associate",
    organization: "Amazon Web Services (AWS)",
    duration: "Issued March 2025",
    description: "Validated expertise in deploying, debugging, and managing cloud-based applications. Covered Lambda, DynamoDB, ECS, API Gateway, and CI/CD pipelines.",
    tags: ["AWS", "Serverless", "IAM", "Cloud Security"]
  },
  {
    id: "t4",
    type: "project",
    title: "University Lost & Found Portal Launch",
    organization: "RUPP Student Association",
    duration: "September 2024",
    description: "Independently designed, developed, and deployed a collaborative matching platform. Used by over 500+ active students during its initial semester launch.",
    tags: ["React", "Node.js", "MongoDB", "Launch"]
  }
]

export const serviceItems: ServiceItem[] = [
  {
    title: "Web Development",
    description: "Creating premium, fast-loading responsive websites and web systems using modern frameworks like React, Next.js, and Laravel. Optimizing backend performance and API integrations.",
    icon: "code"
  },
  {
    title: "Mobile App Development",
    description: "Building cross-platform native mobile applications with smooth gestures and animations using Flutter, targeting both Android and iOS devices.",
    icon: "smartphone"
  },
  {
    title: "UI/UX & Interactive Design",
    description: "Designing sleek, minimalist user interfaces with visual polish, dark modes, glassmorphism elements, and micro-interactions that captivate users.",
    icon: "figma"
  },
  {
    title: "Cloud Deployment & DevOps",
    description: "Containerizing applications using Docker, deploying to AWS cloud platforms, setting up automated CI/CD pipelines using GitHub Actions, and Linux server management.",
    icon: "terminal"
  }
]

export const testimonialsItems: TestimonialItem[] = [
  {
    id: "r1",
    name: "Dr. Chan Sokhom",
    role: "Senior Software Lecturer",
    company: "RUPP Department of CS",
    avatarUrl: "/testimonial-1.jpg",
    content: "Sophat is one of the most proactive software engineering students I've taught. His Lost and Found project demonstrated exceptional architecture design and practical database knowledge far exceeding course requirements."
  },
  {
    id: "r2",
    name: "Meng Sour",
    role: "Senior Software Engineer",
    company: "Nexus Tech Solutions",
    avatarUrl: "/testimonial-2.jpg",
    content: "During his internship, Sophat demonstrated outstanding learning capabilities. He adapted to our Laravel stack in less than a week, and successfully refactored three core customer modules to be 30% faster."
  },
  {
    id: "r3",
    name: "Srey Leak",
    role: "Startup Founder",
    company: "Sla Tech Studio",
    avatarUrl: "/testimonial-3.jpg",
    content: "Sophat designed and deployed a complex, multi-role POS system dashboard for our retail business. His attention to UI detail, page performance, and database stability was exemplary. Highly recommended!"
  }
]

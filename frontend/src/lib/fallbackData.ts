import type { PortfolioData } from "./types";

export const fallbackData: PortfolioData = {
  profile: {
    id: 1,
    name: "Nimesh Rai",
    title: "Python Developer | Django Developer | AI & Data Enthusiast",
    intro:
      "I build practical software, intelligent applications and data-driven solutions using Python, Django, databases, AI and modern web technologies.",
    bio:
      "Computer Science student focused on backend engineering, clean data flows, and useful AI-powered web products.",
    who_i_am: "A developer who likes turning ideas into working systems.",
    what_i_build:
      "Django apps, REST APIs, data dashboards, automation tools, and practical AI experiments.",
    what_i_know:
      "Python, Django, PostgreSQL, SQL, JavaScript, data analysis, Git workflows, and web fundamentals.",
    what_im_learning:
      "Production Django patterns, advanced data analysis, Generative AI workflows, and polished product design.",
    where_im_going:
      "Toward full-stack engineering roles where backend depth, AI curiosity, and product thinking matter.",
    avatar: null,
    location: "India",
    email: "nimeshrai@example.com",
    phone: "",
    is_active: true,
  },
  projects: [
    {
      id: 1,
      title: "Formula 1 Management Simulator",
      slug: "formula-1-management-simulator",
      category: "DJANGO",
      short_description:
        "A Django-backed simulator for teams, drivers, races, points, and season management.",
      description:
        "A management-style web application that models Formula 1 entities, standings, race outcomes, and admin workflows.",
      problem: "Sports management data needs clear relationships and fast updates.",
      solution:
        "A relational Django system with clean models, admin workflows, and API-ready data.",
      features: [
        "Team and driver management",
        "Race calendar tracking",
        "Standings and points calculation",
        "Admin-controlled season data",
      ],
      architecture:
        "Django models power the domain, Django REST Framework exposes project data, and the frontend presents the project as a cinematic mission file.",
      database:
        "PostgreSQL-friendly schema with teams, drivers, race records, standings, and ordered project media.",
      challenges:
        "Balancing relational accuracy with interfaces that stay fast and readable.",
      learning:
        "Improved database modeling, admin workflows, and API-first project thinking.",
      tech_stack: ["Python", "Django", "PostgreSQL", "JavaScript"],
      github_url: "https://github.com/",
      live_url: null,
      featured_image: null,
      images: [],
      is_featured: true,
      order: 1,
      status: "ACTIVE",
      completion_date: null,
    },
    {
      id: 2,
      title: "OwnMeet",
      slug: "ownmeet",
      category: "WEB",
      short_description: "Online video conferencing application concept.",
      description:
        "A web meeting platform focused on room creation, participant flow, and a clean real-time collaboration interface.",
      problem: "Remote collaboration tools need simple entry and dependable room flows.",
      solution:
        "A focused conferencing interface with clear meeting states and invite paths.",
      features: ["Meeting rooms", "Participant UI", "Call controls", "Responsive layout"],
      architecture:
        "Frontend room states connect to API-ready backend concepts for meeting metadata and participants.",
      database:
        "Room, participant, and session records can be moved into PostgreSQL as the app grows.",
      challenges: "Keeping realtime UI complexity understandable.",
      learning: "Better thinking around stateful interfaces and user flows.",
      tech_stack: ["JavaScript", "HTML", "CSS", "REST APIs"],
      github_url: "https://github.com/",
      live_url: null,
      featured_image: null,
      images: [],
      is_featured: true,
      order: 2,
      status: "IN_PROGRESS",
      completion_date: null,
    },
    {
      id: 3,
      title: "Expense Tracker",
      slug: "expense-tracker",
      category: "PYTHON",
      short_description:
        "A personal finance tracker for expenses, budgets, and reports.",
      description:
        "A practical budgeting app for logging spending, grouping transactions, and spotting monthly trends.",
      problem: "Manual expense tracking becomes messy without categories and summaries.",
      solution:
        "A structured tracker with searchable entries and digestible reports.",
      features: ["Expense CRUD", "Category filtering", "Monthly summaries", "Budget signals"],
      architecture:
        "CRUD-backed entries feed filtered summaries and budget indicators.",
      database: "Transaction, category, and monthly summary data remain editable.",
      challenges: "Making finance data quick to scan without hiding detail.",
      learning: "Practical CRUD design and report-friendly database fields.",
      tech_stack: ["Python", "Django", "SQL"],
      github_url: "https://github.com/",
      live_url: null,
      featured_image: null,
      images: [],
      is_featured: true,
      order: 3,
      status: "COMPLETED",
      completion_date: "2026-05-01",
    },
    {
      id: 4,
      title: "Inventory Management System",
      slug: "inventory-management-system",
      category: "DATABASE",
      short_description: "Stock, product, supplier, and order tracking system.",
      description:
        "A database-oriented management app for keeping inventory records accurate and operational workflows visible.",
      problem: "Inventory records drift when stock movement is not centralized.",
      solution:
        "A CRUD-driven system with searchable records and status-aware stock views.",
      features: ["Product catalog", "Supplier records", "Stock alerts", "Order tracking"],
      architecture:
        "Admin-managed inventory records power stock views and operational tables.",
      database:
        "Products, suppliers, stock movement, and order records are modeled for PostgreSQL.",
      challenges: "Designing useful alerts without making the interface noisy.",
      learning: "Clearer database relationships and admin-first data management.",
      tech_stack: ["Django", "PostgreSQL", "SQL"],
      github_url: "https://github.com/",
      live_url: null,
      featured_image: null,
      images: [],
      is_featured: false,
      order: 4,
      status: "COMPLETED",
      completion_date: null,
    },
    {
      id: 5,
      title: "Data Analysis Project",
      slug: "data-analysis-project",
      category: "DATA",
      short_description:
        "Notebook-based analysis using Pandas, NumPy, and visual summaries.",
      description:
        "A reproducible data exploration project that cleans, analyzes, and explains a dataset through notebook-driven work.",
      problem: "Raw data rarely arrives ready for decision-making.",
      solution:
        "A repeatable cleaning and exploration workflow with readable insights.",
      features: ["Data cleaning", "Exploratory analysis", "Notebook workflow", "Insight summaries"],
      architecture:
        "Notebook steps separate loading, cleaning, exploration, visualization, and final interpretation.",
      database:
        "Structured exports can feed SQL tables or downstream dashboards.",
      challenges: "Turning messy raw inputs into defensible findings.",
      learning: "More disciplined data QA and result storytelling.",
      tech_stack: ["Python", "Pandas", "NumPy", "Jupyter Notebook"],
      github_url: "https://github.com/",
      live_url: null,
      featured_image: null,
      images: [],
      is_featured: false,
      order: 5,
      status: "IN_PROGRESS",
      completion_date: null,
    },
    {
      id: 6,
      title: "AI / GenAI Project",
      slug: "ai-genai-project",
      category: "AI",
      short_description: "A practical AI prototype built around useful automation.",
      description:
        "An applied AI experiment that explores prompt workflows, assistant-style UX, and data-aware automation.",
      problem: "AI tools are most valuable when wrapped around a real workflow.",
      solution:
        "A focused prototype that turns AI output into an interface users can operate.",
      features: ["Prompt workflow", "AI-assisted output", "Human review path", "API-ready structure"],
      architecture:
        "A frontend task flow calls backend endpoints that can later connect to model APIs and data stores.",
      database:
        "Prompt runs, reviewed outputs, and user-facing artifacts can be stored for traceability.",
      challenges: "Keeping AI output reviewable and useful rather than magical.",
      learning: "Prompt design, human review flows, and product-minded AI integration.",
      tech_stack: ["Python", "AI", "Generative AI", "REST APIs"],
      github_url: "https://github.com/",
      live_url: null,
      featured_image: null,
      images: [],
      is_featured: false,
      order: 6,
      status: "ACTIVE",
      completion_date: null,
    },
  ],
  skills: [
    {
      id: 1,
      name: "Programming",
      slug: "programming",
      order: 1,
      skills: [
        { id: 1, category: 1, name: "Python", proficiency: 85, icon: "code", order: 1, spider_sense_highlight: true },
        { id: 2, category: 1, name: "OOP", proficiency: 76, icon: "boxes", order: 2, spider_sense_highlight: false },
        { id: 3, category: 1, name: "Data Structures", proficiency: 72, icon: "network", order: 3, spider_sense_highlight: false },
        { id: 4, category: 1, name: "Algorithms", proficiency: 70, icon: "route", order: 4, spider_sense_highlight: false },
      ],
    },
    {
      id: 2,
      name: "Web Development",
      slug: "web-development",
      order: 2,
      skills: [
        { id: 5, category: 2, name: "Django", proficiency: 82, icon: "server", order: 1, spider_sense_highlight: true },
        { id: 6, category: 2, name: "HTML", proficiency: 78, icon: "layout", order: 2, spider_sense_highlight: false },
        { id: 7, category: 2, name: "CSS", proficiency: 76, icon: "palette", order: 3, spider_sense_highlight: false },
        { id: 8, category: 2, name: "JavaScript", proficiency: 72, icon: "braces", order: 4, spider_sense_highlight: false },
        { id: 9, category: 2, name: "REST APIs", proficiency: 78, icon: "plug", order: 5, spider_sense_highlight: true },
      ],
    },
    {
      id: 3,
      name: "Databases",
      slug: "databases",
      order: 3,
      skills: [
        { id: 10, category: 3, name: "PostgreSQL", proficiency: 76, icon: "database", order: 1, spider_sense_highlight: true },
        { id: 11, category: 3, name: "SQL", proficiency: 78, icon: "table", order: 2, spider_sense_highlight: false },
      ],
    },
    {
      id: 4,
      name: "Data & AI",
      slug: "data-ai",
      order: 4,
      skills: [
        { id: 12, category: 4, name: "Pandas", proficiency: 72, icon: "chart", order: 1, spider_sense_highlight: false },
        { id: 13, category: 4, name: "NumPy", proficiency: 70, icon: "sigma", order: 2, spider_sense_highlight: false },
        { id: 14, category: 4, name: "Jupyter Notebook", proficiency: 74, icon: "notebook", order: 3, spider_sense_highlight: false },
        { id: 15, category: 4, name: "Data Analysis", proficiency: 72, icon: "activity", order: 4, spider_sense_highlight: true },
        { id: 16, category: 4, name: "AI", proficiency: 70, icon: "sparkles", order: 5, spider_sense_highlight: true },
        { id: 17, category: 4, name: "Generative AI", proficiency: 68, icon: "wand", order: 6, spider_sense_highlight: true },
      ],
    },
    {
      id: 5,
      name: "Tools",
      slug: "tools",
      order: 5,
      skills: [
        { id: 18, category: 5, name: "Git", proficiency: 78, icon: "git", order: 1, spider_sense_highlight: false },
        { id: 19, category: 5, name: "GitHub", proficiency: 78, icon: "github", order: 2, spider_sense_highlight: false },
        { id: 20, category: 5, name: "VS Code", proficiency: 84, icon: "terminal", order: 3, spider_sense_highlight: false },
      ],
    },
  ],
  experience: [
    {
      id: 1,
      company: "Personal Projects Lab",
      role: "Python and Django Developer",
      location: "Remote",
      start_date: "2025-01-01",
      end_date: null,
      is_current: true,
      description:
        "Building portfolio-ready applications with Django, PostgreSQL, REST APIs, data tools, and polished frontend interfaces.",
      technologies: ["Python", "Django", "PostgreSQL", "REST APIs", "JavaScript"],
      order: 1,
    },
  ],
  education: [
    {
      id: 1,
      institution: "Computer Science & Engineering",
      degree: "B.Tech",
      field: "Computer Science & Engineering",
      start_date: null,
      end_date: null,
      description:
        "Engineering foundation in programming, algorithms, databases, software engineering, and practical web development.",
      relevant_coursework: [
        "Data Structures",
        "Algorithms",
        "Database Management Systems",
        "Operating Systems",
        "Computer Networks",
        "Software Engineering",
      ],
      projects: ["Formula 1 Management Simulator", "Inventory Management System"],
      achievements: ["Built multiple full-stack academic and personal projects"],
      order: 1,
    },
  ],
  achievements: [
    {
      id: 1,
      category: "Certifications",
      title: "Python and web development learning milestones",
      description:
        "Editable achievement entry. Replace this from the admin dashboard with the exact certificate, award, or milestone.",
      year: 2026,
      icon: "sparkles",
      image: null,
      order: 1,
    },
    {
      id: 2,
      category: "Hackathon Ready",
      title: "Prepared project ideas and prototypes for fast iteration",
      description:
        "Editable achievement entry. Replace this from the admin dashboard with the exact competition, award, or milestone.",
      year: 2026,
      icon: "bolt",
      image: null,
      order: 2,
    },
    {
      id: 3,
      category: "Project Milestone",
      title: "Completed a database-driven portfolio system",
      description:
        "Full-stack Django and Next.js portfolio foundation with editable project content.",
      year: 2026,
      icon: "shield",
      image: null,
      order: 3,
    },
  ],
  social: [
    { id: 1, platform: "GitHub", url: "https://github.com/", icon: "github", order: 1, is_active: true },
    { id: 2, platform: "LinkedIn", url: "https://www.linkedin.com/", icon: "linkedin", order: 2, is_active: true },
    { id: 3, platform: "Email", url: "mailto:nimeshrai@example.com", icon: "mail", order: 3, is_active: true },
  ],
  resume: null,
  settings: {
    id: 1,
    site_name: "Nimesh Rai",
    tagline: "Python Developer | Django Developer | AI & Data Enthusiast",
    meta_description:
      "A cinematic, database-driven developer portfolio for Nimesh Rai.",
    og_image: null,
    enable_spider_sense: true,
    enable_easter_eggs: true,
    contact_email: "nimeshrai@example.com",
    footer_text: "Built as a cinematic developer command center.",
    github_username: "nimesh-rai",
    linkedin_url: "https://www.linkedin.com/",
  },
};

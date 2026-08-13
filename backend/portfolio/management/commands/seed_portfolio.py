"""Seed editable portfolio content for local development."""
from datetime import date

from django.core.management.base import BaseCommand

from portfolio.models import (
    Achievement,
    Education,
    Experience,
    Profile,
    Project,
    SiteSettings,
    Skill,
    SkillCategory,
    SocialLink,
)


class Command(BaseCommand):
    help = "Load starter content for Nimesh Rai's portfolio."

    def handle(self, *args, **options):
        Profile.objects.update_or_create(
            name="Nimesh Rai",
            defaults={
                "title": "Python Developer | Django Developer | AI & Data Enthusiast",
                "intro": (
                    "I build practical software, intelligent applications and "
                    "data-driven solutions using Python, Django, databases, AI "
                    "and modern web technologies."
                ),
                "bio": (
                    "Computer Science student focused on backend engineering, "
                    "clean data flows, and useful AI-powered web products."
                ),
                "who_i_am": "A developer who likes turning ideas into working systems.",
                "what_i_build": (
                    "Django apps, REST APIs, data dashboards, automation tools, "
                    "and practical AI experiments."
                ),
                "what_i_know": (
                    "Python, Django, PostgreSQL, SQL, JavaScript, data analysis, "
                    "Git workflows, and web fundamentals."
                ),
                "what_im_learning": (
                    "Production Django patterns, advanced data analysis, "
                    "Generative AI workflows, and polished product design."
                ),
                "where_im_going": (
                    "Toward full-stack engineering roles where backend depth, "
                    "AI curiosity, and product thinking matter."
                ),
                "location": "India",
                "email": "nimeshrai@example.com",
                "is_active": True,
            },
        )

        SiteSettings.objects.update_or_create(
            site_name="Nimesh Rai",
            defaults={
                "tagline": "Python Developer | Django Developer | AI & Data Enthusiast",
                "meta_description": (
                    "A cinematic, database-driven developer portfolio for Nimesh Rai."
                ),
                "enable_spider_sense": True,
                "enable_easter_eggs": True,
                "contact_email": "nimeshrai@example.com",
                "footer_text": "Built as a cinematic developer command center.",
                "github_username": "nimesh-rai",
                "linkedin_url": "https://www.linkedin.com/",
                "is_active": True,
            },
        )

        categories = {
            "Programming": ["Python", "OOP", "Data Structures", "Algorithms"],
            "Web Development": ["Django", "HTML", "CSS", "JavaScript", "REST APIs"],
            "Databases": ["PostgreSQL", "SQL"],
            "Data & AI": [
                "Pandas",
                "NumPy",
                "Jupyter Notebook",
                "Data Analysis",
                "AI",
                "Generative AI",
            ],
            "Tools": ["Git", "GitHub", "VS Code"],
        }
        for category_order, (category_name, skills) in enumerate(categories.items(), 1):
            category, _ = SkillCategory.objects.update_or_create(
                name=category_name,
                defaults={"order": category_order},
            )
            for skill_order, skill_name in enumerate(skills, 1):
                Skill.objects.update_or_create(
                    category=category,
                    name=skill_name,
                    defaults={
                        "order": skill_order,
                        "proficiency": 80 if skill_name in {"Python", "Django"} else 70,
                        "spider_sense_highlight": skill_name
                        in {"Python", "Django", "PostgreSQL", "AI"},
                    },
                )

        projects = [
            {
                "title": "Formula 1 Management Simulator",
                "category": Project.Category.DJANGO,
                "short_description": (
                    "A Django-backed simulator for teams, drivers, races, points, "
                    "and season management."
                ),
                "description": (
                    "A management-style web application that models Formula 1 "
                    "entities, standings, race outcomes, and admin workflows."
                ),
                "problem": "Sports management data needs clear relationships and fast updates.",
                "solution": "A relational Django system with clean models, admin workflows, and API-ready data.",
                "features": [
                    "Team and driver management",
                    "Race calendar tracking",
                    "Standings and points calculation",
                    "Admin-controlled season data",
                ],
                "tech_stack": ["Python", "Django", "PostgreSQL", "JavaScript"],
                "status": Project.Status.ACTIVE,
                "order": 1,
                "is_featured": True,
            },
            {
                "title": "OwnMeet",
                "category": Project.Category.WEB,
                "short_description": "Online video conferencing application concept.",
                "description": (
                    "A web meeting platform focused on room creation, participant "
                    "flow, and a clean real-time collaboration interface."
                ),
                "problem": "Remote collaboration tools need simple entry and dependable room flows.",
                "solution": "A focused conferencing interface with clear meeting states and invite paths.",
                "features": ["Meeting rooms", "Participant UI", "Call controls", "Responsive layout"],
                "tech_stack": ["JavaScript", "HTML", "CSS", "REST APIs"],
                "status": Project.Status.IN_PROGRESS,
                "order": 2,
                "is_featured": True,
            },
            {
                "title": "Expense Tracker",
                "category": Project.Category.PYTHON,
                "short_description": "A personal finance tracker for expenses, budgets, and reports.",
                "description": (
                    "A practical budgeting app for logging spending, grouping "
                    "transactions, and spotting monthly trends."
                ),
                "problem": "Manual expense tracking becomes messy without categories and summaries.",
                "solution": "A structured tracker with searchable entries and digestible reports.",
                "features": ["Expense CRUD", "Category filtering", "Monthly summaries", "Budget signals"],
                "tech_stack": ["Python", "Django", "SQL"],
                "status": Project.Status.COMPLETED,
                "order": 3,
                "is_featured": True,
                "completion_date": date(2026, 5, 1),
            },
            {
                "title": "Inventory Management System",
                "category": Project.Category.DATABASE,
                "short_description": "Stock, product, supplier, and order tracking system.",
                "description": (
                    "A database-oriented management app for keeping inventory "
                    "records accurate and operational workflows visible."
                ),
                "problem": "Inventory records drift when stock movement is not centralized.",
                "solution": "A CRUD-driven system with searchable records and status-aware stock views.",
                "features": ["Product catalog", "Supplier records", "Stock alerts", "Order tracking"],
                "tech_stack": ["Django", "PostgreSQL", "SQL"],
                "status": Project.Status.COMPLETED,
                "order": 4,
            },
            {
                "title": "Data Analysis Project",
                "category": Project.Category.DATA,
                "short_description": "Notebook-based analysis using Pandas, NumPy, and visual summaries.",
                "description": (
                    "A reproducible data exploration project that cleans, analyzes, "
                    "and explains a dataset through notebook-driven work."
                ),
                "problem": "Raw data rarely arrives ready for decision-making.",
                "solution": "A repeatable cleaning and exploration workflow with readable insights.",
                "features": ["Data cleaning", "Exploratory analysis", "Notebook workflow", "Insight summaries"],
                "tech_stack": ["Python", "Pandas", "NumPy", "Jupyter Notebook"],
                "status": Project.Status.IN_PROGRESS,
                "order": 5,
            },
            {
                "title": "AI / GenAI Project",
                "category": Project.Category.AI,
                "short_description": "A practical AI prototype built around useful automation.",
                "description": (
                    "An applied AI experiment that explores prompt workflows, "
                    "assistant-style UX, and data-aware automation."
                ),
                "problem": "AI tools are most valuable when wrapped around a real workflow.",
                "solution": "A focused prototype that turns AI output into an interface users can operate.",
                "features": ["Prompt workflow", "AI-assisted output", "Human review path", "API-ready structure"],
                "tech_stack": ["Python", "AI", "Generative AI", "REST APIs"],
                "status": Project.Status.ACTIVE,
                "order": 6,
            },
        ]
        for project in projects:
            Project.objects.update_or_create(
                title=project["title"],
                defaults={
                    "slug": "",
                    "architecture": (
                        "Layered web architecture with editable content, API responses, "
                        "and recruiter-friendly presentation."
                    ),
                    "database": (
                        "Relational data model designed around clean ownership and "
                        "searchable records."
                    ),
                    "challenges": (
                        "Balancing visual polish with real functionality and maintainable code."
                    ),
                    "learning": (
                        "Better project structure, API design, and production-minded UI states."
                    ),
                    **project,
                },
            )

        Education.objects.update_or_create(
            degree="B.Tech",
            institution="Computer Science & Engineering",
            defaults={
                "field": "Computer Science & Engineering",
                "description": (
                    "Engineering foundation in programming, algorithms, databases, "
                    "software engineering, and practical web development."
                ),
                "relevant_coursework": [
                    "Data Structures",
                    "Algorithms",
                    "Database Management Systems",
                    "Operating Systems",
                    "Computer Networks",
                    "Software Engineering",
                ],
                "projects": ["Formula 1 Management Simulator", "Inventory Management System"],
                "achievements": ["Built multiple full-stack academic and personal projects"],
                "order": 1,
            },
        )

        Experience.objects.update_or_create(
            company="Personal Projects Lab",
            role="Python and Django Developer",
            defaults={
                "location": "Remote",
                "start_date": date(2025, 1, 1),
                "end_date": None,
                "is_current": True,
                "description": (
                    "Building portfolio-ready applications with Django, PostgreSQL, "
                    "REST APIs, data tools, and polished frontend interfaces."
                ),
                "technologies": ["Python", "Django", "PostgreSQL", "REST APIs", "JavaScript"],
                "order": 1,
            },
        )

        for order, payload in enumerate(
            [
                ("Certifications", "Python and web development learning milestones", 2026),
                ("Hackathon Ready", "Prepared project ideas and prototypes for fast iteration", 2026),
                ("Project Milestone", "Completed a database-driven portfolio system", 2026),
            ],
            1,
        ):
            Achievement.objects.update_or_create(
                title=payload[1],
                defaults={
                    "category": payload[0],
                    "description": (
                        "Editable achievement entry. Replace this from the admin dashboard "
                        "with the exact certificate, award, or milestone."
                    ),
                    "year": payload[2],
                    "icon": "sparkles",
                    "order": order,
                },
            )

        for order, (platform, url, icon) in enumerate(
            [
                ("GitHub", "https://github.com/", "github"),
                ("LinkedIn", "https://www.linkedin.com/", "linkedin"),
                ("Email", "mailto:nimeshrai@example.com", "mail"),
            ],
            1,
        ):
            SocialLink.objects.update_or_create(
                platform=platform,
                defaults={"url": url, "icon": icon, "order": order, "is_active": True},
            )

        self.stdout.write(self.style.SUCCESS("Seeded portfolio content."))

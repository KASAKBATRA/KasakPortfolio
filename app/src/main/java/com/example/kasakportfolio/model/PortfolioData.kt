package com.example.kasakportfolio.model

import androidx.annotation.DrawableRes
import com.example.kasakportfolio.R

data class MilestoneItem(
    val id: Int,
    val highlight: String,
    val caption: String,
    val tags: List<String>,
    @DrawableRes val imageRes: Int? = null,
    val secondaryImageRes: Int? = null,
    val linkUrl: String? = null
)

data class WorkExperience(
    val title: String,
    val company: String,
    val location: String,
    val period: String,
    val description: String,
    val achievements: List<String>
)

data class EducationItem(
    val title: String,
    val institution: String,
    val location: String,
    val period: String,
    val description: String,
    val achievements: List<String>
)

data class CertificationItem(
    val name: String,
    val issuer: String,
    val year: String,
    val note: String? = null,
    @DrawableRes val imageRes: Int? = null
)

data class SkillItem(
    val name: String,
    val desc: String
)

data class SkillCategory(
    val title: String,
    val colorHex: Long,
    val skills: List<SkillItem>
)

data class ProjectItem(
    val id: String,
    val title: String,
    val description: String,
    @DrawableRes val imageRes: Int? = null,
    val tags: List<String>,
    val techStack: List<String>,
    val githubUrl: String,
    val liveUrl: String? = null,
    val linkedinUrl: String? = null,
    val category: String,
    val featured: Boolean = false,
    val hasCaseStudy: Boolean = false
)

object PortfolioDataSource {
    val statCards = listOf(
        "94.5% – B.Tech, AI & Data Science (2026)",
        "GATE 2026 – AI & Data Science, qualified",
        "UGC NET – Computer Science Applications",
        "3 papers + 1 book – published research and authorship"
    )

    val milestones = listOf(
        MilestoneItem(
            id = 6,
            highlight = "📘 Author of “Hello AI: A Friendly Introduction to Machine Learning” — Published by Eliva Press",
            caption = "Published debut book “Hello AI: A Friendly Introduction to Machine Learning” — a beginner-friendly guide designed to simplify AI and ML concepts through practical insights and clear explanations. Available worldwide on Eliva Bookstore and Amazon.",
            tags = listOf("Author", "AI", "Machine Learning", "Eliva Press", "Book"),
            imageRes = R.drawable.photo_1,
            secondaryImageRes = R.drawable.photo_2,
            linkUrl = "https://www.amazon.com/dp/9999331718"
        ),
        MilestoneItem(
            id = 1,
            highlight = "Nutricaree: Bridging Nutrition Science and Digital Wellness",
            caption = "Published in IJEDR Journal, Volume 13, Issue 4, November 2025. Explores computational nutrition science and digital wellness recommendation models.",
            tags = listOf("Research", "IJEDR", "Health AI"),
            imageRes = null,
            linkUrl = "https://portfoliokasak.netlify.app/#research"
        ),
        MilestoneItem(
            id = 2,
            highlight = "Data Science Solutions for Next Generation Cities",
            caption = "Published in IJPREMS Journal, Vol. 04, Issue 11, November 2024, pp. 928–930. Explores data-driven approaches for smart city planning and predictive analytics.",
            tags = listOf("Publication", "Data Science", "Smart Cities"),
            imageRes = R.drawable.ach2
        ),
        MilestoneItem(
            id = 3,
            highlight = "Image to Pencil Recognition using Machine Learning and OpenCV",
            caption = "Presented at NCBISF'24 national conference detailing automated computer vision edge detection and pencil sketch synthesis using OpenCV.",
            tags = listOf("Conference", "OpenCV", "NCBISF-24"),
            imageRes = R.drawable.ach1,
            linkUrl = "https://github.com/jyotirana2005/Image-to-Pencil-Recognition-Using-ML-OpenCV"
        )
    )

    val workExperiences = listOf(
        WorkExperience(
            title = "Young Professional",
            company = "Office of the Comptroller & Auditor General of India (CAG)",
            location = "Delhi, India",
            period = "Sep 2026 – Present",
            description = "Supporting data-driven remote audit activities and analytical reporting for national oversight programs.",
            achievements = listOf(
                "Working on data analytics and remote audit, supporting data-driven audit activities and analytical reporting",
                "Applying SQL, Python and data analytics techniques to analyse datasets and generate audit insights"
            )
        ),
        WorkExperience(
            title = "Software Faculty",
            company = "Delhi Institute of Computer Science",
            location = "Delhi, India",
            period = "Jul 2026 – Sep 2026",
            description = "Trained students in software engineering, programming paradigms, and foundational data science.",
            achievements = listOf(
                "Trained students in Python, C, C++, Java, SQL, Data Analytics and Programming Fundamentals",
                "Taught Data Science, Machine Learning, Data Structures and Algorithms, Internet of Things, Operating Systems and Database concepts through lectures and practical sessions"
            )
        ),
        WorkExperience(
            title = "Data Analytics Intern",
            company = "Office of the Comptroller & Auditor General of India",
            location = "Delhi, India",
            period = "Jan 2026 – Jul 2026",
            description = "Engineered automated audit pipelines, REST API data bridges, and multimodal model evaluations.",
            achievements = listOf(
                "Developed KNIME workflows for audit analytics: data validation, anomaly detection, duplicate identification and record reconciliation",
                "Built REST APIs for NREGA and GeM data integration, automating data transfer between databases and AWS S3",
                "Performed SQL-based analysis for government welfare audits, validating datasets and supporting audit observations",
                "Evaluated LLMs and Vision Language Models (VLMs) for multimodal data validation and product-image consistency"
            )
        )
    )

    val education = listOf(
        EducationItem(
            title = "B.Tech in Artificial Intelligence & Data Science",
            institution = "Dr. Akhilesh Das Gupta Institute of Professional Studies",
            location = "Delhi, India",
            period = "2026 Graduate",
            description = "Graduated with 94.5% aggregate with specialized coursework in Machine Learning, Deep Learning, and Advanced Analytics.",
            achievements = listOf(
                "94.5% aggregate percentage in B.Tech",
                "GATE 2026 Qualified (AI & Data Science)",
                "UGC NET Qualified (Computer Science Applications)",
                "EPAM Systems Scholar (2024–25)"
            )
        ),
        EducationItem(
            title = "Senior Secondary & Secondary Education (CBSE)",
            institution = "MotiRam Memorial Girls Senior Secondary School",
            location = "Delhi, India",
            period = "2020 – 2022",
            description = "Strong analytical grounding in Mathematics and Science.",
            achievements = listOf(
                "CBSE Class XII: 89% (2022)",
                "CBSE Class X: 84% (2020)"
            )
        )
    )

    val certifications = listOf(
        CertificationItem(
            name = "GATE 2026 Qualified",
            issuer = "National GATE Committee",
            year = "2026",
            note = "AI & Data Science"
        ),
        CertificationItem(
            name = "UGC NET Qualified",
            issuer = "National Testing Agency (NTA)",
            year = "2026",
            note = "Computer Science Applications"
        ),
        CertificationItem(
            name = "Business Analytics & Data Mining with R",
            issuer = "NPTEL",
            year = "2025",
            note = "Top 2% Elite",
            imageRes = R.drawable.cert_1
        ),
        CertificationItem(
            name = "IBM Summer Training",
            issuer = "IBM",
            year = "2024",
            note = "ML, DL, Gen AI, IBM Cloud",
            imageRes = R.drawable.cert_3
        )
    )

    val beyondWork = listOf(
        "Graphics Head, National Service Scheme (NSS)",
        "Codeveda Hackathon Mentor (15+ teams guided)",
        "Volunteer, Khelo India Para Games"
    )

    val skillCategories = listOf(
        SkillCategory(
            title = "Programming",
            colorHex = 0xFF3B82F6,
            skills = listOf(
                SkillItem("Python", "Machine Learning, Pandas, Automation & GeoPandas"),
                SkillItem("SQL", "Complex queries, joins, window functions & audit analysis"),
                SkillItem("R", "Statistical modeling & data mining"),
                SkillItem("Java", "Object-oriented software systems"),
                SkillItem("C", "Data structures & foundational systems"),
                SkillItem("JavaScript", "Modern web interactivity & API integration"),
                SkillItem("HTML", "Semantic markup & structure"),
                SkillItem("CSS", "Responsive design & modern styling")
            )
        ),
        SkillCategory(
            title = "Data Analytics",
            colorHex = 0xFF06B6D4,
            skills = listOf(
                SkillItem("SQL", "Relational audit queries & aggregations"),
                SkillItem("KNIME", "Automated anomaly detection, duplicate checks & workflows"),
                SkillItem("Power BI", "Executive reporting & KPI dashboards"),
                SkillItem("Data Cleaning", "Data normalization, imputation & parsing"),
                SkillItem("ETL", "Extract, Transform, Load pipelines"),
                SkillItem("Data Validation", "Cross-table reconciliation & schema verification"),
                SkillItem("Data Visualization", "Presenting actionable insights to stakeholders")
            )
        ),
        SkillCategory(
            title = "Machine Learning",
            colorHex = 0xFFA855F7,
            skills = listOf(
                SkillItem("Regression", "Continuous value estimation & trends"),
                SkillItem("Classification", "Categorical prediction & risk scoring"),
                SkillItem("Clustering", "Unsupervised anomaly detection & segmentation"),
                SkillItem("NLP", "Natural Language Processing & semantic extraction"),
                SkillItem("Feature Engineering", "Feature scaling, encoding & selection"),
                SkillItem("OpenCV", "Computer vision & edge filtering")
            )
        ),
        SkillCategory(
            title = "Libraries",
            colorHex = 0xFFF59E0B,
            skills = listOf(
                SkillItem("NumPy", "Vectorized numerical operations"),
                SkillItem("Pandas", "Tabular data transformation & analysis"),
                SkillItem("Scikit-learn", "ML pipelines & model evaluation"),
                SkillItem("Matplotlib", "Statistical charting & visualization")
            )
        ),
        SkillCategory(
            title = "Cloud & Databases",
            colorHex = 0xFF10B981,
            skills = listOf(
                SkillItem("AWS S3", "Cloud object storage & bucket management"),
                SkillItem("MySQL", "Relational schema design & transactional storage"),
                SkillItem("Neon Database", "Serverless PostgreSQL storage")
            )
        ),
        SkillCategory(
            title = "Developer Tools",
            colorHex = 0xFFEF4444,
            skills = listOf(
                SkillItem("Git", "Distributed version control"),
                SkillItem("GitHub", "Code collaboration & repositories"),
                SkillItem("VS Code", "Code editor & extensions"),
                SkillItem("Cursor", "AI-assisted development environment"),
                SkillItem("GitHub Copilot", "Pair programming assistant"),
                SkillItem("Claude", "Prompt engineering & code generation")
            )
        )
    )

    val projects = listOf(
        ProjectItem(
            id = "mapmywork",
            title = "MapMyWork",
            description = "Interactive geospatial workforce mapping app that visualizes workforce distribution across multiple cities, with user-driven filtering and click-enabled map markers showing workforce statistics and location-specific details.",
            imageRes = null,
            tags = listOf("Python", "GeoPandas", "Mapping", "GIS"),
            techStack = listOf("Python", "GeoPandas", "Data Visualization"),
            githubUrl = "https://github.com/KASAKBATRA/MapMyWork-Workforce-mapping-with-user-input-",
            category = "Geospatial Analytics",
            featured = true
        ),
        ProjectItem(
            id = "campushire",
            title = "CampusHire Analytics",
            description = "SQL-backed placement management system with a responsive UI for automated candidate verification, academic record validation, and administrative recruitment workflows.",
            imageRes = R.drawable.campushire_hero,
            tags = listOf("HTML", "CSS", "JavaScript", "SQL"),
            techStack = listOf("HTML", "CSS", "JavaScript", "SQL"),
            githubUrl = "https://github.com/KASAKBATRA/CampusHire_Analytics",
            category = "Analytics & Systems",
            featured = true,
            hasCaseStudy = true
        ),
        ProjectItem(
            id = "audit_analytics",
            title = "Audit Analytics & Data Integration",
            description = "Work at CAG; KNIME workflows for validation, anomaly and duplicate detection, plus REST APIs moving NREGA and GeM data between databases and AWS S3.",
            imageRes = null,
            tags = listOf("KNIME", "SQL", "REST APIs", "AWS S3"),
            techStack = listOf("KNIME", "SQL", "REST APIs", "AWS S3"),
            githubUrl = "https://portfoliokasak.netlify.app/#projects",
            category = "Audit & Data Pipelines",
            featured = false
        )
    )
}

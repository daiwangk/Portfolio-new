import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Projects.css'

const projects = [
    {
        title: "Legal & Financial Document Intelligence",
        emoji: "⚖️",
        problem: "Legal documents have complex clause hierarchies; standard RAG pipelines hallucinate and lose context across sections",
        built: "Corrective RAG pipeline using LangGraph that grades retrieved chunks and rewrites queries automatically. Dual-LLM architecture: Llama 3.1-8B for grading + Llama 3.3-70B for generation. Deployed on Hugging Face Spaces.",
        learned: "Hierarchical chunking with LlamaIndex, Pydantic v2 validation, Ragas evaluation framework, and optimizing latency vs accuracy trade-offs",
        tags: ["LangGraph", "FastAPI", "ChromaDB", "Groq", "Streamlit", "LlamaIndex", "Ragas"],
        gradient: "linear-gradient(135deg, #0ea5e9 0%, #6366f1 100%)",
        link: "#",
        hasCase: false
    },
    {
        title: "Clothing & Retail AI Assistant",
        emoji: "🛒",
        problem: "Customers needed conversational help for product discovery and order tracking during internal beta testing",
        built: "AI chatbot using Rasa + FastAPI with Llama 3.2 via Ollama, reducing manual catalog lookups by ~25%. Deployed with Docker.",
        learned: "Conversational AI patterns, intent recognition fine-tuning (74% → 82% accuracy), and integrating LLMs with production APIs",
        tags: ["Python", "Rasa", "FastAPI", "Llama 3.2", "SQLite", "Docker"],
        gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
        link: "/projects/retail-ai",
        hasCase: true
    },
    {
        title: "Automated YouTube Shorts Pipeline",
        emoji: "🎬",
        problem: "Creating YouTube Shorts manually is time-consuming and lacks consistency in content pipeline",
        built: "End-to-end workflow with Reddit ingestion, LLaMA 3.3 narration, video generation, and scheduled YouTube uploads. Automated metadata logging via Google Sheets.",
        learned: "Agentic automation with n8n, content ranking algorithms, LLM narration pipelines, and video generation workflows",
        tags: ["n8n", "Python", "Groq API", "LLaMA 3.3", "Google Sheets"],
        gradient: "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
        link: "#",
        hasCase: false
    },
    {
        title: "Real-Time Motion Detection",
        emoji: "📹",
        problem: "Surveillance systems needed faster processing with fewer false alerts for real-time monitoring",
        built: "Surveillance pipeline using frame differencing and contour detection achieving ~45ms/frame latency with blur filtering",
        learned: "OpenCV pipeline optimization, frame differencing techniques, and building low-latency inference systems",
        tags: ["Python", "OpenCV", "Computer Vision"],
        gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        link: "https://github.com/daiwangk/Real-Time-Motion-Detection",
        hasCase: false
    },
    {
        title: "AI Document Assistant (RAG)",
        emoji: "📄",
        problem: "Users needed a way to query their own PDF and TXT documents with accurate, grounded answers — not hallucinations",
        built: "Full-stack RAG web app: FastAPI backend, ChromaDB vector store, Sentence-Transformers (all-MiniLM-L6-v2) for local embeddings, and Google Gemini 2.5 for grounded answers. Dark-themed drag-and-drop UI.",
        learned: "End-to-end RAG architecture, smart chunking with overlap, Dockerizing Python + FastAPI apps, and combining local embedding with cloud LLMs",
        tags: ["Python", "FastAPI", "ChromaDB", "Google Gemini", "Sentence-Transformers", "Docker"],
        gradient: "linear-gradient(135deg, #10b981 0%, #059669 100%)",
        link: "https://github.com/daiwangk/AI-Assistant-RAG",
        hasCase: false
    },
    {
        title: "ElevenLabs Voice Agent",
        emoji: "🎙️",
        problem: "Manual debt collection is inefficient; agents needed autonomous outbound calling with smart scheduling and compliance guardrails",
        built: "Multi-agent system with Hermes-style orchestration: Scheduler Agent (Apify holidays + timezone), Caller Agent (ElevenLabs voice AI), Learning Agent (closed-loop from call outcomes). WhatsApp fallback via Meta Cloud API.",
        learned: "Hermes orchestration pattern, ElevenLabs Conversational AI integration, closed learning loops, tenacity retry patterns, and multi-agent tool design",
        tags: ["Python", "FastAPI", "ElevenLabs", "Airtable", "Apify", "OpenRouter", "Pydantic"],
        gradient: "linear-gradient(135deg, #f59e0b 0%, #ef4444 100%)",
        link: "https://github.com/daiwangk/11labsVoiceagent",
        hasCase: false
    },
    {
        title: "Team Task Manager",
        emoji: "✅",
        problem: "Teams needed a structured project management tool with role-based access, task tracking, and a visual Kanban workflow",
        built: "Full-stack app with React + Vite frontend and Express.js + PostgreSQL (Prisma) backend. JWT auth, RBAC (Admin/Member roles), Kanban board, and deployed live on Railway.",
        learned: "Full-stack architecture with monorepo setup, Prisma ORM, JWT session management, RBAC middleware design, and cloud deployment with Railway",
        tags: ["React", "Express.js", "PostgreSQL", "Prisma", "JWT", "Railway"],
        gradient: "linear-gradient(135deg, #8b5cf6 0%, #ec4899 100%)",
        link: "https://github.com/daiwangk/team-task-manager",
        hasCase: false
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15
        }
    }
}

const cardVariants = {
    hidden: { opacity: 0, y: 50, scale: 0.95 },
    visible: {
        opacity: 1,
        y: 0,
        scale: 1,
        transition: {
            duration: 0.6,
            ease: [0.4, 0, 0.2, 1]
        }
    }
}

function Projects() {
    return (
        <section id="projects" className="section projects">
            <div className="projects-bg">
                <div className="bg-orb orb-projects"></div>
            </div>

            <div className="container">
                <motion.div
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Things I've Built While Learning</h2>
                    <p>Each project taught me something new about AI & backend development</p>
                </motion.div>

                <motion.div
                    className="projects-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {projects.map((project, index) => (
                        <motion.article
                            key={index}
                            className="project-card card"
                            variants={cardVariants}
                            whileHover={{ scale: 1.02 }}
                            transition={{ duration: 0.2 }}
                        >
                            <div className="project-glow" style={{ background: project.gradient }}></div>

                            <div className="project-header">
                                <span className="project-emoji" style={{ background: project.gradient }}>
                                    {project.emoji}
                                </span>
                                <h3>{project.title}</h3>
                            </div>

                            <div className="project-details">
                                <div className="project-detail">
                                    <span className="detail-icon">🧠</span>
                                    <div>
                                        <span className="detail-label">Problem</span>
                                        <p>{project.problem}</p>
                                    </div>
                                </div>
                                <div className="project-detail">
                                    <span className="detail-icon">🛠</span>
                                    <div>
                                        <span className="detail-label">What I Built</span>
                                        <p>{project.built}</p>
                                    </div>
                                </div>
                                <div className="project-detail">
                                    <span className="detail-icon">📚</span>
                                    <div>
                                        <span className="detail-label">What I Learned</span>
                                        <p>{project.learned}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="project-footer">
                                <div className="project-tags">
                                    {project.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                                {project.hasCase && (
                                    <Link 
                                        to={project.link} 
                                        className="case-study-link"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        View Case Study →
                                    </Link>
                                )}
                                {!project.hasCase && project.link !== '#' && (
                                    <a
                                        href={project.link}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="case-study-link"
                                        onClick={(e) => e.stopPropagation()}
                                    >
                                        GitHub →
                                    </a>
                                )}
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Projects

import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import './Projects.css'

const projects = [
    {
        title: "Retail AI Assistant",
        emoji: "🛒",
        problem: "Customers needed conversational help for product discovery and order tracking during internal beta testing",
        built: "AI chatbot using Rasa + FastAPI with Llama 3.2 via Ollama, reducing manual support responses by ~30% using summarization pipelines",
        learned: "Conversational AI patterns, intent recognition fine-tuning (74% → 82% accuracy), and integrating LLMs with production APIs",
        tags: ["Python", "Rasa", "FastAPI", "Llama 3.2", "Docker"],
        gradient: "linear-gradient(135deg, #7c3aed 0%, #a855f7 100%)",
        link: "/projects/retail-ai",
        hasCase: true
    },
    {
        title: "YouTube Shorts Automation",
        emoji: "🎬",
        problem: "Creating YouTube Shorts manually is time-consuming and lacks consistency in content pipeline",
        built: "End-to-end agentic workflow with Reddit ingestion, content filtering, Groq-hosted LLaMA 3.3 (70B) for narration, and automated uploads",
        learned: "Agentic automation with n8n, working with large LLM APIs, content ranking algorithms, and video generation pipelines",
        tags: ["n8n", "GenAI", "LLaMA 3.3", "Python", "APIs"],
        gradient: "linear-gradient(135deg, #f43f5e 0%, #fb7185 100%)",
        link: "#",
        hasCase: false
    },
    {
        title: "Real-Time Motion Detection",
        emoji: "📹",
        problem: "Surveillance systems needed faster processing with fewer false alerts for real-time monitoring",
        built: "ML pipeline processing ~300 frames/min with blur thresholding and motion heuristics, maintaining ~45ms/frame latency",
        learned: "Computer vision optimization, batch tuning, quantization techniques, and building low-latency inference systems",
        tags: ["OpenCV", "TensorFlow", "Flask", "Python"],
        gradient: "linear-gradient(135deg, #06b6d4 0%, #3b82f6 100%)",
        link: "#",
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
                            </div>
                        </motion.article>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Projects

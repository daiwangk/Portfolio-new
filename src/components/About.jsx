import { motion } from 'framer-motion'
import './About.css'

const skills = [
    { category: "Programming", items: ["Python", "JavaScript", "SQL"], icon: "💻" },
    { category: "AI / ML", items: ["RAG", "Corrective RAG (CRAG)", "Prompt Engineering", "LLM Integration", "QLoRA Fine-Tuning", "Embeddings", "LangGraph", "LangChain", "OpenCV"], icon: "🤖" },
    { category: "Frameworks", items: ["FastAPI", "Flask", "Rasa", "Streamlit", "LlamaIndex", "LlamaParse", "ChromaDB"], icon: "⚡" },
    { category: "Databases", items: ["SQLite", "ChromaDB (Vector DB)"], icon: "🗄️" },
    { category: "DevOps & Tools", items: ["Docker", "Git", "Linux", "n8n", "Ragas", "Pydantic v2"], icon: "🔧" }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.4 }
    }
}

function About() {
    return (
        <section id="about" className="section about">
            <div className="about-bg">
                <div className="bg-orb orb-about"></div>
            </div>

            <div className="container">
                <div className="about-grid">
                    <motion.div
                        className="about-content"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <h2>About Me</h2>
                        <p className="about-intro">
                            I'm a B.Tech Computer Science student at Dronacharya College of Engineering,
                            Gurugram (CGPA: 8.0/10), graduating in 2026. I'm passionate about building
                            practical AI solutions — from Corrective RAG pipelines to agentic workflows.
                        </p>
                        <p>
                            I've interned at Black Box Limited (AI/ML), Medecro Technologies (Frontend),
                            and Z Plus Surveillance (ML). My flagship project is a Legal & Financial
                            Document Intelligence system using LangGraph and CRAG, deployed on Hugging Face.
                        </p>
                        <p>
                            When I'm not coding, I'm exploring new LLM tools, building automation
                            workflows with n8n, or experimenting with agentic AI systems. I believe
                            every project is an opportunity to learn something real.
                        </p>
                        <div className="about-stats">
                            <div className="stat">
                                <span className="stat-number">3</span>
                                <span className="stat-label">Internships</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">8.0</span>
                                <span className="stat-label">CGPA / 10</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">AIR 18</span>
                                <span className="stat-label">NCAT 2023</span>
                            </div>
                        </div>
                    </motion.div>

                    <motion.div
                        className="skills-section"
                        initial={{ opacity: 0, x: 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h3>Skills & Tools</h3>
                        <motion.div
                            className="skills-grid"
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            {skills.map((group, index) => (
                                <motion.div
                                    key={index}
                                    className="skill-group card"
                                    variants={itemVariants}
                                >
                                    <div className="skill-header">
                                        <span className="skill-icon">{group.icon}</span>
                                        <h4>{group.category}</h4>
                                    </div>
                                    <div className="skill-tags">
                                        {group.items.map((item, i) => (
                                            <span key={i} className="tag">{item}</span>
                                        ))}
                                    </div>
                                </motion.div>
                            ))}
                        </motion.div>
                    </motion.div>
                </div>
            </div>
        </section>
    )
}

export default About

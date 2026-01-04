import { motion } from 'framer-motion'
import './About.css'

const skills = [
    { category: "Languages", items: ["Python", "JavaScript", "C", "C++"], icon: "💻" },
    { category: "ML & GenAI", items: ["Transformers", "RAG", "LLM Fine-tuning", "PyTorch", "TensorFlow"], icon: "🤖" },
    { category: "Backend", items: ["FastAPI", "Flask", "REST APIs", "Microservices"], icon: "⚙️" },
    { category: "Databases", items: ["SQL", "SQLite", "MongoDB", "Vector DBs"], icon: "🗄️" },
    { category: "Tools", items: ["Docker", "Git", "n8n", "Linux", "VS Code"], icon: "🔧" }
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
                            graduating in 2026. I'm passionate about building practical AI solutions
                            and clean backend systems.
                        </p>
                        <p>
                            From building conversational retail assistants to automating YouTube Shorts
                            with LLMs, I love projects that solve real problems. I've worked with
                            companies like Black Box Limited and Medecro Technologies as an intern.
                        </p>
                        <p>
                            When I'm not coding, I'm exploring new AI tools, contributing to automation
                            workflows, or reading about system design. I believe every project is an
                            opportunity to learn something new.
                        </p>
                        <div className="about-stats">
                            <div className="stat">
                                <span className="stat-number">3</span>
                                <span className="stat-label">Internships</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">AIR 18</span>
                                <span className="stat-label">NCAT 2023</span>
                            </div>
                            <div className="stat">
                                <span className="stat-number">∞</span>
                                <span className="stat-label">Curiosity</span>
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

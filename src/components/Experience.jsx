import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
    {
        title: "AI/ML Intern",
        company: "Black Box Limited",
        period: "Jul 2025 – Aug 2025",
        bullets: [
            "Built a conversational retail assistant using Rasa and FastAPI for product discovery and order tracking",
            "Integrated Llama 3.2 via Ollama for product summarization, reducing support queries by ~30%",
            "Fine-tuned Gemma-1B with QLoRA, improving intent recognition accuracy from 74% to 82%",
            "Designed prompt templates and coordinated demo-ready AI workflows with internal teams"
        ],
        tags: ["Rasa", "FastAPI", "Llama 3.2", "QLoRA", "Gemma-1B", "Ollama"],
        type: "ai"
    },
    {
        title: "Frontend Development Intern",
        company: "Medecro Technologies Pvt Ltd",
        period: "Nov 2024 – Jan 2025",
        bullets: [
            "Built scheduling and inventory dashboard components serving the internal operations team",
            "Implemented responsive layouts and integrated REST APIs using Git-based workflows",
            "Collaborated with cross-functional development teams via strict version control practices"
        ],
        tags: ["React", "REST APIs", "Git", "Dashboards"],
        type: "frontend"
    },
    {
        title: "Machine Learning Intern",
        company: "Z Plus Surveillance Security Pvt Ltd",
        period: "Jun 2024 – Jul 2024",
        bullets: [
            "Built motion detection pipeline using OpenCV with blur filtering for surveillance video feeds",
            "Achieved ~45ms/frame latency using frame differencing and contour detection"
        ],
        tags: ["Python", "OpenCV", "Computer Vision"],
        type: "ml"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.2 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
        opacity: 1,
        x: 0,
        transition: { duration: 0.5 }
    }
}

function Experience() {
    return (
        <section id="experience" className="section experience">
            <div className="experience-bg">
                <div className="bg-orb orb-exp"></div>
            </div>

            <div className="container">
                <motion.div
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>Work Experience</h2>
                    <p>Real-world experience building AI and software systems</p>
                </motion.div>

                <motion.div
                    className="timeline"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                >
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={index}
                            className="timeline-item"
                            variants={itemVariants}
                        >
                            <div className="timeline-marker">
                                <div className={`marker-dot ${exp.type}`}></div>
                                {index < experiences.length - 1 && <div className="marker-line"></div>}
                            </div>

                            <div className="timeline-content card">
                                <div className="exp-header">
                                    <div>
                                        <h3>{exp.title}</h3>
                                        <p className="company">{exp.company}</p>
                                    </div>
                                    <span className="period">{exp.period}</span>
                                </div>
                                <ul className="exp-bullets">
                                    {exp.bullets.map((bullet, i) => (
                                        <li key={i}>{bullet}</li>
                                    ))}
                                </ul>
                                <div className="exp-tags">
                                    {exp.tags.map((tag, i) => (
                                        <span key={i} className="tag">{tag}</span>
                                    ))}
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    )
}

export default Experience

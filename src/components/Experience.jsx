import { motion } from 'framer-motion'
import './Experience.css'

const experiences = [
    {
        title: "AI/ML Intern",
        company: "Black Box Limited",
        period: "Jul 2025 - Aug 2025",
        description: "Built conversational retail assistant using Rasa + FastAPI. Integrated Llama 3.2 reducing manual support by ~30%. Fine-tuned Gemma-1B improving intent recognition from 74% → 82%.",
        tags: ["Rasa", "FastAPI", "Llama 3.2", "Fine-tuning"],
        type: "ai"
    },
    {
        title: "Frontend Development Intern",
        company: "Medecro Technologies Pvt Ltd",
        period: "Nov 2024 - Jan 2025",
        description: "Developed scheduling and inventory dashboards improving operational visibility. Integrated backend data streams to surface insights and reduce coordination overhead.",
        tags: ["React", "Dashboards", "Data Integration"],
        type: "frontend"
    },
    {
        title: "Machine Learning Intern",
        company: "Z Plus Surveillance Security Pvt Ltd",
        period: "Jun 2024 - Jul 2024",
        description: "Built ML pipelines for surveillance processing ~300 frames/min with automated evaluation. Optimized inference improving real-time monitoring by ~15% via batch tuning and quantization.",
        tags: ["OpenCV", "TensorFlow", "Optimization"],
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
                                <p className="exp-description">{exp.description}</p>
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

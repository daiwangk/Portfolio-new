import { motion } from 'framer-motion'
import './Learning.css'

const learningItems = [
    {
        topic: "Advanced RAG & Vector DBs",
        description: "Actively building + experimenting with retrieval-augmented generation and vector databases",
        icon: "🔍",
        status: "Building"
    },
    {
        topic: "System Design for ML",
        description: "Learning patterns for scalable microservices and production-ready AI pipelines",
        icon: "⚙️",
        status: "Exploring"
    },
    {
        topic: "Agentic AI Workflows",
        description: "Experimenting with autonomous agents, tool use, and multi-step reasoning with LLMs",
        icon: "🤖",
        status: "Experimenting"
    }
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 }
    }
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 }
    }
}

function Learning() {
    return (
        <section id="learning" className="section learning">
            <div className="container">
                <motion.div
                    className="section-title"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                >
                    <h2>What I'm Learning Right Now</h2>
                    <p>Continuous growth is part of the journey</p>
                </motion.div>

                <motion.div
                    className="learning-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-50px" }}
                >
                    {learningItems.map((item, index) => (
                        <motion.div
                            key={index}
                            className="learning-card card"
                            variants={itemVariants}
                        >
                            <div className="learning-icon">
                                <span>{item.icon}</span>
                            </div>
                            <h3>{item.topic}</h3>
                            <p>{item.description}</p>
                            <span className="learning-status">{item.status}</span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    className="learning-note text-center text-muted"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    I believe in learning in public — it keeps me accountable and helps others.
                </motion.p>
            </div>
        </section>
    )
}

export default Learning

import { motion } from 'framer-motion'
import './Learning.css'

const learningItems = [
    {
        topic: 'Agent Memory Systems',
        description:
            'Designing persistent memory layers for agents — conversation state, episodic recall, and long-horizon context without blowing token budgets.',
        status: 'Exploring',
    },
    {
        topic: 'MCP Tooling',
        description:
            'Building with the Model Context Protocol to connect LLMs to databases, APIs, and local tools through a standardized integration surface.',
        status: 'Building',
    },
    {
        topic: 'RAG Evaluation Pipelines',
        description:
            'End-to-end eval pipelines for RAG applications — retrieval quality, answer faithfulness, regression tests, and CI-friendly benchmarks before ship.',
        status: 'Experimenting',
    },
    {
        topic: 'Production Agent Observability',
        description:
            'Tracing multi-step agent runs, latency budgets, failure modes, and cost per request — treating agents like services, not notebooks.',
        status: 'New',
    },
]

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.5 },
    },
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
                    <h2>What I&apos;m Learning Right Now</h2>
                    <p className="learning-intro">
                        Currently exploring agent memory systems, MCP tooling, and
                        evaluation pipelines for RAG applications.
                    </p>
                </motion.div>

                <motion.div
                    className="learning-grid"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-50px' }}
                >
                    {learningItems.map((item) => (
                        <motion.div
                            key={item.topic}
                            className="learning-card card"
                            variants={itemVariants}
                        >
                            <h3>{item.topic}</h3>
                            <p>{item.description}</p>
                            <span className="learning-status">{item.status}</span>
                        </motion.div>
                    ))}
                </motion.div>

                <motion.p
                    className="learning-note"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                >
                    I believe in learning in public — it keeps me accountable and helps
                    others.
                </motion.p>
            </div>
        </section>
    )
}

export default Learning

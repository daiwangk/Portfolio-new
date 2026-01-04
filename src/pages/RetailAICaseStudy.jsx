import { Link } from 'react-router-dom'
import { useEffect } from 'react'
import { motion, useSpring } from 'framer-motion'
import './RetailAICaseStudy.css'

function RetailAICaseStudy() {
    // Parallax springs for orbs
    const orb1X = useSpring(0, { stiffness: 40, damping: 30 })
    const orb1Y = useSpring(0, { stiffness: 40, damping: 30 })
    const orb2X = useSpring(0, { stiffness: 25, damping: 40 })
    const orb2Y = useSpring(0, { stiffness: 25, damping: 40 })

    useEffect(() => {
        const isMobile = window.matchMedia('(max-width: 768px)').matches
        if (isMobile) return

        const handleMove = (e) => {
            const centerX = window.innerWidth / 2
            const centerY = window.innerHeight / 2
            const normalizedX = (e.clientX - centerX) / centerX
            const normalizedY = (e.clientY - centerY) / centerY
            
            // First orb moves opposite to cursor
            orb1X.set(-normalizedX * 30)
            orb1Y.set(-normalizedY * 30)
            
            // Second orb moves slower and in same direction (depth effect)
            orb2X.set(normalizedX * 15)
            orb2Y.set(normalizedY * 15)
        }
        window.addEventListener('mousemove', handleMove)
        return () => window.removeEventListener('mousemove', handleMove)
    }, [orb1X, orb1Y, orb2X, orb2Y])

    return (
        <article className="case-study">
            {/* Parallax Background */}
            <div className="case-parallax-bg">
                <motion.div className="case-orb case-orb-1" style={{ x: orb1X, y: orb1Y }} />
                <motion.div className="case-orb case-orb-2" style={{ x: orb2X, y: orb2Y }} />
                <div className="case-grid-overlay" />
            </div>

            <div className="case-container">
                {/* Back Link */}
                <Link to="/#projects" className="back-link">
                    ← Back to Projects
                </Link>

                {/* Header */}
                <header className="case-header">
                    <h1>Retail AI Assistant</h1>
                    <p className="case-subtitle">
                        A conversational chatbot for product discovery and order tracking, 
                        built during my internship to explore real-world AI applications.
                    </p>
                    <div className="case-meta">
                        <div className="meta-item">
                            <span className="meta-label">Role</span>
                            <span className="meta-value">AI / Backend Developer</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Duration</span>
                            <span className="meta-value">Jul – Aug 2025 (2 months)</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Company</span>
                            <span className="meta-value">Black Box Limited</span>
                        </div>
                        <div className="meta-item">
                            <span className="meta-label">Stack</span>
                            <span className="meta-value">Python, Rasa, FastAPI, LLaMA 3.2, Ollama</span>
                        </div>
                    </div>
                </header>

                {/* My Role & Experience */}
                <section className="case-section experience-context">
                    <h2>My Role & Experience</h2>
                    <div className="experience-card">
                        <div className="exp-header">
                            <div>
                                <h3>AI/ML Intern</h3>
                                <span className="exp-company">Black Box Limited</span>
                            </div>
                            <span className="exp-period">Jul 2025 – Aug 2025</span>
                        </div>
                        <p>
                            This was my first hands-on experience building production-grade AI systems. 
                            I joined as an AI/ML intern with a background in Python and basic ML concepts, 
                            but had never worked with conversational AI or LLMs in a real project.
                        </p>
                        <div className="exp-responsibilities">
                            <h4>What I was responsible for:</h4>
                            <ul>
                                <li>Designing and implementing the Rasa NLU pipeline for intent classification</li>
                                <li>Integrating LLaMA 3.2 via Ollama for complex query handling</li>
                                <li>Building the FastAPI backend to connect all services</li>
                                <li>Fine-tuning Gemma-1B to improve intent recognition accuracy</li>
                                <li>Writing documentation and setting up logging for debugging</li>
                            </ul>
                        </div>
                        <p className="exp-note">
                            I worked closely with a senior engineer who reviewed my code and helped 
                            me understand production considerations I wouldn't have thought of on my own.
                        </p>
                    </div>
                </section>

                {/* The Problem */}
                <section className="case-section">
                    <h2>The Problem</h2>
                    <p>
                        The company's retail platform was receiving a growing number of customer 
                        queries about products, stock availability, and order status. The support 
                        team was spending a significant portion of their time answering repetitive 
                        questions that followed predictable patterns.
                    </p>
                    <p>
                        During internal beta testing, it became clear that customers wanted quick, 
                        conversational help — not just a search bar or FAQ page. They asked questions 
                        like "Do you have this in blue?" or "Where's my order?" in natural language.
                    </p>
                    <p>
                        The goal was to build a chatbot that could handle these common queries 
                        automatically, freeing up the support team for more complex issues.
                    </p>
                </section>

                {/* Why AI Was Needed */}
                <section className="case-section">
                    <h2>Why AI Was Needed</h2>
                    <p>
                        A simple keyword-based system wasn't sufficient because customers phrase 
                        the same question in many different ways. "Track my order," "Where's my 
                        package," and "When will it arrive" all mean the same thing, but a 
                        rule-based system would need explicit rules for each variation.
                    </p>
                    <ul className="case-list">
                        <li>
                            <strong>Language variety:</strong> Customers don't use consistent 
                            phrasing. NLU was needed to understand intent regardless of wording.
                        </li>
                        <li>
                            <strong>Context retention:</strong> Users expect follow-up questions 
                            to work ("What about the red one?"). This requires dialogue state management.
                        </li>
                        <li>
                            <strong>Response quality:</strong> Generic FAQ responses feel robotic. 
                            We wanted contextual, helpful answers that addressed the specific query.
                        </li>
                    </ul>
                </section>

                {/* System Architecture */}
                <section className="case-section">
                    <h2>System Architecture</h2>
                    <p>
                        The system follows a pipeline architecture with three main stages:
                    </p>
                    
                    <div className="architecture-flow">
                        <div className="flow-step">
                            <span className="step-number">1</span>
                            <div className="step-content">
                                <strong>FastAPI Gateway</strong>
                                <p>
                                    Receives user messages via REST API, handles authentication, 
                                    and routes requests to the appropriate service.
                                </p>
                            </div>
                        </div>
                        <div className="flow-step">
                            <span className="step-number">2</span>
                            <div className="step-content">
                                <strong>Rasa NLU + Dialogue Manager</strong>
                                <p>
                                    Extracts intents and entities from user input. Manages 
                                    conversation state and decides which action to take next.
                                </p>
                            </div>
                        </div>
                        <div className="flow-step">
                            <span className="step-number">3</span>
                            <div className="step-content">
                                <strong>LLaMA 3.2 (via Ollama)</strong>
                                <p>
                                    Generates natural language responses for complex queries. 
                                    Used for summarization and handling edge cases Rasa can't classify.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className="diagram-placeholder">
                        <p>📊 Architecture diagram coming soon</p>
                        <span className="placeholder-flow">
                            User → FastAPI → Rasa NLU → Intent Router → LLaMA / Database → Response
                        </span>
                    </div>
                </section>

                {/* Key Technical Decisions */}
                <section className="case-section">
                    <h2>Key Technical Decisions</h2>
                    
                    <div className="decision">
                        <h3>Rasa over a pure LLM approach</h3>
                        <p>
                            I chose Rasa for intent classification instead of routing everything 
                            through an LLM. The reasoning: common queries (80%+ of traffic) are 
                            predictable and don't need expensive LLM calls. Rasa handles these 
                            in ~50ms, while LLM generation takes 2-3 seconds. The LLM is reserved 
                            for complex or ambiguous cases.
                        </p>
                    </div>

                    <div className="decision">
                        <h3>Local LLM hosting with Ollama</h3>
                        <p>
                            Running LLaMA 3.2 locally via Ollama avoided per-request API costs 
                            and reduced latency compared to cloud APIs. The 8B parameter model 
                            fit in available GPU memory. Tradeoff: we're responsible for uptime 
                            and model updates.
                        </p>
                    </div>

                    <div className="decision">
                        <h3>Fine-tuning a smaller model for intent</h3>
                        <p>
                            The default Rasa DIET classifier had ~74% accuracy on our domain-specific 
                            intents. I fine-tuned a Gemma-1B model on our training data, which 
                            improved accuracy to ~82%. The smaller model kept inference fast while 
                            being more accurate than the generic classifier.
                        </p>
                    </div>
                </section>

                {/* Challenges & Tradeoffs */}
                <section className="case-section">
                    <h2>Challenges & Tradeoffs</h2>
                    
                    <div className="challenge">
                        <h3>Limited training data</h3>
                        <p>
                            We only had ~200 labeled examples per intent. I used data augmentation 
                            (paraphrasing via LLM) to expand the dataset, but accuracy on rare 
                            intents remained lower. We accepted this tradeoff and focused on 
                            high-frequency intents first.
                        </p>
                    </div>

                    <div className="challenge">
                        <h3>LLM response verbosity</h3>
                        <p>
                            LLaMA sometimes generated overly long or off-topic responses. I added 
                            a summarization step with strict token limits and refined the system 
                            prompt to keep outputs focused. This added ~500ms latency but improved 
                            response quality significantly.
                        </p>
                    </div>

                    <div className="challenge">
                        <h3>Cold start latency</h3>
                        <p>
                            When the LLM model wasn't loaded in memory, the first request took 
                            10+ seconds. I implemented periodic health checks to keep the model 
                            warm. This uses more GPU memory continuously but ensures consistent 
                            response times.
                        </p>
                    </div>
                </section>

                {/* Results */}
                <section className="case-section">
                    <h2>Results</h2>
                    <p className="results-disclaimer">
                        These metrics are from internal beta testing with a small user group, 
                        not production-scale deployment.
                    </p>
                    
                    <div className="results-grid">
                        <div className="result">
                            <span className="result-value">~30%</span>
                            <span className="result-label">Reduction in manual support responses</span>
                        </div>
                        <div className="result">
                            <span className="result-value">82%</span>
                            <span className="result-label">Intent classification accuracy</span>
                        </div>
                        <div className="result">
                            <span className="result-value">&lt;3s</span>
                            <span className="result-label">Average response time (with LLM)</span>
                        </div>
                        <div className="result">
                            <span className="result-value">~50ms</span>
                            <span className="result-label">Response time (Rasa-only queries)</span>
                        </div>
                    </div>
                </section>

                {/* What I Learned */}
                <section className="case-section">
                    <h2>What I Learned</h2>
                    <ul className="learnings-list">
                        <li>
                            <strong>Hybrid architectures make sense.</strong> Using Rasa for 
                            predictable queries and LLMs for complex ones gave us speed where 
                            it mattered and flexibility when needed.
                        </li>
                        <li>
                            <strong>Data quality matters more than model size.</strong> A smaller 
                            fine-tuned model outperformed a larger generic one for our specific domain.
                        </li>
                        <li>
                            <strong>Prompt engineering is real engineering.</strong> Getting 
                            consistent, useful outputs from LLMs required systematic iteration 
                            on prompts, not just tweaking words.
                        </li>
                        <li>
                            <strong>Production constraints shape architecture.</strong> Latency, 
                            cost, and reliability requirements influenced every design decision, 
                            not just "what's technically possible."
                        </li>
                        <li>
                            <strong>Logging is non-negotiable.</strong> Without detailed 
                            conversation logs, debugging misclassifications would have been 
                            nearly impossible.
                        </li>
                    </ul>
                </section>

                {/* What I Would Improve */}
                <section className="case-section">
                    <h2>What I Would Improve Next</h2>
                    <ul className="improvements-list">
                        <li>
                            <strong>Implement RAG for product data.</strong> Currently, product 
                            info is fetched via API. A vector database with semantic search 
                            would enable better "find products like X" queries.
                        </li>
                        <li>
                            <strong>Build automated evaluation.</strong> Human review of 
                            conversation quality was time-consuming. I'd create test suites 
                            for regression testing and quality metrics.
                        </li>
                        <li>
                            <strong>Add response streaming.</strong> For LLM-generated answers, 
                            streaming tokens to the UI would improve perceived latency.
                        </li>
                        <li>
                            <strong>Improve fallback handling.</strong> The current "I don't 
                            understand" response is too generic. Better fallbacks would ask 
                            clarifying questions or suggest related topics.
                        </li>
                    </ul>
                </section>

                {/* Footer */}
                <footer className="case-footer">
                    <Link to="/#projects" className="footer-link">
                        ← Back to All Projects
                    </Link>
                    <Link to="/#contact" className="footer-link primary">
                        Get in Touch →
                    </Link>
                </footer>
            </div>
        </article>
    )
}

export default RetailAICaseStudy

import type { Project, Experience, LearningItem, Skill } from '@/types'

export const PROJECTS: Project[] = [
  {
    num: '01',
    title: 'Legal & Financial Document Intelligence',
    stack: 'LangGraph · ChromaDB · Groq · LlamaIndex · Ragas',
    copy: 'Corrective RAG pipeline that grades retrieved chunks and rewrites queries automatically. Dual-LLM architecture — Llama 3.1-8B grading, Llama 3.3-70B generation. Deployed on Hugging Face Spaces.',
    learned: 'Hierarchical chunking, Pydantic v2 validation, Ragas evals, latency vs accuracy trade-offs.',
    link: '/projects/legal-financial',
    linkLabel: 'Case study →',
    isCaseStudy: true,
    caseStudyPath: '/projects/legal-financial',
  },
  {
    num: '02',
    title: 'Clothing & Retail AI Assistant',
    stack: 'Rasa · FastAPI · Llama 3.2 · Ollama · Docker',
    copy: 'Conversational assistant for product discovery and order tracking during internal beta — cut manual catalog lookups ~25%. Intent accuracy fine-tuned from 74% to 82%.',
    learned: 'Conversational AI patterns, intent fine-tuning, integrating LLMs with production APIs.',
    link: '/projects/retail-ai',
    linkLabel: 'Case study →',
    isCaseStudy: true,
    caseStudyPath: '/projects/retail-ai',
  },
  {
    num: '03',
    title: 'ElevenLabs Voice Agent',
    stack: 'FastAPI · ElevenLabs · Airtable · Apify · OpenRouter',
    copy: 'Multi-agent outbound calling with Hermes-style orchestration: scheduler, voice caller and a learning agent closing the loop from call outcomes. WhatsApp fallback via Meta Cloud API.',
    learned: 'Multi-agent tool design, closed learning loops, tenacity retry patterns.',
    link: 'https://github.com/daiwangk/11labsVoiceagent',
    linkLabel: 'GitHub →',
  },
  {
    num: '04',
    title: 'Automated YouTube Shorts Pipeline',
    stack: 'n8n · Python · Groq · LLaMA 3.3 · Google Sheets',
    copy: 'End-to-end agentic workflow: Reddit ingestion, LLM narration, video generation and scheduled uploads, with automated metadata logging.',
    learned: 'Agentic automation with n8n, content ranking, LLM narration pipelines.',
    link: 'https://github.com/daiwangk',
    linkLabel: 'View project →',
  },
  {
    num: '05',
    title: 'Team Task Manager',
    stack: 'React · Express · PostgreSQL · Prisma · JWT',
    copy: 'Full-stack project management app with role-based access, Kanban workflow and JWT auth — live on Railway.',
    learned: 'Monorepo full-stack architecture, Prisma ORM, RBAC middleware design.',
    link: 'https://github.com/daiwangk/team-task-manager',
    linkLabel: 'GitHub →',
  },
]

export const EXPERIENCE: Experience[] = [
  {
    period: 'Jul – Aug 2025',
    title: 'AI/ML Intern',
    company: 'Black Box Limited',
    bullets: [
      'Built a conversational retail assistant with Rasa + FastAPI for product discovery and order tracking',
      'Integrated Llama 3.2 via Ollama for product summarization, reducing support queries ~30%',
      'Fine-tuned Gemma-1B with QLoRA — intent recognition accuracy 74% → 82%',
    ],
  },
  {
    period: 'Nov 2024 – Jan 2025',
    title: 'Frontend Development Intern',
    company: 'Medecro Technologies Pvt Ltd',
    bullets: [
      'Built scheduling and inventory dashboard components for the internal operations team',
      'Implemented responsive layouts and integrated REST APIs with Git-based workflows',
    ],
  },
  {
    period: 'Jun – Jul 2024',
    title: 'Machine Learning Intern',
    company: 'Z Plus Surveillance Security Pvt Ltd',
    bullets: [
      'Built a motion-detection pipeline with OpenCV and blur filtering for surveillance feeds',
      'Achieved ~45ms/frame latency using frame differencing and contour detection',
    ],
  },
]

export const LEARNING: LearningItem[] = [
  {
    topic: 'Agent Memory Systems',
    status: 'Exploring',
    description:
      'Persistent memory layers — conversation state, episodic recall, long-horizon context without blowing token budgets.',
  },
  {
    topic: 'MCP Tooling',
    status: 'Building',
    description:
      'Connecting LLMs to databases, APIs and local tools through the Model Context Protocol.',
  },
  {
    topic: 'RAG Evaluation Pipelines',
    status: 'Experimenting',
    description:
      'Retrieval quality, answer faithfulness, regression tests and CI-friendly benchmarks before ship.',
  },
  {
    topic: 'Agent Observability',
    status: 'New',
    description:
      'Tracing multi-step agent runs, latency budgets, failure modes and cost per request — agents as services, not notebooks.',
  },
]

export const SKILLS: Skill[] = [
  { category: 'Programming', items: 'Python · JavaScript · TypeScript · SQL' },
  {
    category: 'AI / ML',
    items: 'RAG · Corrective RAG · LangGraph · LangChain · Prompt Engineering · QLoRA Fine-Tuning · Embeddings · OpenCV',
  },
  { category: 'Frameworks', items: 'FastAPI · Flask · Rasa · Streamlit · LlamaIndex · LlamaParse · Next.js' },
  { category: 'Databases', items: 'SQLite · PostgreSQL · ChromaDB (vector)' },
  { category: 'DevOps & Tools', items: 'Docker · Git · Linux · n8n · Ragas · Pydantic v2' },
]

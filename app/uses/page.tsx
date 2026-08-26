import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Uses — Daiwang Khera',
  description: 'Tools, hardware, and software I use daily for AI/ML engineering and development.',
}

const USES = [
  {
    category: 'Hardware',
    items: [
      { name: 'Laptop', detail: 'Lenovo IdeaPad — daily driver for dev, training small models' },
      { name: 'Display', detail: '1080p IPS panel — calibrated for design work' },
      { name: 'Keyboard', detail: 'Standard membrane — nothing fancy, tactile matters less than output' },
    ],
  },
  {
    category: 'Editor & Terminal',
    items: [
      { name: 'VS Code', detail: 'Primary editor — extensions: Pylance, Ruff, GitLens, GitHub Copilot' },
      { name: 'Vim keybindings', detail: 'VSCodeVim extension — motion muscle memory' },
      { name: 'Windows Terminal', detail: 'PowerShell + WSL2 (Ubuntu) side by side' },
      { name: 'Font', detail: 'JetBrains Mono — same one used on this site' },
      { name: 'Theme', detail: 'GitHub Dark Dimmed — easy on the eyes during long sessions' },
    ],
  },
  {
    category: 'AI / ML Stack',
    items: [
      { name: 'LangGraph', detail: 'Primary agent orchestration — CRAG pipelines, stateful graphs' },
      { name: 'LangChain', detail: 'RAG chains, document loaders, vector store abstractions' },
      { name: 'OpenAI GPT-4o', detail: 'Default LLM for production tasks where latency matters less' },
      { name: 'Gemini 1.5 Pro', detail: 'Long-context tasks — 1M token window for legal document analysis' },
      { name: 'FAISS / ChromaDB', detail: 'Vector stores for semantic retrieval' },
      { name: 'Hugging Face', detail: 'Model hosting, Gradio demos, Transformers library' },
      { name: 'Jupyter', detail: 'Exploration and prototyping — VS Code Jupyter extension' },
    ],
  },
  {
    category: 'Backend & APIs',
    items: [
      { name: 'FastAPI', detail: 'Primary backend framework — async, typed, automatic OpenAPI docs' },
      { name: 'Python 3.11+', detail: 'Everything AI/ML. Type hints everywhere.' },
      { name: 'PostgreSQL', detail: 'Default relational DB — pgvector for hybrid search' },
      { name: 'Redis', detail: 'Session state, rate limiting, task queues' },
      { name: 'Docker', detail: 'Local parity with prod — compose for multi-service setups' },
    ],
  },
  {
    category: 'Frontend',
    items: [
      { name: 'Next.js 15', detail: 'App Router — this portfolio is built on it' },
      { name: 'TypeScript', detail: 'Strict mode. No any.' },
      { name: 'Tailwind CSS', detail: 'Utility-first — custom design tokens for editorial layouts' },
      { name: 'GSAP', detail: 'Professional-grade animation — ScrollTrigger, clip-path reveals' },
      { name: 'Framer Motion', detail: 'Spring physics for interactive elements' },
      { name: 'Lenis', detail: 'Smooth scroll with velocity tracking' },
    ],
  },
  {
    category: 'Deployment & Infra',
    items: [
      { name: 'Vercel', detail: 'Frontend hosting — edge functions, automatic preview deploys' },
      { name: 'GitHub Actions', detail: 'CI/CD — lint, test, deploy on push' },
      { name: 'Hugging Face Spaces', detail: 'AI demo hosting — Gradio + Docker runtimes' },
      { name: 'Render / Railway', detail: 'Backend APIs when Vercel serverless isn\'t enough' },
    ],
  },
  {
    category: 'Design',
    items: [
      { name: 'Figma', detail: 'UI design, component libraries, prototypes' },
      { name: 'Archivo Variable', detail: 'Primary typeface — variable weight 100–900 for kinetic typography' },
      { name: 'Excalidraw', detail: 'System architecture sketches and whiteboarding' },
    ],
  },
  {
    category: 'Productivity',
    items: [
      { name: 'Notion', detail: 'Project notes, research logs, learning tracker' },
      { name: 'Linear', detail: 'Personal sprint board for side projects' },
      { name: 'Arc Browser', detail: 'Spaces for separating work contexts' },
      { name: 'ChatGPT / Claude', detail: 'Rubber duck debugging, first-draft writing, code review' },
    ],
  },
]

export default function UsesPage() {
  return (
    <div className="min-h-screen">
      {/* Nav back */}
      <nav className="px-[clamp(24px,5vw,72px)] py-6 border-b-2 border-ink/15 flex items-center gap-4">
        <Link
          href="/"
          className="font-mono text-[12px] tracking-[0.08em] uppercase text-n600
                     hover:text-red transition-colors duration-200"
        >
          ← Back
        </Link>
        <span className="font-mono text-[12px] text-n600/40">/</span>
        <span className="font-mono text-[12px] tracking-[0.08em] uppercase text-ink">Uses</span>
      </nav>

      {/* Header */}
      <header className="px-[clamp(24px,5vw,72px)] pt-16 pb-12 border-b-2 border-ink/15">
        <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-700 block mb-4">
          Stack & Setup
        </span>
        <h1 className="font-sans font-black text-[clamp(40px,5.5vw,72px)] leading-[1.06]
                       tracking-[-0.02em] m-0 max-w-[16ch]">
          Tools I use to build things.
        </h1>
        <p className="mt-6 text-[16px] text-n800 leading-relaxed max-w-[56ch]">
          My daily hardware, editor setup, AI/ML stack, and everything in between.
          Updated when something meaningfully changes.
        </p>
      </header>

      {/* Content */}
      <main className="px-[clamp(24px,5vw,72px)]">
        {USES.map((section) => (
          <section key={section.category} className="py-10 border-b-2 border-ink/15 last:border-b-0">
            {/* Category label */}
            <span className="font-mono text-[11px] tracking-[0.1em] uppercase text-red-700 block mb-6">
              {section.category}
            </span>

            {/* Items */}
            <div className="flex flex-col">
              {section.items.map(({ name, detail }) => (
                <div
                  key={name}
                  className="flex flex-col gap-1 sm:grid sm:gap-x-12 py-4
                             border-t border-ink/10 first:border-t-0 hover:bg-n100
                             transition-colors duration-200 -mx-[clamp(24px,5vw,72px)]
                             px-[clamp(24px,5vw,72px)]"
                  style={{ gridTemplateColumns: '200px 1fr' }}
                >
                  <span className="font-sans font-bold text-[15px]">{name}</span>
                  <span className="font-mono text-[13px] text-n800 tracking-[0.02em] leading-relaxed">
                    {detail}
                  </span>
                </div>
              ))}
            </div>
          </section>
        ))}
      </main>

      {/* Footer */}
      <footer className="px-[clamp(24px,5vw,72px)] py-8 border-t-2 border-ink/15">
        <p className="font-mono text-[12px] text-n600 tracking-[0.04em] m-0">
          © 2026 Daiwang Khera ·{' '}
          <Link href="/" className="hover:text-red transition-colors duration-200">
            daiwang-khera.vercel.app
          </Link>
        </p>
      </footer>
    </div>
  )
}

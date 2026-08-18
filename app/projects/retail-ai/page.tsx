import Link from 'next/link'
import type { Metadata } from 'next'
import SystemBlueprint from '@/components/SystemBlueprint'

export const metadata: Metadata = {
  title: 'Clothing & Retail AI Assistant — Case Study | Daiwang Khera',
  description:
    'Deep dive into building a conversational Rasa + FastAPI assistant with Llama 3.2 for product discovery and order tracking at Black Box Limited. Intent accuracy improved 74% → 82%.',
}

const META = [
  { label: 'Role', value: 'AI / Backend Developer' },
  { label: 'Duration', value: 'Jul – Aug 2025 (2 months)' },
  { label: 'Company', value: 'Black Box Limited' },
  { label: 'Stack', value: 'Python · Rasa · FastAPI · LLaMA 3.2 · Ollama · Docker' },
]

const SECTIONS = [
  {
    heading: 'The Problem',
    content: `The internal support team was drowning in repetitive catalog and order-status queries. Representatives spent an estimated 40% of their time manually looking up product details — stock levels, size charts, delivery windows — that customers could theoretically self-serve if the interface existed. There was no conversational layer, only a static FAQ.`,
  },
  {
    heading: 'My Approach',
    content: `I architected a two-layer system: a Rasa NLU/dialogue model for intent classification and entity extraction, backed by a FastAPI service that provided real data over REST. The key decision was keeping the LLM (Llama 3.2 via Ollama) out of the critical dialogue path — it handled product summarisation and free-text responses, not routing. This kept latency predictable.`,
  },
  {
    heading: 'Fine-Tuning Intent Recognition',
    content: `Out of the box, Rasa's base model reached 74% intent accuracy on our domain. I collected and annotated ~600 additional utterances from internal support logs, covering edge cases like ambiguous size queries and multi-turn order tracking flows. After two rounds of fine-tuning with QLoRA on Gemma-1B as a fallback classifier, accuracy rose to 82%. More importantly, the failure modes shifted from hard misclassifications to recoverable low-confidence scores that triggered clarification prompts.`,
  },
  {
    heading: 'System Architecture',
    content: `The diagram below shows the full data flow. Each path is a live connection in the running system — Rasa routes intents to FastAPI for structured lookups, and to Llama 3.2 for generative responses. A fallback chain ensures a slow GPU never blocks the conversation thread.`,
  },
  {
    heading: 'LLM Integration',
    content: `Llama 3.2 (8B, q4_K_M quantised via Ollama) handled two jobs: generating human-readable product summaries from structured JSON, and composing empathetic out-of-scope responses. I wrapped every LLM call in a timeout + fallback template, so a slow GPU response never blocked the conversation thread. Prompt structure: system role → retrieved product context → user message → strict output format.`,
  },
  {
    heading: 'Results',
    content: `During the two-week internal beta, manual catalog lookups dropped approximately 25–30%. The assistant handled ~200 conversations per day with a P95 response latency of 380ms (excluding LLM summarisation, which ran asynchronously). The product team flagged 18 new training utterances from the live logs for the next fine-tune cycle — a closed feedback loop.`,
  },
  {
    heading: 'What I Learned',
    content: `Keeping the LLM off the hot path was the single most important architectural decision. Conversational AI in production isn't about the most capable model — it's about the most reliable fallback chain. I also learned that annotating your own domain data is irreplaceable; off-the-shelf NLU models have blind spots that only surface at scale.`,
  },
]

export default function RetailAICaseStudy() {
  return (
    <article className="bg-bg min-h-screen">
      {/* ── Hero ── */}
      <header className="px-[clamp(24px,5vw,72px)] pt-28 pb-20 border-b-2 border-ink/15">
        <Link
          href="/#projects"
          className="font-mono text-[12px] tracking-[0.07em] uppercase text-n600
                     hover:text-red transition-colors duration-200 flex items-center gap-2 mb-10"
        >
          ← Back to projects
        </Link>

        <span className="font-mono text-[12px] tracking-[0.08em] uppercase text-red-700 block mb-6">
          Case study · 02
        </span>

        <h1
          className="font-sans font-black leading-[1.06] tracking-[-0.025em] m-0
                     text-[clamp(40px,5.5vw,72px)] max-w-[18ch]"
          style={{
            viewTransitionName: 'project-title-02',
            fontVariationSettings: "'wght' 800, 'wdth' 100",
          }}
        >
          Clothing &amp; Retail AI Assistant
        </h1>

        <p className="mt-6 max-w-[60ch] text-[17px] text-n800 leading-relaxed">
          A conversational Rasa + FastAPI assistant with Llama 3.2 integration for product
          discovery and order tracking. Built during internship to solve real support-volume problems.
        </p>

        <div
          className="grid gap-x-10 gap-y-4 mt-10 pt-8 border-t-2 border-ink/15"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))' }}
        >
          {META.map(({ label, value }) => (
            <div key={label}>
              <span className="font-mono text-[10px] tracking-[0.1em] uppercase text-n600 block mb-1">
                {label}
              </span>
              <span className="font-sans font-semibold text-[14px] text-ink">{value}</span>
            </div>
          ))}
        </div>
      </header>

      {/* ── Content sections ── */}
      <div className="px-[clamp(24px,5vw,72px)] py-16 max-w-[80ch]">
        {SECTIONS.map((s, i) => (
          <div key={s.heading} className="mb-14">
            <div className="flex items-baseline gap-5 mb-4">
              <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">
                0{i + 1}
              </span>
              <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">
                {s.heading}
              </h2>
            </div>
            <p className="text-[15.5px] text-n800 leading-relaxed m-0 pl-[calc(0.9ch+20px)]">
              {s.content}
            </p>

            {/* SVG Blueprint draws itself after the "System Architecture" section */}
            {s.heading === 'System Architecture' && (
              <div className="mt-8 pl-[calc(0.9ch+20px)]">
                <SystemBlueprint />
              </div>
            )}
          </div>
        ))}
      </div>

      {/* ── Footer nav ── */}
      <footer className="px-[clamp(24px,5vw,72px)] py-10 border-t-2 border-ink/15 flex justify-between">
        <Link
          href="/#projects"
          className="font-mono text-[12px] tracking-[0.07em] uppercase text-n600
                     hover:text-red transition-colors duration-200"
        >
          ← All projects
        </Link>
        <Link
          href="/#contact"
          className="font-mono text-[12px] tracking-[0.07em] uppercase text-red-700
                     hover:text-red transition-colors duration-200"
        >
          Get in touch →
        </Link>
      </footer>
    </article>
  )
}

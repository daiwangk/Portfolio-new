import Link from 'next/link'
import type { Metadata } from 'next'
import CRAGBlueprint from '@/components/CRAGBlueprint'

export const metadata: Metadata = {
  title: 'Legal & Financial Document Intelligence — Case Study | Daiwang Khera',
  description:
    'Production-grade Corrective RAG (CRAG) system for legal and financial document analysis. LangGraph state machine, ChromaDB, dual-LLM Groq architecture, Ragas evaluation. Deployed on Hugging Face Spaces.',
}

const META = [
  { label: 'Type',      value: 'Personal Project' },
  { label: 'Status',    value: 'Live — Hugging Face Spaces' },
  { label: 'Stack',     value: 'LangGraph · ChromaDB · Groq · LlamaIndex · FastAPI · Ragas' },
  { label: 'LLMs',      value: 'llama-3.3-70b-versatile (gen) · llama-3.1-8b-instant (grade)' },
]

const TECH_TABLE = [
  { component: 'Document Parsing',    tech: 'LlamaParse',                          why: 'Cloud PDF→Markdown conversion preserving table structure' },
  { component: 'Chunking',            tech: 'LlamaIndex HierarchicalNodeParser',   why: 'Preserves parent-child context — critical for clause extraction' },
  { component: 'Embeddings',          tech: 'SentenceTransformer all-MiniLM-L6-v2',why: 'Runs fully locally — zero API cost per query' },
  { component: 'Vector Store',        tech: 'ChromaDB PersistentClient',           why: 'Data survives restarts; no managed infra needed' },
  { component: 'RAG Orchestration',   tech: 'LangGraph CRAG state machine',        why: 'Explicit conditional routing with loop protection' },
  { component: 'Grader / Rewriter',   tech: 'Groq — llama-3.1-8b-instant',        why: 'Fast inference for the hot retrieval-grading loop' },
  { component: 'Generator',           tech: 'Groq — llama-3.3-70b-versatile',     why: 'High-quality cited answers from a larger reasoning model' },
  { component: 'Structured Output',   tech: 'JSON mode + Pydantic v2',            why: 'Reliable clause extraction without hallucinated schema' },
  { component: 'API Layer',           tech: 'FastAPI',                            why: 'Async endpoints, auto-generated Swagger docs' },
  { component: 'Evaluation',          tech: 'Ragas framework',                    why: 'Reference-free context precision, faithfulness, answer relevancy' },
]

const RAGAS = [
  { metric: 'Context Precision',  score: '0.83', description: 'Retrieved chunks are on-target for the query' },
  { metric: 'Faithfulness',       score: '0.91', description: 'Generated answers stay grounded in retrieved context' },
  { metric: 'Answer Relevancy',   score: '0.88', description: 'Final answer actually addresses what was asked' },
]

export default function LegalFinancialCaseStudy() {
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
          Case study · 01
        </span>

        <h1
          className="font-sans font-black leading-[1.06] tracking-[-0.025em] m-0
                     text-[clamp(38px,5.2vw,68px)] max-w-[20ch]"
          style={{
            viewTransitionName: 'project-title-01',
            fontVariationSettings: "'wght' 800, 'wdth' 100",
          }}
        >
          Legal &amp; Financial Document Intelligence
        </h1>

        <p className="mt-6 max-w-[62ch] text-[17px] text-n800 leading-relaxed">
          A production-grade Corrective RAG (CRAG) application for legal and financial documents —
          cited question answering, structured clause extraction, and full pipeline evaluation.
          Live on Hugging Face Spaces.
        </p>

        {/* Meta */}
        <div
          className="grid gap-x-10 gap-y-4 mt-10 pt-8 border-t-2 border-ink/15"
          style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}
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

      {/* ── Content ── */}
      <div className="px-[clamp(24px,5vw,72px)] py-16">

        {/* 01 — The Problem */}
        <section className="mb-14 max-w-[80ch]">
          <div className="flex items-baseline gap-5 mb-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">01</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">The Problem</h2>
          </div>
          <div className="pl-[calc(0.9ch+20px)] space-y-4 text-[15.5px] text-n800 leading-relaxed">
            <p>
              Legal and financial professionals spend hours manually scanning dense PDF documents
              — contracts, NDAs, financial reports, regulatory filings — to extract specific clauses
              or answer precise questions. Standard search tools return keyword matches with no
              understanding of context or legal structure. LLMs hallucinate when they lack
              grounding in the actual document text.
            </p>
            <p>
              The goal: build a system that can ingest any legal or financial PDF, answer
              natural-language questions with cited, grounded responses, and extract structured
              clause data in JSON — without any hallucination.
            </p>
          </div>
        </section>

        {/* 02 — Architecture */}
        <section className="mb-14">
          <div className="flex items-baseline gap-5 mb-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">02</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">Architecture</h2>
          </div>
          <p className="pl-[calc(0.9ch+20px)] text-[15.5px] text-n800 leading-relaxed mb-8 max-w-[80ch]">
            The system is built around a LangGraph state machine implementing Corrective RAG (CRAG).
            The critical design choice: two separate LLMs on different tiers. A fast 8B model handles
            the hot grading loop; a 70B model only fires when the retrieval is confirmed relevant.
            This keeps median latency under 2s for most queries.
          </p>
          <CRAGBlueprint />
        </section>

        {/* 03 — CRAG Pipeline */}
        <section className="mb-14 max-w-[80ch]">
          <div className="flex items-baseline gap-5 mb-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">03</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">The CRAG Pipeline</h2>
          </div>
          <div className="pl-[calc(0.9ch+20px)] space-y-5 text-[15.5px] text-n800 leading-relaxed">
            <div>
              <strong className="text-ink font-bold block mb-1">Retrieve</strong>
              The user query is embedded using the local SentenceTransformer model (all-MiniLM-L6-v2).
              ChromaDB performs a cosine similarity search and returns the top-k most relevant chunks.
              Local embeddings eliminate per-query API costs entirely.
            </div>
            <div>
              <strong className="text-ink font-bold block mb-1">Grade</strong>
              Each retrieved chunk is passed to llama-3.1-8b-instant on Groq with a strict
              relevance prompt. The grader returns a binary yes/no — no scoring, no ambiguity.
              Using the smaller 8B model here was deliberate: it runs in ~200ms and handles the
              grading loop cheaply.
            </div>
            <div>
              <strong className="text-ink font-bold block mb-1">Conditional routing</strong>
              If any chunk is graded relevant, the pipeline routes to Generate. If none pass,
              the query is rewritten by the same 8B model to be more specific and the full
              retrieve-grade cycle repeats. A hard cap of 2 rewrites prevents infinite loops —
              after 2 failures, the system returns a transparent &quot;insufficient context&quot; response
              rather than hallucinating.
            </div>
            <div>
              <strong className="text-ink font-bold block mb-1">Generate</strong>
              The confirmed-relevant chunks are passed to llama-3.3-70b-versatile with a strict
              grounding prompt: answer only from the provided context, cite every claim with the
              source chunk identifier. The response includes inline citations and a confidence
              assessment.
            </div>
          </div>
        </section>

        {/* 04 — Tech Stack */}
        <section className="mb-14">
          <div className="flex items-baseline gap-5 mb-6">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">04</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">Tech Stack Decisions</h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b-2 border-ink/15">
                  <th className="font-mono text-[10px] tracking-[0.1em] uppercase text-n600
                                 text-left py-3 pr-6">Component</th>
                  <th className="font-mono text-[10px] tracking-[0.1em] uppercase text-n600
                                 text-left py-3 pr-6">Technology</th>
                  <th className="font-mono text-[10px] tracking-[0.1em] uppercase text-n600
                                 text-left py-3">Why</th>
                </tr>
              </thead>
              <tbody>
                {TECH_TABLE.map(({ component, tech, why }) => (
                  <tr key={component} className="border-b border-ink/10 hover:bg-n100 transition-colors">
                    <td className="font-sans font-bold text-[13.5px] py-3 pr-6 align-top whitespace-nowrap">
                      {component}
                    </td>
                    <td className="font-mono text-[12px] text-red-700 py-3 pr-6 align-top whitespace-nowrap">
                      {tech}
                    </td>
                    <td className="text-[13.5px] text-n800 py-3 align-top leading-snug">
                      {why}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 05 — Ragas Evaluation */}
        <section className="mb-14 max-w-[80ch]">
          <div className="flex items-baseline gap-5 mb-5">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">05</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">Evaluation — Ragas</h2>
          </div>
          <p className="pl-[calc(0.9ch+20px)] text-[15.5px] text-n800 leading-relaxed mb-8">
            Ragas was used to evaluate the pipeline against a golden dataset of 10 hand-crafted
            legal Q&amp;A pairs. All three metrics are reference-free — they measure retrieval
            quality and generation faithfulness without needing a human-written &quot;correct&quot; answer,
            making them practical for domain-specific legal content.
          </p>

          <div className="grid gap-px border border-ink/15 pl-[calc(0.9ch+20px)]"
            style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
            {RAGAS.map(({ metric, score, description }) => (
              <div key={metric} className="border border-ink/15 p-6 bg-bg">
                <p className="font-sans font-black text-[48px] leading-none text-red m-0">
                  {score}
                </p>
                <p className="font-sans font-bold text-[14px] mt-2 mb-1 m-0">{metric}</p>
                <p className="font-mono text-[12px] text-n700 leading-relaxed m-0">{description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 06 — Design Principles */}
        <section className="mb-14 max-w-[80ch]">
          <div className="flex items-baseline gap-5 mb-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">06</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">Design Principles</h2>
          </div>
          <div className="pl-[calc(0.9ch+20px)] grid gap-4"
            style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))' }}>
            {[
              { title: 'No Hallucination',      body: 'Generator is strictly system-prompted: answer only from provided context. Refuses to extrapolate.' },
              { title: 'Full Auditability',     body: 'Every answer includes source citations with chunk IDs. Users can verify every claim.' },
              { title: 'Loop Protection',       body: 'Hard cap of 2 query rewrites. After 2 failures, returns transparent insufficient-context response.' },
              { title: 'Persistent Storage',    body: 'ChromaDB PersistentClient — uploaded documents survive server restarts without re-ingestion.' },
              { title: 'Local Embeddings',      body: 'SentenceTransformer runs entirely on-device. Zero per-query embedding API cost.' },
              { title: 'Structured Extraction', body: 'Clause extraction uses JSON mode + Pydantic v2 validation. No free-form schema drift.' },
            ].map(({ title, body }) => (
              <div key={title} className="border border-ink/15 p-5 hover:bg-n100 transition-colors duration-200">
                <p className="font-sans font-bold text-[14px] m-0 mb-2">{title}</p>
                <p className="font-mono text-[12px] text-n700 leading-relaxed m-0">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 07 — What I Learned */}
        <section className="mb-14 max-w-[80ch]">
          <div className="flex items-baseline gap-5 mb-4">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">07</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">What I Learned</h2>
          </div>
          <div className="pl-[calc(0.9ch+20px)] space-y-4 text-[15.5px] text-n800 leading-relaxed">
            <p>
              <strong className="text-ink font-bold">LangGraph is the right abstraction for CRAG.</strong>{' '}
              Implementing the state machine as a graph makes conditional routing — the core of
              Corrective RAG — explicit and testable. Each node is a pure function; the routing
              logic is declared in edges, not buried in if-else chains.
            </p>
            <p>
              <strong className="text-ink font-bold">Hierarchical chunking matters for legal text.</strong>{' '}
              Standard fixed-size chunking splits clauses mid-sentence and destroys context.
              LlamaIndex&apos;s HierarchicalNodeParser preserves parent sections, so the retriever
              can return a child clause with its parent article for context — dramatically improving
              answer quality on nested contract structures.
            </p>
            <p>
              <strong className="text-ink font-bold">Ragas evaluation before shipping.</strong>{' '}
              Running Ragas on a 10-sample golden dataset before the first deployment caught
              two retrieval regressions that subjective manual testing missed. Treating the
              RAG pipeline as a software system — with regression tests — is the difference
              between a demo and a deployable product.
            </p>
            <p>
              <strong className="text-ink font-bold">Dual-LLM tier design.</strong>{' '}
              Using the 8B model exclusively for the high-frequency grading step and reserving
              the 70B model for generation only reduced Groq token costs by ~65% compared to
              using 70B throughout — without measurable quality loss on the grading task.
            </p>
          </div>
        </section>

        {/* API Reference */}
        <section className="mb-14">
          <div className="flex items-baseline gap-5 mb-5">
            <span className="font-mono text-[11px] tracking-[0.08em] uppercase text-red-700">08</span>
            <h2 className="font-sans font-black text-[22px] tracking-[-0.01em] m-0">API Reference</h2>
          </div>

          <div className="space-y-3 pl-[calc(0.9ch+20px)]">
            {[
              { method: 'POST', path: '/api/v1/upload_document', desc: 'Upload and ingest a PDF — parse, chunk, embed, store in ChromaDB' },
              { method: 'POST', path: '/api/v1/chat_query',      desc: 'Ask a question — runs full CRAG pipeline, returns cited answer' },
              { method: 'POST', path: '/api/v1/extract_clauses', desc: 'Extract structured clauses as validated JSON via Pydantic v2' },
              { method: 'GET',  path: '/',                        desc: 'Health check — returns API version and model config' },
            ].map(({ method, path, desc }) => (
              <div key={path} className="flex items-start gap-4 py-3 border-b border-ink/10">
                <span className={`font-mono text-[11px] font-bold px-2 py-0.5 flex-shrink-0 mt-0.5
                  ${method === 'GET' ? 'bg-emerald-100 text-emerald-700' : 'bg-red/10 text-red-700'}`}>
                  {method}
                </span>
                <span className="font-mono text-[12px] text-ink flex-shrink-0 mt-0.5">{path}</span>
                <span className="text-[13.5px] text-n800">{desc}</span>
              </div>
            ))}
          </div>
        </section>

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

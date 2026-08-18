import dynamic from 'next/dynamic'
import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import RedThread from '@/components/ui/RedThread'
import { MarqueeClient, FrameHUDClient } from '@/components/ClientOverlays'

const Projects = dynamic(() => import('@/components/sections/Projects'))
const Experience = dynamic(() => import('@/components/sections/Experience'))
const Learning = dynamic(() => import('@/components/sections/Learning'))
const About = dynamic(() => import('@/components/sections/About'))
const Contact = dynamic(() => import('@/components/sections/Contact'))

export default function HomePage() {
  return (
    <div id="page-root" className="relative">
      <RedThread />

      <Navbar />
      <main id="main-content">
        <Hero />
        <MarqueeClient />
        <Projects />
        <Experience />
        <Learning />
        <About />
        <Contact />
      </main>
      <footer
        className="px-[clamp(24px,5vw,72px)] py-5 flex justify-between items-center
                         border-t-2 border-ink/15"
      >
        <span className="font-mono text-[12px] text-n600 tracking-[0.04em]">
          © 2026 Daiwang Khera
        </span>

        <FrameHUDClient />

        <span className="font-mono text-[12px] text-n600 tracking-[0.04em] hidden sm:inline">
          Last updated Aug 2026
        </span>
      </footer>
    </div>
  )
}

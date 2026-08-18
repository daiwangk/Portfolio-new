import Navbar from '@/components/ui/Navbar'
import Hero from '@/components/sections/Hero'
import { MarqueeClient, FrameHUDClient } from '@/components/ClientOverlays'
import Projects from '@/components/sections/Projects'
import Experience from '@/components/sections/Experience'
import Learning from '@/components/sections/Learning'
import About from '@/components/sections/About'
import Contact from '@/components/sections/Contact'

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <MarqueeClient />
        <Projects />
        <Experience />
        <Learning />
        <About />
        <Contact />
      </main>
      <footer className="px-[clamp(24px,5vw,72px)] py-5 flex justify-between items-center
                         border-t-2 border-ink/15">
        <span className="font-mono text-[12px] text-n600 tracking-[0.04em]">
          © 2026 Daiwang Khera
        </span>

        {/* Real-time frame budget HUD */}
        <FrameHUDClient />

        <span className="font-mono text-[12px] text-n600 tracking-[0.04em]">
          Last updated Aug 2026
        </span>
      </footer>
    </>
  )
}

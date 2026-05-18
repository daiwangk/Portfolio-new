import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import SplashIntro from './components/SplashIntro'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Learning from './components/Learning'
import About from './components/About'
import Contact from './components/Contact'
import RetailAICaseStudy from './pages/RetailAICaseStudy'
import CustomCursor from './components/CustomCursor'
import ParticleField from './components/ParticleField'
import { flushPendingScroll } from './lenis'
import './App.css'

// Home page content
function HomePage() {
  return (
    <>
      <Hero />
      <Experience />
      <Projects />
      <Learning />
      <About />
      <Contact />
    </>
  )
}

// Layout wrapper with common elements
function Layout({ children }) {
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      flushPendingScroll()
    }
  }, [location.pathname])

  return (
    <motion.div
      className="app"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <ParticleField />
      <div className="app-warmth" aria-hidden="true" />
      <Navbar />
      <main className="app-main">
        {children}
      </main>
      <footer className="footer">
        <div className="container">
          <p>
            Built with <span className="footer-heart">♥</span> and curiosity • 2026
          </p>
        </div>
      </footer>
    </motion.div>
  )
}

function App() {
  // Check if splash was already shown this session
  const [showSplash, setShowSplash] = useState(() => {
    return !sessionStorage.getItem('splashShown')
  })

  return (
    <BrowserRouter>
      <CustomCursor />
      {showSplash && (
        <SplashIntro onComplete={() => setShowSplash(false)} />
      )}

      <Layout>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/projects/retail-ai" element={<RetailAICaseStudy />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  )
}

export default App

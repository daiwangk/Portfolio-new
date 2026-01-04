import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import './Navbar.css'

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50)
        }
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <motion.nav
            className={`navbar ${scrolled ? 'scrolled' : ''}`}
            initial={{ y: -100 }}
            animate={{ y: 0 }}
            transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
        >
            <div className="container navbar-content">
                <Link to="/" className="logo">
                    <span className="logo-badge">DK</span>
                    <span className="logo-name">Daiwang</span>
                </Link>

                <button
                    className="mobile-toggle"
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
                    <a href="#experience" onClick={() => setMobileOpen(false)}>Experience</a>
                    <a href="#projects" onClick={() => setMobileOpen(false)}>Projects</a>
                    <a href="#learning" onClick={() => setMobileOpen(false)}>Learning</a>
                    <a href="#about" onClick={() => setMobileOpen(false)}>About</a>
                    <a href="#contact" className="btn btn-primary btn-nav" onClick={() => setMobileOpen(false)}>
                        Let's Talk
                    </a>
                </div>
            </div>
        </motion.nav>
    )
}

export default Navbar

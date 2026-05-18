import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { lenis, scrollToSection } from '../lenis'
import './Navbar.css'

const links = [
    { href: '#experience', label: 'Experience' },
    { href: '#projects', label: 'Projects' },
    { href: '#learning', label: 'Learning' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
]

function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [mobileOpen, setMobileOpen] = useState(false)
    const location = useLocation()
    const navigate = useNavigate()

    useEffect(() => {
        const onScroll = (instance) => {
            setScrolled(instance.scroll > 100)
        }
        setScrolled(lenis.scroll > 100)
        const unsubscribe = lenis.on('scroll', onScroll)
        return unsubscribe
    }, [])

    useEffect(() => {
        document.body.style.overflow = mobileOpen ? 'hidden' : ''
        return () => {
            document.body.style.overflow = ''
        }
    }, [mobileOpen])

    const handleAnchorClick = (e, href) => {
        setMobileOpen(false)

        if (location.pathname !== '/') {
            e.preventDefault()
            scrollToSection(href, navigate)
        }
    }

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-content">
                <Link to="/" className="logo" onClick={() => setMobileOpen(false)}>
                    DK
                </Link>

                <button
                    type="button"
                    className={`mobile-toggle ${mobileOpen ? 'open' : ''}`}
                    onClick={() => setMobileOpen(!mobileOpen)}
                    aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
                    aria-expanded={mobileOpen}
                >
                    <span />
                    <span />
                </button>

                <div className={`nav-links ${mobileOpen ? 'open' : ''}`}>
                    {links.map(({ href, label }) => (
                        <a
                            key={href}
                            href={href}
                            onClick={(e) => handleAnchorClick(e, href)}
                        >
                            {label}
                        </a>
                    ))}
                </div>
            </div>
        </nav>
    )
}

export default Navbar

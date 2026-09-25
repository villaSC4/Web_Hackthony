import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import logo from '../../img/logotipo_oficial-hackthonyperu.png';
import './Navbar.css';

const navLinks = [
  { href: '#servicios', label: 'Servicios' },
  { href: '#productos', label: 'Equipos' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#testimonios', label: 'Clientes' },
  { href: '#partners', label: 'Alianzas' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (href) => {
    setActiveLink(href);
    setMenuOpen(false);
  };

  return (
    <header className={`navbar ${scrolled ? 'navbar--scrolled' : ''}`}>
      <div className="navbar__inner container">
        {/* Logo Oficial Hackthony Support - Estilo Clay limpio */}
        <a href="#inicio" className="navbar__logo" onClick={() => handleLinkClick('#inicio')} aria-label="Hackthony Support">
          <img src={logo} alt="Hackthony Support" className="navbar__logo-img" />
        </a>

        {/* Desktop Nav Links — Enlaces limpios sin cápsulas */}
        <nav className="navbar__nav">
          <ul className="navbar__links">
            {navLinks.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  className={`navbar__link ${activeLink === link.href ? 'navbar__link--active' : ''}`}
                  onClick={() => handleLinkClick(link.href)}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* CTA Button — Píldora negra minimalista estilo Clay */}
        <div className="navbar__action">
          <a
            href="#contacto"
            className="navbar__cta"
            onClick={() => handleLinkClick('#contacto')}
          >
            <span>Contacto</span>
          </a>

          {/* Hamburger Mobile */}
          <button
            className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Abrir menú"
          >
            {menuOpen ? <FiX size={20} /> : <FiMenu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      <div className={`navbar__mobile ${menuOpen ? 'navbar__mobile--open' : ''}`}>
        <ul className="navbar__mobile-links">
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`navbar__mobile-link ${activeLink === link.href ? 'navbar__mobile-link--active' : ''}`}
                onClick={() => handleLinkClick(link.href)}
              >
                {link.label}
              </a>
            </li>
          ))}
          <li style={{ marginTop: '16px' }}>
            <a
              href="#contacto"
              className="navbar__cta"
              style={{ display: 'flex', width: '100%', justifyContent: 'center' }}
              onClick={() => handleLinkClick('#contacto')}
            >
              <span>Contacto</span>
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

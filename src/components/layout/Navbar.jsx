import { useState, useEffect } from 'react';
import { FiMenu, FiX, FiArrowRight } from 'react-icons/fi';
import logo from '../../img/logotipo_oficial-hackthonyperu.png';
import './Navbar.css';

const navLinks = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#partners', label: 'Clientes & Partners' },
  { href: '#soluciones', label: 'Asesor TI' },
  { href: '#productos', label: 'Equipos & Licencias' },
  { href: '#testimonios', label: 'Testimonios' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeLink, setActiveLink] = useState('#inicio');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
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
        {/* Logo Oficial Hackthony Support - Libre sin encapsular */}
        <a href="#inicio" className="navbar__logo" onClick={() => handleLinkClick('#inicio')} aria-label="Hackthony Support">
          <img src={logo} alt="Hackthony Support" className="navbar__logo-img" />
        </a>

        {/* Desktop Nav Links */}
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

        {/* CTA Button Estilo Clay Pill */}
        <a
          href="#contacto"
          className="btn btn-primary navbar__cta"
          onClick={() => handleLinkClick('#contacto')}
        >
          <span>Hablemos</span>
          <FiArrowRight size={15} />
        </a>

        {/* Hamburger Mobile */}
        <button
          className={`navbar__hamburger ${menuOpen ? 'navbar__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Abrir menú"
        >
          {menuOpen ? <FiX size={22} /> : <FiMenu size={22} />}
        </button>
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
          <li style={{ marginTop: '12px' }}>
            <a
              href="#contacto"
              className="btn btn-primary"
              style={{ width: '100%', justifyContent: 'center' }}
              onClick={() => handleLinkClick('#contacto')}
            >
              <span>Solicitar Diagnóstico TI</span>
              <FiArrowRight size={16} />
            </a>
          </li>
        </ul>
      </div>
    </header>
  );
}

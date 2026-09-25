import {
  FiPhone, FiMail, FiMapPin, FiGlobe,
  FiInstagram, FiLinkedin, FiFacebook, FiTwitter, FiYoutube
} from 'react-icons/fi';
import logo from '../../img/logotipo_oficial-hackthonyperu.png';
import './Footer.css';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const services = [
    { label: 'Consultoría TI & Redes', href: '#servicios' },
    { label: 'Mesa de Ayuda 24/7', href: '#servicios' },
    { label: 'Ciberseguridad Perimetral', href: '#servicios' },
    { label: 'Cloud & Microsoft 365', href: '#servicios' },
    { label: 'Equipos & Licenciamiento', href: '#productos' },
  ];

  const quickLinks = [
    { label: 'Clientes & Casos de Éxito', href: '#clientes' },
    { label: 'Alianzas Oficiales', href: '#partners' },
    { label: 'Catálogo de Equipos', href: '#productos' },
    { label: 'Quiénes Somos', href: '#nosotros' },
    { label: 'Contacto Directo', href: '#contacto' },
  ];

  const socialLinks = [
    { icon: FiLinkedin, href: 'https://linkedin.com', label: 'LinkedIn' },
    { icon: FiFacebook, href: 'https://facebook.com', label: 'Facebook' },
    { icon: FiInstagram, href: 'https://instagram.com', label: 'Instagram' },
    { icon: FiTwitter, href: 'https://twitter.com', label: 'Twitter' },
    { icon: FiYoutube, href: 'https://youtube.com', label: 'YouTube' },
  ];

  return (
    <footer className="footer">
      <div className="container footer__content">
        {/* Brand column */}
        <div className="footer__brand">
          <div className="footer__logo">
            <img src={logo} alt="Hackthony Support" className="footer__logo-img" />
          </div>
          <p className="footer__tagline">
            Socio tecnológico de élite. Aseguramos la continuidad operativa, ciberseguridad y escalabilidad de tu infraestructura con ingenieros certificados.
          </p>
          <div className="footer__socials">
            {socialLinks.map((s, i) => (
              <a
                key={i}
                href={s.href}
                className="footer__social"
                aria-label={s.label}
                target="_blank"
                rel="noopener noreferrer"
              >
                <s.icon size={17} />
              </a>
            ))}
          </div>
        </div>

        {/* Services */}
        <div className="footer__col">
          <h4 className="footer__col-title">Servicios TI</h4>
          <ul>
            {services.map((s, i) => (
              <li key={i}>
                <a href={s.href} className="footer__link">
                  <span className="footer__link-arrow">→</span>
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Navigation */}
        <div className="footer__col">
          <h4 className="footer__col-title">Plataforma</h4>
          <ul>
            {quickLinks.map((l, i) => (
              <li key={i}>
                <a href={l.href} className="footer__link">
                  <span className="footer__link-arrow">→</span>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Contact */}
        <div className="footer__col">
          <h4 className="footer__col-title">Contacto Oficial</h4>
          <ul className="footer__contact-list">
            <li>
              <FiPhone size={15} className="footer__contact-icon" />
              <a href="tel:+51994520017" className="footer__link">+51 994 520 017</a>
            </li>
            <li>
              <FiMail size={15} className="footer__contact-icon" />
              <a href="mailto:consultas@hackthonyperu.com" className="footer__link">
                consultas@hackthonyperu.com
              </a>
            </li>
            <li>
              <FiMapPin size={15} className="footer__contact-icon" style={{ flexShrink: 0, marginTop: 3 }} />
              <span className="footer__link-text">
                Las Lajas Nro. 721 Urb. Inca Manco Cápac, Lima, Perú
              </span>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p className="footer__copy">
            © {currentYear} HackthonySupport. Todos los derechos reservados.
          </p>
          <div className="footer__legal-links">
            <a href="#" className="footer__legal-link">Privacidad</a>
            <span className="footer__legal-dot">·</span>
            <a href="#" className="footer__legal-link">Términos</a>
            <span className="footer__legal-dot">·</span>
            <a href="#" className="footer__legal-link">Libro de Reclamaciones</a>
          </div>
          <p className="footer__made">
            Hecho con excelencia técnica en Perú 🇵🇪
          </p>
        </div>
      </div>
    </footer>
  );
}

import { useState } from 'react';
import {
  FiCpu, FiCalendar, FiCode, FiShoppingBag,
  FiCheckCircle, FiAward, FiGlobe, FiShield, FiArrowRight
} from 'react-icons/fi';
import teamImg from '../../img/nosotros.webp';
import './About.css';

const divisionsData = [
  {
    code: 'D1',
    title: 'División de Consultoría y Capacitación',
    description: 'Expertos en análisis TI, auditoría de vulnerabilidades, diseño de arquitecturas de red y formación tecnológica empresarial.',
    icon: FiCpu,
    tag: 'Estratégico',
    highlights: ['Auditorías de Ciberseguridad', 'Diseño de Redes Enterprise', 'Workshops y Capacitación Oficial'],
  },
  {
    code: 'D2',
    title: 'División de Eventos y Conferencias',
    description: 'Organización y participación en foros tecnológicos, simposios corporativos y congresos de ciberseguridad a nivel regional.',
    icon: FiCalendar,
    tag: 'Comunidad TI',
    highlights: ['Simposios Internacionales', 'Hackathons Corporativas', 'Webinars con Fabricantes'],
  },
  {
    code: 'D3',
    title: 'División de Servicios Digitales y Desarrollo',
    description: 'Desarrollo web corporativo, modernización en la nube Azure, automatización de procesos y soluciones digitales a medida.',
    icon: FiCode,
    tag: 'Ingeniería Cloud',
    highlights: ['Migración Microsoft Azure', 'Desarrollo de Software Custom', 'Automatización de Workflows'],
  },
  {
    code: 'D4',
    title: 'División de Comercialización Informática',
    description: 'Distribución y licenciamiento oficial de servidores, switches MikroTik, software Microsoft/Adobe y hardware certificado.',
    icon: FiShoppingBag,
    tag: 'Canal Oficial',
    highlights: ['Distribuidor Oficial MikroTik', 'Licencias Microsoft y Adobe', 'Garantía Directa de Fabricante'],
  },
];

export default function About() {
  const [activeDiv, setActiveDiv] = useState(0);

  return (
    <section className="about section" id="nosotros">
      <div className="container">
        <div className="about__layout">
          
          {/* COLUMNA IZQUIERDA: EQUIPO DESTACADO Y OPTIMIZADO */}
          <div className="about__visual-col">
            <div className="about__photo-stage">
              
              {/* Halo sutil optimizado */}
              <div className="about__photo-halo" />

              {/* Imagen oficial con recorte orgánico */}
              <div className="about__img-wrapper">
                <img
                  src={teamImg}
                  alt="Equipo de especialistas HackthonySupport"
                  className="about__team-img"
                  loading="lazy"
                />
              </div>

              {/* Píldora 1: Experiencia (Top Right) */}
              <div className="about__float-pill about__float-pill--experience">
                <div className="about__pill-icon">
                  <FiAward size={18} />
                </div>
                <div className="about__pill-content">
                  <strong className="about__pill-title">12+ Años</strong>
                  <span className="about__pill-sub">Liderazgo TI</span>
                </div>
              </div>

              {/* Píldora 2: Cobertura Internacional (Bottom Left) */}
              <div className="about__float-pill about__float-pill--countries">
                <div className="about__pill-icon">
                  <FiGlobe size={18} />
                </div>
                <div className="about__pill-content">
                  <div className="about__pill-row">
                    <span className="about__live-dot" />
                    <strong className="about__pill-title">5 Países</strong>
                  </div>
                  <span className="about__pill-sub">PE · ES · CO · AR · MX</span>
                </div>
              </div>

            </div>
          </div>

          {/* COLUMNA DERECHA: NARRATIVA CORPORATIVA Y 4 DIVISIONES */}
          <div className="about__text-col">
            <div className="about__header">
              <div className="section-label">
                <FiCheckCircle size={14} />
                <span>Nosotros</span>
              </div>
              <h2 className="section-title">
                Acerca de <span className="gradient-text">Nosotros</span>
              </h2>
            </div>

            <p className="about__lead-desc">
              En <strong>HackthonySupport</strong>, llevamos más de 12 años liderando el mercado
              de soluciones tecnológicas en <strong>Perú, España, Colombia, Argentina y México</strong>.
              Nuestra amplia trayectoria y compromiso inquebrantable nos han consolidado como un
              socio tecnológico de confianza para organizaciones corporativas y empresas de todos los tamaños.
            </p>

            <p className="about__sub-desc">
              Nos especializamos en brindar soporte técnico continuo 24/7, ciberseguridad perimetral
              y soluciones personalizadas que optimizan procesos y blindan la integridad de tus datos.
            </p>

            {/* 4 Divisiones Especializadas */}
            <div className="about__divisions-section">
              <div className="about__divisions-intro">
                <h3 className="about__divisions-heading">
                  Estamos compuestos por 4 Divisiones Especializadas:
                </h3>
              </div>

              <div className="about__divisions-grid">
                {divisionsData.map((div, i) => {
                  const Icon = div.icon;
                  const isActive = activeDiv === i;
                  return (
                    <div
                      key={div.code}
                      className={`about__division-card ${isActive ? 'about__division-card--active' : ''}`}
                      onClick={() => setActiveDiv(i)}
                      onMouseEnter={() => setActiveDiv(i)}
                    >
                      <div className="about__div-top">
                        <div className="about__div-badge-wrap">
                          <span className="about__div-code">{div.code}</span>
                          <span className="about__div-tag">{div.tag}</span>
                        </div>
                        <div className="about__div-icon-box">
                          <Icon size={18} />
                        </div>
                      </div>

                      <h4 className="about__div-title">{div.title}</h4>
                      <p className="about__div-desc">{div.description}</p>

                      {/* Capacidades desplegadas con animación suave y ligera */}
                      <div
                        className="about__div-expandable"
                        aria-hidden={!isActive}
                      >
                        <div className="about__div-expandable-content">
                          <div className="about__div-highlights">
                            {div.highlights.map((h, hIdx) => (
                              <span
                                key={hIdx}
                                className="about__div-chip"
                                style={{ '--chip-delay': `${hIdx * 50}ms` }}
                              >
                                <span className="about__div-chip-check">✓</span>
                                <span>{h}</span>
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="about__cta-wrap">
              <a href="#contacto" className="btn btn-primary about__btn">
                <span>Contactar con nuestro equipo</span>
                <FiArrowRight size={18} />
              </a>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}

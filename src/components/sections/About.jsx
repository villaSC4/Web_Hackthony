import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight, FiArrowLeft,
  FiShield, FiCalendar, FiCode, FiShoppingBag, FiCheck,
  FiChevronLeft
} from 'react-icons/fi';
import div1Img from '../../img/div1_consultoria.jpg';
import div2Img from '../../img/div2_eventos.jpg';
import div3Img from '../../img/div3_digital.jpg';
import div4Img from '../../img/div4_hardware.jpg';
import './About.css';

const divisions = [
  {
    id: 'd1',
    code: 'D1',
    tag: 'Estratégico',
    title: 'División de Consultoría y Capacitación',
    shortDesc: 'Expertos en análisis TI, auditorías de vulnerabilidad y diseño de redes corporativas.',
    highlights: ['Auditorías de Ciberseguridad', 'Diseño de Redes Enterprise', 'Workshops y Capacitación Oficial'],
    image: div1Img,
    icon: FiShield,
  },
  {
    id: 'd2',
    code: 'D2',
    tag: 'Comunidad TI',
    title: 'División de Eventos y Conferencias',
    shortDesc: 'Organización de foros tecnológicos, simposios y congresos de ciberseguridad.',
    highlights: ['Simposios Internacionales', 'Hackathons Corporativas', 'Webinars con Fabricantes'],
    image: div2Img,
    icon: FiCalendar,
  },
  {
    id: 'd3',
    code: 'D3',
    tag: 'Ingeniería Cloud',
    title: 'División de Servicios Digitales y Desarrollo',
    shortDesc: 'Desarrollo web corporativo, modernización en Azure y automatización a medida.',
    highlights: ['Migración Microsoft Azure', 'Desarrollo de Software Custom', 'Automatización de Workflows'],
    image: div3Img,
    icon: FiCode,
  },
  {
    id: 'd4',
    code: 'D4',
    tag: 'Canal Oficial',
    title: 'División de Comercialización Informática',
    shortDesc: 'Distribución y licenciamiento oficial de MikroTik, Microsoft, software y servidores.',
    highlights: ['Distribuidor Oficial MikroTik', 'Licencias Microsoft y Adobe', 'Garantía Directa de Fabricante'],
    image: div4Img,
    icon: FiShoppingBag,
  },
];

export default function About() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  // Giro suave de especialidades con la flechita
  const handleRotateNext = (e) => {
    e?.stopPropagation();
    setIsSpinning(true);
    setActiveIndex((prev) => (prev + 1) % divisions.length);
    setTimeout(() => setIsSpinning(false), 550);
  };

  const handleRotatePrev = (e) => {
    e?.stopPropagation();
    setIsSpinning(true);
    setActiveIndex((prev) => (prev - 1 + divisions.length) % divisions.length);
    setTimeout(() => setIsSpinning(false), 550);
  };

  const handleCardClick = (i) => {
    if (!isExpanded) {
      setIsExpanded(true);
      setActiveIndex(0);
    } else {
      setActiveIndex(i);
    }
  };

  return (
    <section className="about section" id="nosotros">
      <div className="container">
        
        {/* Layout en fila única: el texto y las tarjetas nunca cambian de fila vertical */}
        <div className={`about__layout ${isExpanded ? 'about__layout--expanded' : ''}`}>
          
          {/* COLUMNA IZQUIERDA: TEXTO CONCISO (Se repliega horizontalmente a la izquierda) */}
          <div className="about__text-col">
            <div className="about__text-inner">
              <h2 className="about__title">
                Acerca de <span className="about__title-accent">Hackthony</span>
              </h2>

              <p className="about__lead">
                Más de <strong>12 años liderando el mercado de soluciones tecnológicas</strong> y ciberseguridad en Perú, España, Colombia, Argentina y México.
              </p>

              <p className="about__desc">
                Nos consolidamos como socio estratégico de organizaciones corporativas brindando soporte técnico 24/7, blindaje perimetral y soluciones que optimizan y protegen la infraestructura de misión crítica.
              </p>

              {/* Métricas clave */}
              <div className="about__stats-row">
                <div className="about__stat-item">
                  <span className="about__stat-number">12+</span>
                  <span className="about__stat-label">Años de Trayectoria</span>
                </div>
                <div className="about__stat-divider" />
                <div className="about__stat-item">
                  <span className="about__stat-number">5</span>
                  <span className="about__stat-label">Países con Presencia</span>
                </div>
                <div className="about__stat-divider" />
                <div className="about__stat-item">
                  <span className="about__stat-number">99.9%</span>
                  <span className="about__stat-label">Uptime Garantizado</span>
                </div>
              </div>

              <div className="about__cta-wrap">
                <a href="#contacto" className="about__btn-primary">
                  <span>Solicitar Asesoría</span>
                  <FiArrowRight size={17} />
                </a>
              </div>
            </div>
          </div>

          {/* COLUMNA DERECHA: MANTENIDA EN LA MISMA LÍNEA HORIZONTAL SIN CAERSE ABAJO */}
          <div className="about__visual-col">
            
            {/* Barra superior con controles: Se despliega suavemente en la misma posición */}
            <div className={`about__expanded-bar ${isExpanded ? 'about__expanded-bar--visible' : ''}`}>
              <button
                type="button"
                className="about__back-btn"
                onClick={() => setIsExpanded(false)}
                title="Volver a información"
              >
                <FiChevronLeft size={18} />
                <span>Volver al texto</span>
              </button>

              <div className="about__deck-controls-right">
                <span className="about__deck-hint">
                  Especialidad {activeIndex + 1} de {divisions.length}
                </span>

                <div className="about__deck-buttons">
                  <button
                    type="button"
                    className="about__arrow-btn"
                    onClick={handleRotatePrev}
                    aria-label="Especialidad anterior"
                    title="Anterior"
                  >
                    <FiArrowLeft size={18} />
                  </button>

                  <button
                    type="button"
                    className={`about__arrow-btn about__arrow-btn--active ${isSpinning ? 'about__arrow-btn--spinning' : ''}`}
                    onClick={handleRotateNext}
                    aria-label="Girar especialidades"
                    title="Girar especialidades"
                  >
                    <FiArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>

            {/* Cascada de las 4 tarjetas: En la misma fila, se abren de IZQUIERDA a DERECHA */}
            <motion.div
              className="about__deck-container"
              animate={isSpinning ? { rotateY: [0, 20, -10, 0], scale: [1, 0.98, 1.01, 1] } : {}}
              transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className={`about__cards-cascade ${isExpanded ? 'about__cards-cascade--expanded' : 'about__cards-cascade--initial'}`}>
                {divisions.map((div, i) => {
                  const isCurrentActive = activeIndex === i;
                  const isHovered = hoveredIndex === i;
                  const isEffectiveExpanded = isExpanded ? (hoveredIndex !== null ? isHovered : isCurrentActive) : (i === 0);
                  const Icon = div.icon;
                  const isHidden = !isExpanded && i > 0;

                  return (
                    <div
                      key={div.id}
                      className={`about__card ${isEffectiveExpanded ? 'about__card--expanded' : 'about__card--collapsed'} ${isCurrentActive ? 'about__card--selected' : ''} ${isHidden ? 'about__card--hidden' : ''}`}
                      onMouseEnter={() => isExpanded && setHoveredIndex(i)}
                      onMouseLeave={() => isExpanded && setHoveredIndex(null)}
                      onClick={() => handleCardClick(i)}
                    >
                      <img
                        src={div.image}
                        alt={div.title}
                        className="about__card-bg-img"
                        loading="lazy"
                      />
                      <div className="about__card-overlay" />

                      {/* Header de la tarjeta */}
                      <div className="about__card-header">
                        <div className="about__card-badge">
                          <span className="about__card-code">{div.code}</span>
                          <span className="about__card-tag">{div.tag}</span>
                        </div>
                        <div className="about__card-icon-circle">
                          <Icon size={16} />
                        </div>
                      </div>

                      {/* Contenido inferior */}
                      <div className="about__card-body">
                        <h4 className="about__card-title">{div.title}</h4>

                        {/* Botón trigger en estado inicial (solo en tarjeta 0) */}
                        {!isExpanded && i === 0 && (
                          <div className="about__single-action-trigger">
                            <span className="about__single-action-text">Presiona para ver las 4 divisiones</span>
                            <span className="about__single-action-icon">
                              <FiArrowRight size={18} />
                            </span>
                          </div>
                        )}

                        {/* Detalles de la tarjeta en modo expandido */}
                        <div className={`about__card-details ${isExpanded && isEffectiveExpanded ? 'about__card-details--open' : ''}`}>
                          <p className="about__card-desc">{div.shortDesc}</p>

                          <div className="about__card-highlights">
                            {div.highlights.map((h, idx) => (
                              <span key={idx} className="about__card-chip">
                                <FiCheck size={12} className="about__card-chip-icon" />
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
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

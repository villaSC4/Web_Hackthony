import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiWifi, FiHeadphones, FiHome, FiCloud, FiBookOpen,
  FiShield, FiGlobe, FiServer, FiVideo, FiTool,
  FiVolume2, FiTrendingUp, FiMaximize2, FiX, FiCheckCircle,
  FiClock, FiAward, FiArrowRight
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { services, serviceCategories } from '../../data/services';
import './Services.css';

const iconMap = {
  FaNetworkWired: FiWifi,
  FaHeadset: FiHeadphones,
  FaLaptopHouse: FiHome,
  FaCloud: FiCloud,
  FaGraduationCap: FiBookOpen,
  FaShieldAlt: FiShield,
  FaGlobe: FiGlobe,
  FaServer: FiServer,
  FaVideo: FiVideo,
  FaTools: FiTool,
  FaBullhorn: FiVolume2,
  FaChartLine: FiTrendingUp,
};

// Micro-especificaciones técnicas de alto impacto para la presentación
const serviceTagsMap = {
  ti: ['SLA < 15 min', 'Soporte 24/7'],
  cloud: ['99.99% Uptime', 'SSD NVMe'],
  seguridad: ['Cifrado TLS 1.3', 'Perímetro SOC'],
  digital: ['SEO & Alta Velocidad', 'Conversión ROI'],
};

function ServiceCard({ service, index, onZoom }) {
  const cardRef = useRef(null);
  const Icon = iconMap[service.icon] || FiGlobe;
  const whatsappUrl = `https://wa.me/51994520017?text=Hola%2C%20me%20interesa%20el%20servicio%20de%20${encodeURIComponent(service.title)}`;

  const handleMouseMove = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Dynamic cyber spotlight coordinates
    card.style.setProperty('--mouse-x', `${x}px`);
    card.style.setProperty('--mouse-y', `${y}px`);

    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const rotX = ((y - cy) / cy) * -7;
    const rotY = ((x - cx) / cx) * 7;
    card.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-8px) scale3d(1.02, 1.02, 1.02)`;
  };

  const handleMouseLeave = () => {
    if (cardRef.current) {
      cardRef.current.style.transform = '';
    }
  };

  const capabilityTags = serviceTagsMap[service.category] || ['Alta Disponibilidad', 'Garantía Directa'];

  return (
    <div
      ref={cardRef}
      className="service-card"
      style={{
        '--service-color': service.color,
        animationDelay: `${(index % 6) * 0.08}s`,
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={() => onZoom(service)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && onZoom(service)}
    >
      {/* Cyber spotlight interactivo que sigue el mouse */}
      <div className="service-card__spotlight" />
      <div className="service-card__glow" />

      {/* Botón flotante de zoom / vista técnica con baliza radar activa */}
      <button
        type="button"
        className="service-card__zoom-btn"
        onClick={(e) => {
          e.stopPropagation();
          onZoom(service);
        }}
        title="Agrandar para vista detallada técnica"
      >
        <span className="service-card__zoom-beacon">
          <span className="service-card__zoom-core" />
          <span className="service-card__zoom-wave" />
        </span>
        <FiMaximize2 size={12} />
        <span>Zoom</span>
      </button>

      {/* Icono con levitación 3D */}
      <div className="service-card__icon">
        <Icon size={26} />
      </div>

      <div className="service-card__category">{service.categoryLabel}</div>
      <h3 className="service-card__title">{service.title}</h3>
      <p className="service-card__desc">{service.description}</p>

      {/* Micro-chips de especificaciones técnicas para presentación corporativa */}
      <div className="service-card__tags">
        {capabilityTags.map((tag, tIdx) => (
          <span key={tIdx} className="service-card__tag">
            <span className="service-card__tag-dot" />
            {tag}
          </span>
        ))}
      </div>

      {/* Botones alineados uniformemente al pie */}
      <div className="service-card__actions">
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="service-card__btn"
          onClick={(e) => e.stopPropagation()}
        >
          <FaWhatsapp size={15} />
          <span>Solicitar</span>
        </a>

        <button
          type="button"
          className="service-card__details-btn"
          onClick={(e) => {
            e.stopPropagation();
            onZoom(service);
          }}
        >
          <span>Ver Ficha</span>
          <FiArrowRight size={13} />
        </button>
      </div>
    </div>
  );
}

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [visible, setVisible] = useState(true);
  const [zoomedService, setZoomedService] = useState(null);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Cerrar modal de zoom con tecla ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setZoomedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const filtered = activeCategory === 'all'
    ? services
    : services.filter(s => s.category === activeCategory);

  const ZoomIcon = zoomedService ? (iconMap[zoomedService.icon] || FiGlobe) : null;
  const zoomWhatsappUrl = zoomedService
    ? `https://wa.me/51994520017?text=Hola%2C%20quisiera%20cotizar%20el%20servicio%20especializado%20de%20${encodeURIComponent(zoomedService.title)}.`
    : '';

  return (
    <section className="services section" id="servicios" ref={sectionRef}>
      <div className="services__glow" />

      <div className="container">
        {/* Header con telemetría en vivo */}
        <div className={`services__header ${visible ? 'services__header--visible' : ''}`}>
          <div className="services__telemetry-bar">
            <span className="services__telemetry-pill">
              <span className="services__telemetry-pulse" />
              INGENIERÍA EMPRESARIAL
            </span>
            <span className="services__telemetry-count">
              {filtered.length} {filtered.length === 1 ? 'SOLUCIÓN ACTIVA' : 'SOLUCIONES ACTIVAS'}
            </span>
          </div>

          <h2 className="section-title">
            Nuestros <span className="gradient-text">Servicios de Ingeniería</span>
          </h2>
          <p className="section-subtitle">
            Arquitecturas tecnológicas diseñadas a medida. Haz clic en <strong>Zoom</strong> o sobre cualquier tarjeta para inspeccionar especificaciones técnicas, protocolos y SLAs garantizados.
          </p>
        </div>

        {/* Filter tabs con indicador deslizante */}
        <div className="services__filters">
          {serviceCategories.map(cat => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                className={`services__filter-btn ${isActive ? 'services__filter-btn--active' : ''}`}
                onClick={() => setActiveCategory(cat.id)}
              >
                {isActive && (
                  <motion.div
                    layoutId="servicesFilterIndicator"
                    className="services-filter-indicator"
                    transition={{ type: "spring", stiffness: 380, damping: 32 }}
                  />
                )}
                <span className="services-filter-label">{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Grid con animación fluida entre categorías */}
        <div className="services__grid">
          <AnimatePresence mode="popLayout">
            {filtered.map((service, i) => (
              <motion.div
                key={service.id}
                layout
                initial={{ opacity: 0, y: 12, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.26, ease: [0.22, 1, 0.36, 1] }}
                className="service-card-wrapper"
              >
                <ServiceCard
                  service={service}
                  index={i}
                  onZoom={(srv) => setZoomedService(srv)}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      {/* MODAL CINEMATOGRÁFICO DE ZOOM Y VISTA EXPANDIDA */}
      <AnimatePresence>
        {zoomedService && (
          <motion.div
            className="services-zoom-overlay"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setZoomedService(null)}
          >
            <motion.div
              className="services-zoom-modal"
              initial={{ scale: 0.88, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ duration: 0.3, ease: [0.2, 0.8, 0.2, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Botón cerrar */}
              <button
                type="button"
                className="services-zoom-close"
                onClick={() => setZoomedService(null)}
                aria-label="Cerrar vista detallada"
              >
                <FiX size={20} />
              </button>

              <div className="services-zoom-content">
                {/* Cabecera del modal con zoom */}
                <div className="services-zoom-header">
                  <div className="services-zoom-icon-box">
                    <ZoomIcon size={34} />
                  </div>
                  <div>
                    <span className="services-zoom-tag">{zoomedService.categoryLabel}</span>
                    <h3 className="services-zoom-title">{zoomedService.title}</h3>
                    <p className="services-zoom-meta">
                      Arquitectura Empresarial · Soporte Presencial & Remoto 24/7
                    </p>
                  </div>
                </div>

                <p className="services-zoom-description">
                  {zoomedService.description} Nuestro equipo diseña, implementa y audita esta solución
                  con estándares internacionales de ciberseguridad, alta disponibilidad y respaldo de fabricantes.
                </p>

                {/* Especificaciones Técnicas Ampliadas */}
                <div className="services-zoom-specs">
                  <div className="services-spec-item">
                    <FiCheckCircle className="services-spec-icon" />
                    <div>
                      <strong>SLA Garantizado</strong>
                      <span>Tiempos de respuesta &lt; 15 min</span>
                    </div>
                  </div>

                  <div className="services-spec-item">
                    <FiShield className="services-spec-icon" />
                    <div>
                      <strong>Blindaje & Cifrado</strong>
                      <span>Protocolos seguros TLS 1.3 / AES-256</span>
                    </div>
                  </div>

                  <div className="services-spec-item">
                    <FiClock className="services-spec-icon" />
                    <div>
                      <strong>Disponibilidad 24/7</strong>
                      <span>Monitoreo continuo NOC / SOC</span>
                    </div>
                  </div>

                  <div className="services-spec-item">
                    <FiAward className="services-spec-icon" />
                    <div>
                      <strong>Garantía de Fábrica</strong>
                      <span>Respaldado por fabricantes líderes</span>
                    </div>
                  </div>
                </div>

                {/* Barra de acción en el modal */}
                <div className="services-zoom-actions">
                  <a
                    href={zoomWhatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="services-zoom-btn"
                  >
                    <FaWhatsapp size={18} />
                    <span>Cotizar este Servicio con un Asesor</span>
                  </a>

                  <button
                    type="button"
                    className="services-zoom-btn-sec"
                    onClick={() => setZoomedService(null)}
                  >
                    <FiX size={16} />
                    <span>Cerrar Vista</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

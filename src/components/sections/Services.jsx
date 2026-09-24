import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiWifi, FiHeadphones, FiHome, FiCloud, FiBookOpen,
  FiShield, FiGlobe, FiServer, FiVideo, FiTool,
  FiVolume2, FiTrendingUp, FiX, FiCheck,
  FiClock, FiAward, FiArrowRight, FiArrowDown, FiChevronLeft
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { services, serviceCategories } from '../../data/services';
import cyberSecImg from '../../img/servicio_ciberseguridad.jpg';
import cloudImg from '../../img/servicio_cloud.jpg';
import soporteImg from '../../img/servicio_soporte.jpg';
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
  FaTool: FiTool,
  FaVolume2: FiVolume2,
  FaTrendingUp: FiTrendingUp,
};

// 3 Servicios destacados principales con imágenes exclusivas de alta definición
const featuredServices = [
  {
    id: 1,
    number: '01',
    category: 'TI Empresarial',
    title: 'Consultoría TI & Ciberseguridad',
    description: 'Análisis integral de infraestructura, auditorías de vulnerabilidad y diseño de arquitecturas perimetrales blindadas con soporte continuo 24/7.',
    image: cyberSecImg,
    highlights: ['Auditorías de Ciberseguridad', 'Redes MikroTik & Fortinet', 'SLA < 15 min Garantizado'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20el%20servicio%20de%20Consultor%C3%ADa%20TI%20y%20Ciberseguridad.',
  },
  {
    id: 2,
    number: '02',
    category: 'Cloud & Remoto',
    title: 'Cloud Computing & Servidores Dedicados',
    description: 'Modernización e integración en la nube con Microsoft Azure y VPS de alta disponibilidad. Conexiones redundantes y continuidad operativa garantizada del 99.99%.',
    image: cloudImg,
    highlights: ['Migración Microsoft Azure', '99.99% Uptime SLA', 'Respaldos Automáticos Cloud'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20el%20servicio%20de%20Cloud%20Computing%20y%20Servidores.',
  },
  {
    id: 3,
    number: '03',
    category: 'Hardware & Mesa de Ayuda',
    title: 'Soporte Técnico & Equipamiento Empresarial',
    description: 'Mesa de ayuda presencial y remota con atención inmediata. Distribución y licenciamiento oficial de MikroTik, Microsoft, Adobe y servidores corporativos.',
    image: soporteImg,
    highlights: ['Mesa de Ayuda AnyDesk 24/7', 'Canal Oficial MikroTik', 'Garantía Directa de Fabricante'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20el%20servicio%20de%20Soporte%20T%C3%A9cnico%20y%20Equipamiento.',
  },
];

const serviceSpecsMap = {
  ti: {
    sla: 'SLA < 15 min',
    support: 'Soporte 24/7 AnyDesk',
    tags: ['SLA < 15 min', 'Soporte 24/7', 'MikroTik & Fortinet'],
  },
  cloud: {
    sla: 'Uptime 99.99%',
    support: 'Monitoreo Cloud Activo',
    tags: ['99.99% Uptime', 'SSD NVMe', 'Azure Cloud'],
  },
  seguridad: {
    sla: 'Respuesta Inmediata',
    support: 'Blindaje Perimetral SOC',
    tags: ['Cifrado TLS 1.3', 'Perímetro SOC', 'Firewall Activo'],
  },
  digital: {
    sla: 'Entrega Ágil',
    support: 'Optimización Continua',
    tags: ['SEO & Alta Velocidad', 'Conversión ROI', 'Diseño UI/UX'],
  },
};

export default function Services() {
  const [showAll, setShowAll] = useState(false);
  const [activeCategory, setActiveCategory] = useState('all');
  const [selectedService, setSelectedService] = useState(null);
  const catalogRef = useRef(null);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') setSelectedService(null);
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleShowMore = () => {
    setShowAll(true);
    setTimeout(() => {
      catalogRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
  };

  const filteredServices = activeCategory === 'all'
    ? services
    : services.filter((s) => s.category === activeCategory);

  const ModalIcon = selectedService ? (iconMap[selectedService.icon] || FiGlobe) : null;
  const modalSpecs = selectedService ? (serviceSpecsMap[selectedService.category] || {}) : {};
  const modalWhatsappUrl = selectedService
    ? `https://wa.me/51994520017?text=Hola%20Hackthony%20Support%2C%20solicito%20informaci%C3%B3n%20y%20cotizaci%C3%B3n%20para%20el%20servicio%20de%20${encodeURIComponent(selectedService.title)}.`
    : '';

  return (
    <section className="services-section" id="servicios">
      <div className="container">
        
        {/* Cabecera Limpia */}
        <div className="services__header">
          <h2 className="services__title">
            Servicios de Ingeniería & <span className="services__title-accent">Soluciones TI</span>
          </h2>
          <p className="services__subtitle">
            Arquitecturas tecnológicas diseñadas a medida para optimizar, proteger y escalar la infraestructura operativa de tu empresa.
          </p>
        </div>

        {/* =========================================================
            VISTA 1: 3 SERVICIOS CON IMÁGENES QUE ENTRAN DE IZQUIERDA A DERECHA CON SCROLL
            ========================================================= */}
        {!showAll && (
          <div className="services__featured-list">
            {featuredServices.map((service, index) => (
              <motion.div
                key={service.id}
                className="services__featured-item"
                initial={{ opacity: 0, x: -140, scale: 0.95 }}
                whileInView={{ opacity: 1, x: 0, scale: 1 }}
                viewport={{ once: false, amount: 0.2 }}
                transition={{
                  duration: 0.8,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                {/* Imagen del servicio: Entrada con de-zoom cinematográfico y destello */}
                <div className="services__featured-img-wrap">
                  <motion.img
                    src={service.image}
                    alt={service.title}
                    className="services__featured-img"
                    loading="lazy"
                    initial={{ scale: 1.14, filter: 'brightness(0.92)' }}
                    whileInView={{ scale: 1, filter: 'brightness(1)' }}
                    viewport={{ once: false }}
                    transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                  />
                  <div className="services__featured-img-overlay" />
                  
                  {/* Badge numérico con rebote spring */}
                  <motion.span
                    className="services__featured-num"
                    initial={{ scale: 0, rotate: -20, opacity: 0 }}
                    whileInView={{ scale: 1, rotate: 0, opacity: 1 }}
                    viewport={{ once: false }}
                    transition={{
                      duration: 0.55,
                      delay: 0.2,
                      type: 'spring',
                      stiffness: 240,
                      damping: 16,
                    }}
                  >
                    {service.number}
                  </motion.span>

                  {/* Sutil barrido de luz al entrar */}
                  <div className="services__featured-sheen" />
                </div>

                {/* Contenido textual del servicio con entrada escalonada (staggered) */}
                <div className="services__featured-content">
                  <motion.span
                    className="services__featured-category"
                    initial={{ opacity: 0, y: -10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.15 }}
                  >
                    {service.category}
                  </motion.span>

                  <motion.h3
                    className="services__featured-title"
                    initial={{ opacity: 0, x: 25 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {service.title}
                  </motion.h3>

                  <motion.p
                    className="services__featured-desc"
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.55, delay: 0.26, ease: [0.16, 1, 0.3, 1] }}
                  >
                    {service.description}
                  </motion.p>

                  <div className="services__featured-highlights">
                    {service.highlights.map((h, hIdx) => (
                      <motion.div
                        key={hIdx}
                        className="services__featured-chip"
                        initial={{ opacity: 0, x: 25 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: false }}
                        transition={{
                          duration: 0.45,
                          delay: 0.3 + hIdx * 0.08,
                          ease: [0.16, 1, 0.3, 1],
                        }}
                      >
                        <FiCheck className="services__featured-chip-icon" size={14} />
                        <span>{h}</span>
                      </motion.div>
                    ))}
                  </div>

                  <motion.div
                    className="services__featured-actions"
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false }}
                    transition={{ duration: 0.5, delay: 0.46 }}
                  >
                    <a
                      href={service.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="services__btn-primary"
                    >
                      <FaWhatsapp size={15} />
                      <span>Cotizar Servicio</span>
                    </a>

                    <button
                      type="button"
                      className="services__btn-ghost"
                      onClick={() => {
                        const original = services.find((s) => s.id === service.id) || services[0];
                        setSelectedService(original);
                      }}
                    >
                      <span>Ficha Técnica</span>
                      <FiArrowRight size={14} />
                    </button>
                  </motion.div>
                </div>
              </motion.div>
            ))}

            {/* Botón "Ver más servicios" para desplegar la vista completa */}
            <div className="services__more-wrap">
              <button
                type="button"
                className="services__btn-more"
                onClick={handleShowMore}
              >
                <span>Ver más servicios</span>
                <FiArrowDown size={17} className="services__btn-more-icon" />
              </button>
            </div>
          </div>
        )}

        {/* =========================================================
            VISTA 2: CATÁLOGO COMPLETO DIFERENTE CON TODOS LOS SERVICIOS Y FILTROS
            ========================================================= */}
        {showAll && (
          <motion.div
            ref={catalogRef}
            className="services__catalog"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Barra superior con botón de regreso */}
            <div className="services__catalog-top">
              <button
                type="button"
                className="services__catalog-back-btn"
                onClick={() => setShowAll(false)}
              >
                <FiChevronLeft size={18} />
                <span>Volver a destacados</span>
              </button>

              <span className="services__catalog-count">
                Mostrando {filteredServices.length} de {services.length} servicios
              </span>
            </div>

            {/* Pestañas de Filtro en Cápsula */}
            <div className="services__filters">
              {serviceCategories.map((cat) => {
                const isActive = activeCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    type="button"
                    className={`services__filter-btn ${isActive ? 'services__filter-btn--active' : ''}`}
                    onClick={() => setActiveCategory(cat.id)}
                  >
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Grid de Todas las Tarjetas */}
            <motion.div layout className="services__grid">
              <AnimatePresence mode="popLayout">
                {filteredServices.map((service) => {
                  const Icon = iconMap[service.icon] || FiGlobe;
                  const cardWhatsapp = `https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20el%20servicio%20de%20${encodeURIComponent(service.title)}`;
                  const specs = serviceSpecsMap[service.category] || {
                    sla: 'Garantía Directa',
                    support: 'Soporte Experto',
                    tags: ['Alta Disponibilidad', 'Garantía Directa'],
                  };

                  return (
                    <motion.div
                      key={service.id}
                      layout
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.94 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="service-catalog-card"
                      onClick={() => setSelectedService(service)}
                    >
                      <div className="service-catalog-card__top">
                        <div className="service-catalog-card__icon-wrap">
                          <Icon size={22} />
                        </div>
                        <span className="service-catalog-card__cat">{service.categoryLabel}</span>
                      </div>

                      <h3 className="service-catalog-card__title">{service.title}</h3>
                      <p className="service-catalog-card__desc">{service.description}</p>

                      <div className="service-catalog-card__chips">
                        {specs.tags.map((tag, idx) => (
                          <span key={idx} className="service-catalog-card__chip">
                            <FiCheck size={11} className="service-catalog-card__chip-icon" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>

                      <div className="service-catalog-card__footer">
                        <a
                          href={cardWhatsapp}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="service-catalog-card__btn-primary"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <FaWhatsapp size={14} />
                          <span>Cotizar</span>
                        </a>

                        <button
                          type="button"
                          className="service-catalog-card__btn-ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedService(service);
                          }}
                        >
                          <span>Ficha Técnica</span>
                          <FiArrowRight size={13} />
                        </button>
                      </div>
                    </motion.div>
                  );
                })}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        )}

      </div>

      {/* Modal Moderno de Ficha Técnica */}
      <AnimatePresence>
        {selectedService && (
          <div className="service-modal-overlay" onClick={() => setSelectedService(null)}>
            <motion.div
              className="service-modal"
              initial={{ opacity: 0, scale: 0.95, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 16 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="service-modal__close"
                onClick={() => setSelectedService(null)}
                aria-label="Cerrar modal"
              >
                <FiX size={20} />
              </button>

              <div className="service-modal__header">
                <div className="service-modal__icon-wrap">
                  {ModalIcon && <ModalIcon size={26} />}
                </div>
                <div>
                  <span className="service-modal__cat">{selectedService.categoryLabel}</span>
                  <h3 className="service-modal__title">{selectedService.title}</h3>
                </div>
              </div>

              <div className="service-modal__body">
                <p className="service-modal__desc">{selectedService.description}</p>

                <div className="service-modal__specs-grid">
                  <div className="service-modal__spec-card">
                    <FiClock size={18} className="service-modal__spec-icon" />
                    <div>
                      <strong>Garantía de SLA</strong>
                      <span>{modalSpecs.sla || 'Respuesta Inmediata'}</span>
                    </div>
                  </div>

                  <div className="service-modal__spec-card">
                    <FiAward size={18} className="service-modal__spec-icon" />
                    <div>
                      <strong>Modalidad de Soporte</strong>
                      <span>{modalSpecs.support || 'Atención 24/7'}</span>
                    </div>
                  </div>
                </div>

                <div className="service-modal__capabilities">
                  <h4 className="service-modal__cap-title">Alcance & Entregables:</h4>
                  <ul className="service-modal__cap-list">
                    {modalSpecs.tags?.map((tag, idx) => (
                      <li key={idx}>
                        <FiCheck className="service-modal__check" size={14} />
                        <span>{tag}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="service-modal__footer">
                <button
                  type="button"
                  className="service-modal__btn-secondary"
                  onClick={() => setSelectedService(null)}
                >
                  Cerrar
                </button>

                <a
                  href={modalWhatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="service-modal__btn-primary"
                >
                  <FaWhatsapp size={16} />
                  <span>Cotizar por WhatsApp</span>
                </a>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}

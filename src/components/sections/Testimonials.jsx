import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheckCircle,
  FiAward,
  FiShield,
  FiGlobe,
  FiArrowRight,
  FiCheck,
} from 'react-icons/fi';

import logoIngelectros from '../../img/3.png';
import logoMDBoutique from '../../img/4-1.png';
import logoSasaIT from '../../img/5.png';
import logoUNAC from '../../img/Nuevo-Cliente4.png';
import logoVicor from '../../img/Nuevo-Cliente5.png';
import logoComfica from '../../img/confica-colombia.png';
import logoHikvision from '../../img/camera-mexico.png';

import './Testimonials.css';

export const clientsList = [
  {
    id: 'unac',
    name: 'Universidad Nacional del Callao',
    shortName: 'UNAC',
    logo: logoUNAC,
    sector: 'Educación Superior & Sector Público',
    location: 'Callao, Perú',
    flag: '🇵🇪',
    highlight: 'Soporte Continuo para +15,000 Usuarios',
    deliverables: [
      'Infraestructura de Servidores & Virtualización de Misión Crítica',
      'Conectividad de Alta Disponibilidad para el Campus Universitario',
      'Licenciamiento Educativo Oficial & Mesa de Ayuda Especializada',
    ],
    tag: 'Institución Pública Universitaria',
  },
  {
    id: 'vicor',
    name: 'Vicor Ingenieros',
    shortName: 'Vicor Ingenieros',
    logo: logoVicor,
    sector: 'Ingeniería, Minería & Operaciones Subterráneas',
    location: 'Lima, Perú',
    flag: '🇵🇪',
    highlight: 'Operaciones Mineras de Misión Crítica',
    deliverables: [
      'Enlaces Cifrados IPsec & Redes Seguras para Faenas Mineras',
      'Mantenimiento Predictivo & Servidores de Almacenamiento Seguro',
      'Soporte Técnico Helpdesk Continuo para Equipos en Operación',
    ],
    tag: 'Operaciones Industriales',
  },
  {
    id: 'ingelectros',
    name: 'Ingelectros Perú',
    shortName: 'Ingelectros Perú',
    logo: logoIngelectros,
    sector: 'Ingeniería Electromecánica & Proyectos Industriales',
    location: 'Lima, Perú',
    flag: '🇵🇪',
    highlight: 'Continuidad Operativa Corporativa 99.9%',
    deliverables: [
      'Mesa de Ayuda Helpdesk 24/7 para Planteles y Oficinas',
      'Blindaje de Seguridad Perimetral & Prevención contra Amenazas',
      'Gestión Integral de Redes Corporativas & Soporte Multiusuario',
    ],
    tag: 'Cliente Corporativo Continuo',
  },
  {
    id: 'md-boutique',
    name: 'MD Boutique',
    shortName: 'MD Boutique',
    logo: logoMDBoutique,
    sector: 'Retail Exclusivo & Comercio Especializado',
    location: 'Lima, Perú',
    flag: '🇵🇪',
    highlight: 'Alta Disponibilidad en Puntos de Venta',
    deliverables: [
      'Soporte Técnico Especializado para Sistemas POS & Facturación',
      'Redes Wi-Fi Corporativas de Alta Densidad para Clientes y Personal',
      'Mantenimiento Continuo de Equipos de Cómputo & Red Comercial',
    ],
    tag: 'Comercio & Retail',
  },
  {
    id: 'sasa-it',
    name: 'SASA-IT Service',
    shortName: 'SASA-IT Service',
    logo: logoSasaIT,
    sector: 'Servicios Tecnológicos & Soluciones Digitales',
    location: 'Perú / Internacional',
    flag: '🌐',
    highlight: 'Alianza Estratégica en Servicios TI',
    deliverables: [
      'Consultoría en Arquitectura Cloud & Conectividad Avanzada',
      'Túneles Seguros VPN Site-to-Site Multi-Sede',
      'Soporte de Segundo y Tercer Nivel para Entornos Críticos',
    ],
    tag: 'Alianza Tecnológica',
  },
  {
    id: 'comfica',
    name: 'Comfica Soluciones Integrales',
    shortName: 'Comfica',
    logo: logoComfica,
    sector: 'Telecomunicaciones & Redes de Fibra Óptica',
    location: 'Colombia / Internacional',
    flag: '🇨🇴',
    highlight: 'Infraestructura Regional de Telecomunicaciones',
    deliverables: [
      'Soporte Técnico de Nivel 2 y 3 para Plataformas de Comunicación',
      'Auditoría y Optimización de Equipamiento de Conmutación Troncal',
      'Continuidad Operativa para Enlaces de Datos Corporativos',
    ],
    tag: 'Telecomunicaciones',
  },
  {
    id: 'hikvision',
    name: 'Hikvision Stores México',
    shortName: 'Hikvision Stores',
    logo: logoHikvision,
    sector: 'Seguridad Electrónica & Videovigilancia',
    location: 'CDMX, México',
    flag: '🇲🇽',
    highlight: 'Soporte y Enlaces Seguros Internacionales',
    deliverables: [
      'Enlaces IPsec Cifrados para Videovigilancia y Gestión Centralizada',
      'Soporte Técnico Remoto de Alta Disponibilidad',
      'Monitoreo Continuo de Estabilidad de Red y Servidores',
    ],
    tag: 'Seguridad Electrónica',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = clientsList.length;

  const nextSlide = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goTo = (index) => {
    setDirection(index > current ? 1 : -1);
    setCurrent(index);
  };

  // Autoplay continuo con pausa en hover
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 5500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const activeClient = clientsList[current];

  return (
    <section className="testimonials-modern" id="clientes">
      {/* Ancla para compatibilidad con enlaces existentes */}
      <div id="testimonios" style={{ position: 'absolute', top: '-80px' }} />

      {/* Luces ambientales tenues de fondo */}
      <div className="testimonials-modern__ambient-glow testimonials-modern__ambient-glow--left" />
      <div className="testimonials-modern__ambient-glow testimonials-modern__ambient-glow--right" />

      <div className="container">
        {/* Cabecera Principal con animación de entrada */}
        <motion.div
          className="testimonials-modern__header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="testimonials-modern__badge">
            <FiAward className="testimonials-modern__badge-icon" size={15} />
            <span>Empresas & Organizaciones que Respaldamos</span>
          </div>

          <h2 className="testimonials-modern__title">
            Clientes que <span className="testimonials-modern__title-accent">confían</span> en nosotros
          </h2>

          <p className="testimonials-modern__subtitle">
            Organizaciones líderes, instituciones educativas e industrias confían en Hackthony
            para garantizar su continuidad operativa, infraestructura de red y soporte 24/7.
          </p>

          {/* Micro-estadísticas de confianza corporativa */}
          <div className="testimonials-modern__metrics">
            <div className="testimonials-modern__metric-item">
              <span className="testimonials-modern__metric-number">+500</span>
              <span className="testimonials-modern__metric-label">Proyectos TI Ejecutados</span>
            </div>

            <div className="testimonials-modern__metric-sep" />

            <div className="testimonials-modern__metric-item">
              <span className="testimonials-modern__metric-number">99.4%</span>
              <span className="testimonials-modern__metric-label">Continuidad Operativa</span>
            </div>

            <div className="testimonials-modern__metric-sep" />

            <div className="testimonials-modern__metric-item">
              <span className="testimonials-modern__metric-number">24 / 7</span>
              <span className="testimonials-modern__metric-label">Mesa de Ayuda Activa</span>
            </div>
          </div>
        </motion.div>

        {/* Tarjeta de Spotlight Destacada con Animaciones Fluidas */}
        <div
          className="testimonials-modern__showcase"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="testimonials-modern__spotlight-card"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={activeClient.id}
                className="testimonials-modern__spotlight-grid"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* LADO IZQUIERDO: Escaparate Visual del Logo Oficial */}
                <div className="testimonials-modern__logo-stage">
                  <div className="testimonials-modern__logo-box">
                    <img
                      src={activeClient.logo}
                      alt={activeClient.name}
                      className="testimonials-modern__logo-img"
                    />
                  </div>

                  {/* Estado en Vivo */}
                  <div className="testimonials-modern__status-pill">
                    <span className="testimonials-modern__status-dot" />
                    <span>Cliente Activo • Soporte Continuo</span>
                  </div>
                </div>

                {/* LADO DERECHO: Ficha de Perfil y Alcance Tecnológico */}
                <div className="testimonials-modern__info-stage">
                  <div className="testimonials-modern__meta-row">
                    <span className="testimonials-modern__sector-badge">
                      {activeClient.sector}
                    </span>
                    <span className="testimonials-modern__location-badge">
                      <span>{activeClient.flag}</span>
                      <span>{activeClient.location}</span>
                    </span>
                  </div>

                  <h3 className="testimonials-modern__client-name">
                    {activeClient.name}
                  </h3>

                  <div className="testimonials-modern__highlight-box">
                    <FiCheckCircle className="testimonials-modern__highlight-icon" size={18} />
                    <span>{activeClient.highlight}</span>
                  </div>

                  {/* Alcance Técnico Implementado */}
                  <div className="testimonials-modern__deliverables-block">
                    <span className="testimonials-modern__deliverables-title">
                      Alcance del Servicio & Infraestructura:
                    </span>
                    <ul className="testimonials-modern__deliverables-list">
                      {activeClient.deliverables.map((item, idx) => (
                        <li key={idx} className="testimonials-modern__deliverable-item">
                          <span className="testimonials-modern__check-badge">
                            <FiCheck size={12} />
                          </span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Footer de Ficha */}
                  <div className="testimonials-modern__stage-footer">
                    <span className="testimonials-modern__tag-pill">
                      <FiShield size={13} />
                      {activeClient.tag}
                    </span>
                    <span className="testimonials-modern__verified-pill">
                      Infraestructura Auditada & Verificada
                    </span>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Resplandor decorativo de fondo */}
            <div className="testimonials-modern__card-glow" />
          </motion.div>

          {/* Controles de Navegación del Spotlight */}
          <div className="testimonials-modern__nav">
            <button
              type="button"
              className="testimonials-modern__nav-btn"
              onClick={prevSlide}
              aria-label="Cliente anterior"
            >
              <FiChevronLeft size={20} />
            </button>

            <div className="testimonials-modern__dots">
              {clientsList.map((client, dotIdx) => {
                const isActive = dotIdx === current;
                return (
                  <button
                    key={client.id}
                    type="button"
                    className={`testimonials-modern__dot ${isActive ? 'testimonials-modern__dot--active' : ''}`}
                    onClick={() => goTo(dotIdx)}
                    aria-label={`Ver cliente ${client.name}`}
                    title={client.name}
                  />
                );
              })}
            </div>

            <button
              type="button"
              className="testimonials-modern__nav-btn"
              onClick={nextSlide}
              aria-label="Cliente siguiente"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Marquee Flotante Continuo con Logos de Todos los Clientes */}
        <div className="testimonials-modern__marquee-wrap">
          <div className="testimonials-modern__marquee-fade testimonials-modern__marquee-fade--left" />
          <div className="testimonials-modern__marquee-fade testimonials-modern__marquee-fade--right" />
          <div className="testimonials-modern__marquee-track">
            {[...clientsList, ...clientsList].map((client, mIdx) => (
              <div
                key={`${client.id}-${mIdx}`}
                className="testimonials-modern__marquee-pill"
                onClick={() => goTo(mIdx % total)}
              >
                <img
                  src={client.logo}
                  alt={client.name}
                  className="testimonials-modern__marquee-logo"
                />
                <span className="testimonials-modern__marquee-name">{client.shortName}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Cuadrícula Interactiva con Todos los Clientes */}
        <div className="testimonials-modern__grid">
          {clientsList.map((client, idx) => {
            const isActive = idx === current;
            return (
              <motion.div
                key={client.id}
                className={`testimonials-modern__client-card ${
                  isActive ? 'testimonials-modern__client-card--active' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.05,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6, scale: 1.015 }}
                onClick={() => goTo(idx)}
              >
                <div className="testimonials-modern__card-logo-wrap">
                  <img
                    src={client.logo}
                    alt={client.name}
                    className="testimonials-modern__card-logo"
                  />
                </div>

                <div className="testimonials-modern__card-body">
                  <div className="testimonials-modern__card-header-row">
                    <span className="testimonials-modern__card-flag">{client.flag}</span>
                    <span className="testimonials-modern__card-sector">{client.sector}</span>
                  </div>

                  <h4 className="testimonials-modern__card-name">{client.name}</h4>
                  <p className="testimonials-modern__card-highlight">{client.highlight}</p>
                </div>

                <div className="testimonials-modern__card-action">
                  <span>{isActive ? 'En pantalla' : 'Ver alcance'}</span>
                  <FiArrowRight size={14} />
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

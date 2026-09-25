import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiMessageSquare,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';

import logoIngelectros from '../../img/3.png';
import logoMDBoutique from '../../img/4-1.png';
import logoSasaIT from '../../img/5.png';
import logoUNAC from '../../img/Nuevo-Cliente4.png';
import logoVicor from '../../img/Nuevo-Cliente5.png';

import './Testimonials.css';

export const testimonialsData = [
  {
    id: 1,
    company: 'Ingelectros Perú',
    logo: logoIngelectros,
    name: 'Dr. Martín Solís',
    role: 'Gerente General',
    avatar: 'MS',
    text: 'La profesionalidad y el compromiso del equipo de HackthonySupport nos han permitido optimizar nuestras operaciones y mantener nuestros datos seguros. Su soporte técnico constante los hace altamente recomendables.',
    rating: 5,
    tag: 'Ingeniería Electromecánica',
  },
  {
    id: 2,
    company: 'MD Boutique',
    logo: logoMDBoutique,
    name: 'Mariela Delgado',
    role: 'Directora General',
    avatar: 'MD',
    text: 'La estabilidad de nuestras terminales de venta y redes Wi-Fi en tienda es fundamental para el negocio. Hackthony nos garantiza soporte inmediato y cero caídas en nuestras operaciones comerciales.',
    rating: 5,
    tag: 'Retail & Comercio',
  },
  {
    id: 3,
    company: 'SASA-IT Service',
    logo: logoSasaIT,
    name: 'Raquel García',
    role: 'Directora TI',
    avatar: 'RG',
    text: 'El equipo de HackthonySupport ha demostrado una experiencia y solvencia técnica incomparables. Gracias a sus enlaces seguros y soporte preventivo, nuestros servidores operan con total tranquilidad.',
    rating: 5,
    tag: 'Servicios Tecnológicos',
  },
  {
    id: 4,
    company: 'Universidad Nacional del Callao',
    logo: logoUNAC,
    name: 'Ing. Carlos Mendoza',
    role: 'Coordinador de Infraestructura TI',
    avatar: 'CM',
    text: 'La atención de Hackthony para la virtualización de servidores y la conectividad del campus ha sido impecable. Su capacidad de respuesta ante incidencias complejas es de primer nivel.',
    rating: 5,
    tag: 'Educación Superior',
  },
  {
    id: 5,
    company: 'Vicor Ingenieros',
    logo: logoVicor,
    name: 'Wilmer Vivar',
    role: 'Gerente de Proyectos',
    avatar: 'WV',
    text: 'HackthonySupport ha transformado completamente nuestra infraestructura tecnológica en campo. Sus enlaces seguros y soporte técnico continuo han mejorado significativamente nuestra eficiencia operativa.',
    rating: 5,
    tag: 'Minería & Operaciones',
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonialsData.length;

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
    }, 6000);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused]);

  const active = testimonialsData[current];

  return (
    <section className="testimonials-modern" id="testimonios">
      {/* Ancla para compatibilidad */}
      <div id="clientes" style={{ position: 'absolute', top: '-80px' }} />

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
            <FiMessageSquare className="testimonials-modern__badge-icon" size={14} />
            <span>Lo Que Dicen Quienes Confían en Nosotros</span>
          </div>

          <h2 className="testimonials-modern__title">
            Clientes que <span className="testimonials-modern__title-accent">confían</span> en nosotros
          </h2>

          <p className="testimonials-modern__subtitle">
            Más de 500 empresas y profesionales han transformado su tecnología con nuestro apoyo.
            Estas son sus historias y experiencias reales de éxito.
          </p>

          {/* Micro-estadísticas de confianza */}
          <div className="testimonials-modern__metrics">
            <div className="testimonials-modern__metric-item">
              <span className="testimonials-modern__metric-number">4.9 / 5.0</span>
              <div className="testimonials-modern__stars-static">
                {[...Array(5)].map((_, i) => (
                  <FiStar key={i} size={13} fill="#F59E0B" color="#F59E0B" />
                ))}
              </div>
              <span className="testimonials-modern__metric-label">Calificación Promedio</span>
            </div>

            <div className="testimonials-modern__metric-sep" />

            <div className="testimonials-modern__metric-item">
              <span className="testimonials-modern__metric-number">+500</span>
              <span className="testimonials-modern__metric-label">Empresas Atendidas</span>
            </div>

            <div className="testimonials-modern__metric-sep" />

            <div className="testimonials-modern__metric-item">
              <span className="testimonials-modern__metric-number">99.4%</span>
              <span className="testimonials-modern__metric-label">Tasa de Fidelidad</span>
            </div>
          </div>
        </motion.div>

        {/* Barra Horizontal Natural con los 5 Logos Oficiales */}
        <motion.div
          className="testimonials-modern__logos-bar"
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.65, delay: 0.1 }}
        >
          {testimonialsData.map((client, idx) => {
            const isActive = idx === current;
            return (
              <button
                key={client.id}
                type="button"
                className={`testimonials-modern__logo-btn ${
                  isActive ? 'testimonials-modern__logo-btn--active' : ''
                }`}
                onClick={() => goTo(idx)}
                aria-label={`Ver testimonio de ${client.company}`}
              >
                <div className="testimonials-modern__logo-btn-img-wrap">
                  <img
                    src={client.logo}
                    alt={client.company}
                    className="testimonials-modern__logo-btn-img"
                  />
                </div>
                {isActive && (
                  <motion.div
                    className="testimonials-modern__logo-btn-indicator"
                    layoutId="activeClientIndicator"
                    transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                  />
                )}
              </button>
            );
          })}
        </motion.div>

        {/* Tarjeta Destacada con el Testimonio + Logo del Cliente */}
        <div
          className="testimonials-modern__showcase"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <motion.div
            className="testimonials-modern__featured-card"
            initial={{ opacity: 0, y: 30, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: false, amount: 0.2 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Cabecera de la Tarjeta: Ícono de Comillas + Logo Oficial de la Empresa */}
            <div className="testimonials-modern__card-top-row">
              <div className="testimonials-modern__quote-icon-wrap">
                <FaQuoteLeft size={24} />
              </div>

              {/* Logo Oficial del Cliente Integrado de Manera Natural */}
              <div className="testimonials-modern__card-brand-badge">
                <img
                  src={active.logo}
                  alt={active.company}
                  className="testimonials-modern__card-brand-img"
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={active.id}
                className="testimonials-modern__featured-body"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Texto del Testimonio de la Persona */}
                <p className="testimonials-modern__quote-text">
                  "{active.text}"
                </p>

                {/* Footer del Testimonio: Autor + Empresa + Estrellas */}
                <div className="testimonials-modern__author-row">
                  <div className="testimonials-modern__author-group">
                    <div className="testimonials-modern__avatar">
                      {active.avatar}
                    </div>
                    <div>
                      <h4 className="testimonials-modern__author-name">
                        {active.name}
                      </h4>
                      <p className="testimonials-modern__author-role">
                        {active.role} • <span>{active.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Estrellas Calificación con Animación Pop */}
                  <div className="testimonials-modern__stars">
                    {[...Array(active.rating)].map((_, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.08 + sIdx * 0.05, type: 'spring', stiffness: 320 }}
                      >
                        <FiStar size={18} fill="#F59E0B" color="#F59E0B" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Resplandor sutil de fondo */}
            <div className="testimonials-modern__card-glow" />
          </motion.div>

          {/* Controles de Navegación Flotantes */}
          <div className="testimonials-modern__nav">
            <button
              type="button"
              className="testimonials-modern__nav-btn"
              onClick={prevSlide}
              aria-label="Testimonio anterior"
            >
              <FiChevronLeft size={20} />
            </button>

            <div className="testimonials-modern__dots">
              {testimonialsData.map((client, dotIdx) => {
                const isActive = dotIdx === current;
                return (
                  <button
                    key={client.id}
                    type="button"
                    className={`testimonials-modern__dot ${isActive ? 'testimonials-modern__dot--active' : ''}`}
                    onClick={() => goTo(dotIdx)}
                    aria-label={`Ir al testimonio de ${client.company}`}
                  />
                );
              })}
            </div>

            <button
              type="button"
              className="testimonials-modern__nav-btn"
              onClick={nextSlide}
              aria-label="Testimonio siguiente"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>

        {/* Mini Grid de los 5 Testimonios con Logos y Citas */}
        <div className="testimonials-modern__grid">
          {testimonialsData.map((item, idx) => {
            const isActive = idx === current;
            return (
              <motion.div
                key={item.id}
                className={`testimonials-modern__mini-card ${
                  isActive ? 'testimonials-modern__mini-card--active' : ''
                }`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -5, scale: 1.015 }}
                onClick={() => goTo(idx)}
              >
                {/* Cabecera de la mini-card: Logo de la empresa + Estrellas */}
                <div className="testimonials-modern__mini-top-row">
                  <div className="testimonials-modern__mini-logo-wrap">
                    <img
                      src={item.logo}
                      alt={item.company}
                      className="testimonials-modern__mini-logo"
                    />
                  </div>

                  <div className="testimonials-modern__mini-stars">
                    {[...Array(item.rating)].map((_, j) => (
                      <FiStar key={j} size={12} fill="#F59E0B" color="#F59E0B" />
                    ))}
                  </div>
                </div>

                {/* Cita breve del testimonio */}
                <p className="testimonials-modern__mini-text">
                  "{item.text.slice(0, 115)}..."
                </p>

                {/* Autor y Empresa */}
                <div className="testimonials-modern__mini-author">
                  <div className="testimonials-modern__mini-avatar">
                    {item.avatar}
                  </div>
                  <div className="testimonials-modern__mini-info">
                    <strong className="testimonials-modern__mini-name">{item.name}</strong>
                    <span className="testimonials-modern__mini-company">{item.company}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}

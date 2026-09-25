import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiMessageSquare,
  FiArrowRight,
  FiArrowLeft,
  FiPause,
} from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../../data/testimonials';

import logoIngelectros from '../../img/3.png';
import logoMDBoutique from '../../img/4-1.png';
import logoSasaIT from '../../img/5.png';
import logoUNAC from '../../img/Nuevo-Cliente4.png';
import logoVicor from '../../img/Nuevo-Cliente5.png';
import logoComfica from '../../img/confica-colombia.png';
import logoHikvision from '../../img/camera-mexico.png';

import './Testimonials.css';

// Lista de clientes con sus logos oficiales
const marqueeClients = [
  {
    id: 'ingelectros',
    name: 'Ingelectros Perú',
    logo: logoIngelectros,
    testimonialIndex: 5, // Dr. Martín Solís
  },
  {
    id: 'md-boutique',
    name: 'MD Boutique',
    logo: logoMDBoutique,
    testimonialIndex: 1, // Rosangelica Ayllon
  },
  {
    id: 'sasa-it',
    name: 'SASA-IT Service',
    logo: logoSasaIT,
    testimonialIndex: 3, // Raquel García
  },
  {
    id: 'unac',
    name: 'Universidad Nacional del Callao',
    logo: logoUNAC,
    testimonialIndex: 4, // Dr. Jason Olivos
  },
  {
    id: 'vicor',
    name: 'Vicor Ingenieros',
    logo: logoVicor,
    testimonialIndex: 0, // Wilmer Vivar
  },
  {
    id: 'comfica',
    name: 'Comfica',
    logo: logoComfica,
    testimonialIndex: 2, // Carolina Rivera
  },
  {
    id: 'hikvision',
    name: 'Hikvision Stores',
    logo: logoHikvision,
    testimonialIndex: 4, // Dr. Jason Olivos
  },
];

// 5 repeticiones para un desplazamiento continuo infinito de un lado a otro de la pantalla
const repeatedClients = [
  ...marqueeClients,
  ...marqueeClients,
  ...marqueeClients,
  ...marqueeClients,
  ...marqueeClients,
];

function ClientMarqueeSteerable({ onSelectIndex }) {
  const containerRef = useRef(null);
  const trackRef = useRef(null);
  const [cursorInfo, setCursorInfo] = useState({
    visible: false,
    direction: 'none', // 'left' | 'right' | 'pause'
    x: 0,
    y: 0,
  });

  const stateRef = useRef({
    offset: 0,
    currentSpeed: 0.85,
    targetSpeed: 0.85,
    singleSetWidth: 0,
    rafId: null,
  });

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const measureWidth = () => {
      if (track) {
        stateRef.current.singleSetWidth = track.scrollWidth / 5;
      }
    };

    measureWidth();
    window.addEventListener('resize', measureWidth);

    const animate = () => {
      const state = stateRef.current;
      // Interpolación elástica suave hacia targetSpeed
      state.currentSpeed += (state.targetSpeed - state.currentSpeed) * 0.08;
      state.offset += state.currentSpeed;

      const sw = state.singleSetWidth || 1200;
      if (state.offset >= sw) {
        state.offset -= sw;
      } else if (state.offset < 0) {
        state.offset += sw;
      }

      if (track) {
        track.style.transform = `translate3d(${-state.offset}px, 0, 0)`;
      }

      state.rafId = requestAnimationFrame(animate);
    };

    stateRef.current.rafId = requestAnimationFrame(animate);

    return () => {
      cancelAnimationFrame(stateRef.current.rafId);
      window.removeEventListener('resize', measureWidth);
    };
  }, []);

  const handleMouseMove = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const ratio = Math.max(0, Math.min(1, x / rect.width));

    const state = stateRef.current;

    // Zona Central (38% a 62%): SE PAUSA
    if (ratio >= 0.38 && ratio <= 0.62) {
      state.targetSpeed = 0;
      setCursorInfo({ visible: true, direction: 'pause', x, y });
    }
    // Zona Derecha (> 62%): Carrusel avanza hacia la derecha
    else if (ratio > 0.62) {
      const intensity = (ratio - 0.62) / 0.38; // 0 a 1
      state.targetSpeed = -intensity * 4.2; // Desplaza carrusel a la derecha
      setCursorInfo({ visible: true, direction: 'right', x, y });
    }
    // Zona Izquierda (< 38%): Carrusel avanza hacia la izquierda
    else {
      const intensity = (0.38 - ratio) / 0.38; // 0 a 1
      state.targetSpeed = intensity * 4.2; // Desplaza carrusel a la izquierda
      setCursorInfo({ visible: true, direction: 'left', x, y });
    }
  };

  const handleMouseLeave = () => {
    const state = stateRef.current;
    state.targetSpeed = 0.85; // Reanuda avance suave continuo por defecto
    setCursorInfo({ visible: false, direction: 'none', x: 0, y: 0 });
  };

  return (
    <div
      ref={containerRef}
      className={`client-marquee-steerable ${
        cursorInfo.visible ? `client-marquee-steerable--${cursorInfo.direction}` : ''
      }`}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Sombras de desvanecimiento laterales */}
      <div className="client-marquee-steerable__fade client-marquee-steerable__fade--left" />
      <div className="client-marquee-steerable__fade client-marquee-steerable__fade--right" />

      {/* Pista continua infinita: solo imágenes de los clientes */}
      <div className="client-marquee-steerable__track" ref={trackRef}>
        {repeatedClients.map((item, idx) => (
          <div
            key={`${item.id}-${idx}`}
            className="client-marquee-pill"
            onClick={() => onSelectIndex(item.testimonialIndex)}
            title={item.name}
          >
            <img
              src={item.logo}
              alt={item.name}
              className="client-marquee-pill__logo"
              loading="lazy"
            />
          </div>
        ))}
      </div>

      {/* Cursor Flotante Direccional que sigue al puntero del mouse */}
      {cursorInfo.visible && (
        <div
          className={`client-marquee-cursor client-marquee-cursor--${cursorInfo.direction}`}
          style={{
            transform: `translate3d(${cursorInfo.x}px, ${cursorInfo.y}px, 0)`,
          }}
        >
          {cursorInfo.direction === 'right' && (
            <>
              <span>Derecha</span>
              <FiArrowRight size={15} />
            </>
          )}
          {cursorInfo.direction === 'left' && (
            <>
              <FiArrowLeft size={15} />
              <span>Izquierda</span>
            </>
          )}
          {cursorInfo.direction === 'pause' && (
            <>
              <FiPause size={13} />
              <span>Pausa</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1);
  const [isPaused, setIsPaused] = useState(false);

  const total = testimonials.length;

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

  const activeTestimonial = testimonials[current];

  return (
    <section className="testimonials-modern" id="testimonios">
      {/* Ancla para enlaces */}
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
            <span>Lo Que Dicen Nuestros Clientes</span>
          </div>

          <h2 className="testimonials-modern__title">
            Clientes que <span className="testimonials-modern__title-accent">confían</span> en nosotros
          </h2>

          <p className="testimonials-modern__subtitle">
            Más de 500 empresas y profesionales han transformado su infraestructura tecnológica
            con nuestro soporte. Estas son sus experiencias de éxito.
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

        {/* Tarjeta Destacada con Animación Fluida */}
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
            {/* Ícono de Comillas Estilizado */}
            <div className="testimonials-modern__quote-icon-wrap">
              <FaQuoteLeft size={28} />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTestimonial.id}
                className="testimonials-modern__featured-body"
                initial={{ opacity: 0, x: direction * 40 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: direction * -40 }}
                transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Texto del Testimonio */}
                <p className="testimonials-modern__quote-text">
                  "{activeTestimonial.text}"
                </p>

                {/* Footer del Testimonio Destacado */}
                <div className="testimonials-modern__author-row">
                  <div className="testimonials-modern__author-group">
                    <div className="testimonials-modern__avatar">
                      {activeTestimonial.avatar}
                    </div>
                    <div>
                      <h4 className="testimonials-modern__author-name">
                        {activeTestimonial.name}
                      </h4>
                      <p className="testimonials-modern__author-role">
                        {activeTestimonial.role} • <span>{activeTestimonial.company}</span>
                      </p>
                    </div>
                  </div>

                  {/* Estrellas Calificación */}
                  <div className="testimonials-modern__stars">
                    {[...Array(activeTestimonial.rating)].map((_, sIdx) => (
                      <motion.div
                        key={sIdx}
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.1 + sIdx * 0.05, type: 'spring', stiffness: 300 }}
                      >
                        <FiStar size={18} fill="#F59E0B" color="#F59E0B" />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Decoración de fondo sutil */}
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
              {testimonials.map((_, dotIdx) => {
                const isActive = dotIdx === current;
                return (
                  <button
                    key={dotIdx}
                    type="button"
                    className={`testimonials-modern__dot ${isActive ? 'testimonials-modern__dot--active' : ''}`}
                    onClick={() => goTo(dotIdx)}
                    aria-label={`Ir al testimonio ${dotIdx + 1}`}
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

        {/* Mini Grid de Todos los Testimonios con entrada escalonada */}
        <div className="testimonials-modern__grid">
          {testimonials.map((item, idx) => {
            const isActive = idx === current;
            return (
              <motion.div
                key={item.id}
                className={`testimonials-modern__mini-card ${isActive ? 'testimonials-modern__mini-card--active' : ''}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.06,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -4 }}
                onClick={() => goTo(idx)}
              >
                <div className="testimonials-modern__mini-stars">
                  {[...Array(item.rating)].map((_, j) => (
                    <FiStar key={j} size={13} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>

                <p className="testimonials-modern__mini-text">
                  "{item.text.slice(0, 115)}..."
                </p>

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

      {/* Barrita Interactiva de Logos de Clientes (Ocupa de un lado a otro abajo de los comentarios) */}
      <motion.div
        className="client-marquee-fullwidth"
        initial={{ opacity: 0, y: 25 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <ClientMarqueeSteerable onSelectIndex={goTo} />
      </motion.div>
    </section>
  );
}

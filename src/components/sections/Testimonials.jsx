import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiStar,
  FiMessageSquare,
  FiCheckCircle,
} from 'react-icons/fi';
import { FaQuoteLeft } from 'react-icons/fa';
import { testimonials } from '../../data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(1); // 1 = next, -1 = prev
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
    </section>
  );
}

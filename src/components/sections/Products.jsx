import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiChevronLeft,
  FiChevronRight,
  FiCheck,
  FiArrowRight,
  FiShield,
  FiCpu,
  FiLayers,
  FiZap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import { products } from '../../data/products';
import './Products.css';

export default function Products() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const stageRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Detección de vista en scroll para disparar las animaciones de aparición al bajar
  const isInView = useInView(stageRef, { once: false, amount: 0.22 });

  // Detección de responsive para ajustar espaciado 3D
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const total = products.length;

  const nextSlide = useCallback(() => {
    setActiveIndex((prev) => (prev + 1) % total);
  }, [total]);

  const prevSlide = useCallback(() => {
    setActiveIndex((prev) => (prev - 1 + total) % total);
  }, [total]);

  const goToSlide = (idx) => {
    setActiveIndex(idx);
  };

  // Autoplay continuo con pausa en hover o interacción
  useEffect(() => {
    if (isPaused || !isInView) return;
    const timer = setInterval(() => {
      nextSlide();
    }, 4500);
    return () => clearInterval(timer);
  }, [nextSlide, isPaused, isInView]);

  // Manejadores de swipe táctil
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    const diff = touchStartX.current - touchEndX.current;
    if (Math.abs(diff) > 45) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
  };

  // Cálculo de posición 3D relativa al activo y animación de aparición en scroll
  const getCardStyle = (index) => {
    let diff = (index - activeIndex) % total;
    if (diff > total / 2) diff -= total;
    if (diff < -total / 2) diff += total;

    // Si aún no está visible en el scroll, estado inicial plegado abajo
    if (!isInView) {
      return {
        x: 0,
        y: 110,
        z: -120,
        rotateY: 0,
        scale: 0.8,
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none',
        filter: 'blur(6px) brightness(0.6)',
        delay: 0,
      };
    }

    // Espaciado horizontal según dispositivo
    const stepX = isMobile ? 190 : 330;
    const stepFarX = isMobile ? 320 : 580;
    const delay = Math.min(Math.abs(diff) * 0.08, 0.25);

    if (diff === 0) {
      return {
        x: 0,
        y: 0,
        z: 140,
        rotateY: 0,
        scale: 1,
        opacity: 1,
        zIndex: 10,
        pointerEvents: 'auto',
        filter: 'blur(0px) brightness(1)',
        delay: 0.05,
      };
    } else if (diff === 1) {
      return {
        x: stepX,
        y: 0,
        z: -60,
        rotateY: isMobile ? -18 : -28,
        scale: isMobile ? 0.86 : 0.88,
        opacity: 0.75,
        zIndex: 8,
        pointerEvents: 'auto',
        filter: 'blur(0px) brightness(0.88)',
        delay: 0.12,
      };
    } else if (diff === -1) {
      return {
        x: -stepX,
        y: 0,
        z: -60,
        rotateY: isMobile ? 18 : 28,
        scale: isMobile ? 0.86 : 0.88,
        opacity: 0.75,
        zIndex: 8,
        pointerEvents: 'auto',
        filter: 'blur(0px) brightness(0.88)',
        delay: 0.12,
      };
    } else if (diff === 2) {
      return {
        x: stepFarX,
        y: 0,
        z: -180,
        rotateY: isMobile ? -30 : -42,
        scale: isMobile ? 0.72 : 0.75,
        opacity: 0.35,
        zIndex: 5,
        pointerEvents: 'auto',
        filter: 'blur(0px) brightness(0.7)',
        delay: 0.2,
      };
    } else if (diff === -2) {
      return {
        x: -stepFarX,
        y: 0,
        z: -180,
        rotateY: isMobile ? 30 : 42,
        scale: isMobile ? 0.72 : 0.75,
        opacity: 0.35,
        zIndex: 5,
        pointerEvents: 'auto',
        filter: 'blur(0px) brightness(0.7)',
        delay: 0.2,
      };
    } else {
      return {
        x: diff > 0 ? stepFarX + 120 : -stepFarX - 120,
        y: 0,
        z: -300,
        rotateY: diff > 0 ? -55 : 55,
        scale: 0.55,
        opacity: 0,
        zIndex: 1,
        pointerEvents: 'none',
        filter: 'blur(4px) brightness(0.5)',
        delay: 0.25,
      };
    }
  };

  return (
    <section className="products-3d-section" id="productos">
      {/* Luces de fondo ambient glow */}
      <div className="products-3d__ambient-glow products-3d__ambient-glow--left" />
      <div className="products-3d__ambient-glow products-3d__ambient-glow--right" />

      <div className="container">
        {/* Cabecera Principal con animación al bajar el scroll */}
        <motion.div
          className="products-3d__header"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="products-3d__badge">
            <FiZap className="products-3d__badge-icon" size={14} />
            <span>Catálogo Corporativo de Hardware & Software</span>
          </div>

          <h2 className="products-3d__title">
            Equipamiento Tecnológico de{' '}
            <span className="products-3d__title-accent">Última Generación</span>
          </h2>

          <p className="products-3d__subtitle">
            Comercializamos y desplegamos hardware y licencias empresariales certificadas
            por las marcas líderes mundiales, con garantía directa y soporte oficial.
          </p>
        </motion.div>

        {/* Carrusel 3D Interactivo */}
        <div
          className="products-3d__carousel-container"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
        >
          {/* Botón Anterior con aparición al scroll */}
          <motion.button
            type="button"
            className="products-3d__nav-btn products-3d__nav-btn--prev"
            onClick={prevSlide}
            aria-label="Producto anterior"
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <FiChevronLeft size={22} />
          </motion.button>

          {/* Escenario 3D con Ref para activación de Scroll */}
          <div className="products-3d__stage" ref={stageRef}>
            {products.map((product, index) => {
              const style = getCardStyle(index);
              const isCurrent = index === activeIndex;

              return (
                <motion.div
                  key={product.id}
                  className={`products-3d__card ${isCurrent ? 'products-3d__card--active' : ''}`}
                  animate={{
                    x: style.x,
                    y: style.y,
                    z: style.z,
                    rotateY: style.rotateY,
                    scale: style.scale,
                    opacity: style.opacity,
                    filter: style.filter,
                  }}
                  transition={{
                    duration: 0.7,
                    delay: style.delay,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  style={{
                    zIndex: style.zIndex,
                    pointerEvents: style.pointerEvents,
                  }}
                  onClick={() => {
                    if (!isCurrent) goToSlide(index);
                  }}
                >
                  {/* Contenedor de la Imagen con Mayor % de Espacio */}
                  <div className="products-3d__card-img-wrap">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="products-3d__card-img"
                      loading="lazy"
                    />
                    <div className="products-3d__card-img-overlay" />

                    {/* Sutil barrido de luz al activarse */}
                    {isCurrent && <div className="products-3d__card-sheen" />}

                    {/* Tag de Categoría */}
                    <span className="products-3d__card-tag">
                      {product.tag}
                    </span>

                    {/* Badge de Marca */}
                    <span className="products-3d__card-brand">
                      {product.brand}
                    </span>
                  </div>

                  {/* Cuerpo de la Tarjeta */}
                  <div className="products-3d__card-body">
                    <h3 className="products-3d__card-title">{product.title}</h3>
                    <p className="products-3d__card-desc">{product.description}</p>

                    {/* Chips de Especificaciones Técnicas */}
                    <div className="products-3d__card-specs">
                      {product.specs.slice(0, 2).map((spec, sIdx) => (
                        <div key={sIdx} className="products-3d__spec-chip">
                          <FiCheck size={12} className="products-3d__spec-icon" />
                          <span>{spec}</span>
                        </div>
                      ))}
                    </div>

                    {/* Botón de Acción WhatsApp */}
                    <div className="products-3d__card-footer">
                      <a
                        href={product.whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="products-3d__card-btn"
                        onClick={(e) => {
                          if (!isCurrent) e.preventDefault();
                        }}
                      >
                        <FaWhatsapp size={16} />
                        <span>Cotizar Equipamiento</span>
                        <FiArrowRight size={14} className="products-3d__card-btn-arrow" />
                      </a>
                    </div>
                  </div>

                  {/* Sombra y Reflejo 3D en la base */}
                  <div className="products-3d__card-shadow" />
                </motion.div>
              );
            })}
          </div>

          {/* Botón Siguiente con aparición al scroll */}
          <motion.button
            type="button"
            className="products-3d__nav-btn products-3d__nav-btn--next"
            onClick={nextSlide}
            aria-label="Producto siguiente"
            animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.6 }}
            transition={{ duration: 0.45, delay: 0.25 }}
          >
            <FiChevronRight size={22} />
          </motion.button>
        </div>

        {/* Controles de Navegación Inferior: Paginación & Contador */}
        <motion.div
          className="products-3d__controls"
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <div className="products-3d__dots">
            {products.map((_, dotIdx) => {
              const isActive = dotIdx === activeIndex;
              return (
                <button
                  key={dotIdx}
                  type="button"
                  className={`products-3d__dot ${isActive ? 'products-3d__dot--active' : ''}`}
                  onClick={() => goToSlide(dotIdx)}
                  aria-label={`Ir al producto ${dotIdx + 1}`}
                />
              );
            })}
          </div>

          <div className="products-3d__counter">
            <span className="products-3d__counter-active">0{activeIndex + 1}</span>
            <span className="products-3d__counter-sep">/</span>
            <span className="products-3d__counter-total">0{total}</span>
          </div>
        </motion.div>

        {/* Sellos de Confianza y Garantía Oficial con aparición al scroll */}
        <motion.div
          className="products-3d__trust-bar"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="products-3d__trust-item">
            <FiShield className="products-3d__trust-icon" size={20} />
            <div>
              <strong>Garantía Directa de Fabricante</strong>
              <span>Equipos 100% nuevos, sellados y con factura oficial</span>
            </div>
          </div>

          <div className="products-3d__trust-item">
            <FiCpu className="products-3d__trust-icon" size={20} />
            <div>
              <strong>Configuración & Setup Previos</strong>
              <span>Instalación de SO, drivers y test de estrés incluidos</span>
            </div>
          </div>

          <div className="products-3d__trust-item">
            <FiLayers className="products-3d__trust-icon" size={20} />
            <div>
              <strong>Distribución & Entrega Segura</strong>
              <span>Despacho corporativo inmediato a nivel nacional</span>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}

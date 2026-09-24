import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { FiArrowRight, FiMessageCircle } from 'react-icons/fi';
import heroImg from '../../img/hero.png';
import './Hero.css';

export default function Hero() {
  const whatsappUrl =
    'https://wa.me/51994520017?text=Hola%20Hackthony%20Support%2C%20solicito%20un%20diagn%C3%B3stico%20t%C3%A9cnico%20y%20asesor%C3%ADa%20para%20mi%20empresa.';

  // Mouse tilt tracking para dar sensación de que el objeto "está vivo" y reacciona al usuario
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Físicas spring ultrasuaves tipo Apple/Clay
  const springConfig = { damping: 25, stiffness: 120, mass: 0.5 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  // Parallax interactivo sutil (rotación 3D y desplazamiento)
  const rotateX = useTransform(smoothY, [-0.5, 0.5], [12, -12]);
  const rotateY = useTransform(smoothX, [-0.5, 0.5], [-14, 14]);
  const translateX = useTransform(smoothX, [-0.5, 0.5], [-16, 16]);
  const translateY = useTransform(smoothY, [-0.5, 0.5], [-16, 16]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section 
      className="hero" 
      id="inicio"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {/* Luz ambiental sutil de estudio Clay */}
      <div className="hero__studio-light" />
      <div className="hero__radial-glow" />

      <div className="container hero__container">
        {/* COLUMNA IZQUIERDA: Minimalismo puro, tipografía impactante, muy poco texto */}
        <div className="hero__left">

          <motion.h1
            className="hero__title"
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Soluciones tecnológicas adaptadas a tu empresa
          </motion.h1>

          <motion.p
            className="hero__subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            Más de 12 años brindando consultoría especializada, infraestructura cloud y soporte técnico de misión crítica.
          </motion.p>

          <motion.div
            className="hero__actions"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          >
            <a href="#servicios" className="hero__btn-primary">
              <span>Explorar Servicios</span>
              <FiArrowRight size={17} />
            </a>

            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hero__btn-secondary"
            >
              <FiMessageCircle size={17} />
              <span>Contáctanos</span>
            </a>
          </motion.div>
        </div>

        {/* COLUMNA DERECHA: Objeto 3D hero.png con animación viva, orgánica y activa */}
        <div className="hero__right">
          <motion.div
            className="hero__stage"
            style={{
              rotateX,
              rotateY,
              x: translateX,
              y: translateY,
            }}
          >
            {/* Animación continua viva y flotante (movimiento orgánico de un lado a otro) */}
            <motion.div
              className="hero__object-wrapper"
              animate={{
                y: [-16, 18, -12, 16, -16],
                x: [-18, 16, -14, 18, -18],
                rotateZ: [-3, 3.5, -2, 2.5, -3],
                scale: [1, 1.025, 0.985, 1.02, 1],
              }}
              transition={{
                duration: 9.5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            >
              <img
                src={heroImg}
                alt="Hackantony Tech Object"
                className="hero__object-img"
                draggable={false}
              />

              {/* Orbes flotantes animados (estilo Clay) que orbitan con vida */}
              <motion.div
                className="hero__orb hero__orb--purple"
                animate={{
                  y: [12, -18, 14, -12, 12],
                  x: [-10, 14, -12, 10, -10],
                  scale: [1, 1.15, 0.95, 1.1, 1],
                }}
                transition={{
                  duration: 6.5,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              />

              <motion.div
                className="hero__orb hero__orb--amber"
                animate={{
                  y: [-14, 16, -10, 14, -14],
                  x: [12, -14, 10, -12, 12],
                  scale: [1, 0.9, 1.12, 0.95, 1],
                }}
                transition={{
                  duration: 7.8,
                  ease: 'easeInOut',
                  repeat: Infinity,
                }}
              />
            </motion.div>

            {/* Sombra viva en el suelo que reacciona a la elevación */}
            <motion.div
              className="hero__floor-shadow"
              animate={{
                scale: [1, 0.88, 1.05, 0.92, 1],
                opacity: [0.55, 0.35, 0.65, 0.4, 0.55],
              }}
              transition={{
                duration: 9.5,
                ease: 'easeInOut',
                repeat: Infinity,
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

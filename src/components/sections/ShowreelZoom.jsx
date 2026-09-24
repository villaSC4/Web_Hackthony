import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import section2Video from '../../video/Section2.mp4';
import './ShowreelZoom.css';

export default function ShowreelZoom() {
  const containerRef = useRef(null);

  // Progreso del scroll para la animación de zoom cinematográfico
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Transformaciones de zoom continuas:
  // Inicia encuadrado en 84vw × 72vh con bordes redondeados, expandiéndose a pantalla completa
  const scale = useTransform(scrollYProgress, [0, 0.75], [0.85, 1]);
  const width = useTransform(scrollYProgress, [0, 0.75], ['84vw', '100vw']);
  const height = useTransform(scrollYProgress, [0, 0.75], ['72vh', '100vh']);
  const borderRadius = useTransform(scrollYProgress, [0, 0.75], [24, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.22], [0, -35]);
  const contentOpacity = useTransform(scrollYProgress, [0.15, 0.55], [0.75, 1]);

  return (
    <section className="showreel-zoom" ref={containerRef}>
      <div className="showreel-zoom__sticky">
        {/* Intro limpia sin hints de scroll */}
        <motion.div
          className="showreel-zoom__intro"
          style={{ opacity: introOpacity, y: introY }}
        >
          <h2 className="showreel-zoom__title">
            Observa el poder de nuestra tecnología <br />
            <span>operando en tiempo real</span>
          </h2>
        </motion.div>

        {/* PORTAL CINEMATOGRÁFICO DE ZOOM CON VIDEO SECTION2 */}
        <motion.div
          className="showreel-zoom__card"
          style={{
            scale,
            width,
            height,
            borderRadius,
          }}
        >
          {/* Video Section2.mp4 continuo en repetición, sin pausa ni controles */}
          <div className="showreel-zoom__video-wrap">
            <video
              src={section2Video}
              autoPlay
              loop
              muted
              playsInline
              preload="auto"
              className="showreel-zoom__video"
            />
            <div className="showreel-zoom__video-overlay" />
          </div>

          {/* Título Central Imponente y Nítido (Centrado y sin cajas) */}
          <motion.div 
            className="showreel-zoom__center-title"
            style={{ opacity: contentOpacity }}
          >
            <h3 className="showreel-heading">Arquitectura TI & Ciberseguridad Blindada</h3>
            <p className="showreel-subheading">
              Conexiones redundantes · Uptime 99.99% · 0 Brechas de seguridad
            </p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

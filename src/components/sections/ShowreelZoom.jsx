import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
  FiPlay, FiPause, FiShield, FiCpu, FiWifi, FiActivity,
  FiMaximize2, FiCheckCircle, FiArrowDown
} from 'react-icons/fi';
import './ShowreelZoom.css';

export default function ShowreelZoom() {
  const containerRef = useRef(null);
  const canvasRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  // Scroll progress for cinematic zoom
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  // Zoom transforms:
  // Starts framed at 82vw × 72vh with 28px border-radius, expands smoothly to 100vw × 100vh FULL SCREEN!
  const scale = useTransform(scrollYProgress, [0, 0.75], [0.8, 1]);
  const width = useTransform(scrollYProgress, [0, 0.75], ['82vw', '100vw']);
  const height = useTransform(scrollYProgress, [0, 0.75], ['72vh', '100vh']);
  const borderRadius = useTransform(scrollYProgress, [0, 0.75], [28, 0]);
  const introOpacity = useTransform(scrollYProgress, [0, 0.22], [1, 0]);
  const introY = useTransform(scrollYProgress, [0, 0.22], [0, -50]);
  const hudOpacity = useTransform(scrollYProgress, [0.25, 0.65], [0.3, 1]);

  // High-Tech Cyber Network Canvas Animation (Runs at 60fps in Hackthony Blue & White)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationId;
    let w = (canvas.width = canvas.offsetWidth);
    let h = (canvas.height = canvas.offsetHeight);

    const handleResize = () => {
      if (!canvas) return;
      w = canvas.width = canvas.offsetWidth;
      h = canvas.height = canvas.offsetHeight;
    };
    window.addEventListener('resize', handleResize);

    const nodeCount = 42;
    const nodes = Array.from({ length: nodeCount }, () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      vx: (Math.random() - 0.5) * 0.75,
      vy: (Math.random() - 0.5) * 0.75,
      radius: Math.random() * 2.5 + 2,
      pulse: Math.random() * Math.PI,
    }));

    const packets = Array.from({ length: 14 }, () => ({
      from: Math.floor(Math.random() * nodeCount),
      to: Math.floor(Math.random() * nodeCount),
      progress: Math.random(),
      speed: Math.random() * 0.016 + 0.008,
    }));

    let radarAngle = 0;

    const render = () => {
      ctx.clearRect(0, 0, w, h);

      // Deep obsidian monochrome gradient
      const bgGrad = ctx.createRadialGradient(w / 2, h / 2, 80, w / 2, h / 2, Math.max(w, h));
      bgGrad.addColorStop(0, '#141414');
      bgGrad.addColorStop(0.5, '#0A0A0A');
      bgGrad.addColorStop(1, '#000000');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, w, h);

      // Subtle monochrome grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.lineWidth = 1;
      const gridSize = 50;
      for (let x = 0; x < w; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, h);
        ctx.stroke();
      }
      for (let y = 0; y < h; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(w, y);
        ctx.stroke();
      }

      // Radar Concentric Circles
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(w, h) * 0.44;

      [0.3, 0.6, 0.9].forEach((ratio) => {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * ratio, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(255, 255, 255, ${0.12 - ratio * 0.03})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      });

      // Rotating radar sweep
      radarAngle += 0.012;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, radarAngle - 0.4, radarAngle);
      ctx.closePath();
      const sweepGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, maxR);
      sweepGrad.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
      sweepGrad.addColorStop(1, 'transparent');
      ctx.fillStyle = sweepGrad;
      ctx.fill();

      // Nodes
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > w) node.vx *= -1;
        if (node.y < 0 || node.y > h) node.vy *= -1;
        node.pulse += 0.03;

        const currentRadius = node.radius + Math.sin(node.pulse) * 1.2;
        ctx.beginPath();
        ctx.arc(node.x, node.y, Math.max(1, currentRadius), 0, Math.PI * 2);
        ctx.fillStyle = '#FFFFFF';
        ctx.shadowColor = '#FFFFFF';
        ctx.shadowBlur = 8;
        ctx.fill();
        ctx.shadowBlur = 0;
      });

      // Lines
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 135) {
            const alpha = (1 - dist / 135) * 0.28;
            ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.8})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.stroke();
          }
        }
      }

      // Traveling packets
      packets.forEach((p) => {
        p.progress += p.speed;
        if (p.progress >= 1) {
          p.progress = 0;
          p.from = Math.floor(Math.random() * nodeCount);
          p.to = Math.floor(Math.random() * nodeCount);
        }
        const n1 = nodes[p.from];
        const n2 = nodes[p.to];
        if (n1 && n2) {
          const px = n1.x + (n2.x - n1.x) * p.progress;
          const py = n1.y + (n2.y - n1.y) * p.progress;
          ctx.beginPath();
          ctx.arc(px, py, 3, 0, Math.PI * 2);
          ctx.fillStyle = '#FFFFFF';
          ctx.shadowColor = '#FFFFFF';
          ctx.shadowBlur = 10;
          ctx.fill();
          ctx.shadowBlur = 0;
        }
      });

      if (isPlaying) {
        animationId = requestAnimationFrame(render);
      }
    };

    render();

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [isPlaying]);

  return (
    <section className="showreel-zoom" ref={containerRef}>
      <div className="showreel-zoom__sticky">
        {/* Intro con desvanecimiento suave al hacer scroll (Totalmente separado del portal) */}
        <motion.div
          className="showreel-zoom__intro"
          style={{ opacity: introOpacity, y: introY }}
        >
          <div className="section-label">
            <FiActivity size={14} />
            <span>Showreel de Infraestructura en Vivo</span>
          </div>
          <h2 className="showreel-zoom__title">
            Observa el poder de nuestra tecnología <br />
            <span className="gradient-text">operando en tiempo real</span>
          </h2>
          <p className="showreel-zoom__scroll-hint">
            <span className="showreel-zoom__mouse-icon">
              <span className="showreel-zoom__mouse-wheel" />
            </span>
            <span>Haz scroll hacia abajo para agrandar y sumergirte en la experiencia</span>
          </p>
        </motion.div>

        {/* PORTAL CINEMATOGRÁFICO DE ZOOM (CLAY SIGNATURE EXPANDING CARD) */}
        <motion.div
          className="showreel-zoom__card"
          style={{
            scale,
            width,
            height,
            borderRadius,
          }}
        >
          {/* Canvas Cyber Radar */}
          <canvas ref={canvasRef} className="showreel-zoom__canvas" />

          {/* HUD Superior Limpio (Sin colisión con el título) */}
          <div className="showreel-zoom__hud-top">
            <div className="showreel-hud-badge">
              <span className="showreel-pulse-dot" />
              <span>NOC / SOC ACTIVO · MONITOREO 24/7/365</span>
            </div>

            <div className="showreel-hud-controls">
              <button
                type="button"
                className="showreel-btn-icon"
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pausar simulación' : 'Reanudar'}
              >
                {isPlaying ? <FiPause size={15} /> : <FiPlay size={15} />}
              </button>
            </div>
          </div>

          {/* Título Central Imponente y Limpio */}
          <div className="showreel-zoom__center-title">
            <span className="showreel-eyebrow">HACKANTONY ENTERPRISE CORE</span>
            <h3 className="showreel-heading">Arquitectura TI & Ciberseguridad Blindada</h3>
            <p className="showreel-subheading">
              Conexiones redundantes · Uptime 99.99% · 0 Brechas de seguridad
            </p>
          </div>

          {/* Dock Inferior de Telemetría (Limpio, 4 pilares en una sola fila) */}
          <motion.div
            className="showreel-zoom__hud-bottom"
            style={{ opacity: hudOpacity }}
          >
            <div className="showreel-stat-card">
              <FiShield className="showreel-stat-icon" />
              <div>
                <strong>Zero-Trust Activo</strong>
                <span>Firewall MikroTik & Fortinet</span>
              </div>
            </div>

            <div className="showreel-stat-card">
              <FiCpu className="showreel-stat-icon" />
              <div>
                <strong>SLA &lt; 15 Minutos</strong>
                <span>Mesa de Ayuda 24/7 AnyDesk</span>
              </div>
            </div>

            <div className="showreel-stat-card">
              <FiWifi className="showreel-stat-icon" />
              <div>
                <strong>10 Gbps Fibra</strong>
                <span>Latencia Ultrabaja &lt; 10ms</span>
              </div>
            </div>

            <div className="showreel-stat-card">
              <FiCheckCircle className="showreel-stat-icon" />
              <div>
                <strong>Azure + Microsoft 365</strong>
                <span>Multi-Sede Blindada</span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

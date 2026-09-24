import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiShield, FiServer, FiHeadphones, FiCheckCircle,
  FiArrowRight, FiActivity, FiLayers, FiLock, FiGlobe,
  FiChevronLeft, FiChevronRight
} from 'react-icons/fi';
import './StickyShowcase.css';

const flagshipSolutions = [
  {
    id: 'cyber',
    number: '01',
    tag: 'CIBERSEGURIDAD AVANZADA',
    title: 'Blindaje Perimetral & SOC Corporativo',
    desc: 'Implementamos firewalls de próxima generación con MikroTik y Fortinet, filtrado de tráfico profundo y protección EDR contra ransomware. Tu empresa inmune a interrupciones.',
    techs: ['MikroTik CCR Series', 'Fortinet FortiGate NGFW', 'Panda WatchGuard EDR', 'Certificados Sectigo SSL'],
    metric: '100% Amenazas Bloqueadas',
    status: 'Protección 24/7 Activa',
    accentColor: '#000000',
    interactivePreview: {
      title: 'Monitoreo de Amenazas Perimetrales',
      items: [
        { label: 'Inspección de Paquetes SSL/TLS', status: 'Activo', val: '0 Fugas' },
        { label: 'Filtrado Web y Prevención de Intrusiones (IPS)', status: 'Activo', val: 'Bloqueo 100%' },
        { label: 'Túneles Cifrados IPsec Site-to-Site', status: 'Activo', val: '256-bit AES' },
      ],
    },
  },
  {
    id: 'cloud',
    number: '02',
    tag: 'INFRAESTRUCTURA & NUBE',
    title: 'Cloud Híbrido, Servidores & Azure Enterprise',
    desc: 'Migración transparente y arquitectura de servidores dedicados con Microsoft Azure. Conectamos todas tus sedes con enlaces troncales de fibra y balanceo de carga Multi-WAN.',
    techs: ['Microsoft Azure IaaS/PaaS', 'VLANs Segmentadas', 'Servidores VPS Dedicados', 'Disaster Recovery Plan'],
    metric: '99.99% Uptime Garantizado',
    status: 'Conmutación Automática',
    accentColor: '#000000',
    interactivePreview: {
      title: 'Estado de Servidores & Centros de Datos',
      items: [
        { label: 'Máquinas Virtuales Azure / VPS', status: 'Operativo', val: 'Latencia < 12ms' },
        { label: 'Replicación y Backup en la Nube', status: 'Al día', val: 'Copias Diarias OK' },
        { label: 'Balanceo de Enlaces WAN MikroTik', status: 'Activo', val: 'Failover 0ms' },
      ],
    },
  },
  {
    id: 'soporte',
    number: '03',
    tag: 'CONTINUIDAD OPERATIVA',
    title: 'Mesa de Ayuda TI 24/7 & Asistencia Remota',
    desc: 'Un equipo de ingenieros dedicados a resolver incidencias en minutos mediante AnyDesk Enterprise y soporte presencial. Cero tiempo muerto para tus colaboradores.',
    techs: ['Mesa de Ayuda 7x24 / 8x5', 'AnyDesk Enterprise TLS 1.2', 'Mantenimiento Preventivo', 'Gestión de Inventario TI'],
    metric: '< 15 Min Tiempo de Respuesta',
    status: 'Ingenieros Conectados',
    accentColor: '#000000',
    interactivePreview: {
      title: 'Panel Helpdesk & Soporte en Tiempo Real',
      items: [
        { label: 'Tiempo de Primera Respuesta (SLA)', status: 'Excelente', val: '< 12 minutos' },
        { label: 'Tasa de Resolución en Primer Contacto', status: 'Óptimo', val: '94.6%' },
        { label: 'Satisfacción de Usuarios Finales (CSAT)', status: '5 Estrellas', val: '4.95 / 5.0' },
      ],
    },
  },
  {
    id: 'licencias',
    number: '04',
    tag: 'SOFTWARE AUDITABLE',
    title: 'Licenciamiento Oficial Microsoft & Adobe',
    desc: 'Garantizamos que el 100% de tus programas, suites de oficina y herramientas operen con licencias genuinas, auditables por fabricantes y libres de riesgos legales.',
    techs: ['Microsoft 365 Business & Enterprise', 'Adobe Creative Cloud', 'Windows Server & CALs', 'WatchGuard Total Security'],
    metric: '100% Legal & Auditable',
    status: 'Canal Oficial Certificado',
    accentColor: '#000000',
    interactivePreview: {
      title: 'Consola Centralizada de Cumplimiento TI',
      items: [
        { label: 'Estado de Licencias Microsoft 365', status: 'Genuino', val: '100% Activo' },
        { label: 'Certificado de Autenticidad de Fábrica', status: 'Verificado', val: 'Auditable' },
        { label: 'Soporte Directo con Fabricantes', status: 'Activo', val: 'Canal Gold' },
      ],
    },
  },
];

export default function StickyShowcase() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <section className="sticky-showcase section" id="casos">
      <div className="container">
        {/* Header Estilo Clay */}
        <div className="sticky-showcase__header">
          <div className="section-label">
            <FiLayers size={14} />
            <span>Capacidades Principales</span>
          </div>
          <h2 className="section-title">
            Soluciones de ingeniería que <br />
            <span className="gradient-text">marcan la diferencia en el mercado</span>
          </h2>
          <p className="section-subtitle">
            Cada proyecto se ejecuta con arquitecturas certificadas, estándares internacionales y métricas medibles para el crecimiento de tu negocio.
          </p>
        </div>

        {/* Interactive Sticky Stack Layout */}
        <div className="sticky-showcase__layout">
          {/* Navigation Pills (Sticky Tabs) con indicador deslizante */}
          <div className="sticky-showcase__nav">
            {flagshipSolutions.map((sol, index) => {
              const isActive = activeTab === index;
              return (
                <button
                  key={sol.id}
                  type="button"
                  className={`sticky-showcase__nav-btn ${isActive ? 'active' : ''}`}
                  onClick={() => setActiveTab(index)}
                >
                  {isActive && (
                    <motion.div
                      layoutId="stickyNavIndicator"
                      className="sticky-nav-indicator"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="sticky-nav-num">{sol.number}</span>
                  <span className="sticky-nav-title">{sol.tag}</span>
                </button>
              );
            })}
          </div>

          {/* Active Card Showcase con transición suave entre soluciones */}
          <div className="sticky-showcase__stage">
            <AnimatePresence mode="wait">
              {(() => {
                const sol = flagshipSolutions[activeTab];
                return (
                  <motion.div
                    key={sol.id}
                    className="sticky-card"
                    initial={{ opacity: 0, y: 18, scale: 0.985 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -18, scale: 0.985 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                  >
                    <div className="sticky-card__info">
                      <div className="sticky-card__badge-row">
                        <span className="sticky-card__badge" style={{ backgroundColor: `${sol.accentColor}15`, color: sol.accentColor }}>
                          {sol.tag}
                        </span>
                        <span className="sticky-card__metric-chip">
                          <FiCheckCircle size={13} />
                          {sol.metric}
                        </span>
                      </div>

                      <h3 className="sticky-card__title">{sol.title}</h3>
                      <p className="sticky-card__desc">{sol.desc}</p>

                      <div className="sticky-card__techs">
                        <h4>Tecnologías Implementadas:</h4>
                        <div className="sticky-tech-pills">
                          {sol.techs.map((tech, i) => (
                            <span key={i} className="sticky-tech-pill">
                              <FiCheckCircle className="sticky-check" />
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="sticky-card__actions-row">
                        <a
                          href={`https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20la%20soluci%C3%B3n%20de%20${encodeURIComponent(sol.title)}.`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-primary sticky-card__btn"
                        >
                          <span>Cotizar esta Solución</span>
                          <FiArrowRight size={16} />
                        </a>

                        <div className="sticky-card__nav-arrows">
                          <button
                            type="button"
                            className="sticky-arrow-btn"
                            onClick={() => setActiveTab((prev) => (prev > 0 ? prev - 1 : flagshipSolutions.length - 1))}
                            title="Solución anterior"
                          >
                            <FiChevronLeft size={16} />
                            <span>Anterior</span>
                          </button>
                          <span className="sticky-nav-counter">{activeTab + 1} / {flagshipSolutions.length}</span>
                          <button
                            type="button"
                            className="sticky-arrow-btn"
                            onClick={() => setActiveTab((prev) => (prev < flagshipSolutions.length - 1 ? prev + 1 : 0))}
                            title="Siguiente solución"
                          >
                            <span>Siguiente</span>
                            <FiChevronRight size={16} />
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Right: Interactive High-Tech Simulated Dashboard Card */}
                    <div className="sticky-card__preview">
                      <div className="preview-terminal">
                        <div className="preview-terminal__header">
                          <div className="preview-dots">
                            <span className="dot red" />
                            <span className="dot yellow" />
                            <span className="dot green" />
                          </div>
                          <span className="preview-terminal__title">{sol.interactivePreview.title}</span>
                          <span className="preview-terminal__badge">EN VIVO</span>
                        </div>

                        <div className="preview-terminal__body">
                          <div className="preview-status-pill">
                            <span className="pulse-green" />
                            <strong>ESTADO:</strong> {sol.status}
                          </div>

                          <div className="preview-metrics-list">
                            {sol.interactivePreview.items.map((item, idx) => (
                              <div key={idx} className="preview-metric-row">
                                <span className="preview-metric-label">{item.label}</span>
                                <div className="preview-metric-value-wrap">
                                  <span className="preview-metric-status">{item.status}</span>
                                  <strong className="preview-metric-val">{item.val}</strong>
                                </div>
                              </div>
                            ))}
                          </div>

                          <div className="preview-telemetry-chart">
                            <div className="preview-chart-header">
                              <span>Flujo de Rendimiento en Tiempo Real</span>
                              <span className="preview-chart-val">100% Operativo</span>
                            </div>
                            <div className="preview-chart-bars">
                              {Array.from({ length: 24 }).map((_, barIdx) => {
                                const h = Math.sin(barIdx * 0.4) * 20 + 35 + ((barIdx * 7) % 15);
                                return (
                                  <div
                                    key={barIdx}
                                    className="preview-chart-bar"
                                    style={{
                                      height: `${h}%`,
                                      animationDelay: `${barIdx * 0.05}s`,
                                    }}
                                  />
                                );
                              })}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })()}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}

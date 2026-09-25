import { useState, useRef, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiAward, 
  FiCheckCircle, 
  FiChevronLeft, 
  FiChevronRight, 
  FiPause, 
  FiPlay, 
  FiArrowRight, 
  FiExternalLink, 
  FiX,
  FiZap
} from 'react-icons/fi';
import { 
  LogoMicrosoft, 
  LogoMikroTik, 
  LogoPandaSecurity, 
  LogoSectigo, 
  LogoAdobe, 
  LogoAnyDesk, 
  LogoAzure, 
  LogoBarracuda, 
  LogoFortinet, 
  LogoCisco
} from '../ui/PartnerLogos';
import './Partners.css';

// Las 10 Alianzas Tecnológicas Oficiales de Big Tech & Ciberseguridad para el carrusel 360°
const alliance3DPartners = [
  {
    id: 'microsoft',
    name: 'Microsoft',
    component: LogoMicrosoft,
    category: 'Big Tech & Cloud',
    tier: 'Gold Solutions Partner',
    accentColor: '#00A4EF',
    oneLiner: 'Licenciamiento empresarial Microsoft 365, despliegue de Azure Cloud y auditoría de software legal.',
    deliverables: ['Microsoft 365 Business & Enterprise', 'Despliegue Azure Cloud', 'Auditoría y Regularización'],
    metric: '99.9% Cloud Uptime',
    status: 'Certificación Gold',
    url: 'https://www.microsoft.com',
  },
  {
    id: 'mikrotik',
    name: 'MikroTik',
    component: LogoMikroTik,
    category: 'Redes & Enrutamiento',
    tier: 'Certified Network Partner',
    accentColor: '#D32F2F',
    oneLiner: 'Arquitectura de enrutamiento troncal, conmutación de alta disponibilidad y firewalls RouterOS.',
    deliverables: ['Configuración RouterOS', 'Balanceo de Carga Multi-WAN', 'VPN Site-to-Site Cifradas'],
    metric: 'Balanceo Multi-WAN',
    status: 'Ingenieros Certificados',
    url: 'https://mikrotik.com',
  },
  {
    id: 'fortinet',
    name: 'Fortinet',
    component: LogoFortinet,
    category: 'Ciberseguridad Perimetral',
    tier: 'Network Security Partner',
    accentColor: '#EE3124',
    oneLiner: 'Implementación de Firewalls FortiGate NGFW de próxima generación y blindaje contra amenazas Zero-Day.',
    deliverables: ['Firewalls FortiGate NGFW', 'Inspección SSL Profunda', 'Protección Anti-Ransomware'],
    metric: '0 Brechas de Seguridad',
    status: 'Partner Certificado',
    url: 'https://www.fortinet.com',
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    component: LogoCisco,
    category: 'Infraestructura Empresarial',
    tier: 'Enterprise Networking Partner',
    accentColor: '#049FD9',
    oneLiner: 'Switches administrables Catalyst y Meraki para conectividad troncal corporativa de ultra-baja latencia.',
    deliverables: ['Switches Catalyst & Meraki', 'Segmentación de VLANs', 'Wi-Fi 6 Corporativo'],
    metric: 'Gigabit Troncal Estable',
    status: 'Hardware Certificado',
    url: 'https://www.cisco.com',
  },
  {
    id: 'sectigo',
    name: 'Sectigo',
    component: LogoSectigo,
    category: 'Certificación & PKI',
    tier: 'Platinum SSL Provider',
    accentColor: '#00B0B9',
    oneLiner: 'Emisión de certificados SSL/TLS empresariales, firma digital de código y cifrado web avanzado.',
    deliverables: ['Certificados SSL Wildcard & EV', 'Firma de Código y Documentos', 'Infraestructura PKI'],
    metric: 'Cifrado SHA-256 Activo',
    status: 'Proveedor Platinum',
    url: 'https://sectigo.com',
  },
  {
    id: 'adobe',
    name: 'Adobe',
    component: LogoAdobe,
    category: 'Software Creativo & Documental',
    tier: 'Authorized Reseller',
    accentColor: '#FA0F00',
    oneLiner: 'Distribución y licenciamiento oficial de Creative Cloud for Teams y soluciones documentales Acrobat Pro.',
    deliverables: ['Creative Cloud for Teams', 'Acrobat Sign y Flujo Documental', 'Consola Centralizada'],
    metric: 'Licencias 100% Oficiales',
    status: 'Canal Oficial',
    url: 'https://www.adobe.com',
  },
  {
    id: 'anydesk',
    name: 'AnyDesk',
    component: LogoAnyDesk,
    category: 'Acceso Remoto Seguro',
    tier: 'Enterprise Remote Partner',
    accentColor: '#EF443B',
    oneLiner: 'Plataforma oficial de asistencia remota cifrada TLS 1.2 para soporte técnico corporativo inmediato.',
    deliverables: ['AnyDesk Enterprise Centralizado', 'Acceso No Supervisado Seguro', 'SLA de Respuesta Inmediata'],
    metric: 'SLA < 15 Minutos',
    status: 'Licencia Enterprise',
    url: 'https://anydesk.com',
  },
  {
    id: 'pandasecurity',
    name: 'Panda Security',
    component: LogoPandaSecurity,
    category: 'Endpoint Security & EDR',
    tier: 'Authorized Gold Partner',
    accentColor: '#00A8E8',
    oneLiner: 'Protección EDR perimetral contra ransomware, antivirus corporativo y filtrado web centralizado.',
    deliverables: ['Endpoint Protection Plus', 'Monitoreo EDR en Tiempo Real', 'Control de Dispositivos USB'],
    metric: '100% Endpoints Blindados',
    status: 'Soporte Directo',
    url: 'https://www.pandasecurity.com',
  },
  {
    id: 'azure',
    name: 'Microsoft Azure',
    component: LogoAzure,
    category: 'Infraestructura Cloud',
    tier: 'Cloud Solutions Provider',
    accentColor: '#0078D4',
    oneLiner: 'Despliegue de máquinas virtuales, centros de datos en la nube y respaldos automáticos de alta resiliencia.',
    deliverables: ['Servidores Virtuales Azure', 'Backup & Disaster Recovery', 'Bases de Datos Escalables'],
    metric: '99.95% SLA Garantizado',
    status: 'Nube Certificada',
    url: 'https://azure.microsoft.com',
  },
  {
    id: 'barracuda',
    name: 'Barracuda Networks',
    component: LogoBarracuda,
    category: 'Seguridad & Backup',
    tier: 'Certified Security Partner',
    accentColor: '#0071C5',
    oneLiner: 'Protección avanzada de correo empresarial contra phishing y firewalls de aplicaciones web cloud.',
    deliverables: ['Email Security Gateway', 'Protección Anti-Phishing', 'WAF Cloud Protection'],
    metric: '99.8% Bloqueo Spam',
    status: 'Partner Oficial',
    url: 'https://www.barracuda.com',
  },
];

export default function Partners() {
  const [rotation, setRotation] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState(null);
  const [radii, setRadii] = useState({ rx: 570, rz: 430 });

  const stageRef = useRef(null);
  const isDraggingRef = useRef(false);
  const startXRef = useRef(0);
  const lastXRef = useRef(0);
  const velocityRef = useRef(0);
  const targetRotationRef = useRef(0);
  const currentRotationRef = useRef(0);
  const rafRef = useRef(null);
  const autoSpeedRef = useRef(0.2); // velocidad base de giro automático

  const total = alliance3DPartners.length;
  const angleStep = 360 / total;

  // Ajuste de radios de la órbita según el tamaño de pantalla (más amplio y vistoso)
  useEffect(() => {
    const updateRadii = () => {
      const w = window.innerWidth;
      if (w > 1280) {
        setRadii({ rx: 570, rz: 430 });
      } else if (w > 992) {
        setRadii({ rx: 470, rz: 360 });
      } else if (w > 680) {
        setRadii({ rx: 350, rz: 260 });
      } else {
        setRadii({ rx: 220, rz: 165 });
      }
    };

    updateRadii();
    window.addEventListener('resize', updateRadii);
    return () => window.removeEventListener('resize', updateRadii);
  }, []);

  // Bucle de animación 360° continuo y fluido
  useEffect(() => {
    const loop = () => {
      if (!isDraggingRef.current) {
        if (!isPaused) {
          targetRotationRef.current += autoSpeedRef.current;
        }
        // Suave inercia e interpolación
        currentRotationRef.current += (targetRotationRef.current - currentRotationRef.current) * 0.1;
      } else {
        currentRotationRef.current = targetRotationRef.current;
      }

      setRotation(currentRotationRef.current);
      rafRef.current = requestAnimationFrame(loop);
    };

    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
  }, [isPaused]);

  // Manejo de mouse steering (apuntar a los lados acelera o invierte el giro)
  const handleStageMouseMove = (e) => {
    if (isDraggingRef.current || !stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    const ratio = (e.clientX - rect.left) / rect.width;

    if (ratio > 0.6) {
      // Girar hacia la derecha
      const factor = (ratio - 0.6) / 0.4;
      autoSpeedRef.current = 0.2 + factor * 0.8;
    } else if (ratio < 0.4) {
      // Girar hacia la izquierda
      const factor = (0.4 - ratio) / 0.4;
      autoSpeedRef.current = -(0.2 + factor * 0.8);
    } else {
      // En la zona central o cerca de la tarjeta frontal: velocidad suave o pausa sutil
      autoSpeedRef.current = 0.12;
    }
  };

  const handleStageMouseLeave = () => {
    if (!isDraggingRef.current) {
      autoSpeedRef.current = 0.2; // velocidad por defecto
      setIsPaused(false);
    }
  };

  // Drag para girar interactivamente en 3D
  const handlePointerDown = (e) => {
    isDraggingRef.current = true;
    startXRef.current = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    lastXRef.current = startXRef.current;
    velocityRef.current = 0;
  };

  const handlePointerMove = (e) => {
    if (!isDraggingRef.current) return;
    const clientX = e.clientX || (e.touches && e.touches[0].clientX) || 0;
    const delta = clientX - lastXRef.current;
    lastXRef.current = clientX;

    // Sensibilidad de giro proporcional
    targetRotationRef.current -= delta * 0.35;
    currentRotationRef.current = targetRotationRef.current;
    velocityRef.current = delta;
  };

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return;
    isDraggingRef.current = false;
    // Aplicar leve impulso
    targetRotationRef.current -= velocityRef.current * 0.5;
  };

  // Rotar directamente para enfocar un partner específico al frente
  const rotateToPartner = (idx) => {
    const currentAngle = targetRotationRef.current % 360;
    const targetAngle = -idx * angleStep;
    
    // Calcular la distancia angular más corta (-180 a 180)
    let diff = (targetAngle - currentAngle) % 360;
    if (diff > 180) diff -= 360;
    if (diff < -180) diff += 360;

    targetRotationRef.current = currentRotationRef.current + diff;
  };

  // Siguiente / Anterior
  const handlePrev = useCallback(() => {
    targetRotationRef.current += angleStep;
  }, [angleStep]);

  const handleNext = useCallback(() => {
    targetRotationRef.current -= angleStep;
  }, [angleStep]);

  // Encontrar el índice del partner actualmente al frente (para dot indicador)
  const normalizedRotation = (((-rotation) % 360) + 360) % 360;
  const activeFrontIndex = Math.round(normalizedRotation / angleStep) % total;

  return (
    <section className="partners section" id="partners">
      {/* Luces ambientales tenues */}
      <div className="partners__ambient-glow partners__ambient-glow--left" />
      <div className="partners__ambient-glow partners__ambient-glow--right" />

      <div className="container">
        {/* Cabecera Principal */}
        <motion.div
          className="partners__header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <FiAward size={15} />
            <span>Alianzas Oficiales & Big Tech</span>
          </div>

          <h2 className="section-title">
            Certificaciones globales que <span className="gradient-text">potencian tu empresa</span>
          </h2>
          <p className="section-subtitle">
            Explora nuestro ecosistema 360° de partners tecnológicos autorizados. Soluciones oficiales de licenciamiento, ciberseguridad perimetral y nube híbrida respaldadas directamente por los fabricantes líderes mundiales.
          </p>
        </motion.div>
      </div>


      {/* ========================================================
          ESCENARIO 3D CILÍNDRICO 360° (SE VE DE FONDO COMO GIRA Y VUELVE)
          ======================================================== */}
      <div className="partners-3d-section">
        {/* Escenario 3D Interactivo */}
        <div
          ref={stageRef}
          className="partners-3d-stage"
          onMouseMove={handleStageMouseMove}
          onMouseLeave={handleStageMouseLeave}
          onMouseDown={handlePointerDown}
          onMouseMoveCapture={handlePointerMove}
          onMouseUp={handlePointerUp}
          onTouchStart={handlePointerDown}
          onTouchMove={handlePointerMove}
          onTouchEnd={handlePointerUp}
        >
          {/* Anillo de luz en el piso del escenario 3D */}
          <div className="partners-3d-floor-ring" />
          <div className="partners-3d-floor-glow" />

          {/* Contenedor central 3D donde orbitan las 10 tarjetas */}
          <div className="partners-3d-orbit">
            {alliance3DPartners.map((item, idx) => {
              const LogoComp = item.component;
              // Ángulo de cada tarjeta en el círculo
              const cardAngleDeg = idx * angleStep + rotation;
              const rad = (cardAngleDeg * Math.PI) / 180;
              const sin = Math.sin(rad);
              const cos = Math.cos(rad);

              // Coordenadas elípticas en el espacio 3D
              const x = sin * radii.rx;
              const z = cos * radii.rz; // z varía de -rz (fondo) a +rz (frente)

              // Normalización de profundidad (0 = fondo lejano, 1 = frente absoluto)
              const depthNorm = (z + radii.rz) / (2 * radii.rz);

              // Escala: 0.70 en el fondo -> 1.08 al frente (más grande y destacado)
              const scale = 0.70 + depthNorm * 0.38;

              // Opacidad: 0.46 en el fondo (visible en el fondo como gira) -> 1.0 al frente
              const opacity = 0.46 + depthNorm * 0.54;

              // Inclinación 3D en el eje Y siguiendo la curvatura del cilindro
              const rotateY = -sin * 26;

              // Desenfoque de lente sutil para dar sensación de profundidad
              const blurPx = (1 - depthNorm) * 2;

              // zIndex para ordenar las tarjetas correctamente de atrás hacia adelante
              const zIndex = Math.round(depthNorm * 100);

              const isFront = depthNorm > 0.88;

              return (
                <div
                  key={item.id}
                  className={`partners-3d-card ${isFront ? 'partners-3d-card--front' : 'partners-3d-card--orbit'}`}
                  style={{
                    transform: `translate3d(${x}px, ${(1 - depthNorm) * -10}px, 0) scale(${scale}) rotateY(${rotateY}deg)`,
                    opacity,
                    filter: `blur(${blurPx}px)`,
                    zIndex,
                  }}
                  onClick={() => {
                    if (isFront) {
                      setSelectedPartner(item);
                    } else {
                      rotateToPartner(idx);
                    }
                  }}
                  onMouseEnter={() => {
                    if (isFront) setIsPaused(true);
                  }}
                  onMouseLeave={() => {
                    if (isFront) setIsPaused(false);
                  }}
                >
                  {/* Resplandor perimetral de la tarjeta */}
                  <div 
                    className="partners-3d-card__glow" 
                    style={{ background: `radial-gradient(circle at 50% 0%, ${item.accentColor}25, transparent 70%)` }}
                  />

                  {/* Logo Oficial Amplio y Nombre de la Marca */}
                  <div className="partners-3d-card__logo-wrap">
                    <LogoComp height={50} className="partners-3d-card__svg" />
                    <h3 className="partners-3d-card__name">{item.name}</h3>
                    <span className="partners-3d-card__tier">{item.tier}</span>
                  </div>

                  {/* Descripción técnica breve */}
                  <p className="partners-3d-card__desc">
                    {item.oneLiner}
                  </p>

                  {/* Entregables técnicos oficiales */}
                  <div className="partners-3d-card__deliverables">
                    {item.deliverables.slice(0, 2).map((del, dIdx) => (
                      <div key={dIdx} className="partners-3d-card__deliverable-item">
                        <FiCheckCircle size={13} style={{ color: item.accentColor }} />
                        <span>{del}</span>
                      </div>
                    ))}
                  </div>

                  {/* Footer de la tarjeta con métrica y botón de acción */}
                  <div className="partners-3d-card__footer">
                    <div className="partners-3d-card__metric">
                      <FiZap size={13} style={{ color: item.accentColor }} />
                      <span>{item.metric}</span>
                    </div>

                    <button
                      type="button"
                      className="partners-3d-card__btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedPartner(item);
                      }}
                      title={`Ver detalles de alianza con ${item.name}`}
                    >
                      <span>Ver Alianza</span>
                      <FiArrowRight size={13} />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ========================================================
            CONTROLES DE NAVEGACIÓN Y SELECTORES ORBITALES
            ======================================================== */}
        <div className="container">
          <div className="partners-3d-controls">
            {/* Botón Girar Izquierda */}
            <button
              type="button"
              className="partners-3d-nav-btn"
              onClick={handlePrev}
              aria-label="Girar carrusel a la izquierda"
              title="Girar a la izquierda"
            >
              <FiChevronLeft size={20} />
            </button>

            {/* Píldoras / Dots indicadores de los 10 partners */}
            <div className="partners-3d-dots">
              {alliance3DPartners.map((item, dotIdx) => {
                const isActive = dotIdx === activeFrontIndex;
                return (
                  <button
                    key={item.id}
                    type="button"
                    className={`partners-3d-dot ${isActive ? 'partners-3d-dot--active' : ''}`}
                    onClick={() => rotateToPartner(dotIdx)}
                    aria-label={`Ver partner ${item.name}`}
                    title={item.name}
                  >
                    <span className="partners-3d-dot__bar" />
                  </button>
                );
              })}
            </div>

            {/* Botón Pausa / Reproducción */}
            <button
              type="button"
              className={`partners-3d-nav-btn partners-3d-nav-btn--play ${isPaused ? 'is-paused' : ''}`}
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? "Reanudar giro automático" : "Pausar giro"}
              title={isPaused ? "Reanudar" : "Pausar"}
            >
              {isPaused ? <FiPlay size={16} /> : <FiPause size={16} />}
            </button>

            {/* Botón Girar Derecha */}
            <button
              type="button"
              className="partners-3d-nav-btn"
              onClick={handleNext}
              aria-label="Girar carrusel a la derecha"
              title="Girar a la derecha"
            >
              <FiChevronRight size={20} />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================
          MODAL DE DETALLE DE ALIANZA TECNOLÓGICA (WHATSAPP DIRECTO)
          ======================================================== */}
      <AnimatePresence>
        {selectedPartner && (
          <motion.div 
            className="client-modal-backdrop" 
            onClick={() => setSelectedPartner(null)}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div 
              className="client-modal-card" 
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              <button 
                className="client-modal-close" 
                onClick={() => setSelectedPartner(null)}
                aria-label="Cerrar modal"
              >
                <FiX size={20} />
              </button>

              <div className="client-modal-header">
                <span 
                  className="client-modal-tag" 
                  style={{ color: selectedPartner.accentColor, backgroundColor: `${selectedPartner.accentColor}18` }}
                >
                  {selectedPartner.status}
                </span>
                
                <div style={{ marginTop: '14px', marginBottom: '8px' }}>
                  {(() => {
                    const Logo = selectedPartner.component;
                    return <Logo height={42} />;
                  })()}
                </div>

                <h3 className="client-modal-title">{selectedPartner.name}</h3>
                <span className="client-modal-category">{selectedPartner.tier} • {selectedPartner.category}</span>
              </div>

              <p className="client-modal-desc">
                {selectedPartner.oneLiner}
              </p>

              <div className="client-modal-deliverables">
                <h4>Alcance Técnico & Entregables de la Alianza:</h4>
                <ul>
                  {selectedPartner.deliverables.map((del, i) => (
                    <li key={i}>
                      <FiCheckCircle className="client-modal-check" style={{ color: selectedPartner.accentColor }} />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="client-modal-metric-box">
                <span className="client-modal-metric-label">Garantía / Métrica Oficial:</span>
                <strong className="client-modal-metric-value" style={{ color: selectedPartner.accentColor }}>
                  {selectedPartner.metric}
                </strong>
              </div>

              <div className="client-modal-actions">
                <a
                  href={`https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20solicitar%20asesor%C3%ADa%20y%20cotizaci%C3%B3n%20sobre%20soluciones%20oficiales%20de%20${encodeURIComponent(selectedPartner.name)}.`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary client-modal-btn"
                >
                  <span>Consultar Solución con Ingeniero</span>
                  <FiArrowRight size={16} />
                </a>

                {selectedPartner.url && (
                  <a
                    href={selectedPartner.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                  >
                    <FiExternalLink size={15} />
                    <span>Sitio Oficial</span>
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

    </section>
  );
}

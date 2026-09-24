import { useState, useEffect } from 'react';
import {
  FiGlobe, FiClock, FiShield, FiPhoneCall, FiCheckCircle,
  FiServer, FiActivity, FiLock, FiArrowRight
} from 'react-icons/fi';
import { countryData } from '../ui/CountryFlags';
import './GlobalReach.css';

// Mapeo de zonas horarias para el reloj en tiempo real
const timeZones = {
  pe: 'America/Lima',
  es: 'Europe/Madrid',
  co: 'America/Bogota',
  mx: 'America/Mexico_City',
  ar: 'America/Argentina/Buenos_Aires',
  cl: 'America/Santiago',
};

const nodeLatencies = {
  pe: { ms: 4, label: 'Latencia Local Ultrabaja' },
  es: { ms: 122, label: 'Enlace Transatlántico Fibra' },
  co: { ms: 34, label: 'Enlace Andino Redundante' },
  mx: { ms: 58, label: 'Ruta Cloud Directa' },
  ar: { ms: 45, label: 'Troncal Cono Sur' },
  cl: { ms: 32, label: 'Conexión Directa Pacífico' },
};

export default function GlobalReach() {
  const [activeCountry, setActiveCountry] = useState(countryData[0]);
  const [localTime, setLocalTime] = useState('');

  // Actualizar reloj en tiempo real según el país activo
  useEffect(() => {
    const updateTime = () => {
      const tz = timeZones[activeCountry.code] || 'America/Lima';
      const now = new Date();
      try {
        const formatted = new Intl.DateTimeFormat('es-PE', {
          timeZone: tz,
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false,
        }).format(now);
        setLocalTime(formatted);
      } catch (e) {
        setLocalTime(now.toLocaleTimeString());
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [activeCountry]);

  const latencyInfo = nodeLatencies[activeCountry.code] || { ms: 25, label: 'Enlace Óptimo' };
  const whatsappMessage = `Hola Hackthony Support, me comunico para consultar sobre soporte y servicios corporativos para mi empresa en ${activeCountry.name} (${activeCountry.city}).`;
  const whatsappUrl = `https://wa.me/51994520017?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="global-reach section" id="cobertura">
      <div className="container">
        {/* Encabezado de la Sección */}
        <div className="global-reach__header">
          <div className="global-reach__badge">
            <FiGlobe size={16} />
            <span>Infraestructura & Soporte Sin Fronteras</span>
          </div>

          <h2 className="section-title">
            Presencia y Cobertura <span className="gradient-text">Internacional</span>
          </h2>

          <p className="section-subtitle">
            Con nuestra arquitectura de gestión remota AnyDesk Enterprise y enlaces seguros IPsec no existen límites
            geográficos. Brindamos soporte corporativo de alta disponibilidad y licenciamiento en 6 países.
          </p>
        </div>

        {/* Grid de Paises y Tarjeta de Detalle */}
        <div className="global-reach__content">
          {/* Selector de Países con Banderas Vectoriales */}
          <div className="global-reach__country-list">
            {countryData.map((country) => {
              const FlagComp = country.flag;
              const isSelected = activeCountry.code === country.code;
              const nodeLat = nodeLatencies[country.code]?.ms || 25;
              return (
                <div
                  key={country.code}
                  className={`global-reach__card ${isSelected ? 'global-reach__card--active' : ''}`}
                  onClick={() => setActiveCountry(country)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => e.key === 'Enter' && setActiveCountry(country)}
                >
                  <div className="global-reach__flag-wrapper">
                    <FlagComp
                      width={38}
                      height={26}
                      preserveAspectRatio="xMidYMid slice"
                      style={{ borderRadius: '4px' }}
                    />
                  </div>

                  <div className="global-reach__card-info">
                    <div className="global-reach__card-top">
                      <h3 className="global-reach__country-title">{country.name}</h3>
                      <span className="global-reach__latency-chip">
                        <span className="global-reach__status-dot" />
                        {nodeLat}ms
                      </span>
                    </div>
                    <span className="global-reach__city-text">{country.city}</span>
                    <span className="global-reach__badge-tag">{country.badge}</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Panel Informativo del País Seleccionado */}
          <div className="global-reach__display">
            {/* Header del nodo */}
            <div className="global-reach__display-header">
              <div className="global-reach__display-flag">
                {(() => {
                  const CurrentFlag = activeCountry.flag;
                  return (
                    <CurrentFlag
                      width={48}
                      height={34}
                      preserveAspectRatio="xMidYMid slice"
                      style={{ borderRadius: '6px' }}
                    />
                  );
                })()}
              </div>

              <div className="global-reach__display-meta">
                <div className="global-reach__meta-badges">
                  <span className="global-reach__display-tier">{activeCountry.badge}</span>
                  <span className="global-reach__clock-badge">
                    <FiClock size={12} />
                    <span>Hora Local: <strong>{localTime}</strong></span>
                  </span>
                </div>
                <h3 className="global-reach__display-title">
                  Operaciones en {activeCountry.name}
                </h3>
                <p className="global-reach__display-sub">
                  Hub tecnológico principal: <strong>{activeCountry.city}</strong>
                </p>
              </div>
            </div>

            {/* Consola de Telemetría de Ruta y Túnel Cifrado */}
            <div className="global-reach__route-dock">
              <div className="global-reach__route-head">
                <FiLock size={13} className="global-reach__route-lock" />
                <span>TÚNEL SEGURO IPSEC SITE-TO-SITE (AES-256)</span>
                <span className="global-reach__route-active">ENLACE ACTIVO</span>
              </div>
              <div className="global-reach__route-visual">
                <div className="global-reach__route-node">
                  <span className="global-reach__node-dot" />
                  <strong>LIMA (HQ)</strong>
                </div>
                <div className="global-reach__route-line">
                  <span className="global-reach__route-packet" />
                  <span className="global-reach__route-latency">{latencyInfo.ms} ms</span>
                </div>
                <div className="global-reach__route-node">
                  <span className="global-reach__node-dot" />
                  <strong>{activeCountry.code.toUpperCase()} ({activeCountry.city.split('/')[0].trim()})</strong>
                </div>
              </div>
              <div className="global-reach__route-foot">
                <span>{latencyInfo.label}</span>
                <span>Cifrado de extremo a extremo verificado</span>
              </div>
            </div>

            {/* Cuerpo del Panel */}
            <div className="global-reach__display-body">
              <p className="global-reach__display-desc">
                {activeCountry.detail}. Gestionamos redes corporativas, soporte helpdesk de segundo y tercer nivel,
                licenciamiento oficial Microsoft / Adobe y auditorías de seguridad perimetral con respuesta inmediata.
              </p>

              <div className="global-reach__features">
                <div className="global-reach__feature-item">
                  <FiCheckCircle className="global-reach__feature-icon" />
                  <span>Atención en tu huso horario local ({localTime.slice(0, 5)})</span>
                </div>
                <div className="global-reach__feature-item">
                  <FiClock className="global-reach__feature-icon" />
                  <span>SLA de respuesta &lt; 15 min en incidencias críticas</span>
                </div>
                <div className="global-reach__feature-item">
                  <FiShield className="global-reach__feature-icon" />
                  <span>Conexiones seguras y cifradas mediante túneles VPN</span>
                </div>
                <div className="global-reach__feature-item">
                  <FiGlobe className="global-reach__feature-icon" />
                  <span>Facturación y contratos de servicio corporativo</span>
                </div>
              </div>

              <div className="global-reach__cta-box">
                <div className="global-reach__cta-text">
                  <strong>¿Tienes sedes o equipo en {activeCountry.name}?</strong>
                  <p>Coordinamos una sesión técnica inmediata con nuestros ingenieros.</p>
                </div>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary global-reach__btn"
                >
                  <FiPhoneCall size={16} />
                  <span>Contactar Especialista</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  FiCheckCircle, 
  FiAward, 
  FiShield, 
  FiZap, 
  FiBriefcase, 
  FiArrowRight,
  FiFilter,
  FiX,
  FiExternalLink
} from 'react-icons/fi';
import { partnersData } from '../ui/PartnerLogos';
import './Partners.css';

// Infinite marquee partners
const marqueePartners = [...partnersData, ...partnersData];

// Full Directory (Clay.global style: Partners + Corporate Clients with exact scopes)
const directoryItems = [
  {
    id: 'msft',
    name: 'Microsoft',
    type: 'partner',
    category: 'cloud',
    categoryLabel: 'Big Tech & Cloud',
    tier: 'Gold Cloud Solutions Partner',
    oneLiner: 'Licenciamiento empresarial Microsoft 365, despliegue de nube híbrida Azure y auditoría de software legal.',
    deliverables: ['Microsoft 365 Business & Enterprise', 'Despliegue de Azure Cloud', 'Auditoría y Regularización de Software'],
    metric: '99.9% Cloud Uptime',
    status: 'Alianza Oficial',
    badgeColor: '#000000',
    url: 'https://www.microsoft.com',
  },
  {
    id: 'mikrotik',
    name: 'MikroTik',
    type: 'partner',
    category: 'networks',
    categoryLabel: 'Redes & Enrutamiento',
    tier: 'Certified Network Partner',
    oneLiner: 'Arquitectura de enrutamiento troncal, conmutación de alta disponibilidad y firewalls perimetrales RouterOS.',
    deliverables: ['Configuración MikroTik RouterOS', 'Balanceo de Carga Multi-WAN', 'VPN Corporativas Site-to-Site'],
    metric: 'Balanceo Multi-WAN',
    status: 'Ingenieros Certificados',
    badgeColor: '#000000',
    url: 'https://mikrotik.com',
  },
  {
    id: 'victor-ing',
    name: 'Víctor Ingenieros',
    type: 'client',
    category: 'ti',
    categoryLabel: 'Ingeniería & Construcción',
    tier: 'Cliente Corporativo',
    oneLiner: 'Transformación integral de infraestructura de red, seguridad perimetral y Mesa de Ayuda técnica continua.',
    deliverables: ['Mesa de Ayuda 24/7', 'Cableado Estructurado y Fibra', 'Mantenimiento Preventivo de Servidores'],
    metric: '+35% Eficiencia Operativa',
    status: 'Caso de Éxito',
    badgeColor: '#000000',
    url: '#contacto',
  },
  {
    id: 'fortinet',
    name: 'Fortinet',
    type: 'partner',
    category: 'security',
    categoryLabel: 'Ciberseguridad Perimetral',
    tier: 'Network Security Partner',
    oneLiner: 'Implementación de Firewalls FortiGate de próxima generación (NGFW) y protección contra amenazas Zero-Day.',
    deliverables: ['Firewalls FortiGate NGFW', 'Filtro Web e Inspección SSL', 'Protección contra Ransomware'],
    metric: '0 Brechas de Seguridad',
    status: 'Partner Certificado',
    badgeColor: '#000000',
    url: 'https://www.fortinet.com',
  },
  {
    id: 'cisco',
    name: 'Cisco Systems',
    type: 'partner',
    category: 'networks',
    categoryLabel: 'Infraestructura Empresarial',
    tier: 'Enterprise Networking Partner',
    oneLiner: 'Switches administrables Catalyst y Meraki para conectividad empresarial de ultra-baja latencia.',
    deliverables: ['Switches Cisco Catalyst & Meraki', 'Segmentación de VLANs', 'Wi-Fi 6 Empresarial'],
    metric: 'Gigabit Troncal Estable',
    status: 'Hardware Certificado',
    badgeColor: '#000000',
    url: 'https://www.cisco.com',
  },
  {
    id: 'conecta-tel',
    name: 'Conecta Telecomunicaciones',
    type: 'client',
    category: 'networks',
    categoryLabel: 'Telecomunicaciones',
    tier: 'Cliente Corporativo',
    oneLiner: 'Auditoría de ciberseguridad, blindaje de servidores y optimización de flujos de datos en tiempo real.',
    deliverables: ['Monitoreo de Red 24/7', 'Protección de Centro de Datos', 'Túneles VPN Cifrados'],
    metric: 'Latencia Reducida a <15ms',
    status: 'Caso de Éxito',
    badgeColor: '#000000',
    url: '#contacto',
  },
  {
    id: 'sectigo',
    name: 'Sectigo',
    type: 'partner',
    category: 'security',
    categoryLabel: 'Certificación & PKI',
    tier: 'Platinum SSL Provider',
    oneLiner: 'Emisión de certificados SSL/TLS empresariales, firma de código y cifrado de comunicaciones web.',
    deliverables: ['Certificados SSL Wildcard & EV', 'Firma de Código y Documentos', 'Infraestructura de Llave Pública'],
    metric: 'Cifrado SHA-256 Activo',
    status: 'Partner Oficial',
    badgeColor: '#000000',
    url: 'https://sectigo.com',
  },
  {
    id: 'panda',
    name: 'Panda Security / WatchGuard',
    type: 'partner',
    category: 'security',
    categoryLabel: 'Endpoint Security',
    tier: 'Authorized Gold Partner',
    oneLiner: 'Protección EDR perimetral contra ransomware, antivirus corporativo y filtrado web centralizado.',
    deliverables: ['Panda Endpoint Protection Plus', 'Monitoreo EDR en Tiempo Real', 'Control de Dispositivos USB'],
    metric: '100% Endpoints Blindados',
    status: 'Soporte Directo',
    badgeColor: '#000000',
    url: 'https://www.pandasecurity.com',
  },
  {
    id: 'sasait',
    name: 'SASAIT Service',
    type: 'client',
    category: 'ti',
    categoryLabel: 'Servicios de TI',
    tier: 'Cliente Corporativo',
    oneLiner: 'Soporte técnico integral 24/7, respaldo de datos confidenciales y continuidad operativa del negocio.',
    deliverables: ['Helpdesk Remoto Inmediato', 'Copias de Seguridad Diarias', 'Gestión de Parches de Seguridad'],
    metric: '99.98% Continuidad TI',
    status: 'Caso de Éxito',
    badgeColor: '#000000',
    url: '#contacto',
  },
  {
    id: 'anydesk',
    name: 'AnyDesk',
    type: 'partner',
    category: 'ti',
    categoryLabel: 'Acceso Remoto Seguro',
    tier: 'Enterprise Remote Partner',
    oneLiner: 'Plataforma oficial de asistencia remota cifrada TLS 1.2 para soporte técnico a nivel nacional e internacional.',
    deliverables: ['Licenciamiento AnyDesk Enterprise', 'Acceso No Supervisado Seguro', 'SLA de Respuesta < 15 Minutos'],
    metric: 'SLA < 15 Minutos',
    status: 'Licencia Enterprise',
    badgeColor: '#000000',
    url: 'https://anydesk.com',
  },
  {
    id: 'idea-proyectos',
    name: 'Idea Proyectos e Inversiones',
    type: 'client',
    category: 'cloud',
    categoryLabel: 'Inversiones & Consultoría',
    tier: 'Cliente Corporativo',
    oneLiner: 'Migración a la nube corporativa, licenciamiento de herramientas colaborativas y seguridad de bases de datos.',
    deliverables: ['Migración de Correos a Microsoft 365', 'Seguridad en OneDrive y SharePoint', 'Capacitación al Personal'],
    metric: 'Cero Pérdida de Datos',
    status: 'Caso de Éxito',
    badgeColor: '#000000',
    url: '#contacto',
  },
  {
    id: 'adobe',
    name: 'Adobe',
    type: 'partner',
    category: 'cloud',
    categoryLabel: 'Software Creativo',
    tier: 'Authorized Reseller',
    oneLiner: 'Distribución y licenciamiento oficial de Creative Cloud for Teams y soluciones documentales Acrobat Pro.',
    deliverables: ['Adobe Creative Cloud for Teams', 'Acrobat Sign y Flujo Documental', 'Consola Centralizada de Licencias'],
    metric: 'Licencias Oficiales Auditables',
    status: 'Canal Oficial',
    badgeColor: '#000000',
    url: 'https://www.adobe.com',
  },
];

const filterCategories = [
  { id: 'all', label: 'Todos los Registros' },
  { id: 'partner', label: 'Alianzas Oficiales & Big Tech' },
  { id: 'client', label: 'Clientes & Casos de Éxito' },
  { id: 'security', label: 'Ciberseguridad & Perímetro' },
  { id: 'networks', label: 'Redes & Conectividad' },
];

export default function Partners() {
  const [activeFilter, setActiveFilter] = useState('all');
  const [hoveredId, setHoveredId] = useState(null);
  const [selectedClient, setSelectedClient] = useState(null);
  const [visible, setVisible] = useState(true);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filteredItems = directoryItems.filter(item => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'partner') return item.type === 'partner';
    if (activeFilter === 'client') return item.type === 'client';
    return item.category === activeFilter;
  });

  return (
    <section className="partners section" id="partners" ref={sectionRef}>
      {/* Luces ambientales sutiles */}
      <div className="partners__ambient-glow partners__ambient-glow--left" />
      <div className="partners__ambient-glow partners__ambient-glow--right" />

      {/* Header Estilo Clay.global con animación de entrada */}
      <div className="container">
        <motion.div
          className="partners__header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label">
            <FiAward size={15} />
            <span>Alianzas Oficiales & Clientes</span>
          </div>

          <h2 className="section-title">
            Colaboramos con marcas líderes y <span className="gradient-text">corporaciones innovadoras</span>
          </h2>
          <p className="section-subtitle">
            Desde fabricantes globales con licencias y certificaciones oficiales, hasta empresas líderes que confían en HackAntony para mantener sus sistemas seguros y operativos 24/7.
          </p>
        </motion.div>
      </div>

      {/* Marquee Carrusel Continuo con Logos Vectoriales Oficiales */}
      <motion.div
        className="partners__marquee-wrap"
        initial={{ opacity: 0, scale: 0.97 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="partners__fade partners__fade--left" />
        <div className="partners__fade partners__fade--right" />
        <div className="partners__marquee">
          <div className="partners__track">
            {marqueePartners.map((partner, i) => {
              const LogoComponent = partner.component;
              return (
                <div key={`${partner.id}-${i}`} className="partner-marquee-pill">
                  <LogoComponent height={26} className="partner-marquee-svg" />
                  <span className="partner-marquee-tier">{partner.tier}</span>
                </div>
              );
            })}
          </div>
        </div>
      </motion.div>

      {/* Directorio Interactivo Estilo Clay.global/clients */}
      <div className="container partners__directory-container">
        {/* Filtros estilo Clay Pills con animación */}
        <motion.div
          className="partners__filters"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <div className="partners__filters-scroll">
            {filterCategories.map(cat => (
              <button
                key={cat.id}
                className={`partners__filter-btn ${activeFilter === cat.id ? 'active' : ''}`}
                onClick={() => setActiveFilter(cat.id)}
                type="button"
              >
                {cat.id === 'all' && <FiFilter size={13} />}
                {cat.id === 'partner' && <FiAward size={13} />}
                {cat.id === 'client' && <FiBriefcase size={13} />}
                {cat.id === 'security' && <FiShield size={13} />}
                {cat.id === 'networks' && <FiZap size={13} />}
                <span>{cat.label}</span>
                <span className="partners__filter-count">
                  {cat.id === 'all' 
                    ? directoryItems.length 
                    : directoryItems.filter(item => 
                        cat.id === 'partner' ? item.type === 'partner' :
                        cat.id === 'client' ? item.type === 'client' :
                        item.category === cat.id
                      ).length}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Lista del Directorio con animación escalonada al scroll */}
        <div 
          className={`partners__directory-list ${hoveredId ? 'has-hovered' : ''}`}
          onMouseLeave={() => setHoveredId(null)}
        >
          {filteredItems.map((item, idx) => {
            const isHovered = hoveredId === item.id;
            return (
              <motion.div 
                key={item.id} 
                className={`directory-row ${isHovered ? 'directory-row--active' : ''}`}
                initial={{ opacity: 0, x: -30, y: 15 }}
                whileInView={{ opacity: 1, x: 0, y: 0 }}
                viewport={{ once: false, amount: 0.15 }}
                transition={{
                  duration: 0.55,
                  delay: Math.min(idx * 0.05, 0.35),
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -3, scale: 1.008 }}
                onMouseEnter={() => setHoveredId(item.id)}
                onClick={() => setSelectedClient(item)}
              >
                <div className="directory-row__main">
                  <div className="directory-row__identity">
                    <div 
                      className="directory-row__indicator" 
                      style={{ backgroundColor: item.badgeColor === '#000000' ? '#2563EB' : item.badgeColor }} 
                    />
                    <div>
                      <h3 className="directory-row__name">{item.name}</h3>
                      <div className="directory-row__tags">
                        <span className="directory-tag directory-tag--type">
                          {item.type === 'partner' ? 'Alianza Oficial' : 'Cliente Corporativo'}
                        </span>
                        <span className="directory-tag">{item.categoryLabel}</span>
                      </div>
                    </div>
                  </div>

                  <p className="directory-row__desc">
                    {item.oneLiner}
                  </p>
                </div>

                <div className="directory-row__meta">
                  <div className="directory-row__metric-pill">
                    <FiCheckCircle size={13} />
                    <span>{item.metric}</span>
                  </div>

                  <a 
                    href={`https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20solicitar%20informaci%C3%B3n%20sobre%20soluciones%20relacionadas%20a%20${encodeURIComponent(item.name)}.`}
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="directory-row__action"
                    onClick={(e) => e.stopPropagation()}
                    title={`Consultar por soluciones ${item.name}`}
                  >
                    <span>Consultar</span>
                    <FiArrowRight size={13} />
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Modal / Drawer de Detalle de Cliente o Partner (Clay Interactive Drawer) */}
      {selectedClient && (
        <div className="client-modal-backdrop" onClick={() => setSelectedClient(null)}>
          <div className="client-modal-card" onClick={(e) => e.stopPropagation()}>
            <button 
              className="client-modal-close" 
              onClick={() => setSelectedClient(null)}
              aria-label="Cerrar modal"
            >
              <FiX size={20} />
            </button>

            <div className="client-modal-header">
              <span className="client-modal-tag" style={{ color: selectedClient.badgeColor, backgroundColor: `${selectedClient.badgeColor}15` }}>
                {selectedClient.status}
              </span>
              <h3 className="client-modal-title">{selectedClient.name}</h3>
              <span className="client-modal-category">{selectedClient.categoryLabel}</span>
            </div>

            <p className="client-modal-desc">
              {selectedClient.oneLiner}
            </p>

            <div className="client-modal-deliverables">
              <h4>Alcance Técnico & Entregables:</h4>
              <ul>
                {selectedClient.deliverables.map((del, i) => (
                  <li key={i}>
                    <FiCheckCircle className="client-modal-check" />
                    <span>{del}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="client-modal-metric-box">
              <span className="client-modal-metric-label">Métrica Destacada:</span>
              <strong className="client-modal-metric-value">{selectedClient.metric}</strong>
            </div>

            <div className="client-modal-actions">
              <a
                href={`https://wa.me/51994520017?text=Hola%20Hackthony%2C%20deseo%20una%20propuesta%20similar%20a%20la%20de%20${encodeURIComponent(selectedClient.name)}.`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary client-modal-btn"
              >
                <span>Cotizar Solución Similar</span>
                <FiArrowRight size={16} />
              </a>
              {selectedClient.url.startsWith('http') && (
                <a
                  href={selectedClient.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  <FiExternalLink size={15} />
                  <span>Sitio Oficial</span>
                </a>
              )}
            </div>
          </div>
        </div>
      )}

    </section>
  );
}

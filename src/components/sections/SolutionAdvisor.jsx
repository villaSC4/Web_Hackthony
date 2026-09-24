import { useState } from 'react';
import { FiSliders, FiCheckCircle, FiShield, FiClock, FiPhone, FiCpu } from 'react-icons/fi';
import './SolutionAdvisor.css';

const companySizes = [
  { id: 'small', label: '1 a 10 Equipos', desc: 'Pequeñas empresas & startups' },
  { id: 'medium', label: '11 a 50 Equipos', desc: 'Pymes en crecimiento' },
  { id: 'large', label: '50+ Equipos', desc: 'Corporativos y múltiples sedes' },
];

const businessNeeds = [
  {
    id: 'soporte',
    icon: '💻',
    title: 'Mesa de Ayuda & Soporte Continuo',
    desc: 'Atención técnica inmediata a usuarios, mantenimiento y prevención.'
  },
  {
    id: 'seguridad',
    icon: '🛡️',
    title: 'Ciberseguridad & Firewall Perimetral',
    desc: 'Protección contra ransomware, virus, filtraciones y accesos no autorizados.'
  },
  {
    id: 'redes',
    icon: '🌐',
    title: 'Infraestructura MikroTik & Servidores',
    desc: 'Redes cableadas, Wi-Fi empresarial, VPN y servidores virtuales.'
  },
  {
    id: 'cloud',
    icon: '☁️',
    title: 'Licenciamiento Microsoft 365 & Cloud',
    desc: 'Correo corporativo seguro, Azure, copias de seguridad y auditoría legal.'
  },
];

const recommendations = {
  'small-soporte': {
    name: 'Plan Soporte Esencial Pyme',
    sla: 'Respuesta en menos de 30 min',
    coverage: 'Soporte remoto ilimitado + visitas preventivas mensuales',
    techs: ['AnyDesk Enterprise', 'Helpdesk 8x5', 'Mantenimiento Preventivo'],
    benefit: 'Tus empleados nunca se detendrán por fallas de computadoras o impresoras.'
  },
  'small-seguridad': {
    name: 'Plan Blindaje Pyme Starter',
    sla: 'Protección 24/7 en tiempo real',
    coverage: 'Antivirus corporativo Panda / WatchGuard + Firewall MikroTik básico',
    techs: ['Panda Endpoint Protection', 'Router MikroTik hEX', 'Cifrado SSL Sectigo'],
    benefit: 'Protege tu facturación y base de datos de clientes contra robo y virus.'
  },
  'small-redes': {
    name: 'Conectividad & Wi-Fi Estable',
    sla: '99.9% Uptime de conexión',
    coverage: 'Configuración MikroTik con balanceo de carga para que no se caiga internet',
    techs: ['MikroTik RouterOS', 'Access Points Profesionales', 'VPN Remota Segura'],
    benefit: 'Internet veloz y estable para todo tu equipo sin cortes en llamadas o videollamadas.'
  },
  'small-cloud': {
    name: 'Productividad Microsoft 365',
    sla: 'Activación y migración en 24h',
    coverage: 'Configuración de correos corporativos @tuempresa.com y OneDrive seguro',
    techs: ['Microsoft 365 Business', 'Protección Antispam', 'Copias en la Nube'],
    benefit: 'Imagen profesional y almacenamiento en la nube sin pérdidas de correos.'
  },
  'medium-soporte': {
    name: 'Plan Soporte Corporativo Pro',
    sla: 'Respuesta en menos de 15 min',
    coverage: 'Mesa de ayuda dedicada, soporte remoto ilimitado + técnico asignado en sitio',
    techs: ['Mesa de Ayuda 8x5 / 7x24', 'AnyDesk Pro', 'Auditoría Mensual de Hardware'],
    benefit: 'Reducción del 45% en tiempos de inactividad técnica de tus colaboradores.'
  },
  'medium-seguridad': {
    name: 'Plan Ciberseguridad Integral',
    sla: 'Monitoreo perimetral continuo',
    coverage: 'Firewall MikroTik CCR + EDR Panda WatchGuard con bloqueo de amenazas',
    techs: ['WatchGuard EDR', 'MikroTik CCR Series', 'Filtro Web de Contenidos', 'VPN Site-to-Site'],
    benefit: 'Cumplimiento normativo y tranquilidad total ante ciberataques dirigidos.'
  },
  'medium-redes': {
    name: 'Infraestructura Empresarial Confiable',
    sla: 'Redundancia y conmutación por error',
    coverage: 'Diseño de red corporativa, VLANs segmentadas y servidores virtuales',
    techs: ['Switches Administrables', 'MikroTik Cloud Router', 'Servidores VPS / Azure'],
    benefit: 'Seguridad departamental: Finanzas, Recursos Humanos y Operaciones aislados y veloces.'
  },
  'medium-cloud': {
    name: 'Transformación Cloud & Colaboración',
    sla: 'Disponibilidad 99.98%',
    coverage: 'Despliegue de Microsoft Teams, SharePoint corporativo y Azure Active Directory',
    techs: ['Microsoft Azure', 'Microsoft 365 E3/Business', 'Backup Híbrido Diario'],
    benefit: 'Acceso seguro a los archivos de la empresa desde cualquier lugar y dispositivo.'
  },
  'large-soporte': {
    name: 'Outsourcing TI & Gestión Total 24/7',
    sla: 'Atención crítica inmediata < 10 min',
    coverage: 'Ingeniero residente o cuadrilla técnica dedicada, mesa de ayuda 24x7',
    techs: ['Mesa de Ayuda 7x24 NOC', 'Gestión de Inventario TI', 'SLA Contractual con Penalidades'],
    benefit: 'Todo el departamento de tecnología delegado a un socio experto con garantía total.'
  },
  'large-seguridad': {
    name: 'Blindaje Perimetral & SOC Corporativo',
    sla: 'Protección perimetral de grado militar',
    coverage: 'Arquitectura Zero Trust, Firewall de próxima generación y auditoría forense',
    techs: ['Fortinet / WatchGuard Enterprise', 'MikroTik Cloud Core', 'Sectigo PKI', 'Backups Inmutables'],
    benefit: 'Continuidad de negocio certificada, blindaje ante auditorías y protección de activos clave.'
  },
  'large-redes': {
    name: 'Redes Multisucursal de Alta Disponibilidad',
    sla: 'Conectividad ininterrumpida SD-WAN',
    coverage: 'Interconexión de sedes a nivel nacional e internacional con túneles seguros',
    techs: ['SD-WAN MikroTik', 'Fibra Óptica Dedicada', 'Enlaces Inalámbricos de Respaldo'],
    benefit: 'Sedes en Perú y el extranjero conectadas en tiempo real sin latencia ni caídas.'
  },
  'large-cloud': {
    name: 'Infraestructura Híbrida & Data Center Cloud',
    sla: 'Arquitectura Enterprise Multi-Cloud',
    coverage: 'Migración masiva de servidores físicos a Azure / Cloud privado con replicación',
    techs: ['Microsoft Azure Enterprise', 'Licenciamiento por Volumen', 'Disaster Recovery Plan'],
    benefit: 'Ahorro masivo en servidores físicos y escalabilidad instantánea para la compañía.'
  },
};

export default function SolutionAdvisor() {
  const [selectedSize, setSelectedSize] = useState('medium');
  const [selectedNeed, setSelectedNeed] = useState('soporte');

  const key = `${selectedSize}-${selectedNeed}`;
  const plan = recommendations[key] || recommendations['medium-soporte'];

  const whatsappMessage = `Hola Hackthony Support, utilicé su Asesor de Soluciones para mi empresa (${companySizes.find(s => s.id === selectedSize)?.label}, necesidad: ${businessNeeds.find(n => n.id === selectedNeed)?.title}). Me interesa cotizar el "${plan.name}".`;
  const whatsappUrl = `https://wa.me/51994520017?text=${encodeURIComponent(whatsappMessage)}`;

  return (
    <section className="solution-advisor section" id="soluciones">
      <div className="container">
        {/* Cabecera */}
        <div className="solution-advisor__header">
          <div className="solution-advisor__tag">
            <FiSliders size={16} />
            <span>Herramienta Interactiva para Empresas</span>
          </div>

          <h2 className="section-title">
            Encuentra la Solución TI <span className="gradient-text">Ideal para tu Negocio</span>
          </h2>

          <p className="section-subtitle">
            Selecciona el tamaño de tu organización y tu necesidad principal para ver
            una propuesta técnica adaptada con tecnologías certificadas y tiempo de respuesta estimado.
          </p>
        </div>

        {/* Contenedor del Asesor */}
        <div className="solution-advisor__grid">
          {/* Lado Izquierdo: Selectores */}
          <div className="solution-advisor__controls">
            {/* Paso 1: Tamaño */}
            <div className="solution-advisor__step">
              <span className="solution-advisor__step-label">Paso 1: ¿Cuántos equipos o colaboradores tienes?</span>
              <div className="solution-advisor__size-options">
                {companySizes.map((size) => (
                  <button
                    key={size.id}
                    type="button"
                    className={`solution-advisor__size-btn ${selectedSize === size.id ? 'active' : ''}`}
                    onClick={() => setSelectedSize(size.id)}
                  >
                    <span className="size-label">{size.label}</span>
                    <span className="size-desc">{size.desc}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Paso 2: Necesidad */}
            <div className="solution-advisor__step">
              <span className="solution-advisor__step-label">Paso 2: ¿Cuál es tu prioridad principal?</span>
              <div className="solution-advisor__need-options">
                {businessNeeds.map((need) => (
                  <button
                    key={need.id}
                    type="button"
                    className={`solution-advisor__need-btn ${selectedNeed === need.id ? 'active' : ''}`}
                    onClick={() => setSelectedNeed(need.id)}
                  >
                    <span className="need-icon">{need.icon}</span>
                    <div className="need-text">
                      <strong>{need.title}</strong>
                      <p>{need.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Lado Derecho: Propuesta y Recomendación para el Cliente */}
          <div className="solution-advisor__result">
            <div className="solution-advisor__result-card">
              <div className="solution-advisor__result-top">
                <span className="solution-advisor__plan-tag">Propuesta Recomendada</span>
                <h3 className="solution-advisor__plan-name">{plan.name}</h3>
                <p className="solution-advisor__plan-benefit">{plan.benefit}</p>
              </div>

              <div className="solution-advisor__result-specs">
                <div className="spec-row">
                  <FiClock className="spec-icon" />
                  <div>
                    <span className="spec-title">SLA de Respuesta:</span>
                    <strong className="spec-val">{plan.sla}</strong>
                  </div>
                </div>

                <div className="spec-row">
                  <FiShield className="spec-icon" />
                  <div>
                    <span className="spec-title">Alcance del Servicio:</span>
                    <strong className="spec-val">{plan.coverage}</strong>
                  </div>
                </div>

                <div className="spec-row">
                  <FiCpu className="spec-icon" />
                  <div>
                    <span className="spec-title">Tecnologías Implementadas:</span>
                    <div className="spec-tech-pills">
                      {plan.techs.map((tech, idx) => (
                        <span key={idx} className="spec-tech-pill">
                          <FiCheckCircle size={11} />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Botón directo a WhatsApp de propuesta */}
              <div className="solution-advisor__result-action">
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-primary solution-advisor__cta-btn"
                >
                  <FiPhone size={16} />
                  <span>Cotizar Este Plan por WhatsApp</span>
                </a>
                <span className="solution-advisor__cta-guarantee">
                  ✓ Asesoría comercial sin costo · Respuesta en menos de 15 minutos
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

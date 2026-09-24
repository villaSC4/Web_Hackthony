import { motion } from 'framer-motion';
import {
  FiShield,
  FiUsers,
  FiAward,
  FiSettings,
  FiStar,
  FiGlobe,
  FiCheck,
  FiArrowRight,
  FiZap,
} from 'react-icons/fi';
import { FaWhatsapp } from 'react-icons/fa';
import './WhyUs.css';

const whyUsFeatures = [
  {
    number: '01',
    icon: FiShield,
    tag: 'Soporte Certificado',
    title: 'Garantía & Respaldo Oficial',
    description:
      'Nuestros productos y servicios cuentan con garantía de atención inmediata de nuestro equipo de soporte técnico y respaldo directo de cada fabricante.',
    highlight: 'Garantía escrita & reemplazo inmediato',
  },
  {
    number: '02',
    icon: FiUsers,
    tag: 'Consultoría 1 a 1',
    title: 'Asesoría Comercial Especializada',
    description:
      'Nuestra asesoría comercial evalúa cada requerimiento técnico y diseña la solución óptima utilizando las herramientas de TI más avanzadas del mercado.',
    highlight: 'Diagnóstico y arquitectura sin costo',
  },
  {
    number: '03',
    icon: FiAward,
    tag: 'Ingenieros Senior',
    title: 'Personal Técnico Calificado',
    description:
      'Nuestros ingenieros cuentan con certificaciones oficiales de primer nivel y proyectos de gran envergadura que respaldan la excelencia técnica en cada entrega.',
    highlight: 'Certificados en MikroTik, Fortinet & Azure',
  },
  {
    number: '04',
    icon: FiSettings,
    tag: 'Mejores Prácticas',
    title: 'Metodología Ágil y Rigurosa',
    description:
      'Implementamos metodologías de trabajo alineadas a las mejores prácticas en ingeniería de TI para garantizar despliegues seguros y resultados medibles.',
    highlight: 'Frameworks ITIL & gestión continua',
  },
  {
    number: '05',
    icon: FiStar,
    tag: 'Compromiso Real',
    title: 'Clientes Satisfechos & Post-Venta',
    description:
      'Entregamos cada proyecto y servicio en los plazos acordados, respaldados por una atención post-venta dedicada y soporte preventivo continuo 24/7.',
    highlight: '+500 empresas activas y 99.4% CSAT',
  },
  {
    number: '06',
    icon: FiGlobe,
    tag: 'Sin Fronteras',
    title: 'Alcance & Presencia Internacional',
    description:
      'Nuestra infraestructura de soporte opera con cobertura a nivel nacional e internacional. Con herramientas cloud seguras, no existen límites geográficos.',
    highlight: 'Cobertura en Perú, España y Latam',
  },
];

export default function WhyUs() {
  return (
    <section className="whyus-modern" id="por-que-nosotros">
      {/* Luces sutiles de fondo */}
      <div className="whyus-modern__ambient-glow whyus-modern__ambient-glow--top" />
      <div className="whyus-modern__ambient-glow whyus-modern__ambient-glow--bottom" />

      <div className="container">
        {/* Cabecera Principal */}
        <motion.div
          className="whyus-modern__header"
          initial={{ opacity: 0, y: 35 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.25 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="whyus-modern__badge">
            <FiZap className="whyus-modern__badge-icon" size={14} />
            <span>Nuestra Propuesta de Valor</span>
          </div>

          <h2 className="whyus-modern__title">
            ¿Por qué elegir <span className="whyus-modern__title-accent">HackthonySupport</span>?
          </h2>

          <p className="whyus-modern__subtitle">
            Nos diferenciamos por nuestra experiencia, metodología y compromiso con cada cliente.
            Conoce las razones por las que empresas en 5 países confían en nosotros.
          </p>
        </motion.div>

        {/* Cuadrícula de 6 Tarjetas con Entrada Escalonada */}
        <div className="whyus-modern__grid">
          {whyUsFeatures.map((item, idx) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.number}
                className="whyus-card-v2"
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: false, amount: 0.18 }}
                transition={{
                  duration: 0.65,
                  delay: idx * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                whileHover={{ y: -6 }}
              >
                {/* Número marca de agua estilizado */}
                <span className="whyus-card-v2__watermark">{item.number}</span>

                {/* Encabezado de la tarjeta con Icono y Tag */}
                <div className="whyus-card-v2__top">
                  <div className="whyus-card-v2__icon-wrap">
                    <Icon size={24} />
                  </div>
                  <span className="whyus-card-v2__tag">{item.tag}</span>
                </div>

                {/* Título y Descripción */}
                <h3 className="whyus-card-v2__title">{item.title}</h3>
                <p className="whyus-card-v2__desc">{item.description}</p>

                {/* Chip de Valor Agregado */}
                <div className="whyus-card-v2__highlight">
                  <FiCheck className="whyus-card-v2__check-icon" size={14} />
                  <span>{item.highlight}</span>
                </div>

                {/* Línea de brillo inferior en hover */}
                <div className="whyus-card-v2__border-glow" />
              </motion.div>
            );
          })}
        </div>

        {/* Barra de Llamado a la Acción Inferior */}
        <motion.div
          className="whyus-modern__cta-bar"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.2 }}
          transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="whyus-modern__cta-info">
            <span className="whyus-modern__cta-label">ATENCIÓN CORPORATIVA PERSONALIZADA</span>
            <h4 className="whyus-modern__cta-heading">
              ¿Listo para elevar la seguridad y tecnología de tu empresa?
            </h4>
          </div>

          <a
            href="https://wa.me/51994520017?text=Hola%20Hackthony%20Support%2C%20quisiera%20conversar%20con%20un%20asesor%20especializado."
            target="_blank"
            rel="noopener noreferrer"
            className="whyus-modern__cta-btn"
          >
            <FaWhatsapp size={17} />
            <span>Hablar con un Asesor</span>
            <FiArrowRight size={15} />
          </a>
        </motion.div>

      </div>
    </section>
  );
}

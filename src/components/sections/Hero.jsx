import { useState } from 'react';
import {
  FiArrowRight,
  FiChevronDown,
  FiShield,
  FiUsers,
  FiClock,
  FiCheckCircle
} from 'react-icons/fi';
import videoWebSrc from '../../video/Video_web.mp4';
import { countryData } from '../ui/CountryFlags';
import './Hero.css';

export default function Hero() {
  const [activeCountry, setActiveCountry] = useState(countryData[0]);

  const whatsappUrl =
    'https://wa.me/51994520017?text=Hola%20Hackthony%20Support%2C%20solicito%20un%20diagn%C3%B3stico%20t%C3%A9cnico%20y%20asesor%C3%ADa%20para%20mi%20empresa.';

  // Las 3 tarjetas fundacionales inspiradas en el sitio original (Asesoría comercial, Clientes satisfechos, Garantía)
  const foundationCards = [
    {
      id: 'asesoria',
      icon: <FiShield className="hero__card-icon" />,
      tag: '12+ Años de Trayectoria',
      tagType: 'neutral',
      title: 'Asesoría Especializada',
      subtitle: 'Consultoría TI & Ciberseguridad',
      description:
        'Asesoramiento técnico personalizado por ingenieros certificados. Blindaje perimetral activo frente a amenazas y auditorías de vulnerabilidad.',
      highlight: 'Soporte MikroTik & Fortinet'
    },
    {
      id: 'clientes',
      icon: <FiUsers className="hero__card-icon" />,
      tag: '99.9% Uptime Garantizado',
      tagType: 'featured',
      title: 'Clientes Satisfechos',
      subtitle: '+500 Empresas Respaldadas',
      description:
        'Continuidad operativa y alta disponibilidad 24/7 en servidores cloud, enlaces de fibra y redes corporativas de misión crítica.',
      highlight: 'Continuidad Operativa 24/7'
    },
    {
      id: 'garantia',
      icon: <FiClock className="hero__card-icon" />,
      tag: 'SLA < 15 Minutos',
      tagType: 'neutral',
      title: 'Garantía & Respaldo SLA',
      subtitle: 'Respuesta Inmediata',
      description:
        'Mesa de ayuda helpdesk con tiempos de respuesta menores a 15 minutos. Soporte presencial o remoto y respaldo directo de fabricantes.',
      highlight: 'Mesa de Ayuda Helpdesk'
    }
  ];

  return (
    <section className="hero" id="inicio">
      {/* Video_web.mp4 — Fondo cinematográfico del hero */}
      <div className="hero__video-bg">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="hero__video"
          src={videoWebSrc}
          preload="auto"
        />
        <div className="hero__video-overlay" />
      </div>

      {/* Halos y retícula decorativa */}
      <div className="hero__ambient hero__ambient--1" />
      <div className="hero__ambient hero__ambient--2" />
      <div className="hero__grid-pattern" />

      <div className="container hero__container">
        {/* BLOQUE CENTRAL (Inspirado en la composición original) */}
        <div className="hero__content">
          
          {/* BANDERAS CIRCULARES PROMINENTES (ESENCIA DEL ORIGINAL) */}
          <div className="hero__flags-wrapper">
            <div className="hero__flags-row" role="tablist" aria-label="Países con presencia activa">
              {countryData.map((country) => {
                const FlagComponent = country.flag;
                const isSelected = activeCountry.code === country.code;
                return (
                  <button
                    key={country.code}
                    type="button"
                    onClick={() => setActiveCountry(country)}
                    className={`hero__flag-disc ${isSelected ? 'hero__flag-disc--active' : ''}`}
                    title={`${country.name}: ${country.city} - ${country.detail}`}
                    aria-label={`Seleccionar ${country.name}`}
                  >
                    <FlagComponent
                      width="100%"
                      height="100%"
                      preserveAspectRatio="xMidYMid slice"
                      style={{ borderRadius: '50%', boxShadow: 'none' }}
                    />
                    {country.code === 'pe' && (
                      <span className="hero__flag-badge-sede" title="Sede Principal">SEDE</span>
                    )}
                  </button>
                );
              })}
            </div>
          </div>

          {/* TÍTULO PRINCIPAL — Exactamente como en la web original */}
          <h1 className="hero__title">
            Soluciones tecnológicas{' '}
            <span className="hero__title-accent">adaptadas</span> a tus necesidades
          </h1>

          {/* SUBTÍTULO — Texto original de la web */}
          <p className="hero__subtitle">
            Brindamos soluciones tecnológicas que ayudan a las empresas a innovar,
            automatizar y crecer. Más de <strong>12 años de experiencia</strong> respaldan nuestro
            trabajo, brindando acceso a asesoramiento técnico experto.
          </p>

          {/* BOTONES DE ACCIÓN */}
          <div className="hero__actions">
            {/* Botón azul principal — "Ver Servicios" como en el original */}
            <a href="#servicios" className="btn hero__btn-cta">
              <FiChevronDown size={17} className="hero__btn-icon-bounce" />
              <span>Ver Servicios</span>
            </a>

            {/* Botón outline — Diagnóstico gratuito */}
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn hero__btn-services"
            >
              <span>Solicitar Diagnóstico</span>
              <FiArrowRight size={16} />
            </a>
          </div>
        </div>

        {/* 3 BLOQUES FUNDACIONALES EN LA BASE (Directamente del original: Asesoría, Clientes Satisfechos, Garantía) */}
        <div className="hero__foundation">
          <div className="hero__foundation-grid">
            {foundationCards.map((card) => {
              const isCenter = card.id === 'clientes';
              return (
                <div
                  key={card.id}
                  className={`hero__foundation-card ${isCenter ? 'hero__foundation-card--featured' : ''}`}
                >
                  <div className="hero__card-top">
                    <div className="hero__card-icon-wrap">{card.icon}</div>
                    <span className={`hero__card-tag hero__card-tag--${card.tagType}`}>
                      {card.tag}
                    </span>
                  </div>

                  <h3 className="hero__card-title">{card.title}</h3>
                  <div className="hero__card-subtitle">{card.subtitle}</div>
                  <p className="hero__card-desc">{card.description}</p>

                  <div className="hero__card-footer">
                    <FiCheckCircle className="hero__card-check-icon" />
                    <span>{card.highlight}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}


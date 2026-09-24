import { useEffect, useRef, useState } from 'react';
import {
  FiShield, FiUsers, FiClock, FiActivity,
  FiCheckCircle, FiAward, FiServer, FiZap
} from 'react-icons/fi';
import './Stats.css';

function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime = null;
    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const countYears = useCountUp(12, 1800, visible);
  const countClients = useCountUp(500, 2200, visible);
  const countProjects = useCountUp(1000, 2400, visible);

  const statsData = [
    {
      id: 'years',
      number: countYears,
      suffix: '+',
      title: 'Años de Trayectoria',
      subtitle: 'Liderazgo en Infraestructura TI',
      tag: 'Desde 2012',
      tagColor: 'neutral',
      icon: FiAward,
      metricDetail: 'Alianzas Directas con Fabricantes',
      highlight: 'Microsoft · MikroTik · Fortinet'
    },
    {
      id: 'clients',
      number: countClients,
      suffix: '+',
      title: 'Empresas Protegidas',
      subtitle: 'Clientes Satisfechos en la Región',
      tag: 'CSAT 4.98 / 5.0 ★',
      tagColor: 'neutral',
      icon: FiUsers,
      metricDetail: 'Tasa de Renovación: 98.4%',
      highlight: 'Soporte Continuo & Proactivo'
    },
    {
      id: 'uptime',
      number: '99.99',
      suffix: '%',
      title: 'Uptime SLA Garantizado',
      subtitle: 'Alta Disponibilidad en Servidores',
      tag: 'Monitoreo 24/7/365',
      tagColor: 'neutral',
      icon: FiActivity,
      hasWaveform: true,
      metricDetail: 'Conmutación Automática < 1ms',
      highlight: 'Enlaces de Fibra Redundantes'
    },
    {
      id: 'sla',
      number: '< 15',
      suffix: 'm',
      title: 'Tiempo de Respuesta',
      subtitle: 'Mesa de Ayuda Helpdesk Inmediata',
      tag: 'SLA Crítico Garantizado',
      tagColor: 'neutral',
      icon: FiClock,
      metricDetail: 'Atención AnyDesk Enterprise',
      highlight: 'Ingenieros Conectados 24/7'
    }
  ];

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="stats-section__glow" />

      <div className="container">
        <div className="stats-grid">
          {statsData.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.id}
                className="stat-card"
                style={{ animationDelay: `${i * 0.1}s` }}
              >
                {/* Header de la tarjeta */}
                <div className="stat-card__top">
                  <div className="stat-card__icon-box">
                    <Icon size={20} />
                  </div>
                  <span className={`stat-card__tag stat-card__tag--${stat.tagColor}`}>
                    {stat.tag}
                  </span>
                </div>

                {/* Número animado */}
                <div className="stat-card__value">
                  <span className="stat-card__number">{stat.number}</span>
                  <span className="stat-card__suffix">{stat.suffix}</span>
                </div>

                {/* Título y subtítulo */}
                <h3 className="stat-card__title">{stat.title}</h3>
                <p className="stat-card__subtitle">{stat.subtitle}</p>

                {/* Onda de osciloscopio en Uptime o barra de progreso */}
                {stat.hasWaveform ? (
                  <div className="stat-card__waveform-wrap">
                    <svg
                      viewBox="0 0 160 30"
                      className="stat-card__waveform"
                      preserveAspectRatio="none"
                    >
                      <path
                        d="M0,15 L25,15 L35,5 L45,25 L55,10 L65,20 L75,15 L100,15 L110,3 L120,27 L130,12 L140,18 L160,15"
                        fill="none"
                        stroke="#000000"
                        strokeWidth="2"
                        className="pulse-path"
                      />
                    </svg>
                    <span className="stat-card__waveform-label">Pulso de Red Óptimo</span>
                  </div>
                ) : (
                  <div className="stat-card__divider" />
                )}

                {/* Pie de métrica */}
                <div className="stat-card__footer">
                  <FiCheckCircle className="stat-card__check" size={13} />
                  <span>{stat.highlight}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

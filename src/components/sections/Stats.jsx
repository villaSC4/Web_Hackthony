import { useEffect, useRef, useState } from 'react';
import './Stats.css';

// Hook personalizado para animación incremental suave de números
function useCountUp(target, duration = 2000, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start) return;
    let startTime = null;
    let animationFrameId;

    const step = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      // Easing out cubic ultra suave
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) {
        animationFrameId = requestAnimationFrame(step);
      }
    };

    animationFrameId = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrameId);
  }, [target, duration, start]);

  return count;
}

export default function Stats() {
  const [visible, setVisible] = useState(false);
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
        }
      },
      { threshold: 0.2 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // Animaciones incrementales para los 4 números
  const countProjects = useCountUp(85, 2000, visible);
  const countClients = useCountUp(100, 2200, visible);
  const countYears = useCountUp(12, 1800, visible);
  const countQuality = useCountUp(100, 2400, visible);

  const stats = [
    {
      id: 'projects',
      value: countProjects,
      suffix: '+',
      label: 'Proyectos Entregados',
    },
    {
      id: 'clients',
      value: countClients,
      suffix: '+',
      label: 'Clientes satisfechos',
    },
    {
      id: 'years',
      value: countYears,
      suffix: '+',
      label: 'Años de experiencia',
    },
    {
      id: 'quality',
      value: countQuality,
      suffix: '%',
      label: 'Personal Calificado',
    },
  ];

  return (
    <section className="stats-section" ref={sectionRef}>
      <div className="container">
        <div className="stats-minimal-grid">
          {stats.map((stat) => (
            <div key={stat.id} className="stat-minimal-item">
              <div className="stat-minimal-number">
                <span>{stat.value}</span>
                <span className="stat-minimal-suffix">{stat.suffix}</span>
              </div>
              <p className="stat-minimal-label">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { useRef, useEffect, useState } from 'react';
import {
  FiShield, FiUsers, FiUser, FiSettings, FiStar, FiGlobe
} from 'react-icons/fi';
import { whyUs } from '../../data/company';
import './WhyUs.css';

const iconMap = {
  FaShieldAlt: FiShield,
  FaHandshake: FiUsers,
  FaUserTie: FiUser,
  FaCogs: FiSettings,
  FaStar: FiStar,
  FaGlobeAmericas: FiGlobe,
};

export default function WhyUs() {
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

  return (
    <section className="whyus section" id="por-que-nosotros" ref={sectionRef}>
      <div className="whyus__bg" />
      <div className="whyus__pattern" />

      <div className="container">
        <div className={`whyus__header ${visible ? 'whyus__header--visible' : ''}`}>
          <p className="section-label">Nuestra Propuesta</p>
          <h2 className="section-title">
            ¿Por qué elegir{' '}
            <span className="gradient-text">HackthonySupport</span>?
          </h2>
          <p className="section-subtitle">
            Nos diferenciamos por nuestra experiencia, metodología y compromiso
            con cada cliente. Conoce las razones por las que empresas en 5 países
            confían en nosotros.
          </p>
        </div>

        <div className="whyus__grid">
          {whyUs.map((item, i) => {
            const Icon = iconMap[item.icon] || FiShield;
            return (
              <div
                key={i}
                className={`whyus__card ${visible ? 'whyus__card--visible' : ''}`}
                style={{
                  '--item-color': item.color,
                  transitionDelay: `${i * 0.08}s`
                }}
              >
                <div className="whyus__card-icon">
                  <Icon size={26} />
                </div>
                <div className="whyus__card-content">
                  <h3 className="whyus__card-title">{item.title}</h3>
                  <p className="whyus__card-desc">{item.description}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

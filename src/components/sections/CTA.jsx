import { FiPhone, FiArrowRight } from 'react-icons/fi';
import './CTA.css';

export default function CTA() {
  const whatsappUrl = 'https://wa.me/51994520017?text=Hola%2C%20me%20gustaría%20iniciar%20un%20proyecto%20con%20HackthonySupport';
  const callUrl = 'tel:+51994520017';

  return (
    <section className="cta-section">
      {/* Bg */}
      <div className="cta-section__bg" />
      <div className="cta-section__glow" />
      <div className="cta-section__grid" />

      <div className="container cta-section__content">
        <div className="cta-section__badge">
          <span className="cta-section__badge-dot" />
          Disponible ahora
        </div>

        <h2 className="cta-section__title">
          ¿Listo para llevar tu empresa al{' '}
          <span className="cta-section__title-accent">siguiente nivel</span>?
        </h2>

        <p className="cta-section__subtitle">
          Nuestro equipo de expertos está disponible para ayudarte a encontrar
          la solución tecnológica perfecta para tu negocio.
        </p>

        <div className="cta-section__btns">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-primary cta-section__btn-main"
          >
            Iniciar Proyecto
            <FiArrowRight size={18} />
          </a>
          <a href={callUrl} className="btn btn-outline">
            <FiPhone size={18} />
            Realizar Llamada
          </a>
        </div>

        {/* Stats strip */}
        <div className="cta-section__strip">
          {[
            { value: '< 2h', label: 'Tiempo de respuesta' },
            { value: '100%', label: 'Satisfacción garantizada' },
            { value: '24/7', label: 'Soporte disponible' },
          ].map((item, i) => (
            <div key={i} className="cta-section__strip-item">
              <span className="cta-section__strip-value">{item.value}</span>
              <span className="cta-section__strip-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

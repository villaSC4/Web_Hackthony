import { useState, useRef, useEffect } from 'react';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import { testimonials } from '../../data/testimonials';
import './Testimonials.css';

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const [animating, setAnimating] = useState(false);
  const sectionRef = useRef(null);
  const autoRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    autoRef.current = setInterval(() => {
      goNext();
    }, 5000);
    return () => clearInterval(autoRef.current);
  }, [current]);

  const goTo = (index) => {
    if (animating) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 250);
  };

  const goPrev = () => goTo((current - 1 + testimonials.length) % testimonials.length);
  const goNext = () => goTo((current + 1) % testimonials.length);

  const t = testimonials[current];

  // Show 3 per page on desktop
  const visibleCount = 3;
  const startIdx = Math.floor(current / visibleCount) * visibleCount;
  const visibleTestimonials = testimonials.slice(startIdx, startIdx + visibleCount);

  return (
    <section className="testimonials section section-alt" id="testimonios" ref={sectionRef}>
      <div className="testimonials__glow" />

      <div className="container">
        <div className={`testimonials__header ${visible ? 'testimonials__header--visible' : ''}`}>
          <p className="section-label">Lo Que Dicen</p>
          <h2 className="section-title">
            Clientes que{' '}
            <span className="gradient-text">confían</span>
            {' '}en nosotros
          </h2>
          <p className="section-subtitle">
            Más de 500 empresas y profesionales han transformado su tecnología
            con nuestro apoyo. Estas son sus historias.
          </p>
        </div>

        {/* Featured testimonial */}
        <div className={`testimonials__featured ${animating ? 'testimonials__featured--exit' : 'testimonials__featured--enter'} ${visible ? 'testimonials__featured--visible' : ''}`}>
          <div className="testimonials__quote-mark">"</div>
          <p className="testimonials__quote">{t.text}</p>
          <div className="testimonials__author">
            <div className="testimonials__avatar" style={{ '--avatar-color': t.color }}>
              {t.avatar}
            </div>
            <div className="testimonials__author-info">
              <div className="testimonials__author-name">{t.name}</div>
              <div className="testimonials__author-role">{t.role}</div>
              <div className="testimonials__author-company">{t.company}</div>
            </div>
            <div className="testimonials__stars">
              {[...Array(t.rating)].map((_, i) => (
                <FiStar key={i} size={16} fill="currentColor" />
              ))}
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="testimonials__nav">
          <button className="testimonials__nav-btn" onClick={goPrev}>
            <FiChevronLeft size={20} />
          </button>

          <div className="testimonials__dots">
            {testimonials.map((_, i) => (
              <button
                key={i}
                className={`testimonials__dot ${i === current ? 'testimonials__dot--active' : ''}`}
                onClick={() => goTo(i)}
                style={{ '--dot-color': testimonials[i].color }}
              />
            ))}
          </div>

          <button className="testimonials__nav-btn" onClick={goNext}>
            <FiChevronRight size={20} />
          </button>
        </div>

        {/* All cards mini grid */}
        <div className="testimonials__grid">
          {testimonials.map((item, i) => (
            <div
              key={item.id}
              className={`testimonials__mini-card glass-card ${i === current ? 'testimonials__mini-card--active' : ''}`}
              style={{ '--card-color': item.color, animationDelay: `${i * 0.07}s` }}
              onClick={() => goTo(i)}
            >
              <div className="testimonials__mini-stars">
                {[...Array(item.rating)].map((_, j) => (
                  <FiStar key={j} size={12} fill="currentColor" />
                ))}
              </div>
              <p className="testimonials__mini-text">"{item.text.slice(0, 100)}..."</p>
              <div className="testimonials__mini-author">
                <div className="testimonials__mini-avatar" style={{ '--avatar-color': item.color }}>
                  {item.avatar}
                </div>
                <div>
                  <div className="testimonials__mini-name">{item.name}</div>
                  <div className="testimonials__mini-company">{item.company}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

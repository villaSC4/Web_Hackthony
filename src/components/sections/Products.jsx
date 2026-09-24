import { useRef, useEffect, useState } from 'react';
import {
  FiMonitor, FiCpu, FiPrinter, FiWifi, FiKey
} from 'react-icons/fi';
import { FaLaptop, FaWhatsapp } from 'react-icons/fa';
import { products } from '../../data/products';
import './Products.css';

const iconMap = {
  FaDesktop: FiMonitor,
  FaLaptop: FaLaptop,
  FaPrint: FiPrinter,
  FaMicrochip: FiCpu,
  FaKey: FiKey,
  FaWifi: FiWifi,
};

export default function Products() {
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
    <section className="products section section-alt" id="productos" ref={sectionRef}>
      <div className="products__glow-left" />
      <div className="products__glow-right" />

      <div className="container">
        <div className={`products__header ${visible ? 'products__header--visible' : ''}`}>
          <p className="section-label">Equipos y Software</p>
          <h2 className="section-title">
            Nuestros <span className="gradient-text">Productos</span>
          </h2>
          <p className="section-subtitle">
            Comercializamos equipos y licencias certificados por los mejores fabricantes
            del mundo para potenciar tu empresa.
          </p>
        </div>

        <div className="products__grid">
          {products.map((product, i) => {
            const Icon = iconMap[product.icon] || FiMonitor;
            const whatsappUrl = `https://wa.me/51994520017?text=Hola%2C%20me%20interesa%20el%20producto%20${encodeURIComponent(product.title)}`;

            return (
              <div
                key={product.id}
                className="product-card"
                style={{
                  '--product-color': product.color,
                  animationDelay: `${i * 0.08}s`
                }}
              >
                <div className="product-card__icon-wrap">
                  <div className="product-card__icon">
                    <Icon size={32} />
                  </div>
                </div>

                <h3 className="product-card__title">{product.title}</h3>
                <p className="product-card__desc">{product.description}</p>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="product-card__btn"
                >
                  <FaWhatsapp size={15} />
                  Solicitar Producto
                </a>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { FaWhatsapp } from 'react-icons/fa';
import './FloatingWhatsApp.css';

export default function FloatingWhatsApp() {
  const url = 'https://wa.me/51994520017?text=Hola%2C%20me%20interesa%20conocer%20sus%20servicios';

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-whatsapp"
      aria-label="Contactar por WhatsApp"
      id="whatsapp-float-btn"
    >
      <div className="floating-whatsapp__ring" />
      <div className="floating-whatsapp__ring floating-whatsapp__ring--2" />
      <FaWhatsapp size={28} />
      <span className="floating-whatsapp__tooltip">
        ¡Hablemos por WhatsApp!
      </span>
    </a>
  );
}

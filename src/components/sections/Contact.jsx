import { useState } from 'react';
import {
  FiPhone, FiMail, FiMapPin, FiSend, FiCheckCircle, FiShield,
  FiServer, FiCpu, FiKey, FiGlobe, FiLayers
} from 'react-icons/fi';
import confetti from 'canvas-confetti';
import Magnetic from '../ui/Magnetic';
import './Contact.css';

const serviceOptions = [
  { id: 'ciberseguridad', label: 'Ciberseguridad & Firewall', icon: FiShield },
  { id: 'soporte', label: 'Mesa de Ayuda TI 24/7', icon: FiCpu },
  { id: 'redes', label: 'Infraestructura MikroTik', icon: FiServer },
  { id: 'cloud', label: 'Cloud Azure & Microsoft 365', icon: FiGlobe },
  { id: 'licencias', label: 'Licencias & Software', icon: FiKey },
  { id: 'consultoria', label: 'Auditoría TI & Consultoría', icon: FiLayers },
];

const companyScaleOptions = [
  '1 a 10 Equipos (Pyme)',
  '11 a 50 Equipos (Crecimiento)',
  '50+ Equipos (Corporativo)',
];

export default function Contact() {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    company: '',
    service: 'ciberseguridad',
    scale: '11 a 50 Equipos (Crecimiento)',
    message: '',
    privacy: true,
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleServiceSelect = (serviceId) => {
    setForm((prev) => ({ ...prev, service: serviceId }));
  };

  const handleScaleSelect = (scale) => {
    setForm((prev) => ({ ...prev, scale }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    const selectedServiceLabel = serviceOptions.find((s) => s.id === form.service)?.label || form.service;

    // Trigger Clay-style celebration confetti!
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#000000', '#FFFFFF', '#71717A', '#E4E4E7', '#18181B'],
      });
    } catch {
      // Fallback
    }

    const whatsappMessage = `*Nueva Solicitud de Proyecto - Hackthony Support*\n\n` +
      `👤 *Nombre:* ${form.name}\n` +
      `🏢 *Empresa:* ${form.company || 'No especificada'}\n` +
      `📞 *Teléfono:* ${form.phone}\n` +
      `✉️ *Email:* ${form.email}\n` +
      `🎯 *Servicio de Interés:* ${selectedServiceLabel}\n` +
      `📊 *Escala:* ${form.scale}\n` +
      `📝 *Mensaje:* ${form.message || 'Solicito contacto comercial y diagnóstico técnico.'}`;

    const whatsappUrl = `https://wa.me/51994520017?text=${encodeURIComponent(whatsappMessage)}`;

    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      window.open(whatsappUrl, '_blank');
    }, 600);
  };

  const contactInfo = [
    { icon: FiPhone, label: 'Llámanos o WhatsApp', value: '+51 994 520 017', href: 'https://wa.me/51994520017' },
    { icon: FiMail, label: 'Correo Corporativo', value: 'consultas@hackthonyperu.com', href: 'mailto:consultas@hackthonyperu.com' },
    { icon: FiMapPin, label: 'Sede Principal', value: 'Las Lajas 721 Urb. Inca Manco Cápac, Lima, Perú', href: '#contacto' },
  ];

  return (
    <section className="contact section" id="contacto">
      <div className="container">
        {/* Header Estilo Clay */}
        <div className="contact__header">
          <div className="section-label">
            <FiMail size={14} />
            <span>Inicia Tu Proyecto TI</span>
          </div>

          <h2 className="section-title">
            Hablemos de tus <span className="gradient-text">objetivos tecnológicos</span>
          </h2>
          <p className="section-subtitle">
            Cuéntanos qué necesita tu infraestructura o equipo. Diseñamos propuestas técnicas personalizadas con respuesta en menos de 2 horas.
          </p>
        </div>

        <div className="contact__layout">
          {/* Columna Izquierda: Información de Contacto Directo */}
          <div className="contact__info">
            <div className="contact__info-cards">
              {contactInfo.map((item, i) => (
                <a
                  key={i}
                  href={item.href}
                  className="contact__info-card"
                  target={item.href.startsWith('http') ? '_blank' : '_self'}
                  rel="noopener noreferrer"
                >
                  <div className="contact__info-icon">
                    <item.icon size={22} />
                  </div>
                  <div className="contact__info-details">
                    <span className="contact__info-label">{item.label}</span>
                    <strong className="contact__info-value">{item.value}</strong>
                  </div>
                </a>
              ))}
            </div>

            {/* Tarjeta de Compromiso SLA */}
            <div className="contact__sla-box">
              <div className="contact__sla-header">
                <FiCheckCircle className="contact__sla-icon" />
                <h4>Garantía de Atención Rápida</h4>
              </div>
              <p>
                Un ingeniero especialista evaluará tu solicitud y te contactará con una cotización clara, sin costos ocultos y con respaldo oficial de fábrica.
              </p>
              <div className="contact__sla-pills">
                <span>✓ Diagnóstico Inicial Sin Costo</span>
                <span>✓ Facturación Legal</span>
                <span>✓ SLA Garantizado</span>
              </div>
            </div>
          </div>

          {/* Columna Derecha: Formulario Interactivo Estilo Clay.global */}
          <div className="contact__form-container">
            {submitted ? (
              <div className="contact__success">
                <div className="contact__success-icon-wrap">
                  <FiCheckCircle size={44} />
                </div>
                <h3>¡Solicitud Enviada con Éxito!</h3>
                <p>
                  Hemos abierto WhatsApp para entregarte atención inmediata. Nuestro equipo técnico también ha recibido tus datos.
                </p>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => setSubmitted(false)}
                >
                  Enviar otra consulta
                </button>
              </div>
            ) : (
              <form className="contact__form" onSubmit={handleSubmit}>
                {/* Selector Interactivo de Servicios (Chips Clay Style) */}
                <div className="contact__interactive-group">
                  <label className="contact__group-label">
                    1. ¿Qué solución o servicio requiere tu empresa?
                  </label>
                  <div className="contact__chips-grid">
                    {serviceOptions.map((opt) => {
                      const Icon = opt.icon;
                      const isSelected = form.service === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          className={`contact__chip ${isSelected ? 'contact__chip--active' : ''}`}
                          onClick={() => handleServiceSelect(opt.id)}
                        >
                          <Icon size={16} />
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Selector de Escala de la Organización */}
                <div className="contact__interactive-group">
                  <label className="contact__group-label">
                    2. Tamaño de infraestructura estimada:
                  </label>
                  <div className="contact__scale-chips">
                    {companyScaleOptions.map((scale, i) => (
                      <button
                        key={i}
                        type="button"
                        className={`contact__scale-chip ${form.scale === scale ? 'contact__scale-chip--active' : ''}`}
                        onClick={() => handleScaleSelect(scale)}
                      >
                        {scale}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Campos de Texto con Estilo Clay Inputs */}
                <div className="contact__inputs-grid">
                  <div className="contact__input-wrap">
                    <label htmlFor="contact-name">Nombre completo *</label>
                    <input
                      id="contact-name"
                      type="text"
                      name="name"
                      placeholder="Ej. Carlos Mendoza"
                      value={form.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="contact__input-wrap">
                    <label htmlFor="contact-company">Empresa / Negocio</label>
                    <input
                      id="contact-company"
                      type="text"
                      name="company"
                      placeholder="Ej. Corporación Andina S.A."
                      value={form.company}
                      onChange={handleInputChange}
                    />
                  </div>

                  <div className="contact__input-wrap">
                    <label htmlFor="contact-phone">Teléfono / WhatsApp *</label>
                    <input
                      id="contact-phone"
                      type="tel"
                      name="phone"
                      placeholder="+51 999 999 999"
                      value={form.phone}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div className="contact__input-wrap">
                    <label htmlFor="contact-email">Correo Electrónico *</label>
                    <input
                      id="contact-email"
                      type="email"
                      name="email"
                      placeholder="carlos@empresa.com"
                      value={form.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                {/* Mensaje de Detalle */}
                <div className="contact__input-wrap contact__input-wrap--full">
                  <label htmlFor="contact-message">Detalles del requerimiento (opcional)</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    placeholder="Cuéntanos brevemente sobre la situación actual de tus sistemas, cantidad de sedes o dudas específicas..."
                    value={form.message}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Checkbox de Privacidad */}
                <label className="contact__checkbox-row">
                  <input
                    type="checkbox"
                    name="privacy"
                    checked={form.privacy}
                    onChange={handleInputChange}
                    required
                  />
                  <span>
                    Acepto la política de privacidad y el tratamiento de datos para fines de contacto comercial y técnico.
                  </span>
                </label>

                {/* Botón de Envío Magnético Clay Style */}
                <Magnetic strength={0.2} className="contact__submit-wrap">
                  <button
                    type="submit"
                    className="btn btn-primary contact__submit-btn"
                    disabled={loading}
                  >
                    <FiSend size={18} />
                    <span>{loading ? 'Preparando Solicitud...' : 'Enviar Mensaje e Iniciar Consulta'}</span>
                  </button>
                </Magnetic>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

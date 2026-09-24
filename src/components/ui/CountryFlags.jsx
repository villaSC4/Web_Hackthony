// Componentes SVG vectoriales de alta precisión para banderas
// 100% autónomos, sin dependencias externas, sin errores de red, ultra nítidos

export function FlagPeru({ className = "", width = 28, height = 20, preserveAspectRatio = "xMidYMid meet", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      className={`flag-svg ${className}`}
      style={{ borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", ...style }}
    >
      <rect width="900" height="600" fill="#D91023" />
      <rect width="300" height="600" x="300" fill="#FFFFFF" />
    </svg>
  );
}

export function FlagEspana({ className = "", width = 28, height = 20, preserveAspectRatio = "xMidYMid meet", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 750 500"
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      className={`flag-svg ${className}`}
      style={{ borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", ...style }}
    >
      <rect width="750" height="500" fill="#AA151B" />
      <rect width="750" height="250" y="125" fill="#F1BF00" />
      {/* Escudo simplificado elegante de España */}
      <g transform="translate(180, 175) scale(0.65)">
        <rect x="0" y="0" width="80" height="90" rx="10" fill="#AA151B" stroke="#F1BF00" strokeWidth="4" />
        <rect x="15" y="15" width="50" height="60" fill="#F1BF00" />
        <circle cx="40" cy="45" r="14" fill="#003893" />
        <polygon points="40,2 48,22 32,22" fill="#F1BF00" />
      </g>
    </svg>
  );
}

export function FlagColombia({ className = "", width = 28, height = 20, preserveAspectRatio = "xMidYMid meet", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      className={`flag-svg ${className}`}
      style={{ borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", ...style }}
    >
      <rect width="900" height="300" fill="#FCD116" />
      <rect width="900" height="150" y="300" fill="#003893" />
      <rect width="900" height="150" y="450" fill="#CE1126" />
    </svg>
  );
}

export function FlagArgentina({ className = "", width = 28, height = 20, preserveAspectRatio = "xMidYMid meet", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 800 500"
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      className={`flag-svg ${className}`}
      style={{ borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", ...style }}
    >
      <rect width="800" height="500" fill="#74ACDF" />
      <rect width="800" height="166.6" y="166.6" fill="#FFFFFF" />
      {/* Sol de Mayo */}
      <g transform="translate(400, 250)">
        <circle r="34" fill="#F6B40E" stroke="#85340A" strokeWidth="2.5" />
        <circle r="26" fill="#FFF38D" />
        <circle cx="-10" cy="-6" r="3.5" fill="#85340A" />
        <circle cx="10" cy="-6" r="3.5" fill="#85340A" />
        <path d="M -8,8 Q 0,16 8,8" fill="none" stroke="#85340A" strokeWidth="2.5" strokeLinecap="round" />
        {/* Rayos del sol */}
        {[0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5, 180, 202.5, 225, 247.5, 270, 292.5, 315, 337.5].map((angle, idx) => (
          <line
            key={idx}
            x1="0"
            y1={idx % 2 === 0 ? "38" : "36"}
            x2="0"
            y2={idx % 2 === 0 ? "54" : "48"}
            stroke="#F6B40E"
            strokeWidth="3.5"
            strokeLinecap="round"
            transform={`rotate(${angle})`}
          />
        ))}
      </g>
    </svg>
  );
}

export function FlagMexico({ className = "", width = 28, height = 20, preserveAspectRatio = "xMidYMid meet", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      className={`flag-svg ${className}`}
      style={{ borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", ...style }}
    >
      <rect width="300" height="600" fill="#006847" />
      <rect width="300" height="600" x="300" fill="#FFFFFF" />
      <rect width="300" height="600" x="600" fill="#CE1126" />
      {/* Escudo Nacional Mexicano estilizado */}
      <g transform="translate(450, 300) scale(0.7)">
        <ellipse cx="0" cy="10" rx="35" ry="25" fill="#996633" />
        <path d="M -15,10 C -10,-25 10,-25 15,10 Z" fill="#663300" />
        <path d="M -25,2 C -18,-12 0,-18 5,-8" fill="none" stroke="#228B22" strokeWidth="5" strokeLinecap="round" />
        <circle cx="6" cy="-14" r="3" fill="#D4AF37" />
        <path d="M -30,22 Q 0,38 30,22" fill="none" stroke="#228B22" strokeWidth="4" />
      </g>
    </svg>
  );
}

export function FlagChile({ className = "", width = 28, height = 20, preserveAspectRatio = "xMidYMid meet", style = {} }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 900 600"
      width={width}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      className={`flag-svg ${className}`}
      style={{ borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)", ...style }}
    >
      <rect width="900" height="300" fill="#FFFFFF" />
      <rect width="900" height="300" y="300" fill="#D52B1E" />
      <rect width="300" height="300" fill="#0039A6" />
      <polygon
        points="150,75 173,146 248,146 187,190 210,261 150,217 90,261 113,190 52,146 127,146"
        fill="#FFFFFF"
      />
    </svg>
  );
}

export function FlagUSA({ className = "", width = 28, height = 20 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 950 500"
      width={width}
      height={height}
      className={`flag-svg ${className}`}
      style={{ borderRadius: "3px", boxShadow: "0 1px 3px rgba(0,0,0,0.3)" }}
    >
      <rect width="950" height="500" fill="#FFFFFF" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} width="950" height="38.46" y={i * 76.92} fill="#B22234" />
      ))}
      <rect width="380" height="269.2" fill="#3C3B6E" />
      <circle cx="190" cy="134" r="16" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
}

// Mapa de componentes por código
export const countryData = [
  {
    code: "pe",
    name: "Perú",
    flag: FlagPeru,
    badge: "Sede Principal",
    city: "Lima",
    detail: "Atención Presencial & Remota 24/7",
    active: true,
  },
  {
    code: "es",
    name: "España",
    flag: FlagEspana,
    badge: "Soporte Europa",
    city: "Madrid / Barcelona",
    detail: "Horario CET & Soporte Remoto",
    active: true,
  },
  {
    code: "co",
    name: "Colombia",
    flag: FlagColombia,
    badge: "Operaciones",
    city: "Bogotá / Medellín",
    detail: "Consultoría TI & Ciberseguridad",
    active: true,
  },
  {
    code: "mx",
    name: "México",
    flag: FlagMexico,
    badge: "Servicios Cloud",
    city: "CDMX / Monterrey",
    detail: "Licencias & Arquitectura Cloud",
    active: true,
  },
  {
    code: "ar",
    name: "Argentina",
    flag: FlagArgentina,
    badge: "Especialistas TI",
    city: "Buenos Aires",
    detail: "Ingeniería de Redes & Soporte",
    active: true,
  },
  {
    code: "cl",
    name: "Chile",
    flag: FlagChile,
    badge: "Consultoría",
    city: "Santiago",
    detail: "Soluciones TI Corporativas",
    active: true,
  },
];

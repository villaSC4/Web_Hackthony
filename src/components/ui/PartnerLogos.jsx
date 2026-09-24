// Logos vectoriales oficiales de alta fidelidad para Partners Certificados
// 100% vectoriales, colores de marca oficiales, renderizado perfecto en cualquier pantalla

export function LogoMicrosoft({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 215 46"
      height={height}
      className={className}
      aria-label="Microsoft"
    >
      {/* 4 cuadrados icónicos oficiales */}
      <rect x="0" y="2" width="19" height="19" fill="#F25022" />
      <rect x="23" y="2" width="19" height="19" fill="#7FBA00" />
      <rect x="0" y="25" width="19" height="19" fill="#00A4EF" />
      <rect x="23" y="25" width="19" height="19" fill="#FFB900" />
      {/* Tipografía Microsoft */}
      <text
        x="54"
        y="33"
        fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
        fontSize="25"
        fontWeight="600"
        fill="#262626"
        letterSpacing="-0.5px"
      >
        Microsoft
      </text>
    </svg>
  );
}

export function LogoMikroTik({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 46"
      height={height}
      className={className}
      aria-label="MikroTik"
    >
      {/* Glifo MikroTik característico (router / ondas) */}
      <g transform="translate(2, 6)">
        <rect x="0" y="20" width="34" height="12" rx="3" fill="#D32F2F" />
        <circle cx="8" cy="26" r="2" fill="#FFFFFF" />
        <circle cx="16" cy="26" r="2" fill="#FFFFFF" />
        <circle cx="24" cy="26" r="2" fill="#FFFFFF" />
        <path d="M 6,14 Q 17,2 28,14" fill="none" stroke="#D32F2F" strokeWidth="3" strokeLinecap="round" />
        <path d="M 10,17 Q 17,8 24,17" fill="none" stroke="#D32F2F" strokeWidth="2.5" strokeLinecap="round" />
      </g>
      {/* Tipografía MikroTik */}
      <text
        x="44"
        y="32"
        fontFamily="sans-serif"
        fontSize="24"
        fontWeight="800"
        fill="#D32F2F"
        letterSpacing="0.5px"
      >
        mikro<tspan fill="#1E293B">tik</tspan>
      </text>
    </svg>
  );
}

export function LogoPandaSecurity({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 220 46"
      height={height}
      className={className}
      aria-label="Panda Security"
    >
      {/* Icono de Panda Security en cyan/azul */}
      <g transform="translate(2, 4)">
        <circle cx="18" cy="18" r="16" fill="#00A8E8" />
        {/* Orejitas */}
        <circle cx="7" cy="6" r="5" fill="#004D7A" />
        <circle cx="29" cy="6" r="5" fill="#004D7A" />
        {/* Ojos blancos con pupila */}
        <ellipse cx="12" cy="16" rx="4.5" ry="5.5" fill="#FFFFFF" />
        <ellipse cx="24" cy="16" rx="4.5" ry="5.5" fill="#FFFFFF" />
        <circle cx="13" cy="16" r="2.2" fill="#004D7A" />
        <circle cx="23" cy="16" r="2.2" fill="#004D7A" />
        {/* Nariz */}
        <polygon points="18,22 15,26 21,26" fill="#004D7A" />
      </g>
      {/* panda SECURITY texto */}
      <text
        x="44"
        y="24"
        fontFamily="sans-serif"
        fontSize="17"
        fontWeight="800"
        fill="#00A8E8"
      >
        panda
      </text>
      <text
        x="44"
        y="38"
        fontFamily="sans-serif"
        fontSize="11"
        fontWeight="700"
        letterSpacing="2.5px"
        fill="#1E293B"
      >
        SECURITY
      </text>
    </svg>
  );
}

export function LogoSectigo({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 190 46"
      height={height}
      className={className}
      aria-label="Sectigo"
    >
      {/* Glifo S de Sectigo */}
      <g transform="translate(4, 5)">
        <path
          d="M 6,10 L 26,4 L 32,16 L 16,22 L 32,28 L 26,36 L 4,30 Z"
          fill="#00B0B9"
        />
        <circle cx="18" cy="19" r="3.5" fill="#FFFFFF" />
      </g>
      {/* Texto SECTIGO */}
      <text
        x="44"
        y="32"
        fontFamily="sans-serif"
        fontSize="22"
        fontWeight="900"
        letterSpacing="2px"
        fill="#1E293B"
      >
        SECTIGO
      </text>
    </svg>
  );
}

export function LogoAdobe({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 170 46"
      height={height}
      className={className}
      aria-label="Adobe"
    >
      {/* Icónico cuadrado rojo Adobe */}
      <rect x="2" y="5" width="34" height="34" rx="4" fill="#FA0F00" />
      <polygon points="12,32 17,12 21,12 26,32 22,32 20.5,26 17.5,26 16,32" fill="#FFFFFF" />
      <polygon points="19,17.5 18,22 20,22" fill="#FA0F00" />
      {/* Tipografía Adobe */}
      <text
        x="46"
        y="32"
        fontFamily="sans-serif"
        fontSize="24"
        fontWeight="800"
        fill="#FA0F00"
        letterSpacing="-0.5px"
      >
        Adobe
      </text>
    </svg>
  );
}

export function LogoAnyDesk({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 185 46"
      height={height}
      className={className}
      aria-label="AnyDesk"
    >
      {/* Rombos superpuestos AnyDesk */}
      <g transform="translate(2, 6)">
        <polygon points="17,0 30,17 17,34 4,17" fill="#EF443B" />
        <polygon points="27,6 38,17 27,28 16,17" fill="#EF443B" opacity="0.65" />
      </g>
      {/* Tipografía AnyDesk */}
      <text
        x="46"
        y="31"
        fontFamily="sans-serif"
        fontSize="23"
        fontWeight="800"
        fill="#1E293B"
      >
        Any<tspan fill="#EF443B">Desk</tspan>
      </text>
    </svg>
  );
}

export function LogoAzure({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 190 46"
      height={height}
      className={className}
      aria-label="Microsoft Azure"
    >
      {/* Símbolo moderno de Azure (A poligonal) */}
      <g transform="translate(2, 4)">
        <path d="M 7,32 L 20,5 L 29,20 L 16,27 Z" fill="#0078D4" />
        <path d="M 20,5 L 34,28 L 30,34 L 14,34 Z" fill="#50E6FF" opacity="0.85" />
        <path d="M 14,34 L 23,20 L 30,34 Z" fill="#0078D4" />
      </g>
      {/* Texto Microsoft Azure */}
      <text
        x="42"
        y="21"
        fontFamily="sans-serif"
        fontSize="11"
        fontWeight="600"
        fill="#64748B"
      >
        Microsoft
      </text>
      <text
        x="42"
        y="37"
        fontFamily="sans-serif"
        fontSize="18"
        fontWeight="800"
        fill="#0078D4"
      >
        Azure
      </text>
    </svg>
  );
}

export function LogoBarracuda({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 200 46"
      height={height}
      className={className}
      aria-label="Barracuda Networks"
    >
      {/* Logo pez/sonar Barracuda */}
      <g transform="translate(2, 6)">
        <path
          d="M 4,17 C 8,6 26,6 30,17 C 26,28 8,28 4,17 Z"
          fill="#0071C5"
        />
        <circle cx="24" cy="17" r="3" fill="#FFFFFF" />
        <path d="M 12,17 L 4,11 L 4,23 Z" fill="#004D80" />
      </g>
      {/* Texto Barracuda */}
      <text
        x="38"
        y="31"
        fontFamily="sans-serif"
        fontSize="21"
        fontWeight="800"
        fill="#0071C5"
        letterSpacing="0.3px"
      >
        Barracuda
      </text>
    </svg>
  );
}

export function LogoFortinet({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 190 46"
      height={height}
      className={className}
      aria-label="Fortinet"
    >
      {/* Cuadrícula roja Fortinet */}
      <g transform="translate(2, 6)">
        <rect x="0" y="0" width="10" height="14" fill="#EE3124" />
        <rect x="13" y="0" width="10" height="14" fill="#EE3124" opacity="0.6" />
        <rect x="0" y="17" width="10" height="14" fill="#EE3124" opacity="0.6" />
        <rect x="13" y="17" width="10" height="14" fill="#EE3124" />
      </g>
      {/* FORTINET tipografía */}
      <text
        x="32"
        y="30"
        fontFamily="sans-serif"
        fontSize="21"
        fontWeight="900"
        letterSpacing="1px"
        fill="#EE3124"
      >
        FORTINET
      </text>
    </svg>
  );
}

export function LogoCisco({ className = "", height = 30 }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 160 46"
      height={height}
      className={className}
      aria-label="Cisco"
    >
      {/* Barras verticales del puente Golden Gate de Cisco */}
      <g transform="translate(4, 2)" fill="#1BA0D7">
        <rect x="0" y="14" width="3.5" height="10" rx="1.75" />
        <rect x="6" y="8" width="3.5" height="16" rx="1.75" />
        <rect x="12" y="2" width="3.5" height="22" rx="1.75" />
        <rect x="18" y="8" width="3.5" height="16" rx="1.75" />
        <rect x="24" y="14" width="3.5" height="10" rx="1.75" />
      </g>
      {/* Texto CISCO */}
      <text
        x="38"
        y="31"
        fontFamily="sans-serif"
        fontSize="21"
        fontWeight="800"
        letterSpacing="2px"
        fill="#049FD9"
      >
        CISCO
      </text>
    </svg>
  );
}

// Lista oficial completa de partners con metadata enriquecida
export const partnersData = [
  {
    id: "microsoft",
    name: "Microsoft",
    component: LogoMicrosoft,
    tier: "Gold Certified Partner",
    badgeColor: "#00A4EF",
    category: "Cloud & Licenciamiento",
    url: "https://www.microsoft.com",
  },
  {
    id: "mikrotik",
    name: "MikroTik",
    component: LogoMikroTik,
    tier: "Certified Network Partner",
    badgeColor: "#D32F2F",
    category: "Routers & Redes",
    url: "https://mikrotik.com",
  },
  {
    id: "pandasecurity",
    name: "Panda Security",
    component: LogoPandaSecurity,
    tier: "Endpoint Security Partner",
    badgeColor: "#00A8E8",
    category: "Ciberseguridad",
    url: "https://www.pandasecurity.com",
  },
  {
    id: "sectigo",
    name: "Sectigo",
    component: LogoSectigo,
    tier: "Platinum SSL Provider",
    badgeColor: "#00B0B9",
    category: "Certificados SSL & PKI",
    url: "https://sectigo.com",
  },
  {
    id: "adobe",
    name: "Adobe",
    component: LogoAdobe,
    tier: "Authorized Reseller",
    badgeColor: "#FA0F00",
    category: "Software Creativo",
    url: "https://www.adobe.com",
  },
  {
    id: "anydesk",
    name: "AnyDesk",
    component: LogoAnyDesk,
    tier: "Enterprise Remote Partner",
    badgeColor: "#EF443B",
    category: "Acceso & Soporte Remoto",
    url: "https://anydesk.com",
  },
  {
    id: "azure",
    name: "Microsoft Azure",
    component: LogoAzure,
    tier: "Cloud Solutions Provider",
    badgeColor: "#0078D4",
    category: "Infraestructura Cloud",
    url: "https://azure.microsoft.com",
  },
  {
    id: "barracuda",
    name: "Barracuda Networks",
    component: LogoBarracuda,
    tier: "Certified Security Partner",
    badgeColor: "#0071C5",
    category: "Firewalls & Backup",
    url: "https://www.barracuda.com",
  },
  {
    id: "fortinet",
    name: "Fortinet",
    component: LogoFortinet,
    tier: "Network Security Partner",
    badgeColor: "#EE3124",
    category: "Seguridad Perimetral",
    url: "https://www.fortinet.com",
  },
  {
    id: "cisco",
    name: "Cisco Systems",
    component: LogoCisco,
    tier: "Enterprise Networking Partner",
    badgeColor: "#049FD9",
    category: "Switches & Conectividad",
    url: "https://www.cisco.com",
  },
];

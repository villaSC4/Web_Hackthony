import imgComputadoras from '../img/prod_computadoras.jpg';
import imgLaptops from '../img/prod_laptops.jpg';
import imgRedes from '../img/prod_redes.jpg';
import imgComponentes from '../img/prod_componentes.jpg';
import imgImpresoras from '../img/prod_impresoras.jpg';
import imgLicencias from '../img/prod_licencias.jpg';

export const products = [
  {
    id: 1,
    tag: 'Workstations & Desktop',
    title: 'Computadoras de Alto Rendimiento',
    description: 'Equipos corporativos y estaciones de trabajo de alto desempeño diseñados para ingeniería, modelado 3D y procesamiento crítico continuo.',
    image: imgComputadoras,
    brand: 'Dell • HP • Lenovo',
    specs: ['Intel Core i9 / Xeon', 'Gráficos RTX Serie Pro', 'Garantía Oficial 3 Años'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20Computadoras%20de%20Alto%20Rendimiento.',
  },
  {
    id: 2,
    tag: 'Portabilidad Ejecutiva',
    title: 'Laptops & Notebooks Corporativas',
    description: 'Portátiles ultralivianas de gama profesional con autonomía extendida para ejecutivos, chasis de aluminio militar y biometría avanzada.',
    image: imgLaptops,
    brand: 'ThinkPad • Dell XPS • HP Elite',
    specs: ['Batería 14h+ Fast Charge', 'Pantalla IPS 2.8K 120Hz', 'Seguridad TPM 2.0'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20Laptops%20y%20Notebooks%20Corporativas.',
  },
  {
    id: 3,
    tag: 'Networking & Telecom',
    title: 'Equipos de Telecomunicaciones',
    description: 'Routers Cloud Core de alta capacidad, switches administrables PoE y appliances de firewall perimetral para tráfico empresarial continuo.',
    image: imgRedes,
    brand: 'MikroTik • Fortinet • Cisco',
    specs: ['Puertos 10G SFP+ Dual', 'Firewall Layer 7 Activo', 'Canal Oficial Autorizado'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20Equipos%20de%20Telecomunicaciones%20MikroTik%20y%20Fortinet.',
  },
  {
    id: 4,
    tag: 'Hardware & Upgrades',
    title: 'Componentes de PC & Servidores',
    description: 'Almacenamiento NVMe PCIe Gen 4/5 de lectura ultrarrápida, memorias RAM DDR5 de alta frecuencia y procesadores para servidores.',
    image: imgComponentes,
    brand: 'Kingston Fury • Samsung Pro',
    specs: ['Lectura hasta 7,450 MB/s', 'DDR5 6000MHz Con Heatsink', '100% Genuinos con Factura'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20Componentes%20de%20PC%20y%20Servidores.',
  },
  {
    id: 5,
    tag: 'Ofimática & Digitalización',
    title: 'Impresoras y Scanners Multifunción',
    description: 'Sistemas multifuncionales láser departamentales con alta velocidad de impresión, escaneo dúplex DADF y conectividad de red cifrada.',
    image: imgImpresoras,
    brand: 'Xerox • Epson • HP LaserJet',
    specs: ['Hasta 55 ppm Doble Cara', 'Escaner DADF de 1 Paso', 'Gestión Remota Cloud'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20Impresoras%20y%20Scanners%20Multifuncionales.',
  },
  {
    id: 6,
    tag: 'Software Legal & Cloud',
    title: 'Licencias de Software Oficiales',
    description: 'Licenciamiento corporativo original y perpetuo para Windows 11 Pro, Windows Server, Microsoft 365 Business y seguridad endpoint.',
    image: imgLicencias,
    brand: 'Microsoft CSP • Adobe • Fortinet',
    specs: ['Activación Inmediata ESD', 'Certificado Oficial de Partner', 'Soporte Remoto Incluido'],
    whatsappUrl: 'https://wa.me/51994520017?text=Hola%20Hackthony%2C%20quisiera%20cotizar%20Licencias%20de%20Software%20Oficiales.',
  },
];

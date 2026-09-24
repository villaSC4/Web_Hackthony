# Hackthony Support — Plataforma Web Corporativa

Sitio web corporativo de **Hackthony Support**, especializado en soluciones integrales de infraestructura TI, soporte técnico 24/7, ciberseguridad, consultoría y equipamiento tecnológico para empresas en Perú e internacionalmente.

## 🚀 Tecnologías

- **React 19**
- **Vite 8**
- **Framer Motion** (Animaciones fluidas y microinteracciones)
- **Lenis** (Smooth scroll de alto rendimiento)
- **Swiper 14** (Carrusel 3D Coverflow interactivo para catálogo)
- **React Icons**
- **Canvas Confetti**
- **Vanilla CSS** con sistema de diseño modular y paleta de alto contraste

## 🛠️ Instalación y Desarrollo Local

1. Clonar el repositorio:
   ```bash
   git clone https://github.com/villaSC4/Web_Hackthony.git
   cd Web_Hackthony
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Iniciar el servidor de desarrollo:
   ```bash
   npm run dev
   ```

4. Construir para producción:
   ```bash
   npm run build
   ```

5. Probar el bundle de producción:
   ```bash
   npm run preview
   ```

## 🌐 Despliegue en Vercel

El proyecto incluye el archivo `vercel.json` preconfigurado con reglas de enrutamiento SPA y cabeceras de caché:

1. Conecta tu repositorio de GitHub `villaSC4/Web_Hackthony` en el dashboard de [Vercel](https://vercel.com).
2. Parámetros automáticos detectados por Vercel:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
3. Haz clic en **Deploy**. Cada `git push` a la rama `main` disparará un nuevo despliegue automático.

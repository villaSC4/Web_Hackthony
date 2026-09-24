import { useEffect } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

import './styles/globals.css';
import './styles/animations.css';

import CustomCursor from './components/ui/CustomCursor';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';

import Hero from './components/sections/Hero';
import ShowreelZoom from './components/sections/ShowreelZoom';
import Stats from './components/sections/Stats';
import Partners from './components/sections/Partners';
import Services from './components/sections/Services';
import Products from './components/sections/Products';
import About from './components/sections/About';
import WhyUs from './components/sections/WhyUs';
import Testimonials from './components/sections/Testimonials';
import CTA from './components/sections/CTA';
import Contact from './components/sections/Contact';

function App() {
  useEffect(() => {
    // Inicializar Clay-style momentum smooth scroll con Lenis
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      touchMultiplier: 1.4,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    const rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  return (
    <>
      <CustomCursor />
      <Navbar />

      <main>
        <Hero />
        <ShowreelZoom />
        <About />
        <Stats />
        <Services />
        <Products />
        <WhyUs />
        <Testimonials />
        <Partners />
        <CTA />
        <Contact />
      </main>

      <Footer />
      <FloatingWhatsApp />
    </>
  );
}

export default App;

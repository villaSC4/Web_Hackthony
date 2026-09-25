import { useEffect, useState, useRef } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const dotRef = useRef(null);
  const [cursorState, setCursorState] = useState('default');
  const [cursorText, setCursorText] = useState('');
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only enable on desktop / non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    document.documentElement.classList.add('has-custom-cursor');

    let rafId = null;
    let targetX = -100;
    let targetY = -100;

    const render = () => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      }
      rafId = null;
    };

    const handleMouseMove = (e) => {
      targetX = e.clientX;
      targetY = e.clientY;

      if (!rafId) {
        rafId = requestAnimationFrame(render);
      }

      const target = e.target;

      // Hide custom cursor circle over the steerable client marquee
      if (target && target.closest && (target.closest('.client-marquee-steerable') || target.closest('.client-marquee-fullwidth'))) {
        setIsVisible(false);
        return;
      }

      setIsVisible(true);

      const clickable = target.closest(
        'a, button, input, select, textarea, [role="button"], .directory-row, .service-card, .product-card'
      );

      if (!clickable) {
        setCursorState((prev) => (prev !== 'default' ? 'default' : prev));
        setCursorText((prev) => (prev !== '' ? '' : prev));
        return;
      }

      if (clickable.classList.contains('directory-row')) {
        setCursorState('client');
        setCursorText('EXPLORAR');
      } else if (clickable.tagName === 'INPUT' || clickable.tagName === 'TEXTAREA') {
        setCursorState('text');
        setCursorText('');
      } else if (clickable.closest('.btn-whatsapp') || clickable.closest('.floating-whatsapp')) {
        setCursorState('whatsapp');
        setCursorText('CHATEAR');
      } else {
        setCursorState('pointer');
        setCursorText('');
      }
    };

    const handleMouseLeave = () => setIsVisible(false);
    const handleMouseEnter = () => setIsVisible(true);

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      document.documentElement.classList.remove('has-custom-cursor');
      if (rafId) cancelAnimationFrame(rafId);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, []);

  return (
    <>
      {/* Outer follow ring (Hardware-accelerated, zero React re-render per frame) */}
      <div
        ref={cursorRef}
        className={`custom-cursor custom-cursor--${cursorState} ${isVisible ? 'custom-cursor--visible' : ''}`}
        style={{ opacity: isVisible ? 1 : 0 }}
      >
        {cursorText && <span className="custom-cursor__text">{cursorText}</span>}
      </div>

      {/* Center sharp dot */}
      <div
        ref={dotRef}
        className="custom-cursor-dot"
        style={{ opacity: isVisible ? 1 : 0 }}
      />
    </>
  );
}

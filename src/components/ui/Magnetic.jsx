import { useRef, useState } from 'react';

export default function Magnetic({ children, strength = 0.22, className = "" }) {
  const ref = useRef(null);
  const [transformStyle, setTransformStyle] = useState({
    transform: 'translate3d(0px, 0px, 0px)',
    transition: 'transform 0.4s cubic-bezier(0.2, 0.8, 0.2, 1)',
    display: 'inline-block',
    width: '100%',
  });

  const handleMouseMove = (e) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const rect = ref.current.getBoundingClientRect();
    const middleX = clientX - (rect.left + rect.width / 2);
    const middleY = clientY - (rect.top + rect.height / 2);

    setTransformStyle({
      transform: `translate3d(${middleX * strength}px, ${middleY * strength}px, 0px)`,
      transition: 'transform 0.08s ease-out',
      display: 'inline-block',
      width: '100%',
    });
  };

  const handleMouseLeave = () => {
    setTransformStyle({
      transform: 'translate3d(0px, 0px, 0px)',
      transition: 'transform 0.45s cubic-bezier(0.2, 0.8, 0.2, 1)',
      display: 'inline-block',
      width: '100%',
    });
  };

  return (
    <div
      ref={ref}
      className={className}
      style={transformStyle}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
}

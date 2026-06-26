import { useEffect, useRef, useState } from 'react';

export default function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const particlesRef = useRef(null);
  const pos = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const target = useRef({ x: window.innerWidth / 2, y: window.innerHeight / 2 });
  const raf = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let particles = [];
    
    const createParticle = (x, y) => {
      if (!particlesRef.current) return;
      const particle = document.createElement('div');
      particle.className = 'cursor-particle';
      particle.style.left = `${x}px`;
      particle.style.top = `${y}px`;
      particlesRef.current.appendChild(particle);
      
      const angle = Math.random() * Math.PI * 2;
      const velocity = Math.random() * 20 + 10;
      const tx = x + Math.cos(angle) * velocity;
      const ty = y + Math.sin(angle) * velocity;
      
      particle.animate([
        { transform: `translate(-50%, -50%) scale(1)`, opacity: 0.8 },
        { transform: `translate(calc(-50% + ${tx - x}px), calc(-50% + ${ty - y}px)) scale(0)`, opacity: 0 }
      ], {
        duration: 800 + Math.random() * 400,
        easing: 'cubic-bezier(0.16, 1, 0.3, 1)'
      }).onfinish = () => particle.remove();
    };

    const onMove = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
      if (!visible) setVisible(true);

      if (dotRef.current) {
        dotRef.current.style.left = `${e.clientX}px`;
        dotRef.current.style.top = `${e.clientY}px`;
      }
      
      if (Math.random() > 0.6) {
        createParticle(e.clientX, e.clientY);
      }
    };

    const onLeave = () => setVisible(false);
    const onEnter = () => setVisible(true);

    const animate = () => {
      pos.current.x += (target.current.x - pos.current.x) * 0.12;
      pos.current.y += (target.current.y - pos.current.y) * 0.12;
      if (ringRef.current) {
        ringRef.current.style.left = `${pos.current.x}px`;
        ringRef.current.style.top = `${pos.current.y}px`;
      }
      raf.current = requestAnimationFrame(animate);
    };

    const onHoverStart = (e) => {
      const el = e.target;
      const isHoverable = el.closest('a, button, [data-cursor="hover"], input, textarea, .tilt-card, .project-card, .service-card');
      if (isHoverable && ringRef.current) ringRef.current.classList.add('hovering');
    };

    const onHoverEnd = () => {
      if (ringRef.current) ringRef.current.classList.remove('hovering');
    };

    const onMouseDown = () => {
      if (ringRef.current) ringRef.current.classList.add('clicking');
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(0.7)';
      for(let i=0; i<5; i++) createParticle(target.current.x, target.current.y);
    };

    const onMouseUp = () => {
      if (ringRef.current) ringRef.current.classList.remove('clicking');
      if (dotRef.current) dotRef.current.style.transform = 'translate(-50%, -50%) scale(1)';
    };

    raf.current = requestAnimationFrame(animate);
    window.addEventListener('mousemove', onMove);
    document.documentElement.addEventListener('mouseleave', onLeave);
    document.documentElement.addEventListener('mouseenter', onEnter);
    document.addEventListener('mouseover', onHoverStart);
    document.addEventListener('mouseout', onHoverEnd);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);

    return () => {
      cancelAnimationFrame(raf.current);
      window.removeEventListener('mousemove', onMove);
      document.documentElement.removeEventListener('mouseleave', onLeave);
      document.documentElement.removeEventListener('mouseenter', onEnter);
      document.removeEventListener('mouseover', onHoverStart);
      document.removeEventListener('mouseout', onHoverEnd);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
    };
  }, [visible]);

  return (
    <>
      <div ref={particlesRef} className="fixed inset-0 pointer-events-none z-[99997]" />
      <div
        ref={dotRef}
        className="cursor-dot"
        style={{ opacity: visible ? 1 : 0 }}
      />
      <div
        ref={ringRef}
        className="cursor-ring"
        style={{ opacity: visible ? 1 : 0 }}
      />
    </>
  );
}

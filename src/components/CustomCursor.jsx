import { useEffect, useRef, useSyncExternalStore } from 'react';
import { gsap } from 'gsap';

const getIsPointerFine = () => 
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches;

const subscribePointerFine = (callback) => {
  if (typeof window === 'undefined') return () => {};
  const mediaQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
  mediaQuery.addEventListener('change', callback);
  return () => mediaQuery.removeEventListener('change', callback);
};

const CustomCursor = () => {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const spotlightRef = useRef(null);
  const isPointerFine = useSyncExternalStore(subscribePointerFine, getIsPointerFine, () => false);

  useEffect(() => {
    if (!isPointerFine) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    const spotlight = spotlightRef.current;

    if (!dot || !ring) return;

    gsap.set([dot, ring], { scale: 0.5, opacity: 0, transformOrigin: '50% 50%' });

    const xToDot = gsap.quickTo(dot, 'x', { duration: 0.05, ease: 'power2.out' });
    const yToDot = gsap.quickTo(dot, 'y', { duration: 0.05, ease: 'power2.out' });
    
    const xToRing = gsap.quickTo(ring, 'x', { duration: 0.15, ease: 'power3.out' });
    const yToRing = gsap.quickTo(ring, 'y', { duration: 0.15, ease: 'power3.out' });

    let isHoveringInteractive = false;

    const handleMouseMove = (e) => {
      const x = e.clientX;
      const y = e.clientY;

      const dotSize = 12;
      const ringSize = isHoveringInteractive ? 64 : 48;

      xToDot(x - dotSize / 2);
      yToDot(y - dotSize / 2);
      xToRing(x - ringSize / 2);
      yToRing(y - ringSize / 2);

      if (spotlight) {
        spotlight.style.transform = `translate3d(${x - 350}px, ${y - 350}px, 0)`;
      }

      // Check if hovering interactive element
      const target = e.target;
      const isInteractive = target && (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.tagName === 'INPUT' ||
        target.tagName === 'TEXTAREA' ||
        target.closest('a') ||
        target.closest('button') ||
        target.getAttribute('role') === 'button' ||
        target.classList.contains('cursor-pointer')
      );

      if (isInteractive && !isHoveringInteractive) {
        isHoveringInteractive = true;
        gsap.to(ring, { scale: 1.4, borderColor: '#E50914', backgroundColor: 'rgba(229, 9, 20, 0.12)', duration: 0.25 });
        gsap.to(dot, { scale: 1.3, backgroundColor: '#ffffff', duration: 0.2 });
      } else if (!isInteractive && isHoveringInteractive) {
        isHoveringInteractive = false;
        gsap.to(ring, { scale: 1, borderColor: 'rgba(229, 9, 20, 0.6)', backgroundColor: 'transparent', duration: 0.25 });
        gsap.to(dot, { scale: 1, backgroundColor: '#E50914', duration: 0.2 });
      }
    };

    const handleMouseEnter = () => {
      gsap.to([dot, ring], { opacity: 1, scale: 1, duration: 0.3, ease: 'power2.out' });
      if (spotlight) gsap.to(spotlight, { opacity: 1, duration: 0.3 });
    };

    const handleMouseLeave = () => {
      gsap.to([dot, ring], { opacity: 0, scale: 0.5, duration: 0.3, ease: 'power2.inOut' });
      if (spotlight) gsap.to(spotlight, { opacity: 0, duration: 0.3 });
    };

    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseenter', handleMouseEnter);
    document.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseenter', handleMouseEnter);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [isPointerFine]);

  if (!isPointerFine) return null;

  return (
    <>
      {/* Global Mouse Follower Spotlight Beam */}
      <div
        ref={spotlightRef}
        className="fixed top-0 left-0 w-[700px] h-[700px] rounded-full pointer-events-none z-[9998] opacity-0 blur-[100px] transition-opacity duration-300 will-change-transform"
        style={{
          background: 'radial-gradient(circle, rgba(229,9,20,0.22) 0%, rgba(229,9,20,0.06) 45%, transparent 75%)'
        }}
      ></div>

      {/* Global Custom Cursor Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-3 h-3 bg-red-600 rounded-full shadow-[0_0_15px_#E50914] will-change-transform"
      ></div>

      {/* Global Custom Cursor Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none w-12 h-12 border border-red-600/60 rounded-full flex items-center justify-center backdrop-blur-[1px] will-change-transform"
      ></div>
    </>
  );
};

export default CustomCursor;
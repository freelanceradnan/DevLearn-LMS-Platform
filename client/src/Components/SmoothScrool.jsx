import { useEffect } from 'react';
import Lenis from 'lenis';
import { useLocation } from 'react-router-dom';

export default function SmoothScroll({ children }) {
  const location=useLocation()
  const isAdminRoute = location.pathname.startsWith('/admin');
  useEffect(() => {
    if(isAdminRoute) return;
    const lenis = new Lenis({
      duration: 2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), 
      direction: 'vertical', 
      gestureDirection: 'vertical',
      smooth: true,
      mouseMultiplier: 1, 
      smoothTouch: true, 
      touchMultiplier: 2,
      infinite: false,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

 
    return () => {
      lenis.destroy();
    };
  }, [isAdminRoute]);

  return <>{children}</>;
}
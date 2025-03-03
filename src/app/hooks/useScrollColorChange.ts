import { RefObject, useEffect, useState } from 'react';

export function useScrollColorChange(ref: RefObject<HTMLElement | null>) {
  const [textColor, setTextColor] = useState('rgb(255, 255, 255)');
  const [textScale, setTextScale] = useState(1);
  const [textOpacity, setTextOpacity] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;

      const element = ref.current;
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      
      // Calculate how far into the viewport the element is
      const elementProgress = 1 - (rect.top / viewportHeight);
      
      // Clamp the progress between 0 and 1
      const progress = Math.max(0, Math.min(1, elementProgress));
      
      // Update text color based on scroll position
      const r = Math.round(255 - (progress * 100));
      const g = Math.round(255 - (progress * 100));
      const b = Math.round(255 - (progress * 100));
      setTextColor(`rgb(${r}, ${g}, ${b})`);
      
      // Update scale based on scroll position
      const scale = 1 + (progress * 0.1);
      setTextScale(scale);
      
      // Update opacity based on scroll position
      setTextOpacity(progress);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check

    return () => window.removeEventListener('scroll', handleScroll);
  }, [ref]);

  return { textColor, textScale, textOpacity };
} 
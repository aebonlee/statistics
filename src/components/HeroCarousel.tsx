import { useState, useEffect } from 'react';
import type { ReactElement } from 'react';

interface Slide {
  title: string;
  description: string;
}

export default function HeroCarousel({ slides }: { slides: Slide[] }): ReactElement | null {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!slides || slides.length <= 1) return;
    const timer = setInterval(() => {
      setActiveIndex(prev => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides]);

  if (!slides || slides.length === 0) return null;

  return (
    <div className="hero-carousel">
      <div className="carousel-track">
        {slides.map((slide, i) => (
          <div key={i} className={`carousel-slide ${i === activeIndex ? 'active' : ''}`}>
            <div className="carousel-slide-title">{slide.title}</div>
            <div className="carousel-slide-desc">{slide.description}</div>
          </div>
        ))}
      </div>
      <div className="carousel-dots">
        {slides.map((_, i) => (
          <button
            key={i}
            className={`carousel-dot ${i === activeIndex ? 'active' : ''}`}
            onClick={() => setActiveIndex(i)}
          />
        ))}
      </div>
    </div>
  );
}

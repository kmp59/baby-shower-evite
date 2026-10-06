import { useState } from 'react';
import './Sparkles.css';

interface Sparkle {
  size: number;
  left: number;
  top: number;
  duration: number;
  delay: number;
}

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

const createSparkles = (count: number): Sparkle[] =>
  Array.from({ length: count }, () => ({
    size: randomBetween(2, 7),
    left: randomBetween(0, 100),
    top: randomBetween(0, 100),
    duration: randomBetween(1.5, 4.5),
    delay: randomBetween(0, 4),
  }));

/** Decorative twinkling dots. Positions are generated once so re-renders don't reshuffle them. */
export function Sparkles({ count = 40 }: { count?: number }) {
  const [sparkles] = useState(() => createSparkles(count));

  return (
    <div className="sparkles" aria-hidden="true">
      {sparkles.map((s, i) => (
        <div
          key={i}
          className="sparkle"
          style={{
            width: s.size,
            height: s.size,
            left: `${s.left}%`,
            top: `${s.top}%`,
            animationDuration: `${s.duration}s`,
            animationDelay: `${s.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

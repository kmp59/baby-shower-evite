import { useState, type CSSProperties } from 'react';
import './Balloons.css';

const COLORS = ['var(--sage)', 'var(--accent)', 'var(--soft)', 'var(--accent-2)', 'var(--fur)'];

/** Where each balloon floats, as a percentage of the hero. */
const POSITIONS = [
  { left: 5, top: 15 }, { left: 12, top: 72 }, { left: 70, top: 30 }, { left: 90, top: 62 },
  { left: 50, top: 5 }, { left: 25, top: 10 }, { left: 75, top: 8 },
];

const randomBetween = (min: number, max: number) => Math.random() * (max - min) + min;

function createBalloons() {
  return POSITIONS.map((position, i) => {
    const tilt = randomBetween(-6, 6);
    return {
      ...position,
      color: COLORS[i % COLORS.length],
      size: randomBetween(40, 65),
      floatDuration: randomBetween(6, 11),
      riseDelay: i * 0.25,
      tilt,
    };
  });
}

/** Balloons that rise into the hero on load, then keep bobbing. Randomised once per page load. */
export function Balloons() {
  const [balloons] = useState(createBalloons);

  return (
    <div className="balloons" aria-hidden="true">
      {balloons.map((b, i) => (
        <div
          key={i}
          className="balloon"
          style={
            {
              left: `${b.left}%`,
              top: `${b.top}%`,
              '--float-duration': `${b.floatDuration}s`,
              '--rise-delay': `${b.riseDelay}s`,
              '--tilt': `${b.tilt}deg`,
              '--tilt-2': `${-b.tilt}deg`,
            } as CSSProperties
          }
        >
          <svg width={b.size} height={b.size * 1.3} viewBox="0 0 50 65" fill="none">
            <ellipse cx="25" cy="25" rx="20" ry="22" fill={b.color} opacity=".85" />
            <ellipse cx="18" cy="18" rx="5" ry="7" fill="white" opacity=".25" />
            <path d="M25 47 Q24 55 22 65" stroke={b.color} strokeWidth="1.5" strokeLinecap="round" opacity=".7" />
          </svg>
        </div>
      ))}
    </div>
  );
}

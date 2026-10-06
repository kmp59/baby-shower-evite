import { useState } from 'react';
import './Butterfly.css';

/** A butterfly that flutters across the screen once on load, then removes itself. */
export function Butterfly() {
  const [done, setDone] = useState(false);
  if (done) return null;

  return (
    <div className="butterfly" aria-hidden="true" onAnimationEnd={() => setDone(true)}>
      <svg width="48" height="40" viewBox="0 0 48 40" fill="none">
        <path d="M24 20 Q8 0 4 12 Q2 24 24 22Z" fill="var(--soft)" />
        <path d="M24 20 Q40 0 44 12 Q46 24 24 22Z" fill="var(--soft)" />
        <path d="M24 22 Q10 38 8 30 Q8 24 24 22Z" fill="var(--accent-2)" />
        <path d="M24 22 Q38 38 40 30 Q40 24 24 22Z" fill="var(--accent-2)" />
        <rect x="22.5" y="12" width="3" height="20" rx="1.5" fill="var(--text-sec)" />
      </svg>
    </div>
  );
}

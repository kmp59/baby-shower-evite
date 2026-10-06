/** Decorative grass tuft for the hero's bottom corners. `flip` mirrors it for the right side. */
export function PampasGrass({ flip = false }: { flip?: boolean }) {
  return (
    <svg
      width="160"
      height="200"
      viewBox="0 0 160 200"
      fill="none"
      aria-hidden="true"
      style={flip ? { transform: 'scaleX(-1)' } : undefined}
    >
      <path d="M30 200 Q20 160 40 120 Q50 90 35 60" stroke="var(--fur)" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M50 200 Q45 155 60 115 Q70 85 55 50" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" />
      <path d="M15 200 Q5 165 25 130 Q35 105 20 75" stroke="var(--text-sec)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="40" cy="58" rx="12" ry="6" fill="var(--fur)" opacity=".7" transform="rotate(-20 40 58)" />
      <ellipse cx="55" cy="48" rx="10" ry="5" fill="var(--accent)" opacity=".6" transform="rotate(15 55 48)" />
      <ellipse cx="20" cy="73" rx="9" ry="5" fill="var(--fur)" opacity=".5" transform="rotate(-10 20 73)" />
    </svg>
  );
}

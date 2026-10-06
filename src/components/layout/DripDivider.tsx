import './DripDivider.css';

/** Wavy drip edge between the hero and the invitation. */
export function DripDivider() {
  const drops = [100, 200, 300, 400, 500, 600, 700];
  return (
    <div className="drip-divider" aria-hidden="true">
      <svg viewBox="0 0 800 60" preserveAspectRatio="none" height="60" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M0,0 L800,0 L800,30 Q750,55 700,35 Q650,15 600,40 Q550,60 500,38 Q450,16 400,42 Q350,60 300,38 Q250,16 200,40 Q150,60 100,38 Q50,16 0,40 Z"
          fill="var(--card-bg)"
        />
        {drops.map((x, i) => (
          <ellipse key={x} cx={x} cy={42 + (i % 3)} rx={4 + (i % 3)} ry={8 + (i % 4)} fill="var(--accent)" opacity={0.4 + (i % 3) * 0.05} />
        ))}
      </svg>
    </div>
  );
}

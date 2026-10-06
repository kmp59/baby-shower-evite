/** A leafy sprig for the invitation card's corners. `corner` picks which corner it decorates. */
export function BotanicalCorner({ corner }: { corner: 'top-left' | 'bottom-right' }) {
  return (
    <svg
      className={`botanical botanical--${corner}`}
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      aria-hidden="true"
    >
      <path d="M5 95 Q15 60 50 40 Q70 30 90 10" stroke="var(--sage)" strokeWidth="2" strokeLinecap="round" />
      <ellipse cx="50" cy="40" rx="15" ry="8" fill="var(--sage)" opacity=".5" transform="rotate(-30 50 40)" />
      <ellipse cx="70" cy="28" rx="12" ry="6" fill="var(--soft)" opacity=".6" transform="rotate(-50 70 28)" />
      <ellipse cx="30" cy="55" rx="10" ry="5" fill="var(--accent)" opacity=".5" transform="rotate(-10 30 55)" />
    </svg>
  );
}

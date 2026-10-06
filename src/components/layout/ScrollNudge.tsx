import './ScrollNudge.css';

/** Small bobbing arrow with a hint, shown at the bottom of a section. */
export function ScrollNudge({ text, className = '' }: { text: string; className?: string }) {
  return (
    <div className={`scroll-nudge ${className}`} aria-hidden="true">
      <svg width="20" height="12" viewBox="0 0 20 12" fill="none">
        <path d="M2 2L10 10L18 2" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      <span>{text}</span>
    </div>
  );
}

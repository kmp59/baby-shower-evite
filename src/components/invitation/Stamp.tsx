import { useId } from 'react';

/** Circular "postmark" stamp with text curved around a star. */
export function Stamp({ text }: { text: string }) {
  const arcId = useId();
  return (
    <svg width="145" height="145" viewBox="0 0 145 145" fill="none" aria-hidden="true">
      <circle cx="72" cy="72" r="64" stroke="var(--accent)" strokeWidth="2.5" strokeDasharray="9,5" transform="rotate(12 72 72)" />
      <circle cx="72" cy="72" r="54" stroke="var(--accent)" strokeWidth="1" strokeDasharray="3,3" opacity=".5" />
      <defs>
        <path id={arcId} d="M72,72 m -52,0 a 52,52 0 1,1 104,0 a 52,52 0 1,1 -104,0" />
      </defs>
      <text fontSize="8.5" fill="var(--accent)" letterSpacing="2.8">
        <textPath href={`#${arcId}`}>{text}</textPath>
      </text>
      <path d="M72 60 L74.2 67 L81.5 67 L75.8 71.3 L78 78.5 L72 74.2 L66 78.5 L68.2 71.3 L62.5 67 L69.8 67 Z" fill="var(--accent)" opacity=".85" />
    </svg>
  );
}

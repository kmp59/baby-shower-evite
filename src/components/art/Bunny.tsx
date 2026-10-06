interface BunnyProps {
  /** Eyes: open and round, or closed and smiling (used on the thank-you screen). */
  mood?: 'default' | 'happy';
  /** Hold a carrot in the right paw. */
  carrot?: boolean;
  width?: number;
  className?: string;
}

/** The mascot: a sitting bunny. Colors come from CSS variables so it re-themes with tokens.css. */
export function Bunny({ mood = 'default', carrot = false, width = 130, className }: BunnyProps) {
  return (
    <svg
      className={className}
      width={width}
      height={(width * 150) / 130}
      viewBox="0 0 130 150"
      fill="none"
      role="img"
      aria-label="Cute bunny"
    >
      {/* Ears */}
      <ellipse cx="46" cy="30" rx="11" ry="28" fill="var(--fur)" transform="rotate(-8 46 30)" />
      <ellipse cx="46" cy="32" rx="5.5" ry="21" fill="var(--soft)" transform="rotate(-8 46 32)" />
      <ellipse cx="84" cy="30" rx="11" ry="28" fill="var(--fur)" transform="rotate(8 84 30)" />
      <ellipse cx="84" cy="32" rx="5.5" ry="21" fill="var(--soft)" transform="rotate(8 84 32)" />

      {/* Body */}
      <ellipse cx="65" cy="118" rx="31" ry="28" fill="var(--fur)" />
      <ellipse cx="65" cy="122" rx="20" ry="19" fill="var(--card-bg)" />
      <ellipse cx="48" cy="143" rx="14" ry="7" fill="var(--fur)" />
      <ellipse cx="82" cy="143" rx="14" ry="7" fill="var(--fur)" />

      {/* Head */}
      <circle cx="65" cy="68" r="31" fill="var(--fur)" />
      <ellipse cx="65" cy="79" rx="17" ry="12" fill="var(--card-bg)" />
      <circle cx="46" cy="76" r="5" fill="var(--soft)" opacity="0.55" />
      <circle cx="84" cy="76" r="5" fill="var(--soft)" opacity="0.55" />

      {/* Face */}
      {mood === 'default' ? (
        <>
          <circle cx="53" cy="65" r="4.5" fill="var(--text-main)" />
          <circle cx="77" cy="65" r="4.5" fill="var(--text-main)" />
          <circle cx="54.5" cy="63.5" r="1.6" fill="white" />
          <circle cx="78.5" cy="63.5" r="1.6" fill="white" />
        </>
      ) : (
        <>
          <path d="M48 66 Q53 60 58 66" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M72 66 Q77 60 82 66" stroke="var(--text-main)" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      <ellipse cx="65" cy="74" rx="4" ry="3" fill="var(--soft)" />
      <path
        d="M65 77 V81 M65 81 Q60 86 55 82 M65 81 Q70 86 75 82"
        stroke="var(--fur-dark)"
        strokeWidth="1.8"
        strokeLinecap="round"
      />

      {/* Bow tie */}
      <path d="M53 98 L65 104 L77 98 L65 92 Z" fill="var(--accent)" />
      <circle cx="65" cy="98" r="3.5" fill="var(--fur)" />

      {/* Paws (and optional carrot) */}
      <ellipse cx="42" cy="115" rx="9" ry="13" fill="var(--fur)" transform="rotate(12 42 115)" />
      <ellipse cx="88" cy="115" rx="9" ry="13" fill="var(--fur)" transform="rotate(-12 88 115)" />
      {carrot && (
        <g transform="rotate(20 98 112)">
          <path d="M92 104 L104 104 L98 134 Z" fill="#E8903A" />
          <path d="M98 104 Q92 92 96 88 Q99 96 98 104 Z M98 104 Q106 92 102 88 Q98 96 98 104 Z" fill="var(--sage)" />
        </g>
      )}
    </svg>
  );
}

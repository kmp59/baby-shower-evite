/** A hot-air balloon with a tiny bunny peeking out of the basket. */
export function HotAirBalloon({ width = 105 }: { width?: number }) {
  return (
    <svg width={width} height={(width * 148) / 105} viewBox="0 0 105 148" fill="none" aria-hidden="true">
      <ellipse cx="52" cy="54" rx="40" ry="46" fill="var(--sage)" />
      <path d="M52 8 Q60 12 65 26 Q68 40 66 54 Q64 68 60 80 Q56 90 52 96 Q48 90 44 80 Q40 68 38 54 Q36 40 39 26 Q44 12 52 8Z" fill="var(--accent)" opacity=".75" />
      <path d="M72 16 Q82 28 85 54 Q84 72 76 86 Q70 95 65 98 Q61 90 60 80 Q64 68 66 54 Q68 40 65 26 Q69 20 72 16Z" fill="var(--accent-2)" opacity=".5" />
      <path d="M32 16 Q22 28 19 54 Q20 72 28 86 Q34 95 39 98 Q43 90 44 80 Q40 68 38 54 Q36 40 39 26 Q35 20 32 16Z" fill="var(--accent-2)" opacity=".5" />
      <path d="M22 86 Q52 108 82 86" stroke="var(--basket)" strokeWidth="2" />
      <g stroke="var(--basket)" strokeWidth="1.5">
        <line x1="24" y1="88" x2="30" y2="118" />
        <line x1="80" y1="88" x2="74" y2="118" />
        <line x1="40" y1="97" x2="38" y2="118" />
        <line x1="64" y1="97" x2="66" y2="118" />
      </g>
      {/* Bunny peeking over the basket rim */}
      <ellipse cx="46" cy="108" rx="3" ry="8" fill="var(--fur)" />
      <ellipse cx="58" cy="108" rx="3" ry="8" fill="var(--fur)" />
      <circle cx="52" cy="124" r="9" fill="var(--fur)" />
      <circle cx="49" cy="122" r="1.6" fill="var(--text-main)" />
      <circle cx="55" cy="122" r="1.6" fill="var(--text-main)" />
      <ellipse cx="52" cy="126" rx="2" ry="1.4" fill="var(--soft)" />
      <rect x="28" y="125" width="49" height="17" rx="5" fill="var(--basket)" />
      <rect x="30" y="127" width="45" height="13" rx="4" fill="#EDD9B8" />
    </svg>
  );
}

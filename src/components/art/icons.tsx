import type { ReactNode } from 'react';

/** Outline icons share one wrapper so size and stroke stay consistent. */
function Icon({ size = 28, children }: { size?: number; children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {children}
    </svg>
  );
}

type IconProps = { size?: number };

export const CalendarIcon = (p: IconProps) => (
  <Icon {...p}>
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </Icon>
);

export const ClockIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </Icon>
);

export const MapPinIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </Icon>
);

export const CarrotIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M7 10 L17 14 L5 21 Q3 21 3 19 Z" />
    <path d="M14 7 Q15 3 19 3 Q19 7 15 8 M17 11 Q21 11 21 7 Q17 7 16 10" />
  </Icon>
);

export const FlowerIcon = (p: IconProps) => (
  <Icon {...p}>
    <circle cx="12" cy="12" r="3" />
    <path d="M12 9a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zM12 22a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7zM9 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0zM22 12a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
  </Icon>
);

export const HeartIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21.2l7.8-7.7 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
  </Icon>
);

export const BunnyIcon = (p: IconProps) => (
  <Icon {...p}>
    <path d="M9 3c-1.5 0-2 2-2 4s.7 4 2 4M15 3c1.5 0 2 2 2 4s-.7 4-2 4" />
    <circle cx="12" cy="16" r="6" />
    <path d="M10 15v.01M14 15v.01M11 18q1 1 2 0" />
  </Icon>
);

export const StarIcon = (p: IconProps) => (
  <Icon {...p}>
    <polygon points="12 2 15.1 8.3 22 9.3 17 14.1 18.2 21 12 17.8 5.8 21 7 14.1 2 9.3 8.9 8.3" />
  </Icon>
);

import type { ReactNode } from 'react';
import { FadeIn } from '../ui/FadeIn';

interface DetailTileProps {
  icon: ReactNode;
  label: string;
  /** One entry per line. */
  lines: string[];
  delay?: 1 | 2 | 3;
  /** Optional link wrapped around the last line (e.g. directions). */
  linkHref?: string;
  /** Optional content (e.g. a button) shown under the lines. */
  action?: ReactNode;
}

/** One cell of the date / time / venue grid. */
export function DetailTile({ icon, label, lines, delay, linkHref, action }: DetailTileProps) {
  return (
    <FadeIn className="detail-tile" delay={delay}>
      <span className="detail-tile__icon">{icon}</span>
      <span className="detail-tile__label">{label}</span>
      <span className="detail-tile__value">
        {lines.map((line, i) => {
          const isLinkLine = linkHref && i === lines.length - 1;
          return (
            <span key={line} className="detail-tile__line">
              {isLinkLine ? (
                <a href={linkHref} target="_blank" rel="noopener noreferrer">
                  {line}
                </a>
              ) : (
                line
              )}
            </span>
          );
        })}
      </span>
      {action && <span className="detail-tile__action">{action}</span>}
    </FadeIn>
  );
}

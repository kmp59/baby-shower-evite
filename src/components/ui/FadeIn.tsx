import type { ElementType, ReactNode } from 'react';
import { useInView } from '../../hooks/useInView';
import './FadeIn.css';

interface FadeInProps {
  as?: ElementType;
  className?: string;
  /** Stagger siblings: 1 = 0.1s, 2 = 0.2s, 3 = 0.3s. */
  delay?: 1 | 2 | 3;
  children: ReactNode;
}

/** Fades its children in the first time they scroll into view. */
export function FadeIn({ as: Tag = 'div', className = '', delay, children }: FadeInProps) {
  const { ref, inView } = useInView<HTMLElement>();
  const classes = ['fade-in', inView && 'fade-in--visible', delay && `fade-in--delay-${delay}`, className]
    .filter(Boolean)
    .join(' ');
  return (
    <Tag ref={ref} className={classes}>
      {children}
    </Tag>
  );
}

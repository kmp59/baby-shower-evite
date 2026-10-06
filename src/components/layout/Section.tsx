import type { ReactNode } from 'react';
import { FadeIn } from '../ui/FadeIn';
import './Section.css';

interface SectionProps {
  id: string;
  title?: string;
  children: ReactNode;
}

/** A centered content column with an optional heading. */
export function Section({ id, title, children }: SectionProps) {
  return (
    <section id={id}>
      <div className="section-inner">
        {title && (
          <FadeIn as="h2" className="section-title">
            {title}
          </FadeIn>
        )}
        {children}
      </div>
    </section>
  );
}

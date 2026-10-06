import { EVENT } from '../../config/event';
import { useRsvpForm } from '../../hooks/useRsvpForm';
import { Bunny } from '../art/Bunny';
import { Section } from '../layout/Section';
import { FadeIn } from '../ui/FadeIn';
import { RsvpForm } from './RsvpForm';
import { RsvpSuccess } from './RsvpSuccess';
import './RsvpSection.css';

export function RsvpSection() {
  const form = useRsvpForm();

  return (
    <Section id="rsvp" title={EVENT.rsvp.title}>
      <FadeIn delay={1} className="rsvp__mascot">
        <Bunny carrot />
      </FadeIn>

      <FadeIn delay={1} className="rsvp-card">
        <div className="rsvp-card__header">
          <div className="rsvp-card__title">{EVENT.rsvp.headerTitle}</div>
          <div className="rsvp-card__subtitle">
            {EVENT.date} · {EVENT.venue.cityStateZip}
          </div>
        </div>
        <div className="rsvp-card__edge" />

        <div className="rsvp-card__body">
          {form.isSuccess ? (
            <RsvpSuccess isAttending={form.isAttending} />
          ) : (
            <>
              <p className="rsvp__deadline">
                Kindly respond by <strong>{EVENT.rsvpDeadline}</strong>
              </p>
              <RsvpForm form={form} />
            </>
          )}
        </div>
      </FadeIn>
    </Section>
  );
}

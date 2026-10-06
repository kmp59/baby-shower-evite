import { EVENT } from '../../config/event';
import type { useRsvpForm } from '../../hooks/useRsvpForm';
import { Button } from '../ui/Button';
import { FormField } from '../ui/FormField';
import './RsvpForm.css';

const ATTENDING_OPTIONS = [
  { value: 'Yes', label: EVENT.rsvp.yesLabel },
  { value: 'No', label: EVENT.rsvp.noLabel },
] as const;

export function RsvpForm({ form }: { form: ReturnType<typeof useRsvpForm> }) {
  const { values, setField, error, isSubmitting, isAttending, handleSubmit } = form;

  return (
    <form onSubmit={handleSubmit} noValidate>
      <FormField label="Full Name" htmlFor="rsvp-name" required>
        <input
          id="rsvp-name"
          type="text"
          placeholder="Your full name"
          autoComplete="name"
          value={values.name}
          onChange={(e) => setField('name', e.target.value)}
        />
      </FormField>

      <FormField label="Email Address" htmlFor="rsvp-email" required>
        <input
          id="rsvp-email"
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          value={values.email}
          onChange={(e) => setField('email', e.target.value)}
        />
      </FormField>

      <FormField label="Will you be attending?" required>
        <div className="rsvp-radios" role="radiogroup">
          {ATTENDING_OPTIONS.map(({ value, label }) => (
            <label key={value} className="rsvp-radio">
              <input
                type="radio"
                name="attending"
                value={value}
                checked={values.attending === value}
                onChange={() => setField('attending', value)}
              />
              <span className="rsvp-radio__dot" />
              {label}
            </label>
          ))}
        </div>
      </FormField>

      {/* Collapses when not attending; `inert` keeps hidden inputs out of tab order. */}
      <div className={`rsvp-collapsible ${isAttending ? '' : 'rsvp-collapsible--closed'}`} inert={!isAttending}>
        <FormField label="Number of Adults (including you)" htmlFor="rsvp-guests" required>
          <input
            id="rsvp-guests"
            type="number"
            min={1}
            max={EVENT.maxGuests}
            value={values.guests}
            onChange={(e) => setField('guests', e.target.value)}
          />
        </FormField>

        <FormField label="Number of Children" htmlFor="rsvp-children">
          <input
            id="rsvp-children"
            type="number"
            min={0}
            max={EVENT.maxChildren}
            value={values.children}
            onChange={(e) => setField('children', e.target.value)}
          />
        </FormField>
      </div>

      <FormField label={EVENT.rsvp.noteLabel} htmlFor="rsvp-message">
        <textarea
          id="rsvp-message"
          placeholder="Write something sweet…"
          value={values.message}
          onChange={(e) => setField('message', e.target.value)}
        />
      </FormField>

      {/* Spam trap: invisible to people and skipped by keyboard/screen readers; bots fill it in. */}
      <div className="rsvp-honeypot" aria-hidden="true">
        <label>
          Leave this field empty
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            value={values.website}
            onChange={(e) => setField('website', e.target.value)}
          />
        </label>
      </div>

      <div className="rsvp-error" role="alert">
        {error}
      </div>

      <Button type="submit" fullWidth disabled={isSubmitting}>
        {isSubmitting ? 'Sending…' : 'Send My RSVP 🐾'}
      </Button>
    </form>
  );
}

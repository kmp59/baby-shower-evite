import type { RsvpFormValues, RsvpSubmission } from '../types/rsvp';

export type ValidationResult =
  | { ok: true; submission: RsvpSubmission }
  | { ok: false; error: string };

/** Validates raw form values and, on success, returns the clean payload to send. */
export function validateRsvp(values: RsvpFormValues, maxGuests: number): ValidationResult {
  const name = values.name.trim();
  const email = values.email.trim();
  const message = values.message.trim();

  if (!name) return fail('Please enter your full name.');
  if (!/\S+@\S+\.\S+/.test(email)) return fail('Please enter a valid email address.');
  if (!values.attending) return fail("Please let us know if you'll be attending.");

  const isAttending = values.attending === 'Yes';
  const guests = Number(values.guests);
  if (isAttending && !(Number.isInteger(guests) && guests >= 1 && guests <= maxGuests)) {
    return fail(`Please enter the number of guests (1–${maxGuests}).`);
  }

  return {
    ok: true,
    submission: {
      name,
      email,
      attending: values.attending,
      guests: isAttending ? guests : 0,
      message,
      website: values.website,
    },
  };
}

const fail = (error: string): ValidationResult => ({ ok: false, error });

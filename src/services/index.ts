import { createHttpRsvpService, demoRsvpService } from './rsvpService';

const endpoint = import.meta.env.VITE_RSVP_ENDPOINT as string | undefined;

if (!endpoint) {
  console.warn(
    '[RSVP] VITE_RSVP_ENDPOINT is not set, so the form is in DEMO MODE and RSVPs are NOT saved. ' +
      'See docs/google-sheets-setup.md.',
  );
}

/** The active RSVP backend: HTTP if VITE_RSVP_ENDPOINT is set, otherwise demo mode. */
export const rsvpService = endpoint ? createHttpRsvpService(endpoint) : demoRsvpService;

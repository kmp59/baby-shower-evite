import type { RsvpSubmission } from '../types/rsvp';

/**
 * The only thing the UI knows about the backend.
 * To plug in a different data store (Firebase, Supabase, your own API…),
 * add another implementation of this interface and select it in `services/index.ts`.
 */
export interface RsvpService {
  submit(rsvp: RsvpSubmission): Promise<void>;
}

/** Demo mode: pretends to save. Used when no endpoint is configured. */
export const demoRsvpService: RsvpService = {
  async submit() {
    await new Promise((resolve) => setTimeout(resolve, 600));
  },
};

/** POSTs JSON to a URL, e.g. a Google Apps Script web app writing to a Google Sheet. */
export function createHttpRsvpService(endpoint: string): RsvpService {
  return {
    async submit(rsvp) {
      await fetch(endpoint, {
        method: 'POST',
        // Apps Script doesn't return CORS headers, so the response is opaque.
        // If your backend supports CORS, remove `no-cors` and check `response.ok`.
        mode: 'no-cors',
        headers: { 'Content-Type': 'text/plain;charset=utf-8' },
        body: JSON.stringify(rsvp),
      });
    },
  };
}

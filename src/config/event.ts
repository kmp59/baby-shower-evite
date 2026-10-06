/**
 * ✏️  EDIT THIS FILE to make the invitation yours. Every piece of guest-facing text lives here,
 * so no component code needs to change. The values below are an example event; replace all of them.
 */

/** Wording for the RSVP section, including the thank-you screens. */
export interface RsvpCopy {
  /** Heading above the RSVP card. */
  title: string;
  /** Gold band at the top of the RSVP card. */
  headerTitle: string;
  yesLabel: string;
  noLabel: string;
  /** Label for the optional message box. */
  noteLabel: string;
  successYes: { title: string; message: string };
  successNo: { title: string; message: string };
}

export interface EventConfig {
  honorees: string;
  /** Small line above the names in the hero. */
  heroEyebrow: string;
  tagline: string;
  welcomeMessage: string;
  date: string;
  time: string;
  /** Shown on three lines: place name, street address, then city/state/zip. */
  venue: { name: string; street: string; cityStateZip: string };
  rsvpDeadline: string;
  footerLine: string;
  /** Google Maps share link. Leave empty to hide the "Get Directions" button. */
  mapUrl: string;
  /** Free Google Maps embed (no API key) that shows a pin at the venue. */
  mapEmbedUrl: string;
  /** Used by the "Add to Calendar" button. `start` is local time at the venue (YYYY-MM-DDTHH:mm). */
  calendar: { start: string; durationMinutes: number };
  /** Intro line on the invitation card. */
  inviteIntro: string;
  /** Paragraph on the invitation card. */
  inviteBody: string;
  /** Text curved around the stamp on the invitation card. */
  stampText: string;
  /** Maximum guests one RSVP can claim. Keep equal to MAX_GUESTS in the Google Apps Script. */
  maxGuests: number;
  /** Maximum children one RSVP can claim. Keep equal to MAX_CHILDREN in the Google Apps Script. */
  maxChildren: number;
  rsvp: RsvpCopy;
}

const VENUE = {
  name: 'Holiday Inn Express & Suites Clearwater',
  street: '2580 Gulf to Bay Blvd',
  cityStateZip: 'Clearwater, FL 33765',
};
const MAP_QUERY = encodeURIComponent(`${VENUE.name}, ${VENUE.street}, ${VENUE.cityStateZip}`);

export const EVENT: EventConfig = {
  honorees: 'Pinali & Jignesh',
  heroEyebrow: "You're invited to a baby shower for",
  tagline: 'Our little bunny is on the way 🐰',
  welcomeMessage: 'Please join us for a shower honoring Pinali & Jignesh.',
  date: 'Sunday, January 3, 2027',
  time: '10:00 AM',
  venue: VENUE,
  rsvpDeadline: 'November 29, 2026',
  footerLine: "Hop on over. We can't wait to see you!",
  mapUrl: `https://www.google.com/maps/search/?api=1&query=${MAP_QUERY}`,
  mapEmbedUrl: `https://www.google.com/maps?q=${MAP_QUERY}&output=embed`,
  calendar: { start: '2027-01-03T10:00', durationMinutes: 240 },
  inviteIntro: 'Together with their families',
  inviteBody:
    'invite you to a shower of love as we welcome our little bunny. Come hop in and celebrate with all the love they deserve before the big day.',
  stampText: 'BABY SHOWER · JANUARY 2027 · CLEARWATER FL · ',
  maxGuests: 6,
  maxChildren: 6,
  rsvp: {
    title: 'Save Your Spot, Bunny Friend 🐰',
    headerTitle: 'RSVP · HOP ON IN',
    yesLabel: '🐰 Hopping with excitement — YES!',
    noLabel: "😢 Can't make it this time",
    noteLabel: 'Leave a little love note for Pinali & Jignesh 💛',
    successYes: {
      title: "You're on the list! 🥕",
      message: "Thank you for RSVP-ing! We can't wait to celebrate with you.",
    },
    successNo: {
      title: "We'll miss you! 💛",
      message: 'Thank you for letting us know. We hope to celebrate with you soon.',
    },
  },
};

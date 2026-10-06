import { EVENT } from '../config/event';

const pad = (n: number) => String(n).padStart(2, '0');

/** Formats a Date's local fields as an iCalendar floating time (no timezone), e.g. 20270103T100000. */
const toIcsLocal = (d: Date) =>
  `${d.getFullYear()}${pad(d.getMonth() + 1)}${pad(d.getDate())}T${pad(d.getHours())}${pad(d.getMinutes())}00`;

const escapeText = (text: string) => text.replace(/[\;,]/g, '\\$&').replace(/\n/g, '\\n');

/** Builds an .ics file for the event; opens in Apple, Google, and Outlook calendars. */
export function buildEventIcs(): string {
  const { calendar, venue, honorees } = EVENT;
  const start = new Date(calendar.start);
  const end = new Date(start.getTime() + calendar.durationMinutes * 60_000);
  const location = `${venue.name}, ${venue.street}, ${venue.cityStateZip}`;

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Baby Shower Invite//EN',
    'BEGIN:VEVENT',
    `UID:${toIcsLocal(start)}-baby-shower@invite`,
    `DTSTAMP:${new Date().toISOString().replace(/[-:]|\.\d{3}/g, '')}`,
    `DTSTART:${toIcsLocal(start)}`,
    `DTEND:${toIcsLocal(end)}`,
    `SUMMARY:${escapeText(`Baby Shower for ${honorees}`)}`,
    `LOCATION:${escapeText(location)}`,
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');
}

/** Downloads the event as an .ics file. */
export function downloadEventIcs() {
  const url = URL.createObjectURL(new Blob([buildEventIcs()], { type: 'text/calendar;charset=utf-8' }));
  const link = document.createElement('a');
  link.href = url;
  link.download = 'baby-shower.ics';
  document.body.appendChild(link);
  link.click();
  link.remove();
  URL.revokeObjectURL(url);
}

import { EVENT } from '../../config/event';
import { downloadEventIcs } from '../../utils/calendar';
import { Bunny } from '../art/Bunny';
import { Button } from '../ui/Button';

/** Confirmation shown after a successful RSVP. */
export function RsvpSuccess({ isAttending }: { isAttending: boolean }) {
  const { title, message } = isAttending ? EVENT.rsvp.successYes : EVENT.rsvp.successNo;

  return (
    <div className="rsvp-success">
      {isAttending && <Bunny mood="happy" width={90} className="rsvp-success__bunny" />}
      <h3>{title}</h3>
      <p>{message}</p>
      {isAttending && (
        <Button type="button" className="rsvp-success__calendar" onClick={downloadEventIcs}>
          Add to Calendar 📅
        </Button>
      )}
    </div>
  );
}

import { EVENT } from '../../config/event';
import { Bunny } from '../art/Bunny';

/** Confirmation shown after a successful RSVP. */
export function RsvpSuccess({ isAttending }: { isAttending: boolean }) {
  const { title, message } = isAttending ? EVENT.rsvp.successYes : EVENT.rsvp.successNo;

  return (
    <div className="rsvp-success">
      {isAttending && <Bunny mood="happy" width={90} className="rsvp-success__bunny" />}
      <h3>{title}</h3>
      <p>{message}</p>
    </div>
  );
}

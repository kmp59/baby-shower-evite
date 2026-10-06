import { EVENT } from '../../config/event';
import { BotanicalCorner } from '../art/BotanicalCorner';
import { Bunny } from '../art/Bunny';
import { CalendarIcon, ClockIcon, MapPinIcon } from '../art/icons';
import { ScrollNudge } from '../layout/ScrollNudge';
import { FadeIn } from '../ui/FadeIn';
import { Button } from '../ui/Button';
import { DetailTile } from './DetailTile';
import { MapEmbed } from './MapEmbed';
import { Stamp } from './Stamp';
import './InvitationSection.css';

const { venue } = EVENT;

export function InvitationSection() {
  return (
    <section id="invitation">
      <div className="invitation">
        <div className="invitation__wrapper">
          <div className="invitation__stamp">
            <Stamp text={EVENT.stampText} />
          </div>

          <FadeIn className="invite-card">
            <BotanicalCorner corner="top-left" />
            <BotanicalCorner corner="bottom-right" />

            <Bunny mood="happy" width={100} className="invite-card__bunny" />

            <p className="invite-card__intro">
              {EVENT.inviteIntro}
              <span className="invite-card__honorees">{EVENT.honorees}</span>
            </p>
            <p className="invite-card__body">{EVENT.inviteBody}</p>

            <div className="details-grid">
              <DetailTile icon={<CalendarIcon />} label="Date" lines={[EVENT.date]} delay={1} />
              <DetailTile icon={<ClockIcon />} label="Time" lines={[EVENT.time]} delay={2} />
              <DetailTile
                icon={<MapPinIcon />}
                label="Venue"
                lines={[venue.name, venue.street, venue.cityStateZip]}
                delay={3}
              />
            </div>

            <MapEmbed />

            <div className="invite-card__actions">
              {EVENT.mapUrl && (
                <Button href={EVENT.mapUrl}>
                  Get Directions
                </Button>
              )}
              {EVENT.calendarUrl && (
                <Button href={EVENT.calendarUrl}>
                  Add to Calendar
                </Button>
              )}
            </div>
          </FadeIn>
        </div>
        <ScrollNudge text="There's more to explore" className="invitation__nudge" />
      </div>
    </section>
  );
}

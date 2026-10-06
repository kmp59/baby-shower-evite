import { EVENT } from '../../config/event';
import './MapEmbed.css';

/** Plain Google Maps embed with a pin on the venue. */
export function MapEmbed() {
  return (
    <iframe
      className="map-embed"
      title={`Map showing ${EVENT.venue.name}`}
      src={EVENT.mapEmbedUrl}
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
      allowFullScreen
    />
  );
}

import { EVENT } from '../config/event';
import './Footer.css';

export function Footer() {
  return (
    <footer className="footer">
      <p className="footer__line">{EVENT.footerLine}</p>
      <p className="footer__details">
        Baby Shower for {EVENT.honorees} · {EVENT.date} · {EVENT.venue.name}, {EVENT.venue.cityStateZip}
      </p>
    </footer>
  );
}

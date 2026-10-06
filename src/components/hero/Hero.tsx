import { EVENT } from '../../config/event';
import { Bunny } from '../art/Bunny';
import { HotAirBalloon } from '../art/HotAirBalloon';
import { PampasGrass } from '../art/PampasGrass';
import { ScrollNudge } from '../layout/ScrollNudge';
import { Button } from '../ui/Button';
import { Balloons } from './Balloons';
import { Butterfly } from './Butterfly';
import { Sparkles } from './Sparkles';
import './Hero.css';

export function Hero() {
  return (
    <section id="hero" className="hero">
      <Butterfly />
      <Sparkles />
      <Balloons />

      <div className="hero__hot-air-balloon">
        <HotAirBalloon />
      </div>
      <div className="hero__grass hero__grass--left">
        <PampasGrass />
      </div>
      <div className="hero__grass hero__grass--right">
        <PampasGrass flip />
      </div>

      <div className="hero__content">
        <Bunny className="hero__bunny" />
        <p className="hero__eyebrow">{EVENT.heroEyebrow}</p>
        <h1 className="hero__title">{EVENT.honorees}</h1>
        <p className="hero__tagline">{EVENT.tagline}</p>
        <p className="hero__subtitle">{EVENT.welcomeMessage}</p>
        <Button href="#invitation">View Invitation</Button>
      </div>

      <ScrollNudge className="scroll-nudge--hero" text="Your invitation awaits below" />
    </section>
  );
}

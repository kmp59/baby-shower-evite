import { Footer } from './components/Footer';
import { Hero } from './components/hero/Hero';
import { InvitationSection } from './components/invitation/InvitationSection';
import { RsvpSection } from './components/rsvp/RsvpSection';
import { DripDivider } from './components/layout/DripDivider';
import { IconStrip } from './components/invitation/IconStrip';

export default function App() {
  return (
    <>
      <Hero />
      <DripDivider />
      <InvitationSection />
      <IconStrip />
      <RsvpSection />
      <Footer />
    </>
  );
}

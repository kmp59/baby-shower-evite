# Baby Shower Invitation

A bunny-themed baby shower invitation site with an RSVP form that saves responses to a Google Sheet.
Fork it, edit one config file, and publish it free on GitHub Pages.

## Make it your own (checklist)

> **⚠️ Update `src/config/event.ts` before you publish.** It holds an example event (names, date,
> venue, wording). Replace every value with your own, or your site will show the example details.

1. **Fork or clone**, then `npm install` and `npm run dev`.
2. **Edit `src/config/event.ts`**: names, date, venue, wording. It's the only file you need to change for content.
3. **Publish** with GitHub Pages: [docs/github-pages-setup.md](docs/github-pages-setup.md).
4. **Collect RSVPs** in your own Google Sheet: [docs/google-sheets-setup.md](docs/google-sheets-setup.md).
   You'll create the sheet and script in *your* Google account and put its URL in the `VITE_RSVP_ENDPOINT` setting.

Until step 4 is done, the form runs in demo mode (guests see a thank-you, nothing is saved).

React + TypeScript front end (built with Vite). The RSVP form talks to a swappable backend service.

## Getting started

```bash
npm install
npm run dev        # http://localhost:5173
npm run build      # type-check + production build into dist/
```

## Where things live

```
src/
  config/event.ts        All event text (names, date, venue, links). Edit this to change content.
  styles/                Design tokens (colors, fonts) and global base styles. Re-theme in tokens.css.
  components/
    art/                 Bunny, hot-air balloon, grass, leafy corners, icons (colors come from tokens.css)
    layout/              Section, DripDivider, ScrollNudge
    ui/                  Reusable pieces: Button, FormField, FadeIn
    hero/                Hero, floating Balloons, Sparkles, Butterfly
    invitation/          Invitation card, date/time/venue tiles, stamp, icon strip
    rsvp/                RSVP section, form, and success message
    Footer.tsx
  hooks/
    useRsvpForm.ts       RSVP form state + submit flow (components just render it)
    useInView.ts         Scroll-into-view detection used by FadeIn
  services/
    rsvpService.ts       RsvpService interface + demo and HTTP implementations
    index.ts             Picks which implementation the app uses
  types/rsvp.ts          Form values and the payload sent to the backend
  utils/validation.ts    Pure RSVP validation (easy to unit test)
```

Each component's CSS sits next to it (`Foo.tsx` + `Foo.css`).

## Plugging in the back end

The UI only calls `rsvpService.submit(rsvp)`. Two options:

1. **Google Sheets (set up):** the script is in `backend/google-apps-script/`. Follow
   `docs/google-sheets-setup.md`, then put the deployed URL in `.env.local` as `VITE_RSVP_ENDPOINT`.
   Any other HTTP endpoint that accepts the same JSON also works:
   `name, email, attending, guests, message, website` (`website` is a spam trap and is always empty for real guests).
2. **A different data store** (Firebase, Supabase, your own API): add a new implementation of
   `RsvpService` in `src/services/rsvpService.ts` and select it in `src/services/index.ts`.
   No component changes needed.

With no endpoint set, the form runs in demo mode and nothing is saved.

## Guides

- [Clone this site and publish it on your own GitHub Pages](docs/github-pages-setup.md)
- [Send RSVPs to a Google Sheet](docs/google-sheets-setup.md)

## License

[MIT](LICENSE). Free to use, copy and modify for your own event.

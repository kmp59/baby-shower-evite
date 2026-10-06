# Send RSVPs from the website to a Google Sheet

This connects the RSVP form to a Google Sheet so every response shows up as a row you can sort,
filter and share. It's free and takes about 15 minutes. You need a Google account. Use the one that
should own the guest list.

> **Forked this project?** Nothing here is tied to the original author. You create your own sheet and
> script in your own Google account, and your RSVPs go only there.

> **Also remember the events file.** Your site's names, date, venue and wording come from
> [`src/config/event.ts`](../src/config/event.ts). Replace the example values there with your own
> event's details (see [the GitHub Pages guide](github-pages-setup.md#3-make-it-yours)). While you're
> in that file, make `maxGuests` match `MAX_GUESTS` in the Apps Script.

## How it works

```
Guest fills in the form  →  website sends JSON to your Apps Script URL  →  script checks it
→  script writes a row in your Google Sheet
```

- The **website** (`src/services/rsvpService.ts`) posts the RSVP to a URL.
- The **Apps Script** (`backend/google-apps-script/Code.gs`) lives inside your Google Sheet. It
  re-validates the data and saves it.
- The **Sheet** is your database. Each guest becomes one row:

| Received At | Name | Email | Attending | Guests | Message |
|---|---|---|---|---|---|
| 2026-11-02 14:31 | Ann Lee | ann@example.com | Yes | 2 | Can't wait! |

## Part 1: Create the spreadsheet

1. Go to https://sheets.new and name it, for example **Baby Shower RSVPs**.
2. Leave it empty. The script creates an **RSVPs** tab with the header row on its own.

## Part 2: Add the script

1. In the sheet, open **Extensions → Apps Script**.
2. Delete the placeholder code, then paste in everything from
   [`backend/google-apps-script/Code.gs`](../backend/google-apps-script/Code.gs).
3. Check the settings at the top of the script:

   | Setting | Meaning |
   |---|---|
   | `SHEET_NAME` | Name of the tab that holds the RSVPs (default `RSVPs`) |
   | `MAX_GUESTS` | Must match `maxGuests` in `src/config/event.ts` (default `6`) |
   | `NOTIFY_EMAIL` | Optional. An address to email on every RSVP. Leave `''` for no emails. |

4. Click **Save** (the disk icon).

## Part 3: Authorize it (one time)

1. In the editor's function dropdown (next to **Run**), choose **setup**, then click **Run**.
2. Google asks for permission. Click **Review permissions**, choose your account, then
   **Advanced → Go to <project name> (unsafe) → Allow**.
   The "unsafe" warning appears because you wrote the script yourself and Google hasn't reviewed it.
3. Go back to the sheet. A new **RSVPs** tab with a bold header row now exists.

## Part 4: Deploy it as a web app

1. Click **Deploy → New deployment**.
2. Click the gear icon next to **Select type** and choose **Web app**.
3. Set:
   - **Execute as:** Me
   - **Who has access:** **Anyone**

   > It must be **Anyone**, not "Anyone with Google account". Otherwise Google asks website visitors
   > to sign in and the form's submissions are rejected.
4. Click **Deploy**, then copy the **Web app URL**. It looks like
   `https://script.google.com/macros/s/AKfy…/exec`.
5. Test it: paste the URL into a browser tab. You should see
   `{"ok":true,"message":"RSVP endpoint is running."}`.

## Part 5: Connect the website

### While developing on your computer

1. In the project folder, copy the example environment file:

   ```bash
   cp .env.example .env.local
   ```

2. Put your URL in `.env.local`:

   ```
   VITE_RSVP_ENDPOINT=https://script.google.com/macros/s/XXXXXXXX/exec
   ```

3. Restart the dev server (`Ctrl+C`, then `npm run dev`). Environment files are only read at startup.
4. Submit a test RSVP on http://localhost:5173. A row should appear in the sheet within a few seconds.

### On your published GitHub Pages site

The live site is built by GitHub, which has no access to your `.env.local` file, so give it the URL:

1. On your repo, go to **Settings → Secrets and variables → Actions → Variables** tab.
2. Click **New repository variable**.
   - **Name:** `VITE_RSVP_ENDPOINT`
   - **Value:** your Web app URL
3. Re-run the deploy: **Actions → Deploy to GitHub Pages → Run workflow**.
4. Submit a test RSVP on the live site and check the sheet.

> The URL becomes visible in the published page's code. That's expected. The script validates every
> RSVP itself, and the worst anyone can do is submit extra RSVPs.

## What the script does with each RSVP

- **One row per email.** A repeat RSVP from the same email (case-insensitive) updates that guest's row
  instead of adding a duplicate, which is handy when someone changes their mind.
- **Re-checks everything.** Name and email must be valid, "Attending" must be Yes or No, and the guest
  count must be 1 to `MAX_GUESTS`. A "No" always saves 0 guests.
- **Neutralizes spreadsheet formulas.** Text starting with `=`, `+`, `-` or `@` is stored as plain text.
- **Blocks simple bots.** The form has a hidden "website" field that people never see. If it's filled,
  the RSVP is silently discarded.
- **Handles simultaneous RSVPs safely.** Submissions are queued so two guests at once don't overwrite
  each other.

## Changing the script later

Edits don't go live until you publish a new version:

**Deploy → Manage deployments → pencil icon → Version: New version → Deploy.**

The URL stays the same. (Choosing "New deployment" instead creates a different URL.)

## Testing from the terminal (optional)

```bash
curl -L -H "Content-Type: text/plain" \
  -d '{"name":"Test Guest","email":"test@example.com","attending":"Yes","guests":2,"message":"Hello","website":""}' \
  "https://script.google.com/macros/s/XXXXXXXX/exec"
```

You should get `{"ok":true}` and a new row. Run it again with `"guests":3` and the same email to
see the row update. Delete test rows from the sheet afterwards.

## Good to know

- **Success is shown optimistically.** Google doesn't allow the website to read the script's reply, so
  the form shows "You're on the list!" as soon as the request is sent. For the first few real RSVPs,
  confirm they arrive in the sheet.
- **Keep the sheet private.** It contains guests' email addresses. Share it only with the hosts
  (the **Share** button, "Restricted"). The web app URL doesn't expose the sheet's contents.
- **Quotas.** A free Google account allows far more script runs per day than a guest list needs.
  If you enable `NOTIFY_EMAIL`, free accounts can send about 100 emails a day.
- **Closing RSVPs.** To stop accepting responses, open **Deploy → Manage deployments**, then archive
  the deployment (or set **Who has access** to **Only myself**).

## Troubleshooting

| Problem | Fix |
|---|---|
| **No rows appear** | Open the web app URL in a browser. If you don't see `"ok":true`, the deployment's access isn't **Anyone**. Otherwise check **Executions** in the Apps Script sidebar for errors. |
| **Browser shows a Google sign-in page** | **Who has access** isn't set to **Anyone**. Edit the deployment and redeploy. |
| **Works locally but not on the live site** | The `VITE_RSVP_ENDPOINT` repo variable is missing or was added after the last deploy. Add it, then re-run the deploy workflow. |
| **Works on the live site but not locally** | `.env.local` is missing, has a typo, or you didn't restart `npm run dev`. |
| **Changed the script but behavior is the same** | You edited the code but didn't publish a **New version** (see above). |
| **Guest count rejected** | The form's `maxGuests` and the script's `MAX_GUESTS` don't match. Make them equal. |
| **"Authorization required" in Executions** | Run **setup** from the editor again and approve the permissions. |
| **Form says success but sheet is empty** | The request was sent but rejected or never arrived. Check **Executions** for errors, and make sure the URL ends in `/exec`, not `/dev`. |

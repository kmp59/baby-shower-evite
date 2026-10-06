# Clone this site and publish it on your own GitHub Pages

This walks you from "I have the code" to "my invitation is live at
`https://<your-username>.github.io/<repo-name>/`". Plan on about 20 minutes.

> **⚠️ Before you publish: update the events file.**
> The site ships with an example event (someone else's names, date and venue). Open
> **[`src/config/event.ts`](../src/config/event.ts)** and replace every value (names, date, time, venue,
> RSVP deadline, and the wording) with your own. Until you do, your public site shows the example
> details. See [step 3](#3-make-it-yours).

## What you need

- A free [GitHub account](https://github.com/signup)
- [Git](https://git-scm.com/downloads) installed
- [Node.js](https://nodejs.org) 20 or newer (check with `node -v`)
- Optional: the [GitHub CLI](https://cli.github.com) (`gh`) for a faster setup

> **Public repo required.** GitHub Pages on a free account only works for **public** repositories,
> so anyone can see the code. Don't put secrets in it. The RSVP URL is not a secret.

## 1. Get the code

**Easiest: fork it on GitHub.** Open the project's repo page, click **Fork** (top right), pick your
account, and choose a repo name (it becomes part of your site address). Then clone **your fork**:

```bash
git clone https://github.com/<your-username>/<your-repo-name>.git
cd <your-repo-name>
```

If you fork, skip step 4 (your fork is already your own repo) and read the fork notes in step 5.

**Alternative: clone and start a fresh repo.** Clone the project, then follow step 4 to push it to a new
repo of your own:

```bash
git clone <URL-of-this-project> my-baby-shower
cd my-baby-shower
```

## 2. Run it on your computer

```bash
npm install
npm run dev
```

Open the address it prints (usually http://localhost:5173). Edits you make now show up instantly.

## 3. Make it yours

Almost everything you'll want to change is in one file: **`src/config/event.ts`**.

| Setting | What it controls |
|---|---|
| `honorees` | The names in the hero, on the invitation card, and in the browser tab title |
| `heroEyebrow`, `tagline`, `welcomeMessage` | The small line above the names, the script tagline, and the line under it |
| `date`, `time` | The Date and Time tiles |
| `venue` (`name`, `street`, `cityStateZip`) | The three-line Venue tile, the map pin and the "Get Directions" link |
| `rsvpDeadline` | "Kindly respond by …" |
| `inviteIntro`, `inviteBody`, `stampText` | Text on the invitation card and the round stamp |
| `footerLine` | The closing line in the footer |
| `calendarUrl` | Optional "Add to Calendar" link (the button is hidden when empty) |
| `maxGuests` | Highest guest count one RSVP can claim (keep it equal to `MAX_GUESTS` in the Google script) |
| `rsvp` | All RSVP wording: section heading, card header, Yes/No labels, message label, and both thank-you screens |

The values in the file are an example event. **Replace every one of them** before you publish, or your
site will show someone else's names and address.

Colors and fonts live in `src/styles/tokens.css`. The bunny artwork is in `src/components/art/`.

## 4. Create your own repository and push

You want the site in **your** GitHub account, not connected to the original project.

**Option A, GitHub CLI** (replace `my-baby-shower` with the name you want):

```bash
rm -rf .git
git init -b main
git add .
git commit -m "My baby shower invite"
gh auth login                      # first time only
gh repo create my-baby-shower --public --source=. --push
```

**Option B, website:**

1. Go to https://github.com/new, name the repo, choose **Public**, and do **not** add a README. Click **Create repository**.
2. Then in your terminal:

```bash
rm -rf .git
git init -b main
git add .
git commit -m "My baby shower invite"
git remote add origin https://github.com/<your-username>/<repo-name>.git
git push -u origin main
```

> The repo name becomes part of your site address: `https://<your-username>.github.io/<repo-name>/`.
> Pick a name you're happy to share, such as `baby-shower-evite`.

## 5. Turn on GitHub Pages

The project already includes a workflow (`.github/workflows/deploy.yml`) that builds the site and
publishes it. You only need to tell GitHub to use it:

1. **If you forked:** open the **Actions** tab and click **"I understand my workflows, go ahead and
   enable them"**. GitHub turns Actions off on forks by default, so nothing deploys until you do this.
2. Go to **Settings → Pages**.
3. Under **Build and deployment → Source**, choose **GitHub Actions**.
4. Push any change (or use **Actions → Deploy to GitHub Pages → Run workflow**) to trigger the first deploy.

## 6. Wait for the first deploy

1. Open the **Actions** tab. The **Deploy to GitHub Pages** run starts on its own after your push
   (or click **Run workflow** if it didn't). It takes 1–2 minutes.
2. When both steps are green, open `https://<your-username>.github.io/<repo-name>/`.

If the first run happened before you finished step 5, re-run it: **Actions → Deploy to GitHub Pages →
Run workflow**.

## 7. Publish changes later

Edit, commit and push. The site redeploys automatically.

```bash
git add .
git commit -m "Update details"
git push
```

## 8. Connect the RSVP form to a Google Sheet

Until you do this, the form runs in **demo mode**: guests see "You're on the list!" but nothing is saved.
Follow [`google-sheets-setup.md`](google-sheets-setup.md). It ends with adding a repository variable so
your published site sends RSVPs to your sheet.

## Optional: a shorter address

A repo named exactly `<your-username>.github.io` is served at `https://<your-username>.github.io/`
with no sub-path. You can use that for one site per account. To use a custom domain, see
GitHub's Pages docs: **Settings → Pages → Custom domain**.

## Troubleshooting

| Problem | Fix |
|---|---|
| **Pages option says "upgrade" or is missing** | The repo is private. Make it public: Settings → General → Danger Zone → Change visibility. |
| **Nothing deploys after forking** | Actions are disabled on new forks. Enable them in the **Actions** tab (step 5). |
| **The site shows someone else's names** | You haven't edited `src/config/event.ts` yet (step 3). |
| **Site shows 404** | Wait a couple of minutes after the first green deploy. Confirm Settings → Pages → Source is **GitHub Actions**, and check the URL spelling and capitalization. |
| **Blank page** | Open the browser console (F12). If files fail to load, make sure you deployed through the workflow rather than uploading the source files, because the site has to be built first. |
| **Actions run is red** | Open the run and read the failing step. `npm ci` errors usually mean `package-lock.json` is missing from the repo. |
| **I still see the old version** | Hard refresh (Cmd/Ctrl+Shift+R). Check that the latest Actions run finished. |
| **`git push` asks for a password** | GitHub no longer accepts passwords. Run `gh auth login`, or use a [personal access token](https://github.com/settings/tokens). |

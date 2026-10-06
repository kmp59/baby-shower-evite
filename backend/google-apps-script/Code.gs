/**
 * RSVP backend for the baby shower site: receives the form's JSON and stores one row per guest
 * in the Google Sheet this script is attached to.
 *
 * Setup steps are in docs/google-sheets-setup.md.
 *
 * Request body (JSON sent as text/plain):
 *   { name, email, attending: "Yes" | "No", guests: number, children: number, message, website }
 * `website` is a hidden spam-trap field: real people leave it empty.
 */

// ---------- Settings you may want to change ----------
const SHEET_NAME = 'RSVPs';
// Only needed if the script was NOT opened from the sheet via Extensions → Apps Script.
// Paste the sheet's ID here (the long part of its URL between /d/ and /edit).
const SPREADSHEET_ID = '';
const MAX_GUESTS = 6;       // keep in sync with maxGuests in src/config/event.ts
const MAX_CHILDREN = 6;     // keep in sync with maxChildren in src/config/event.ts
const NOTIFY_EMAIL = '';    // optional: an address to email on every RSVP (leave '' for none)

const HEADERS = ['Received At', 'Name', 'Email', 'Attending', 'Guests', 'Children', 'Message'];
const COL = { RECEIVED_AT: 1, NAME: 2, EMAIL: 3, ATTENDING: 4, GUESTS: 5, CHILDREN: 6, MESSAGE: 7 };

// ---------- Web app entry points ----------

/** Visiting the URL in a browser shows this, which is a quick way to check the deployment works. */
function doGet() {
  return jsonResponse({ ok: true, message: 'RSVP endpoint is running.' });
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(10000); // stops two simultaneous RSVPs from overwriting each other

    const data = JSON.parse(e.postData.contents);

    // Spam trap: bots fill every field. Pretend it worked, store nothing.
    if (data.website) return jsonResponse({ ok: true });

    const result = validate(data);
    if (result.error) return jsonResponse({ ok: false, error: result.error });

    saveRsvp(result.rsvp);
    notify(result.rsvp);
    return jsonResponse({ ok: true });
  } catch (err) {
    console.error(err);
    return jsonResponse({ ok: false, error: 'Something went wrong.' });
  } finally {
    lock.releaseLock();
  }
}

/** Optional: run once from the editor to create the header row before the first RSVP arrives. */
function setup() {
  const spreadsheet = getSheet().getParent();
  // Open the Execution log to see which spreadsheet the RSVPs tab was created in.
  console.log('RSVPs tab is ready in "' + spreadsheet.getName() + '": ' + spreadsheet.getUrl());
}

// ---------- Validation ----------

/** Re-checks everything on the server; never trust the browser. Returns { rsvp } or { error }. */
function validate(data) {
  const name = String(data.name || '').trim();
  const email = String(data.email || '').trim();
  const message = String(data.message || '').trim();
  const attending = data.attending;

  if (!name || name.length > 100) return { error: 'Invalid name.' };
  if (!/^\S+@\S+\.\S+$/.test(email) || email.length > 200) return { error: 'Invalid email.' };
  if (attending !== 'Yes' && attending !== 'No') return { error: 'Invalid attending value.' };
  if (message.length > 1000) return { error: 'Message too long.' };

  let guests = 0;
  let children = 0;
  if (attending === 'Yes') {
    guests = Number(data.guests);
    if (!Number.isInteger(guests) || guests < 1 || guests > MAX_GUESTS) return { error: 'Invalid guest count.' };
    children = Number(data.children || 0);
    if (!Number.isInteger(children) || children < 0 || children > MAX_CHILDREN) return { error: 'Invalid children count.' };
  }

  return { rsvp: { name: name, email: email, attending: attending, guests: guests, children: children, message: message } };
}

// ---------- Storage ----------

/**
 * One row per email address: a repeat RSVP from the same email updates that guest's row
 * instead of adding a duplicate (handy when someone changes their mind).
 */
function saveRsvp(rsvp) {
  const sheet = getSheet();
  const row = [new Date(), safeText(rsvp.name), rsvp.email, rsvp.attending, rsvp.guests, rsvp.children, safeText(rsvp.message)];
  const existingRow = findRowByEmail(sheet, rsvp.email);

  if (existingRow) {
    sheet.getRange(existingRow, 1, 1, HEADERS.length).setValues([row]);
  } else {
    sheet.appendRow(row);
  }
}

function findRowByEmail(sheet, email) {
  const lastRow = sheet.getLastRow();
  if (lastRow < 2) return null;
  const emails = sheet.getRange(2, COL.EMAIL, lastRow - 1, 1).getValues();
  const target = email.toLowerCase();
  for (let i = 0; i < emails.length; i++) {
    if (String(emails[i][0]).toLowerCase() === target) return i + 2; // +2: skip header, 1-based rows
  }
  return null;
}

/** The spreadsheet the script is attached to, or the one named by SPREADSHEET_ID. */
function getSpreadsheet() {
  const spreadsheet = SPREADSHEET_ID ? SpreadsheetApp.openById(SPREADSHEET_ID) : SpreadsheetApp.getActiveSpreadsheet();
  if (!spreadsheet) {
    throw new Error(
      'No spreadsheet found. Open your Google Sheet and use Extensions → Apps Script to create the script, ' +
        'or paste the sheet ID into SPREADSHEET_ID at the top of this file.'
    );
  }
  return spreadsheet;
}

/** Gets (or creates) the RSVPs tab with a bold, frozen header row. */
function getSheet() {
  const spreadsheet = getSpreadsheet();
  let sheet = spreadsheet.getSheetByName(SHEET_NAME);
  if (!sheet) {
    sheet = spreadsheet.insertSheet(SHEET_NAME);
    sheet.getRange(1, 1, 1, HEADERS.length).setValues([HEADERS]).setFontWeight('bold');
    sheet.setFrozenRows(1);
    sheet.getRange(2, COL.RECEIVED_AT, sheet.getMaxRows() - 1, 1).setNumberFormat('yyyy-mm-dd hh:mm');
  }
  return sheet;
}

/** Stops guest text such as "=HYPERLINK(...)" from being run as a spreadsheet formula. */
function safeText(value) {
  return /^[=+\-@]/.test(value) ? "'" + value : value;
}

// ---------- Helpers ----------

function notify(rsvp) {
  if (!NOTIFY_EMAIL) return;
  const subject = 'New RSVP: ' + rsvp.name + ' (' + rsvp.attending + ')';
  const body = 'Name: ' + rsvp.name + '\nEmail: ' + rsvp.email + '\nAttending: ' + rsvp.attending +
    '\nGuests: ' + rsvp.guests + '\nChildren: ' + rsvp.children + '\nMessage: ' + rsvp.message;
  MailApp.sendEmail(NOTIFY_EMAIL, subject, body);
}

function jsonResponse(object) {
  return ContentService.createTextOutput(JSON.stringify(object)).setMimeType(ContentService.MimeType.JSON);
}

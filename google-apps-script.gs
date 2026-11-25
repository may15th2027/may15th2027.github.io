/**
 * Wedding website → Google Sheet
 * Saves RSVPs, Forum messages and photo comments, and gives the
 * messages / comments back to the website so every visitor can read them.
 *
 * Setup (5 minutes):
 *  1. Create a Google Sheet (e.g. "Wedding RSVPs").
 *  2. Extensions → Apps Script. Delete the sample code, paste this whole file, Save.
 *  3. Deploy → New deployment → type "Web app"
 *       Execute as: Me
 *       Who has access: Anyone
 *     Click Deploy, authorize, and copy the Web app URL (ends with /exec).
 *  4. Paste that URL into config.js → rsvpEndpoint.
 *
 * Changed this file later? Deploy → Manage deployments → ✏️ Edit → Version: "New version" → Deploy
 * (the URL stays the same).
 *
 * Tabs it creates:
 *   RSVPs    — one row per RSVP
 *   Messages — Forum
 *   Comments — comments under gallery photos ("photo" = the photo's file inside assets/gallery/)
 * To remove a message or comment from the website, type anything (e.g. x) in its "hide" column.
 */
const HEADERS = ["timestamp", "name", "email", "attending", "guests", "party", "dietary", "song", "message"];
const NOTE_HEADERS = ["time", "id", "photo", "name", "text", "hide"];

function json(o) {
  return ContentService.createTextOutput(JSON.stringify(o)).setMimeType(ContentService.MimeType.JSON);
}
// Prefix with ' so values like "=..." are stored as text, not formulas
function safe(v) {
  return typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v;
}
function clean(v, max) {
  return String(v == null ? "" : v).replace(/[\u0000-\u0008\u000B-\u001F]/g, "").trim().slice(0, max);
}
function tab(name, headers) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(name) || ss.insertSheet(name);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
  }
  return sheet;
}

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    if (data.kind === "message" || data.kind === "comment") return addNote(data);
    const sheet = tab("RSVPs", HEADERS);
    sheet.appendRow(HEADERS.map((h) => safe(data[h] == null ? "" : data[h])));
    return json({ ok: true });
  } catch (err) {
    return json({ ok: false, error: String(err) });
  } finally {
    lock.releaseLock();
  }
}

function addNote(d) {
  if (d.website) return json({ ok: true }); // filled-in hidden field = a spam bot; quietly ignore
  const comment = d.kind === "comment";
  const name = clean(d.name, 40), text = clean(d.text, comment ? 300 : 500);
  if (!name || !text) return json({ ok: false, error: "empty" });
  const sheet = tab(comment ? "Comments" : "Messages", NOTE_HEADERS);
  sheet.appendRow([new Date(), clean(d.id, 24), comment ? safe(clean(d.photo, 300)) : "", safe(name), safe(text), ""]);
  return json({ ok: true });
}

function readNotes(name) {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(name);
  if (!sheet || sheet.getLastRow() < 2) return [];
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, NOTE_HEADERS.length).getValues();
  return rows
    .filter((r) => r[4] !== "" && String(r[5]).trim() === "")
    .slice(-500)
    .map((r) => ({ time: r[0] instanceof Date ? r[0].toISOString() : String(r[0]), id: String(r[1]), photo: String(r[2]), name: String(r[3]), text: String(r[4]) }));
}

function doGet(e) {
  if (e && e.parameter && e.parameter.action === "notes") {
    return json({ ok: true, messages: readNotes("Messages"), comments: readNotes("Comments") });
  }
  return ContentService.createTextOutput("Wedding website endpoint is running ♥");
}

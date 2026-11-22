/**
 * RSVP → Google Sheet
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
 * Each RSVP becomes one row on the "RSVPs" tab.
 */
const HEADERS = ["timestamp", "name", "email", "attending", "guests", "party", "dietary", "song", "message"];

function doPost(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const data = JSON.parse(e.postData.contents);
    const ss = SpreadsheetApp.getActiveSpreadsheet();
    const sheet = ss.getSheetByName("RSVPs") || ss.insertSheet("RSVPs");
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(HEADERS);
      sheet.setFrozenRows(1);
    }
    // Prefix with ' so values like "=..." are stored as text, not formulas
    sheet.appendRow(HEADERS.map((h) => {
      const v = data[h] == null ? "" : data[h];
      return typeof v === "string" && /^[=+\-@]/.test(v) ? "'" + v : v;
    }));
    return ContentService.createTextOutput(JSON.stringify({ ok: true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) })).setMimeType(ContentService.MimeType.JSON);
  } finally {
    lock.releaseLock();
  }
}

function doGet() {
  return ContentService.createTextOutput("RSVP endpoint is running ♥");
}

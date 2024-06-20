// copy this to google scripts
const calendarIds = ["[calendarID]@gmail.com"];

const range = "A1:C5";

const optionalArgs = {
  timeMin: new Date().toISOString(),
  showDeleted: false,
  singleEvents: true,
  maxResults: 5,
  orderBy: "startTime",
};

function listUpcomingEvents() {
  const events = calendarIds.flatMap(
    (item) => Calendar.Events.list(item, optionalArgs).items
  );

  const simpleEvets = events.map((event) => [
    event.start.dateTime ? event.start.dateTime : event.start.date,
    event.summary,
    event.location,
  ]);
  SpreadsheetApp.getActiveSpreadsheet().getRange(range).setValues(simpleEvets);
}

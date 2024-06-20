const mySheetUrl =
  "https://docs.google.com/spreadsheets/d/e/2PACX-1vTG6-kCdi37LgGvxFrNs2sNq95MDVW3cP70QFoDWu3HzoOYm9ZYTpZHZunFX5-nY2EjU95BPO_A_XFv/pub?output=tsv";

const getData = async (url) => {
  const response = await fetch(url);
  return response.text();
};

getData(mySheetUrl).then((data) => {
  const events = data
    .split(/\r?\n/)
    .map((l) => l.split("\t"))
    .map((event) => {
      return {
        date: event[0],
        title: event[1],
        location: event[2],
      };
    });
  attachEvents(events);
});

const attachEvents = (events) => {
  let htmlToAppend = "";

  events.forEach((event) => {
    htmlToAppend += `
    <div>
    <h2>${event.title}</h2>
    <em>${new Date(event.date).toLocaleDateString("cs-CZ")}</em>
    ${event.location && `<p>${event.location}</p>`}
    </div>`;
  });

  document.getElementById("events").innerHTML = htmlToAppend;
};

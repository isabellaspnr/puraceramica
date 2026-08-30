 module.exports = function (eleventyConfig) {

    // Workshop-Termine automatisch nach Monat gruppieren
  eleventyConfig.addFilter("workshopMonths", function (sessions, language = "en") {
    if (!Array.isArray(sessions)) return [];

    const monthNames = {
      en: [
        "January", "February", "March", "April",
        "May", "June", "July", "August",
        "September", "October", "November", "December"
      ],
      pt: [
        "Janeiro", "Fevereiro", "Março", "Abril",
        "Maio", "Junho", "Julho", "Agosto",
        "Setembro", "Outubro", "Novembro", "Dezembro"
      ]
    };

    const weekdayNames = {
      en: ["Sun.", "Mon.", "Tue.", "Wed.", "Thu.", "Fri.", "Sat."],
      pt: ["Dom.", "Seg.", "Ter.", "Qua.", "Qui.", "Sex.", "Sáb."]
    };

    const sorted = [...sessions].sort((a, b) =>
      a.date.localeCompare(b.date)
    );

    const groups = [];

    sorted.forEach((session) => {
      const [year, month, day] = session.date.split("-").map(Number);
      const monthKey = `${year}-${String(month).padStart(2, "0")}`;

      let group = groups.find((item) => item.key === monthKey);

      if (!group) {
        group = {
          key: monthKey,
          label: monthNames[language][month - 1],
          year,
          sessions: []
        };

        groups.push(group);
      }

      const date = new Date(Date.UTC(year, month - 1, day));
      const weekday = weekdayNames[language][date.getUTCDay()];

      group.sessions.push({
        ...session,
        displayDate:
          `${weekday} ${String(day).padStart(2, "0")}.` +
          `${String(month).padStart(2, "0")}.`
      });
    });

    return groups;
  });

  eleventyConfig.addPassthroughCopy("src/assets");

  eleventyConfig.addPassthroughCopy("src/.htaccess");

  eleventyConfig.addPassthroughCopy("src/robots.txt");

  eleventyConfig.addPassthroughCopy("src/sitemap.xml");

  eleventyConfig.addFilter("workshopInstructors", function (sessions, instructorData) {
  if (!Array.isArray(sessions) || !instructorData) return [];

  const seen = new Set();

  return sessions
    .map(session => session.instructor)
    .filter(Boolean)
    .filter(instructorId => {
      if (seen.has(instructorId)) return false;

      seen.add(instructorId);
      return true;
    })
    .map(instructorId => instructorData[instructorId])
    .filter(Boolean);
});

  eleventyConfig.addFilter(
    "relatedWorkshops",
    function (allWorkshops, currentWorkshopId, limit = 3) {
      if (!allWorkshops || !currentWorkshopId) return [];

      const current = allWorkshops[currentWorkshopId];
      if (!current) return [];

      return Object.values(allWorkshops)
        .filter(workshop => workshop && workshop.id !== currentWorkshopId)
        .map(workshop => {
          let score = 0;

          if (workshop.medium === current.medium) score += 2;
          if (workshop.type === current.type) score += 1;
          if (workshop.level === current.level) score += 1;

          return {
            workshop,
            score
          };
        })
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(item => item.workshop);
    }
  );

  eleventyConfig.addFilter("workshopDate", function (dateString, lang = "en") {
  if (!dateString) return "";

  const date = new Date(`${dateString}T12:00:00Z`);

  return new Intl.DateTimeFormat(
    lang === "pt" ? "pt-PT" : "en-GB",
    {
      weekday: "short",
      day: "numeric",
      month: "long",
      timeZone: "UTC"
    }
  ).format(date);
});

eleventyConfig.addFilter("workshopMonthName", function (dateString, lang = "en") {
  if (!dateString) return "";

  const date = new Date(`${dateString}T12:00:00Z`);

  return new Intl.DateTimeFormat(
    lang === "pt" ? "pt-PT" : "en-GB",
    {
      month: "long",
      timeZone: "UTC"
    }
  ).format(date);
});



// Alle Workshop-Termine für What's On / Kalender zusammenführen
eleventyConfig.addFilter("workshopEvents", function (allWorkshops, lang = "en") {
  if (!allWorkshops) return [];

  const events = [];

  Object.values(allWorkshops).forEach((workshop) => {
    if (!workshop) return;

    const t = workshop[lang] || workshop.en;
    if (!t) return;

    const workshopUrl = t.url || (workshop.en && workshop.en.url);

    // Normale einzelne Workshop-Termine
    if (Array.isArray(workshop.dates)) {
      workshop.dates.forEach((session) => {
        events.push({
          workshopId: workshop.id,
          title: t.title,
          shortTitle: t.shortTitle || t.title,
          pageTag: t.pageTag || "",
          url: workshopUrl,

          type: workshop.type,
          format: workshop.format,
          calendarCategory: workshop.calendarCategory || "default",

          date: session.date,
          start: session.start,
          end: session.end,

          instructor: session.instructor || null,
language:
  session.language ||
  t.languageLabel ||
  null,
          sessionLabel: session.label || null,

          cohortId: null,
          cohortLabel: null,
          isCohortStart: false
        });
      });
    }

    // Mehrteilige Kurse / Cohorts
    if (Array.isArray(workshop.cohorts)) {
      workshop.cohorts.forEach((cohort) => {
        if (!Array.isArray(cohort.sessions)) return;

        cohort.sessions.forEach((session) => {
          events.push({
            workshopId: workshop.id,
            title: t.title,
            shortTitle: t.shortTitle || t.title,
            pageTag: t.pageTag || "",
            url: workshopUrl,

            type: workshop.type,
            format: workshop.format,

            date: session.date,
            start: session.start,
            end: session.end,

            instructor:
              session.instructor ||
              cohort.instructor ||
              null,

           language:
  session.language ||
  cohort.language ||
  t.languageLabel ||
  null,

            sessionLabel: session.label || null,

            cohortId: cohort.id || null,
            cohortLabel: cohort.label || null,

            isCohortStart:
              session.date === cohort.startDate
          });
        });
      });
    }
  });

  return events.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);

    if (dateCompare !== 0) {
      return dateCompare;
    }

    const timeCompare =
      (a.start || "").localeCompare(b.start || "");

    if (timeCompare !== 0) {
      return timeCompare;
    }

    return a.title.localeCompare(b.title);
  });
});


// Für den öffentlichen Kalender:
// normale Workshops vollständig,
// bei Cohorts nur den buchbaren Starttermin anzeigen
eleventyConfig.addFilter("bookableWorkshopEvents", function (events) {
  if (!Array.isArray(events)) return [];

  return events.filter((event) => {
    if (!event.cohortId) return true;

    return event.isCohortStart;
  });
});


// Events in Monatskalender umwandeln
eleventyConfig.addFilter(
  "workshopCalendarMonths",
  function (events, lang = "en") {
    if (!Array.isArray(events)) return [];

    const groups = new Map();

    events.forEach((event) => {
      if (!event.date) return;

      const [year, month, day] =
        event.date.split("-").map(Number);

      const key =
        `${year}-${String(month).padStart(2, "0")}`;

      if (!groups.has(key)) {
        groups.set(key, {
          key,
          year,
          month,
          events: []
        });
      }

      groups.get(key).events.push({
        ...event,
        day
      });
    });

    return [...groups.values()]
      .sort((a, b) => a.key.localeCompare(b.key))
      .map((group) => {

        const firstDate = new Date(
          Date.UTC(group.year, group.month - 1, 1)
        );

        const daysInMonth = new Date(
          Date.UTC(group.year, group.month, 0)
        ).getUTCDate();

        // Montag = erster Kalendertag
        const firstWeekday =
          (firstDate.getUTCDay() + 6) % 7;

        const monthLabel =
          new Intl.DateTimeFormat(
            lang === "pt" ? "pt-PT" : "en-GB",
            {
              month: "long",
              year: "numeric",
              timeZone: "UTC"
            }
          ).format(firstDate);

        const cells = [];

        // Leere Felder vor dem 1. des Monats
        for (let i = 0; i < firstWeekday; i++) {
          cells.push(null);
        }

        // Echte Kalendertage
        for (let day = 1; day <= daysInMonth; day++) {

          const date =
            `${group.year}-` +
            `${String(group.month).padStart(2, "0")}-` +
            `${String(day).padStart(2, "0")}`;

          cells.push({
            day,
            date,
            events: group.events
              .filter((event) => event.date === date)
              .sort((a, b) =>
                (a.start || "").localeCompare(
                  b.start || ""
                )
              )
          });
        }

        return {
          ...group,
          label: monthLabel,
          cells
        };
      });
  }
);

// Monats-Events für die mobile Ansicht in Wochen gruppieren
eleventyConfig.addFilter("workshopMonthWeeks", function (month, lang = "en") {
  if (!month || !Array.isArray(month.events)) return [];

  const year = month.year;
  const monthNumber = month.month;

  const daysInMonth = new Date(
    Date.UTC(year, monthNumber, 0)
  ).getUTCDate();

  const monthName = new Intl.DateTimeFormat(
    lang === "pt" ? "pt-PT" : "en-GB",
    {
      month: "long",
      timeZone: "UTC"
    }
  ).format(
    new Date(Date.UTC(year, monthNumber - 1, 1))
  );

  const weeks = [];

  let startDay = 1;
  let weekIndex = 0;

  while (startDay <= daysInMonth) {

    const startDateObject = new Date(
      Date.UTC(year, monthNumber - 1, startDay)
    );

    // Monday = 0
    const weekday =
      (startDateObject.getUTCDay() + 6) % 7;

    const daysUntilSunday = 7 - weekday;

    const endDay = Math.min(
      daysInMonth,
      startDay + daysUntilSunday - 1
    );

    const startDate =
      `${year}-` +
      `${String(monthNumber).padStart(2, "0")}-` +
      `${String(startDay).padStart(2, "0")}`;

    const endDate =
      `${year}-` +
      `${String(monthNumber).padStart(2, "0")}-` +
      `${String(endDay).padStart(2, "0")}`;

    const weekEvents = month.events
      .filter((event) =>
        event.date >= startDate &&
        event.date <= endDate
      )
      .sort((a, b) => {
        const dateCompare =
          a.date.localeCompare(b.date);

        if (dateCompare !== 0) {
          return dateCompare;
        }

        return (a.start || "").localeCompare(
          b.start || ""
        );
      });

    weeks.push({
      key: `${month.key}-week-${weekIndex}`,
      label:
        startDay === endDay
          ? `${startDay} ${monthName}`
          : `${startDay}–${endDay} ${monthName}`,
      startDay,
      endDay,
      events: weekEvents
    });

    startDay = endDay + 1;
    weekIndex++;
  }

  return weeks;
});

  // Bestehende .html-URLs während der Migration beibehalten
  eleventyConfig.addGlobalData("permalink", () => {
    return (data) =>
      `${data.page.filePathStem}.${data.page.outputFileExtension}`;
  });

  return {

    dir: {

      input: "src",

      includes: "_includes",

      output: "_site"

    },

    htmlTemplateEngine: "njk",

    markdownTemplateEngine: "njk",

    templateFormats: ["html", "njk", "md"]

  };

};
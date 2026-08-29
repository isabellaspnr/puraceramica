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
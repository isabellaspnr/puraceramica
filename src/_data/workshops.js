function buildRecurringSessions({
  startDate,
  endDate,
  schedule,
  instructor,
  language,
  exclude = [],
  overrides = {}
}) {
  const sessions = [];
  const excludedDates = new Set(exclude);

  const start = new Date(`${startDate}T00:00:00Z`);
  const end = new Date(`${endDate}T00:00:00Z`);

  for (
    let current = new Date(start);
    current <= end;
    current.setUTCDate(current.getUTCDate() + 1)
  ) {
    const weekday = current.getUTCDay();
    const date = current.toISOString().slice(0, 10);

    if (excludedDates.has(date)) continue;

    schedule
      .filter(slot => slot.weekday === weekday)
      .forEach(slot => {
      const overrideKey = `${date}|${slot.start}`;
const override = overrides[overrideKey] || {};

sessions.push({
  date,
  start: slot.start,
  end: slot.end,
  instructor:
    override.instructor ||
    slot.instructor ||
    instructor,
  language:
    override.language ||
    slot.language ||
    language
});
      });
  }

  return sessions.sort((a, b) => {
    const dateCompare = a.date.localeCompare(b.date);

    if (dateCompare !== 0) return dateCompare;

    return a.start.localeCompare(b.start);
  });
}
module.exports = {
  handbuilding: {
    id: "handbuilding",

    // Grundtyp
    medium: "clay",
    type: "workshop",
    format: "single-session",
    level: "beginner-intermediate",

    // Gemeinsame Angaben
    durationMinutes: 150,
    price: 40,
    priceCurrency: "EUR",
    priceStatus: "tentative",

    ageMinimum: 14,
    capacity: 10,

    image: "/assets/img/courses/handbuilding.jpg",

enImageAlt: "Handbuilding pottery workshop at PURACERÂMICA Lisbon",
ptImageAlt: "Workshop de modelagem manual na PURACERÂMICA em Lisboa",

booking: {
  url: "https://puraceramicalisboa.simplybook.it/v2/#book/category/2/service/26/count/1/provider/9/",
  category: "2",
  service: "26",
  provider: "9"
},

    // Sprachabhängige Inhalte
 en: {
  title: "Handbuilding Pottery Class",
  shortTitle: "Handbuilding",
  seo: {
  title: "Handbuilding Pottery Class in Lisbon | PURACERÂMICA",

  description:
    "Join a 2.5-hour handbuilding pottery class in Lisbon. Create your own ceramic piece with instructor guidance. Beginner-friendly and no experience required."
},
  pageTag: "Pottery Workshops · Single Session",

  schedule: "Saturdays & selected Sundays · 15:00–17:30",
  levelLabel: "Beginner and intermediate friendly",
  languageLabel: "English",

  intro:
    "Discover the joy of handbuilding ceramics. Learn fundamental techniques and create your own piece with guidance from your instructor. No experience needed.",

  languageNote: "This workshop is taught in English.",

  about: [
    "Handbuilding gives you the freedom to create with clay without using a pottery wheel. In this workshop, you'll work at your own pace and create a ceramic piece of your choice with guidance from your instructor.",

    "You'll be introduced to fundamental handbuilding techniques and learn which approach works best for your idea. Whether you'd like to make a cup, bowl, small vase, candle holder or something completely different, your instructor will support you throughout the process.",

    "No previous pottery experience is required. Returning makers are equally welcome to use the session to develop their own projects."
  ],

whatYouCanMake: {
  intro:
    "Create something that feels like your own. You can come with an idea or decide together with your instructor once you arrive.",

  note:
    "Projects should be achievable within a single 2.5-hour session. Very large or technically complex pieces may require additional time.",

  examples: [
    {
      title: "Cup or Mug",
      text: "Create a functional cup, mug or handle-less vessel in your own shape and style."
    },
    {
      title: "Bowl",
      text: "Build a small serving bowl, breakfast bowl or an organic sculptural form."
    },
    {
      title: "Small Vase",
      text: "Explore height, shape and texture while creating a small vase or vessel."
    },
    {
      title: "Candle Holder",
      text: "Design a decorative object such as a candle holder, incense holder or similar piece."
    }
  ]
},

techniques: {
  intro:
    "Your instructor will help you choose the technique that best suits the piece you want to create. You don't need to use every technique in one session.",

  items: [
    {
      title: "Pinching",
      text: "Shape clay directly with your hands to create cups, bowls and organic forms.",
      image: "/assets/img/courses/pinch.jpg",
      imageAlt: "Pinching technique used in handbuilding pottery"
    },
    {
      title: "Coiling",
      text: "Build forms gradually by stacking and joining coils of clay. A versatile technique for both functional and sculptural pieces.",
      image: "/assets/img/courses/coil.jpg",
      imageAlt: "Coiling technique used in handbuilding pottery"
    },
    {
      title: "Slab building",
      text: "Work with rolled sheets of clay that can be cut, folded and joined to create structured forms.",
      image: "/assets/img/courses/slab.jpg",
      imageAlt: "Slab building technique used in handbuilding pottery"
    },
    {
      title: "Surface decoration",
      text: "Add texture, patterns and painted details to give your piece its own character.",
      image: "/assets/img/courses/pottery_painted_clay.jpg",
      imageAlt: "Decorating a handmade ceramic piece"
    }
  ]
},

included: {
  intro:
    "Everything you need to create your piece is provided in the studio.",

  items: [
    {
      title: "Clay & materials",
      text: "All clay and basic materials needed during the session."
    },
    {
      title: "Studio tools",
      text: "Full use of our handbuilding tools and equipment during the workshop."
    },
    {
      title: "Instructor guidance",
      text: "Individual support with your idea, technique and construction throughout the session."
    },
    {
      title: "Glazing & firing",
      text: "Finishing and firing of your ceramic piece after the workshop."
    }
  ]
},

beforeYouCome: {
  intro:
    "A few practical things to know before your workshop.",

  items: [
    {
      title: "What to wear",
      text: "Clay can get messy, so we recommend comfortable clothes that you don't mind getting a little dirty."
    },
    {
      title: "What to bring",
      text: "You don't need to bring any materials or tools. If you already have an idea for your piece, you're welcome to bring reference images."
    },
    {
      title: "Finished pieces",
      text: "Your piece will stay with us after the workshop for drying, glazing and firing. It will usually be ready for collection within 3–4 weeks."
    },
    {
      title: "Age",
      text: "This workshop is suitable for participants aged 14 and over."
    }
  ]
},

  url: "/en/handbuilding-workshop.html"


},


    pt: {
      title: "Workshop de Modelagem Manual",
      shortTitle: "Modelagem Manual",
      pageTag: "Workshops de Cerâmica · Sessão Única",

      schedule: "Sábados e domingos selecionados · 15:00–17:30",
levelLabel: "Adequado para iniciantes e nível intermédio",
languageLabel: "Inglês",

      intro:
        "Descubra o prazer da modelagem manual em cerâmica. Aprenda técnicas fundamentais e crie a sua própria peça com o apoio do instrutor. Não é necessária experiência prévia.",

      languageNote: "Este workshop é lecionado em inglês.",

      url: "/pt/workshop-modelagem-manual.html"
    },

    // Alle aktuell geplanten Termine
    dates: [
      // Saturdays · Ebrahim Elmoly
      {
        date: "2026-09-05",
        start: "15:00",
        end: "17:30",
instructor: "ebrahimElmoly"      },
      {
        date: "2026-09-12",
        start: "15:00",
        end: "17:30",
instructor: "ebrahimElmoly"      },
      {
        date: "2026-09-19",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-09-26",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },

      // Sundays · Maasa Kakurai
      {
        date: "2026-09-06",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-09-27",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai",
        internalNote: "May later become a Nerikomi workshop"
      },

      // October
      {
        date: "2026-10-03",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-04",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-10-10",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-17",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-24",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-10-31",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },

      // November
      {
        date: "2026-11-07",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-11-08",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-11-14",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-11-21",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-11-28",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },

      // December
      {
        date: "2026-12-05",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-12-06",
        start: "15:00",
        end: "17:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-12-12",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      },
      {
        date: "2026-12-19",
        start: "15:00",
        end: "17:30",
        instructor: "ebrahimElmoly"
      }
    ]
  }, 

  kintsugi: {
    id: "kintsugi",

    medium: "ceramic-repair",
    type: "special",
    format: "single-session",

    durationMinutes: 150,

    price: 65,
    priceCurrency: "EUR",
    priceStatus: "confirmed",

    image: "/assets/img/courses/kintsugi/Kintsugi_Workshop.jpg",
enImageAlt: "Modern Kintsugi workshop at PURACERÂMICA in Lisbon",

booking: {
  url: "https://puraceramicalisboa.simplybook.it/v2/#book/category/2/service/38/count/1/",
  category: "2",
  service: "38"
},

    en: {
      title: "Modern Kintsugi Workshop",
      shortTitle: "Modern Kintsugi",
      pageTag: "Special Workshops · Single Session",

      seo: {
        title: "Modern Kintsugi Workshop in Lisbon | PURACERÂMICA",

        description:
          "Discover modern Kintsugi in a 2.5-hour workshop in Lisbon. Learn how to repair broken ceramics while highlighting their history and imperfections."
      },

      schedule: "Selected dates · 16:00–18:30",
      levelLabel: "Introduction",
      languageLabel: "English",

      intro:
        "Discover the art of Kintsugi through an accessible modern approach. Learn how broken ceramics can be repaired while celebrating their cracks and history.",

      languageNote:
        "This workshop is taught in English.",

about: [
  "Kintsugi is the Japanese art of repairing broken ceramics while making the traces of repair visible rather than hiding them.",

  "In this workshop, you'll explore an accessible modern approach to Kintsugi and learn the basic steps involved in reconnecting broken ceramic pieces and highlighting their cracks.",

  "The session is designed as an introduction and does not require any previous experience."
],

beforeYouCome: {
  intro:
    "Please prepare your ceramic piece before coming to the workshop.",

  items: [
    {
      title: "Bring your own piece",
      text: "Please bring one or two broken ceramic pieces that you would like to work on."
    },
    {
      title: "Keep it manageable",
      text: "Pieces should be approximately hand-sized and ideally broken into two or three shards."
    },
    {
      title: "Choose a simple form",
      text: "Open or shallow ceramic forms with relatively smooth surfaces are generally easiest to work with."
    },
    {
      title: "Practice piece",
      text: "If needed, a practice ceramic piece can be provided in the studio."
    }
  ]
},

included: {
  intro:
    "The materials and tools required for the modern Kintsugi process are provided during the workshop.",

  items: [
    {
      title: "Kintsugi materials",
      text: "Materials required for the repair and finishing process."
    },
    {
      title: "Studio tools",
      text: "Use of the tools and equipment needed during the workshop."
    },
    {
      title: "Instructor guidance",
      text: "Step-by-step guidance throughout the repair process."
    },
    {
      title: "Practice piece",
      text: "A ceramic practice piece can be provided if required."
    }
  ]
},

notice: {
  title: "Important to know",
  text:
    "This workshop uses a modern Kintsugi method and an alternative gold-coloured powder rather than the full traditional urushi process. Finished repairs are not guaranteed to be food-safe, so repaired pieces are recommended for decorative use."
},

url: "/en/kintsugi-workshop.html"
},

    dates: [
      {
        date: "2026-09-13",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-10-10",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-11-07",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      },
      {
        date: "2026-12-13",
        start: "16:00",
        end: "18:30",
        instructor: "maasaKakurai"
      }
    ]
  },

wheelForTwo: {
  id: "wheelForTwo",

  medium: "clay",
  type: "workshop",
  format: "single-session",
  level: "beginner",

  durationMinutes: 120,

  price: 120,
  priceCurrency: "EUR",
  priceStatus: "confirmed",
  priceUnit: "for-two",

  participants: {
  min: 2,
  max: 2,
  fixed: true
},

  image: "/assets/img/courses/couple_wheel.jpg",
enImageAlt: "Pottery wheel workshop for two at PURACERÂMICA in Lisbon",

booking: {
  url: "https://puraceramicalisboa.simplybook.it/v2/#book/category/2/service/27/count/1/provider/10/",
  category: "2",
  service: "27",
  provider: "10"
},

  en: {
    title: "Wheel for Two",
    shortTitle: "Wheel for Two",
    pageTag: "Pottery Wheel · Private Session",

    seo: {
      title: "Pottery Wheel for Two in Lisbon | PURACERÂMICA",
      description:
        "Try the pottery wheel together in a private 2-hour session for two people in Lisbon. Beginner-friendly with individual instructor guidance."
    },

    schedule:
      "Thursdays 17:30–19:30 · Saturdays 11:00–13:00 & 18:00–20:00",

    levelLabel: "Beginner friendly",
languageLabel: "English or Portuguese",
    intro:
      "Discover the pottery wheel together in a private session for two. Learn the basics of throwing clay and create your first pieces with individual guidance from your instructor.",

    languageNote:
  "The workshop language depends on the selected date. Please check the instructor and language shown for each session.",

    about: [
      "Wheel for Two is a private pottery experience designed for two people who want to discover the pottery wheel together.",

      "Your instructor will guide you through the essential steps of wheel throwing, from preparing and centering the clay to shaping your first forms.",

      "No previous pottery experience is required. The small private format gives you plenty of individual support throughout the session."
    ], 

techniques: {
  intro:
    "Your instructor will guide you through the essential steps of wheel throwing. You'll each work at your own wheel and learn the process together.",

  items: [
    {
      title: "Centering",
      text: "Learn how to center a lump of clay on the spinning wheel — the foundation of successful wheel throwing.",
      image: "/assets/img/courses/center.jpg",
      imageAlt: "Centering clay on the pottery wheel"
    },
    {
      title: "Opening & pulling",
      text: "Once the clay is centered, you'll open it and pull up the walls to create the basic cylinder used for many wheel-thrown forms.",
      image: "/assets/img/courses/pull.jpg",
      imageAlt: "Opening and pulling clay walls on the pottery wheel"
    },
    {
      title: "Shaping",
      text: "Guide and shape the walls of the clay to create a bowl, cup, small vase or another simple form.",
      image: "/assets/img/courses/shape.jpg",
      imageAlt: "Shaping a ceramic vessel on the pottery wheel"
    }
  ]
},

included: {
  intro:
    "Everything you need for the two-person wheel session is provided in the studio.",

  items: [
    {
      title: "Two pottery wheels",
      text: "You'll each have your own pottery wheel throughout the session."
    },
    {
      title: "Clay & materials",
      text: "All clay and basic materials required for both participants."
    },
    {
      title: "Instructor guidance",
      text: "Individual guidance for both of you throughout the two-hour session."
    },
    {
      title: "Glazing & firing",
      text: "Glazing and firing of two of your finished pieces is included."
    }
  ]
},

beforeYouCome: {
  intro:
    "A few practical things to know before your session.",

  items: [
    {
      title: "No experience needed",
      text: "This session is designed for beginners, so you don't need any previous pottery experience."
    },
    {
      title: "Come as a pair",
      text: "This workshop is designed for exactly two participants and the €120 price covers both people."
    },
    {
      title: "What to wear",
      text: "Wheel throwing can get messy, so we recommend comfortable clothes that you don't mind getting a little dirty."
    },
    {
      title: "Finished pieces",
      text: "Your selected pieces will stay with us for glazing and firing and are usually ready for collection within 3–4 weeks."
    }
  ]
},

  url: "/en/pottery-wheel-for-two.html"
},

  dates: buildRecurringSessions({
    startDate: "2026-09-01",
    endDate: "2026-12-31",

    instructor: "ebrahimElmoly",
    language: "English",

    schedule: [
      {
        weekday: 4,
        start: "17:30",
        end: "19:30"
      },
      {
        weekday: 6,
        start: "11:00",
        end: "13:00"
      },
      {
        weekday: 6,
        start: "18:00",
        end: "20:00"
      }
    ],

    exclude: [], 

    overrides: {
  "2026-09-03|17:30": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-05|11:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-05|18:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-10|17:30": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-12|11:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-12|18:00": {
    instructor: "pauloRosica",
    language: "Portuguese"
  },

  "2026-09-17|17:30": {
    instructor: "pauloRosica",
    language: "Portuguese"
  }
}
  })
},
wineAndClay: {
  id: "wineAndClay",

  medium: "clay",
  type: "social",
  format: "single-session",
  level: "beginner",

  durationMinutes: 120,

  price: 50,
  priceCurrency: "EUR",
  priceStatus: "confirmed",

  ageMinimum: 18,

  image: "/assets/img/courses/wine-clay.jpg",
enImageAlt: "Wine and Clay handbuilding evening at PURACERÂMICA in Lisbon",

  booking: {
    url: "https://puraceramicalisboa.simplybook.it/v2/#book/service/39",
    service: "39"
  },

  en: {
    title: "Wine & Clay",
    shortTitle: "Wine & Clay",
    pageTag: "Pottery Social · Handbuilding",

    seo: {
      title: "Wine & Clay in Lisbon | PURACERÂMICA",
      description:
        "Spend a creative Friday evening handbuilding with clay in Lisbon. A relaxed two-hour pottery social with instructor guidance, wine and good company."
    },

    schedule: "Fridays · 19:00–21:00",

    levelLabel: "Beginner friendly",
languageLabel: "Portuguese & English",

    intro:
      "Slow down, get your hands in clay and enjoy a relaxed Friday evening in the studio. Wine & Clay combines free handbuilding, instructor support and a social atmosphere.",

   languageNote:
  "This event is hosted in Portuguese and English.",

    about: [
      "Wine & Clay is a relaxed social pottery session rather than a structured pottery class. You'll have time to explore handbuilding freely, work on your own idea and enjoy the evening with other makers.",

      "Your instructor is there to help with techniques, construction and creative ideas whenever you need support.",

      "No previous pottery experience is required. Come on your own, with a friend or as a small group."
    ],

    included: {
  intro:
    "Everything you need for a relaxed creative evening is provided in the studio.",

  items: [
    {
      title: "Clay & materials",
      text: "Clay and the basic materials needed for your handbuilding project."
    },
    {
      title: "Studio tools",
      text: "Use of our handbuilding tools and equipment throughout the session."
    },
    {
      title: "Instructor guidance",
      text: "Amanda will be available throughout the evening to help with techniques, construction and creative ideas."
    },
    {
      title: "Wine",
      text: "Wine is included as part of the evening. A non-alcoholic option is also available."
    }
  ]
},

beforeYouCome: {
  intro:
    "A few practical things to know before joining Wine & Clay.",

  items: [
    {
      title: "18+ only",
      text: "Wine & Clay is an adults-only event for participants aged 18 and over."
    },
    {
      title: "No experience needed",
      text: "You don't need any previous pottery experience. The session is beginner friendly."
    },
    {
      title: "What to wear",
      text: "Clay can get messy, so we recommend comfortable clothes that you don't mind getting a little dirty."
    },
    {
      title: "Come your way",
      text: "You're welcome to come on your own, with a friend or as a small group."
    }
  ]
},

    url: "/en/wine-and-clay.html"
  },

 dates: buildRecurringSessions({
  startDate: "2026-09-04",
  endDate: "2026-12-18",

  instructor: "amanda",
  language: "Portuguese & English",

  schedule: [
    {
      weekday: 5,
      start: "19:00",
      end: "21:00"
    }
  ],

  exclude: []
})
},
continuousHandbuilding: {
  id: "continuousHandbuilding",

  medium: "clay",
  type: "course",
  format: "ongoing",
  level: "all-levels",

  durationMinutes: 120,

  price: 45,
  priceCurrency: "EUR",
  priceStatus: "tentative",

  en: {
    title: "Continuous Handbuilding Classes",
    shortTitle: "Continuous Handbuilding",
    pageTag: "Pottery Classes · Ongoing",

    seo: {
      title: "Continuous Handbuilding Classes in Lisbon | PURACERÂMICA",
      description:
        "Develop your handbuilding skills in ongoing ceramic classes in Lisbon. Explore construction techniques, personal projects, engobes, textures and surface decoration."
    },

    schedule: "Wednesdays · 18:00–20:00",

    levelLabel: "All levels",
    languageLabel: "Portuguese & English",

    intro:
      "Develop your ceramic practice through ongoing handbuilding classes focused on technique, experimentation and personal projects.",

    languageNote:
      "Classes are taught in Portuguese and English.",

    about: [
      "In these ongoing ceramic classes, participants explore clay through a range of handbuilding techniques, from developing an artistic idea and planning a project to creating the finished piece.",

      "Throughout the sessions, you'll also have the opportunity to prepare and apply engobes, experimenting with different colours, textures and surfaces.",

      "The continuous format gives you space to develop creativity, artistic expression and technical skills through experimentation, ongoing learning and exchange with others."
    ],

    url: "/en/continuous-handbuilding.html"
  },

  dates: buildRecurringSessions({
    startDate: "2026-10-07",
    endDate: "2026-12-16",

    instructor: "amanda",
    language: "Portuguese & English",

    schedule: [
      {
        weekday: 3,
        start: "18:00",
        end: "20:00"
      }
    ],

    exclude: []
  })
}
};